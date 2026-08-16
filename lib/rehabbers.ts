import "server-only";

import { rehabberDirectory } from "@/lib/demo-data";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";

export type DirectoryListing = {
  name: string;
  type: string;
  serviceArea: string;
  species: string[];
  status: string;
  contact: string;
  url?: string;
  counties?: string[];
  kind?: "rehabber" | "resource";
  priority?: "normal" | "urgent";
};

export async function getRehabberListings(): Promise<{ listings: DirectoryListing[]; isDemo: boolean }> {
  const supabase = getSupabaseAdmin();

  if (!hasSupabaseAdminConfig() || !supabase) {
    return { listings: rehabberDirectory as DirectoryListing[], isDemo: true };
  }

  const { data, error } = await supabase
    .from("rehabbers")
    .select("display_name, organization_name, service_area_text, species_groups, intake_status, notes_public, website_url, social_media_url, public_slug")
    .eq("published", true)
    .order("display_name");

  if (error || !data?.length) {
    return { listings: rehabberDirectory as DirectoryListing[], isDemo: true };
  }

  return {
    listings: data.map((item) => ({
      name: item.display_name,
      type: item.organization_name || "Rehabber",
      serviceArea: item.service_area_text,
      species: item.species_groups || [],
      status: item.intake_status,
      contact: item.notes_public || "Contact details are shared when the rehabber has approved public listing information.",
      url: item.website_url || item.social_media_url || `/directory/${item.public_slug}`,
      counties: item.service_area_text ? [item.service_area_text] : [],
      kind: "rehabber" as const
    })),
    isDemo: false
  };
}

const animalTypeSpeciesTags: Record<string, string[]> = {
  Unknown: ["Unknown"],
  Squirrel: ["Squirrels", "Small mammals"],
  Rabbit: ["Rabbits", "Small mammals"],
  Opossum: ["Opossums", "Small mammals"],
  Raccoon: ["Large mammals", "Rabies vector species"],
  Fox: ["Fox", "Rabies vector species"],
  Skunk: ["Rabies vector species", "Small mammals"],
  Deer: ["Deer", "Large mammals"],
  Songbird: ["Songbirds", "Baby birds", "Birds"],
  Raptor: ["Raptors", "Birds"],
  Waterfowl: ["Waterfowl", "Birds"],
  "Reptile/amphibian": ["Reptiles", "Amphibians"],
  Other: []
};

function normalizeCounty(value: string) {
  return value.trim().toLowerCase().replace(/\s+county$/, "");
}

export function matchRehabbers(
  listings: DirectoryListing[],
  { animalType, county }: { animalType?: string; county?: string },
  limit = 4
): DirectoryListing[] {
  const tags = animalTypeSpeciesTags[animalType || "Unknown"] ?? [];
  const speciesMatches = listings.filter(
    (listing) => listing.species.includes("Unknown") || tags.some((tag) => listing.species.includes(tag))
  );
  const pool = speciesMatches.length ? speciesMatches : listings;
  const normalizedCounty = county && county.trim() ? normalizeCounty(county) : null;

  const scored = pool.map((listing) => {
    const countyMatch = normalizedCounty
      ? (listing.counties || []).some((c) => normalizeCounty(c) === normalizedCounty)
      : false;
    const rehabberBonus = (listing.kind || "rehabber") === "rehabber" ? 2 : 0;
    const urgentBonus = listing.priority === "urgent" ? 1 : 0;

    return { listing, score: (countyMatch ? 4 : 0) + rehabberBonus + urgentBonus };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((entry) => entry.listing);
}

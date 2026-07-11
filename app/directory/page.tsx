import type { Metadata } from "next";
import { Search } from "lucide-react";
import { DirectoryBrowser, type DirectoryListing } from "@/components/directory-browser";
import { PageHero } from "@/components/page-hero";
import { rehabberDirectory } from "@/lib/demo-data";
import { createMetadata } from "@/lib/seo";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Wildlife Rehabilitator Directory for Springfield MO and the 417 Area",
    description:
      "Search wildlife help by animal type, county, service area, and availability for Springfield, Greene County, and southwest Missouri.",
    path: "/directory",
    image: "/assets/squirrel-6.jpg",
    keywords: ["wildlife rehabilitator directory Springfield MO", "wildlife rehabber near me 417 area", "Greene County wildlife help"],
    noIndex: !hasSupabaseAdminConfig()
  });
}

async function getListings(): Promise<DirectoryListing[]> {
  const supabase = getSupabaseAdmin();

  if (!hasSupabaseAdminConfig() || !supabase) {
    return rehabberDirectory as DirectoryListing[];
  }

  const { data, error } = await supabase
    .from("rehabbers")
    .select("display_name, organization_name, service_area_text, species_groups, intake_status, notes_public, website_url, public_slug")
    .eq("published", true)
    .order("display_name");

  if (error || !data?.length) {
    return rehabberDirectory as DirectoryListing[];
  }

  return data.map((item) => ({
    name: item.display_name,
    type: item.organization_name || "Rehabber",
    serviceArea: item.service_area_text,
    species: item.species_groups || [],
    status: item.intake_status,
    contact: item.notes_public || "Contact details are shared when the rehabber has approved public listing information.",
    url: item.website_url || `/directory/${item.public_slug}`,
    counties: item.service_area_text ? [item.service_area_text] : [],
    kind: "rehabber" as const
  }));
}

export default async function DirectoryPage() {
  const listings = await getListings();

  return (
    <>
      <PageHero
        eyebrow="Directory"
        title="Find the nearest appropriate wildlife help."
        text="Use species, location, and public contact notes to look for the safest appropriate wildlife resource near you."
        imageSrc="/assets/squirrel-6.jpg"
        imagePosition="center"
        primary={{ href: "/found-animal", label: "Get help with an animal" }}
        secondary={{ href: "/partners", label: "Share rehabber info" }}
      />
      <section className="section">
        <div className="container-shell">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="section-kicker">Wildlife help</p>
              <h2 className="mt-2 text-4xl font-black">Rehabber directory</h2>
            </div>
            <div className="flex min-h-12 items-start gap-2 rounded-md border border-border bg-surface px-4 py-3 text-sm leading-6 text-muted-foreground shadow-sm md:max-w-md">
              <Search className="mt-1 shrink-0" size={18} aria-hidden="true" />
              Start with animal type, location, and availability before contacting a rehabber.
            </div>
          </div>

          <DirectoryBrowser listings={listings} />
        </div>
      </section>
    </>
  );
}

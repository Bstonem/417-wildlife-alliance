import type { Metadata } from "next";
import { Info, Search } from "lucide-react";
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
    image: "/assets/raccoon-hero.jpg",
    keywords: ["wildlife rehabilitator directory Springfield MO", "wildlife rehabber near me 417 area", "Greene County wildlife help"],
    noIndex: !hasSupabaseAdminConfig()
  });
}

async function getListings(): Promise<{ listings: DirectoryListing[]; isDemo: boolean }> {
  const supabase = getSupabaseAdmin();

  if (!hasSupabaseAdminConfig() || !supabase) {
    return { listings: rehabberDirectory as DirectoryListing[], isDemo: true };
  }

  const { data, error } = await supabase
    .from("rehabbers")
    .select("display_name, organization_name, service_area_text, species_groups, intake_status, notes_public, website_url, public_slug")
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
      url: item.website_url || `/directory/${item.public_slug}`,
      counties: item.service_area_text ? [item.service_area_text] : [],
      kind: "rehabber" as const
    })),
    isDemo: false
  };
}

export default async function DirectoryPage() {
  const { listings, isDemo } = await getListings();

  return (
    <>
      <PageHero
        eyebrow="Directory"
        title="Find the nearest appropriate wildlife help."
        text="Use species, location, and public contact notes to look for the safest appropriate wildlife resource near you."
        imageSrc="/assets/raccoon-hero.jpg"
        imagePosition="center"
        primary={{ href: "/found-animal", label: "Get help with an animal" }}
        secondary={{ href: "/partners", label: "Share rehabber info" }}
      />
      <section className="section">
        <div className="container-shell">
          {isDemo ? (
            <div className="mb-6 flex items-start gap-3 rounded-md border border-clay/30 bg-clay/10 p-4 text-sm leading-6">
              <Info className="mt-0.5 shrink-0 text-clay-strong" size={19} aria-hidden="true" />
              <p>
                <strong>These are example listings for demonstration only.</strong> None of the organizations shown
                below are real, verified rehabbers yet. Do not contact them for actual animal help. Real, consent-verified
                listings will replace this demo data once rehabbers are onboarded.
              </p>
            </div>
          ) : null}

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

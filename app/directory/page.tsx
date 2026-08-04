import type { Metadata } from "next";
import { Info, Search } from "lucide-react";
import { DirectoryBrowser } from "@/components/directory-browser";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/seo";
import { getRehabberListings } from "@/lib/rehabbers";
import { hasSupabaseAdminConfig } from "@/lib/supabase";

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

export default async function DirectoryPage() {
  const { listings, isDemo } = await getRehabberListings();

  return (
    <>
      <PageHero
        eyebrow="Directory"
        title="Find the nearest wildlife help."
        text="Use species, location, and public contact notes to look for the safest appropriate wildlife resource near you."
        imageSrc="/assets/raccoon-hero.jpg"
        imagePosition="75% 15%"
        primary={{ href: "/found-animal", label: "Get help with an animal" }}
        secondary={{ href: "/rehabbers", label: "Share rehabber info" }}
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

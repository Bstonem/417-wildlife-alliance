import type { Metadata } from "next";
import { CardGrid } from "@/components/card-grid";
import { PageHero } from "@/components/page-hero";
import { programPillars } from "@/lib/demo-data";
import { AllianceMap } from "@/components/alliance-map";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About Our Southwest Missouri Wildlife Alliance",
  description:
    "Learn how 417 Wildlife Alliance helps people in the Springfield and 417 area reach safe wildlife guidance, support rehabbers, and prevent avoidable harm.",
  path: "/about",
  keywords: ["about 417 Wildlife Alliance", "southwest Missouri wildlife nonprofit", "Springfield MO wildlife support"]
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="A local alliance for wildlife care, rehabber support, and public education."
        text="417 Wildlife Alliance exists because rehabbers cannot do this work alone. Animals need skilled care, and skilled caregivers need community behind them."
        imageSrc="/assets/matt-and-squirrel.jpg"
        imagePosition="center"
        primary={{ href: "/help", label: "Get involved" }}
        secondary={{ href: "/stories", label: "See stories" }}
      />
      <section className="section">
        <div className="container-shell">
          <CardGrid items={programPillars} />
        </div>
      </section>
      <AllianceMap />
    </>
  );
}

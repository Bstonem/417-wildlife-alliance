import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/seo";

const team = [
  { name: "Matthew Blystone", title: "Founder" },
  { name: "KJ Hosman", title: "Founder" }
];

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
          <p className="section-kicker">Our Team</p>

          <div className="mt-6 grid gap-12">
            {team.map((member, index) => {
              const imageFirst = index % 2 === 0;

              const photo = (
                <div className="flex aspect-[4/3] items-center justify-center rounded-md border border-border bg-surface text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <UserRound size={40} aria-hidden="true" />
                    <p className="text-xs uppercase tracking-[0.14em]">Photo coming soon</p>
                  </div>
                </div>
              );

              const bio = (
                <div>
                  <h2 className="text-2xl font-black">{member.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-primary">{member.title}</p>
                  <p className="mt-4 text-sm italic leading-6 text-muted-foreground">Bio coming soon.</p>
                </div>
              );

              return (
                <div key={member.name}>
                  {index > 0 ? <hr className="mb-12 border-border" /> : null}
                  <div
                    className={`grid items-start gap-8 ${imageFirst ? "lg:grid-cols-[0.85fr_1.15fr]" : "lg:grid-cols-[1.15fr_0.85fr]"}`}
                  >
                    {imageFirst ? (
                      <>
                        {photo}
                        {bio}
                      </>
                    ) : (
                      <>
                        {bio}
                        {photo}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

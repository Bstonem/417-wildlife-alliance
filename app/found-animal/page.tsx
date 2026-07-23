import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { FoundAnimalForm } from "@/components/forms/found-animal-form";
import { WildlifeSafetyBand } from "@/components/info-band";
import { PageHero } from "@/components/page-hero";
import { wildlifeGuides } from "@/lib/wildlife-guides";
import { intakeSteps } from "@/lib/demo-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Found Injured or Orphaned Wildlife in Southwest Missouri?",
  description:
    "Start here for safe wildlife help in Springfield, Greene County, and the 417 area. Share animal details and learn what not to do while finding qualified help.",
  path: "/found-animal",
  image: "/assets/opossum.jpg",
  keywords: ["found injured wildlife Springfield MO", "orphaned wildlife southwest Missouri", "baby animal help 417 area"]
});

export default function FoundAnimalPage() {
  return (
    <>
      <PageHero
        eyebrow="Wildlife help"
        title="So you found an animal. What next?"
        text="Tell us what you see, where the animal is, and whether there is immediate danger. The right details help qualified wildlife contacts respond more safely."
        imageSrc="/assets/opossum.jpg"
        imagePosition="center 62%"
        primary={{ href: "/directory", label: "Find licensed help" }}
        secondary={{ href: "/faq", label: "Read FAQ" }}
      />
      <WildlifeSafetyBand />

      <section className="section bg-surface">
        <div className="container-shell">
          <p className="section-kicker">Three quick steps</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {intakeSteps.map((step, index) => (
              <Card key={step.title}>
                <CardHeader className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
                  <span className="flex size-11 items-center justify-center rounded-md bg-blue/10 text-blue-strong text-sm font-black">
                    {index + 1}
                  </span>
                  <div>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription className="mt-2">{step.text}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-background">
        <div className="container-shell">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="section-kicker">Quick guides</p>
              <h2 className="section-title mt-3">Start with the situation in front of you.</h2>
              <p className="body-large mt-5">
                Different animals need different decisions. These guides help you stay safe, avoid common mistakes, and gather the details a licensed wildlife contact will ask for.
              </p>
            </div>
            <Badge variant="blue" className="w-fit">
              Do not feed or medicate wildlife
            </Badge>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {wildlifeGuides.map((guide) => (
              <Card key={guide.slug} className="transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <Link href={`/found-animal/${guide.slug}` as Route} className="focus-ring block h-full rounded-md">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit">
                      {guide.eyebrow}
                    </Badge>
                    <CardTitle>{guide.title}</CardTitle>
                    <CardDescription>{guide.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                      Read the guide <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="grid gap-4 self-start">
            <Card className="border-clay/25 bg-clay/8">
              <CardHeader>
                <Badge variant="clay" className="w-fit">Safety first</Badge>
                <CardTitle>Before you get closer</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground">
              <p>Keep people and pets away. Observe from a distance unless a qualified person tells you to contain the animal.</p>
              <p>Do not feed, water, bathe, or medicate wildlife. The wrong help can make the animal harder to save.</p>
              <p>If a person is in danger, call local emergency services or the appropriate public authority.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Badge variant="blue" className="w-fit">What to share</Badge>
                <CardTitle>Details help more than guesses.</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                Photos, location, visible injuries, and what happened can help a licensed rehabber or local authority decide the safest next step.
              </CardContent>
            </Card>
          </aside>
          <FoundAnimalForm />
        </div>
      </section>
    </>
  );
}

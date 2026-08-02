import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { FoundAnimalForm } from "@/components/forms/found-animal-form";
import { WildlifeSafetyBand } from "@/components/info-band";
import { PageHero } from "@/components/page-hero";
import { QuickGuidesOrbit } from "@/components/quick-guides-orbit";
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
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/directory">Find licensed help</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section bg-background">
        <div className="container-shell flex flex-col items-center text-center">
          <p className="section-kicker">Quick guides</p>
          <h2 className="section-title mt-3 max-w-2xl">Start with the animal in front of you.</h2>
          <p className="body-large mt-5 max-w-2xl">
            These guides cover the animals people most often find in the 417 area. Tap one to see safe first steps, what not to do, and details a licensed wildlife contact will ask for.
          </p>
          <Badge variant="blue" className="mt-6 w-fit">
            Do not feed or medicate wildlife
          </Badge>
          <div className="mt-10 w-full">
            <QuickGuidesOrbit guides={wildlifeGuides} />
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

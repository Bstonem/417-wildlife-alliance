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
        imagePosition="center 54%"
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
          <div className="group relative mt-8 inline-block" tabIndex={0}>
            <img
              src="/assets/stop-sign-no-feed-hydrate.svg"
              alt="Do NOT attempt to FEED or HYDRATE wildlife!"
              className="size-40 sm:size-48"
            />
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-4 w-64 -translate-x-1/2 rounded-md border border-border bg-surface p-4 text-left opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-100 sm:w-80">
              <p className="text-sm font-bold text-clay-strong">Why this matters</p>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                As counterintuitive as it may seem, introducing the wrong food or fluids into a wild animal&apos;s sensitive digestive system can cause serious complications that rehabbers then have to treat, or in the worst cases, complications that lead to death.
              </p>
              <span
                className="absolute left-1/2 top-full size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-border bg-surface"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="mt-20 w-full">
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
          <div className="grid gap-5">
            <div>
              <Badge variant="blue" className="w-fit">What happens next</Badge>
              <h2 className="mt-3 text-2xl font-bold leading-tight">This goes to our team, not a live dispatcher.</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                As soon as you submit, you will see rehabbers and resources that may fit the animal type and county you entered, plus a reference number to save for your records. Our team also reviews every submission behind the scenes. If the situation is urgent, do not wait on a reply: contact a licensed rehabber directly or call the appropriate emergency service.
              </p>
            </div>
            <FoundAnimalForm />
          </div>
        </div>
      </section>
    </>
  );
}

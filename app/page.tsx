import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, CheckCircle2, HeartHandshake, MapPinned } from "lucide-react";
import { AllianceMap } from "@/components/alliance-map";
import { ButtonLink } from "@/components/button-link";
import { EmergencyBanner } from "@/components/emergency-banner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Wildlife Help in Springfield MO and the 417 Area",
  description:
    "Find safe next steps for injured, orphaned, or displaced wildlife in Springfield, Greene County, and southwest Missouri while supporting licensed rehabbers.",
  path: "/",
  keywords: ["Springfield MO wildlife help", "Greene County wildlife rehabber", "southwest Missouri wildlife rescue"]
});

const localServiceAreas = [
  "Greene County, including Springfield, Republic, Willard, and Strafford",
  "Christian County, including Nixa and Ozark",
  "Webster, Polk, and Taney Counties, including Marshfield, Bolivar, and Branson",
  "Surrounding 417 area communities"
];

const localHelpTopics = [
  "Emergency care of orphaned and injured wildlife",
  "Raising baby wildlife to release",
  "Removing at-risk wildlife from dangerous areas",
  "Rehabber support with supplies, transport, and funding"
];

export default function HomePage() {
  return (
    <>
      <section
        className="relative isolate overflow-hidden bg-[#15221f] bg-[length:auto_150%] bg-[position:center_68%] text-white lg:bg-cover lg:bg-[position:center_20%]"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(13,29,24,0.95), rgba(13,29,24,0.76) 42%, rgba(13,29,24,0.3)), url('/assets/squirrel-hero.jpg')"
        }}
      >
        <div className="container-shell flex min-h-[560px] flex-col justify-end py-9 sm:min-h-[600px] md:min-h-[640px] md:py-14 lg:min-h-[680px]">
          <div className="max-w-5xl">
            <div className="flex flex-wrap gap-2">
              <Badge variant="blue" className="border-white/18 bg-white/12 text-white">417 area first</Badge>
              <Badge variant="clay" className="border-white/18 bg-white/12 text-white">Rehabber fund</Badge>
              <Badge variant="secondary" className="border-white/18 bg-white/12 text-white">Wildlife help</Badge>
            </div>
            <h1 className="display-title mt-6 font-black">417 Wildlife Alliance</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/82 sm:text-xl sm:leading-8 md:mt-6 md:text-2xl md:leading-9">
              Helping southwest Missouri respond wisely when wildlife is injured, orphaned, displaced, or simply in the wrong place at the wrong time.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 md:mt-8">
              <ButtonLink href="/found-animal">Found an animal</ButtonLink>
              <ButtonLink href="/donate" variant="clay">Fund the work</ButtonLink>
            </div>
          </div>

          <a href="#map" className="focus-ring mt-10 inline-flex w-fit items-center gap-2 rounded-md text-sm font-bold text-white/82">
            See how to help <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
      </section>

      <EmergencyBanner />

      <div id="map">
        <AllianceMap />
      </div>

      <section className="section bg-background">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="section-kicker">Southwest Missouri</p>
            <h2 className="section-title mt-3">Wildlife help for Springfield, Greene County, and the 417 area.</h2>
            <p className="body-large mt-5">
              417 Wildlife Alliance is being built as a practical local hub for neighbors and businesses who find injured, orphaned, displaced, or at-risk wildlife and need to reach appropriate licensed or permitted help.
            </p>
          </div>
          <Card className="bg-surface">
            <CardHeader>
              <Badge className="w-fit">Where we focus</Badge>
              <CardTitle>Initial regional focus and common needs</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-2 font-bold text-foreground">
                  <MapPinned className="shrink-0 text-primary" size={18} aria-hidden="true" />
                  Service area
                </p>
                <ul className="mt-2 space-y-1.5">
                  {localServiceAreas.map((area) => (
                    <li key={area} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="flex items-center gap-2 font-bold text-foreground">
                  <CheckCircle2 className="shrink-0 text-primary" size={18} aria-hidden="true" />
                  Common needs
                </p>
                <ul className="mt-2 space-y-1.5">
                  {localHelpTopics.map((topic) => (
                    <li key={topic} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section border-y border-border bg-[#eaf1ed]">
        <div className="container-shell max-w-3xl text-center">
          <p className="section-kicker">Found wildlife</p>
          <h2 className="section-title mt-3">If you found an animal, start with safety and share the details.</h2>
          <div className="mt-6 flex justify-center">
            <ButtonLink href="/found-animal" variant="clay">Get animal help</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-kicker">Why it matters</p>
            <h2 className="section-title mt-3">Rehabbers carry the hardest part of care.</h2>
            <p className="body-large mt-5">
              A single small animal may need formula, food, medication, safe housing, transport, and weeks to months of attention. During baby season, those needs multiply fast.
            </p>
          </div>
          <Link href="/donate" className="focus-ring block rounded-md">
            <Card className="border-primary/20 bg-primary text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <span className="flex size-12 items-center justify-center rounded-md bg-white/12">
                  <HeartHandshake size={25} aria-hidden="true" />
                </span>
                <CardTitle className="text-3xl">Donor support turns concern into care.</CardTitle>
                <CardDescription className="text-white/78">
                  Donations, sponsors, grants, business education, and shop proceeds can all help provide transparent support for licensed or permitted rehabbers and wildlife nonprofits.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {["Monthly donors", "Business sponsors", "Supply support", "Impact updates"].map((item) => (
                  <p key={item} className="flex items-start gap-3 text-sm font-semibold">
                    <CheckCircle2 className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
                    {item}
                  </p>
                ))}
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </>
  );
}

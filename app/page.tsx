import type { Metadata } from "next";
import { ArrowDown, CheckCircle2, FileHeart, HeartHandshake, MapPinned, TreePine } from "lucide-react";
import { AllianceMap } from "@/components/alliance-map";
import { ButtonLink } from "@/components/button-link";
import { OperatingLanes } from "@/components/operating-lanes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { intakeSteps } from "@/lib/demo-data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Wildlife Help in Springfield MO and the 417 Area",
  description:
    "Find safe next steps for injured, orphaned, or displaced wildlife in Springfield, Greene County, and southwest Missouri while supporting licensed rehabbers.",
  path: "/",
  keywords: ["Springfield MO wildlife help", "Greene County wildlife rehabber", "southwest Missouri wildlife rescue"]
});

const localServiceAreas = [
  "Springfield and Greene County",
  "Nixa, Ozark, and Christian County",
  "Republic, Willard, and Strafford",
  "Bolivar, Marshfield, Branson, and nearby 417 communities"
];

const localHelpTopics = [
  "Baby squirrels displaced by storms or tree work",
  "Injured opossums, songbirds, and small mammals",
  "Wildlife near roads, pets, work sites, or structures",
  "Rehabber support, supplies, transport, and donor funding"
];

export default function HomePage() {
  return (
    <>
      <section
        className="relative isolate overflow-hidden bg-[#15221f] text-white"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(13,29,24,0.95), rgba(13,29,24,0.76) 42%, rgba(13,29,24,0.3)), url('/assets/matt-and-squirrel.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div className="container-shell flex min-h-[78svh] flex-col justify-end py-9 md:py-14">
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
              <ButtonLink href="/certified-companies" variant="ghost" className="border border-white/18 bg-white/10 text-white hover:bg-white/16">Compassionate companies</ButtonLink>
            </div>
          </div>

          <a href="#map" className="focus-ring mt-10 inline-flex w-fit items-center gap-2 rounded-md text-sm font-bold text-white/82">
            See how to help <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container-shell grid gap-3 py-5 md:grid-cols-3">
          {[
            { icon: FileHeart, label: "Animal help", value: "Send details, photos, and urgency" },
            { icon: MapPinned, label: "Find safe help", value: "Search by species and service area" },
            { icon: TreePine, label: "Compassionate companies", value: "Help crews prevent displacement" }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-3 rounded-md border border-border bg-surface px-4 py-3 shadow-sm">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-black">{item.label}</p>
                  <p className="text-xs leading-5 text-muted-foreground">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="section-kicker">Real care</p>
            <h2 className="section-title mt-3">Built around real care for real animals.</h2>
            <p className="body-large mt-5">
              Every animal helped through this alliance depends on patient, hands-on care: quiet recovery spaces, outdoor enclosures, careful feeding, reunions when possible, and releases worth protecting.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { src: "/assets/squirrel-6.jpg", label: "Rehabilitated squirrels in an outdoor enclosure" },
              { src: "/assets/opossum.jpg", label: "Young opossum in safe temporary care" },
              { src: "/assets/squirrel-2.jpg", label: "Squirrel recovery and release preparation" }
            ].map((photo) => (
              <figure key={photo.src} className="overflow-hidden rounded-md border border-border bg-muted shadow-sm">
                <img src={photo.src} alt={photo.label} className="aspect-[4/3] w-full object-cover" />
                <figcaption className="px-3 py-2 text-xs font-semibold text-muted-foreground">{photo.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <div id="map">
        <AllianceMap />
      </div>

      <section className="section bg-background">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="section-kicker">Southwest Missouri</p>
            <h2 className="section-title mt-3">Wildlife help for Springfield, Greene County, and the 417 area.</h2>
            <p className="body-large mt-5">
              417 Wildlife Alliance is being built as a practical local hub for neighbors who find injured, orphaned, displaced, or at-risk wildlife and need to reach appropriate licensed or permitted help.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-surface">
              <CardHeader>
                <Badge className="w-fit">Service area</Badge>
                <CardTitle>Initial regional focus</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground">
                {localServiceAreas.map((area) => (
                  <p key={area} className="flex gap-3">
                    <MapPinned className="mt-0.5 shrink-0 text-primary" size={18} aria-hidden="true" />
                    {area}
                  </p>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-surface">
              <CardHeader>
                <Badge variant="blue" className="w-fit">
                  Common needs
                </Badge>
                <CardTitle>What local wildlife calls often involve</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground">
                {localHelpTopics.map((topic) => (
                  <p key={topic} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={18} aria-hidden="true" />
                    {topic}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section bg-background">
        <div className="container-shell grid gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="section-kicker">Found wildlife</p>
            <h2 className="section-title mt-3">If you found an animal, start with safety.</h2>
            <p className="body-large mt-5">
              Keep your distance, keep pets and children away, avoid feeding or handling, and share what you see so qualified help has the right information.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/found-animal">Get animal help</ButtonLink>
              <ButtonLink href="/directory" variant="secondary">Find licensed help</ButtonLink>
            </div>
          </div>

          <div className="grid gap-4">
            {intakeSteps.map((step, index) => (
              <Card key={step.title} className="bg-surface">
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

      <section className="section border-y border-border bg-[#eaf1ed]">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="section-kicker">Ways to help</p>
            <h2 className="section-title mt-3">Choose the role that fits you.</h2>
            <p className="body-large mt-5">
              Whether you found an animal, want to donate, work with trees or outdoor spaces, or care for wildlife professionally, there is a clear next step.
            </p>
          </div>
          <OperatingLanes />
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-kicker">Why it matters</p>
            <h2 className="section-title mt-3">Rehabbers carry the hardest part of care.</h2>
            <p className="body-large mt-5">
              A single small animal may need formula, food, medication, safe housing, transport, and weeks of attention. During baby season, those needs multiply fast.
            </p>
          </div>
          <Card className="border-primary/20 bg-primary text-primary-foreground">
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
        </div>
      </section>
    </>
  );
}

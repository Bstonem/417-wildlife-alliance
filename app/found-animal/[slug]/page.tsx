import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, Camera, Car, CheckCircle2, HeartPulse, MapPin, TreeDeciduous, XCircle } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { WildlifeSafetyBand } from "@/components/info-band";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { articleJsonLd, createMetadata } from "@/lib/seo";
import { getWildlifeGuide, situationalGuides, wildlifeGuides } from "@/lib/wildlife-guides";

const situationalIcon = {
  "injured-adult": HeartPulse,
  "vehicle-strike": Car,
  "tree-work": TreeDeciduous
};

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return wildlifeGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getWildlifeGuide(slug);

  if (!guide) {
    return createMetadata({
      title: "Wildlife Help",
      description: "Safe first steps for found wildlife in Springfield, southwest Missouri, and the 417 area.",
      path: "/found-animal"
    });
  }

  return createMetadata({
    title: `${guide.title} Southwest Missouri Wildlife Help`,
    description: guide.summary,
    path: `/found-animal/${guide.slug}`,
    image: guide.imageSrc,
    keywords: [guide.title, `${guide.eyebrow} help Springfield MO`, "found wildlife 417 area"]
  });
}

export default async function WildlifeGuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getWildlifeGuide(slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: `${guide.title} Southwest Missouri Wildlife Help`,
          description: guide.summary,
          path: `/found-animal/${guide.slug}`,
          image: guide.imageSrc,
          articleSection: "Wildlife help guide"
        })}
      />
      <PageHero
        eyebrow={guide.eyebrow}
        title={guide.title}
        text={guide.summary}
        imageSrc={guide.imageSrc}
        imagePosition={guide.imagePosition || "center"}
        primary={{ href: "/found-animal", label: "Send animal details" }}
        secondary={{ href: "/directory", label: "Find licensed help" }}
      />
      <WildlifeSafetyBand />

      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="grid gap-4 self-start">
            <Card className="border-clay/25 bg-clay/8">
              <CardHeader>
                <span className="flex size-11 items-center justify-center rounded-md bg-clay/12 text-clay-strong">
                  <AlertTriangle size={22} aria-hidden="true" />
                </span>
                <Badge variant="clay" className="w-fit">
                  Urgent signs
                </Badge>
                <CardTitle>{guide.urgentTitle}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground">
                {guide.urgentCues.map((cue) => (
                  <p key={cue} className="flex gap-3">
                    <AlertTriangle className="mt-0.5 shrink-0 text-clay-strong" size={18} aria-hidden="true" />
                    {cue}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What to share</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground">
                {guide.details.map((detail, index) => {
                  const Icon = index % 2 === 0 ? Camera : MapPin;
                  return (
                    <p key={detail} className="flex gap-3">
                      <Icon className="mt-0.5 shrink-0 text-primary" size={18} aria-hidden="true" />
                      {detail}
                    </p>
                  );
                })}
              </CardContent>
            </Card>
          </aside>

          <div className="grid gap-5">
            <Card className="border-primary/20">
              <CardHeader>
                <Badge className="w-fit">First steps</Badge>
                <CardTitle>Start here</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground">
                {guide.firstSteps.map((step) => (
                  <p key={step} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={19} aria-hidden="true" />
                    {step}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="blue" className="w-fit">
                  Avoid
                </Badge>
                <CardTitle>Do not do these while waiting for guidance</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground">
                {guide.doNot.map((item) => (
                  <p key={item} className="flex gap-3">
                    <XCircle className="mt-0.5 shrink-0 text-clay-strong" size={19} aria-hidden="true" />
                    {item}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Why this matters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-white/82">{guide.callout}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/found-animal" variant="clay">
                    Send animal details
                  </ButtonLink>
                  <ButtonLink href="/directory" variant="ghost" className="border border-white/18 bg-white/10 text-white hover:bg-white/16">
                    Find licensed help
                  </ButtonLink>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-shell">
          <p className="section-kicker">Other situations to know</p>
          <h2 className="section-title mt-3 max-w-2xl">Does anything else apply here?</h2>
          <p className="body-large mt-5 max-w-2xl">
            These situations can happen with any animal, including this one. Keep them in mind alongside the guidance above.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {situationalGuides.map((situation) => {
              const Icon = situationalIcon[situation.icon];
              return (
                <Card key={situation.slug}>
                  <CardHeader>
                    <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <Badge variant="outline" className="w-fit">
                      {situation.eyebrow}
                    </Badge>
                    <CardTitle className="text-lg">{situation.title}</CardTitle>
                    <CardDescription>{situation.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2 text-sm leading-6 text-muted-foreground">
                    {situation.cues.map((cue) => (
                      <p key={cue} className="flex gap-2">
                        <AlertTriangle className="mt-0.5 shrink-0 text-clay-strong" size={16} aria-hidden="true" />
                        {cue}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

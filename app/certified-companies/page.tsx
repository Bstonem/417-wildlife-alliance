import { AlertTriangle, Building2, CheckCircle2, ClipboardCheck, ShieldCheck, TreePine } from "lucide-react";
import { PartnerForm } from "@/components/forms/partner-form";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const companyTypes = [
  "Tree care and removal crews",
  "Landscaping and lawn care teams",
  "Pest control companies",
  "Roofers, contractors, and property managers",
  "Parks, campuses, and outdoor maintenance teams",
  "Clinics, schools, and community partners"
];

const trainingTopics = [
  {
    icon: TreePine,
    title: "Nest and den awareness",
    text: "Seasonal signs, common hiding places, and moments when crews should slow down before work begins."
  },
  {
    icon: AlertTriangle,
    title: "Stop-work moments",
    text: "When to pause, secure the area, protect people and animals, and contact qualified wildlife help."
  },
  {
    icon: ClipboardCheck,
    title: "Clear escalation steps",
    text: "Simple internal guidance so field teams know who to call, what details to gather, and what not to do."
  }
];

const badgeMeaning = [
  {
    title: "It means education",
    text: "A participating company has completed wildlife-aware education and agreed to use humane escalation steps."
  },
  {
    title: "It means prevention",
    text: "The goal is to prevent avoidable displacement before an animal is injured or a nest is destroyed."
  },
  {
    title: "It is not a guarantee",
    text: "Recognition does not replace licensing, insurance, safety requirements, professional judgment, or applicable law."
  }
];

export default function CertifiedCompaniesPage() {
  return (
    <>
      <PageHero
        eyebrow="Wildlife Compassionate Companies"
        title="Wildlife-aware crews can prevent emergencies before they start."
        text="Tree care and outdoor-service companies can learn to recognize nests, dens, displacement risks, and humane escalation steps before wildlife is harmed."
        imageSrc="/assets/squirrel-1.jpg"
        imagePosition="center"
        primary={{ href: "/partners", label: "General partnership" }}
        secondary={{ href: "/found-animal", label: "Report displacement" }}
      />

      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="section-kicker">Who this is for</p>
            <h2 className="section-title mt-3">Any team that works where wildlife nests, dens, or hides.</h2>
            <p className="body-large mt-5">
              Wildlife conflicts often begin during normal outdoor work. A prepared crew can pause earlier, gather better information, and avoid turning a preventable situation into an emergency.
            </p>
          </div>
          <Card className="bg-surface">
            <CardContent className="grid gap-3 pt-5 sm:grid-cols-2">
              {companyTypes.map((type) => (
                <p key={type} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <Building2 className="mt-0.5 shrink-0 text-primary" size={18} aria-hidden="true" />
                  {type}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section border-y border-border bg-surface">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="section-kicker">What teams learn</p>
            <h2 className="section-title mt-3">Compassion starts before the first cut.</h2>
            <p className="body-large mt-5">
              The best wildlife response is often prevention: checking carefully, pausing at the right moment, and knowing when to call for help.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {trainingTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Card key={topic.title}>
                  <CardHeader>
                    <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <CardTitle>{topic.title}</CardTitle>
                    <CardDescription>{topic.text}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="section-kicker">What recognition means</p>
            <h2 className="section-title mt-3">A badge should build trust, not confusion.</h2>
            <p className="body-large mt-5">
              Wildlife Compassionate Company recognition should tell the public that a business is taking prevention seriously while staying honest about its limits.
            </p>
          </div>
          <div className="grid gap-4">
            {badgeMeaning.map((item, index) => {
              const Icon = index === 2 ? AlertTriangle : ShieldCheck;
              return (
                <Card key={item.title} className="bg-surface">
                  <CardHeader className="grid grid-cols-[auto_1fr] items-start gap-4">
                    <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon size={21} aria-hidden="true" />
                    </span>
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className="mt-2">{item.text}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="self-start border-blue/20">
            <CardHeader>
              <Badge variant="blue" className="w-fit">Wildlife-aware practices</Badge>
              <CardTitle>What participating companies commit to</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {[
                "Seasonal nest and den awareness training.",
                "Stop-work and escalation process for displaced wildlife.",
                "A plan for contacting licensed or permitted wildlife care.",
                "Public listing, sticker, and annual renewal after approval."
              ].map((item) => (
                <p key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={19} aria-hidden="true" />
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>
          <div>
            <p className="section-kicker">Apply</p>
            <h2 className="section-title mt-3">Start with a short conversation.</h2>
            <p className="body-large mt-5">
              Tell us what kind of work your team does, where you operate, and what wildlife situations your crew is most likely to encounter.
            </p>
            <div className="mt-6">
              <PartnerForm certified />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

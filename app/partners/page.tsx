import type { Metadata } from "next";
import { AlertTriangle, Building2, CheckCircle2, ClipboardCheck, ShieldCheck, TreePine } from "lucide-react";
import { PartnerForm } from "@/components/forms/partner-form";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";
import { getPublishedPartners } from "@/lib/public-content";

export const metadata: Metadata = createMetadata({
  title: "Partner with 417 Wildlife Alliance in Southwest Missouri",
  description:
    "Sponsors, clinics, schools, tree crews, and local businesses can help fund rehabber support, public education, and safer wildlife response in the 417 area. Includes Wildlife Compassionate Company certification for outdoor-service teams.",
  path: "/partners",
  keywords: ["wildlife nonprofit partners Springfield MO", "sponsor wildlife rehabilitation Missouri", "417 Wildlife Alliance partnership", "wildlife aware tree care Springfield MO"]
});

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

export default async function PartnersPage() {
  const partners = await getPublishedPartners();

  return (
    <>
      <PageHero
        eyebrow="Partners and sponsors"
        title="Give the wildlife caregivers more hands, more funding, and more reach."
        text="Sponsors, clinics, brands, schools, tree crews, and local businesses can all become part of the support system."
        imageSrc="/assets/matt-and-squirrel.jpg"
        imagePosition="center"
        primary={{ href: "#compassionate-companies", label: "Compassionate companies" }}
        secondary={{ href: "/donate", label: "Sponsor the fund" }}
      />
      {partners.length ? (
        <section className="section">
          <div className="container-shell">
            <p className="section-kicker">Alliance partners</p>
            <h2 className="section-title mt-3">Organizations supporting local wildlife care.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {partners.map((partner) => (
                <Card key={partner.id}>
                  <CardHeader>
                    <Badge variant={partner.certified ? "blue" : "clay"} className="w-fit">
                      {partner.certified ? "Certified company" : partner.partner_type}
                    </Badge>
                    <CardTitle>{partner.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-6 text-muted-foreground">
                    <p>{partner.public_description || partner.partner_type}</p>
                    {partner.county ? <p className="mt-3 font-semibold text-foreground">{partner.county}</p> : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="compassionate-companies" className="section border-y border-border bg-surface scroll-mt-20">
        <div className="container-shell">
          <p className="section-kicker">Wildlife Compassionate Companies</p>
          <h2 className="section-title mt-3">Wildlife-aware crews can prevent emergencies before they start.</h2>
          <p className="body-large mt-5 max-w-3xl">
            Tree care and outdoor-service companies can learn to recognize nests, dens, displacement risks, and humane escalation steps before wildlife is harmed. Any team that works where wildlife nests, dens, or hides can apply below.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {companyTypes.map((type) => (
              <p key={type} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                <Building2 className="mt-0.5 shrink-0 text-primary" size={18} aria-hidden="true" />
                {type}
              </p>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
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

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {badgeMeaning.map((item, index) => {
              const Icon = index === 2 ? AlertTriangle : ShieldCheck;
              return (
                <Card key={item.title} className="bg-background">
                  <CardHeader className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
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

          <Card className="mt-10 border-blue/20 bg-background">
            <CardHeader>
              <Badge variant="blue" className="w-fit">Wildlife-aware practices</Badge>
              <CardTitle>What participating companies commit to</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
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
        </div>
      </section>

      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">Apply</p>
            <h2 className="section-title mt-3">Start a partnership conversation.</h2>
            <p className="body-large mt-5">
              Share a few details about your organization, your goals, and the kind of support you want to offer. Check the box below if you'd also like Wildlife Compassionate Company certification.
            </p>
          </div>
          <PartnerForm />
        </div>
      </section>
    </>
  );
}

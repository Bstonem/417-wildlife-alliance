import type { Route } from "next";
import { CheckCircle2, ClipboardList, DollarSign, FileHeart, HeartHandshake, ReceiptText } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const fundPriorities = [
  {
    icon: FileHeart,
    title: "Food and formula",
    text: "Species-appropriate formula, feeding supplies, produce, seed, protein, and other food costs used in wildlife care."
  },
  {
    icon: HeartHandshake,
    title: "Rehabber support",
    text: "Micro-grants, reimbursements, or direct supply help for approved licensed or permitted caregivers and wildlife nonprofits."
  },
  {
    icon: DollarSign,
    title: "Transport and urgent supplies",
    text: "Fuel, carriers, bedding, gloves, cleaning materials, heat support, emergency replacement supplies, and other care-related needs."
  }
];

const decisionSteps = [
  "Confirm the request is connected to wildlife rehabilitation, public safety, education, or prevention.",
  "Prioritize licensed or permitted rehabbers, wildlife nonprofits, and approved care partners.",
  "Use receipts, request notes, and follow-up details to keep support accountable.",
  "Share public impact updates without exposing private rehabber, finder, or animal-location details."
];

const transparencyItems = [
  {
    title: "Gift status",
    text: "Donation receipts and tax language should match the organization's current charitable status at the time of the gift."
  },
  {
    title: "Use of funds",
    text: "Gifts should be directed toward animal care, rehabber support, public education, prevention, and reasonable operating needs."
  },
  {
    title: "Public updates",
    text: "As the fund grows, updates can show supplies purchased, rehabbers supported, and outcomes made possible."
  }
];

export default function HowDonationsHelpPage() {
  return (
    <>
      <PageHero
        eyebrow="How donations help"
        title="Turn a gift into practical wildlife care."
        text="Donations help cover the supplies, transport, safe housing, and emergency needs that make rehabilitation possible for licensed and permitted caregivers."
        imageSrc="/assets/squirrel-2.jpg"
        imagePosition="center 48%"
        primary={{ href: "/donate", label: "Give now" }}
        secondary={{ href: "/stories", label: "See impact" }}
      />

      <section className="section">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="section-kicker">Fund priorities</p>
            <h2 className="section-title mt-3">The unglamorous needs matter most.</h2>
            <p className="body-large mt-5">
              Many animals survive because someone had the right formula, carrier, heat source, enclosure, cleaning supply, or gas money at the right time.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {fundPriorities.map((priority) => {
              const Icon = priority.icon;
              return (
                <Card key={priority.title} className="bg-surface">
                  <CardHeader>
                    <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <CardTitle>{priority.title}</CardTitle>
                    <CardDescription>{priority.text}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section border-y border-border bg-surface">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">How support decisions work</p>
            <h2 className="section-title mt-3">Care first, with records behind it.</h2>
            <p className="body-large mt-5">
              The goal is simple: get useful support to the people doing qualified care while keeping donor trust intact.
            </p>
          </div>
          <Card className="border-primary/20">
            <CardContent className="grid gap-3 pt-5">
              {decisionSteps.map((step) => (
                <p key={step} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={19} aria-hidden="true" />
                  {step}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="section-kicker">Receipts and transparency</p>
            <h2 className="section-title mt-3">Donors deserve plain language.</h2>
            <p className="body-large mt-5">
              Before asking for trust, the alliance should be clear about gift status, how funds may be used, and what kind of public reporting donors can expect.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/donate">Donate</ButtonLink>
              <ButtonLink href={"/contact" as Route} variant="secondary">
                Ask a question
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-4">
            {transparencyItems.map((item, index) => {
              const Icon = index === 0 ? ReceiptText : index === 1 ? ClipboardList : HeartHandshake;
              return (
                <Card key={item.title} className="bg-surface">
                  <CardHeader className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
                    <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon size={21} aria-hidden="true" />
                    </span>
                    <div>
                      <Badge variant="outline" className="mb-2 w-fit">
                        {item.title}
                      </Badge>
                      <CardDescription>{item.text}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

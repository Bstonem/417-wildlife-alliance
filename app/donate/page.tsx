import type { Route } from "next";
import { CheckCircle2, HeartHandshake, ShieldCheck } from "lucide-react";
import { DonationForm } from "@/components/forms/donation-form";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const giftExamples = [
  {
    amount: "$25",
    title: "Feeding support",
    text: "Helps cover formula, syringes, produce, seed, or species-appropriate food used by licensed caregivers."
  },
  {
    amount: "$50",
    title: "Safe housing",
    text: "Helps with bedding, enclosure supplies, cleaning materials, heat support, and short-term recovery needs."
  },
  {
    amount: "$100",
    title: "Urgent response",
    text: "Helps offset transport, emergency supplies, veterinary coordination, or larger seasonal supply needs."
  }
];

const trustPoints = [
  "Support is intended for licensed or permitted rehabilitators, wildlife nonprofits, and approved care-related needs.",
  "Before you give, 417 Wildlife Alliance will be clear about the current tax status of the gift.",
  "As the fund grows, public updates should show what was purchased, who was helped, and what outcomes were made possible."
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Wildlife rehabilitation fund"
        title="Help rehabbers keep saying yes."
        text="Recurring support can cover the daily costs that make wildlife rehabilitation possible: formula, cages, medication, food, transport, and emergency care."
        imageSrc="/assets/squirrel-2.jpg"
        imagePosition="center 48%"
        primary={{ href: "/found-animal", label: "Animal needs help" }}
        secondary={{ href: "/how-donations-help" as Route, label: "How gifts help" }}
      />
      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="self-start border-primary/20">
            <CardHeader>
              <Badge className="w-fit">Where gifts go</Badge>
              <CardTitle>Your gift can help with</CardTitle>
            </CardHeader>
            <CardContent>
            <ul className="grid gap-3 text-sm leading-6 text-muted-foreground">
              <li>Formula and feeding supplies for baby animals.</li>
              <li>Transport support between finders, rehabbers, vets, and release sites.</li>
              <li>Emergency supplies and medical needs.</li>
              <li>Micro-grants or reimbursements for approved licensed or permitted rehabbers.</li>
            </ul>
            <p className="mt-5 text-xs leading-5 text-muted-foreground">
              Donation receipts and tax details will reflect 417 Wildlife Alliance's current charitable status at the time of the gift.
            </p>
            </CardContent>
          </Card>
          <DonationForm />
        </div>
      </section>

      <section className="section border-y border-border bg-surface">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="section-kicker">What gifts make possible</p>
            <h2 className="section-title mt-3">Small gifts can cover very real needs.</h2>
            <p className="body-large mt-5">
              Wildlife rehabilitation is often paid for one formula order, one enclosure repair, one tank of gas, and one emergency supply run at a time.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {giftExamples.map((gift) => (
              <Card key={gift.amount} className="border-primary/20">
                <CardHeader>
                  <p className="text-4xl font-black text-primary">{gift.amount}</p>
                  <CardTitle>{gift.title}</CardTitle>
                  <CardDescription>{gift.text}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="section-kicker">Donor trust</p>
            <h2 className="section-title mt-3">Give with clarity.</h2>
            <p className="body-large mt-5">
              Donors should know what their support is meant to do, who it is meant to help, and what status applies to the gift before they contribute.
            </p>
          </div>

          <div className="grid gap-4">
            {trustPoints.map((point, index) => {
              const Icon = index === 0 ? HeartHandshake : index === 1 ? ShieldCheck : CheckCircle2;
              return (
                <Card key={point} className="bg-surface">
                  <CardHeader className="grid grid-cols-[auto_1fr] items-start gap-4">
                    <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon size={21} aria-hidden="true" />
                    </span>
                    <div>
                      <CardTitle className="text-xl">{index === 0 ? "Care comes first" : index === 1 ? "No vague promises" : "Impact should be visible"}</CardTitle>
                      <CardDescription className="mt-2">{point}</CardDescription>
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

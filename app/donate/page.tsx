import type { Metadata } from "next";
import type { Route } from "next";
import { Info } from "lucide-react";
import { DonationForm } from "@/components/forms/donation-form";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Donate to Wildlife Rehabilitation Support in Southwest Missouri",
  description:
    "Support supplies, formula, transport, emergency needs, and approved care support for licensed or permitted wildlife rehabbers in the 417 area.",
  path: "/donate",
  image: "/assets/donate-banner.jpg",
  keywords: ["donate wildlife rehabilitation Missouri", "support wildlife rehabbers Springfield MO", "wildlife rescue donations 417 area"]
});

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Wildlife rehabilitation fund"
        title="Help rehabbers keep saying yes."
        text="Recurring support can cover the daily costs that make wildlife rehabilitation possible: formula, cages, medication, food, transport, and emergency care."
        imageSrc="/assets/donate-banner.jpg"
        imagePosition="75% 48%"
        primary={{ href: "/found-animal", label: "Animal needs help" }}
        secondary={{ href: "/how-donations-help" as Route, label: "How gifts help" }}
      />
      <section className="border-b border-clay/20 bg-clay/10">
        <div className="container-shell flex flex-col gap-3 py-5 sm:flex-row sm:items-start">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-clay/15 text-clay-strong">
            <Info size={18} aria-hidden="true" />
          </span>
          <p className="text-sm leading-6 text-foreground">
            <strong>417 Wildlife Alliance is a nonprofit initiative currently in formation.</strong> We have not yet
            filed for 501(c)(3) status with the IRS and are in the process of securing a fiscal sponsor so gifts can
            be tax-deductible. Donations made today are <strong>not tax-deductible</strong> and are held for the
            future benefit of this mission. Please consult your tax advisor. Represent a 501(c)(3) interested in
            fiscal-sponsoring this work? <a className="underline underline-offset-2" href="/contact">Contact us</a>.
          </p>
        </div>
      </section>
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
              <li>Continued development of capabilities for 417 Wildlife Alliance.</li>
            </ul>
            <p className="mt-5 text-xs leading-5 text-muted-foreground">
              417 Wildlife Alliance has not yet received 501(c)(3) determination from the IRS. Donation receipts will
              reflect our charitable status at the time of the gift, and will note fiscal-sponsor details once a
              sponsorship agreement is in place.
            </p>
            </CardContent>
          </Card>
          <DonationForm />
        </div>
      </section>
    </>
  );
}

import type { Route } from "next";
import { EyeOff, HeartHandshake, MapPinned, PackageCheck, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const rehabberSupport = [
  {
    icon: MapPinned,
    title: "Directory listings by consent",
    text: "Share only the public details you want listed: service area, species, intake status, website, and preferred contact information."
  },
  {
    icon: PackageCheck,
    title: "Supply and reimbursement support",
    text: "As funding grows, the alliance can help direct donated supplies, micro-grants, or reimbursements toward approved care needs."
  },
  {
    icon: HeartHandshake,
    title: "Better community handoffs",
    text: "Public guides help neighbors gather useful details before they contact a rehabber, reducing preventable confusion."
  },
  {
    icon: EyeOff,
    title: "Private details stay private",
    text: "Home addresses, permit documents, capacity notes, and private phone numbers should not be published without permission."
  }
];

const listingDetails = [
  "Species or animal groups you can accept",
  "Counties or communities you serve",
  "Current intake status or seasonal limitations",
  "How you prefer the public to reach you or request a referral",
  "Any notes that help the public contact the right resource first"
];

export default function RehabbersPage() {
  return (
    <>
      <PageHero
        eyebrow="For rehabbers"
        title="Support for the people doing the hands-on care."
        text="417 Wildlife Alliance is here to help licensed and permitted rehabbers be easier to find, better supported, and less overwhelmed by avoidable confusion."
        imageSrc="/assets/squirrel-6.jpg"
        imagePosition="center"
        primary={{ href: "/contact" as Route, label: "Update a listing" }}
        secondary={{ href: "/donate", label: "See the fund" }}
      />

      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">How we can help</p>
            <h2 className="section-title mt-3">You should not have to carry this work alone.</h2>
            <p className="body-large mt-5">
              The alliance can help turn public attention, donor support, and business partnerships into practical support for rehabbers while protecting your time and privacy.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {rehabberSupport.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="bg-surface">
                  <CardHeader>
                    <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <CardTitle>{item.title}</CardTitle>
                    <p className="text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section border-y border-border bg-surface">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="self-start border-primary/20">
            <CardHeader>
              <Badge className="w-fit">Listing updates</Badge>
              <CardTitle>Helpful details for a public listing</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground">
              {listingDetails.map((detail) => (
                <p key={detail} className="flex gap-3">
                  <ShieldCheck className="mt-0.5 shrink-0 text-primary" size={18} aria-hidden="true" />
                  {detail}
                </p>
              ))}
            </CardContent>
          </Card>

          <div>
            <p className="section-kicker">Get connected</p>
            <h2 className="section-title mt-3">Join the directory or request support.</h2>
            <p className="body-large mt-5">
              Use this form to introduce yourself, update public listing details, share current needs, or start a conversation about supplies and support.
            </p>
            <div className="mt-6">
              <LeadForm signupType="rehabber" title="Rehabber contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

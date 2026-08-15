import type { Metadata } from "next";
import type { Route } from "next";
import { HandCoins, MessagesSquare, PackageCheck, Route as RouteIcon, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Support for Missouri Wildlife Rehabbers",
  description:
    "417 Wildlife Alliance helps licensed and permitted rehabbers in southwest Missouri with directory listings, supply and grant requests, a rehabber community, and centralized finder handoffs.",
  path: "/rehabbers",
  image: "/assets/squirrel-6.jpg",
  keywords: ["Missouri wildlife rehabber support", "licensed wildlife rehabilitators southwest Missouri", "rehabber directory 417 area"]
});

const rehabberSupport = [
  {
    icon: PackageCheck,
    title: "Supply and reimbursement requests",
    text: "Request funding toward formula, transport, and other approved day-to-day care needs."
  },
  {
    icon: HandCoins,
    title: "Grants for bigger projects",
    text: "Apply for support with larger needs like enclosure builds, medical equipment, and training."
  },
  {
    icon: MessagesSquare,
    title: "Exclusive community forum",
    text: "Connect with other licensed rehabbers for peer support and shared resources. This is still being built, not live yet."
  },
  {
    icon: RouteIcon,
    title: "Centralized finder-to-rehabber routing",
    text: "The found-animal intake form routes finders to the right rehabber by species and location, cutting down avoidable back-and-forth."
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
        primary={{ href: "/rehabbers#form" as Route, label: "Join the community" }}
        secondary={{ href: "/rehabbers/login" as Route, label: "Sign in" }}
      />

      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">What you get</p>
            <h2 className="section-title mt-3">Being part of the community means more than a listing.</h2>
            <p className="body-large mt-5">
              Community access is tied to having an approved, published directory listing. Sign up below to get listed, and it opens the door to the rest of this.
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-md border border-primary/25 bg-primary/8 p-4 text-sm leading-6">
              <ShieldCheck className="mt-0.5 shrink-0 text-primary" size={18} aria-hidden="true" />
              <p>
                A published directory listing is required for community access — supply and grant requests, the forum, and finder routing all depend on being a verified, listed rehabber.
              </p>
            </div>
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

      <section id="form" className="section border-y border-border bg-surface">
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
            <p className="section-kicker">Join the community</p>
            <h2 className="section-title mt-3">Sign up to get listed and join the community.</h2>
            <p className="body-large mt-5">
              This form starts your directory listing and your community access. Introduce yourself, share your public listing details, and let us know about any current needs.
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

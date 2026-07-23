import type { Metadata } from "next";
import { PartnerForm } from "@/components/forms/partner-form";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";
import { getPublishedPartners } from "@/lib/public-content";

export const metadata: Metadata = createMetadata({
  title: "Partner with 417 Wildlife Alliance in Southwest Missouri",
  description:
    "Sponsors, clinics, schools, tree crews, and local businesses can help fund rehabber support, public education, and safer wildlife response in the 417 area.",
  path: "/partners",
  keywords: ["wildlife nonprofit partners Springfield MO", "sponsor wildlife rehabilitation Missouri", "417 Wildlife Alliance partnership"]
});

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
        primary={{ href: "/certified-companies", label: "Compassionate companies" }}
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
      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">Partnership interest</p>
            <h2 className="section-title mt-3">Start a partnership conversation.</h2>
            <p className="body-large mt-5">
              Share a few details about your organization, your goals, and the kind of support you want to offer the wildlife alliance.
            </p>
          </div>
          <PartnerForm />
        </div>
      </section>
    </>
  );
}

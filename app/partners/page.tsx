import { PartnerForm } from "@/components/forms/partner-form";
import { PageHero } from "@/components/page-hero";

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners and sponsors"
        title="Give the wildlife network more hands, more funding, and more reach."
        text="Sponsors, clinics, brands, schools, tree crews, and local businesses can all become part of the support system."
        imageSrc="/assets/matt-and-squirrel.jpg"
        imagePosition="center"
        primary={{ href: "/certified-companies", label: "Compassionate companies" }}
        secondary={{ href: "/donate", label: "Sponsor the fund" }}
      />
      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">Partnership interest</p>
            <h2 className="section-title mt-3">Start a partnership conversation.</h2>
            <p className="body-large mt-5">
              Share a few details about your organization, your goals, and the kind of support you want to offer the wildlife network.
            </p>
          </div>
          <PartnerForm />
        </div>
      </section>
    </>
  );
}

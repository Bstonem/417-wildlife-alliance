import Link from "next/link";
import type { Route } from "next";
import { helpOptions } from "@/lib/demo-data";
import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/page-hero";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <>
      <PageHero
        eyebrow="How you can help"
        title="Turn concern into practical support."
        text="The alliance can support rehabbers through money, transport, supplies, volunteers, business partners, and public education."
        imageSrc="/assets/squirrel-7.jpg"
        imagePosition="center 40%"
        primary={{ href: "/donate", label: "Donate" }}
        secondary={{ href: "/partners", label: "Partner" }}
      />
      <section className="section">
        <div className="container-shell grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {helpOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card key={option.title} className="transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <Link href={option.href as Route} className="focus-ring block rounded-md">
                  <CardHeader>
                    <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <CardTitle>{option.title}</CardTitle>
                    <CardDescription>{option.text}</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            );
          })}
        </div>
      </section>
      <section id="signup" className="section border-t border-border bg-[#eaf1ed]">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">Volunteer interest</p>
            <h2 className="section-title mt-3">Tell us how you can help.</h2>
            <p className="body-large mt-5">
              Tell us how you would like to help, whether that means transport, events, fundraising, education, outreach, or support for rehabbers.
            </p>
          </div>
          <LeadForm signupType="volunteer" title="Volunteer signup" />
        </div>
      </section>
    </>
  );
}

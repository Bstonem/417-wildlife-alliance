import { AlertTriangle, Building2, HeartHandshake, Mail, MapPinned } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const contactReasons = [
  {
    icon: AlertTriangle,
    title: "Found wildlife",
    text: "Use the found-animal form first when an animal may be injured, orphaned, displaced, or in immediate danger."
  },
  {
    icon: MapPinned,
    title: "Rehabber listings",
    text: "Send updates about public contact preferences, species, counties served, and current availability."
  },
  {
    icon: HeartHandshake,
    title: "Donations",
    text: "Ask about gifts, receipts, sponsorships, in-kind supplies, and how support can reach rehabbers."
  },
  {
    icon: Building2,
    title: "Partnerships",
    text: "Start a conversation about business support, tree care education, events, schools, or community outreach."
  }
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the 417 Wildlife Alliance team."
        text="Send questions, listing updates, donor inquiries, partnership ideas, or wildlife stories. If an animal is in urgent danger, also contact a licensed rehabilitator or the appropriate local authority directly."
        imageSrc="/assets/matt-and-squirrel.jpg"
        imagePosition="center"
        primary={{ href: "/found-animal", label: "Animal needs help" }}
        secondary={{ href: "/partners", label: "Partner with us" }}
      />

      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="grid gap-4 self-start">
            <Card className="border-clay/25 bg-clay/8">
              <CardHeader>
                <Badge variant="clay" className="w-fit">
                  Important
                </Badge>
                <CardTitle>Not a 24/7 emergency service</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                If a person is in danger, call emergency services. If wildlife is in immediate danger, use the found-animal form and also contact a licensed rehabilitator, animal control, conservation authority, or other appropriate local resource.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Mail size={22} aria-hidden="true" />
                </span>
                <CardTitle>What to include</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                Include your location, the best way to reach you, and any details that help us understand whether this is about wildlife help, donations, rehabber support, partnerships, or public education.
              </CardContent>
            </Card>
          </aside>

          <ContactForm />
        </div>
      </section>

      <section className="section border-t border-border bg-surface">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="section-kicker">Common reasons to contact us</p>
            <h2 className="section-title mt-3">Send the right details to the right place.</h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contactReasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <Card key={reason.title}>
                  <CardHeader>
                    <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <CardTitle>{reason.title}</CardTitle>
                    <p className="text-sm leading-6 text-muted-foreground">{reason.text}</p>
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

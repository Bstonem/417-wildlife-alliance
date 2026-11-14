import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact 417 Wildlife Alliance",
  description:
    "Contact 417 Wildlife Alliance for wildlife help details, rehabber listing updates, donations, partnerships, and southwest Missouri community education.",
  path: "/contact",
  keywords: ["contact 417 Wildlife Alliance", "Springfield MO wildlife help contact", "southwest Missouri wildlife support"]
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the 417 Wildlife Alliance team."
        text="Send questions, listing updates, donor inquiries, partnership ideas, or wildlife stories. If an animal is in urgent danger, also contact a licensed rehabilitator or the appropriate local authority directly."
        imageSrc="/assets/crow-banner.jpg"
        imagePosition="85% 18%"
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
    </>
  );
}

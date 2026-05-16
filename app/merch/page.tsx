import { Shirt } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent } from "@/components/ui/card";

export default function MerchPage() {
  return (
    <>
      <PageHero
        eyebrow="Merch"
        title="Mission gear is on the way."
        text="Every shirt, sticker, and tote will help keep local wildlife care visible while supporting the rehabilitation fund."
        imageSrc="/assets/squirrel-3.jpg"
        imagePosition="center"
        primary={{ href: "/donate", label: "Donate instead" }}
        secondary={{ href: "/partners", label: "Sponsor merch" }}
      />
      <section className="section">
        <div className="container-shell">
          <Card>
            <CardContent className="p-8 text-center">
              <Shirt className="mx-auto text-primary" size={48} aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-bold">Shop opening soon</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                The first collection will focus on simple, useful gear that raises awareness and sends proceeds back into wildlife support.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

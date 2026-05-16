import { PageHero } from "@/components/page-hero";
import { faqs } from "@/lib/demo-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Clear answers for high-stress wildlife moments."
        text="Practical answers for the first few minutes after you find an animal, with safety and licensed wildlife care at the center."
        imageSrc="/assets/opossum.jpg"
        imagePosition="center 62%"
        primary={{ href: "/found-animal", label: "Get help with an animal" }}
        secondary={{ href: "/directory", label: "Find help" }}
      />
      <section className="section">
        <div className="container-shell">
          <Card>
            <CardContent className="pt-2">
              <Accordion type="single" collapsible>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.q} value={faq.q}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

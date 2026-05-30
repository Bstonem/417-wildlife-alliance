import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Shirt } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";
import { getPublishedMerchProducts } from "@/lib/public-content";

export const metadata: Metadata = createMetadata({
  title: "417 Wildlife Alliance Merch",
  description: "Mission gear for supporting local wildlife care and the 417 Wildlife Alliance rehabilitation fund.",
  path: "/merch",
  image: "/assets/squirrel-3.jpg",
  noIndex: true
});

function currency(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export default async function MerchPage() {
  const products = await getPublishedMerchProducts();

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
          {products.length ? (
            <div className="grid gap-4 md:grid-cols-3">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  {product.image_path ? (
                    <div
                      className="h-56 bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.image_path})` }}
                      aria-hidden="true"
                    />
                  ) : null}
                  <CardContent className="p-5">
                    <Badge variant={product.inventory_status === "in_stock" ? "default" : "clay"}>{product.inventory_status.replace(/_/g, " ")}</Badge>
                    <h2 className="mt-4 text-2xl font-bold">{product.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
                    <p className="mt-4 text-2xl font-black text-primary">{currency(product.price || 0)}</p>
                    {product.external_url ? (
                      <Button asChild className="mt-5 w-full">
                        <Link href={product.external_url}>
                          View product
                          <ExternalLink aria-hidden="true" />
                        </Link>
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Shirt className="mx-auto text-primary" size={48} aria-hidden="true" />
                <h2 className="mt-5 text-3xl font-bold">Shop opening soon</h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                  The first collection will focus on simple, useful gear that raises awareness and sends proceeds back into wildlife support.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}

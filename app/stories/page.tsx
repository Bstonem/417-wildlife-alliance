import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { stories } from "@/lib/stories";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Success stories and news"
        title="Real stories make the work visible."
        text="Every recovery, reunion, release, and funded supply run helps the community understand what careful wildlife support makes possible."
        imageSrc="/assets/squirrel-4.jpg"
        imagePosition="center"
        primary={{ href: "/donate", label: "Fund the work" }}
        secondary={{ href: "/help", label: "Share a story" }}
      />
      <section className="section">
        <div className="container-shell grid gap-4 md:grid-cols-3">
          {stories.map((story) => (
            <Card key={story.slug} className="transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <Link href={`/stories/${story.slug}` as Route} className="focus-ring block h-full rounded-md">
                <CardHeader>
                  <Badge variant="clay" className="w-fit">{story.category}</Badge>
                  <CardTitle>{story.title}</CardTitle>
                  <CardDescription>{story.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Read story <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStory, stories } from "@/lib/stories";

type StoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) {
    return {
      title: "Stories | 417 Wildlife Alliance"
    };
  }

  return {
    title: `${story.title} | 417 Wildlife Alliance`,
    description: story.summary
  };
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={story.category}
        title={story.title}
        text={story.summary}
        imageSrc={story.imageSrc}
        imagePosition={story.imagePosition || "center"}
        primary={{ href: "/donate", label: "Fund the work" }}
        secondary={{ href: "/help", label: "Get involved" }}
      />

      <section className="section">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="grid gap-4 self-start">
            <Card className="border-primary/20 bg-primary text-primary-foreground">
              <CardHeader>
                <span className="flex size-11 items-center justify-center rounded-md bg-white/12">
                  <HeartHandshake size={22} aria-hidden="true" />
                </span>
                <CardTitle>What support makes possible</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {story.impact.map((item) => (
                  <p key={item} className="flex gap-3 text-sm leading-6 text-white/82">
                    <CheckCircle2 className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
                    {item}
                  </p>
                ))}
              </CardContent>
            </Card>
          </aside>

          <article className="grid gap-5">
            <Card className="bg-surface">
              <CardContent className="pt-5">
                <p className="body-large">{story.intro}</p>
              </CardContent>
            </Card>

            {story.sections.map((section) => (
              <Card key={section.title} className="bg-surface">
                <CardHeader>
                  <Badge variant="outline" className="w-fit">
                    Story note
                  </Badge>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{section.text}</p>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle>Help write the next story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  Every gift, volunteer hour, rehabber update, and wildlife-aware business decision helps build a stronger safety net for animals in the 417 area.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/donate">Donate</ButtonLink>
                  <ButtonLink href={"/contact" as Route} variant="secondary">
                    Share a story
                  </ButtonLink>
                </div>
              </CardContent>
            </Card>
          </article>
        </div>
      </section>
    </>
  );
}

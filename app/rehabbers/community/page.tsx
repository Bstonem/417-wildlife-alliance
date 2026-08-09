import type { Metadata } from "next";
import type { Route } from "next";
import { HandCoins, MapPinned, MessagesSquare, Users2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Join the Rehabber Community",
  description:
    "What joining the 417 Wildlife Alliance rehabber community means: directory listings, local rehab groups, peer support, and requesting funding or supplies.",
  path: "/rehabbers/community",
  keywords: ["wildlife rehabber community Missouri", "rehabber support network", "compassion fatigue wildlife rehab"]
});

const communityPieces = [
  {
    icon: MapPinned,
    title: "Get listed in the directory",
    text: "Share the public details you want listed — service area, species, intake status, and preferred contact info — so neighbors and finders can reach you directly.",
    action: { href: "/rehabbers#form" as Route, label: "Start a listing" }
  },
  {
    icon: Users2,
    title: "Local rehab community groups",
    text: "Links to regional rehabber groups and social spaces are coming soon. If you already run or know of one worth including, let us know.",
    action: { href: "/contact" as Route, label: "Suggest a group" }
  },
  {
    icon: MessagesSquare,
    title: "Peer support and compassion fatigue resources",
    text: "A space to chat with other rehabbers and find resources for the emotional toll of this work is in the planning stages, not live yet.",
    action: { href: "/contact" as Route, label: "Tell us what you need" }
  },
  {
    icon: HandCoins,
    title: "Request funding or supplies",
    text: "Use the rehabber contact form to describe a current need — formula, transport, emergency supplies, or a micro-grant — and start a conversation about support.",
    action: { href: "/rehabbers#form" as Route, label: "Request support" }
  }
];

export default function RehabberCommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="Rehabber community"
        title="What joining the community means."
        text="417 Wildlife Alliance is building more than a directory. Joining connects you to public visibility, other rehabbers, and practical support as it becomes available."
        imageSrc="/assets/squirrel-6.jpg"
        imagePosition="center"
        primary={{ href: "/rehabbers/login" as Route, label: "Sign in" }}
        secondary={{ href: "/rehabbers#form" as Route, label: "Get listed" }}
      />

      <section className="section">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="section-kicker">Four ways to plug in</p>
            <h2 className="section-title mt-3">Some of this is ready today. Some is being built.</h2>
            <p className="body-large mt-5">
              We would rather tell you plainly what is live now versus what is still coming than overstate it. The directory and support requests work today; the group links and peer-support space are next.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {communityPieces.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="bg-surface">
                  <CardHeader>
                    <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <CardTitle>{item.title}</CardTitle>
                    <p className="text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </CardHeader>
                  <CardContent>
                    <ButtonLink href={item.action.href} variant="secondary">
                      {item.action.label}
                    </ButtonLink>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section border-t border-border bg-surface">
        <div className="container-shell">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <Badge className="w-fit">Already have a listing?</Badge>
              <h2 className="section-title mt-3">Sign in to update what is already public.</h2>
              <p className="body-large mt-5">
                If you have an approved listing, sign in with the email on file to change your contact details, service area, species, or intake status yourself.
              </p>
            </div>
            <ButtonLink href={"/rehabbers/login" as Route}>Sign in</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

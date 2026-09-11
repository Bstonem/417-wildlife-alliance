import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allianceMapNodes } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const toneClass = {
  green: "border-primary/24 bg-primary/8 text-primary",
  blue: "border-blue/24 bg-blue/10 text-blue-strong",
  clay: "border-clay/24 bg-clay/10 text-clay-strong",
  gold: "border-gold/24 bg-gold/10 text-gold-strong"
};

export function AllianceMap() {
  const [who, help, directory, companies, found, stories, faq, merch] = allianceMapNodes;
  // Ordered by urgency: immediate action first, informational/commerce last.
  // Tones cycle through all 4 available colors (not the original per-node
  // tone) so no two cards touching in either the mobile 2-column stack or
  // the desktop radial grid share the same color. Three tones can't do this
  // for 8 cards around a shared center without at least one clash somewhere;
  // four tones can and do.
  const layout = [
    { ...found, tone: "clay" },
    { ...directory, tone: "blue" },
    { ...faq, tone: "green" },
    { ...help, tone: "gold" },
    null,
    { ...who, tone: "clay" },
    { ...companies, tone: "blue" },
    { ...stories, tone: "green" },
    { ...merch, tone: "gold" }
  ];

  return (
    <section className="section border-y border-border bg-surface">
      <div className="container-shell">
        <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="section-kicker">Find your next step</p>
            <h2 className="section-title mt-3 max-w-2xl">Wildlife help works best when everyone knows their part.</h2>
            <p className="body-large mt-5 max-w-xl">
              A neighbor may need urgent guidance. A rehabber may need supplies. A business may need training before a nest is disturbed. The alliance brings those needs into one place.
            </p>
          </div>

          <div className="relative">
            <div className="relative grid grid-cols-2 gap-3 lg:grid-cols-3">
              {layout.map((node, index) => {
                if (!node) {
                  return (
                    <div
                      key="center"
                      className="order-first col-span-2 hidden min-h-40 flex-col items-center justify-center gap-3 rounded-md border-2 border-primary bg-primary p-5 text-center text-primary-foreground shadow-md md:order-none md:col-span-1 md:flex"
                    >
                      <span className="flex size-11 items-center justify-center rounded-md bg-white/12">
                        <Network size={22} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">Local alliance</p>
                        <h3 className="mt-2 text-2xl font-black leading-tight">417 Wildlife Alliance</h3>
                      </div>
                    </div>
                  );
                }

                const Icon = node.icon;

                return (
                  <Link
                    key={node.key}
                    href={node.href as Route}
                    className={cn(
                      "focus-ring group min-h-32 rounded-md border bg-surface p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:min-h-40 md:p-4",
                      toneClass[node.tone as keyof typeof toneClass],
                      index === 0 && "lg:-translate-y-2",
                      index === 2 && "lg:-translate-y-2",
                      index === 6 && "lg:translate-y-2",
                      index === 8 && "lg:translate-y-2"
                    )}
                  >
                    <div className="flex h-full flex-col gap-3 md:gap-5">
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex size-8 items-center justify-center rounded-md bg-white/75 md:size-10">
                          <Icon size={18} aria-hidden="true" />
                        </span>
                        <ArrowRight className="mt-2 size-4 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-80" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[0.62rem] font-black uppercase tracking-[0.13em] opacity-75 md:text-[0.68rem] md:tracking-[0.15em]">{node.eyebrow}</p>
                        <h3 className="mt-2 text-base font-black leading-tight text-foreground md:text-xl">{node.title}</h3>
                        <p className="mt-2 hidden text-sm leading-6 text-muted-foreground md:block">{node.text}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="secondary">
            <Link href="/found-animal">Get help with an animal</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

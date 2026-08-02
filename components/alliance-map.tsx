import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Network } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { allianceMapNodes } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const toneClass = {
  green: "border-primary/24 bg-primary/8 text-primary",
  blue: "border-blue/24 bg-blue/10 text-blue-strong",
  clay: "border-clay/24 bg-clay/10 text-clay-strong"
};

export function AllianceMap() {
  const [who, help, directory, companies, found, stories, faq, merch] = allianceMapNodes;
  const layout = [who, directory, companies, help, null, faq, found, stories, merch];

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
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="blue">Local help</Badge>
              <Badge variant="clay">Donor support</Badge>
              <Badge variant="secondary">Wildlife education</Badge>
            </div>
          </div>

          <div className="relative">
            <div className="relative grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {layout.map((node, index) => {
                if (!node) {
                  return (
                    <div
                      key="center"
                      className="order-first flex min-h-40 flex-col items-center justify-center gap-3 rounded-md border-2 border-primary bg-primary p-5 text-center text-primary-foreground shadow-md md:order-none"
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
                      "focus-ring group min-h-40 rounded-md border bg-surface p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                      toneClass[node.tone as keyof typeof toneClass],
                      index === 0 && "lg:-translate-y-2",
                      index === 2 && "lg:-translate-y-2",
                      index === 6 && "lg:translate-y-2",
                      index === 8 && "lg:translate-y-2"
                    )}
                  >
                    <div className="flex h-full flex-col gap-5">
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex size-10 items-center justify-center rounded-md bg-white/75">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <ArrowRight className="mt-2 size-4 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-80" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[0.68rem] font-black uppercase tracking-[0.15em] opacity-75">{node.eyebrow}</p>
                        <h3 className="mt-2 text-xl font-black leading-tight text-foreground">{node.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{node.text}</p>
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

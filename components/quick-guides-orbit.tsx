import Link from "next/link";
import type { Route } from "next";
import { Bird, PawPrint, Rabbit, Squirrel } from "lucide-react";
import type { WildlifeGuide } from "@/lib/wildlife-guides";
import { cn } from "@/lib/utils";

const iconMap = {
  squirrel: Squirrel,
  rabbit: Rabbit,
  opossum: PawPrint,
  bird: Bird,
  fox: PawPrint,
  deer: PawPrint
};

const orbitPosition = [
  "left-1/2 top-[8%] -translate-x-1/2 -translate-y-1/2",
  "left-[80%] top-[20%] -translate-x-1/2 -translate-y-1/2",
  "left-[92%] top-1/2 -translate-x-1/2 -translate-y-1/2",
  "left-[80%] top-[80%] -translate-x-1/2 -translate-y-1/2",
  "left-1/2 top-[92%] -translate-x-1/2 -translate-y-1/2",
  "left-[20%] top-[80%] -translate-x-1/2 -translate-y-1/2",
  "left-[8%] top-1/2 -translate-x-1/2 -translate-y-1/2",
  "left-[20%] top-[20%] -translate-x-1/2 -translate-y-1/2"
];

export function QuickGuidesOrbit({ guides }: { guides: WildlifeGuide[] }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-2xl">
      <div className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1.5 rounded-full bg-primary text-center text-primary-foreground shadow-md sm:size-36">
        <PawPrint size={26} aria-hidden="true" />
        <span className="text-xs font-black uppercase tracking-[0.08em] sm:text-sm">Quick guides</span>
      </div>

      {guides.map((guide, index) => {
        const Icon = guide.visual.type === "icon" ? iconMap[guide.visual.icon] : null;

        return (
          <Link
            key={guide.slug}
            href={`/found-animal/${guide.slug}` as Route}
            className={cn("focus-ring group absolute flex w-20 flex-col items-center gap-2 sm:w-28", orbitPosition[index])}
          >
            <span
              className={cn(
                "flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-surface shadow-md transition group-hover:-translate-y-0.5 group-hover:shadow-lg sm:size-28",
                !Icon && "bg-cover bg-center",
                Icon && "bg-primary/10"
              )}
              style={guide.visual.type === "photo" ? { backgroundImage: `url('${guide.visual.src}')`, backgroundPosition: guide.visual.position || "center" } : undefined}
            >
              {Icon ? <Icon className="size-8 text-primary sm:size-10" aria-hidden="true" /> : null}
            </span>
            <span className="text-center text-xs font-bold leading-tight text-foreground sm:text-sm">{guide.eyebrow}</span>
          </Link>
        );
      })}
    </div>
  );
}

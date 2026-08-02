import Link from "next/link";
import type { Route } from "next";
import { Bird, PawPrint, Rabbit, Squirrel, Turtle } from "lucide-react";
import type { WildlifeGuide } from "@/lib/wildlife-guides";
import { cn } from "@/lib/utils";

const iconMap = {
  squirrel: Squirrel,
  rabbit: Rabbit,
  opossum: PawPrint,
  bird: Bird,
  fox: PawPrint,
  deer: PawPrint,
  reptile: Turtle
};

const ORBIT_RADIUS_PERCENT = 42;

export function QuickGuidesOrbit({ guides }: { guides: WildlifeGuide[] }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-2xl">
      <div className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1.5 rounded-full bg-primary text-center text-primary-foreground shadow-md sm:size-48">
        <PawPrint className="size-6 sm:size-10" aria-hidden="true" />
        <span className="text-xs font-black uppercase tracking-[0.08em] sm:text-base">Quick guides</span>
      </div>

      {guides.map((guide, index) => {
        const Icon = guide.visual.type === "icon" ? iconMap[guide.visual.icon] : null;
        const angle = -90 + (index * 360) / guides.length;
        const radians = (angle * Math.PI) / 180;
        const left = 50 + ORBIT_RADIUS_PERCENT * Math.cos(radians);
        const top = 50 + ORBIT_RADIUS_PERCENT * Math.sin(radians);

        return (
          <Link
            key={guide.slug}
            href={`/found-animal/${guide.slug}` as Route}
            className="focus-ring group absolute flex w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 sm:w-32"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <span
              className={cn(
                "flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-surface shadow-md transition group-hover:-translate-y-0.5 group-hover:shadow-lg sm:size-40",
                !Icon && "bg-cover bg-center",
                Icon && "bg-primary/10"
              )}
              style={guide.visual.type === "photo" ? { backgroundImage: `url('${guide.visual.src}')`, backgroundPosition: guide.visual.position || "center" } : undefined}
            >
              {Icon ? <Icon className="size-8 text-primary sm:size-16" aria-hidden="true" /> : null}
            </span>
            <span className="text-center text-xs font-bold leading-tight text-foreground sm:text-base">{guide.eyebrow}</span>
          </Link>
        );
      })}
    </div>
  );
}

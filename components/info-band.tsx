import { AlertTriangle } from "lucide-react";

export function WildlifeSafetyBand() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-shell flex flex-col gap-4 py-5 md:flex-row md:items-center">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-white/12">
          <AlertTriangle size={22} aria-hidden="true" />
        </span>
        <p className="text-sm leading-6 text-white/88">
          If an animal is injured, orphaned, or displaced, contact licensed or permitted help before feeding or handling. Share what you are seeing so the animal can reach appropriate wildlife care.
        </p>
      </div>
    </section>
  );
}

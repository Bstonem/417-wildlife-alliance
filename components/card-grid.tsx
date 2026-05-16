import type { LucideIcon } from "lucide-react";

type CardGridProps = {
  items: Array<{
    icon?: LucideIcon;
    title?: string;
    label?: string;
    text?: string;
    value?: string;
  }>;
};

export function CardGrid({ items }: CardGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article key={item.title || item.label} className="rounded-md border border-border bg-surface p-5 shadow-sm">
            {Icon ? (
              <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon size={22} aria-hidden="true" />
              </span>
            ) : null}
            <h2 className="mt-4 text-xl font-bold">{item.title || item.label}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text || item.value}</p>
          </article>
        );
      })}
    </div>
  );
}

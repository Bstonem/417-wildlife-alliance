import Link from "next/link";
import type { Route } from "next";
import { HeartPulse, Menu, X } from "lucide-react";
import { navItems } from "@/lib/demo-data";
import { ButtonLink } from "@/components/button-link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/92 backdrop-blur">
      <div className="container-shell flex min-h-16 items-center justify-between gap-5">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md" aria-label="417 Wildlife Alliance home">
          <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <HeartPulse size={21} aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold">417 Wildlife Alliance</span>
            <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">Wildlife help fund</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as Route}
              className="focus-ring rounded-md px-3 py-2 text-sm font-semibold text-foreground/78 transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/found-animal">Get help</ButtonLink>
          <ButtonLink href="/donate" variant="secondary">Donate</ButtonLink>
        </div>

        <details className="group relative lg:hidden">
          <summary className="focus-ring flex size-11 cursor-pointer list-none items-center justify-center rounded-md border border-border bg-surface [&::-webkit-details-marker]:hidden">
            <Menu className="group-open:hidden" size={20} aria-hidden="true" />
            <X className="hidden group-open:block" size={20} aria-hidden="true" />
            <span className="sr-only">Open navigation</span>
          </summary>
          <div className="absolute right-0 top-13 w-[min(88vw,340px)] rounded-md border border-border bg-surface p-3 shadow-lg">
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  className="focus-ring rounded-md px-3 py-3 text-sm font-semibold text-foreground/85 hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link href="/found-animal">Found an animal</Link>
              </Button>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}

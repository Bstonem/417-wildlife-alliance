import Link from "next/link";
import type { Route } from "next";
import { LogOut, ShieldCheck } from "lucide-react";
import { signOutAdmin } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { adminCards } from "@/lib/demo-data";

type AdminShellProps = {
  email: string;
  title: string;
  kicker?: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminShell({ email, title, kicker = "Admin", description, children }: AdminShellProps) {
  return (
    <section className="section">
      <div className="container-shell">
        <Card className="border-primary/20">
          <CardContent className="p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="section-kicker">{kicker}</p>
                  <span className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    <ShieldCheck size={14} aria-hidden="true" />
                    {email}
                  </span>
                </div>
                <h1 className="mt-3 text-4xl font-black">{title}</h1>
                {description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
              </div>
              <form action={signOutAdmin}>
                <Button type="submit" variant="outline">
                  <LogOut aria-hidden="true" />
                  Sign out
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <nav className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Admin sections">
          <Link href={"/admin" as Route} className="focus-ring shrink-0 rounded-md border border-border bg-surface px-3 py-2 text-sm font-bold shadow-sm hover:bg-muted">
            Dashboard
          </Link>
          {adminCards.map((card) => (
            <Link key={card.href} href={card.href as Route} className="focus-ring shrink-0 rounded-md border border-border bg-surface px-3 py-2 text-sm font-bold shadow-sm hover:bg-muted">
              {card.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

type StatCardProps = {
  label: string;
  value: string | number;
  detail?: string;
};

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        <p className="mt-3 text-3xl font-black">{value}</p>
        {detail ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}

export function AdminNotice({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <Card className="mb-5 border-clay/25 bg-clay/10">
      <CardContent className="p-4 text-sm font-semibold text-clay-strong">{message}</CardContent>
    </Card>
  );
}

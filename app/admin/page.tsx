import Link from "next/link";
import type { Route } from "next";
import { LockKeyhole } from "lucide-react";
import { adminCards } from "@/lib/demo-data";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <section className="section">
      <div className="container-shell">
        <Card>
          <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="section-kicker">Admin</p>
              <h1 className="mt-3 text-4xl font-black">Operations dashboard</h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
                This private area is reserved for case triage, directory review, partner follow-up, and donation operations. Enable protected team access before private records appear here.
              </p>
            </div>
            <span className="flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
              <LockKeyhole size={24} aria-hidden="true" />
            </span>
          </div>
          </CardHeader>
        </Card>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {adminCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.href} className="transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <Link href={card.href as Route} className="focus-ring block rounded-md">
                  <CardHeader>
                    <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <CardTitle>{card.label}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

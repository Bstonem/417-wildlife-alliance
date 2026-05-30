import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { adminCards } from "@/lib/demo-data";
import { AdminNotice, AdminShell, StatCard } from "@/components/admin/admin-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Admin",
  description: "Private operations pages for 417 Wildlife Alliance.",
  path: "/admin",
  noIndex: true
});

function currency(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

async function getDashboardData() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const [
    cases,
    newCases,
    routedCases,
    rehabbers,
    inbox,
    partnerApps,
    donations,
    support,
    recentCases
  ] = await Promise.all([
    supabase.from("animal_cases").select("id", { count: "exact", head: true }),
    supabase.from("animal_cases").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("animal_cases").select("id", { count: "exact", head: true }).not("assigned_rehabber_id", "is", null),
    supabase.from("rehabbers").select("id", { count: "exact", head: true }).eq("published", true),
    supabase.from("signups").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("partner_applications").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("donations").select("amount, frequency, status"),
    supabase.from("rehabber_support_disbursements").select("amount, status"),
    supabase
      .from("animal_cases")
      .select("id, public_case_number, animal_type, county, status, immediate_danger, visible_injury, created_at")
      .order("created_at", { ascending: false })
      .limit(5)
  ]);

  const paidDonations = donations.data?.filter((donation) => donation.status === "paid") || [];
  const plannedSupport = support.data || [];

  return {
    totalCases: cases.count || 0,
    newCases: newCases.count || 0,
    routedCases: routedCases.count || 0,
    publishedRehabbers: rehabbers.count || 0,
    openInbox: (inbox.count || 0) + (partnerApps.count || 0),
    totalDonations: paidDonations.reduce((sum, donation) => sum + (donation.amount || 0), 0),
    monthlyDonors: paidDonations.filter((donation) => donation.frequency === "monthly").length,
    rehabberSupport: plannedSupport.reduce((sum, item) => sum + (item.amount || 0), 0),
    recentCases: recentCases.data || []
  };
}

export default async function AdminPage() {
  const session = await requireAdmin("/admin");
  const data = await getDashboardData();

  return (
    <AdminShell
      email={session.email}
      title="Operations dashboard"
      description="Triage animal requests, manage public content, keep rehabber support visible, and turn real outcomes into donor-facing updates."
    >
      <AdminNotice message={!data ? "Supabase service-role access is not configured, so private records cannot be loaded yet." : undefined} />

      {data ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Animal requests" value={data.totalCases} detail={`${data.newCases} new, ${data.routedCases} routed to a rehabber`} />
          <StatCard label="Open inbox" value={data.openInbox} detail="New contact messages and partner leads" />
          <StatCard label="Donation total" value={currency(data.totalDonations)} detail={`${data.monthlyDonors} monthly donation records`} />
          <StatCard label="Rehabber support" value={currency(data.rehabberSupport)} detail={`${data.publishedRehabbers} public rehabber listings`} />
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.href} className="transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <Link href={card.href as Route} className="focus-ring block h-full rounded-md">
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

      {data?.recentCases.length ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent animal requests</CardTitle>
            <CardDescription>Newest submitted cases that may need triage or routing.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {data.recentCases.map((animalCase) => (
              <Link
                href={"/admin/cases" as Route}
                key={animalCase.id}
                className="focus-ring flex flex-col gap-2 rounded-md border border-border bg-surface p-4 text-sm hover:bg-muted md:flex-row md:items-center md:justify-between"
              >
                <span>
                  <strong>{animalCase.public_case_number}</strong> · {animalCase.animal_type}
                  {animalCase.county ? ` · ${animalCase.county}` : ""}
                </span>
                <span className="inline-flex items-center gap-2 font-bold text-primary">
                  {animalCase.status}
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </AdminShell>
  );
}

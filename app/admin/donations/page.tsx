import type { Metadata } from "next";
import { createSupportDisbursement } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { AdminNotice, AdminShell, StatCard } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Donations Admin",
  description: "Private donation operations for 417 Wildlife Alliance.",
  path: "/admin/donations",
  noIndex: true
});

function currency(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

async function getDonationsData() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const [donations, support, rehabbers, cases] = await Promise.all([
    supabase.from("donations").select("*").order("created_at", { ascending: false }).limit(50),
    supabase
      .from("rehabber_support_disbursements")
      .select("*, rehabbers(display_name), animal_cases(public_case_number)")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase.from("rehabbers").select("id, display_name").order("display_name"),
    supabase.from("animal_cases").select("id, public_case_number, animal_type").order("created_at", { ascending: false }).limit(50)
  ]);

  return {
    donations: donations.data || [],
    support: support.data || [],
    rehabbers: rehabbers.data || [],
    cases: cases.data || []
  };
}

export default async function AdminDonationsPage() {
  const session = await requireAdmin("/admin/donations");
  const data = await getDonationsData();
  const donations = data?.donations || [];
  const support = data?.support || [];
  const paidDonations = donations.filter((donation) => donation.status === "paid");

  return (
    <AdminShell
      email={session.email}
      title="Donations"
      description="Track gifts, recurring supporters, and the support sent back to rehabbers for supplies, transport, medical care, and emergency needs."
    >
      <AdminNotice message={!data ? "Supabase service-role access is not configured, so donation records cannot be loaded yet." : undefined} />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Paid donations" value={currency(paidDonations.reduce((sum, donation) => sum + (donation.amount || 0), 0))} detail={`${paidDonations.length} paid records`} />
        <StatCard label="Monthly records" value={paidDonations.filter((donation) => donation.frequency === "monthly").length} detail="Stripe subscription checkouts" />
        <StatCard label="Support ledger" value={currency(support.reduce((sum, item) => sum + (item.amount || 0), 0))} detail={`${support.length} rehabber support entries`} />
        <StatCard label="Planned support" value={support.filter((item) => item.status === "planned").length} detail="Pending disbursement decisions" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="self-start">
          <CardHeader>
            <CardTitle>Log rehabber support</CardTitle>
            <CardDescription>Use this to show where donor dollars are going.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createSupportDisbursement} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" name="amount" type="number" min="0.01" step="0.01" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Input id="purpose" name="purpose" placeholder="Formula, medication, transport, enclosure repair" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rehabber_id">Rehabber</Label>
                <select id="rehabber_id" name="rehabber_id" className="focus-ring h-11 rounded-md border border-input bg-white px-3 text-sm shadow-sm">
                  <option value="">Unassigned</option>
                  {data?.rehabbers.map((rehabber) => (
                    <option key={rehabber.id} value={rehabber.id}>
                      {rehabber.display_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="animal_case_id">Related case</Label>
                <select id="animal_case_id" name="animal_case_id" className="focus-ring h-11 rounded-md border border-input bg-white px-3 text-sm shadow-sm">
                  <option value="">No case</option>
                  {data?.cases.map((animalCase) => (
                    <option key={animalCase.id} value={animalCase.id}>
                      {animalCase.public_case_number} · {animalCase.animal_type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" className="focus-ring h-11 rounded-md border border-input bg-white px-3 text-sm shadow-sm" defaultValue="planned">
                  <option value="planned">planned</option>
                  <option value="approved">approved</option>
                  <option value="paid">paid</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" />
              </div>
              <Button type="submit">Log support</Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent donations</CardTitle>
              <CardDescription>Stripe checkout records written from the webhook.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {donations.map((donation) => (
                <div key={donation.id} className="rounded-md border border-border bg-surface p-4 text-sm leading-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong>{currency(donation.amount || 0)}</strong>
                    <Badge variant={donation.status === "paid" ? "default" : "secondary"}>{donation.status}</Badge>
                  </div>
                  <p className="text-muted-foreground">{donation.donor_email || "Anonymous donor"} · {donation.frequency}</p>
                  {donation.fund_preference ? <p className="text-muted-foreground">{donation.fund_preference}</p> : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rehabber support ledger</CardTitle>
              <CardDescription>Internal record of planned or paid support to rehabbers.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {support.map((item) => (
                <div key={item.id} className="rounded-md border border-border bg-surface p-4 text-sm leading-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong>{currency(item.amount || 0)} · {item.purpose}</strong>
                    <Badge variant={item.status === "paid" ? "default" : "secondary"}>{item.status}</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {item.rehabbers?.display_name || "No rehabber selected"}
                    {item.animal_cases?.public_case_number ? ` · ${item.animal_cases.public_case_number}` : ""}
                  </p>
                  {item.notes ? <p className="mt-2 text-muted-foreground">{item.notes}</p> : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}

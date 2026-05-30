import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { updateAnimalCaseStatus } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { AdminNotice, AdminShell, StatCard } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Animal Help Requests Admin",
  description: "Private animal help request operations for 417 Wildlife Alliance.",
  path: "/admin/cases",
  noIndex: true
});

const caseStatuses = ["new", "reviewing", "contacted", "routed", "monitoring", "closed"];

async function getCasesData() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const [cases, rehabbers] = await Promise.all([
    supabase
      .from("animal_cases")
      .select("id, public_case_number, finder_name, finder_phone, finder_email, preferred_contact_method, animal_type, approximate_age, condition, description, location_text, county, currently_contained, immediate_danger, visible_injury, displacement_context, consent_to_share, status, assigned_rehabber_id, internal_notes, created_at")
      .order("created_at", { ascending: false })
      .limit(40),
    supabase.from("rehabbers").select("id, display_name").order("display_name")
  ]);

  return {
    cases: cases.data || [],
    rehabbers: rehabbers.data || []
  };
}

export default async function AdminCasesPage() {
  const session = await requireAdmin("/admin/cases");
  const data = await getCasesData();
  const cases = data?.cases || [];

  return (
    <AdminShell
      email={session.email}
      title="Animal help requests"
      description="Review submitted wildlife details, prioritize urgent cases, assign rehabber follow-up, and keep internal notes private."
    >
      <AdminNotice message={!data ? "Supabase service-role access is not configured, so animal cases cannot be loaded yet." : undefined} />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Visible cases" value={cases.length} detail="Showing the most recent 40 requests" />
        <StatCard label="Immediate danger" value={cases.filter((item) => item.immediate_danger).length} detail="Needs fast safety review" />
        <StatCard label="Visible injury" value={cases.filter((item) => item.visible_injury).length} detail="Likely needs qualified care" />
      </div>

      <div className="mt-8 grid gap-5">
        {cases.map((animalCase) => (
          <Card key={animalCase.id} className={animalCase.immediate_danger ? "border-clay/35" : undefined}>
            <CardHeader>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={animalCase.immediate_danger ? "clay" : "secondary"}>{animalCase.status}</Badge>
                    {animalCase.visible_injury ? <Badge variant="clay">Visible injury</Badge> : null}
                    {animalCase.currently_contained ? <Badge variant="blue">Contained</Badge> : null}
                    {animalCase.consent_to_share ? <Badge variant="outline">Story consent</Badge> : null}
                  </div>
                  <CardTitle className="mt-3">
                    {animalCase.public_case_number} · {animalCase.animal_type}
                  </CardTitle>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {animalCase.county ? `${animalCase.county} · ` : ""}
                    {animalCase.location_text}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                  {animalCase.immediate_danger ? <AlertTriangle size={17} aria-hidden="true" /> : <CheckCircle2 size={17} aria-hidden="true" />}
                  {new Date(animalCase.created_at).toLocaleString()}
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-5 lg:grid-cols-[1fr_0.88fr]">
              <div className="grid gap-4 text-sm leading-6">
                <div>
                  <p className="font-bold">Finder</p>
                  <p className="text-muted-foreground">
                    {animalCase.finder_name} · {animalCase.finder_email || "No email"} · {animalCase.finder_phone || "No phone"} · Prefers {animalCase.preferred_contact_method}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Condition</p>
                  <p className="text-muted-foreground">{animalCase.condition}</p>
                </div>
                <div>
                  <p className="font-bold">Description</p>
                  <p className="text-muted-foreground">{animalCase.description}</p>
                </div>
                {animalCase.displacement_context ? (
                  <div>
                    <p className="font-bold">Context</p>
                    <p className="text-muted-foreground">{animalCase.displacement_context}</p>
                  </div>
                ) : null}
              </div>

              <form action={updateAnimalCaseStatus} className="grid gap-4 rounded-md border border-border bg-muted/50 p-4">
                <input type="hidden" name="id" value={animalCase.id} />
                <div className="grid gap-2">
                  <Label htmlFor={`status-${animalCase.id}`}>Status</Label>
                  <select
                    id={`status-${animalCase.id}`}
                    name="status"
                    defaultValue={animalCase.status}
                    className="focus-ring h-11 rounded-md border border-input bg-white px-3 text-sm shadow-sm"
                  >
                    {caseStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`rehabber-${animalCase.id}`}>Assigned rehabber</Label>
                  <select
                    id={`rehabber-${animalCase.id}`}
                    name="assigned_rehabber_id"
                    defaultValue={animalCase.assigned_rehabber_id || ""}
                    className="focus-ring h-11 rounded-md border border-input bg-white px-3 text-sm shadow-sm"
                  >
                    <option value="">Unassigned</option>
                    {data?.rehabbers.map((rehabber) => (
                      <option key={rehabber.id} value={rehabber.id}>
                        {rehabber.display_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`notes-${animalCase.id}`}>Internal notes</Label>
                  <Textarea id={`notes-${animalCase.id}`} name="internal_notes" defaultValue={animalCase.internal_notes || ""} />
                </div>
                <Button type="submit">Update case</Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}

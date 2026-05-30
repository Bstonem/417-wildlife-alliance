import type { Metadata } from "next";
import { createImpactUpdate, createRehabberFollowup } from "@/app/admin/actions";
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
  title: "Impact Loop Admin",
  description: "Private impact tracking for 417 Wildlife Alliance.",
  path: "/admin/impact",
  noIndex: true
});

async function getImpactData() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const [updates, followups, rehabbers, cases] = await Promise.all([
    supabase
      .from("animal_case_updates")
      .select("*, rehabbers(display_name), animal_cases(public_case_number, animal_type)")
      .order("occurred_at", { ascending: false })
      .limit(50),
    supabase
      .from("rehabber_followups")
      .select("*, rehabbers(display_name), animal_cases(public_case_number)")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase.from("rehabbers").select("id, display_name").order("display_name"),
    supabase.from("animal_cases").select("id, public_case_number, animal_type").order("created_at", { ascending: false }).limit(50)
  ]);

  return {
    updates: updates.data || [],
    followups: followups.data || [],
    rehabbers: rehabbers.data || [],
    cases: cases.data || []
  };
}

export default async function AdminImpactPage() {
  const session = await requireAdmin("/admin/impact");
  const data = await getImpactData();
  const updates = data?.updates || [];
  const followups = data?.followups || [];

  return (
    <AdminShell
      email={session.email}
      title="Impact loop"
      description="Collect outcome notes, milestone updates, follow-up requests, and donor-shareable stories from rehabbers."
    >
      <AdminNotice message={!data ? "Supabase service-role access is not configured, so impact records cannot be loaded yet." : undefined} />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Updates" value={updates.length} detail="Animal milestones and story notes" />
        <StatCard label="Shareable" value={updates.filter((item) => item.donor_shareable).length} detail="Approved for donor-facing content" />
        <StatCard label="Open follow-ups" value={followups.filter((item) => item.status === "open").length} detail="Rehabber check-ins to complete" />
        <StatCard label="Published" value={updates.filter((item) => item.status === "published").length} detail="Visible through public read policy" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add animal update</CardTitle>
            <CardDescription>Use rehabber feedback to build donor-visible impact stories.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createImpactUpdate} className="grid gap-4">
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
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="milestone">Milestone</Label>
                <Input id="milestone" name="milestone" placeholder="Intake, stabilized, released, transferred" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="update_text">Update</Label>
                <Textarea id="update_text" name="update_text" className="min-h-40" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="photo_storage_path">Photo path</Label>
                <Input id="photo_storage_path" name="photo_storage_path" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" className="focus-ring h-11 rounded-md border border-input bg-white px-3 text-sm shadow-sm" defaultValue="draft">
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" name="donor_shareable" className="size-4 rounded border-input" />
                Donor-shareable
              </label>
              <Button type="submit">Save update</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create follow-up</CardTitle>
            <CardDescription>Track requests for outcome notes, photos, or milestone details from rehabbers.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createRehabberFollowup} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="followup-rehabber">Rehabber</Label>
                <select id="followup-rehabber" name="rehabber_id" className="focus-ring h-11 rounded-md border border-input bg-white px-3 text-sm shadow-sm">
                  <option value="">Unassigned</option>
                  {data?.rehabbers.map((rehabber) => (
                    <option key={rehabber.id} value={rehabber.id}>
                      {rehabber.display_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="followup-case">Related case</Label>
                <select id="followup-case" name="animal_case_id" className="focus-ring h-11 rounded-md border border-input bg-white px-3 text-sm shadow-sm">
                  <option value="">No case</option>
                  {data?.cases.map((animalCase) => (
                    <option key={animalCase.id} value={animalCase.id}>
                      {animalCase.public_case_number} · {animalCase.animal_type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" className="min-h-40" required />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="contact_method">Method</Label>
                  <Input id="contact_method" name="contact_method" placeholder="email, text, phone" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="due_at">Due date</Label>
                  <Input id="due_at" name="due_at" type="datetime-local" />
                </div>
              </div>
              <Button type="submit">Create follow-up</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Impact updates</CardTitle>
            <CardDescription>Milestones that can become donor updates or public stories.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {updates.map((update) => (
              <div key={update.id} className="rounded-md border border-border bg-surface p-4 text-sm leading-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong>{update.title}</strong>
                  <Badge variant={update.status === "published" ? "default" : "secondary"}>{update.status}</Badge>
                </div>
                <p className="text-muted-foreground">
                  {update.animal_cases?.public_case_number || "No case"}
                  {update.rehabbers?.display_name ? ` · ${update.rehabbers.display_name}` : ""}
                  {update.milestone ? ` · ${update.milestone}` : ""}
                </p>
                <p className="mt-2 text-muted-foreground">{update.update_text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Follow-ups</CardTitle>
            <CardDescription>Open loops with rehabbers for photos, updates, and outcomes.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {followups.map((followup) => (
              <div key={followup.id} className="rounded-md border border-border bg-surface p-4 text-sm leading-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong>{followup.subject}</strong>
                  <Badge variant={followup.status === "open" ? "clay" : "secondary"}>{followup.status}</Badge>
                </div>
                <p className="text-muted-foreground">
                  {followup.rehabbers?.display_name || "No rehabber"}
                  {followup.animal_cases?.public_case_number ? ` · ${followup.animal_cases.public_case_number}` : ""}
                </p>
                <p className="mt-2 text-muted-foreground">{followup.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

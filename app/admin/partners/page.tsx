import type { Metadata } from "next";
import { createPartner } from "@/app/admin/actions";
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
  title: "Partners Admin",
  description: "Private partner and certification operations for 417 Wildlife Alliance.",
  path: "/admin/partners",
  noIndex: true
});

async function getPartnersData() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const [partners, applications, certifiedApplications] = await Promise.all([
    supabase.from("partners").select("*").order("created_at", { ascending: false }),
    supabase.from("partner_applications").select("*").order("created_at", { ascending: false }).limit(20),
    supabase.from("certified_company_applications").select("*").order("created_at", { ascending: false }).limit(20)
  ]);

  return {
    partners: partners.data || [],
    applications: applications.data || [],
    certifiedApplications: certifiedApplications.data || []
  };
}

export default async function AdminPartnersPage() {
  const session = await requireAdmin("/admin/partners");
  const data = await getPartnersData();
  const partners = data?.partners || [];
  const applications = data?.applications || [];
  const certifiedApplications = data?.certifiedApplications || [];

  return (
    <AdminShell
      email={session.email}
      title="Partners and certifications"
      description="Turn sponsor interest and Wildlife Compassionate Company applications into public partner listings."
    >
      <AdminNotice message={!data ? "Supabase service-role access is not configured, so partner records cannot be loaded yet." : undefined} />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Public partners" value={partners.filter((item) => item.published).length} detail={`${partners.length} total partner records`} />
        <StatCard label="Partner leads" value={applications.filter((item) => item.status === "new").length} detail="New partnership applications" />
        <StatCard label="Certification leads" value={certifiedApplications.filter((item) => item.status === "new").length} detail="Wildlife-aware company applicants" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="self-start">
          <CardHeader>
            <CardTitle>Add public partner</CardTitle>
            <CardDescription>Use this after a sponsor, clinic, school, or business is approved for public recognition.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createPartner} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Partner name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="partner_type">Partner type</Label>
                <Input id="partner_type" name="partner_type" placeholder="Sponsor, clinic, tree care, school" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website_url">Website</Label>
                <Input id="website_url" name="website_url" type="url" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="public_description">Public description</Label>
                <Textarea id="public_description" name="public_description" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="county">County</Label>
                  <Input id="county" name="county" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sponsor_tier">Sponsor tier</Label>
                  <Input id="sponsor_tier" name="sponsor_tier" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" name="certified" className="size-4 rounded border-input" />
                Certified company
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" name="published" className="size-4 rounded border-input" />
                Publish partner
              </label>
              <Button type="submit">Add partner</Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent partner leads</CardTitle>
              <CardDescription>Messages from the public partner application form.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {applications.map((application) => (
                <div key={application.id} className="rounded-md border border-border bg-surface p-4 text-sm leading-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong>{application.company_name}</strong>
                    <Badge variant={application.status === "new" ? "clay" : "secondary"}>{application.status}</Badge>
                  </div>
                  <p className="text-muted-foreground">{application.contact_name} · {application.contact_email}</p>
                  <p className="text-muted-foreground">{application.partner_type}{application.county ? ` · ${application.county}` : ""}</p>
                  {application.message ? <p className="mt-2 text-muted-foreground">{application.message}</p> : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certification leads</CardTitle>
              <CardDescription>Businesses asking about Wildlife Compassionate Company recognition.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {certifiedApplications.map((application) => (
                <div key={application.id} className="rounded-md border border-border bg-surface p-4 text-sm leading-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong>{application.company_name}</strong>
                    <Badge variant={application.status === "new" ? "clay" : "secondary"}>{application.status}</Badge>
                  </div>
                  <p className="text-muted-foreground">{application.contact_name} · {application.contact_email}</p>
                  <p className="text-muted-foreground">{application.company_type}{application.county ? ` · ${application.county}` : ""}</p>
                  {application.wildlife_scenarios ? <p className="mt-2 text-muted-foreground">{application.wildlife_scenarios}</p> : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Approved partners</CardTitle>
              <CardDescription>Public recognition records managed by the team.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {partners.map((partner) => (
                <div key={partner.id} className="rounded-md border border-border bg-surface p-4 text-sm leading-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong>{partner.name}</strong>
                    <Badge variant={partner.published ? "default" : "secondary"}>{partner.published ? "Published" : "Private"}</Badge>
                  </div>
                  <p className="text-muted-foreground">{partner.partner_type}{partner.sponsor_tier ? ` · ${partner.sponsor_tier}` : ""}</p>
                  {partner.public_description ? <p className="mt-2 text-muted-foreground">{partner.public_description}</p> : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}

import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { AdminNotice, AdminShell, StatCard } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Inbox Admin",
  description: "Private inbox for 417 Wildlife Alliance messages and inquiries.",
  path: "/admin/inbox",
  noIndex: true
});

async function getInboxData() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const [signups, partnerApplications, certifiedApplications] = await Promise.all([
    supabase.from("signups").select("*").order("created_at", { ascending: false }).limit(40),
    supabase.from("partner_applications").select("*").order("created_at", { ascending: false }).limit(25),
    supabase.from("certified_company_applications").select("*").order("created_at", { ascending: false }).limit(25)
  ]);

  return {
    signups: signups.data || [],
    partnerApplications: partnerApplications.data || [],
    certifiedApplications: certifiedApplications.data || []
  };
}

export default async function AdminInboxPage() {
  const session = await requireAdmin("/admin/inbox");
  const data = await getInboxData();
  const signups = data?.signups || [];
  const partnerApplications = data?.partnerApplications || [];
  const certifiedApplications = data?.certifiedApplications || [];

  return (
    <AdminShell
      email={session.email}
      title="Inbox"
      description="Review contact messages, volunteer interest, partner leads, and certified company inquiries from one protected place."
    >
      <AdminNotice message={!data ? "Supabase service-role access is not configured, so inbox records cannot be loaded yet." : undefined} />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Messages" value={signups.length} detail={`${signups.filter((item) => item.status === "new").length} new`} />
        <StatCard label="Partner leads" value={partnerApplications.length} detail={`${partnerApplications.filter((item) => item.status === "new").length} new`} />
        <StatCard label="Certification leads" value={certifiedApplications.length} detail={`${certifiedApplications.filter((item) => item.status === "new").length} new`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Messages and signups</CardTitle>
            <CardDescription>Contact form, volunteer, rehabber, and general interest submissions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {signups.map((message) => (
              <div key={message.id} className="rounded-md border border-border bg-surface p-4 text-sm leading-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong>{message.name}</strong>
                  <Badge variant={message.status === "new" ? "clay" : "secondary"}>{message.status}</Badge>
                </div>
                <p className="text-muted-foreground">{message.signup_type} · {message.email}</p>
                {message.phone ? <p className="text-muted-foreground">{message.phone}</p> : null}
                {message.message ? <p className="mt-2 text-muted-foreground">{message.message}</p> : null}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partner applications</CardTitle>
            <CardDescription>Sponsors and organizations asking to support the network.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {partnerApplications.map((application) => (
              <div key={application.id} className="rounded-md border border-border bg-surface p-4 text-sm leading-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong>{application.company_name}</strong>
                  <Badge variant={application.status === "new" ? "clay" : "secondary"}>{application.status}</Badge>
                </div>
                <p className="text-muted-foreground">{application.contact_name} · {application.contact_email}</p>
                <p className="text-muted-foreground">{application.partner_type}</p>
                {application.message ? <p className="mt-2 text-muted-foreground">{application.message}</p> : null}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certified company inquiries</CardTitle>
            <CardDescription>Tree care, landscaping, and field-service teams interested in training.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {certifiedApplications.map((application) => (
              <div key={application.id} className="rounded-md border border-border bg-surface p-4 text-sm leading-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong>{application.company_name}</strong>
                  <Badge variant={application.status === "new" ? "clay" : "secondary"}>{application.status}</Badge>
                </div>
                <p className="text-muted-foreground">{application.contact_name} · {application.contact_email}</p>
                <p className="text-muted-foreground">{application.company_type}</p>
                {application.wildlife_scenarios ? <p className="mt-2 text-muted-foreground">{application.wildlife_scenarios}</p> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}

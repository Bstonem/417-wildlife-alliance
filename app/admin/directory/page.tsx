import type { Metadata } from "next";
import { approveRehabberListing, createRehabber } from "@/app/admin/actions";
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
  title: "Directory Management Admin",
  description: "Private directory management operations for 417 Wildlife Alliance.",
  path: "/admin/directory",
  noIndex: true
});

async function getDirectoryData() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const { data } = await supabase
    .from("rehabbers")
    .select(
      "id, display_name, organization_name, service_area_text, species_groups, intake_status, accepts_public_contact, public_email, public_phone, website_url, permit_status, published, created_at, rehabber_private_details(license_storage_path, license_content_type, internal_notes)"
    )
    .order("display_name");

  if (!data) {
    return [];
  }

  return Promise.all(
    data.map(async (rehabber) => {
      const details = Array.isArray(rehabber.rehabber_private_details)
        ? rehabber.rehabber_private_details[0]
        : rehabber.rehabber_private_details;

      let licenseUrl: string | null = null;

      if (details?.license_storage_path) {
        const { data: signed } = await supabase.storage
          .from("rehabber-license-documents")
          .createSignedUrl(details.license_storage_path, 300);
        licenseUrl = signed?.signedUrl || null;
      }

      return {
        ...rehabber,
        internalNotes: details?.internal_notes ?? null,
        licenseUrl
      };
    })
  );
}

type AdminDirectoryPageProps = {
  searchParams: Promise<{
    error?: string;
    created?: string;
    updated?: string;
  }>;
};

export default async function AdminDirectoryPage({ searchParams }: AdminDirectoryPageProps) {
  const params = await searchParams;
  const session = await requireAdmin("/admin/directory");
  const rehabbers = await getDirectoryData();
  const listings = rehabbers || [];

  return (
    <AdminShell
      email={session.email}
      title="Directory management"
      description="Add approved rehabbers manually, review public contact settings, and control which listings appear on the public directory."
    >
      <AdminNotice message={!rehabbers ? "Supabase service-role access is not configured, so directory records cannot be loaded yet." : undefined} />

      {params.error ? (
        <div className="mb-5 rounded-md border border-clay/25 bg-clay/10 p-4 text-sm font-semibold text-clay-strong">
          {decodeURIComponent(params.error)}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total records" value={listings.length} detail="Rehabbers and routing resources" />
        <StatCard label="Published" value={listings.filter((item) => item.published).length} detail="Visible on the public directory" />
        <StatCard label="Public contact" value={listings.filter((item) => item.accepts_public_contact).length} detail="Approved to show contact details" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="self-start">
          <CardHeader>
            <CardTitle>Add rehabber</CardTitle>
            <CardDescription>New records stay private unless published is checked.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createRehabber} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="display_name">Display name</Label>
                <Input id="display_name" name="display_name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="organization_name">Organization</Label>
                <Input id="organization_name" name="organization_name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service_area_text">Service area</Label>
                <Input id="service_area_text" name="service_area_text" placeholder="Springfield, Greene County, Christian County" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="species_groups">Species groups</Label>
                <Input id="species_groups" name="species_groups" placeholder="Squirrels, Rabbits, Opossums" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="public_email">Public email</Label>
                  <Input id="public_email" name="public_email" type="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="public_phone">Public phone</Label>
                  <Input id="public_phone" name="public_phone" />
                  <p className="text-xs text-muted-foreground">Required if &quot;Public contact approved&quot; is checked below.</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="website_url">Website</Label>
                  <Input id="website_url" name="website_url" type="url" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="social_media_url">Social media page</Label>
                  <Input id="social_media_url" name="social_media_url" type="url" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes_public">Public notes</Label>
                <Textarea id="notes_public" name="notes_public" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="intake_status">Intake status</Label>
                <Input id="intake_status" name="intake_status" placeholder="Accepting calls, limited intake, referral only" />
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" name="accepts_public_contact" className="size-4 rounded border-input" />
                Public contact approved
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" name="published" className="size-4 rounded border-input" />
                Publish listing
              </label>
              <Button type="submit">Add rehabber</Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {listings.map((rehabber) => (
            <Card key={rehabber.id}>
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle>{rehabber.display_name}</CardTitle>
                    <CardDescription>{rehabber.organization_name || rehabber.service_area_text}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={rehabber.published ? "default" : "secondary"}>{rehabber.published ? "Published" : "Private"}</Badge>
                    <Badge variant={rehabber.accepts_public_contact ? "blue" : "outline"}>{rehabber.accepts_public_contact ? "Public contact" : "No public contact"}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm leading-6 text-muted-foreground">
                <p>{rehabber.service_area_text}</p>
                <p>{rehabber.species_groups?.length ? rehabber.species_groups.join(", ") : "Species not set"}</p>
                <p>{rehabber.intake_status}</p>
                <p>{[rehabber.public_email, rehabber.public_phone, rehabber.website_url].filter(Boolean).join(" · ") || "No public contact details"}</p>

                {!rehabber.published ? (
                  <form action={approveRehabberListing} className="mt-3 grid gap-3 border-t border-border pt-3">
                    <input type="hidden" name="id" value={rehabber.id} />
                    {rehabber.licenseUrl ? (
                      <a
                        href={rehabber.licenseUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring w-fit text-sm font-bold text-primary underline underline-offset-2"
                      >
                        View uploaded license
                      </a>
                    ) : (
                      <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">No license on file</p>
                    )}
                    <div className="grid gap-2">
                      <Label htmlFor={`permit_status-${rehabber.id}`}>Permit status</Label>
                      <Input
                        id={`permit_status-${rehabber.id}`}
                        name="permit_status"
                        defaultValue={rehabber.permit_status ?? ""}
                        placeholder="Missouri Class I permit #, verified"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`internal_notes-${rehabber.id}`}>Internal notes</Label>
                      <Textarea
                        id={`internal_notes-${rehabber.id}`}
                        name="internal_notes"
                        defaultValue={rehabber.internalNotes ?? ""}
                        rows={2}
                      />
                    </div>
                    <Button type="submit" size="sm" className="w-fit">
                      Approve &amp; publish
                    </Button>
                  </form>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

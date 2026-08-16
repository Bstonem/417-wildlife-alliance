import type { Metadata } from "next";
import { requireRehabber } from "@/lib/rehabber-auth";
import { getOrClaimOwnRehabberListing } from "@/lib/rehabber-account";
import { updateOwnRehabberListing, setRehabberPassword, signOutRehabber } from "@/app/rehabbers/actions";
import { LicenseReuploadForm } from "@/components/forms/license-reupload-form";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AccountPageProps = {
  searchParams: Promise<{
    error?: string;
    updated?: string;
    submitted?: string;
    password?: string;
  }>;
};

export const metadata: Metadata = createMetadata({
  title: "Manage Your Listing",
  description: "Update your public 417 Wildlife Alliance directory listing.",
  path: "/rehabbers/account",
  noIndex: true
});

export default async function RehabberAccountPage({ searchParams }: AccountPageProps) {
  const params = await searchParams;
  const session = await requireRehabber("/rehabbers/account");
  const result = await getOrClaimOwnRehabberListing(session.userId, session.email);

  if (result.status !== "linked") {
    const messages: Record<Exclude<typeof result.status, "linked">, string> = {
      not_found:
        "We couldn't find a directory listing matching your email. If you're new, create your listing below, or contact us for help.",
      ambiguous:
        "We found more than one listing that could match your email. Please contact us so we can connect your account safely.",
      error: result.status === "error" ? result.message : "Something went wrong loading your listing."
    };

    return (
      <section className="section">
        <div className="container-shell max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>Manage your listing</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm leading-6 text-muted-foreground">
              <p>{messages[result.status]}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <a href="/rehabbers/signup">Create your listing</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/contact">Contact us</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const rehabber = result.rehabber;

  return (
    <section className="section">
      <div className="container-shell max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-kicker">Rehabbers</p>
            <h1 className="mt-2 text-3xl font-black">Manage your listing</h1>
            <p className="mt-2 text-sm text-muted-foreground">Signed in as {session.email}</p>
          </div>
          <form action={signOutRehabber}>
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </div>

        {params.error ? (
          <div className="mb-5 rounded-md border border-clay/25 bg-clay/10 p-4 text-sm font-semibold text-clay-strong">
            {decodeURIComponent(params.error)}
          </div>
        ) : null}
        {params.updated ? (
          <div className="mb-5 rounded-md border border-primary/25 bg-primary/10 p-4 text-sm font-semibold text-primary">
            Your listing has been updated.
          </div>
        ) : null}
        {params.submitted ? (
          <div className="mb-5 rounded-md border border-primary/25 bg-primary/10 p-4 text-sm font-semibold text-primary">
            Your listing has been submitted and is awaiting admin review.
          </div>
        ) : null}
        {params.password ? (
          <div className="mb-5 rounded-md border border-primary/25 bg-primary/10 p-4 text-sm font-semibold text-primary">
            Your password has been set. You can now sign in with your email and password.
          </div>
        ) : null}
        {!rehabber.published ? (
          <div className="mb-5 rounded-md border border-clay/25 bg-clay/10 p-4 text-sm leading-6 text-clay-strong">
            Pending admin review. Your listing is not visible on the public directory yet, but you can still update it below.
          </div>
        ) : null}

        <Card>
          <CardContent className="p-6">
            <form action={updateOwnRehabberListing} className="grid gap-6">
              <Tabs defaultValue="contact">
                <TabsList>
                  <TabsTrigger value="contact">Contact &amp; Website</TabsTrigger>
                  <TabsTrigger value="service">Service Area &amp; Species</TabsTrigger>
                  <TabsTrigger value="availability">Availability &amp; Status</TabsTrigger>
                </TabsList>

                <TabsContent value="contact" forceMount className="grid gap-4 data-[state=inactive]:hidden">
                  <div className="grid gap-2">
                    <Label htmlFor="display_name">Display name</Label>
                    <Input id="display_name" name="display_name" defaultValue={rehabber.display_name} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="organization_name">Organization</Label>
                    <Input id="organization_name" name="organization_name" defaultValue={rehabber.organization_name ?? ""} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="public_email">Public email</Label>
                      <Input id="public_email" name="public_email" type="email" defaultValue={rehabber.public_email ?? ""} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="public_phone">Public phone</Label>
                      <Input id="public_phone" name="public_phone" defaultValue={rehabber.public_phone ?? ""} />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="website_url">Website (optional)</Label>
                      <Input id="website_url" name="website_url" type="url" defaultValue={rehabber.website_url ?? ""} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="social_media_url">Social media page (optional)</Label>
                      <Input id="social_media_url" name="social_media_url" type="url" defaultValue={rehabber.social_media_url ?? ""} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="service" forceMount className="grid gap-4 data-[state=inactive]:hidden">
                  <div className="grid gap-2">
                    <Label htmlFor="service_area_text">Service area</Label>
                    <Input id="service_area_text" name="service_area_text" defaultValue={rehabber.service_area_text} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="public_location_text">General location</Label>
                    <Input id="public_location_text" name="public_location_text" defaultValue={rehabber.public_location_text ?? ""} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="species_groups">Species groups</Label>
                    <Input
                      id="species_groups"
                      name="species_groups"
                      placeholder="Squirrels, Rabbits, Opossums"
                      defaultValue={rehabber.species_groups?.join(", ") ?? ""}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="availability" forceMount className="grid gap-4 data-[state=inactive]:hidden">
                  <div className="grid gap-2">
                    <Label htmlFor="intake_status">Intake status</Label>
                    <Input
                      id="intake_status"
                      name="intake_status"
                      defaultValue={rehabber.intake_status}
                      placeholder="Accepting calls, limited intake, referral only"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes_public">Public notes</Label>
                    <Textarea id="notes_public" name="notes_public" defaultValue={rehabber.notes_public ?? ""} />
                  </div>
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <input
                      type="checkbox"
                      name="accepts_public_contact"
                      className="size-4 rounded border-input"
                      defaultChecked={rehabber.accepts_public_contact}
                    />
                    Public contact approved
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <input
                      type="checkbox"
                      name="accepts_texts"
                      className="size-4 rounded border-input"
                      defaultChecked={rehabber.accepts_texts}
                    />
                    Accepts texts
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <input
                      type="checkbox"
                      name="accepts_dropoffs"
                      className="size-4 rounded border-input"
                      defaultChecked={rehabber.accepts_dropoffs}
                    />
                    Accepts drop-offs
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <input
                      type="checkbox"
                      name="transport_available"
                      className="size-4 rounded border-input"
                      defaultChecked={rehabber.transport_available}
                    />
                    Transport available
                  </label>
                </TabsContent>
              </Tabs>

              <Button type="submit">Save changes</Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>License or permit document</CardTitle>
              <CardDescription>Upload a new file anytime — useful if your first upload was unclear or your permit was renewed.</CardDescription>
            </CardHeader>
            <CardContent>
              <LicenseReuploadForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Set a password</CardTitle>
              <CardDescription>Optional. Once set, you can sign in with a password instead of a fresh email link each time.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={setRehabberPassword} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">New password</Label>
                  <Input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm_password">Confirm password</Label>
                  <Input id="confirm_password" name="confirm_password" type="password" autoComplete="new-password" minLength={8} required />
                </div>
                <Button type="submit" variant="secondary" className="w-fit">
                  Set password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

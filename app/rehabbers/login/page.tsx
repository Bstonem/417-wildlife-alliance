import type { Metadata } from "next";
import type { Route } from "next";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { sendRehabberMagicLink } from "@/app/rehabbers/actions";
import { getRehabberSession } from "@/lib/rehabber-auth";
import { hasSupabaseAuthConfig } from "@/lib/supabase-session";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
    sent?: string;
  }>;
};

export const metadata: Metadata = createMetadata({
  title: "Rehabber Login",
  description: "Sign in to manage your 417 Wildlife Alliance directory listing.",
  path: "/rehabbers/login",
  noIndex: true
});

export default async function RehabberLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const session = await getRehabberSession();
  const safeNext = params.next?.startsWith("/rehabbers") ? params.next : "/rehabbers/account";

  if (session) {
    redirect(safeNext as Route);
  }

  const configured = hasSupabaseAuthConfig();

  return (
    <section className="section">
      <div className="container-shell max-w-xl">
        <Card className="border-primary/20">
          <CardHeader>
            <span className="flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
              <LockKeyhole size={24} aria-hidden="true" />
            </span>
            <p className="section-kicker mt-4">Rehabbers</p>
            <CardTitle className="text-3xl">Manage your listing</CardTitle>
          </CardHeader>
          <CardContent>
            {!configured ? (
              <div className="mb-5 rounded-md border border-clay/25 bg-clay/10 p-4 text-sm leading-6 text-clay-strong">
                Sign-in isn&apos;t configured yet. Contact 417 Wildlife Alliance directly to update your listing.
              </div>
            ) : null}

            {params.error ? (
              <div className="mb-5 rounded-md border border-clay/25 bg-clay/10 p-4 text-sm font-semibold text-clay-strong">
                That link didn&apos;t work. Please request a new one.
              </div>
            ) : null}

            {params.sent === "magic" ? (
              <div className="mb-5 rounded-md border border-primary/25 bg-primary/10 p-4 text-sm font-semibold text-primary">
                Check your email for a secure sign-in link.
              </div>
            ) : null}

            <form action={sendRehabberMagicLink} className="grid gap-4">
              <input type="hidden" name="next" value={safeNext} />
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <Button type="submit" className="w-full" disabled={!configured}>
                Send sign-in link
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

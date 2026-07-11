import type { Metadata } from "next";
import type { Route } from "next";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { sendAdminMagicLink, signInAdmin } from "@/app/admin/actions";
import { getAdminSession, hasAdminAllowlist } from "@/lib/admin-auth";
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
  title: "Admin Login",
  description: "Private admin login for 417 Wildlife Alliance.",
  path: "/admin/login",
  noIndex: true
});

function getErrorMessage(error?: string) {
  if (error === "invalid") {
    return "That email or password did not work.";
  }

  if (error === "unauthorized") {
    return "That account is not allowed to access this admin.";
  }

  return error || null;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const session = await getAdminSession();

  if (session) {
    redirect((params.next?.startsWith("/admin") ? params.next : "/admin") as Route);
  }

  const configured = hasSupabaseAuthConfig() && hasAdminAllowlist();
  const errorMessage = getErrorMessage(params.error);
  const safeNext = params.next?.startsWith("/admin") ? params.next : "/admin";

  return (
    <section className="section">
      <div className="container-shell max-w-xl">
        <Card className="border-primary/20">
          <CardHeader>
            <span className="flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
              <LockKeyhole size={24} aria-hidden="true" />
            </span>
            <p className="section-kicker mt-4">Admin</p>
            <CardTitle className="text-3xl">Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            {!configured ? (
              <div className="mb-5 rounded-md border border-clay/25 bg-clay/10 p-4 text-sm leading-6 text-clay-strong">
                Admin login needs Supabase auth keys and `ADMIN_EMAILS` in the environment before private records can be viewed.
              </div>
            ) : null}

            {errorMessage ? (
              <div className="mb-5 rounded-md border border-clay/25 bg-clay/10 p-4 text-sm font-semibold text-clay-strong">
                {errorMessage}
              </div>
            ) : null}

            {params.sent === "magic" ? (
              <div className="mb-5 rounded-md border border-primary/25 bg-primary/10 p-4 text-sm font-semibold text-primary">
                Check your email for a secure admin sign-in link.
              </div>
            ) : null}

            <form action={signInAdmin} className="grid gap-4">
              <input type="hidden" name="next" value={safeNext} />
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" autoComplete="current-password" required />
              </div>
              <Button type="submit" className="w-full" disabled={!configured}>
                Sign in
              </Button>
            </form>

            <form action={sendAdminMagicLink} className="mt-5 grid gap-4 border-t border-border pt-5">
              <input type="hidden" name="next" value={safeNext} />
              <div className="grid gap-2">
                <Label htmlFor="magic-email">Email link</Label>
                <Input id="magic-email" name="email" type="email" autoComplete="email" required />
              </div>
              <Button type="submit" variant="outline" className="w-full" disabled={!configured}>
                Send magic link
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import type { Route } from "next";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { sendRehabberMagicLink, signInRehabberWithPassword, signUpRehabberWithPassword } from "@/app/rehabbers/actions";
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

function getErrorMessage(error?: string) {
  if (error === "invalid") {
    return "That email or password did not work.";
  }

  return error || null;
}

export default async function RehabberLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const session = await getRehabberSession();
  const safeNext = params.next?.startsWith("/rehabbers") ? params.next : "/rehabbers/account";

  if (session) {
    redirect(safeNext as Route);
  }

  const configured = hasSupabaseAuthConfig();
  const errorMessage = getErrorMessage(params.error);

  return (
    <section className="section">
      <div className="container-shell grid max-w-xl gap-6">
        {!configured ? (
          <div className="rounded-md border border-clay/25 bg-clay/10 p-4 text-sm leading-6 text-clay-strong">
            Sign-in isn&apos;t configured yet. Contact 417 Wildlife Alliance directly to update your listing.
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-md border border-clay/25 bg-clay/10 p-4 text-sm font-semibold text-clay-strong">
            {errorMessage}
          </div>
        ) : null}

        {params.sent === "magic" ? (
          <div className="rounded-md border border-primary/25 bg-primary/10 p-4 text-sm font-semibold text-primary">
            Check your email for a secure sign-in link.
          </div>
        ) : null}

        {params.sent === "confirm" ? (
          <div className="rounded-md border border-primary/25 bg-primary/10 p-4 text-sm font-semibold text-primary">
            Check your email to confirm your new account, then come back and sign in.
          </div>
        ) : null}

        <Card className="border-primary/20">
          <CardHeader>
            <span className="flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
              <LockKeyhole size={24} aria-hidden="true" />
            </span>
            <p className="section-kicker mt-4">New here?</p>
            <CardTitle className="text-3xl">Create your account</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={signUpRehabberWithPassword} className="grid gap-4">
              <input type="hidden" name="next" value={safeNext} />
              <div className="grid gap-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" name="password" type="password" autoComplete="new-password" minLength={8} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-confirm-password">Confirm password</Label>
                <Input id="signup-confirm-password" name="confirm_password" type="password" autoComplete="new-password" minLength={8} required />
              </div>
              <Button type="submit" className="w-full" disabled={!configured}>
                Create account
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="section-kicker">Already have an account?</p>
            <CardTitle className="text-2xl">Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={signInRehabberWithPassword} className="grid gap-4">
              <input type="hidden" name="next" value={safeNext} />
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" autoComplete="current-password" required />
              </div>
              <Button type="submit" className="w-full" variant="secondary" disabled={!configured}>
                Sign in
              </Button>
            </form>

            <form action={sendRehabberMagicLink} className="mt-5 grid gap-4 border-t border-border pt-5">
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

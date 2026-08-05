import "server-only";

import type { Route } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient, hasSupabaseAuthConfig } from "@/lib/supabase-session";

export type RehabberSession = {
  userId: string;
  email: string;
};

export async function getRehabberSession(): Promise<RehabberSession | null> {
  if (!hasSupabaseAuthConfig()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return null;
  }

  const emailClaim = data.claims.email;
  const subClaim = data.claims.sub;
  const email = typeof emailClaim === "string" ? emailClaim.toLowerCase() : "";
  const userId = typeof subClaim === "string" ? subClaim : "";

  if (!email || !userId) {
    return null;
  }

  return { userId, email };
}

export async function requireRehabber(nextPath = "/rehabbers/account") {
  const session = await getRehabberSession();

  if (!session) {
    redirect(`/rehabbers/login?next=${encodeURIComponent(nextPath)}` as Route);
  }

  return session;
}

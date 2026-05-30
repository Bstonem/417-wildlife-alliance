import "server-only";

import type { Route } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient, hasSupabaseAuthConfig } from "@/lib/supabase-session";

type AdminSession = {
  email: string;
  role: string;
};

export function getAllowedAdminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(/[,\s]+/)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function hasAdminAllowlist() {
  return getAllowedAdminEmails().length > 0;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  if (!hasSupabaseAuthConfig()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return null;
  }

  const emailClaim = data.claims.email;
  const email = typeof emailClaim === "string" ? emailClaim.toLowerCase() : "";

  if (!email || !getAllowedAdminEmails().includes(email)) {
    return null;
  }

  const roleClaim = data.claims.role;

  return {
    email,
    role: typeof roleClaim === "string" ? roleClaim : "authenticated"
  };
}

export async function requireAdmin(nextPath = "/admin") {
  const session = await getAdminSession();

  if (!session) {
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}` as Route);
  }

  return session;
}

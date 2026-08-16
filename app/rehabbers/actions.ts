"use server";

import { revalidatePath } from "next/cache";
import type { Route } from "next";
import { redirect } from "next/navigation";
import { createSupabaseServerClient, hasSupabaseAuthConfig } from "@/lib/supabase-session";
import { requireRehabber } from "@/lib/rehabber-auth";
import { asBoolean, asOptionalString, getSiteUrl } from "@/lib/utils";
import { rehabberSelfServiceSchema } from "@/lib/validation";

function cleanList(value: FormDataEntryValue | null) {
  return asOptionalString(value)
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean) || [];
}

function safeRehabberNext(value: FormDataEntryValue | null) {
  const next = asOptionalString(value);
  return next?.startsWith("/rehabbers") ? next : "/rehabbers/account";
}

function rehabberRedirect(path: string): never {
  redirect(path as Route);
}

export async function sendRehabberMagicLink(formData: FormData) {
  const email = (asOptionalString(formData.get("email")) || "").toLowerCase();
  const next = safeRehabberNext(formData.get("next"));

  if (!email || !hasSupabaseAuthConfig()) {
    rehabberRedirect(`/rehabbers/login?error=invalid&next=${encodeURIComponent(next)}`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(next)}`,
      shouldCreateUser: true
    }
  });

  if (error) {
    rehabberRedirect(`/rehabbers/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`);
  }

  rehabberRedirect(`/rehabbers/login?sent=magic&next=${encodeURIComponent(next)}`);
}

export async function signInRehabberWithPassword(formData: FormData) {
  const email = (asOptionalString(formData.get("email")) || "").toLowerCase();
  const password = asOptionalString(formData.get("password")) || "";
  const next = safeRehabberNext(formData.get("next"));

  if (!email || !password) {
    rehabberRedirect(`/rehabbers/login?error=invalid&next=${encodeURIComponent(next)}`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    rehabberRedirect(`/rehabbers/login?error=invalid&next=${encodeURIComponent(next)}`);
  }

  rehabberRedirect(next);
}

export async function setRehabberPassword(formData: FormData) {
  await requireRehabber("/rehabbers/account");
  const password = asOptionalString(formData.get("password")) || "";
  const confirmPassword = asOptionalString(formData.get("confirm_password")) || "";

  if (password.length < 8) {
    rehabberRedirect("/rehabbers/account?error=Password%20must%20be%20at%20least%208%20characters.");
  }

  if (password !== confirmPassword) {
    rehabberRedirect("/rehabbers/account?error=Passwords%20do%20not%20match.");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    rehabberRedirect(`/rehabbers/account?error=${encodeURIComponent(error.message)}`);
  }

  rehabberRedirect("/rehabbers/account?password=1");
}

export async function signOutRehabber() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/rehabbers/account");
  rehabberRedirect("/rehabbers/login");
}

export async function updateOwnRehabberListing(formData: FormData) {
  const session = await requireRehabber("/rehabbers/account");
  const supabase = await createSupabaseServerClient();

  const parsed = rehabberSelfServiceSchema.safeParse({
    display_name: asOptionalString(formData.get("display_name")) || "",
    organization_name: asOptionalString(formData.get("organization_name")),
    public_email: asOptionalString(formData.get("public_email")) || "",
    public_phone: asOptionalString(formData.get("public_phone")),
    website_url: asOptionalString(formData.get("website_url")) || "",
    social_media_url: asOptionalString(formData.get("social_media_url")) || "",
    service_area_text: asOptionalString(formData.get("service_area_text")) || "",
    public_location_text: asOptionalString(formData.get("public_location_text")),
    species_groups: cleanList(formData.get("species_groups")),
    accepts_public_contact: asBoolean(formData.get("accepts_public_contact")),
    accepts_texts: asBoolean(formData.get("accepts_texts")),
    accepts_dropoffs: asBoolean(formData.get("accepts_dropoffs")),
    transport_available: asBoolean(formData.get("transport_available")),
    intake_status: asOptionalString(formData.get("intake_status")) || "unknown",
    notes_public: asOptionalString(formData.get("notes_public"))
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message || "Please check the form and try again.";
    rehabberRedirect(`/rehabbers/account?error=${encodeURIComponent(message)}`);
  }

  const { data, error } = await supabase
    .from("rehabbers")
    .update({
      ...parsed.data,
      public_email: parsed.data.public_email || null,
      website_url: parsed.data.website_url || null,
      social_media_url: parsed.data.social_media_url || null,
      updated_at: new Date().toISOString()
    })
    .eq("user_id", session.userId)
    .select("id")
    .maybeSingle();

  if (error) {
    rehabberRedirect(`/rehabbers/account?error=${encodeURIComponent(error.message)}`);
  }

  if (!data) {
    rehabberRedirect("/rehabbers/account?error=No%20linked%20listing%20was%20found%20for%20your%20account.");
  }

  revalidatePath("/rehabbers/account");
  revalidatePath("/directory");
  rehabberRedirect("/rehabbers/account?updated=1");
}

"use server";

import { revalidatePath } from "next/cache";
import type { Route } from "next";
import { redirect } from "next/navigation";
import { getAllowedAdminEmails, requireAdmin } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase-session";
import { getSupabaseAdmin } from "@/lib/supabase";
import { asBoolean, asOptionalString, getSiteUrl, slugify } from "@/lib/utils";

function getAdminClient() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    throw new Error("Supabase service role is not configured.");
  }

  return supabase;
}

function adminRedirect(path: string): never {
  redirect(path as Route);
}

function cleanList(value: FormDataEntryValue | null) {
  return asOptionalString(value)
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean) || [];
}

function getRequiredString(formData: FormData, name: string) {
  const value = asOptionalString(formData.get(name));

  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

function parseDollarsToCents(value: FormDataEntryValue | null) {
  const amount = Number(asOptionalString(value) || "0");
  return Number.isFinite(amount) ? Math.round(amount * 100) : 0;
}

function safeAdminNext(value: FormDataEntryValue | null) {
  const next = asOptionalString(value);
  return next?.startsWith("/admin") ? next : "/admin";
}

export async function signInAdmin(formData: FormData) {
  const email = getRequiredString(formData, "email").toLowerCase();
  const password = getRequiredString(formData, "password");
  const next = safeAdminNext(formData.get("next"));
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    adminRedirect(`/admin/login?error=invalid&next=${encodeURIComponent(next)}`);
  }

  revalidatePath("/admin", "layout");
  adminRedirect(next);
}

export async function sendAdminMagicLink(formData: FormData) {
  const email = getRequiredString(formData, "email").toLowerCase();
  const next = safeAdminNext(formData.get("next"));

  if (!getAllowedAdminEmails().includes(email)) {
    adminRedirect(`/admin/login?error=unauthorized&next=${encodeURIComponent(next)}`);
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
    adminRedirect(`/admin/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`);
  }

  adminRedirect(`/admin/login?sent=magic&next=${encodeURIComponent(next)}`);
}

export async function signOutAdmin() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/admin", "layout");
  adminRedirect("/admin/login");
}

export async function createRehabber(formData: FormData) {
  await requireAdmin("/admin/directory");
  const supabase = getAdminClient();
  const displayName = getRequiredString(formData, "display_name");
  const publicSlug = slugify(asOptionalString(formData.get("public_slug")) || displayName);

  const { error } = await supabase.from("rehabbers").insert({
    display_name: displayName,
    public_slug: publicSlug,
    organization_name: asOptionalString(formData.get("organization_name")),
    public_email: asOptionalString(formData.get("public_email")),
    public_phone: asOptionalString(formData.get("public_phone")),
    website_url: asOptionalString(formData.get("website_url")),
    service_area_text: getRequiredString(formData, "service_area_text"),
    public_location_text: asOptionalString(formData.get("public_location_text")),
    species_groups: cleanList(formData.get("species_groups")),
    permit_status: asOptionalString(formData.get("permit_status")),
    accepts_public_contact: asBoolean(formData.get("accepts_public_contact")),
    accepts_texts: asBoolean(formData.get("accepts_texts")),
    accepts_dropoffs: asBoolean(formData.get("accepts_dropoffs")),
    transport_available: asBoolean(formData.get("transport_available")),
    intake_status: asOptionalString(formData.get("intake_status")) || "unknown",
    notes_public: asOptionalString(formData.get("notes_public")),
    published: asBoolean(formData.get("published"))
  });

  if (error) {
    adminRedirect(`/admin/directory?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/directory");
  revalidatePath("/directory");
  adminRedirect("/admin/directory?created=rehabber");
}

export async function updateAnimalCaseStatus(formData: FormData) {
  await requireAdmin("/admin/cases");
  const supabase = getAdminClient();
  const id = getRequiredString(formData, "id");

  const { error } = await supabase
    .from("animal_cases")
    .update({
      status: getRequiredString(formData, "status"),
      assigned_rehabber_id: asOptionalString(formData.get("assigned_rehabber_id")) || null,
      internal_notes: asOptionalString(formData.get("internal_notes")),
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) {
    adminRedirect(`/admin/cases?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/cases");
  revalidatePath("/admin");
  adminRedirect("/admin/cases?updated=case");
}

export async function createPartner(formData: FormData) {
  await requireAdmin("/admin/partners");
  const supabase = getAdminClient();
  const name = getRequiredString(formData, "name");

  const { error } = await supabase.from("partners").insert({
    name,
    public_slug: slugify(asOptionalString(formData.get("public_slug")) || name),
    partner_type: getRequiredString(formData, "partner_type"),
    website_url: asOptionalString(formData.get("website_url")),
    public_description: asOptionalString(formData.get("public_description")),
    county: asOptionalString(formData.get("county")),
    sponsor_tier: asOptionalString(formData.get("sponsor_tier")),
    certified: asBoolean(formData.get("certified")),
    published: asBoolean(formData.get("published"))
  });

  if (error) {
    adminRedirect(`/admin/partners?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/partners");
  revalidatePath("/partners");
  adminRedirect("/admin/partners?created=partner");
}

export async function createPost(formData: FormData) {
  await requireAdmin("/admin/stories");
  const supabase = getAdminClient();
  const title = getRequiredString(formData, "title");
  const status = asOptionalString(formData.get("status")) || "draft";

  const { error } = await supabase.from("posts").insert({
    title,
    slug: slugify(asOptionalString(formData.get("slug")) || title),
    summary: getRequiredString(formData, "summary"),
    body: getRequiredString(formData, "body"),
    category: asOptionalString(formData.get("category")) || "Impact",
    location: asOptionalString(formData.get("location")),
    cover_image_path: asOptionalString(formData.get("cover_image_path")),
    status,
    published_at: status === "published" ? new Date().toISOString() : null
  });

  if (error) {
    adminRedirect(`/admin/stories?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/stories");
  revalidatePath("/stories");
  adminRedirect("/admin/stories?created=story");
}

export async function createMerchProduct(formData: FormData) {
  await requireAdmin("/admin/merch");
  const supabase = getAdminClient();
  const name = getRequiredString(formData, "name");

  const { error } = await supabase.from("merch_products").insert({
    name,
    slug: slugify(asOptionalString(formData.get("slug")) || name),
    description: getRequiredString(formData, "description"),
    price: parseDollarsToCents(formData.get("price")),
    currency: "usd",
    image_path: asOptionalString(formData.get("image_path")),
    external_url: asOptionalString(formData.get("external_url")),
    inventory_status: asOptionalString(formData.get("inventory_status")) || "coming_soon",
    status: asOptionalString(formData.get("status")) || "draft",
    published: asBoolean(formData.get("published"))
  });

  if (error) {
    adminRedirect(`/admin/merch?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/merch");
  revalidatePath("/merch");
  adminRedirect("/admin/merch?created=product");
}

export async function createSupportDisbursement(formData: FormData) {
  await requireAdmin("/admin/donations");
  const supabase = getAdminClient();
  const amount = parseDollarsToCents(formData.get("amount"));

  if (amount <= 0) {
    adminRedirect("/admin/donations?error=Amount%20must%20be%20greater%20than%20zero.");
  }

  const { error } = await supabase.from("rehabber_support_disbursements").insert({
    rehabber_id: asOptionalString(formData.get("rehabber_id")) || null,
    animal_case_id: asOptionalString(formData.get("animal_case_id")) || null,
    amount,
    currency: "usd",
    purpose: getRequiredString(formData, "purpose"),
    status: asOptionalString(formData.get("status")) || "planned",
    notes: asOptionalString(formData.get("notes")),
    paid_at: asOptionalString(formData.get("paid_at")) || null
  });

  if (error) {
    adminRedirect(`/admin/donations?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/donations");
  revalidatePath("/admin");
  adminRedirect("/admin/donations?created=support");
}

export async function createImpactUpdate(formData: FormData) {
  await requireAdmin("/admin/impact");
  const supabase = getAdminClient();
  const status = asOptionalString(formData.get("status")) || "draft";

  const { error } = await supabase.from("animal_case_updates").insert({
    animal_case_id: asOptionalString(formData.get("animal_case_id")) || null,
    rehabber_id: asOptionalString(formData.get("rehabber_id")) || null,
    title: getRequiredString(formData, "title"),
    milestone: asOptionalString(formData.get("milestone")),
    update_text: getRequiredString(formData, "update_text"),
    photo_storage_path: asOptionalString(formData.get("photo_storage_path")),
    donor_shareable: asBoolean(formData.get("donor_shareable")),
    status,
    occurred_at: asOptionalString(formData.get("occurred_at")) || new Date().toISOString()
  });

  if (error) {
    adminRedirect(`/admin/impact?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/impact");
  revalidatePath("/stories");
  adminRedirect("/admin/impact?created=update");
}

export async function createRehabberFollowup(formData: FormData) {
  await requireAdmin("/admin/impact");
  const supabase = getAdminClient();

  const { error } = await supabase.from("rehabber_followups").insert({
    rehabber_id: asOptionalString(formData.get("rehabber_id")) || null,
    animal_case_id: asOptionalString(formData.get("animal_case_id")) || null,
    contact_method: asOptionalString(formData.get("contact_method")) || "email",
    subject: getRequiredString(formData, "subject"),
    message: getRequiredString(formData, "message"),
    status: asOptionalString(formData.get("status")) || "open",
    due_at: asOptionalString(formData.get("due_at")) || null
  });

  if (error) {
    adminRedirect(`/admin/impact?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/impact");
  adminRedirect("/admin/impact?created=followup");
}

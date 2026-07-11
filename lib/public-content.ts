import "server-only";

import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";

export async function getPublishedPosts() {
  const supabase = getSupabaseAdmin();

  if (!hasSupabaseAdminConfig() || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, summary, body, category, location, cover_image_path, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return error ? [] : data || [];
}

export async function getPublishedPost(slug: string) {
  const supabase = getSupabaseAdmin();

  if (!hasSupabaseAdminConfig() || !supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, summary, body, category, location, cover_image_path, published_at")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  return error ? null : data;
}

export async function getPublishedPartners() {
  const supabase = getSupabaseAdmin();

  if (!hasSupabaseAdminConfig() || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("partners")
    .select("id, name, public_slug, partner_type, website_url, public_description, county, sponsor_tier, certified")
    .eq("published", true)
    .order("name");

  return error ? [] : data || [];
}

export async function getPublishedMerchProducts() {
  const supabase = getSupabaseAdmin();

  if (!hasSupabaseAdminConfig() || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("merch_products")
    .select("id, name, slug, description, price, currency, image_path, external_url, inventory_status")
    .eq("published", true)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return error ? [] : data || [];
}

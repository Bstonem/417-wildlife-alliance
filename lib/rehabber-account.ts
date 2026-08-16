import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-session";

const OWN_LISTING_FIELDS =
  "id, display_name, organization_name, public_email, public_phone, website_url, social_media_url, service_area_text, public_location_text, species_groups, accepts_public_contact, accepts_texts, accepts_dropoffs, transport_available, intake_status, notes_public, published";

export type OwnRehabberListing = {
  id: string;
  display_name: string;
  organization_name: string | null;
  public_email: string | null;
  public_phone: string | null;
  website_url: string | null;
  social_media_url: string | null;
  service_area_text: string;
  public_location_text: string | null;
  species_groups: string[];
  accepts_public_contact: boolean;
  accepts_texts: boolean;
  accepts_dropoffs: boolean;
  transport_available: boolean;
  intake_status: string;
  notes_public: string | null;
  published: boolean;
};

export type OwnListingResult =
  | { status: "linked"; rehabber: OwnRehabberListing }
  | { status: "not_found" }
  | { status: "ambiguous" }
  | { status: "error"; message: string };

export async function getOrClaimOwnRehabberListing(userId: string, email: string): Promise<OwnListingResult> {
  const supabase = await createSupabaseServerClient();

  const { data: owned, error: ownedError } = await supabase
    .from("rehabbers")
    .select(OWN_LISTING_FIELDS)
    .eq("user_id", userId)
    .maybeSingle();

  if (ownedError) {
    return { status: "error", message: ownedError.message };
  }

  if (owned) {
    return { status: "linked", rehabber: owned as OwnRehabberListing };
  }

  const admin = getSupabaseAdmin();

  if (!admin) {
    return { status: "error", message: "Supabase service role is not configured." };
  }

  const { data: unclaimed, error: unclaimedError } = await admin
    .from("rehabbers")
    .select("id, public_email")
    .is("user_id", null);

  if (unclaimedError) {
    return { status: "error", message: unclaimedError.message };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const candidates = (unclaimed || []).filter(
    (row) => row.public_email && row.public_email.trim().toLowerCase() === normalizedEmail
  );

  if (candidates.length === 0) {
    return { status: "not_found" };
  }

  if (candidates.length > 1) {
    return { status: "ambiguous" };
  }

  const { error: linkError } = await admin
    .from("rehabbers")
    .update({ user_id: userId, claimed_at: new Date().toISOString() })
    .eq("id", candidates[0].id)
    .is("user_id", null);

  if (linkError) {
    return { status: "error", message: linkError.message };
  }

  const { data: linked, error: linkedReadError } = await supabase
    .from("rehabbers")
    .select(OWN_LISTING_FIELDS)
    .eq("id", candidates[0].id)
    .maybeSingle();

  if (linkedReadError || !linked) {
    return { status: "error", message: linkedReadError?.message || "Could not load the linked listing." };
  }

  return { status: "linked", rehabber: linked as OwnRehabberListing };
}

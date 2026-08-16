import { NextResponse } from "next/server";
import { notifyAdmin } from "@/lib/email";
import { getRehabberSession } from "@/lib/rehabber-auth";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";
import { rehabberSignupSchema } from "@/lib/validation";
import { asBoolean, asOptionalString, slugify } from "@/lib/utils";

const ALLOWED_LICENSE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
const MAX_LICENSE_BYTES = 8 * 1024 * 1024;

function cleanList(value: FormDataEntryValue | null) {
  return asOptionalString(value)
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean) || [];
}

export async function POST(request: Request) {
  const session = await getRehabberSession();

  if (!session) {
    return NextResponse.json({ ok: false, message: "Please sign in first." }, { status: 401 });
  }

  if (!hasSupabaseAdminConfig()) {
    return NextResponse.json(
      { ok: false, message: "Signups are not available yet. Please check back soon." },
      { status: 503 }
    );
  }

  const supabase = getSupabaseAdmin()!;

  const { data: existing, error: existingError } = await supabase
    .from("rehabbers")
    .select("id")
    .eq("user_id", session.userId)
    .maybeSingle();

  if (existingError) {
    return NextResponse.json({ ok: false, message: existingError.message }, { status: 500 });
  }

  if (existing) {
    return NextResponse.json(
      { ok: false, message: "You already have a listing. Sign in to manage it instead." },
      { status: 409 }
    );
  }

  const formData = await request.formData();

  const parsed = rehabberSignupSchema.safeParse({
    display_name: asOptionalString(formData.get("display_name")) || "",
    organization_name: asOptionalString(formData.get("organization_name")),
    public_email: asOptionalString(formData.get("public_email")) || session.email,
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
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message || "Please check the form and try again." },
      { status: 400 }
    );
  }

  const license = formData.get("license");

  if (!(license instanceof File) || license.size === 0) {
    return NextResponse.json({ ok: false, message: "Please upload your license or permit document." }, { status: 400 });
  }

  if (!ALLOWED_LICENSE_TYPES.has(license.type)) {
    return NextResponse.json(
      { ok: false, message: "Please upload a JPG, PNG, WebP, or PDF file." },
      { status: 400 }
    );
  }

  if (license.size > MAX_LICENSE_BYTES) {
    return NextResponse.json({ ok: false, message: "That file is too large. Please keep it under 8 MB." }, { status: 400 });
  }

  const baseSlug = slugify(parsed.data.display_name) || "rehabber";
  const publicSlug = `${baseSlug}-${crypto.randomUUID().slice(0, 6)}`;

  const { data: rehabber, error: insertError } = await supabase
    .from("rehabbers")
    .insert({
      ...parsed.data,
      public_email: parsed.data.public_email || null,
      website_url: parsed.data.website_url || null,
      social_media_url: parsed.data.social_media_url || null,
      public_slug: publicSlug,
      user_id: session.userId,
      published: false
    })
    .select("id, display_name")
    .single();

  if (insertError || !rehabber) {
    return NextResponse.json(
      { ok: false, message: insertError?.message || "We could not save your signup. Please try again." },
      { status: 500 }
    );
  }

  const extension = (license.name.split(".").pop() || "bin").replace(/[^a-z0-9]/gi, "").toLowerCase() || "bin";
  const storagePath = `${rehabber.id}/${crypto.randomUUID()}.${extension}`;

  const upload = await supabase.storage
    .from("rehabber-license-documents")
    .upload(storagePath, license, {
      contentType: license.type || "application/octet-stream",
      upsert: false
    });

  if (!upload.error) {
    await supabase.from("rehabber_private_details").upsert({
      rehabber_id: rehabber.id,
      license_storage_path: storagePath,
      license_content_type: license.type,
      license_uploaded_at: new Date().toISOString()
    });
  }

  await notifyAdmin({
    subject: `New rehabber signup pending review: ${rehabber.display_name}`,
    html: `<p>A new rehabber signup is ready for review.</p><p><strong>Name:</strong> ${rehabber.display_name}</p><p><strong>Service area:</strong> ${parsed.data.service_area_text}</p><p>Review it in the admin directory.</p>`
  });

  return NextResponse.json({
    ok: true,
    message: "Thank you. Your listing has been submitted and is awaiting review before it goes live."
  });
}

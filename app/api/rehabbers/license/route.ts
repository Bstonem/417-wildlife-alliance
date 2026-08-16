import { NextResponse } from "next/server";
import { getRehabberSession } from "@/lib/rehabber-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-session";

const ALLOWED_LICENSE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
const MAX_LICENSE_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await getRehabberSession();

  if (!session) {
    return NextResponse.json({ ok: false, message: "Please sign in first." }, { status: 401 });
  }

  const supabase = await createSupabaseServerClient();

  const { data: rehabber, error: rehabberError } = await supabase
    .from("rehabbers")
    .select("id")
    .eq("user_id", session.userId)
    .maybeSingle();

  if (rehabberError) {
    return NextResponse.json({ ok: false, message: rehabberError.message }, { status: 500 });
  }

  if (!rehabber) {
    return NextResponse.json({ ok: false, message: "No linked listing was found for your account." }, { status: 404 });
  }

  const admin = getSupabaseAdmin();

  if (!admin) {
    return NextResponse.json({ ok: false, message: "Uploads are not available yet. Please check back soon." }, { status: 503 });
  }

  const formData = await request.formData();
  const license = formData.get("license");

  if (!(license instanceof File) || license.size === 0) {
    return NextResponse.json({ ok: false, message: "Please choose a file to upload." }, { status: 400 });
  }

  if (!ALLOWED_LICENSE_TYPES.has(license.type)) {
    return NextResponse.json({ ok: false, message: "Please upload a JPG, PNG, WebP, or PDF file." }, { status: 400 });
  }

  if (license.size > MAX_LICENSE_BYTES) {
    return NextResponse.json({ ok: false, message: "That file is too large. Please keep it under 8 MB." }, { status: 400 });
  }

  const extension = (license.name.split(".").pop() || "bin").replace(/[^a-z0-9]/gi, "").toLowerCase() || "bin";
  const storagePath = `${rehabber.id}/${crypto.randomUUID()}.${extension}`;

  const upload = await admin.storage
    .from("rehabber-license-documents")
    .upload(storagePath, license, {
      contentType: license.type || "application/octet-stream",
      upsert: false
    });

  if (upload.error) {
    return NextResponse.json({ ok: false, message: upload.error.message }, { status: 500 });
  }

  const { error: detailsError } = await admin.from("rehabber_private_details").upsert({
    rehabber_id: rehabber.id,
    license_storage_path: storagePath,
    license_content_type: license.type,
    license_uploaded_at: new Date().toISOString()
  });

  if (detailsError) {
    return NextResponse.json({ ok: false, message: detailsError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Your updated license has been uploaded for review." });
}

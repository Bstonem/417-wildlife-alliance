import { NextResponse } from "next/server";
import { notifyAdmin } from "@/lib/email";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";
import { certifiedCompanyApplicationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = certifiedCompanyApplicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (!hasSupabaseAdminConfig() || !supabase) {
    return NextResponse.json({
      ok: true,
      configured: false,
      message: "Thank you for your interest. The team will follow up as soon as possible."
    });
  }

  const { error } = await supabase.from("certified_company_applications").insert(parsed.data);

  if (error) {
    console.error("Certified company application save failed", error);
    return NextResponse.json({ ok: false, message: "We could not submit the application right now. Please try again." }, { status: 500 });
  }

  await notifyAdmin({
    subject: `New certification lead: ${parsed.data.company_name}`,
    html: `<p>${parsed.data.company_name} wants the Wildlife Compassionate Company program.</p><p>${parsed.data.contact_name} - ${parsed.data.contact_email}</p>`
  });

  return NextResponse.json({ ok: true, configured: true, message: "Thank you. We'll be in touch." });
}

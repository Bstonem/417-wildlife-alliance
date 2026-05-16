import { NextResponse } from "next/server";
import { notifyAdmin } from "@/lib/email";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (hasSupabaseAdminConfig() && supabase) {
    await supabase.from("signups").insert({
      signup_type: "general",
      name: parsed.data.name,
      email: parsed.data.email,
      message: `${parsed.data.topic}: ${parsed.data.message}`,
      consent_to_contact: true
    });
  }

  await notifyAdmin({
    subject: `Contact: ${parsed.data.topic}`,
    html: `<p>${parsed.data.name} wrote:</p><p>${parsed.data.message}</p><p>${parsed.data.email}</p>`
  });

  return NextResponse.json({ ok: true, message: "Thank you. We'll be in touch." });
}

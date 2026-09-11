import { NextResponse } from "next/server";
import { notifyAdmin, renderFieldsHtml } from "@/lib/email";
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
    html: renderFieldsHtml([
      ["Name", parsed.data.name],
      ["Email", parsed.data.email],
      ["Topic", parsed.data.topic],
      ["Message", parsed.data.message]
    ])
  });

  return NextResponse.json({ ok: true, message: "Thank you. We'll be in touch." });
}

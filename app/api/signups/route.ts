import { NextResponse } from "next/server";
import { notifyAdmin } from "@/lib/email";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";
import { signupSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (!hasSupabaseAdminConfig() || !supabase) {
    return NextResponse.json({
      ok: true,
      configured: false,
      message: "Thank you for reaching out. The team will follow up as soon as possible."
    });
  }

  const { error } = await supabase.from("signups").insert(parsed.data);

  if (error) {
    console.error("Signup save failed", error);
    return NextResponse.json({ ok: false, message: "We could not submit your signup right now. Please try again." }, { status: 500 });
  }

  await notifyAdmin({
    subject: `New ${parsed.data.signup_type} signup`,
    html: `<p>${parsed.data.name} signed up for ${parsed.data.signup_type}.</p><p>${parsed.data.email}</p><p>${parsed.data.message || ""}</p>`
  });

  return NextResponse.json({ ok: true, configured: true, message: "Thank you. We'll be in touch." });
}

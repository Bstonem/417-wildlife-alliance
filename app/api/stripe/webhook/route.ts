import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!secret || !stripeKey) {
    return NextResponse.json({ ok: false, message: "Donation processing is unavailable right now." }, { status: 501 });
  }

  const stripe = new Stripe(stripeKey);
  const signature = (await headers()).get("stripe-signature");
  const body = await request.text();

  if (!signature) {
    return NextResponse.json({ ok: false, message: "Donation processing could not be verified." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    console.error("Donation webhook verification failed", error);
    return NextResponse.json({ ok: false, message: "Donation processing could not be verified." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const supabase = getSupabaseAdmin();

    if (supabase) {
      await supabase.from("donations").insert({
        donor_email: session.customer_details?.email || session.customer_email,
        amount: session.amount_total || 0,
        currency: session.currency || "usd",
        frequency: session.mode === "subscription" ? "monthly" : "one_time",
        fund_preference: session.metadata?.fund_preference,
        payment_provider_id: session.id,
        status: "paid"
      });
    }
  }

  return NextResponse.json({ received: true });
}

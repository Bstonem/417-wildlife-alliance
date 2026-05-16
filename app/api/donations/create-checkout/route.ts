import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSiteUrl } from "@/lib/utils";
import { donationCheckoutSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = donationCheckoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({
      ok: true,
      configured: false,
      checkoutUrl: "/donate",
      message: "Online checkout is not available yet."
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const siteUrl = getSiteUrl();
  const amountInCents = Math.round(parsed.data.amount * 100);

  const session = await stripe.checkout.sessions.create({
    mode: parsed.data.frequency === "monthly" ? "subscription" : "payment",
    customer_email: parsed.data.donor_email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: amountInCents,
          product_data: {
            name: `417 Wildlife Alliance - ${parsed.data.fund_preference || "General Fund"}`
          },
          ...(parsed.data.frequency === "monthly" ? { recurring: { interval: "month" as const } } : {})
        }
      }
    ],
    metadata: {
      fund_preference: parsed.data.fund_preference || "General Fund",
      frequency: parsed.data.frequency
    },
    success_url: `${siteUrl}/donate?success=true`,
    cancel_url: `${siteUrl}/donate?canceled=true`
  });

  return NextResponse.json({ ok: true, configured: true, checkoutUrl: session.url });
}

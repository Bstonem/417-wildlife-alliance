import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { Route } from "next";
import { requireRehabber } from "@/lib/rehabber-auth";
import { getOrClaimOwnRehabberListing } from "@/lib/rehabber-account";
import { RehabberSignupForm } from "@/components/forms/rehabber-signup-form";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Rehabber Signup",
  description: "Create your 417 Wildlife Alliance directory listing and submit your license for review.",
  path: "/rehabbers/signup",
  noIndex: true
});

export default async function RehabberSignupPage() {
  const session = await requireRehabber("/rehabbers/signup");
  const existing = await getOrClaimOwnRehabberListing(session.userId, session.email);

  if (existing.status === "linked") {
    redirect("/rehabbers/account" as Route);
  }

  return (
    <section className="section">
      <div className="container-shell max-w-3xl">
        <p className="section-kicker">Join the community</p>
        <h1 className="mt-2 text-3xl font-black">Create your listing.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Fill in your public listing details and upload your license or permit document. Your listing stays private until an admin reviews and approves it.
        </p>
        <div className="mt-8">
          <RehabberSignupForm defaultEmail={session.email} />
        </div>
      </div>
    </section>
  );
}

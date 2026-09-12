"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FormStatus } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type RehabberSignupFormProps = {
  defaultEmail?: string;
};

export function RehabberSignupForm({ defaultEmail }: RehabberSignupFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("Submitting...");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/rehabbers/signup", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      setStatus("error");
      setMessage(result.message || "Please check the form and try again.");
      return;
    }

    setStatus("success");
    setMessage(result.message || "Thank you. Your listing has been submitted for review.");

    window.setTimeout(() => {
      window.location.href = "/rehabbers/account?submitted=1";
    }, 1200);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 rounded-md border border-border bg-surface p-6 shadow-sm">
      <FormStatus status={status} message={message} />

      <div className="grid gap-4">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-muted-foreground">Contact &amp; website</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="display_name">Display name</Label>
            <Input id="display_name" name="display_name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="organization_name">Organization</Label>
            <Input id="organization_name" name="organization_name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="public_email">Public email</Label>
            <Input id="public_email" name="public_email" type="email" defaultValue={defaultEmail} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="public_phone">Public phone</Label>
            <Input id="public_phone" name="public_phone" />
            <p className="text-xs text-muted-foreground">Required if you check &quot;Public contact approved&quot; below.</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="website_url">Website (optional)</Label>
            <Input id="website_url" name="website_url" placeholder="wildlife.org" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="facebook_url">Facebook (optional)</Label>
            <Input id="facebook_url" name="facebook_url" placeholder="facebook.com/yourpage" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="instagram_url">Instagram (optional)</Label>
            <Input id="instagram_url" name="instagram_url" placeholder="instagram.com/yourhandle" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tiktok_url">TikTok (optional)</Label>
            <Input id="tiktok_url" name="tiktok_url" placeholder="tiktok.com/@yourhandle" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="linkedin_url">LinkedIn (optional)</Label>
            <Input id="linkedin_url" name="linkedin_url" placeholder="linkedin.com/company/yourcompany" />
          </div>
        </div>
        <p className="text-xs leading-5 text-muted-foreground">
          A website and social media links are all optional — you can submit without any of them. Just type the address, like &quot;wildlife.org&quot; — no need for &quot;https://&quot;.
        </p>
      </div>

      <div className="grid gap-4 border-t border-border pt-6">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-muted-foreground">Service area &amp; species</p>
        <div className="grid gap-2">
          <Label htmlFor="service_area_text">Counties or communities you serve</Label>
          <Input id="service_area_text" name="service_area_text" placeholder="Springfield, Greene County, Christian County" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="public_location_text">General location</Label>
          <Input id="public_location_text" name="public_location_text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="species_groups">Species or animal groups you accept</Label>
          <Input id="species_groups" name="species_groups" placeholder="Squirrels, Rabbits, Opossums" required />
        </div>
      </div>

      <div className="grid gap-4 border-t border-border pt-6">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-muted-foreground">Availability &amp; status</p>
        <div className="grid gap-2">
          <Label htmlFor="intake_status">Intake status</Label>
          <Input id="intake_status" name="intake_status" placeholder="Accepting calls, limited intake, referral only" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="notes_public">Public notes</Label>
          <Textarea id="notes_public" name="notes_public" rows={3} />
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" name="accepts_public_contact" className="size-4 rounded border-input" />
          Public contact approved
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" name="accepts_texts" className="size-4 rounded border-input" />
          Accepts texts
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" name="accepts_dropoffs" className="size-4 rounded border-input" />
          Accepts drop-offs
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" name="transport_available" className="size-4 rounded border-input" />
          Transport available
        </label>
      </div>

      <div className="grid gap-2 border-t border-border pt-6">
        <Label htmlFor="license">License or permit document</Label>
        <input
          id="license"
          name="license"
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          required
          className="w-full text-sm"
        />
        <p className="text-xs leading-5 text-muted-foreground">
          JPG, PNG, WebP, or PDF, up to 8 MB. Used only to verify your listing before it is published.
        </p>
      </div>

      <Button size="lg" type="submit" disabled={status === "loading"}>
        <Send size={18} aria-hidden="true" />
        Submit for review
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FormStatus } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type PartnerFormProps = {
  certified?: boolean;
};

export function PartnerForm({ certified = false }: PartnerFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("Sending...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const endpoint = certified ? "/api/certified-companies/apply" : "/api/partners/apply";
    const payload = {
      partner_type: formData.get("partner_type"),
      company_type: formData.get("company_type"),
      company_name: formData.get("company_name"),
      contact_name: formData.get("contact_name"),
      contact_email: formData.get("contact_email"),
      contact_phone: formData.get("contact_phone"),
      website_url: formData.get("website_url"),
      county: formData.get("county"),
      wildlife_scenarios: formData.get("wildlife_scenarios"),
      training_interest: true,
      message: formData.get("message")
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      setStatus("error");
      setMessage(result.message || "Please check the form and try again.");
      return;
    }

    form.reset();
    setStatus("success");
    setMessage(result.message || "Thank you. We'll be in touch.");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-md border border-border bg-surface p-5 shadow-sm">
      <FormStatus status={status} message={message} />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="company_name">Company name</Label>
          <Input id="company_name" name="company_name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact_name">Contact name</Label>
          <Input id="contact_name" name="contact_name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact_email">Contact email</Label>
          <Input id="contact_email" name="contact_email" required type="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact_phone">Contact phone</Label>
          <Input id="contact_phone" name="contact_phone" type="tel" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="website_url">Website</Label>
          <Input id="website_url" name="website_url" type="url" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="county">County</Label>
          <Input id="county" name="county" />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="partner_type">Partner type</Label>
        <Select name="partner_type" defaultValue={certified ? "tree_care" : "corporate"}>
          <SelectTrigger id="partner_type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tree_care">Tree care</SelectItem>
            <SelectItem value="veterinary">Veterinary</SelectItem>
            <SelectItem value="landscaping">Landscaping</SelectItem>
            <SelectItem value="wellness">Wellness brand</SelectItem>
            <SelectItem value="education">Education/community</SelectItem>
            <SelectItem value="corporate">Corporate sponsor</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {certified ? (
        <>
          <div className="grid gap-2">
            <Label htmlFor="company_type">Company type</Label>
            <Input id="company_type" name="company_type" required placeholder="Tree crew, landscaping, pest control, other" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="wildlife_scenarios">Wildlife scenarios your team sees</Label>
            <Textarea id="wildlife_scenarios" name="wildlife_scenarios" rows={3} />
          </div>
        </>
      ) : null}

      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={4} />
      </div>

      <Button size="lg" type="submit">
        <Send size={18} aria-hidden="true" />
        Send application
      </Button>
    </form>
  );
}

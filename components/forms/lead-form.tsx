"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FormStatus } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type LeadFormProps = {
  signupType: "newsletter" | "volunteer" | "rehabber" | "sponsor" | "partner" | "certified_company" | "general";
  title?: string;
};

export function LeadForm({ signupType, title }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("Sending...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/signups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        signup_type: signupType,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        organization_name: formData.get("organization_name"),
        county: formData.get("county"),
        message: formData.get("message"),
        consent_to_contact: true
      })
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
      {title ? <h2 className="text-2xl font-bold">{title}</h2> : null}
      <FormStatus status={status} message={message} />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${signupType}-name`}>Name</Label>
          <Input id={`${signupType}-name`} name="name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${signupType}-email`}>Email</Label>
          <Input id={`${signupType}-email`} name="email" type="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${signupType}-phone`}>Phone</Label>
          <Input id={`${signupType}-phone`} name="phone" type="tel" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`${signupType}-organization`}>Organization</Label>
          <Input id={`${signupType}-organization`} name="organization_name" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${signupType}-county`}>County / location</Label>
        <Input id={`${signupType}-county`} name="county" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${signupType}-message`}>Message</Label>
        <Textarea id={`${signupType}-message`} name="message" rows={4} />
      </div>
      <Button size="lg" type="submit">
        <Send size={18} aria-hidden="true" />
        Send
      </Button>
    </form>
  );
}

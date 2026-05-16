"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { FormStatus } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("Sending...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        topic: formData.get("topic"),
        message: formData.get("message")
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
      <h2 className="text-2xl font-bold">Send a message</h2>
      <FormStatus status={status} message={message} />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" name="name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" name="email" type="email" required />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-topic">What is this about?</Label>
        <Select name="topic" defaultValue="general">
          <SelectTrigger id="contact-topic">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="found-animal">Found-animal question</SelectItem>
            <SelectItem value="rehabber-listing">Rehabber listing or update</SelectItem>
            <SelectItem value="donation">Donation or receipt question</SelectItem>
            <SelectItem value="partner">Partner or sponsor inquiry</SelectItem>
            <SelectItem value="story">Share a story</SelectItem>
            <SelectItem value="general">General question</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea id="contact-message" name="message" required rows={5} />
      </div>
      <Button size="lg" type="submit">
        <Send size={18} aria-hidden="true" />
        Send message
      </Button>
    </form>
  );
}

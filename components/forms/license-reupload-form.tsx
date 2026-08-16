"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { FormStatus } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";

export function LicenseReuploadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("Uploading...");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/rehabbers/license", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      setStatus("error");
      setMessage(result.message || "Please try again.");
      return;
    }

    form.reset();
    setStatus("success");
    setMessage(result.message || "Your updated license has been uploaded for review.");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <FormStatus status={status} message={message} />
      <input
        name="license"
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        required
        className="w-full text-sm"
      />
      <Button type="submit" variant="secondary" className="w-fit" disabled={status === "loading"}>
        <Upload size={16} aria-hidden="true" />
        Upload new document
      </Button>
    </form>
  );
}

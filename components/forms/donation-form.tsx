"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { FormStatus } from "@/components/forms/form-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function DonationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("Opening checkout...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/donations/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: formData.get("amount"),
        frequency: formData.get("frequency"),
        fund_preference: formData.get("fund_preference"),
        donor_email: formData.get("donor_email") || undefined
      })
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      setStatus("error");
      setMessage(result.message || "Checkout could not be started.");
      return;
    }

    if (result.configured && result.checkoutUrl) {
      window.location.href = result.checkoutUrl;
      return;
    }

    setStatus("success");
    setMessage("Online checkout is not available yet. Please contact 417 Wildlife Alliance to give or sponsor the fund.");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-md border border-border bg-surface p-5 shadow-sm">
      <FormStatus status={status} message={message} />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" name="amount" type="number" min="5" defaultValue="25" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Select name="frequency" defaultValue="monthly">
            <SelectTrigger id="frequency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one_time">One-time</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="fund_preference">Where would you like your gift to help?</Label>
        <Select name="fund_preference" defaultValue="General Wildlife Rehab Fund">
          <SelectTrigger id="fund_preference">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="General Wildlife Rehab Fund">General Wildlife Rehab Fund</SelectItem>
            <SelectItem value="Formula and Feeding Supplies">Formula and Feeding Supplies</SelectItem>
            <SelectItem value="Emergency Medical Support">Emergency Medical Support</SelectItem>
            <SelectItem value="Transport Support">Transport Support</SelectItem>
            <SelectItem value="Rehabber Micro-Grants">Rehabber Micro-Grants</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="donor_email">Email for receipt</Label>
        <Input id="donor_email" name="donor_email" type="email" />
      </div>
      <Button size="lg" type="submit">
        <CreditCard size={18} aria-hidden="true" />
        Continue to donation
      </Button>
    </form>
  );
}

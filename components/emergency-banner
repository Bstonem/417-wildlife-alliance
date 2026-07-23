"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmergencyBanner() {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-b border-border bg-clay-strong text-white">
      <div className="container-shell py-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="focus-ring flex w-full flex-col items-center gap-3 rounded-md px-4 py-5 text-center transition-colors hover:bg-white/10 sm:flex-row sm:justify-between sm:text-left"
        >
          <span className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/15">
              <AlertTriangle size={26} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-2xl font-black">Have an emergency?</span>
              <span className="block text-sm text-white/85">Tap here for immediate next steps.</span>
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center justify-center rounded-md bg-white px-6 py-3 text-base font-black text-clay-strong">
            Get emergency help
          </span>
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="emergency-banner-title"
        >
          <div className="relative w-full max-w-md rounded-md border border-border bg-surface p-6 text-foreground shadow-lg">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="focus-ring absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X size={18} aria-hidden="true" />
              <span className="sr-only">Close</span>
            </button>
            <h2 id="emergency-banner-title" className="pr-6 text-xl font-black">
              Our emergency hotline is being set up
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              If a person is in danger, call 911 immediately. For an urgent wildlife situation right now, use the
              found-animal form so our team can help connect you with the right contact as quickly as possible.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/found-animal">Go to the found-animal form</Link>
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

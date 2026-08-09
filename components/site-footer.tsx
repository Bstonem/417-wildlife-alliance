import Link from "next/link";
import type { Route } from "next";

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/20 bg-[#13201d] text-white">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div>
          <p className="text-lg font-bold">417 Wildlife Alliance</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/78">
            Helping people help wildlife, and helping licensed rehabilitators keep saying yes.
          </p>
          <p className="mt-4 max-w-3xl text-xs leading-5 text-white/62">
            Wildlife guidance here is meant to help people reach licensed or permitted care. Do not feed, keep, or attempt to rehabilitate wildlife unless instructed by a qualified professional or appropriate authority.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9fc9bb]">Act</p>
          <div className="mt-3 grid gap-2 text-sm text-white/78">
            <Link href="/found-animal">Found an animal</Link>
            <Link href="/donate">Donate</Link>
            <Link href={"/how-donations-help" as Route}>How donations help</Link>
            <Link href="/partners">Partner</Link>
            <Link href={"/contact" as Route}>Contact</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9fc9bb]">Learn</p>
          <div className="mt-3 grid gap-2 text-sm text-white/78">
            <Link href="/about">Who we are</Link>
            <Link href="/directory">Find a rehabber</Link>
            <Link href={"/rehabbers" as Route}>Rehabber Portal</Link>
            <Link href={"/partners#compassionate-companies" as Route}>Compassionate companies</Link>
            <Link href="/stories">Stories</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

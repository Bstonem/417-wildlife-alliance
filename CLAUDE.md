# 417 Wildlife Alliance: instructions for Claude

This repository is the Next.js website and lightweight operations platform for 417 Wildlife Alliance. The intended owner is Matt. Help him operate it without depending on Ryan's accounts or computer.

## Start here

1. Read `README.md` and `docs/OWNER_HANDOFF.md`.
2. Run `git status --short --branch` before changing files. Preserve unrelated work.
3. Use Node 22, then run `npm ci` and `npm run dev`.
4. Copy `.env.example` to `.env.local` and have Matt enter values from accounts he owns. Never print, commit, or paste secret values into chat, issues, logs, or documentation.
5. Before committing, run `npm run typecheck` and `npm run build`.

## Architecture

- Next.js App Router, React, TypeScript, and Tailwind CSS.
- Public routes are under `app/`; shared components are under `components/`.
- Supabase provides Postgres, Auth, and private file storage. The fresh-project schema is `supabase/schema.sql`.
- Admin authentication is enforced by `proxy.ts`, `lib/supabase-proxy.ts`, `lib/supabase-session.ts`, and `lib/admin-auth.ts`.
- `ADMIN_EMAILS` is a comma-separated allowlist. A Supabase Auth user must also exist or use the magic-link bootstrap on `/admin/login`.
- Stripe donations and Resend notifications are optional. The site must degrade safely when they are absent.
- `NEXT_PUBLIC_SITE_URL` controls canonical URLs, Open Graph URLs, `robots.txt`, and `sitemap.xml`.
- Netlify build settings are in `netlify.toml`.

## Safety and quality rules

- Never use a Supabase service-role key in browser/client code. It is server-only.
- Keep admin/operational tables private and preserve row-level security.
- Do not make `/directory` indexable until real, verified directory records are connected.
- Do not edit `next-env.d.ts`; Next.js generates it.
- Do not deploy or change production environment variables unless Matt explicitly asks and the target Netlify project is confirmed as `417-wildlife-alliance`.
- Do not run `netlify deploy` until `netlify status` shows the correct project.
- Prefer small commits. Include the commands used to verify each change in the handoff summary.

## Normal workflow

```bash
git pull --ff-only
npm ci
npm run dev
# make and review changes
npm run typecheck
npm run build
git status --short
```

There is no lint or test script configured yet — `typecheck` and `build` are the only automated gates.

The authoritative ownership/setup checklist is `docs/OWNER_HANDOFF.md` (note: its GitHub-transfer step is already complete; remaining steps concern Netlify, Supabase, and the domain). Product direction is in `docs/PRD.md`; business context is in `docs/BUSINESS_PLAN.md`. `docs/GRANT_AND_PARTNER_RESEARCH.md` and `docs/SEO_AUDIT.md` hold supporting research.

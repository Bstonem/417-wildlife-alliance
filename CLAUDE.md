# 417 Wildlife Alliance: instructions for Claude

This repository is the Next.js website and lightweight operations platform for 417 Wildlife Alliance. The intended owner is Matt. Help him operate it without depending on Ryan's accounts or computer.

## Start here

1. Read `README.md` and `docs/OWNER_HANDOFF.md`.
2. Run `git status --short --branch` before changing files. Preserve unrelated work.
3. Use Node 22, then run `npm ci` and `npm run dev`.
4. Copy `.env.example` to `.env.local` and have Matt enter values from accounts he owns. Never print, commit, or paste secret values into chat, issues, logs, or documentation.
5. Before committing, run `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`.

## Architecture

- Next.js App Router, React, TypeScript, and Tailwind CSS.
- Public routes are under `app/`; shared components are under `components/`.
- Supabase provides Postgres, Auth, and private file storage. The fresh-project schema is `supabase/schema.sql`.
- Admin authentication is enforced by `proxy.ts`, `lib/supabase-proxy.ts`, `lib/supabase-session.ts`, and `lib/admin-auth.ts`.
- `ADMIN_EMAILS` is a comma-separated allowlist. A Supabase Auth user must also exist or use the magic-link bootstrap on `/admin/login`.
- Stripe donations and admin-notification emails (sent via Google Workspace SMTP, see `lib/email.ts`) are optional. The site must degrade safely when they are absent.
- `NEXT_PUBLIC_SITE_URL` controls canonical URLs, Open Graph URLs, `robots.txt`, and `sitemap.xml`. `SITE_LAUNCHED=true` turns on search indexing; it is intentionally off until launch.
- Netlify build settings are in `netlify.toml`.

## Live site

- **Production is https://417wildlifealliance.org** and deploys from GitHub `main`.
- **Never use `417-wildlife-alliance.netlify.app`.** It serves an outdated build (likely a separate, abandoned Netlify site). Do not use it for screenshots, links, QR codes, or to check what is live.
- Before claiming the live site differs from the code, search the repo (`git grep`) for what you see on the page. Compare against the code, not against older screenshots or docs.
- Dated status lines in `docs/` can go stale. If a doc conflicts with the live site or the code, trust the live site and code, and update the doc.

## Safety and quality rules

- Never use a Supabase service-role key in browser/client code. It is server-only.
- Keep admin/operational tables private and preserve row-level security.
- Do not make `/directory` indexable until real, verified directory records are connected.
- Do not edit `next-env.d.ts`; Next.js generates it.
- Do not deploy or change production environment variables unless Matt explicitly asks and the target Netlify project is confirmed as the one serving `417wildlifealliance.org` (check its Domain management; the project name alone is not proof).
- Do not run `netlify deploy` until `netlify status` shows that project. Prefer Git-connected deploys from `main`.
- Prefer small commits. Include the commands used to verify each change in the handoff summary.

## Normal workflow

```bash
git pull --ff-only
npm ci
npm run dev
# make and review changes
npm run typecheck
npm run lint
npm run test
npm run build
git status --short
```

The authoritative ownership/setup checklist is `docs/OWNER_HANDOFF.md` (GitHub transfer, Netlify, Supabase, and the domain are done; remaining items are listed there). Product direction is in `docs/PRD.md`; business context is in `docs/BUSINESS_PLAN.md`. `docs/GRANT_AND_PARTNER_RESEARCH.md` and `docs/SEO_AUDIT.md` hold supporting research.

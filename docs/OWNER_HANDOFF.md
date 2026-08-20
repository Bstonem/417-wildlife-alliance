# Owner handoff: Matt

This guide moves 417 Wildlife Alliance off Ryan's accounts and computer and into accounts Matt controls. Do not send passwords or secret keys by email or commit them to GitHub.

## What exists today

As of August 19, 2026:

- Source repository: `https://github.com/Bstonem/417-wildlife-alliance` — GitHub ownership has already transferred to Matt's account (`origin` confirmed via `git remote -v`).
- Netlify: the project is under Matt's own team (`blystonem's team`) and connected to GitHub for auto-deploy from `main`. The team has used up its monthly credits and is now running on a separate "operational credits" reserve, which Netlify explicitly does not allow spending on new production deploys — the already-published site stays live and reachable, but new deploys are blocked until the monthly credit cycle resets or the team plan is upgraded (Netlify → Usage & billing shows the exact reset date and remaining balance). No custom domain is attached yet.
- Whether Matt's Supabase environment variables (below) have been added to Netlify's own environment-variable settings is still unconfirmed — verify before assuming production has database/admin features working.
- Supabase: a new project has been created under Matt's account and `supabase/schema.sql` has been applied (including later additions — rehabber self-service accounts, license-upload storage, and the `social_media_url` column). Admin login and the rehabber signup/login flows have been verified working locally against it. The old Ryan-era Supabase project hostname no longer resolves and is not in use.
- Stripe is optional and not yet configured. Resend is optional; `RESEND_API_KEY`/`ADMIN_NOTIFICATION_EMAIL` are not yet set, so admin notification emails currently degrade safely (no error, just no email sent). Supabase Auth's own emails (magic links, signup confirmation) still use Supabase's shared, rate-limited default mailer — setting up custom SMTP is still pending and needs a domain first.
- The repository contains a complete fresh-project Supabase schema and works in demo mode without third-party credentials.

## Recommended ownership model

Matt should own each production account. Ryan can remain a temporary collaborator during the transition, then remove his own access after verification.

| Asset | Recommended owner action |
| --- | --- |
| GitHub | Done — the repository already lives at `Bstonem/417-wildlife-alliance`. |
| Netlify | Done — the project is under Matt's account and connected to GitHub. Currently paused on a free-tier build-minute limit; resumes on reset or upgrade. |
| Supabase | Done — a Matt-owned project exists and `supabase/schema.sql` has been applied. |
| Domain/DNS | Not started. Still needed for a production URL and for setting up custom SMTP (Supabase's default email sender is rate-limited). |
| Stripe | If donations are enabled, use an organization-controlled Stripe account with Matt as owner. |
| Resend/email | If notifications are enabled, use a Matt-controlled sending domain and account. |

## Ryan's transfer checklist

Matt must first provide his preferred admin email and either his Netlify team name or an invitation to that team.

1. ~~In GitHub, transfer the private repository to Matt.~~ Done — the repository is now `Bstonem/417-wildlife-alliance`.
2. ~~In Netlify, open the `417-wildlife-alliance` project and transfer it to Matt's team.~~ Done — the project is under Matt's account and connected to GitHub.
3. ~~Do not copy the obsolete values from Ryan's `.env.local`. Matt should create fresh Supabase credentials.~~ Done — Matt's own Supabase project and credentials are in use.
4. After Matt's site is verified live in production (once Netlify's build limit resets), remove Ryan's Netlify and Supabase access and delete Ryan's local `.env.local` copy.
5. If any secret was ever shared outside an account's encrypted environment-variable manager, rotate it.

Git history was preserved through the GitHub transfer; `origin` already points at `Bstonem/417-wildlife-alliance`.

## Matt's first local setup

Install Git for Windows, Node.js 22 LTS, and Claude Desktop. Then clone the repository:

```powershell
git clone https://github.com/MATTS_GITHUB_USERNAME/417-wildlife-alliance.git
cd 417-wildlife-alliance
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The site works in demo mode before integrations are configured.

On macOS or Linux, use `cp .env.example .env.local` instead of `Copy-Item`.

## Give Claude access to the project

For code changes, Claude Code is the most direct option. From the project folder, start it with:

```bash
claude
```

Ask Claude to read `CLAUDE.md` and `docs/OWNER_HANDOFF.md` before making changes. A useful first prompt is:

> Read CLAUDE.md and docs/OWNER_HANDOFF.md. Inspect the repo and git status, start the development server, and explain the current architecture. Do not change or deploy anything yet.

Claude Desktop can also use a trusted local-files desktop extension. Restrict its file access to this project folder and review permissions before allowing writes. Anthropic's current setup references are:

- https://docs.anthropic.com/en/docs/claude-code/getting-started
- https://support.anthropic.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop

## Create Matt's Supabase project

**Status: done.** Kept below as reference for rebuilding or auditing the setup.

1. In Matt's Supabase account, create a new project.
2. Open its SQL Editor and run `supabase/schema.sql` once.
3. In Authentication URL Configuration, set the Site URL to the production Netlify URL and add these redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://YOUR_PRODUCTION_DOMAIN/auth/callback`
4. Copy `.env.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAILS` with Matt's email
5. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. Never prefix it with `NEXT_PUBLIC_`.
6. Open `/admin/login`. Use the allowlisted magic-link flow to bootstrap Matt's first session.
7. Verify that `/admin` is protected and public users cannot read private operational tables.

The schema creates the database tables, row-level-security policies, and private `animal-case-photos` bucket. If a new table is unavailable through Supabase's Data API, review Project Settings, Integrations, Data API and expose only the intended `public` schema.

## Configure Netlify

**Status: connected and deploying from `main`.** Currently paused on a free-tier build-minute limit (resumes on reset or plan upgrade). Whether every environment variable below has actually been entered in Netlify is still unconfirmed — check Netlify's Site/Team settings before assuming production has full database/admin/email functionality.

Connect the Matt-owned Netlify project to the transferred GitHub repository and deploy from `main`. Netlify reads `netlify.toml`, which runs `npm run build` and publishes `.next`.

Add these environment variables in Netlify. Use the same public values as local development and enter secret values directly in Netlify—never in GitHub:

Required for database/admin features:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAILS`
- `NEXT_PUBLIC_SITE_URL`

Optional email notifications:

- `RESEND_API_KEY`
- `ADMIN_NOTIFICATION_EMAIL`
- `FROM_EMAIL`

Optional Stripe donations:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

Before every CLI deploy, run `netlify status` and confirm the project name is exactly `417-wildlife-alliance`. Prefer Git-connected deploys from `main` so production has an auditable commit.

## Optional Stripe and email setup

Leave Stripe variables empty until the organization is legally and operationally ready to accept donations. When enabled, add a Stripe webhook for:

```text
https://YOUR_PRODUCTION_DOMAIN/api/stripe/webhook
```

Subscribe it to `checkout.session.completed`, then store its signing secret as `STRIPE_WEBHOOK_SECRET`.

For Resend, verify a domain Matt controls, set `FROM_EMAIL` to an address on that domain, and set `ADMIN_NOTIFICATION_EMAIL` to the inbox that should receive form notifications.

## Verification before Ryan steps away

Run locally and in the production deployment:

```bash
npm run typecheck
npm run build
```

Then verify:

- `/`, `/found-animal`, `/directory`, `/donate`, and `/contact` load.
- `/robots.txt` and `/sitemap.xml` use the production domain.
- `/admin` redirects signed-out visitors to `/admin/login`.
- Matt can complete the magic-link login and view `/admin`.
- A test contact or intake submission reaches the database.
- Private Supabase tables are not readable with the public publishable key.
- If Stripe is enabled, a Stripe test-mode donation is recorded after the webhook.
- Netlify shows GitHub-connected deploys from the transferred repository's `main` branch.
- Matt can clone, change a small text item, run checks, push a branch, and deploy without Ryan.

## Routine maintenance

For each change:

```bash
git pull --ff-only
npm ci
npm run dev
npm run typecheck
npm run build
git status --short
```

Use a branch and pull request for non-trivial work. Keep `.env.local`, Netlify secrets, Supabase service-role keys, Stripe keys, and Resend keys out of Git.

## Recovery notes

- If the public site works but forms do not save, check Netlify's Supabase environment variables and the Supabase project status.
- If admin login loops, check Supabase Site URL/redirect URLs, `ADMIN_EMAILS`, and that the user email matches exactly.
- If canonical URLs point to localhost or a Netlify preview, correct `NEXT_PUBLIC_SITE_URL` and redeploy.
- If the CLI shows another Netlify project, stop. Link the current folder to `417-wildlife-alliance` before any deploy.
- If the old Supabase hostname `chumvlrvasbsopajxlot.supabase.co` appears anywhere in Matt's configuration, replace it with Matt's new project URL.

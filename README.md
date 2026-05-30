# 417 Wildlife Alliance

Website and support platform for 417 Wildlife Alliance, a regional wildlife rehabilitation support network serving people, donors, rehabbers, and community partners.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create local environment variables:

```bash
copy .env.example .env.local
```

3. Add Supabase keys when ready:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAILS` as a comma-separated allowlist for Supabase Auth users who can open `/admin`.
- `NEXT_PUBLIC_SITE_URL` with the production URL before launch, so canonical tags, Open Graph URLs, robots, and the sitemap point at the live domain instead of a local or deploy-preview URL.

4. Run the development server:

```bash
npm run dev
```

## Supabase Setup

Run the SQL in `supabase/schema.sql` inside the Supabase SQL Editor. The SQL enables RLS, grants only the intended public read policies, creates a private storage bucket for animal case photos, and adds private admin-operation tables for merch products, rehabber support disbursements, animal updates, and rehabber follow-ups.

New Supabase projects may not expose new tables to the Data API automatically. If public reads/inserts do not work after running the schema, check Project Settings -> Integrations -> Data API and expose the `public` tables intentionally.

## Features

- Public pages for found animal help, rehabber directory, donations, partners, certified companies, about, stories, FAQ, and merch.
- Validated API endpoints for animal cases, signups, partner applications, certified company applications, contact, donation checkout, and Stripe webhooks.
- Supabase admin client helper that stays server-only.
- Local demo mode when credentials are missing.
- Protected admin login and operational views for cases, inbox, directory, partners, donations, stories, merch, and impact follow-up.

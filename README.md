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

4. Run the development server:

```bash
npm run dev
```

## Supabase Setup

Run the SQL in `supabase/schema.sql` inside the Supabase SQL Editor. The SQL enables RLS, grants only the intended public insert/read permissions, and creates a private storage bucket for animal case photos.

New Supabase projects may not expose new tables to the Data API automatically. If public reads/inserts do not work after running the schema, check Project Settings -> Integrations -> Data API and expose the `public` tables intentionally.

## Features

- Public pages for found animal help, rehabber directory, donations, partners, certified companies, about, stories, FAQ, and merch.
- Validated API endpoints for animal cases, signups, partner applications, certified company applications, contact, donation checkout, and Stripe webhooks.
- Supabase admin client helper that stays server-only.
- Local demo mode when credentials are missing.
- Admin dashboard shell for cases, directory, partners, and donations.

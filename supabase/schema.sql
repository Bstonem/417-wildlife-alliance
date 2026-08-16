create extension if not exists pgcrypto;

create table if not exists public.animal_cases (
  id uuid primary key default gen_random_uuid(),
  public_case_number text not null unique,
  finder_name text not null,
  finder_phone text,
  finder_email text,
  preferred_contact_method text not null default 'any',
  animal_type text not null,
  approximate_age text,
  condition text not null,
  description text not null,
  location_text text not null,
  county text,
  latitude numeric,
  longitude numeric,
  currently_contained boolean not null default false,
  immediate_danger boolean not null default false,
  visible_injury boolean not null default false,
  displacement_context text,
  consent_to_share boolean not null default false,
  status text not null default 'new',
  assigned_rehabber_id uuid,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.animal_case_photos (
  id uuid primary key default gen_random_uuid(),
  animal_case_id uuid not null references public.animal_cases(id) on delete cascade,
  storage_path text not null,
  content_type text,
  created_at timestamptz not null default now()
);

create table if not exists public.rehabbers (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  public_slug text not null unique,
  organization_name text,
  public_email text,
  public_phone text,
  website_url text,
  service_area_text text not null,
  public_location_text text,
  species_groups text[] not null default '{}',
  permit_status text,
  accepts_public_contact boolean not null default false,
  accepts_texts boolean not null default false,
  accepts_dropoffs boolean not null default false,
  transport_available boolean not null default false,
  intake_status text not null default 'unknown',
  notes_public text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rehabber_private_details (
  rehabber_id uuid primary key references public.rehabbers(id) on delete cascade,
  private_address text,
  private_email text,
  private_phone text,
  permit_notes text,
  capacity_notes text,
  internal_notes text,
  updated_at timestamptz not null default now()
);

create table if not exists public.signups (
  id uuid primary key default gen_random_uuid(),
  signup_type text not null,
  name text not null,
  email text not null,
  phone text,
  organization_name text,
  county text,
  message text,
  consent_to_contact boolean not null default true,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  partner_type text not null,
  company_name text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  website_url text,
  county text,
  message text,
  seeking_certification boolean not null default false,
  company_type text,
  wildlife_scenarios text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  public_slug text not null unique,
  partner_type text not null,
  website_url text,
  public_description text,
  county text,
  sponsor_tier text,
  certified boolean not null default false,
  certification_expires_at date,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text,
  donor_email text,
  amount integer not null,
  currency text not null default 'usd',
  frequency text not null default 'one_time',
  fund_preference text,
  payment_provider text not null default 'stripe',
  payment_provider_id text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  body text not null,
  category text not null,
  location text,
  cover_image_path text,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  resource_type text not null,
  animal_type text,
  body text not null,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.merch_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null,
  price integer not null default 0,
  currency text not null default 'usd',
  image_path text,
  external_url text,
  inventory_status text not null default 'coming_soon',
  status text not null default 'draft',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rehabber_support_disbursements (
  id uuid primary key default gen_random_uuid(),
  rehabber_id uuid references public.rehabbers(id) on delete set null,
  animal_case_id uuid references public.animal_cases(id) on delete set null,
  amount integer not null,
  currency text not null default 'usd',
  purpose text not null,
  status text not null default 'planned',
  notes text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.animal_case_updates (
  id uuid primary key default gen_random_uuid(),
  animal_case_id uuid references public.animal_cases(id) on delete set null,
  rehabber_id uuid references public.rehabbers(id) on delete set null,
  title text not null,
  milestone text,
  update_text text not null,
  photo_storage_path text,
  donor_shareable boolean not null default false,
  status text not null default 'draft',
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rehabber_followups (
  id uuid primary key default gen_random_uuid(),
  rehabber_id uuid references public.rehabbers(id) on delete set null,
  animal_case_id uuid references public.animal_cases(id) on delete set null,
  contact_method text not null default 'email',
  subject text not null,
  message text not null,
  status text not null default 'open',
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.animal_cases enable row level security;
alter table public.animal_case_photos enable row level security;
alter table public.rehabbers enable row level security;
alter table public.rehabber_private_details enable row level security;
alter table public.signups enable row level security;
alter table public.partner_applications enable row level security;
alter table public.partners enable row level security;
alter table public.donations enable row level security;
alter table public.posts enable row level security;
alter table public.resources enable row level security;
alter table public.merch_products enable row level security;
alter table public.rehabber_support_disbursements enable row level security;
alter table public.animal_case_updates enable row level security;
alter table public.rehabber_followups enable row level security;

grant usage on schema public to anon, authenticated;

revoke all on all tables in schema public from anon, authenticated;
revoke execute on all functions in schema public from public;
revoke execute on all functions in schema public from anon, authenticated;

grant select on public.rehabbers to anon, authenticated;
grant select on public.partners to anon, authenticated;
grant select on public.posts to anon, authenticated;
grant select on public.resources to anon, authenticated;
grant select on public.merch_products to anon, authenticated;
grant select on public.animal_case_updates to anon, authenticated;

drop policy if exists "Anyone can submit animal cases" on public.animal_cases;
drop policy if exists "No public access to animal cases" on public.animal_cases;
create policy "No public access to animal cases"
on public.animal_cases
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists "Anyone can submit animal case photos" on public.animal_case_photos;
drop policy if exists "No public access to animal case photos" on public.animal_case_photos;
create policy "No public access to animal case photos"
on public.animal_case_photos
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists "Anyone can submit signups" on public.signups;
drop policy if exists "No public access to signups" on public.signups;
create policy "No public access to signups"
on public.signups
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists "Anyone can submit partner applications" on public.partner_applications;
drop policy if exists "No public access to partner applications" on public.partner_applications;
create policy "No public access to partner applications"
on public.partner_applications
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists "No public access to donations" on public.donations;
create policy "No public access to donations"
on public.donations
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists "No public access to rehabber private details" on public.rehabber_private_details;
create policy "No public access to rehabber private details"
on public.rehabber_private_details
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists "Published rehabbers are readable" on public.rehabbers;
create policy "Published rehabbers are readable"
on public.rehabbers
for select
to anon, authenticated
using (published is true);

-- Rehabber self-service account linking
alter table public.rehabbers
  add column if not exists user_id uuid unique references auth.users(id) on delete set null,
  add column if not exists claimed_at timestamptz,
  add column if not exists social_media_url text;

grant update (
  display_name, organization_name, public_email, public_phone, website_url, social_media_url,
  service_area_text, public_location_text, species_groups,
  accepts_public_contact, accepts_texts, accepts_dropoffs, transport_available,
  intake_status, notes_public, updated_at
) on public.rehabbers to authenticated;

drop policy if exists "Rehabbers can view their own listing" on public.rehabbers;
create policy "Rehabbers can view their own listing"
on public.rehabbers
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Rehabbers can update their own listing" on public.rehabbers;
create policy "Rehabbers can update their own listing"
on public.rehabbers
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Published partners are readable" on public.partners;
create policy "Published partners are readable"
on public.partners
for select
to anon, authenticated
using (published is true);

drop policy if exists "Published posts are readable" on public.posts;
create policy "Published posts are readable"
on public.posts
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Published resources are readable" on public.resources;
create policy "Published resources are readable"
on public.resources
for select
to anon, authenticated
using (status = 'published');

drop policy if exists "Published merch products are readable" on public.merch_products;
create policy "Published merch products are readable"
on public.merch_products
for select
to anon, authenticated
using (published is true and status = 'published');

drop policy if exists "Published animal updates are readable" on public.animal_case_updates;
create policy "Published animal updates are readable"
on public.animal_case_updates
for select
to anon, authenticated
using (donor_shareable is true and status = 'published');

drop policy if exists "No public access to rehabber support disbursements" on public.rehabber_support_disbursements;
create policy "No public access to rehabber support disbursements"
on public.rehabber_support_disbursements
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists "No public access to rehabber followups" on public.rehabber_followups;
create policy "No public access to rehabber followups"
on public.rehabber_followups
for all
to anon, authenticated
using (false)
with check (false);

create index if not exists animal_cases_created_at_idx on public.animal_cases (created_at desc);
create index if not exists donations_created_at_idx on public.donations (created_at desc);
create index if not exists posts_status_published_at_idx on public.posts (status, published_at desc);
create index if not exists merch_products_status_idx on public.merch_products (published, status);
create index if not exists animal_case_updates_status_idx on public.animal_case_updates (donor_shareable, status, occurred_at desc);

insert into storage.buckets (id, name, public)
values ('animal-case-photos', 'animal-case-photos', false)
on conflict (id) do nothing;

-- Rehabber self-signup license verification
alter table public.rehabber_private_details
  add column if not exists license_storage_path text,
  add column if not exists license_content_type text,
  add column if not exists license_uploaded_at timestamptz;

insert into storage.buckets (id, name, public)
values ('rehabber-license-documents', 'rehabber-license-documents', false)
on conflict (id) do nothing;

insert into public.rehabbers (
  display_name,
  public_slug,
  organization_name,
  service_area_text,
  public_location_text,
  species_groups,
  permit_status,
  accepts_public_contact,
  intake_status,
  notes_public,
  published
) values (
  '417 Wildlife Alliance Intake Desk',
  '417-wildlife-alliance-intake',
  '417 Wildlife Alliance',
  'Southwest Missouri / 417 area',
  '417 area',
  array['Unknown', 'Small mammals', 'Birds', 'Reptiles'],
  'Routing hub; verify species-specific permits before intake',
  true,
  'routing',
  'Starter listing for the intake and routing hub. Replace with approved rehabbers when consent is confirmed.',
  true
) on conflict (public_slug) do nothing;

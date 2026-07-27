-- Leads captured from the landing page form.
-- RLS is enabled with zero policies: only the service role (used by the
-- submit-lead edge function) can read or write.
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  email text not null,
  phone text not null,
  contact_method text,
  town text,
  neighborhood text,
  children_ages text,
  start_date date,
  schedule text,
  message text,
  source text not null default 'website',
  ip_hash text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Supports the per-IP rate-limit lookup in the edge function.
create index leads_ip_hash_created_at_idx on public.leads (ip_hash, created_at desc);

-- Launch hardening indexes for listing/search performance
-- Safe to apply with: supabase db push

create extension if not exists pg_trgm;

create index if not exists idx_businesses_name_trgm
  on public.businesses using gin (name gin_trgm_ops);

create index if not exists idx_businesses_city_trgm
  on public.businesses using gin (city gin_trgm_ops);

create index if not exists idx_businesses_category_governorate
  on public.businesses (category, governorate);

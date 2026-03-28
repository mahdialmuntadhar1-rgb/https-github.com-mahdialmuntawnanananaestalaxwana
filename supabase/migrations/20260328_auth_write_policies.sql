-- Authenticated write policies for launch flows.

-- Users: allow each authenticated user to create/read/update only their own profile.
drop policy if exists "users insert own profile" on public.users;
create policy "users insert own profile" on public.users
  for insert
  to authenticated
  with check (auth.uid()::text = id);

drop policy if exists "users update own profile" on public.users;
create policy "users update own profile" on public.users
  for update
  to authenticated
  using (auth.uid()::text = id)
  with check (auth.uid()::text = id);

drop policy if exists "users read own profile" on public.users;
create policy "users read own profile" on public.users
  for select
  to authenticated
  using (auth.uid()::text = id);

-- Posts: allow authenticated users to create content.
drop policy if exists "posts insert authenticated" on public.posts;
create policy "posts insert authenticated" on public.posts
  for insert
  to authenticated
  with check (true);

-- Business postcards: allow authenticated users to upsert owner-managed cards.
drop policy if exists "business_postcards insert authenticated" on public.business_postcards;
create policy "business_postcards insert authenticated" on public.business_postcards
  for insert
  to authenticated
  with check (true);

drop policy if exists "business_postcards update authenticated" on public.business_postcards;
create policy "business_postcards update authenticated" on public.business_postcards
  for update
  to authenticated
  using (true)
  with check (true);

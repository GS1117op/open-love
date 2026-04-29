begin;

alter table if exists public.posts enable row level security;
alter table if exists public.subscribers enable row level security;
alter table if exists public.feedbacks enable row level security;

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'subscribers'
      and cmd in ('SELECT', 'UPDATE', 'DELETE')
      and (
        roles @> array['anon']::name[]
        or roles @> array['authenticated']::name[]
        or roles = array['public']::name[]
      )
  loop
    execute format('drop policy if exists %I on public.subscribers', policy_record.policyname);
  end loop;
end $$;

do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'feedbacks'
      and cmd in ('SELECT', 'UPDATE', 'DELETE')
      and (
        roles @> array['anon']::name[]
        or roles @> array['authenticated']::name[]
        or roles = array['public']::name[]
      )
  loop
    execute format('drop policy if exists %I on public.feedbacks', policy_record.policyname);
  end loop;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'subscribers'
      and policyname = 'subscribers_insert_only'
      and cmd = 'INSERT'
  ) then
    create policy "subscribers_insert_only"
      on public.subscribers
      for insert
      to anon, authenticated
      with check (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'feedbacks'
      and policyname = 'feedbacks_insert_only'
      and cmd = 'INSERT'
  ) then
    create policy "feedbacks_insert_only"
      on public.feedbacks
      for insert
      to anon, authenticated
      with check (true);
  end if;
end $$;

commit;

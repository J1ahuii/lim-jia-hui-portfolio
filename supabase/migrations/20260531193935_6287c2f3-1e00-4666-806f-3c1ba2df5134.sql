create table public.star_messages (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  created_at timestamptz not null default now(),
  constraint star_messages_body_length check (char_length(body) between 1 and 80)
);

grant select, insert on public.star_messages to anon, authenticated;
grant all on public.star_messages to service_role;

alter table public.star_messages enable row level security;

create policy "Anyone can read star messages"
  on public.star_messages for select
  to anon, authenticated
  using (true);

create policy "Anyone can post a star message"
  on public.star_messages for insert
  to anon, authenticated
  with check (char_length(body) between 1 and 80);

create index star_messages_created_at_desc on public.star_messages (created_at desc);

alter publication supabase_realtime add table public.star_messages;
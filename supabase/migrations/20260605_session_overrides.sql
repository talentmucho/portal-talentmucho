-- Session overrides: admins can override any SESSION object field per session
create table if not exists session_overrides (
  id            uuid        primary key default gen_random_uuid(),
  course_slug   text        not null,
  session_number int        not null,
  video_url     text,
  zoom_url      text,
  title         text,
  description   text,
  date_label    text,
  time_label    text,
  tag           text,
  color         text,
  week_label    text,
  resources     jsonb,       -- [{label: string, href: string}]
  updated_at    timestamptz  default now(),
  unique (course_slug, session_number)
);

-- Allow all authenticated users to read (participants need to see overrides)
alter table session_overrides enable row level security;

create policy "Authenticated users can read session_overrides"
  on session_overrides for select
  to authenticated
  using (true);

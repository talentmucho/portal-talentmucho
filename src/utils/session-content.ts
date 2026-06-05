import { cookies } from "next/headers";
import { createClient, createAdminClient } from "@/utils/supabase/server";

export type Resource = { label: string; href: string };

export type SessionOverride = {
  video_url?: string | null;
  zoom_url?: string | null;
  title?: string | null;
  description?: string | null;
  date_label?: string | null;
  time_label?: string | null;
  tag?: string | null;
  color?: string | null;
  week_label?: string | null;
  resources?: Resource[] | null;
};

export type SessionData = {
  tag: string;
  color: string;
  weekLabel: string;
  title: string;
  date: string;
  time: string;
  videoUrl: string | null;
  zoomUrl: string;
  description: string;
  resources: Resource[];
};

export async function getSessionOverrides(
  courseSlug: string,
  sessionNumber: number
): Promise<SessionOverride | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("session_overrides")
    .select("*")
    .eq("course_slug", courseSlug)
    .eq("session_number", sessionNumber)
    .maybeSingle();
  return data;
}

export async function getIsAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = user?.app_metadata?.role || user?.user_metadata?.role;
  return role === "admin";
}

export function applyOverrides(
  base: SessionData,
  overrides: SessionOverride | null
): SessionData {
  if (!overrides) return base;
  return {
    tag: overrides.tag || base.tag,
    color: overrides.color || base.color,
    weekLabel: overrides.week_label || base.weekLabel,
    title: overrides.title || base.title,
    date: overrides.date_label || base.date,
    time: overrides.time_label || base.time,
    videoUrl: overrides.video_url || base.videoUrl,
    zoomUrl: overrides.zoom_url || base.zoomUrl,
    description: overrides.description || base.description,
    resources: overrides.resources || base.resources,
  };
}

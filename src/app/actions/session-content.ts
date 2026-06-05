"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient, createAdminClient } from "@/utils/supabase/server";
import type { SessionOverride } from "@/utils/session-content";

type State = { error: string | null; success?: boolean };

export async function updateSessionOverride(
  courseSlug: string,
  sessionNumber: number,
  data: SessionOverride
): Promise<State> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const role = user.app_metadata?.role || user.user_metadata?.role;
  if (role !== "admin") return { error: "Not authorized" };

  const admin = createAdminClient();
  const { error } = await admin.from("session_overrides").upsert(
    {
      course_slug: courseSlug,
      session_number: sessionNumber,
      ...data,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "course_slug,session_number" }
  );

  if (error) return { error: error.message };

  revalidatePath(
    `/participant/courses/${courseSlug}/session-${sessionNumber}`
  );
  return { error: null, success: true };
}

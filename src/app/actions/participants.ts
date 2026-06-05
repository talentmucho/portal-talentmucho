"use server";

import { cookies } from "next/headers";
import { createClient, createAdminClient } from "@/utils/supabase/server";

type State = { error: string | null; success?: boolean };

export async function resetParticipantPassword(
  userId: string,
  newPassword: string
): Promise<State> {
  if (!newPassword || newPassword.length < 6)
    return { error: "Password must be at least 6 characters" };

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const role = user.app_metadata?.role || user.user_metadata?.role;
  if (role !== "admin") return { error: "Not authorized" };

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.updateUserById(userId, {
    password: newPassword,
  });

  if (error) return { error: error.message };
  return { error: null, success: true };
}

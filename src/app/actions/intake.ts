"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export type IntakeAnswers = {
  payment_email?: string;
  business_oneliner?: string;
  first_focus?: string;
  voice_owner?: string;
  ai_employee_role?: string;
  ai_employee_custom?: string;
  dashboard_metrics?: string[];
  dashboard_custom?: string;
  os?: string;
  timezone?: string;
  peak_time?: string;
  one_thing?: string;
};

export async function saveIntakeResponses(
  answers: IntakeAnswers
): Promise<{ error: string | null }> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return { error: "Not authenticated" };

  const { error } = await supabase.from("intake_responses").upsert(
    {
      user_id: user.id,
      ...answers,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("Supabase upsert error in saveIntakeResponses:", error);
  }

  return { error: error?.message ?? null };
}

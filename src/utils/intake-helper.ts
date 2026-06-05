import { cookies } from "next/headers";
import { createClient, createAdminClient } from "@/utils/supabase/server";

export async function getIntakeData() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const admin = createAdminClient();
  const { data: intake } = await admin
    .from("intake_responses")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return intake;
}

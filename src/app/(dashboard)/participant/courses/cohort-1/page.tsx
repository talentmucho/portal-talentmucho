import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/utils/supabase/server";
import Cohort1Client from "./cohort-client";

export default async function Cohort1Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const admin = createAdminClient();

  const { data: intake } = await admin
    .from("intake_responses")
    .select(
      "first_name, payment_email, business_oneliner, first_focus, voice_owner, ai_employee_role, ai_employee_custom, dashboard_metrics, dashboard_custom, os, timezone, peak_time, one_thing, submitted_at"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  return <Cohort1Client intake={intake ?? {}} />;
}

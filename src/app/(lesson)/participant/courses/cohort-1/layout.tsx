import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import LessonLayoutClient from "./lesson-layout-client";

export default async function Cohort1Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const role = user.app_metadata?.role || user.user_metadata?.role || null;
  const isAdmin = role === "admin";

  return (
    <LessonLayoutClient isAdmin={isAdmin}>
      {children}
    </LessonLayoutClient>
  );
}

import Image from "next/image";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { BookOpen, BarChart2, Award, Clock } from "lucide-react";

const stats = [
  { label: "Enrolled Courses", value: "—", icon: BookOpen },
  { label: "Lessons Completed", value: "—", icon: BarChart2 },
  { label: "Certificates", value: "—", icon: Award },
  { label: "Hours Spent", value: "—", icon: Clock },
];

export default async function ParticipantDashboard() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] || "there";

  return (
    <div className="p-8 ">
      {/* Welcome */}
      <div className="relative mb-8 rounded-2xl overflow-hidden bg-[var(--beige-100)] dark:bg-[var(--card)] border border-[var(--beige-200)] dark:border-white/5 px-5 pt-6 pb-0 sm:px-8 sm:pt-8 flex items-end justify-between gap-4">
        <div className="relative z-10 pb-6 sm:pb-8">
          <span className="tm-eyebrow block mb-2">Welcome back</span>
          <h2
            className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
          >
            Good to see you, {firstName}.
          </h2>
          <p className="tm-body-sm mt-1">
            Here&apos;s a summary of your bootcamp progress.
          </p>
        </div>
        <Image
          src="/assets/stickers/abiemeri.png"
          alt=""
          width={180}
          height={180}
          className="shrink-0 select-none w-24 sm:w-36 md:w-[180px] h-auto object-contain"
          style={{ transform: "translateY(8px)" }}
          priority
        />
      </div>

      {/* Courses */}
      <div>
        <h3 className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground mb-4">
          My Courses
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/participant/courses/cohort-1"
            className="group rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-6 flex flex-col gap-3 hover:shadow-md hover:border-[var(--beige-300)] dark:hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="tm-eyebrow">Cohort 1</span>
              <BookOpen className="size-4 text-[var(--taupe-400)]" />
            </div>
            <div>
              <h4 className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground text-base leading-snug">
                AI Bootcamp: From Zero to Practitioner
              </h4>
              <p className="tm-body-sm mt-1 line-clamp-2">
                Master the fundamentals of AI — from prompting and automation to
                building real workflows that save you hours every week.
              </p>
            </div>
            <div className="mt-auto pt-2 border-t border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between text-xs text-[var(--taupe-400)]">
              <span>8 modules</span>
              <span className="group-hover:underline">View course →</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

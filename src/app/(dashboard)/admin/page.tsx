import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Users, GraduationCap, BarChart2, CalendarCheck } from "lucide-react";

const stats = [
  { label: "Total Participants", value: "—", icon: Users },
  { label: "Active Cohorts", value: "1", icon: GraduationCap },
  { label: "Avg. Completion", value: "—", icon: BarChart2 },
  { label: "Sessions This Month", value: "3", icon: CalendarCheck },
];

const participants = [
  {
    name: "Sample Participant",
    email: "participant@example.com",
    cohort: "Cohort 1",
    sessionsCompleted: 3,
    totalSessions: 9,
    status: "active",
  },
];

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] || "Admin";

  return (
    <div className="p-8">
      {/* Welcome */}
      <div className="relative mb-8 rounded-2xl overflow-hidden bg-[var(--beige-100)] dark:bg-[var(--card)] border border-[var(--beige-200)] dark:border-white/5 px-5 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8 flex items-center justify-between gap-4">
        <div className="relative z-10">
          <span className="tm-eyebrow block mb-2">Admin Dashboard</span>
          <h2
            className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
          >
            Welcome, {firstName}.
          </h2>
          <p className="tm-body-sm mt-1">
            Manage participants, track cohort progress, and oversee the bootcamp.
          </p>
        </div>
        <div
          className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--charcoal-900)" }}
        >
          <GraduationCap
            className="size-8 sm:size-10"
            style={{ color: "var(--clay-500)" }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="tm-body-sm">{label}</span>
              <Icon className="size-4 text-[var(--taupe-400)]" />
            </div>
            <span
              className="font-serif font-light"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--charcoal-900)" }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Participants */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground">
            Participants
          </h3>
          <a
            href="/admin/participants"
            className="text-sm text-[var(--taupe-400)] hover:text-[var(--espresso-700)] dark:hover:text-foreground transition-colors"
          >
            View all →
          </a>
        </div>

        <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden">
          {/* Table header */}
          <div
            className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-wider sm:grid"
            style={{
              background: "var(--beige-100)",
              color: "var(--taupe-400)",
              borderBottom: "1px solid var(--beige-200)",
            }}
          >
            <span>Participant</span>
            <span>Cohort</span>
            <span>Progress</span>
            <span>Status</span>
          </div>

          {/* Rows */}
          {participants.map((p, i) => {
            const pct = Math.round((p.sessionsCompleted / p.totalSessions) * 100);
            return (
              <div
                key={p.email}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-3 sm:gap-4 px-6 py-4 items-center transition-colors hover:bg-[var(--beige-50)] dark:hover:bg-white/[0.02]"
                style={{
                  borderTop: i > 0 ? "1px solid var(--beige-200)" : undefined,
                }}
              >
                {/* Name + email */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">
                    {p.name}
                  </span>
                  <span className="text-xs text-[var(--taupe-400)]">{p.email}</span>
                </div>

                {/* Cohort */}
                <span className="tm-tag hidden sm:inline-flex">{p.cohort}</span>

                {/* Progress */}
                <div className="hidden sm:flex flex-col gap-1 min-w-[100px]">
                  <div className="flex items-center justify-between text-xs text-[var(--taupe-400)]">
                    <span>{p.sessionsCompleted}/{p.totalSessions} sessions</span>
                    <span>{pct}%</span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "var(--beige-200)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: "var(--clay-500)" }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="hidden sm:flex">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background:
                        p.status === "active"
                          ? "rgb(125 107 90 / 0.12)"
                          : "var(--beige-200)",
                      color:
                        p.status === "active"
                          ? "var(--clay-500)"
                          : "var(--taupe-400)",
                    }}
                  >
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                </div>

                {/* Mobile summary */}
                <div className="flex items-center justify-between sm:hidden">
                  <span className="tm-tag">{p.cohort}</span>
                  <span className="text-xs text-[var(--taupe-400)]">
                    {p.sessionsCompleted}/{p.totalSessions} sessions · {pct}%
                  </span>
                </div>
              </div>
            );
          })}

          {participants.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Users className="size-8 mx-auto mb-3 text-[var(--beige-200)]" />
              <p className="text-sm text-[var(--taupe-400)]">No participants yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

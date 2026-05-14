import { Calendar, Clock, Video, CheckCircle2, Circle, Lock, ArrowRight } from "lucide-react";

const weeks = [
  {
    num: "01",
    color: "#C4A882",
    theme: "Knowing Claude",
    deliverable:
      "3 configured Claude.ai Projects loaded with your docs, business context, and brand voice.",
    sessions: ["Sat, Jun 6 · The interface, Projects, your first conversation", "Sun, Jun 7 · Custom instructions, file uploads"],
    status: "completed",
  },
  {
    num: "02",
    color: "#7D6B5A",
    theme: "Delegating to Claude",
    deliverable:
      "1 named AI employee in Cowork, briefed and tested against real scenarios from your business.",
    sessions: ["Sat, Jun 13 · AI employees — what Cowork makes real", "Sun, Jun 14 · Build and test your first AI employee live"],
    status: "in-progress",
  },
  {
    num: "03",
    color: "#5A7A6B",
    theme: "Building with Claude",
    deliverable:
      "1 custom business dashboard built with Claude Code. No coding experience needed.",
    sessions: ["Sat, Jun 20 · Claude Code — your first build", "Sun, Jun 21 · Build your business dashboard"],
    status: "locked",
  },
  {
    num: "04",
    color: "#6B5A7A",
    theme: "Living with Claude",
    deliverable:
      "A written daily Claude routine: 3 specific moments in your workday where Claude is open and ready.",
    sessions: ["Sat, Jun 27 · Your full Claude stack working together", "Sun, Jun 28 · Showcases, Q&A, and graduation"],
    status: "locked",
  },
];

const allSessions = [
  { tag: "Kickoff", date: "Fri, Jun 5", time: "6–8 PM EST", topic: "Welcome, orientation, Claude.ai setup", color: "#C4A882", status: "completed" },
  { tag: "W1 · S1", date: "Sat, Jun 6", time: "10 AM–1 PM EST", topic: "The interface, Projects, your first conversation", color: "#C4A882", status: "completed" },
  { tag: "W1 · S2", date: "Sun, Jun 7", time: "10 AM–1 PM EST", topic: "Custom instructions, file uploads", color: "#C4A882", status: "completed" },
  { tag: "W2 · S3", date: "Sat, Jun 13", time: "10 AM–1 PM EST", topic: "AI employees — what Cowork makes real", color: "#7D6B5A", status: "upcoming" },
  { tag: "W2 · S4", date: "Sun, Jun 14", time: "10 AM–1 PM EST", topic: "Build and test your first AI employee live", color: "#7D6B5A", status: "upcoming" },
  { tag: "W3 · S5", date: "Sat, Jun 20", time: "10 AM–1 PM EST", topic: "Claude Code — your first build", color: "#5A7A6B", status: "locked" },
  { tag: "W3 · S6", date: "Sun, Jun 21", time: "10 AM–1 PM EST", topic: "Build your business dashboard", color: "#5A7A6B", status: "locked" },
  { tag: "W4 · S7", date: "Sat, Jun 27", time: "10 AM–1 PM EST", topic: "Your full Claude stack working together", color: "#6B5A7A", status: "locked" },
  { tag: "W4 · S8", date: "Sun, Jun 28", time: "10 AM–1 PM EST", topic: "Showcases, Q&A, and graduation", color: "#6B5A7A", status: "locked" },
];

function WeekStatusIcon({ status }: { status: string }) {
  if (status === "completed") return <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />;
  if (status === "in-progress") return <Circle className="size-4 text-[var(--tm-gold)] shrink-0" />;
  return <Lock className="size-3.5 text-[var(--taupe-400)] shrink-0" />;
}

const completed = allSessions.filter((s) => s.status === "completed").length;
const progress = Math.round((completed / allSessions.length) * 100);
const nextSession = allSessions.find((s) => s.status === "upcoming");

export default function Cohort1Page() {
  return (
    <div className="p-8 max-w-4xl space-y-10">

      {/* Header */}
      <div>
        <span className="tm-eyebrow block mb-2">Cohort 1 · June 2026</span>
        <h1
          className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground mb-2"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
        >
          AI Business Bootcamp: Build the AI Version of Yourself
        </h1>
        <p className="tm-body-sm max-w-xl">
          4 weeks. 9 live sessions on Zoom. Each week ends with a real deliverable running inside
          your business — not just a feeling that you learned something.
        </p>

        <div className="flex flex-wrap gap-3 mt-4">
          {[
            { icon: <Calendar className="size-3.5" />, label: "Fri, Jun 5 – Sun, Jun 28, 2026" },
            { icon: <Clock className="size-3.5" />, label: "Sat & Sun · 10 AM–1 PM EST" },
            { icon: <Video className="size-3.5" />, label: "Live on Zoom" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 border border-[var(--beige-200)] dark:border-white/5 rounded-full px-3 py-1.5 text-xs text-[var(--taupe-400)]"
            >
              {icon}
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Progress + next session CTA */}
      <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Progress</span>
            <span className="text-[var(--taupe-400)]">{completed} / {allSessions.length} sessions</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[var(--beige-200)] dark:bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-[var(--tm-gold)]" style={{ width: `${progress}%` }} />
          </div>
          {nextSession && (
            <p className="text-xs text-[var(--taupe-400)] mt-2">
              Next: <span className="text-[var(--charcoal-900)] dark:text-foreground">{nextSession.tag} · {nextSession.date} · {nextSession.time}</span>
            </p>
          )}
        </div>
        {nextSession && (
          <a
            href="#"
            className="shrink-0 inline-flex items-center gap-2 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Join next session
            <ArrowRight className="size-3.5" />
          </a>
        )}
      </div>

      {/* 4 Weeks */}
      <div>
        <h2 className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground text-lg mb-4">
          The 4 Weeks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {weeks.map((w) => (
            <div
              key={w.num}
              className={`rounded-2xl border overflow-hidden flex flex-col transition-all ${
                w.status === "locked"
                  ? "border-[var(--beige-200)] dark:border-white/5 opacity-50"
                  : "border-[var(--beige-200)] dark:border-white/5 hover:shadow-sm"
              }`}
            >
              <div className="px-5 py-4 flex items-center justify-between gap-2" style={{ background: w.color }}>
                <p className="font-serif font-light text-white text-base leading-snug">
                  Week {w.num} · {w.theme}
                </p>
                <WeekStatusIcon status={w.status} />
              </div>
              <div className="p-5 bg-[var(--beige-100)] dark:bg-[var(--card)] flex-1 flex flex-col gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--taupe-400)] mb-1">
                    You walk away with
                  </p>
                  <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                    {w.deliverable}
                  </p>
                </div>
                <div className="border-t border-[var(--beige-200)] dark:border-white/5 pt-3 space-y-1">
                  {w.sessions.map((s) => (
                    <p key={s} className="text-xs text-[var(--taupe-400)] leading-relaxed">· {s}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full schedule */}
      <div>
        <h2 className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground text-lg mb-4">
          Full Schedule
        </h2>
        <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden">
          {allSessions.map((s, i) => (
            <div
              key={s.tag}
              className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-5 py-4 ${
                i < allSessions.length - 1 ? "border-b border-[var(--beige-200)] dark:border-white/5" : ""
              } ${s.status === "locked" ? "opacity-40" : ""} ${
                s.status === "completed"
                  ? "bg-[var(--beige-100)] dark:bg-[var(--card)]"
                  : s.status === "upcoming"
                  ? "bg-[var(--beige-50)] dark:bg-white/[0.02]"
                  : ""
              }`}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full inline-block w-fit shrink-0"
                style={{ background: `${s.color}25`, color: s.color, border: `1px solid ${s.color}40` }}
              >
                {s.tag}
              </span>
              <span className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground w-32 shrink-0">
                {s.date}
              </span>
              <span className="text-xs text-[var(--taupe-400)] w-28 shrink-0">{s.time}</span>
              <span className="text-sm text-[var(--taupe-400)] font-light flex-1">{s.topic}</span>
              {s.status === "completed" && (
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 hidden sm:block" />
              )}
              {s.status === "upcoming" && (
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--tm-gold)] shrink-0 hidden sm:block">
                  Upcoming
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

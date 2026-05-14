import Link from "next/link";
import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react";

const SESSION = {
  tag: "Kickoff",
  color: "#C4A882",
  weekLabel: "Cohort 1 · June 2026",
  title: "Welcome, orientation, Claude.ai setup",
  date: "Fri, Jun 5",
  time: "6–8 PM EST",
  videoUrl: null as string | null,
  description:
    "Your first live session. We'll do introductions, walk through the bootcamp structure, and get every participant set up on Claude.ai before we go into Week 1.",
  resources: [
    { label: "Kickoff slides", href: "#" },
    { label: "Claude.ai setup guide", href: "#" },
    { label: "Cohort 1 schedule (PDF)", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const NEXT     = "/participant/courses/cohort-1/session-2";

export default function Session1Page() {
  return (
    <div className="flex-1 bg-[var(--beige-50)] dark:bg-background flex flex-col overflow-hidden min-h-0">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
        <Link
          href={OVERVIEW}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to course
        </Link>

        <div className="flex items-center gap-2">
          <span
            className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
            style={{
              background: `${SESSION.color}22`,
              color: SESSION.color,
              border: `1px solid ${SESSION.color}44`,
            }}
          >
            {SESSION.tag}
          </span>
          <span className="font-medium text-sm text-[var(--charcoal-900)] dark:text-foreground line-clamp-1 max-w-[280px]">
            {SESSION.title}
          </span>
        </div>

        <Link
          href={NEXT}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground hover:opacity-70 transition-opacity"
        >
          Start intake
          <ArrowRight className="size-3.5" />
        </Link>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* Content */}
        <main className="flex-1 flex flex-col p-6 md:p-8 gap-6 min-w-0 overflow-y-auto tm-scrollbar">
          <div className="w-full max-h-[55vh] aspect-video rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] flex flex-col items-center justify-center gap-3">
            {SESSION.videoUrl ? (
              <iframe src={SESSION.videoUrl} className="w-full h-full rounded-2xl" allowFullScreen />
            ) : (
              <>
                <PlayCircle className="size-12 text-[var(--taupe-400)] opacity-40" />
                <p className="text-sm text-[var(--taupe-400)]">
                  Recording will appear here after the live session
                </p>
              </>
            )}
          </div>

          <div>
            <p className="tm-eyebrow mb-1">{SESSION.weekLabel}</p>
            <h1
              className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground mb-3"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.875rem)" }}
            >
              {SESSION.title}
            </h1>
            <p className="tm-body-sm max-w-2xl">{SESSION.description}</p>
          </div>

          {/* Next step nudge */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-center justify-between gap-4 mt-auto">
            <div>
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">
                Up next: Build your Bootcamp Map
              </p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">
                10 questions · shapes every session to your business
              </p>
            </div>
            <Link
              href={NEXT}
              className="inline-flex items-center gap-2 shrink-0 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Start
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="lg:w-72 xl:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-6 flex flex-col gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-3">
              Session details
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--taupe-400)]">Date</dt>
                <dd className="font-medium text-[var(--charcoal-900)] dark:text-foreground text-right">{SESSION.date}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--taupe-400)]">Time</dt>
                <dd className="font-medium text-[var(--charcoal-900)] dark:text-foreground text-right">{SESSION.time}</dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-3">
              Resources
            </p>
            <ul className="space-y-2">
              {SESSION.resources.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    className="text-sm text-[var(--charcoal-900)] dark:text-foreground hover:opacity-70 transition-opacity underline underline-offset-2 decoration-[var(--beige-200)]"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 w-full bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Join live on Zoom
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

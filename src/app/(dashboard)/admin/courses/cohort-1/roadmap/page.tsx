import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { PARTICIPANT_ROADMAPS, sessionWeek } from "@/utils/participant-roadmaps";

const PARTICIPANTS = Object.keys(PARTICIPANT_ROADMAPS) as (keyof typeof PARTICIPANT_ROADMAPS)[];

export default async function AdminRoadmapsPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const { p } = await searchParams;
  const activeKey = PARTICIPANTS.includes(p as string) ? (p as string) : PARTICIPANTS[0];
  const data = PARTICIPANT_ROADMAPS[activeKey];

  return (
    <div className="flex flex-col min-h-full bg-[var(--beige-50)] dark:bg-background">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
        <Link
          href="/admin/courses/cohort-1"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Cohort 1
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">
          Participant Roadmaps · Admin
        </span>
        <div className="w-28" />
      </header>

      {/* Participant tabs */}
      <div className="border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] px-5">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {PARTICIPANTS.map((key) => {
            const p = PARTICIPANT_ROADMAPS[key];
            const isActive = key === activeKey;
            return (
              <Link
                key={key}
                href={`?p=${key}`}
                className="flex items-center gap-2 px-3 py-3 shrink-0 border-b-2 transition-colors text-sm font-medium"
                style={{
                  borderColor: isActive ? p.accentColor : "transparent",
                  color: isActive ? p.accentColor : "var(--taupe-400)",
                }}
              >
                <div
                  className="size-6 rounded-full overflow-hidden border"
                  style={{ borderColor: isActive ? `${p.accentColor}60` : "var(--beige-200)" }}
                >
                  <Image
                    src={p.photo}
                    alt={p.name}
                    width={24}
                    height={24}
                    className="object-cover w-full h-full"
                  />
                </div>
                {p.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Roadmap content */}
      <div className="flex-1 overflow-y-auto">

        {/* Hero */}
        <div
          className="relative px-6 md:px-16 pt-12 pb-10 border-b border-[var(--beige-200)] dark:border-white/5 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${data.accentColor}10 0%, var(--beige-50) 60%)` }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
            style={{ background: data.accentColor, transform: "translate(30%, -30%)" }}
          />
          <div className="flex items-center gap-5 mb-6">
            <div
              className="size-16 rounded-full overflow-hidden border-2 shrink-0"
              style={{ borderColor: `${data.accentColor}50` }}
            >
              <Image
                src={data.photo}
                alt={data.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--taupe-400)] mb-1">
                Talent Mucho · AI Business Bootcamp · June 2026
              </p>
              <h1
                className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                {data.name}&apos;s
                <span className="italic ml-2" style={{ color: data.accentColor }}>
                  Personal Roadmap
                </span>
              </h1>
            </div>
          </div>
          <p className="text-sm font-light text-[var(--taupe-400)] max-w-xl leading-relaxed">{data.insight}</p>
        </div>

        <div className="max-w-3xl mx-auto px-6 md:px-8 py-10 flex flex-col gap-10">

          {/* What they'll build */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-4">What they&apos;ll build</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.deliverables.map((d, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] flex gap-3 items-start"
                >
                  <span
                    className="shrink-0 size-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                    style={{ background: d.color }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: d.color }}>{d.week}</p>
                    <p className="text-sm font-light text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">{d.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session moves */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-4">
              Session-by-session · their moves
            </p>
            <div className="flex flex-col gap-2">
              {data.moves.map((m, i) => {
                const wk = sessionWeek(i);
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] grid grid-cols-[72px_1fr] overflow-hidden"
                  >
                    <div
                      className="flex flex-col items-end justify-start gap-0.5 p-4 border-r border-[var(--beige-200)] dark:border-white/5"
                      style={{ background: `${wk.color}12` }}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: wk.color }}>
                        {m.session}
                      </span>
                      <span className="text-[10px] text-[var(--taupe-400)] tabular-nums">{m.date}</span>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-medium text-[var(--taupe-400)] uppercase tracking-[0.12em] mb-2">{m.label}</p>
                      <div
                        className="flex gap-2 items-start text-sm font-light text-[var(--charcoal-900)] dark:text-foreground leading-relaxed rounded-xl px-3 py-2.5"
                        style={{ background: `${data.accentColor}08` }}
                      >
                        <svg className="size-3.5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke={data.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <span>
                          <strong className="font-semibold text-[var(--charcoal-900)] dark:text-foreground">Their move:</strong>{" "}
                          {m.move}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Participant link */}
          <div className="rounded-2xl p-5 flex items-center justify-between gap-4 border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-1">Participant view</p>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light">
                Share this URL with {data.name} for the surprise reveal.
              </p>
            </div>
            <a
              href="/participant/courses/cohort-1/roadmap"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 shrink-0 text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-white"
              style={{ background: data.accentColor }}
            >
              Open roadmap
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

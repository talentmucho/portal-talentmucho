import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getIntakeData } from "@/utils/intake-helper";
import { resolveRoadmap, sessionWeek } from "@/utils/participant-roadmaps";

export default async function RoadmapPage() {
  const intake = await getIntakeData();
  if (!intake) redirect("/login");

  const firstName = intake.first_name || "";

  const focusArea    = intake.first_focus || "your business";
  const aiRole       = intake.ai_employee_role || "AI assistant";
  const metrics      = intake.dashboard_metrics || "key metrics";
  const timezone     = intake.timezone || "your timezone";
  const peakTime     = intake.peak_time || "your peak hours";
  const os           = intake.os || "Windows";
  const voiceOwner   = intake.voice_owner || "personal brand";
  const oneThing     = intake.one_thing || "get more done with less effort";

  // Hand-authored roadmap when available, otherwise generated from intake.
  const rd = resolveRoadmap(intake);
  const photo = rd.photo || null;
  const insight = rd.insight;
  const accentColor = rd.accentColor;
  const moves = rd.moves;
  const deliverables = rd.deliverables;

  return (
    <div className="flex-1 bg-[var(--beige-50)] dark:bg-background flex flex-col overflow-hidden min-h-0">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
        <Link
          href="/participant/courses/cohort-1"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to course
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">
          Your Roadmap · Cohort 1
        </span>
        <div className="w-20" />
      </header>

      {/* Scroll container */}
      <div className="flex-1 overflow-y-auto tm-scrollbar">

        {/* Cover hero */}
        {photo ? (
          <div className="relative w-full">
            <Image
              src={photo}
              alt={firstName}
              width={1200}
              height={800}
              className="w-full h-auto block"
              priority
            />
            {/* deep multi-stop gradient so text always pops */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, ${accentColor}F5 0%, ${accentColor}AA 30%, ${accentColor}40 60%, transparent 85%)`,
              }}
            />
            {/* text block */}
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 pb-10 md:pb-14">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/60 mb-3">
                Talent Mucho · AI Business Bootcamp · June 2026
              </p>
              <h1
                className="font-serif font-light text-white leading-[1.05] mb-3"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)", textShadow: "0 2px 24px rgba(0,0,0,0.25)" }}
              >
                {firstName}'s
                <span className="block italic">Personal Roadmap</span>
              </h1>
              <p className="text-sm text-white/80 font-light max-w-md mb-5 leading-relaxed" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
                4 weeks · 9 live sessions · built around the real business you're running
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: `Focus: ${focusArea}` },
                  { label: `AI employee: ${aiRole}` },
                  { label: `${timezone} · ${peakTime}` },
                  { label: os },
                ].map((pill) => (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
                    style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
                  >
                    {pill.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* fallback if no photo */
          <div
            className="relative px-6 md:px-16 pt-16 pb-12 border-b border-[var(--beige-200)] dark:border-white/5 overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${accentColor}08 0%, var(--beige-50) 60%)` }}
          >
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.06] blur-3xl pointer-events-none" style={{ background: accentColor, transform: "translate(30%, -30%)" }} />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--taupe-400)] mb-4">Talent Mucho · AI Business Bootcamp · June 2026</p>
            <h1 className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground mb-2 leading-[1.1]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              {firstName}'s
              <span className="block italic" style={{ color: accentColor }}>Personal Roadmap</span>
            </h1>
            <p className="text-sm text-[var(--taupe-400)] font-light max-w-lg mt-2">4 weeks · 9 live sessions · built around the real business you're running.</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {[{ label: `Focus: ${focusArea}` }, { label: `AI employee: ${aiRole}` }, { label: `${timezone} · ${peakTime}` }, { label: os }].map((pill) => (
                <span key={pill.label} className="inline-flex items-center gap-1.5 border border-[var(--beige-200)] dark:border-white/10 rounded-full px-3 py-1 text-xs text-[var(--taupe-400)] bg-white/70 dark:bg-white/5 backdrop-blur">{pill.label}</span>
              ))}
            </div>
          </div>
        )}

        {/* Thin accent divider */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}00)` }} />

        <div className="max-w-3xl mx-auto px-6 md:px-8 py-10 flex flex-col gap-10">

          {/* Insight box */}
          <div className="p-6 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: accentColor }}>
              Your bootcamp brief
            </p>
            <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
              {insight}
            </p>
          </div>

          {/* Goal quote */}
          <div
            className="px-6 py-5 rounded-2xl border-l-4"
            style={{
              borderColor: accentColor,
              background: `${accentColor}08`,
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-2">
              Your words, from your intake
            </p>
            <p className="text-sm font-light leading-relaxed text-[var(--charcoal-900)] dark:text-foreground italic">
              &ldquo;{oneThing}&rdquo;
            </p>
          </div>

          {/* Onboarding snapshot */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden">
            <div className="px-5 py-3 bg-[var(--beige-100)] dark:bg-white/5 border-b border-[var(--beige-200)] dark:border-white/5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Onboarding snapshot</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 bg-white dark:bg-[var(--card)]">
              {[
                { label: "Focus area", value: focusArea },
                { label: "AI employee role", value: aiRole },
                { label: "Voice owner", value: voiceOwner },
                { label: "Dashboard metrics", value: metrics },
                { label: "Timezone · peak hours", value: `${timezone} · ${peakTime}` },
                { label: "Operating system", value: os },
              ].map((f, i) => (
                <div key={i} className="p-4 border-b border-r border-[var(--beige-200)] dark:border-white/5 last:border-r-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--taupe-400)] mb-1">{f.label}</p>
                  <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground leading-snug">{f.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Week deliverables */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-4">What you'll build</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {deliverables.map((d, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 flex gap-3 items-start"
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

          {/* Session-by-session moves */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-4">
              Session-by-session · your ideal version
            </p>
            <div className="flex flex-col gap-2">
              {moves.map((m, i) => {
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
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.12em]"
                        style={{ color: wk.color }}
                      >
                        {m.session}
                      </span>
                      <span className="text-[10px] text-[var(--taupe-400)] tabular-nums">{m.date}</span>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-medium text-[var(--taupe-400)] uppercase tracking-[0.12em] mb-2">{m.label}</p>
                      <div
                        className="flex gap-2 items-start text-sm font-light text-[var(--charcoal-900)] dark:text-foreground leading-relaxed rounded-xl px-3 py-2.5"
                        style={{ background: `${accentColor}08` }}
                      >
                        <svg className="size-3.5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <span><strong className="font-semibold text-[var(--charcoal-900)] dark:text-foreground">Ideal version:</strong> {m.ideal}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom card */}
          <div className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: "#2A2520" }}>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: "#9C8B7A" }}>4 weeks from now</p>
              <p className="font-serif font-light text-[var(--beige-100)] text-lg leading-snug mb-1">
                {firstName} graduates with a full Claude stack running inside their business.
              </p>
              <p className="text-xs font-light" style={{ color: "#9C8B7A" }}>
                Projects · AI employee · Custom dashboard · Daily routine
              </p>
            </div>
            <Link
              href="/participant/courses/cohort-1/session-1"
              className="inline-flex items-center gap-2 shrink-0 text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              style={{ background: accentColor, color: "#FAF8F5" }}
            >
              Back to session 1
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, ArrowRight, Send, CalendarClock, Sparkles, Play } from "lucide-react";
import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";
import { getIntakeData } from "@/utils/intake-helper";
import { getSessionOverrides, getIsAdmin, applyOverrides } from "@/utils/session-content";
import { SessionEditPanel } from "@/components/session-edit-panel";

const SESSION = {
  tag: "W2 · S3",
  color: "#7D6B5A",
  weekLabel: "Week 2 · Delegating to Claude",
  title: "AI employees ,  what Cowork makes real",
  date: "Sat, Jun 13",
  time: "4–7 PM CET · 14:00–17:00 UTC",
  videoUrl: null as string | null,
  description:
    "An introduction to AI employees ,  what they are, what Cowork makes possible, and how real businesses are using them today. You'll see a live demo and leave with a clear plan for what you're building in Session 4.",
  resources: [
    { label: "Cowork platform overview", href: "#" },
    { label: "AI employee role examples", href: "#" },
    { label: "Session slides", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const PREV     = "/participant/courses/cohort-1/session-3";
const NEXT     = "/participant/courses/cohort-1/session-5";

const bringList = [
  "Your 3 configured Claude.ai Projects from Week 1",
  "One repetitive task in your business that takes 30+ min/week",
  "Real examples of requests you get from clients (copy from emails or messages)",
];

const objectives = [
  "Understand the real difference between an AI tool and an AI employee",
  "Know what Cowork adds that Claude.ai alone can't do",
  "Identify which role in your business is right for your first AI employee",
  "Draft a role description before Session 4",
];

const roleExamples = [
  {
    name: "Onboarding Coordinator",
    handles: "Greets new clients, sends welcome sequences, answers FAQs, collects intake info",
    escalates: "Unusual requests, unhappy clients, contract questions",
    steps: [
      "Name them and set the role ~ \"You are [name], the Onboarding Coordinator for [business].\"",
      "Load context ~ upload your welcome sequence, intake form, and client FAQ",
      "Define the workflow ~ greet, send the welcome, collect intake, answer common questions",
      "Set escalation rules ~ unusual requests, unhappy clients, or contract questions get flagged to you",
      "Test it ~ paste 3 real new-client messages and refine the replies until they sound like you",
    ],
  },
  {
    name: "Content Writer",
    handles: "Writes in your brand voice, formats for each platform, drafts from briefs",
    escalates: "Sensitive topics, strategy decisions, client-facing launches",
    steps: [
      "Name them and set the role ~ \"You are [name], the Content Writer for [business].\"",
      "Load context ~ upload your brand voice doc, 2–3 writing samples, and platform formatting rules",
      "Define the workflow ~ take a brief, draft in your voice, format for each platform",
      "Set escalation rules ~ sensitive topics, strategy calls, or launches get flagged to you",
      "Test it ~ give one real brief and check the voice matches before you trust it",
    ],
  },
  {
    name: "Ops Assistant",
    handles: "Processes intake forms, routes requests, drafts SOPs, summarizes notes",
    escalates: "Anything requiring judgment calls or external action",
    steps: [
      "Name them and set the role ~ \"You are [name], the Ops Assistant for [business].\"",
      "Load context ~ upload your SOPs, intake forms, routing rules, and note templates",
      "Define the workflow ~ process intake, route requests, draft SOPs, summarize notes",
      "Set escalation rules ~ judgment calls or anything needing external action get flagged to you",
      "Test it ~ run a real intake form and a messy set of notes through it",
    ],
  },
]

export default async function Session5Page() {
  const [intake, overrides, isAdmin] = await Promise.all([
    getIntakeData(),
    getSessionOverrides("cohort-1", 4),
    getIsAdmin(),
  ]);
  const session = applyOverrides({ ...SESSION, zoomUrl: "https://us06web.zoom.us/j/88295797091?pwd=MejE1DJBXzA8veH0KDbPY0B8sPb29k.1" }, overrides);

  const PROMPTS: Record<string, string> = {
    "Identify my best first AI employee role": `I run a **${intake?.business_oneliner || "[type of business]"}**. Here's how my work breaks down:

Tasks I do every day: [list 3–5 daily tasks]
Tasks I do every week: [list 3–5 weekly tasks]
Tasks I hate doing or always postpone: [list 2–3]
Tasks that eat up my time but feel repetitive: [list 2–3]

My current biggest bottleneck is: [describe ,  where does work pile up or slow down?]

Based on this, suggest:
1. The single best role for my first AI employee (name the role)
2. What they would specifically handle vs. escalate to me
3. Why this role would have the most impact on my business
4. What I need to prepare before building them`,

    "Draft a role description": `I want to create an AI employee for my business. Here's the role I've identified:

Role name: [what you'll call this employee ,  e.g. "Alex"]
Job title: **${intake?.ai_employee_role || "[e.g. Client Onboarding Coordinator]"}**
Primary responsibility: [one sentence ,  what is their core job?]

They will handle these tasks autonomously:
1. [task 1 ,  be specific about what "handling" looks like]
2. [task 2]
3. [task 3]

They will escalate to me when:
1. [escalation trigger 1]
2. [escalation trigger 2]

The tone they should use: [describe ,  warm and professional / direct and efficient / friendly and casual]
The clients they'll interact with: [describe who your clients are]

Write me:
1. A one-paragraph description of this AI employee
2. A list of 5 rules they must always follow
3. A list of 3 things they must never do`,

    "Write the system prompt": `Using the role description I just gave you, write a complete system prompt for this AI employee.

The system prompt should:
- Open with their identity (name, role, and who they work for)
- Include the full business context they need
- List their responsibilities clearly
- Define their tone and communication style with examples
- Specify what to do when they're unsure
- State clearly what they escalate and how

Format it so I can paste it directly into Cowork.`,
  };

  return (
    <div className="flex-1 bg-[var(--beige-50)] dark:bg-background flex flex-col overflow-hidden min-h-0">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
        <Link
          href={PREV}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          W1 · S2
        </Link>

        <div className="flex items-center gap-2">
          <span
            className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
            style={{ background: `${session.color}22`, color: session.color, border: `1px solid ${session.color}44` }}
          >
            {session.tag}
          </span>
          <span className="font-medium text-sm text-[var(--charcoal-900)] dark:text-foreground line-clamp-1 max-w-[280px]">
            {session.title}
          </span>
        </div>

        <Link
          href={NEXT}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground hover:opacity-70 transition-opacity"
        >
          W2 · S4
          <ArrowRight className="size-3.5" />
        </Link>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* Content */}
        <main className="flex-1 min-w-0 overflow-y-auto p-6 md:p-8 flex flex-col gap-8 tm-scrollbar">

          {/* Title */}
          <div>
            <p className="tm-eyebrow mb-1">{session.weekLabel}</p>
            <h1 className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground mb-3" style={{ fontSize: "clamp(1.25rem, 2vw, 1.875rem)" }}>
              {session.title}
            </h1>
            <p className="tm-body-sm max-w-2xl">{session.description}</p>
            {session.videoUrl && (
              <div className="relative w-full aspect-video rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] overflow-hidden mt-4">
                <iframe src={session.videoUrl} className="w-full h-full" allowFullScreen />
              </div>
            )}
          </div>

          {/* Recording */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Session recording</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Part 1", href: "https://fathom.video/calls/708311289" },
                { label: "Part 2", href: "https://fathom.video/calls/708311292" },
              ].map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-4 flex items-center gap-3 transition-colors hover:border-[var(--clay-500)]/40"
                >
                  <span className="size-9 shrink-0 rounded-full bg-[var(--clay-500)]/15 flex items-center justify-center">
                    <Play className="size-4 text-[var(--clay-500)]" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">Watch the recording ~ {r.label}</p>
                    <p className="text-xs text-[var(--taupe-400)] font-light">Opens in Fathom</p>
                  </div>
                  <ArrowRight className="size-4 text-[var(--taupe-400)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              ))}
            </div>
          </section>

          {/* Agenda */}
          <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground">
                Today's agenda · 3 hours
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)] shrink-0">4–7 PM CET · 14:00–17:00 UTC</span>
            </div>
            <ol className="space-y-0">
              {[
                { cet: "4:00 – 4:20", utc: "14:00", label: "Check-in &amp; review ~ each person shares progress on their Session 3 assignment, plus a quick look back at last session", type: "share" },
                { cet: "4:20 – 4:45", utc: "14:20", label: "What is an AI employee? ~ tool vs employee, and what Cowork makes real", type: "teach" },
                { cet: "4:45 – 5:05", utc: "14:45", label: "Discuss ~ where an AI employee fits in your business and which role to build first", type: "share" },
                { cet: "5:05 – 5:20", utc: "15:05", label: "Grouping ~ break into groups by the role type each of you is building", type: "group" },
                { cet: "5:20 – 5:30", utc: "15:20", label: "Break", type: "break" },
                { cet: "5:30 – 6:00", utc: "15:30", label: "Lecture ~ how AI employees work: named identity, role specialization, delegation, and escalation logic", type: "teach" },
                { cet: "6:00 – 6:40", utc: "16:00", label: "Hands-on ~ in your group, draft your AI employee's role description and system prompt", type: "work" },
                { cet: "6:40 – 7:00", utc: "16:40", label: "Group share &amp; wrap ~ each group presents one AI employee + preview of Session 5", type: "share" },
              ].map((item, i, arr) => {
                const badge: Record<string, { label: string; color: string }> = {
                  teach:   { label: "Teaching",   color: "bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)]" },
                  demo:    { label: "Live demo",  color: "bg-[var(--clay-500)]/10 text-[var(--clay-500)]" },
                  work:    { label: "Work time",  color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" },
                  share:   { label: "Sharing",    color: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400" },
                  group:   { label: "Grouping",   color: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" },
                  break:   { label: "Break",      color: "bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)]" },
                  plenary: { label: "",           color: "" },
                };
                const b = badge[item.type];
                return (
                  <li key={item.cet} className={`flex gap-4 items-start py-3 ${i < arr.length - 1 ? "border-b border-[var(--beige-200)] dark:border-white/5" : ""}`}>
                    <div className="shrink-0 w-28">
                      <p className="text-xs tabular-nums text-[var(--taupe-400)]">{item.cet}</p>
                      <p className="text-[10px] tabular-nums text-[var(--beige-300)] dark:text-white/30 mt-0.5">{item.utc} UTC</p>
                    </div>
                    <p className={`text-sm font-light flex-1 ${item.type === "work" ? "text-emerald-700 dark:text-emerald-400 font-medium" : "text-[var(--charcoal-900)] dark:text-foreground"}`}
                      dangerouslySetInnerHTML={{ __html: item.label }}
                    />
                    {b.label && (
                      <span className={`shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full ${b.color}`}>{b.label}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Objectives */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What you'll do in this session</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5">
              <ol className="flex flex-col gap-3">
                {objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="size-6 shrink-0 rounded-full bg-[var(--beige-100)] dark:bg-white/5 border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[11px] font-semibold text-[var(--taupe-400)]">
                      {i + 1}
                    </span>
                    <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed pt-0.5">{obj}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Tool vs Employee */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">The difference between a tool and an employee</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                A hammer is a tool. You pick it up when you need it, use it, put it down. It has no role, no identity, no judgment. You always have to be present to use it.
              </p>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                An employee has a role. They know what they're responsible for. They handle things without you asking each time. They escalate what needs you. They run whether you're watching or not.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em]">Claude.ai Projects ,  tool</p>
                  <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">You open it. You ask it something. It helps. You close it. You're always in the loop. Great for active work: writing, analysis, thinking.</p>
                </div>
                <div className="rounded-xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-4 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-[var(--clay-500)] uppercase tracking-[0.12em]">Cowork AI employee ✓</p>
                  <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">Has a name, a role, and persistent context. Handles defined tasks. Escalates what needs you. Can run interactions you're not part of.</p>
                </div>
              </div>
            </div>
          </section>

          {/* What Cowork adds */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What Cowork adds that Claude.ai alone can't do</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              {[
                { feature: "Named identity", desc: "Your AI employee has a name, a defined role, and a persistent briefing ,  they show up as someone, not something." },
                { feature: "Role specialization", desc: "Scoped context, specific workflows, and rules tailored to exactly one job. Not a generalist ,  a specialist." },
                { feature: "Delegation", desc: "You assign them work and they run it in your style. You review what needs review; the rest handles itself." },
                { feature: "Escalation logic", desc: "Defined rules for when they act autonomously vs. when they flag something for you ,  so nothing falls through the cracks." },
              ].map((item) => (
                <div key={item.feature} className="flex items-start gap-3 py-2 border-b border-[var(--beige-200)] dark:border-white/5 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">{item.feature}</p>
                    <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dispatch & Schedule */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Dispatch &amp; Schedule ~ how your AI employee actually works for you</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Two ways to put an employee to work in Cowork. <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Dispatch</strong> runs a task now, in the background. <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Schedule</strong> runs it automatically on a cadence ~ no trigger from you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Dispatch */}
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="size-7 rounded-full bg-[var(--clay-500)]/15 flex items-center justify-center shrink-0">
                    <Send className="size-3.5 text-[var(--clay-500)]" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">Dispatch</p>
                    <p className="text-[11px] text-[var(--taupe-400)]">Run a task now, in the background</p>
                  </div>
                </div>
                <ol className="flex flex-col gap-2">
                  {[
                    "Open your AI employee in Cowork",
                    "Brief the task like you would a teammate ~ what, context, what “done” looks like",
                    "Attach any files or examples it needs",
                    "Hit Dispatch ~ it runs while you do other work",
                    "Review the result, approve it, or send it back with notes",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                      <span className="size-4 shrink-0 rounded-full bg-[var(--beige-100)] dark:bg-white/5 border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[9px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                      <span className="font-light">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Schedule */}
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="size-7 rounded-full bg-indigo-500/15 flex items-center justify-center shrink-0">
                    <CalendarClock className="size-3.5 text-indigo-500 dark:text-indigo-400" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">Schedule</p>
                    <p className="text-[11px] text-[var(--taupe-400)]">Run it automatically, on a cadence</p>
                  </div>
                </div>
                <ol className="flex flex-col gap-2">
                  {[
                    "Open the employee and write the recurring task",
                    "Set the cadence ~ e.g. every weekday 8am, or every Monday",
                    "Define the output and where it should land (email, doc, message)",
                    "Set escalation ~ when to flag you vs. just deliver",
                    "Activate ~ it now runs on its own; you review the digest",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                      <span className="size-4 shrink-0 rounded-full bg-[var(--beige-100)] dark:bg-white/5 border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[9px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                      <span className="font-light">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-[var(--card)] p-5 flex flex-col gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--taupe-400)] mb-1">Why this changes your week</p>
              {[
                "Work happens without you in the loop ~ real delegation, not just assistance",
                "Mornings start with work already done ~ briefs, drafts, and summaries waiting for you",
                "Consistency ~ the same task runs the same way every single time",
                "You shift from operator to reviewer ~ you approve instead of produce",
                "Nothing slips ~ recurring work doesn't depend on you remembering",
              ].map((b, i) => (
                <p key={i} className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed flex items-start gap-2">
                  <span className="text-[var(--clay-500)] shrink-0 mt-0.5">+</span>
                  {b}
                </p>
              ))}
            </div>

            {/* Why better in Cowork */}
            <div className="rounded-2xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-5 flex flex-col gap-2">
              <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground flex items-center gap-2">
                <Sparkles className="size-4 text-[var(--clay-500)]" />
                Why this is better in Cowork than Claude.ai alone
              </p>
              {[
                "Claude.ai is a tool you must be present for ~ open it, ask, close it. Cowork runs without you.",
                "Persistent context ~ the employee already knows your business, so there's no re-briefing each time.",
                "Background + scheduled execution ~ Claude.ai can't run on its own clock; a Cowork employee can.",
                "Parallel employees ~ dispatch several jobs at once and let them run side by side.",
                "Built-in escalation ~ it knows when to act vs. flag you, so the autonomy stays safe.",
              ].map((b, i) => (
                <p key={i} className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed flex items-start gap-2">
                  <span className="text-[var(--clay-500)] shrink-0 mt-0.5">~</span>
                  {b}
                </p>
              ))}
            </div>
          </section>

          {/* Role examples */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Real role examples ,  what other businesses have built</p>
            <div className="flex flex-col gap-3">
              {roleExamples.map((role) => (
                <div key={role.name} className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-4 flex flex-col gap-3">
                  <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">{role.name}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[var(--taupe-400)] font-semibold uppercase tracking-[0.1em]">Handles: </span>
                      <span className="text-[var(--charcoal-900)] dark:text-foreground font-light">{role.handles}</span>
                    </div>
                    <div>
                      <span className="text-[var(--taupe-400)] font-semibold uppercase tracking-[0.1em]">Escalates: </span>
                      <span className="text-[var(--charcoal-900)] dark:text-foreground font-light">{role.escalates}</span>
                    </div>
                  </div>
                  <div className="border-t border-[var(--beige-200)] dark:border-white/5 pt-3">
                    <p className="text-[10px] text-[var(--taupe-400)] font-semibold uppercase tracking-[0.1em] mb-2">How to build this one</p>
                    <ol className="flex flex-col gap-2">
                      {role.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                          <span className="size-4 shrink-0 rounded-full bg-[var(--beige-100)] dark:bg-white/5 border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[9px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                          <span className="font-light">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Roles that don't work */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Roles that don't work well yet</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-[var(--card)] p-5 flex flex-col gap-2">
              {[
                "Roles that need live data (current inventory, real-time pricing, live calendar availability)",
                "Roles that require actual system access (sending emails autonomously, booking appointments)",
                "Roles with too much judgment involved (final financial decisions, legal advice, sensitive HR situations)",
              ].map((item, i) => (
                <p key={i} className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed flex items-start gap-2">
                  <span className="text-[var(--taupe-400)] shrink-0 mt-0.5">×</span>
                  {item}
                </p>
              ))}
              <p className="text-xs text-[var(--taupe-400)] font-light mt-1">These limitations will change as the tools evolve. For now, start with roles that run on information, writing, and structured responses.</p>
            </div>
          </section>

          {/* Prompts */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Prompts ,  use these to design your first AI employee</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Run these in your <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Thinking Partner</strong> Project ,  it's the right space for strategic decisions like this.
            </p>
            <CodeTabs codes={PROMPTS} lang="markdown" />
          </section>

          {/* Exercise */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Your exercise for this session</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Bring these to Session 4:</p>
              <ol className="flex flex-col gap-2">
                {[
                  "Use the \"Identify my best first AI employee role\" prompt and commit to one role",
                  "Draft the role description using the template",
                  "Collect 3 real requests from your clients (actual emails or messages you've received)",
                  "Write a draft system prompt using the third tab above",
                  "Come to Session 4 ready to paste your system prompt into Cowork and test it live",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                    <span className="size-5 shrink-0 rounded-full border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[10px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Next session card */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Up next: Build and test your first AI employee live</p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Week 2 · Session 4 ,  Sun, Jun 14</p>
            </div>
            <Link
              href={NEXT}
              className="inline-flex items-center gap-2 shrink-0 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Next
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="lg:w-72 xl:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-6 flex flex-col gap-6 overflow-y-auto tm-scrollbar">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-3">Session details</p>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--taupe-400)]">Date</dt>
                <dd className="font-medium text-[var(--charcoal-900)] dark:text-foreground text-right">{session.date}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--taupe-400)]">Time</dt>
                <dd className="font-medium text-[var(--charcoal-900)] dark:text-foreground text-right">{session.time}</dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-3">Bring to this session</p>
            <ul className="space-y-2">
              {bringList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                  <span className="size-1.5 rounded-full bg-[var(--clay-500)] mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources (zoom background) hidden per request */}

          <div className="mt-auto">
            <a href={session.zoomUrl} className="inline-flex items-center justify-center gap-2 w-full bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity">
              Join live on Zoom
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </aside>
      </div>
      {isAdmin && (
        <SessionEditPanel courseSlug="cohort-1" sessionNumber={4} initial={session} />
      )}
    </div>
  );
}

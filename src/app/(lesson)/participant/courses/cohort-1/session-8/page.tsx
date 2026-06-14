import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";
import { getIntakeData } from "@/utils/intake-helper";
import { getSessionOverrides, getIsAdmin, applyOverrides } from "@/utils/session-content";
import { SessionEditPanel } from "@/components/session-edit-panel";

const SESSION = {
  tag: "W4 · S7",
  color: "#6B5A7A",
  weekLabel: "Week 4 · Living with Claude",
  title: "Your full Claude stack working together",
  date: "Sat, Jun 27",
  time: "10 AM–1 PM EST",
  videoUrl: null as string | null,
  description:
    "All three outputs from the bootcamp ,  your Claude.ai Projects, your AI employee, and your Claude Code dashboard ,  run together in a real workflow. We'll map exactly where Claude fits in your workday and write your daily routine.",
  resources: [
    { label: "Daily routine template", href: "#" },
    { label: "Stack integration guide", href: "#" },
    { label: "Session slides", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const PREV     = "/participant/courses/cohort-1/session-7";
const NEXT     = "/participant/courses/cohort-1/session-9";

const bringList = [
  "Your 3 Claude.ai Projects (configured and active)",
  "Your Cowork AI employee (named, briefed, and tested)",
  "Your Claude Code business dashboard (running in browser)",
];

const objectives = [
  "Map your full 3-layer Claude stack",
  "See how all three layers connect in a real daily workflow",
  "Write your daily Claude routine (3 specific moments)",
  "Prepare your 2-minute showcase for Session 8",
];

const stackLayers = [
  {
    layer: "Layer 1",
    name: "Claude.ai Projects",
    role: "Your thinking partner",
    when: "When you need to think, write, or decide",
    examples: ["Draft client proposals and emails", "Think through a business problem out loud", "Research, analyze, summarize", "Plan your week, strategy sessions"],
    color: "#C4A882",
  },
  {
    layer: "Layer 2",
    name: "Cowork AI employee",
    role: "Your delegate",
    when: "When work can run without you in every message",
    examples: ["Handle routine client inquiries", "Process intake and route requests", "Send welcome sequences", "Draft follow-ups in your voice"],
    color: "#7D6B5A",
  },
  {
    layer: "Layer 3",
    name: "Claude Code dashboard",
    role: "Your visibility tool",
    when: "When you need to see what's happening at a glance",
    examples: ["Check key metrics each morning", "Track client project status", "Review weekly numbers", "Monitor what your AI employee handled"],
    color: "#5A7A6B",
  },
];

const workflowExample = [
  { time: "8:00 AM", layer: "Layer 3", action: "Open your Claude Code dashboard → see 3 new client inquiries flagged overnight" },
  { time: "8:15 AM", layer: "Layer 2", action: "Your Cowork AI employee already responded to 2 of them with qualification questions" },
  { time: "8:30 AM", layer: "Layer 1", action: "Open Claude.ai → paste the third (complex) inquiry → get a draft response → review and send" },
  { time: "11:00 AM", layer: "Layer 1", action: "Use Claude.ai to prep for an afternoon client call ,  pull talking points from your Project" },
  { time: "4:00 PM", layer: "Layer 1", action: "Ask Claude.ai to draft your weekly client update using metrics from your dashboard" },
  { time: "4:30 PM", layer: "Layer 2", action: "Your AI employee sends a catch-up message to clients who haven't checked in this week" },
];

export default async function Session9Page() {
  const [intake, overrides, isAdmin] = await Promise.all([
    getIntakeData(),
    getSessionOverrides("cohort-1", 8),
    getIsAdmin(),
  ]);
  const session = applyOverrides({ ...SESSION, zoomUrl: "https://us06web.zoom.us/j/88295797091?pwd=MejE1DJBXzA8veH0KDbPY0B8sPb29k.1" }, overrides);

  const PROMPTS: Record<string, string> = {
    "Map my Claude stack": `I've completed the AI Business Bootcamp. Here's what I built:

My Claude.ai Projects:
1. [Project name] ,  I use this for: [purpose]
2. [Project name] ,  I use this for: [purpose]
3. [Project name] ,  I use this for: [purpose]

My Cowork AI employee:
- Name: [name]
- Role: **${intake?.ai_employee_role || "[job title]"}**
- They handle: [list their main tasks]
- They escalate: [what comes to me]

My Claude Code dashboard:
- Shows: [what metrics / data]
- I check it: [when ,  morning / weekly / before client calls]

Now help me:
1. Identify any gaps ,  workflows I should have covered but didn't
2. Spot any overlaps ,  places where two layers are doing the same thing
3. Write a summary of my complete Claude stack in plain language I could explain to a colleague`,

    "Write my daily routine": `Based on my Claude stack above, help me write a specific daily Claude routine.

My typical workday looks like:
[Describe your day ,  when you start, what types of work you do in the morning vs. afternoon, how you interact with clients, what tasks are repetitive]

Write my routine in this format:

MORNING (time ___):
→ I open [which tool] to [do what ,  be specific]
→ This takes approximately [__ minutes]

MIDDAY (time ___):
→ [AI employee] handles [what] without me
→ I check in on [what] if needed

AFTERNOON (time ___):
→ I use [which Claude layer] for [what]

END OF DAY (time ___):
→ I check [dashboard] to see [what]
→ I spend [___ minutes] using Claude to [close the day]

WEEKLY (day ___):
→ Deeper use: [what]

Make each step concrete and specific to my actual business ,  not generic habits.`,

    "Prepare my showcase": `I need to present my work from the bootcamp in 2 minutes. Here's what I built:

[Paste your stack map from the first prompt above]

One concrete result or change in my business since starting: [describe something real ,  even small ,  that's different now]

Something I'm going to build or improve next: [what's next for your Claude practice]

Write me a 2-minute verbal presentation using this structure:
- 30 sec: Who I am and what my business does
- 45 sec: What I built (make it tangible ,  not "I built things" but specific)
- 30 sec: One result or change this created
- 15 sec: What I'm building next

Keep it conversational. No slides needed ,  this is spoken.`,
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
          W3 · S6
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
          W4 · S8
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

          {/* Three-layer stack */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Your 3-layer Claude stack</p>
            <div className="flex flex-col gap-3">
              {stackLayers.map((layer) => (
                <div key={layer.layer} className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] overflow-hidden">
                  <div className="px-5 py-3 flex items-center gap-3" style={{ background: `${layer.color}18`, borderBottom: `1px solid ${layer.color}22` }}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: layer.color }}>{layer.layer}</span>
                    <span className="font-medium text-sm text-[var(--charcoal-900)] dark:text-foreground">{layer.name}</span>
                    <span className="text-xs text-[var(--taupe-400)] font-light ml-auto">{layer.role}</span>
                  </div>
                  <div className="px-5 py-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold text-[var(--taupe-400)] uppercase tracking-[0.1em] mb-1.5">When to use it</p>
                      <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light" dangerouslySetInnerHTML={{ __html: layer.when }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold text-[var(--taupe-400)] uppercase tracking-[0.1em] mb-1.5">Examples</p>
                      <ul className="flex flex-col gap-1">
                        {layer.examples.map((ex) => (
                          <li key={ex} className="flex items-start gap-1.5 text-xs text-[var(--charcoal-900)] dark:text-foreground font-light">
                            <span className="shrink-0 mt-0.5" style={{ color: layer.color }}>·</span>
                            <span dangerouslySetInnerHTML={{ __html: ex }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Workflow example */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">How they connect ,  a real workday example</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] overflow-hidden">
              {workflowExample.map((item, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[60px_80px_1fr] gap-3 px-5 py-3 items-start text-sm ${i < workflowExample.length - 1 ? "border-b border-[var(--beige-200)] dark:border-white/5" : ""} ${i % 2 === 0 ? "bg-[var(--beige-50)] dark:bg-transparent" : "bg-white dark:bg-white/[0.02]"}`}
                >
                  <span className="text-[var(--taupe-400)] font-light text-xs pt-0.5">{item.time}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--taupe-400)] pt-0.5">{item.layer}</span>
                  <span className="text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: item.action }} />
                </div>
              ))}
            </div>
          </section>

          {/* Autonomy ladder */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">When to let it run alone ~ the autonomy ladder</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              As your stack matures, the question shifts from &ldquo;how do I use Claude&rdquo; to &ldquo;what do I let run without me.&rdquo; Here&apos;s how to decide ~ each rung is more leverage and more blast radius, so earn them in order.
            </p>

            {/* Ladder */}
            <div className="flex flex-col gap-2">
              {[
                { n: 1, level: "Chat", trig: "You", appr: "You", what: "A tool ~ you open it, ask, and close it", hot: false },
                { n: 2, level: "Dispatch", trig: "You", appr: "You", what: "An employee you hand one task to", hot: false },
                { n: 3, level: "Schedule", trig: "Itself (clock)", appr: "You, by exception", what: "An employee running on a cadence", hot: false },
                { n: 4, level: "Agent", trig: "Itself (clock / event)", appr: "Itself ~ escalates exceptions", what: "It acts; you supervise", hot: true },
              ].map((r) => (
                <div key={r.n} className={`rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${r.hot ? "border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5" : "border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]"}`}>
                  <div className="flex items-center gap-3 sm:w-44 shrink-0">
                    <span className={`size-7 shrink-0 rounded-full flex items-center justify-center text-[11px] font-semibold ${r.hot ? "bg-[var(--clay-500)] text-white" : "bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)] border border-[var(--beige-200)] dark:border-white/10"}`}>{r.n}</span>
                    <span className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">{r.level}</span>
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-[1fr_1fr_1.2fr] gap-1 sm:gap-3 text-xs">
                    <span className="text-[var(--charcoal-900)] dark:text-foreground"><span className="text-[var(--taupe-400)] font-semibold uppercase tracking-[0.08em]">Triggers: </span>{r.trig}</span>
                    <span className="text-[var(--charcoal-900)] dark:text-foreground"><span className="text-[var(--taupe-400)] font-semibold uppercase tracking-[0.08em]">Approves: </span>{r.appr}</span>
                    <span className="text-[var(--taupe-400)] font-light">{r.what}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--taupe-400)] font-light">
              The line from <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">employee → agent</strong> is crossed when it self-triggers, runs a multi-step loop with tools, and surfaces only the exceptions ~ you move from <em>in</em> the loop to <em>on</em> the loop.
            </p>

            {/* 4 tests */}
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">Automate a step only when it passes all four</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { t: "Reversible", d: "You can undo it if it's wrong" },
                  { t: "Low-stakes", d: "A bad result doesn't hurt you" },
                  { t: "Well-tested", d: "You've watched it do this right many times" },
                  { t: "Bounded", d: "Clear scope, clear stop condition" },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-3">
                    <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">{x.t}</p>
                    <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prepare vs act + Maya example */}
            <div className="rounded-2xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-5 flex flex-col gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">The rule ~ automate the preparation, gate the action</p>
                <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Automate what&apos;s reversible and private; require approval for what&apos;s public and irreversible. Maya&apos;s pipeline:</p>
              </div>
              <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] overflow-hidden">
                {[
                  { step: "Scrape Threads / IG (Apify)", ok: true, why: "read-only, reversible" },
                  { step: "Score Warm / Maybe / Skip", ok: true, why: "private, reversible" },
                  { step: "Draft the DMs", ok: true, why: "nothing is sent yet" },
                  { step: "Queue them to a Sheet", ok: true, why: "private, easy to fix" },
                  { step: "Send the DMs", ok: false, why: "irreversible, public, against Meta ToS" },
                ].map((row, i, arr) => (
                  <div key={row.step} className={`flex items-center gap-3 px-4 py-2.5 ${i < arr.length - 1 ? "border-b border-[var(--beige-200)] dark:border-white/5" : ""}`}>
                    <span className={`size-5 shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold ${row.ok ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" : "bg-[var(--clay-500)]/15 text-[var(--clay-500)]"}`}>{row.ok ? "✓" : "×"}</span>
                    <span className="text-sm text-[var(--charcoal-900)] dark:text-foreground flex-1">{row.step}</span>
                    <span className="text-[11px] text-[var(--taupe-400)] font-light hidden sm:block">{row.why}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed border-t border-[var(--clay-500)]/20 pt-3">
                That&apos;s the &ldquo;<strong className="font-semibold">you prepare, I send</strong>&rdquo; rule from Maya&apos;s brief ~ scheduling just makes the prepare-part run on its own. She fills your queue weekly; you keep the risky 10%.
              </p>
            </div>
          </section>

          {/* Daily routine concept */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Designing your daily routine</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                A routine is a Claude stack that runs without you having to decide when to use it. The participants who get the most out of Claude after the bootcamp aren't the ones who use it the most ,  they're the ones who have specific triggers that open Claude automatically.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { trigger: "Morning open", question: "Which tool do you open first, every day? What are you looking for?" },
                  { trigger: "Midday delegate", question: "What does your AI employee handle without you checking in?" },
                  { trigger: "End of day check", question: "What does your dashboard tell you at 5 PM?" },
                  { trigger: "Weekly depth", question: "When do you sit with Claude for longer thinking ,  planning, strategy, reflection?" },
                ].map((item) => (
                  <div key={item.trigger} className="flex items-start gap-3 py-2 border-b border-[var(--beige-200)] dark:border-white/5 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">{item.trigger}</p>
                      <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">{item.question}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Prompts */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Prompts ,  use these in your Thinking Partner Project</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Run these in order. The stack map feeds into the daily routine. Both feed into your showcase.
            </p>
            <CodeTabs codes={PROMPTS} lang="markdown" />
          </section>

          {/* Showcase prep */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Showcase prep ,  what to have ready for Session 8</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Your 2-minute showcase covers 4 things:</p>
              <ol className="flex flex-col gap-2">
                {[
                  "30 sec: Who you are and what your business does (assume the group knows you ,  be brief)",
                  "45 sec: What you built ,  show it if you can. Describe it specifically if not.",
                  "30 sec: One result or change in your business ,  even small counts",
                  "15 sec: What you're building or improving next",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                    <span className="size-5 shrink-0 rounded-full border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[10px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: step }} />
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Week 4 Deliverable */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-2">Week 4 Deliverable</p>
            <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
              A written daily Claude routine: 3 specific moments in your workday where Claude is open and ready ,  with the exact tool and the exact task described for each.
            </p>
          </div>

          {/* Next session card */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Up next: Showcases, Q&amp;A, and graduation</p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Week 4 · Session 8 ,  Sun, Jun 28</p>
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

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-3">Resources</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="/assets/events/kickoff-banner.png"
                  download="talentmucho-zoom-background.png"
                  className="text-sm text-[var(--charcoal-900)] dark:text-foreground hover:opacity-70 transition-opacity underline underline-offset-2 decoration-[var(--beige-200)]"
                >
                  Download Zoom background
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-auto">
            <a href={session.zoomUrl} className="inline-flex items-center justify-center gap-2 w-full bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity">
              Join live on Zoom
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </aside>
      </div>
      {isAdmin && (
        <SessionEditPanel courseSlug="cohort-1" sessionNumber={8} initial={session} />
      )}
    </div>
  );
}

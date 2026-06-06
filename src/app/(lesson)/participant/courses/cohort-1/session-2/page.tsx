import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";
import { getIntakeData } from "@/utils/intake-helper";
import { getSessionOverrides, getIsAdmin, applyOverrides } from "@/utils/session-content";
import { SessionEditPanel } from "@/components/session-edit-panel";

const SESSION = {
  tag: "W1 · S1",
  color: "#C4A882",
  weekLabel: "Week 1 · Knowing Claude",
  title: "The interface, Projects, your first conversation",
  date: "Sat, Jun 7",
  time: "4–7 PM CET · 14:00–17:00 UTC",
  videoUrl: null as string | null,
  description:
    "We start with the interface itself ,  getting oriented in Claude.ai, understanding how Projects differ from conversations, and building your first real exchange with Claude using your actual business context.",
  resources: [
    { label: "Session slides", href: "#" },
    { label: "Claude.ai interface guide", href: "#" },
    { label: "Projects quick-start", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const PREV     = "/participant/courses/cohort-1/session-1";
const NEXT     = "/participant/courses/cohort-1/session-3";


const bringList = [
  "Claude account set up before joining ~ Free works, Pro recommended",
  "One real task from your business you want help with today",
  "A writing sample in your voice (email, post, or message you sent recently)",
];

const steps_project = [
  "Go to claude.ai and sign in",
  'Click "Projects" in the left sidebar',
  'Click "New Project" and name it after your business (e.g. "Acme Co ,  General")',
  "You're now inside a Project ,  any files or instructions you add here will persist across every conversation in this Project",
  "Leave the Project open for the exercises below",
];

export default async function Session2Page() {
  const [intake, overrides, isAdmin] = await Promise.all([
    getIntakeData(),
    getSessionOverrides("cohort-1", 2),
    getIsAdmin(),
  ]);
  const session = applyOverrides({ ...SESSION, zoomUrl: "https://us06web.zoom.us/j/88295797091?pwd=MejE1DJBXzA8veH0KDbPY0B8sPb29k.1" }, overrides);

  const firstName = intake?.first_name || "there";
  const businessContext = intake?.business_oneliner || "[your business]";

  const PROMPTS: Record<string, string> = {
    "Orient Claude to my business": `I run a **${intake?.first_focus || "[type of business ,  e.g. coaching practice, e-commerce store, design agency]"}**.

Here's the context you need to work with me effectively:

Business: **${intake?.business_oneliner || "[describe what you do in 2–3 sentences]"}**
Customers: [who you serve and what they hire you to do]
Team size: [solo / small team of ___]
My biggest current challenge: [one clear, specific problem]
My goal for this bootcamp: **${intake?.one_thing || "[what I want to walk away able to do]"}**

From now on in this Project, use this context to give me specific, relevant advice ,  not generic tips.

Before we start, ask me one clarifying question that would help you give me better answers.`,

    "Your first real ask": `Based on the business context I just gave you, help me with this specific task:

[Describe one task or problem from your actual business. Be specific ,  not "help me with marketing" but "help me write a follow-up email for a prospect who went quiet after our discovery call."]

Format your response as:
1. Your recommendation
2. The specific steps I should take
3. One thing to watch out for

Keep it practical. I should be able to act on this today.`,

    "Test Claude's understanding": `Before we go further, I want to check what you know about me.

Summarize my business in your own words ,  what I do, who I serve, and what I'm working on.

Then tell me:
- What types of tasks you think I should use you for most in this bootcamp
- What information you're still missing that would make you more useful
- One question you'd want me to answer before our next conversation`,
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
          Kickoff
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
          W1 · S2
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

          {/* Agenda */}
          <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground">
                Today&apos;s agenda · 3 hours
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)] shrink-0">4–7 PM CET · 14:00–17:00 UTC</span>
            </div>
            <ol className="space-y-0">
              {[
                { cet: "4:00 – 4:10", utc: "14:00", label: "Welcome & quick recap from kickoff", type: "plenary" },
                { cet: "4:10 – 4:25", utc: "14:10", label: "Coming from ChatGPT? How to bring your memory across", type: "teach" },
                { cet: "4:25 – 4:50", utc: "14:25", label: "4 ways to use Claude ~ matrix, install guides, Cowork preview (Week 2 teaser)", type: "teach" },
                { cet: "4:50 – 5:15", utc: "14:50", label: "Projects deep dive ~ why they exist + live demo: create your first Project", type: "demo" },
                { cet: "5:15 – 5:25", utc: "15:15", label: "Your 5-project business system + prompts walkthrough", type: "teach" },
                { cet: "5:25 – 5:30", utc: "15:25", label: "Work brief ~ what you&apos;re building in the next hour", type: "plenary" },
                { cet: "5:30 – 6:30", utc: "15:30", label: "Work time ~ set up your Projects, run the prompts, build your brand voice", type: "work" },
                { cet: "6:30 – 6:50", utc: "16:30", label: "Group share ~ each person shows what Claude now knows about their business", type: "share" },
                { cet: "6:50 – 7:00", utc: "16:50", label: "Q&A · preview of Session 3 (custom instructions + file uploads)", type: "plenary" },
              ].map((item, i, arr) => {
                const badge: Record<string, { label: string; color: string }> = {
                  teach:   { label: "Teaching",   color: "bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)]" },
                  demo:    { label: "Live demo",  color: "bg-[var(--clay-500)]/10 text-[var(--clay-500)]" },
                  work:    { label: "Work time",  color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" },
                  share:   { label: "Sharing",    color: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400" },
                  plenary: { label: "",           color: "" },
                };
                const b = badge[item.type];
                return (
                  <li key={item.cet} className={`flex gap-4 items-start py-3 ${i < arr.length - 1 ? "border-b border-[var(--beige-200)] dark:border-white/5" : ""}`}>
                    <div className="shrink-0 w-28">
                      <p className="text-xs tabular-nums text-[var(--taupe-400)]">{item.cet}</p>
                      <p className="text-[10px] tabular-nums text-[var(--beige-300)] dark:text-white/30 mt-0.5">{item.utc} UTC</p>
                    </div>
                    <p
                      className={`text-sm font-light flex-1 ${item.type === "work" ? "text-emerald-700 dark:text-emerald-400 font-medium" : "text-[var(--charcoal-900)] dark:text-foreground"}`}
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

          {/* Why this matters */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Why this session matters</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                The participants who get the most out of Claude aren&apos;t the ones who use it the most ,  they&apos;re the ones who use it right from the start. That means treating Claude like a thinking partner, not a search engine. Vague questions get generic answers. Specific context gets specific, useful output.
              </p>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                This session is about building that muscle. By the time you finish today, Claude will know enough about your business to give you advice that actually applies to you ,  not generic tips you could find anywhere.
              </p>
            </div>
          </section>

          {/* Projects vs Conversations */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Projects vs. conversations ,  the key difference</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                When you start a new conversation on Claude.ai, Claude has zero memory of you, your business, or anything you&apos;ve discussed before. Every new chat starts cold. For one-off questions, that&apos;s fine. For running your business, it&apos;s a problem.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4 flex flex-col gap-1.5">
                  <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em]">Conversation</p>
                  <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed font-light">Starts fresh every time. Claude knows nothing about you. You have to re-explain your context in every session.</p>
                </div>
                <div className="rounded-xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-4 flex flex-col gap-1.5">
                  <p className="text-xs font-semibold text-[var(--clay-500)] uppercase tracking-[0.12em]">Project ✓</p>
                  <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed font-light">A persistent room where your files, custom instructions, and business context always live. Claude walks in already briefed.</p>
                </div>
              </div>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Think of a Project like hiring a contractor who keeps all your notes on file. Every time they show up, they already know your preferences, your style, and what you&apos;re working on. That&apos;s what we&apos;re building today.
              </p>
            </div>
          </section>

          {/* Moving from ChatGPT to Claude */}
          <section className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] flex flex-col gap-4">
            <div>
              <p className="tm-eyebrow mb-1">Coming from ChatGPT?</p>
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-2">How to bring your ChatGPT memory into Claude</h3>
              <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed">ChatGPT&apos;s memory lives in your account. Here&apos;s how to export it and load it into Claude so you&apos;re not starting from zero.</p>
            </div>
            <ol className="space-y-3">
              {[
                { n: 1, step: "Export your ChatGPT memory", detail: 'Go to ChatGPT → Settings → Personalisation → Memory → "Manage Memory". Copy all saved memories.' },
                { n: 2, step: "Paste into a plain text file", detail: 'Create a file called chatgpt-memory.txt and paste everything in. One memory per line is fine.' },
                { n: 3, step: "Upload to your Claude Projects", detail: 'Inside each Claude Project, upload chatgpt-memory.txt under "Project Knowledge". Claude will reference it in every conversation.' },
                { n: 4, step: "Write new Claude instructions", detail: 'In Project Instructions, tell Claude: "I\'ve uploaded my ChatGPT memory above. Use it as context about how I work, my preferences, and my business."' },
                { n: 5, step: "Test it", detail: 'Ask Claude: "Based on my uploaded memory, what do you know about how I like to work?" Refine your instructions from there.' },
              ].map((s) => (
                <li key={s.n} className="flex gap-3 items-start border-b border-[var(--beige-200)] dark:border-white/5 pb-3 last:border-0 last:pb-0">
                  <span className="shrink-0 size-5 rounded-full bg-[var(--beige-100)] dark:bg-white/5 flex items-center justify-center text-[10px] font-bold text-[var(--taupe-400)] border border-[var(--beige-200)] dark:border-white/10 mt-0.5">{s.n}</span>
                  <div>
                    <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">{s.step}</p>
                    <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5 leading-relaxed">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* 4 ways to use Claude ~ matrix */}
          <section className="flex flex-col gap-3">
            <div>
              <p className="tm-eyebrow mb-1">Know your tools</p>
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-1">4 ways to use Claude ~ and when to use each</h3>
              <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed">Claude isn&apos;t just a chat window. Here&apos;s the full picture.</p>
            </div>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden overflow-x-auto">
              <div className="min-w-[640px]">
                {/* Header row */}
                <div className="grid grid-cols-5 bg-[var(--beige-100)] dark:bg-white/5 border-b border-[var(--beige-200)] dark:border-white/5">
                  {["", "Claude.ai / Desktop App", "Terminal (CLI)", "Browser Extension", "IDE (VS Code)"].map((h, i) => (
                    <div key={i} className="px-3 py-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)]">{h}</p>
                    </div>
                  ))}
                </div>
                {[
                  {
                    label: "Best for",
                    vals: [
                      "Writing, brainstorming, documents, Projects",
                      "Building tools, running code, automating tasks",
                      "Using Claude inside any website or app you already have open",
                      "Coding with AI alongside your editor ~ Claude sees your files",
                    ],
                  },
                  {
                    label: "Skill level",
                    vals: ["Beginner ~ no setup", "Intermediate ~ terminal comfort needed", "Beginner ~ one-click install", "Beginner ~ install extension in VS Code"],
                  },
                  {
                    label: "Key benefit",
                    vals: [
                      "Best context via Projects; desktop app adds a dock shortcut + global hotkey ~ same experience, faster access",
                      "Reads/writes local files, runs commands, builds dashboards",
                      "Claude reads what&apos;s on your screen ~ scrape a page, summarise an email thread, or draft a reply without copy-pasting anything",
                      "Claude sees your whole codebase; writes, edits, explains in place",
                    ],
                  },
                  {
                    label: "Limitation",
                    vals: [
                      "Can&apos;t touch your local files or other apps",
                      "Requires comfort with the command line",
                      "Lighter context ~ no persistent Projects",
                      "Tightly coupled to VS Code ~ for scripts, installs, or filesystem tasks you&apos;ll naturally switch to the terminal",
                    ],
                  },
                  {
                    label: "Use in bootcamp",
                    vals: ["Weeks 1 & 2 ~ Projects + AI employees", "Week 3 ~ build your dashboard live", "Ongoing ~ speed up any browser-based task", "Week 3 onward ~ coding alongside Claude"],
                  },
                ].map((row, ri) => (
                  <div key={ri} className={`grid grid-cols-5 ${ri % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-[var(--beige-50)] dark:bg-white/[0.02]"} border-b border-[var(--beige-200)] dark:border-white/5 last:border-0`}>
                    <div className="px-3 py-3 border-r border-[var(--beige-200)] dark:border-white/5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--taupe-400)]">{row.label}</p>
                    </div>
                    {row.vals.map((v, vi) => (
                      <div key={vi} className="px-3 py-3 border-r border-[var(--beige-200)] dark:border-white/5 last:border-0">
                        <p className="text-xs text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: v }} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-[var(--taupe-400)] font-light px-1">
              We&apos;ll use all four during this bootcamp. Today starts with Claude.ai. Week 3 goes into the terminal and IDE. The browser extension is yours to explore anytime.
            </p>

            {/* Install guides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-1">
              {/* Claude Code CLI */}
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)] mb-0.5">Terminal</p>
                    <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Install Claude Code CLI</p>
                  </div>
                  <a
                    href="https://docs.anthropic.com/en/docs/claude-code/getting-started"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
                  >
                    Docs
                    <ArrowRight className="size-3" />
                  </a>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <ol className="space-y-2">
                    {[
                      { n: 1, text: "Install Node.js 18+ if you don&apos;t have it", sub: "nodejs.org → download LTS" },
                      { n: 2, text: "Run this in your terminal", sub: null, code: "npm install -g @anthropic-ai/claude-code" },
                      { n: 3, text: "Authenticate", sub: null, code: "claude" },
                      { n: 4, text: "Follow the browser login prompt", sub: "Logs you in with your Claude account" },
                    ].map((s) => (
                      <li key={s.n} className="flex gap-2.5 items-start">
                        <span className="shrink-0 size-4 rounded-full bg-[var(--beige-100)] dark:bg-white/5 flex items-center justify-center text-[9px] font-bold text-[var(--taupe-400)] border border-[var(--beige-200)] dark:border-white/10 mt-0.5">{s.n}</span>
                        <div className="min-w-0">
                          <p className="text-xs text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: s.text }} />
                          {s.sub && <p className="text-[11px] text-[var(--taupe-400)] font-light mt-0.5">{s.sub}</p>}
                          {s.code && (
                            <code className="mt-1 block text-[11px] font-mono bg-[var(--beige-50)] dark:bg-[var(--espresso-700)] text-[var(--charcoal-900)] dark:text-[var(--taupe-400)] px-2.5 py-1.5 rounded-lg break-all">
                              {s.code}
                            </code>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="text-[11px] text-[var(--taupe-400)] font-light border-t border-[var(--beige-200)] dark:border-white/5 pt-3">
                    Requires Pro plan or above. We&apos;ll use this in Week 3.
                  </p>
                </div>
              </div>

              {/* VS Code extension */}
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)] mb-0.5">IDE</p>
                    <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Claude for VS Code</p>
                  </div>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=Anthropic.claude-code"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
                  >
                    Marketplace
                    <ArrowRight className="size-3" />
                  </a>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <ol className="space-y-2">
                    {[
                      { n: 1, text: "Open VS Code", sub: "code.visualstudio.com if you need it" },
                      { n: 2, text: "Open Extensions panel", sub: null, code: "⌘ Shift X  (Mac)  ·  Ctrl Shift X  (Win)" },
                      { n: 3, text: 'Search "Claude Code" and install', sub: "Publisher: Anthropic" },
                      { n: 4, text: "Sign in with your Claude account", sub: "Click the Claude icon in the sidebar" },
                    ].map((s) => (
                      <li key={s.n} className="flex gap-2.5 items-start">
                        <span className="shrink-0 size-4 rounded-full bg-[var(--beige-100)] dark:bg-white/5 flex items-center justify-center text-[9px] font-bold text-[var(--taupe-400)] border border-[var(--beige-200)] dark:border-white/10 mt-0.5">{s.n}</span>
                        <div className="min-w-0">
                          <p className="text-xs text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{s.text}</p>
                          {s.sub && <p className="text-[11px] text-[var(--taupe-400)] font-light mt-0.5">{s.sub}</p>}
                          {s.code && (
                            <code className="mt-1 block text-[11px] font-mono bg-[var(--beige-50)] dark:bg-[var(--espresso-700)] text-[var(--charcoal-900)] dark:text-[var(--taupe-400)] px-2.5 py-1.5 rounded-lg">
                              {s.code}
                            </code>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="text-[11px] text-[var(--taupe-400)] font-light border-t border-[var(--beige-200)] dark:border-white/5 pt-3">
                    Works on Free plan. Claude reads your open files and writes code alongside you.
                  </p>
                </div>
              </div>

              {/* Browser extension */}
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)] mb-0.5">Browser</p>
                    <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Claude browser extension</p>
                  </div>
                  <a
                    href="https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
                  >
                    Chrome Store
                    <ArrowRight className="size-3" />
                  </a>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <ol className="space-y-2">
                    {[
                      { n: 1, text: "Open Chrome (or any Chromium browser)", sub: "Edge, Brave, and Arc work too" },
                      { n: 2, text: "Go to the Chrome Web Store link above", sub: null },
                      { n: 3, text: 'Click "Add to Chrome" → "Add extension"', sub: null },
                      { n: 4, text: "Pin it to your toolbar", sub: "Click the puzzle icon → pin Claude" },
                      { n: 5, text: "Click the Claude icon on any page", sub: "Opens a sidebar ~ Claude can see what you&apos;re reading" },
                    ].map((s) => (
                      <li key={s.n} className="flex gap-2.5 items-start">
                        <span className="shrink-0 size-4 rounded-full bg-[var(--beige-100)] dark:bg-white/5 flex items-center justify-center text-[9px] font-bold text-[var(--taupe-400)] border border-[var(--beige-200)] dark:border-white/10 mt-0.5">{s.n}</span>
                        <div className="min-w-0">
                          <p className="text-xs text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{s.text}</p>
                          {s.sub && <p className="text-[11px] text-[var(--taupe-400)] font-light mt-0.5" dangerouslySetInnerHTML={{ __html: s.sub }} />}
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="text-[11px] text-[var(--taupe-400)] font-light border-t border-[var(--beige-200)] dark:border-white/5 pt-3">
                    Works on Free plan. Lets you use Claude inside Gmail, Notion, Google Docs, LinkedIn ~ anywhere in your browser.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Create your first Project */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Create your first Project ,  step by step</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5">
              <ol className="flex flex-col gap-3">
                {steps_project.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="size-6 shrink-0 rounded-full bg-[var(--beige-100)] dark:bg-white/5 border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[11px] font-semibold text-[var(--taupe-400)]">
                      {i + 1}
                    </span>
                    <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Prompts to copy */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Prompts ,  copy and use these in your Project</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Start with <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Orient Claude to my business</strong> ,  paste it into your new Project, fill in the blanks, and send. Then follow with the next two in order.
            </p>
            <CodeTabs codes={PROMPTS} lang="markdown" />
          </section>

          {/* Exercise */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Your exercise for this session</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Do this during work time today:</p>
              <ol className="flex flex-col gap-2">
                {[
                  "Create a Project named after your business (or just \"My Business ,  General\")",
                  "Paste the \"Orient Claude to my business\" prompt, fill it in with your real details, and send it",
                  "Answer Claude's clarifying question honestly",
                  "Use \"Your first real ask\" to get help with one actual task from your business this week",
                  "Paste the \"Test Claude's understanding\" prompt to see how well Claude has internalized your context",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                    <span className="size-5 shrink-0 rounded-full border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[10px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="text-xs text-[var(--taupe-400)] font-light">
                Share the most surprising insight Claude gave you in the cohort group chat.
              </p>
            </div>
          </section>

          {/* Your 5 Claude Projects */}
          <section className="flex flex-col gap-4">
            <div>
              <p className="tm-eyebrow mb-1">Live exercise · work time</p>
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-2">
                We build this together ~ your 5-project business system
              </h3>
              <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed max-w-2xl">
                We&apos;re doing this live, right now. You set these up on your screen, Abie &amp; Meri demo on theirs. Each Project becomes a dedicated workspace where Claude knows exactly what it&apos;s helping you with. Together they form a complete operating system for <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">{businessContext}</strong>.
              </p>
            </div>

            {/* 5 project cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  n: "01",
                  color: "#1A6045",
                  title: "Client Relations",
                  desc: "From first contact to signed contract ~ proposals, communication templates, and onboarding materials.",
                  store: ["Proposal drafts and sent versions", "Email templates (intro, follow-up, chase)", "Client onboarding questionnaires", "Meeting notes and action items"],
                  tip: "Create a sub-folder per client so all their documents stay together from proposal through final delivery.",
                },
                {
                  n: "02",
                  color: "#1A4070",
                  title: "Project Management",
                  desc: "Track active work, timelines, deliverables, and progress for every client engagement you&apos;re running.",
                  store: ["Project briefs and scope documents", "Task lists and milestone trackers", "Revision logs and feedback threads", "Post-project retrospective notes"],
                  tip: "Use a traffic-light status on each active project: on track, at risk, or delayed. You can see the full picture at a glance.",
                },
                {
                  n: "03",
                  color: "#5A2D82",
                  title: "Finance & Invoicing",
                  desc: "Keep your money matters organised ~ what&apos;s been invoiced, what&apos;s outstanding, and how your income looks over time.",
                  store: ["Invoice templates and sent copies", "Payment tracking log", "Rate cards and pricing notes", "Monthly and annual income summaries"],
                  tip: "Set a fixed invoicing day each month. Consistency trains clients to pay on time and reduces the mental load of chasing.",
                },
                {
                  n: "04",
                  color: "#6B4A1A",
                  title: "Marketing & Content",
                  desc: "Build your presence, attract new clients, and keep your messaging consistent across all channels.",
                  store: ["Bio and positioning statement drafts", "Case studies and portfolio write-ups", "Social media post ideas and drafts", "Testimonials and social proof bank"],
                  tip: "After every project, ask the client for one sentence of feedback. Drop it straight into your testimonials bank.",
                },
                {
                  n: "05",
                  color: "#2E2868",
                  title: "Second Brain",
                  desc: "Your private thinking space ~ where raw ideas become clear thinking and what you learn shapes how you work.",
                  store: ["Raw ideas and fleeting thoughts", "Book, podcast & article notes", "Lessons from past projects and clients", "Personal goals and weekly reflections"],
                  tip: "This one is for you, not your clients. Don&apos;t organise it too early. Let Claude help you find the patterns.",
                },
              ].map((p) => (
                <div key={p.n} className={`rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden flex flex-col${p.n === "05" ? " sm:col-span-2" : ""}`}>
                  <div className="px-4 py-3 flex items-center gap-3" style={{ background: `${p.color}12` }}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full text-white" style={{ background: p.color }}>{p.n}</span>
                    <h4 className="font-medium text-sm text-[var(--charcoal-900)] dark:text-foreground">{p.title}</h4>
                  </div>
                  <div className="p-4 bg-white dark:bg-[var(--card)] flex-1 flex flex-col gap-3">
                    <p className="text-sm font-light text-[var(--taupe-400)] leading-relaxed" dangerouslySetInnerHTML={{ __html: p.desc }} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)] mb-1.5">Store here</p>
                      <ul className="space-y-1">
                        {p.store.map((s) => (
                          <li key={s} className="text-xs text-[var(--charcoal-900)] dark:text-foreground font-light flex gap-2 items-start">
                            <span className="shrink-0 mt-1.5 size-1 rounded-full" style={{ background: p.color }} />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto pt-3 border-t border-[var(--beige-200)] dark:border-white/5">
                      <p className="text-xs text-[var(--taupe-400)] font-light italic leading-relaxed">&ldquo;{p.tip}&rdquo;</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 4-step setup */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)]">
              <p className="tm-eyebrow mb-2">Set up now</p>
              <h4 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-4">4 steps to get Claude running as your business assistant</h4>
              <ol className="space-y-4">
                {[
                  { n: 1, title: "Create a free account", body: "Go to claude.ai and sign up. Free plan is enough to get started. No credit card needed." },
                  { n: 2, title: "Create a Project for each folder", body: 'In Claude, click "New Project" and name it to match ~ for example, "Client Relations". Projects give Claude persistent memory specific to that area.' },
                  { n: 3, title: "Add your instructions", body: `Inside each project, paste a short description of your business and what you need help with. Claude will use this as context for every conversation in that project. Start with: "${businessContext}".` },
                  { n: 4, title: "Start asking", body: "Draft proposals in Client Relations, build trackers in Project Management, write invoices in Finance, create content in Marketing, and develop ideas in your Second Brain." },
                ].map((step) => (
                  <li key={step.n} className="flex gap-4 items-start">
                    <span className="shrink-0 size-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5 bg-[var(--charcoal-900)] dark:bg-white dark:text-[var(--charcoal-900)]">{step.n}</span>
                    <div>
                      <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground mb-0.5">{step.title}</p>
                      <p className="text-sm font-light text-[var(--taupe-400)] leading-relaxed">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Cowork vs Claude.ai chat */}
            <div className="flex flex-col gap-3">
              <div>
                <p className="tm-eyebrow mb-1">Two tools, different jobs</p>
                <h4 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-1">Claude Projects vs Cowork ~ when to use which</h4>
                <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed">Both run on Claude. The difference is what they&apos;re optimised for.</p>
              </div>
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden">
                <div className="grid grid-cols-3 bg-[var(--beige-100)] dark:bg-white/5 border-b border-[var(--beige-200)] dark:border-white/5">
                  {["", "Claude Projects", "Cowork"].map((h, i) => (
                    <div key={i} className="px-3 py-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)]">{h}</p>
                    </div>
                  ))}
                </div>
                {[
                  { label: "Best for", a: "Your personal work ~ writing, thinking, planning", b: "Delegating to a pre-trained AI employee with a defined role" },
                  { label: "Memory", a: "Your files + instructions stay in the Project", b: "AI employee remembers your SOPs, tone, and workflows" },
                  { label: "Who runs it", a: "You ~ Claude responds to what you ask", b: "The AI employee ~ you assign a task, it drives" },
                  { label: "Team use", a: "Solo only ~ Projects are personal", b: "Shared ~ your whole team can use the same AI employee" },
                  { label: "When to use", a: "Drafting, research, thinking through problems", b: "Repeatable tasks ~ inbox management, content repurposing, ops" },
                  { label: "Week in bootcamp", a: "Weeks 1 & 2", b: "Week 2 onward" },
                ].map((row, ri) => (
                  <div key={ri} className={`grid grid-cols-3 ${ri % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-[var(--beige-50)] dark:bg-white/[0.02]"} border-b border-[var(--beige-200)] dark:border-white/5 last:border-0`}>
                    <div className="px-3 py-3 border-r border-[var(--beige-200)] dark:border-white/5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--taupe-400)]">{row.label}</p>
                    </div>
                    <div className="px-3 py-3 border-r border-[var(--beige-200)] dark:border-white/5">
                      <p className="text-xs text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{row.a}</p>
                    </div>
                    <div className="px-3 py-3">
                      <p className="text-xs text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{row.b}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--taupe-400)] font-light px-1">Think of Claude Projects as your personal workbench. Cowork is where you hand the work off.</p>
            </div>

            {/* Sample prompts to try right now */}
            <div className="flex flex-col gap-3">
              <div>
                <p className="tm-eyebrow mb-1">Try these right now</p>
                <h4 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-1">Sample prompts ~ real tasks, real results</h4>
                <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed">Paste any of these into the relevant Project during work time. Fill in the brackets with your actual details.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    project: "Client Relations",
                    color: "#1A6045",
                    label: "Write a proposal",
                    prompt: `Write a proposal for [client name] who needs [service]. Budget is around [€X]. Include a scope of work, timeline, and pricing. Tone: professional but warm.`,
                  },
                  {
                    project: "Marketing & Content",
                    color: "#6B4A1A",
                    label: "Repurpose content",
                    prompt: `Take this [blog post / email / video script] and turn it into:\n1. A LinkedIn post (150 words)\n2. Three Instagram captions\n3. One short-form hook for Reels\n\nMatch my voice: [paste a sample sentence]`,
                  },
                  {
                    project: "Finance & Invoicing",
                    color: "#5A2D82",
                    label: "Chase a late payment",
                    prompt: `Write a follow-up email to [client name] ~ their invoice for [€X] is [X days] overdue. Keep it firm but not aggressive. I still want to work with them.`,
                  },
                  {
                    project: "Cowork",
                    color: "#2E2868",
                    label: "Organise your downloads",
                    prompt: `Connect to my Downloads folder and clean it up.\n\n1. Scan everything in there\n2. Suggest max 5 top-level folders based on what you find\n3. Move each file into the right folder\n4. Flag anything that looks like a duplicate or that I should delete\n\nDon't ask me to paste anything ~ just do it.`,
                  },
                  {
                    project: "Cowork",
                    color: "#2E2868",
                    label: "Sort your video files",
                    prompt: `Access my video library and sort it.\n\n1. Group files by series or topic based on the file names\n2. Rename them using this convention: YYYY-MM-DD_topic_v1\n3. Flag likely duplicates\n4. Create a simple index file listing what's in each folder\n\nNo copy-pasting needed ~ just read the folder directly.`,
                  },
                  {
                    project: "Project Management",
                    color: "#1A4070",
                    label: "Turn a messy brief into a plan",
                    prompt: `Here&apos;s a brief from my client: "[paste brief]"\n\nBreak this into:\n1. Deliverables list\n2. Dependencies and order\n3. A realistic timeline for a [solo / small team] setup\n4. What&apos;s missing or unclear in the brief`,
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden">
                    <div className="px-4 py-2.5 flex items-center gap-2.5 border-b border-[var(--beige-200)] dark:border-white/5" style={{ background: `${item.color}10` }}>
                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] px-1.5 py-0.5 rounded text-white" style={{ background: item.color }}>{item.project}</span>
                      <p className="text-xs font-medium text-[var(--charcoal-900)] dark:text-foreground">{item.label}</p>
                    </div>
                    <pre className="p-4 bg-white dark:bg-[var(--card)] text-[11px] text-[var(--taupe-400)] whitespace-pre-wrap font-mono leading-relaxed">{item.prompt}</pre>
                  </div>
                ))}
              </div>
            </div>

            {/* Most commonly used */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)]">
              <p className="tm-eyebrow mb-2">What freelancers actually use Claude for</p>
              <h4 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-4">Most used tasks ~ ranked</h4>
              <ol className="space-y-3">
                {[
                  { n: 1, task: "Email drafting", detail: "Client emails, follow-ups, cold outreach, late payment chasers ~ this is the #1 time-saver across the board" },
                  { n: 2, task: "Content repurposing", detail: "Turn one piece of content into 5 ~ blog to LinkedIn, video script to captions, newsletter to social posts" },
                  { n: 3, task: "Proposals & contracts", detail: "First drafts of project scopes, pricing tables, and contract templates tailored to the specific client" },
                  { n: 4, task: "File & folder organisation", detail: "Naming conventions, folder structures, sorting downloads and video archives ~ boring but surprisingly effective" },
                  { n: 5, task: "Research & summarisation", detail: "Brief yourself on a new client, industry, or topic in minutes instead of hours" },
                  { n: 6, task: "Thinking through decisions", detail: "Use the Second Brain project like a sounding board ~ lay out a decision and ask Claude to poke holes in it" },
                ].map((item) => (
                  <li key={item.n} className="flex gap-4 items-start border-b border-[var(--beige-200)] dark:border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="shrink-0 size-6 rounded-full bg-[var(--charcoal-900)] dark:bg-white text-white dark:text-[var(--charcoal-900)] flex items-center justify-center text-[10px] font-bold mt-0.5">{item.n}</span>
                    <div>
                      <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground mb-0.5">{item.task}</p>
                      <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* MCP & Connectors */}
            <div className="flex flex-col gap-3">
              <div>
                <p className="tm-eyebrow mb-1">Going further</p>
                <h4 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-1">MCP ~ letting Claude connect to your actual tools</h4>
                <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed">
                  By default, Claude only knows what you paste into it. MCP (Model Context Protocol) changes that ~ it gives Claude a live connection to tools you already use, so it can read, write, and act inside them directly.
                </p>
              </div>

              {/* What MCP is */}
              <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4">
                    <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em] mb-2">Without MCP</p>
                    <ul className="space-y-1.5 text-xs text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                      <li>You copy a Notion page → paste into Claude → copy the result back</li>
                      <li>You describe your calendar → Claude gives you a plan → you enter it manually</li>
                      <li>You screenshot a Slack thread → Claude reads it → you paste the reply</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-4">
                    <p className="text-xs font-semibold text-[var(--clay-500)] uppercase tracking-[0.12em] mb-2">With MCP ✓</p>
                    <ul className="space-y-1.5 text-xs text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                      <li>Claude reads your Notion page directly and updates it in place</li>
                      <li>Claude checks your Google Calendar and adds the event itself</li>
                      <li>Claude reads the Slack thread and sends the reply for you</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                  Think of MCP as giving Claude hands. Without it, Claude is a very smart advisor. With it, Claude is an assistant who can actually do the work inside your tools.
                </p>
              </div>

              {/* Connector examples */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)] mb-2">Connectors you can set up today</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      tool: "Google Calendar",
                      icon: "📅",
                      what: "Claude reads your schedule, finds free slots, creates events, and reschedules meetings",
                      prompt: `"What does my week look like? Block 2 hours on Thursday for deep work and move the 3 PM call to Friday morning."`,
                    },
                    {
                      tool: "Gmail",
                      icon: "✉️",
                      what: "Claude searches your inbox, drafts replies, labels threads, and sends emails on your behalf",
                      prompt: `"Find all emails from clients that need a reply. Draft responses for each one and show them to me before sending."`,
                    },
                    {
                      tool: "Notion",
                      icon: "📝",
                      what: "Claude reads your pages and databases, writes new content, and updates existing entries",
                      prompt: `"Read my project tracker database. Update the status of any tasks that are overdue and add a note explaining what's blocking them."`,
                    },
                    {
                      tool: "Slack",
                      icon: "💬",
                      what: "Claude reads channel history, drafts messages, and posts updates to the right channels",
                      prompt: `"Read the #client-feedback channel from the last 7 days. Summarise the main themes and draft a response to any open questions."`,
                    },
                    {
                      tool: "Google Drive",
                      icon: "📂",
                      what: "Claude searches your files, reads documents, and creates new ones directly in your Drive",
                      prompt: `"Find all documents with 'proposal' in the title from the last 3 months. Pull out the pricing from each one and put it in a comparison table."`,
                    },
                    {
                      tool: "Stripe",
                      icon: "💳",
                      what: "Claude checks payment status, pulls revenue summaries, and surfaces overdue invoices",
                      prompt: `"Show me all invoices that are more than 14 days overdue. Draft a chase email for each client with the amount and days outstanding."`,
                    },
                  ].map((item) => (
                    <div key={item.tool} className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] overflow-hidden">
                      <div className="px-4 py-3 border-b border-[var(--beige-200)] dark:border-white/5 flex items-center gap-2.5">
                        <span className="text-base leading-none">{item.icon}</span>
                        <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">{item.tool}</p>
                      </div>
                      <div className="p-4 flex flex-col gap-3">
                        <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed">{item.what}</p>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)] mb-1.5">Try this prompt</p>
                          <p className="text-[11px] font-mono text-[var(--charcoal-900)] dark:text-foreground bg-[var(--beige-50)] dark:bg-[var(--espresso-700)] px-3 py-2.5 rounded-lg leading-relaxed italic">{item.prompt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-[var(--taupe-400)] font-light px-1">
                MCP connectors are set up once in Claude Desktop settings. We&apos;ll configure these in a later session ~ for now, just know they exist and what&apos;s possible.
              </p>
            </div>

            {/* Starter prompt ~ personalized */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
              <p className="tm-eyebrow mb-2">Your starter prompt ~ Client Relations</p>
              <p className="text-sm text-[var(--taupe-400)] font-light mb-4">
                Paste this into your Client Relations project to write your project description and instructions. Fill in the bracketed fields before sending.
              </p>
              <pre className="p-4 rounded-xl bg-[var(--beige-50)] dark:bg-[var(--espresso-700)] text-xs text-[var(--charcoal-900)] dark:text-[var(--taupe-400)] whitespace-pre-wrap font-mono leading-relaxed">
{`I'm setting up a Claude Project called "Client Relations" for my freelance business.

My name is ${firstName} and I work as a [your role/service]. My business: ${businessContext}.

Please write two things:

1. A short project description (2–3 sentences) telling Claude what this folder is for.

2. Project instructions that tell Claude:
   – My preferred tone when writing to clients: [e.g. warm and direct]
   – My average project value: [e.g. €500–€2,000]
   – One thing I always want in proposals: [e.g. a clear scope of work]
   – Follow-up habits I want Claude to help me maintain: [e.g. check in 3 days after sending]

Keep both practical, specific to my business, and ready to paste into Claude Project settings.`}
              </pre>
            </div>

            {/* Brand voice bonus */}
            <div className="rounded-2xl border-2 border-dashed border-[var(--beige-200)] dark:border-white/10 overflow-hidden">
              <div className="px-5 py-4 flex items-center justify-between gap-4 border-b border-[var(--beige-200)] dark:border-white/10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-0.5">Bonus task</p>
                  <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Build your brand voice document</p>
                  <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5 leading-relaxed">
                    Claude will interview you and write a brand-voice.txt you can upload to every project.
                  </p>
                </div>
                <a
                  href="https://abiemaxey.com/tools/skill-maker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 shrink-0 text-xs font-medium text-[var(--charcoal-900)] dark:text-foreground border border-[var(--beige-200)] dark:border-white/10 rounded-full px-3 py-1.5 hover:bg-[var(--beige-50)] dark:hover:bg-white/5 transition-colors"
                >
                  Open full tool
                  <ArrowRight className="size-3" />
                </a>
              </div>
              <iframe
                src="https://abiemaxey.com/tools/skill-maker"
                className="w-full border-0"
                style={{ height: "600px" }}
                title="Brand Voice Skill Maker"
              />
            </div>
          </section>

          {/* Next session card */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Up next: Custom instructions, file uploads</p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Week 1 · Session 2 ,  Sun, Jun 7</p>
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
        <SessionEditPanel courseSlug="cohort-1" sessionNumber={2} initial={session} />
      )}
    </div>
  );
}

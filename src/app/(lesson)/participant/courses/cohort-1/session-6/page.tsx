import Link from "next/link";
import { ArrowLeft, ArrowRight, Terminal, Eye, Check, Rocket, Lock } from "lucide-react";
import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";
import { TerminalSim } from "@/components/cohort1/TerminalSim";
import { RunSurfaces } from "@/components/cohort1/RunSurfaces";
import { InstallSim } from "@/components/cohort1/InstallSim";
import { getIntakeData } from "@/utils/intake-helper";
import { getSessionOverrides, getIsAdmin, applyOverrides } from "@/utils/session-content";
import { SessionEditPanel } from "@/components/session-edit-panel";

const SESSION = {
  tag: "W3 · S5",
  color: "#5A7A6B",
  weekLabel: "Week 3 · Building with Claude",
  title: "Claude Code ~ your first build",
  date: "Sat, Jun 20",
  time: "3 – 7 PM CET",
  videoUrl: "https://fathom.video/embed/-uoJjLD-Cx-69MUGtegxk-2cmxdRymqy" as string | null,
  description:
    "Claude Code makes building with AI tangible ~ no prior coding needed. We'll set up your environment, understand the build loop, and complete a small business tool together so you feel the mechanics before the big build in Session 6.",
  resources: [
    { label: "Claude Code setup guide", href: "#" },
    { label: "Build loop reference", href: "#" },
    { label: "Session slides", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const PREV     = "/participant/courses/cohort-1/session-5";
const NEXT     = "/participant/courses/cohort-1/session-7";

const bringList = [
  "Laptop with Node.js v18 or later installed (nodejs.org)",
  "Your Anthropic account credentials (same email as Claude.ai)",
  "A specific idea: one business tool or dashboard you want to build",
];

const objectives = [
  "Install Claude Code and confirm it runs on your machine",
  "Understand what Claude Code can and can't build",
  "Submit your first build prompt and see code generated",
  "Know how to describe a build prompt vs. a chat prompt",
];

const canBuild = [
  "Custom dashboards ~ show your key metrics in a single view",
  "Internal tools ~ intake forms, checklists, calculators",
  "Client-facing portals ~ onboarding forms, status pages, resource hubs",
  "Report generators ~ weekly summary builders, client update templates",
  "Data entry and display tools ~ anything you currently track in a spreadsheet",
];

const cannotBuild = [
  "A real app your clients log into ~ each one sees their own private data",
  "Charging money ~ take payments and subscriptions right inside your tool",
  "A live database ~ data that syncs everywhere in real time, not just on your laptop",
  "A polished product launched to real users ~ not just a tool for you",
];

const COMPARE = {
  cols: [
    { name: "Claude Chat", tag: "Your thinking partner" },
    { name: "Claude Cowork", tag: "Your AI employee" },
    { name: "Claude Code", tag: "Your builder", highlight: true },
  ],
  rows: [
    { label: "What it is", vals: ["A conversation in your browser", "A delegate that runs work for you", "An agent that builds on your computer"] },
    { label: "Where it lives", vals: ["claude.ai", "Runs in the background", "Your terminal"] },
    { label: "Best for", vals: ["Thinking, writing, deciding", "Repeatable work you hand off", "Building real tools & files"] },
    { label: "You give it", vals: ["A question or a draft", "A job description + access", "A description of what to build"] },
    { label: "You get back", vals: ["An answer, in the chat", "Finished work, on its own", "Working files you can run"] },
    { label: "Need the terminal?", vals: ["No", "No", "Yes"] },
    { label: "For your business", vals: ["“Draft this client email”", "“Handle new inquiries for me”", "“Build me a business dashboard”"] },
  ],
};

export default async function Session6Page() {
  const [intake, overrides, isAdmin] = await Promise.all([
    getIntakeData(),
    getSessionOverrides("cohort-1", 6),
    getIsAdmin(),
  ]);
  const session = applyOverrides({ ...SESSION, zoomUrl: "https://us06web.zoom.us/j/88295797091?pwd=MejE1DJBXzA8veH0KDbPY0B8sPb29k.1" }, overrides);

  const BUILD_PROMPTS: Record<string, string> = {
    "First build prompt": `Build me a [type of tool ~ e.g. business dashboard, client intake form, weekly report template] for my **${intake?.business_oneliner || "[type of business]"}**.

This will be used by: [who ~ just me / my team / my clients]
It should work alongside my AI employee (role: ${intake?.ai_employee_role || "[what your AI employee does]"}) ~ so it shows or organizes the work they do for me.

It needs to:
1. [core function 1 ~ be specific, e.g. "Show my 5 key weekly metrics as large numbers at the top"]
2. [core function 2 ~ e.g. "Show what my AI employee handled this week as a list with status"]
3. [core function 3 ~ e.g. "Include a section for my top 3 priorities this week"]

How it should look:
[describe visually ~ e.g. "Clean, minimal design with a white background. Metrics in cards across the top. Table below. Mobile-friendly."]

Tech requirements:
- Use Next.js (App Router) ~ it deploys to Vercel in one click
- Use static sample data I can update manually later
- No backend or database needed yet
- Make it run with: npm run dev

Keep it simple. Version 1 ~ get something real on screen.`,

    "Lead gen tracker (sample)": `Build me a lead gen tracker for my **${intake?.business_oneliner || "[your business]"}**, using Next.js (App Router).
It tracks the leads my AI employee (role: ${intake?.ai_employee_role || "[what they do]"}) finds and scores for me each week.
Use static sample data in a separate data file I can edit ~ no backend, no database yet.

LEADS TABLE (the main section):
Columns: Name | Source | Score | Status | Last contact
Fill it with about 6 realistic sample leads my employee might surface, a mix like:
- Maya R.  | Instagram | Warm | Drafted | Jun 18
- Carlos D.| Referral  | Hot  | Replied | Jun 19
- Lena P.  | Website   | Cold | New     | Jun 20

CARDS ACROSS THE TOP:
- Total leads
- Hot leads
- Replied this week
- Follow-ups due

HOW IT SHOULD LOOK:
- Clean and minimal ~ cards on top, table below
- Color-code the Score: Hot = green, Warm = amber, Cold = gray
- Mobile-friendly

Run with: npm run dev. Keep it simple ~ Version 1.`,

    "Content hub tracker (sample)": `Build me a content hub ~ a tracker for everything I'm creating ~ for my **${intake?.business_oneliner || "[your business]"}**, using Next.js (App Router).
It tracks the content my AI employee (role: ${intake?.ai_employee_role || "[what they do]"}) helps me plan, draft, and schedule.
Use static sample data in a separate data file I can edit ~ no backend, no database yet.

CONTENT TABLE (the main section):
Columns: Title | Platform | Format | Status | Publish date
Fill it with about 8 sample pieces, a mix of statuses like:
- "5 myths about X"     | Instagram | Reel  | Scheduled | Jun 22
- "Client win story"    | LinkedIn  | Post  | Published | Jun 15
- "Behind the build"    | YouTube   | Video | Idea      | —

CARDS ACROSS THE TOP:
- Ideas in the backlog
- In progress
- Scheduled
- Published this month

HOW IT SHOULD LOOK:
- Clean and minimal ~ cards on top, table below
- Color-code the Status: Idea = gray, Drafting = amber, Scheduled = blue, Published = green
- Bonus: let me filter by platform (optional)
- Mobile-friendly

Run with: npm run dev. Keep it simple ~ Version 1.`,

    "Portfolio / landing page (sample)": `Build me a one-page personal brand landing page using Next.js (App Router), for **${intake?.business_oneliner || "[your personal brand ~ what you do]"}**.
Use static content I can edit in one file ~ no backend.

SECTIONS (top to bottom):
1. Hero ~ my name (${intake?.first_name || "[your name]"}), a one-line tagline, a short intro, a primary button (e.g. "Work with me" / "Book a call"), and a photo placeholder
2. About ~ 2~3 short paragraphs about me
3. What I do ~ 3 services or offers as cards
4. Featured work ~ a grid of 3~6 projects (title, one-line description, image placeholder, link)
5. Testimonials ~ 2~3 short quotes with a name
6. Contact ~ a call-to-action with my booking link or email

HOW IT SHOULD LOOK:
- Clean, modern, lots of whitespace ~ mobile-friendly
- Use my brand kit: main [#__], accent [#__], background [#__], text [#__]; headings in [font], body in [font]
- (No brand kit yet? Write "minimal, black on white, one accent colour.")

Run with: npm run dev. Keep it Version 1 simple ~ real content beats perfect.`,

    "Iterate on what you built": `I can see the first version. Here's what I want to change:

KEEP:
- [what's working well ~ be specific]

CHANGE:
- [element] → [what it should be instead ~ e.g. "The font is too small → make all body text at least 16px"]
- [element] → [change ~ e.g. "The color of the header → change it to a dark navy (#1a2332)"]
- [element] → [change ~ e.g. "The table has too many columns → remove the 'Last Modified' column"]

ADD:
- [new element, if any ~ e.g. "Add a footer with today's date"]

REMOVE:
- [what to cut, if anything ~ e.g. "Remove the chart ~ just the numbers for now"]

Make only these changes. Don't redesign anything else.`,

    "Describe what's wrong precisely": `The build has an issue. I want to fix this specifically:

WHAT'S WRONG:
[Describe what you see that's wrong ~ not "it looks bad" but "the revenue number shows $0 instead of the sample data values"]

WHERE IT IS:
[Location on the page ~ e.g. "Top left card" / "The table in the middle section" / "The navigation bar"]

WHAT IT SHOULD DO:
[Describe the correct behavior ~ e.g. "The revenue card should show $12,400 using the sample data in the data file"]

Don't change anything else while fixing this.`,
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
          W2 · S4
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
          W3 · S6
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
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground">Today's agenda · 4 hours</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)] shrink-0">3 – 7 PM CET · 13:00–17:00 UTC</span>
            </div>
            <ol className="space-y-0">
              {[
                { cet: "3:00 – 3:15", utc: "13:00", label: "Check-in ~ each person shares one win or blocker since the AI employee session", type: "share" },
                { cet: "3:15 – 3:35", utc: "13:15", label: "Recap ~ your AI employee from last session, and where Claude Code fits next", type: "teach" },
                { cet: "3:35 – 4:00", utc: "13:35", label: "The 3 Claudes ~ chat vs. cowork vs. code, and the four ways to run it", type: "teach" },
                { cet: "4:00 – 4:35", utc: "14:00", label: "Get set up ~ terminal basics and install Claude Code, live together", type: "work" },
                { cet: "4:35 – 4:45", utc: "14:35", label: "Break", type: "break" },
                { cet: "4:45 – 5:45", utc: "14:45", label: "Your first build ~ anatomy of a prompt, then build a tracker live", type: "work" },
                { cet: "5:45 – 6:10", utc: "15:45", label: "See it &amp; fix it ~ approve changes, npm run dev, and iterate", type: "work" },
                { cet: "6:10 – 6:30", utc: "16:10", label: "Put it online ~ push to GitHub and deploy to Vercel by asking Claude", type: "demo" },
                { cet: "6:30 – 6:45", utc: "16:30", label: "Share-out ~ each person shows the live link they shipped", type: "share" },
                { cet: "6:45 – 7:00", utc: "16:45", label: "Wrap-up ~ Q&amp;A and what to bring next session", type: "plenary" },
              ].map((item, i, arr) => {
                const badge: Record<string, { label: string; color: string }> = {
                  teach:   { label: "Teaching",  color: "bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)]" },
                  demo:    { label: "Live demo", color: "bg-[var(--clay-500)]/10 text-[var(--clay-500)]" },
                  work:    { label: "Work time", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" },
                  share:   { label: "Sharing",   color: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400" },
                  break:   { label: "Break",     color: "bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)]" },
                  plenary: { label: "",          color: "" },
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

          {/* What Claude Code is */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What Claude Code actually is</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Claude Code is not a chatbot. It's an agentic coding tool that runs in your terminal. It reads your files, writes new ones, and builds software by working through tasks step by step ~ more like a developer sitting next to you than a tool you query.
              </p>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                You don't need to know how to code. You describe what you want in plain language, Claude Code builds it, you review and approve each step, and you iterate until it's right. The build loop is: describe → review → approve → iterate.
              </p>
              <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4">
                <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em] mb-2">The build loop</p>
                <div className="flex items-center gap-2 flex-wrap text-sm text-[var(--charcoal-900)] dark:text-foreground">
                  {["Describe what you want", "Claude builds it", "You review the code", "You approve the change", "See it in the browser", "Iterate"].map((step, i, arr) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="font-light">{step}</span>
                      {i < arr.length - 1 && <ArrowRight className="size-3 text-[var(--taupe-400)] shrink-0" />}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Comparison ~ chat vs cowork vs code */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Claude Chat vs. Cowork vs. Code ~ which is which</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">You&apos;ve met the first two already. Here&apos;s how Claude Code fits alongside them ~ same Claude, three different jobs.</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] overflow-x-auto tm-scrollbar">
              <table className="w-full border-collapse text-sm min-w-[560px]">
                <thead>
                  <tr className="border-b border-[var(--beige-200)] dark:border-white/5">
                    <th className="text-left font-medium text-[var(--taupe-400)] text-xs uppercase tracking-[0.1em] p-4 w-[140px]"></th>
                    {COMPARE.cols.map((c) => (
                      <th
                        key={c.name}
                        className={`text-left p-4 align-bottom ${c.highlight ? "bg-[var(--clay-500)]/5" : ""}`}
                      >
                        <span className={`block font-semibold ${c.highlight ? "text-[var(--clay-500)]" : "text-[var(--charcoal-900)] dark:text-foreground"}`}>{c.name}</span>
                        <span className="block text-xs text-[var(--taupe-400)] font-light mt-0.5">{c.tag}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.rows.map((row, ri) => (
                    <tr key={row.label} className={ri < COMPARE.rows.length - 1 ? "border-b border-[var(--beige-200)] dark:border-white/5" : ""}>
                      <td className="p-4 text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.08em] align-top">{row.label}</td>
                      {row.vals.map((v, ci) => (
                        <td
                          key={ci}
                          className={`p-4 align-top font-light leading-relaxed text-[var(--charcoal-900)] dark:text-foreground ${COMPARE.cols[ci].highlight ? "bg-[var(--clay-500)]/5" : ""}`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--taupe-400)] font-light">The short version: <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Chat</strong> helps you think, <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Cowork</strong> does the work, <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Code</strong> builds the thing. Today is Code.</p>
          </section>

          {/* Skills directory section hidden per request ~ restore from git history if needed */}

          {/* Where to run Claude Code */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Where to run Claude Code ~ pick your window</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">Same Claude Code underneath ~ only the window changes. Tap each to see it, and open &ldquo;How to set it up&rdquo; when you&apos;re ready.</p>
            <RunSurfaces />
            <div className="rounded-xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                <strong className="font-medium">New to this?</strong> Start with the <strong className="font-medium">desktop app</strong> ~ the easiest way in. The setup steps below use the terminal (it works the same on every machine), and I&apos;ll run all four live so you can pick your favorite.
              </p>
            </div>
          </section>

          {/* New to the terminal */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="size-3.5 text-[var(--clay-500)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">First time in the terminal? Start here</p>
            </div>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                The terminal is just a text box where you type commands instead of clicking buttons. It feels intimidating for about ten minutes, then it never does again. You will not break your computer.
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { k: "Open it", v: "On a Mac, press ⌘ + Space, type “Terminal”, hit Enter. On Windows, search for “PowerShell” in the Start menu." },
                  { k: "How it works", v: "Type one command, press Enter, wait for it to finish, then type the next. Copy-paste is fine ~ that's expected, not cheating." },
                  { k: "It's asking me to pick a folder?", v: "A “folder” (or directory) is just a place on your computer, the same folders you see in Finder. cd means “go into this folder.”" },
                  { k: "If a command errors", v: "Don't panic. Copy the full red text, paste it into your Claude.ai Project, and ask “what does this mean and how do I fix it?”" },
                ].map((row) => (
                  <li key={row.k} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-[var(--taupe-400)] uppercase tracking-[0.1em] min-w-[112px] mt-0.5">{row.k}</span>
                    <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{row.v}</p>
                  </li>
                ))}
              </ul>

              {/* command cheat sheet */}
              <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4 flex flex-col gap-3">
                <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em]">The handful of commands you&apos;ll actually use</p>
                <ul className="flex flex-col gap-2">
                  {[
                    { cmd: "pwd", desc: "“Where am I?” ~ prints the folder you're currently in" },
                    { cmd: "ls", desc: "Lists everything inside the current folder" },
                    { cmd: "cd my-folder", desc: "Go into a folder (cd = “change directory”)" },
                    { cmd: "cd ..", desc: "Go back up one folder" },
                    { cmd: "mkdir my-folder", desc: "Make a new folder (mkdir = “make directory”)" },
                    { cmd: "clear", desc: "Wipe the screen clean when it gets cluttered" },
                  ].map((c) => (
                    <li key={c.cmd} className="flex items-start gap-3">
                      <code className="text-xs bg-[var(--beige-100)] dark:bg-white/10 px-2 py-0.5 rounded font-mono text-[var(--charcoal-900)] dark:text-foreground shrink-0 min-w-[124px]">{c.cmd}</code>
                      <span className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{c.desc}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-[var(--beige-200)] dark:border-white/5 pt-3 flex flex-col gap-1.5">
                  <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em]">Two shortcuts that save you</p>
                  <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                    <strong className="font-medium">Tab</strong> ~ start typing a folder name, press Tab, it auto-completes (no typos). <span className="mx-1 text-[var(--taupe-400)]">·</span> <strong className="font-medium">↑ arrow</strong> ~ brings back the last command so you don&apos;t retype it.
                  </p>
                </div>
              </div>

              {/* interactive practice terminal */}
              <div className="border-t border-[var(--beige-200)] dark:border-white/5 pt-4 flex flex-col gap-2">
                <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em]">Practice here ~ a safe terminal that can&apos;t touch your computer</p>
                <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed -mt-0.5">Click a command to watch it run, or type your own and press Enter.</p>
                <TerminalSim />
              </div>
            </div>
          </section>

          {/* Install commands */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Setup ~ install Claude Code</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">Run these in your terminal in order. Click a step (or &ldquo;Run all&rdquo;) to watch what happens before you do it for real. Stuck on a step? Paste the error into your Claude.ai Project and ask for help.</p>
            <InstallSim />
          </section>

          {/* Can and can't build */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What it can build for your business today</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">Nothing on the right is impossible ~ it&apos;s where your first build can grow into a <em>real product</em>. Claude Code can build all of it; that&apos;s just a deeper skill than today&apos;s basics. Start here, and this is what&apos;s waiting.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
                <p className="text-xs font-semibold text-[var(--clay-500)] uppercase tracking-[0.12em]">Great for a first build ✓</p>
                <ul className="flex flex-col gap-2">
                  {canBuild.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                      <span className="text-[var(--clay-500)] shrink-0 mt-0.5">·</span>
                      <span className="font-light leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-5 flex flex-col gap-3">
                <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em]">Possible later, not today →</p>
                <ul className="flex flex-col gap-2">
                  {cannotBuild.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                      <span className="text-[var(--taupe-400)] shrink-0 mt-0.5">→</span>
                      <span className="font-light leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Anatomy of a build prompt */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">The anatomy of a great build prompt</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                The most common reason a Claude Code build comes out wrong is a vague prompt. Claude Code is precise ~ it builds exactly what you describe. If you describe something vague, you get something generic. If you describe something specific, you get something useful.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "WHAT", desc: "Exactly what you're building ~ dashboard, form, tool, report generator" },
                  { label: "FOR WHO", desc: "Who will use it ~ just you, your team, or your clients" },
                  { label: "DATA", desc: "What information goes in and comes out ~ list the specific metrics or fields" },
                  { label: "LOOK", desc: "How it should appear ~ describe visually, not technically (\"cards at top, table below\" is better than \"grid layout\")" },
                  { label: "TECH", desc: "Keep it simple ~ Next.js, static sample data, no backend yet. Ask for npm run dev to start it." },
                ].map((part) => (
                  <div key={part.label} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-[var(--taupe-400)] uppercase tracking-[0.1em] min-w-[48px] mt-0.5">{part.label}</span>
                    <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{part.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Build prompts */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Build prompts ~ use these inside Claude Code</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Once Claude Code is running (<code className="text-xs bg-[var(--beige-100)] dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">claude</code> in your terminal), paste these prompts directly into it. Use <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">First build prompt</strong> for anything, or grab a ready-made <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Lead gen tracker</strong>, <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Content hub tracker</strong>, or <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Portfolio page</strong> to start.
            </p>
            <CodeTabs codes={BUILD_PROMPTS} lang="markdown" />
          </section>

          {/* Approving + seeing your build */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Eye className="size-3.5 text-[var(--clay-500)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Two things that trip up everyone the first time</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Check className="size-3.5 text-[var(--clay-500)]" />
                  <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">Claude Code will ask permission</p>
                </div>
                <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                  Before it writes a file or runs a command, it pauses and asks you to approve. This is normal and good ~ it's showing you its work. Read what it wants to do, then choose <strong className="font-semibold">Yes</strong>. If you ever feel lost, type <code className="text-xs bg-[var(--beige-100)] dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">no, explain first</code> and it will talk you through it before changing anything.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Eye className="size-3.5 text-[var(--clay-500)]" />
                  <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">Seeing it in the browser</p>
                </div>
                <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                  When the build is done, type <code className="text-xs bg-[var(--beige-100)] dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">npm run dev</code> in the terminal, then open <code className="text-xs bg-[var(--beige-100)] dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">http://localhost:3000</code> in your browser. That's your build, live on your machine. Leave that terminal running ~ every change you approve updates the page automatically when you refresh.
                </p>
              </div>
            </div>
          </section>

          {/* Put it online ~ GitHub + Vercel via Claude Code */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Rocket className="size-3.5 text-[var(--clay-500)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Put it online ~ share a real link</p>
            </div>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Your build runs on your laptop. Two messages to Claude Code and it&apos;s live on the internet with a link you can send anyone ~ you don&apos;t run any commands yourself, Claude Code does the GitHub and Vercel steps for you (you just approve each one).
            </p>
            <CodeTabs
              codes={{
                "1. Push it to GitHub": `Put this project on GitHub for me ~ I haven't done this before, so handle the setup.

- If I'm not signed in to GitHub yet, walk me through it (it's free)
- Create a new private repository called "my-dashboard"
- Commit everything with the message "first version"
- Push it up, then send me the repo link

Do the steps for me ~ I'll approve each one.`,
                "2. Deploy it live on Vercel": `Deploy this project to Vercel so it's live online with a link I can share.

- Connect it to the GitHub repo we just made
- Walk me through signing in to Vercel (sign in with GitHub ~ it's free)
- Deploy it on the free plan
- Give me the live URL when it's done

Do the steps for me ~ I'll approve each one.`,
              }}
              lang="markdown"
            />
            <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed">
              First time? Claude Code will pause and walk you through making a free GitHub and Vercel account ~ just say yes when it asks. When it&apos;s done you&apos;ll have a public link (like <span className="font-mono">my-dashboard.vercel.app</span>) you can text a client today.
            </p>

            {/* Lock it with a PIN */}
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4 flex flex-col gap-2.5 mt-1">
              <div className="flex items-center gap-2">
                <Lock className="size-3.5 text-[var(--clay-500)]" />
                <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em]">Lock it with a PIN ~ so it&apos;s not wide open</p>
              </div>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                A public link means <em>anyone</em> with it can see your dashboard. Add a simple PIN screen so only you (and people you give the code to) can get in. One message to Claude Code:
              </p>
              <CodeTabs
                codes={{
                  "Add a PIN lock": `Add a simple PIN lock to my dashboard so it isn't public to anyone with the link.

- Show a PIN screen first; only reveal the dashboard if the PIN is correct
- Keep the PIN in an environment variable (not in the code), and check it on the server so the data isn't exposed before login
- Walk me through setting that environment variable on Vercel

Keep it simple ~ one shared PIN is fine for now.`,
                }}
                lang="markdown"
              />
              <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed">
                Honest about what this is: a <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">lock, not a vault</strong>. It keeps casual visitors out ~ perfect for a personal or internal dashboard. If you&apos;re putting <em>real</em> client data online, deploy with sample data for now, or wait for proper logins (a real app where each client signs into their own account ~ a deeper build).
              </p>
            </div>
          </section>

          {/* What to bring to session 8 */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Prepare for Session 6: Build your dashboard</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Come to Session 6 with this ready:</p>
              <ol className="flex flex-col gap-2">
                {[
                  "Claude Code installed and confirmed working on your machine",
                  "A clear description of the dashboard you want to build (write it out in plain language ~ not code)",
                  "Your 5 key business metrics you want to see in one place",
                  "A sketch of the layout ~ even on paper, even rough",
                  "One question about what you're building (we'll answer them live)",
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
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Up next: Build your business dashboard</p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Week 3 · Session 6 ~ Sun, Jun 21</p>
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
              {[
                { label: "Get Claude Code", href: "https://claude.com/claude-code", note: "download + install" },
                { label: "Claude Code docs", href: "https://code.claude.com/docs/en/overview", note: null },
                { label: "Node.js", href: "https://nodejs.org", note: "needed for the terminal" },
                { label: "GitHub", href: "https://github.com", note: "free account" },
                { label: "Vercel", href: "https://vercel.com", note: "deploy your build" },
                { label: "VS Code", href: "https://code.visualstudio.com", note: "code editor" },
                { label: "Cursor", href: "https://cursor.com", note: "code editor" },
              ].map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-baseline gap-1.5 text-sm text-[var(--charcoal-900)] dark:text-foreground hover:opacity-70 transition-opacity"
                  >
                    <span className="underline underline-offset-2 decoration-[var(--beige-200)]">{r.label}</span>
                    {r.note && <span className="text-[11px] text-[var(--taupe-400)] font-light">~ {r.note}</span>}
                  </a>
                </li>
              ))}
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
        <SessionEditPanel courseSlug="cohort-1" sessionNumber={6} initial={session} />
      )}
    </div>
  );
}

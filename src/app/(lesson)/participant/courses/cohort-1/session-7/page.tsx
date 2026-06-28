import Link from "next/link";
import { ArrowLeft, ArrowRight, Save, RotateCcw, Palette, Database, RefreshCw } from "lucide-react";
import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";
import { getIntakeData } from "@/utils/intake-helper";
import { getSessionOverrides, getIsAdmin, applyOverrides } from "@/utils/session-content";
import { SessionEditPanel } from "@/components/session-edit-panel";

const SESSION = {
  tag: "W3 · S6",
  color: "#5A7A6B",
  weekLabel: "Week 3 · Building with Claude",
  title: "Build your business dashboard",
  date: "Sun, Jun 21",
  time: "3 – 7 PM CET",
  videoUrl: "https://fathom.video/embed/3Ua5hZSTN5EVaiaj1G58CHxbryd1fksU" as string | null,
  description:
    "The big build session. You'll use Claude Code to create a custom dashboard for your business ~ pulling in your data, designing what matters to you, and iterating live. No coding experience required.",
  resources: [
    { label: "Dashboard planning worksheet", href: "#" },
    { label: "Claude Code examples", href: "#" },
    { label: "Week 3 deliverable checklist", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const PREV     = "/participant/courses/cohort-1/session-6";
const NEXT     = "/participant/courses/cohort-1/session-8";

const bringList = [
  "Claude Code installed from Session 5",
  "5 key metrics you track in your business (write them down)",
  "Your current tracking method ~ spreadsheet, app, or notebook",
  "A rough sketch or description of what your dashboard should look like",
  "Three words for how you want your brand to feel (for your brand kit)",
];

const objectives = [
  "Plan your dashboard before building it (5 questions first)",
  "Define a brand kit so your build looks like you, not a template",
  "Build a working first version with Claude Code",
  "Save checkpoints so you can always undo a bad change",
  "Make your dashboard remember your edits (persistence)",
  "Iterate based on what you see in the browser",
  "Know how to describe what's wrong and get it fixed precisely",
];

const planningQuestions = [
  { q: "What decision does this help you make?", hint: "\"I want to know at a glance if I need to push on revenue this week\" is a decision. \"I want to see my numbers\" isn't." },
  { q: "What are the 5 numbers you'd look at first every morning?", hint: "These become your primary metric cards. If you can't name 5, start with 3." },
  { q: "Who else needs to see this?", hint: "Just you = simpler. Your team = needs labels and context. Clients = needs to look polished." },
  { q: "How will you update the data?", hint: "Manually (you type in numbers each week) or automatically (connected to a source). Start manually ~ it's simpler and you can automate later." },
  { q: "What does Version 1 look like?", hint: "Define the smallest version that's still useful. Resist the urge to build everything at once." },
];

const iterationRules = [
  { wrong: "It doesn't look right", right: "The revenue card font is too small ~ make it 32px and bold" },
  { wrong: "I want it simpler", right: "Remove the chart entirely ~ just show the number" },
  { wrong: "The colors are off", right: "Change the sidebar background from dark gray to navy (#1a2332)" },
  { wrong: "Something's broken", right: "The \"Active Clients\" card shows 0 instead of 12 ~ the sample data is in clients.json but the component isn't reading it" },
];

const SAVE_POINTS: Record<string, string> = {
  "1. Set it up once (per project)": `# Run this once, inside your project folder, the first
# time you start. It turns the folder into a save-point
# tracker. You only ever do this one time per project.
git init`,

  "2. Save a working version": `# Any time the dashboard works and you're about to change
# something risky, run these two lines to snapshot it.
# Give it a short note so future-you knows what it was.
git add .
git commit -m "working version: 3 metric cards + client table"`,

  "3. Go back if you break it": `# Made changes you don't like? This throws away everything
# since your last save and returns to that working version.
# Your save points are safe ~ you're just undoing the mess.
git restore .`,
};

const PERSIST_PROMPT: Record<string, string> = {
  "Make my dashboard remember my edits": `Right now my dashboard shows numbers from a data file. I want to edit
the numbers directly in the dashboard and have them stick ~ so when I
close the browser and come back, my changes are still there.

Add this using the browser's localStorage (no database, no backend):
1. Make each metric value editable ~ I click it, type a new number, it saves
2. Save every change to localStorage automatically
3. On load, read saved values from localStorage first; fall back to the
   data file if nothing is saved yet
4. Add a small "Reset to defaults" button

Keep it simple, and explain in one line what localStorage is doing so I
understand it.`,
};

export default async function Session7Page() {
  const [intake, overrides, isAdmin] = await Promise.all([
    getIntakeData(),
    getSessionOverrides("cohort-1", 7),
    getIsAdmin(),
  ]);
  const session = applyOverrides({ ...SESSION, zoomUrl: "https://us06web.zoom.us/j/88295797091?pwd=MejE1DJBXzA8veH0KDbPY0B8sPb29k.1" }, overrides);

  const BRAND_KIT: Record<string, string> = {
    "1. Design my brand board (see it)": `Act as a brand designer. Don't just describe a brand kit ~ DESIGN it so I can see it.

My business: **${intake?.business_oneliner || "[describe what you do in 2~3 sentences]"}**
The feeling I want people to get: [pick 3 words ~ e.g. "calm, premium, trustworthy" or "bold, fun, fast"]
Who I'm for: [your ideal client/audience in one line]
Anything I already have or love: [a color, a font, a brand you admire ~ or "nothing yet, surprise me"]

Create a visual brand board as an artifact I can look at, showing:
1. COLORS ~ a palette of 4~5 colors as labelled swatches (one main, one accent, plus neutrals), each with its hex code
2. TYPE ~ a heading font + a body font (free Google Fonts) shown actually in use, with sample text
3. SAMPLE UI ~ a button and a small card styled in the brand, so I can see how it feels
4. VOICE ~ 3 short rules for how I sound, with a do/don't example

Show it visually first. I'll react and we'll tweak it together (e.g. "warmer accent", "more minimal").`,

    "2. Tweak it": `Good start. Adjust the brand board:
- [what to change ~ e.g. "make the accent warmer / more muted"]
- [e.g. "try a serif heading font instead"]
- [e.g. "the background feels cold ~ warm it up"]

Keep everything else. Show me the updated board.`,

    "3. Give me the copy-paste version": `I'm happy with this. Now give me the brand as a short block I can paste into a build prompt:

"Brand: main #__, accent #__, background #__, text #__. Headings in [font], body in [font]."

Plus my 3 voice rules in one line each.`,

    "Apply my brand to a build": `Restyle this to match my brand kit. Don't change the layout or content ~ only the look.

Brand: main [#__], accent [#__], background [#__], text [#__].
Headings in [font], body in [font].

Apply it consistently: headers, buttons, cards, and links should use these colors and fonts. Keep good contrast so it stays readable.`,
  };

  const PROMPTS: Record<string, string> = {
    "Dashboard planning conversation": `I want to build a business dashboard. Help me plan it before we build.

My business: **${intake?.business_oneliner || "[describe what you do in 2–3 sentences]"}**
Who uses this dashboard: [just me / my team / clients]

The main reason I want this:
[What decision or habit does this dashboard support? Be specific.]

Metrics I want to track:
1. [metric name] ~ currently tracked in: [spreadsheet / app / my head]
2. [metric name] ~ currently tracked in: [where]
3. [metric name] ~ currently tracked in: [where]
4. [metric name] ~ currently tracked in: [where]
5. [metric name] ~ currently tracked in: [where]

How I'll update the data: [manually each week / automatically from ___]

Based on this, ask me 3 clarifying questions that will help us build the right thing ~ not the most impressive thing, the most useful thing.`,

    "Build prompt (use in Claude Code)": `Build me a business dashboard using Next.js (App Router).

PURPOSE: [one sentence ~ what this dashboard helps me do]
IT WORKS WITH MY AI EMPLOYEE (role: ${intake?.ai_employee_role || "[what they do]"}) ~ so it shows the work they do for me.

METRICS TO DISPLAY (top section ~ large, prominent numbers):
- [Metric 1 name]: sample value [X]
- [Metric 2 name]: sample value [X]
- [Metric 3 name]: sample value [X]

SECONDARY INFO (below the main metrics):
- [What my AI employee handled ~ a list/table of recent leads, drafts, or inquiries with their status]
  - Sample data: [describe what a few rows would look like]

LAYOUT:
- Top: [2–4] metric cards in a row
- Middle: [table / list / two-column layout]

BRAND (paste your brand kit here):
- Brand: main [#__], accent [#__], background [#__], text [#__]
- Headings in [font], body in [font]
- (No brand kit yet? Write "minimal white and gray" and move on.)

NOTES:
- Store sample data in a separate data file so I can easily update it
- Make it responsive ~ looks good on laptop and tablet
- Run with: npm run dev
- Keep it Version 1 simple ~ no charts unless I specifically ask`,

    "Iterate ~ change specific things": `The dashboard looks good. I want to make these specific changes:

CHANGE 1:
- What: [specific element ~ e.g. "The Revenue card"]
- Current state: [what it looks like now ~ e.g. "Shows the number in small gray text"]
- What I want: [e.g. "Make the number large (40px), dark, and bold. Add a small upward arrow next to it."]

CHANGE 2:
- What: [specific element]
- Current state: [what it looks like now]
- What I want: [what it should be]

CHANGE 3:
- What: [specific element]
- Current state: [current state]
- What I want: [desired state]

Make only these changes. Don't redesign, don't improve anything else.`,

    "When something looks broken": `Something in the dashboard isn't working correctly. Here's the exact issue:

WHAT I SEE:
[Describe what's appearing on screen ~ e.g. "The Active Clients card shows '0' instead of a real number"]

WHAT SHOULD HAPPEN:
[What the correct output should be ~ e.g. "It should show '12' based on the clients array in data.js"]

WHERE THE DATA IS:
[Tell Claude Code where to look ~ e.g. "The data is in /src/data/clients.json, key name is 'activeCount'"]

Fix only this issue. If you're going to change more than 5 lines, check with me first.`,
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
          W3 · S5
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
          W4 · S7
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
            <p className="text-xs text-[var(--taupe-400)] font-light mb-3">This one&apos;s hands-on ~ most of it is you building, live, while we circulate.</p>
            <ol className="space-y-0">
              {[
                { cet: "3:00 – 3:15", utc: "13:00", label: "Check-in ~ each person drops the live link from their first build last session", type: "share" },
                { cet: "3:15 – 3:30", utc: "13:15", label: "Recap ~ from a first build to your real dashboard; today we go hands-on", type: "teach" },
                { cet: "3:30 – 3:50", utc: "13:30", label: "Plan it ~ answer the 5 questions and lock your 5 metrics", type: "work" },
                { cet: "3:50 – 4:20", utc: "13:50", label: "Define your brand ~ Claude designs your brand board, you tweak it live", type: "work" },
                { cet: "4:20 – 4:30", utc: "14:20", label: "Break", type: "break" },
                { cet: "4:30 – 5:30", utc: "14:30", label: "Build your dashboard ~ plug in your brand and build, live, while we circulate", type: "work" },
                { cet: "5:30 – 5:55", utc: "15:30", label: "Make it stick ~ add save points and make your edits persist", type: "work" },
                { cet: "5:55 – 6:20", utc: "15:55", label: "Iterate ~ refine with precise change requests until it feels right", type: "work" },
                { cet: "6:20 – 6:40", utc: "16:20", label: "Share-out ~ each person demos their dashboard", type: "share" },
                { cet: "6:40 – 7:00", utc: "16:40", label: "Wrap-up ~ Week 3 deliverable check, Q&amp;A, and a preview of Week 4", type: "plenary" },
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
                    <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed pt-0.5" dangerouslySetInnerHTML={{ __html: obj }} />
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Plan before you build */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Plan before you build ~ 5 questions to answer first</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                The most common reason a Claude Code build comes out wrong: the builder skipped planning. Use the planning prompt below to answer these questions before you type a single build command.
              </p>
              <div className="flex flex-col gap-3">
                {planningQuestions.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-[var(--beige-200)] dark:border-white/5 last:border-0 last:pb-0">
                    <span className="size-6 shrink-0 rounded-full bg-[var(--beige-100)] dark:bg-white/5 border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[11px] font-semibold text-[var(--taupe-400)] mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">{item.q}</p>
                      <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: item.hint }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* V1 mindset */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">The Version 1 mindset</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                The goal of this session is <strong className="font-medium">a working first version you can show someone</strong> ~ not a perfect version that doesn't exist yet. A real dashboard with 3 metrics is worth more than a perfect dashboard that's still being designed.
              </p>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Build V1, open it in the browser, show it to someone today, iterate. The iteration is where the learning happens.
              </p>
            </div>
          </section>

          {/* Brand kit ~ make it look like you */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Palette className="size-3.5 text-[var(--clay-500)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Design your brand kit first ~ visually, so it looks like you, not a template</p>
            </div>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                The fastest way to make a build look generic is to leave the colors and fonts to chance. Branding is <em>visual</em> ~ so don&apos;t settle for a text list of hex codes. In <strong className="font-medium">Claude.ai</strong>, have Claude <strong className="font-medium">design you a brand board you can actually see</strong>: colour swatches, your fonts shown in use, even a sample button and card. React to it, tweak it live (&ldquo;warmer accent&rdquo;, &ldquo;more minimal&rdquo;), then have it hand you a copy-paste block for your builds. No terminal, no code.
              </p>
              <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4 flex flex-col gap-2">
                <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em]">How it goes ~ three quick rounds</p>
                <ul className="flex flex-col gap-1.5">
                  {[
                    { k: "See it", v: "Claude designs a visual brand board ~ colours, fonts in use, a sample button and card" },
                    { k: "Tweak it", v: "React like a client ~ \"warmer\", \"more minimal\", \"try a serif heading\" ~ until it feels like you" },
                    { k: "Export it", v: "Claude gives you a copy-paste colour + font block to drop into your build prompts" },
                  ].map((x) => (
                    <li key={x.k} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-[var(--taupe-400)] uppercase tracking-[0.1em] min-w-[64px] mt-0.5">{x.k}</span>
                      <span className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{x.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed">
                Do this in Claude.ai (it&apos;s a design conversation, not a build). Run the first three prompts in order; the last one restyles anything you&apos;ve already built to match.
              </p>
              <CodeTabs codes={BRAND_KIT} lang="markdown" />
            </div>
          </section>

          {/* Save points ~ git as an undo button */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Save className="size-3.5 text-[var(--clay-500)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Save points ~ an undo button for your whole project</p>
            </div>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                The moment you start iterating, you'll eventually ask Claude Code for a change that makes things <em>worse</em> ~ and you'll wish you could go back to the version that worked. This is the single most useful safety net in building: a <strong className="font-medium">save point</strong>.
              </p>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                The tool that does this is called <strong className="font-medium">git</strong>. Developers use it for a hundred things ~ you only need it for one: take a snapshot whenever the dashboard works, so you can always return to it. Think of it as a save point in a video game.
              </p>
              <div className="rounded-xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-4 flex items-start gap-3">
                <RotateCcw className="size-4 text-[var(--clay-500)] shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                  <strong className="font-medium">Don't want the commands?</strong> You don't have to type any of this. Just tell Claude Code: <code className="text-xs bg-[var(--beige-100)] dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">save this as a checkpoint</code> when it works, and <code className="text-xs bg-[var(--beige-100)] dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">undo back to my last checkpoint</code> when you want to go back. It handles git for you.
                </p>
              </div>
              <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed">
                Prefer to do it yourself? Three commands cover everything ~ run them in the terminal, in your project folder.
              </p>
              <CodeTabs codes={SAVE_POINTS} lang="bash" />
              <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed">
                Rule of thumb: <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">save a version every time it works</strong>, before you ask for the next change. Save points are cheap; rebuilding from memory is not.
              </p>
            </div>
          </section>

          {/* Iteration rules */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">How to describe what's wrong ~ precision matters</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Claude Code makes exactly the change you describe. Vague feedback creates random changes. Specific feedback creates precise improvements.
              </p>
              <div className="flex flex-col gap-3">
                {iterationRules.map((rule, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="rounded-lg border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] px-3 py-2">
                      <p className="text-[10px] font-semibold text-[var(--taupe-400)] uppercase tracking-[0.1em] mb-0.5">Don't say</p>
                      <p className="text-sm text-[var(--taupe-400)] font-light" dangerouslySetInnerHTML={{ __html: `"${rule.wrong}"` }} />
                    </div>
                    <div className="rounded-lg border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 px-3 py-2">
                      <p className="text-[10px] font-semibold text-[var(--clay-500)] uppercase tracking-[0.1em] mb-0.5">Say</p>
                      <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light" dangerouslySetInnerHTML={{ __html: `"${rule.right}"` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Prompts */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Prompts ~ copy and use these</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Start with <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Dashboard planning conversation</strong> in Claude.ai. Then use the <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Build prompt</strong> directly inside Claude Code. Use the iteration prompts when you see the first version and want to refine it.
            </p>
            <CodeTabs codes={PROMPTS} lang="markdown" />
          </section>

          {/* Persistence ~ how your dashboard remembers */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Database className="size-3.5 text-[var(--clay-500)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">How your dashboard remembers ~ persistence in plain English</p>
            </div>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                A dashboard is only useful if your numbers <em>stick</em>. &ldquo;Persistence&rdquo; just means: where does the data live so it doesn&apos;t vanish? There&apos;s a ladder, simplest to most powerful ~ and for now you only need the first two rungs.
              </p>

              {/* the ladder */}
              <div className="flex items-center gap-2 flex-wrap text-sm">
                {[
                  { n: "Hardcoded", d: "in the app", dim: true },
                  { n: "Data file", d: "edit + refresh", dim: false },
                  { n: "localStorage", d: "it remembers you", dim: false },
                  { n: "Database", d: "when you outgrow your laptop", dim: true },
                ].map((r, i, arr) => (
                  <span key={r.n} className="flex items-center gap-2">
                    <span className={`rounded-lg border px-2.5 py-1 ${r.dim ? "border-[var(--beige-200)] dark:border-white/5 text-[var(--taupe-400)]" : "border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 text-[var(--charcoal-900)] dark:text-foreground"}`}>
                      <span className="font-medium">{r.n}</span>
                      <span className="text-[var(--taupe-400)] font-light"> ~ {r.d}</span>
                    </span>
                    {i < arr.length - 1 && <ArrowRight className="size-3 text-[var(--taupe-400)] shrink-0" />}
                  </span>
                ))}
              </div>

              {/* two rungs explained */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4 flex flex-col gap-1.5">
                  <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">1. A data file</p>
                  <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                    Your numbers live in a separate file (<code className="text-xs bg-[var(--beige-100)] dark:bg-white/10 px-1 py-0.5 rounded font-mono">data.js</code>), not inside the app. Edit the file, refresh, the dashboard updates. It persists because the file is saved on disk. You already have this.
                  </p>
                </div>
                <div className="rounded-xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-4 flex flex-col gap-1.5">
                  <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">2. localStorage</p>
                  <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                    Edit a value <em>in the dashboard itself</em>, close the browser, come back ~ it&apos;s still there. Built into every browser, no account, no backend. This is the &ldquo;it remembers me&rdquo; moment. One prompt adds it.
                  </p>
                </div>
              </div>

              <CodeTabs codes={PERSIST_PROMPT} lang="markdown" />

              <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4">
                <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                  <strong className="font-medium">The honest limit:</strong> localStorage lives in <em>this</em> browser on <em>this</em> laptop. It isn&apos;t synced across devices, shared with a team, or backed up. The day you need that ~ a real, production-grade app with a database ~ that&apos;s the next level up. You don&apos;t need it today; just know the ladder keeps going.
                </p>
              </div>
            </div>
          </section>

          {/* Level up ~ AI employee feeds the dashboard */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <RefreshCw className="size-3.5 text-[var(--clay-500)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Level up ~ let your AI employee feed the dashboard</p>
            </div>
            <div className="rounded-2xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Here&apos;s where the two things you built finally connect. Your Cowork AI employee already finds and scores leads ~ have it <strong className="font-medium">save them as a simple markdown file</strong> (<code className="text-xs bg-[var(--beige-100)] dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">leads.md</code>), and your dashboard <strong className="font-medium">reads that file</strong>. Every time your employee adds new leads, you refresh and they&apos;re there. No copy-paste.
              </p>
              <div className="flex items-center gap-2 flex-wrap text-sm text-[var(--charcoal-900)] dark:text-foreground">
                {["AI employee finds + scores leads", "Writes them to leads.md", "Dashboard reads the file", "Refresh → updated"].map((step, i, arr) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="font-light">{step}</span>
                    {i < arr.length - 1 && <ArrowRight className="size-3 text-[var(--clay-500)] shrink-0" />}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed">The file your employee writes ~ a plain table, nothing fancy:</p>
              <CodeTabs
                codes={{
                  "leads.md (your employee writes this)": `# Leads

| Name      | Source    | Score | Status  |
| --------- | --------- | ----- | ------- |
| Maya R.   | Instagram | Warm  | Drafted |
| Carlos D. | Referral  | Hot   | Replied |
| Lena P.   | Website   | Cold  | New     |`,
                }}
                lang="markdown"
              />
              <CodeTabs
                codes={{
                  "1. Tell your AI employee to save leads": `From now on, when you find and score leads for me, save them as a markdown table in a file called leads.md.

Columns: Name | Source | Score (Hot/Warm/Cold) | Status (New/Drafted/Replied)
Add new leads as new rows ~ keep the existing ones.

(You're my ${intake?.ai_employee_role || "[employee role]"}.)`,
                  "2. Make your dashboard read it": `Update my dashboard to read leads.md (a markdown table: Name | Source | Score | Status) instead of the sample data.

- Show the leads in the table, newest first
- Update the top cards to count from the file (total, Hot, Replied)
- Color-code the Score: Hot = green, Warm = amber, Cold = gray
- Read the file on the server so every refresh shows whatever is currently in leads.md

Keep it simple.`,
                }}
                lang="markdown"
              />
              <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed">
                <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">How &ldquo;updates&rdquo; works:</strong> the dashboard re-reads the file every time you refresh ~ so when your employee adds leads, they show up. This runs on your machine; it&apos;s the bridge between static sample data and a real live database (the next level up).
              </p>
            </div>
          </section>

          {/* Deliverable */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-2">Week 3 Deliverable</p>
            <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
              1 custom business dashboard built with Claude Code ~ running in your browser, showing at least 3 of your real metrics with sample data you can update.
            </p>
          </div>

          {/* Next session card */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Up next: Your full Claude stack working together</p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Week 4 · Session 7 ~ Sat, Jun 27</p>
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
        <SessionEditPanel courseSlug="cohort-1" sessionNumber={7} initial={session} />
      )}
    </div>
  );
}

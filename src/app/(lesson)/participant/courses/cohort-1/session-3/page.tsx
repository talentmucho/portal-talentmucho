import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";
import { getIntakeData } from "@/utils/intake-helper";
import { getSessionOverrides, getIsAdmin, applyOverrides } from "@/utils/session-content";
import { SessionEditPanel } from "@/components/session-edit-panel";

const SESSION = {
  tag: "W1 · S2",
  color: "#C4A882",
  weekLabel: "Week 1 · Knowing Claude",
  title: "Custom instructions, file uploads",
  date: "Sun, Jun 8",
  time: "4–7 PM CET · 14:00–17:00 UTC",
  videoUrl: null as string | null,
  description:
    "You built your Projects in session 2. Now you configure them. By the end of this session each of your 5 Claude Projects will have custom instructions, uploaded files, and a verified brand voice ~ so Claude knows exactly how to work with you.",
  resources: [
    { label: "Custom instructions template", href: "#" },
    { label: "Brand voice worksheet", href: "#" },
    { label: "Week 1 deliverable checklist", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const PREV     = "/participant/courses/cohort-1/session-2";
const NEXT     = "/participant/courses/cohort-1/session-4";

const bringList = [
  "Your 5 Claude Projects from Session 2 open in Claude.ai",
  "A writing sample in your voice (email, proposal, or social post)",
  "One SOP, process doc, or FAQ (PDF, Word, or plain text)",
  "Your brand voice doc if you ran the skill-maker exercise",
];

const objectives = [
  "Write custom instructions for each of your 5 Claude Projects",
  "Upload the files that make Claude context-aware for your business",
  "Verify Claude actually knows your business using the check prompts",
  "Leave with all 5 Projects configured and ready to use tomorrow",
];

const projects = [
  { n: "01", name: "Client Relations", purpose: "Proposals, emails, onboarding ~ anything client-facing. Tone should be warm but professional." },
  { n: "02", name: "Project Management", purpose: "Active work, timelines, deliverables. Instructions should include how you like to track status." },
  { n: "03", name: "Finance & Invoicing", purpose: "Invoices, payment tracking, rates. Include your standard rates and payment terms." },
  { n: "04", name: "Marketing & Content", purpose: "Your voice, positioning, content ideas. Upload your brand voice doc here." },
  { n: "05", name: "Second Brain", purpose: "Ideas, notes, strategy ~ your private thinking space. No filters needed." },
];

const uploadGuide = [
  { file: "A writing sample", why: "Teaches Claude your tone and voice so it writes the way you actually sound" },
  { file: "Service or product descriptions", why: "Claude describes what you offer accurately, not generically" },
  { file: "An SOP or process doc", why: "Claude follows your process, not a generic best practice" },
  { file: "Client FAQ or common questions", why: "Claude answers using your actual answers, not guesses" },
];

export default async function Session4Page() {
  const [intake, overrides, isAdmin] = await Promise.all([
    getIntakeData(),
    getSessionOverrides("cohort-1", 3),
    getIsAdmin(),
  ]);
  const session = applyOverrides({ ...SESSION, zoomUrl: "https://us06web.zoom.us/j/88295797091?pwd=MejE1DJBXzA8veH0KDbPY0B8sPb29k.1" }, overrides);

  const PROMPTS: Record<string, string> = {
    "Custom instructions template": `You are my business assistant for [Business Name].

ABOUT MY BUSINESS:
**${intake?.business_oneliner || "[2–3 sentences: what you do, who you serve, how you're different from competitors]"}**

MY CUSTOMERS:
[Describe your ideal client ,  their situation, what they're trying to solve, how they make decisions]

TONE AND STYLE:
- Voice: [formal / conversational / warm / direct ,  pick one that fits you]
- Write like: [describe your communication style in 1 sentence, or paste an example phrase]
- Response format: [brief bullets / full paragraphs / depends on task ,  tell Claude your preference]
- Response length: [short and punchy / thorough and detailed / match the task]

ALWAYS:
- Reference my business context when giving advice ,  no generic tips
- Ask one clarifying question before writing anything client-facing
- Flag when you're uncertain or when something needs my review before it goes out
- Use the tone from my uploaded writing sample

NEVER:
- Make up facts about my business, my offers, or my clients
- Use corporate jargon or buzzwords I haven't used myself
- Send anything to a client without noting it needs my approval first
- Start responses with "Certainly!" or "Great question!"`,

    "Ask Claude to improve your instructions": `I've just written my custom instructions for this Project. Read them carefully, then tell me:

1. What's clear and well-defined (what you can do confidently with these instructions)
2. What's vague or missing (where you'd have to guess)
3. What one addition would make you 20% more useful to me

Then suggest a revised version of any weak section.`,

    "Check Claude knows your business": `Based on my custom instructions and any files I've uploaded, summarize:

1. What you know about my business (be specific ,  not general)
2. What types of tasks you can handle confidently in this Project
3. What you're still uncertain about
4. One file or piece of information that, if I added it, would make you significantly more useful

If anything in my instructions is contradictory or unclear, flag it now.`,
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
          W1 · S1
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
          W2 · S3
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
                { cet: "4:00 – 4:10", utc: "14:00", label: "Welcome & recap ~ what did you build in Session 2?", type: "plenary" },
                { cet: "4:10 – 4:30", utc: "14:10", label: "What are custom instructions ~ the 4-part framework", type: "teach" },
                { cet: "4:30 – 4:45", utc: "14:30", label: "File uploads ~ what to add and why it matters", type: "teach" },
                { cet: "4:45 – 5:00", utc: "14:45", label: "Share ~ what have you configured so far? Show us your Project setup", type: "share" },
                { cet: "5:00 – 5:05", utc: "15:00", label: "Work brief ~ what you&apos;re doing for the next hour", type: "plenary" },
                { cet: "5:05 – 6:05", utc: "15:05", label: "Work time ~ write your instructions, upload your files, run the check prompts", type: "work" },
                { cet: "6:05 – 6:15", utc: "16:05", label: "Break", type: "break" },
                { cet: "6:15 – 6:45", utc: "16:15", label: "Group share ~ each person shows one configured Project and what Claude now knows", type: "share" },
                { cet: "6:45 – 7:00", utc: "16:45", label: "Q&A · Week 1 deliverable check · preview of Week 2", type: "plenary" },
              ].map((item, i, arr) => {
                const badge: Record<string, { label: string; color: string }> = {
                  teach:   { label: "Teaching",   color: "bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)]" },
                  demo:    { label: "Live demo",  color: "bg-[var(--clay-500)]/10 text-[var(--clay-500)]" },
                  work:    { label: "Work time",  color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" },
                  share:   { label: "Sharing",    color: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400" },
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
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What you&apos;ll do in this session</p>
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

          {/* What are custom instructions */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What custom instructions actually do</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Custom instructions are text that Claude reads <strong className="font-medium">before every single message</strong> in a Project. Think of them as the onboarding document you&apos;d give a new contractor on their first day ,  who you are, how you work, what you expect, and what not to do.
              </p>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Without custom instructions, every message starts from scratch. Claude doesn&apos;t know if you want bullet points or paragraphs, formal or casual, long-form or brief. With them, Claude already knows ,  and it shows in every response.
              </p>
              <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4">
                <p className="text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.12em] mb-2">The four parts of great custom instructions</p>
                <ol className="flex flex-col gap-2">
                  {[
                    { label: "WHO YOU ARE", desc: "2–3 sentences about your business, your customers, and your role" },
                    { label: "TONE & STYLE", desc: "How you communicate ,  voice, format, response length" },
                    { label: "ALWAYS DO", desc: "What Claude should always do in this Project" },
                    { label: "NEVER DO", desc: "What Claude should never do ,  your non-negotiables" },
                  ].map((part, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="font-semibold text-[var(--charcoal-900)] dark:text-foreground shrink-0 min-w-[90px]">{part.label}</span>
                      <span className="text-[var(--taupe-400)] font-light">{part.desc}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* What to upload */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What to upload ,  and why</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Files you upload to a Project stay there permanently. Claude can reference them in every conversation. The goal is to give Claude the same reference materials you&apos;d give a new team member.
              </p>
              <div className="flex flex-col gap-2">
                {uploadGuide.map((item) => (
                  <div key={item.file} className="flex items-start gap-3 py-2 border-b border-[var(--beige-200)] dark:border-white/5 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">{item.file}</p>
                      <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">{item.why}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--taupe-400)] font-light">Accepted formats: PDF, Word, plain text, markdown. Keep files under 25 MB.</p>
            </div>
          </section>

          {/* Five Projects */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Your 5 Projects ~ what to configure in each</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((p) => (
                <div key={p.name} className={`rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-4 flex flex-col gap-2${p.n === "05" ? " sm:col-span-2" : ""}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5 rounded bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)]">{p.n}</span>
                    <p className="font-medium text-sm text-[var(--charcoal-900)] dark:text-foreground">{p.name}</p>
                  </div>
                  <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed">{p.purpose}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--taupe-400)] font-light">Each Project gets its own custom instructions tailored to its purpose. Client Relations should feel professional; Second Brain can be raw and candid.</p>
          </section>

          {/* Prompts */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Prompts ,  copy and use these</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Start with the <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Custom instructions template</strong> ,  paste it into your Project&apos;s custom instructions, fill in every bracket, and save. Then use the other two to verify and refine.
            </p>
            <CodeTabs codes={PROMPTS} lang="markdown" />
          </section>

          {/* Exercise */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Your exercise for this session</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Complete before Week 2:</p>
              <ol className="flex flex-col gap-2">
                {[
                  "Write custom instructions for your Client-Facing Project using the template above",
                  "Upload at least one file (writing sample or SOP) to that Project",
                  "Use the \"Check Claude knows your business\" prompt to verify Claude got it right",
                  "Create Projects 2 and 3 with their own tailored custom instructions",
                  "Add at least one file to each Project",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                    <span className="size-5 shrink-0 rounded-full border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[10px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Deliverable */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-2">Week 1 Deliverable</p>
            <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
              3 configured Claude.ai Projects ,  each with custom instructions and at least one uploaded file that makes Claude context-aware for that type of work.
            </p>
          </div>

          {/* Next session card */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Up next: AI employees ,  what Cowork makes real</p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Week 2 · Session 3 ,  Sat, Jun 13</p>
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
        <SessionEditPanel courseSlug="cohort-1" sessionNumber={3} initial={session} />
      )}
    </div>
  );
}

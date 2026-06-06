import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { getIntakeData } from "@/utils/intake-helper";
import { getSessionOverrides, getIsAdmin, applyOverrides } from "@/utils/session-content";
import { SessionEditPanel } from "@/components/session-edit-panel";

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

export default async function Session1Page() {
  const [intake, overrides, isAdmin] = await Promise.all([
    getIntakeData(),
    getSessionOverrides("cohort-1", 1),
    getIsAdmin(),
  ]);
  const session = applyOverrides({ ...SESSION, zoomUrl: "https://us06web.zoom.us/j/88295797091?pwd=MejE1DJBXzA8veH0KDbPY0B8sPb29k.1" }, overrides);

  const firstName = intake?.first_name || "there";
  const focusArea = intake?.first_focus || "business operations";
  const businessContext = intake?.business_oneliner || "[your business one-liner]";
  const oneThingGoal = intake?.one_thing || "get more done with less effort";
  const aiEmployeeRole = intake?.ai_employee_role || "general assistant";
  const dashboardMetrics = intake?.dashboard_metrics || "key business metrics";

  const customPrompt = (
    <>
      Act as an expert in <strong className="font-bold text-[var(--charcoal-900)] dark:text-white bg-[var(--beige-200)] dark:bg-white/10 px-1 rounded">{focusArea}</strong>. My business does: <strong className="font-bold text-[var(--charcoal-900)] dark:text-white bg-[var(--beige-200)] dark:bg-white/10 px-1 rounded">{businessContext}</strong>.{"\n"}
      Please give me a strategic checklist for week 1.
    </>
  );

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
              background: `${session.color}22`,
              color: session.color,
              border: `1px solid ${session.color}44`,
            }}
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
          W1 · S1
          <ArrowRight className="size-3.5" />
        </Link>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* Content */}
        <main className="flex-1 flex flex-col p-6 md:p-8 gap-6 min-w-0 overflow-y-auto tm-scrollbar">
          <div className="relative w-full max-h-[55vh] aspect-video rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] overflow-hidden">
            {session.videoUrl ? (
              <iframe src={session.videoUrl} className="w-full h-full" allowFullScreen />
            ) : (
              <>
                <Image
                  src="/assets/events/kickoff-banner.png"
                  alt="TalentMucho AI Bootcamp ~ Learn. Create. Grow."
                  fill
                  priority
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute bottom-3 right-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--charcoal-900)]/70 bg-white/70 backdrop-blur px-2.5 py-1 rounded-full">
                  Recording goes live after the session
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <p className="tm-eyebrow mb-1">{session.weekLabel}</p>
              <h1
                className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground mb-3"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.875rem)" }}
              >
                Welcome, {firstName}!
              </h1>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed max-w-2xl mb-3">
                So happy to have you here. This kickoff is all about <em>you</em> ~ your business, your goals, and making sure your mindset is ready for what&apos;s coming.
              </p>
              <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed max-w-2xl mb-3">
                Over the next 4 weeks you&apos;re going to transform how you work. You told us you want to <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">{oneThingGoal}</strong> ~ and that&apos;s exactly what we&apos;re going to build toward, starting tonight.
              </p>
              <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed max-w-2xl">
                No fluff. No theory for theory&apos;s sake. By the end of each session you&apos;ll have something real running inside your business. Tonight we get everyone set up, introduced, and aligned ~ so we can hit the ground running on Saturday.
              </p>
            </div>

            {/* Agenda */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-4">
                Tonight&apos;s agenda · 2 hours
              </h3>
              <ol className="space-y-0">
                {[
                  { time: "0:00 – 0:10", label: "Welcome & housekeeping", qa: false },
                  { time: "0:10 – 0:35", label: "Round of introductions ~ who you are and what your business does", qa: false },
                  { time: "0:35 – 1:00", label: "Q&A ~ your expectations, fears, and what success looks like for you", qa: true },
                  { time: "1:00 – 1:20", label: "What is Claude? A quick recap", qa: false },
                  { time: "1:20 – 1:45", label: "Installing Claude & setting up your account", qa: false },
                  { time: "1:45 – 1:55", label: "Your first conversation ~ live demo", qa: false },
                  { time: "1:55 – 2:00", label: "What to expect in Week 1 & wrap-up", qa: false },
                ].map((item, i, arr) => (
                  <li key={item.time} className={`flex gap-4 items-start py-3 ${i < arr.length - 1 ? "border-b border-[var(--beige-200)] dark:border-white/5" : ""}`}>
                    <span className="shrink-0 text-xs tabular-nums text-[var(--taupe-400)] pt-0.5 w-24">{item.time}</span>
                    <span className={`text-sm font-light ${item.qa ? "text-[var(--clay-500)] dark:text-[var(--taupe-400)] font-medium" : "text-[var(--charcoal-900)] dark:text-foreground"}`}>
                      {item.label}
                    </span>
                    {item.qa && (
                      <span className="ml-auto shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)]">Q&A</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* Questions for the call */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)]">
              <p className="tm-eyebrow mb-2">Come ready to answer</p>
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-1">
                Questions we&apos;ll explore together tonight
              </h3>
              <p className="text-sm text-[var(--taupe-400)] mb-4 font-light">
                These aren&apos;t trick questions ~ there&apos;s no wrong answer. They&apos;re conversation starters. Have a think before we go live.
              </p>
              <ul className="space-y-3">
                {[
                  { q: "What&apos;s one task you do every week that eats way more time than it should?", hint: "We&apos;re going to assign that to Claude." },
                  { q: "What does &quot;more time&quot; actually mean for you?", hint: "More time with family? More time on creative work? More time to think? Know your why." },
                  { q: "What would you do with an extra 5 hours a week?", hint: "This is your North Star for the bootcamp." },
                  { q: "What&apos;s one thing you&apos;re skeptical about when it comes to AI?", hint: "Bring your doubts. We&apos;d rather address them on night one than week four." },
                  { q: "How do you want this cohort to feel by the end of Week 4?", hint: "Think mindset, not just tools." },
                ].map((item, i) => (
                  <li key={i} className="border-b border-[var(--beige-200)] dark:border-white/5 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground" dangerouslySetInnerHTML={{ __html: item.q }} />
                    <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5" dangerouslySetInnerHTML={{ __html: item.hint }} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Introductions */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-2">
                Introducing yourself
              </h3>
              <p className="text-sm text-[var(--taupe-400)] mb-4">
                When it&apos;s your turn on Zoom, share these three things in under 60 seconds:
              </p>
              <ol className="space-y-2">
                {[
                  "Your name and where you&apos;re based",
                  "What your business does in one sentence",
                  "One thing you&apos;re hoping to walk away with from this bootcamp",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm text-[var(--charcoal-900)] dark:text-foreground">
                    <span className="shrink-0 size-5 rounded-full bg-[var(--beige-200)] dark:bg-white/10 flex items-center justify-center text-[10px] font-bold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ol>
            </div>

            {/* What is Claude */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-2">
                What is Claude?
              </h3>
              <p className="text-sm text-[var(--taupe-400)] mb-4">
                A quick recap before we dive in.
              </p>
              <div className="space-y-3 text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                <p>
                  Claude is an AI assistant built by Anthropic. Unlike a search engine that finds existing pages, Claude <em>generates</em> responses ~ it writes, reasons, summarises, and creates based on what you tell it.
                </p>
                <p>
                  Think of it as a highly capable collaborator you can talk to in plain language. You don&apos;t need to code or use special commands. Just describe what you need.
                </p>
                <p>
                  In this bootcamp we&apos;ll use Claude to run real parts of your business ~ from drafting content to building tools ~ starting today.
                </p>
              </div>
            </div>

            {/* Your 5 Claude Projects */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="tm-eyebrow mb-1">Before Saturday</p>
                <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-2">
                  Your freelance business system ~ 5 Claude Projects
                </h3>
                <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed max-w-2xl">
                  This is your homework tonight. Set up these 5 Projects in Claude before Saturday&apos;s session. Each one becomes a dedicated workspace where Claude knows exactly what it&apos;s helping you with. Together they form a complete business operating system ~ built around <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">{businessContext}</strong>.
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
                <p className="tm-eyebrow mb-2">Set up tonight</p>
                <h4 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-4">4 steps to get Claude running as your business assistant</h4>
                <ol className="space-y-4">
                  {[
                    { n: 1, title: "Create a free account", body: "Go to claude.ai and sign up. Free plan is enough to get started tonight. No credit card needed." },
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

              {/* Brand voice prompt */}
              <div className="p-5 rounded-2xl border-2 border-dashed border-[var(--beige-200)] dark:border-white/10 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-1">Bonus task</p>
                  <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground mb-1">Build your brand voice document</p>
                  <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed">
                    Open a fresh Claude conversation (not inside any project) and paste the prompt below. Claude will interview you and write a brand-voice.txt you can upload to every project.
                  </p>
                </div>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 shrink-0 border border-[var(--beige-200)] dark:border-white/10 text-[var(--charcoal-900)] dark:text-foreground text-sm font-medium px-4 py-2.5 rounded-full hover:bg-[var(--beige-50)] dark:hover:bg-white/5 transition-colors"
                >
                  Open Claude
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* How to install Claude ~ Windows guide */}
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden">
              <div className="px-5 py-4 bg-white dark:bg-[var(--card)] flex items-center justify-between gap-4 border-b border-[var(--beige-200)] dark:border-white/5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-0.5">Windows setup guide</p>
                  <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground">
                    Install Claude on your PC
                  </h3>
                  <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Desktop app + Claude Code · 3 install paths · under 2 min</p>
                </div>
                <a
                  href="/guides/claude-install-windows.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 shrink-0 text-xs font-medium text-[var(--charcoal-900)] dark:text-foreground border border-[var(--beige-200)] dark:border-white/10 rounded-full px-3 py-1.5 hover:bg-[var(--beige-50)] dark:hover:bg-white/5 transition-colors"
                >
                  Open full guide
                  <ArrowRight className="size-3" />
                </a>
              </div>
              <iframe
                src="/guides/claude-install-windows.html"
                className="w-full border-0"
                style={{ height: "520px" }}
                title="Install Claude on Windows"
              />
            </div>

            {/* Moving from ChatGPT to Claude */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] flex flex-col gap-4">
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
            </div>

            {/* 3 ways to use Claude ~ matrix */}
            <div className="flex flex-col gap-3">
              <div>
                <p className="tm-eyebrow mb-1">Know your tools</p>
                <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-1">3 ways to use Claude ~ and when to use each</h3>
                <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed">Claude isn&apos;t just a chat window. Here&apos;s the full picture.</p>
              </div>
              <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden">
                {/* Header row */}
                <div className="grid grid-cols-4 bg-[var(--beige-100)] dark:bg-white/5 border-b border-[var(--beige-200)] dark:border-white/5">
                  {["", "Claude.ai", "Terminal (Claude Code)", "Browser Extension"].map((h, i) => (
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
                      "Using Claude inside any website or tool you already use",
                    ],
                  },
                  {
                    label: "Skill level",
                    vals: ["Beginner ~ no setup needed", "Intermediate ~ requires install", "Beginner ~ install extension"],
                  },
                  {
                    label: "Key benefit",
                    vals: [
                      "Best context retention via Projects; cleanest UI",
                      "Can read/write files, run commands, build dashboards",
                      "Use Claude in Gmail, Notion, LinkedIn, anywhere",
                    ],
                  },
                  {
                    label: "Limitation",
                    vals: [
                      "Can&apos;t interact with your local files or other apps",
                      "Requires comfort with the command line",
                      "Lighter context than full Claude Projects",
                    ],
                  },
                  {
                    label: "Use in bootcamp",
                    vals: ["Weeks 1 & 2 ~ Projects + AI employees", "Week 3 ~ build your dashboard live", "Ongoing ~ speed up daily work"],
                  },
                ].map((row, ri) => (
                  <div key={ri} className={`grid grid-cols-4 ${ri % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-[var(--beige-50)] dark:bg-white/[0.02]"} border-b border-[var(--beige-200)] dark:border-white/5 last:border-0`}>
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
              <p className="text-xs text-[var(--taupe-400)] font-light px-1">
                We&apos;ll use all three during this bootcamp. Tonight we start with Claude.ai. Week 3 we go into the terminal. The extension is yours to explore anytime.
              </p>
            </div>

            {/* Referral callout */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-1">Not on Pro yet?</p>
                <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground mb-0.5">
                  Use Abie&apos;s referral link to upgrade
                </p>
                <p className="text-xs text-[var(--taupe-400)] font-light">
                  We&apos;ll be diving into Claude Code in Week 3 ~ Pro is required. Upgrade before Saturday so you&apos;re ready to build.
                </p>
              </div>
              <a
                href="https://claude.ai/referral/w_4oPbSrvw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 shrink-0 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Get Claude Pro
                <ArrowRight className="size-3.5" />
              </a>
            </div>

            {/* Personalized prompt */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-2">
                Your first personalized prompt
              </h3>
              <p className="text-sm text-[var(--taupe-400)] mb-4">
                Based on your onboarding answers, we&apos;ve crafted a prompt for you to try in Claude right now.
              </p>
              <div className="relative group">
                <pre className="p-4 rounded-xl bg-[var(--beige-50)] dark:bg-[var(--espresso-700)] text-sm text-[var(--charcoal-900)] dark:text-[var(--taupe-400)] whitespace-pre-wrap font-mono">
                  {customPrompt}
                </pre>
              </div>
            </div>

            {/* Personalized roadmap */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)]">
              <p className="tm-eyebrow mb-2">Your roadmap, {firstName}</p>
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-1">
                What the next 4 weeks look like for your business
              </h3>
              <p className="text-sm text-[var(--taupe-400)] mb-5">
                Based on your onboarding answers, here&apos;s how each week connects to what you&apos;re building.
              </p>
              <div className="space-y-4">
                {[
                  {
                    week: "Week 1 · Knowing Claude",
                    highlight: `You said your first focus is ${focusArea}. This week you&apos;ll set up Claude Projects loaded with context about ${businessContext} so Claude can work the way you do.`,
                  },
                  {
                    week: "Week 2 · Delegating to Claude",
                    highlight: `You want a ${aiEmployeeRole} on your team. This week you&apos;ll build and brief your first AI employee inside Cowork and test it against real tasks from your business.`,
                  },
                  {
                    week: "Week 3 · Building with Claude",
                    highlight: `You want to track ${dashboardMetrics}. This week you&apos;ll use Claude Code to build a custom dashboard ~ no coding experience needed.`,
                  },
                  {
                    week: "Week 4 · Living with Claude",
                    highlight: `You said you want to ${oneThingGoal}. This week you&apos;ll put your full Claude stack together and define the daily moments where AI runs alongside your business.`,
                  },
                ].map((item) => (
                  <div key={item.week} className="flex gap-4">
                    <div className="w-1 shrink-0 rounded-full bg-[var(--beige-200)] dark:bg-white/10" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)] mb-1">{item.week}</p>
                      <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: item.highlight }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What to prepare */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-2">
                Before Week 1 starts
              </h3>
              <p className="text-sm text-[var(--taupe-400)] mb-4">
                Sessions 1 and 2 are this Saturday and Sunday. Come ready with these:
              </p>
              <ul className="space-y-2">
                {[
                  "A Claude.ai account (we just set this up tonight)",
                  "A doc or note with 3–5 sentences describing your business ~ you&apos;ll paste this into your Claude Project",
                  "One real task you&apos;ve been putting off ~ we&apos;ll use Claude to knock it out live",
                  "Your laptop, not your phone",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm">
                    <CheckCircle2 className="size-4 shrink-0 text-[var(--taupe-400)] mt-0.5" />
                    <span className="text-[var(--charcoal-900)] dark:text-foreground font-light" dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Next step nudge */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-center justify-between gap-4 mt-auto">
            <div>
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">
                Up next: The interface, Projects, your first conversation
              </p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">
                Week 1 · Session 1 ,  Sat, Jun 6
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
                <dd className="font-medium text-[var(--charcoal-900)] dark:text-foreground text-right">{session.date}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--taupe-400)]">Time</dt>
                <dd className="font-medium text-[var(--charcoal-900)] dark:text-foreground text-right">{session.time}</dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-3">
              Resources
            </p>
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
              <li>
                <a
                  href="https://chat.whatsapp.com/ElPVKFHdiABJZJ7aZmcGLs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--charcoal-900)] dark:text-foreground hover:opacity-70 transition-opacity underline underline-offset-2 decoration-[var(--beige-200)]"
                >
                  Join our WhatsApp group
                </a>
              </li>
              <li>
                <Link
                  href="/participant/courses/cohort-1/roadmap"
                  className="text-sm text-[var(--charcoal-900)] dark:text-foreground hover:opacity-70 transition-opacity underline underline-offset-2 decoration-[var(--beige-200)]"
                >
                  Your personal roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-auto">
            <a
              href={session.zoomUrl}
              className="inline-flex items-center justify-center gap-2 w-full bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Join live on Zoom
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </aside>
      </div>
      {isAdmin && (
        <SessionEditPanel courseSlug="cohort-1" sessionNumber={1} initial={session} />
      )}
    </div>
  );
}

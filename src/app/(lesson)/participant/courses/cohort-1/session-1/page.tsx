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
              <ol className="space-y-3">
                {[
                  { time: "0:00 – 0:10", label: "Welcome & housekeeping" },
                  { time: "0:10 – 0:40", label: "Round of introductions ~ who you are and what your business does" },
                  { time: "0:40 – 1:05", label: "What is Claude? A quick recap" },
                  { time: "1:05 – 1:30", label: "Installing Claude & setting up your account" },
                  { time: "1:30 – 1:50", label: "Your first conversation ~ live demo & Q&A" },
                  { time: "1:50 – 2:00", label: "What to expect in Week 1 & wrap-up" },
                ].map((item) => (
                  <li key={item.time} className="flex gap-4 items-start">
                    <span className="shrink-0 text-xs tabular-nums text-[var(--taupe-400)] pt-0.5 w-24">{item.time}</span>
                    <span className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light">{item.label}</span>
                  </li>
                ))}
              </ol>
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

            {/* How to install Claude */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-2">
                How to install Claude
              </h3>
              <p className="text-sm text-[var(--taupe-400)] mb-4">
                We&apos;ll do this together on the call. Follow along here:
              </p>
              <ol className="space-y-3">
                {[
                  { step: "Go to claude.ai", detail: "Open a browser and navigate to claude.ai" },
                  { step: "Create a free account", detail: "Sign up with your email or Google account. The free plan is enough for tonight." },
                  { step: "Start a new conversation", detail: "Click \"Start new chat\" and type your first message. Say hi ~ Claude will respond." },
                  { step: "Try the Pro plan (optional)", detail: "Upgrade to Claude Pro ($20/mo) for higher limits. We recommend it for the full bootcamp experience, but it&apos;s not required to start." },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="size-4 shrink-0 text-[var(--taupe-400)] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">{item.step}</p>
                      <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5" dangerouslySetInnerHTML={{ __html: item.detail }} />
                    </div>
                  </li>
                ))}
              </ol>
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

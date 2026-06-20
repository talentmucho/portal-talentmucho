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
  videoUrl: "https://fathom.video/embed/T2TBAM4YVnsqf1XDspzi14cyRQRkZ7yU",
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
                So happy to have you here. This kickoff is all about <em>you</em> ~ your business, your goals, and making sure your mindset is ready for what's coming.
              </p>
              <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed max-w-2xl mb-3">
                Over the next 4 weeks you're going to transform how you work. You told us you want to <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">{oneThingGoal}</strong> ~ and that's exactly what we're going to build toward, starting tonight.
              </p>
              <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed max-w-2xl">
                No fluff. No theory for theory's sake. By the end of each session you'll have something real running inside your business. Tonight we get everyone set up, introduced, and aligned ~ so we can hit the ground running on Saturday.
              </p>
            </div>

            {/* Agenda */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
              <h3 className="font-medium text-[var(--charcoal-900)] dark:text-foreground mb-4">
                Tonight's agenda · 2 hours
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
                Questions we'll explore together tonight
              </h3>
              <p className="text-sm text-[var(--taupe-400)] mb-4 font-light">
                These aren't trick questions ~ there's no wrong answer. They're conversation starters. Have a think before we go live.
              </p>
              <ul className="space-y-3">
                {[
                  { q: "What's one task you do every week that eats way more time than it should?", hint: "We're going to assign that to Claude." },
                  { q: "What does &quot;more time&quot; actually mean for you?", hint: "More time with family? More time on creative work? More time to think? Know your why." },
                  { q: "What would you do with an extra 5 hours a week?", hint: "This is your North Star for the bootcamp." },
                  { q: "What's one thing you're skeptical about when it comes to AI?", hint: "Bring your doubts. We'd rather address them on night one than week four." },
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
                When it's your turn on Zoom, share these three things in under 60 seconds:
              </p>
              <ol className="space-y-2">
                {[
                  "Your name and where you're based",
                  "What your business does in one sentence",
                  "One thing you're hoping to walk away with from this bootcamp",
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
                  Think of it as a highly capable collaborator you can talk to in plain language. You don't need to code or use special commands. Just describe what you need.
                </p>
                <p>
                  In this bootcamp we'll use Claude to run real parts of your business ~ from drafting content to building tools ~ starting today.
                </p>
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

            {/* Referral callout */}
            <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-1">Not on Pro yet?</p>
                <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground mb-0.5">
                  Use Abie's referral link to upgrade
                </p>
                <p className="text-xs text-[var(--taupe-400)] font-light">
                  We'll be diving into Claude Code in Week 3 ~ Pro is required. Upgrade before Saturday so you're ready to build.
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
                Based on your onboarding answers, we've crafted a prompt for you to try in Claude right now.
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
                Based on your onboarding answers, here's how each week connects to what you're building.
              </p>
              <div className="space-y-4">
                {[
                  {
                    week: "Week 1 · Knowing Claude",
                    highlight: `You said your first focus is ${focusArea}. This week you'll set up Claude Projects loaded with context about ${businessContext} so Claude can work the way you do.`,
                  },
                  {
                    week: "Week 2 · Delegating to Claude",
                    highlight: `You want a ${aiEmployeeRole} on your team. This week you'll build and brief your first AI employee inside Cowork and test it against real tasks from your business.`,
                  },
                  {
                    week: "Week 3 · Building with Claude",
                    highlight: `You want to track ${dashboardMetrics}. This week you'll use Claude Code to build a custom dashboard ~ no coding experience needed.`,
                  },
                  {
                    week: "Week 4 · Living with Claude",
                    highlight: `You said you want to ${oneThingGoal}. This week you'll put your full Claude stack together and define the daily moments where AI runs alongside your business.`,
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
                  "A doc or note with 3–5 sentences describing your business ~ you'll paste this into your Claude Project",
                  "One real task you've been putting off ~ we'll use Claude to knock it out live",
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

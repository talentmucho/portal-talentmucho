import Link from "next/link";
import { ArrowLeft, ArrowRight, MessagesSquare, Bot, Plug, ShieldAlert, Library, ExternalLink } from "lucide-react";
import { CodeTabs } from "@/components/animate-ui/components/animate/code-tabs";
import { AiEmployeeVsSkill } from "@/components/cohort1/AiEmployeeVsSkill";
import { Reveal } from "@/components/cohort1/Reveal";
import { BuildStepper } from "@/components/cohort1/BuildStepper";
import { ScenarioTabs } from "@/components/cohort1/ScenarioTabs";
import { getIntakeData } from "@/utils/intake-helper";
import { getSessionOverrides, getIsAdmin, applyOverrides } from "@/utils/session-content";
import { SessionEditPanel } from "@/components/session-edit-panel";

const SESSION = {
  tag: "W2 · S4",
  color: "#7D6B5A",
  weekLabel: "Week 2 · Delegating to Claude",
  title: "Build and test your first AI employee live",
  date: "Sun, Jun 14",
  time: "10 AM–1 PM EST",
  videoUrl: null as string | null,
  description:
    "You'll build your first named AI employee in Cowork from scratch: write the briefing, configure the role, and run it against real scenarios from your own business. By the end, your AI employee is live and tested.",
  resources: [
    { label: "AI employee briefing template", href: "#" },
    { label: "Testing scenarios worksheet", href: "#" },
    { label: "Week 2 deliverable checklist", href: "#" },
  ],
};

const OVERVIEW = "/participant/courses/cohort-1";
const PREV     = "/participant/courses/cohort-1/session-4";
const NEXT     = "/participant/courses/cohort-1/session-6";

const bringList = [
  "The role you defined last session (name, title, responsibilities)",
  "Your draft system prompt from last session's exercise",
  "3 real client requests (actual emails or messages you've received)",
];

const objectives = [
  "Create a named AI employee in Cowork",
  "Brief them with a tested system prompt",
  "Run 3 real test scenarios and know what good looks like",
  "Iterate and improve based on what breaks",
];

const buildSteps = [
  "Open Cowork and click \"New Employee\"",
  "Give them a name (first name only ,  e.g. \"Alex\") and a job title",
  "Paste your system prompt into the briefing field",
  "Add reference files (the same documents you set up in Week 1 are a good start)",
  "Set your escalation rules ,  what should automatically come to you",
  "Save and open a test conversation",
];

export default async function Session6Page() {
  const [intake, overrides, isAdmin] = await Promise.all([
    getIntakeData(),
    getSessionOverrides("cohort-1", 5),
    getIsAdmin(),
  ]);
  const session = applyOverrides({ ...SESSION, zoomUrl: "https://us06web.zoom.us/j/88295797091?pwd=MejE1DJBXzA8veH0KDbPY0B8sPb29k.1" }, overrides);

  const PROMPTS: Record<string, string> = {
    "System prompt template": `You are [Employee Name], **${intake?.ai_employee_role || "[Job Title]"}** for [Business Name].

ABOUT THE BUSINESS:
**${intake?.business_oneliner || "[Business Name] is a [type of business]. We serve [describe your clients]"}**. We serve [describe your clients ,  who they are, what they're trying to achieve, what they care about].

YOUR ROLE:
Your job is to [primary responsibility in one sentence]. You are the first point of contact for [type of interactions this employee handles].

YOUR RESPONSIBILITIES:
You handle the following autonomously:
- [Task 1: be specific ,  e.g. "Respond to new client inquiries within 24 hours with a warm, professional greeting and 3 qualifying questions"]
- [Task 2]
- [Task 3]

You escalate to [Owner/Manager Name] when:
- [Escalation trigger 1 ,  e.g. "A client expresses frustration or dissatisfaction"]
- [Escalation trigger 2]
- [Escalation trigger 3 ,  e.g. "A request falls outside the services we offer"]

TONE AND COMMUNICATION STYLE:
- Voice: [warm and professional / direct and efficient / friendly and approachable]
- Always write in full sentences. No bullet points in client-facing messages.
- Sign off with: [how you want messages to close]
- Never use: [words or phrases you want to avoid ,  e.g. "synergy", "circle back", "as per my last email"]

WHEN IN DOUBT:
If you're unsure how to handle something, say: "That's a great question ,  let me check with [Owner Name] and get back to you shortly." Do not guess. Do not make commitments you can't keep.`,

    "Test scenario pack": `Generate 3 test scenarios for my AI employee based on the system prompt I just gave you.

The scenarios should be:

SCENARIO 1 ,  EASY CASE:
A typical, straightforward interaction this employee handles all the time. They should be able to respond confidently and correctly.

SCENARIO 2 ,  EDGE CASE:
An unusual or ambiguous situation where the right answer isn't obvious. The employee should ask one clarifying question rather than guessing.

SCENARIO 3 ,  OUT OF SCOPE:
A request that is clearly outside this employee's role. The employee should acknowledge this gracefully and redirect the person without leaving them stuck.

For each scenario:
- Write the incoming message (as if from a real client)
- Write what an ideal response looks like
- Note what a bad response would look like (so I know what to watch for)`,

    "Debrief and iterate": `I just tested my AI employee against 3 scenarios. Here's what happened:

SCENARIO 1 result: [paste what your employee actually said]
What worked: [what was good]
What was off: [what missed the mark ,  tone, accuracy, format?]

SCENARIO 2 result: [paste what your employee actually said]
What worked: [what was good]
What was off: [what missed the mark]

SCENARIO 3 result: [paste what your employee actually said]
What worked: [what was good]
What was off: [what missed the mark]

Based on this, rewrite my system prompt to fix the problems I found. Show me the specific sections you changed and explain why each change helps.`,
  };

  const businessLine = intake?.business_oneliner || "[Business Name] is a [type of business]. We serve [describe your clients]";

  const CONTENT_PROMPTS: Record<string, string> = {
    "Social Media Manager": `You are [Employee Name], the Social Media Manager for [Business Name].

ABOUT THE BUSINESS:
**${businessLine}**. Our audience is [who follows us and why ~ what they want from our content].

YOUR ROLE:
You turn ideas, notes, and long-form content into ready-to-post social content that sounds exactly like us. You draft ~ the owner approves before anything publishes.

PLATFORMS & FORMAT RULES:
- Instagram: hook in the first line, 3–5 short paragraphs, 1 clear CTA, 5–8 relevant hashtags
- LinkedIn: human and useful, one takeaway per post, no hashtag stuffing
- X/Twitter: under 280 characters, punchy; turn longer ideas into a thread
- TikTok / Reels caption: 1-line hook + 1-line CTA

YOU HANDLE AUTONOMOUSLY:
- Draft captions and post copy from a topic, link, or voice note
- Repurpose one piece of content into 3+ platform-specific posts
- Offer 3 hook/caption variations so I can pick
- Keep a consistent posting voice across platforms

YOU ESCALATE TO [Owner] WHEN:
- A topic is sensitive, political, or could affect brand reputation
- A post makes a claim, promise, or offer (pricing, guarantees, results)
- A client, sponsor, or collaborator is tagged or mentioned

TONE & VOICE:
- Voice: [warm, direct, casual-professional ~ describe yours]
- Write the way I actually talk. Short sentences. No corporate filler.
- Never use: [clichés like "game-changer", hashtag stuffing, emojis unless asked]

WHEN IN DOUBT:
Draft 2–3 options and flag the decision for me instead of guessing. You draft ~ you never publish.`,

    "Content Writer": `You are [Employee Name], the Content Writer for [Business Name].

ABOUT THE BUSINESS:
**${businessLine}**. Our readers are [who they are, what they're trying to learn or solve].

YOUR ROLE:
You write long-form content ~ blog posts, newsletters, and guides ~ in our voice, from a brief or a rough outline. You produce a complete, structured first draft I can refine.

HOW YOU WRITE:
- Open with a hook that names the reader's problem in their words
- One idea per section, with a clear subhead
- Concrete examples over abstract claims
- End with a single, specific call to action

YOU HANDLE AUTONOMOUSLY:
- Draft posts and newsletters from a title, brief, or bullet outline
- Suggest 5 headline options and 3 subject lines for any piece
- Tighten and restructure my rough drafts without changing meaning
- Keep a running, consistent voice across everything

YOU ESCALATE TO [Owner] WHEN:
- The piece makes a factual, legal, medical, or financial claim I should verify
- It announces a launch, price, or partnership
- The angle is a strategy call, not just execution

TONE & VOICE:
- Voice: [describe ~ e.g. friendly expert, no jargon]
- Write in full sentences and short paragraphs. Use ~ instead of em dashes.
- Never use: [filler phrases, "in today's fast-paced world", buzzwords]

WHEN IN DOUBT:
Ask me one clarifying question before writing a full draft. Never invent stats, quotes, or sources.`,

    "Short-form Video Scripter": `You are [Employee Name], the Short-form Video Scripter for [Business Name].

ABOUT THE BUSINESS:
**${businessLine}**. We post short videos for [platform ~ Reels / TikTok / Shorts] aimed at [who, and what they want].

YOUR ROLE:
You turn a topic or insight into a tight 20–45 second script built to stop the scroll and drive one action.

SCRIPT STRUCTURE (always):
1. HOOK (first 3 seconds) ~ a bold line, question, or pattern-break
2. VALUE ~ 1 idea, broken into 2–4 spoken beats, plain language
3. PAYOFF / CTA ~ the takeaway + one specific next step
Also give: an on-screen text overlay per beat, and 3 alternate hooks.

YOU HANDLE AUTONOMOUSLY:
- Write scripts from a topic, a saved post, or a voice note
- Repurpose one long video into 3 short scripts
- Offer 3 hook variations and a suggested caption + hashtags

YOU ESCALATE TO [Owner] WHEN:
- The hook overpromises or could mislead
- The video makes a claim, offer, or comparison to a competitor
- The topic is sensitive or off-brand

TONE & VOICE:
- Spoken, not written ~ how a real person talks to camera. No lists read aloud.
- Voice: [energetic, calm-expert, funny ~ describe yours]
- Never use: [stiff phrasing, "in this video I'm going to", clickbait we can't back up]

WHEN IN DOUBT:
Give me 2 versions ~ one safe, one bolder ~ and let me choose. Never publish.`,

    "Research Analyst": `You are [Employee Name], the Research Analyst for [Business Name].

WHAT YOU DO:
You track what's trending about [TOPIC ~ e.g. "AI for creators and small business"] across Reddit, Threads, and Instagram, and turn it into a clear weekly brief I can act on ~ content ideas, audience questions, and emerging angles.

WHERE YOU LOOK (via Apify connectors):
- Reddit ~ use the Reddit scraper actor on [subreddits/keywords ~ e.g. r/artificial, r/ChatGPT, "AI tools"], top + rising posts from the last [7] days
- Threads ~ use the Threads scraper actor on [hashtags/keywords ~ e.g. #AI, "AI automation"]
- Instagram ~ use the Instagram hashtag scraper on [hashtags ~ e.g. #aitools, #aiforbusiness]
Focus on posts with real engagement. Add Claude's web search only for context (news, launches).

WHAT YOU DELIVER (weekly trend brief):
1. Top 5 trending themes ~ name each, one line on why it's hot, and momentum (rising / steady / fading)
2. Top audience questions ~ what people keep asking about [TOPIC]
3. Pain points & objections ~ what frustrates them
4. 5 content ideas for us ~ each tied to a theme, with a suggested hook and format
5. Sources ~ 2–3 real example posts per theme, each with date and platform

HOW YOU RANK:
Score each theme by momentum (how fast it's growing) x relevance (to our audience). Lead with high-momentum, high-relevance.

RULES:
- Use only real posts you actually pulled ~ never invent topics, quotes, numbers, or links.
- Always include the date and platform for each source.
- Flag when a "trend" is just one viral post vs. a broad pattern.
- Note the language (EN / ES) where it matters.

WHEN IN DOUBT:
If the data is thin or mixed, show me what you found instead of forcing 5 themes ~ and suggest wider keywords or subreddits.

OUTPUT:
A short, skimmable brief with the 5 sections above. Bullets, not essays.`,

    "Lead Generation Specialist": `You are [Employee Name], the Lead Generation Specialist for [Business Name].

ABOUT THE BUSINESS:
**${businessLine}**. Our ideal client is [describe ~ industry, size, role, and the problem we solve for them].

YOUR ROLE:
You find, qualify, and warm up potential clients ~ and draft the first-touch outreach ~ so I only spend time on real conversations. You prepare; I send.

WHAT A GOOD LEAD LOOKS LIKE:
- Fits our ideal client profile above
- Has a visible trigger or need we can speak to
- Reachable through [channel ~ email, DM, LinkedIn]
Score each lead High / Medium / Low and say why in one line.

YOU HANDLE AUTONOMOUSLY:
- Draft personalized first-touch messages (no copy-paste spam ~ reference something specific)
- Write 2-step follow-ups for people who don't reply
- Qualify inbound inquiries with 3 questions before they reach me
- Keep a simple list: name, fit, trigger, status, next step

YOU ESCALATE TO [Owner] WHEN:
- A lead is ready to talk pricing, scope, or a call
- Someone replies with a question only I can answer
- A message would commit us to a deliverable, date, or discount

TONE & VOICE:
- Warm, specific, and human ~ like a real person who did their homework. Never salesy or pushy.
- Voice: [describe yours]
- Never use: [fake urgency, "just following up", generic compliments, mass-blast phrasing]

WHEN IN DOUBT:
Draft the message and flag it for my review rather than sending. Never make promises about price, timeline, or results.`,
  };

  const ABIE_LEADGEN_INSTRUCTIONS = `You are Maya, the Lead Generation Specialist for Abie Maxey (abiemaxey.com).

WHAT WE DO:
We run a free AI community and paid AI bootcamps that teach creators, solopreneurs, and small business owners how to actually use AI to run their business. Your job is to find the right people on Threads and Instagram, warm them up, and invite them into the free community ~ the bootcamp comes later, only once they're active.

IDEAL PERSON (ICP):
- Creators, solopreneurs, coaches, freelancers, and small business owners
- Posting in English or Spanish
- Showing one of these signals:
  - Curious or overwhelmed about AI ("how do I use AI for...", "drowning in admin")
  - Building or creating something on their own (building in public, side projects)
  - Engaging with AI / automation / creator-economy accounts
- NOT: big agencies, crypto/dropship hustlers, or people just venting with no business

WHAT A GOOD LEAD LOOKS LIKE:
Score each person Warm / Maybe / Skip with a one-line reason.
- Warm: fits the ICP AND shows a clear AI-curiosity or overwhelm signal
- Maybe: fits the ICP but the signal is weak
- Skip: off-profile ~ don't reach out
Only Warm and Maybe come to me.

TOOLS (added via Claude.ai Connectors):
- Apify ~ use the [Threads / Instagram] scraper actor to pull people matching the ICP from the hashtags, keywords, or accounts I name (e.g. #buildinpublic, "AI for solopreneurs", followers of [account]).
- Google Sheets ~ after I approve, append each lead: handle, platform, fit, signal, the post that flagged them, status.

HOW YOU WARM THEM UP (2 steps, never salesy):
1. First touch: a genuine, specific reply or DM that reacts to THEIR post ~ no pitch. Add value or a relatable line. Mention the free community only if it fits naturally.
2. Follow-up (only if they engage): invite them to the free AI community with one sentence on what they'll get. The bootcamp is mentioned only once they're active in the community.

YOU HANDLE AUTONOMOUSLY:
- Find and qualify people against the ICP
- Draft the first-touch and the follow-up, personalized to each person
- Keep a running list of who's been contacted and where they are in the warm-up

YOU ESCALATE TO ME WHEN:
- Someone asks about bootcamp pricing, dates, or wants a call
- A reply needs a real conversation or a judgment call
- Someone is upset, or a message could affect my reputation

VOICE:
- Warm, peer-to-peer, a little playful ~ a creator talking to another creator. Use ~ instead of dashes. Keep it short. No emojis unless I ask.
- Never salesy, never copy-paste. Reference something specific every time.
- Never use: "Hope this finds you well", fake urgency, "as a fellow entrepreneur".

GUARDRAILS:
- You prepare; I send. Never DM, reply, or post anything yourself.
- Only use public, lawful data (GDPR). No private personal data. Always make opt-out easy.
- Never invent handles, posts, or numbers. If you're unsure, mark it and ask me.

OUTPUT:
Give me a table: Handle | Platform | Fit | Signal | First-touch draft | Follow-up draft.`;

  return (
    <div className="flex-1 bg-[var(--beige-50)] dark:bg-background flex flex-col overflow-hidden min-h-0">

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
        <Link
          href={PREV}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          W2 · S3
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
          W3 · S5
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
                Today's agenda · 3 hours
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)] shrink-0">4–7 PM CET · 14:00–17:00 UTC</span>
            </div>
            <ol className="space-y-0">
              {[
                { cet: "4:00 – 4:15", utc: "14:00", label: "Check-in ~ each person shares the role they drafted last session and the one task it'll own", type: "share" },
                { cet: "4:15 – 4:35", utc: "14:15", label: "Recap ~ AI employee vs. skill, and the three-part brief: identity, context, rules", type: "teach" },
                { cet: "4:35 – 4:50", utc: "14:35", label: "Walkthrough ~ building one employee in Cowork, live", type: "demo" },
                { cet: "4:50 – 5:00", utc: "14:50", label: "Build brief ~ pick ONE employee, open Cowork, paste your system prompt", type: "plenary" },
                { cet: "5:00 – 5:45", utc: "15:00", label: "Live build ~ brief your employee and add your files while we circulate", type: "work" },
                { cet: "5:45 – 5:55", utc: "15:45", label: "Break", type: "break" },
                { cet: "5:55 – 6:25", utc: "15:55", label: "Test &amp; fix ~ run the 3 scenarios and debug with “When it's not working”", type: "work" },
                { cet: "6:25 – 6:40", utc: "16:25", label: "Share-out ~ each person demos their employee and the task it now owns", type: "share" },
                { cet: "6:40 – 7:00", utc: "16:40", label: "Wrap-up ~ definition of done, this week's iterate-homework, and a preview of Week 3", type: "plenary" },
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

          {/* AI employee vs Skill */}
          <Reveal className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">AI employee vs. skill ~ know which one you're building</p>
            <AiEmployeeVsSkill />
          </Reveal>

          {/* Three-part brief */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">The three-part employee brief</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Every AI employee that works well has three things fully defined before they go live. If any of these is vague, the employee will produce vague, inconsistent output.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "1. Identity", desc: "Who they are, what their job title is, and how they sound. A name makes them real ,  it's easier to refine \"Alex\" than \"my AI assistant.\"" },
                  { label: "2. Context", desc: "Your business, your clients, your standards, and your voice. This is where you upload your files and write your business description. The more specific, the better." },
                  { label: "3. Rules", desc: "What they handle autonomously vs. what they escalate. Without clear rules, your employee will either over-reach (making decisions they shouldn't) or under-reach (asking you about everything)." },
                ].map((part) => (
                  <div key={part.label} className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4">
                    <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground mb-1">{part.label}</p>
                    <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed">{part.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Cowork */}
          <Reveal className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Why build this in Cowork (not just a chat window)</p>
            <div className="rounded-2xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-5 flex flex-col gap-2">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                You could paste a prompt into a normal Claude chat ~ but it forgets you the moment you close it. A Cowork Project is what turns a prompt into an <strong className="font-semibold">employee</strong>:
              </p>
              {[
                "Persistent Instructions + Files + Memory ~ it keeps knowing your business, no re-briefing every time",
                "It has a name and a role, not a blank chat ~ you delegate to it, you don't re-explain to it",
                "Add tools without code ~ Customize → search a connector (Apify, Sheets, Gmail) and it can act, not just talk",
                "It runs across separate chats and campaigns ~ one Project, many jobs, shared memory",
                "Escalation rules live in the brief ~ it knows when to act and when to flag you",
              ].map((b, i) => (
                <p key={i} className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed flex items-start gap-2">
                  <span className="text-[var(--clay-500)] shrink-0 mt-0.5">+</span>
                  {b}
                </p>
              ))}
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground leading-relaxed border-t border-[var(--clay-500)]/20 pt-3 mt-1">
                A chat helps you once. A Cowork employee shows up every day.
              </p>
            </div>
          </Reveal>

          {/* Build steps */}
          <Reveal className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Building in Cowork ,  step by step</p>
            <BuildStepper steps={buildSteps} />
          </Reveal>

          {/* Testing */}
          <Reveal className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">What good looks like ,  testing all 3 scenarios</p>
            <ScenarioTabs />
          </Reveal>

          {/* When it's not working */}
          <Reveal className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">When it's not working ~ the 3 failures and their fixes</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Almost every employee that misbehaves is failing in one of these ways. Find the symptom, apply the fix, re-test.
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  problem: "Output is generic ~ it could be any business",
                  why: "The context is too thin, so it falls back on generic patterns.",
                  fix: "Add real specifics: your actual services, real client examples, and a writing sample. Your employee can only be as specific as its brief.",
                },
                {
                  problem: "It asks you about everything",
                  why: "The rules are vague, so it escalates by default instead of acting.",
                  fix: "Write an explicit 'handle autonomously' list and reserve escalation for the 3 named triggers only. Routine decisions belong to the employee.",
                },
                {
                  problem: "It sounds robotic ~ not like you",
                  why: "Tone is described in the abstract, with no example to copy.",
                  fix: "Upload a real writing sample and give concrete rules: 'say this, never say that.' Show your voice, don't just describe it.",
                },
                {
                  problem: "It makes things up",
                  why: "There's no guardrail for what to do when it doesn't know.",
                  fix: "Add a rule: 'When unsure, don't guess ~ flag it for me.' Never invent stats, policies, prices, or commitments.",
                },
              ].map((item) => (
                <div key={item.problem} className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-4 flex flex-col gap-2">
                  <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground flex items-start gap-2">
                    <span className="text-[var(--taupe-400)] shrink-0">×</span>
                    {item.problem}
                  </p>
                  <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed pl-5">{item.why}</p>
                  <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed pl-5 border-l-2 border-[var(--clay-500)]/40 ml-[5px]">
                    <span className="font-semibold text-[var(--clay-500)]">Fix ~ </span>{item.fix}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Prompts */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Prompts ,  copy and use these</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Start with the <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">System prompt template</strong> ,  paste it into Cowork as your employee's brief. Use <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Test scenario pack</strong> in Claude.ai to generate realistic test cases. After testing, use <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Debrief and iterate</strong> to improve.
            </p>
            <CodeTabs codes={PROMPTS} lang="markdown" />
          </section>

          {/* Content & lead-gen templates */}
          <Reveal className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Sample system prompts ,  content &amp; lead-gen employees</p>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Ready-to-use briefs for the most common content roles. Pick the one closest to what you need, paste it into Cowork, and fill in the <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">[bracketed]</strong> parts with your specifics.
            </p>
            <CodeTabs codes={CONTENT_PROMPTS} lang="markdown" />
          </Reveal>

          {/* Power-up: lead-gen with threads, Apify, APIs */}
          <Reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Power-up ~ a Lead Generation Specialist that finds people on Threads</p>
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400">Advanced</span>
            </div>
            <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-3 -mt-1">
              <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed">
                <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">New to this? Skip it for now.</strong> Build one simple employee you just chat with first (your homework below). Come back to add tools once that one works ~ this is power-user territory, not a first-build requirement.
              </p>
            </div>
            <p className="text-sm text-[var(--taupe-400)]">
              You build this as a <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Project in Cowork</strong>. Worked example below: Abie&apos;s specialist finds creators on Threads &amp; Instagram, warms them up, and invites them into the free AI community ~ the bootcamp comes later.
            </p>

            {/* Where things go in a Cowork Project */}
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">Where everything goes in your Cowork Project</p>
              {[
                { k: "Instructions", v: "The brief ~ paste the full role (identity, ICP, tools, escalation, voice, guardrails). This is the system prompt." },
                { k: "Files", v: "Your context ~ ICP notes, example DMs in your voice, a one-pager on the community and bootcamp." },
                { k: "Memory", v: "Automatic ~ it fills in after a few chats. You don't write this one." },
              ].map((row) => (
                <div key={row.k} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="text-xs font-semibold text-[var(--clay-500)] uppercase tracking-[0.1em] sm:w-24 shrink-0">{row.k}</span>
                  <span className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{row.v}</span>
                </div>
              ))}
            </div>

            {/* Organize */}
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="size-7 rounded-full bg-[var(--clay-500)]/15 flex items-center justify-center shrink-0">
                  <MessagesSquare className="size-3.5 text-[var(--clay-500)]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">1. Organize ~ one chat per campaign</p>
                  <p className="text-[11px] text-[var(--taupe-400)]">Cowork&apos;s Memory carries your voice and feedback across every chat</p>
                </div>
              </div>
              <ol className="flex flex-col gap-2">
                {[
                  "Start a new chat in Cowork for each source ~ e.g. \"Threads ~ #buildinpublic\" or \"IG ~ AI-curious creators\"",
                  "Memory ties the chats together ~ it remembers your ICP, your voice, and the feedback you gave earlier",
                  "Keep separate campaigns in separate chats so leads and notes never get mixed up",
                  "Come back days later and pick up where you left off ~ Cowork remembers",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                    <span className="size-4 shrink-0 rounded-full bg-[var(--beige-100)] dark:bg-white/5 border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[9px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                    <span className="font-light">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Apify */}
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="size-7 rounded-full bg-indigo-500/15 flex items-center justify-center shrink-0">
                  <Bot className="size-3.5 text-indigo-500 dark:text-indigo-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">2. Apify ~ pull real people from Threads &amp; Instagram</p>
                  <p className="text-[11px] text-[var(--taupe-400)]">Apify runs ready-made scrapers (&ldquo;actors&rdquo;) that return structured data</p>
                </div>
              </div>
              <ol className="flex flex-col gap-2">
                {[
                  "In Cowork, open Customize and search \"Apify\" ~ there's a ready-made connector, no manual setup",
                  "Add it and connect your Apify account when prompted (free tier is fine to start)",
                  "Pick an actor for your source ~ e.g. a Threads scraper or an Instagram hashtag / profile scraper",
                  "Tell Maya what to fetch ~ \"pull 40 people posting #buildinpublic who mention AI or being overwhelmed\"",
                  "She runs the actor, gets a structured list back, and scores each person Warm / Maybe / Skip",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                    <span className="size-4 shrink-0 rounded-full bg-[var(--beige-100)] dark:bg-white/5 border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[9px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                    <span className="font-light">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* APIs */}
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="size-7 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <Plug className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">3. Add more tools ~ let it save and enrich leads</p>
                  <p className="text-[11px] text-[var(--taupe-400)]">Same Customize panel ~ connectors make tools available to your employee</p>
                </div>
              </div>
              <ol className="flex flex-col gap-2">
                {[
                  "Open Customize again and search for the tool you need ~ e.g. Google Sheets (save leads) or an email finder",
                  "Add the connector and sign in / authorize when prompted",
                  "It's now usable inside your Cowork Project ~ no per-chat setup needed",
                  "In Instructions, say exactly when to use it ~ \"after I approve, append each lead to my Leads sheet\"",
                  "Test with one lead end-to-end before you run a whole batch",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                    <span className="size-4 shrink-0 rounded-full bg-[var(--beige-100)] dark:bg-white/5 border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[9px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                    <span className="font-light">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Worked example */}
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-[var(--card)] p-5 flex flex-col gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--taupe-400)] mb-1">All together ~ Abie's community-building run</p>
              {[
                "New chat in your Cowork Project: \"Threads ~ AI-curious creators\"",
                "Apify (Threads actor) → 40 people posting about AI overwhelm or building solo",
                "Maya scores each Warm / Maybe / Skip with a one-line reason",
                "She drafts a no-pitch first-touch that reacts to each person's actual post",
                "You approve and send; anyone who engages gets the free-community invite",
                "She logs everyone to your Sheet ~ the bootcamp pitch comes once they're active",
              ].map((line, i) => (
                <p key={i} className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed flex items-start gap-2">
                  <span className="text-[var(--clay-500)] font-semibold tabular-nums shrink-0">{i + 1}.</span>
                  {line}
                </p>
              ))}
            </div>

            {/* Responsible use */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-50 dark:bg-amber-950/20 p-4 flex items-start gap-3">
              <ShieldAlert className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                <strong className="font-semibold">Reach out responsibly.</strong> Respect each platform's terms, and under GDPR (you're in Spain) only use public data and contact people where it's lawful ~ keep it relevant, never spammy, always make opt-out easy, and don't buy or scrape data you can't legally use.
              </p>
            </div>

            {/* Filled example ~ Maya */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-[var(--taupe-400)] font-light">Here&apos;s the full brief for <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Maya</strong> ~ paste it straight into your Cowork Project&apos;s <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">Instructions</strong>, then swap in your own ICP and accounts:</p>
              <CodeTabs codes={{ "Maya ~ Lead Gen Specialist (Instructions)": ABIE_LEADGEN_INSTRUCTIONS }} lang="markdown" />
            </div>
          </Reveal>

          {/* Starter shelf */}
          <Reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Library className="size-3.5 text-[var(--clay-500)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Don&apos;t start from scratch ~ the starter shelf</p>
            </div>
            <p className="text-sm text-[var(--taupe-400)] -mt-1">
              Reach for <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">your own shelf first</strong> (the templates above + your Week 1 prompt library). Go external only when you outgrow it. The rule for everything here: <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">borrow → adapt → make it yours</strong>.
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { name: "Your template shelf", tag: "Start here", tagColor: "#C4A882", href: null, use: "The employee briefs on this page + your Week 1 prompt library ~ already in your voice.", adapt: "Swap in your business, ICP, and accounts." },
                { name: "Connector marketplace", tag: "Week 2", tagColor: "#7D6B5A", href: null, use: "Add tools to an employee with no code ~ Apify, Google Sheets, Gmail, Slack, Notion. Open Customize → search.", adapt: "Add only the connector a real task needs." },
                { name: "Apify Store", tag: "Week 2", tagColor: "#7D6B5A", href: "https://apify.com/store", use: "Thousands of prebuilt scrapers (actors) for lead-gen + research ~ Reddit, Instagram, Threads, Google Maps.", adapt: "Pick an actor, point it at your keywords or accounts." },
                { name: "Anthropic Prompt Library", tag: "Week 1", tagColor: "#C4A882", href: "https://docs.anthropic.com/en/resources/prompt-library/library", use: "Vetted starter prompts for common tasks, straight from Anthropic.", adapt: "Use as a base, then rewrite in your voice." },
                { name: "Abie's Claude Skills Directory", tag: "Week 3", tagColor: "#5A7A6B", href: "https://abiemaxey.com/tools/skills-directory", use: "71 curated Claude Code skills ~ the shortlist from the 1,116 on GitHub. Grab one instead of building from scratch.", adapt: "Copy a skill, then point it at your workflow." },
                { name: "MCP directories", tag: "Week 3+", tagColor: "#5A7A6B", href: "https://smithery.ai", use: "Browse more tools/connectors to plug into Claude (Smithery, mcp.so, PulseMCP).", adapt: "Only add what a real task needs ~ don't collect tools." },
              ].map((r) => {
                const inner = (
                  <>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">{r.name}</span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-full" style={{ background: `${r.tagColor}22`, color: r.tagColor, border: `1px solid ${r.tagColor}44` }}>{r.tag}</span>
                      {r.href && <ExternalLink className="size-3 text-[var(--taupe-400)] opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </div>
                    <p className="text-xs text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed mt-1">{r.use}</p>
                    <p className="text-[11px] text-[var(--taupe-400)] font-light leading-relaxed mt-0.5"><span className="font-semibold">Adapt ~ </span>{r.adapt}</p>
                  </>
                );
                const cls = "group block rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-4 transition-colors";
                return r.href ? (
                  <a key={r.name} href={r.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-[var(--clay-500)]/40`}>{inner}</a>
                ) : (
                  <div key={r.name} className={cls}>{inner}</div>
                );
              })}
            </div>
            <p className="text-[11px] text-[var(--taupe-400)] font-light">
              Tagged by week so you know when to reach for each ~ skills and scrapers come later, not on day one.
            </p>
          </Reveal>

          {/* Definition of done + share-out */}
          <Reveal className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Before you leave today ~ definition of done</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                Your employee is &ldquo;done&rdquo; for today when you can check every box. If one is empty, that's your next 5 minutes.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "It has a name and a one-line role",
                  "Its brief covers all three: identity, context, and rules",
                  "You uploaded at least one real reference file",
                  "It passed the easy case ~ sounds like you",
                  "It handled the edge case ~ asked instead of guessing",
                  "It handled out-of-scope ~ redirected instead of stalling",
                  "You know the ONE task it owns this week",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                    <span className="size-4 shrink-0 rounded-[5px] border border-[var(--beige-300)] dark:border-white/15 mt-0.5" />
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-[var(--clay-500)]/5 border border-[var(--clay-500)]/30 p-4 mt-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--clay-500)] mb-1">Share-out ~ say it out loud</p>
                <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                  &ldquo;Meet <strong className="font-semibold">[name]</strong>, my <strong className="font-semibold">[role]</strong>. This week they take <strong className="font-semibold">[the one task]</strong> off my plate.&rdquo;
                </p>
              </div>
            </div>
          </Reveal>

          {/* Deliverable */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-2">Week 2 Deliverable</p>
            <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
              1 named AI employee in Cowork, briefed with a tested system prompt and confirmed to handle at least 3 real scenarios from your business.
            </p>
          </div>

          {/* Exercise ~ this week */}
          <section className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">This week ~ keep iterating</p>
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-5 flex flex-col gap-3">
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Your homework ~ make the employee earn its keep:</p>
              <ol className="flex flex-col gap-2">
                {[
                  "Run your employee on real work this week ~ actual tasks, not test cases",
                  "When something is off, use the \"Debrief and iterate\" prompt to get a revised brief",
                  "Update your employee's Instructions with the improved version",
                  "Run your 3 scenarios one more time to confirm the issues are fixed",
                  "Notice the ONE moment it saved you time ~ that's your proof for the showcase",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--charcoal-900)] dark:text-foreground">
                    <span className="size-5 shrink-0 rounded-full border border-[var(--beige-200)] dark:border-white/10 flex items-center justify-center text-[10px] font-semibold text-[var(--taupe-400)] mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Wrap-up */}
          <Reveal className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)]">Wrapping up ~ where you started, where you are now</p>
            <div className="rounded-2xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-5 flex flex-col gap-4">
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
                You walked in with a drafted role. You're walking out with a working employee that handles a real task in your business. That's the whole shift this week was built for ~ now go let it work for you (your homework above).
              </p>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--clay-500)] mb-1">Next week ~ Week 3, Building with Claude</p>
                  <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                    You move from delegating to building. With Claude Code you'll build a custom business dashboard ~ no coding experience needed.
                  </p>
                </div>
                <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground leading-relaxed border-t border-[var(--clay-500)]/20 pt-3">
                  You just stopped being the only person in your business who can do this work.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Next session card */}
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Up next: Claude Code ,  your first build</p>
              <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Week 3 ,  Sat, Jun 20</p>
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
                  <span dangerouslySetInnerHTML={{ __html: item }} />
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
        <SessionEditPanel courseSlug="cohort-1" sessionNumber={5} initial={session} />
      )}
    </div>
  );
}

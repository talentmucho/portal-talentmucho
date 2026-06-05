export type Move = { session: string; date: string; label: string; move: string };

export type ParticipantData = {
  name: string;
  photo: string;
  insight: string;
  accentColor: string;
  moves: Move[];
  deliverables: { week: string; color: string; text: string }[];
};

export const PARTICIPANT_ROADMAPS: Record<string, ParticipantData> = {
  norife: {
    name: "Norife",
    photo: "/assets/participants/norife.png",
    insight:
      "Norife already uses AI in client work and has chosen lead generation as her core focus. Her goal isn't to learn the basics — it's to build a repeatable, AI-powered pipeline that consistently brings in new clients for her VA and coaching business. Every session is an opportunity to build a real lead gen asset.",
    accentColor: "#1A6B52",
    moves: [
      { session: "Kickoff", date: "Jun 5", label: "Fri · Orientation", move: "Write down your ideal lead gen target: who they are, where they hang out online, and what problem they need solved. This becomes the brief Claude works from across every session." },
      { session: "S1", date: "Jun 6", label: "Sat · Week 1", move: "Create three Projects: Lead Gen Pipeline, VA Ops, and Business Coaching. The Lead Gen project is your priority — load it with your ideal client profile, your services, and sample outreach messages you've used before." },
      { session: "S2", date: "Jun 7", label: "Sun · Week 1", move: "Upload your VA service guide and a sample outreach email that got a response. Write custom instructions that position you as the lead gen expert. This becomes Claude's reference every time you ask it to help you prospect or pitch." },
      { session: "S3", date: "Jun 13", label: "Sat · Week 2", move: "Design your AI lead gen employee before Sunday. Give it a role — e.g. \"Outreach Specialist\" — and write out the 5 tasks it handles: researching prospects, drafting DMs, writing follow-up emails, summarising lead notes, and preparing pitch responses." },
      { session: "S4", date: "Jun 14", label: "Sun · Week 2", move: "Test your Outreach Specialist against 3 real lead scenarios: a cold LinkedIn DM, a follow-up to someone who went quiet, and a response to an inbound inquiry. If it handles all three in your voice, you've just built a pipeline that never takes a day off." },
      { session: "S5", date: "Jun 20", label: "Sat · Week 3", move: "Decide what your lead gen dashboard needs to track: prospects by stage (contacted / replied / proposal sent / closed), source channel, and conversion rate. Sketch it on paper before the session — think of it as your pipeline at a glance." },
      { session: "S6", date: "Jun 21", label: "Sun · Week 3", move: "Build your lead gen pipeline tracker. Stretch goal: add a revenue-at-stake column that shows the potential value of each open lead — this makes it immediately clear where to focus your outreach energy each week." },
      { session: "S7", date: "Jun 27", label: "Sat · Week 4", move: "Map your daily lead gen routine with Claude open. Morning: review pipeline, identify 3 prospects to contact. Midday: use your AI Outreach Specialist to draft the messages. Evening: log responses in your tracker. Write this as a protocol you could teach other VAs." },
      { session: "S8", date: "Jun 28", label: "Sun · Week 4", move: "Present your full lead gen stack as a unified system: the Projects that know your clients, the AI Outreach Specialist that does the prospecting, and the pipeline tracker that shows your numbers. This is also your pitch for coaching other VAs on AI-powered lead generation." },
    ],
    deliverables: [
      { week: "Week 1", color: "#1A6045", text: "3 Claude Projects live — Lead Gen Pipeline (priority), VA Ops, and Business Coaching — each loaded with your client profile, voice, and outreach context." },
      { week: "Week 2", color: "#1A4070", text: "1 AI Outreach Specialist in Cowork — briefed to research leads, draft cold messages, and write follow-ups in your voice." },
      { week: "Week 3", color: "#2E2868", text: "A lead gen pipeline tracker built with Claude Code — prospect stages, source channels, and revenue-at-stake. Your business development hub." },
      { week: "Week 4", color: "#6B3A10", text: "A daily Claude routine documented as a repeatable protocol. The confidence and the process — exactly what you came here for." },
    ],
  },
  celeste: {
    name: "Celeste",
    photo: "/assets/participants/celeste.png",
    insight:
      "Celeste is building The Life CEO into a scalable AI-powered coaching brand. She wants Claude to sound like her, attract buyers, and run the operational side so she can focus on her clients. Every session should produce something she can put in front of her audience.",
    accentColor: "#3D3489",
    moves: [
      { session: "Kickoff", date: "Jun 5", label: "Fri · Orientation", move: "Come with one sentence that describes what The Life CEO does and who it helps. You'll use this as your very first prompt. Your first output: a Claude-written bio for your website." },
      { session: "S1", date: "Jun 6", label: "Sat · Week 1", move: "Create three Projects: Content & Social, Coaching Programs, and Client Operations. This maps directly to your business — every future session feeds one of these three." },
      { session: "S2", date: "Jun 7", label: "Sun · Week 1", move: "Upload your website copy, a past coaching email, your Instagram bio, and any framework you use with clients. Write custom instructions in first person as The Life CEO. Test: ask Claude to write a caption. Does it sound like you?" },
      { session: "S3", date: "Jun 13", label: "Sat · Week 2", move: "Your AI employee should be your Client Experience Manager — handling onboarding emails, session reminders, and follow-up messages. Draft its role brief tonight. What does it need to know about your clients and your program?" },
      { session: "S4", date: "Jun 14", label: "Sun · Week 2", move: "Run it through 3 real scenarios: a new client inquiry, a mid-program check-in, and a session recap email. Does it sound like you? Refine the brief until it does. This is your time back — every week, permanently." },
      { session: "S5", date: "Jun 20", label: "Sat · Week 3", move: "Your dashboard should be a coaching business command centre: active clients, program stages, content pipeline, and monthly revenue. Write out what you want to see on it before the session — in plain English." },
      { session: "S6", date: "Jun 21", label: "Sun · Week 3", move: "Build it, then screenshot the finished version. This becomes a visual in your marketing — \"here's how I run The Life CEO with AI.\" Powerful proof point for attracting coaching clients who want the same." },
      { session: "S7", date: "Jun 27", label: "Sat · Week 4", move: "Write your daily Claude routine around your coaching schedule: morning content batch (15 min), client prep before sessions (10 min), and follow-up emails after sessions (5 min). That's your 30-min daily habit that gets 3+ hours back." },
      { session: "S8", date: "Jun 28", label: "Sun · Week 4", move: "Present The Life CEO's AI stack as your graduation showcase. Frame it as \"how I took on 2x more clients without working 2x more hours\" — this is your next speaking topic and a lead magnet for your audience." },
    ],
    deliverables: [
      { week: "Week 1", color: "#1A6045", text: "3 Claude Projects live — Content & Social, Coaching Programs, Client Operations — each loaded with your voice, frameworks, and client language." },
      { week: "Week 2", color: "#1A4070", text: "1 AI Client Experience Manager in Cowork — handles onboarding, session reminders, and follow-ups in your voice, for your coaching programs." },
      { week: "Week 3", color: "#2E2868", text: "The Life CEO command centre — active clients, program stages, content pipeline, and revenue visibility, built with Claude Code." },
      { week: "Week 4", color: "#6B3A10", text: "A daily 30-minute Claude habit that gives you 3+ hours back — and a graduation showcase that becomes your next marketing asset." },
    ],
  },
  daniel: {
    name: "Daniel",
    photo: "/assets/participants/daniel.png",
    insight:
      "Daniel is building something new — a voice and content brand from the ground up. He's starting from scratch, and the bootcamp is his first structured step. Every session should produce something tangible: a piece of content, a drafted service, a built tool. By the end he should have evidence of what he's capable of.",
    accentColor: "#6B4A1A",
    moves: [
      { session: "Kickoff", date: "Jun 5", label: "Fri · Orientation", move: "Have your very first conversation with Claude about your career change. Tell it who you are, what you do now, and what you want to do instead. See what it says. This is your starting point." },
      { session: "S1", date: "Jun 6", label: "Sat · Week 1", move: "Create three Projects around your exploration: one for career research, one for learning AI skills, one for side income ideas. Even without a business yet, these become your thinking space. Bring a list of 5 job types you're curious about." },
      { session: "S2", date: "Jun 7", label: "Sun · Week 1", move: "Upload your CV (or write one with Claude's help), and write custom instructions that say who you are, what you're trying to do, and what kind of help you need. From now on, Claude knows your context every session." },
      { session: "S3", date: "Jun 13", label: "Sat · Week 2", move: "Think about what kind of service you could offer others using an AI employee. Could you offer content writing, email drafting, research summaries? Before Sunday, write a short description of one service you could offer — even a rough idea is fine." },
      { session: "S4", date: "Jun 14", label: "Sun · Week 2", move: "Build an AI employee that can write social media captions or short blog posts for small businesses. Test it on a real example. This is a service you could list on Fiverr this week for 15-30 per task." },
      { session: "S5", date: "Jun 20", label: "Sat · Week 3", move: "This is the session that can shift your self-image. If you build something in a terminal with zero coding experience, you'll know AI is real for you. Come ready to try — not to understand everything, just to do it." },
      { session: "S6", date: "Jun 21", label: "Sun · Week 3", move: "Build a simple freelance income tracker: services offered, tasks completed, money earned, and a notes column. It's small, it's real, and it's yours. Screenshot it — it's evidence of what you can now do." },
      { session: "S7", date: "Jun 27", label: "Sat · Week 4", move: "Write out your daily 20-minute Claude routine as a person building a new career. Morning: check in with Claude, review tasks. Evening: use Claude to draft one piece of content or pitch. Write it like a life habit." },
      { session: "S8", date: "Jun 28", label: "Sun · Week 4", move: "Show your AI employee and your dashboard. You came in wanting to build something new. You leave with 3 configured AI tools, a built dashboard, and a real service you can offer. That's the story to tell." },
    ],
    deliverables: [
      { week: "Week 1", color: "#1A6045", text: "3 Claude Projects — career research, AI skills, and side income ideas — loaded with your CV, goals, and context. Claude now knows you." },
      { week: "Week 2", color: "#1A4070", text: "1 AI content employee briefed to write captions and blog posts for small businesses — a service you can offer on Fiverr or to local businesses." },
      { week: "Week 3", color: "#2E2868", text: "A freelance income tracker built with Claude Code. Your first built thing. Screenshot it — it's proof of a new skill." },
      { week: "Week 4", color: "#6B3A10", text: "A daily 20-minute Claude routine and a graduation showcase that tells the story of your transition. You came in as one thing, you leave as another." },
    ],
  },
  lora: {
    name: "Lora",
    photo: "/assets/participants/lora.png",
    insight:
      "Lora is a remote sales specialist closing premium contracts from Manila. She needs Claude to make her faster — faster outreach, faster follow-ups, faster CRM updates — so she can close more without working more. Her bootcamp is about building a remote sales machine that runs on AI.",
    accentColor: "#1A5070",
    moves: [
      { session: "Kickoff", date: "Jun 5", label: "Fri · Orientation", move: "Map your current sales workflow in one page — from lead source to closed contract. Mark the 2 steps where things slow down or fall through. These become your bootcamp targets." },
      { session: "S1", date: "Jun 6", label: "Sat · Week 1", move: "Create three Projects: Sales Outreach & Scripts, Meta Ads & Creatives, and CRM & Pipeline. Load each with your real assets — caller scripts, ad copy that worked, lead profiles. Claude needs context to perform at the level you need." },
      { session: "S2", date: "Jun 7", label: "Sun · Week 1", move: "Upload your best-performing caller script, a winning ad, and a sample proposal or quote. Write custom instructions that tell Claude you're selling premium joinery to AU builders remotely. From now on, Claude knows your context without you repeating it." },
      { session: "S3", date: "Jun 13", label: "Sat · Week 2", move: "Design your AI Sales Assistant. Its job: draft follow-up sequences for CRM leads, write cold outreach for new builders, and generate 3 Meta ad hook variations per campaign brief. Write out exactly what it needs to know to do this well." },
      { session: "S4", date: "Jun 14", label: "Sun · Week 2", move: "Test your AI Sales Assistant against 3 real leads from your current CRM. Does the follow-up sound right? Does the ad hook land for your audience? Refine until it does. When it works, you've just scaled your output without hiring." },
      { session: "S5", date: "Jun 20", label: "Sat · Week 3", move: "Sketch your ideal sales command centre: leads by stage (contacted / demo booked / proposal sent / closed), contract value per lead, and a Meta ads tracker with CTR and CPL per campaign. This is your weekly decision-making tool." },
      { session: "S6", date: "Jun 21", label: "Sun · Week 3", move: "Build your pipeline tracker with contract values visible at each stage. Stretch goal: add a 6-figure contract KPI counter showing how close you are to your weekly target. Seeing that number every day changes how you prioritise." },
      { session: "S7", date: "Jun 27", label: "Sat · Week 4", move: "Write your daily sales routine with Claude embedded: morning pipeline review (5 min), AI-assisted outreach batch (20 min), and end-of-day CRM update with Claude's help (10 min). Document it as a team SOP — this is what you bring back to your boss." },
      { session: "S8", date: "Jun 28", label: "Sun · Week 4", move: "Present your full sales stack as the foundation of a fully remote sales system. This is also your internal pitch to your boss: here's how Claude helps the team close faster, without adding headcount." },
    ],
    deliverables: [
      { week: "Week 1", color: "#1A6045", text: "3 Claude Projects — Sales Outreach, Meta Ads, and CRM Pipeline — loaded with your scripts, winning ads, and lead profiles." },
      { week: "Week 2", color: "#1A4070", text: "1 AI Sales Assistant briefed to draft follow-ups, write cold outreach for builders, and generate ad hook variations — in your voice." },
      { week: "Week 3", color: "#2E2868", text: "A pipeline tracker with contract values and a 6-figure KPI counter. Your daily decision-making tool for closing faster." },
      { week: "Week 4", color: "#6B3A10", text: "A documented daily sales routine with Claude embedded — and a team SOP that proves the system works at scale." },
    ],
  },
  marielle: {
    name: "Marielle",
    photo: "/assets/participants/marielle.png",
    insight:
      "Marielle is an Online Business Manager who wants Claude to think like her and do more of the work that moves her business forward. She's detail-oriented, proactive, and manages multiple clients. Her bootcamp is about building a system that lets her take on more clients without taking on more hours.",
    accentColor: "#5A2D82",
    moves: [
      { session: "Kickoff", date: "Jun 5", label: "Fri · Orientation", move: "List the 3 most repetitive tasks you do for clients every week. These are Claude's first assignments. Come to Session 1 ready to turn at least one of them into a Claude Project." },
      { session: "S1", date: "Jun 6", label: "Sat · Week 1", move: "Create three Projects: Client Operations, Team & Project Coordination, and Systems & Processes. Load each with real SOPs, client briefs, or recurring task lists you already have. Claude works best when it knows exactly what you're managing." },
      { session: "S2", date: "Jun 7", label: "Sun · Week 1", move: "Upload a client status update you're proud of, a project plan template, and a team briefing doc. Write custom instructions that describe how you work: thorough, clear, proactive. Ask Claude to draft a client update — if it sounds like you, you're set." },
      { session: "S3", date: "Jun 13", label: "Sat · Week 2", move: "Design your AI Operations Assistant. Its role: draft weekly client status reports, prepare team meeting agendas, summarise project updates, and write internal process documentation. What does it need to know to do this well? Write that brief tonight." },
      { session: "S4", date: "Jun 14", label: "Sun · Week 2", move: "Run your AI Operations Assistant through 3 real scenarios: a client status update, a team meeting agenda, and a process doc for a recurring task. If it produces a usable first draft each time, you've just cut your admin time in half." },
      { session: "S5", date: "Jun 20", label: "Sat · Week 3", move: "Sketch your OBM command centre: active clients with project health status, upcoming deadlines, team member ownership, and a notes column per client. This becomes your single source of truth — the view you open every morning." },
      { session: "S6", date: "Jun 21", label: "Sun · Week 3", move: "Build your client tracker with health indicators (on track / at risk / overdue). Stretch goal: add a capacity column showing your hours committed per client per week — this helps you make the case for scope changes or rate increases with data." },
      { session: "S7", date: "Jun 27", label: "Sat · Week 4", move: "Write your daily Claude routine as an OBM. Morning: open dashboard, identify priorities. Midday: use AI assistant to draft client update or agenda. End of week: use Claude to build the weekly report. This is the system that lets you take on one more client without overwhelm." },
      { session: "S8", date: "Jun 28", label: "Sun · Week 4", move: "Present your AI-powered OBM system — Projects, assistant, and dashboard — as your competitive edge. Frame it as: \"this is how I manage more clients without compromising quality.\" That's your next service upgrade conversation." },
    ],
    deliverables: [
      { week: "Week 1", color: "#1A6045", text: "3 Claude Projects — Client Operations, Team Coordination, Systems & Processes — loaded with your SOPs, briefs, and recurring task context." },
      { week: "Week 2", color: "#1A4070", text: "1 AI Operations Assistant briefed to draft status reports, meeting agendas, and process docs — in your voice, for your clients." },
      { week: "Week 3", color: "#2E2868", text: "An OBM command centre with project health indicators and a capacity tracker. Your single source of truth, built with Claude Code." },
      { week: "Week 4", color: "#6B3A10", text: "A daily Claude routine that scales your capacity — and a graduation showcase that positions your AI system as a premium service differentiator." },
    ],
  },
};

export const WEEK_COLORS = ["#C4A882", "#7D6B5A", "#5A7A6B", "#6B5A7A"];

export function sessionWeek(index: number) {
  if (index === 0) return { label: "Kickoff", color: "#9C8B7A" };
  const w = Math.ceil(index / 2);
  return { label: `Week ${w}`, color: WEEK_COLORS[w - 1] };
}

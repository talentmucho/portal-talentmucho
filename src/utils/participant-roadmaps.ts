export type Move = { session: string; date: string; label: string; move: string; ideal: string };

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
      "Norife already uses AI in client work and has chosen lead generation as her core focus. Her goal isn't to learn the basics ~ it's to build a repeatable, AI-powered pipeline that consistently brings in new clients for her VA and coaching business. Every session is an opportunity to build a real lead gen asset.",
    accentColor: "#1A6B52",
    moves: [
      { session: "Kickoff", date: "Jun 5", label: "Fri · Orientation", move: "Write down your ideal lead gen target: who they are, where they hang out online, and what problem they need solved. This becomes the brief Claude works from across every session.", ideal: `Your lead gen brief is locked: target is overwhelmed online coaches and service founders doing 10K-30K/month who need consistent client flow. Goal stated plainly ~ book 5 qualified discovery calls per week through a repeatable, AI-powered outreach pipeline you run in under an hour daily.` },
      { session: "S1", date: "Jun 6", label: "Sat · Week 1", move: "Create three Projects: Lead Gen Pipeline, VA Ops, and Business Coaching. The Lead Gen project is your priority ~ load it with your ideal client profile, your services, and sample outreach messages you've used before.", ideal: `Three Projects live in your sidebar: Lead Gen Pipeline (priority), VA Ops, and Business Coaching. Lead Gen Pipeline holds your ICP doc, three service tiers with pricing, and 12 past outreach threads ~ four that closed, eight that ghosted ~ so every AI answer is grounded in what actually works for you.` },
      { session: "S2", date: "Jun 7", label: "Sun · Week 1", move: "Upload your VA service guide and a sample outreach email that got a response. Write custom instructions that position you as the lead gen expert. This becomes Claude's reference every time you ask it to help you prospect or pitch.", ideal: `Your VA service guide and a winning outreach email now sit in the Lead Gen Pipeline knowledge base. Custom instructions read: "You're my lead generation strategist. I'm Norife, a VA and coach who books discovery calls for service founders. Match my warm, direct voice and always end with one clear next step."` },
      { session: "S3", date: "Jun 13", label: "Sat · Week 2", move: "Design your AI lead gen employee before Sunday. Give it a role ~ e.g. \"Outreach Specialist\" ~ and write out the 5 tasks it handles: researching prospects, drafting DMs, writing follow-up emails, summarising lead notes, and preparing pitch responses.", ideal: `Your Outreach Specialist employee is built. Its job: research prospects from a LinkedIn URL, draft personalized cold DMs, write three-touch follow-up sequences, summarize messy lead notes into clean profiles, and prep discovery-call talking points ~ all in your voice, all referencing your service tiers and proof.` },
      { session: "S4", date: "Jun 14", label: "Sun · Week 2", move: "Test your Outreach Specialist against 3 real lead scenarios: a cold LinkedIn DM, a follow-up to someone who went quiet, and a response to an inbound inquiry. If it handles all three in your voice, you've just built a pipeline that never takes a day off.", ideal: `Three live tests passed. The cold DM opens: "Saw you just launched your group program ~ congrats. Quick question: who's handling inbound while you're busy delivering?" The quiet-lead follow-up feels human, not pushy, and the inbound reply qualifies budget and books a call in four short lines.` },
      { session: "S5", date: "Jun 20", label: "Sat · Week 3", move: "Decide what your lead gen dashboard needs to track: prospects by stage (contacted / replied / proposal sent / closed), source channel, and conversion rate. Sketch it on paper before the session ~ think of it as your pipeline at a glance.", ideal: `Your dashboard plan is mapped: a Prospects table with stage columns ~ Contacted, Replied, Proposal Sent, Closed ~ plus Source Channel (LinkedIn, referral, newsletter), date of last touch, and a live conversion rate per stage. You can see exactly where leads leak and which channel actually fills calls.` },
      { session: "S6", date: "Jun 21", label: "Sun · Week 3", move: "Build your lead gen pipeline tracker. Stretch goal: add a revenue-at-stake column that shows the potential value of each open lead ~ this makes it immediately clear where to focus your outreach energy each week.", ideal: `Your pipeline tracker is built and populated: 14 active prospects across the four stages, each tagged by source, with a Revenue-at-Stake column summing to 8,400 EUR in open proposals. One glance shows three deals stalled at Proposal Sent ~ that's 3,600 EUR waiting on a single follow-up.` },
      { session: "S7", date: "Jun 27", label: "Sat · Week 4", move: "Map your daily lead gen routine with Claude open. Morning: review pipeline, identify 3 prospects to contact. Midday: use your AI Outreach Specialist to draft the messages. Evening: log responses in your tracker. Write this as a protocol you could teach other VAs.", ideal: `Your daily lead gen protocol is written and teachable. Morning: review pipeline, pick three priority prospects. Midday: Outreach Specialist drafts their DMs or follow-ups, you edit and send in 15 minutes. Evening: log every reply, advance stages, flag anyone gone quiet for tomorrow's follow-up queue.` },
      { session: "S8", date: "Jun 28", label: "Sun · Week 4", move: "Present your full lead gen stack as a unified system: the Projects that know your clients, the AI Outreach Specialist that does the prospecting, and the pipeline tracker that shows your numbers. This is also your pitch for coaching other VAs on AI-powered lead generation.", ideal: `Your full stack presents as one system: three Projects, the Outreach Specialist, the pipeline tracker, and the daily protocol ~ a closed loop from cold prospect to closed client. Your pitch lands: "I'll teach you the exact AI lead gen engine that books me 5 calls a week, in a half-day workshop."` },
    ],
    deliverables: [
      { week: "Week 1", color: "#1A6045", text: "3 Claude Projects live ~ Lead Gen Pipeline (priority), VA Ops, and Business Coaching ~ each loaded with your client profile, voice, and outreach context." },
      { week: "Week 2", color: "#1A4070", text: "1 AI Outreach Specialist in Cowork ~ briefed to research leads, draft cold messages, and write follow-ups in your voice." },
      { week: "Week 3", color: "#2E2868", text: "A lead gen pipeline tracker built with Claude Code ~ prospect stages, source channels, and revenue-at-stake. Your business development hub." },
      { week: "Week 4", color: "#6B3A10", text: "A daily Claude routine documented as a repeatable protocol. The confidence and the process ~ exactly what you came here for." },
    ],
  },
  celeste: {
    name: "Celeste",
    photo: "/assets/participants/celeste.png",
    insight:
      "Celeste is building The Life CEO into a scalable AI-powered coaching brand. She wants Claude to sound like her, attract buyers, and run the operational side so she can focus on her clients. Every session should produce something she can put in front of her audience.",
    accentColor: "#3D3489",
    moves: [
      { session: "Kickoff", date: "Jun 5", label: "Fri · Orientation", move: "Come with one sentence that describes what The Life CEO does and who it helps. You'll use this as your very first prompt. Your first output: a Claude-written bio for your website.", ideal: `Your new website bio reads: "I'm Celeste, founder of The Life CEO ~ where ambitious women stop managing chaos and start running their lives like the boardroom of one. I coach you to lead yourself first, so everything else follows." Warm, sharp, unmistakably yours.` },
      { session: "S1", date: "Jun 6", label: "Sat · Week 1", move: "Create three Projects: Content & Social, Coaching Programs, and Client Operations. This maps directly to your business ~ every future session feeds one of these three.", ideal: `Your workspace now holds three live Projects: Content & Social, Coaching Programs, and Client Operations. Each opens to its own brief ~ Content & Social already lists this week's three reels, Coaching Programs holds your signature framework, Operations tracks every active client. One home, three lanes.` },
      { session: "S2", date: "Jun 7", label: "Sun · Week 1", move: "Upload your website copy, a past coaching email, your Instagram bio, and any framework you use with clients. Write custom instructions in first person as The Life CEO. Test: ask Claude to write a caption. Does it sound like you?", ideal: `Claude now writes as The Life CEO. Fed your site copy, past emails, IG bio, and framework, it returns a test caption: "Burnout isn't a badge ~ it's a budgeting problem. You're spending energy you never allocated. Here's the reallocation." You read it and think: that's exactly how I'd say it.` },
      { session: "S3", date: "Jun 13", label: "Sat · Week 2", move: "Your AI employee should be your Client Experience Manager ~ handling onboarding emails, session reminders, and follow-up messages. Draft its role brief tonight. What does it need to know about your clients and your program?", ideal: `Your AI Client Experience Manager is live. It drafts the welcome sequence, the 24-hour session reminder, and the 48-hour follow-up. The onboarding email opens: "Welcome to The Life CEO, love ~ before we meet, here are the three questions that'll shape everything we build together." Warm, on-brand, automatic.` },
      { session: "S4", date: "Jun 14", label: "Sun · Week 2", move: "Run it through 3 real scenarios: a new client inquiry, a mid-program check-in, and a session recap email. Does it sound like you? Refine the brief until it does. This is your time back ~ every week, permanently.", ideal: `Three scenarios, three on-voice replies. To a new inquiry: "I'd love to hear where you're stuck ~ here's my booking link." Mid-program check-in: "You're two weeks in. What's shifted, what's still heavy?" Session recap: "Today we mapped your energy budget ~ this week, protect the mornings." Each sounds like you.` },
      { session: "S5", date: "Jun 20", label: "Sat · Week 3", move: "Your dashboard should be a coaching business command centre: active clients, program stages, content pipeline, and monthly revenue. Write out what you want to see on it before the session ~ in plain English.", ideal: `Your coaching command centre is planned: a four-column board ~ Active Clients (current 9), Program Stage (Onboarding, Mid, Graduating), Content Pipeline (this week's 3 reels plus newsletter), and Monthly Revenue (tracking toward 7,400 euros). One glance tells you exactly where The Life CEO stands today.` },
      { session: "S6", date: "Jun 21", label: "Sun · Week 3", move: "Build it, then screenshot the finished version. This becomes a visual in your marketing ~ \"here's how I run The Life CEO with AI.\" Powerful proof point for attracting coaching clients who want the same.", ideal: `The dashboard is built and screenshotted. Nine active clients sorted by stage, three reels queued, June at 7,400 euros against a 9,000 goal. Your caption under the screenshot: "This is how I actually run The Life CEO ~ one AI command centre, zero spreadsheets, every client handled." Proof, not promises.` },
      { session: "S7", date: "Jun 27", label: "Sat · Week 4", move: "Write your daily Claude routine around your coaching schedule: morning content batch (15 min), client prep before sessions (10 min), and follow-up emails after sessions (5 min). That's your 30-min daily habit that gets 3+ hours back.", ideal: `Your daily routine runs on rails. Morning content batch: 15 minutes, three captions drafted. Client prep before each session: 10 minutes, brief and notes ready. Follow-ups after: 5 minutes, sent. A 30-minute habit that hands you back 3-plus hours ~ time you spend coaching, not admin.` },
      { session: "S8", date: "Jun 28", label: "Sun · Week 4", move: "Present The Life CEO's AI stack as your graduation showcase. Frame it as \"how I took on 2x more clients without working 2x more hours\" ~ this is your next speaking topic and a lead magnet for your audience.", ideal: `Your graduation showcase is one clean slide: "How I took on 2x more clients without working 2x more hours." Beneath it, your stack ~ The Life CEO voice, the Client Experience Manager, the command centre. From 9 clients to 18, same calendar. The audience leans in, and so do future buyers.` },
    ],
    deliverables: [
      { week: "Week 1", color: "#1A6045", text: "3 Claude Projects live ~ Content & Social, Coaching Programs, Client Operations ~ each loaded with your voice, frameworks, and client language." },
      { week: "Week 2", color: "#1A4070", text: "1 AI Client Experience Manager in Cowork ~ handles onboarding, session reminders, and follow-ups in your voice, for your coaching programs." },
      { week: "Week 3", color: "#2E2868", text: "The Life CEO command centre ~ active clients, program stages, content pipeline, and revenue visibility, built with Claude Code." },
      { week: "Week 4", color: "#6B3A10", text: "A daily 30-minute Claude habit that gives you 3+ hours back ~ and a graduation showcase that becomes your next marketing asset." },
    ],
  },
  daniel: {
    name: "Daniel",
    photo: "/assets/participants/daniel.png",
    insight:
      "Daniel is building something new ~ a voice and content brand from the ground up. He's starting from scratch, and the bootcamp is his first structured step. Every session should produce something tangible: a piece of content, a drafted service, a built tool. By the end he should have evidence of what he's capable of.",
    accentColor: "#6B4A1A",
    moves: [
      { session: "Kickoff", date: "Jun 5", label: "Fri · Orientation", move: "Have your very first conversation with Claude about your career change. Tell it who you are, what you do now, and what you want to do instead. See what it says. This is your starting point.", ideal: `Your first conversation with Claude is saved: a clear-eyed snapshot of why you're leaving your old field, what a voice & content brand could become, and three honest fears named out loud. It reads like a starting line ~ proof you've actually begun, not just thought about it.` },
      { session: "S1", date: "Jun 6", label: "Sat · Week 1", move: "Create three Projects around your exploration: one for career research, one for learning AI skills, one for side income ideas. Even without a business yet, these become your thinking space. Bring a list of 5 job types you're curious about.", ideal: `Three Projects sit in your sidebar: 'Career Research,' 'Learning AI Skills,' and 'Side Income Ideas.' Inside Career Research, five job types you're curious about ~ content strategist, brand voice consultant, AI workflow specialist, ghostwriter, podcast producer ~ each with a two-line why.` },
      { session: "S2", date: "Jun 7", label: "Sun · Week 1", move: "Upload your CV (or write one with Claude's help), and write custom instructions that say who you are, what you're trying to do, and what kind of help you need. From now on, Claude knows your context every session.", ideal: `Your CV lives inside Claude, plus custom instructions that introduce you: 'I'm Daniel, mid-career, building a voice & content brand from scratch. Help me sound confident, not corporate.' Now every chat already knows who you are and what you're reaching for.` },
      { session: "S3", date: "Jun 13", label: "Sat · Week 2", move: "Think about what kind of service you could offer others using an AI employee. Could you offer content writing, email drafting, research summaries? Before Sunday, write a short description of one service you could offer ~ even a rough idea is fine.", ideal: `Your first service is written up plainly: 'Weekly content engine ~ I draft five social captions and one short blog post for small businesses, using an AI employee I configured.' One paragraph, one clear promise, priced and ready to refine into a real offer.` },
      { session: "S4", date: "Jun 14", label: "Sun · Week 2", move: "Build an AI employee that can write social media captions or short blog posts for small businesses. Test it on a real example. This is a service you could list on Fiverr this week for 15-30 per task.", ideal: `Your AI employee runs, and here's its output: 'Monday reset done right. Three tiny wins beat one big maybe ~ what's your first?' Your Fiverr gig is drafted: 'I'll write 5 scroll-stopping social captions for your small business ~ 25 dollars per batch.'` },
      { session: "S5", date: "Jun 20", label: "Sat · Week 3", move: "This is the session that can shift your self-image. If you build something in a terminal with zero coding experience, you'll know AI is real for you. Come ready to try ~ not to understand everything, just to do it.", ideal: `You built something in a terminal with zero coding background: a tiny script that prints 'Daniel's content brand ~ day 1' and lists today's three tasks. It actually ran. The mindset shifted from 'I can't code' to 'I just did.'` },
      { session: "S6", date: "Jun 21", label: "Sun · Week 3", move: "Build a simple freelance income tracker: services offered, tasks completed, money earned, and a notes column. It's small, it's real, and it's yours. Screenshot it ~ it's evidence of what you can now do.", ideal: `Your income tracker shows three rows already: columns for Service, Task, Earned, and Notes. 'Captions, batch of 5, 25, repeat client.' 'Blog post, 300 words, 20, fast turnaround.' 'Email draft, welcome series, 18, upsell next.' Real evidence, not hypotheticals.` },
      { session: "S7", date: "Jun 27", label: "Sat · Week 4", move: "Write out your daily 20-minute Claude routine as a person building a new career. Morning: check in with Claude, review tasks. Evening: use Claude to draft one piece of content or pitch. Write it like a life habit.", ideal: `Your 20-minute routine is locked in: morning, you check in with Claude and review the day's tasks; evening, you draft one caption or pitch. Today's evening output ~ a cold pitch to a local cafe offering your weekly content engine, sitting ready to send.` },
      { session: "S8", date: "Jun 28", label: "Sun · Week 4", move: "Show your AI employee and your dashboard. You came in wanting to build something new. You leave with 3 configured AI tools, a built dashboard, and a real service you can offer. That's the story to tell.", ideal: `Your showcase is undeniable: three configured AI tools, a working income tracker dashboard, and a real service you can sell today. Your transition story closes it ~ 'Four weeks ago I had an idea. Now I have proof I can build, write, and earn.'` },
    ],
    deliverables: [
      { week: "Week 1", color: "#1A6045", text: "3 Claude Projects ~ career research, AI skills, and side income ideas ~ loaded with your CV, goals, and context. Claude now knows you." },
      { week: "Week 2", color: "#1A4070", text: "1 AI content employee briefed to write captions and blog posts for small businesses ~ a service you can offer on Fiverr or to local businesses." },
      { week: "Week 3", color: "#2E2868", text: "A freelance income tracker built with Claude Code. Your first built thing. Screenshot it ~ it's proof of a new skill." },
      { week: "Week 4", color: "#6B3A10", text: "A daily 20-minute Claude routine and a graduation showcase that tells the story of your transition. You came in as one thing, you leave as another." },
    ],
  },
  lora: {
    name: "Lora",
    photo: "/assets/participants/lora.png",
    insight:
      "Lora is a remote sales specialist closing premium contracts from Manila. She needs Claude to make her faster ~ faster outreach, faster follow-ups, faster CRM updates ~ so she can close more without working more. Her bootcamp is about building a remote sales machine that runs on AI.",
    accentColor: "#1A5070",
    moves: [
      { session: "Kickoff", date: "Jun 5", label: "Fri · Orientation", move: "Map your current sales workflow in one page ~ from lead source to closed contract. Mark the 2 steps where things slow down or fall through. These become your bootcamp targets.", ideal: `Your one-page sales map shows the full flow: prospect AU builder ~ cold DM ~ discovery call ~ quote ~ follow-up ~ close. Two bottlenecks circled in red: manual follow-up writing eats 90 minutes daily, and CRM updates slip three days behind. Both flagged for Claude.` },
      { session: "S1", date: "Jun 6", label: "Sat · Week 1", move: "Create three Projects: Sales Outreach & Scripts, Meta Ads & Creatives, and CRM & Pipeline. Load each with your real assets ~ caller scripts, ad copy that worked, lead profiles. Claude needs context to perform at the level you need.", ideal: `Your Claude workspace holds three live Projects: 'Sales Outreach & Scripts,' 'Meta Ads & Creatives,' and 'CRM & Pipeline.' Each loaded with real assets ~ your closing caller script, the AUD 42K kitchen-joinery ad that hit 3.1% CTR, and 40 AU builder lead profiles with company size and project type.` },
      { session: "S2", date: "Jun 7", label: "Sun · Week 1", move: "Upload your best-performing caller script, a winning ad, and a sample proposal or quote. Write custom instructions that tell Claude you're selling premium joinery to AU builders remotely. From now on, Claude knows your context without you repeating it.", ideal: `Your trained Sales Assistant knows your world: best caller script uploaded, the winning 'Built-in joinery, built to spec' ad, and a sample AUD 38,500 fitted-wardrobe proposal. Custom instructions read: 'You sell premium joinery to Australian builders remotely from Manila. Tone: confident, consultative, never pushy.'` },
      { session: "S3", date: "Jun 13", label: "Sat · Week 2", move: "Design your AI Sales Assistant. Its job: draft follow-up sequences for CRM leads, write cold outreach for new builders, and generate 3 Meta ad hook variations per campaign brief. Write out exactly what it needs to know to do this well.", ideal: `Your Sales Assistant's cold opener reads: 'Hi James ~ saw Brightline Builders is taking on the Bondi townhouse fit-outs. We supply premium custom joinery to AU builders on tight timelines.' It also drafts a 4-touch follow-up sequence and three ad hooks per brief.` },
      { session: "S4", date: "Jun 14", label: "Sun · Week 2", move: "Test your AI Sales Assistant against 3 real leads from your current CRM. Does the follow-up sound right? Does the ad hook land for your audience? Refine until it does. When it works, you've just scaled your output without hiring.", ideal: `Your test results are in: against three real leads, the Assistant's follow-up to a stalled Melbourne builder landed a reply in two hours. Tone matched yours ~ warm, specific. The ad hook 'Your clients notice the joinery first' tested as the clearest. One nudged to soften the close.` },
      { session: "S5", date: "Jun 20", label: "Sat · Week 3", move: "Sketch your ideal sales command centre: leads by stage (contacted / demo booked / proposal sent / closed), contract value per lead, and a Meta ads tracker with CTR and CPL per campaign. This is your weekly decision-making tool.", ideal: `Your sales command centre maps every lead by stage: Contacted (14), Demo Booked (6), Proposal Sent (4), Closed (2). Contract value sits beside each ~ AUD 38K, 52K, 67K. The Meta ads tracker reads: Campaign A, 2.8% CTR, AUD 9.40 CPL; Campaign B, 3.4% CTR, AUD 7.10 CPL.` },
      { session: "S6", date: "Jun 21", label: "Sun · Week 3", move: "Build your pipeline tracker with contract values visible at each stage. Stretch goal: add a 6-figure contract KPI counter showing how close you are to your weekly target. Seeing that number every day changes how you prioritise.", ideal: `Your pipeline tracker totals live contract value per stage: Proposal Sent holds AUD 159K, Closed holds AUD 105K this week. The 6-figure KPI counter reads 'AUD 105,000 / 150,000 weekly target' with a progress bar at 70%, updating each time you mark a deal won.` },
      { session: "S7", date: "Jun 27", label: "Sat · Week 4", move: "Write your daily sales routine with Claude embedded: morning pipeline review (5 min), AI-assisted outreach batch (20 min), and end-of-day CRM update with Claude's help (10 min). Document it as a team SOP ~ this is what you bring back to your boss.", ideal: `Your team SOP documents the daily rhythm: 8am pipeline review (5 min) ~ Claude flags three stalled proposals. 9am outreach batch (20 min) ~ 15 personalised AU builder DMs drafted. 5pm CRM update (10 min) ~ you paste call notes, Claude logs stages and next steps. Repeatable by anyone.` },
      { session: "S8", date: "Jun 28", label: "Sun · Week 4", move: "Present your full sales stack as the foundation of a fully remote sales system. This is also your internal pitch to your boss: here's how Claude helps the team close faster, without adding headcount.", ideal: `Your remote sales system presents as one stack: three Claude Projects, a live pipeline holding AUD 264K, and a documented daily SOP. Your internal pitch to your boss reads: 'I close 40% faster on premium joinery deals ~ no new headcount, just AI running my outreach, follow-ups, and CRM.'` },
    ],
    deliverables: [
      { week: "Week 1", color: "#1A6045", text: "3 Claude Projects ~ Sales Outreach, Meta Ads, and CRM Pipeline ~ loaded with your scripts, winning ads, and lead profiles." },
      { week: "Week 2", color: "#1A4070", text: "1 AI Sales Assistant briefed to draft follow-ups, write cold outreach for builders, and generate ad hook variations ~ in your voice." },
      { week: "Week 3", color: "#2E2868", text: "A pipeline tracker with contract values and a 6-figure KPI counter. Your daily decision-making tool for closing faster." },
      { week: "Week 4", color: "#6B3A10", text: "A documented daily sales routine with Claude embedded ~ and a team SOP that proves the system works at scale." },
    ],
  },
  marielle: {
    name: "Marielle",
    photo: "/assets/participants/marielle.png",
    insight:
      "Marielle is an Online Business Manager who wants Claude to think like her and do more of the work that moves her business forward. She's detail-oriented, proactive, and manages multiple clients. Her bootcamp is about building a system that lets her take on more clients without taking on more hours.",
    accentColor: "#5A2D82",
    moves: [
      { session: "Kickoff", date: "Jun 5", label: "Fri · Orientation", move: "List the 3 most repetitive tasks you do for clients every week. These are Claude's first assignments. Come to Session 1 ready to turn at least one of them into a Claude Project.", ideal: `Your first Claude Project, 'Weekly Client Status Reports,' is live. Inside sit your three most repetitive weekly tasks ~ status updates, invoice chasing, meeting recaps ~ with the status workflow already templated, so Monday's reports for all four clients draft themselves from your notes.` },
      { session: "S1", date: "Jun 6", label: "Sat · Week 1", move: "Create three Projects: Client Operations, Team & Project Coordination, and Systems & Processes. Load each with real SOPs, client briefs, or recurring task lists you already have. Claude works best when it knows exactly what you're managing.", ideal: `Your workspace shows three Projects ~ Client Operations, Team & Project Coordination, Systems & Processes ~ each loaded with real artifacts: onboarding SOPs, this quarter's client briefs, and your recurring task lists, so Claude answers any 'how do we do this?' in your own documented voice.` },
      { session: "S2", date: "Jun 7", label: "Sun · Week 1", move: "Upload a client status update you're proud of, a project plan template, and a team briefing doc. Write custom instructions that describe how you work: thorough, clear, proactive. Ask Claude to draft a client update ~ if it sounds like you, you're set.", ideal: `Your Client Operations Project now holds three reference uploads ~ your best client status update, your project-plan template, your team briefing doc ~ plus custom instructions reading 'Be thorough, clear, and proactive; flag risks before I ask.' Claude now mirrors your standard on every draft.` },
      { session: "S3", date: "Jun 13", label: "Sat · Week 2", move: "Design your AI Operations Assistant. Its role: draft weekly client status reports, prepare team meeting agendas, summarise project updates, and write internal process documentation. What does it need to know to do this well? Write that brief tonight.", ideal: `Your Operations Assistant is defined: it writes weekly client status reports, team meeting agendas, project update summaries, and internal process docs. Its opening line reads 'Here's where each of your four clients stands this week, with two risks flagged for your call.' Proactive, on brand, ready.` },
      { session: "S4", date: "Jun 14", label: "Sun · Week 2", move: "Run your AI Operations Assistant through 3 real scenarios: a client status update, a team meeting agenda, and a process doc for a recurring task. If it produces a usable first draft each time, you've just cut your admin time in half.", ideal: `Your Operations Assistant passes all three test scenarios. The client status update opens 'Acme is on track; the Q3 launch slips two days, mitigation attached.' The team agenda lists owners and timings; the recurring-task process doc reads like your own SOP ~ no edits needed.` },
      { session: "S5", date: "Jun 20", label: "Sat · Week 3", move: "Sketch your OBM command centre: active clients with project health status, upcoming deadlines, team member ownership, and a notes column per client. This becomes your single source of truth ~ the view you open every morning.", ideal: `Your OBM command centre plan is mapped: one view per active client showing project health, upcoming deadlines, team owner, and notes. Columns are named, the four current clients are slotted in, and each row links to its Project ~ your whole book of business on one screen.` },
      { session: "S6", date: "Jun 21", label: "Sun · Week 3", move: "Build your client tracker with health indicators (on track / at risk / overdue). Stretch goal: add a capacity column showing your hours committed per client per week ~ this helps you make the case for scope changes or rate increases with data.", ideal: `Your client tracker shows four rows: Acme (on track, 8 hrs/wk), Brightly (at risk, 6 hrs), Coastal (overdue, 5 hrs), Delta (on track, 4 hrs). The capacity column totals 23 of 30 committed hours ~ proof you can take on one more client this month.` },
      { session: "S7", date: "Jun 27", label: "Sat · Week 4", move: "Write your daily Claude routine as an OBM. Morning: open dashboard, identify priorities. Midday: use AI assistant to draft client update or agenda. End of week: use Claude to build the weekly report. This is the system that lets you take on one more client without overwhelm.", ideal: `Your daily routine runs itself: 8am Claude opens the dashboard and names your three priorities; midday it drafts the client update or meeting agenda due; Friday it builds the weekly report across all four clients. You review and send ~ the system carries the load.` },
      { session: "S8", date: "Jun 28", label: "Sun · Week 4", move: "Present your AI-powered OBM system ~ Projects, assistant, and dashboard ~ as your competitive edge. Frame it as: \"this is how I manage more clients without compromising quality.\" That's your next service upgrade conversation.", ideal: `Your pitch lands: 'I run an AI-powered operations system ~ each client gets a dedicated Project, a live health dashboard, and proactive status reports. That's how I manage six clients at the quality most OBMs give three, without adding a single hour to my week.'` },
    ],
    deliverables: [
      { week: "Week 1", color: "#1A6045", text: "3 Claude Projects ~ Client Operations, Team Coordination, Systems & Processes ~ loaded with your SOPs, briefs, and recurring task context." },
      { week: "Week 2", color: "#1A4070", text: "1 AI Operations Assistant briefed to draft status reports, meeting agendas, and process docs ~ in your voice, for your clients." },
      { week: "Week 3", color: "#2E2868", text: "An OBM command centre with project health indicators and a capacity tracker. Your single source of truth, built with Claude Code." },
      { week: "Week 4", color: "#6B3A10", text: "A daily Claude routine that scales your capacity ~ and a graduation showcase that positions your AI system as a premium service differentiator." },
    ],
  },
};

export const WEEK_COLORS = ["#C4A882", "#7D6B5A", "#5A7A6B", "#6B5A7A"];

export function sessionWeek(index: number) {
  if (index === 0) return { label: "Kickoff", color: "#9C8B7A" };
  const w = Math.ceil(index / 2);
  return { label: `Week ${w}`, color: WEEK_COLORS[w - 1] };
}

/** Minimal intake shape needed to build a personalised roadmap. */
export type RoadmapIntake = {
  first_name?: string | null;
  business_oneliner?: string | null;
  first_focus?: string | null;
  voice_owner?: string | null;
  ai_employee_role?: string | null;
  dashboard_metrics?: string | string[] | null;
  os?: string | null;
  timezone?: string | null;
  peak_time?: string | null;
  one_thing?: string | null;
};

/**
 * Resolve a complete roadmap for a participant. If they have a hand-authored
 * entry in PARTICIPANT_ROADMAPS it is used; otherwise a personalised roadmap is
 * generated from their intake answers so every participant always has one
 * (never a "coming soon" placeholder). `photo` is "" when no avatar exists.
 */
export function resolveRoadmap(intake: RoadmapIntake | null | undefined): ParticipantData {
  const firstName = intake?.first_name?.trim() || "";
  const key = firstName.toLowerCase().split(" ")[0];
  const data = PARTICIPANT_ROADMAPS[key];

  const focusArea  = intake?.first_focus || "your business";
  const aiRole     = intake?.ai_employee_role || "AI assistant";
  const metrics    = Array.isArray(intake?.dashboard_metrics)
    ? intake!.dashboard_metrics!.filter(Boolean).join(", ") || "key metrics"
    : intake?.dashboard_metrics || "key metrics";
  const oneThing   = intake?.one_thing || "get more done with less effort";
  const business   = intake?.business_oneliner || "your business";
  const voiceOwner = intake?.voice_owner || "personal brand";

  return {
    name: data?.name ?? (firstName || "You"),
    photo: data?.photo ?? "",
    accentColor: data?.accentColor ?? "#7D6B5A",
    insight:
      data?.insight ??
      `${firstName || "You"} is joining this bootcamp with a clear goal: to ${oneThing}. Every session has been designed around the reality of running ${business}, with a focus on ${focusArea}. By the end of Week 4, ${firstName || "you"} will have a Claude stack that runs alongside the business every day.`,
    moves: data?.moves ?? [
      { session: "Kickoff", date: "Jun 5", label: "Fri · Orientation", move: `Come with one sentence that describes your business and who it serves. Use it as your very first Claude prompt tonight.`, ideal: `Your brief is locked: one clear sentence on what ${business} does and who it serves, plus your goal stated plainly ~ to ${oneThing}. It's saved as the first prompt Claude works from across every session this month.` },
      { session: "S1", date: "Jun 6", label: "Sat · Week 1", move: `Create three Claude Projects around ${focusArea}. Load each with context about ${business}. Claude works best when it knows exactly what you're running.`, ideal: `Three Projects live in your sidebar, all focused on ${focusArea}. Each is loaded with real context about ${business} ~ your services, your docs, your goals ~ so every answer Claude gives is grounded in your actual world, not generic advice.` },
      { session: "S2", date: "Jun 7", label: "Sun · Week 1", move: `Upload 2–3 docs that represent your work — a proposal, an email, a brief. Write custom instructions as ${voiceOwner}. Ask Claude to draft something. If it sounds like you, you're set.`, ideal: `Claude now writes as ${voiceOwner}. Fed two or three of your real documents and custom instructions in your voice, its first test draft comes back sounding like you wrote it ~ same tone, same phrasing, ready to send with light edits.` },
      { session: "S3", date: "Jun 13", label: "Sat · Week 2", move: `Design your AI employee: a ${aiRole}. Write out the 5 tasks it handles. What does it need to know to do them well in your voice? Write that brief before Sunday.`, ideal: `Your AI employee ~ a ${aiRole} ~ is briefed and built. Its role doc lists the five tasks it owns, what it needs to know about ${business}, and the voice to use, so it produces usable first drafts without hand-holding.` },
      { session: "S4", date: "Jun 14", label: "Sun · Week 2", move: `Run your AI employee through 3 real scenarios from your actual work. Refine the brief until it handles all three without needing extra prompting. When it does, you've just scaled your output.`, ideal: `Three real scenarios from your week, three solid first drafts. Your ${aiRole} handled each one in your voice without extra prompting ~ proof you've scaled your output without hiring, and got hours back every week from here on.` },
      { session: "S5", date: "Jun 20", label: "Sat · Week 3", move: `Sketch what you want your dashboard to show: ${metrics}. Write it in plain English before the session. Think of it as the one screen you'd open every morning.`, ideal: `Your dashboard plan is mapped in plain English: the columns and numbers you actually need ~ ${metrics} ~ laid out as the one screen you'd open every morning to know exactly where ${business} stands.` },
      { session: "S6", date: "Jun 21", label: "Sun · Week 3", move: `Build your dashboard with Claude Code. Stretch goal: add one metric that changes how you prioritise. Screenshot it when it's done — it's evidence of a new skill.`, ideal: `Your dashboard is built and running in your browser, tracking ${metrics} with sample data filled in. One metric reframes how you prioritise this week. You screenshot it ~ real evidence you built a working tool with zero coding background.` },
      { session: "S7", date: "Jun 27", label: "Sat · Week 4", move: `Map your daily Claude routine: what you open, when, and why. Keep it under 30 minutes total. Write it like a habit you'd teach someone else.`, ideal: `Your daily Claude routine is written like a habit you could teach: morning, midday, and end-of-day moments where Claude is open and working ~ under 30 minutes total, each step tied to the part of ${business} it moves forward.` },
      { session: "S8", date: "Jun 28", label: "Sun · Week 4", move: `Present your full Claude stack — Projects, AI employee, dashboard — as one unified system. Frame it as: "this is how I ${oneThing}." That's your graduation story.`, ideal: `Your full Claude stack presents as one system ~ Projects, your ${aiRole}, and the dashboard working together. Your graduation line lands: "this is how I ${oneThing}." You came in with a goal and you leave with the system to deliver it.` },
    ],
    deliverables: data?.deliverables ?? [
      { week: "Week 1", color: "#1A6045", text: `3 Claude Projects loaded with context about ${business} — Claude now knows your world.` },
      { week: "Week 2", color: "#1A4070", text: `1 AI ${aiRole} briefed and tested against real scenarios from your work.` },
      { week: "Week 3", color: "#2E2868", text: `A custom business dashboard tracking ${metrics}, built with Claude Code.` },
      { week: "Week 4", color: "#6B3A10", text: `A daily Claude routine and a graduation showcase. You came in wanting to ${oneThing}. You leave with the system to do it.` },
    ],
  };
}

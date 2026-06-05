import type { IntakeResponse } from "@/app/(dashboard)/admin/participants/responses-table";

export type RoadmapPriority = "core" | "focus";

export type RoadmapItem = {
  sessionNumber: number;
  tag: string;
  color: string;
  weekLabel: string;
  title: string;
  priority: RoadmapPriority;
  note: string;
};

const ROLE_LABELS: Record<string, string> = {
  inbox_triage: "Inbox Triage AI",
  lead_qualifier: "Lead Qualifier AI",
  content_reviewer: "Content Reviewer AI",
};

const FOCUS_LABELS: Record<string, string> = {
  ops: "operations",
  voice: "content & voice",
  client: "client work",
  sales: "sales & leads",
};

const METRIC_LABELS: Record<string, string> = {
  revenue: "revenue",
  leads: "new leads",
  time_per_workflow: "workflow time",
  active_clients: "active clients",
  content_engagement: "content engagement",
};

export function generateRoadmap(response: IntakeResponse | null): RoadmapItem[] {
  const focus = response?.first_focus ?? null;
  const role = response?.ai_employee_role ?? null;
  const roleCustom = response?.ai_employee_custom ?? null;
  const voiceOwner = response?.voice_owner ?? null;
  const metrics = response?.dashboard_metrics ?? [];
  const metricsCustom = response?.dashboard_custom ?? null;
  const oneThing = response?.one_thing ?? null;
  const business = response?.business_oneliner ?? null;

  const roleLabel =
    role === "custom"
      ? roleCustom || "custom AI employee"
      : ROLE_LABELS[role ?? ""] ?? "AI employee";

  const focusLabel = FOCUS_LABELS[focus ?? ""] ?? "your business";
  const isOps = focus === "ops" || focus === "sales";
  const isVoice = focus === "voice" || focus === "client";
  const hasMetrics = metrics.length > 0;

  const metricList = metrics
    .slice(0, 3)
    .map((m) =>
      m === "custom" ? metricsCustom || "custom metric" : METRIC_LABELS[m] ?? m
    )
    .join(", ");

  const voiceNote =
    voiceOwner === "mine"
      ? "your personal voice"
      : voiceOwner === "company"
      ? "your company voice"
      : "both your personal and company voice";

  return [
    {
      sessionNumber: 1,
      tag: "Kickoff",
      color: "#C4A882",
      weekLabel: "Pre-course",
      title: "Welcome, orientation, Claude.ai setup",
      priority: "core",
      note: oneThing
        ? `Your starting point. You'll leave with Claude.ai set up and a clear plan toward your goal: "${oneThing}".`
        : "Your starting point. Claude.ai setup + full bootcamp walkthrough.",
    },
    {
      sessionNumber: 2,
      tag: "W1 · S1",
      color: "#C4A882",
      weekLabel: "Week 1 · Knowing Claude",
      title: "The interface, Projects, your first conversation",
      priority: "core",
      note: business
        ? `Create a Project and orient Claude to: "${business}". This context shapes every response for the rest of the bootcamp.`
        : "Set up your first Project and orient Claude to your business context.",
    },
    {
      sessionNumber: 3,
      tag: "W1 · S2",
      color: "#C4A882",
      weekLabel: "Week 1 · Knowing Claude",
      title: "Custom instructions, file uploads",
      priority: isVoice ? "core" : "focus",
      note: isVoice
        ? `Priority session for ${focusLabel}. Configure Claude to write in ${voiceNote} — this directly powers your content work.`
        : `Upload your SOPs and client materials so Claude knows your ${focusLabel} workflow from day one.`,
    },
    {
      sessionNumber: 4,
      tag: "W2 · S3",
      color: "#7D6B5A",
      weekLabel: "Week 2 · Delegating to Claude",
      title: "AI employees — what Cowork makes real",
      priority: isOps ? "core" : "focus",
      note: isOps
        ? `Priority session — directly maps to building your ${roleLabel}. Come with the tasks you want to delegate first.`
        : `See how a ${roleLabel} could handle ${focusLabel} tasks. Come with your highest-volume repeatable request.`,
    },
    {
      sessionNumber: 5,
      tag: "W2 · S4",
      color: "#7D6B5A",
      weekLabel: "Week 2 · Delegating to Claude",
      title: "Build and test your first AI employee live",
      priority: "core",
      note: `Build and launch your ${roleLabel} live. Bring 3 real ${focusLabel} requests from your business to test it against.`,
    },
    {
      sessionNumber: 6,
      tag: "W3 · S5",
      color: "#5A7A6B",
      weekLabel: "Week 3 · Building with Claude",
      title: "Claude Code, your first build",
      priority: hasMetrics ? "core" : "focus",
      note: hasMetrics
        ? `Foundation for your dashboard. Your metrics (${metricList}) will be the focus in Session 7.`
        : "No coding experience needed. Learn the build loop before the full dashboard session.",
    },
    {
      sessionNumber: 7,
      tag: "W3 · S6",
      color: "#5A7A6B",
      weekLabel: "Week 3 · Building with Claude",
      title: "Build your business dashboard",
      priority: "core",
      note: hasMetrics
        ? `You'll build a live dashboard tracking: ${metricList}. Come with your data sources ready.`
        : `Build a custom ${focusLabel} dashboard tailored to how you actually run your business.`,
    },
    {
      sessionNumber: 8,
      tag: "W4 · S7",
      color: "#6B5A7A",
      weekLabel: "Week 4 · Living with Claude",
      title: "Your full Claude stack working together",
      priority: "core",
      note: `Bring all three outputs: your Projects, ${roleLabel}, and dashboard. Map Claude into your daily ${focusLabel} routine.`,
    },
    {
      sessionNumber: 9,
      tag: "W4 · S8",
      color: "#6B5A7A",
      weekLabel: "Week 4 · Living with Claude",
      title: "Showcases, Q&A, and graduation",
      priority: "core",
      note: oneThing
        ? `2-minute showcase of what you built. You set out to: "${oneThing}" — this is where you share the outcome.`
        : "2-minute showcase + open Q&A. Graduation from Cohort 1.",
    },
  ];
}

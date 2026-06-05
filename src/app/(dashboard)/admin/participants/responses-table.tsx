"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export type IntakeResponse = {
  id: string;
  user_id: string;
  first_name: string | null;
  email: string | null;
  business_oneliner: string | null;
  first_focus: string | null;
  voice_owner: string | null;
  ai_employee_role: string | null;
  ai_employee_custom: string | null;
  dashboard_metrics: string[] | null;
  dashboard_custom: string | null;
  os: string | null;
  timezone: string | null;
  peak_time: string | null;
  one_thing: string | null;
  submitted_at: string | null;
};

const FOCUS_LABELS: Record<string, string> = {
  ops: "Operations & inbox",
  voice: "Voice & content",
  client: "Client work",
  sales: "Sales & leads",
};

const ROLE_LABELS: Record<string, string> = {
  inbox_triage: "Inbox Triage",
  lead_qualifier: "Lead Qualifier",
  content_reviewer: "Content Reviewer",
  custom: "Custom",
};

const METRIC_LABELS: Record<string, string> = {
  revenue: "Revenue this month",
  leads: "New leads",
  time_per_workflow: "Time per workflow",
  active_clients: "Active clients",
  content_engagement: "Content engagement",
  custom: "Custom",
};

const PEAK_LABELS: Record<string, string> = {
  morning: "Morning (6–10 AM)",
  mid_morning: "Mid-morning (10 AM–1 PM)",
  afternoon: "Afternoon (1–5 PM)",
  evening: "Evening (5–9 PM)",
  late_night: "Late night (9 PM+)",
};

const VOICE_LABELS: Record<string, string> = {
  mine: "Mine (personal brand)",
  company: "My company's",
  both: "Both",
};

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--taupe-400)] mb-0.5">
        {label}
      </p>
      <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
        {value}
      </p>
    </div>
  );
}

function ExpandedRow({ r }: { r: IntakeResponse }) {
  const metrics = (r.dashboard_metrics ?? [])
    .map((m) => METRIC_LABELS[m] ?? m)
    .join(", ");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 px-6 pb-5 pt-1">
      <Field label="Business one-liner" value={r.business_oneliner} />
      <Field label="Voice owner" value={VOICE_LABELS[r.voice_owner ?? ""] ?? r.voice_owner} />
      <Field
        label="AI employee role"
        value={
          r.ai_employee_role === "custom" && r.ai_employee_custom
            ? `Custom: ${r.ai_employee_custom}`
            : ROLE_LABELS[r.ai_employee_role ?? ""] ?? r.ai_employee_role
        }
      />
      <Field
        label="Dashboard metrics"
        value={
          metrics
            ? metrics +
              (r.dashboard_metrics?.includes("custom") && r.dashboard_custom
                ? ` (Custom: ${r.dashboard_custom})`
                : "")
            : null
        }
      />
      <Field label="OS" value={r.os ? r.os.charAt(0).toUpperCase() + r.os.slice(1) : null} />
      <Field label="Timezone" value={r.timezone} />
      <Field label="Peak time" value={PEAK_LABELS[r.peak_time ?? ""] ?? r.peak_time} />
      <div className="sm:col-span-2 lg:col-span-3">
        <Field label="One thing they want from bootcamp" value={r.one_thing} />
      </div>
    </div>
  );
}

export function ResponsesTable({ responses }: { responses: IntakeResponse[] }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  if (responses.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--beige-200)] dark:border-[var(--border)] bg-white dark:bg-[var(--card)] p-12 text-center">
        <p className="text-sm text-[var(--taupe-400)] font-light">
          No onboarding responses yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--beige-200)] dark:border-[var(--border)] bg-white dark:bg-[var(--card)] overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[auto_1fr_1fr_140px_80px_100px] gap-4 px-6 py-3 border-b border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-[var(--charcoal-900)]/30">
        <span className="w-4" />
        {["Name", "Email", "First Focus", "OS", "Submitted"].map((h) => (
          <p key={h} className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--taupe-400)]">
            {h}
          </p>
        ))}
      </div>

      {responses.map((r) => {
        const isOpen = expanded.has(r.id);
        return (
          <div key={r.id} className="border-b border-[var(--beige-100)] dark:border-white/5 last:border-0">
            <button
              onClick={() => toggle(r.id)}
              className="w-full grid grid-cols-[auto_1fr_1fr_140px_80px_100px] gap-4 px-6 py-4 text-left hover:bg-[var(--beige-50)] dark:hover:bg-white/[0.02] transition-colors"
            >
              <span className="flex items-center">
                {isOpen
                  ? <ChevronDown className="size-3.5 text-[var(--taupe-400)]" />
                  : <ChevronRight className="size-3.5 text-[var(--taupe-400)]" />
                }
              </span>
              <span className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground truncate">
                {r.first_name ?? ", "}
              </span>
              <span className="text-sm text-[var(--taupe-400)] font-light truncate">
                {r.email ?? ", "}
              </span>
              <span className="text-xs text-[var(--taupe-400)] font-light">
                {FOCUS_LABELS[r.first_focus ?? ""] ?? r.first_focus ?? ", "}
              </span>
              <span className="text-xs text-[var(--taupe-400)] font-light capitalize">
                {r.os ?? ", "}
              </span>
              <span className="text-xs text-[var(--taupe-400)] font-light">
                {r.submitted_at
                  ? new Date(r.submitted_at).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })
                  : ", "}
              </span>
            </button>

            {isOpen && (
              <div className="bg-[var(--beige-50)] dark:bg-white/[0.02] border-t border-[var(--beige-100)] dark:border-white/5">
                <ExpandedRow r={r} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

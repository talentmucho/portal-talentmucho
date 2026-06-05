"use client";

import { generateRoadmap } from "@/utils/roadmap";
import type { IntakeResponse } from "@/app/(dashboard)/admin/participants/responses-table";

const FOCUS_LABELS: Record<string, string> = {
  ops: "Operations",
  voice: "Content & Voice",
  client: "Client Work",
  sales: "Sales & Leads",
};

const ROLE_LABELS: Record<string, string> = {
  inbox_triage: "Inbox Triage",
  lead_qualifier: "Lead Qualifier",
  content_reviewer: "Content Reviewer",
};

interface Props {
  response: IntakeResponse | null;
}

export function ParticipantRoadmap({ response }: Props) {
  const items = generateRoadmap(response);

  const focusLabel =
    FOCUS_LABELS[response?.first_focus ?? ""] ?? null;
  const roleLabel =
    response?.ai_employee_role === "custom"
      ? response?.ai_employee_custom || "Custom AI"
      : ROLE_LABELS[response?.ai_employee_role ?? ""] ?? null;
  const oneThing = response?.one_thing ?? null;

  const coreCount = items.filter((i) => i.priority === "core").length;

  if (!response) {
    return (
      <div className="border border-dashed border-[var(--beige-200)] dark:border-white/5 rounded-xl p-5 text-center">
        <p className="text-xs text-[var(--taupe-400)]">
          No onboarding data yet. Roadmap will generate once this participant completes intake.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Summary card */}
      <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4 flex flex-col gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)]">
          Path summary
        </p>
        <div className="flex flex-wrap gap-1.5">
          {focusLabel && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-[10px] font-semibold uppercase tracking-[0.1em]">
              {focusLabel}
            </span>
          )}
          {roleLabel && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-[var(--beige-200)] dark:border-white/10 bg-white dark:bg-white/5 text-[10px] font-semibold text-[var(--charcoal-900)] dark:text-foreground uppercase tracking-[0.1em]">
              {roleLabel}
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-[var(--beige-200)] dark:border-white/10 bg-white dark:bg-white/5 text-[10px] font-semibold text-[var(--taupe-400)] uppercase tracking-[0.1em]">
            {coreCount} core sessions
          </span>
        </div>
        {oneThing && (
          <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed mt-0.5">
            Goal: <span className="text-[var(--charcoal-900)] dark:text-foreground font-medium">{oneThing}</span>
          </p>
        )}
      </div>

      {/* Session timeline */}
      <div className="flex flex-col">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCore = item.priority === "core";

          return (
            <div key={item.sessionNumber} className="flex gap-3">
              {/* Left: connector line + dot */}
              <div className="flex flex-col items-center" style={{ width: 28 }}>
                <div
                  className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold z-10"
                  style={{
                    background: isCore ? item.color : "transparent",
                    border: isCore ? "none" : `1.5px solid ${item.color}60`,
                    color: isCore ? "white" : item.color,
                  }}
                >
                  {item.sessionNumber}
                </div>
                {!isLast && (
                  <div
                    className="flex-1 w-px mt-1"
                    style={{
                      background: `${item.color}30`,
                      minHeight: 12,
                    }}
                  />
                )}
              </div>

              {/* Right: content */}
              <div className={`flex-1 pb-4 ${isLast ? "pb-0" : ""}`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[9px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded"
                    style={{
                      color: item.color,
                      background: `${item.color}18`,
                    }}
                  >
                    {item.tag}
                  </span>
                  {isCore ? (
                    <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--charcoal-900)] dark:text-foreground">
                      Core
                    </span>
                  ) : (
                    <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[var(--taupe-400)]">
                      Focus
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-[var(--charcoal-900)] dark:text-foreground leading-snug">
                  {item.title}
                </p>
                <p className="text-[11px] text-[var(--taupe-400)] font-light leading-relaxed mt-0.5">
                  {item.note}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

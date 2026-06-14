"use client";

import { useState } from "react";
import { User, Wrench, ArrowRight } from "lucide-react";

const COMPARISON: { dim: string; employee: string; skill: string }[] = [
  { dim: "What it is", employee: "A role that owns an area of your work", skill: "A repeatable procedure for one task" },
  { dim: "Identity", employee: "Has a name, a persona, and persistent context", skill: "No identity ~ it's just a capability" },
  { dim: "Scope", employee: "Ongoing ~ handles many related tasks", skill: "One job, the same steps every time" },
  { dim: "Judgment", employee: "Decides, and escalates to you when unsure", skill: "Follows the recipe ~ no decisions" },
  { dim: "How it runs", employee: "On assignment / in the background", skill: "You invoke it the moment you need it" },
  { dim: "Relationship", employee: "Uses skills to get its work done", skill: "Gets used by you or by an employee" },
];

const SCENARIOS: { task: string; answer: "employee" | "skill"; why: string }[] = [
  { task: "Turn this week's journals into a formatted weekly review", answer: "skill", why: "Same steps every time, one clear output ~ a perfect repeatable skill." },
  { task: "Run client onboarding from first hello to handoff", answer: "employee", why: "Ongoing role across many tasks, with judgment and escalation ~ that's an employee." },
  { task: "Generate 3 reel hooks from a playbook", answer: "skill", why: "A single, repeatable task you trigger on demand ~ a skill." },
  { task: "Own your content pipeline: brief, draft, format, flag launches", answer: "employee", why: "A whole area of work that decides and escalates ~ an employee (who may use skills)." },
  { task: "Draft a cold outreach email with your viral stats", answer: "skill", why: "One defined output produced the same way each time ~ a skill." },
  { task: "Greet new clients, answer FAQs, collect intake, escalate odd cases", answer: "employee", why: "Persistent role + judgment about what to escalate ~ an employee." },
];

export function AiEmployeeVsSkill() {
  const [picked, setPicked] = useState<number | null>(null);
  const current = picked === null ? null : SCENARIOS[picked];

  return (
    <div className="flex flex-col gap-4">
      {/* Definitions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5 p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="size-7 rounded-full bg-[var(--clay-500)]/15 flex items-center justify-center shrink-0">
              <User className="size-3.5 text-[var(--clay-500)]" />
            </span>
            <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">AI employee ~ a <span className="italic">who</span></p>
          </div>
          <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
            A named role that owns an area of your business. It has context, makes judgment calls, escalates what needs you, and runs whether you&apos;re watching or not.
          </p>
        </div>
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/20 p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="size-7 rounded-full bg-indigo-500/15 flex items-center justify-center shrink-0">
              <Wrench className="size-3.5 text-indigo-500 dark:text-indigo-400" />
            </span>
            <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">Skill ~ a <span className="italic">what</span></p>
          </div>
          <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
            A repeatable procedure for one task ~ the same steps, the same output, every time. No identity. You (or an employee) trigger it the moment it's needed.
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] overflow-hidden">
        <div className="grid grid-cols-[1fr_1.3fr_1.3fr] text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--taupe-400)] bg-[var(--beige-50)] dark:bg-white/[0.02] border-b border-[var(--beige-200)] dark:border-white/5">
          <span className="px-3 py-2.5" />
          <span className="px-3 py-2.5 flex items-center gap-1.5"><User className="size-3 text-[var(--clay-500)]" /> AI employee</span>
          <span className="px-3 py-2.5 flex items-center gap-1.5"><Wrench className="size-3 text-indigo-500 dark:text-indigo-400" /> Skill</span>
        </div>
        {COMPARISON.map((row, i) => (
          <div
            key={row.dim}
            className={`grid grid-cols-[1fr_1.3fr_1.3fr] text-xs ${i < COMPARISON.length - 1 ? "border-b border-[var(--beige-200)] dark:border-white/5" : ""}`}
          >
            <span className="px-3 py-3 font-semibold text-[var(--taupe-400)] uppercase tracking-[0.06em]">{row.dim}</span>
            <span className="px-3 py-3 text-[var(--charcoal-900)] dark:text-foreground font-light border-l border-[var(--beige-200)] dark:border-white/5">{row.employee}</span>
            <span className="px-3 py-3 text-[var(--charcoal-900)] dark:text-foreground font-light border-l border-[var(--beige-200)] dark:border-white/5">{row.skill}</span>
          </div>
        ))}
      </div>

      {/* Interactive: skill or employee? */}
      <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-[var(--card)] p-5 flex flex-col gap-3">
        <div>
          <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">Skill or employee? ~ tap a task</p>
          <p className="text-xs text-[var(--taupe-400)] font-light mt-0.5">Decide which one fits before you build it. Tap each to check yourself.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((s, i) => {
            const active = picked === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setPicked(active ? null : i)}
                className={`text-left text-xs leading-snug rounded-xl px-3 py-2 border transition-all ${
                  active
                    ? "border-[var(--charcoal-900)] dark:border-white bg-white dark:bg-white/10 text-[var(--charcoal-900)] dark:text-foreground font-medium"
                    : "border-[var(--beige-200)] dark:border-white/10 bg-white dark:bg-white/[0.02] text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground hover:border-[var(--beige-300)]"
                }`}
              >
                {s.task}
              </button>
            );
          })}
        </div>

        {current && (
          <div
            className={`rounded-xl p-4 flex items-start gap-3 border ${
              current.answer === "employee"
                ? "border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5"
                : "border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/20"
            }`}
          >
            <span
              className={`size-7 shrink-0 rounded-full flex items-center justify-center ${
                current.answer === "employee" ? "bg-[var(--clay-500)]/15" : "bg-indigo-500/15"
              }`}
            >
              {current.answer === "employee" ? (
                <User className="size-3.5 text-[var(--clay-500)]" />
              ) : (
                <Wrench className="size-3.5 text-indigo-500 dark:text-indigo-400" />
              )}
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground flex items-center gap-1.5">
                {current.answer === "employee" ? "Build an AI employee" : "Build a skill"}
                <ArrowRight className="size-3" />
              </p>
              <p className="text-xs text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{current.why}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

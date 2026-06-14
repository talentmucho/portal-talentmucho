"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smile, HelpCircle, AlertTriangle } from "lucide-react";

const SCENARIOS = [
  {
    key: "easy",
    label: "Easy case",
    icon: Smile,
    accent: "var(--clay-500)",
    example: "A typical request this employee handles every day.",
    expect: "Clean, accurate, sounds like your business. If this fails, your context or tone instructions are wrong.",
  },
  {
    key: "edge",
    label: "Edge case",
    icon: HelpCircle,
    accent: "var(--clay-500)",
    example: "An ambiguous request that's missing a key detail.",
    expect: "Asks one good clarifying question before proceeding. If your employee guesses instead of asking, add a rule: \"When unsure, ask one question.\"",
  },
  {
    key: "out",
    label: "Out of scope",
    icon: AlertTriangle,
    accent: "var(--clay-500)",
    example: "Something outside this employee's defined role.",
    expect: "Acknowledges it's outside their role and tells the person exactly what to do next (contact you, wait, who to call). Never leaves them hanging.",
  },
];

export function ScenarioTabs() {
  const [active, setActive] = useState(0);
  const current = SCENARIOS[active];

  return (
    <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
      <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">
        Before you declare your AI employee ready, run them through three types of scenarios. Most employees fail the edge cases first ~ and that's where the iteration happens.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-[var(--beige-100)] dark:bg-white/5 w-full">
        {SCENARIOS.map((s, i) => {
          const isActive = i === active;
          const Icon = s.icon;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(i)}
              className="relative flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="scenario-pill"
                  className="absolute inset-0 rounded-lg bg-white dark:bg-white/10 shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className={`relative z-10 flex items-center gap-1.5 ${isActive ? "text-[var(--charcoal-900)] dark:text-foreground" : "text-[var(--taupe-400)]"}`}>
                <Icon className="size-3.5" style={isActive ? { color: s.accent } : undefined} />
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative min-h-[112px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--taupe-400)] mb-1">The test</p>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{current.example}</p>
            </div>
            <div className="rounded-xl border p-4" style={{ borderColor: `${current.accent}40`, background: `${current.accent}0D` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1" style={{ color: current.accent }}>What good looks like</p>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">{current.expect}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

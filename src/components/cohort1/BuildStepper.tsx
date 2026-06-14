"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowLeft, ArrowRight, PartyPopper } from "lucide-react";

export function BuildStepper({ steps }: { steps: string[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = steps.length;
  const done = current >= total;
  const pct = Math.round((Math.min(current, total) / total) * 100);

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(Math.max(0, Math.min(total, next)));
  };

  return (
    <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex flex-col gap-4">
      {/* Progress header */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-[var(--taupe-400)] tabular-nums">
          {done ? "All steps complete" : `Step ${current + 1} of ${total}`}
        </p>
        <p className="text-[10px] font-bold tabular-nums text-[var(--clay-500)]">{pct}%</p>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[var(--beige-100)] dark:bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[var(--clay-500)]"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-1.5">
        {steps.map((_, i) => {
          const isDone = i < current;
          const isCurrent = i === current && !done;
          return (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to step ${i + 1}`}
              className={`size-7 shrink-0 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors border ${
                isCurrent
                  ? "bg-[var(--charcoal-900)] dark:bg-white text-white dark:text-[var(--charcoal-900)] border-transparent"
                  : isDone
                  ? "bg-[var(--clay-500)]/15 text-[var(--clay-500)] border-[var(--clay-500)]/30"
                  : "bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)] border-[var(--beige-200)] dark:border-white/10"
              }`}
            >
              {isDone ? <Check className="size-3.5" /> : i + 1}
            </button>
          );
        })}
      </div>

      {/* Step body */}
      <div className="relative min-h-[68px] rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-white/[0.02] p-4 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="flex items-start gap-3"
            >
              <span className="size-7 shrink-0 rounded-full bg-[var(--clay-500)]/15 flex items-center justify-center">
                <PartyPopper className="size-4 text-[var(--clay-500)]" />
              </span>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed pt-0.5">
                Your employee is built and ready for a test conversation. Now run them through the three scenarios below.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex items-start gap-3"
            >
              <span className="size-7 shrink-0 rounded-full bg-[var(--charcoal-900)] dark:bg-white text-white dark:text-[var(--charcoal-900)] flex items-center justify-center text-[11px] font-semibold">
                {current + 1}
              </span>
              <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground leading-relaxed pt-0.5">
                {steps[current]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(current - 1)}
          disabled={current === 0}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </button>
        {done ? (
          <button
            type="button"
            onClick={() => go(0)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
          >
            Start over
          </button>
        ) : (
          <button
            type="button"
            onClick={() => go(current + 1)}
            className="inline-flex items-center gap-2 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            {current === total - 1 ? "Finish" : "Next step"}
            <ArrowRight className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

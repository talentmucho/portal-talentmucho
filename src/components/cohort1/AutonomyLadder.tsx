"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const RUNGS = [
  { n: 1, level: "Chat", trig: "You", appr: "You", what: "A tool ~ you open it, ask, and close it", hot: false },
  { n: 2, level: "Dispatch", trig: "You", appr: "You", what: "An employee you hand one task to", hot: false },
  { n: 3, level: "Schedule", trig: "Itself (clock)", appr: "You, by exception", what: "An employee running on a cadence", hot: false },
  { n: 4, level: "Agent", trig: "Itself (clock / event)", appr: "Itself ~ escalates exceptions", what: "It acts; you supervise", hot: true },
];

export function AutonomyLadder() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.18, delayChildren: reduce ? 0 : 0.15 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -18 },
        show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
      };

  return (
    <motion.div
      className="relative flex flex-col gap-2"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Growing connector line ~ runs down the badge column (sm+) */}
      <motion.div
        className="hidden sm:block absolute left-[30px] top-6 bottom-6 w-px bg-[var(--clay-500)]/25 origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduce ? 0 : 1.1, ease: "easeOut", delay: reduce ? 0 : 0.15 }}
      />

      {RUNGS.map((r) => (
        <motion.div
          key={r.n}
          variants={item}
          className={`relative rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${
            r.hot
              ? "border-[var(--clay-500)]/30 bg-[var(--clay-500)]/5"
              : "border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]"
          }`}
        >
          <div className="flex items-center gap-3 sm:w-44 shrink-0">
            <motion.span
              initial={reduce ? false : { scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 500, damping: 18, delay: reduce ? 0 : 0.15 + r.n * 0.18 }}
              className={`relative z-10 size-7 shrink-0 rounded-full flex items-center justify-center text-[11px] font-semibold ${
                r.hot
                  ? "bg-[var(--clay-500)] text-white"
                  : "bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)] border border-[var(--beige-200)] dark:border-white/10"
              }`}
            >
              {r.n}
            </motion.span>
            <span className="text-sm font-semibold text-[var(--charcoal-900)] dark:text-foreground">{r.level}</span>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-[1fr_1fr_1.2fr] gap-1 sm:gap-3 text-xs">
            <span className="text-[var(--charcoal-900)] dark:text-foreground"><span className="text-[var(--taupe-400)] font-semibold uppercase tracking-[0.08em]">Triggers: </span>{r.trig}</span>
            <span className="text-[var(--charcoal-900)] dark:text-foreground"><span className="text-[var(--taupe-400)] font-semibold uppercase tracking-[0.08em]">Approves: </span>{r.appr}</span>
            <span className="text-[var(--taupe-400)] font-light">{r.what}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

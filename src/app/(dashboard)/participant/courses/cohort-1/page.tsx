"use client";

import { Calendar, Clock, Video, ArrowRight } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from "@/components/animate-ui/components/radix/tabs";

const weeks = [
  {
    num: "01",
    color: "#C4A882",
    theme: "Knowing Claude",
    deliverable:
      "3 configured Claude.ai Projects loaded with your docs, business context, and brand voice.",
    sessions: [
      "Sat, Jun 6 · The interface, Projects, your first conversation",
      "Sun, Jun 7 · Custom instructions, file uploads",
    ],
  },
  {
    num: "02",
    color: "#7D6B5A",
    theme: "Delegating to Claude",
    deliverable:
      "1 named AI employee in Cowork, briefed and tested against real scenarios from your business.",
    sessions: [
      "Sat, Jun 13 · AI employees — what Cowork makes real",
      "Sun, Jun 14 · Build and test your first AI employee live",
    ],
  },
  {
    num: "03",
    color: "#5A7A6B",
    theme: "Building with Claude",
    deliverable:
      "1 custom business dashboard built with Claude Code. No coding experience needed.",
    sessions: [
      "Sat, Jun 20 · Claude Code — your first build",
      "Sun, Jun 21 · Build your business dashboard",
    ],
  },
  {
    num: "04",
    color: "#6B5A7A",
    theme: "Living with Claude",
    deliverable:
      "A written daily Claude routine: 3 specific moments in your workday where Claude is open and ready.",
    sessions: [
      "Sat, Jun 27 · Your full Claude stack working together",
      "Sun, Jun 28 · Showcases, Q&A, and graduation",
    ],
  },
];

const sessions = [
  { tag: "Kickoff", date: "Fri, Jun 5", time: "6–8 PM EST", topic: "Welcome, orientation, Claude.ai setup", color: "#C4A882" },
  { tag: "W1 · S1", date: "Sat, Jun 6", time: "10 AM–1 PM EST", topic: "The interface, Projects, your first conversation", color: "#C4A882" },
  { tag: "W1 · S2", date: "Sun, Jun 7", time: "10 AM–1 PM EST", topic: "Custom instructions, file uploads", color: "#C4A882" },
  { tag: "W2 · S3", date: "Sat, Jun 13", time: "10 AM–1 PM EST", topic: "AI employees — what Cowork makes real", color: "#7D6B5A" },
  { tag: "W2 · S4", date: "Sun, Jun 14", time: "10 AM–1 PM EST", topic: "Build and test your first AI employee live", color: "#7D6B5A" },
  { tag: "W3 · S5", date: "Sat, Jun 20", time: "10 AM–1 PM EST", topic: "Claude Code — your first build", color: "#5A7A6B" },
  { tag: "W3 · S6", date: "Sun, Jun 21", time: "10 AM–1 PM EST", topic: "Build your business dashboard", color: "#5A7A6B" },
  { tag: "W4 · S7", date: "Sat, Jun 27", time: "10 AM–1 PM EST", topic: "Your full Claude stack working together", color: "#6B5A7A" },
  { tag: "W4 · S8", date: "Sun, Jun 28", time: "10 AM–1 PM EST", topic: "Showcases, Q&A, and graduation", color: "#6B5A7A" },
];


export default function Cohort1Page() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <span className="tm-eyebrow block mb-2">Cohort 1 · June 2026</span>
          <h1
            className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground mb-2"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
          >
            AI Business Bootcamp
          </h1>
          <p className="tm-body-sm max-w-lg">
            4 weeks · 9 live sessions on Zoom · Each week ends with a real deliverable
            running inside your business.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              { icon: <Calendar className="size-3" />, label: "Jun 5 – Jun 28, 2026" },
              { icon: <Clock className="size-3" />, label: "Sat & Sun · 10 AM–1 PM EST" },
              { icon: <Video className="size-3" />, label: "Live on Zoom" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 border border-[var(--beige-200)] dark:border-white/5 rounded-full px-3 py-1 text-xs text-[var(--taupe-400)]"
              >
                {icon}
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="lg:shrink-0 lg:w-72 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-5 flex flex-col justify-center">
          <a
            href="/participant/courses/cohort-1/session-3"
            className="inline-flex items-center justify-center gap-2 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity w-full"
          >
            Start session
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContents>
          {/* ── Overview ── */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
              {weeks.map((w) => (
                <div
                  key={w.num}
                  className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden flex flex-col"
                >
                  <div className="px-5 py-4" style={{ background: w.color }}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-1">
                      Week {w.num}
                    </p>
                    <p className="font-serif font-light text-white text-base leading-snug">
                      {w.theme}
                    </p>
                  </div>
                  <div className="p-5 bg-[var(--beige-100)] dark:bg-[var(--card)] flex-1 flex flex-col gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-1">
                        Deliverable
                      </p>
                      <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                        {w.deliverable}
                      </p>
                    </div>
                    <div className="border-t border-[var(--beige-200)] dark:border-white/5 pt-3 space-y-1">
                      {w.sessions.map((s) => (
                        <p key={s} className="text-xs text-[var(--taupe-400)] leading-relaxed">
                          · {s}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── Schedule ── */}
          <TabsContent value="schedule">
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden mt-2">
              {sessions.map((s, i) => (
                <div
                  key={s.tag}
                  className={`grid grid-cols-[auto_1fr] md:grid-cols-[100px_130px_110px_1fr] gap-2 md:gap-4 px-5 py-4 items-center ${
                    i < sessions.length - 1
                      ? "border-b border-[var(--beige-200)] dark:border-white/5"
                      : ""
                  } ${i % 2 === 0 ? "bg-[var(--beige-50)] dark:bg-transparent" : "bg-white dark:bg-white/[0.02]"}`}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full inline-block w-fit shrink-0"
                    style={{
                      background: `${s.color}22`,
                      color: s.color,
                      border: `1px solid ${s.color}44`,
                    }}
                  >
                    {s.tag}
                  </span>
                  <span className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground md:col-auto col-start-2">
                    {s.date}
                  </span>
                  <span className="hidden md:block text-xs text-[var(--taupe-400)]">
                    {s.time}
                  </span>
                  <span className="text-sm text-[var(--taupe-400)] font-light col-span-2 md:col-auto">
                    {s.topic}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
        </TabsContents>
      </Tabs>

    </div>
  );
}

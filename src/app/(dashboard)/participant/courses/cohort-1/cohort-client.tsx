"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Calendar, Clock, Video, ArrowRight } from "lucide-react";
import { IntakeTab } from "./intake/intake-tab";
import type { IntakeAnswers } from "@/app/actions/intake";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from "@/components/animate-ui/components/radix/tabs";
import { PARTICIPANT_ROADMAPS, resolveRoadmap, sessionWeek, type ParticipantData } from "@/utils/participant-roadmaps";

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
      "Sat, Jun 13 · AI employees ,  what Cowork makes real",
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
      "Sat, Jun 20 · Claude Code ,  your first build",
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
  { tag: "W2 · S3", date: "Sat, Jun 13", time: "10 AM–1 PM EST", topic: "AI employees ,  what Cowork makes real", color: "#7D6B5A" },
  { tag: "W2 · S4", date: "Sun, Jun 14", time: "10 AM–1 PM EST", topic: "Build and test your first AI employee live", color: "#7D6B5A" },
  { tag: "W3 · S5", date: "Sat, Jun 20", time: "10 AM–1 PM EST", topic: "Claude Code ,  your first build", color: "#5A7A6B" },
  { tag: "W3 · S6", date: "Sun, Jun 21", time: "10 AM–1 PM EST", topic: "Build your business dashboard", color: "#5A7A6B" },
  { tag: "W4 · S7", date: "Sat, Jun 27", time: "10 AM–1 PM EST", topic: "Your full Claude stack working together", color: "#6B5A7A" },
  { tag: "W4 · S8", date: "Sun, Jun 28", time: "10 AM–1 PM EST", topic: "Showcases, Q&A, and graduation", color: "#6B5A7A" },
];


function RoadmapView({ data, labelPrefix = "Your" }: { data: ParticipantData; labelPrefix?: string }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Cover — full bleed. Uses the avatar photo when present, otherwise a brand gradient. */}
      <div className="relative w-full -mx-6 md:-mx-8 overflow-hidden" style={{ width: "calc(100% + 3rem)" }}>
        {data.photo ? (
          <Image src={data.photo} alt={data.name} width={1200} height={800} className="w-full h-auto block" />
        ) : (
          <div
            className="w-full h-56 md:h-72"
            style={{ background: `linear-gradient(135deg, ${data.accentColor} 0%, ${data.accentColor}AA 55%, ${data.accentColor}66 100%)` }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${data.accentColor}F5 0%, ${data.accentColor}90 25%, ${data.accentColor}30 55%, transparent 80%)` }}
        />
        <div className="absolute bottom-0 left-0 px-6 md:px-8 pb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/60 mb-2">Talent Mucho · AI Business Bootcamp · June 2026</p>
          <p className="font-serif font-light text-white leading-tight mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
            {data.name}'s <span className="italic">Personal Roadmap</span>
          </p>
          <p className="text-sm text-white/80 font-light">4 weeks · 9 live sessions · built around the real business {data.name} is running</p>
        </div>
      </div>
      <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${data.accentColor}, ${data.accentColor}00)` }} />

      {/* Insight */}
      <div className="p-5 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: data.accentColor }}>{labelPrefix === "Your" ? "Your bootcamp brief" : `${data.name}'s bootcamp brief`}</p>
        <p className="text-sm font-light text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">{data.insight}</p>
      </div>

      {/* Deliverables */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-3">What {labelPrefix === "Your" ? "you'll" : `${data.name} will`} build</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.deliverables.map((d, i) => (
            <div key={i} className="p-4 rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] flex gap-3 items-start">
              <span className="shrink-0 size-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5" style={{ background: d.color }}>{i + 1}</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: d.color }}>{d.week}</p>
                <p className="text-sm font-light text-[var(--charcoal-900)] dark:text-foreground leading-relaxed">{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session moves */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-3">Session-by-session · {labelPrefix === "Your" ? "your" : `${data.name}'s`} ideal version</p>
        <div className="flex flex-col gap-2">
          {data.moves.map((m, i) => {
            const wk = sessionWeek(i);
            return (
              <div key={i} className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] grid grid-cols-[72px_1fr] overflow-hidden">
                <div className="flex flex-col items-end justify-start gap-0.5 p-4 border-r border-[var(--beige-200)] dark:border-white/5" style={{ background: `${wk.color}12` }}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: wk.color }}>{m.session}</span>
                  <span className="text-[10px] text-[var(--taupe-400)] tabular-nums">{m.date}</span>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-medium text-[var(--taupe-400)] uppercase tracking-[0.12em] mb-2">{m.label}</p>
                  <div className="flex gap-2 items-start text-sm font-light text-[var(--charcoal-900)] dark:text-foreground leading-relaxed rounded-xl px-3 py-2.5" style={{ background: `${data.accentColor}08` }}>
                    <svg className="size-3.5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke={data.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    <span><strong className="font-semibold">Ideal version:</strong> {m.ideal}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const PARTICIPANT_KEYS = Object.keys(PARTICIPANT_ROADMAPS) as (keyof typeof PARTICIPANT_ROADMAPS)[];

export default function Cohort1Client({ intake, isAdmin = false }: { intake: IntakeAnswers & { payment_email?: string | null; submitted_at?: string | null }; isAdmin?: boolean }) {
  const [activeParticipant, setActiveParticipant] = useState<string>(PARTICIPANT_KEYS[0]);

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
            href="/participant/courses/cohort-1/session-1"
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
          <TabsTrigger value="roadmap">My Roadmap</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
        </TabsList>

        <TabsContents>
          {/* ── Overview ── */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
              {weeks.map((w, weekIdx) => {
                return (
                  <div
                    key={w.num}
                    className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden flex flex-col"
                  >
                    <div className="px-5 py-4 flex items-start justify-between gap-2" style={{ background: w.color }}>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-1">
                          Week {w.num}
                        </p>
                        <p className="font-serif font-light text-white text-base leading-snug">
                          {w.theme}
                        </p>
                      </div>
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
                        {w.sessions.map((s, j) => (
                          <Link
                            key={s}
                            href={`/participant/courses/cohort-1/session-${2 + weekIdx * 2 + j}`}
                            className="group flex items-start gap-1.5 text-xs text-[var(--taupe-400)] leading-relaxed rounded-md -mx-1 px-1 py-0.5 transition-colors hover:bg-white dark:hover:bg-white/5 hover:text-[var(--charcoal-900)] dark:hover:text-foreground"
                          >
                            <span aria-hidden>·</span>
                            <span className="flex-1">{s}</span>
                            <ArrowRight className="size-3 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* ── Schedule ── */}
          <TabsContent value="schedule">
            <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 overflow-hidden mt-2">
              {sessions.map((s, i) => (
                <Link
                  key={s.tag}
                  href={`/participant/courses/cohort-1/session-${i + 1}`}
                  className={`group grid grid-cols-[auto_1fr] md:grid-cols-[100px_130px_110px_1fr_auto] gap-2 md:gap-4 px-5 py-4 items-center transition-colors hover:bg-[var(--beige-100)] dark:hover:bg-white/[0.04] ${
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
                  <ArrowRight className="hidden md:block size-3.5 text-[var(--taupe-400)] opacity-0 group-hover:opacity-100 transition-opacity justify-self-end" />
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* ── Roadmap ── */}
          <TabsContent value="roadmap">
            {isAdmin ? (
              <div className="pt-2 flex flex-col gap-4">
                {/* Participant switcher */}
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {PARTICIPANT_KEYS.map((k) => {
                    const p = PARTICIPANT_ROADMAPS[k];
                    const active = k === activeParticipant;
                    return (
                      <button
                        key={k}
                        onClick={() => setActiveParticipant(k)}
                        className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium shrink-0 transition-all border"
                        style={{
                          background: active ? p.accentColor : "transparent",
                          color: active ? "white" : "var(--taupe-400)",
                          borderColor: active ? p.accentColor : "var(--beige-200)",
                        }}
                      >
                        <div className="size-5 rounded-full overflow-hidden shrink-0">
                          <Image src={p.photo} alt={p.name} width={20} height={20} className="object-cover w-full h-full" />
                        </div>
                        {p.name}
                      </button>
                    );
                  })}
                </div>
                <RoadmapView data={PARTICIPANT_ROADMAPS[activeParticipant]} labelPrefix={PARTICIPANT_ROADMAPS[activeParticipant].name} />
              </div>
            ) : (
              <div className="pt-2">
                <RoadmapView data={resolveRoadmap(intake)} labelPrefix="Your" />
              </div>
            )}
          </TabsContent>

          {/* ── Onboarding ── */}
          <TabsContent value="onboarding">
            <div className="pt-2">
              <IntakeTab initial={intake} />
            </div>
          </TabsContent>
        </TabsContents>
      </Tabs>

    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, LayoutGrid, Presentation } from "lucide-react";

export type ParticipantIntro = {
  id: string;
  name: string;
  business: string | null;
  oneThing: string | null;
};

const AVATAR_COLORS = [
  "#C4A882",
  "#7D6B5A",
  "#5A7A6B",
  "#6B5A7A",
  "#A07856",
  "#4A7A6B",
  "#8A6B5A",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function Avatar({ name, size = 80 }: { name: string; size?: number }) {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  const color = AVATAR_COLORS[idx];
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-serif font-light text-white"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.36,
        letterSpacing: "-0.01em",
      }}
    >
      {getInitials(name)}
    </div>
  );
}

export default function IntroCarousel({ participants }: { participants: ParticipantIntro[] }) {
  const [mode, setMode] = useState<"grid" | "spotlight">("grid");
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => setIndex((i) => (i - 1 + participants.length) % participants.length), [participants.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % participants.length), [participants.length]);

  useEffect(() => {
    if (mode !== "spotlight") return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setMode("grid");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, next, prev]);

  const current = participants[index];

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--taupe-400)]">
          {participants.length} participant{participants.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("grid")}
            className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-colors ${
              mode === "grid"
                ? "bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] border-transparent"
                : "border-[var(--beige-200)] dark:border-white/10 text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground"
            }`}
          >
            <LayoutGrid className="size-3.5" />
            Grid
          </button>
          <button
            onClick={() => { setMode("spotlight"); setIndex(0); }}
            className={`inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-colors ${
              mode === "spotlight"
                ? "bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] border-transparent"
                : "border-[var(--beige-200)] dark:border-white/10 text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground"
            }`}
          >
            <Presentation className="size-3.5" />
            Spotlight
          </button>
        </div>
      </div>

      {/* Grid */}
      {mode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {participants.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setIndex(i); setMode("spotlight"); }}
              className="text-left rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-5 flex items-start gap-4 hover:border-[var(--clay-500)]/40 hover:shadow-sm transition-all group"
            >
              <Avatar name={p.name} size={48} />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-[var(--charcoal-900)] dark:text-foreground mb-0.5 truncate">
                  {p.name}
                </p>
                {p.business && (
                  <p className="text-xs text-[var(--taupe-400)] line-clamp-2 mb-2">{p.business}</p>
                )}
                {p.oneThing && (
                  <p className="text-xs text-[var(--charcoal-900)]/60 dark:text-foreground/60 line-clamp-2 italic">
                    &ldquo;{p.oneThing}&rdquo;
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Spotlight */}
      {mode === "spotlight" && current && (
        <div className="flex flex-col items-center gap-8">
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {participants.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all ${
                  i === index
                    ? "w-5 h-2 bg-[var(--charcoal-900)] dark:bg-white"
                    : "w-2 h-2 bg-[var(--beige-300)] dark:bg-white/20 hover:bg-[var(--taupe-400)]"
                }`}
              />
            ))}
          </div>

          {/* Card */}
          <div className="w-full max-w-xl rounded-3xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-10 flex flex-col items-center gap-6 shadow-sm">
            <Avatar name={current.name} size={96} />
            <div className="text-center space-y-1">
              <h2 className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground" style={{ fontSize: "1.75rem" }}>
                {current.name}
              </h2>
              {current.business && (
                <p className="text-sm text-[var(--taupe-400)]">{current.business}</p>
              )}
            </div>

            {current.oneThing && (
              <div className="w-full rounded-2xl bg-[var(--beige-50)] dark:bg-background border border-[var(--beige-200)] dark:border-white/5 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--taupe-400)] mb-2">
                  After Week 4, I want to...
                </p>
                <p className="text-base font-light text-[var(--charcoal-900)] dark:text-foreground leading-relaxed italic">
                  &ldquo;{current.oneThing}&rdquo;
                </p>
              </div>
            )}

            <p className="text-xs text-[var(--taupe-400)]">
              {index + 1} of {participants.length}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="inline-flex items-center gap-2 border border-[var(--beige-200)] dark:border-white/10 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground hover:bg-[var(--beige-50)] dark:hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Prev
            </button>
            <button
              onClick={next}
              className="inline-flex items-center gap-2 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] rounded-full px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Next
              <ArrowRight className="size-3.5" />
            </button>
          </div>

          <p className="text-xs text-[var(--taupe-400)]">
            Use arrow keys or click to navigate · Esc to return to grid
          </p>
        </div>
      )}
    </div>
  );
}

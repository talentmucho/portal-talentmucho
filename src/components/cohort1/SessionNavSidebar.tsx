"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";

const BASE = "/participant/courses/cohort-1";

const WEEKS = [
  {
    label: "Pre-course",
    color: "#C4A882",
    sessions: [
      { n: 1, path: `${BASE}/session-1`, title: "Kickoff & orientation" },
      { n: 2, path: `${BASE}/session-2`, title: "Build your Bootcamp Map" },
    ],
  },
  {
    label: "Week 1 · Knowing Claude",
    color: "#C4A882",
    sessions: [
      { n: 3, path: `${BASE}/session-3`, title: "Interface & first conversation" },
      { n: 4, path: `${BASE}/session-4`, title: "Custom instructions" },
    ],
  },
  {
    label: "Week 2 · Delegating to Claude",
    color: "#7D6B5A",
    sessions: [
      { n: 5, path: `${BASE}/session-5`, title: "AI employees — intro" },
      { n: 6, path: `${BASE}/session-6`, title: "Build your AI employee" },
    ],
  },
  {
    label: "Week 3 · Building with Claude",
    color: "#5A7A6B",
    sessions: [
      { n: 7, path: `${BASE}/session-7`, title: "Claude Code — first build" },
      { n: 8, path: `${BASE}/session-8`, title: "Build your dashboard" },
    ],
  },
  {
    label: "Week 4 · Living with Claude",
    color: "#6B5A7A",
    sessions: [
      { n: 9, path: `${BASE}/session-9`, title: "Full Claude stack" },
      { n: 10, path: `${BASE}/session-10`, title: "Graduation & showcase" },
    ],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SessionNavSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "fixed lg:static inset-y-0 left-0 z-40",
          "w-60 xl:w-64 shrink-0 flex flex-col",
          "bg-white dark:bg-[var(--card)]",
          "border-r border-[var(--beige-200)] dark:border-white/5",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Header */}
        <div className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-[var(--beige-200)] dark:border-white/5">
          <Link
            href="/participant"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span className="font-medium text-[var(--charcoal-900)] dark:text-foreground">Cohort 1</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden size-8 flex items-center justify-center rounded-lg hover:bg-[var(--beige-100)] dark:hover:bg-white/5 transition-colors text-[var(--taupe-400)]"
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5 tm-scrollbar">
          {WEEKS.map((week) => (
            <div key={week.label}>
              <div className="flex items-center gap-2 px-1 mb-1.5">
                <span
                  className="size-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: week.color }}
                />
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)]">
                  {week.label}
                </p>
              </div>
              <ul className="space-y-0.5">
                {week.sessions.map((session) => {
                  const isActive = pathname === session.path;
                  return (
                    <li key={session.n}>
                      <Link
                        href={session.path}
                        onClick={onClose}
                        className={[
                          "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors",
                          isActive
                            ? "bg-[var(--beige-100)] dark:bg-white/10 text-[var(--charcoal-900)] dark:text-foreground font-medium"
                            : "text-[var(--taupe-400)] hover:bg-[var(--beige-50)] dark:hover:bg-white/5 hover:text-[var(--charcoal-900)] dark:hover:text-foreground",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "size-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-semibold",
                            isActive
                              ? "bg-[var(--charcoal-900)] dark:bg-white text-white dark:text-[var(--charcoal-900)]"
                              : "bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)] border border-[var(--beige-200)] dark:border-white/10",
                          ].join(" ")}
                        >
                          {session.n}
                        </span>
                        <span className="leading-tight line-clamp-2 text-[13px]">
                          {session.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="shrink-0 px-4 py-3 border-t border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between">
          <p className="text-[11px] text-[var(--taupe-400)] font-light">June 2026 · 10 sessions</p>
          <ThemeTogglerButton
            variant="ghost"
            size="sm"
            modes={["light", "dark", "system"]}
            className="size-7 text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground hover:bg-[var(--beige-100)] dark:hover:bg-white/5"
          />
        </div>
      </aside>
    </>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, X, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/animate-ui/components/animate/tooltip";

const BASE = "/participant/courses/cohort-1";

const WEEKS = [
  {
    label: "Pre-course",
    color: "#C4A882",
    sessions: [
      { n: 1, path: `${BASE}/session-1`, title: "Kickoff & orientation" },
    ],
  },
  {
    label: "Week 1 · Knowing Claude",
    color: "#C4A882",
    sessions: [
      { n: 2, path: `${BASE}/session-2`, title: "Interface & first conversation" },
      { n: 3, path: `${BASE}/session-3`, title: "Custom instructions" },
    ],
  },
  {
    label: "Week 2 · Delegating to Claude",
    color: "#7D6B5A",
    sessions: [
      { n: 4, path: `${BASE}/session-4`, title: "AI employees — intro" },
      { n: 5, path: `${BASE}/session-5`, title: "Build your AI employee" },
    ],
  },
  {
    label: "Week 3 · Building with Claude",
    color: "#5A7A6B",
    sessions: [
      { n: 6, path: `${BASE}/session-6`, title: "Claude Code — first build" },
      { n: 7, path: `${BASE}/session-7`, title: "Build your dashboard" },
    ],
  },
  {
    label: "Week 4 · Living with Claude",
    color: "#6B5A7A",
    sessions: [
      { n: 8, path: `${BASE}/session-8`, title: "Full Claude stack" },
      { n: 9, path: `${BASE}/session-9`, title: "Graduation & showcase" },
    ],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function SessionNavSidebar({ isOpen, onClose, collapsed = false, onToggleCollapse }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className="h-full flex flex-col rounded-r-3xl md:rounded-3xl overflow-hidden bg-white dark:bg-[var(--card)] border border-[var(--beige-200)] dark:border-white/5"
      style={{
        boxShadow: "0 8px 32px -4px rgb(0 0 0 / 0.08), inset -1px 0 0 rgb(255 255 255 / 0.02)",
      }}
    >
      {/* Header */}
      <div
        className={[
          "shrink-0 flex items-center border-b border-[var(--beige-200)] dark:border-white/5",
          collapsed ? "flex-col gap-3 py-4 justify-center" : "h-14 px-4 justify-between"
        ].join(" ")}
      >
        {collapsed ? (
          <>
            <Link
              href="/participant"
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-[var(--beige-100)] dark:hover:bg-white/5 text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground"
              aria-label="Back to dashboard"
              title="Back to dashboard"
            >
              <ArrowLeft className="size-4" />
            </Link>
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden md:flex w-8 h-8 rounded-xl items-center justify-center transition-colors hover:bg-[var(--beige-100)] dark:hover:bg-white/5 text-[var(--taupe-400)]"
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <PanelLeftOpen className="size-4" />
              </button>
            )}
          </>
        ) : (
          <>
            <Link
              href="/participant"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span className="font-medium text-[var(--charcoal-900)] dark:text-foreground">Cohort 1</span>
            </Link>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={onClose}
                className="lg:hidden size-8 flex items-center justify-center rounded-lg hover:bg-[var(--beige-100)] dark:hover:bg-white/5 transition-colors text-[var(--taupe-400)]"
                aria-label="Close navigation"
              >
                <X className="size-4" />
              </button>
              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className="hidden md:flex w-8 h-8 rounded-xl items-center justify-center transition-colors hover:bg-[var(--beige-100)] dark:hover:bg-white/5 text-[var(--taupe-400)]"
                  aria-label="Collapse sidebar"
                  title="Collapse sidebar"
                >
                  <PanelLeftClose className="size-4" />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5 tm-scrollbar">
        <TooltipProvider>
          {WEEKS.map((week) => (
            <div key={week.label}>
              <div className={collapsed ? "flex justify-center mb-1.5" : "flex items-center gap-2 px-1 mb-1.5"}>
                <span
                  className="size-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: week.color }}
                />
                {!collapsed && (
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)]">
                    {week.label}
                  </p>
                )}
              </div>
              <ul className="space-y-0.5">
                {week.sessions.map((session) => {
                  const isActive = pathname === session.path;
                  const linkContent = (
                    <Link
                      href={session.path}
                      onClick={onClose}
                      className={[
                        "flex items-center rounded-xl text-sm transition-all duration-150",
                        collapsed ? "justify-center px-0 w-full py-2" : "gap-3 px-3 py-2",
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
                      {!collapsed && (
                        <span className="leading-tight line-clamp-2 text-[13px]">
                          {session.title}
                        </span>
                      )}
                    </Link>
                  );

                  return (
                    <li key={session.n}>
                      {collapsed ? (
                        <Tooltip side="right">
                          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                          <TooltipContent>{session.title}</TooltipContent>
                        </Tooltip>
                      ) : (
                        linkContent
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </TooltipProvider>
      </nav>

      {/* Footer */}
      <div
        className={[
          "shrink-0 py-3 border-t border-[var(--beige-200)] dark:border-white/5 flex items-center",
          collapsed ? "justify-center px-2" : "justify-between px-4"
        ].join(" ")}
      >
        {!collapsed && (
          <p className="text-[11px] text-[var(--taupe-400)] font-light">June 2026 · 9 sessions</p>
        )}
        <ThemeTogglerButton
          variant="ghost"
          size="sm"
          modes={["light", "dark", "system"]}
          className="size-7 text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground hover:bg-[var(--beige-100)] dark:hover:bg-white/5"
        />
      </div>
    </aside>
  );
}

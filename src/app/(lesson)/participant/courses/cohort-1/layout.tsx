
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { SessionNavSidebar } from "@/components/cohort1/SessionNavSidebar";

export default function Cohort1Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-[var(--beige-50)] dark:bg-[var(--card)] md:p-3 md:gap-3">
      {/* Mobile backdrop */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar — drawer on mobile, floating on desktop */}
      <div
        className={[
          "fixed inset-y-0 left-0 z-50 w-64",
          sidebarCollapsed
            ? "md:relative md:z-auto md:w-16 md:shrink-0 md:inset-auto"
            : "md:relative md:z-auto md:w-60 xl:md:w-64 md:shrink-0 md:inset-auto",
          "transition-[width,transform] duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <SessionNavSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        />
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden gap-0 md:gap-3">
        {/* Mobile top bar */}
        <div className="md:hidden h-11 shrink-0 flex items-center gap-3 px-4 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="size-8 flex items-center justify-center rounded-lg hover:bg-[var(--beige-100)] dark:hover:bg-white/5 transition-colors text-[var(--taupe-400)]"
            aria-label="Open navigation"
          >
            <Menu className="size-4" />
          </button>
          <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">
            Cohort 1 · June 2026
          </p>
        </div>

        {/* Main lesson content */}
        <main
          className="flex-1 overflow-hidden bg-white dark:bg-[var(--charcoal-900)] md:rounded-3xl md:border md:border-[var(--beige-200)] dark:md:border-[var(--border)]"
          style={{ boxShadow: "0 2px 16px -2px rgb(61 53 46 / 0.06)" }}
        >
          <div className="h-full overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { ParticipantSidebar } from "./participant-sidebar";

interface Props {
  fullName: string;
  email: string;
  children: React.ReactNode;
}

export function ParticipantShell({ fullName, email, children }: Props) {
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

      {/* Sidebar ,  always dark, drawer on mobile */}
      <div
        className={[
          "fixed inset-y-0 left-0 z-50 w-72",
          sidebarCollapsed
            ? "md:relative md:z-auto md:w-16 md:shrink-0 md:inset-auto"
            : "md:relative md:z-auto md:w-60 md:shrink-0 md:inset-auto",
          "transition-[width,transform] duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <ParticipantSidebar
          fullName={fullName}
          email={email}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        />
      </div>

      {/* Right col */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden gap-0 md:gap-3">
        {/* Mobile Header */}
        <header className="md:hidden shrink-0 h-14 px-4 flex items-center bg-white dark:bg-[var(--charcoal-900)] border-b border-[var(--beige-200)] dark:border-[var(--border)]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 -ml-2 rounded-xl flex items-center justify-center transition-all hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </header>

        {/* Main ,  white on light / card on dark */}
        <main className="flex-1 overflow-hidden bg-white dark:bg-[var(--charcoal-900)] md:rounded-3xl md:border md:border-[var(--beige-200)] dark:md:border-[var(--border)]"
          style={{ boxShadow: "0 2px 16px -2px rgb(61 53 46 / 0.06)" }}
        >
          <div className="tm-scrollbar h-full overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { SessionNavSidebar } from "@/components/cohort1/SessionNavSidebar";

export default function Cohort1Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-[var(--beige-50)] dark:bg-background">
      <SessionNavSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden h-11 shrink-0 flex items-center gap-3 px-4 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
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

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}

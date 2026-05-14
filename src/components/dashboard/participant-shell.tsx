"use client";

import { useState } from "react";
import { ParticipantSidebar } from "./participant-sidebar";
import { ParticipantTopbar } from "./participant-topbar";

interface Props {
  fullName: string;
  email: string;
  children: React.ReactNode;
}

export function ParticipantShell({ fullName, email, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

      {/* Sidebar — always dark, drawer on mobile */}
      <div
        className={[
          "fixed inset-y-0 left-0 z-50 w-72",
          "md:relative md:z-auto md:w-60 md:shrink-0 md:inset-auto",
          "transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <ParticipantSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Right col */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden gap-0 md:gap-3">
        <ParticipantTopbar
          fullName={fullName}
          email={email}
          onMenuClick={() => setSidebarOpen((o) => !o)}
        />
        {/* Main — white on light / card on dark */}
        <main className="tm-scrollbar flex-1 overflow-y-auto bg-white dark:bg-[var(--charcoal-900)] md:rounded-3xl md:border md:border-[var(--beige-200)] dark:md:border-[var(--border)]"
          style={{ boxShadow: "0 2px 16px -2px rgb(61 53 46 / 0.06)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

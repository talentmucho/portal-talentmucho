import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full flex flex-col p-4 sm:p-6 md:p-8 animate-pulse">
      {/* Header */}
      <div className="px-5 pt-6 pb-0 sm:px-8 sm:pt-8">
        <div className="h-4 w-16 bg-[var(--beige-200)] dark:bg-white/10 rounded mb-3" />
        <div className="h-10 w-32 bg-[var(--beige-200)] dark:bg-white/10 rounded mb-3" />
        <div className="h-4 w-64 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
      </div>

      <div className="my-8 h-px bg-gradient-to-r from-transparent via-[var(--beige-200)] dark:via-white/10 to-transparent" />

      {/* Tabs */}
      <div className="flex-1 min-h-0 px-5 sm:px-8 pb-8 flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Nav */}
        <div className="w-full md:w-44 md:shrink-0 flex flex-row md:flex-col gap-2 p-1.5">
          <div className="h-10 md:h-11 w-full bg-[var(--beige-200)] dark:bg-white/10 rounded-lg" />
          <div className="h-10 md:h-11 w-full bg-[var(--beige-200)] dark:bg-white/10 rounded-lg opacity-50" />
          <div className="h-10 md:h-11 w-full bg-[var(--beige-200)] dark:bg-white/10 rounded-lg opacity-50" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-[var(--card)] p-5 sm:p-6">
            <div className="h-6 w-24 bg-[var(--beige-200)] dark:bg-white/10 rounded mb-5" />
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="h-4 w-20 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
                <div className="h-12 w-full bg-[var(--beige-200)] dark:bg-white/10 rounded-lg" />
              </div>
              <div className="h-10 w-32 bg-[var(--beige-200)] dark:bg-white/10 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

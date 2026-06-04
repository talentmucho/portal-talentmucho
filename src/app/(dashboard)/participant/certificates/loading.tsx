import { Award } from "lucide-react";

export default function Loading() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-8 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-4 w-24 bg-[var(--beige-200)] dark:bg-white/10 rounded mb-3" />
        <div className="h-10 w-56 bg-[var(--beige-200)] dark:bg-white/10 rounded mb-3" />
        <div className="h-4 w-48 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-6 flex flex-col gap-4 h-[192px]"
          >
            {/* Icon */}
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[var(--beige-200)] dark:bg-white/10" />
              <div className="h-3 w-20 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
            </div>

            {/* Course */}
            <div className="flex-1 space-y-2 mt-2">
              <div className="h-3 w-16 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
              <div className="h-5 w-3/4 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between">
              <div className="h-3 w-24 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
              <div className="h-3 w-12 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

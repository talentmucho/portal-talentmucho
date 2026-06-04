import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-8 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-4 w-16 bg-[var(--beige-200)] dark:bg-white/10 rounded mb-3" />
        <div className="h-10 w-48 bg-[var(--beige-200)] dark:bg-white/10 rounded mb-3" />
        <div className="h-4 w-40 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
      </div>

      {/* Enrolled */}
      <section className="flex flex-col gap-4">
        <div className="h-4 w-20 bg-[var(--beige-200)] dark:bg-white/10 rounded mb-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-6 flex flex-col gap-3 h-[180px]"
            >
              <div className="flex items-center justify-between">
                <div className="h-3 w-16 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
                <BookOpen className="size-4 text-[var(--beige-200)] dark:text-white/10" />
              </div>
              <div className="flex-1 space-y-2 mt-2">
                <div className="h-5 w-full bg-[var(--beige-200)] dark:bg-white/10 rounded" />
                <div className="h-4 w-3/4 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
              </div>
              <div className="pt-2 border-t border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between">
                <div className="h-3 w-16 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
                <div className="h-3 w-20 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Locked */}
      <section className="flex flex-col gap-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--beige-200)] dark:via-white/10 to-transparent mt-4 mb-2" />
        <div className="h-4 w-24 bg-[var(--beige-200)] dark:bg-white/10 rounded mb-2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
             <div
             key={i}
             className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-6 flex flex-col gap-3 h-[180px] opacity-50"
           >
             <div className="flex items-center justify-between">
               <div className="h-3 w-16 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
               <BookOpen className="size-4 text-[var(--beige-200)] dark:text-white/10" />
             </div>
             <div className="flex-1 space-y-2 mt-2">
               <div className="h-5 w-full bg-[var(--beige-200)] dark:bg-white/10 rounded" />
               <div className="h-4 w-3/4 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
             </div>
             <div className="pt-2 border-t border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between">
               <div className="h-3 w-16 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
               <div className="h-3 w-12 bg-[var(--beige-200)] dark:bg-white/10 rounded" />
             </div>
           </div>
          ))}
        </div>
      </section>
    </div>
  );
}

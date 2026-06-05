import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { BookOpen, Lock, ArrowRight } from "lucide-react";

export default async function MyCoursesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = user?.app_metadata?.role || user?.user_metadata?.role;
  const isAdmin = role === "admin";

  const [coursesRes, enrollmentsRes] = await Promise.all([
    supabase
      .from("courses")
      .select("id, title, description, slug")
      .eq("is_published", true)
      .order("order_index"),
    isAdmin
      ? Promise.resolve({ data: [] })
      : supabase
          .from("enrollments")
          .select("course_id")
          .eq("participant_id", user?.id ?? ""),
  ]);

  const courses = coursesRes.data ?? [];
  const enrolledIds = isAdmin
    ? new Set(courses.map((c) => c.id))
    : new Set((enrollmentsRes.data ?? []).map((e) => e.course_id));

  const enrolled = courses.filter((c) => enrolledIds.has(c.id));
  const locked = courses.filter((c) => !enrolledIds.has(c.id));

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <div>
        <span className="tm-eyebrow block mb-2">Learning</span>
        <h1
          className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
        >
          My Courses
        </h1>
        <p className="tm-body-sm mt-1">
          {enrolled.length} of {courses.length} courses enrolled.
        </p>
      </div>

      {/* Enrolled */}
      {enrolled.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--taupe-400)]">
            Enrolled
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolled.map((course) => (
              <Link
                key={course.id}
                href={`/participant/courses/${course.slug}`}
                className="group rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-6 flex flex-col gap-3 hover:shadow-md hover:border-[var(--beige-300)] dark:hover:border-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="tm-eyebrow">{course.slug}</span>
                  <BookOpen className="size-4 text-[var(--taupe-400)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground text-base leading-snug">
                    {course.title}
                  </h3>
                  {course.description && (
                    <p className="tm-body-sm mt-1 line-clamp-2">{course.description}</p>
                  )}
                </div>
                <div className="pt-2 border-t border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between text-xs text-[var(--taupe-400)]">
                  <span>8 modules</span>
                  <span className="inline-flex items-center gap-1 group-hover:underline">
                    View course <ArrowRight className="size-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {enrolled.length === 0 && (
        <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-10 text-center">
          <BookOpen className="size-8 mx-auto mb-3 text-[var(--beige-300)]" />
          <p className="text-sm text-[var(--taupe-400)]">
            No courses enrolled yet. Contact your admin to get access.
          </p>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <section className="flex flex-col gap-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--beige-200)] dark:via-white/10 to-transparent" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--taupe-400)]">
            Not enrolled
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locked.map((course) => (
              <div
                key={course.id}
                className="relative rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-100)] dark:bg-[var(--card)] p-6 flex flex-col gap-3 opacity-50 select-none"
              >
                <div className="absolute inset-0 rounded-2xl flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "var(--charcoal-900)" }}
                    >
                      <Lock className="size-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-[var(--charcoal-900)] dark:text-foreground bg-[var(--beige-50)] dark:bg-[var(--card)] px-2 py-0.5 rounded-full border border-[var(--beige-200)] dark:border-white/10">
                      No access
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="tm-eyebrow">{course.slug}</span>
                  <BookOpen className="size-4 text-[var(--taupe-400)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground text-base leading-snug">
                    {course.title}
                  </h3>
                  {course.description && (
                    <p className="tm-body-sm mt-1 line-clamp-2">{course.description}</p>
                  )}
                </div>
                <div className="pt-2 border-t border-[var(--beige-200)] dark:border-white/5 flex items-center justify-between text-xs text-[var(--taupe-400)]">
                  <span>8 modules</span>
                  <span>Locked</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

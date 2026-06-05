"use client";

import { useOptimistic, useTransition } from "react";
import { X, BookOpen, Award, User, CheckCircle, Lock, Unlock } from "lucide-react";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { toggleEnrollment } from "@/app/actions/enrollment";
import { issueCertificate, revokeCertificate } from "@/app/actions/certificates";
import { toast } from "sonner";
import { type Participant, type Course } from "./columns";
import { type IntakeResponse } from "./responses-table";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

interface Props {
  open: boolean;
  onClose: () => void;
  participant: Participant | null;
  courses: Course[];
  intakeResponses: IntakeResponse[];
}

const FOCUS_LABELS: Record<string, string> = {
  ops: "Operations & inbox",
  voice: "Voice & content",
  client: "Client work",
  sales: "Sales & leads",
};

const ROLE_LABELS: Record<string, string> = {
  inbox_triage: "Inbox Triage",
  lead_qualifier: "Lead Qualifier",
  content_reviewer: "Content Reviewer",
  custom: "Custom",
};

const METRIC_LABELS: Record<string, string> = {
  revenue: "Revenue this month",
  leads: "New leads",
  time_per_workflow: "Time per workflow",
  active_clients: "Active clients",
  content_engagement: "Content engagement",
  custom: "Custom",
};

const PEAK_LABELS: Record<string, string> = {
  morning: "Morning (6–10 AM)",
  mid_morning: "Mid-morning (10 AM–1 PM)",
  afternoon: "Afternoon (1–5 PM)",
  evening: "Evening (5–9 PM)",
  late_night: "Late night (9 PM+)",
};

const VOICE_LABELS: Record<string, string> = {
  mine: "Mine (personal brand)",
  company: "My company's",
  both: "Both",
};

function DetailField({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="bg-[var(--beige-50)] dark:bg-white/[0.02] border border-[var(--beige-200)]/60 dark:border-white/5 rounded-xl p-3.5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--taupe-400)] block mb-1.5">
        {label}
      </span>
      <div className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
        {value}
      </div>
    </div>
  );
}

export function ParticipantDetailPanel({
  open,
  onClose,
  participant,
  courses,
  intakeResponses,
}: Props) {
  // Find onboarding response matching user_id
  const response = participant
    ? intakeResponses.find((r) => r.user_id === participant.id)
    : null;

  const [isPendingAccess, startTransitionAccess] = useTransition();
  const [optimisticAccessIds, updateOptimisticAccess] = useOptimistic(
    participant?.enrolledCourseIds ?? [],
    (state: string[], courseId: string) =>
      state.includes(courseId)
        ? state.filter((id) => id !== courseId)
        : [...state, courseId]
  );

  const [isPendingCert, startTransitionCert] = useTransition();
  const [optimisticCertIds, updateOptimisticCert] = useOptimistic(
    participant?.certificateCourseIds ?? [],
    (state: string[], courseId: string) =>
      state.includes(courseId)
        ? state.filter((id) => id !== courseId)
        : [...state, courseId]
  );

  if (!participant) return null;

  const initials = participant.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const enrolledCourses = courses.filter((c) =>
    optimisticAccessIds.includes(c.id)
  );

  function handleToggleAccess(courseId: string) {
    startTransitionAccess(async () => {
      updateOptimisticAccess(courseId);
      const res = await toggleEnrollment(participant!.id, courseId);
      if (res?.error) {
        toast.error(res.error);
      } else {
        const enrolled = !optimisticAccessIds.includes(courseId);
        toast.success(
          enrolled ? "Enrolled in course" : "Removed from course"
        );
      }
    });
  }

  function handleToggleCert(courseId: string) {
    const hasCert = optimisticCertIds.includes(courseId);
    startTransitionCert(async () => {
      updateOptimisticCert(courseId);
      const res = hasCert
        ? await revokeCertificate(participant!.id, courseId)
        : await issueCertificate(participant!.id, courseId);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(
          hasCert ? "Revoked certificate" : "Issued certificate"
        );
      }
    });
  }

  // (Metrics mapping removed, rendering moved directly into JSX using pills)

  return (
    <Drawer direction="right" open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="h-full flex flex-col p-0 data-[vaul-drawer-direction=right]:sm:max-w-md md:data-[vaul-drawer-direction=right]:sm:max-w-lg border-l border-[var(--beige-200)] dark:border-white/10 bg-white dark:bg-[var(--card)] shadow-2xl">
        {/* Header */}
        <DrawerHeader className="p-6 border-b border-[var(--beige-200)] dark:border-white/10 flex items-center justify-between bg-[var(--beige-50)] dark:bg-[var(--muted)]/50 shrink-0 flex-row">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold text-white bg-[var(--charcoal-900)] dark:bg-[var(--accent)] dark:text-foreground">
              {initials}
            </div>
            <div className="min-w-0">
              <DrawerTitle className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground truncate leading-snug">
                {participant.name}
              </DrawerTitle>
              <DrawerDescription className="text-xs text-[var(--taupe-400)] truncate">
                {participant.email}
              </DrawerDescription>
            </div>
          </div>
          <DrawerClose asChild>
            <button
              className="p-1.5 rounded-xl border border-[var(--beige-200)] dark:border-white/10 hover:bg-[var(--beige-100)] dark:hover:bg-white/5 text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-all cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Profile Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--beige-50)] dark:bg-white/[0.02] p-3 rounded-xl border border-[var(--beige-200)]/60 dark:border-white/5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--taupe-400)] block">
                Role
              </span>
              <span className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">
                Participant
              </span>
            </div>
            <div className="bg-[var(--beige-50)] dark:bg-white/[0.02] p-3 rounded-xl border border-[var(--beige-200)]/60 dark:border-white/5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--taupe-400)] block">
                Joined
              </span>
              <span className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">
                {new Date(participant.enrolledAt).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" }
                )}
              </span>
            </div>
          </div>

          {/* Course Access Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 text-[var(--clay-500)]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--charcoal-900)] dark:text-foreground">
                Course Access
              </h4>
              <span className="text-[10px] font-semibold text-[var(--taupe-400)] bg-[var(--beige-100)] dark:bg-white/5 px-2 py-0.5 rounded-full ml-auto">
                {optimisticAccessIds.length} of {courses.length}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {courses.length === 0 && (
                <p className="text-xs text-[var(--taupe-400)] py-4 text-center">
                  No courses available.
                </p>
              )}
              {courses.map((course) => {
                const enrolled = optimisticAccessIds.includes(course.id);
                return (
                  <label
                    key={course.id}
                    className={[
                      "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                      enrolled
                        ? "border-[var(--clay-500)]/30 bg-[rgb(125_107_90/0.04)] dark:bg-[var(--clay-500)]/5"
                        : "border-[var(--beige-200)] dark:border-white/5 hover:border-[var(--taupe-400)]/40 hover:bg-[var(--beige-50)]/50 dark:hover:bg-white/[0.01]",
                    ].join(" ")}
                  >
                    <Checkbox
                      checked={enrolled}
                      onCheckedChange={() => handleToggleAccess(course.id)}
                      disabled={isPendingAccess}
                      className="shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground leading-snug truncate">
                        {course.title}
                      </p>
                      <p className="text-[10px] text-[var(--taupe-400)] uppercase tracking-wider">
                        {course.slug}
                      </p>
                    </div>
                    {enrolled ? (
                      <Unlock className="size-3.5 shrink-0 text-[var(--clay-500)]" />
                    ) : (
                      <Lock className="size-3.5 shrink-0 text-[var(--taupe-400)]/50" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Certificates Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="size-4 text-[var(--clay-500)]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--charcoal-900)] dark:text-foreground">
                Certificates
              </h4>
              <span className="text-[10px] font-semibold text-[var(--taupe-400)] bg-[var(--beige-100)] dark:bg-white/5 px-2 py-0.5 rounded-full ml-auto">
                {optimisticCertIds.length} issued
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {enrolledCourses.length === 0 ? (
                <div className="border border-dashed border-[var(--beige-200)] dark:border-white/5 rounded-xl p-5 text-center">
                  <p className="text-xs text-[var(--taupe-400)]">
                    Enroll participant in courses to manage certificates.
                  </p>
                </div>
              ) : (
                enrolledCourses.map((course) => {
                  const certified = optimisticCertIds.includes(course.id);
                  return (
                    <label
                      key={course.id}
                      className={[
                        "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                        certified
                          ? "border-[var(--clay-500)]/30 bg-[rgb(125_107_90/0.04)] dark:bg-[var(--clay-500)]/5"
                          : "border-[var(--beige-200)] dark:border-white/5 hover:border-[var(--taupe-400)]/40 hover:bg-[var(--beige-50)]/50 dark:hover:bg-white/[0.01]",
                      ].join(" ")}
                    >
                      <Checkbox
                        checked={certified}
                        onCheckedChange={() => handleToggleCert(course.id)}
                        disabled={isPendingCert}
                        className="shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground leading-snug truncate">
                          {course.title}
                        </p>
                        <p className="text-[10px] text-[var(--taupe-400)] uppercase tracking-wider">
                          {course.slug}
                        </p>
                      </div>
                      {certified ? (
                        <Award className="size-3.5 shrink-0 text-[var(--clay-500)]" />
                      ) : (
                        <CheckCircle className="size-3.5 shrink-0 text-[var(--taupe-400)]/30" />
                      )}
                    </label>
                  );
                })
              )}
            </div>
          </div>

          {/* Onboarding Responses Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="size-4 text-[var(--clay-500)]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--charcoal-900)] dark:text-foreground">
                Onboarding Responses
              </h4>
            </div>

            {!response ? (
              <div className="border border-dashed border-[var(--beige-200)] dark:border-white/5 rounded-xl p-5 text-center">
                <p className="text-xs text-[var(--taupe-400)]">
                  No onboarding profile found for this participant.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                <DetailField
                  label="Payment Email"
                  value={response.payment_email}
                />
                <DetailField
                  label="Focus Area"
                  value={FOCUS_LABELS[response.first_focus ?? ""] ?? response.first_focus}
                />
                <DetailField
                  label="Business Description"
                  value={response.business_oneliner}
                />
                <DetailField
                  label="AI Employee Role"
                  value={
                    response.ai_employee_role === "custom" && response.ai_employee_custom
                      ? `Custom: ${response.ai_employee_custom}`
                      : ROLE_LABELS[response.ai_employee_role ?? ""] ?? response.ai_employee_role
                  }
                />
                <DetailField
                  label="Voice Owner"
                  value={VOICE_LABELS[response.voice_owner ?? ""] ?? response.voice_owner}
                />
                <DetailField
                  label="Dashboard Metrics"
                  value={
                    response.dashboard_metrics && response.dashboard_metrics.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 mt-0.5">
                        {response.dashboard_metrics.map((m) => {
                          const isCustom = m === "custom" && response.dashboard_custom;
                          const text = isCustom ? `Custom: ${response.dashboard_custom}` : METRIC_LABELS[m] ?? m;
                          return (
                            <span key={m} className="inline-flex items-center px-2 py-1 rounded-md bg-[var(--beige-200)] dark:bg-white/10 text-xs font-medium text-[var(--charcoal-900)] dark:text-foreground">
                              {text}
                            </span>
                          );
                        })}
                      </div>
                    ) : null
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <DetailField
                    label="Operating System"
                    value={response.os ? response.os.toUpperCase() : null}
                  />
                  <DetailField label="Timezone" value={response.timezone} />
                </div>
                <DetailField
                  label="Peak Work Hour"
                  value={PEAK_LABELS[response.peak_time ?? ""] ?? response.peak_time}
                />
                <DetailField
                  label="Goal from Bootcamp"
                  value={response.one_thing}
                />
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

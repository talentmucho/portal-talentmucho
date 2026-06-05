"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight,
  Apple, BarChart3, Building2, Clock, Inbox, Layers,
  Mail, Monitor, PenLine, Sparkles, Target, TrendingUp,
  User, UserPlus, Users,
} from "lucide-react";
import { toast } from "sonner";
import Stepper, { Step } from "@/components/Stepper";
import { saveIntakeResponses } from "@/app/actions/intake";

type Answers = Record<string, string | string[] | undefined>;

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Apple, BarChart3, Building2, Clock, Inbox, Layers,
  Mail, Monitor, PenLine, Sparkles, Target, TrendingUp,
  User, UserPlus, Users,
};

const SECTIONS_PROGRESS = [
  { id: "who",       color: "#C4A882", start: 1, end: 1  },
  { id: "projects",  color: "#C4A882", start: 2, end: 4  },
  { id: "employee",  color: "#7D6B5A", start: 5, end: 5  },
  { id: "dashboard", color: "#5A7A6B", start: 6, end: 7  },
  { id: "ritual",    color: "#6B5A7A", start: 8, end: 9  },
];

const TOTAL_STEPS = 9;

const STEP_VALIDATORS: ((a: Answers) => boolean)[] = [
  (a) => !!(a.payment_email as string)?.trim(),
  (a) => !!(a.business_oneliner as string)?.trim(),
  (a) => !!(a.first_focus as string),
  (a) => !!(a.voice_owner as string),
  (a) =>
    !!(a.ai_employee_role as string) &&
    ((a.ai_employee_role as string) !== "custom" ||
      !!(a.ai_employee_custom as string)?.trim()),
  (a) => ((a.dashboard_metrics as string[]) ?? []).length > 0,
  (a) => !!(a.os as string),
  (a) => !!(a.timezone as string)?.trim() && !!(a.peak_time as string),
  (a) => !!(a.one_thing as string)?.trim(),
];

const inputCls =
  "w-full bg-white dark:bg-[var(--card)] border border-[var(--beige-300)] dark:border-white/10 " +
  "focus:border-[var(--clay-500)] focus:ring-2 focus:ring-[var(--clay-500)]/20 outline-none " +
  "rounded-2xl px-5 py-4 text-lg font-light text-[var(--charcoal-900)] dark:text-foreground " +
  "placeholder:text-[var(--taupe-400)]/60 transition-all";

const cardInnerStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  boxShadow: "var(--shadow-md)",
  background: "var(--card)",
};

export default function CohortIntakeForm({
  nextPath = "/participant/courses/cohort-1",
  prevPath,
  onboardingMode = false,
}: {
  nextPath?: string;
  prevPath?: string;
  onboardingMode?: boolean;
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(false);

  async function handleComplete() {
    setSaving(true);
    const { error } = await saveIntakeResponses({
      payment_email: answers.payment_email as string,
      business_oneliner: answers.business_oneliner as string,
      first_focus: answers.first_focus as string,
      voice_owner: answers.voice_owner as string,
      ai_employee_role: answers.ai_employee_role as string,
      ai_employee_custom: answers.ai_employee_custom as string,
      dashboard_metrics: answers.dashboard_metrics as string[],
      dashboard_custom: answers.dashboard_custom as string,
      os: answers.os as string,
      timezone: answers.timezone as string,
      peak_time: answers.peak_time as string,
      one_thing: answers.one_thing as string,
    });
    setSaving(false);
    if (error) {
      toast.error("Couldn't save your answers. Please try again.");
      return;
    }
    if (onboardingMode) {
      setCompleted(true);
    } else {
      router.push(nextPath);
    }
  }

  const setAnswer = (id: string, value: string | string[]) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const stepValid = STEP_VALIDATORS[currentStep - 1]?.(answers) ?? true;

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) setAnswer("timezone", tz);
    } catch {}
  }, []);

  if (onboardingMode && completed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[var(--beige-50)] dark:bg-background">
        <div className="w-full max-w-md text-center flex flex-col items-center gap-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "#C4A88222", border: "2px solid #C4A882" }}
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--clay-500)]">
              You&apos;re all set
            </p>
            <h1
              className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              Thanks for completing your onboarding
            </h1>
          </div>
          <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed max-w-sm">
            We&apos;ve received your answers. Our team will review your application and give you access to the course within <strong className="text-[var(--charcoal-900)] dark:text-foreground font-medium">24 hours</strong>.
          </p>
          <p className="text-sm text-[var(--taupe-400)] font-light leading-relaxed max-w-sm">
            Keep an eye on your inbox ,  we&apos;ll send you a confirmation email once your access is ready.
          </p>
          <Link
            href="/participant"
            className="inline-flex items-center gap-2 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity mt-2"
          >
            Go to your dashboard
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[var(--beige-50)] dark:bg-background flex flex-col overflow-hidden min-h-0 relative">
      {saving && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--clay-500)] border-t-transparent animate-spin" />
            <p className="text-sm text-[var(--taupe-400)] font-light">Saving your answers…</p>
          </div>
        </div>
      )}

      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)]">
        {onboardingMode ? (
          <div />
        ) : (
          <Link
            href={prevPath ?? "/participant/courses/cohort-1"}
            className="inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            {prevPath ? "Back to session 1" : "Back to course"}
          </Link>
        )}
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--clay-500)]">
            {onboardingMode ? "TalentMucho · Getting Started" : "Cohort 1 · Bootcamp Map"}
          </p>
          <p className="text-[11px] text-[var(--taupe-400)] tabular-nums">
            {currentStep} / {TOTAL_STEPS}
          </p>
        </div>
      </header>

      {/* Segmented progress bar */}
      <div className="h-1.5 shrink-0 flex gap-px">
        {SECTIONS_PROGRESS.map((sec) => {
          const total = sec.end - sec.start + 1;
          const done = Math.max(0, Math.min(currentStep - sec.start, total));
          const pct = (done / total) * 100;
          return (
            <div key={sec.id} className="flex-1 bg-[var(--beige-200)] dark:bg-white/10 overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${pct}%`, background: sec.color }}
              />
            </div>
          );
        })}
      </div>

      {/* Stepper */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center py-8 px-4">
        <Stepper
          className="w-full max-w-xl"
          stepContainerClassName="hidden"
          stepCircleContainerClassName="max-w-xl rounded-3xl"
          innerStyle={cardInnerStyle}
          contentClassName="!px-0"
          footerClassName="!px-8 !pb-8"
          onStepChange={(s) => setCurrentStep(s)}
          onFinalStepCompleted={handleComplete}
          backButtonProps={{
            className:
              "inline-flex items-center gap-1.5 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors",
          }}
          nextButtonProps={{
            disabled: !stepValid,
            className: [
              "inline-flex items-center gap-2 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-6 py-2.5 rounded-full transition-opacity",
              stepValid ? "hover:opacity-90" : "opacity-40 cursor-not-allowed",
            ].join(" "),
          }}
          backButtonText="← Back"
          nextButtonText="Continue →"
        >

          {/* 1: payment_email */}
          <Step>
            <QHeader color="#C4A882" week={null} label="Hey ,  what's your first name?" why="We'll greet you by name inside your member area and in every email." />
            <input
              type="text"
              className={inputCls}
              value={(answers.first_name as string) ?? ""}
              onChange={(e) => setAnswer("first_name", e.target.value)}
              placeholder="First name"
              maxLength={80}
            />
          </Step>

          {/* 2: email */}
          <Step>
            <QHeader color="#C4A882" week={null} label="What email did you use at checkout?" why="We lock your map to this email so you can come back to it from any device." />
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              className={inputCls}
              value={(answers.payment_email as string) ?? ""}
              onChange={(e) => setAnswer("payment_email", e.target.value)}
              placeholder="you@example.com"
              maxLength={200}
            />
          </Step>

          {/* 2: business_oneliner */}
          <Step>
            <QHeader color="#C4A882" week={onboardingMode ? null : "Week 01"} label="In one line, what does your business do?" why="This becomes the seed knowledge for your Voice & Brand Project in Session 1." />
            <input
              type="text"
              className={inputCls}
              value={(answers.business_oneliner as string) ?? ""}
              onChange={(e) => setAnswer("business_oneliner", e.target.value)}
              placeholder="I help [audience] do [outcome] by [method]"
              maxLength={280}
            />
          </Step>

          {/* 4: first_focus */}
          <Step>
            <QHeader color="#C4A882" week={onboardingMode ? null : "Week 01"} label="Which part of your business gets Claude FIRST?" why="This is the Project we configure live together in Session 1, before anything else." />
            <CardGrid
              options={[
                { value: "ops",    label: "Operations & inbox", hint: "Email, scheduling, recurring admin",       icon: "Inbox"   },
                { value: "voice",  label: "Voice & content",    hint: "Writing in your tone, drafts, posts",      icon: "PenLine" },
                { value: "client", label: "Client work",         hint: "Onboarding, briefs, deliverables",        icon: "Users"   },
                { value: "sales",  label: "Sales & leads",       hint: "Discovery calls, follow-ups, proposals",  icon: "Target"  },
              ]}
              value={(answers.first_focus as string) ?? ""}
              onChange={(v) => setAnswer("first_focus", v)}
              color="#C4A882"
            />
          </Step>

          {/* 5: voice_owner */}
          <Step>
            <QHeader color="#C4A882" week={onboardingMode ? null : "Week 01"} label="Whose voice should Claude learn?" why="We shape your Voice & Brand Project's system prompt around this." />
            <CardGrid
              options={[
                { value: "mine",    label: "Mine",          hint: "Personal brand",                       icon: "User"      },
                { value: "company", label: "My company's",  hint: "Brand voice, not me personally",       icon: "Building2" },
                { value: "both",    label: "Both",          hint: "I write as me AND as the brand",       icon: "Layers"    },
              ]}
              value={(answers.voice_owner as string) ?? ""}
              onChange={(v) => setAnswer("voice_owner", v)}
              color="#C4A882"
            />
          </Step>

          {/* 6: ai_employee_role */}
          <Step>
            <QHeader color="#7D6B5A" week={onboardingMode ? null : "Week 02"} label="If you could hire someone to handle ONE recurring task forever, what would it be?" why="This is the AI employee you'll brief and stress-test live in W2·S4." />
            <CardGrid
              options={[
                { value: "inbox_triage",     label: "Inbox Triage",     hint: "Sorts, labels, and drafts replies",  icon: "Mail"     },
                { value: "lead_qualifier",   label: "Lead Qualifier",    hint: "Scores new leads, flags hot ones",   icon: "Target"   },
                { value: "content_reviewer", label: "Content Reviewer",  hint: "Polishes drafts in your voice",      icon: "PenLine"  },
                { value: "custom",           label: "Something custom",  hint: "You'll describe it",                 icon: "Sparkles" },
              ]}
              value={(answers.ai_employee_role as string) ?? ""}
              onChange={(v) => setAnswer("ai_employee_role", v)}
              color="#7D6B5A"
              customField="ai_employee_custom"
              customValue={(answers.ai_employee_custom as string) ?? ""}
              onCustomChange={(v) => setAnswer("ai_employee_custom", v)}
            />
          </Step>

          {/* 7: dashboard_metrics */}
          <Step>
            <QHeader color="#5A7A6B" week={onboardingMode ? null : "Week 03"} label="What number do you wish you could see every morning?" why="Pick up to 2. Your dashboard surfaces these as soon as you open it." />
            <MultiSelect
              options={[
                { value: "revenue",            label: "Revenue this month",   icon: "TrendingUp" },
                { value: "leads",              label: "New leads",            icon: "UserPlus"   },
                { value: "time_per_workflow",  label: "Time per workflow",    icon: "Clock"      },
                { value: "active_clients",     label: "Active clients",       icon: "Users"      },
                { value: "content_engagement", label: "Content engagement",   icon: "BarChart3"  },
                { value: "custom",             label: "Something custom",     icon: "Sparkles"   },
              ]}
              values={(answers.dashboard_metrics as string[]) ?? []}
              onChange={(v) => setAnswer("dashboard_metrics", v)}
              color="#5A7A6B"
              max={2}
              customField="dashboard_custom"
              customValue={(answers.dashboard_custom as string) ?? ""}
              onCustomChange={(v) => setAnswer("dashboard_custom", v)}
            />
          </Step>

          {/* 8: os */}
          <Step>
            <QHeader color="#5A7A6B" week={onboardingMode ? null : "Week 03"} label="Mac or Windows?" why="This pre-selects your setup track and Claude Code install path inside your member area." />
            <ToggleRow
              options={[
                { value: "mac",     label: "Mac",     icon: "Apple"   },
                { value: "windows", label: "Windows", icon: "Monitor" },
              ]}
              value={(answers.os as string) ?? ""}
              onChange={(v) => setAnswer("os", v)}
              color="#5A7A6B"
            />
          </Step>

          {/* 9: tz_and_peak */}
          <Step>
            <QHeader color="#6B5A7A" week={onboardingMode ? null : "Week 04"} label="Where are you, and when are you sharpest?" why="We use this to draft your morning Claude moment in your timezone in W4·S8." />
            <TzAndPeak
              timezone={(answers.timezone as string) ?? ""}
              peak={(answers.peak_time as string) ?? ""}
              onTimezone={(v) => setAnswer("timezone", v)}
              onPeak={(v) => setAnswer("peak_time", v)}
              color="#6B5A7A"
            />
          </Step>

          {/* 10: one_thing */}
          <Step>
            <QHeader color="#6B5A7A" week={onboardingMode ? null : "Week 04"} label="If June 28 comes and you got exactly ONE thing from bootcamp ,  what would it be?" why="Abie and Meri read every single one of these before kickoff. Promise." />
            <textarea
              className={inputCls + " resize-none"}
              value={(answers.one_thing as string) ?? ""}
              onChange={(e) => setAnswer("one_thing", e.target.value)}
              placeholder="I want to walk away with…"
              maxLength={600}
              rows={4}
            />
          </Step>

        </Stepper>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function QHeader({ color, week, label, why }: {
  color: string;
  week: string | null;
  label: string;
  why: string;
}) {
  return (
    <div className="mb-8">
      {week && (
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color }}>
          {week}
        </p>
      )}
      <h2
        className="font-serif font-light text-[var(--charcoal-900)] dark:text-foreground mb-3 leading-[1.15]"
        style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)" }}
      >
        {label}
      </h2>
      <p className="text-sm text-[var(--taupe-400)] font-light italic leading-relaxed">
        {why}
      </p>
    </div>
  );
}

function CardGrid({ options, value, onChange, color, customField, customValue, onCustomChange }: {
  options: { value: string; label: string; hint?: string; icon?: string }[];
  value: string;
  onChange: (v: string) => void;
  color: string;
  customField?: string;
  customValue?: string;
  onCustomChange?: (v: string) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const selected = value === opt.value;
          const Icon = opt.icon ? ICON_MAP[opt.icon] : null;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`text-left rounded-2xl p-4 transition-all duration-200 ${
                selected
                  ? "bg-white dark:bg-[var(--card)] shadow-md -translate-y-0.5 border-2"
                  : "bg-white dark:bg-[var(--card)] border border-[var(--beige-200)] dark:border-white/5 hover:shadow-md hover:-translate-y-0.5"
              }`}
              style={selected ? { borderColor: color } : undefined}
            >
              <div className="flex items-start gap-3">
                {Icon && (
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: selected ? `${color}22` : "var(--beige-100)",
                      color: selected ? color : "var(--taupe-400)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                )}
                <div>
                  <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground mb-0.5">
                    {opt.label}
                  </p>
                  {opt.hint && (
                    <p className="text-xs text-[var(--taupe-400)] font-light leading-relaxed">
                      {opt.hint}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {customField && value === "custom" && onCustomChange && (
        <input
          type="text"
          value={customValue ?? ""}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="Describe it in a few words…"
          maxLength={200}
          className="mt-4 w-full bg-white dark:bg-[var(--card)] border border-[var(--beige-300)] dark:border-white/10 focus:border-[var(--clay-500)] focus:ring-2 focus:ring-[var(--clay-500)]/20 outline-none rounded-2xl px-5 py-4 text-base font-light text-[var(--charcoal-900)] dark:text-foreground placeholder:text-[var(--taupe-400)]/60 transition-all"
        />
      )}
    </>
  );
}

function MultiSelect({ options, values, onChange, color, max, customField, customValue, onCustomChange }: {
  options: { value: string; label: string; icon?: string }[];
  values: string[];
  onChange: (v: string[]) => void;
  color: string;
  max: number;
  customField?: string;
  customValue?: string;
  onCustomChange?: (v: string) => void;
}) {
  const toggle = (v: string) => {
    if (values.includes(v)) {
      onChange(values.filter((x) => x !== v));
    } else if (values.length < max) {
      onChange([...values, v]);
    } else {
      onChange([...values.slice(1), v]);
    }
  };

  return (
    <>
      <p className="text-xs text-[var(--taupe-400)] font-light italic mb-3">
        Pick up to {max}. {values.length}/{max} selected.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const selected = values.includes(opt.value);
          const Icon = opt.icon ? ICON_MAP[opt.icon] : null;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`text-left rounded-2xl p-4 transition-all duration-200 ${
                selected
                  ? "bg-white dark:bg-[var(--card)] shadow-md border-2"
                  : "bg-white dark:bg-[var(--card)] border border-[var(--beige-200)] dark:border-white/5 hover:shadow-md"
              }`}
              style={selected ? { borderColor: color } : undefined}
            >
              <div className="flex items-center gap-3">
                {Icon && (
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: selected ? `${color}22` : "var(--beige-100)",
                      color: selected ? color : "var(--taupe-400)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                )}
                <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">
                  {opt.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      {customField && values.includes("custom") && onCustomChange && (
        <input
          type="text"
          value={customValue ?? ""}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="Your custom metric…"
          maxLength={200}
          className="mt-4 w-full bg-white dark:bg-[var(--card)] border border-[var(--beige-300)] dark:border-white/10 focus:border-[var(--clay-500)] focus:ring-2 focus:ring-[var(--clay-500)]/20 outline-none rounded-2xl px-5 py-4 text-base font-light text-[var(--charcoal-900)] dark:text-foreground placeholder:text-[var(--taupe-400)]/60 transition-all"
        />
      )}
    </>
  );
}

function ToggleRow({ options, value, onChange, color }: {
  options: { value: string; label: string; icon?: string }[];
  value: string;
  onChange: (v: string) => void;
  color: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 max-w-xs">
      {options.map((opt) => {
        const selected = value === opt.value;
        const Icon = opt.icon ? ICON_MAP[opt.icon] : null;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex items-center justify-center gap-2 rounded-2xl py-5 px-6 transition-all duration-200 ${
              selected
                ? "bg-white dark:bg-[var(--card)] shadow-md -translate-y-0.5 border-2"
                : "bg-white dark:bg-[var(--card)] border border-[var(--beige-200)] dark:border-white/5 hover:shadow-md"
            }`}
            style={selected ? { borderColor: color } : undefined}
          >
            {Icon && (
              <Icon className="w-5 h-5" style={{ color: selected ? color : "var(--taupe-400)" }} />
            )}
            <span className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const PEAK_OPTIONS = [
  { value: "morning",     label: "Morning",     hint: "6–10 AM"    },
  { value: "mid_morning", label: "Mid-morning", hint: "10 AM–1 PM" },
  { value: "afternoon",   label: "Afternoon",   hint: "1–5 PM"     },
  { value: "evening",     label: "Evening",     hint: "5–9 PM"     },
  { value: "late_night",  label: "Late night",  hint: "9 PM+"      },
];

function TzAndPeak({ timezone, peak, onTimezone, onPeak, color }: {
  timezone: string;
  peak: string;
  onTimezone: (v: string) => void;
  onPeak: (v: string) => void;
  color: string;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--taupe-400)] mb-2 block">
          Your timezone
        </label>
        <input
          type="text"
          value={timezone}
          onChange={(e) => onTimezone(e.target.value)}
          placeholder="e.g. America/New_York"
          className="w-full bg-white dark:bg-[var(--card)] border border-[var(--beige-300)] dark:border-white/10 focus:border-[var(--clay-500)] focus:ring-2 focus:ring-[var(--clay-500)]/20 outline-none rounded-2xl px-5 py-4 text-base font-light text-[var(--charcoal-900)] dark:text-foreground placeholder:text-[var(--taupe-400)]/60 transition-all"
        />
        <p className="mt-2 text-xs text-[var(--taupe-400)] font-light italic">
          Auto-detected from your browser. Edit if wrong.
        </p>
      </div>
      <div>
        <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--taupe-400)] mb-3 block">
          When are you sharpest?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PEAK_OPTIONS.map((opt) => {
            const selected = peak === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onPeak(opt.value)}
                className={`rounded-2xl px-3 py-3 text-left transition-all duration-200 ${
                  selected
                    ? "bg-white dark:bg-[var(--card)] shadow-md border-2"
                    : "bg-white dark:bg-[var(--card)] border border-[var(--beige-200)] dark:border-white/5 hover:shadow-md"
                }`}
                style={selected ? { borderColor: color } : undefined}
              >
                <p className="text-xs font-medium text-[var(--charcoal-900)] dark:text-foreground">
                  {opt.label}
                </p>
                <p className="text-[10px] text-[var(--taupe-400)] font-light mt-0.5">
                  {opt.hint}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

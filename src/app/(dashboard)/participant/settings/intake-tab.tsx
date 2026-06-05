"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { saveIntakeResponses, type IntakeAnswers } from "@/app/actions/intake";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-[var(--beige-200)] dark:border-white/10 bg-white dark:bg-[var(--espresso-700)] text-sm text-[var(--charcoal-900)] dark:text-foreground placeholder:text-[var(--taupe-400)] focus:outline-none focus:ring-2 focus:ring-[var(--clay-500)] focus:border-transparent transition-all";

const FOCUS_OPTIONS = [
  { value: "ops",    label: "Operations & inbox" },
  { value: "voice",  label: "Voice & content" },
  { value: "client", label: "Client work" },
  { value: "sales",  label: "Sales & leads" },
];

const VOICE_OPTIONS = [
  { value: "personal", label: "Mine personally" },
  { value: "company",  label: "My company's" },
  { value: "both",     label: "Both" },
  { value: "mine",     label: "Mine" },
];

const ROLE_OPTIONS = [
  { value: "inbox_triage",     label: "Inbox Triage" },
  { value: "lead_qualifier",   label: "Lead Qualifier" },
  { value: "content_reviewer", label: "Content Reviewer" },
  { value: "custom",           label: "Custom" },
];

const METRIC_OPTIONS = [
  { value: "revenue",        label: "Revenue this month" },
  { value: "leads",          label: "New leads" },
  { value: "active_clients", label: "Active clients" },
  { value: "custom",         label: "Custom" },
];

const PEAK_OPTIONS = [
  { value: "morning",     label: "Morning (6–10 AM)" },
  { value: "mid_morning", label: "Mid-morning (10 AM–1 PM)" },
  { value: "afternoon",   label: "Afternoon (1–5 PM)" },
  { value: "evening",     label: "Evening (5–9 PM)" },
];

const OS_OPTIONS = [
  { value: "mac",     label: "Mac" },
  { value: "windows", label: "Windows" },
];

function FieldLabel({ children, empty }: { children: React.ReactNode; empty?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <label className="block text-sm font-medium text-[var(--espresso-800)] dark:text-foreground/70">
        {children}
      </label>
      {empty && (
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--clay-500)] bg-[var(--clay-500)]/10 px-1.5 py-0.5 rounded-full">
          Not answered
        </span>
      )}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder = "Select one",
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function CheckboxGroup({
  values,
  onChange,
  options,
  max = 2,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  options: { value: string; label: string }[];
  max?: number;
}) {
  function toggle(val: string) {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else if (values.length < max) {
      onChange([...values, val]);
    }
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const checked = values.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => toggle(o.value)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors ${
              checked
                ? "bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] border-transparent"
                : "border-[var(--beige-200)] dark:border-white/10 text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground"
            }`}
          >
            {checked && <CheckCircle2 className="size-3" />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

type IntakeWithPaymentEmail = IntakeAnswers & { payment_email?: string | null; submitted_at?: string | null };

export function IntakeTab({ initial }: { initial: IntakeWithPaymentEmail }) {
  const [form, setForm] = useState<IntakeAnswers>({
    first_name:        initial.first_name        ?? "",
    business_oneliner: initial.business_oneliner ?? "",
    first_focus:       initial.first_focus       ?? "",
    voice_owner:       initial.voice_owner       ?? "",
    ai_employee_role:  initial.ai_employee_role  ?? "",
    ai_employee_custom:initial.ai_employee_custom?? "",
    dashboard_metrics: initial.dashboard_metrics ?? [],
    dashboard_custom:  initial.dashboard_custom  ?? "",
    os:                initial.os                ?? "",
    timezone:          initial.timezone          ?? "",
    peak_time:         initial.peak_time         ?? "",
    one_thing:         initial.one_thing         ?? "",
  });
  const [isPending, startTransition] = useTransition();

  const set = (key: keyof IntakeAnswers, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function handleSave() {
    startTransition(async () => {
      const { error } = await saveIntakeResponses(form);
      if (error) toast.error(error);
      else toast.success("Onboarding answers saved");
    });
  }

  const hasAnswers = !!(initial.submitted_at || initial.one_thing || initial.business_oneliner);

  return (
    <div className="rounded-2xl border border-[var(--beige-200)] dark:border-white/5 bg-[var(--beige-50)] dark:bg-[var(--card)] p-5 sm:p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif font-light text-lg text-[var(--charcoal-900)] dark:text-foreground">
            Onboarding answers
          </h3>
          <p className="text-xs text-[var(--taupe-400)] mt-0.5">
            {hasAnswers ? "Your answers from the intake form. Edit any time." : "You haven't completed onboarding yet. Fill in your answers below."}
          </p>
        </div>
        {hasAnswers && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-2 py-1 rounded-full shrink-0">
            <CheckCircle2 className="size-3" />
            Submitted
          </span>
        )}
      </div>

      <div className="space-y-5">
        {/* Business one-liner */}
        <div>
          <FieldLabel empty={!form.business_oneliner}>What do you do in one line?</FieldLabel>
          <input
            type="text"
            value={form.business_oneliner ?? ""}
            onChange={(e) => set("business_oneliner", e.target.value)}
            placeholder="e.g. I help founders scale their operations with AI"
            className={inputClass}
          />
        </div>

        {/* First focus */}
        <div>
          <FieldLabel empty={!form.first_focus}>First focus area</FieldLabel>
          <Select
            value={form.first_focus ?? ""}
            onChange={(v) => set("first_focus", v)}
            options={FOCUS_OPTIONS}
            placeholder="Select your focus area"
          />
        </div>

        {/* Voice owner */}
        <div>
          <FieldLabel empty={!form.voice_owner}>Whose voice should Claude learn?</FieldLabel>
          <Select
            value={form.voice_owner ?? ""}
            onChange={(v) => set("voice_owner", v)}
            options={VOICE_OPTIONS}
            placeholder="Select"
          />
        </div>

        {/* AI employee role */}
        <div>
          <FieldLabel empty={!form.ai_employee_role}>AI employee role</FieldLabel>
          <Select
            value={form.ai_employee_role ?? ""}
            onChange={(v) => set("ai_employee_role", v)}
            options={ROLE_OPTIONS}
            placeholder="Select a role"
          />
          {form.ai_employee_role === "custom" && (
            <input
              type="text"
              value={form.ai_employee_custom ?? ""}
              onChange={(e) => set("ai_employee_custom", e.target.value)}
              placeholder="Describe your custom AI employee role"
              className={`${inputClass} mt-2`}
            />
          )}
        </div>

        {/* Dashboard metrics */}
        <div>
          <FieldLabel empty={!form.dashboard_metrics?.length}>Dashboard metrics (pick up to 2)</FieldLabel>
          <CheckboxGroup
            values={form.dashboard_metrics ?? []}
            onChange={(v) => set("dashboard_metrics", v)}
            options={METRIC_OPTIONS}
          />
        </div>

        {/* OS */}
        <div>
          <FieldLabel empty={!form.os}>Your computer</FieldLabel>
          <Select
            value={form.os ?? ""}
            onChange={(v) => set("os", v)}
            options={OS_OPTIONS}
            placeholder="Select OS"
          />
        </div>

        {/* Timezone */}
        <div>
          <FieldLabel empty={!form.timezone}>Timezone</FieldLabel>
          <input
            type="text"
            value={form.timezone ?? ""}
            onChange={(e) => set("timezone", e.target.value)}
            placeholder="e.g. Europe/Madrid"
            className={inputClass}
          />
        </div>

        {/* Peak time */}
        <div>
          <FieldLabel empty={!form.peak_time}>When are you sharpest?</FieldLabel>
          <Select
            value={form.peak_time ?? ""}
            onChange={(v) => set("peak_time", v)}
            options={PEAK_OPTIONS}
            placeholder="Select your peak time"
          />
        </div>

        {/* One thing */}
        <div>
          <FieldLabel empty={!form.one_thing}>After Week 4, I want to...</FieldLabel>
          <textarea
            value={form.one_thing ?? ""}
            onChange={(e) => set("one_thing", e.target.value)}
            placeholder="Describe the one transformation you want from this bootcamp"
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={isPending}
        className="tm-btn-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        style={{ padding: "0.625rem 1.25rem", fontSize: "0.875rem" }}
      >
        {isPending ? "Saving…" : "Save answers"}
      </button>
    </div>
  );
}

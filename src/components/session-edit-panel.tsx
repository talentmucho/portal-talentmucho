"use client";

import { useState, useTransition } from "react";
import { Pencil, X, Plus, Trash2, Check, Loader2 } from "lucide-react";
import { updateSessionOverride } from "@/app/actions/session-content";
import type { SessionData, Resource } from "@/utils/session-content";

type Props = {
  courseSlug: string;
  sessionNumber: number;
  initial: SessionData;
};

const inputClass =
  "w-full h-9 px-3 rounded-xl border border-[var(--beige-200)] dark:border-white/10 bg-[var(--beige-50)] dark:bg-white/5 text-sm text-[var(--charcoal-900)] dark:text-foreground placeholder:text-[var(--taupe-400)] focus:outline-none focus:border-[var(--charcoal-900)] dark:focus:border-white/30 transition-colors";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)]">
        {label}
      </p>
      {hint && (
        <p className="text-xs text-[var(--taupe-400)] font-light -mt-0.5">{hint}</p>
      )}
      {children}
    </div>
  );
}

export function SessionEditPanel({ courseSlug, sessionNumber, initial }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [videoUrl, setVideoUrl] = useState(initial.videoUrl ?? "");
  const [zoomUrl, setZoomUrl] = useState(
    initial.zoomUrl === "#" ? "" : (initial.zoomUrl ?? "")
  );
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [date, setDate] = useState(initial.date);
  const [time, setTime] = useState(initial.time);
  const [tag, setTag] = useState(initial.tag);
  const [color, setColor] = useState(initial.color);
  const [weekLabel, setWeekLabel] = useState(initial.weekLabel);
  const [resources, setResources] = useState<Resource[]>(initial.resources);

  function handleSave() {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const result = await updateSessionOverride(courseSlug, sessionNumber, {
        video_url: videoUrl || null,
        zoom_url: zoomUrl || null,
        title: title || null,
        description: description || null,
        date_label: date || null,
        time_label: time || null,
        tag: tag || null,
        color: color || null,
        week_label: weekLabel || null,
        resources: resources.length > 0 ? resources : null,
      });
      if (result.error) setError(result.error);
      else setSuccess(true);
    });
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium px-4 py-2.5 rounded-full shadow-lg hover:opacity-90 transition-opacity"
      >
        <Pencil className="size-3.5" />
        Edit session
      </button>

      {/* Overlay + panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="w-full max-w-md bg-white dark:bg-[var(--card)] border-l border-[var(--beige-200)] dark:border-white/5 flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-5 border-b border-[var(--beige-200)] dark:border-white/5 shrink-0">
              <div>
                <p className="text-sm font-medium text-[var(--charcoal-900)] dark:text-foreground">
                  Edit session
                </p>
                <p className="text-[10px] text-[var(--taupe-400)] font-light">
                  {courseSlug} · session {sessionNumber}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--beige-100)] dark:hover:bg-white/5 transition-colors"
              >
                <X className="size-4 text-[var(--taupe-400)]" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 tm-scrollbar">
              <Field
                label="Recording URL"
                hint="Add the Zoom/Loom link after the live session"
              >
                <input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://..."
                  className={inputClass}
                />
              </Field>

              <Field label="Zoom join link">
                <input
                  value={zoomUrl}
                  onChange={(e) => setZoomUrl(e.target.value)}
                  placeholder="https://zoom.us/j/..."
                  className={inputClass}
                />
              </Field>

              <Field label="Title">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Description">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className={`${inputClass} h-auto py-2.5 resize-none`}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Date">
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Sat, Jun 6"
                    className={inputClass}
                  />
                </Field>
                <Field label="Time">
                  <input
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="10 AM–1 PM EST"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Tag">
                  <input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="W1 · S1"
                    className={inputClass}
                  />
                </Field>
                <Field label="Color">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="h-9 w-10 rounded-lg border border-[var(--beige-200)] dark:border-white/10 cursor-pointer bg-transparent p-0.5"
                    />
                    <input
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className={`${inputClass} flex-1`}
                    />
                  </div>
                </Field>
              </div>

              <Field label="Week label">
                <input
                  value={weekLabel}
                  onChange={(e) => setWeekLabel(e.target.value)}
                  placeholder="Week 1 · Knowing Claude"
                  className={inputClass}
                />
              </Field>

              {/* Resources */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--taupe-400)]">
                    Resources
                  </p>
                  <button
                    onClick={() =>
                      setResources((r) => [...r, { label: "", href: "" }])
                    }
                    className="inline-flex items-center gap-1 text-xs text-[var(--charcoal-900)] dark:text-foreground hover:opacity-70 transition-opacity"
                  >
                    <Plus className="size-3" /> Add
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {resources.map((r, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="flex-1 flex flex-col gap-1.5">
                        <input
                          value={r.label}
                          onChange={(e) =>
                            setResources((rs) =>
                              rs.map((x, j) =>
                                j === i ? { ...x, label: e.target.value } : x
                              )
                            )
                          }
                          placeholder="Label"
                          className={inputClass}
                        />
                        <input
                          value={r.href}
                          onChange={(e) =>
                            setResources((rs) =>
                              rs.map((x, j) =>
                                j === i ? { ...x, href: e.target.value } : x
                              )
                            )
                          }
                          placeholder="https://..."
                          className={inputClass}
                        />
                      </div>
                      <button
                        onClick={() =>
                          setResources((rs) => rs.filter((_, j) => j !== i))
                        }
                        className="p-1.5 mt-0.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-[var(--taupe-400)] hover:text-red-500"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))}
                  {resources.length === 0 && (
                    <p className="text-xs text-[var(--taupe-400)] font-light">
                      No resources yet.
                    </p>
                  )}
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && (
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1.5">
                  <Check className="size-3.5" /> Saved
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="shrink-0 px-5 py-4 border-t border-[var(--beige-200)] dark:border-white/5">
              <button
                onClick={handleSave}
                disabled={pending}
                className="w-full inline-flex items-center justify-center gap-2 bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] text-sm font-medium py-2.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {pending && <Loader2 className="size-3.5 animate-spin" />}
                {pending ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

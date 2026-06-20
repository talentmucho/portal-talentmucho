"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RotateCcw, Play, Check } from "lucide-react";

type Out = { kind: "out" | "sys" | "err"; text: string };
type Block = { kind: "in" | "out" | "sys" | "err"; text: string };

const HOME = "C:\\Users\\you";
const PROJ = "C:\\Users\\you\\my-dashboard";

const STEPS: { cmd: string; path: string; note: string; out: Out[] }[] = [
  {
    cmd: "node --version",
    path: HOME,
    note: "Check Node.js is installed",
    out: [{ kind: "out", text: "v18.17.0" }],
  },
  {
    cmd: "npm install -g @anthropic-ai/claude-code",
    path: HOME,
    note: "Install Claude Code",
    out: [
      { kind: "sys", text: "added 1 package in 6s" },
      { kind: "out", text: "✓ Claude Code installed" },
    ],
  },
  {
    cmd: "claude --version",
    path: HOME,
    note: "Confirm it works",
    out: [{ kind: "out", text: "1.0.0 (Claude Code)" }],
  },
  {
    cmd: "mkdir my-dashboard",
    path: HOME,
    note: "Make a folder for your build",
    out: [{ kind: "sys", text: "    Created  my-dashboard\\" }],
  },
  {
    cmd: "cd my-dashboard",
    path: HOME,
    note: "Go into the folder",
    out: [],
  },
  {
    cmd: "claude",
    path: PROJ,
    note: "Start Claude Code",
    out: [
      { kind: "sys", text: "✻ Welcome to Claude Code" },
      { kind: "out", text: "  Tell me what to build, then press Enter." },
    ],
  },
];

export function InstallSim() {
  const reduce = useReducedMotion();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [current, setCurrent] = useState(0);
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);
  const autoRef = useRef(false);
  const runStepRef = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [blocks, typed]);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const runStep = useCallback(
    (i: number) => {
      if (busy || i !== current || i >= STEPS.length) return;
      const step = STEPS[i];

      const finish = () => {
        setBlocks((b) => [...b, { kind: "in", text: `${step.path}> ${step.cmd}` }, ...step.out]);
        setTyped("");
        setCurrent(i + 1);
        setBusy(false);
        if (autoRef.current && i + 1 < STEPS.length) {
          timeoutRef.current = window.setTimeout(() => runStepRef.current(i + 1), 480);
        } else {
          autoRef.current = false;
        }
      };

      setBusy(true);
      if (reduce) {
        finish();
        return;
      }
      let k = 0;
      const tick = () => {
        k += 1;
        setTyped(step.cmd.slice(0, k));
        if (k < step.cmd.length) {
          timeoutRef.current = window.setTimeout(tick, 34);
        } else {
          timeoutRef.current = window.setTimeout(finish, 340);
        }
      };
      timeoutRef.current = window.setTimeout(tick, 80);
    },
    [busy, current, reduce]
  );
  runStepRef.current = runStep;

  const runAll = useCallback(() => {
    if (busy || current >= STEPS.length) return;
    autoRef.current = true;
    runStep(current);
  }, [busy, current, runStep]);

  const reset = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
    autoRef.current = false;
    setBlocks([]);
    setCurrent(0);
    setTyped("");
    setBusy(false);
  }, []);

  const done = current >= STEPS.length;
  const promptPath = done ? PROJ : STEPS[current].path;

  return (
    <div className="flex flex-col gap-2.5">
      {/* steps + controls */}
      <div className="flex items-start gap-2 flex-wrap">
        <ol className="flex-1 min-w-[260px] flex flex-col gap-1">
          {STEPS.map((s, i) => {
            const isDone = i < current;
            const isCurrent = i === current;
            return (
              <li key={s.cmd}>
                <button
                  type="button"
                  disabled={busy || !isCurrent}
                  onClick={() => runStep(i)}
                  className={`w-full text-left flex items-center gap-2.5 rounded-lg border px-2.5 py-1.5 transition-colors ${
                    isCurrent
                      ? "border-[var(--clay-500)]/40 bg-[var(--clay-500)]/5"
                      : isDone
                        ? "border-[var(--beige-200)] dark:border-white/10 bg-white dark:bg-white/5"
                        : "border-[var(--beige-200)] dark:border-white/5 bg-transparent opacity-50"
                  } ${isCurrent && !busy ? "cursor-pointer hover:border-[var(--clay-500)]/60" : "cursor-default"}`}
                >
                  <span
                    className={`size-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                      isDone
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                        : isCurrent
                          ? "bg-[var(--clay-500)] text-white"
                          : "bg-[var(--beige-100)] dark:bg-white/5 text-[var(--taupe-400)]"
                    }`}
                  >
                    {isDone ? <Check className="size-3" /> : i + 1}
                  </span>
                  <code className="font-mono text-xs text-[var(--charcoal-900)] dark:text-foreground truncate">{s.cmd}</code>
                  <span className="ml-auto shrink-0 text-[10px] text-[var(--taupe-400)] font-light hidden sm:block">{s.note}</span>
                  {isCurrent && !busy && (
                    <span className="ml-auto sm:ml-2 shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--clay-500)]">
                      <Play className="size-3" /> Run
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={runAll}
            disabled={busy || done}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--charcoal-900)] dark:bg-white text-[var(--beige-50)] dark:text-[var(--charcoal-900)] hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            <Play className="size-3" /> Run all
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 text-xs text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
          >
            <RotateCcw className="size-3" /> reset
          </button>
        </div>
      </div>

      {/* powershell window */}
      <div className="rounded-xl overflow-hidden border border-black/20 shadow-sm" style={{ background: "#0c0c0c" }}>
        <div className="flex items-center justify-between px-3 h-8" style={{ background: "#1f1f1f" }}>
          <span className="text-[11px] font-medium" style={{ color: "#cccccc" }}>Windows PowerShell</span>
          <div className="flex items-center gap-3 text-[11px]" style={{ color: "#9a9a9a" }} aria-hidden>
            <span>&#x2014;</span>
            <span>&#x25a1;</span>
            <span>&#x2715;</span>
          </div>
        </div>
        <div
          ref={bodyRef}
          className="px-3.5 py-3 h-56 overflow-y-auto font-mono text-[12.5px] leading-relaxed"
          style={{ color: "#d4d4d4" }}
        >
          {blocks.length === 0 && !busy && (
            <p className="m-0" style={{ color: "#8a8a8a" }}>Click a step above (or “Run all”) to watch the setup run.</p>
          )}
          {blocks.map((line, i) => (
            <pre
              key={i}
              className="whitespace-pre-wrap break-words m-0 font-mono"
              style={{ color: line.kind === "err" ? "#f87171" : line.kind === "sys" ? "#8a8a8a" : "#d4d4d4" }}
            >
              {line.kind === "in" ? <PromptLine text={line.text} /> : line.text}
            </pre>
          ))}

          {/* active / idle prompt */}
          {!done && (
            <div className="flex items-start">
              <span className="shrink-0" style={{ color: "#5aa0e6" }}>
                {promptPath}
                <span style={{ color: "#d4d4d4" }}>&gt;&nbsp;</span>
              </span>
              <span style={{ color: "#e6e6e6" }}>
                {typed}
                <Cursor reduce={!!reduce} />
              </span>
            </div>
          )}
          {done && <p className="m-0 mt-1" style={{ color: "#34d399" }}>✓ All set ~ Claude Code is installed and running.</p>}
        </div>
      </div>
    </div>
  );
}

function Cursor({ reduce }: { reduce: boolean }) {
  return (
    <motion.span
      className="inline-block"
      style={{ color: "#d4d4d4" }}
      animate={reduce ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
      transition={reduce ? undefined : { duration: 1, repeat: Infinity, ease: "linear" }}
    >
      &#x2588;
    </motion.span>
  );
}

function PromptLine({ text }: { text: string }) {
  const idx = text.indexOf("> ");
  if (idx === -1) return <>{text}</>;
  const path = text.slice(0, idx);
  const cmd = text.slice(idx + 2);
  return (
    <>
      <span style={{ color: "#5aa0e6" }}>{path}</span>
      <span style={{ color: "#d4d4d4" }}>&gt; </span>
      <span style={{ color: "#e6e6e6" }}>{cmd}</span>
    </>
  );
}

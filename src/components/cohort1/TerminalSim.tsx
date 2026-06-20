"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";

type Line = { kind: "in" | "out" | "err" | "sys"; text: string };
type Dir = { [name: string]: Dir };

const ROOT = "C:\\Users\\you";
const initialFs: Dir = { Documents: {}, Downloads: {}, Desktop: {} };
const initialLines: Line[] = [
  { kind: "sys", text: "Windows PowerShell" },
  { kind: "sys", text: "Try a command below, or type your own. You can't break anything here." },
];

const CHIPS = ["pwd", "ls", "mkdir my-dashboard", "cd my-dashboard", "cd ..", "clear"];

function getDirAt(root: Dir, path: string[]): Dir {
  let cur = root;
  for (const seg of path) {
    if (!cur[seg]) return cur;
    cur = cur[seg];
  }
  return cur;
}

function fullPath(path: string[]): string {
  return ROOT + (path.length ? "\\" + path.join("\\") : "");
}

export function TerminalSim() {
  const reduce = useReducedMotion();
  const [fs, setFs] = useState<Dir>(() => structuredClone(initialFs));
  const [cwd, setCwd] = useState<string[]>([]);
  const [lines, setLines] = useState<Line[]>(initialLines);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, input]);

  const execute = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      const promptLine: Line = { kind: "in", text: `${fullPath(cwd)}> ${cmd}` };

      if (cmd === "") {
        setLines((l) => [...l, promptLine]);
        return;
      }
      const [name, ...rest] = cmd.split(/\s+/);
      const arg = rest.join(" ");
      const out: Line[] = [];

      switch (name.toLowerCase()) {
        case "pwd":
          out.push({ kind: "out", text: fullPath(cwd) });
          break;
        case "ls":
        case "dir": {
          const names = Object.keys(getDirAt(fs, cwd));
          out.push(
            names.length
              ? { kind: "out", text: names.map((n) => "  " + n + "\\").join("\n") }
              : { kind: "out", text: "  (this folder is empty)" }
          );
          break;
        }
        case "cd": {
          if (arg === "" || arg === "~") {
            setCwd([]);
          } else if (arg === "..") {
            setCwd((p) => p.slice(0, -1));
          } else {
            const target = arg.replace(/[\\/]+$/, "");
            if (getDirAt(fs, cwd)[target]) {
              setCwd((p) => [...p, target]);
            } else {
              out.push({ kind: "err", text: `cd : Cannot find path '${target}' because it does not exist.` });
            }
          }
          break;
        }
        case "mkdir":
        case "md": {
          const target = arg.replace(/[\\/]+$/, "");
          if (!target) {
            out.push({ kind: "err", text: "mkdir : You need to give the folder a name, e.g. mkdir my-dashboard" });
          } else if (getDirAt(fs, cwd)[target]) {
            out.push({ kind: "err", text: `mkdir : A folder named '${target}' already exists here.` });
          } else {
            const next = structuredClone(fs);
            getDirAt(next, cwd)[target] = {};
            setFs(next);
            out.push({ kind: "out", text: `  Created folder: ${target}\\` });
          }
          break;
        }
        case "clear":
        case "cls":
          setLines([]);
          return;
        case "help":
          out.push({ kind: "out", text: "Commands you can try:\n  pwd   ls   cd <folder>   cd ..   mkdir <folder>   clear" });
          break;
        default:
          out.push({
            kind: "err",
            text: `'${name}' is not recognized as a command. Type help to see what works here.`,
          });
      }
      setLines((l) => [...l, promptLine, ...out]);
    },
    [cwd, fs]
  );

  const typeAndRun = useCallback(
    (cmd: string) => {
      if (busy) return;
      if (reduce) {
        execute(cmd);
        return;
      }
      setBusy(true);
      setInput("");
      let i = 0;
      const tick = () => {
        i += 1;
        setInput(cmd.slice(0, i));
        if (i < cmd.length) {
          window.setTimeout(tick, 42);
        } else {
          window.setTimeout(() => {
            execute(cmd);
            setInput("");
            setBusy(false);
            inputRef.current?.focus();
          }, 280);
        }
      };
      window.setTimeout(tick, 80);
    },
    [busy, reduce, execute]
  );

  const reset = useCallback(() => {
    setFs(structuredClone(initialFs));
    setCwd([]);
    setLines(initialLines);
    setInput("");
    setBusy(false);
  }, []);

  return (
    <div className="flex flex-col gap-2.5">
      {/* command chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--taupe-400)] mr-1">Try it:</span>
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            disabled={busy}
            onClick={() => typeAndRun(c)}
            className="font-mono text-xs px-2.5 py-1 rounded-md border border-[var(--beige-200)] dark:border-white/10 bg-white dark:bg-white/5 text-[var(--charcoal-900)] dark:text-foreground hover:border-[var(--clay-500)]/50 hover:bg-[var(--clay-500)]/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {c}
          </button>
        ))}
        <button
          type="button"
          onClick={reset}
          className="ml-auto inline-flex items-center gap-1 text-xs text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
        >
          <RotateCcw className="size-3" />
          reset
        </button>
      </div>

      {/* the window */}
      <div className="rounded-xl overflow-hidden border border-black/20 shadow-sm" style={{ background: "#0c0c0c" }}>
        {/* title bar */}
        <div className="flex items-center justify-between px-3 h-8" style={{ background: "#1f1f1f" }}>
          <span className="text-[11px] font-medium" style={{ color: "#cccccc" }}>
            Windows PowerShell
          </span>
          <div className="flex items-center gap-3 text-[11px]" style={{ color: "#9a9a9a" }} aria-hidden>
            <span>&#x2014;</span>
            <span>&#x25a1;</span>
            <span>&#x2715;</span>
          </div>
        </div>

        {/* body */}
        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
          className="px-3.5 py-3 h-64 overflow-y-auto font-mono text-[13px] leading-relaxed cursor-text"
          style={{ color: "#d4d4d4" }}
        >
          {lines.map((line, i) => (
            <pre
              key={i}
              className="whitespace-pre-wrap break-words m-0 font-mono"
              style={{
                color: line.kind === "err" ? "#f87171" : line.kind === "sys" ? "#8a8a8a" : "#d4d4d4",
              }}
            >
              {line.kind === "in" ? <PromptLine text={line.text} /> : line.text}
            </pre>
          ))}

          {/* live input line */}
          <div className="flex items-start">
            <span className="shrink-0" style={{ color: "#5aa0e6" }}>
              {fullPath(cwd)}
              <span style={{ color: "#d4d4d4" }}>&gt;&nbsp;</span>
            </span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={input}
                readOnly={busy}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !busy) {
                    execute(input);
                    setInput("");
                  }
                }}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label="Practice terminal input"
                className="w-full bg-transparent outline-none border-0 font-mono text-[13px] p-0 caret-transparent"
                style={{ color: "#d4d4d4" }}
              />
              {/* fake cursor */}
              <motion.span
                className="pointer-events-none absolute top-0"
                style={{ left: `${input.length}ch`, color: "#d4d4d4" }}
                animate={reduce ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
                transition={reduce ? undefined : { duration: 1, repeat: Infinity, ease: "linear" }}
              >
                &#x2588;
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </div>
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

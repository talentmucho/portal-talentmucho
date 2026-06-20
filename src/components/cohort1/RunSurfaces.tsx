"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Terminal, Code2, AppWindow, Globe, ChevronDown } from "lucide-react";

type Surface = {
  key: "desktop" | "terminal" | "editor" | "web";
  icon: typeof Terminal;
  name: string;
  sub: string;
  badge?: string;
  bestFor: string;
  setup: string;
  cons?: string[];
};

const SURFACES: Surface[] = [
  {
    key: "desktop",
    icon: AppWindow,
    name: "Desktop app",
    sub: "Mac & Windows",
    badge: "Start here",
    bestFor: "A dedicated window you open without ever touching the terminal ~ the least intimidating way to begin.",
    setup: "Download the Claude Code desktop app and sign in with your Claude account. Open your project folder and start typing.",
  },
  {
    key: "terminal",
    icon: Terminal,
    name: "Terminal",
    sub: "what this session sets up",
    bestFor: "Works on any machine, nothing extra to install ~ the full experience, and what the rest of this session assumes.",
    setup: "Run  npm install -g @anthropic-ai/claude-code  then type  claude  inside your project folder. (Needs Node.js 18+.)",
  },
  {
    key: "editor",
    icon: Code2,
    name: "Code editor",
    sub: "VS Code · Cursor",
    bestFor: "Seeing your files and watching changes happen side-by-side ~ good if reading the change helps you feel in control.",
    setup: "Install the Claude Code extension from your editor’s marketplace, open your project, and launch the Claude Code panel. (Cursor uses the same VS Code extension.)",
  },
  {
    key: "web",
    icon: Globe,
    name: "Web",
    sub: "claude.ai/code",
    bestFor: "Zero setup ~ try Claude Code in seconds before you commit to installing anything.",
    setup: "Open claude.ai/code in your browser and sign in. Nothing to install.",
    cons: [
      "Can’t reach the files on your computer ~ use a local window to build a real project",
      "Can’t access your Cowork AI employee",
    ],
  },
];

export function RunSurfaces() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [showSetup, setShowSetup] = useState(false);
  const s = SURFACES[active];

  return (
    <div className="flex flex-col gap-3">
      {/* tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SURFACES.map((x, i) => {
          const Icon = x.icon;
          const on = i === active;
          return (
            <button
              key={x.key}
              type="button"
              onClick={() => {
                setActive(i);
                setShowSetup(false);
              }}
              aria-pressed={on}
              className={`relative rounded-xl border p-3 text-left transition-colors ${
                on
                  ? "border-[var(--clay-500)]/40 bg-[var(--clay-500)]/5"
                  : "border-[var(--beige-200)] dark:border-white/10 bg-white dark:bg-[var(--card)] hover:border-[var(--clay-500)]/30"
              }`}
            >
              <Icon className={`size-4 ${on ? "text-[var(--clay-500)]" : "text-[var(--taupe-400)]"}`} />
              <span className="block text-sm font-semibold mt-1.5 text-[var(--charcoal-900)] dark:text-foreground leading-tight">{x.name}</span>
              <span className="block text-[10px] text-[var(--taupe-400)] font-light mt-0.5">{x.sub}</span>
              {x.badge && (
                <span className="absolute top-2 right-2 text-[8px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full bg-[var(--clay-500)]/15 text-[var(--clay-500)]">
                  {x.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* simulated window */}
      <div className="rounded-xl overflow-hidden border border-black/20 shadow-sm bg-[#0c0c0c]">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.key}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <SurfacePreview kind={s.key} reduce={!!reduce} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* details */}
      <div className="rounded-xl border border-[var(--beige-200)] dark:border-white/5 bg-white dark:bg-[var(--card)] p-4 flex flex-col gap-2.5">
        <p className="text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
          <span className="text-[10px] font-semibold text-[var(--taupe-400)] uppercase tracking-[0.1em] mr-1.5">Best for</span>
          {s.bestFor}
        </p>

        {s.cons && (
          <ul className="flex flex-col gap-1">
            {s.cons.map((c) => (
              <li key={c} className="flex items-start gap-2 text-xs text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed">
                <span className="text-[var(--taupe-400)] shrink-0 mt-0.5">×</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="border-t border-[var(--beige-200)] dark:border-white/5 pt-2">
          <button
            type="button"
            onClick={() => setShowSetup((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[var(--taupe-400)] uppercase tracking-[0.1em] hover:text-[var(--charcoal-900)] dark:hover:text-foreground transition-colors"
            aria-expanded={showSetup}
          >
            <ChevronDown className={`size-3.5 transition-transform ${showSetup ? "rotate-180" : ""}`} />
            How to set it up
          </button>
          <AnimatePresence initial={false}>
            {showSetup && (
              <motion.p
                initial={reduce ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduce ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden text-sm text-[var(--charcoal-900)] dark:text-foreground font-light leading-relaxed"
              >
                <span className="block pt-2">{s.setup}</span>
              </motion.p>
            )}
          </AnimatePresence>
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

function Dots({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <span className="size-2.5 rounded-full" style={{ background: "#ff5f57" }} />
      <span className="size-2.5 rounded-full" style={{ background: "#febc2e" }} />
      <span className="size-2.5 rounded-full" style={{ background: "#28c840" }} />
      {light && <span className="sr-only">window</span>}
    </div>
  );
}

function SurfacePreview({ kind, reduce }: { kind: Surface["key"]; reduce: boolean }) {
  if (kind === "terminal") {
    return (
      <div>
        <div className="flex items-center px-3 h-8" style={{ background: "#1f1f1f" }}>
          <span className="text-[11px] font-medium" style={{ color: "#cccccc" }}>Terminal</span>
        </div>
        <div className="px-3.5 py-3 h-44 font-mono text-[12.5px] leading-relaxed" style={{ color: "#d4d4d4" }}>
          <p className="m-0"><span style={{ color: "#5aa0e6" }}>~/my-dashboard</span> $ claude</p>
          <p className="m-0 mt-1" style={{ color: "#8a8a8a" }}>✻ Welcome to Claude Code</p>
          <p className="m-0 mt-2">› Build me a lead gen tracker <Cursor reduce={reduce} /></p>
        </div>
      </div>
    );
  }

  if (kind === "desktop") {
    return (
      <div style={{ background: "#1a1a1a" }}>
        <div className="flex items-center px-3 h-8 gap-3" style={{ background: "#2a2a2a" }}>
          <Dots />
          <span className="text-[11px] font-medium" style={{ color: "#cccccc" }}>Claude Code</span>
        </div>
        <div className="px-4 py-3 h-44 text-[12.5px] leading-relaxed flex flex-col gap-2" style={{ color: "#e6e6e6" }}>
          <div className="self-end max-w-[80%] rounded-lg px-3 py-1.5" style={{ background: "#3a3a3a" }}>Build me a lead gen tracker</div>
          <div className="self-start max-w-[85%] rounded-lg px-3 py-1.5" style={{ background: "#262626" }}>
            On it ~ creating your dashboard… <Cursor reduce={reduce} />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "editor") {
    return (
      <div style={{ background: "#1e1e1e" }}>
        <div className="flex items-center px-3 h-8 gap-3" style={{ background: "#323233" }}>
          <Dots />
          <span className="text-[11px] font-medium" style={{ color: "#cccccc" }}>VS Code</span>
        </div>
        <div className="h-44 flex text-[11.5px]" style={{ color: "#d4d4d4" }}>
          <div className="w-1/3 p-3 border-r border-black/40" style={{ background: "#252526" }}>
            <p className="m-0" style={{ color: "#8a8a8a" }}>EXPLORER</p>
            <p className="m-0 mt-2">▾ my-dashboard</p>
            <p className="m-0 pl-3">page.tsx</p>
            <p className="m-0 pl-3">data.js</p>
          </div>
          <div className="flex-1 p-3 flex flex-col gap-2">
            <p className="m-0" style={{ color: "#8a8a8a" }}>Claude Code</p>
            <div className="rounded-md px-2.5 py-1.5" style={{ background: "#2a2d2e" }}>
              Editing data.js… <Cursor reduce={reduce} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // web
  return (
    <div style={{ background: "#ffffff" }}>
      <div className="flex items-center px-3 h-9 gap-3 border-b border-black/10" style={{ background: "#f1f1f1" }}>
        <Dots />
        <div className="flex-1 rounded-full px-3 py-1 text-[11px] text-center" style={{ background: "#ffffff", color: "#555", border: "1px solid #e2e2e2" }}>
          claude.ai/code
        </div>
      </div>
      <div className="px-4 py-3 h-[143px] text-[12.5px] leading-relaxed flex flex-col gap-2" style={{ color: "#1a1a1a" }}>
        <div className="self-end max-w-[80%] rounded-lg px-3 py-1.5" style={{ background: "#efe7dc" }}>Help me plan a content hub</div>
        <div className="self-start max-w-[85%] rounded-lg px-3 py-1.5" style={{ background: "#f4f2ee" }}>
          Sure ~ let’s outline it together… <span className="inline-block" style={{ color: "#1a1a1a" }}><Cursor reduce={reduce} /></span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { FileImage } from "lucide-react";

// TM brand tokens (explicit hex ~ CSS vars aren't resolved by html-to-image)
const C = {
  charcoal: "#2A2520",
  beige50: "#FAF8F5",
  beige300: "#DED4C4",
  taupe: "#9C8B7A",
  clay: "#7D6B5A",
  espresso: "#3D352E",
  serif: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  sans: "'Manrope', system-ui, sans-serif",
} as const;

interface Props {
  participantName: string;
  /** Avatar image src (same-origin path). When absent, initials are shown. */
  avatarSrc?: string | null;
  /** Personal accent colour from the participant roadmap. */
  accentColor?: string;
  courseTitle?: string;
  courseSlug?: string;
  /** Pre-formatted issue date, e.g. "June 28, 2026". */
  issuedDate: string;
  certificateNumber: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function GraduationCertificate({
  participantName,
  avatarSrc,
  accentColor = C.clay,
  courseTitle = "AI Business Bootcamp",
  courseSlug = "Cohort 1 · June 2026",
  issuedDate,
  certificateNumber,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 960);
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  async function downloadPNG() {
    if (!certRef.current || downloading) return;
    setDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(certRef.current, {
        pixelRatio: 2,
        backgroundColor: C.beige50,
        style: { transform: "scale(1)" },
      });
      const link = document.createElement("a");
      link.download = `${certificateNumber}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Certificate ~ fixed 960×640 internal, scales via ResizeObserver */}
      <div
        ref={wrapperRef}
        style={{
          width: "100%",
          aspectRatio: "960 / 640",
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "0 20px 60px -10px rgb(42 37 32 / 0.20), 0 4px 16px -4px rgb(42 37 32 / 0.10)",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "960px",
            height: "640px",
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          <div
            ref={certRef}
            style={{
              width: "960px",
              height: "640px",
              display: "flex",
              background: C.beige50,
              fontFamily: C.sans,
            }}
          >
            {/* ── Left panel ── */}
            <div
              style={{
                width: "240px",
                flexShrink: 0,
                background: C.charcoal,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "40px 28px",
                position: "relative",
              }}
            >
              {/* Brand mark */}
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    border: `1.5px solid ${accentColor}`,
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontFamily: C.serif, fontSize: "16px", color: accentColor, letterSpacing: "0.02em" }}>
                    TM
                  </span>
                </div>
                <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.taupe, marginBottom: "2px" }}>
                  TalentMucho
                </p>
                <p style={{ fontSize: "8px", letterSpacing: "0.1em", color: `${C.taupe}99`, textTransform: "uppercase" }}>
                  Claude AI Bootcamp
                </p>
              </div>

              {/* Avatar */}
              <div
                style={{
                  margin: "auto 0",
                  width: "132px",
                  height: "132px",
                  borderRadius: "50%",
                  padding: "5px",
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}55)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: C.espresso,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {avatarSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarSrc}
                      alt={participantName}
                      width={122}
                      height={122}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <span style={{ fontFamily: C.serif, fontSize: "44px", color: C.beige50, lineHeight: 1 }}>
                      {initials(participantName)}
                    </span>
                  )}
                </div>
              </div>

              {/* Cert number at bottom */}
              <div style={{ width: "100%", marginTop: "auto" }}>
                <div style={{ width: "32px", height: "1px", background: accentColor, marginBottom: "10px", opacity: 0.5 }} />
                <p style={{ fontSize: "8px", fontWeight: 500, letterSpacing: "0.12em", color: `${C.taupe}99`, textTransform: "uppercase" }}>
                  {certificateNumber}
                </p>
              </div>
            </div>

            {/* ── Main content ── */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "48px 52px 40px 48px",
                position: "relative",
                background: C.beige50,
              }}
            >
              {/* Top decorative double rule */}
              <div style={{ marginBottom: "28px" }}>
                <div style={{ width: "100%", height: "1.5px", background: C.charcoal }} />
                <div style={{ width: "100%", height: "1px", background: accentColor, marginTop: "4px", opacity: 0.5 }} />
              </div>

              {/* Eyebrow */}
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: accentColor, marginBottom: "10px" }}>
                Certificate of Graduation
              </p>
              <p style={{ fontSize: "11px", color: C.taupe, marginBottom: "22px", letterSpacing: "0.01em" }}>
                This is to certify that
              </p>

              {/* Participant name */}
              <div style={{ marginBottom: "18px" }}>
                <p style={{ fontFamily: C.serif, fontSize: "46px", fontWeight: 300, color: C.charcoal, lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "12px" }}>
                  {participantName}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "48px", height: "1.5px", background: accentColor }} />
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accentColor, opacity: 0.6 }} />
                  <div style={{ flex: 1, height: "1px", background: C.beige300 }} />
                </div>
              </div>

              {/* Body */}
              <p style={{ fontSize: "11px", color: C.taupe, lineHeight: 1.7, marginBottom: "12px", letterSpacing: "0.01em" }}>
                has graduated from the
              </p>

              {/* Course */}
              <div style={{ marginBottom: "14px" }}>
                <p style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: `${accentColor}CC`, marginBottom: "4px" }}>
                  {courseSlug}
                </p>
                <p style={{ fontFamily: C.serif, fontSize: "24px", color: C.charcoal, lineHeight: 1.2, letterSpacing: "0.01em" }}>
                  {courseTitle}
                </p>
              </div>

              <p style={{ fontSize: "10px", fontWeight: 300, color: C.taupe, lineHeight: 1.75, letterSpacing: "0.01em", maxWidth: "500px", marginBottom: "auto" }}>
                ~ a four-week immersive programme building a working Claude stack: configured Projects, a briefed AI employee, a custom dashboard, and a daily routine ~ all running inside a real business.
              </p>

              {/* Footer */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                  <div style={{ flex: 1, height: "1px", background: C.beige300 }} />
                  <div style={{ width: "5px", height: "5px", background: accentColor, opacity: 0.5, transform: "rotate(45deg)" }} />
                  <div style={{ flex: 1, height: "1px", background: C.beige300 }} />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: "8px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: `${C.taupe}99`, marginBottom: "2px" }}>
                      Date of Issue
                    </p>
                    <p style={{ fontFamily: C.serif, fontSize: "13px", color: C.espresso, letterSpacing: "0.02em" }}>
                      {issuedDate}
                    </p>
                  </div>

                  {/* Seal */}
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      border: `1.5px solid ${accentColor}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0.85,
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "absolute", inset: "4px", borderRadius: "50%", border: `0.5px solid ${accentColor}`, opacity: 0.5 }} />
                    <span style={{ fontFamily: C.serif, fontSize: "18px", color: accentColor, lineHeight: 1 }}>TM</span>
                    <span style={{ fontSize: "6px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: accentColor, marginTop: "2px" }}>
                      Graduate
                    </span>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "8px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: `${C.taupe}99`, marginBottom: "2px" }}>
                      Certificate
                    </p>
                    <p style={{ fontFamily: C.serif, fontSize: "13px", color: C.espresso, letterSpacing: "0.05em" }}>
                      {certificateNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download */}
      <div className="flex justify-end">
        <button
          onClick={downloadPNG}
          disabled={downloading}
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-[var(--beige-200)] dark:border-white/10 bg-[var(--beige-100)] dark:bg-[var(--card)] text-[var(--charcoal-900)] dark:text-foreground hover:border-[var(--taupe-400)]/50 transition-all disabled:opacity-50"
        >
          <FileImage className="size-3.5" />
          {downloading ? "Generating…" : "Save certificate as image"}
        </button>
      </div>
    </div>
  );
}

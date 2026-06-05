"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, FileImage } from "lucide-react";

// TM brand tokens (explicit hex ,  CSS vars not available in html2canvas)
const C = {
  charcoal:   "#2A2520",
  beige50:    "#FAF8F5",
  beige100:   "#F5F0E8",
  beige200:   "#EBE4D8",
  beige300:   "#DED4C4",
  taupe:      "#9C8B7A",
  clay:       "#7D6B5A",
  espresso:   "#3D352E",
  serif:      "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  sans:       "'Manrope', system-ui, sans-serif",
} as const;

interface Props {
  certificateNumber: string;
  issuedAt: string;
  participantName: string;
  courseTitle: string;
  courseSlug: string;
  courseDescription: string | null;
}

export function CertificateView({
  certificateNumber,
  issuedAt,
  participantName,
  courseTitle,
  courseSlug,
  courseDescription,
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

  const formattedDate = new Date(issuedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const descriptionText = courseDescription
    ? courseDescription
    : "a comprehensive 4-week immersive curriculum exploring the foundations, practical delegation, and real-world integration of Claude AI within a modern business environment";

  async function downloadPNG() {
    if (!certRef.current || downloading) return;
    setDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(certRef.current, {
        pixelRatio: 2,
        backgroundColor: C.beige50,
        style: {
          transform: "scale(1)",
        },
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
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <Link
          href="/participant/certificates"
          className="inline-flex items-center gap-2 text-sm text-[var(--taupe-400)] hover:text-[var(--charcoal-900)] transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          All certificates
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadPNG}
            disabled={downloading}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-[var(--beige-200)] dark:border-white/10 bg-[var(--beige-100)] dark:bg-[var(--card)] text-[var(--charcoal-900)] dark:text-foreground hover:border-[var(--taupe-400)]/50 transition-all disabled:opacity-50"
          >
            <FileImage className="size-3.5" />
            {downloading ? "Generating…" : "Save as Image"}
          </button>
        </div>
      </div>

      {/* Certificate ,  fixed 960×640 internal, scales via ResizeObserver */}
      <div
        ref={wrapperRef}
        style={{
          width: "100%",
          aspectRatio: "960 / 640",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 60px -10px rgb(42 37 32 / 0.20), 0 4px 16px -4px rgb(42 37 32 / 0.10)",
          borderRadius: "4px",
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
              width: "220px",
              flexShrink: 0,
              background: C.charcoal,
              display: "flex",
              flexDirection: "column",
              padding: "40px 28px",
              position: "relative",
            }}
          >
            {/* Brand mark */}
            <div style={{ marginBottom: "auto" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: `1.5px solid ${C.clay}`,
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontFamily: C.serif,
                    fontSize: "16px",
                    fontWeight: 400,
                    color: C.clay,
                    letterSpacing: "0.02em",
                  }}
                >
                  TM
                </span>
              </div>
              <p
                style={{
                  fontFamily: C.sans,
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.taupe,
                  marginBottom: "2px",
                }}
              >
                TalentMucho
              </p>
              <p
                style={{
                  fontFamily: C.sans,
                  fontSize: "8px",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  color: `${C.taupe}99`,
                  textTransform: "uppercase",
                }}
              >
                Claude AI Bootcamp
              </p>
            </div>

            {/* Vertical decorative line */}
            <div
              style={{
                position: "absolute",
                right: "0",
                top: "60px",
                bottom: "60px",
                width: "1px",
                background: `linear-gradient(to bottom, transparent, ${C.clay}40 20%, ${C.clay}40 80%, transparent)`,
              }}
            />

            {/* Rotated program label */}
            <div
              style={{
                position: "absolute",
                bottom: "120px",
                left: "0",
                width: "220px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: C.sans,
                  fontSize: "8px",
                  fontWeight: 600,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: `${C.clay}80`,
                  transform: "rotate(-90deg)",
                  whiteSpace: "nowrap",
                }}
              >
                Certificate of Completion
              </span>
            </div>

            {/* Cert number at bottom */}
            <div style={{ marginTop: "auto", paddingTop: "20px" }}>
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: C.clay,
                  marginBottom: "10px",
                  opacity: 0.4,
                }}
              />
              <p
                style={{
                  fontFamily: C.sans,
                  fontSize: "8px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  color: `${C.taupe}80`,
                  textTransform: "uppercase",
                }}
              >
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
            <div style={{ marginBottom: "32px" }}>
              <div style={{ width: "100%", height: "1.5px", background: C.charcoal }} />
              <div style={{ width: "100%", height: "1px", background: C.clay, marginTop: "4px", opacity: 0.5 }} />
            </div>

            {/* Eyebrow */}
            <p
              style={{
                fontFamily: C.sans,
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: C.clay,
                marginBottom: "28px",
              }}
            >
              This is to certify that
            </p>

            {/* Participant name */}
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  fontFamily: C.serif,
                  fontSize: "42px",
                  fontWeight: 300,
                  color: C.charcoal,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  marginBottom: "10px",
                }}
              >
                {participantName}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div style={{ width: "48px", height: "1.5px", background: C.clay }} />
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.clay, opacity: 0.5 }} />
                <div style={{ flex: 1, height: "1px", background: C.beige300 }} />
              </div>
            </div>

            {/* Body text */}
            <p
              style={{
                fontFamily: C.sans,
                fontSize: "11px",
                fontWeight: 400,
                color: C.taupe,
                lineHeight: 1.7,
                marginBottom: "14px",
                letterSpacing: "0.01em",
              }}
            >
              has successfully completed all requirements of the
            </p>

            {/* Course */}
            <div style={{ marginBottom: "16px" }}>
              <p
                style={{
                  fontFamily: C.sans,
                  fontSize: "8px",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: `${C.clay}99`,
                  marginBottom: "4px",
                }}
              >
                {courseSlug}
              </p>
              <p
                style={{
                  fontFamily: C.serif,
                  fontSize: "22px",
                  fontWeight: 400,
                  color: C.charcoal,
                  lineHeight: 1.2,
                  letterSpacing: "0.01em",
                }}
              >
                {courseTitle}
              </p>
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: C.sans,
                fontSize: "10px",
                fontWeight: 300,
                color: C.taupe,
                lineHeight: 1.75,
                letterSpacing: "0.01em",
                maxWidth: "520px",
                marginBottom: "auto",
              }}
            >
              ,  {descriptionText}, as part of the Claude AI Bootcamp by TalentMucho.
            </p>

            {/* Bottom rule + footer */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <div style={{ flex: 1, height: "1px", background: C.beige300 }} />
                <div style={{ width: "5px", height: "5px", background: C.clay, opacity: 0.4, transform: "rotate(45deg)" }} />
                <div style={{ flex: 1, height: "1px", background: C.beige300 }} />
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p
                    style={{
                      fontFamily: C.sans,
                      fontSize: "8px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: `${C.taupe}80`,
                      marginBottom: "2px",
                    }}
                  >
                    Date of Issue
                  </p>
                  <p
                    style={{
                      fontFamily: C.serif,
                      fontSize: "13px",
                      fontWeight: 400,
                      color: C.espresso,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {formattedDate}
                  </p>
                </div>

                {/* Seal */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    border: `1.5px solid ${C.clay}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.7,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: "4px",
                      borderRadius: "50%",
                      border: `0.5px solid ${C.clay}`,
                      opacity: 0.5,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: C.serif,
                      fontSize: "18px",
                      fontWeight: 400,
                      color: C.clay,
                      lineHeight: 1,
                    }}
                  >
                    TM
                  </span>
                  <span
                    style={{
                      fontFamily: C.sans,
                      fontSize: "6px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: C.clay,
                      marginTop: "2px",
                    }}
                  >
                    Verified
                  </span>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontFamily: C.sans,
                      fontSize: "8px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: `${C.taupe}80`,
                      marginBottom: "2px",
                    }}
                  >
                    Certificate
                  </p>
                  <p
                    style={{
                      fontFamily: C.serif,
                      fontSize: "13px",
                      fontWeight: 400,
                      color: C.espresso,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {certificateNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

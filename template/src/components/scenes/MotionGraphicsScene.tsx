import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type MotionGraphicsType =
  | "comparison"
  | "checklist"
  | "flow"
  | "time"
  | "quote_cta";

export interface MotionGraphicsSceneProps {
  type: MotionGraphicsType;
  title: string;
  subtitle?: string;
  badge?: string;
  // Comparison
  comparisonLeft?: { title: string; points: string[]; color?: string; badge?: string };
  comparisonRight?: { title: string; points: string[]; color?: string; badge?: string };
  // Checklist
  checklistItems?: Array<{ text: string; icon?: string; active?: boolean }>;
  // Flow
  flowSteps?: Array<{ step: number; title: string; desc?: string }>;
  // Time
  timeLabel?: string;
  timeDetail?: string;
  timeIcon?: "clock" | "calendar";
  // Quote / CTA
  quoteText?: string;
  quoteAuthor?: string;
  optionsCTA?: string[];
  backgroundGradient?: string;
}

export const MotionGraphicsScene: React.FC<MotionGraphicsSceneProps> = ({
  type,
  title,
  subtitle,
  badge,
  comparisonLeft,
  comparisonRight,
  checklistItems = [],
  flowSteps = [],
  timeLabel,
  timeDetail,
  timeIcon = "clock",
  quoteText,
  quoteAuthor,
  optionsCTA = [],
  backgroundGradient = "linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header pop-in
  const headerSpring = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });

  return (
    <AbsoluteFill
      style={{
        width: "100%",
        height: "100%",
        background: backgroundGradient,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "120px 48px 80px 48px",
        fontFamily: "'Hind Siliguri', sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Top Category Badge */}
      {badge && (
        <div
          style={{
            backgroundColor: "#f59e0b",
            color: "#0f172a",
            fontWeight: 900,
            fontSize: 24,
            padding: "8px 24px",
            borderRadius: 30,
            border: "2.5px solid #222222",
            marginBottom: 24,
            boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
            transform: `scale(${headerSpring})`,
          }}
        >
          {badge}
        </div>
      )}

      {/* 2. Main Title */}
      <h1
        style={{
          color: "#ffffff",
          fontSize: 44,
          fontWeight: 800,
          textAlign: "center",
          margin: "0 0 16px 0",
          lineHeight: 1.25,
          textShadow: "0 4px 12px rgba(0,0,0,0.5)",
          transform: `scale(${headerSpring})`,
          maxWidth: 960,
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            color: "#94a3b8",
            fontSize: 26,
            textAlign: "center",
            margin: "0 0 48px 0",
            maxWidth: 820,
          }}
        >
          {subtitle}
        </p>
      )}

      {/* 3. Dynamic Mode Content */}
      <div
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* MODE A: COMPARISON (Vertical Stack for 9:16 Shorts/Reels Full Screen Balance) */}
        {type === "comparison" && comparisonLeft && comparisonRight && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: 920,
              gap: 42,
              justifyContent: "center",
            }}
          >
            {/* Top Card: Wrong Approach / Ego */}
            <div
              style={{
                width: "100%",
                backgroundColor: "rgba(30, 41, 59, 0.94)",
                border: `3.5px solid ${comparisonLeft.color || "#ef4444"}`,
                borderRadius: 28,
                padding: "36px 40px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 18px 45px rgba(0,0,0,0.55), 0 0 25px rgba(239, 68, 68, 0.2)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ color: "#ffffff", fontSize: 36, fontWeight: 800, margin: 0 }}>
                  {comparisonLeft.title}
                </h3>
                <div
                  style={{
                    backgroundColor: comparisonLeft.color || "#ef4444",
                    color: "#ffffff",
                    fontSize: 22,
                    fontWeight: 800,
                    padding: "6px 20px",
                    borderRadius: 16,
                  }}
                >
                  {comparisonLeft.badge || "ভুল পথ ✖"}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {comparisonLeft.points.map((pt, i) => (
                  <div
                    key={i}
                    style={{
                      color: "#e2e8f0",
                      fontSize: 30,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                    }}
                  >
                    <span style={{ color: comparisonLeft.color || "#ef4444", fontSize: 28, fontWeight: 900 }}>✖</span>
                    {pt}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Card: True Character / Power Law */}
            <div
              style={{
                width: "100%",
                backgroundColor: "rgba(30, 41, 59, 0.94)",
                border: `3.5px solid ${comparisonRight.color || "#22c55e"}`,
                borderRadius: 28,
                padding: "36px 40px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 18px 45px rgba(0,0,0,0.55), 0 0 25px rgba(34, 197, 94, 0.2)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ color: "#ffffff", fontSize: 36, fontWeight: 800, margin: 0 }}>
                  {comparisonRight.title}
                </h3>
                <div
                  style={{
                    backgroundColor: comparisonRight.color || "#22c55e",
                    color: "#ffffff",
                    fontSize: 22,
                    fontWeight: 800,
                    padding: "6px 20px",
                    borderRadius: 16,
                  }}
                >
                  {comparisonRight.badge || "সঠিক শিক্ষা ✔"}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {comparisonRight.points.map((pt, i) => (
                  <div
                    key={i}
                    style={{
                      color: "#e2e8f0",
                      fontSize: 30,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                    }}
                  >
                    <span style={{ color: comparisonRight.color || "#22c55e", fontSize: 28, fontWeight: 900 }}>✔</span>
                    {pt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODE B: CHECKLIST / PROGRESS */}
        {type === "checklist" && (
          <div
            style={{
              width: "100%",
              maxWidth: 880,
              display: "flex",
              flexDirection: "column",
              gap: 26,
            }}
          >
            {checklistItems.map((item, i) => {
              const itemDelay = i * 4;
              const itemSpring = spring({
                frame: Math.max(0, frame - itemDelay),
                fps,
                config: { damping: 14, stiffness: 160 },
              });
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: "rgba(30, 41, 59, 0.94)",
                    border: "2.5px solid #3b82f6",
                    borderRadius: 24,
                    padding: "26px 32px",
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    transform: `scale(${itemSpring})`,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: item.active !== false ? "#22c55e" : "#e11d48",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 32,
                      color: "#ffffff",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon || "✅"}
                  </div>
                  <div style={{ color: "#f8fafc", fontSize: 32, fontWeight: 700, lineHeight: 1.3 }}>
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODE C: FLOW / PROCESS */}
        {type === "flow" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
              width: "100%",
              maxWidth: 920,
            }}
          >
            {flowSteps.map((s, i) => {
              const stepSpring = spring({
                frame: Math.max(0, frame - i * 4),
                fps,
                config: { damping: 14, stiffness: 160 },
              });
              return (
                <React.Fragment key={i}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 26,
                      width: "100%",
                      backgroundColor: "rgba(15, 23, 42, 0.94)",
                      border: "3px solid #eab308",
                      borderRadius: 24,
                      padding: "30px 36px",
                      transform: `scale(${stepSpring})`,
                      boxShadow: "0 16px 40px rgba(0,0,0,0.45), 0 0 20px rgba(234, 179, 8, 0.2)",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        width: 74,
                        height: 74,
                        borderRadius: 20,
                        backgroundColor: "#eab308",
                        color: "#0f172a",
                        fontSize: 38,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {s.step || i + 1}
                    </div>
                    <div>
                      <div style={{ color: "#ffffff", fontSize: 34, fontWeight: 800 }}>
                        {s.title}
                      </div>
                      {s.desc && (
                        <div style={{ color: "#94a3b8", fontSize: 26, marginTop: 6, fontWeight: 500 }}>
                          {s.desc}
                        </div>
                      )}
                    </div>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div style={{ color: "#eab308", fontSize: 32, fontWeight: 900, opacity: 0.9 }}>
                      ⬇️
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* MODE D: TIME & CALENDAR */}
        {type === "time" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 28,
            }}
          >
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                backgroundColor: "#fef08a",
                border: "4px solid #eab308",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 70,
                boxShadow: "0 0 40px rgba(234, 179, 8, 0.4)",
              }}
            >
              {timeIcon === "calendar" ? "📅" : "⏳"}
            </div>
            <div
              style={{
                color: "#f8fafc",
                fontSize: 38,
                fontWeight: 800,
                maxWidth: 700,
                lineHeight: 1.3,
              }}
            >
              {timeLabel || "কিছু দিন পর..."}
            </div>
            {timeDetail && (
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: 26,
                  maxWidth: 600,
                }}
              >
                {timeDetail}
              </div>
            )}
          </div>
        )}

        {/* MODE E: QUOTE / CTA */}
        {type === "quote_cta" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: 820,
            }}
          >
            <div style={{ fontSize: 60, color: "#eab308", marginBottom: 12 }}>“</div>
            <blockquote
              style={{
                color: "#ffffff",
                fontSize: 34,
                fontWeight: 700,
                lineHeight: 1.45,
                margin: "0 0 24px 0",
                textShadow: "0 4px 15px rgba(0,0,0,0.4)",
              }}
            >
              {quoteText}
            </blockquote>
            {quoteAuthor && (
              <div
                style={{
                  color: "#f59e0b",
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                }}
              >
                — {quoteAuthor}
              </div>
            )}

            {optionsCTA.length > 0 && (
              <div
                style={{
                  marginTop: 48,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  width: "100%",
                }}
              >
                {optionsCTA.map((opt, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "2px solid rgba(255,255,255,0.2)",
                      borderRadius: 16,
                      padding: "16px 24px",
                      color: "#ffffff",
                      fontSize: 26,
                      fontWeight: 700,
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

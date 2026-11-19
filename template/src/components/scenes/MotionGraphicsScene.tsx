import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { MarkerHighlight, TornPaperCard, SubtitlePill } from "../overlays";
import { AnimatedCursor, CountUpNumber, ParticleBurst } from "../interactive";

export type MotionGraphicsType =
  | "comparison"
  | "checklist"
  | "flow"
  | "time"
  | "quote_cta"
  | "app_demo";

export interface MotionGraphicsSceneProps {
  type: MotionGraphicsType;
  title: string;
  subtitle?: string;
  badge?: string;
  imageSrc?: string;
  narration?: string;
  words?: Array<{ word: string; start: number; end: number }>;
  highlightWords?: string[];
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
  optionsCTA?: string[] | { header?: string; optionA?: string; optionB?: string; prompt?: string };
  backgroundGradient?: string;
  browserUrl?: string;
  interactiveCursor?: any;
  countUp?: any;
  particleBurst?: any;
  markerHighlight?: any;
  tornPaperCard?: any;
}

export const MotionGraphicsScene: React.FC<MotionGraphicsSceneProps> = ({
  type,
  title,
  subtitle,
  badge,
  imageSrc,
  narration,
  words,
  highlightWords = [],
  comparisonLeft,
  comparisonRight,
  checklistItems = [],
  flowSteps = [],
  timeLabel,
  timeDetail,
  timeIcon = "clock",
  quoteText,
  quoteAuthor,
  optionsCTA,
  backgroundGradient = "radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.12) 0%, transparent 60%), radial-gradient(#1e293b 1.5px, transparent 1.5px), #0b0f17",
  browserUrl,
  interactiveCursor,
  countUp,
  particleBurst,
  markerHighlight,
  tornPaperCard,
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
        backgroundSize: "100% 100%, 36px 36px, 100% 100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "100px 44px 80px 44px",
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
        {type === "comparison" && comparisonLeft && comparisonRight && (() => {
          // Dynamic Staggered Reveal: Top Card enters immediately, Bottom Card activates on moral punchline!
          const topCardSpring = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
          const bottomCardStartFrame = 255; // ~8.5s in, when narration transitions to true character
          const bottomActive = frame >= bottomCardStartFrame;
          const bottomCardSpring = spring({
            frame: Math.max(0, frame - bottomCardStartFrame),
            fps,
            config: { damping: 14, stiffness: 120 },
          });

          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: 920,
                gap: 36,
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
                  padding: "32px 36px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 18px 45px rgba(0,0,0,0.55), 0 0 25px rgba(239, 68, 68, 0.2)",
                  boxSizing: "border-box",
                  transform: `scale(${topCardSpring})`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <h3 style={{ color: "#ffffff", fontSize: 34, fontWeight: 800, margin: 0 }}>
                    {comparisonLeft.title}
                  </h3>
                  <div
                    style={{
                      backgroundColor: comparisonLeft.color || "#ef4444",
                      color: "#ffffff",
                      fontSize: 20,
                      fontWeight: 800,
                      padding: "6px 18px",
                      borderRadius: 16,
                    }}
                  >
                    {comparisonLeft.badge || "ভুল পথ ✖"}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {comparisonLeft.points.map((pt, i) => {
                    // Stagger points: 0.5s, 2.0s, 3.8s, 5.5s
                    const ptStart = Math.round(fps * (0.5 + i * 1.6));
                    const isPtVisible = frame >= ptStart;
                    const ptProgress = interpolate(frame - ptStart, [0, 8], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    });
                    const ptScale = interpolate(ptProgress, [0, 1], [0.92, 1.0]);

                    return (
                      <div
                        key={i}
                        style={{
                          color: "#e2e8f0",
                          fontSize: 28,
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          opacity: isPtVisible ? ptProgress : 0.12,
                          transform: isPtVisible ? `scale(${ptScale})` : "none",
                          transition: "opacity 0.2s ease",
                        }}
                      >
                        <span style={{ color: comparisonLeft.color || "#ef4444", fontSize: 26, fontWeight: 900 }}>✖</span>
                        {pt}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Card: True Character / Power Law */}
              <div
                style={{
                  width: "100%",
                  backgroundColor: bottomActive ? "rgba(30, 41, 59, 0.96)" : "rgba(15, 23, 42, 0.6)",
                  border: bottomActive
                    ? `3.5px solid ${comparisonRight.color || "#22c55e"}`
                    : "2px dashed rgba(255, 255, 255, 0.2)",
                  borderRadius: 28,
                  padding: "32px 36px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: bottomActive
                    ? "0 18px 45px rgba(0,0,0,0.55), 0 0 30px rgba(34, 197, 94, 0.35)"
                    : "none",
                  boxSizing: "border-box",
                  transform: bottomActive ? `scale(${bottomCardSpring})` : "scale(0.96)",
                  opacity: bottomActive ? 1.0 : 0.4,
                  transition: "border 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <h3 style={{ color: bottomActive ? "#ffffff" : "#94a3b8", fontSize: 34, fontWeight: 800, margin: 0 }}>
                    {comparisonRight.title}
                  </h3>
                  <div
                    style={{
                      backgroundColor: bottomActive ? (comparisonRight.color || "#22c55e") : "rgba(255,255,255,0.15)",
                      color: "#ffffff",
                      fontSize: 20,
                      fontWeight: 800,
                      padding: "6px 18px",
                      borderRadius: 16,
                    }}
                  >
                    {comparisonRight.badge || "সঠিক শিক্ষা ✔"}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {comparisonRight.points.map((pt, i) => {
                    // Stagger points: 9.0s, 11.0s, 13.0s, 15.0s
                    const ptStart = bottomCardStartFrame + Math.round(fps * (0.5 + i * 1.8));
                    const isPtVisible = frame >= ptStart;
                    const ptProgress = interpolate(frame - ptStart, [0, 8], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    });
                    const ptScale = interpolate(ptProgress, [0, 1], [0.92, 1.0]);

                    return (
                      <div
                        key={i}
                        style={{
                          color: bottomActive ? "#e2e8f0" : "#64748b",
                          fontSize: 28,
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          opacity: isPtVisible ? ptProgress : bottomActive ? 0.2 : 0.1,
                          transform: isPtVisible ? `scale(${ptScale})` : "none",
                        }}
                      >
                        <span style={{ color: bottomActive ? (comparisonRight.color || "#22c55e") : "#64748b", fontSize: 26, fontWeight: 900 }}>✔</span>
                        {pt}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

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
                    <div
                      style={{
                        position: "relative",
                        width: 8,
                        height: 56,
                        backgroundColor: "rgba(234, 179, 8, 0.25)",
                        borderRadius: 4,
                        margin: "4px auto",
                        overflow: "hidden",
                      }}
                    >
                      {/* Flowing electric spark / data packet traveling down */}
                      <div
                        style={{
                          position: "absolute",
                          top: `${((frame * 3 + i * 25) % 80) - 24}px`,
                          left: -2,
                          width: 12,
                          height: 24,
                          borderRadius: 6,
                          background: "linear-gradient(180deg, #FFFFFF 0%, #FDE047 50%, #EAB308 100%)",
                          boxShadow: "0 0 16px #FDE047, 0 0 8px #FFFFFF",
                        }}
                      />
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

            {optionsCTA && (
              <div
                style={{
                  marginTop: 36,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  width: "100%",
                }}
              >
                {typeof optionsCTA === "object" && !Array.isArray(optionsCTA) ? (
                  <>
                    {(optionsCTA as any).header && (
                      <div
                        style={{
                          color: "#38bdf8",
                          fontSize: 26,
                          fontWeight: 800,
                          marginBottom: 4,
                        }}
                      >
                        {(optionsCTA as any).header}
                      </div>
                    )}
                    {(optionsCTA as any).optionA && (
                      <div
                        style={{
                          backgroundColor: "rgba(56, 189, 248, 0.12)",
                          border: "2px solid #38bdf8",
                          borderRadius: 16,
                          padding: "16px 24px",
                          color: "#ffffff",
                          fontSize: 24,
                          fontWeight: 700,
                        }}
                      >
                        {(optionsCTA as any).optionA}
                      </div>
                    )}
                    {(optionsCTA as any).optionB && (
                      <div
                        style={{
                          backgroundColor: "rgba(34, 197, 94, 0.12)",
                          border: "2px solid #22c55e",
                          borderRadius: 16,
                          padding: "16px 24px",
                          color: "#ffffff",
                          fontSize: 24,
                          fontWeight: 700,
                        }}
                      >
                        {(optionsCTA as any).optionB}
                      </div>
                    )}
                    {(optionsCTA as any).prompt && (
                      <div
                        style={{
                          color: "#facc15",
                          fontSize: 22,
                          fontWeight: 800,
                          marginTop: 6,
                        }}
                      >
                        {(optionsCTA as any).prompt}
                      </div>
                    )}
                  </>
                ) : Array.isArray(optionsCTA) && optionsCTA.length > 0 ? (
                  optionsCTA.map((opt, i) => (
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
                  ))
                ) : null}
              </div>
            )}
          </div>
        )}

        {/* MODE F: APP / SOFTWARE DEMO SHOWCASE */}
        {type === "app_demo" && imageSrc && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `scale(${spring({ frame, fps, config: { damping: 14, stiffness: 140 } })})`,
              marginTop: 10,
            }}
          >
            {/* Modern Mac/Browser Glassmorphic Window */}
            <div
              style={{
                width: "100%",
                maxWidth: 980,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2.5px solid rgba(255, 255, 255, 0.18)",
                borderRadius: 24,
                boxShadow:
                  "0 24px 60px rgba(0, 0, 0, 0.75), 0 0 40px rgba(34, 197, 94, 0.2)",
                padding: "16px 20px 20px 20px",
                boxSizing: "border-box",
                backdropFilter: "blur(14px)",
              }}
            >
              {/* Window Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                  padding: "0 4px",
                }}
              >
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#EF4444" }} />
                  <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
                  <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#10B981" }} />
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 20,
                    padding: "4px 24px",
                    color: "#94A3B8",
                    fontSize: 18,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 14 }}>🔒</span> {browserUrl || "https://bikroyplus.com"}
                </div>
                <div style={{ width: 44 }} />
              </div>

              {/* The Real Screenshot */}
              <Img
                src={staticFile(imageSrc)}
                style={{
                  width: "100%",
                  maxHeight: 920,
                  objectFit: "contain",
                  borderRadius: 14,
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Vox-Style Torn Paper Card */}
      {tornPaperCard && <TornPaperCard config={tornPaperCard} />}

      {/* Vox-Style Marker Highlight */}
      {markerHighlight && <MarkerHighlight config={markerHighlight} />}

      {/* UI Micro-Interactions: Live Number Ticker & Animated Mouse Cursor */}
      {countUp && <CountUpNumber config={countUp} />}
      {interactiveCursor && <AnimatedCursor config={interactiveCursor} />}

      {/* Dynamic Particle Burst (Confetti / Cash Rain / Sparkles) */}
      {particleBurst && <ParticleBurst config={particleBurst} />}

      {/* 5. Bottom Subtitle Pill */}
      {narration && (
        <SubtitlePill
          text={narration}
          words={words}
          highlightWords={highlightWords}
          bottom={60}
          durationInFrames={Math.round(fps * 6)}
        />
      )}
    </AbsoluteFill>
  );
};

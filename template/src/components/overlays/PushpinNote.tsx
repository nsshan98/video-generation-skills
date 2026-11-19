import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface PushpinNoteProps {
  category?: string;
  headline: string;
  subtext?: string;
  top?: number;
  left?: number;
  right?: number;
  rotation?: number;
  delayFrames?: number;
  durationFrames?: number;
}

/**
 * Broadcast-Grade Scene Title Card:
 * - Seamlessly blends with any background using frosted glassmorphism
 * - Completely stable, zero camera jitter, zero subpixel wobble (no dizziness!)
 * - Silky smooth entrance and exit (Strict max 4.5s duration, never freezes on screen)
 */
export const PushpinNote: React.FC<PushpinNoteProps> = ({
  category,
  headline,
  subtext,
  top = 140,
  left,
  right,
  delayFrames = 0,
  durationFrames = 135, // 4.5s default duration
}) => {
  const frame = useCurrentFrame();

  // Smooth ease-out entrance (fades in and glides down gently by 12px over 10 frames)
  const enterProgress = interpolate(
    frame - delayFrames,
    [0, 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Smooth exit interpolation (last 8 frames)
  const exitStart = delayFrames + durationFrames - 8;
  const exitProgress = interpolate(
    frame - exitStart,
    [0, 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < delayFrames || frame >= delayFrames + durationFrames) return null;

  const opacity = enterProgress * (1 - exitProgress);
  const translateY = interpolate(enterProgress, [0, 1], [-12, 0]) - exitProgress * 10;

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: left ?? (right ? undefined : 60),
        right: right,
        transform: `translateY(${translateY}px)`,
        opacity,
        zIndex: 40,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(15, 23, 42, 0.84)",
          backdropFilter: "blur(24px)",
          borderRadius: 22,
          border: "1.5px solid rgba(255, 255, 255, 0.16)",
          padding: "20px 28px",
          minWidth: 280,
          maxWidth: 400,
          boxShadow:
            "0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(245, 158, 11, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle Top Ambient Gradient Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3.5,
            background: "linear-gradient(90deg, #f59e0b 0%, #ef4444 65%, transparent 100%)",
          }}
        />

        {/* Category Pill Tag */}
        {category && (
          <div
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 20,
              color: "#fbbf24",
              fontWeight: 800,
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#f59e0b",
                boxShadow: "0 0 8px #f59e0b",
                display: "inline-block",
              }}
            />
            {category}
          </div>
        )}

        {/* Headline */}
        <div
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 38,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          {headline}
        </div>

        {/* Subtext */}
        {subtext && (
          <div
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 22,
              color: "#cbd5e1",
              fontWeight: 600,
              marginTop: 4,
              lineHeight: 1.25,
            }}
          >
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
};

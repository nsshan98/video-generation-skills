import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface TopHookCardProps {
  line1?: string;
  line2?: string;
  text?: string;
  subtext?: string;
  badge?: string;
  top?: number;
  delayFrames?: number;
  durationFrames?: number;
}

/**
 * High-Retention Top Hook Card (Inspired by reference video frame 3):
 * - Placed at top-center during hook scene
 * - Line 1 in crisp bold white (curiosity setup)
 * - Line 2 in vibrant golden-yellow (dramatic punchline/twist)
 * - Sleek dark glass capsule with golden accent border
 * - Smooth entrance and timed exit fade (Strict max 4.5-5.0s, never hangs on screen)
 */
export const TopHookCard: React.FC<TopHookCardProps> = ({
  line1,
  line2,
  text,
  subtext,
  badge,
  top = 150,
  delayFrames = 0,
  durationFrames = 135, // 4.5s default duration
}) => {
  const frame = useCurrentFrame();

  const displayLine1 = line1 || (badge ? `★ ${badge} ★` : text) || "";
  const displayLine2 = line2 || (line1 ? subtext : text) || subtext || "";

  // Entrance interpolation (10 frames)
  const enterProgress = interpolate(
    frame - delayFrames,
    [0, 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Exit interpolation (last 8 frames)
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
        left: "50%",
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        zIndex: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        maxWidth: 820,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(15, 23, 42, 0.94)",
          backdropFilter: "blur(24px)",
          border: "3px solid #eab308",
          borderRadius: 24,
          padding: "24px 36px",
          width: "100%",
          textAlign: "center",
          boxShadow:
            "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(234, 179, 8, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* Line 1: White Hook Setup */}
        <div
          style={{
            fontFamily: "'Hind Siliguri', sans-serif",
            fontSize: 34,
            fontWeight: 800,
            color: "#f8fafc",
            lineHeight: 1.3,
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
          }}
        >
          {displayLine1}
        </div>

        {/* Line 2: Radiant Gold Punchline / Twist */}
        <div
          style={{
            fontFamily: "'Hind Siliguri', sans-serif",
            fontSize: 40,
            fontWeight: 900,
            color: "#facc15",
            lineHeight: 1.3,
            textShadow:
              "0 0 16px rgba(250, 204, 21, 0.7), 0 2px 8px rgba(0, 0, 0, 0.9)",
          }}
        >
          {displayLine2}
        </div>
      </div>
    </div>
  );
};

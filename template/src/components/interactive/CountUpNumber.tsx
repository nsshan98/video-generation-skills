import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { CountUpConfig } from "../../timelineTypes";

interface CountUpNumberProps {
  config?: CountUpConfig;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!config) return null;

  const durationFrames = config.durationFrames ?? Math.round(fps * 1.2);
  const fromVal = config.from ?? 0;
  const toVal = config.to ?? 100;
  const prefix = config.prefix ?? "";
  const suffix = config.suffix ?? "";

  // Snappy spring entrance for the whole badge
  const cardScale = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 140 },
  });

  // Ease-out counter
  const progress = interpolate(frame, [4, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cubic ease-out calculation
  const eased = 1 - Math.pow(1 - progress, 3);
  const currentVal = Math.round(fromVal + (toVal - fromVal) * eased);
  const formattedVal = currentVal.toLocaleString("en-US");

  const posX = config.position?.x ?? 540;
  const posY = config.position?.y ?? 620;

  return (
    <div
      style={{
        position: "absolute",
        left: posX,
        top: posY,
        transform: `translate(-50%, -50%) scale(${cardScale})`,
        zIndex: 65,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.94) 100%)",
          border: "2.5px solid #22C55E",
          boxShadow: "0 12px 36px rgba(0,0,0,0.6), 0 0 24px rgba(34,197,94,0.35)",
          borderRadius: "28px",
          padding: "18px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "320px",
          backdropFilter: "blur(12px)",
        }}
      >
        {config.label && (
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#94A3B8",
              fontFamily: "'Hind Siliguri', sans-serif",
              marginBottom: "6px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {config.label}
          </div>
        )}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 900,
            color: "#FFFFFF",
            fontFamily: "'Hind Siliguri', sans-serif",
            letterSpacing: "1px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            lineHeight: 1.1,
          }}
        >
          {prefix && <span style={{ color: "#22C55E" }}>{prefix}</span>}
          <span>{formattedVal}</span>
          {suffix && <span style={{ color: "#F59E0B", fontSize: "44px" }}>{suffix}</span>}
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { TopProgressBarConfig } from "../../timelineTypes";

interface TopProgressBarProps {
  config?: boolean | TopProgressBarConfig;
}

export const TopProgressBar: React.FC<TopProgressBarProps> = ({ config }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  if (!config) return null;

  const conf = typeof config === "object" ? config : {};
  if (conf.enabled === false) return null;

  const barColor = conf.color || "linear-gradient(90deg, #22C55E 0%, #10B981 70%, #EAB308 100%)";
  const height = conf.height ?? 8;
  const showGlow = conf.glow ?? true;

  const progress = Math.min(1, Math.max(0, frame / (durationInFrames || 1)));

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: `${height}px`,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          background: barColor,
          borderRadius: "0 4px 4px 0",
          boxShadow: showGlow
            ? "0 0 16px rgba(34, 197, 94, 0.8), 0 0 4px rgba(255, 255, 255, 0.9)"
            : "none",
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
};

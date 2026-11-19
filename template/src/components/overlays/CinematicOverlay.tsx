import React from "react";
import { AbsoluteFill } from "remotion";

interface CinematicOverlayProps {
  enabled?: boolean;
  vignetteStrength?: number; // 0 to 1, default 0.4
}

export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({
  enabled = true,
  vignetteStrength = 0.4,
}) => {
  if (!enabled) return null;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        zIndex: 9000,
        mixBlendMode: "multiply",
      }}
    >
      {/* 1. Cinematic Corner Vignette (Radial Gradient) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, ${vignetteStrength}) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

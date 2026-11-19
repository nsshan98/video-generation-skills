import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { MarkerHighlightConfig } from "../../timelineTypes";

interface MarkerHighlightProps {
  config?: MarkerHighlightConfig;
}

export const MarkerHighlight: React.FC<MarkerHighlightProps> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!config || !config.text) return null;

  const startFrame = config.startFrame ?? Math.round(fps * 0.4);
  const durationFrames = config.durationFrames ?? Math.round(fps * 0.6);
  const highlightColor = config.color || "#FDE047"; // Classic yellow marker

  if (frame < startFrame) return null;

  const age = frame - startFrame;
  const strokeProgress = interpolate(age, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardPop = spring({
    frame: age,
    fps,
    config: { damping: 14, stiffness: 160 },
  });

  // Overlap prevention safeguard: Never allow bottom closer than 280px to prevent colliding with SubtitlePill
  const safeBottom = config.position?.bottom !== undefined
    ? `${Math.max(config.position.bottom, 280)}px`
    : undefined;

  const safeTop = config.position?.top !== undefined
    ? `${config.position.top}px`
    : (safeBottom ? undefined : "460px");

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: safeTop,
        bottom: safeBottom,
        transform: `translateX(-50%) scale(${cardPop})`,
        zIndex: 68,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
          padding: "10px 28px",
        }}
      >
        {/* Animated highlighter stroke background */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: "4px",
            width: `${strokeProgress * 100}%`,
            height: "82%",
            backgroundColor: highlightColor,
            borderRadius: "4px",
            transform: "rotate(-1.2deg) skewX(-4deg)",
            boxShadow: `0 0 20px ${highlightColor}88`,
            zIndex: 1,
            opacity: 0.95,
          }}
        />

        {/* Text sitting proudly on top */}
        <span
          style={{
            position: "relative",
            zIndex: 2,
            fontFamily: "'Hind Siliguri', sans-serif",
            fontSize: "42px",
            fontWeight: 900,
            color: "#0F172A",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
          }}
        >
          {config.text}
        </span>
      </div>
    </div>
  );
};

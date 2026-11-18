import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface AngledStickerProps {
  text: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  angle?: number;
  delayFrames?: number;
}

/**
 * High-Impact Callout Sticker:
 * - Seamlessly blends with rich scenes using warm crimson/amber glass styling
 * - Smooth ease-in (NO wild spring oscillations that cause dizziness)
 */
export const AngledSticker: React.FC<AngledStickerProps> = ({
  text,
  top,
  left,
  right,
  bottom = 440,
  angle = -3,
  delayFrames = 8,
}) => {
  const frame = useCurrentFrame();

  const enterProgress = interpolate(
    frame - delayFrames,
    [0, 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = enterProgress;
  const scale = interpolate(enterProgress, [0, 1], [0.94, 1.0]);

  if (frame < delayFrames) return null;

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        pointerEvents: "none",
        zIndex: 42,
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) rotate(${angle}deg)`,
          opacity,
          background: "linear-gradient(135deg, rgba(185, 28, 28, 0.94) 0%, rgba(127, 29, 29, 0.96) 100%)",
          backdropFilter: "blur(16px)",
          border: "2.5px solid #fef08a",
          borderRadius: 22,
          padding: "14px 38px",
          boxShadow:
            "0 14px 32px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 44,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.01em",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

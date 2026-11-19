import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { InteractiveCursorConfig } from "../../timelineTypes";

interface AnimatedCursorProps {
  config?: InteractiveCursorConfig;
}

export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!config) return null;

  const startX = config.startX ?? 920;
  const startY = config.startY ?? 1700;
  const targetX = config.targetX ?? 540;
  const targetY = config.targetY ?? 1100;
  const clickFrame = config.clickFrame ?? Math.round(fps * 0.7);

  // Flight animation towards target (starts at frame 0, arrives by clickFrame - 6)
  const flightDuration = Math.max(10, clickFrame - 5);
  const travelProgress = interpolate(frame, [0, flightDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Smooth ease-out curve
  const currentX = interpolate(travelProgress, [0, 1], [startX, targetX]);
  const currentY = interpolate(travelProgress, [0, 1], [startY, targetY]);

  // Click pulse animation
  const isAfterClick = frame >= clickFrame;
  const clickAge = frame - clickFrame;

  const clickScale = isAfterClick && clickAge < 15
    ? interpolate(clickAge, [0, 3, 10], [1, 0.8, 1], { extrapolateRight: "clamp" })
    : 1.0;

  // Expanding ripple effect
  const rippleScale = isAfterClick && clickAge < 25
    ? interpolate(clickAge, [0, 20], [0.3, 2.8], { extrapolateRight: "clamp" })
    : 0;
  const rippleOpacity = isAfterClick && clickAge < 25
    ? interpolate(clickAge, [0, 5, 20], [0.8, 0.6, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        top: currentY,
        zIndex: 85,
        pointerEvents: "none",
        transform: `translate(-6px, -6px) scale(${clickScale})`,
        filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.45))",
      }}
    >
      {/* Ripple ring on click */}
      {rippleOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "3.5px solid #22C55E",
            boxShadow: "0 0 12px #22C55E",
            opacity: rippleOpacity,
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
          }}
        />
      )}

      {/* Modern OS Cursor SVG */}
      <svg
        width="46"
        height="46"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 3L10.07 20.97L13.58 13.58L20.97 10.07L3 3Z"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="10" r="1.5" fill="#22C55E" />
      </svg>

      {/* Optional action tooltip tag */}
      {config.label && (
        <div
          style={{
            position: "absolute",
            left: 36,
            top: 24,
            backgroundColor: "#0F172A",
            color: "#F8FAFC",
            padding: "6px 14px",
            borderRadius: "20px",
            fontSize: "20px",
            fontWeight: 800,
            fontFamily: "'Hind Siliguri', sans-serif",
            whiteSpace: "nowrap",
            border: "2px solid #22C55E",
            boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            transform: `scale(${interpolate(frame, [flightDuration, flightDuration + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
          }}
        >
          {config.label}
        </div>
      )}
    </div>
  );
};

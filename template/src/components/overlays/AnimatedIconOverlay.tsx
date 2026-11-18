import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type ContextIconType =
  | "money"
  | "clock"
  | "food"
  | "book"
  | "key"
  | "phone"
  | "question"
  | "idea_bulb"
  | "heart"
  | "alert"
  | "tea_cup"
  | "handshake"
  | "trophy";

export interface AnimatedIconOverlayProps {
  icon: ContextIconType;
  position?: { x: number; y: number };
  size?: number;
  animation?: "pop" | "float" | "pulse";
  label?: string;
}

const ICON_EMOJIS: Record<ContextIconType, { emoji: string; bg: string; border: string }> = {
  money: { emoji: "💵", bg: "#dcfce7", border: "#16a34a" },
  clock: { emoji: "⏰", bg: "#fef9c3", border: "#ca8a04" },
  food: { emoji: "🍲", bg: "#ffedd5", border: "#ea580c" },
  book: { emoji: "📖", bg: "#e0e7ff", border: "#4f46e5" },
  key: { emoji: "🔑", bg: "#fef08a", border: "#eab308" },
  phone: { emoji: "📱", bg: "#f1f5f9", border: "#475569" },
  question: { emoji: "❓", bg: "#fee2e2", border: "#dc2626" },
  idea_bulb: { emoji: "💡", bg: "#fef08a", border: "#ca8a04" },
  heart: { emoji: "❤️", bg: "#ffe4e6", border: "#e11d48" },
  alert: { emoji: "⚠️", bg: "#fef3c7", border: "#d97706" },
  tea_cup: { emoji: "☕", bg: "#fed7aa", border: "#c2410c" },
  handshake: { emoji: "🤝", bg: "#e0f2fe", border: "#0284c7" },
  trophy: { emoji: "🏆", bg: "#fef08a", border: "#ca8a04" },
};

export const AnimatedIconOverlay: React.FC<AnimatedIconOverlayProps> = ({
  icon,
  position = { x: 540, y: 700 },
  size = 110,
  animation = "pop",
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 160, mass: 0.6 },
  });

  const floatY = Math.sin(frame * 0.12) * 8;
  const pulseScale = 1 + Math.sin(frame * 0.15) * 0.08;

  const currentScale = animation === "pulse" ? popScale * pulseScale : popScale;
  const currentY = animation === "float" ? position.y + floatY : position.y;

  const config = ICON_EMOJIS[icon] || { emoji: "✨", bg: "#ffffff", border: "#222222" };

  return (
    <div
      style={{
        position: "absolute",
        left: position.x - size / 2,
        top: currentY - size / 2,
        transform: `scale(${currentScale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 45,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: config.bg,
          border: `3px solid ${config.border}`,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25), 0 0 15px rgba(255,255,255,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.52,
        }}
      >
        {config.emoji}
      </div>

      {label && (
        <div
          style={{
            marginTop: 8,
            backgroundColor: "#222222",
            color: "#ffffff",
            padding: "4px 14px",
            borderRadius: 12,
            fontSize: 22,
            fontWeight: 800,
            fontFamily: "'Hind Siliguri', sans-serif",
            border: "1.5px solid #ffffff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

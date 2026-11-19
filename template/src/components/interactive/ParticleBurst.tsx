import React from "react";
import { useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { ParticleBurstConfig } from "../../timelineTypes";

interface ParticleBurstProps {
  config?: ParticleBurstConfig;
}

// Pseudo-random deterministic generator based on index
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

export const ParticleBurst: React.FC<ParticleBurstProps> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!config) return null;

  const triggerFrame = config.triggerFrame ?? 0;
  if (frame < triggerFrame) return null;

  const age = frame - triggerFrame;
  const burstDuration = Math.round(fps * 2.2); // ~2.2 seconds duration
  if (age > burstDuration) return null;

  const type = config.type || "confetti";
  const count = config.count ?? (type === "cash_rain" ? 22 : 36);

  const colors = ["#22C55E", "#3B82F6", "#F59E0B", "#EC4899", "#8B5CF6", "#10B981"];

  const particles = Array.from({ length: count }).map((_, i) => {
    const r1 = pseudoRandom(i + 1);
    const r2 = pseudoRandom(i + 101);
    const r3 = pseudoRandom(i + 201);
    const r4 = pseudoRandom(i + 301);

    if (type === "cash_rain") {
      // Falling banknotes from top
      const startX = 80 + r1 * 920;
      const swaySpeed = 0.08 + r2 * 0.08;
      const fallSpeed = 5 + r3 * 7;
      const currentY = -60 + age * fallSpeed;
      const currentX = startX + Math.sin(age * swaySpeed + r4 * 6) * 45;
      const rot = Math.sin(age * 0.05 + r1 * 10) * 35;
      const opacity = interpolate(age, [0, 8, burstDuration - 10, burstDuration], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      return {
        key: `cash-${i}`,
        x: currentX,
        y: currentY,
        rot,
        opacity,
        scale: 0.8 + r2 * 0.4,
        type: "cash",
      };
    }

    if (type === "sparkles") {
      // Golden star sparkles bursting from center outward
      const angle = r1 * Math.PI * 2;
      const speed = 4 + r2 * 12;
      const dist = age * speed;
      const currentX = 540 + Math.cos(angle) * dist;
      const currentY = 700 + Math.sin(angle) * dist;
      const rot = age * (r3 > 0.5 ? 8 : -8);
      const opacity = interpolate(age, [0, 6, burstDuration * 0.6, burstDuration], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const scale = interpolate(age, [0, 10, burstDuration], [0.3, 1.2, 0.4]);

      return {
        key: `sparkle-${i}`,
        x: currentX,
        y: currentY,
        rot,
        opacity,
        scale,
        color: r3 > 0.4 ? "#F59E0B" : "#FDE047",
        type: "sparkle",
      };
    }

    // Default: Confetti explosion from center upward then gravity fall
    const angle = -Math.PI * 0.85 + r1 * Math.PI * 0.7; // upward cone
    const initialSpeed = 16 + r2 * 22;
    const gravity = 0.55;
    const currentX = 540 + Math.cos(angle) * initialSpeed * age * 0.75 + Math.sin(age * 0.1 + r4 * 5) * 15;
    const currentY = 750 + Math.sin(angle) * initialSpeed * age * 0.75 + 0.5 * gravity * Math.pow(age, 2);
    const rot = age * (12 + r3 * 16);
    const opacity = interpolate(age, [0, 5, burstDuration * 0.75, burstDuration], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return {
      key: `confetti-${i}`,
      x: currentX,
      y: currentY,
      rot,
      opacity,
      scale: 0.8 + r2 * 0.5,
      color: colors[i % colors.length],
      type: "confetti",
    };
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1920,
        pointerEvents: "none",
        zIndex: 75,
        overflow: "hidden",
      }}
    >
      {particles.map((p) => {
        if (p.opacity <= 0) return null;

        if (p.type === "cash") {
          return (
            <div
              key={p.key}
              style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                transform: `translate(-50%, -50%) rotate(${p.rot}deg) scale(${p.scale})`,
                opacity: p.opacity,
                background: "linear-gradient(135deg, #15803D 0%, #22C55E 100%)",
                border: "2px solid #86EFAC",
                borderRadius: "8px",
                padding: "4px 12px",
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: "22px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>৳</span>
              <span style={{ fontSize: "14px", opacity: 0.9 }}>1000</span>
            </div>
          );
        }

        if (p.type === "sparkle") {
          return (
            <div
              key={p.key}
              style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                transform: `translate(-50%, -50%) rotate(${p.rot}deg) scale(${p.scale})`,
                opacity: p.opacity,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill={p.color}>
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
          );
        }

        // Confetti flake
        return (
          <div
            key={p.key}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: 16,
              height: 26,
              borderRadius: "3px",
              backgroundColor: p.color,
              transform: `translate(-50%, -50%) rotate(${p.rot}deg) scale(${p.scale})`,
              opacity: p.opacity,
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
          />
        );
      })}
    </div>
  );
};

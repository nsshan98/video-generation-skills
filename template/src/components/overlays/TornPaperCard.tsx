import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";
import { TornPaperCardConfig } from "../../timelineTypes";

interface TornPaperCardProps {
  config?: TornPaperCardConfig;
}

export const TornPaperCard: React.FC<TornPaperCardProps> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!config) return null;

  const cardScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  const rotation = config.rotation ?? -2.5;
  const top = config.position?.top ?? 520;
  const left = config.position?.left ?? 540;

  return (
    <div
      style={{
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${cardScale})`,
        zIndex: 65,
        pointerEvents: "none",
        maxWidth: "880px",
        minWidth: "620px",
      }}
    >
      {/* Scotch Tape on Top Center */}
      <div
        style={{
          position: "absolute",
          top: "-18px",
          left: "50%",
          transform: "translateX(-50%) rotate(1.5deg)",
          width: "120px",
          height: "36px",
          backgroundColor: "rgba(254, 240, 138, 0.65)",
          border: "1px dashed rgba(202, 138, 4, 0.4)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          zIndex: 10,
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Main Torn Paper Sheet */}
      <div
        style={{
          backgroundColor: "#FDFBF7",
          color: "#0F172A",
          padding: "40px 48px",
          boxShadow: "0 20px 45px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.25)",
          clipPath:
            "polygon(0% 2%, 3% 0%, 7% 1.5%, 12% 0.5%, 18% 2%, 25% 0%, 33% 1.8%, 42% 0.4%, 50% 2%, 60% 0.5%, 70% 1.6%, 80% 0.2%, 90% 1.8%, 97% 0%, 100% 2%, 99% 15%, 100% 30%, 98.5% 45%, 100% 60%, 98.8% 75%, 100% 90%, 99% 98%, 95% 100%, 88% 98.5%, 78% 99.8%, 68% 98.4%, 55% 100%, 45% 98.6%, 32% 100%, 20% 98.8%, 10% 100%, 3% 98.5%, 0% 97%, 1.2% 80%, 0% 65%, 1.5% 50%, 0% 35%, 1.2% 18%)",
          border: "1px solid #E2E8F0",
        }}
      >
        {config.badge && (
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
              fontSize: "18px",
              fontWeight: 900,
              padding: "4px 14px",
              borderRadius: "4px",
              fontFamily: "'Hind Siliguri', sans-serif",
              letterSpacing: "1px",
              marginBottom: "12px",
              textTransform: "uppercase",
              transform: "rotate(-1deg)",
            }}
          >
            {config.badge}
          </div>
        )}

        {config.title && (
          <h2
            style={{
              margin: "0 0 14px 0",
              fontSize: "36px",
              fontWeight: 800,
              fontFamily: "'Hind Siliguri', sans-serif",
              color: "#1E293B",
              lineHeight: 1.25,
            }}
          >
            {config.title}
          </h2>
        )}

        {config.text && (
          <p
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 600,
              fontFamily: "'Hind Siliguri', sans-serif",
              color: "#334155",
              lineHeight: 1.45,
            }}
          >
            {config.text}
          </p>
        )}

        {config.points && config.points.length > 0 && (
          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {config.points.map((pt, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "26px",
                  fontWeight: 700,
                  fontFamily: "'Hind Siliguri', sans-serif",
                  color: "#0F172A",
                }}
              >
                <span
                  style={{
                    color: "#DC2626",
                    fontSize: "24px",
                    fontWeight: 900,
                  }}
                >
                  ✓
                </span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

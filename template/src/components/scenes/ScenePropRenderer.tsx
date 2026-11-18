import React from "react";
import { ScenePropConfig } from "./sceneTypes";

export interface ScenePropRendererProps {
  prop?: ScenePropConfig;
  frame?: number;
}

export const ScenePropRenderer: React.FC<ScenePropRendererProps> = ({
  prop,
  frame = 0,
}) => {
  if (!prop || prop.type === "none") return null;

  switch (prop.type) {
    case "book":
      return (
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 80,
            right: 80,
            height: 750,
            backgroundColor: "#3e1c10",
            border: "8px solid #d4af37",
            borderRadius: 24,
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.7), inset 0 0 40px rgba(0,0,0,0.6)",
            padding: "40px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            zIndex: 25,
          }}
        >
          <div
            style={{
              fontFamily: "serif",
              fontSize: 30,
              color: "#d4af37",
              letterSpacing: "0.15em",
              fontWeight: 700,
            }}
          >
            {prop.bookAuthor || "ROBERT GREENE"}
          </div>
          <div
            style={{
              fontFamily: "serif",
              fontSize: 40,
              color: "#ffffff",
              fontWeight: 900,
              marginTop: 16,
            }}
          >
            {prop.bookTitle || "THE 48 LAWS OF POWER"}
          </div>
          <div
            style={{
              width: 220,
              height: 4,
              backgroundColor: "#d4af37",
              margin: "24px 0",
            }}
          />
          {prop.lawNumber && (
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: 34,
                color: "#facc15",
                fontWeight: 900,
                letterSpacing: "0.05em",
              }}
            >
              {prop.lawNumber}
            </div>
          )}
          {prop.lawTitle && (
            <div
              style={{
                fontFamily: "serif",
                fontSize: 48,
                color: "#ffffff",
                fontWeight: 900,
                marginTop: 16,
                lineHeight: 1.2,
              }}
            >
              {prop.lawTitle}
            </div>
          )}
          {prop.lawTakeaway && (
            <div
              style={{
                marginTop: 32,
                fontSize: 26,
                color: "#fef08a",
                fontWeight: 700,
                padding: "0 16px",
              }}
            >
              {prop.lawTakeaway}
            </div>
          )}
        </div>
      );

    case "chart": {
      const isUp = prop.chartDirection !== "down";
      const color = isUp ? "#34d399" : "#f87171";
      const bgColor = isUp ? "#022c22" : "#450a0a";
      const borderColor = isUp ? "#10b981" : "#ef4444";

      return (
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 80,
            right: 80,
            height: 480,
            backgroundColor: bgColor,
            border: `6px solid ${borderColor}`,
            borderRadius: 16,
            padding: 24,
            boxShadow: `0 16px 36px ${isUp ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}`,
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 28,
              color,
              fontWeight: 800,
            }}
          >
            {prop.chartTitle || (isUp ? "BUSINESS GROWTH ★★★" : "MARKET CRASH ⚠")}
          </div>
          <svg viewBox="0 0 800 280" width="100%" height="240">
            {isUp ? (
              <polyline
                points="40,240 200,190 380,140 560,90 760,20"
                fill="none"
                stroke={color}
                strokeWidth="10"
              />
            ) : (
              <polyline
                points="40,40 200,90 380,160 560,200 760,250"
                fill="none"
                stroke={color}
                strokeWidth="10"
              />
            )}
            <text
              x={isUp ? 360 : 320}
              y={isUp ? 60 : 230}
              fill={color}
              fontSize="32"
              fontWeight="bold"
            >
              {prop.chartMetric || (isUp ? "REVENUE 10X 🚀" : "DOWN -80% 📉")}
            </text>
          </svg>
        </div>
      );
    }

    case "scale":
      return (
        <div
          style={{
            position: "absolute",
            top: 220,
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              fontSize: 130,
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
            }}
          >
            ⚖️
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "0 80px",
            }}
          >
            <div style={{ color: "#38bdf8", fontSize: 32, fontWeight: 800 }}>
              {prop.scaleLeftLabel || "সাফল্য"}
            </div>
            <div style={{ color: "#facc15", fontSize: 32, fontWeight: 800 }}>
              {prop.scaleRightLabel || "বিনয়"}
            </div>
          </div>
        </div>
      );

    case "shield":
      return (
        <div
          style={{
            position: "absolute",
            top: 240,
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              fontSize: 140,
              filter: "drop-shadow(0 0 30px rgba(239, 68, 68, 0.8))",
            }}
          >
            🛡️
          </div>
          <div
            style={{
              color: "#fca5a5",
              fontSize: 28,
              fontWeight: 700,
              marginTop: 12,
            }}
          >
            {prop.shieldLabel || "ঈর্ষার হাত থেকে বাঁচতে বিনয়ী হোন"}
          </div>
        </div>
      );

    case "dialogue":
      return (
        <>
          {prop.dialogueLeft && (
            <div
              style={{
                position: "absolute",
                bottom: 640,
                left: 60,
                maxWidth: 360,
                background: "rgba(15, 23, 42, 0.92)",
                border: "3px solid #38bdf8",
                borderRadius: 20,
                padding: "16px 22px",
                color: "#e0f2fe",
                fontSize: 26,
                fontWeight: 800,
                boxShadow: "0 12px 30px rgba(0,0,0,0.5), 0 0 20px rgba(56, 189, 248, 0.3)",
                zIndex: 22,
                lineHeight: 1.3,
              }}
            >
              💬 "{prop.dialogueLeft}"
            </div>
          )}
          {prop.dialogueRight && (
            <div
              style={{
                position: "absolute",
                bottom: 640,
                right: 60,
                maxWidth: 360,
                background: "rgba(15, 23, 42, 0.92)",
                border: "3px solid #f87171",
                borderRadius: 20,
                padding: "16px 22px",
                color: "#fee2e2",
                fontSize: 26,
                fontWeight: 800,
                boxShadow: "0 12px 30px rgba(0,0,0,0.5), 0 0 20px rgba(248, 113, 113, 0.3)",
                zIndex: 22,
                lineHeight: 1.3,
              }}
            >
              💬 "{prop.dialogueRight}"
            </div>
          )}
        </>
      );

    case "question_marks":
      return (
        <>
          <div
            style={{
              position: "absolute",
              top: 220,
              left: 160,
              fontSize: 80,
              color: "#60a5fa",
              opacity: 0.7,
              zIndex: 15,
            }}
          >
            ?
          </div>
          <div
            style={{
              position: "absolute",
              top: 180,
              right: 160,
              fontSize: 110,
              color: "#93c5fd",
              opacity: 0.6,
              zIndex: 15,
            }}
          >
            ?
          </div>
        </>
      );

    case "lightbulb":
      return (
        <div
          style={{
            position: "absolute",
            top: 220,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              fontSize: 130,
              filter: "drop-shadow(0 0 25px rgba(250, 204, 21, 0.8))",
            }}
          >
            💡
          </div>
        </div>
      );

    case "wedding_feast":
      return (
        <div
          style={{
            position: "absolute",
            top: 220,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          {/* Feast Banner Tag */}
          <div
            style={{
              background: "linear-gradient(135deg, #b45309 0%, #d97706 100%)",
              color: "#ffffff",
              fontSize: 22,
              fontWeight: 800,
              padding: "6px 20px",
              borderRadius: 20,
              border: "2px solid #fef08a",
              boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
              marginBottom: 12,
            }}
          >
            🍖 রাজকীয় বিয়েবাড়ির খানা
          </div>

          {/* Large Silver Dining Platter */}
          <div
            style={{
              width: 320,
              height: 220,
              borderRadius: "50%",
              background: "radial-gradient(ellipse at 35% 35%, #f1f5f9 0%, #cbd5e1 50%, #94a3b8 100%)",
              border: "6px solid #e2e8f0",
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.6), inset 0 6px 12px rgba(255,255,255,0.8), inset 0 -6px 12px rgba(0,0,0,0.3)",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Fragrant Polao / Biryani mound */}
            <div
              style={{
                width: 260,
                height: 160,
                borderRadius: "50%",
                background: "radial-gradient(ellipse at 40% 40%, #fef08a 0%, #fde047 40%, #eab308 80%, #ca8a04 100%)",
                boxShadow: "inset 0 4px 8px rgba(255,255,255,0.6), 0 4px 10px rgba(0,0,0,0.3)",
                position: "relative",
              }}
            >
              {/* Juicy Meat pieces */}
              <div
                style={{
                  position: "absolute",
                  top: 30,
                  left: 40,
                  width: 60,
                  height: 48,
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #7c2d12 0%, #451a03 100%)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                  transform: "rotate(-12deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 45,
                  right: 50,
                  width: 70,
                  height: 52,
                  borderRadius: 18,
                  background: "linear-gradient(135deg, #9a3412 0%, #431407 100%)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                  transform: "rotate(15deg)",
                }}
              />
              {/* Chicken Roast Leg */}
              <div
                style={{
                  position: "absolute",
                  bottom: 25,
                  left: 85,
                  width: 90,
                  height: 44,
                  borderRadius: 22,
                  background: "linear-gradient(135deg, #ea580c 0%, #7c2d12 100%)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                }}
              />
              {/* Golden Boiled Egg */}
              <div
                style={{
                  position: "absolute",
                  top: 25,
                  left: 110,
                  width: 36,
                  height: 46,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #fef3c7 60%, #f59e0b 100%)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </div>
        </div>
      );

    case "sweets_bowl":
      return (
        <div
          style={{
            position: "absolute",
            top: 220,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          {/* Sweets Banner Tag */}
          <div
            style={{
              background: "linear-gradient(135deg, #db2777 0%, #be185d 100%)",
              color: "#ffffff",
              fontSize: 22,
              fontWeight: 800,
              padding: "6px 20px",
              borderRadius: 20,
              border: "2px solid #fbcfe8",
              boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
              marginBottom: 12,
            }}
          >
            🍯 বিয়েবাড়ির মিষ্টি চারটা!
          </div>

          {/* Sweets Bowl */}
          <div
            style={{
              width: 280,
              height: 180,
              borderRadius: "0 0 140px 140px",
              background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 60%, #94a3b8 100%)",
              border: "5px solid #ffffff",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 -10px 20px rgba(0,0,0,0.2)",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            {/* 4 Sweet Balls */}
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
                maxWidth: 200,
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background:
                      i % 2 === 0
                        ? "radial-gradient(circle at 35% 35%, #fed7aa 0%, #ea580c 70%, #9a3412 100%)" // Gulab Jamun / Chamcham
                        : "radial-gradient(circle at 35% 35%, #ffffff 0%, #fef3c7 70%, #fde047 100%)", // Rosogolla
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.8)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case "comparison_table": {
      const table = prop.comparisonTable;
      if (!table) return null;
      const col2Col = table.col2Color || "#ef4444";
      const col3Col = table.col3Color || "#22c55e";

      return (
        <div
          style={{
            position: "absolute",
            top: 200,
            left: 50,
            right: 50,
            zIndex: 25,
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            borderRadius: 24,
            border: "3px solid rgba(245, 158, 11, 0.6)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 30px rgba(245, 158, 11, 0.2)",
            padding: "24px 28px",
            fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
            backdropFilter: "blur(12px)",
          }}
        >
          {table.title && (
            <div
              style={{
                textAlign: "center",
                color: "#facc15",
                fontSize: 28,
                fontWeight: 900,
                marginBottom: 18,
                letterSpacing: "0.02em",
                textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              {table.title}
            </div>
          )}

          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1.3fr 1.3fr",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                padding: "10px 14px",
                borderRadius: 12,
                color: "#94a3b8",
                fontSize: 22,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
              }}
            >
              {table.col1Header || "বিষয়"}
            </div>
            <div
              style={{
                backgroundColor: `${col2Col}25`,
                border: `2px solid ${col2Col}`,
                padding: "10px 14px",
                borderRadius: 12,
                color: "#fca5a5",
                fontSize: 22,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              {table.col2Header}
            </div>
            <div
              style={{
                backgroundColor: `${col3Col}25`,
                border: `2px solid ${col3Col}`,
                padding: "10px 14px",
                borderRadius: 12,
                color: "#86efac",
                fontSize: 22,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              {table.col3Header}
            </div>
          </div>

          {/* Rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {table.rows.map((row, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1.3fr 1.3fr",
                  gap: 12,
                  backgroundColor:
                    idx % 2 === 0
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.02)",
                  padding: "12px 14px",
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "#f8fafc",
                    fontSize: 22,
                    fontWeight: 700,
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    color:
                      typeof row.col2 === "boolean"
                        ? row.col2
                          ? "#86efac"
                          : "#f87171"
                        : "#fca5a5",
                    fontSize: 22,
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  {typeof row.col2 === "boolean"
                    ? row.col2
                      ? "✔"
                      : "✖"
                    : row.col2}
                </div>
                <div
                  style={{
                    color:
                      typeof row.col3 === "boolean"
                        ? row.col3
                          ? "#86efac"
                          : "#f87171"
                        : "#86efac",
                    fontSize: 22,
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  {typeof row.col3 === "boolean"
                    ? row.col3
                      ? "✔"
                      : "✖"
                    : row.col3}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "tiered_benefit": {
      const tb = prop.tieredBenefit;
      if (!tb) return null;

      return (
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 50,
            right: 50,
            zIndex: 25,
            backgroundColor: "rgba(15, 23, 42, 0.94)",
            borderRadius: 24,
            border: "3px solid rgba(245, 158, 11, 0.7)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.85), 0 0 35px rgba(245, 158, 11, 0.25)",
            padding: "28px 30px",
            fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Gold Badge Pill */}
          <div
            style={{
              backgroundColor: "#f59e0b",
              color: "#0f172a",
              fontWeight: 900,
              fontSize: 22,
              padding: "6px 24px",
              borderRadius: 30,
              letterSpacing: "0.08em",
              boxShadow: "0 4px 14px rgba(245, 158, 11, 0.4)",
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            {tb.badge}
          </div>

          {/* Law Header */}
          {tb.lawHeader && (
            <div
              style={{
                color: "#94a3b8",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.05em",
                marginBottom: 6,
              }}
            >
              {tb.lawHeader}
            </div>
          )}

          {/* Thesis statement */}
          <div
            style={{
              color: "#f8fafc",
              fontSize: 26,
              fontWeight: 800,
              textAlign: "center",
              marginBottom: 20,
              lineHeight: 1.3,
            }}
          >
            {tb.thesisStatement}
          </div>

          {/* Stacked Icon Benefit Pills */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              width: "100%",
            }}
          >
            {tb.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  border: "1.5px solid rgba(245, 158, 11, 0.35)",
                  borderRadius: 16,
                  padding: "12px 20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                <span
                  style={{
                    color: "#fef08a",
                    fontSize: 23,
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Citation */}
          {tb.citation && (
            <div
              style={{
                marginTop: 20,
                color: "#64748b",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.05em",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: 10,
                width: "100%",
                textAlign: "center",
              }}
            >
              {tb.citation}
            </div>
          )}
        </div>
      );
    }

    case "price_board": {
      const items = prop.priceBoardItems || [
        { item: "মোটা চাল", price: "৫৫ ৳" },
        { item: "মসুর ডাল", price: "১১০ ৳" },
        { item: "সরিষার তেল", price: "১৬০ ৳" },
        { item: "ন্যায্য ওজন", price: "১০০% খাঁটি" },
      ];

      return (
        <div
          style={{
            position: "absolute",
            top: 210,
            left: "50%",
            transform: "translateX(-50%)",
            width: 440,
            backgroundColor: "#0f172a",
            border: "10px solid #78350f",
            borderRadius: 16,
            boxShadow: "0 20px 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.7)",
            padding: "20px 24px",
            zIndex: 22,
            fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
          }}
        >
          {/* Top Hanging String Hook */}
          <div
            style={{
              position: "absolute",
              top: -24,
              left: "50%",
              transform: "translateX(-50%)",
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#d97706",
              boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
            }}
          />

          <div
            style={{
              textAlign: "center",
              color: "#fef08a",
              fontSize: 24,
              fontWeight: 900,
              borderBottom: "2px dashed #ca8a04",
              paddingBottom: 8,
              marginBottom: 14,
            }}
          >
            📋 আজকের বাজার দর
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((row, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#f8fafc",
                  fontSize: 21,
                  fontWeight: 700,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  paddingBottom: 4,
                }}
              >
                <span>{row.item}</span>
                <span style={{ color: "#38bdf8", fontWeight: 800 }}>
                  {row.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "tea_stall_chula": {
      const flameFlicker = Math.sin(frame * 0.4) * 4;
      return (
        <div
          style={{
            position: "absolute",
            bottom: 400,
            left: 120,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Kettle */}
          <div
            style={{
              width: 90,
              height: 70,
              borderRadius: "16px 16px 20px 20px",
              background: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #475569 100%)",
              border: "3px solid #cbd5e1",
              position: "relative",
              boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
            }}
          >
            {/* Spout */}
            <div
              style={{
                position: "absolute",
                top: 14,
                left: -18,
                width: 22,
                height: 14,
                backgroundColor: "#94a3b8",
                borderRadius: "8px 0 0 8px",
                transform: "rotate(-25deg)",
              }}
            />
            {/* Handle */}
            <div
              style={{
                position: "absolute",
                top: -20,
                left: 20,
                width: 48,
                height: 24,
                border: "4px solid #334155",
                borderRadius: "24px 24px 0 0",
              }}
            />
            {/* Steam puff */}
            <div
              style={{
                position: "absolute",
                top: -30 + flameFlicker,
                left: -20,
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.35)",
                filter: "blur(3px)",
              }}
            />
          </div>

          {/* Clay Chula / Stove */}
          <div
            style={{
              width: 140,
              height: 90,
              borderRadius: "20px 20px 8px 8px",
              backgroundColor: "#78350f",
              border: "4px solid #451a03",
              boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Opening with burning flame */}
            <div
              style={{
                width: 60,
                height: 50,
                borderRadius: "30px 30px 0 0",
                backgroundColor: "#1c1917",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                overflow: "hidden",
                paddingBottom: 4,
              }}
            >
              <div
                style={{
                  width: 34 + flameFlicker,
                  height: 38 + flameFlicker,
                  borderRadius: "50% 50% 20% 20%",
                  background: "radial-gradient(circle, #fef08a 0%, #f97316 60%, #dc2626 100%)",
                  boxShadow: "0 0 16px #f97316",
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    case "smartphone": {
      const floatY = Math.sin(frame * 0.08) * 8;
      const caller = prop.callerName || "বাবা";
      const status = prop.callStatus || "৩ দিন ধরে কোনো কল নেই! 📴";

      return (
        <div
          style={{
            position: "absolute",
            top: 210 + floatY,
            left: "50%",
            transform: "translateX(-50%)",
            width: 280,
            height: 440,
            backgroundColor: "#0f172a",
            borderRadius: 36,
            border: "6px solid #334155",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.8), 0 0 30px rgba(56, 189, 248, 0.25)",
            zIndex: 25,
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
          }}
        >
          {/* Dynamic Island / Notch */}
          <div
            style={{
              width: 76,
              height: 14,
              backgroundColor: "#020617",
              borderRadius: 10,
              marginBottom: 16,
            }}
          />

          {/* Screen Content */}
          <div
            style={{
              width: "100%",
              flex: 1,
              backgroundColor: "#1e293b",
              borderRadius: 24,
              padding: "16px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Top Bar */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                color: "#94a3b8",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <span>10:45 AM</span>
              <span>📶 5G 🔋 100%</span>
            </div>

            {/* App Grid or Status Card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  backgroundColor: "#0284c7",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 34,
                  boxShadow: "0 8px 20px rgba(2, 132, 199, 0.4)",
                }}
              >
                📱
              </div>
              <div
                style={{
                  color: "#f8fafc",
                  fontSize: 20,
                  fontWeight: 800,
                  marginTop: 6,
                }}
              >
                {caller}
              </div>
              <div
                style={{
                  color: "#f87171",
                  fontSize: 16,
                  fontWeight: 700,
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid #ef4444",
                  padding: "4px 12px",
                  borderRadius: 14,
                }}
              >
                {status}
              </div>
            </div>

            {/* Action Bar */}
            <div
              style={{
                display: "flex",
                gap: 20,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 22,
                  boxShadow: "0 4px 12px rgba(34, 197, 94, 0.4)",
                }}
              >
                📞
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#ef4444",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 22,
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
                }}
              >
                ✖
              </div>
            </div>
          </div>
        </div>
      );
    }

    case "video_call": {
      const pulse = Math.sin(frame * 0.1) * 3;
      return (
        <div
          style={{
            position: "absolute",
            top: 190,
            left: "50%",
            transform: "translateX(-50%)",
            width: 340,
            height: 440,
            backgroundColor: "#0f172a",
            borderRadius: 32,
            border: "4px solid #38bdf8",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(56, 189, 248, 0.3)",
            zIndex: 25,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",
          }}
        >
          {/* Top Call Info */}
          <div
            style={{
              padding: "10px 16px",
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 5,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ color: "#38bdf8", fontSize: 16, fontWeight: 800 }}>
              📹 বাবার ভিডিও কল
            </div>
            <div
              style={{
                color: "#22c55e",
                fontSize: 14,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                }}
              />
              00:23
            </div>
          </div>

          {/* Screen with funny extreme close-up of nose */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#df9b6d",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Eyes peeking in from very top */}
            <div
              style={{
                position: "absolute",
                top: 10,
                display: "flex",
                gap: 50,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  border: "3px solid #be794a",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: "#1e293b",
                  }}
                />
              </div>
              <div
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  border: "3px solid #be794a",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: "#1e293b",
                  }}
                />
              </div>
            </div>

            {/* Giant Close-up Nose (Funny) */}
            <div
              style={{
                width: 110 + pulse,
                height: 140 + pulse,
                borderRadius: "55px 55px 70px 70px",
                backgroundColor: "#be794a",
                border: "4px solid #aa5d39",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "flex-end",
                paddingBottom: 16,
              }}
            >
              {/* Nostrils */}
              <div
                style={{
                  width: 22,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: "#5b3114",
                }}
              />
              <div
                style={{
                  width: 22,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: "#5b3114",
                }}
              />
            </div>

            {/* Funny Son Quote Bubble */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                color: "#fef08a",
                fontSize: 17,
                fontWeight: 800,
                padding: "6px 14px",
                borderRadius: 20,
                border: "1.5px solid #facc15",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              }}
            >
              "শুধু নাক দেখা যাচ্ছে বাবা! 👃😅"
            </div>
          </div>

          {/* Bottom Call Controls */}
          <div
            style={{
              padding: "12px 24px",
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 18,
                color: "#ffffff",
              }}
            >
              🔇
            </div>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 22,
                color: "#ffffff",
              }}
            >
              📞
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 18,
                color: "#ffffff",
              }}
            >
              🔄
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};

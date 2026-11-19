import React from "react";
import { Img, staticFile } from "remotion";
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
    case "software_mockup": {
      const floatY = Math.sin(frame * 0.05) * 6;
      return (
        <div
          style={{
            position: "absolute",
            top: (prop.top ?? 200) + floatY,
            left: "50%",
            transform: "translateX(-50%)",
            width: prop.width ?? 960,
            zIndex: 35,
          }}
        >
          {/* Glassmorphic Laptop / Tablet Frame */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.94)",
              border: "3px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "24px",
              padding: "16px 20px",
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.7), 0 0 35px rgba(34, 197, 94, 0.2)",
              backdropFilter: "blur(14px)",
            }}
          >
            {/* Window bar with 3 dots and title */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "14px",
                paddingLeft: "4px",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#EF4444",
                }}
              />
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#F59E0B",
                }}
              />
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                }}
              />
              {prop.title && (
                <div
                  style={{
                    marginLeft: 16,
                    color: "#94A3B8",
                    fontSize: 22,
                    fontWeight: 700,
                    fontFamily: "'Hind Siliguri', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ color: "#38BDF8" }}>🌐</span>
                  <span>{prop.title}</span>
                </div>
              )}
            </div>

            {/* The Software Screenshot */}
            {prop.imageSrc && (
              <Img
                src={staticFile(prop.imageSrc)}
                style={{
                  width: "100%",
                  height: prop.height ?? "auto",
                  maxHeight: 680,
                  objectFit: "contain",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              />
            )}
          </div>
        </div>
      );
    }

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
      const isChat = prop.screenContent === "chat" || Boolean(prop.chatGroupName) || Boolean(prop.chatMessages);

      return (
        <div
          style={{
            position: "absolute",
            top: 200 + floatY,
            left: "50%",
            transform: "translateX(-50%)",
            width: isChat ? 330 : 280,
            height: isChat ? 530 : 440,
            backgroundColor: "#0f172a",
            borderRadius: 36,
            border: "6px solid #334155",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.85), 0 0 30px rgba(56, 189, 248, 0.25)",
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
              marginBottom: 12,
            }}
          />

          {/* Screen Content */}
          {isChat ? (
            <div
              style={{
                width: "100%",
                flex: 1,
                backgroundColor: "#0b141a",
                borderRadius: 22,
                padding: "10px 10px 12px",
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              {/* Top Bar */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#94a3b8",
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                <span>10:15 AM</span>
                <span>📶 5G 🔋 95%</span>
              </div>

              {/* Group Chat Header */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "#202c33",
                  padding: "6px 10px",
                  borderRadius: 12,
                  marginBottom: 10,
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "#00a884",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  ☕
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: "#e9edef",
                      fontSize: 13,
                      fontWeight: 800,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {prop.chatGroupName || "বন্ধুদের গ্রুপ (৫ জন)"}
                  </div>
                  <div style={{ color: "#8696a0", fontSize: 10 }}>5 participants • online</div>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  justifyContent: "flex-end",
                  paddingBottom: 4,
                }}
              >
                {(
                  prop.chatMessages || [
                    { isMe: true, text: "কালকের বিলের টাকাটা... সবাই একটু পাঠিয়ে দিস (৳৫০০)", status: "seen" },
                    { sender: "রাফি", isMe: false, text: "ভাই, তুই তো বলেছিলি তুই দিবি! 😅" },
                    { sender: "সুমন", isMe: false, text: "আমার কাছে এখন ক্যাশ নাই, পরে দিচ্ছি... 🏃" },
                  ]
                ).map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      alignSelf: msg.isMe ? "flex-end" : "flex-start",
                      maxWidth: "90%",
                      backgroundColor: msg.isMe ? "#005c4b" : "#202c33",
                      color: "#e9edef",
                      borderRadius: 10,
                      padding: "7px 10px",
                      fontSize: 12,
                      lineHeight: 1.35,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
                      border: msg.isMe ? "1px solid #00a884" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {!msg.isMe && msg.sender && (
                      <div style={{ color: "#53bdeb", fontSize: 10, fontWeight: 700, marginBottom: 2 }}>
                        {msg.sender}
                      </div>
                    )}
                    <div>{msg.text}</div>
                    <div
                      style={{
                        fontSize: 9,
                        color: "#8696a0",
                        textAlign: "right",
                        marginTop: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 3,
                      }}
                    >
                      <span>10:14 AM</span>
                      {msg.isMe && <span style={{ color: "#53bdeb" }}>✓✓</span>}
                    </div>
                  </div>
                ))}

                {/* Status Callout */}
                <div
                  style={{
                    alignSelf: "center",
                    backgroundColor: "rgba(239, 68, 68, 0.15)",
                    border: "1px solid #ef4444",
                    color: "#fca5a5",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 10,
                    marginTop: 4,
                  }}
                >
                  👁️ বাকিরা সিন করে কোনো উত্তর দিল না!
                </div>
              </div>
            </div>
          ) : (
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
          )}
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

    case "office_desk_computer": {
      return (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 750,
            zIndex: 22,
            pointerEvents: "none",
          }}
        >
          <svg viewBox="0 0 1080 750" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="cubicleWood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="15%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="screenBeam" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Floating Live Work HUD Card on Top-Right */}
            <g transform="translate(650, -25)">
              <rect x="0" y="0" width="390" height="190" rx="14" fill="rgba(15, 23, 42, 0.94)" stroke="#0284c7" strokeWidth="2.5" filter="drop-shadow(0 12px 28px rgba(0,0,0,0.6))" />
              {/* Card Header */}
              <rect x="0" y="0" width="390" height="38" rx="14" fill="#1e293b" />
              <circle cx="20" cy="19" r="4.5" fill="#ef4444" />
              <circle cx="34" cy="19" r="4.5" fill="#facc15" />
              <circle cx="48" cy="19" r="4.5" fill="#22c55e" />
              <text x="68" y="24" fill="#38bdf8" fontSize="14" fontWeight="800">💻 কোডিং ও প্রজেক্ট ডেডলাইন</text>
              {/* Task list items */}
              <text x="20" y="66" fill="#4ade80" fontSize="14" fontWeight="700">✓ ডাটাবেজ অপ্টিমাইজেশন</text>
              <text x="20" y="94" fill="#4ade80" fontSize="14" fontWeight="700">✓ বাৎসরিক সেলস রিপোর্ট রেন্ডার</text>
              <text x="20" y="122" fill="#fde047" fontSize="14" fontWeight="700">⏳ ব্যাকআপ প্রসেসিং (৮৫%)</text>
              {/* Progress bar */}
              <rect x="20" y="134" width="348" height="10" rx="5" fill="#334155" />
              <rect x="20" y="134" width="295" height="10" rx="5" fill="#38bdf8" />
              {/* Footer status */}
              <text x="20" y="168" fill="#94a3b8" fontSize="13" fontWeight="600">কাজের চাপ: ৮৫% | অতিরিক্ত দায়িত্ব</text>
              <circle cx="365" cy="165" r="4.5" fill="#22c55e" />
            </g>

            {/* Laptop Screen Open Angled (Lid facing camera, Screen illuminates Rakib) */}
            <g transform="translate(420, 60)">
              {/* Cyan light beam radiating up onto Rakib */}
              <polygon points="30,0 210,0 290,-160 -50,-160" fill="url(#screenBeam)" />
              {/* Laptop Screen Lid (Back facing camera) */}
              <polygon points="30,0 210,0 228,166 12,166" fill="#0f172a" stroke="#64748b" strokeWidth="3.5" />
              {/* Glowing minimalist tech logo on lid */}
              <circle cx="120" cy="80" r="14" fill="#38bdf8" opacity="0.85" />
              <circle cx="120" cy="80" r="7" fill="#ffffff" />
              {/* Laptop Keyboard Base (Right under Rakib's hands) */}
              <polygon points="0,166 240,166 260,226 -20,226" fill="#334155" stroke="#475569" strokeWidth="2.5" />
              <polygon points="18,172 222,172 238,218 2,218" fill="#1e293b" />
              {/* Keyboard keys backlight lines */}
              <line x1="26" y1="184" x2="214" y2="184" stroke="#475569" strokeWidth="3" strokeDasharray="10 4" />
              <line x1="22" y1="196" x2="218" y2="196" stroke="#475569" strokeWidth="3" strokeDasharray="14 4" />
              <line x1="18" y1="208" x2="222" y2="208" stroke="#475569" strokeWidth="3" strokeDasharray="18 4" />
            </g>

            {/* Desk Top Surface (Top edge at Y=226, exactly matching character hands at Y=1396) */}
            <polygon points="20,226 1060,226 1080,310 0,310" fill="url(#cubicleWood)" stroke="#1e293b" strokeWidth="4" />
            {/* Front Panel */}
            <rect x="0" y="310" width="1080" height="440" fill="#0f172a" stroke="#1e293b" strokeWidth="3" />
            {/* Desk Metal Legs */}
            <rect x="40" y="310" width="36" height="440" fill="#334155" />
            <rect x="1004" y="310" width="36" height="440" fill="#334155" />

            {/* Piles of Pending Office Files on Desk */}
            <g transform="translate(80, 160)">
              <rect x="0" y="60" width="150" height="28" rx="4" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
              <rect x="8" y="38" width="145" height="26" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
              <rect x="4" y="16" width="148" height="24" rx="4" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
              <rect x="30" y="0" width="85" height="28" rx="3" fill="#fde047" stroke="#eab308" strokeWidth="1.5" />
              <text x="72" y="18" fill="#854d0e" fontSize="13" fontWeight="900" textAnchor="middle">কাজের চাপ</text>
            </g>

            {/* Coffee Mug on right */}
            <g transform="translate(870, 235)">
              <rect x="0" y="0" width="46" height="58" rx="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="2.5" />
              <path d="M 46 12 Q 62 29 46 46" fill="none" stroke="#ffffff" strokeWidth="4.5" />
              <path d="M 14 -6 Q 19 -18 14 -30" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.6" />
              <path d="M 32 -6 Q 37 -18 32 -30" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.6" />
            </g>
          </svg>
        </div>
      );
    }

    case "executive_desk": {
      return (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 750,
            zIndex: 22,
            pointerEvents: "none",
          }}
        >
          <svg viewBox="0 0 1080 750" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="walnutGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="25%" stopColor="#291102" />
                <stop offset="100%" stopColor="#140801" />
              </linearGradient>
              <linearGradient id="goldPlate" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ca8a04" />
                <stop offset="50%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#a16207" />
              </linearGradient>
              <linearGradient id="managerBeam" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Floating Executive Dashboard HUD Card on Top-Left */}
            <g transform="translate(40, -25)">
              <rect x="0" y="0" width="390" height="190" rx="14" fill="rgba(24, 10, 4, 0.94)" stroke="#ca8a04" strokeWidth="2.5" filter="drop-shadow(0 12px 28px rgba(0,0,0,0.6))" />
              {/* Card Header */}
              <rect x="0" y="0" width="390" height="38" rx="14" fill="#3b1502" />
              <circle cx="20" cy="19" r="4.5" fill="#ef4444" />
              <circle cx="34" cy="19" r="4.5" fill="#facc15" />
              <circle cx="48" cy="19" r="4.5" fill="#22c55e" />
              <text x="68" y="24" fill="#fef08a" fontSize="14" fontWeight="800">📊 ম্যানেজার ড্যাশবোর্ড</text>
              {/* KPI items */}
              <text x="20" y="66" fill="#f87171" fontSize="14" fontWeight="700">⚠ শোকজ নোটিশ জারি: ৩টি</text>
              <text x="20" y="94" fill="#fbbf24" fontSize="14" fontWeight="700">⏱ ৫ মিনিট দেরি: ৭ জন কর্মী</text>
              <text x="20" y="122" fill="#f87171" fontSize="14" fontWeight="700">📉 টিম মনোবল: নিম্নমুখী (৪০%)</text>
              {/* Progress bar */}
              <rect x="20" y="134" width="348" height="10" rx="5" fill="#291102" />
              <rect x="20" y="134" width="140" height="10" rx="5" fill="#ef4444" />
              {/* Footer status */}
              <text x="20" y="168" fill="#d97706" fontSize="13" fontWeight="600">কড়া শাসন | দূরত্বের দেয়াল</text>
              <circle cx="365" cy="165" r="4.5" fill="#ef4444" />
            </g>

            {/* Modern Silver Executive Laptop (Right in front of Manager Rakib) */}
            <g transform="translate(420, 60)">
              {/* Light beam radiating up onto Manager Rakib */}
              <polygon points="30,0 210,0 290,-160 -50,-160" fill="url(#managerBeam)" />
              {/* Laptop Screen Lid (Back facing camera, premium silver aluminum) */}
              <polygon points="30,0 210,0 228,166 12,166" fill="#020617" stroke="#cbd5e1" strokeWidth="3.5" />
              {/* Gold Executive Emblem on lid */}
              <polygon points="120,64 134,88 106,88" fill="#ca8a04" />
              <circle cx="120" cy="80" r="5" fill="#fef08a" />
              {/* Laptop Keyboard Base (Right under Manager's hands) */}
              <polygon points="0,166 240,166 260,226 -20,226" fill="#94a3b8" stroke="#475569" strokeWidth="2.5" />
              <polygon points="18,172 222,172 238,218 2,218" fill="#334155" />
              {/* Keyboard keys backlight */}
              <line x1="26" y1="184" x2="214" y2="184" stroke="#64748b" strokeWidth="3" strokeDasharray="10 4" />
              <line x1="22" y1="196" x2="218" y2="196" stroke="#64748b" strokeWidth="3" strokeDasharray="14 4" />
              <line x1="18" y1="208" x2="222" y2="208" stroke="#64748b" strokeWidth="3" strokeDasharray="18 4" />
            </g>

            {/* Luxury Walnut Desk Top (Starts right at Y=226, matching character hands at Y=1396) */}
            <polygon points="20,226 1060,226 1080,310 0,310" fill="url(#walnutGrad)" stroke="#78350f" strokeWidth="5" />
            {/* Front Mahogany Panel */}
            <rect x="0" y="310" width="1080" height="440" fill="#1c0b02" stroke="#451a03" strokeWidth="4" />
            {/* Decorative Gold Inlay Lines */}
            <line x1="60" y1="340" x2="1020" y2="340" stroke="#b45309" strokeWidth="3" />
            <line x1="60" y1="680" x2="1020" y2="680" stroke="#b45309" strokeWidth="3" />

            {/* Executive Brass Nameplate (Centered right below laptop on desk) */}
            <g transform="translate(410, 275)">
              <polygon points="0,0 260,0 274,40 -14,40" fill="url(#goldPlate)" stroke="#854d0e" strokeWidth="2.5" />
              <text x="130" y="27" fill="#451a03" fontSize="18" fontWeight="900" textAnchor="middle" letterSpacing="2">
                {prop.deskName || "RAKIB | MANAGER"}
              </text>
            </g>

            {/* Executive Desk Phone & Pen Stand on Right */}
            <g transform="translate(840, 240)">
              <rect x="0" y="15" width="95" height="68" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <rect x="10" y="25" width="40" height="30" fill="#38bdf8" rx="2" />
              <circle cx="70" cy="32" r="4.5" fill="#4ade80" />
              <circle cx="70" cy="50" r="4.5" fill="#ef4444" />
              {/* Pen Stand */}
              <rect x="120" y="25" width="40" height="52" rx="4" fill="#ca8a04" stroke="#854d0e" strokeWidth="2" />
              <line x1="130" y1="25" x2="120" y2="-5" stroke="#fef08a" strokeWidth="4" />
              <line x1="142" y1="25" x2="150" y2="-10" stroke="#fef08a" strokeWidth="4" />
            </g>
          </svg>
        </div>
      );
    }

    case "ceo_office_desk": {
      return (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 700,
            zIndex: 22,
            pointerEvents: "none",
          }}
        >
          <svg viewBox="0 0 1080 700" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="ceoWood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#311406" />
                <stop offset="30%" stopColor="#1c0b02" />
                <stop offset="100%" stopColor="#0d0501" />
              </linearGradient>
            </defs>

            {/* Grand Presidential Mahogany Desk */}
            <polygon points="30,260 1050,260 1080,350 0,350" fill="url(#ceoWood)" stroke="#9a3412" strokeWidth="6" />
            <rect x="0" y="350" width="1080" height="350" fill="#150802" stroke="#451a03" strokeWidth="4" />

            {/* CEO Calling Bell */}
            <g transform="translate(180, 290)">
              <ellipse cx="25" cy="30" rx="25" ry="8" fill="#ca8a04" stroke="#854d0e" strokeWidth="2" />
              <path d="M 5 30 Q 25 5 45 30" fill="#facc15" stroke="#854d0e" strokeWidth="2" />
              <rect x="23" y="2" width="4" height="6" fill="#ca8a04" />
              <circle cx="25" cy="2" r="3" fill="#fde047" />
            </g>

            {/* CEO Executive Nameplate: COMPANY OWNER */}
            <g transform="translate(390, 295)">
              <polygon points="0,0 300,0 315,36 -15,36" fill="#ca8a04" stroke="#713f12" strokeWidth="2" />
              <text x="150" y="24" fill="#311406" fontSize="18" fontWeight="900" textAnchor="middle" letterSpacing="2">
                MANAGING DIRECTOR & OWNER
              </text>
            </g>

            {/* Stack of Corporate Balance Sheets */}
            <g transform="translate(820, 260)">
              <rect x="0" y="40" width="140" height="30" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
              <rect x="10" y="25" width="135" height="25" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
              <rect x="15" y="10" width="130" height="20" rx="3" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
              <text x="80" y="25" fill="#dc2626" fontSize="13" fontWeight="bold" textAnchor="middle">রেজিগনেশন ফাইল</text>
            </g>
          </svg>
        </div>
      );
    }

    case "resignation_letters": {
      return (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 650,
            zIndex: 22,
            pointerEvents: "none",
          }}
        >
          <svg viewBox="0 0 1080 650" style={{ width: "100%", height: "100%" }}>
            {/* Empty Desk in Dim Room */}
            <polygon points="80,260 1000,260 1080,350 0,350" fill="#334155" stroke="#1e293b" strokeWidth="4" />
            <rect x="0" y="350" width="1080" height="300" fill="#0f172a" />

            {/* Empty Rolling Chair Silhouette */}
            <g transform="translate(680, 100)" opacity="0.85">
              {/* Backrest */}
              <rect x="40" y="0" width="120" height="160" rx="20" fill="#1e293b" stroke="#475569" strokeWidth="4" />
              <rect x="30" y="160" width="140" height="40" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="3" />
              {/* Hydraulic Stem & Wheels */}
              <rect x="95" y="200" width="10" height="70" fill="#64748b" />
              <line x1="40" y1="270" x2="160" y2="270" stroke="#475569" strokeWidth="6" />
              <circle cx="40" cy="275" r="8" fill="#090d16" />
              <circle cx="100" cy="275" r="8" fill="#090d16" />
              <circle cx="160" cy="275" r="8" fill="#090d16" />
            </g>

            {/* Resignation Letter 1 */}
            <g transform="translate(180, 240) rotate(-6)">
              <rect x="0" y="0" width="160" height="90" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.4))" />
              <polygon points="0,0 80,45 160,0" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
              {/* Red Stamp */}
              <rect x="35" y="45" width="90" height="32" rx="4" fill="none" stroke="#ef4444" strokeWidth="3" />
              <text x="80" y="66" fill="#ef4444" fontSize="14" fontWeight="900" textAnchor="middle">পদত্যাগপত্র</text>
            </g>

            {/* Resignation Letter 2 */}
            <g transform="translate(380, 230) rotate(8)">
              <rect x="0" y="0" width="160" height="90" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.4))" />
              <polygon points="0,0 80,45 160,0" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
              <rect x="30" y="45" width="100" height="32" rx="4" fill="none" stroke="#dc2626" strokeWidth="3" />
              <text x="80" y="66" fill="#dc2626" fontSize="14" fontWeight="900" textAnchor="middle">RESIGNED</text>
            </g>

            {/* Resignation Letter 3 */}
            <g transform="translate(290, 270) rotate(-2)">
              <rect x="0" y="0" width="170" height="95" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.5))" />
              <polygon points="0,0 85,48 170,0" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
              <rect x="35" y="48" width="100" height="34" rx="4" fill="none" stroke="#b91c1c" strokeWidth="3" />
              <text x="85" y="70" fill="#b91c1c" fontSize="15" fontWeight="900" textAnchor="middle">চাকরি ত্যাগ</text>
            </g>
          </svg>
        </div>
      );
    }

    case "tea_stall_bench": {
      return (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 600, zIndex: 22, pointerEvents: "none" }}>
          <svg viewBox="0 0 1080 600" style={{ width: "100%", height: "100%" }}>
            {/* Wooden Tea Stall Table Plank */}
            <polygon points="20,240 1060,240 1080,320 0,320" fill="#78350f" stroke="#451a03" strokeWidth="4" />
            <rect x="0" y="320" width="1080" height="280" fill="#451a03" />
            {/* Aluminum Tea Kettle with rising steam */}
            <g transform="translate(140, 130)">
              <ellipse cx="60" cy="110" rx="55" ry="40" fill="#94a3b8" stroke="#475569" strokeWidth="3" />
              <rect x="35" y="60" width="50" height="20" rx="4" fill="#64748b" />
              <path d="M 60 60 L 60 40 L 90 40" stroke="#334155" strokeWidth="6" fill="none" />
              {/* Spout */}
              <path d="M 110 100 Q 140 80 150 65 L 145 60 Q 130 80 100 90" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
              {/* Steam */}
              <path d="M 150 50 Q 160 30 150 15" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.6" />
              <path d="M 160 55 Q 175 35 165 20" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.6" />
            </g>
            {/* Glass Jar with Biscuits */}
            <g transform="translate(820, 110)">
              <rect x="0" y="15" width="90" height="115" rx="10" fill="rgba(255,255,255,0.4)" stroke="#cbd5e1" strokeWidth="2.5" />
              <rect x="15" y="0" width="60" height="15" rx="3" fill="#dc2626" />
              {/* Cookies/Toast */}
              <circle cx="35" cy="50" r="16" fill="#d97706" />
              <circle cx="55" cy="80" r="16" fill="#b45309" />
              <circle cx="35" cy="100" r="16" fill="#d97706" />
              <text x="45" y="145" fill="#ca8a04" fontSize="13" fontWeight="900" textAnchor="middle">টিনের বিস্কুট</text>
            </g>
          </svg>
        </div>
      );
    }

    case "courtroom_desk": {
      return (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 700, zIndex: 22, pointerEvents: "none" }}>
          <svg viewBox="0 0 1080 700" style={{ width: "100%", height: "100%" }}>
            {/* Judge's Grand Oak Bench */}
            <polygon points="20,250 1060,250 1080,340 0,340" fill="#451a03" stroke="#291102" strokeWidth="5" />
            <rect x="0" y="340" width="1080" height="360" fill="#1c0b02" stroke="#451a03" strokeWidth="4" />
            {/* Judge Gavel & Sounding Block */}
            <g transform="translate(420, 190)">
              <rect x="40" y="55" width="80" height="22" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="2" />
              {/* Gavel head */}
              <rect x="65" y="15" width="60" height="32" rx="4" fill="#92400e" stroke="#451a03" strokeWidth="2.5" transform="rotate(-20 65 15)" />
              {/* Gavel handle */}
              <rect x="100" y="28" width="14" height="65" rx="3" fill="#ca8a04" transform="rotate(-20 100 28)" />
            </g>
            {/* Golden Balance Scales of Justice */}
            <g transform="translate(140, 80)">
              <line x1="80" y1="30" x2="80" y2="180" stroke="#ca8a04" strokeWidth="5" />
              <polygon points="60,180 100,180 110,195 50,195" fill="#a16207" />
              <line x1="20" y1="50" x2="140" y2="50" stroke="#ca8a04" strokeWidth="4" />
              {/* Left pan */}
              <line x1="20" y1="50" x2="5" y2="105" stroke="#eab308" strokeWidth="1.5" />
              <line x1="20" y1="50" x2="35" y2="105" stroke="#eab308" strokeWidth="1.5" />
              <path d="M 0 105 Q 20 120 40 105 Z" fill="#ca8a04" />
              {/* Right pan */}
              <line x1="140" y1="50" x2="125" y2="105" stroke="#eab308" strokeWidth="1.5" />
              <line x1="140" y1="50" x2="155" y2="105" stroke="#eab308" strokeWidth="1.5" />
              <path d="M 120 105 Q 140 120 160 105 Z" fill="#ca8a04" />
            </g>
          </svg>
        </div>
      );
    }

    case "hospital_bed": {
      return (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 650, zIndex: 22, pointerEvents: "none" }}>
          <svg viewBox="0 0 1080 650" style={{ width: "100%", height: "100%" }}>
            {/* Medical Vital Monitor Screen on Right */}
            <g transform="translate(760, 60)">
              <rect x="0" y="0" width="260" height="200" rx="12" fill="#020617" stroke="#334155" strokeWidth="4" />
              <rect x="10" y="10" width="240" height="180" rx="6" fill="#090d16" />
              {/* ECG Green Pulse Line */}
              <path d="M 20 100 L 70 100 L 85 45 L 100 150 L 115 80 L 130 100 L 230 100" stroke="#22c55e" strokeWidth="3" fill="none" />
              <text x="180" y="45" fill="#22c55e" fontSize="24" fontWeight="900">72</text>
              <text x="180" y="65" fill="#64748b" fontSize="11" fontWeight="bold">BPM HEART</text>
              <text x="30" y="165" fill="#38bdf8" fontSize="18" fontWeight="800">BP: 120/80</text>
            </g>
            {/* IV Saline Drip Stand on Left */}
            <g transform="translate(100, 30)">
              <line x1="50" y1="0" x2="50" y2="380" stroke="#94a3b8" strokeWidth="4" />
              <path d="M 30 15 Q 50 0 70 15" stroke="#94a3b8" strokeWidth="3" fill="none" />
              {/* Saline Bag */}
              <rect x="35" y="25" width="30" height="65" rx="5" fill="rgba(255,255,255,0.85)" stroke="#38bdf8" strokeWidth="2" />
              <line x1="50" y1="90" x2="50" y2="280" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />
            </g>
          </svg>
        </div>
      );
    }

    case "cash_counter": {
      const bill = prop.billAmount || "৳ ২,৫০০.০০";
      return (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 700, zIndex: 22, pointerEvents: "none" }}>
          <svg viewBox="0 0 1080 700" style={{ width: "100%", height: "100%" }}>
            {/* Retail Countertop */}
            <polygon points="20,240 1060,240 1080,330 0,330" fill="#1e293b" stroke="#0f172a" strokeWidth="4" />
            <rect x="0" y="330" width="1080" height="370" fill="#0f172a" />
            {/* POS Cash Register / Monitor */}
            <g transform="translate(680, 80)">
              <rect x="20" y="0" width="220" height="150" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="3" />
              <rect x="30" y="10" width="200" height="130" rx="4" fill="#0369a1" />
              <text x="130" y="50" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">বিল পরিশোধ</text>
              <text x="130" y="85" fill="#facc15" fontSize="26" fontWeight="900" textAnchor="middle">{bill}</text>
              <rect x="110" y="150" width="40" height="60" fill="#334155" />
            </g>
            {/* Cash Drawer Stack of Banknotes */}
            <g transform="translate(140, 210)">
              <rect x="0" y="30" width="130" height="35" rx="3" fill="#15803d" stroke="#166534" strokeWidth="2" />
              <rect x="5" y="15" width="130" height="35" rx="3" fill="#16a34a" stroke="#15803d" strokeWidth="2" />
              <rect x="10" y="0" width="130" height="35" rx="3" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
              <text x="75" y="24" fill="#ffffff" fontSize="18" fontWeight="900" textAnchor="middle">টাকার ক্যাশ বাক্স</text>
            </g>
          </svg>
        </div>
      );
    }

    case "dining_table": {
      const bill = prop.billAmount || "৳ ২,৫০০";
      return (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 680, zIndex: 22, pointerEvents: "none" }}>
          <svg viewBox="0 0 1080 680" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="diningTabletop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="25%" stopColor="#78350f" />
                <stop offset="70%" stopColor="#92400e" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="tableFacade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#291205" />
                <stop offset="100%" stopColor="#120601" />
              </linearGradient>
              <linearGradient id="tableRunner" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="billLeather" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#18181b" />
                <stop offset="100%" stopColor="#27272a" />
              </linearGradient>
            </defs>

            {/* Solid Mahogany Dining Tabletop Perspective */}
            <polygon points="30,200 1050,200 1080,330 0,330" fill="url(#diningTabletop)" stroke="#291205" strokeWidth="4" />

            {/* Front Table Facade with Wood Paneling */}
            <rect x="0" y="330" width="1080" height="350" fill="url(#tableFacade)" />
            <line x1="0" y1="334" x2="1080" y2="334" stroke="#d97706" strokeWidth="3" opacity="0.4" />
            <rect x="120" y="380" width="240" height="240" rx="6" fill="#1c0a02" stroke="#451a03" strokeWidth="4" />
            <rect x="420" y="380" width="240" height="240" rx="6" fill="#1c0a02" stroke="#451a03" strokeWidth="4" />
            <rect x="720" y="380" width="240" height="240" rx="6" fill="#1c0a02" stroke="#451a03" strokeWidth="4" />

            {/* White Table Runner across Center */}
            <polygon points="340,200 740,200 780,330 300,330" fill="url(#tableRunner)" opacity="0.9" />

            {/* Left Dining Plate & Cutlery */}
            <g transform="translate(160, 225)">
              <ellipse cx="60" cy="40" rx="55" ry="28" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="3" />
              <ellipse cx="60" cy="40" rx="42" ry="20" fill="#e2e8f0" />
              {/* Fork */}
              <line x1="-10" y1="20" x2="-10" y2="60" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
              {/* Spoon */}
              <line x1="130" y1="20" x2="130" y2="60" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="130" cy="22" rx="7" ry="10" fill="#94a3b8" />
              {/* Glass with Water */}
              <rect x="15" y="-30" width="24" height="34" rx="4" fill="rgba(56, 189, 248, 0.45)" stroke="#38bdf8" strokeWidth="1.5" />
            </g>

            {/* Right Dining Plate & Cutlery */}
            <g transform="translate(760, 225)">
              <ellipse cx="60" cy="40" rx="55" ry="28" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="3" />
              <ellipse cx="60" cy="40" rx="42" ry="20" fill="#e2e8f0" />
              {/* Fork & Spoon */}
              <line x1="-10" y1="20" x2="-10" y2="60" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
              <line x1="130" y1="20" x2="130" y2="60" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="130" cy="22" rx="7" ry="10" fill="#94a3b8" />
              {/* Glass with Water */}
              <rect x="80" y="-30" width="24" height="34" rx="4" fill="rgba(56, 189, 248, 0.45)" stroke="#38bdf8" strokeWidth="1.5" />
            </g>

            {/* Centerpiece: Restaurant Bill Folder with White Receipt Peeking Out */}
            <g transform="translate(430, 155)">
              {/* Leather Folder Backing */}
              <rect x="0" y="0" width="220" height="150" rx="8" fill="url(#billLeather)" stroke="#eab308" strokeWidth="3" />
              <rect x="8" y="8" width="204" height="134" rx="5" fill="#09090b" />

              {/* White Bill Receipt Slip */}
              <rect x="25" y="15" width="170" height="110" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />

              {/* Bill Details */}
              <text x="110" y="38" fill="#0f172a" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="1">
                রেস্টুরেন্ট ক্যাশ মেমো
              </text>
              <line x1="35" y1="46" x2="185" y2="46" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,2" />

              <text x="40" y="65" fill="#475569" fontSize="12" fontWeight="700">খাবার ও পানীয়:</text>
              <text x="180" y="65" fill="#0f172a" fontSize="12" fontWeight="700" textAnchor="end">৫ জন</text>

              {/* Total Bill Amount Tag */}
              <rect x="35" y="74" width="150" height="36" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
              <text x="110" y="99" fill="#dc2626" fontSize="22" fontWeight="900" textAnchor="middle">
                {bill}
              </text>

              {/* Gold Clip at Top */}
              <rect x="85" y="-6" width="50" height="14" rx="3" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      );
    }

    default:
      return null;
  }
};

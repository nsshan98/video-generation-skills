import React from "react";
import { BackgroundTheme } from "./sceneTypes";

export interface SceneBackgroundProps {
  theme?: BackgroundTheme;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  theme = "corporate_office",
}) => {
  switch (theme) {
    case "bus_interior":
      return (
        <>
          {/* Night bus cabin interior */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #111827 0%, #1f2937 50%, #0f172a 100%)",
            }}
          />
          {/* Bus Curved Ceiling & Soft Warm Night AC Lights */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 140,
              background: "linear-gradient(180deg, #030712 0%, #1f2937 100%)",
              borderBottom: "4px solid #374151",
            }}
          >
            {/* AC vents / reading lights */}
            <div style={{ display: "flex", justifyContent: "space-around", padding: "30px 40px" }}>
              <div style={{ width: 60, height: 16, borderRadius: 8, backgroundColor: "#fef08a", boxShadow: "0 0 16px rgba(254, 240, 138, 0.4)" }} />
              <div style={{ width: 120, height: 16, borderRadius: 8, backgroundColor: "#1e3a8a", border: "2px solid #3b82f6" }} />
              <div style={{ width: 60, height: 16, borderRadius: 8, backgroundColor: "#fef08a", boxShadow: "0 0 16px rgba(254, 240, 138, 0.4)" }} />
            </div>
          </div>

          {/* Large Passenger Window with moving highway view */}
          <div
            style={{
              position: "absolute",
              top: 160,
              left: 100,
              right: 100,
              height: 480,
              backgroundColor: "#030712",
              border: "10px solid #374151",
              borderRadius: 24,
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}
          >
            {/* Night highway sky & moon */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, #0c1829 0%, #1e1b4b 60%, #090d16 100%)",
              }}
            />
            {/* Distant moon */}
            <div
              style={{
                position: "absolute",
                top: 40,
                right: 80,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "#fef08a",
                boxShadow: "0 0 24px rgba(254, 240, 138, 0.5)",
              }}
            />
            {/* Distant highway road lights */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 0,
                right: 0,
                height: 6,
                backgroundColor: "#f59e0b",
                opacity: 0.7,
              }}
            />
          </div>

          {/* Coach Seats Backrests in Foreground */}
          <div
            style={{
              position: "absolute",
              bottom: 450,
              left: 80,
              width: 220,
              height: 200,
              backgroundColor: "#1e3a8a",
              borderRadius: "28px 28px 0 0",
              border: "4px solid #1e40af",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
            }}
          >
            {/* White Headrest Cover */}
            <div
              style={{
                width: 140,
                height: 50,
                backgroundColor: "#f1f5f9",
                borderRadius: "14px 14px 0 0",
                margin: "10px auto 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: "#1e3a8a",
              }}
            >
              SEAT A1
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 450,
              right: 80,
              width: 220,
              height: 200,
              backgroundColor: "#1e3a8a",
              borderRadius: "28px 28px 0 0",
              border: "4px solid #1e40af",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                width: 140,
                height: 50,
                backgroundColor: "#f1f5f9",
                borderRadius: "14px 14px 0 0",
                margin: "10px auto 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: "#1e3a8a",
              }}
            >
              SEAT A2
            </div>
          </div>

          {/* Bus Aisle Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 750,
              background: "#111827",
              borderTop: "6px solid #1f2937",
            }}
          >
            {/* Center aisle runner carpet */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 220,
                backgroundColor: "#1f2937",
                borderLeft: "2px solid #374151",
                borderRight: "2px solid #374151",
              }}
            />
          </div>
        </>
      );

    case "village_sunset":
      return (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #2d3748 0%, #1a202c 50%, #4a154b 100%)",
            }}
          />
          {/* Subtle sun glow */}
          <div
            style={{
              position: "absolute",
              top: 400,
              left: "50%",
              transform: "translateX(-50%)",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(246, 173, 85, 0.4) 0%, rgba(246, 173, 85, 0) 70%)",
            }}
          />
          {/* Distant village trees/town silhouette */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 750,
              background: "#171923",
              borderTop: "4px solid #2d3748",
            }}
          />
        </>
      );

    case "home_study":
      return (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #fefae0 0%, #faedcd 60%, #e9edc9 100%)",
            }}
          />
          {/* Window looking at village fields */}
          <div
            style={{
              position: "absolute",
              top: 160,
              left: 120,
              right: 120,
              height: 500,
              backgroundColor: "#bae6fd",
              border: "8px solid #ffffff",
              borderRadius: 12,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: 180,
                background: "#86efac",
                borderRadius: "100px 100px 0 0",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 40,
                right: 60,
                width: 90,
                height: 90,
                borderRadius: "50%",
                background: "#fef08a",
              }}
            />
            {/* Window cross frame */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                width: 6,
                backgroundColor: "#ffffff",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: 6,
                backgroundColor: "#ffffff",
              }}
            />
          </div>
          {/* Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 750,
              background: "#d4a373",
              borderTop: "6px solid #bc6c25",
            }}
          />
        </>
      );

    case "dark_conflict":
      return (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #1c1917 0%, #292524 50%, #0c0a09 100%)",
            }}
          />
          {/* Overhead street lamp spotlight cone */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 500,
              height: "100%",
              background: "radial-gradient(ellipse at top, rgba(254, 240, 138, 0.12) 0%, rgba(0,0,0,0) 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 750,
              background: "#0c0a09",
              borderTop: "4px solid #292524",
            }}
          />
        </>
      );

    case "blue_melancholy":
      return (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #091e3a 0%, #102a45 60%, #030e1b 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 750,
              background: "#030e1b",
              borderTop: "3px solid #1e3a8a",
            }}
          />
        </>
      );

    case "warm_study":
      return (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #fef3c7 0%, #fde68a 50%, #f59e0b 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 750,
              background: "#78350f",
              borderTop: "6px solid #451a03",
            }}
          />
        </>
      );

    case "deep_library":
      return (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #2b1810 0%, #150a06 100%)",
            }}
          />
          {/* Subtle bookshelf columns */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 40,
              width: 60,
              height: "100%",
              background: "rgba(0,0,0,0.3)",
              borderRight: "3px solid #451a03",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 40,
              width: 60,
              height: "100%",
              background: "rgba(0,0,0,0.3)",
              borderLeft: "3px solid #451a03",
            }}
          />
        </>
      );

    case "dramatic_red":
      return (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, #7f1d1d 0%, #1c0505 90%)",
          }}
        />
      );

    case "golden_sunrise":
      return (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #fef08a 0%, #fdba74 40%, #fb923c 100%)",
            }}
          />
          {/* Radiant Sun */}
          <div
            style={{
              position: "absolute",
              top: 160,
              left: "50%",
              transform: "translateX(-50%)",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)",
            }}
          />
          {/* Modern city skyline silhouette */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 600,
              background: "#1e293b",
              borderTop: "8px solid #0f172a",
            }}
          >
            <div style={{ width: 14, height: "100%", backgroundColor: "#facc15", margin: "0 auto" }} />
          </div>
        </>
      );

    case "classroom":
      return (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #334155 0%, #1e293b 100%)",
            }}
          />
          {/* Green chalkboard */}
          <div
            style={{
              position: "absolute",
              top: 180,
              left: 80,
              right: 80,
              height: 480,
              backgroundColor: "#064e3b",
              border: "12px solid #78350f",
              borderRadius: 8,
              boxShadow: "0 16px 36px rgba(0,0,0,0.4)",
              padding: 24,
            }}
          >
            <div style={{ color: "#a7f3d0", fontSize: 28, fontFamily: "monospace", fontWeight: 700 }}>
              LESSON OF THE DAY ✎
            </div>
            <div style={{ width: "100%", height: 2, backgroundColor: "#047857", margin: "14px 0" }} />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 750,
              background: "#0f172a",
              borderTop: "6px solid #475569",
            }}
          />
        </>
      );

    case "cafe":
      return (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #451a03 0%, #1c1917 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 750,
              background: "#1c1917",
              borderTop: "6px solid #92400e",
            }}
          />
        </>
      );

    case "wedding_hall":
      return (
        <>
          {/* Festive Wedding Hall Wall: Deep Burgundy & Crimson */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #3b0712 0%, #7f1d1d 38%, #450a0a 75%, #1f0408 100%)",
            }}
          />

          {/* Golden Warm Fairy Light Strings Across Ceiling */}
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "space-around",
              padding: "0 40px",
              zIndex: 3,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 2,
                    height: i % 2 === 0 ? 80 : 130,
                    backgroundColor: "rgba(253, 224, 71, 0.45)",
                  }}
                />
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: "#fef08a",
                    boxShadow:
                      "0 0 20px rgba(254, 240, 138, 0.95), 0 0 35px rgba(245, 158, 11, 0.75)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Festive Top Decorative Valance / Draped Fabric */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 48,
              background: "linear-gradient(180deg, #78350f 0%, #991b1b 100%)",
              borderBottom: "4px solid #f59e0b",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              zIndex: 4,
            }}
          />

          {/* Side Festive Drapes (Left & Right) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 50,
              background: "linear-gradient(90deg, #450a0a 0%, #991b1b 70%, transparent 100%)",
              borderRight: "2px dashed rgba(245, 158, 11, 0.4)",
              zIndex: 3,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: 50,
              background: "linear-gradient(270deg, #450a0a 0%, #991b1b 70%, transparent 100%)",
              borderLeft: "2px dashed rgba(245, 158, 11, 0.4)",
              zIndex: 3,
            }}
          />

          {/* Banquet Dining Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 720,
              background: "linear-gradient(180deg, #1c090c 0%, #0d0305 100%)",
              borderTop: "8px solid #d97706",
              boxShadow: "inset 0 16px 30px rgba(0,0,0,0.8)",
            }}
          >
            {/* Rich Wedding Red Carpet Runner */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 120,
                right: 120,
                background: "#7f1d1d",
                borderLeft: "4px solid #f59e0b",
                borderRight: "4px solid #f59e0b",
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </>
      );

    case "village_bazaar":
      return (
        <>
          {/* Sunny Rural Sky */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #38bdf8 0%, #7dd3fc 35%, #bae6fd 65%, #fef08a 100%)",
            }}
          />

          {/* Distant Coconut Palms */}
          <div style={{ position: "absolute", top: 120, left: 40, width: 140, height: 180, opacity: 0.6 }}>
            <div style={{ width: 14, height: 180, background: "#78350f", borderRadius: 7, transform: "rotate(-8deg)" }} />
            <div style={{ position: "absolute", top: 0, left: -40, width: 100, height: 20, borderRadius: 10, background: "#15803d", transform: "rotate(-25deg)" }} />
            <div style={{ position: "absolute", top: 0, right: -40, width: 100, height: 20, borderRadius: 10, background: "#166534", transform: "rotate(25deg)" }} />
          </div>
          <div style={{ position: "absolute", top: 110, right: 30, width: 140, height: 190, opacity: 0.55 }}>
            <div style={{ width: 14, height: 190, background: "#78350f", borderRadius: 7, transform: "rotate(6deg)" }} />
            <div style={{ position: "absolute", top: 0, left: -40, width: 100, height: 20, borderRadius: 10, background: "#15803d", transform: "rotate(-30deg)" }} />
            <div style={{ position: "absolute", top: 0, right: -40, width: 100, height: 20, borderRadius: 10, background: "#166534", transform: "rotate(20deg)" }} />
          </div>

          {/* Festive Triangular Bunting Flags across street */}
          <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "space-between", zIndex: 5, padding: "0 10px" }}>
            <div style={{ position: "absolute", top: 15, left: 0, right: 0, height: 2, background: "#334155" }} />
            {["#ef4444", "#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#f97316", "#ef4444", "#f59e0b", "#3b82f6", "#10b981", "#8b5cf6"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "24px solid transparent",
                  borderRight: "24px solid transparent",
                  borderTop: `42px solid ${c}`,
                  zIndex: 6,
                }}
              />
            ))}
          </div>

          {/* Bazaar Ground Road */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 740,
              background: "linear-gradient(180deg, #cbb89d 0%, #b89f7a 50%, #9e8460 100%)",
              borderTop: "6px solid #a88d6b",
              boxShadow: "inset 0 10px 20px rgba(0,0,0,0.15)",
            }}
          />

          {/* Left Store: "রশিদ ট্রেডার্স" (Rashid Traders) */}
          <div
            style={{
              position: "absolute",
              bottom: 420,
              left: 30,
              width: 480,
              height: 440,
              background: "#fef3c7",
              border: "6px solid #d97706",
              borderRadius: 16,
              boxShadow: "0 16px 35px rgba(0,0,0,0.3)",
              zIndex: 8,
              overflow: "hidden",
            }}
          >
            {/* Red Signboard */}
            <div
              style={{
                height: 70,
                background: "linear-gradient(180deg, #dc2626 0%, #991b1b 100%)",
                borderBottom: "4px solid #fef08a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ffffff",
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: "0.05em",
                textShadow: "0 2px 4px rgba(0,0,0,0.7)",
              }}
            >
              রশিদ ট্রেডার্স
            </div>
            {/* Blue-White Striped Awning */}
            <div style={{ height: 40, display: "flex", borderBottom: "4px solid #1e3a8a" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} style={{ flex: 1, height: "100%", background: i % 2 === 0 ? "#1d4ed8" : "#ffffff" }} />
              ))}
            </div>
            {/* Grocery Shelves & Goods */}
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ height: 45, background: "#d97706", borderRadius: 8, display: "flex", gap: 14, padding: "8px 12px" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} style={{ flex: 1, background: i % 2 === 0 ? "#ef4444" : "#f59e0b", borderRadius: 4 }} />
                ))}
              </div>
              <div style={{ height: 45, background: "#d97706", borderRadius: 8, display: "flex", gap: 14, padding: "8px 12px" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} style={{ flex: 1, background: i % 2 === 0 ? "#3b82f6" : "#10b981", borderRadius: 4 }} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Store: "ন্যায্য দাম স্টোর" (Fair Price Store) */}
          <div
            style={{
              position: "absolute",
              bottom: 420,
              right: 30,
              width: 480,
              height: 440,
              background: "#ecfdf5",
              border: "6px solid #059669",
              borderRadius: 16,
              boxShadow: "0 16px 35px rgba(0,0,0,0.3)",
              zIndex: 8,
              overflow: "hidden",
            }}
          >
            {/* Green Signboard */}
            <div
              style={{
                height: 70,
                background: "linear-gradient(180deg, #15803d 0%, #14532d 100%)",
                borderBottom: "4px solid #fef08a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ffffff",
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: "0.05em",
                textShadow: "0 2px 4px rgba(0,0,0,0.7)",
              }}
            >
              ন্যায্য দাম স্টোর
            </div>
            {/* Green-White Striped Awning */}
            <div style={{ height: 40, display: "flex", borderBottom: "4px solid #065f46" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} style={{ flex: 1, height: "100%", background: i % 2 === 0 ? "#059669" : "#ffffff" }} />
              ))}
            </div>
            {/* Shelves */}
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ height: 45, background: "#059669", borderRadius: 8, display: "flex", gap: 14, padding: "8px 12px" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} style={{ flex: 1, background: i % 2 === 0 ? "#facc15" : "#38bdf8", borderRadius: 4 }} />
                ))}
              </div>
              <div style={{ height: 45, background: "#059669", borderRadius: 8, display: "flex", gap: 14, padding: "8px 12px" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} style={{ flex: 1, background: i % 2 === 0 ? "#f97316" : "#a855f7", borderRadius: 4 }} />
                ))}
              </div>
            </div>
          </div>

          {/* Burlap Rice/Grain Sacks stacked on ground */}
          <div style={{ position: "absolute", bottom: 250, left: 40, zIndex: 12, display: "flex", gap: 12 }}>
            <div style={{ width: 75, height: 95, borderRadius: 14, background: "#f5f5f4", border: "3px solid #d6d3d1", position: "relative" }}>
              <div style={{ position: "absolute", top: 40, left: 0, right: 0, height: 10, background: "#2563eb" }} />
            </div>
            <div style={{ width: 85, height: 110, borderRadius: 16, background: "#f5f5f4", border: "3px solid #d6d3d1", position: "relative" }}>
              <div style={{ position: "absolute", top: 45, left: 0, right: 0, height: 12, background: "#2563eb" }} />
            </div>
          </div>
        </>
      );

    case "village_bazaar_night":
      return (
        <>
          {/* Deep Midnight Blue/Indigo Sky */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #020617 0%, #0f172a 45%, #1e1b4b 100%)",
            }}
          />

          {/* Glowing Crescent Moon & Stars */}
          <div
            style={{
              position: "absolute",
              top: 80,
              right: 120,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#fef08a",
              boxShadow: "0 0 35px rgba(254, 240, 138, 0.8), 0 0 70px rgba(250, 204, 21, 0.4)",
            }}
          />
          {[
            { top: 120, left: 100 }, { top: 90, left: 300 }, { top: 160, left: 480 },
            { top: 70, left: 620 }, { top: 140, left: 820 }, { top: 190, left: 960 },
          ].map((st, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: st.top,
                left: st.left,
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#ffffff",
                boxShadow: "0 0 8px #ffffff",
              }}
            />
          ))}

          {/* Bazaar Ground at Night */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 740,
              background: "linear-gradient(180deg, #1c1917 0%, #0c0a09 100%)",
              borderTop: "6px solid #44403c",
            }}
          />

          {/* Warm Lantern / Hurricane Lamp Light Effect */}
          <div
            style={{
              position: "absolute",
              bottom: 300,
              left: "50%",
              transform: "translateX(-50%)",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, rgba(245, 158, 11, 0.08) 55%, transparent 75%)",
              pointerEvents: "none",
              zIndex: 10,
            }}
          />
        </>
      );

    case "clothing_store":
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* 1. Warm Boutique Store Wall */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #fefce8 0%, #fef3c7 40%, #fed7aa 100%)",
            }}
          />

          {/* 2. Boutique Ceiling & Track Spotlights */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 120,
              backgroundColor: "#292524",
              borderBottom: "4px solid #44403c",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "0 60px",
              zIndex: 5,
            }}
          >
            {/* Spotlights */}
            {[0, 1, 2, 3].map((s) => (
              <div key={s} style={{ position: "relative" }}>
                <div
                  style={{
                    width: 32,
                    height: 20,
                    borderRadius: 4,
                    backgroundColor: "#78716c",
                    border: "2px solid #a8a29e",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    left: 4,
                    width: 24,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#fef08a",
                    boxShadow: "0 0 25px 8px rgba(254, 240, 138, 0.6)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* 3. Soft Ambient Spotlight Cones on Wall */}
          {[120, 360, 600, 840].map((x, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 100,
                left: x - 80,
                width: 160,
                height: 500,
                background: "linear-gradient(180deg, rgba(254, 240, 138, 0.25) 0%, transparent 100%)",
                clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
                pointerEvents: "none",
              }}
            />
          ))}

          {/* 4. Retail Store Signboard (Center Top) */}
          <div
            style={{
              position: "absolute",
              top: 140,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#7c2d12",
              border: "3px solid #f59e0b",
              borderRadius: 18,
              padding: "8px 36px",
              boxShadow: "0 8px 24px rgba(120, 53, 15, 0.25)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              zIndex: 4,
            }}
          >
            <span style={{ fontSize: 24 }}>👔</span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#fef3c7",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              রাশেদ গার্মেন্টস অ্যান্ড ফ্যাশনস
            </span>
          </div>

          {/* 5. Left Clothing Rack (Hanging Dress Shirts) */}
          <div
            style={{
              position: "absolute",
              top: 260,
              left: 40,
              width: 240,
              height: 520,
              zIndex: 3,
            }}
          >
            {/* Stand bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 10,
                right: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#78716c",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 20,
                width: 8,
                bottom: 0,
                backgroundColor: "#57534e",
              }}
            />
            {/* Hanging shirts */}
            {[
              { color: "#0284c7", x: 35 },
              { color: "#dc2626", x: 75 },
              { color: "#16a34a", x: 115 },
              { color: "#9333ea", x: 155 },
              { color: "#ea580c", x: 195 },
            ].map((shirt, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: 10,
                  left: shirt.x,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Hanger */}
                <div
                  style={{
                    width: 32,
                    height: 14,
                    borderTop: "3px solid #d97706",
                    borderLeft: "2px solid #d97706",
                    borderRight: "2px solid #d97706",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                {/* Hanging Shirt fabric */}
                <div
                  style={{
                    width: 36,
                    height: 160,
                    backgroundColor: shirt.color,
                    borderRadius: "4px 4px 6px 6px",
                    boxShadow: "2px 6px 12px rgba(0,0,0,0.15)",
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* 6. Right Retail Display Shelves (Folded Textiles / Fabrics) */}
          <div
            style={{
              position: "absolute",
              top: 240,
              right: 40,
              width: 240,
              height: 540,
              display: "flex",
              flexDirection: "column",
              gap: 28,
              zIndex: 3,
            }}
          >
            {[0, 1, 2].map((shelf) => (
              <div
                key={shelf}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* Folded Shirts Stack */}
                <div style={{ display: "flex", gap: 8, marginBottom: -2 }}>
                  {/* Stack 1 */}
                  <div style={{ display: "flex", flexDirection: "column-reverse", gap: 3 }}>
                    <div style={{ width: 68, height: 16, borderRadius: 4, backgroundColor: "#3b82f6" }} />
                    <div style={{ width: 66, height: 16, borderRadius: 4, backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }} />
                    <div style={{ width: 64, height: 16, borderRadius: 4, backgroundColor: "#ef4444" }} />
                  </div>
                  {/* Stack 2 */}
                  <div style={{ display: "flex", flexDirection: "column-reverse", gap: 3 }}>
                    <div style={{ width: 68, height: 16, borderRadius: 4, backgroundColor: "#10b981" }} />
                    <div style={{ width: 66, height: 16, borderRadius: 4, backgroundColor: "#f59e0b" }} />
                    <div style={{ width: 64, height: 16, borderRadius: 4, backgroundColor: "#6366f1" }} />
                  </div>
                </div>
                {/* Wooden Shelf Plank */}
                <div
                  style={{
                    width: "100%",
                    height: 16,
                    backgroundColor: "#b45309",
                    borderRadius: 4,
                    boxShadow: "0 6px 14px rgba(180, 83, 9, 0.35)",
                    borderTop: "3px solid #d97706",
                  }}
                />
              </div>
            ))}
          </div>

          {/* 7. Center Boutique Mirror / Fabric Rolls Backdrop */}
          <div
            style={{
              position: "absolute",
              top: 260,
              left: "50%",
              transform: "translateX(-50%)",
              width: 320,
              height: 480,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "8px solid #b45309",
              borderRadius: 24,
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.06), 0 10px 25px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <span style={{ fontSize: 44, opacity: 0.25 }}>🛍️</span>
            <span style={{ fontSize: 18, color: "#92400e", fontWeight: 800, marginTop: 8, opacity: 0.6 }}>
              নতুন কালেকশন
            </span>
          </div>

          {/* 8. Floor Divider & Polished Wooden Boutique Planks */}
          <div
            style={{
              position: "absolute",
              top: 860,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, #78350f 0%, #451a03 100%)",
              boxShadow: "inset 0 12px 25px rgba(0,0,0,0.4)",
              zIndex: 1,
            }}
          >
            {/* Wood Plank Perspective Lines */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.2,
                backgroundImage:
                  "repeating-linear-gradient(90deg, #000000 0px, #000000 2px, transparent 2px, transparent 120px)",
              }}
            />
            {/* Wooden Baseboard Molding */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 24,
                backgroundColor: "#292524",
                borderBottom: "3px solid #1c1917",
              }}
            />
          </div>
        </div>
      );

    case "electronics_store":
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* 1. Modern High-Tech Showroom Wall */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #0b1329 0%, #172554 45%, #0f172a 100%)",
            }}
          />

          {/* 2. Showroom Ceiling & Track Spotlights */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 120,
              backgroundColor: "#090d16",
              borderBottom: "4px solid #1e293b",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "0 60px",
              zIndex: 5,
            }}
          >
            {[0, 1, 2, 3].map((s) => (
              <div key={s} style={{ position: "relative" }}>
                <div
                  style={{
                    width: 34,
                    height: 20,
                    borderRadius: 4,
                    backgroundColor: "#334155",
                    border: "2px solid #06b6d4",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 14,
                    height: 8,
                    borderRadius: "0 0 7px 7px",
                    backgroundColor: "#e0f2fe",
                    boxShadow: "0 0 16px rgba(56, 189, 248, 0.9)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* 3. Glowing Showroom Signboard: জামাল ইলেকট্রনিক্স */}
          <div
            style={{
              position: "absolute",
              top: 140,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 36px",
              backgroundColor: "rgba(8, 47, 73, 0.9)",
              border: "2.5px solid #06b6d4",
              borderRadius: 30,
              boxShadow: "0 0 30px rgba(6, 182, 212, 0.4), 0 8px 24px rgba(0,0,0,0.4)",
              zIndex: 4,
            }}
          >
            <span style={{ fontSize: 24 }}>⚡</span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#f8fafc",
                letterSpacing: 0.5,
                textShadow: "0 0 12px rgba(56, 189, 248, 0.8)",
              }}
            >
              জামাল ইলেকট্রনিক্স অ্যান্ড অ্যাপ্লায়েন্স
            </span>
          </div>

          {/* 4. Center 65" Frameless 4K Smart LED TV Mount */}
          <div
            style={{
              position: "absolute",
              top: 250,
              left: "50%",
              transform: "translateX(-50%)",
              width: 360,
              height: 220,
              backgroundColor: "#020617",
              border: "6px solid #1e293b",
              borderRadius: 14,
              boxShadow: "0 14px 40px rgba(0,0,0,0.7), 0 0 25px rgba(59, 130, 246, 0.25)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              zIndex: 2,
            }}
          >
            {/* TV Screen Display Image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #0284c7 0%, #3b82f6 40%, #9333ea 100%)",
                opacity: 0.85,
              }}
            />
            {/* 4K Smart Display Badge */}
            <div style={{ position: "relative", textAlign: "center", zIndex: 3 }}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: "#ffffff",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                4K SMART TV
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fef08a",
                  marginTop: 4,
                }}
              >
                ১০টি ডিসপ্লে মডেল স্টকে 📺
              </div>
            </div>
            {/* Sleek Soundbar Under TV */}
            <div
              style={{
                position: "absolute",
                bottom: 6,
                left: 40,
                right: 40,
                height: 8,
                backgroundColor: "#0f172a",
                borderRadius: 4,
                border: "1px solid #334155",
              }}
            />
          </div>

          {/* 5. Left Wall: Glass Gadgets & Appliances Shelf */}
          <div
            style={{
              position: "absolute",
              top: 220,
              left: 40,
              width: 250,
              display: "flex",
              flexDirection: "column",
              gap: 50,
              zIndex: 3,
            }}
          >
            {/* Shelf 1: Smartphone & Tablet Boxes */}
            <div>
              <div style={{ display: "flex", gap: 10, marginBottom: -2 }}>
                <div style={{ width: 44, height: 60, borderRadius: 6, backgroundColor: "#0284c7", border: "2px solid #38bdf8", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 900 }}>5G</div>
                <div style={{ width: 44, height: 60, borderRadius: 6, backgroundColor: "#1e293b", border: "2px solid #64748b", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 900 }}>TAB</div>
                <div style={{ width: 44, height: 60, borderRadius: 6, backgroundColor: "#b91c1c", border: "2px solid #f87171", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 900 }}>PRO</div>
              </div>
              {/* Glass Shelf Plank */}
              <div style={{ width: "100%", height: 10, backgroundColor: "#0284c7", opacity: 0.7, borderRadius: 3, boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)" }} />
            </div>

            {/* Shelf 2: Microwave & Blender Packaging */}
            <div>
              <div style={{ display: "flex", gap: 14, marginBottom: -2 }}>
                <div style={{ width: 85, height: 50, borderRadius: 6, backgroundColor: "#334155", border: "2px solid #94a3b8", display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1", fontSize: 11, fontWeight: 800 }}>OVEN ♨</div>
                <div style={{ width: 65, height: 50, borderRadius: 6, backgroundColor: "#065f46", border: "2px solid #34d399", display: "flex", alignItems: "center", justifyContent: "center", color: "#a7f3d0", fontSize: 11, fontWeight: 800 }}>JUICER</div>
              </div>
              {/* Glass Shelf Plank */}
              <div style={{ width: "100%", height: 10, backgroundColor: "#0284c7", opacity: 0.7, borderRadius: 3, boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)" }} />
            </div>
          </div>

          {/* 6. Right Wall: Air Conditioner & Sound Systems Shelf */}
          <div
            style={{
              position: "absolute",
              top: 210,
              right: 40,
              width: 250,
              display: "flex",
              flexDirection: "column",
              gap: 40,
              zIndex: 3,
            }}
          >
            {/* Split Inverter AC Unit on Wall */}
            <div
              style={{
                width: 210,
                height: 55,
                backgroundColor: "#f8fafc",
                borderRadius: 8,
                border: "2px solid #cbd5e1",
                boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                padding: "8px 14px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 900, color: "#0284c7" }}>INVERTER 1.5 TON</span>
                <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 800 }}>18°C ❄</span>
              </div>
              <div style={{ height: 4, backgroundColor: "#e2e8f0", borderRadius: 2 }} />
            </div>

            {/* Bluetooth Speakers & Headphones Shelf */}
            <div>
              <div style={{ display: "flex", gap: 12, marginBottom: -2 }}>
                <div style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#1e1b4b", border: "3px solid #6366f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🔊</div>
                <div style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#4c0519", border: "3px solid #f43f5e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎧</div>
                <div style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#14532d", border: "3px solid #22c55e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⚡</div>
              </div>
              <div style={{ width: "100%", height: 10, backgroundColor: "#0284c7", opacity: 0.7, borderRadius: 3, boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)" }} />
            </div>
          </div>

          {/* 7. Showroom Glossy Tile Floor */}
          <div
            style={{
              position: "absolute",
              top: 860,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
              boxShadow: "inset 0 12px 25px rgba(0,0,0,0.8)",
              zIndex: 1,
            }}
          >
            {/* Marble Grid Lines */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.25,
                backgroundImage:
                  "repeating-linear-gradient(90deg, #38bdf8 0px, #38bdf8 1.5px, transparent 1.5px, transparent 160px), repeating-linear-gradient(0deg, #38bdf8 0px, #38bdf8 1.5px, transparent 1.5px, transparent 160px)",
              }}
            />
            {/* Showroom Baseboard Molding with Cyan LED Strip */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 18,
                backgroundColor: "#020617",
                borderBottom: "2px solid #06b6d4",
                boxShadow: "0 0 14px rgba(6, 182, 212, 0.6)",
              }}
            />
          </div>
        </div>
      );

    case "corporate_office":
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* 1. Office Wall with Warm Twilight Sky Outside Window */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #1e293b 0%, #0f172a 60%, #020617 100%)",
            }}
          />

          {/* 2. Panoramic Office Window with City Skyscraper View */}
          <div
            style={{
              position: "absolute",
              top: 100,
              left: 80,
              right: 80,
              height: 900,
              background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)",
              border: "8px solid #334155",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.8), 0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            {/* Distant City Skyline Silhouettes */}
            <svg
              viewBox="0 0 920 900"
              style={{ position: "absolute", bottom: 0, width: "100%", height: "100%" }}
            >
              {/* Stars/Lights in sky */}
              <circle cx="200" cy="150" r="2" fill="#ffffff" opacity="0.8" />
              <circle cx="450" cy="120" r="2" fill="#ffffff" opacity="0.7" />
              <circle cx="700" cy="180" r="1.5" fill="#ffffff" opacity="0.6" />
              <circle cx="820" cy="90" r="2.5" fill="#fef08a" opacity="0.9" />

              {/* Distant Skyscrapers */}
              <rect x="40" y="380" width="100" height="520" fill="#090d16" />
              <rect x="160" y="300" width="130" height="600" fill="#0d1322" />
              <rect x="310" y="420" width="90" height="480" fill="#070a12" />
              <rect x="420" y="260" width="150" height="640" fill="#111827" />
              <polygon points="420,260 495,190 570,260" fill="#111827" />
              <rect x="590" y="340" width="110" height="560" fill="#0d1322" />
              <rect x="720" y="390" width="140" height="510" fill="#080c14" />

              {/* Lit Window Dots in Buildings */}
              <rect x="180" y="330" width="12" height="18" fill="#fef08a" opacity="0.7" />
              <rect x="210" y="360" width="12" height="18" fill="#93c5fd" opacity="0.6" />
              <rect x="240" y="400" width="12" height="18" fill="#fef08a" opacity="0.5" />
              <rect x="450" y="300" width="14" height="20" fill="#fef08a" opacity="0.8" />
              <rect x="480" y="340" width="14" height="20" fill="#fde047" opacity="0.75" />
              <rect x="520" y="310" width="14" height="20" fill="#93c5fd" opacity="0.7" />
              <rect x="450" y="390" width="14" height="20" fill="#fef08a" opacity="0.6" />
              <rect x="620" y="370" width="12" height="18" fill="#fde047" opacity="0.8" />
              <rect x="650" y="420" width="12" height="18" fill="#93c5fd" opacity="0.5" />

              {/* Window Glass Glare Reflection */}
              <polygon points="0,0 350,0 120,900 0,900" fill="rgba(255,255,255,0.04)" />
              {/* Window Mullions / Vertical Dividers */}
              <line x1="300" y1="0" x2="300" y2="900" stroke="#334155" strokeWidth="8" />
              <line x1="610" y1="0" x2="610" y2="900" stroke="#334155" strokeWidth="8" />
              <line x1="0" y1="450" x2="920" y2="450" stroke="#334155" strokeWidth="8" />
            </svg>
          </div>

          {/* 3. Ceiling Modern Recessed Lights */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 70,
              background: "#0f172a",
              borderBottom: "3px solid #334155",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "0 80px",
            }}
          >
            <div style={{ width: 140, height: 12, borderRadius: 6, backgroundColor: "#ffffff", boxShadow: "0 0 20px #ffffff, 0 10px 40px rgba(255,255,255,0.4)" }} />
            <div style={{ width: 140, height: 12, borderRadius: 6, backgroundColor: "#ffffff", boxShadow: "0 0 20px #ffffff, 0 10px 40px rgba(255,255,255,0.4)" }} />
            <div style={{ width: 140, height: 12, borderRadius: 6, backgroundColor: "#ffffff", boxShadow: "0 0 20px #ffffff, 0 10px 40px rgba(255,255,255,0.4)" }} />
          </div>

          {/* 4. Elegant Hardwood Parquet Office Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 780,
              background: "linear-gradient(180deg, #1c130d 0%, #2b1d14 30%, #150d08 100%)",
              borderTop: "6px solid #451a03",
              boxShadow: "inset 0 15px 30px rgba(0,0,0,0.7)",
            }}
          >
            {/* Parquet Floor Perspective Lines */}
            <svg viewBox="0 0 1080 780" style={{ width: "100%", height: "100%", opacity: 0.25 }}>
              <line x1="540" y1="0" x2="-200" y2="780" stroke="#9a3412" strokeWidth="3" />
              <line x1="540" y1="0" x2="200" y2="780" stroke="#9a3412" strokeWidth="2.5" />
              <line x1="540" y1="0" x2="540" y2="780" stroke="#9a3412" strokeWidth="2" />
              <line x1="540" y1="0" x2="880" y2="780" stroke="#9a3412" strokeWidth="2.5" />
              <line x1="540" y1="0" x2="1280" y2="780" stroke="#9a3412" strokeWidth="3" />
            </svg>
          </div>

          {/* 5. Modern Office Potted Monstera / Palm Plant (Rests on parquet floor in corner) */}
          <div style={{ position: "absolute", bottom: 50, left: 15, zIndex: 12, pointerEvents: "none" }}>
            <svg width="180" height="260" viewBox="0 0 180 260">
              {/* Ceramic Pot */}
              <polygon points="45,170 135,170 120,250 60,250" fill="#f8fafc" stroke="#222222" strokeWidth="3" />
              <ellipse cx="90" cy="170" rx="45" ry="12" fill="#cbd5e1" stroke="#222222" strokeWidth="3" />
              <ellipse cx="90" cy="170" rx="40" ry="9" fill="#3f1c08" />
              {/* Lush Tropical Leaves */}
              <path d="M 90 170 Q 50 100 20 60 Q 50 80 90 170" fill="#15803d" stroke="#222222" strokeWidth="2.5" />
              <path d="M 90 170 Q 70 80 80 20 Q 95 60 90 170" fill="#16a34a" stroke="#222222" strokeWidth="2.5" />
              <path d="M 90 170 Q 120 70 155 40 Q 130 90 90 170" fill="#22c55e" stroke="#222222" strokeWidth="2.5" />
              <path d="M 90 170 Q 140 120 175 110 Q 140 140 90 170" fill="#15803d" stroke="#222222" strokeWidth="2.5" />
            </svg>
          </div>

          {/* 6. Framed Corporate Certificate / Abstract Art (Right wall) */}
          <div
            style={{
              position: "absolute",
              top: 260,
              right: 25,
              width: 45,
              height: 220,
              background: "#334155",
              border: "3px solid #64748b",
              borderRadius: 8,
              boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "10px 0",
            }}
          >
            <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#eab308" }} />
            <div style={{ width: 30, height: 80, backgroundColor: "#0284c7", borderRadius: 4 }} />
          </div>
        </div>
      );

    case "hospital_clinic":
    case "doctor_chamber":
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* 1. Clinical Sterile Teal Walls */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #042f2e 0%, #0d9488 45%, #115e59 100%)",
            }}
          />

          {/* 2. Medical Ceiling with Fluorescent Strip Lights */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 90,
              backgroundColor: "#022c22",
              borderBottom: "4px solid #14b8a6",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "0 80px",
              zIndex: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 160,
                  height: 14,
                  borderRadius: 6,
                  backgroundColor: "#ccfbf1",
                  boxShadow: "0 0 25px #5eead4, 0 10px 30px rgba(94, 234, 212, 0.5)",
                }}
              />
            ))}
          </div>

          {/* 3. Glowing Clinic Signboard */}
          <div
            style={{
              position: "absolute",
              top: 110,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(4, 47, 46, 0.95)",
              border: "3px solid #2dd4bf",
              borderRadius: 30,
              padding: "10px 40px",
              boxShadow: "0 0 35px rgba(45, 212, 191, 0.45)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              zIndex: 6,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: 20,
              }}
            >
              +
            </div>
            <span
              style={{
                color: "#f0fdfa",
                fontSize: 24,
                fontWeight: 900,
                fontFamily: "'Hind Siliguri', sans-serif",
                letterSpacing: "0.5px",
              }}
            >
              ডক্টরস চেম্বার ও ক্লিনিক
            </span>
          </div>

          {/* 4. Snellen Eye Vision Test Chart on Left Wall */}
          <div
            style={{
              position: "absolute",
              top: 220,
              left: 40,
              width: 130,
              height: 240,
              backgroundColor: "#f8fafc",
              border: "4px solid #334155",
              borderRadius: 8,
              boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 8px",
              zIndex: 4,
            }}
          >
            <span style={{ fontSize: 44, fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>E</span>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#0f172a", letterSpacing: 6 }}>F P</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", letterSpacing: 4 }}>T O Z</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", letterSpacing: 3 }}>L P E D</span>
            <div style={{ width: "90%", height: 3, backgroundColor: "#16a34a" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#0f172a", letterSpacing: 2 }}>P E C F D</span>
            <div style={{ width: "90%", height: 3, backgroundColor: "#dc2626" }} />
          </div>

          {/* 5. Medical Cabinet with Medicine Bottles on Right Wall */}
          <div
            style={{
              position: "absolute",
              top: 220,
              right: 40,
              width: 140,
              height: 250,
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "3px solid #5eead4",
              borderRadius: 12,
              padding: "12px 10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
              zIndex: 4,
            }}
          >
            <div style={{ borderBottom: "2px solid #2dd4bf", paddingBottom: 4, display: "flex", justifyContent: "space-around" }}>
              <div style={{ width: 18, height: 34, borderRadius: 3, backgroundColor: "#38bdf8", border: "1px solid #ffffff" }} />
              <div style={{ width: 16, height: 28, borderRadius: 3, backgroundColor: "#facc15" }} />
              <div style={{ width: 20, height: 38, borderRadius: 3, backgroundColor: "#4ade80" }} />
            </div>
            <div style={{ borderBottom: "2px solid #2dd4bf", paddingBottom: 4, display: "flex", justifyContent: "space-around" }}>
              <div style={{ width: 22, height: 32, borderRadius: 3, backgroundColor: "#f87171" }} />
              <div style={{ width: 18, height: 36, borderRadius: 3, backgroundColor: "#a78bfa" }} />
              <div style={{ width: 16, height: 26, borderRadius: 3, backgroundColor: "#38bdf8" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ width: 20, height: 30, borderRadius: 3, backgroundColor: "#fbbf24" }} />
              <div style={{ width: 22, height: 36, borderRadius: 3, backgroundColor: "#34d399" }} />
              <div style={{ width: 18, height: 32, borderRadius: 3, backgroundColor: "#f472b6" }} />
            </div>
          </div>

          {/* 6. Medical Examination Privacy Curtain Backdrop (Subtle) */}
          <div
            style={{
              position: "absolute",
              top: 480,
              left: 100,
              right: 100,
              height: 380,
              background: "linear-gradient(90deg, #134e4a 0%, #115e59 20%, #134e4a 40%, #0f766e 60%, #134e4a 80%, #115e59 100%)",
              borderRadius: "16px 16px 0 0",
              borderTop: "6px solid #2dd4bf",
              opacity: 0.85,
              boxShadow: "0 -10px 30px rgba(0,0,0,0.5)",
            }}
          />

          {/* 7. Hygienic Clinical Linoleum Tile Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 780,
              background: "linear-gradient(180deg, #022c22 0%, #042f2e 40%, #011814 100%)",
              borderTop: "6px solid #14b8a6",
              boxShadow: "inset 0 20px 40px rgba(0,0,0,0.8)",
            }}
          >
            <svg viewBox="0 0 1080 780" style={{ width: "100%", height: "100%", opacity: 0.35 }}>
              <line x1="540" y1="0" x2="-250" y2="780" stroke="#2dd4bf" strokeWidth="2.5" />
              <line x1="540" y1="0" x2="150" y2="780" stroke="#2dd4bf" strokeWidth="2" />
              <line x1="540" y1="0" x2="540" y2="780" stroke="#2dd4bf" strokeWidth="2" />
              <line x1="540" y1="0" x2="930" y2="780" stroke="#2dd4bf" strokeWidth="2" />
              <line x1="540" y1="0" x2="1330" y2="780" stroke="#2dd4bf" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      );

    case "pharmacy":
    case "medicine_shop":
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* Deep Emerald Pharmacy Walls */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #022c22 0%, #064e3b 50%, #022c22 100%)",
            }}
          />

          {/* Ceiling with Clean White Spotlights */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 85,
              backgroundColor: "#011c15",
              borderBottom: "4px solid #10b981",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "0 60px",
              zIndex: 5,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 14,
                  borderRadius: 4,
                  backgroundColor: "#a7f3d0",
                  boxShadow: "0 0 20px #34d399, 0 10px 25px rgba(52, 211, 153, 0.6)",
                }}
              />
            ))}
          </div>

          {/* Illuminated Pharmacy Green Cross Signboard */}
          <div
            style={{
              position: "absolute",
              top: 105,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#064e3b",
              border: "3px solid #34d399",
              borderRadius: 24,
              padding: "10px 36px",
              boxShadow: "0 0 35px rgba(16, 185, 129, 0.6)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              zIndex: 6,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                backgroundColor: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 15px #34d399",
              }}
            >
              <span style={{ color: "#ffffff", fontWeight: 900, fontSize: 24, lineHeight: 1 }}>+</span>
            </div>
            <span
              style={{
                color: "#ecfdf5",
                fontSize: 24,
                fontWeight: 900,
                fontFamily: "'Hind Siliguri', sans-serif",
              }}
            >
              ফার্মেসি অ্যান্ড ড্রাগ স্টোর
            </span>
          </div>

          {/* Medicine Shelves Grid (Left Wall) */}
          <div
            style={{
              position: "absolute",
              top: 210,
              left: 40,
              width: 140,
              height: 290,
              backgroundColor: "rgba(6, 78, 59, 0.9)",
              border: "3px solid #34d399",
              borderRadius: 8,
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              zIndex: 4,
            }}
          >
            {[0, 1, 2, 3].map((r) => (
              <div key={r} style={{ borderBottom: "2px solid #10b981", paddingBottom: 4, display: "flex", gap: 6 }}>
                <div style={{ flex: 1, height: 26, backgroundColor: r % 2 === 0 ? "#ef4444" : "#3b82f6", borderRadius: 2 }} />
                <div style={{ flex: 1, height: 26, backgroundColor: "#f59e0b", borderRadius: 2 }} />
                <div style={{ flex: 1, height: 26, backgroundColor: "#10b981", borderRadius: 2 }} />
              </div>
            ))}
          </div>

          {/* Medicine Shelves Grid (Right Wall) */}
          <div
            style={{
              position: "absolute",
              top: 210,
              right: 40,
              width: 140,
              height: 290,
              backgroundColor: "rgba(6, 78, 59, 0.9)",
              border: "3px solid #34d399",
              borderRadius: 8,
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              zIndex: 4,
            }}
          >
            {[0, 1, 2, 3].map((r) => (
              <div key={r} style={{ borderBottom: "2px solid #10b981", paddingBottom: 4, display: "flex", gap: 6 }}>
                <div style={{ flex: 1, height: 26, backgroundColor: "#a855f7", borderRadius: 2 }} />
                <div style={{ flex: 1, height: 26, backgroundColor: r % 2 === 0 ? "#06b6d4" : "#f43f5e", borderRadius: 2 }} />
                <div style={{ flex: 1, height: 26, backgroundColor: "#eab308", borderRadius: 2 }} />
              </div>
            ))}
          </div>

          {/* Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 780,
              background: "linear-gradient(180deg, #022c22 0%, #064e3b 50%, #011c15 100%)",
              borderTop: "6px solid #10b981",
              boxShadow: "inset 0 20px 40px rgba(0,0,0,0.8)",
            }}
          />
        </div>
      );

    case "grocery_store":
    case "departmental_store":
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* Supermarket Wall */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #451a03 0%, #78350f 45%, #291202 100%)",
            }}
          />

          {/* Supermarket Top Signboard */}
          <div
            style={{
              position: "absolute",
              top: 105,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#b45309",
              border: "3px solid #fbbf24",
              borderRadius: 24,
              padding: "10px 40px",
              boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)",
              zIndex: 6,
            }}
          >
            <span style={{ color: "#ffffff", fontSize: 24, fontWeight: 900, fontFamily: "'Hind Siliguri', sans-serif" }}>
              🛒 জেনারেল স্টোর অ্যান্ড গ্রোসারি
            </span>
          </div>

          {/* Left Goods Racks */}
          <div
            style={{
              position: "absolute",
              top: 200,
              left: 40,
              width: 150,
              height: 320,
              backgroundColor: "#291202",
              border: "3px solid #f59e0b",
              borderRadius: 8,
              padding: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              zIndex: 4,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ borderBottom: "2px solid #d97706", paddingBottom: 4, display: "flex", gap: 6 }}>
                <div style={{ flex: 1, height: 32, backgroundColor: i % 2 === 0 ? "#dc2626" : "#2563eb", borderRadius: 4 }} />
                <div style={{ flex: 1, height: 32, backgroundColor: "#16a34a", borderRadius: 4 }} />
                <div style={{ flex: 1, height: 32, backgroundColor: "#f59e0b", borderRadius: 4 }} />
              </div>
            ))}
          </div>

          {/* Right Goods Racks */}
          <div
            style={{
              position: "absolute",
              top: 200,
              right: 40,
              width: 150,
              height: 320,
              backgroundColor: "#291202",
              border: "3px solid #f59e0b",
              borderRadius: 8,
              padding: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              zIndex: 4,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ borderBottom: "2px solid #d97706", paddingBottom: 4, display: "flex", gap: 6 }}>
                <div style={{ flex: 1, height: 32, backgroundColor: "#9333ea", borderRadius: 4 }} />
                <div style={{ flex: 1, height: 32, backgroundColor: "#ea580c", borderRadius: 4 }} />
                <div style={{ flex: 1, height: 32, backgroundColor: "#0891b2", borderRadius: 4 }} />
              </div>
            ))}
          </div>

          {/* Supermarket Tile Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 780,
              background: "linear-gradient(180deg, #1c1917 0%, #292524 50%, #0c0a09 100%)",
              borderTop: "6px solid #f59e0b",
            }}
          />
        </div>
      );

    case "living_room":
    case "drawing_room":
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* Cozy Home Wallpaper Wall */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #451a03 0%, #78350f 40%, #2e1065 100%)",
            }}
          />

          {/* Elegant Framed Living Room Painting */}
          <div
            style={{
              position: "absolute",
              top: 130,
              left: "50%",
              transform: "translateX(-50%)",
              width: 380,
              height: 220,
              backgroundColor: "#1e1b4b",
              border: "8px solid #b45309",
              borderRadius: 16,
              boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              zIndex: 4,
            }}
          >
            <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#fde047", opacity: 0.8 }} />
          </div>

          {/* Window on Left with Curtains */}
          <div
            style={{
              position: "absolute",
              top: 140,
              left: 40,
              width: 140,
              height: 300,
              backgroundColor: "#0f172a",
              border: "6px solid #b45309",
              borderRadius: 8,
              boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
              zIndex: 3,
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, width: 35, bottom: 0, backgroundColor: "#991b1b" }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: 35, bottom: 0, backgroundColor: "#991b1b" }} />
          </div>

          {/* Soft Living Room Hardwood Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 780,
              background: "linear-gradient(180deg, #291202 0%, #451a03 50%, #1a0801 100%)",
              borderTop: "6px solid #78350f",
            }}
          >
            {/* Persian Floor Rug */}
            <div
              style={{
                position: "absolute",
                top: 40,
                left: 100,
                right: 100,
                height: 180,
                borderRadius: 12,
                background: "linear-gradient(90deg, #991b1b 0%, #b45309 50%, #991b1b 100%)",
                border: "4px solid #fef08a",
                boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
                opacity: 0.7,
              }}
            />
          </div>
        </div>
      );

    case "tea_stall":
    case "tong_dokan":
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* Weathered Rustic Wood Wall */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #291202 0%, #3f1c08 50%, #1a0b02 100%)",
            }}
          />

          {/* Rustic Wood Signboard */}
          <div
            style={{
              position: "absolute",
              top: 105,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#78350f",
              border: "3px solid #d97706",
              borderRadius: 18,
              padding: "10px 40px",
              boxShadow: "0 0 25px rgba(217, 119, 6, 0.4)",
              zIndex: 6,
            }}
          >
            <span style={{ color: "#fef3c7", fontSize: 24, fontWeight: 900, fontFamily: "'Hind Siliguri', sans-serif" }}>
              ☕ খাঁটি চায়ের স্টল ও আড্ডা
            </span>
          </div>

          {/* Tea Kettle & Burner on Left Shelf */}
          <div style={{ position: "absolute", top: 240, left: 50, zIndex: 5 }}>
            <svg width="120" height="130" viewBox="0 0 120 130">
              <ellipse cx="60" cy="85" rx="42" ry="32" fill="#94a3b8" stroke="#334155" strokeWidth="3" />
              <path d="M 60 53 L 60 40 L 75 40" stroke="#334155" strokeWidth="4" fill="none" />
              <path d="M 22 75 Q 5 60 18 45" stroke="#334155" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M 18 40 Q 14 25 22 15" stroke="#f8fafc" strokeWidth="2.5" fill="none" opacity="0.6" />
              <path d="M 26 38 Q 30 22 24 10" stroke="#f8fafc" strokeWidth="2.5" fill="none" opacity="0.6" />
            </svg>
          </div>

          {/* Biscuit Glass Jars on Right Shelf */}
          <div style={{ position: "absolute", top: 230, right: 50, zIndex: 5, display: "flex", gap: 12 }}>
            <div style={{ width: 45, height: 75, backgroundColor: "rgba(255,255,255,0.25)", border: "3px solid #d1d5db", borderRadius: 8, position: "relative" }}>
              <div style={{ position: "absolute", top: -8, left: 4, right: 4, height: 8, backgroundColor: "#dc2626", borderRadius: 3 }} />
              <div style={{ position: "absolute", bottom: 6, left: 6, right: 6, height: 45, backgroundColor: "#d97706", borderRadius: 4 }} />
            </div>
            <div style={{ width: 45, height: 75, backgroundColor: "rgba(255,255,255,0.25)", border: "3px solid #d1d5db", borderRadius: 8, position: "relative" }}>
              <div style={{ position: "absolute", top: -8, left: 4, right: 4, height: 8, backgroundColor: "#16a34a", borderRadius: 3 }} />
              <div style={{ position: "absolute", bottom: 6, left: 6, right: 6, height: 45, backgroundColor: "#b45309", borderRadius: 4 }} />
            </div>
          </div>

          {/* Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 780,
              background: "linear-gradient(180deg, #1c0d02 0%, #291202 50%, #0d0601 100%)",
              borderTop: "6px solid #92400e",
            }}
          />
        </div>
      );

    case "police_station":
    case "government_office":
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* Formal Khaki Government Wall */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #1e293b 0%, #334155 45%, #0f172a 100%)",
            }}
          />

          {/* Official Signboard */}
          <div
            style={{
              position: "absolute",
              top: 105,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#0f172a",
              border: "3px solid #94a3b8",
              borderRadius: 20,
              padding: "10px 40px",
              boxShadow: "0 0 25px rgba(0,0,0,0.6)",
              zIndex: 6,
            }}
          >
            <span style={{ color: "#f8fafc", fontSize: 24, fontWeight: 900, fontFamily: "'Hind Siliguri', sans-serif" }}>
              ⚖️ থানা ও তদন্ত অফিস
            </span>
          </div>

          {/* Case Notice Board on Left Wall */}
          <div
            style={{
              position: "absolute",
              top: 210,
              left: 40,
              width: 150,
              height: 250,
              backgroundColor: "#78350f",
              border: "5px solid #451a03",
              borderRadius: 8,
              padding: 10,
              boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              zIndex: 4,
            }}
          >
            <div style={{ width: "90%", height: 45, backgroundColor: "#fef3c7", borderRadius: 4, padding: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#dc2626" }} />
            </div>
            <div style={{ width: "85%", height: 50, backgroundColor: "#fef3c7", borderRadius: 4, padding: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#2563eb" }} />
            </div>
          </div>

          {/* Steel Filing Cabinet on Right Wall */}
          <div
            style={{
              position: "absolute",
              top: 200,
              right: 40,
              width: 130,
              height: 280,
              backgroundColor: "#475569",
              border: "4px solid #1e293b",
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              padding: "10px",
              zIndex: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 60, backgroundColor: "#334155", borderRadius: 4, border: "2px solid #64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 26, height: 8, backgroundColor: "#94a3b8", borderRadius: 2 }} />
              </div>
            ))}
          </div>

          {/* Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 780,
              background: "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #020617 100%)",
              borderTop: "6px solid #475569",
            }}
          />
        </div>
      );

    case "restaurant_dining":
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* Exposed Red Brick Restaurant Wall */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #450a0a 0%, #7f1d1d 40%, #1c0505 100%)",
            }}
          />

          {/* Warm Hanging Pendant Lamps */}
          <div style={{ position: "absolute", top: 0, left: 140, zIndex: 6 }}>
            <div style={{ width: 3, height: 120, backgroundColor: "#d97706", margin: "0 auto" }} />
            <div style={{ width: 44, height: 26, borderRadius: "22px 22px 0 0", backgroundColor: "#b45309" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#fef08a", margin: "0 auto", boxShadow: "0 0 25px #fef08a, 0 0 45px #f59e0b" }} />
          </div>
          <div style={{ position: "absolute", top: 0, right: 140, zIndex: 6 }}>
            <div style={{ width: 3, height: 120, backgroundColor: "#d97706", margin: "0 auto" }} />
            <div style={{ width: 44, height: 26, borderRadius: "22px 22px 0 0", backgroundColor: "#b45309" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#fef08a", margin: "0 auto", boxShadow: "0 0 25px #fef08a, 0 0 45px #f59e0b" }} />
          </div>

          {/* Framed Chalkboard Menu on Wall */}
          <div
            style={{
              position: "absolute",
              top: 150,
              left: "50%",
              transform: "translateX(-50%)",
              width: 320,
              height: 180,
              backgroundColor: "#1c1917",
              border: "6px solid #b45309",
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 15px 35px rgba(0,0,0,0.7)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              zIndex: 4,
            }}
          >
            <span style={{ color: "#fef08a", fontSize: 20, fontWeight: 900 }}>CHEF'S SPECIAL MENU</span>
            <div style={{ width: "80%", height: 2, backgroundColor: "#78716c" }} />
            <span style={{ color: "#f5f5f4", fontSize: 16 }}>• Fresh Platters & Drinks</span>
          </div>

          {/* Polished Dark Mahogany Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 780,
              background: "linear-gradient(180deg, #1f0808 0%, #3b0d0d 50%, #0d0202 100%)",
              borderTop: "6px solid #991b1b",
            }}
          />
        </div>
      );

    case "factory_warehouse":
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* Industrial Corrugated Steel Wall */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #020617 100%)",
            }}
          />

          {/* Overhead Industrial Truss Beams */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 80,
              backgroundColor: "#020617",
              borderBottom: "4px solid #f59e0b",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              zIndex: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 120, height: 20, backgroundColor: "#334155", borderRadius: 4 }} />
            ))}
          </div>

          {/* Stacked Cargo Cardboard Boxes on Pallet (Left) */}
          <div style={{ position: "absolute", top: 240, left: 40, zIndex: 4 }}>
            <div style={{ width: 120, height: 90, backgroundColor: "#b45309", border: "3px solid #78350f", borderRadius: 6, marginBottom: 6 }}>
              <div style={{ width: 40, height: 24, backgroundColor: "#ffffff", margin: "10px", borderRadius: 2 }} />
            </div>
            <div style={{ width: 140, height: 100, backgroundColor: "#92400e", border: "3px solid #78350f", borderRadius: 6 }}>
              <div style={{ width: 45, height: 26, backgroundColor: "#ffffff", margin: "12px", borderRadius: 2 }} />
            </div>
          </div>

          {/* Concrete Floor with Yellow Caution Line */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 780,
              background: "linear-gradient(180deg, #1e293b 0%, #334155 40%, #0f172a 100%)",
              borderTop: "8px solid #f59e0b",
            }}
          />
        </div>
      );

    case "street_outdoor":
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* Atmospheric Twilight Sky */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #090d16 0%, #1e1b4b 45%, #312e81 80%, #1e1b4b 100%)",
            }}
          />

          {/* Vintage Cast-Iron Street Lamp on Left */}
          <div style={{ position: "absolute", top: 80, left: 80, zIndex: 5 }}>
            <div style={{ width: 12, height: 420, backgroundColor: "#0f172a", border: "2px solid #334155", margin: "0 auto" }} />
            <div style={{ width: 50, height: 40, borderRadius: "25px 25px 8px 8px", backgroundColor: "#fef08a", boxShadow: "0 0 50px #fde047, 0 0 90px #f59e0b", margin: "-430px auto 0 auto" }} />
          </div>

          {/* Distant City Skyline Silhouettes */}
          <div
            style={{
              position: "absolute",
              bottom: 780,
              left: 0,
              right: 0,
              height: 250,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-around",
              opacity: 0.6,
              zIndex: 3,
            }}
          >
            <div style={{ width: 100, height: 180, backgroundColor: "#090d16" }} />
            <div style={{ width: 140, height: 240, backgroundColor: "#0d1322" }} />
            <div style={{ width: 110, height: 210, backgroundColor: "#070a12" }} />
            <div style={{ width: 130, height: 260, backgroundColor: "#090d16" }} />
          </div>

          {/* Asphalt Road and Sidewalk Curb */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 780,
              background: "linear-gradient(180deg, #1e293b 0%, #0f172a 40%, #020617 100%)",
              borderTop: "8px solid #94a3b8",
            }}
          >
            <svg viewBox="0 0 1080 780" style={{ width: "100%", height: "100%", opacity: 0.3 }}>
              <line x1="540" y1="0" x2="-200" y2="780" stroke="#facc15" strokeWidth="8" strokeDasharray="30 20" />
              <line x1="540" y1="0" x2="1280" y2="780" stroke="#facc15" strokeWidth="8" strokeDasharray="30 20" />
            </svg>
          </div>
        </div>
      );

    // Smart Semantic Room Builder for ANY unlisted or custom theme
    default: {
      const cleanName = String(theme || "custom_scene").replace(/[_\-]+/g, " ").trim();
      const formattedTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      const isRetail = /store|shop|mart|market|showroom|outlet|bazaar|bakery/i.test(cleanName);
      const isOutdoor = /outdoor|street|road|park|field|garden|sky/i.test(cleanName);

      if (isOutdoor) {
        return (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #090d16 0%, #1e1b4b 50%, #312e81 100%)" }} />
            <div
              style={{
                position: "absolute",
                top: 100,
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(15, 23, 42, 0.9)",
                border: "3px solid #38bdf8",
                borderRadius: 24,
                padding: "10px 40px",
                boxShadow: "0 0 30px rgba(56, 189, 248, 0.5)",
                zIndex: 6,
              }}
            >
              <span style={{ color: "#f0f9ff", fontSize: 24, fontWeight: 900, fontFamily: "'Hind Siliguri', sans-serif" }}>
                🌲 {formattedTitle}
              </span>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 780, background: "linear-gradient(180deg, #14532d 0%, #052e16 60%, #021a0c 100%)", borderTop: "6px solid #22c55e" }} />
          </div>
        );
      }

      // Default Retail or Indoor Room
      return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isRetail
                ? "linear-gradient(180deg, #0f172a 0%, #1e293b 45%, #090d16 100%)"
                : "linear-gradient(180deg, #1e1b4b 0%, #312e81 45%, #0f172a 100%)",
            }}
          />

          {/* Ceiling Lights */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 80,
              backgroundColor: "#090d16",
              borderBottom: "4px solid #38bdf8",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              zIndex: 5,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: 40, height: 12, borderRadius: 4, backgroundColor: "#e0f2fe", boxShadow: "0 0 20px #38bdf8" }} />
            ))}
          </div>

          {/* Glowing Semantic Signboard */}
          <div
            style={{
              position: "absolute",
              top: 105,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(15, 23, 42, 0.95)",
              border: "3px solid #38bdf8",
              borderRadius: 24,
              padding: "10px 40px",
              boxShadow: "0 0 35px rgba(56, 189, 248, 0.5)",
              zIndex: 6,
            }}
          >
            <span style={{ color: "#f8fafc", fontSize: 24, fontWeight: 900, fontFamily: "'Hind Siliguri', sans-serif" }}>
              ✨ {formattedTitle}
            </span>
          </div>

          {/* Floor */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 780,
              background: "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #020617 100%)",
              borderTop: "6px solid #38bdf8",
              boxShadow: "inset 0 20px 40px rgba(0,0,0,0.8)",
            }}
          />
        </div>
      );
    }
  }
};

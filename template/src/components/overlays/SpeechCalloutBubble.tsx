import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SpeechCalloutBubbleProps {
  text: string;
  speakerPosition?: "left" | "right" | "center";
  type?: "speech" | "thought" | "shout";
  top?: number;
  highlightText?: string;
  speakerName?: string;
  /** Relative frame offset for spring pop-in when bubble starts mid-scene */
  frame?: number;
}

export const SpeechCalloutBubble: React.FC<SpeechCalloutBubbleProps> = ({
  text,
  speakerPosition = "left",
  type = "speech",
  top = 650,
  highlightText,
  speakerName,
  frame: propFrame,
}) => {
  const currentFrame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Use relative frame if provided, otherwise sequence current frame
  const animFrame = propFrame !== undefined ? propFrame : currentFrame;

  // Spring pop-up animation
  const scale = spring({
    frame: animFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 140,
      mass: 0.7,
    },
  });

  // Calculate position & tail direction
  // Screen is 1080w x 1920h
  const isLeft = speakerPosition === "left";
  const isRight = speakerPosition === "right";

  const bubbleLeft = isLeft ? 60 : isRight ? "auto" : "50%";
  const bubbleRight = isRight ? 60 : "auto";
  const transformX = speakerPosition === "center" ? "-50%" : "0";
  const maxWidth = isLeft || isRight ? 500 : 680;

  // Tail coordinates aligned with character head positions (Head X ~ 240 left, ~ 840 right)
  const tailSide = isLeft ? "left" : isRight ? "right" : "center";

  // Bubble background color
  const bubbleBg = type === "shout" ? "#fef08a" : "#ffffff";

  // Text highlighting
  const renderText = () => {
    if (!highlightText) return text;
    const parts = text.split(new RegExp(`(${highlightText})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlightText.toLowerCase() ? (
        <span key={i} style={{ color: "#e11d48", fontWeight: 900 }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: bubbleLeft,
        right: bubbleRight,
        transform: `translateX(${transformX}) scale(${scale})`,
        transformOrigin: isLeft ? "30% 100%" : isRight ? "70% 100%" : "50% 100%",
        maxWidth,
        minWidth: 300,
        zIndex: 50,
      }}
    >
      {/* Main Bubble Body */}
      <div
        style={{
          position: "relative",
          backgroundColor: bubbleBg,
          border: "3px solid #222222",
          borderRadius: type === "thought" ? 36 : 28,
          padding: "24px 30px",
          color: "#0f172a",
          fontSize: 32,
          fontWeight: 700,
          lineHeight: 1.4,
          fontFamily: "'Hind Siliguri', sans-serif",
          boxShadow: "0 18px 40px rgba(0, 0, 0, 0.35)",
          textAlign: "center",
        }}
      >
        {renderText()}

        {/* Tail: Speech & Shout vs Thought */}
        {(type === "speech" || type === "shout") && (
          <svg
            width="46"
            height="32"
            viewBox="0 0 46 32"
            style={{
              position: "absolute",
              bottom: -30,
              left: tailSide === "left" ? 180 : tailSide === "right" ? "auto" : "calc(50% - 23px)",
              right: tailSide === "right" ? 180 : "auto",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))",
            }}
          >
            {/* Outline triangle */}
            <path
              d={
                tailSide === "left"
                  ? "M 0 0 L 20 30 L 38 0 Z"
                  : tailSide === "right"
                  ? "M 8 0 L 26 30 L 46 0 Z"
                  : "M 6 0 L 23 30 L 40 0 Z"
              }
              fill={bubbleBg}
              stroke="#222222"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Mask to merge tail seamlessly with bubble bottom */}
            <rect
              x={tailSide === "left" ? 3 : tailSide === "right" ? 11 : 9}
              y="-4"
              width="32"
              height="8"
              fill={bubbleBg}
            />
          </svg>
        )}

        {/* Thought Bubble Circles */}
        {type === "thought" && (
          <div
            style={{
              position: "absolute",
              bottom: -36,
              left: tailSide === "left" ? 200 : tailSide === "right" ? "auto" : "50%",
              right: tailSide === "right" ? 200 : "auto",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                border: "2.5px solid #222222",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                border: "2px solid #222222",
              }}
            />
          </div>
        )}
      </div>

      {/* Speaker Name Tag rendered ON TOP of bubble with high z-index */}
      {speakerName && (
        <div
          style={{
            position: "absolute",
            top: -20,
            left: isLeft ? 32 : "auto",
            right: isRight ? 32 : "auto",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 800,
            padding: "5px 20px",
            borderRadius: 16,
            letterSpacing: "0.03em",
            fontFamily: "'Hind Siliguri', sans-serif",
            border: "2.5px solid #ffffff",
            boxShadow: "0 6px 16px rgba(0,0,0,0.45)",
            whiteSpace: "nowrap",
            zIndex: 60,
            display: "inline-flex",
            alignItems: "center",
            lineHeight: 1.25,
          }}
        >
          {speakerName}
        </div>
      )}
    </div>
  );
};

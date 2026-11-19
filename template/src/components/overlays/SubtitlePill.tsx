import React, { useMemo } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface WordTimestamp {
  word: string;
  start: number; // in seconds
  end: number;   // in seconds
}

export interface SubtitlePillProps {
  sceneIndex?: number;
  text: string;
  highlightWords?: string[];
  bottom?: number;
  durationInFrames?: number;
  words?: WordTimestamp[];
}

interface PhraseGroup {
  text: string;
  words: WordTimestamp[];
  start: number;
  end: number;
}

/**
 * Intelligent phrase chunking for viral short-form video subtitles.
 * Breaks speech into natural 3-5 word punchy chunks while preserving
 * natural sentence pauses and preventing awkward orphan 1-word phrases.
 */
function groupWordsIntoPhrases(words: WordTimestamp[]): PhraseGroup[] {
  if (!words || words.length === 0) return [];

  const phrases: PhraseGroup[] = [];
  let current: WordTimestamp[] = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    current.push(w);

    const isLast = i === words.length - 1;
    const hasPunctuationEnd = /[।?!]['"]?$/.test(w.word);
    const hasCommaBreak = current.length >= 3 && /[,;:—]['"]?$/.test(w.word);
    const reachedMaxWords = current.length >= 5;

    // Check remaining words in current sentence to avoid creating 1-word orphan lines
    const nextIsSentenceEnd = i + 1 < words.length && /[।?!]['"]?$/.test(words[i + 1].word);

    if (!isLast) {
      if (hasPunctuationEnd || hasCommaBreak || (reachedMaxWords && !nextIsSentenceEnd)) {
        const nextWord = words[i + 1];
        phrases.push({
          text: current.map((x) => x.word).join(" "),
          words: [...current],
          start: current[0].start,
          // Seamless hold until next phrase begins (prevents blank-frame flashing)
          end: nextWord.start,
        });
        current = [];
      }
    }
  }

  if (current.length > 0) {
    phrases.push({
      text: current.map((x) => x.word).join(" "),
      words: current,
      start: current[0].start,
      end: current[current.length - 1].end + 0.45,
    });
  }

  return phrases;
}

export const SubtitlePill: React.FC<SubtitlePillProps> = ({
  sceneIndex,
  text,
  highlightWords = [],
  bottom = 75,
  durationInFrames = 240,
  words: customWords,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Current audio playback time in seconds
  const currentTime = frame / fps;

  // Resolve word timestamps dynamically from text if not provided
  const rawWords: WordTimestamp[] = useMemo(() => {
    if (customWords && customWords.length > 0) return customWords;
    if (!text || text.trim().length === 0) return [];

    const rawList = text.trim().split(/\s+/).filter(Boolean);
    if (rawList.length === 0) return [];

    const weights = rawList.map((word) => {
      let w = word.length + 1;
      if (/[।?!]/.test(word)) w += 3;
      else if (/[,;:—-]/.test(word)) w += 1.5;
      return w;
    });

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    const totalDurationSec = durationInFrames / fps;
    const timePerWeight = totalDurationSec / totalWeight;

    let cursor = 0;
    return rawList.map((word, idx) => {
      const dur = weights[idx] * timePerWeight;
      const start = parseFloat(cursor.toFixed(2));
      const end = parseFloat((cursor + dur).toFixed(2));
      cursor += dur;
      return { word, start, end };
    });
  }, [customWords, text, durationInFrames, fps]);

  if (rawWords.length === 0) {
    return null;
  }

  const phrases = useMemo(() => groupWordsIntoPhrases(rawWords), [rawWords]);
  if (phrases.length === 0) return null;

  // Find currently active phrase based on exact audio timestamp
  let activePhraseIndex = -1;
  const firstStart = phrases[0].start;
  const lastEnd = phrases[phrases.length - 1].end;

  if (currentTime >= firstStart - 0.15 && currentTime <= lastEnd + 0.5) {
    for (let p = 0; p < phrases.length; p++) {
      const phrase = phrases[p];
      const isLast = p === phrases.length - 1;
      const nextStart = isLast ? phrase.end + 0.5 : phrases[p + 1].start;

      if (currentTime >= phrase.start - 0.15 && currentTime < nextStart) {
        activePhraseIndex = p;
        break;
      }
    }
  }

  if (activePhraseIndex === -1) {
    return null;
  }

  const activePhrase = phrases[activePhraseIndex];

  // Dynamic spring pop effect when a new phrase enters
  const phraseStartFrame = Math.round(activePhrase.start * fps);
  const phraseLocalFrame = Math.max(0, frame - phraseStartFrame);
  const pillScale = spring({
    frame: phraseLocalFrame,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.5 },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left: 40,
        right: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
        pointerEvents: "none",
        transform: `scale(${pillScale})`,
        transformOrigin: "center bottom",
      }}
    >
      <div
        style={{
          background: "rgba(10, 16, 32, 0.90)",
          backdropFilter: "blur(20px)",
          border: "1.5px solid rgba(255, 255, 255, 0.18)",
          borderRadius: 9999, // Pill capsule
          padding: "16px 32px",
          maxWidth: "92%",
          boxShadow:
            "0 18px 45px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.22)",
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px 12px",
        }}
      >
        {activePhrase.words.map((w, i) => {
          // Precise sync: Is this word currently being spoken right now?
          const isActive = currentTime >= w.start && currentTime <= w.end + 0.12;
          const isPast = currentTime > w.end + 0.12;

          const isKeyword = highlightWords.some((hw) => {
            const cleanHw = hw.replace(/[.,!?'"‘’“”]/g, "").trim().toLowerCase();
            const cleanWord = w.word.replace(/[.,!?'"‘’“”]/g, "").trim().toLowerCase();
            return cleanHw && cleanWord && (cleanWord.includes(cleanHw) || cleanHw.includes(cleanWord));
          });

          // Common fixed geometry to prevent layout shifts
          const baseWordStyle: React.CSSProperties = {
            display: "inline-flex",
            alignItems: "center",
            fontFamily: "'Hind Siliguri', sans-serif",
            fontSize: 44,
            fontWeight: 700,
            lineHeight: 1.25,
            padding: "4px 12px",
            borderRadius: 12,
            letterSpacing: "-0.01em",
            transition: "transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.1s ease, background 0.1s ease",
          };

          // 1. Keyword Word (Viral amber/gold glowing badge)
          if (isKeyword) {
            return (
              <span
                key={`${activePhrase.start}-${i}`}
                style={{
                  ...baseWordStyle,
                  background: isActive
                    ? "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)"
                    : "rgba(245, 158, 11, 0.2)",
                  color: isActive ? "#ffffff" : "#fbbf24",
                  border: isActive
                    ? "1.5px solid #fbbf24"
                    : "1.5px solid rgba(245, 158, 11, 0.5)",
                  textShadow: isActive
                    ? "0 0 20px rgba(245, 158, 11, 1), 0 2px 4px rgba(0,0,0,0.8)"
                    : "0 1px 3px rgba(0,0,0,0.6)",
                  boxShadow: isActive
                    ? "0 0 22px rgba(245, 158, 11, 0.6), 0 4px 12px rgba(0,0,0,0.6)"
                    : "none",
                  transform: isActive ? "scale(1.10)" : "scale(1.0)",
                }}
              >
                {w.word}
              </span>
            );
          }

          // 2. Active Spoken Word (Radiant Vivid Neon Green glow with pop bounce)
          if (isActive) {
            return (
              <span
                key={`${activePhrase.start}-${i}`}
                style={{
                  ...baseWordStyle,
                  color: "#22c55e", // Radiant Neon Green
                  background: "rgba(34, 197, 94, 0.22)",
                  border: "1.5px solid rgba(34, 197, 94, 0.6)",
                  textShadow:
                    "0 0 16px rgba(34, 197, 94, 0.95), 0 0 30px rgba(34, 197, 94, 0.6)",
                  boxShadow: "0 0 20px rgba(34, 197, 94, 0.35)",
                  transform: "scale(1.08)",
                }}
              >
                {w.word}
              </span>
            );
          }

          // 3. Past Spoken Words (Crisp clean white)
          if (isPast) {
            return (
              <span
                key={`${activePhrase.start}-${i}`}
                style={{
                  ...baseWordStyle,
                  color: "#ffffff",
                  background: "transparent",
                  border: "1.5px solid transparent",
                  textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                  transform: "scale(1.0)",
                }}
              >
                {w.word}
              </span>
            );
          }

          // 4. Upcoming Words (Legible semi-transparent white)
          return (
            <span
              key={`${activePhrase.start}-${i}`}
              style={{
                ...baseWordStyle,
                color: "rgba(255, 255, 255, 0.55)",
                background: "transparent",
                border: "1.5px solid transparent",
                transform: "scale(1.0)",
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

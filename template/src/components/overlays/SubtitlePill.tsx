import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

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
  words: WordTimestamp[];
  start: number;
  end: number;
}

function groupWordsIntoPhrases(words: WordTimestamp[]): PhraseGroup[] {
  if (!words || words.length === 0) return [];

  const phrases: PhraseGroup[] = [];
  let current: WordTimestamp[] = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    current.push(w);

    // Natural phrase boundary:
    // 1. Sentence termination (।, ?, !)
    // 2. Comma or quote pause after at least 3 words
    // 3. Max chunk size of 5 words for punchy, dynamic, modern caption timing
    const hasPunctuationEnd = /[।?!]['"]?$/.test(w.word);
    const hasCommaBreak = current.length >= 3 && /[,]['"]?$/.test(w.word);
    const reachedMaxWords = current.length >= 5;

    if ((hasPunctuationEnd || hasCommaBreak || reachedMaxWords) && i < words.length - 1) {
      const nextWord = words[i + 1];
      phrases.push({
        words: [...current],
        start: current[0].start,
        // Hold phrase until next word starts (with a tiny transition gap)
        end: Math.min(current[current.length - 1].end + 0.3, nextWord.start),
      });
      current = [];
    }
  }

  if (current.length > 0) {
    phrases.push({
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

  // Resolve word timestamps dynamically from props.text (NEVER read stale external file)
  const rawWords: WordTimestamp[] = useMemo(() => {
    if (customWords && customWords.length > 0) return customWords;
    if (!text || text.trim().length === 0) return [];

    const wordList = text.trim().split(/\s+/);
    const totalDurationSec = durationInFrames / fps;
    const wordDuration = totalDurationSec / wordList.length;

    return wordList.map((word, idx) => ({
      word,
      start: parseFloat((idx * wordDuration).toFixed(2)),
      end: parseFloat(((idx + 1) * wordDuration).toFixed(2)),
    }));
  }, [customWords, text, durationInFrames, fps]);

  // 1. Precise Word-Timestamp Mode (When Cartesia timestamps exist)
  if (rawWords.length > 0) {
    const phrases = groupWordsIntoPhrases(rawWords);

    // Find currently active phrase based on exact audio timestamp
    // Don't show text before voiceover starts (with a tiny 0.12s lead-in for human eye)
    let activePhrase: PhraseGroup | null = null;

    if (currentTime >= phrases[0].start - 0.12) {
      for (let p = 0; p < phrases.length; p++) {
        const isCurrent =
          currentTime >= phrases[p].start - 0.12 &&
          (p === phrases.length - 1
            ? currentTime <= phrases[p].end + 0.5
            : currentTime < phrases[p + 1].start - 0.12);

        if (isCurrent) {
          activePhrase = phrases[p];
          break;
        }
      }
    }

    // If before voiceover starts, or after narration ends, return null (prevents text showing too early)
    if (!activePhrase) {
      return null;
    }

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
        }}
      >
        <div
          style={{
            background: "rgba(10, 15, 30, 0.92)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(255, 255, 255, 0.16)",
            borderRadius: 24,
            padding: "16px 28px",
            maxWidth: "92%",
            boxShadow:
              "0 20px 45px rgba(0, 0, 0, 0.75), 0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            textAlign: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px 10px",
          }}
        >
          {activePhrase.words.map((w, i) => {
            // Precise sync: Is this word currently being spoken right now?
            const isActive = currentTime >= w.start && currentTime <= (w.end + 0.12);
            const isPast = currentTime > (w.end + 0.12);

            const isKeyword = highlightWords.some((hw) => {
              const cleanHw = hw.replace(/[.,!?'"‘’“”]/g, "").trim().toLowerCase();
              const cleanWord = w.word.replace(/[.,!?'"‘’“”]/g, "").trim().toLowerCase();
              return cleanHw && cleanWord && (cleanWord.includes(cleanHw) || cleanHw.includes(cleanWord));
            });

            // Common fixed geometry to prevent any baseline or horizontal layout shifting
            const baseWordStyle: React.CSSProperties = {
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "'Hind Siliguri', sans-serif",
              fontSize: 42,
              fontWeight: 800,
              lineHeight: 1.25,
              padding: "4px 12px",
              borderRadius: 12,
              letterSpacing: "-0.01em",
              transition: "color 0.1s ease, background-color 0.1s ease, border-color 0.1s ease",
            };

            // 1. Keyword Badge styling (High-impact viral video highlight)
            if (isKeyword) {
              return (
                <span
                  key={`${activePhrase.start}-${i}`}
                  style={{
                    ...baseWordStyle,
                    background: isActive
                      ? "linear-gradient(135deg, #f97316 0%, #ef4444 100%)"
                      : "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
                    color: "#ffffff",
                    border: "2px solid transparent",
                    boxShadow: isActive
                      ? "0 0 24px rgba(249, 115, 22, 1), 0 4px 12px rgba(0,0,0,0.6)"
                      : "0 2px 8px rgba(234, 88, 12, 0.4)",
                  }}
                >
                  {w.word}
                </span>
              );
            }

            // 2. Active Spoken Word (Luminous gold karaoke glow pill with zero jitter)
            if (isActive) {
              return (
                <span
                  key={`${activePhrase.start}-${i}`}
                  style={{
                    ...baseWordStyle,
                    color: "#facc15", // Electric Gold / Yellow
                    background: "rgba(250, 204, 21, 0.22)",
                    border: "2px solid transparent",
                    textShadow:
                      "0 0 16px rgba(250, 204, 21, 0.95), 0 0 30px rgba(245, 158, 11, 0.7)",
                    boxShadow: "0 0 18px rgba(250, 204, 21, 0.35)",
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
                    color: "#f8fafc",
                    background: "transparent",
                    border: "2px solid transparent",
                    textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                  }}
                >
                  {w.word}
                </span>
              );
            }

            // 4. Upcoming Words (Gentle semi-transparent, ready to be spoken)
            return (
              <span
                key={`${activePhrase.start}-${i}`}
                style={{
                  ...baseWordStyle,
                  color: "rgba(255, 255, 255, 0.42)",
                  background: "transparent",
                  border: "2px solid transparent",
                }}
              >
                {w.word}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Fallback Mode (Clean static readable card if no timestamps)
  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left: 36,
        right: 36,
        display: "flex",
        justifyContent: "center",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(10, 15, 30, 0.90)",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(255, 255, 255, 0.18)",
          borderRadius: 24,
          padding: "16px 30px",
          maxWidth: "92%",
          boxShadow: "0 20px 45px rgba(0, 0, 0, 0.7)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1.35,
            color: "#ffffff",
            letterSpacing: "-0.01em",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

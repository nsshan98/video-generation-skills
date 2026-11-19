#!/usr/bin/env node
/**
 * Universal Story Timeline Builder for Remotion Video Generation Skill
 *
 * Usage:
 *   node scripts/build-story-timeline.mjs --input=path/to/story-input.json [--out=template/src/timeline.json]
 *
 * Converts a high-level story scene plan (scenes, audio, characters, timed dialogue,
 * at-a-glance action beats) into a Remotion-ready timeline.json.
 */

import fs from "node:fs";
import path from "node:path";

function parseArgs() {
  const args = {};
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=");
      args[key] = value ?? true;
    }
  }
  return args;
}

function generateWordTimestamps(text, totalDurationSec) {
  if (!text || !text.trim()) return [];
  const rawWords = text.trim().split(/\s+/).filter(Boolean);
  if (rawWords.length === 0) return [];

  const weights = rawWords.map((word) => {
    let w = word.length + 1;
    if (/[।?!]/.test(word)) w += 3;
    else if (/[,;:—-]/.test(word)) w += 1.5;
    return w;
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  const timePerWeight = totalDurationSec / totalWeight;

  let current = 0;
  return rawWords.map((word, i) => {
    const dur = weights[i] * timePerWeight;
    const start = parseFloat(current.toFixed(2));
    const end = parseFloat((current + dur).toFixed(2));
    current += dur;
    return { word, start, end };
  });
}

const args = parseArgs();
const inputPath = args.input || "scripts/story-input.json";
const outputPath = args.out || "template/src/timeline.json";

if (!fs.existsSync(inputPath)) {
  console.error(`❌ Input file not found: ${inputPath}`);
  console.log(`\nUsage: node scripts/build-story-timeline.mjs --input=<path-to-story-input.json>`);
  process.exit(1);
}

const rawData = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const fps = rawData.fps || 30;
const width = rawData.width || 1080;
const height = rawData.height || 1920;
const title = rawData.title || "Animated Story Video";

const scenes = rawData.scenes || [];
if (scenes.length === 0) {
  console.error("❌ No scenes found in input JSON.");
  process.exit(1);
}

const items = [];
const soundEffects = [];
const voiceIntervals = [];
const enableAutoSfx = rawData.autoSfx !== false;
let currentCursorTime = 0;

for (let i = 0; i < scenes.length; i++) {
  const s = scenes[i];
  const sceneDuration = s.duration || s.sceneDuration || 5.0;
  const sceneStart = s.start !== undefined ? s.start : currentCursorTime;
  const isMG = s.type === "motion-graphics-scene";

  const rawNarration = s.narration || s.subtitle || "";
  const narrationText = rawNarration.replace(/\[[a-zA-Z_\s]+\]/g, "").replace(/\s+/g, " ").trim();
  const words = s.words || (narrationText ? generateWordTimestamps(narrationText, sceneDuration) : undefined);

  if (isMG) {
    items.push({
      type: "motion-graphics-scene",
      start: sceneStart,
      duration: sceneDuration,
      mgType: s.mgType || "comparison",
      title: s.title || "",
      subtitle: s.subtitle || "",
      badge: s.badge,
      imageSrc: s.imageSrc,
      narration: narrationText,
      words: words,
      highlightWords: s.highlightWords || [],
      comparisonLeft: s.comparisonLeft,
      comparisonRight: s.comparisonRight,
      checklistItems: s.checklistItems,
      flowSteps: s.flowSteps,
      timeLabel: s.timeLabel,
      timeDetail: s.timeDetail,
      timeIcon: s.timeIcon,
      quoteText: s.quoteText,
      quoteAuthor: s.quoteAuthor,
      optionsCTA: s.optionsCTA,
      backgroundGradient: s.backgroundGradient,
      browserUrl: s.browserUrl,
      interactiveCursor: s.interactiveCursor || (s.interactiveAction?.type === "cursor_click" ? s.interactiveAction : undefined),
      countUp: s.countUp || (s.interactiveAction?.type === "count_up" ? s.interactiveAction : undefined),
      particleBurst: s.particleBurst || (s.interactiveAction?.burst ? { type: s.interactiveAction.burst } : undefined),
      markerHighlight: typeof s.markerHighlight === "string" ? { text: s.markerHighlight } : s.markerHighlight,
      tornPaperCard: s.tornPaperCard,
    });
  } else {
    items.push({
      type: "animated-scene",
      sceneIndex: s.sceneIndex || i + 1,
      start: sceneStart,
      duration: sceneDuration,
      subtitle: s.subtitle || "",
      narration: narrationText,
      words: words || [],
      highlightWords: s.highlightWords || [],
      highlightWords: s.highlightWords || [],
      character: s.character || rawData.defaultCharacter || "rashed",
      characterPose: s.characterPose || "standing",
      characterPoses: s.characterPoses || undefined,
      characterPosition: s.characterPosition || (s.secondaryCharacter ? "right" : "center"),
      secondaryCharacter: s.secondaryCharacter || undefined,
      secondaryPose: s.secondaryPose || (s.secondaryCharacter ? "standing" : undefined),
      secondaryPoses: s.secondaryPoses || undefined,
      secondaryPosition: s.secondaryPosition || (s.secondaryCharacter ? "left" : undefined),
      tertiaryCharacter: s.tertiaryCharacter || undefined,
      tertiaryPose: s.tertiaryPose || (s.tertiaryCharacter ? "standing" : undefined),
      tertiaryPoses: s.tertiaryPoses || undefined,
      tertiaryPosition: s.tertiaryPosition || (s.tertiaryCharacter ? "center" : undefined),
      crowd: s.crowd || undefined,
      backgroundTheme: s.backgroundTheme || rawData.defaultBackground || "clothing_store",
      speechBubble: s.speechBubble,
      speechBubbles: s.speechBubbles,
      hookCard: s.hookCard,
      pinNote: s.pinNote,
      sticker: s.sticker,
      prop: s.prop,
      contextIcon: s.contextIcon,
      metaphor: s.metaphor,
      rackFocus: s.rackFocus,
      screenShake: Boolean(s.screenShake),
      interactiveCursor: s.interactiveCursor || (s.interactiveAction?.type === "cursor_click" ? s.interactiveAction : undefined),
      countUp: s.countUp || (s.interactiveAction?.type === "count_up" ? s.interactiveAction : undefined),
      particleBurst: s.particleBurst || (s.interactiveAction?.burst ? { type: s.interactiveAction.burst } : undefined),
      markerHighlight: typeof s.markerHighlight === "string" ? { text: s.markerHighlight } : s.markerHighlight,
      tornPaperCard: s.tornPaperCard,
      oneTakeTransition: s.oneTakeTransition,
      cameraAngle: s.cameraAngle || (s.screenShake ? "dutch_left" : undefined),
      parallax: s.parallax !== false,
    });
  }

  // Voice interval tracking for BGM Auto-Ducking
  if (s.audioSrc || s.narration || (s.words && s.words.length > 0)) {
    voiceIntervals.push({
      startFrame: Math.round(sceneStart * fps),
      endFrame: Math.round((sceneStart + sceneDuration) * fps),
    });
  }

  // Automated Frame-Accurate SFX Scheduling (AbubakrChan/product-launch-motion)
  if (enableAutoSfx) {
    // Whoosh on scene transition (scene 2 onwards)
    if (i > 0) {
      soundEffects.push({
        src: "media/sfx/whoosh.wav",
        frame: Math.round(sceneStart * fps),
        durationInFrames: Math.round(fps * 0.35),
        volume: 0.18,
      });
    }

    // Pop on speech bubbles
    const bubbles = s.speechBubbles && s.speechBubbles.length > 0
      ? s.speechBubbles
      : s.speechBubble ? [s.speechBubble] : [];

    for (const b of bubbles) {
      const bOffset = b.startFrame !== undefined ? b.startFrame : Math.round((b.start || 0) * fps);
      soundEffects.push({
        src: "media/sfx/pop.wav",
        frame: Math.round(sceneStart * fps) + bOffset,
        durationInFrames: Math.round(fps * 0.2),
        volume: 0.25,
      });
    }

    // Ding on info card, paper cutout, pin note, or marker highlight
    if (s.tornPaperCard || s.pinNote || s.hookCard || s.markerHighlight) {
      soundEffects.push({
        src: "media/sfx/ding.wav",
        frame: Math.round(sceneStart * fps) + Math.round(fps * 0.25),
        durationInFrames: Math.round(fps * 0.7),
        volume: 0.22,
      });
    }

    // Click on interactive cursor click
    if (s.interactiveCursor || s.interactiveAction?.type === "cursor_click") {
      const cFrame = (s.interactiveCursor?.clickFrame || s.interactiveAction?.clickFrame) ?? Math.round(fps * 0.7);
      soundEffects.push({
        src: "media/sfx/click.wav",
        frame: Math.round(sceneStart * fps) + cFrame,
        durationInFrames: Math.round(fps * 0.15),
        volume: 0.32,
      });
    }

    // Cash on count_up, cash_rain, or profit metrics
    if (s.countUp || s.interactiveAction?.type === "count_up" || s.particleBurst?.type === "cash_rain" || s.interactiveAction?.burst === "cash_rain") {
      soundEffects.push({
        src: "media/sfx/cash.wav",
        frame: Math.round(sceneStart * fps) + Math.round(fps * 0.2),
        durationInFrames: Math.round(fps * 0.4),
        volume: 0.28,
      });
    }
  }

  // Add matching audio track if audioSrc is provided
  if (s.audioSrc) {
    items.push({
      type: "audio",
      src: s.audioSrc,
      start: sceneStart,
      duration: sceneDuration,
      volume: s.volume !== undefined ? s.volume : 1,
    });
  }

  currentCursorTime = sceneStart + sceneDuration;
}

// Add global continuous voiceover track if rawData.audioSrc is provided
if (rawData.audioSrc) {
  items.push({
    type: "audio",
    src: rawData.audioSrc,
    start: 0,
    duration: currentCursorTime,
    volume: rawData.audioVolume !== undefined ? rawData.audioVolume : 1,
  });
}

const totalDuration = currentCursorTime;
const totalDurationInFrames = Math.round(totalDuration * fps);

const finalTimeline = {
  width,
  height,
  fps,
  durationInFrames: totalDurationInFrames,
  title,
  progressBar: rawData.progressBar !== undefined ? rawData.progressBar : true,
  autoSfx: enableAutoSfx,
  items,
  soundEffects: soundEffects.concat(rawData.soundEffects || []),
  bgm: rawData.bgm,
  voiceIntervals,
  cinematicOverlay: rawData.cinematicOverlay !== false,
};

fs.writeFileSync(outputPath, JSON.stringify(finalTimeline, null, 2), "utf8");

console.log(`\n========================================`);
console.log(`✓ Universal Timeline successfully generated!`);
console.log(`📁 Source Input : ${inputPath}`);
console.log(`🎬 Output File  : ${outputPath}`);
console.log(`⏱️ Duration     : ${totalDuration.toFixed(2)}s (${totalDurationInFrames} frames @ ${fps}fps)`);
console.log(`🎭 Total Scenes : ${scenes.length}`);
console.log(`========================================\n`);

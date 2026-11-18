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
let currentCursorTime = 0;

for (let i = 0; i < scenes.length; i++) {
  const s = scenes[i];
  const sceneDuration = s.duration || s.sceneDuration || 5.0;
  const sceneStart = s.start !== undefined ? s.start : currentCursorTime;
  const isMG = s.type === "motion-graphics-scene";

  if (isMG) {
    items.push({
      type: "motion-graphics-scene",
      start: sceneStart,
      duration: sceneDuration,
      mgType: s.mgType || "comparison",
      title: s.title || "",
      subtitle: s.subtitle || "",
      badge: s.badge,
      comparisonLeft: s.comparisonLeft,
      comparisonRight: s.comparisonRight,
      checklistItems: s.checklistItems,
      flowSteps: s.flowSteps,
      quoteText: s.quoteText,
      quoteAuthor: s.quoteAuthor,
      optionsCTA: s.optionsCTA,
      backgroundGradient: s.backgroundGradient,
    });
  } else {
    items.push({
      type: "animated-scene",
      sceneIndex: s.sceneIndex || i + 1,
      start: sceneStart,
      duration: sceneDuration,
      subtitle: s.subtitle || "",
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
    });
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

const totalDuration = currentCursorTime;
const totalDurationInFrames = Math.round(totalDuration * fps);

const finalTimeline = {
  width,
  height,
  fps,
  durationInFrames: totalDurationInFrames,
  title,
  items,
};

fs.writeFileSync(outputPath, JSON.stringify(finalTimeline, null, 2), "utf8");

console.log(`\n========================================`);
console.log(`✓ Universal Timeline successfully generated!`);
console.log(`📁 Source Input : ${inputPath}`);
console.log(`🎬 Output File  : ${outputPath}`);
console.log(`⏱️ Duration     : ${totalDuration.toFixed(2)}s (${totalDurationInFrames} frames @ ${fps}fps)`);
console.log(`🎭 Total Scenes : ${scenes.length}`);
console.log(`========================================\n`);

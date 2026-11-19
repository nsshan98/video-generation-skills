#!/usr/bin/env node
/**
 * Universal TTS Engine — Video Generation Skill
 *
 * Usage:
 *   node scripts/tts-engine.mjs --input=scripts/my-story-input.json [options]
 *
 * Options:
 *   --input=<path>          Story input JSON (required, has scenes[] with narration fields)
 *   --prefix=<str>          Audio filename prefix (default: auto from input filename, e.g. "vo-jamal")
 *   --provider=<str>        TTS backend: cartesia (default) | openai | elevenlabs | free
 *   --apiKey=<str>          API key (or set CARTESIA_API_KEY / OPENAI_API_KEY / ELEVENLABS_API_KEY)
 *   --voiceId=<str>         Voice ID for Cartesia/ElevenLabs
 *   --voice=<str>           Voice name for OpenAI
 *   --model=<str>           Model ID
 *   --lang=<str>            Language code override (default: auto-detect, bn for Bengali)
 *   --padding=<float>       Silence gap after each clip in seconds (default: 0.35)
 *   --out=<path>            Where to write updated story-input JSON with audio timing (default: overwrites input)
 *
 * After running, the input JSON is updated in-place with:
 *   - audioSrc, start, duration, audioDuration, durationInFrames on each scene
 * Then run:
 *   node scripts/build-story-timeline.mjs --input=scripts/my-story-input.json
 */

import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const TEMPLATE_DIR = path.join(ROOT_DIR, "template");

// ─── Arg Parser ─────────────────────────────────────────────────────────────
function parseArgs() {
  const args = {};
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith("--")) {
      const eq = arg.indexOf("=");
      if (eq !== -1) {
        args[arg.slice(2, eq)] = arg.slice(eq + 1);
      } else {
        args[arg.slice(2)] = true;
      }
    }
  }
  return args;
}

// ─── Language Detection ───────────────────────────────────────────────────────
function detectLanguage(text) {
  if (/[\u0980-\u09FF]/.test(text)) return "bn";
  if (/[\u0900-\u097F]/.test(text)) return "hi";
  if (/[áéíóúñ¿¡]/i.test(text)) return "es";
  return "en";
}

// ─── TTS Providers ───────────────────────────────────────────────────────────
async function ttsCartesia(text, outputPath, voiceId, model, apiKey) {
  const key = apiKey || process.env.CARTESIA_API_KEY;
  if (!key) throw new Error("No Cartesia API key. Set CARTESIA_API_KEY or pass --apiKey=");

  const res = await fetch("https://api.cartesia.ai/tts/bytes", {
    method: "POST",
    headers: {
      "X-API-Key": key,
      "Cartesia-Version": "2024-06-10",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model_id: model || "sonic-3.6",
      transcript: text,
      voice: { mode: "id", id: voiceId || "314be1d2-3d14-468d-be40-08a1af7df49d" },
      output_format: { container: "mp3", encoding: "mp3", sample_rate: 44100 },
      language: detectLanguage(text)
    })
  });
  if (!res.ok) throw new Error(`Cartesia error: ${await res.text()}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, buf);
}

async function ttsOpenAI(text, outputPath, voice, model, apiKey) {
  const key = apiKey || process.env.OPENAI_API_KEY;
  if (!key) throw new Error("No OpenAI API key. Set OPENAI_API_KEY or pass --apiKey=");
  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: model || "tts-1", voice: voice || "alloy", input: text })
  });
  if (!res.ok) throw new Error(`OpenAI TTS error (${res.status}): ${await res.text()}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, buf);
}

async function ttsElevenLabs(text, outputPath, voiceId, model, apiKey) {
  const key = apiKey || process.env.ELEVENLABS_API_KEY;
  if (!key) throw new Error("No ElevenLabs API key. Set ELEVENLABS_API_KEY or pass --apiKey=");
  const targetVoice = voiceId || "pNInz6obpgDQGcFmaJgB"; // Default: Adam (Rich expressive voice)

  let attempts = 0;
  while (attempts < 3) {
    attempts++;
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${targetVoice}`, {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: model || "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.45,
          similarity_boost: 0.8,
          style: 0.35,
          use_speaker_boost: true
        }
      })
    });

    if (res.status === 429) {
      console.warn(`    ⚠ Rate limit (429), waiting 2.5s before retry (attempt ${attempts}/3)...`);
      await new Promise((r) => setTimeout(r, 2500));
      continue;
    }

    if (!res.ok) throw new Error(`ElevenLabs error (${res.status}): ${await res.text()}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, buf);
    // Safe delay to respect rate limits
    await new Promise((r) => setTimeout(r, 800));
    return;
  }
  throw new Error("ElevenLabs failed after 3 attempts due to rate limit.");
}

async function ttsFree(text, outputPath, lang) {
  const detectedLang = lang || detectLanguage(text);
  // Split long text to avoid Google TTS truncation
  const parts = text.length > 150
    ? text.split(/(?<=[।?!.,\n])/).reduce((acc, p) => {
        if (!acc.length || (acc[acc.length - 1] + p).length > 140) acc.push(p.trim());
        else acc[acc.length - 1] += p;
        return acc;
      }, []).filter(Boolean)
    : [text.trim()];

  const buffers = [];
  for (const chunk of parts) {
    if (!chunk) continue;
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${detectedLang}&q=${encodeURIComponent(chunk)}`;
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`Free TTS failed: ${res.statusText}`);
    buffers.push(Buffer.from(await res.arrayBuffer()));
  }
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, Buffer.concat(buffers));
}

// ─── Duration Probe ────────────────────────────────────────────────────────
function probeDuration(filePath) {
  try {
    const out = execSync(
      `npx remotion ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`,
      { cwd: TEMPLATE_DIR, encoding: "utf-8" }
    ).trim();
    const sec = parseFloat(out);
    return isNaN(sec) ? 3.0 : sec;
  } catch {
    console.warn(`⚠ Could not probe ${path.basename(filePath)}, using 3s fallback.`);
    return 3.0;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs();

  if (!args.input) {
    console.error("❌ Usage: node scripts/tts-engine.mjs --input=scripts/my-story-input.json");
    process.exit(1);
  }

  const inputPath = path.resolve(ROOT_DIR, args.input);
  if (!existsSync(inputPath)) {
    console.error(`❌ Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const storyData = JSON.parse(await fs.readFile(inputPath, "utf-8"));
  const scenes = storyData.scenes || [];
  if (!scenes.length) {
    console.error("❌ No scenes found in input JSON.");
    process.exit(1);
  }

  // Auto-derive file prefix from input filename: "scripts/jamal-story-input.json" → "vo-jamal"
  const baseName = path.basename(inputPath, ".json").replace(/-story-input$/, "").replace(/-input$/, "");
  const prefix = args.prefix || `vo-${baseName}`;

  // Provider selection: CLI arg > env var > default
  const provider = args.provider ||
    (process.env.CARTESIA_API_KEY ? "cartesia" :
      process.env.OPENAI_API_KEY ? "openai" :
        process.env.ELEVENLABS_API_KEY ? "elevenlabs" : "free");

  const padding = parseFloat(args.padding ?? 0.35);

  console.log(`\n🎙 TTS Engine — ${provider.toUpperCase()}`);
  console.log(`📋 Input  : ${args.input}`);
  console.log(`🔖 Prefix : ${prefix}`);
  console.log(`📦 Scenes : ${scenes.length}\n`);

  let currentTime = 0;

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    const narration = scene.ttsText || scene.narration || scene.text || "";
    if (!narration) {
      console.log(`  [Scene ${i + 1}] ⚠ No narration, skipping audio.`);
      continue;
    }

    const filename = `media/${prefix}-${i + 1}.mp3`;
    const fullOut = path.join(TEMPLATE_DIR, "public", filename);
    const shortText = narration.slice(0, 45).replace(/\n/g, " ");
    console.log(`  [${i + 1}/${scenes.length}] "${shortText}..."`);

    try {
      if (provider === "cartesia") {
        await ttsCartesia(narration, fullOut, args.voiceId || scene.voiceId, args.model, args.apiKey);
      } else if (provider === "openai") {
        await ttsOpenAI(narration, fullOut, args.voice || scene.voice, args.model, args.apiKey);
      } else if (provider === "elevenlabs") {
        await ttsElevenLabs(narration, fullOut, args.voiceId || scene.voiceId, args.model, args.apiKey);
      } else {
        await ttsFree(narration, fullOut, args.lang || scene.lang);
      }
    } catch (err) {
      console.error(`  ❌ Scene ${i + 1} failed: ${err.message}`);
      process.exit(1);
    }

    const audioDuration = probeDuration(fullOut);
    const sceneDuration = parseFloat((audioDuration + padding).toFixed(2));

    // Write timing back into the scene
    scene.audioSrc = filename;
    scene.start = parseFloat(currentTime.toFixed(2));
    scene.duration = sceneDuration;
    scene.audioDuration = parseFloat(audioDuration.toFixed(3));
    scene.durationInFrames = Math.round(sceneDuration * (storyData.fps || 30));

    console.log(`     ✓ ${filename} — ${audioDuration.toFixed(2)}s audio → ${sceneDuration.toFixed(2)}s scene`);
    currentTime += sceneDuration;
  }

  const totalDuration = parseFloat(currentTime.toFixed(2));

  // Write updated story input (with audio timing embedded) back to file
  const outPath = args.out ? path.resolve(ROOT_DIR, args.out) : inputPath;
  await fs.writeFile(outPath, JSON.stringify(storyData, null, 2));

  console.log(`\n✅ All ${scenes.length} audio clips generated!`);
  console.log(`⏱  Total duration : ${totalDuration}s`);
  console.log(`💾 Updated input  : ${path.relative(ROOT_DIR, outPath)}`);
  console.log(`\nNext step:`);
  console.log(`  node scripts/build-story-timeline.mjs --input=${path.relative(ROOT_DIR, outPath)}\n`);
}

main().catch(err => {
  console.error("TTS error:", err.message);
  process.exit(1);
});

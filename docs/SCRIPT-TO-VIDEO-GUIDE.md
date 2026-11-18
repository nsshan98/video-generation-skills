# Script-to-Video Workflow Guide

This guide explains how the **TN Professional Video Editor** takes a raw script or topic from the user and turns it into a fully produced, rendered MP4 video with AI voiceover, animated scene visuals, and kinetic subtitles.

---

## The 5-Step Pipeline

```
1. Script & Beat Breakdown ➔ 2. Voiceover & Audio Probing ➔ 3. AI Scene Visuals & Motion ➔ 4. Timeline Assembly ➔ 5. Remotion Render
```

### Step 1: Script & Beat Breakdown
When the user provides a script or concept:
1. Divide the script into **Scene Beats** (typically 3 to 7 seconds each).
2. For each beat, define:
   - **Narration**: The exact spoken text.
   - **Visual Art Direction**: Detailed prompt for scene illustration or video generation.
   - **Motion Direction**: Camera movement (`zoom-in`, `zoom-out`, `pan-left`, `pan-right`, `drift`).
   - **On-Screen Text**: Core hook or kinetic caption text.

Example Scene Breakdown:
```json
[
  {
    "id": 1,
    "narration": "In the deepest trenches of the ocean, sunlight never reaches.",
    "visualPrompt": "Cinematic deep sea trench, glowing bioluminescent jellyfish, dark abyssal water, volumetric blue lighting, 8k digital art",
    "motion": "zoom-in",
    "caption": "Where sunlight never reaches..."
  },
  {
    "id": 2,
    "narration": "Yet life thrives here in ways that defy human imagination.",
    "visualPrompt": "Strange alien-like deep sea anglerfish with glowing antenna, surrounded by underwater hydrothermal vents, vivid colors, cinematic",
    "motion": "drift",
    "caption": "Life defies all imagination"
  }
]
```

---

### Step 2: Voiceover Generation & Audio Duration Probing
1. Check if the user has provided an API key:
   - `OPENAI_API_KEY`: Generates lifelike speech with models `tts-1` or `tts-1-hd` using voices like `alloy`, `nova`, `onyx`, `fable`.
   - `ELEVENLABS_API_KEY`: Ultra-realistic cloned or custom voices.
   - **No API key provided**: Automatically uses the built-in free TTS fallback.
2. Execute the TTS engine:
   ```bash
   node template/scripts/tts-engine.mjs --batch=scenes.json
   ```
3. The script probes the exact duration of each audio file down to milliseconds with `remotion ffprobe`. This guarantees 100% synchronization between spoken words and visual scene cuts.

---

### Step 3: AI Scene Illustrations to Video Motion
1. **Scene Generation**:
   - Generate scene illustrations using the built-in `image-generator` subagent or user-provided image generator (e.g. Midjourney, DALL-E, Imagen).
   - If user provides video generation API access (Runway, Kling, Luma), video clips can be placed directly.
2. **Transforming Illustrations into Video Motion**:
   - Static images are animated via Remotion's Ken Burns camera engine.
   - Each illustration smoothly zooms, pans, or drifts across the exact duration of its voiceover beat, turning still illustrations into cinematic video shots.
   - Smooth crossfades and cinematic vignette overlays are applied automatically.

---

### Step 4: Kinetic Captions & Audio Mixing
1. Add kinetic captions timed to the voiceover cues:
   - Preset: `"tiktok"` (high-contrast pill with spring pop animation, safe-margin protected).
   - Preset: `"cinema"` (clean uppercase tracking with atmospheric drop shadow).
2. Add optional background music (`bgm`) with lowered volume (`volume: 0.15 - 0.25`) so dialogue remains crystal clear.

---

### Step 5: Final Rendering
Render the finished video using Remotion:
```bash
npm run render -- ./out/final-video.mp4
```
Inspect the output video with `remotion ffprobe` and verify duration, resolution, and audio levels against `docs/QA-CHECKLIST.md`.

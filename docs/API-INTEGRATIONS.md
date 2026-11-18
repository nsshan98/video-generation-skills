# API Integrations Guide

This guide details how to supply API keys and external services to supercharge the video editing pipeline.

---

## 1. Text-to-Speech (Voiceover) APIs

### Cartesia Sonic (High-Emotion & Ultra-Low Latency)
- **Environment Variable**: `CARTESIA_API_KEY`
- **Supported Models**: `sonic-multilingual`, `sonic-3.5`, `sonic-3.6`
- **Native Bengali Support**: Full support for Bengali (`language: "bn"`), including personas like *Rubel* (Male) and *Pooja* (Female).
- **Features**: Highly natural prosody, emotional pacing, realistic breathing pauses.
- **Usage**:
  ```bash
  CARTESIA_API_KEY="your-key" node template/scripts/tts-engine.mjs --provider=cartesia --text="Narration text" --out=public/media/vo.mp3
  ```

### OpenAI Audio TTS
- **Environment Variable**: `OPENAI_API_KEY`
- **Supported Models**: `tts-1`, `tts-1-hd`
- **Voices**: `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`
- **Usage**:
  ```bash
  OPENAI_API_KEY="sk-..." node template/scripts/tts-engine.mjs --provider=openai --voice=nova --text="Narration text" --out=public/media/vo.mp3
  ```

### ElevenLabs TTS
- **Environment Variable**: `ELEVENLABS_API_KEY`
- **Supported Models**: `eleven_multilingual_v2`, `eleven_turbo_v2_5`
- **Voice IDs**: Pass any voice ID from your ElevenLabs library (e.g. `21m00Tcm4TlvDq8ikWAM` for Rachel).
- **Usage**:
  ```bash
  ELEVENLABS_API_KEY="..." node template/scripts/tts-engine.mjs --provider=elevenlabs --voiceId="..." --text="Narration text" --out=public/media/vo.mp3
  ```

### Free Built-in TTS Fallback
- Requires **no credentials or setup**.
- Works immediately out-of-the-box for rapid prototyping.
- **Usage**:
  ```bash
  node template/scripts/tts-engine.mjs --provider=free --text="Narration text" --out=public/media/vo.mp3
  ```

---

## 2. AI Video & Image Generation

### AI Image Generators
- For AI-generated scene illustrations, use prompts following this structure:
  `[Subject], [Environment/Setting], [Lighting], [Composition/Framing], [Art Style & Quality keywords]`
- Recommended aspect ratios:
  - Vertical (Shorts/TikTok/Reels): `9:16` (1080x1920)
  - Horizontal (YouTube): `16:9` (1920x1080)

### External Video Generation APIs (Optional)
If you have API keys for video generation services:
- **Runway Gen-3 Alpha / Gen-2**: Export generated `.mp4` into `template/public/media/` and reference it with `"type": "video"`.
- **Luma Dream Machine**: Export `.mp4` clips into `template/public/media/`.
- **Kling / Hailuo / Pika / Haiper / Replicate**: Place the resulting video clips into `template/public/media/`.

---

## 3. Passing Credentials to the Agent
You can supply credentials by:
1. Passing them directly in your chat prompt (e.g. `OPENAI_API_KEY=sk-...`).
2. Setting them in your local shell environment before launching.
3. Placing them in a local `.env` file in the project directory.

# Remotion Video Engine & Starter

A complete, code-driven video editing and assembly engine powered by [Remotion](https://remotion.dev). It turns scripts, AI illustrations, and voiceover audio into cinematic, animated video with dynamic camera motion, kinetic captions, and sound design.

## Features

- **Kinetic Illustrations to Video (Ken Burns Engine)**: Transforms static AI-generated illustrations into cinematic video clips using motion presets (`zoom-in`, `zoom-out`, `pan-left`, `pan-right`, `drift`) or custom coordinates.
- **Automated Voiceover Integration (TTS)**: Built-in zero-dependency Node.js script supporting OpenAI TTS, ElevenLabs, and instant free fallback TTS with automatic audio duration probing.
- **Modern Kinetic Captions**: TikTok / Reels / Shorts style pop-in high-contrast captions, or clean cinema-style subtitles with safe-area protection.
- **Audio Mixing**: Supports voiceover narration, background music (BGM), and SFX.
- **Local Fast Rendering**: Bundles Chromium headless shell and Remotion's internal FFmpeg/FFprobe for sub-minute MP4 exports.

## Requirements

- Node.js 20 or newer
- npm

## Setup

```sh
npm install
```

## Quick Commands

```sh
# Generate TTS voiceover from text
npm run tts -- --text="Your voiceover text" --out=public/media/vo-1.mp3 --provider=free

# Generate batch voiceover from script JSON
npm run tts -- --batch=path/to/script.json

# Preview interactive video timeline in browser
npm run preview

# Render a still frame check
npm run still -- ./out/frame.png

# Render final MP4 video
npm run render -- ./out/final.mp4
```

## TTS Voiceover Providers

1. **Free Built-in Fallback**:
   ```sh
   npm run tts -- --provider=free --text="Hello world" --out=public/media/vo.mp3
   ```
2. **OpenAI TTS**:
   ```sh
   OPENAI_API_KEY="sk-..." npm run tts -- --provider=openai --voice=alloy --text="Hello world" --out=public/media/vo.mp3
   ```
   Voices: `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`.
3. **ElevenLabs**:
   ```sh
   ELEVENLABS_API_KEY="..." npm run tts -- --provider=elevenlabs --voiceId="..." --text="Hello world" --out=public/media/vo.mp3
   ```

## Timeline Schema (`src/timeline.json`)

```json
{
  "width": 1080,
  "height": 1920,
  "fps": 30,
  "durationInFrames": 300,
  "items": [
    {
      "type": "image",
      "src": "media/scene-1.png",
      "start": 0,
      "duration": 5,
      "fit": "cover",
      "motion": "zoom-in",
      "fadeIn": 0.4,
      "fadeOut": 0.4,
      "vignette": true
    },
    {
      "type": "voiceover",
      "src": "media/vo-1.mp3",
      "start": 0,
      "duration": 5,
      "volume": 1.0
    },
    {
      "type": "caption",
      "text": "Your dynamic subtitle text here",
      "start": 0.2,
      "duration": 4.6,
      "preset": "tiktok",
      "fontSize": 54
    }
  ]
}
```

### Motion Presets for Images:
- `"zoom-in"`: Slow dramatic zoom into the scene focal point.
- `"zoom-out"`: Revealing zoom out from focal point.
- `"pan-left"`: Horizontal tracking shot moving left.
- `"pan-right"`: Horizontal tracking shot moving right.
- `"drift"`: Subtle cinematic diagonal floating motion.
- `"static"`: No motion.

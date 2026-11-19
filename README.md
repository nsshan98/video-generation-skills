# Universal Dual-Engine Video Director & Generator (v4.0)

A production-grade, automated dual-engine video generation skill for AI agents using [Remotion](https://remotion.dev). Houses **two specialized production engines** inside a single, unified repository:

1. **Mode 1: Character Storytelling & Drama Engine** (`story` / `cartoon` / `drama`)
2. **Mode 2: Kinetic Motion Graphics & Promo Engine** (`promo` / `commercial` / `kinetic`)

---

## Two Engines, One Skill

```
                                  ┌────────────────────────┐
                                  │  User Script or Audio  │
                                  └───────────┬────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      ▼                                               ▼
         [ Mode 1: Character Story ]                     [ Mode 2: Kinetic Promo ]
      - Procedural 2D Flat Characters                 - 2D Flat Kinetic Motion Graphics
      - Dialog & Thought Callout Bubbles              - Persistent Brand Header & Watermark
      - 100% Full-Screen Rooms & Poses                - Dot-Grid Floating Canvas
      - Selective Subtitles (Zero Duplicate)          - Dark Bottom Caption Pill + Neon Green
      - Psychological & Life Narratives               - Script-Driven Bespoke Vector Assets
```

### Modes & Triggers

| Engine Mode | When to Use / Triggers | Visual Components | Subtitle Style |
| :--- | :--- | :--- | :--- |
| **Mode 1: Character Storytelling** | `story`, `cartoon`, `drama`, `character`, `golpo`, `গল্প`, `কার্টুন` | Procedural 2D flat cartoon characters, room backgrounds (office, bedroom, living room), speech/thought bubbles, facial expressions, stepped lip sync. | Selective subtitle pill (automatically hides when speech bubbles or keyword cards appear). |
| **Mode 2: Kinetic Promo & Commercial** | `promo`, `commercial`, `ad`, `saas`, `kinetic`, `explainer`, `বিজ্ঞাপন`, `প্রমো` | Subtle dot-grid floating canvas, persistent brand header, corner watermark, phone mockups, card mechanics, bespoke script vector assets. | Dark bottom pill (`rgba(0,0,0,0.85)`) with neon green (`#27D050`) highlight words. |

---

## Clean Architecture (agentskills.io Specification)

```
video-generation-skills/
├── SKILL.md                          # The Agent Skill definition (loaded by AI agents)
├── README.md                         # Quick reference & manual commands (for humans)
├── scripts/                          # Reusable automation tools (SRT parser, TTS, build)
├── references/                       # Progressive disclosure reference manuals
└── template/                         # Remotion React workspace
    ├── package.json
    └── src/
        ├── Root.tsx                  # Google Fonts (Hind Siliguri) & Auto-detect Compositions
        ├── Video.tsx                 # Universal renderer (Series-based Promo & Track-based Story)
        ├── timelineTypes.ts          # Strongly-typed schema
        ├── timeline.json             # Active project timeline
        └── components/
            ├── characters/           # Procedural flat characters & outfits
            ├── scenes/               # Mode 1 story & infographic scenes
            └── promo/                # Mode 2 kinetic promo engine & dynamic scenes
```

---

## Two-Point Approval Milestones

1. **Milestone 1 (Scene Plan Approval)**: The AI director presents a scene-by-scene plan and metaphor table before writing any code. The user must approve ("yes" / "go") to proceed.
2. **Milestone 2.5 (Mandatory Pre-Release Self-Check)**: The AI automatically renders still frames (`npx remotion still ...`) and inspects the images to verify layout, contrast, and typography before showing the user.
3. **Milestone 2 (User Preview & Render Approval)**: The user inspects the preview stills and gives explicit permission before the final video renders.
4. **Desktop & Downloads Auto-Placement**: Rendered MP4 files are automatically copied to `~/Downloads` and `~/Desktop` for immediate viewing.

---

## Installation & Global Setup

Install directly using the official [skills.sh](https://skills.sh) CLI:

```bash
# 1. Install globally from GitHub across any agent (Antigravity, Claude Code, Cursor, Copilot)
npx skills add nsshan98/video-generation-skills -g

# 2. Or install locally from your current machine
npx skills add . -g
```

Alternatively, link via manual symlink:
```bash
mkdir -p ~/.agents/skills
ln -sfn $(pwd) ~/.agents/skills/video-generation-skills
```

---

## Audio & Voiceover Decision Flow (3-Tier Priority)

1. **Priority 1 (User Audio):** If user provides `voice.mp3` or their own recorded audio (+ optional SRT), sync directly with the timeline.
2. **Priority 2 (User API Key):** If no audio is provided, ask the user if they have an API key (`ElevenLabs`, `Gemini`, `Cartesia`, `OpenAI`). Synthesize high-quality narration using their preferred provider.
3. **Priority 3 (Default Fallback):** If neither audio nor API key is available, generate narration automatically using the built-in free TTS engine (`node scripts/tts-engine.mjs`) to render the full video without blocking.

---

## Quick Start Commands

```bash
cd template
npm install

# 1. Preview in Remotion Studio
npx remotion studio

# 2. Render still check frame (for self-inspection)
npx remotion still src/index.ts Main out/check1.png --frame 100

# 3. Render final video (after user approval)
npx remotion render src/index.ts Main ./out/final.mp4
```

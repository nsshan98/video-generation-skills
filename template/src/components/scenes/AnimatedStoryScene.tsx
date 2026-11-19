import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  PushpinNote,
  AngledSticker,
  TopHookCard,
  SubtitlePill,
  SpeechCalloutBubble,
  AnimatedIconOverlay,
  ContextIconType,
  MarkerHighlight,
  TornPaperCard,
} from "../overlays";
import {
  AnimatedCursor,
  CountUpNumber,
  ParticleBurst,
} from "../interactive";
import { DynamicCharacter } from "../characters/DynamicCharacter";
import { SceneBackground } from "./SceneBackground";
import { ScenePropRenderer } from "./ScenePropRenderer";
import {
  AnimatedSceneConfig,
  BackgroundTheme,
  HookCardConfig,
  MetaphorConfig,
  PinNoteConfig,
  ScenePropConfig,
  StickerConfig,
} from "./sceneTypes";
import { CharacterPose } from "../characters/characterPresets";

export interface AnimatedStorySceneProps {
  sceneIndex: number;
  subtitle: string;
  narration?: string;
  words?: Array<{ word: string; start: number; end: number }>;
  durationInFrames?: number;
  highlightWords?: string[];
  character?: string;
  characterPose?: CharacterPose;
  characterPoses?: Array<{
    pose: CharacterPose;
    start?: number;
    duration?: number;
    startFrame?: number;
    durationFrames?: number;
  }>;
  characterPosition?: "center" | "left" | "right";
  secondaryCharacter?: string;
  secondaryPose?: CharacterPose;
  secondaryPoses?: Array<{
    pose: CharacterPose;
    start?: number;
    duration?: number;
    startFrame?: number;
    durationFrames?: number;
  }>;
  secondaryPosition?: "center" | "left" | "right";
  tertiaryCharacter?: string;
  tertiaryPose?: CharacterPose;
  tertiaryPoses?: Array<{
    pose: CharacterPose;
    start?: number;
    duration?: number;
    startFrame?: number;
    durationFrames?: number;
  }>;
  tertiaryPosition?: "center" | "left" | "right";
  crowd?: "shoppers" | "office_team" | "village_crowd" | "classroom_students" | "none";
  backgroundTheme?: BackgroundTheme;
  pinNote?: PinNoteConfig;
  sticker?: StickerConfig;
  prop?: ScenePropConfig;
  hookCard?: HookCardConfig;
  metaphor?: MetaphorConfig;
  rackFocus?: boolean;
  // Dynamic Speech Callouts & Animated Icons
  speechBubble?: {
    text: string;
    speakerPosition?: "left" | "right" | "center";
    type?: "speech" | "thought" | "shout";
    top?: number;
    highlightText?: string;
    speakerName?: string;
    start?: number;
    duration?: number;
    startFrame?: number;
    durationFrames?: number;
  };
  speechBubbles?: Array<{
    text: string;
    speakerPosition?: "left" | "right" | "center";
    type?: "speech" | "thought" | "shout";
    top?: number;
    highlightText?: string;
    speakerName?: string;
    start?: number;
    duration?: number;
    startFrame?: number;
    durationFrames?: number;
  }>;
  contextIcon?: {
    icon: ContextIconType;
    position?: { x: number; y: number };
    size?: number;
    animation?: "pop" | "float" | "pulse";
    label?: string;
  };
  screenShake?: boolean;
  interactiveCursor?: any;
  countUp?: any;
  particleBurst?: any;
  markerHighlight?: any;
  tornPaperCard?: any;
  oneTakeTransition?: any;
  cameraAngle?: any;
  parallax?: boolean;
}

export const AnimatedStoryScene: React.FC<AnimatedStorySceneProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Resolve Active Dialogue Bubble for this exact frame:
  // When multiple dialogue lines or timed bubbles exist, pick the one matching the current frame.
  const allBubbles =
    props.speechBubbles && props.speechBubbles.length > 0
      ? props.speechBubbles
      : props.speechBubble
        ? [props.speechBubble]
        : [];

  let activeBubble: any = null;
  let bubbleLocalFrame = 0;

  for (const b of allBubbles) {
    const bStart =
      b.startFrame ??
      (b.start !== undefined ? Math.round(b.start * fps) : 0);
    const bDuration =
      b.durationFrames ??
      (b.duration !== undefined
        ? Math.round(b.duration * fps)
        : (props.durationInFrames ?? 999999));

    if (frame >= bStart && frame < bStart + bDuration) {
      activeBubble = b;
      bubbleLocalFrame = frame - bStart;
      break;
    }
  }

  // 1.1 At-A-Glance Timed Pose Resolution (Micro-Action Beats):
  // Action props (checking_khata, searching_inventory, holding_shirt) MUST be temporary beats!
  // They should appear for their specific dialogue/narration window, NEVER frozen for an entire 15s scene!
  let activePrimaryPose: CharacterPose = props.characterPose || "standing";
  if (props.characterPoses && props.characterPoses.length > 0) {
    let matched = false;
    for (const p of props.characterPoses) {
      const pStart = p.startFrame ?? (p.start !== undefined ? Math.round(p.start * fps) : 0);
      const pDuration = p.durationFrames ?? (p.duration !== undefined ? Math.round(p.duration * fps) : 99999);
      if (frame >= pStart && frame < pStart + pDuration) {
        activePrimaryPose = p.pose;
        matched = true;
        break;
      }
    }
    if (!matched) {
      activePrimaryPose = props.characterPose || "standing";
    }
  } else if (
    props.characterPose === "searching_inventory" ||
    props.characterPose === "holding_shirt" ||
    props.characterPose === "checking_khata"
  ) {
    // Failsafe auto-timeout: if no keyframes given, action pose expires after 3.0 seconds (~90 frames)
    if (frame > Math.round(fps * 3.0)) {
      activePrimaryPose = "standing";
    }
  }

  let activeSecondaryPose: CharacterPose = props.secondaryPose || "standing";
  if (props.secondaryPoses && props.secondaryPoses.length > 0) {
    let matched = false;
    for (const p of props.secondaryPoses) {
      const pStart = p.startFrame ?? (p.start !== undefined ? Math.round(p.start * fps) : 0);
      const pDuration = p.durationFrames ?? (p.duration !== undefined ? Math.round(p.duration * fps) : 99999);
      if (frame >= pStart && frame < pStart + pDuration) {
        activeSecondaryPose = p.pose;
        matched = true;
        break;
      }
    }
    if (!matched) {
      activeSecondaryPose = props.secondaryPose || "standing";
    }
  } else if (
    props.secondaryPose === "searching_inventory" ||
    props.secondaryPose === "holding_shirt"
  ) {
    // Failsafe auto-timeout: if no keyframes given, action pose expires after 3.0 seconds (~90 frames)
    if (frame > Math.round(fps * 3.0)) {
      activeSecondaryPose = "concerned";
    }
  }

  let activeTertiaryPose: CharacterPose = props.tertiaryPose || "standing";
  if (props.tertiaryPoses && props.tertiaryPoses.length > 0) {
    let matched = false;
    for (const p of props.tertiaryPoses) {
      const pStart = p.startFrame ?? (p.start !== undefined ? Math.round(p.start * fps) : 0);
      const pDuration = p.durationFrames ?? (p.duration !== undefined ? Math.round(p.duration * fps) : 99999);
      if (frame >= pStart && frame < pStart + pDuration) {
        activeTertiaryPose = p.pose;
        matched = true;
        break;
      }
    }
    if (!matched) {
      activeTertiaryPose = props.tertiaryPose || "standing";
    }
  }

  // Dynamic camera: slow continuous cinematic zoom-in across the full scene duration
  const totalFrames = props.durationInFrames || 300;
  const baseCameraZoom = interpolate(frame, [0, totalFrames], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Dynamic camera punch on active dialogue
  const punchZoom = activeBubble ? 1.05 : 1.0;
  let cameraScale = baseCameraZoom * punchZoom;

  // One-Take Continuous Zoom Transition (feitangyuan/onetake)
  let oneTakeX = 0;
  let oneTakeY = 0;
  if (props.oneTakeTransition?.enabled) {
    const otFrames = props.oneTakeTransition.durationFrames ?? 16;
    if (frame > totalFrames - otFrames) {
      const otProgress = interpolate(frame, [totalFrames - otFrames, totalFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const zoomTarget = props.oneTakeTransition.zoomLevel ?? 1.85;
      cameraScale = cameraScale * (1.0 + (zoomTarget - 1.0) * Math.pow(otProgress, 2));
      if (props.oneTakeTransition.target === "phone") {
        oneTakeX = -100 * otProgress;
        oneTakeY = -180 * otProgress;
      }
    }
  }

  // Shotcraft Camera Angles (Dutch Tilt & Dynamic Angles - kingselyjoe/video-shotcraft-dsh)
  let cameraRotation = 0;
  let cameraAngleOffsetY = 0;
  if (props.cameraAngle === "dutch_left") {
    cameraRotation = interpolate(frame, [0, 15], [0, -4.5], { extrapolateRight: "clamp" });
  } else if (props.cameraAngle === "dutch_right") {
    cameraRotation = interpolate(frame, [0, 15], [0, 4.5], { extrapolateRight: "clamp" });
  } else if (props.cameraAngle === "low_hero") {
    cameraAngleOffsetY = 24;
  } else if (props.cameraAngle === "high_tension") {
    cameraScale = cameraScale * 1.06;
    cameraRotation = Math.sin(frame * 0.25) * 0.8;
  }

  // 2.5D Multi-Plane Parallax Camera Drift (sanskarprajapati/parallax-doc)
  const isParallax = props.parallax ?? true;
  const parallaxDrift = isParallax
    ? interpolate(frame, [0, totalFrames], [-18, 18], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Emotional screen shake (shock / impact) - STRICT 1.0 to 1.2 seconds maximum (30-36 frames)!
  // Never shake continuously across an entire 10-15s scene (causes extreme viewer fatigue).
  const hasShakeTrigger = Boolean(props.screenShake);

  // Decays smoothly from 1.0 down to 0.0 over at most 36 frames (~1.2s at 30fps)
  const maxShakeFrames = Math.min(Math.round(fps * 1.2), 36);
  const shakeIntensity =
    hasShakeTrigger && frame < maxShakeFrames
      ? Math.max(0, 1 - frame / maxShakeFrames)
      : 0;

  const shakeX = shakeIntensity > 0 ? Math.sin(frame * 3.0) * 5 * shakeIntensity : 0;
  const shakeY = shakeIntensity > 0 ? Math.cos(frame * 3.6) * 3 * shakeIntensity : 0;

  // Selective Caption Rule:
  // When a callout bubble or primary full-screen center card is active, do NOT show duplicate bottom captions.
  const hasCallout = Boolean(activeBubble || props.prop?.type === "dialogue");
  const hasActiveCard = Boolean(
    props.prop &&
      ["comparison_table", "tiered_benefit", "price_board", "book", "chart"].includes(
        props.prop.type
      )
  );
  const captionText = (props.narration || props.subtitle || "").trim();
  const showBottomCaption =
    !hasCallout && !hasActiveCard && captionText.length > 0;

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#0f172a" }}>
      {/* 1. Camera wrapper for environment & characters (Full Screen Edge-to-Edge) */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${cameraScale}) rotate(${cameraRotation}deg) translate(${shakeX + oneTakeX + parallaxDrift}px, ${shakeY + oneTakeY + cameraAngleOffsetY}px)`,
          transformOrigin: "center center",
          position: "relative",
        }}
      >
        {props.backgroundTheme
          ? renderDynamicScene(props, frame, fps, activeBubble, activePrimaryPose, activeSecondaryPose, activeTertiaryPose)
          : renderPresetScene(props, frame, fps)}
      </div>

      {/* 2. Floating Speech Callout Bubble (Zero Duplicate Card Rule) */}
      {activeBubble && (
        <SpeechCalloutBubble
          text={activeBubble.text}
          speakerPosition={
            activeBubble.speakerPosition ||
            props.characterPosition ||
            (props.secondaryCharacter ? "left" : "center")
          }
          type={activeBubble.type}
          top={activeBubble.top}
          highlightText={activeBubble.highlightText}
          speakerName={activeBubble.speakerName}
          frame={bubbleLocalFrame}
        />
      )}

      {/* 3. Contextual Animated Icons (Money, clock, food, bulb, alert etc.) */}
      {props.contextIcon && (
        <AnimatedIconOverlay
          icon={props.contextIcon.icon}
          position={props.contextIcon.position}
          size={props.contextIcon.size}
          animation={props.contextIcon.animation}
          label={props.contextIcon.label}
        />
      )}

      {/* 4. Screen-Space Motion Graphics (Only when no conflicting callout) */}
      {props.hookCard && !activeBubble && (
        <TopHookCard
          line1={props.hookCard.line1}
          line2={props.hookCard.line2}
          text={props.hookCard.text}
          subtext={props.hookCard.subtext}
          badge={props.hookCard.badge}
          delayFrames={props.hookCard.delayFrames ?? (props.hookCard.start !== undefined ? Math.round(props.hookCard.start * 30) : 0)}
          durationFrames={props.hookCard.durationFrames ?? (props.hookCard.duration ? Math.round(props.hookCard.duration * 30) : 135)}
        />
      )}

      {/* Avoid clutter: Never render PinNote if active speech bubble is open right now */}
      {props.pinNote &&
        !activeBubble &&
        props.prop?.type !== "comparison_table" &&
        props.prop?.type !== "tiered_benefit" &&
        props.prop?.type !== "price_board" &&
        props.prop?.type !== "smartphone" &&
        props.prop?.type !== "video_call" && (
          <PushpinNote
            category={props.pinNote.category}
            headline={props.pinNote.headline}
            subtext={props.pinNote.subtext}
            top={140}
            left={props.pinNote.position === "top-right" ? undefined : 60}
            right={props.pinNote.position === "top-right" ? 60 : undefined}
            delayFrames={props.pinNote.delayFrames ?? (props.pinNote.start !== undefined ? Math.round(props.pinNote.start * 30) : 0)}
            durationFrames={props.pinNote.durationFrames ?? (props.pinNote.duration ? Math.round(props.pinNote.duration * 30) : 135)}
          />
        )}

      {props.sticker && !activeBubble && (
        <AngledSticker
          text={props.sticker.text}
          bottom={props.sticker.bottom ?? 440}
          angle={props.sticker.angle ?? -3}
          delayFrames={props.sticker.delayFrames ?? (props.sticker.start !== undefined ? Math.round(props.sticker.start * 30) : 8)}
          durationFrames={props.sticker.durationFrames ?? (props.sticker.duration ? Math.round(props.sticker.duration * 30) : 120)}
        />
      )}

      {/* Vox-Style Torn Paper Card */}
      {props.tornPaperCard && !activeBubble && (
        <TornPaperCard config={props.tornPaperCard} />
      )}

      {/* Vox-Style Marker Highlight */}
      {props.markerHighlight && (
        <MarkerHighlight config={props.markerHighlight} />
      )}

      {/* UI Micro-Interactions: Live Number Ticker & Animated Mouse Cursor */}
      {props.countUp && (
        <CountUpNumber config={props.countUp} />
      )}

      {props.interactiveCursor && (
        <AnimatedCursor config={props.interactiveCursor} />
      )}

      {/* Dynamic Particle Burst (Confetti / Cash Rain / Sparkles) */}
      {props.particleBurst && (
        <ParticleBurst config={props.particleBurst} />
      )}

      {/* 5. Selective Bottom Subtitle: Only shown when no Callout Bubble or Center Card is active */}
      {showBottomCaption && (
        <SubtitlePill
          sceneIndex={props.sceneIndex}
          text={captionText}
          words={props.words}
          highlightWords={props.highlightWords ?? []}
          bottom={75}
          durationInFrames={props.durationInFrames ?? 240}
        />
      )}
    </AbsoluteFill>
  );
};

function renderCrowdLayer(crowd?: string) {
  if (!crowd || crowd === "none") return null;

  switch (crowd) {
    case "shoppers":
      return (
        <div
          style={{
            position: "absolute",
            bottom: 250,
            width: "100%",
            zIndex: 12,
            opacity: 0.85,
            filter: "blur(2px)",
            pointerEvents: "none",
          }}
        >
          {/* Background Shopper 1 (browsing left) */}
          <div style={{ position: "absolute", left: 100, bottom: 0 }}>
            <DynamicCharacter character="customer" pose="standing" scale={1.15} flip={false} isSpeaking={false} />
          </div>
          {/* Background Shopper 2 (browsing right) */}
          <div style={{ position: "absolute", right: 120, bottom: 0 }}>
            <DynamicCharacter character="employee" pose="standing" scale={1.15} flip={true} isSpeaking={false} />
          </div>
        </div>
      );

    case "office_team":
      return (
        <div
          style={{
            position: "absolute",
            bottom: 260,
            width: "100%",
            zIndex: 12,
            opacity: 0.82,
            filter: "blur(2px)",
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "absolute", left: 90, bottom: 0 }}>
            <DynamicCharacter character="sumon" pose="thinking" scale={1.12} flip={false} isSpeaking={false} />
          </div>
          <div style={{ position: "absolute", right: 100, bottom: 0 }}>
            <DynamicCharacter character="rafi" pose="standing" scale={1.12} flip={true} isSpeaking={false} />
          </div>
        </div>
      );

    case "village_crowd":
      return (
        <div
          style={{
            position: "absolute",
            bottom: 240,
            width: "100%",
            zIndex: 12,
            opacity: 0.85,
            filter: "blur(2px)",
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "absolute", left: 70, bottom: 0 }}>
            <DynamicCharacter character="father" pose="standing" scale={1.1} flip={false} isSpeaking={false} />
          </div>
          <div style={{ position: "absolute", left: "48%", transform: "translateX(-50%)", bottom: 0 }}>
            <DynamicCharacter character="villager" pose="standing" scale={1.08} flip={false} isSpeaking={false} />
          </div>
          <div style={{ position: "absolute", right: 80, bottom: 0 }}>
            <DynamicCharacter character="matobbor" pose="thinking" scale={1.1} flip={true} isSpeaking={false} />
          </div>
        </div>
      );

    case "classroom_students":
      return (
        <div
          style={{
            position: "absolute",
            bottom: 250,
            width: "100%",
            zIndex: 12,
            opacity: 0.85,
            filter: "blur(2px)",
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "absolute", left: 110, bottom: 0 }}>
            <DynamicCharacter character="student_boy" pose="standing" scale={1.1} flip={false} isSpeaking={false} />
          </div>
          <div style={{ position: "absolute", right: 110, bottom: 0 }}>
            <DynamicCharacter character="student_girl" pose="standing" scale={1.1} flip={true} isSpeaking={false} />
          </div>
        </div>
      );

    default:
      // Generic subtle crowd layer for any custom crowd name
      return (
        <div
          style={{
            position: "absolute",
            bottom: 250,
            width: "100%",
            zIndex: 12,
            opacity: 0.75,
            filter: "blur(2.5px)",
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "absolute", left: 90, bottom: 0 }}>
            <DynamicCharacter character="villager" pose="standing" scale={1.1} flip={false} isSpeaking={false} />
          </div>
          <div style={{ position: "absolute", right: 90, bottom: 0 }}>
            <DynamicCharacter character="friend" pose="standing" scale={1.1} flip={true} isSpeaking={false} />
          </div>
        </div>
      );
  }
}

/**
 * Fully Dynamic & Data-Driven Scene Renderer:
 * Changes backgrounds, props, character positions, and stickers dynamically
 * based on whatever story/script is passed!
 */
function renderDynamicScene(
  props: AnimatedStorySceneProps,
  frame: number,
  fps: number,
  activeBubble?: any,
  activePrimaryPose: CharacterPose = "standing",
  activeSecondaryPose: CharacterPose = "standing",
  activeTertiaryPose: CharacterPose = "standing"
) {
  const {
    character = "nabil",
    characterPosition = props.secondaryCharacter
      ? props.tertiaryCharacter
        ? "right"
        : "right"
      : "center",
    secondaryCharacter,
    secondaryPosition = "left",
    tertiaryCharacter,
    tertiaryPosition = "center",
    crowd,
    backgroundTheme = "corporate_office",
    pinNote,
    sticker,
    prop,
  } = props;

  // Speaker Resolution:
  // ONLY when a dialogue bubble is actively playing at this frame does someone speak!
  // When Narrator is speaking (activeBubble is null), ALL characters' mouths stay closed in a clean resting line!
  let isPrimarySpeaking = false;
  let isSecondarySpeaking = false;
  let isTertiarySpeaking = false;

  if (activeBubble) {
    const bubblePos = activeBubble.speakerPosition || "left";
    const charName = String(character).toLowerCase();
    const secName = String(secondaryCharacter || "").toLowerCase();
    const tertName = String(tertiaryCharacter || "").toLowerCase();
    const spkName = (activeBubble.speakerName || "").toLowerCase();

    // Priority 1: Semantic Speaker Name Matching
    if (spkName) {
      if (
        spkName.includes(charName) ||
        (charName.includes("rashed") && spkName.includes("রাশেদ")) ||
        (charName.includes("jamal") && spkName.includes("জামাল")) ||
        (charName.includes("rafi") && spkName.includes("রাফি")) ||
        (charName.includes("nabil") && spkName.includes("নাবিল")) ||
        (charName.includes("hasan") && spkName.includes("হাসান"))
      ) {
        isPrimarySpeaking = true;
      } else if (
        secName &&
        (spkName.includes(secName) ||
          (secName.includes("employee") && (spkName.includes("কর্মচারী") || spkName.includes("সেলসম্যান"))) ||
          (secName.includes("customer") && spkName.includes("কাস্টমার")) ||
          (secName.includes("father") && spkName.includes("বাবা")) ||
          (secName.includes("friend") && spkName.includes("বন্ধু")) ||
          (secName.includes("boss") && spkName.includes("বস")))
      ) {
        isSecondarySpeaking = true;
      } else if (
        tertName &&
        (spkName.includes(tertName) ||
          (tertName.includes("customer") && spkName.includes("কাস্টমার")) ||
          (tertName.includes("employee") && (spkName.includes("কর্মচারী") || spkName.includes("সেলসম্যান"))) ||
          (tertName.includes("friend") && spkName.includes("বন্ধু")))
      ) {
        isTertiarySpeaking = true;
      }
    }

    // Priority 2: Fallback to speakerPosition matching
    if (!isPrimarySpeaking && !isSecondarySpeaking && !isTertiarySpeaking) {
      if (bubblePos === characterPosition) {
        isPrimarySpeaking = true;
      } else if (bubblePos === secondaryPosition) {
        isSecondarySpeaking = true;
      } else if (bubblePos === tertiaryPosition) {
        isTertiarySpeaking = true;
      } else if (bubblePos === "right") {
        isPrimarySpeaking = true;
      } else if (bubblePos === "center" && tertiaryCharacter) {
        isTertiarySpeaking = true;
      } else {
        isSecondarySpeaking = true;
      }
    }
  } else {
    // Narrator is speaking or quiet scene: all characters' mouths remain closed!
    isPrimarySpeaking = false;
    isSecondarySpeaking = false;
    isTertiarySpeaking = false;
  }

  return (
    <>
      {/* 1. Dynamic Background Theme */}
      <SceneBackground theme={backgroundTheme} />

      {/* 2. Crowd Background Depth Layer (Depth of field behind characters) */}
      {renderCrowdLayer(crowd)}

      {/* 3. Dynamic Scene Props (Books, Charts, Scales, Shields, Dialogue Bubbles, Questions) */}
      <ScenePropRenderer prop={prop} frame={frame} />

      {/* 4. Characters Staging: 3 Characters, 2 Characters, or 1 Character */}
      {secondaryCharacter && tertiaryCharacter ? (
        /* 3-Character Staging (Scale 1.55 to fit 9:16 vertical canvas) */
        <>
          {/* Secondary Character (Left) */}
          <div
            style={{
              position: "absolute",
              bottom:
                prop?.type === "dining_table" ||
                prop?.type === "courtroom_desk" ||
                prop?.type === "tea_stall_bench"
                  ? 195
                  : 160,
              left: secondaryPosition === "left" ? 20 : undefined,
              right: secondaryPosition === "right" ? 20 : undefined,
              zIndex: 18,
            }}
          >
            <DynamicCharacter
              character={secondaryCharacter}
              pose={activeSecondaryPose}
              scale={1.55}
              flip={secondaryPosition === "right"}
              isSpeaking={isSecondarySpeaking}
              isSeated={
                prop?.type === "dining_table" ||
                prop?.type === "courtroom_desk" ||
                prop?.type === "tea_stall_bench"
              }
            />
          </div>

          {/* Tertiary Character (Center) */}
          <div
            style={{
              position: "absolute",
              bottom:
                prop?.type === "dining_table" ||
                prop?.type === "courtroom_desk" ||
                prop?.type === "tea_stall_bench"
                  ? 195
                  : 160,
              left: tertiaryPosition === "left" ? 20 : tertiaryPosition === "right" ? undefined : "50%",
              right: tertiaryPosition === "right" ? 20 : undefined,
              transform: tertiaryPosition === "center" ? "translateX(-50%)" : undefined,
              zIndex: 17,
            }}
          >
            <DynamicCharacter
              character={tertiaryCharacter}
              pose={activeTertiaryPose}
              scale={1.55}
              flip={tertiaryPosition === "right"}
              isSpeaking={isTertiarySpeaking}
              isSeated={
                prop?.type === "dining_table" ||
                prop?.type === "courtroom_desk" ||
                prop?.type === "tea_stall_bench"
              }
            />
          </div>

          {/* Main Protagonist Character (Right) */}
          <div
            style={{
              position: "absolute",
              bottom:
                prop?.type === "dining_table" ||
                prop?.type === "courtroom_desk" ||
                prop?.type === "tea_stall_bench"
                  ? 195
                  : 160,
              left: characterPosition === "left" ? 20 : undefined,
              right: characterPosition === "right" ? 20 : undefined,
              zIndex: 18,
            }}
          >
            <DynamicCharacter
              character={character}
              pose={activePrimaryPose}
              scale={1.55}
              flip={characterPosition === "right"}
              metaphor={props.metaphor?.type}
              rackFocus={props.rackFocus}
              isSpeaking={isPrimarySpeaking}
              isSeated={
                prop?.type === "dining_table" ||
                prop?.type === "courtroom_desk" ||
                prop?.type === "tea_stall_bench"
              }
            />
          </div>
        </>
      ) : secondaryCharacter ? (
        /* 2-Character Staging (Scale 1.75) */
        <>
          {/* Secondary Character (e.g. Mentor / Father / Boss / Customer / Employee) */}
          <div
            style={{
              position: "absolute",
              bottom:
                prop?.type === "dining_table" ||
                prop?.type === "courtroom_desk" ||
                prop?.type === "tea_stall_bench"
                  ? 195
                  : 160,
              left: secondaryPosition === "left" ? 80 : undefined,
              right: secondaryPosition === "right" ? 80 : undefined,
              zIndex: 18,
            }}
          >
            <DynamicCharacter
              character={secondaryCharacter}
              pose={activeSecondaryPose}
              scale={1.75}
              flip={secondaryPosition === "right"}
              isSpeaking={isSecondarySpeaking}
              isSeated={
                prop?.type === "dining_table" ||
                prop?.type === "courtroom_desk" ||
                prop?.type === "tea_stall_bench"
              }
            />
          </div>

          {/* Main Protagonist Character */}
          <div
            style={{
              position: "absolute",
              bottom:
                prop?.type === "dining_table" ||
                prop?.type === "courtroom_desk" ||
                prop?.type === "tea_stall_bench"
                  ? 195
                  : 160,
              left: characterPosition === "left" ? 80 : undefined,
              right: characterPosition === "right" ? 80 : undefined,
              zIndex: 18,
            }}
          >
            <DynamicCharacter
              character={character}
              pose={activePrimaryPose}
              scale={1.75}
              flip={characterPosition === "right"}
              metaphor={props.metaphor?.type}
              rackFocus={props.rackFocus}
              isSpeaking={isPrimarySpeaking}
              isSeated={
                prop?.type === "dining_table" ||
                prop?.type === "courtroom_desk" ||
                prop?.type === "tea_stall_bench"
              }
            />
          </div>
        </>
      ) : character && character !== "none" ? (
        /* Single Main Character */
        <div
          style={{
            position: "absolute",
            bottom:
              prop?.type === "software_mockup"
                ? 30
                : prop?.type === "office_desk_computer" ||
              prop?.type === "executive_desk" ||
              prop?.type === "ceo_office_desk" ||
              prop?.type === "courtroom_desk" ||
              prop?.type === "cash_counter" ||
              prop?.type === "dining_table"
                ? 195
                : prop?.type === "tea_stall_bench" || activePrimaryPose === "sitting_stool"
                  ? 140
                  : prop?.type === "comparison_table" ||
                    prop?.type === "tiered_benefit" ||
                    prop?.type === "smartphone" ||
                    prop?.type === "video_call"
                    ? 120
                    : 160,
            left:
              prop?.type === "software_mockup"
                ? undefined
                : characterPosition === "left"
                ? 80
                : characterPosition === "right"
                  ? undefined
                  : "50%",
            right:
              prop?.type === "software_mockup"
                ? 30
                : characterPosition === "right" ? 80 : undefined,
            transform:
              prop?.type === "software_mockup"
                ? "none"
                : characterPosition === "center" ? "translateX(-50%)" : undefined,
            zIndex: prop?.type === "software_mockup" ? 40 : 18,
          }}
        >
          <DynamicCharacter
            character={character}
            pose={activePrimaryPose}
            scale={
              prop?.type === "software_mockup"
                ? 1.12
                : prop?.type === "office_desk_computer" ||
              prop?.type === "executive_desk" ||
              prop?.type === "ceo_office_desk" ||
              prop?.type === "dining_table"
                ? 1.75
                : prop?.type === "comparison_table" ||
                  prop?.type === "tiered_benefit" ||
                  prop?.type === "smartphone" ||
                  prop?.type === "video_call"
                  ? 1.45
                  : 1.85
            }
            flip={characterPosition === "right"}
            metaphor={props.metaphor?.type}
            rackFocus={props.rackFocus}
            isSpeaking={isPrimarySpeaking}
            isSeated={
              prop?.type === "office_desk_computer" ||
              prop?.type === "executive_desk" ||
              prop?.type === "ceo_office_desk" ||
              prop?.type === "courtroom_desk" ||
              prop?.type === "cash_counter" ||
              prop?.type === "dining_table"
            }
          />
        </div>
      ) : null}
    </>
  );
}

/**
 * Fallback preset renderer for backward compatibility (Nabil Law 46 / Rafi Law 1)
 */
function renderPresetScene(
  props: AnimatedStorySceneProps,
  frame: number,
  fps: number
) {
  const { sceneIndex, character = "nabil", secondaryCharacter = "father" } = props;

  switch (sceneIndex) {
    case 1:
      return renderDynamicScene(
        {
          ...props,
          backgroundTheme: "village_sunset",
          character,
          characterPose: "sad",
          characterPosition: "center",
          pinNote: {
            category: "সামাজিক মনস্তত্ত্ব",
            headline: "হিংসার শুরু!",
            subtext: "অর্জনের চেয়ে ভুলের খোঁজে",
            position: "top-left",
          },
          sticker: { text: "ভুল খোঁজার রাজনীতি!", angle: -5 },
        },
        frame,
        fps
      );

    case 2:
      return renderDynamicScene(
        {
          ...props,
          backgroundTheme: "home_study",
          character,
          characterPose: "thinking",
          characterPosition: "center",
          pinNote: {
            category: "জীবনের গল্প",
            headline: "বড় স্বপ্ন",
            subtext: "সাধারণ থেকে অসাধারণ যাত্রা",
            position: "top-right",
          },
          sticker: { text: "কঠিন পরিশ্রম!", angle: 4 },
        },
        frame,
        fps
      );

    case 3:
      return renderDynamicScene(
        {
          ...props,
          backgroundTheme: "corporate_office",
          character,
          characterPose: "presenting",
          characterPosition: "center",
          prop: {
            type: "chart",
            chartTitle: "BUSINESS GROWTH ★★★",
            chartDirection: "up",
            chartMetric: "REVENUE 10X 🚀",
          },
          pinNote: {
            category: "ব্যবসায় সাফল্য",
            headline: "বিশাল ব্যবসা",
            subtext: "কয়েক বছরের কঠিন সাধনা",
            position: "top-left",
          },
          sticker: { text: "বিরাট সফলতা!", angle: -5 },
        },
        frame,
        fps
      );

    case 4:
      return renderDynamicScene(
        {
          ...props,
          backgroundTheme: "dark_conflict",
          character,
          characterPose: "sad",
          characterPosition: "center",
          prop: {
            type: "dialogue",
            dialogueLeft: "ওর তো অনেক টাকা!",
            dialogueRight: "নিজেকে বড় ভাবে!",
          },
          pinNote: {
            category: "মানুষের আচরণ",
            headline: "কানাঘুষা শুরু",
            subtext: "ওর তো এখন অহংকার!",
            position: "top-right",
          },
          sticker: { text: "পেছনে সমালোচনা!", angle: 5 },
        },
        frame,
        fps
      );

    case 5:
      return renderDynamicScene(
        {
          ...props,
          backgroundTheme: "blue_melancholy",
          character,
          characterPose: "thinking",
          characterPosition: "center",
          prop: { type: "question_marks" },
          pinNote: {
            category: "বিস্ময় ও বেদনা",
            headline: "হতাশ মন",
            subtext: "দোয়া করা মানুষগুলোই সমালোচক",
            position: "top-left",
          },
          sticker: { text: "আচমকা পরিবর্তন!", angle: -5 },
        },
        frame,
        fps
      );

    case 6:
      return renderDynamicScene(
        {
          ...props,
          backgroundTheme: "warm_study",
          character,
          characterPose: "standing",
          characterPosition: "right",
          secondaryCharacter,
          secondaryPose: "explaining",
          secondaryPosition: "left",
          pinNote: {
            category: "উপদেশ",
            headline: "বিনীত হওয়ার শিক্ষা",
            subtext: "সবার চেয়ে বড় ভেবো না",
            position: "top-right",
          },
          sticker: { text: "অমূল্য উপদেশ!", angle: 4 },
        },
        frame,
        fps
      );

    case 7:
      return renderDynamicScene(
        {
          ...props,
          backgroundTheme: "corporate_office",
          character,
          characterPose: "standing",
          characterPosition: "center",
          prop: {
            type: "scale",
            scaleLeftLabel: "সাফল্য",
            scaleRightLabel: "বিনয়",
          },
          pinNote: {
            category: "আসল শিক্ষা",
            headline: "উপলব্ধি",
            subtext: "অন্যকে ছোট নয়, বড় করো",
            position: "top-left",
          },
          sticker: { text: "আসল সত্য!", angle: -5 },
        },
        frame,
        fps
      );

    case 8:
      return renderDynamicScene(
        {
          ...props,
          backgroundTheme: "deep_library",
          character: undefined, // Pure book spotlight
          prop: {
            type: "book",
            bookAuthor: "ROBERT GREENE",
            bookTitle: "THE 48 LAWS OF POWER",
            lawNumber: "LAW 46",
            lawTitle: "NEVER APPEAR TOO PERFECT",
            lawTakeaway: "নিজেকে কখনো অতি-নিখুঁত হিসেবে তুলে ধরবেন না!",
          },
          pinNote: {
            category: "রবার্ট গ্রিন",
            headline: "Law 46",
            subtext: "অহংকারের বিরুদ্ধে ঢাল",
            position: "top-left",
          },
          sticker: { text: "Law 46!", angle: 6 },
        },
        frame,
        fps
      );

    case 9:
      return renderDynamicScene(
        {
          ...props,
          backgroundTheme: "dramatic_red",
          character,
          characterPose: "standing",
          characterPosition: "center",
          prop: {
            type: "shield",
            shieldLabel: "ঈর্ষার হাত থেকে বাঁচতে বিনয়ী হোন",
          },
          pinNote: {
            category: "মনস্তাত্ত্বিক সত্য",
            headline: "ঈর্ষার ফাঁদ",
            subtext: "ভুলগুলোই তাদের কাছে বড়",
            position: "top-right",
          },
          sticker: { text: "বিনয় হারাবেন না!", angle: -5 },
        },
        frame,
        fps
      );

    case 10:
    default:
      return renderDynamicScene(
        {
          ...props,
          backgroundTheme: "golden_sunrise",
          character,
          characterPose: "standing",
          characterPosition: "right",
          secondaryCharacter,
          secondaryPose: "standing",
          secondaryPosition: "left",
          pinNote: {
            category: "জীবনবোধ",
            headline: "আচরণই পরিচয়",
            subtext: "সাফল্যের আসল রহস্য",
            position: "top-right",
          },
          sticker: { text: "আপনার মতামত জানান!", angle: -5 },
        },
        frame,
        fps
      );
  }
}

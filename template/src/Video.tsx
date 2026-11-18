import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import timelineData from "./timeline.json";
import { AnimatedStoryScene } from "./components/scenes/AnimatedStoryScene";
import { MotionGraphicsScene } from "./components/scenes/MotionGraphicsScene";
import {
  TimelineItem,
  ImageClipItem,
  VideoClipItem,
  CaptionItem,
  UniversalTimeline,
} from "./timelineTypes";

// Motion-animated Image Component
const AnimatedImage: React.FC<{
  item: ImageClipItem;
  durationInFrames: number;
  fps: number;
}> = ({ item, durationInFrames, fps }) => {
  const frame = useCurrentFrame();

  let zoomStart = item.zoomFrom ?? 1.0;
  let zoomEnd = item.zoomTo ?? 1.15;
  let panXStart = item.panXFrom ?? 0;
  let panXEnd = item.panXTo ?? 0;
  let panYStart = item.panYFrom ?? 0;
  let panYEnd = item.panYTo ?? 0;

  if (item.motion === "zoom-in") {
    zoomStart = 1.0;
    zoomEnd = 1.18;
  } else if (item.motion === "zoom-out") {
    zoomStart = 1.2;
    zoomEnd = 1.03;
  } else if (item.motion === "pan-left") {
    zoomStart = 1.12;
    zoomEnd = 1.14;
    panXStart = 40;
    panXEnd = -40;
  } else if (item.motion === "pan-right") {
    zoomStart = 1.12;
    zoomEnd = 1.14;
    panXStart = -40;
    panXEnd = 40;
  } else if (item.motion === "drift") {
    zoomStart = 1.05;
    zoomEnd = 1.15;
    panXStart = -20;
    panXEnd = 25;
    panYStart = -15;
    panYEnd = 20;
  } else if (item.motion === "static") {
    zoomStart = 1.0;
    zoomEnd = 1.0;
  }

  const scale = interpolate(frame, [0, durationInFrames], [zoomStart, zoomEnd], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(frame, [0, durationInFrames], [panXStart, panXEnd], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, durationInFrames], [panYStart, panYEnd], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeInFrames = item.fadeIn ? Math.round(item.fadeIn * fps) : 8;
  const fadeOutFrames = item.fadeOut ? Math.round(item.fadeOut * fps) : 8;
  const opacity = interpolate(
    frame,
    [0, fadeInFrames, Math.max(fadeInFrames, durationInFrames - fadeOutFrames), durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden", opacity }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <Img
          src={staticFile(item.src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: item.fit ?? "cover",
          }}
        />
      </div>

      {item.vignette !== false && (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.85) 100%)",
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// Animated Video Clip Component
const AnimatedVideo: React.FC<{
  item: VideoClipItem;
  durationInFrames: number;
  fps: number;
}> = ({ item, durationInFrames, fps }) => {
  const frame = useCurrentFrame();
  const fadeInFrames = item.fadeIn ? Math.round(item.fadeIn * fps) : 0;
  const fadeOutFrames = item.fadeOut ? Math.round(item.fadeOut * fps) : 0;

  const opacity = interpolate(
    frame,
    [0, fadeInFrames || 1, Math.max(1, durationInFrames - (fadeOutFrames || 1)), durationInFrames],
    [fadeInFrames ? 0 : 1, 1, 1, fadeOutFrames ? 0 : 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      <OffthreadVideo
        src={staticFile(item.src)}
        style={{ width: "100%", height: "100%", objectFit: item.fit ?? "cover" }}
        volume={item.volume ?? 1}
        startFrom={item.startFrom ? Math.round(item.startFrom * fps) : 0}
      />
    </AbsoluteFill>
  );
};

// Kinetic Caption / Subtitle Component
const CaptionOverlay: React.FC<{
  item: CaptionItem;
  durationInFrames: number;
}> = ({ item, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scalePop = spring({
    fps,
    frame,
    config: { damping: 14, mass: 0.6, stiffness: 180 },
  });

  const fadeOut = interpolate(
    frame,
    [Math.max(0, durationInFrames - 6), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const preset = item.preset ?? "tiktok";
  const defaultY = preset === "cinema" ? 1500 : 1420;
  const topPos = item.y ?? defaultY;

  return (
    <div
      style={{
        position: "absolute",
        left: 48,
        right: 48,
        top: topPos,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
        transform: `scale(${scalePop})`,
      }}
    >
      <div
        style={{
          backgroundColor: item.backgroundColor ?? "rgba(0, 0, 0, 0.78)",
          backdropFilter: "blur(8px)",
          border: "2px solid rgba(255, 255, 255, 0.15)",
          borderRadius: 24,
          padding: "16px 32px",
          maxWidth: "90%",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
        }}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: item.fontSize ?? 54,
            fontWeight: 800,
            lineHeight: 1.25,
            color: item.color ?? "#ffffff",
            textAlign: "center",
            display: "inline-block",
            letterSpacing: "-0.01em",
          }}
        >
          {item.text}
        </span>
      </div>
    </div>
  );
};

  export interface VideoProps {
    timeline?: UniversalTimeline;
  }

  export const Video: React.FC<VideoProps> = ({ timeline: propTimeline }) => {
    const activeTimeline = (propTimeline || timelineData) as any;

    // =========================================================================
    // 2D CARTOON CHARACTER STORYTELLING & MULTITRACK ENGINE
    // =========================================================================
    const fps = activeTimeline.fps || 30;
    const toFrames = (seconds: number) => Math.round(seconds * fps);

    return (
      <AbsoluteFill style={{ backgroundColor: "#0b0c10" }}>
          {
            ((activeTimeline.items as TimelineItem[]) || []).map((item, index) => {
              const from = toFrames((item as any).start ?? 0);
              const duration = toFrames((item as any).duration ?? 5);

              // 2D Character Animation Scene (Reference Style)
              if (item.type === "animated-scene") {
                return (
                  <Sequence key={`scene-${index}`} from={from} durationInFrames={duration}>
                    <AnimatedStoryScene
                      sceneIndex={item.sceneIndex}
                      subtitle={item.subtitle}
                      durationInFrames={duration}
                      highlightWords={item.highlightWords}
                      character={item.character}
                      characterPose={item.characterPose}
                      characterPosition={item.characterPosition}
                      secondaryCharacter={item.secondaryCharacter}
                      secondaryPose={item.secondaryPose}
                      secondaryPosition={item.secondaryPosition}
                      backgroundTheme={item.backgroundTheme as any}
                      pinNote={item.pinNote}
                      sticker={item.sticker}
                      prop={item.prop}
                      hookCard={item.hookCard}
                      metaphor={item.metaphor}
                      rackFocus={item.rackFocus}
                      speechBubble={item.speechBubble}
                      speechBubbles={(item as any).speechBubbles}
                      characterPoses={(item as any).characterPoses}
                      secondaryPoses={(item as any).secondaryPoses}
                      tertiaryCharacter={item.tertiaryCharacter}
                      tertiaryPose={item.tertiaryPose}
                      tertiaryPosition={item.tertiaryPosition}
                      tertiaryPoses={(item as any).tertiaryPoses}
                      crowd={item.crowd}
                      contextIcon={item.contextIcon}
                      screenShake={item.screenShake}
                    />
                  </Sequence>
                );
              }

              // Clean Motion Graphics / Infographics Scene (Zero Character Scene)
              if (item.type === "motion-graphics-scene") {
                return (
                  <Sequence key={`mg-${index}`} from={from} durationInFrames={duration}>
                    <MotionGraphicsScene
                      type={item.mgType}
                      title={item.title}
                      subtitle={item.subtitle}
                      badge={item.badge}
                      comparisonLeft={item.comparisonLeft}
                      comparisonRight={item.comparisonRight}
                      checklistItems={item.checklistItems}
                      flowSteps={item.flowSteps}
                      timeLabel={item.timeLabel}
                      timeDetail={item.timeDetail}
                      timeIcon={item.timeIcon}
                      quoteText={item.quoteText}
                      quoteAuthor={item.quoteAuthor}
                      optionsCTA={item.optionsCTA}
                      backgroundGradient={item.backgroundGradient}
                    />
                  </Sequence>
                );
              }

              // Audio track (Voiceover / BGM / SFX)
                if (
                  item.type === "audio" ||
                  item.type === "voiceover" ||
                  item.type === "bgm" ||
                  item.type === "sfx"
                ) {
                  return (
                    <Sequence key={`audio-${index}`} from={from} durationInFrames={duration}>
                      <Audio src={staticFile(item.src)} volume={item.volume ?? 1} />
                    </Sequence>
                  );
                }

                // Subtitles / Captions
                if (item.type === "caption" || item.type === "text") {
                  return (
                    <Sequence key={`caption-${index}`} from={from} durationInFrames={duration}>
                      <CaptionOverlay item={item} durationInFrames={duration} />
                    </Sequence>
                  );
                }

                // Image with Ken Burns Camera Motion
                if (item.type === "image") {
                  return (
                    <Sequence key={`image-${index}`} from={from} durationInFrames={duration}>
                      <AnimatedImage item={item} durationInFrames={duration} fps={fps} />
                    </Sequence>
                  );
                }

                // Video Clip
                if (item.type === "video") {
                  return (
                    <Sequence key={`video-${index}`} from={from} durationInFrames={duration}>
                      <AnimatedVideo item={item} durationInFrames={duration} fps={fps} />
                    </Sequence>
                  );
                }

                return null;
              })
          }

          {/* Global Sound Effects Track (pops, whooshes, coins, chimes ducked below VO) */ }
              {
                (activeTimeline.soundEffects as any)?.map((sfx: any, sfxIdx: number) => {
                  const sfxFrom = sfx.frame ?? toFrames(sfx.start ?? 0);
                  const sfxDuration = sfx.durationInFrames ?? toFrames(sfx.duration ?? 1);
                  return (
                    <Sequence key={`sfx-${sfxIdx}`} from={sfxFrom} durationInFrames={sfxDuration}>
                      <Audio src={staticFile(sfx.src)} volume={sfx.volume ?? 0.25} />
                    </Sequence>
                  );
                })
              }
    </AbsoluteFill>
    );
  };

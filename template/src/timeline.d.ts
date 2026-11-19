declare module "*.json" {
  export type MotionPreset = "zoom-in" | "zoom-out" | "pan-left" | "pan-right" | "drift" | "static";
  export type CaptionStyle = "tiktok" | "cinema" | "minimal";

  export interface SpeechBubbleConfig {
    text: string;
    speakerPosition?: "left" | "right" | "center";
    type?: "speech" | "thought" | "shout";
    speakerName?: string;
    top?: number;
    highlightText?: string;
  }

  export interface ContextIconConfig {
    icon:
      | "money"
      | "clock"
      | "food"
      | "book"
      | "key"
      | "phone"
      | "question"
      | "idea_bulb"
      | "heart"
      | "alert"
      | "tea_cup"
      | "handshake"
      | "trophy";
    position?: { x: number; y: number };
    size?: number;
    animation?: "pop" | "float" | "pulse";
    label?: string;
  }

  export interface AnimatedSceneItem {
    type: "animated-scene";
    sceneIndex: number;
    start: number;
    duration: number;
    subtitle: string;
    narration?: string;
    words?: Array<{ word: string; start: number; end: number }>;
    highlightWords?: string[];
    character?: string;
    characterPose?:
      | "standing"
      | "presenting"
      | "sad"
      | "thinking"
      | "box"
      | "explaining"
      | "tremble"
      | "shouting"
      | "holding_prop";
    characterPosition?: "center" | "left" | "right";
    secondaryCharacter?: string;
    secondaryPose?:
      | "standing"
      | "presenting"
      | "sad"
      | "thinking"
      | "box"
      | "explaining"
      | "tremble"
      | "shouting"
      | "holding_prop";
    secondaryPosition?: "center" | "left" | "right";
    backgroundTheme?: string;
    pinNote?: {
      category: string;
      headline: string;
      subtext: string;
      position?: "top-left" | "top-right";
      rotation?: number;
      delayFrames?: number;
    };
    sticker?: {
      text: string;
      angle?: number;
      bottom?: number;
      delayFrames?: number;
    };
    prop?: any;
    hookCard?: any;
    metaphor?: any;
    rackFocus?: boolean;
    speechBubble?: SpeechBubbleConfig;
    contextIcon?: ContextIconConfig;
    screenShake?: boolean;
  }

  export interface MotionGraphicsSceneItem {
    type: "motion-graphics-scene";
    start: number;
    duration: number;
    mgType: "comparison" | "checklist" | "flow" | "time" | "quote_cta";
    title: string;
    subtitle?: string;
    badge?: string;
    comparisonLeft?: { title: string; points: string[]; color?: string; badge?: string };
    comparisonRight?: { title: string; points: string[]; color?: string; badge?: string };
    checklistItems?: Array<{ text: string; icon?: string; active?: boolean }>;
    flowSteps?: Array<{ step: number; title: string; desc?: string }>;
    timeLabel?: string;
    timeDetail?: string;
    timeIcon?: "clock" | "calendar";
    quoteText?: string;
    quoteAuthor?: string;
    optionsCTA?: string[] | { header?: string; optionA?: string; optionB?: string; prompt?: string };
    backgroundGradient?: string;
  }

  export interface ImageClipItem {
    type: "image";
    src: string;
    start: number;
    duration: number;
    fit?: "cover" | "contain";
    motion?: MotionPreset;
    zoomFrom?: number;
    zoomTo?: number;
    panXFrom?: number;
    panXTo?: number;
    panYFrom?: number;
    panYTo?: number;
    fadeIn?: number;
    fadeOut?: number;
    vignette?: boolean;
  }

  export interface VideoClipItem {
    type: "video";
    src: string;
    start: number;
    duration: number;
    startFrom?: number;
    volume?: number;
    fit?: "cover" | "contain";
    fadeIn?: number;
    fadeOut?: number;
  }

  export interface AudioItem {
    type: "audio" | "voiceover" | "bgm" | "sfx";
    src: string;
    start: number;
    duration: number;
    volume?: number;
  }

  export interface CaptionItem {
    type: "caption" | "text";
    text: string;
    start: number;
    duration: number;
    preset?: CaptionStyle;
    highlightWord?: string;
    y?: number;
    fontSize?: number;
    color?: string;
    highlightColor?: string;
    backgroundColor?: string;
  }

  export interface SoundEffectCue {
    src: string;
    frame?: number;
    start?: number;
    durationInFrames?: number;
    duration?: number;
    volume?: number;
  }

  export type TimelineItem =
    | AnimatedSceneItem
    | MotionGraphicsSceneItem
    | ImageClipItem
    | VideoClipItem
    | AudioItem
    | CaptionItem;

  const value: {
    width: number;
    height: number;
    fps: number;
    durationInFrames: number;
    title?: string;
    items: TimelineItem[];
    soundEffects?: SoundEffectCue[];
  };

  export default value;
}

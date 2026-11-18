export type MotionPreset = "zoom-in" | "zoom-out" | "pan-left" | "pan-right" | "drift" | "static";
export type CaptionStyle = "tiktok" | "cinema" | "minimal";

export interface SpeechBubbleConfig {
  text: string;
  speakerPosition?: "left" | "right" | "center";
  type?: "speech" | "thought" | "shout";
  speakerName?: string;
  top?: number;
  highlightText?: string;
  start?: number; // relative start in seconds within scene
  duration?: number; // relative duration in seconds within scene
  startFrame?: number;
  durationFrames?: number;
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
  highlightWords?: string[];
  character?: string;
  characterPose?: any;
  characterPoses?: Array<{
    pose: string;
    start?: number;
    duration?: number;
    startFrame?: number;
    durationFrames?: number;
  }>;
  characterPosition?: "center" | "left" | "right";
  secondaryCharacter?: string;
  secondaryPose?: any;
  secondaryPoses?: Array<{
    pose: string;
    start?: number;
    duration?: number;
    startFrame?: number;
    durationFrames?: number;
  }>;
  secondaryPosition?: "center" | "left" | "right";
  tertiaryCharacter?: string;
  tertiaryPose?: any;
  tertiaryPoses?: Array<{
    pose: string;
    start?: number;
    duration?: number;
    startFrame?: number;
    durationFrames?: number;
  }>;
  tertiaryPosition?: "center" | "left" | "right";
  crowd?: "shoppers" | "office_team" | "village_crowd" | "classroom_students" | "none";
  backgroundTheme?: string;
  pinNote?: any;
  sticker?: any;
  prop?: any;
  hookCard?: any;
  metaphor?: any;
  rackFocus?: boolean;
  speechBubble?: SpeechBubbleConfig;
  speechBubbles?: SpeechBubbleConfig[];
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
  optionsCTA?: string[];
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

// Kinetic Promo & Explainer Types
export type PromoTheme = "dark_emerald" | "mint_cream" | "vivid_green" | "dark_navy";

export type PromoPrimitiveType =
  | "search_avatar"
  | "storefront"
  | "wallet_cycle"
  | "thought_customer"
  | "phone_mockup"
  | "customer_growth"
  | "trust_flow"
  | "brand_outro"
  | "unanswered_call"
  | "cod_fake_order"
  | "delivery_failed"
  | "financial_loss"
  | "verification_system"
  | "return_reduction"
  | "healthy_business_ratio"
  | string;

export interface PromoSceneItem {
  id?: string;
  type?: "promo" | "promo-scene";
  theme?: PromoTheme;
  primitive?: PromoPrimitiveType;
  brandName?: string;
  audio?: string;
  durationInFrames: number;
  caption?: {
    text: string;
    highlightWords?: string[];
  };
  props?: Record<string, any>;
  // For backwards compatibility with track-based timeline
  start?: number;
  duration?: number;
  promoType?: PromoPrimitiveType;
  captionText?: string;
  captionHighlight?: string;
  backgroundColor?: string;
  brandLogoIcon?: "shopping_cart" | "rocket" | "sparkle" | "globe";
  brandColor?: string;
  watermarkIcon?: boolean;
  currencySymbol?: string;
}

export interface PromoTimeline {
  composition: {
    width: number;
    height: number;
    fps: number;
    brandName?: string;
    brandColor?: string;
    accentColor?: string;
    durationInFrames?: number;
  };
  scenes: PromoSceneItem[];
}

export type TimelineItem =
  | AnimatedSceneItem
  | MotionGraphicsSceneItem
  | PromoSceneItem
  | ImageClipItem
  | VideoClipItem
  | AudioItem
  | CaptionItem;

export interface UniversalTimeline {
  width?: number;
  height?: number;
  fps?: number;
  durationInFrames?: number;
  mode?: "story" | "promo" | "multitrack";
  composition?: {
    width: number;
    height: number;
    fps: number;
    durationInFrames?: number;
    brandName?: string;
    brandColor?: string;
    accentColor?: string;
  };
  items?: TimelineItem[];
  scenes?: PromoSceneItem[];
  soundEffects?: SoundEffectCue[];
}

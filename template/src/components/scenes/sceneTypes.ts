import { CharacterPose } from "../characters/characterPresets";

export type BackgroundTheme =
  | "village_sunset"
  | "village_bazaar"
  | "village_bazaar_night"
  | "corporate_office"
  | "clothing_store"
  | "electronics_store"
  | "hospital_clinic"
  | "pharmacy"
  | "grocery_store"
  | "living_room"
  | "tea_stall"
  | "police_station"
  | "restaurant_dining"
  | "factory_warehouse"
  | "street_outdoor"
  | "home_study"
  | "dark_conflict"
  | "blue_melancholy"
  | "warm_study"
  | "deep_library"
  | "dramatic_red"
  | "golden_sunrise"
  | "classroom"
  | "cafe"
  | "bus_interior"
  | "wedding_hall"
  | (string & {});

export interface ComparisonRow {
  label: string;
  col2: boolean | string; // Matobbor / Wrong approach
  col3: boolean | string; // Hasan / Power Law approach
}

export interface ComparisonTableConfig {
  title?: string;
  col1Header?: string;
  col2Header: string;
  col3Header: string;
  col2Color?: string; // e.g. "#b91c1c" (Red)
  col3Color?: string; // e.g. "#15803d" (Green)
  rows: ComparisonRow[];
}

export interface TieredBenefitItem {
  icon: string;
  text: string;
}

export interface TieredBenefitConfig {
  badge: string; // e.g. "নিয়ম ৯" or "নিয়ম ২২"
  lawHeader?: string; // e.g. "রবার্ট গ্রিনের ৪৮ লজ অফ পাওয়ার"
  thesisStatement: string; // e.g. "কাজে জিতে দেখানো আপনাকে দেয়"
  items: TieredBenefitItem[];
  citation?: string; // e.g. "ভাবার্থ • The 48 Laws of Power • Law 9"
}

export interface ScenePropConfig {
  type:
    | "none"
    | "chart"
    | "book"
    | "scale"
    | "shield"
    | "dialogue"
    | "question_marks"
    | "presentation_board"
    | "lightbulb"
    | "wedding_feast"
    | "sweets_bowl"
    | "comparison_table"
    | "tiered_benefit"
    | "price_board"
    | "tea_stall_chula"
    | "smartphone"
    | "video_call"
    | "office_desk_computer"
    | "executive_desk"
    | "ceo_office_desk"
    | "resignation_letters"
    | "tea_stall_bench"
    | "courtroom_desk"
    | "hospital_bed"
    | "classroom_desk"
    | "dining_table"
    | "cash_counter"
    | "software_mockup";
  imageSrc?: string;
  width?: number;
  height?: number;
  top?: number;
  title?: string;
  deskName?: string;
  screenContent?: string;
  bookAuthor?: string;
  bookTitle?: string;
  lawNumber?: string;
  lawTitle?: string;
  lawTakeaway?: string;
  chartTitle?: string;
  chartDirection?: "up" | "down";
  chartMetric?: string;
  scaleLeftLabel?: string;
  scaleRightLabel?: string;
  shieldLabel?: string;
  dialogueLeft?: string;
  dialogueRight?: string;
  comparisonTable?: ComparisonTableConfig;
  tieredBenefit?: TieredBenefitConfig;
  priceBoardItems?: Array<{ item: string; price?: string }>;
  callerName?: string;
  callStatus?: string;
  chatGroupName?: string;
  chatMessages?: Array<{ sender?: string; text: string; isMe?: boolean; status?: string }>;
  billAmount?: string;
}

export interface PinNoteConfig {
  category: string;
  headline: string;
  subtext: string;
  position?: "top-left" | "top-right";
  rotation?: number;
  delayFrames?: number;
  start?: number;
  duration?: number;
  durationFrames?: number;
}

export interface StickerConfig {
  text: string;
  angle?: number;
  bottom?: number;
  delayFrames?: number;
  start?: number;
  duration?: number;
  durationFrames?: number;
}

export interface HookCardConfig {
  line1?: string;
  line2?: string;
  text?: string;
  subtext?: string;
  badge?: string;
  start?: number;
  duration?: number;
  delayFrames?: number;
  durationFrames?: number;
}

export interface MetaphorConfig {
  type: "inner_rage" | "inner_power" | "none";
  intensity?: number;
}

export interface AnimatedSceneConfig {
  sceneIndex: number;
  subtitle: string;
  highlightWords?: string[];
  character?: string;
  characterPose?: CharacterPose;
  characterPosition?: "center" | "left" | "right";
  secondaryCharacter?: string;
  secondaryPose?: CharacterPose;
  secondaryPosition?: "center" | "left" | "right";
  tertiaryCharacter?: string;
  tertiaryPose?: CharacterPose;
  tertiaryPosition?: "center" | "left" | "right";
  tertiaryPoses?: Array<{ start: number; duration: number; pose: CharacterPose }>;
  crowd?: "shoppers" | "office_team" | "village_crowd" | "classroom_students" | "none";
  backgroundTheme?: BackgroundTheme;
  pinNote?: PinNoteConfig;
  sticker?: StickerConfig;
  prop?: ScenePropConfig;
  hookCard?: HookCardConfig;
  metaphor?: MetaphorConfig;
  rackFocus?: boolean; // Foreground blur depth-of-field
}

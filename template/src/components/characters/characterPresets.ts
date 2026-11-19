export type SkinToneKey = "fair" | "wheatish" | "tan" | "deep_brown" | "bronze";
export type HairStyle = "crop" | "sidepart" | "curls" | "receding" | "elder" | "long" | "hijab" | "bald";
export type FacialHair = "none" | "stubble" | "goatee" | "mustache" | "elder_beard";
export type Eyewear = "none" | "square_blue" | "square_black" | "round_gold" | "round_black";
export type OutfitStyle =
  | "formal_suit"
  | "smart_blazer"
  | "formal_shirt"
  | "casual_hoodie"
  | "panjabi_kurta"
  | "polo_shirt"
  | "sweater_vest"
  | "lungi_shirt"
  | "tupi_koti"
  | "village_saree";
export type CharacterPose =
  | "standing"
  | "presenting"
  | "sad"
  | "concerned"
  | "thinking"
  | "talking"
  | "box"
  | "explaining"
  | "tremble"
  | "shouting"
  | "holding_prop"
  | "checking_khata"
  | "searching_inventory"
  | "arms_crossed"
  | "holding_shirt"
  | "using_computer"
  | "sitting_desk"
  | "pointing"
  | "reading_document"
  | "celebrating"
  | "holding_phone"
  | "sitting_stool"
  | "counting_money"
  | "drinking_tea"
  | "shocked"
  | "nervous"
  | "walking"
  | "walking_phone";

export interface SkinPalette {
  base: string;
  shadow: string;
  lip: string;
}

export const SKIN_PALETTES: Record<SkinToneKey, SkinPalette> = {
  fair: { base: "#f4c29e", shadow: "#d99f7d", lip: "#c47761" },
  wheatish: { base: "#df9b6d", shadow: "#be794a", lip: "#aa5d39" },
  tan: { base: "#be794a", shadow: "#9c5b2e", lip: "#8b4720" },
  deep_brown: { base: "#8d532b", shadow: "#6b3d1c", lip: "#5b3114" },
  bronze: { base: "#6d3b1e", shadow: "#4e2712", lip: "#3f1c08" },
};

export interface CharacterConfig {
  name: string;
  displayName: string;
  skin: SkinPalette;
  hairStyle: HairStyle;
  hairColor: string;
  facialHair: FacialHair;
  facialHairColor?: string;
  eyewear: Eyewear;
  outfit: OutfitStyle;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  pantsColor: string;
  shoesColor: string;
  hasShawl?: boolean;
  shawlColor?: string;
  earrings?: boolean;
  hasGamcha?: boolean;
  gamchaColor?: string;
  hasTupi?: boolean;
  tupiColor?: string;
  lungiPattern?: "checkered_blue" | "checkered_green" | "checkered_red";
}

// Named Presets
export const CHARACTER_PRESETS: Record<string, CharacterConfig> = {
  // 1. Rashed Saheb - Cloth Store Owner (Middle-aged, Punjabi, Mustache, Glasses)
  rashed: {
    name: "rashed",
    displayName: "রাশেদ সাহেব (দোকান মালিক)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "elder",
    hairColor: "#475569", // Mature salt & pepper graying hair
    facialHair: "mustache", // Traditional mature shopkeeper mustache!
    facialHairColor: "#334155",
    eyewear: "square_black", // Classic reading glasses
    outfit: "panjabi_kurta", // Traditional Bengali merchant punjabi
    primaryColor: "#7c2d12", // Rich deep maroon punjabi
    secondaryColor: "#ffffff",
    accentColor: "#f59e0b",
    pantsColor: "#ffffff", // White pajama
    shoesColor: "#78350f",
    earrings: false,
  },

  // Jamal Saheb - Electronics Shop Owner (45yo, Businessman Polo/Shirt, Stubble, NO glasses)
  jamal: {
    name: "jamal",
    displayName: "জামাল সাহেব (ইলেকট্রনিক্স দোকান মালিক)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "sidepart",
    hairColor: "#1e293b",
    facialHair: "mustache",
    facialHairColor: "#1e293b",
    eyewear: "none", // NO glasses!
    outfit: "polo_shirt",
    primaryColor: "#0369a1", // Rich ocean blue showroom polo
    secondaryColor: "#ffffff",
    accentColor: "#0284c7",
    pantsColor: "#1e293b", // Formal dark trousers
    shoesColor: "#0f172a",
    earrings: false,
  },

  // Friend / Business Advisor (38yo, Smart Blazer over crewneck, Clean-shaven, Friendly smile, NO glasses)
  friend: {
    name: "friend",
    displayName: "বন্ধু (উপদেষ্টা ও শুভাকাঙ্ক্ষী)",
    skin: SKIN_PALETTES.fair,
    hairStyle: "crop",
    hairColor: "#0f172a",
    facialHair: "none", // Clean-shaven
    eyewear: "none", // NO glasses!
    outfit: "smart_blazer",
    primaryColor: "#334155", // Charcoal smart blazer
    secondaryColor: "#f8fafc", // Crisp white inner
    accentColor: "#3b82f6",
    pantsColor: "#1e293b",
    shoesColor: "#475569",
    earrings: false,
  },

  // 2. Cloth Store Employee - Young Salesman (21yo, Blue Polo, Clean-shaven, NO glasses)
  employee: {
    name: "employee",
    displayName: "কর্মচারী (দোকানের সেলসম্যান)",
    skin: SKIN_PALETTES.tan, // Warm South Asian tan
    hairStyle: "crop", // Modern young crop hair
    hairColor: "#0f172a", // Jet black hair
    facialHair: "none", // Clean-shaven youth
    eyewear: "none", // NO glasses!
    outfit: "polo_shirt", // Store staff polo
    primaryColor: "#0284c7", // Bright shop polo
    secondaryColor: "#ffffff",
    accentColor: "#0369a1",
    pantsColor: "#334155",
    shoesColor: "#ffffff", // Sneakers
    earrings: false,
  },

  // 3. Customer - Trendy Shopper (Curly hair, light stubble, Casual jacket, NO glasses)
  customer: {
    name: "customer",
    displayName: "ক্রেতা (শার্টের কাস্টমার)",
    skin: SKIN_PALETTES.fair, // Distinct skin tone
    hairStyle: "curls", // Stylish wavy / curly hair
    hairColor: "#1e1b4b", // Dark indigo tint hair
    facialHair: "stubble", // Modern light stubble
    facialHairColor: "#1e1b4b",
    eyewear: "none", // NO glasses!
    outfit: "casual_hoodie", // Casual street jacket
    primaryColor: "#334155", // Slate casual jacket over tee
    secondaryColor: "#ffffff",
    accentColor: "#e11d48",
    pantsColor: "#1e293b", // Dark jeans
    shoesColor: "#0f172a",
    earrings: false,
  },

  // Rakib - Young Humble Employee (Phase 1)
  rakib: {
    name: "rakib",
    displayName: "রাকিব (সাধারণ কর্মী)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "sidepart",
    hairColor: "#0f172a",
    facialHair: "none",
    eyewear: "square_black",
    outfit: "formal_shirt",
    primaryColor: "#e0f2fe", // Crisp light blue formal shirt
    secondaryColor: "#ffffff",
    accentColor: "#0284c7", // Navy/cyan tie
    pantsColor: "#1e293b",
    shoesColor: "#0f172a",
    earrings: false,
  },

  // Rakib - Company Manager (Phase 2: Powerful, strict, dark tailored blazer)
  rakib_manager: {
    name: "rakib_manager",
    displayName: "রাকিব (কোম্পানি ম্যানেজার)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "sidepart",
    hairColor: "#0f172a",
    facialHair: "none",
    eyewear: "square_black",
    outfit: "smart_blazer",
    primaryColor: "#0f172a", // Deep charcoal navy blazer
    secondaryColor: "#ffffff", // Crisp white shirt inside
    accentColor: "#dc2626", // Red power tie
    pantsColor: "#0f172a",
    shoesColor: "#020617",
    earrings: false,
  },

  // Sumon - Trustworthy colleague & friend
  sumon: {
    name: "sumon",
    displayName: "সুমন (সহকর্মী ও বন্ধু)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "crop",
    hairColor: "#1e293b",
    facialHair: "none",
    eyewear: "none",
    outfit: "formal_shirt",
    primaryColor: "#15803d", // Emerald office shirt
    secondaryColor: "#ffffff",
    accentColor: "#eab308", // Golden/yellow accent
    pantsColor: "#334155",
    shoesColor: "#0f172a",
    earrings: false,
  },

  // Company Owner / Chairman
  owner: {
    name: "owner",
    displayName: "কোম্পানির মালিক (চেয়ারম্যান)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "elder",
    hairColor: "#cbd5e1", // Distinguished silver-gray hair
    facialHair: "elder_beard",
    facialHairColor: "#e2e8f0",
    eyewear: "round_gold",
    outfit: "formal_suit",
    primaryColor: "#1e293b", // Elegant charcoal suit
    secondaryColor: "#ffffff",
    accentColor: "#d97706", // Amber gold tie
    pantsColor: "#0f172a",
    shoesColor: "#020617",
    earrings: false,
  },

  // 1. Rafi - Sharp young corporate analyst
  rafi: {
    name: "rafi",
    displayName: "রাফি (Corporate Analyst)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "sidepart",
    hairColor: "#1a202c",
    facialHair: "none",
    eyewear: "square_blue",
    outfit: "formal_shirt",
    primaryColor: "#edf2f7",
    secondaryColor: "#cbd5e0",
    accentColor: "#c53030", // Red tie
    pantsColor: "#2d3748",
    shoesColor: "#1a202c",
  },

  // 2. Nabil - Ambitious self-made entrepreneur (smart blazer, modern curls, stylish tan)
  nabil: {
    name: "nabil",
    displayName: "নাবিল (Self-Made Entrepreneur)",
    skin: SKIN_PALETTES.tan,
    hairStyle: "curls",
    hairColor: "#271c19",
    facialHair: "stubble",
    eyewear: "none",
    outfit: "smart_blazer",
    primaryColor: "#8c532b", // Camel/Tan Blazer
    secondaryColor: "#1a202c", // Dark tee inside
    accentColor: "#d69e2e",
    pantsColor: "#1a202c",
    shoesColor: "#ffffff", // Modern white sneakers
  },

  // 3. Kamal - Senior corporate boss
  kamal: {
    name: "kamal",
    displayName: "কামাল সাহেব (Senior Boss)",
    skin: SKIN_PALETTES.tan,
    hairStyle: "receding",
    hairColor: "#171923",
    facialHair: "none",
    eyewear: "none",
    outfit: "formal_suit",
    primaryColor: "#2d3748", // Charcoal suit
    secondaryColor: "#ffffff",
    accentColor: "#b7791f", // Gold tie
    pantsColor: "#1a202c",
    shoesColor: "#000000",
  },
  boss: {
    name: "boss",
    displayName: "বসের চরিত্র (Boss)",
    skin: SKIN_PALETTES.tan,
    hairStyle: "receding",
    hairColor: "#171923",
    facialHair: "none",
    eyewear: "none",
    outfit: "formal_suit",
    primaryColor: "#1a365d", // Deep navy suit
    secondaryColor: "#ffffff",
    accentColor: "#c53030",
    pantsColor: "#1a202c",
    shoesColor: "#000000",
  },

  // 4. Father / Elder - Wise traditional elder
  father: {
    name: "father",
    displayName: "বিজ্ঞ বাবা (Wise Father)",
    skin: SKIN_PALETTES.tan,
    hairStyle: "elder",
    hairColor: "#e2e8f0",
    facialHair: "elder_beard",
    facialHairColor: "#f7fafc",
    eyewear: "round_gold",
    outfit: "panjabi_kurta",
    primaryColor: "#f7fafc", // White/Cream Kurta
    secondaryColor: "#e2e8f0",
    accentColor: "#9c4221",
    pantsColor: "#f7fafc",
    shoesColor: "#744210",
    hasShawl: true,
    shawlColor: "#9c4221", // Warm rust shawl
  },
  elder: {
    name: "elder",
    displayName: "অভিভাবক (Elder Mentor)",
    skin: SKIN_PALETTES.deep_brown,
    hairStyle: "elder",
    hairColor: "#cbd5e0",
    facialHair: "elder_beard",
    facialHairColor: "#edf2f7",
    eyewear: "round_gold",
    outfit: "panjabi_kurta",
    primaryColor: "#e2e8f0",
    secondaryColor: "#cbd5e0",
    accentColor: "#2c5282",
    pantsColor: "#e2e8f0",
    shoesColor: "#4a2a0a",
    hasShawl: true,
    shawlColor: "#2b6cb0",
  },

  // 5. Anika - Professional Modern Woman
  anika: {
    name: "anika",
    displayName: "আনিকা (Professional Leader)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "long",
    hairColor: "#1a202c",
    facialHair: "none",
    eyewear: "none",
    outfit: "smart_blazer",
    primaryColor: "#285e61", // Elegant teal blazer
    secondaryColor: "#ffffff",
    accentColor: "#dd6b20",
    pantsColor: "#1d4044",
    shoesColor: "#1a202c",
    earrings: true,
  },

  // 6. Fatima - Modest leader with Hijab
  fatima: {
    name: "fatima",
    displayName: "ফাতিমা (Hijab / Leader)",
    skin: SKIN_PALETTES.fair,
    hairStyle: "hijab",
    hairColor: "#2d3748", // Hijab color
    facialHair: "none",
    eyewear: "square_black",
    outfit: "smart_blazer",
    primaryColor: "#4a5568",
    secondaryColor: "#f7fafc",
    accentColor: "#805ad5",
    pantsColor: "#2d3748",
    shoesColor: "#1a202c",
  },

  // 7. Tanvir - Modern E-commerce Entrepreneur
  tanvir: {
    name: "tanvir",
    displayName: "তানভীর (আধুনিক উদ্যোক্তা)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "crop",
    hairColor: "#171923",
    facialHair: "none",
    eyewear: "square_black",
    outfit: "smart_blazer",
    primaryColor: "#1e293b", // Deep navy/charcoal smart blazer
    secondaryColor: "#ffffff", // Crisp white inner tee
    accentColor: "#0284c7",
    pantsColor: "#0f172a",
    shoesColor: "#ffffff", // Clean white sneakers
  },

  // 8. Tariq - Village youth / Hardworking dreamer
  tariq: {
    name: "tariq",
    displayName: "তারিক (Ambitious Youth)",
    skin: SKIN_PALETTES.deep_brown,
    hairStyle: "crop",
    hairColor: "#171923",
    facialHair: "stubble",
    eyewear: "none",
    outfit: "polo_shirt",
    primaryColor: "#276749", // Forest green polo
    secondaryColor: "#e2e8f0",
    accentColor: "#f6e05e",
    pantsColor: "#4a5568",
    shoesColor: "#1a202c",
  },

  // 9. Professor / Academic Scholar
  professor: {
    name: "professor",
    displayName: "প্রফেসর (Academic Scholar)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "sidepart",
    hairColor: "#718096", // Graying
    facialHair: "mustache",
    eyewear: "round_black",
    outfit: "sweater_vest",
    primaryColor: "#744210", // Brown vest
    secondaryColor: "#edf2f7",
    accentColor: "#9b2c2c",
    pantsColor: "#4a5568",
    shoesColor: "#2d3748",
  },

  // 10. Businessman / Executive
  businessman: {
    name: "businessman",
    displayName: "ব্যবসায়ী (Executive)",
    skin: SKIN_PALETTES.fair,
    hairStyle: "sidepart",
    hairColor: "#1a202c",
    facialHair: "none",
    eyewear: "none",
    outfit: "formal_suit",
    primaryColor: "#1a365d", // Navy suit
    secondaryColor: "#ebf8ff",
    accentColor: "#9b2c2c", // Crimson tie
    pantsColor: "#1a365d",
    shoesColor: "#000000",
  },

  // 11. Arrogant Passenger - Middle-aged stubborn passenger
  passenger: {
    name: "passenger",
    displayName: "ভদ্রলোক (Stubborn Passenger)",
    skin: SKIN_PALETTES.tan,
    hairStyle: "sidepart",
    hairColor: "#171923",
    facialHair: "mustache",
    eyewear: "none",
    outfit: "polo_shirt",
    primaryColor: "#742a2a", // Deep crimson polo
    secondaryColor: "#e2e8f0",
    accentColor: "#ed8936",
    pantsColor: "#2d3748",
    shoesColor: "#1a202c",
  },

  // 12. Seat Owner - Calm, polite traveler
  seat_owner: {
    name: "seat_owner",
    displayName: "সিটের মালিক (Calm Passenger)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "crop",
    hairColor: "#1a202c",
    facialHair: "none",
    eyewear: "square_black",
    outfit: "formal_shirt",
    primaryColor: "#ebf8ff", // Light blue shirt
    secondaryColor: "#bee3f8",
    accentColor: "#2b6cb0",
    pantsColor: "#2d3748",
    shoesColor: "#1a202c",
  },

  // 13. Chacha - Humorous, serious-looking food-loving wedding uncle
  chacha: {
    name: "chacha",
    displayName: "ভোজনরসিক চাচা (Food-loving Chacha)",
    skin: SKIN_PALETTES.tan,
    hairStyle: "sidepart",
    hairColor: "#2d3748",
    facialHair: "mustache",
    eyewear: "round_black",
    outfit: "panjabi_kurta",
    primaryColor: "#c05621", // Festive rust-orange Panjabi
    secondaryColor: "#feebc8",
    accentColor: "#d69e2e",
    pantsColor: "#f7fafc",
    shoesColor: "#744210",
  },

  // 14. Waiter - Wedding feast server
  waiter: {
    name: "waiter",
    displayName: "ওয়েটার (Wedding Server)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "crop",
    hairColor: "#171923",
    facialHair: "none",
    eyewear: "none",
    outfit: "formal_shirt",
    primaryColor: "#ffffff", // Clean white shirt
    secondaryColor: "#cbd5e0",
    accentColor: "#1a202c", // Black bow/tie
    pantsColor: "#1a202c",
    shoesColor: "#1a202c",
  },

  // 15. Hasan - Determined humble village apprentice / shopkeeper
  hasan: {
    name: "hasan",
    displayName: "হাসান (Humble Determined Youth)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "crop",
    hairColor: "#171923",
    facialHair: "none",
    eyewear: "none",
    outfit: "lungi_shirt",
    primaryColor: "#0d9488", // Teal-green rural shirt
    secondaryColor: "#14b8a6",
    accentColor: "#15803d",
    pantsColor: "#1e3a8a", // Checkered blue lungi
    shoesColor: "#78350f", // Leather sandals
    hasGamcha: true,
    gamchaColor: "#15803d",
    lungiPattern: "checkered_blue",
  },

  // 16. Matobbor - Powerful village elder / shopkeeper in Tupi & Koti
  matobbor: {
    name: "matobbor",
    displayName: "মাতব্বর (Rashid Traders Owner / Village Elder)",
    skin: SKIN_PALETTES.tan,
    hairStyle: "elder",
    hairColor: "#1a202c",
    facialHair: "elder_beard",
    facialHairColor: "#1a202c",
    eyewear: "none",
    outfit: "tupi_koti",
    primaryColor: "#f8fafc", // White kurta & white trousers
    secondaryColor: "#cbd5e0",
    accentColor: "#14532d", // Dark green Koti / Waistcoat with gold buttons
    pantsColor: "#ffffff",
    shoesColor: "#78350f",
    hasTupi: true,
    tupiColor: "#ffffff",
  },

  // 17. Villager Female - Rural Bengali woman in traditional Saree
  villager_female: {
    name: "villager_female",
    displayName: "গ্রামীণ নারী (Village Woman in Saree)",
    skin: SKIN_PALETTES.wheatish,
    hairStyle: "long",
    hairColor: "#171923",
    facialHair: "none",
    eyewear: "none",
    outfit: "village_saree",
    primaryColor: "#b91c1c", // Red saree
    secondaryColor: "#15803d", // Green border / paad
    accentColor: "#f59e0b",
    pantsColor: "#b91c1c",
    shoesColor: "#78350f",
  },
};

// Deterministic string hash function
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const SKIN_KEYS: SkinToneKey[] = ["fair", "wheatish", "tan", "deep_brown", "bronze"];
const HAIR_STYLES: HairStyle[] = ["crop", "sidepart", "curls", "long", "crop", "sidepart"];
const HAIR_COLORS = ["#171923", "#271c19", "#32261f", "#1a202c", "#4a3319"];
const FACIAL_HAIRS: FacialHair[] = ["none", "none", "stubble", "stubble", "goatee", "mustache"];
const EYEWEAR_STYLES: Eyewear[] = ["none", "none", "square_black", "square_blue", "round_black", "round_gold"];
const OUTFIT_STYLES: OutfitStyle[] = ["formal_suit", "smart_blazer", "formal_shirt", "casual_hoodie", "polo_shirt", "sweater_vest", "panjabi_kurta"];

const OUTFIT_COLOR_PALETTES = [
  { primary: "#2b6cb0", secondary: "#ffffff", accent: "#c53030", pants: "#2d3748", shoes: "#1a202c" }, // Blue & Red
  { primary: "#8c532b", secondary: "#1a202c", accent: "#d69e2e", pants: "#1a202c", shoes: "#ffffff" }, // Tan blazer
  { primary: "#2d3748", secondary: "#edf2f7", accent: "#b7791f", pants: "#1a202c", shoes: "#000000" }, // Charcoal
  { primary: "#276749", secondary: "#ffffff", accent: "#ecc94b", pants: "#2d3748", shoes: "#1a202c" }, // Emerald green
  { primary: "#702459", secondary: "#f7fafc", accent: "#ed8936", pants: "#2d3748", shoes: "#1a202c" }, // Deep berry
  { primary: "#1a365d", secondary: "#e2e8f0", accent: "#9b2c2c", pants: "#1a365d", shoes: "#000000" }, // Navy
  { primary: "#c53030", secondary: "#ffffff", accent: "#2b6cb0", pants: "#1a202c", shoes: "#ffffff" }, // Crimson
  { primary: "#d69e2e", secondary: "#1a202c", accent: "#319795", pants: "#2d3748", shoes: "#ffffff" }, // Mustard
];

/**
 * Resolves a character configuration:
 * 1. Checks if it matches a preset (case-insensitive: "rafi", "nabil", "kamal", "father", etc.)
 * 2. If given a custom name (e.g. "sohel", "shakil", "video_story_1"), deterministically generates
 *    a unique, harmonious character based on the hash of the name.
 * 3. If "random" or undefined, generates a random character.
 */
/**
 * Parses user-provided natural language character descriptions (Bengali or English)
 * directly into procedural CharacterConfig parameters.
 */
export function parseCharacterDescription(desc: string): Partial<CharacterConfig> {
  const d = desc.toLowerCase();
  const result: Partial<CharacterConfig> = {};

  // 1. Age & Demographics
  if (d.includes("বৃদ্ধ") || d.includes("বয়স্ক") || d.includes("elder") || d.includes("old") || d.includes("দাদু") || d.includes("নানা")) {
    result.hairStyle = "elder";
    result.hairColor = "#f1f5f9";
    result.facialHair = "elder_beard";
    result.facialHairColor = "#e2e8f0";
  } else if (d.includes("শিশু") || d.includes("বাচ্চা") || d.includes("child") || d.includes("kid") || d.includes("boy") || d.includes("girl")) {
    result.hairStyle = "crop";
    result.facialHair = "none";
  } else if (d.includes("তরুণ") || d.includes("যুবক") || d.includes("young")) {
    result.hairStyle = "sidepart";
    result.facialHair = d.includes("দাড়ি") || d.includes("দাড়ি") || d.includes("beard") ? "stubble" : "none";
  }

  // 2. Attire / Outfit
  if (d.includes("টুপি") && d.includes("কটি") || d.includes("tupi_koti") || d.includes("waistcoat")) {
    result.outfit = "tupi_koti";
    result.hasTupi = true;
    result.tupiColor = "#ffffff";
  } else if (d.includes("লুঙ্গি") || d.includes("lungi")) {
    result.outfit = "lungi_shirt";
    result.hasGamcha = true;
    result.gamchaColor = d.includes("লাল") ? "#dc2626" : "#22c55e";
  } else if (d.includes("শাড়ি") || d.includes("শাড়ি") || d.includes("saree")) {
    result.outfit = "village_saree";
    result.hairStyle = "long";
  } else if (d.includes("হিজাব") || d.includes("hijab")) {
    result.hairStyle = "hijab";
    result.facialHair = "none";
  } else if (d.includes("পাঞ্জাবি") || d.includes("panjabi") || d.includes("kurta")) {
    result.outfit = "panjabi_kurta";
  } else if (d.includes("ব্লেজার") || d.includes("কোট") || d.includes("suit") || d.includes("blazer")) {
    result.outfit = "smart_blazer";
  } else if (d.includes("হুডি") || d.includes("hoodie")) {
    result.outfit = "casual_hoodie";
  } else if (d.includes("টি-শার্ট") || d.includes("পোলো") || d.includes("polo")) {
    result.outfit = "polo_shirt";
  } else if (d.includes("শার্ট") || d.includes("shirt")) {
    result.outfit = "formal_shirt";
  }

  // 3. Headwear & Accessories
  if (d.includes("টুপি") || d.includes("tupi") || d.includes("cap")) {
    result.hasTupi = true;
    result.tupiColor = "#ffffff";
  }
  if (d.includes("গামছা") || d.includes("gamcha")) {
    result.hasGamcha = true;
  }
  if (d.includes("চশমা") || d.includes("glasses") || d.includes("spectacles")) {
    result.eyewear = d.includes("গোল") || d.includes("gold") ? "round_gold" : "square_black";
  }

  // 4. Facial Hair specifics
  if (d.includes("দাড়ি") || d.includes("দাড়ি") || d.includes("beard")) {
    if (!result.facialHair || result.facialHair === "none") {
      result.facialHair = d.includes("পাকা") || d.includes("সাদা") ? "elder_beard" : "goatee";
    }
  } else if (d.includes("গোঁফ") || d.includes("mustache")) {
    result.facialHair = "mustache";
  }

  // 5. Colors
  if (d.includes("সাদা") || d.includes("white")) {
    result.primaryColor = "#f8fafc";
  } else if (d.includes("কালো") || d.includes("black")) {
    result.primaryColor = "#1e293b";
  } else if (d.includes("নীল") || d.includes("blue")) {
    result.primaryColor = "#1d4ed8";
  } else if (d.includes("সবুজ") || d.includes("green")) {
    result.primaryColor = "#15803d";
  } else if (d.includes("লাল") || d.includes("red")) {
    result.primaryColor = "#b91c1c";
  } else if (d.includes("হলুদ") || d.includes("yellow")) {
    result.primaryColor = "#d97706";
  } else if (d.includes("মেরুন") || d.includes("maroon")) {
    result.primaryColor = "#881337";
  }

  return result;
}

export function getCharacterConfig(nameOrSeed?: string, overrides?: Partial<CharacterConfig>): CharacterConfig {
  const normalized = (nameOrSeed || "").trim().toLowerCase();

  // 1. Direct or partial preset matches
  if (normalized) {
    if (normalized.includes("ম্যানেজার") || (normalized.includes("rakib") && normalized.includes("manager"))) {
      const base = { ...CHARACTER_PRESETS.rakib_manager };
      return overrides ? { ...base, ...overrides } : base;
    }
    if (normalized.includes("রাকিব") || normalized === "rakib") {
      const base = { ...CHARACTER_PRESETS.rakib };
      return overrides ? { ...base, ...overrides } : base;
    }
    if (normalized.includes("সুমন") || normalized === "sumon") {
      const base = { ...CHARACTER_PRESETS.sumon };
      return overrides ? { ...base, ...overrides } : base;
    }
    if (normalized.includes("মালিক") || normalized.includes("owner") || normalized.includes("চেয়ারম্যান")) {
      const base = { ...CHARACTER_PRESETS.owner };
      return overrides ? { ...base, ...overrides } : base;
    }
    if (CHARACTER_PRESETS[normalized]) {
      const base = { ...CHARACTER_PRESETS[normalized] };
      return overrides ? { ...base, ...overrides } : base;
    }
  }

  // Check if nameOrSeed contains descriptive text keywords
  const descOverrides = parseCharacterDescription(nameOrSeed || "");

  // Seed generation
  const seedString = normalized && normalized !== "random" && normalized !== "auto"
    ? normalized
    : `char-${Math.floor(Math.random() * 100000)}`;

  const hash = simpleHash(seedString);

  const skinKey = SKIN_KEYS[hash % SKIN_KEYS.length];
  const hairStyle = HAIR_STYLES[(hash >> 2) % HAIR_STYLES.length];
  const hairColor = HAIR_COLORS[(hash >> 4) % HAIR_COLORS.length];
  const facialHair = hairStyle === "long" ? "none" : FACIAL_HAIRS[(hash >> 6) % FACIAL_HAIRS.length];
  const eyewear = EYEWEAR_STYLES[(hash >> 8) % EYEWEAR_STYLES.length];
  const outfit = hairStyle === "long" && (hash % 2 === 0) ? "smart_blazer" : OUTFIT_STYLES[(hash >> 10) % OUTFIT_STYLES.length];
  const palette = OUTFIT_COLOR_PALETTES[(hash >> 12) % OUTFIT_COLOR_PALETTES.length];

  const generated: CharacterConfig = {
    name: normalized || "custom",
    displayName: normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : "Auto Character",
    skin: SKIN_PALETTES[skinKey],
    hairStyle,
    hairColor,
    facialHair,
    eyewear,
    outfit,
    primaryColor: palette.primary,
    secondaryColor: palette.secondary,
    accentColor: palette.accent,
    pantsColor: palette.pants,
    shoesColor: palette.shoes,
    earrings: hairStyle === "long" && (hash % 3 === 0),
    hasShawl: outfit === "panjabi_kurta" && (hash % 2 === 0),
    shawlColor: palette.accent,
    ...descOverrides,
  };

  if (overrides) {
    return { ...generated, ...overrides };
  }

  return generated;
}

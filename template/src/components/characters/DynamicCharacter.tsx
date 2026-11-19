import React from "react";
import { useCurrentFrame } from "remotion";
import {
  CharacterConfig,
  CharacterPose,
  getCharacterConfig,
} from "./characterPresets";

export interface DynamicCharacterProps {
  /**
   * Character preset name (e.g. "nabil", "rafi", "hasan", "matobbor", "chacha", "tanvir")
   * or any custom name/seed which auto-generates a unique deterministic character,
   * or "random" / undefined for randomized character.
   */
  character?: string | CharacterConfig;
  pose?: CharacterPose;
  scale?: number;
  flip?: boolean;
  overrides?: Partial<CharacterConfig>;
  metaphor?: "inner_rage" | "inner_power" | "none";
  rackFocus?: boolean;
  tremble?: boolean;
  /** Explicitly controls whether character is actively speaking (moving mouth) or listening (closed mouth) */
  isSpeaking?: boolean;
  /** Explicitly indicates character is seated behind an office desk */
  isSeated?: boolean;
}

export const DynamicCharacter: React.FC<DynamicCharacterProps> = ({
  character = "random",
  pose = "standing",
  scale = 1.0,
  flip = false,
  overrides,
  metaphor = "none",
  rackFocus = false,
  tremble = false,
  isSpeaking,
  isSeated,
}) => {
  const frame = useCurrentFrame();

  const config: CharacterConfig =
    typeof character === "string"
      ? getCharacterConfig(character, overrides)
      : { ...character, ...overrides };

  // Anchored breathing / motion engine:
  // 1. Seated characters MUST be 100% stationary (0px bounce) - pelvis is anchored to chair/stool/desk!
  // 2. Walking characters have a physical step bounce (foot strike vs passing leg lift)
  // 3. Standing idle characters have a micro-subtle drift (0.8px @ 0.04fps), NOT a distracting bounce
  const isCharacterSeated =
    isSeated ||
    pose === "sitting_desk" ||
    pose === "using_computer" ||
    pose === "sitting_stool" ||
    pose === "writing_pen";

  const isWalking = pose === "walking" || pose === "walking_phone";
  const walkBob = isWalking ? Math.abs(Math.sin(frame * 0.28)) * 4.5 : 0;
  const breathY = isCharacterSeated ? 0 : isWalking ? -walkBob : Math.sin(frame * 0.04) * 0.8;

  // Jitter / Tremble for intense emotions (rage, fear, panic, shock) - STRICT 1.0s max decay!
  // Rule: Never vibrate or tremble continuously across an entire 15-30s scene (causes extreme viewer fatigue).
  const isTrembleTriggered = tremble || pose === "tremble" || (pose === "shouting" && metaphor === "inner_rage");
  const maxTrembleFrames = 36; // Max 1.2s at 30fps
  const trembleDecay = isTrembleTriggered && frame < maxTrembleFrames ? Math.max(0, 1 - frame / maxTrembleFrames) : 0;
  const trembleX = trembleDecay > 0 ? Math.sin(frame * 2.2) * 3.5 * trembleDecay : 0;

  // Blinking: every 85 frames, eyes close for 4 frames
  const blinkCycle = frame % 85;
  const isBlinking = blinkCycle > 81 && blinkCycle <= 85;
  const eyeScaleY = isBlinking ? 0.12 : 1.0;

  const isSad = pose === "sad" || pose === "box";
  const isThinking = pose === "thinking";
  const isCheckingKhata = pose === "checking_khata";
  const isSearching = pose === "searching_inventory";
  const isTyping = pose === "using_computer" || pose === "sitting_desk";
  const isReadingDoc = pose === "reading_document";

  // Reactive Eye Gaze based on Action Activity:
  // - Reading ledger / typing computer / reading file: eyes look DOWN
  // - Searching shelves: eyes look UP at the clothes rack
  // - Thinking: eyes look sideways-up
  const pupilY = isCheckingKhata || isTyping || isReadingDoc ? 171 : isSearching ? 159 : isThinking ? 162 : 165;
  const pupilXOffset = isCheckingKhata || isTyping || isReadingDoc ? 0 : isSearching ? 2 : isThinking ? -2 : 1;

  // Talking mouth animation:
  // ONLY animate mouth if the character is actively speaking!
  // When listening or idle, mouth stays closed in a calm resting line.
  const shouldSpeak =
    isSpeaking !== undefined
      ? isSpeaking && !isSad && !isThinking && !isTyping
      : (pose === "talking" || pose === "explaining" || pose === "shouting" || pose === "pointing");

  const mouthCycle = shouldSpeak ? Math.floor((frame % 9) / 3) : 0; // 0, 1, 2
  const mouthOpen = shouldSpeak
    ? (mouthCycle === 0 ? 3 : mouthCycle === 1 ? 7 : 12)
    : 0;

  const {
    skin,
    hairStyle,
    hairColor,
    facialHair,
    facialHairColor = hairColor,
    eyewear,
    outfit,
    primaryColor,
    secondaryColor,
    accentColor,
    pantsColor,
    shoesColor,
    hasShawl,
    shawlColor = accentColor,
    earrings,
    hasGamcha,
    gamchaColor = accentColor,
    hasTupi,
    tupiColor = "#ffffff",
  } = config;

  return (
    <div
      style={{
        transform: `scale(${scale}) ${flip ? "scaleX(-1)" : ""} translateY(${breathY}px) translateX(${trembleX}px)`,
        transformOrigin: "bottom center",
        width: 320,
        height: 600,
        position: "relative",
        filter: rackFocus ? "blur(10px) brightness(0.85)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 320 600"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`shadowGrad-${config.name}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* --- Visual Metaphors (Inspired by Reference Video) --- */}

        {/* A. Inner Rage Red Spirit Shadow (Suppressed Anger) */}
        {metaphor === "inner_rage" && (
          <g
            opacity={0.65}
            transform="translate(-24, -16) scale(1.06)"
            filter="drop-shadow(0 0 16px rgba(239, 68, 68, 0.9))"
          >
            <ellipse cx="160" cy="165" rx="54" ry="64" fill="#ef4444" />
            <path d="M 95 240 L 225 240 L 210 420 L 110 420 Z" fill="#ef4444" />
            {/* Angry vein anime marker 💢 */}
            <path
              d="M 180 120 L 195 120 M 187 112 L 187 128"
              stroke="#b91c1c"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* B. Golden Astral Silhouette (Inner Latent Greatness / Giant Future Power) */}
        {metaphor === "inner_power" && (
          <g
            opacity={0.85}
            transform="translate(-44.8, -90) scale(1.28)"
            filter="drop-shadow(0 0 40px rgba(250, 204, 21, 0.95))"
          >
            {/* Halo ring */}
            <circle cx="160" cy="165" r="85" fill="none" stroke="#fef08a" strokeWidth="4" strokeDasharray="14 8" opacity="0.75" />
            {/* Astral Head */}
            <ellipse cx="160" cy="165" rx="56" ry="66" fill="#facc15" />
            {/* Astral Crown/Sparks */}
            <polygon points="144,100 160,78 176,100 168,94 160,105 152,94" fill="#fef08a" />
            {/* Astral Torso with heroic broad shoulders */}
            <path d="M 72 235 Q 160 210 248 235 L 230 460 L 90 460 Z" fill="#eab308" />
          </g>
        )}

        {/* 1. Ground Shadow */}
        <ellipse cx="160" cy="580" rx="95" ry="16" fill={`url(#shadowGrad-${config.name})`} />

        {/* 1.1 Seated Ergonomic Office Chair Back (Behind character when at desk) */}
        {(isSeated || pose === "using_computer" || pose === "sitting_desk") && (
          <g opacity={0.95}>
            {/* High-back Ergonomic Headrest */}
            <rect x="110" y="80" width="100" height="42" rx="14" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
            <rect x="125" y="88" width="70" height="26" rx="8" fill="#334155" />
            {/* Spine Neck Support */}
            <rect x="150" y="122" width="20" height="50" fill="#0f172a" />
            {/* Contoured Mesh Chair Backrest */}
            <path
              d="M 72 175 Q 160 155 248 175 L 254 390 Q 160 410 66 390 Z"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="4"
            />
            {/* Breathable Lumbar Mesh Contours */}
            <path d="M 88 220 Q 160 210 232 220" stroke="#334155" strokeWidth="3.5" fill="none" />
            <path d="M 86 260 Q 160 250 234 260" stroke="#334155" strokeWidth="3.5" fill="none" />
            <path d="M 84 300 Q 160 290 236 300" stroke="#334155" strokeWidth="3.5" fill="none" />
            <path d="M 82 340 Q 160 330 238 340" stroke="#334155" strokeWidth="3.5" fill="none" />
            {/* Padded Armrests */}
            <rect x="58" y="300" width="22" height="75" rx="8" fill="#0f172a" />
            <rect x="240" y="300" width="22" height="75" rx="8" fill="#0f172a" />
          </g>
        )}

        {/* 1.2 Rustic Wooden Stool/Bench (Behind character when at tea stall or village) */}
        {pose === "sitting_stool" && (
          <g>
            {/* Wooden Stool Top Plank */}
            <rect x="70" y="440" width="180" height="22" rx="4" fill="#92400e" stroke="#78350f" strokeWidth="3" />
            <line x1="80" y1="450" x2="240" y2="450" stroke="#b45309" strokeWidth="2" />
            {/* Wooden Legs angled down */}
            <line x1="85" y1="462" x2="70" y2="580" stroke="#78350f" strokeWidth="10" strokeLinecap="round" />
            <line x1="235" y1="462" x2="250" y2="580" stroke="#78350f" strokeWidth="10" strokeLinecap="round" />
            <line x1="120" y1="462" x2="110" y2="580" stroke="#92400e" strokeWidth="8" strokeLinecap="round" />
            <line x1="200" y1="462" x2="210" y2="580" stroke="#92400e" strokeWidth="8" strokeLinecap="round" />
            {/* Support Crossbar */}
            <line x1="78" y1="520" x2="242" y2="520" stroke="#78350f" strokeWidth="5" />
          </g>
        )}

        {/* 2. Lower Body (Legs & Shoes / Lungi) */}
        {renderLowerBody(outfit, pantsColor, shoesColor, pose, frame)}

        {/* 3. Upper Body / Torso (Outfit) */}
        {renderTorso(outfit, primaryColor, secondaryColor, accentColor, hasShawl, shawlColor, hasGamcha, gamchaColor)}

        {/* 4. Arms according to pose & action activities */}
        {renderArms(pose, outfit, primaryColor, secondaryColor, skin.base, frame)}

        {/* 5. Neck */}
        <rect x="146" y="215" width="28" height="36" rx="6" fill={skin.base} />
        {/* Neck shadow */}
        <path d="M 146 242 Q 160 252 174 242 L 174 250 L 146 250 Z" fill={skin.shadow} opacity="0.6" />

        {/* 6. Head base */}
        <ellipse cx="160" cy="165" rx="52" ry="62" fill={skin.base} />

        {/* 7. Ears & optional earrings */}
        <ellipse cx="108" cy="170" rx="9" ry="14" fill={skin.base} stroke={skin.shadow} strokeWidth="1.5" />
        <ellipse cx="212" cy="170" rx="9" ry="14" fill={skin.base} stroke={skin.shadow} strokeWidth="1.5" />
        {earrings && (
          <>
            <circle cx="108" cy="184" r="3.5" fill="#ecc94b" stroke="#b7791f" strokeWidth="1" />
            <circle cx="212" cy="184" r="3.5" fill="#ecc94b" stroke="#b7791f" strokeWidth="1" />
          </>
        )}

        {/* 8. Hair (Back/Base) */}
        {renderHair(hairStyle, hairColor, primaryColor)}

        {/* 8.1 Islamic Tupi (Cap) if enabled */}
        {hasTupi && (
          <g>
            <ellipse cx="160" cy="118" rx="46" ry="18" fill={tupiColor} stroke="#cbd5e0" strokeWidth="2" />
            <path d="M 116 118 Q 160 100 204 118" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
            {/* Subtle embroidery pattern */}
            <circle cx="160" cy="112" r="3" fill="#cbd5e0" />
            <circle cx="145" cy="114" r="2.5" fill="#cbd5e0" />
            <circle cx="175" cy="114" r="2.5" fill="#cbd5e0" />
          </g>
        )}

        {/* 9. Eyes (with blinking & pupils reacting to action) */}
        <g transform={`scale(1, ${eyeScaleY})`} style={{ transformOrigin: "160px 165px" }}>
          {/* Left Eye */}
          <ellipse cx="140" cy="165" rx="10.5" ry="12.5" fill="#ffffff" stroke="#2d3748" strokeWidth="1.8" />
          <circle cx={140 + pupilXOffset} cy={pupilY} r="5.5" fill="#1a202c" />
          <circle cx={142 + pupilXOffset} cy={pupilY - 2} r="2" fill="#ffffff" />

          {/* Right Eye */}
          <ellipse cx="180" cy="165" rx="10.5" ry="12.5" fill="#ffffff" stroke="#2d3748" strokeWidth="1.8" />
          <circle cx={180 + pupilXOffset} cy={pupilY} r="5.5" fill="#1a202c" />
          <circle cx={182 + pupilXOffset} cy={pupilY - 2} r="2" fill="#ffffff" />
        </g>

        {/* 10. Eyebrows (Mood & Action reactive) */}
        {renderEyebrows(isSad, isThinking, isSearching, hairColor)}

        {/* 11. Eyewear */}
        {renderEyewear(eyewear)}

        {/* 12. Nose */}
        <path d="M 160 165 Q 164 175 158 178 L 163 178" stroke={skin.shadow} strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* 13. Facial Hair (Mustache / Beard / Stubble) */}
        {renderFacialHair(facialHair, facialHairColor, skin.shadow)}

        {/* 14. Mouth (Animated Talking / Frowning / Closed Listening) */}
        {renderMouth(isSad, isThinking, shouldSpeak, mouthOpen, skin.lip)}

        {/* 15. Action Overlays (Magnifying glass, Empty shelf badge - rendered on top) */}
        {renderActionOverlays(pose, frame)}
      </svg>
    </div>
  );
};

// --- Sub-renderers ---

function renderLowerBody(
  outfit: string,
  pantsColor: string,
  shoesColor: string,
  pose?: CharacterPose,
  frame: number = 0
) {
  const isWalking = pose === "walking" || pose === "walking_phone";

  // 1. Traditional Checkered Bengali Lungi
  if (outfit === "lungi_shirt") {
    const lungiSwing = isWalking ? Math.sin(frame * 0.28) * 8 : 0;
    return (
      <g transform={`skewX(${lungiSwing})`}>
        {/* Lungi Fabric */}
        <path
          d="M 104 380 L 216 380 L 226 545 L 94 545 Z"
          fill={pantsColor || "#1e3a8a"}
          stroke="#1e293b"
          strokeWidth="2.5"
        />
        {/* Lungi Grid / Checkered Weave */}
        <line x1="97" y1="415" x2="223" y2="415" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
        <line x1="96" y1="455" x2="224" y2="455" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
        <line x1="95" y1="495" x2="225" y2="495" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
        <line x1="126" y1="380" x2="122" y2="545" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
        <line x1="160" y1="380" x2="160" y2="545" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
        <line x1="194" y1="380" x2="198" y2="545" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />

        {/* Ankles & Traditional Leather Sandals (Chappals) */}
        <rect x="120" y="545" width="22" height="24" rx="4" fill="#df9b6d" />
        <rect x="178" y="545" width="22" height="24" rx="4" fill="#df9b6d" />
        <ellipse cx="131" cy="570" rx="20" ry="8" fill={shoesColor || "#78350f"} />
        <ellipse cx="189" cy="570" rx="20" ry="8" fill={shoesColor || "#78350f"} />
        <path d="M 120 568 Q 131 559 142 568" stroke="#451a03" strokeWidth="4" fill="none" />
        <path d="M 178 568 Q 189 559 200 568" stroke="#451a03" strokeWidth="4" fill="none" />
      </g>
    );
  }

  // 2. Village Saree Lower Drape
  if (outfit === "village_saree") {
    return (
      <>
        <path
          d="M 100 375 L 220 375 L 228 555 L 92 555 Z"
          fill={pantsColor || "#b91c1c"}
          stroke="#991b1b"
          strokeWidth="2.5"
        />
        {/* Saree pleats & border */}
        <line x1="160" y1="375" x2="160" y2="555" stroke="#f59e0b" strokeWidth="3" />
        <line x1="92" y1="550" x2="228" y2="550" stroke="#f59e0b" strokeWidth="5" />
        <ellipse cx="132" cy="570" rx="18" ry="8" fill="#78350f" />
        <ellipse cx="188" cy="570" rx="18" ry="8" fill="#78350f" />
      </>
    );
  }

  const isPajama = outfit === "panjabi_kurta" || outfit === "tupi_koti";

  // 3. Dynamic Walking Strides (Skeletal leg swing from hip joints)
  if (isWalking) {
    const walkPhase = frame * 0.28;
    const leftLegAngle = Math.sin(walkPhase) * 20;
    const rightLegAngle = -Math.sin(walkPhase) * 20;

    return (
      <g>
        {/* Left Leg swinging from hip joint (137, 385) */}
        <g transform={`rotate(${leftLegAngle}, 137, 385)`}>
          <rect
            x="120"
            y="380"
            width="35"
            height="190"
            rx="10"
            fill={pantsColor}
            stroke={isPajama ? "#cbd5e0" : "#1a202c"}
            strokeWidth={isPajama ? 1.5 : 2}
          />
          <ellipse cx="132" cy="570" rx="22" ry="10" fill={shoesColor} />
          {shoesColor === "#ffffff" && (
            <path d="M 112 574 L 152 574" stroke="#a0aec0" strokeWidth="2" />
          )}
        </g>

        {/* Right Leg swinging from hip joint (182, 385) */}
        <g transform={`rotate(${rightLegAngle}, 182, 385)`}>
          <rect
            x="165"
            y="380"
            width="35"
            height="190"
            rx="10"
            fill={pantsColor}
            stroke={isPajama ? "#cbd5e0" : "#1a202c"}
            strokeWidth={isPajama ? 1.5 : 2}
          />
          <ellipse cx="188" cy="570" rx="22" ry="10" fill={shoesColor} />
          {shoesColor === "#ffffff" && (
            <path d="M 168 574 L 208 574" stroke="#a0aec0" strokeWidth="2" />
          )}
        </g>
      </g>
    );
  }

  return (
    <>
      {/* Legs / Trousers / Pajama */}
      <rect
        x="120"
        y="380"
        width="35"
        height="190"
        rx="10"
        fill={pantsColor}
        stroke={isPajama ? "#cbd5e0" : "#1a202c"}
        strokeWidth={isPajama ? 1.5 : 2}
      />
      <rect
        x="165"
        y="380"
        width="35"
        height="190"
        rx="10"
        fill={pantsColor}
        stroke={isPajama ? "#cbd5e0" : "#1a202c"}
        strokeWidth={isPajama ? 1.5 : 2}
      />
      {/* Shoes / Slippers / Sneakers */}
      <ellipse cx="132" cy="570" rx="22" ry="10" fill={shoesColor} />
      <ellipse cx="188" cy="570" rx="22" ry="10" fill={shoesColor} />
      {/* Sneaker sole trim */}
      {shoesColor === "#ffffff" && (
        <>
          <path d="M 112 574 L 152 574" stroke="#a0aec0" strokeWidth="2" />
          <path d="M 168 574 L 208 574" stroke="#a0aec0" strokeWidth="2" />
        </>
      )}
    </>
  );
}

function renderTorso(
  outfit: string,
  primaryColor: string,
  secondaryColor: string,
  accentColor: string,
  hasShawl?: boolean,
  shawlColor?: string,
  hasGamcha?: boolean,
  gamchaColor?: string
) {
  switch (outfit) {
    case "lungi_shirt": // Hasan / Village youth
      return (
        <>
          <path d="M 98 240 L 222 240 L 216 395 L 104 395 Z" fill={primaryColor} stroke="#0f766e" strokeWidth="2.5" />
          {/* Shirt button placket */}
          <line x1="160" y1="240" x2="160" y2="350" stroke="#042f2e" strokeWidth="3" />
          <circle cx="160" cy="265" r="2.5" fill="#f8fafc" />
          <circle cx="160" cy="295" r="2.5" fill="#f8fafc" />
          <circle cx="160" cy="325" r="2.5" fill="#f8fafc" />
          {/* Traditional Gamcha on shoulder */}
          {hasGamcha && (
            <g>
              <path
                d="M 100 240 Q 112 300 116 380 L 132 378 Q 126 300 118 240 Z"
                fill={gamchaColor || "#15803d"}
                stroke="#14532d"
                strokeWidth="1.5"
              />
              <line x1="102" y1="290" x2="130" y2="290" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              <line x1="106" y1="330" x2="128" y2="330" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            </g>
          )}
        </>
      );

    case "tupi_koti": // Matobbor / Elder in dark green Koti
      return (
        <>
          {/* Under White Kurta */}
          <path d="M 95 240 L 225 240 L 220 425 L 100 425 Z" fill={primaryColor || "#ffffff"} stroke="#cbd5e0" strokeWidth="2" />
          {/* Dark Waistcoat (Koti) */}
          <path d="M 98 240 L 140 240 L 145 390 L 98 390 Z" fill={accentColor || "#14532d"} stroke="#052e16" strokeWidth="2" />
          <path d="M 222 240 L 180 240 L 175 390 L 222 390 Z" fill={accentColor || "#14532d"} stroke="#052e16" strokeWidth="2" />
          {/* Koti Center button placket with gold buttons */}
          <line x1="160" y1="240" x2="160" y2="385" stroke="#cbd5e0" strokeWidth="2" />
          <circle cx="148" cy="275" r="3.5" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="148" cy="305" r="3.5" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="148" cy="335" r="3.5" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="148" cy="365" r="3.5" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
        </>
      );

    case "village_saree": // Rural Bengali Woman
      return (
        <>
          {/* Blouse & Saree Drape */}
          <path d="M 100 240 L 220 240 L 215 385 L 105 385 Z" fill={primaryColor || "#b91c1c"} />
          {/* Pallu crossing diagonally */}
          <polygon points="100,240 135,240 220,380 185,385" fill={secondaryColor || "#15803d"} stroke="#f59e0b" strokeWidth="2" />
        </>
      );

    case "smart_blazer": // Blazer open over inner crewneck/shirt (Nabil style)
      return (
        <>
          {/* Inner Shirt */}
          <path d="M 120 240 L 200 240 L 195 390 L 125 390 Z" fill={secondaryColor} />
          {/* Inner Shirt Collar */}
          <ellipse cx="160" cy="245" rx="22" ry="8" fill="#1a202c" opacity="0.4" />
          {/* Outer Blazer Sides */}
          <path d="M 95 240 L 140 240 L 130 395 L 95 395 Z" fill={primaryColor} stroke="#1a202c" strokeWidth="2" />
          <path d="M 225 240 L 180 240 L 190 395 L 225 395 Z" fill={primaryColor} stroke="#1a202c" strokeWidth="2" />
          {/* Lapels */}
          <polygon points="95,240 135,270 125,320 100,290" fill={primaryColor} stroke="#2d3748" strokeWidth="2" />
          <polygon points="225,240 185,270 195,320 220,290" fill={primaryColor} stroke="#2d3748" strokeWidth="2" />
          {/* Pocket handkerchief / accent */}
          <rect x="110" y="300" width="18" height="3" fill={accentColor} rx="1" />
        </>
      );

    case "formal_suit": // Kamal / Boss style
      return (
        <>
          <path d="M 90 235 L 250 235 L 240 395 L 100 395 Z" fill={primaryColor} stroke="#1a202c" strokeWidth="3" />
          {/* Shirt V */}
          <polygon points="148,235 170,305 192,235" fill={secondaryColor} />
          {/* Silk Tie */}
          <polygon points="166,238 174,238 177,340 170,358 163,340" fill={accentColor} />
          {/* Lapels */}
          <polygon points="90,235 140,235 160,330 135,330" fill={primaryColor} stroke="#1a202c" strokeWidth="1.5" />
          <polygon points="250,235 200,235 180,330 205,330" fill={primaryColor} stroke="#1a202c" strokeWidth="1.5" />
        </>
      );

    case "panjabi_kurta": // Father / Traditional elder
      return (
        <>
          <path d="M 95 240 L 225 240 L 220 425 L 100 425 Z" fill={primaryColor} stroke={secondaryColor} strokeWidth="3" />
          {/* Front placket and buttons */}
          <line x1="160" y1="240" x2="160" y2="330" stroke="#cbd5e0" strokeWidth="3" />
          <circle cx="160" cy="260" r="3" fill="#a0aec0" />
          <circle cx="160" cy="285" r="3" fill="#a0aec0" />
          <circle cx="160" cy="310" r="3" fill="#a0aec0" />
          {/* Traditional Shawl if enabled */}
          {hasShawl && (
            <path
              d="M 95 240 Q 160 270 225 240 Q 230 365 170 385 Q 105 365 95 240 Z"
              fill={shawlColor}
              opacity="0.92"
            />
          )}
        </>
      );

    case "casual_hoodie": // Tanvir / Tech style
      return (
        <>
          {/* Main Hoodie Torso */}
          <path d="M 95 240 L 225 240 L 220 395 L 100 395 Z" fill={primaryColor} stroke="#1a202c" strokeWidth="2.5" />
          {/* Kangaroo Pocket */}
          <path d="M 120 325 L 200 325 L 195 385 L 125 385 Z" fill={primaryColor} stroke="#1a202c" strokeWidth="2" />
          {/* Drawstring strings */}
          <line x1="152" y1="250" x2="152" y2="300" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <line x1="168" y1="250" x2="168" y2="300" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          {/* Hood cowl neck */}
          <ellipse cx="160" cy="245" rx="36" ry="12" fill={primaryColor} stroke="#1a202c" strokeWidth="2" />
        </>
      );

    case "polo_shirt": // Modern showroom owner polo (Jamal)
      return (
        <>
          {/* Main Polo Shirt Torso */}
          <path
            d="M 100 240 L 220 240 L 210 390 L 110 390 Z"
            fill={primaryColor}
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          {/* Center Button Placket */}
          <rect x="156" y="240" width="8" height="58" rx="3" fill="#0f172a" opacity="0.3" />
          {/* 3 Pearl Buttons */}
          <circle cx="160" cy="249" r="2.2" fill="#ffffff" />
          <circle cx="160" cy="265" r="2.2" fill="#ffffff" />
          <circle cx="160" cy="281" r="2.2" fill="#ffffff" />
          {/* Crisp Ribbed Polo Collar Flaps */}
          <polygon points="135,240 156,262 153,240" fill={accentColor || primaryColor} stroke="#0f172a" strokeWidth="2" />
          <polygon points="185,240 164,262 167,240" fill={accentColor || primaryColor} stroke="#0f172a" strokeWidth="2" />
          {/* Small chest pocket with pen */}
          <rect x="180" y="275" width="22" height="24" rx="2" fill="none" stroke="#0f172a" strokeWidth="1.5" opacity="0.6" />
          <line x1="187" y1="268" x2="187" y2="280" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        </>
      );

    case "sweater_vest": // Professor / Academic
      return (
        <>
          {/* Under shirt */}
          <path d="M 98 240 L 222 240 L 215 390 L 105 390 Z" fill={secondaryColor} stroke="#cbd5e0" strokeWidth="2" />
          {/* Sweater vest */}
          <path d="M 105 240 L 140 240 L 160 280 L 180 240 L 215 240 L 210 390 L 110 390 Z" fill={primaryColor} stroke="#1a202c" strokeWidth="2" />
          {/* Tie inside V */}
          <polygon points="156,250 164,250 166,320 160,335 154,320" fill={accentColor} />
        </>
      );

    case "formal_shirt": // Rafi style
    default:
      return (
        <>
          <path d="M 100 240 L 220 240 L 210 390 L 110 390 Z" fill={primaryColor} stroke={secondaryColor} strokeWidth="3" />
          {/* Tie */}
          <polygon points="154,245 166,245 170,340 160,360 150,340" fill={accentColor} />
          {/* Collar */}
          <polygon points="140,240 160,265 155,240" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" />
          <polygon points="180,240 160,265 165,240" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" />
        </>
      );
  }
}

function renderArms(
  pose: CharacterPose,
  outfit: string,
  primaryColor: string,
  secondaryColor: string,
  skinBase: string,
  frame: number = 0
) {
  const sleeveColor =
    outfit === "smart_blazer" ||
    outfit === "formal_suit" ||
    outfit === "casual_hoodie" ||
    outfit === "polo_shirt" ||
    outfit === "sweater_vest"
      ? primaryColor
      : secondaryColor;

  // Action Activity: Walking Arm Swings (Natural Contralateral Motion)
  if (pose === "walking") {
    const walkPhase = frame * 0.28;
    // Left arm swings counter to left leg (-sin(walkPhase))
    const leftArmAngle = -Math.sin(walkPhase) * 22;
    // Right arm swings with left leg (+sin(walkPhase))
    const rightArmAngle = Math.sin(walkPhase) * 22;

    return (
      <g>
        {/* Left Arm swinging from shoulder (105, 245) */}
        <g transform={`rotate(${leftArmAngle}, 105, 245)`}>
          <path d="M 105 245 L 90 340" stroke="#0f172a" strokeWidth="26" strokeLinecap="round" fill="none" />
          <path d="M 105 245 L 90 340" stroke={sleeveColor} strokeWidth="20" strokeLinecap="round" fill="none" />
          <ellipse cx="88" cy="350" rx="13" ry="11" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
        </g>

        {/* Right Arm swinging from shoulder (215, 245) */}
        <g transform={`rotate(${rightArmAngle}, 215, 245)`}>
          <path d="M 215 245 L 230 340" stroke="#0f172a" strokeWidth="26" strokeLinecap="round" fill="none" />
          <path d="M 215 245 L 230 340" stroke={sleeveColor} strokeWidth="20" strokeLinecap="round" fill="none" />
          <ellipse cx="232" cy="350" rx="13" ry="11" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
        </g>
      </g>
    );
  }

  // Action Activity: Walking while checking phone
  if (pose === "walking_phone") {
    const walkPhase = frame * 0.28;
    const leftArmAngle = -Math.sin(walkPhase) * 20;

    return (
      <g>
        {/* Left Arm swinging naturally from shoulder (105, 245) */}
        <g transform={`rotate(${leftArmAngle}, 105, 245)`}>
          <path d="M 105 245 L 90 340" stroke="#0f172a" strokeWidth="26" strokeLinecap="round" fill="none" />
          <path d="M 105 245 L 90 340" stroke={sleeveColor} strokeWidth="20" strokeLinecap="round" fill="none" />
          <ellipse cx="88" cy="350" rx="13" ry="11" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
        </g>

        {/* Right Arm bent holding phone in front of chest */}
        <path d="M 215 245 Q 225 310 180 300" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 215 245 Q 225 310 180 300" stroke={sleeveColor} strokeWidth="20" strokeLinecap="round" fill="none" />
        <ellipse cx="175" cy="298" rx="14" ry="12" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
        {/* Smartphone held in hand */}
        <g transform="translate(160, 270) rotate(-10)">
          <rect x="0" y="0" width="22" height="38" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
          <rect x="2" y="3" width="18" height="30" rx="2" fill="#38bdf8" opacity="0.9" />
        </g>
      </g>
    );
  }

  // Action Activity 1: Checking traditional Bengali red cloth-bound ledger (লাল খাতা)
  if (pose === "checking_khata") {
    return (
      <>
        {/* Left and Right arms holding the ledger book up with clean dark borders */}
        <path d="M 105 250 Q 115 315 145 320" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 105 250 Q 115 315 145 320" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />

        <path d="M 215 250 Q 205 315 175 320" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 215 250 Q 205 315 175 320" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />

        {/* Traditional Red Bengali Ledger (লাল খাতা) */}
        <g transform="translate(108, 275)">
          {/* Red Book Spine & Outer Binding */}
          <rect x="0" y="0" width="104" height="74" rx="6" fill="#991b1b" stroke="#450a0a" strokeWidth="3" />
          {/* Gold Bookmark Ribbon */}
          <path d="M 52 0 L 52 78 L 47 70 L 52 78 L 57 70" stroke="#f59e0b" strokeWidth="3" fill="#f59e0b" />
          {/* Open Cream Pages */}
          <rect x="6" y="5" width="44" height="64" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          <rect x="54" y="5" width="44" height="64" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          {/* Ruled lines on left page */}
          <line x1="10" y1="18" x2="44" y2="18" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="10" y1="28" x2="44" y2="28" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="10" y1="38" x2="44" y2="38" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.6" />
          {/* Highlighted entry: "১২টি" with green checkmark */}
          <rect x="9" y="44" width="38" height="13" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
          <line x1="11" y1="51" x2="33" y2="51" stroke="#b91c1c" strokeWidth="2" />
          <path d="M 36 48 L 39 53 L 44 46" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Right Page ruled lines */}
          <line x1="58" y1="18" x2="94" y2="18" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="58" y1="28" x2="94" y2="28" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="58" y1="38" x2="94" y2="38" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="58" y1="48" x2="94" y2="48" stroke="#92400e" strokeWidth="1.5" strokeOpacity="0.6" />
        </g>

        {/* Hands gripping the sides of the ledger */}
        <circle cx="112" cy="320" r="13" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
        <circle cx="208" cy="320" r="13" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
      </>
    );
  }

  // Action Activity 2: Searching Inventory shelves (parting clothes, confused search)
  if (pose === "searching_inventory") {
    const reachY = Math.sin(frame * 0.12) * 6;
    return (
      <>
        {/* Left arm shrugging / scratching hip */}
        <path d="M 100 250 Q 65 295 62 335" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 100 250 Q 65 295 62 335" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        <circle cx="62" cy="335" r="13" fill={skinBase} stroke="#0f172a" strokeWidth="2" />

        {/* Right arm reaching up high towards shelves */}
        <path d={`M 220 250 Q 255 210 262 ${170 + reachY}`} stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d={`M 220 250 Q 255 210 262 ${170 + reachY}`} stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        <circle cx="262" cy={170 + reachY} r="13" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
      </>
    );
  }

  // Action Activity 3: Customer waiting impatiently with arms folded
  if (pose === "arms_crossed") {
    return (
      <>
        {/* Left arm base folding across */}
        <path d="M 100 250 Q 80 315 135 320 L 210 310" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 100 250 Q 80 315 135 320 L 210 310" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />

        {/* Right arm crossing over top */}
        <path d="M 220 250 Q 240 315 185 325 L 110 320" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 220 250 Q 240 315 185 325 L 110 320" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />

        {/* Hands resting/tucked on biceps */}
        <circle cx="210" cy="310" r="12" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
        <circle cx="110" cy="320" r="12" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
        {/* Fold crease */}
        <line x1="140" y1="318" x2="180" y2="318" stroke="#0f172a" strokeWidth="2" />
      </>
    );
  }

  // Action Activity 4: Customer holding up a clothes hanger with shirt ("এই ডিজাইনের শার্টটা আছে?")
  if (pose === "holding_shirt") {
    const sway = Math.sin(frame * 0.1) * 3;
    return (
      <>
        {/* Left arm relaxed at side */}
        <path d="M 105 250 Q 90 320 100 375" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 105 250 Q 90 320 100 375" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        <circle cx="100" cy="375" r="13" fill={skinBase} stroke="#0f172a" strokeWidth="2" />

        {/* Right arm held forward holding clothes hanger */}
        <path d="M 215 250 Q 250 290 240 310" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 215 250 Q 250 290 240 310" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        <circle cx="240" cy="310" r="13" fill={skinBase} stroke="#0f172a" strokeWidth="2" />

        {/* Clothes Hanger with Sample Shirt held in hand */}
        <g transform={`translate(225, ${260 + sway})`}>
          {/* Metal/Wood Hanger */}
          <path d="M 25 15 C 25 5 35 5 35 15 C 35 22 25 22 25 25" stroke="#f59e0b" strokeWidth="3" fill="none" />
          <polygon points="25,25 0,45 50,45" fill="none" stroke="#78350f" strokeWidth="3.5" />
          {/* Hanging Sample Shirt */}
          <path d="M 0 45 L 8 45 L 12 110 L -12 110 L -8 45 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
          <path d="M 50 45 L 42 45 L 38 110 L 62 110 L 58 45 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
          <path d="M 0 45 L 50 45 L 45 125 L 5 125 Z" fill="#0ea5e9" stroke="#0284c7" strokeWidth="2" />
          {/* White Collar & buttons */}
          <polygon points="18,45 25,60 32,45" fill="#ffffff" />
          <line x1="25" y1="60" x2="25" y2="120" stroke="#ffffff" strokeWidth="2" />
          <circle cx="25" cy="75" r="2" fill="#0284c7" />
          <circle cx="25" cy="95" r="2" fill="#0284c7" />
          {/* Badge: "নমুনা শার্ট" */}
          <rect x="-8" y="130" width="66" height="20" rx="4" fill="#1e293b" opacity="0.9" />
          <text x="25" y="144" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">এই ডিজাইন?</text>
        </g>
      </>
    );
  }

  if (pose === "presenting") {
    return (
      <>
        {/* Left arm relaxed */}
        <path d="M 100 250 Q 80 320 95 380" stroke={sleeveColor} strokeWidth="28" strokeLinecap="round" fill="none" />
        <circle cx="95" cy="380" r="14" fill={skinBase} />
        {/* Right arm pointing up/presenting */}
        <path d="M 220 250 Q 260 210 290 170" stroke={sleeveColor} strokeWidth="28" strokeLinecap="round" fill="none" />
        <circle cx="295" cy="165" r="14" fill={skinBase} />
      </>
    );
  }

  if (pose === "thinking") {
    return (
      <>
        {/* Left arm relaxed */}
        <path d="M 100 250 Q 85 320 95 375" stroke={sleeveColor} strokeWidth="28" strokeLinecap="round" fill="none" />
        <circle cx="95" cy="375" r="14" fill={skinBase} />
        {/* Right arm bent with hand resting thoughtfully on chin */}
        <path d="M 220 250 Q 235 300 205 270 L 180 200" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <circle cx="178" cy="195" r="13" fill={skinBase} />
      </>
    );
  }

  if (pose === "explaining") {
    return (
      <>
        {/* Both arms open gesturing */}
        <path d="M 100 250 Q 65 300 80 340" stroke={sleeveColor} strokeWidth="28" strokeLinecap="round" fill="none" />
        <circle cx="80" cy="340" r="14" fill={skinBase} />
        <path d="M 220 250 Q 255 300 240 340" stroke={sleeveColor} strokeWidth="28" strokeLinecap="round" fill="none" />
        <circle cx="240" cy="340" r="14" fill={skinBase} />
      </>
    );
  }

  if (pose === "box") {
    return (
      <>
        <path d="M 105 250 Q 110 330 140 340" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <path d="M 215 250 Q 210 330 180 340" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        {/* Cardboard Box */}
        <rect x="110" y="300" width="100" height="70" rx="6" fill="#c09867" stroke="#967246" strokeWidth="3" />
        <path d="M 120 300 L 140 285 L 180 285 L 200 300" fill="#a68153" />
        <circle cx="145" cy="275" r="8" fill="#48bb78" />
        <circle cx="155" cy="270" r="10" fill="#38a169" />
      </>
    );
  }

  if (pose === "using_computer") {
    // Subtle typing finger jitter
    const typeOffset = Math.sin(frame * 0.9) * 2.5;
    return (
      <>
        {/* Soft screen light ambient cast on torso */}
        <polygon points="120,410 200,410 220,250 100,250" fill="#38bdf8" opacity="0.12" />

        {/* Left arm reaching forward & down directly onto keyboard */}
        <path d="M 105 250 Q 110 340 135 412" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 105 250 Q 110 340 135 412" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        {/* Left hand & typing fingers */}
        <circle cx="135" cy={412 + typeOffset} r="13" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
        <rect x="123" y={410 + typeOffset} width="24" height="9" rx="3" fill={skinBase} stroke="#0f172a" strokeWidth="1.5" />

        {/* Right arm reaching forward & down directly onto keyboard / mouse */}
        <path d="M 215 250 Q 210 340 185 412" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 215 250 Q 210 340 185 412" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        {/* Right hand & typing fingers */}
        <circle cx="185" cy={412 - typeOffset} r="13" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
        <rect x="173" y={410 - typeOffset} width="24" height="9" rx="3" fill={skinBase} stroke="#0f172a" strokeWidth="1.5" />
      </>
    );
  }

  if (pose === "sitting_desk") {
    return (
      <>
        {/* Left arm resting on desk */}
        <path d="M 105 250 Q 110 340 132 414" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <ellipse cx="132" cy="414" rx="15" ry="10" fill={skinBase} />
        {/* Right arm resting on desk */}
        <path d="M 215 250 Q 210 340 188 414" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <ellipse cx="188" cy="414" rx="15" ry="10" fill={skinBase} />
      </>
    );
  }

  if (pose === "pointing") {
    return (
      <>
        {/* Left arm resting or clenched */}
        <path d="M 100 250 Q 80 320 95 365" stroke={sleeveColor} strokeWidth="28" strokeLinecap="round" fill="none" />
        <circle cx="95" cy="365" r="14" fill={skinBase} />
        {/* Right arm pointing forward/upward decisively */}
        <path d="M 220 250 Q 255 230 285 220 L 305 210" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 220 250 Q 255 230 285 220 L 305 210" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        {/* Pointing Hand with Index Finger extended */}
        <circle cx="305" cy="210" r="13" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
        <line x1="305" y1="210" x2="322" y2="202" stroke={skinBase} strokeWidth="6" strokeLinecap="round" />
        <line x1="305" y1="210" x2="322" y2="202" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      </>
    );
  }

  if (pose === "reading_document") {
    return (
      <>
        {/* Left arm holding file */}
        <path d="M 105 250 Q 110 320 135 325" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <circle cx="135" cy="325" r="13" fill={skinBase} />
        {/* Right arm holding file */}
        <path d="M 215 250 Q 210 320 185 325" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <circle cx="185" cy="325" r="13" fill={skinBase} />
        {/* Manila Office Document Folder */}
        <g transform="translate(130, 290)">
          <rect x="0" y="0" width="60" height="45" rx="4" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
          <rect x="5" y="5" width="50" height="35" rx="2" fill="#ffffff" />
          <line x1="10" y1="12" x2="45" y2="12" stroke="#94a3b8" strokeWidth="2" />
          <line x1="10" y1="18" x2="40" y2="18" stroke="#94a3b8" strokeWidth="2" />
          <line x1="10" y1="24" x2="48" y2="24" stroke="#ef4444" strokeWidth="2" />
        </g>
      </>
    );
  }

  if (pose === "celebrating") {
    return (
      <>
        {/* Both arms raised up high in victory V */}
        <path d="M 100 250 Q 70 200 65 145" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 100 250 Q 70 200 65 145" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        <circle cx="65" cy="145" r="14" fill={skinBase} stroke="#0f172a" strokeWidth="2" />

        <path d="M 220 250 Q 250 200 255 145" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 220 250 Q 250 200 255 145" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        <circle cx="255" cy="145" r="14" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
      </>
    );
  }

  if (pose === "holding_phone") {
    return (
      <>
        {/* Left arm relaxed at side */}
        <path d="M 105 250 Q 90 320 100 375" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <circle cx="100" cy="375" r="14" fill={skinBase} />

        {/* Right arm bent up to ear holding phone */}
        <path d="M 215 250 Q 255 240 238 185" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 215 250 Q 255 240 238 185" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        {/* Right hand */}
        <circle cx="238" cy="185" r="13" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
        {/* Modern Smartphone held against ear */}
        <rect x="228" y="145" width="22" height="42" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <rect x="231" y="150" width="16" height="32" rx="2" fill="#0284c7" opacity="0.8" />
        {/* Calling wave lines */}
        <path d="M 256 155 Q 262 165 256 175" stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.8" />
      </>
    );
  }

  if (pose === "sitting_stool") {
    return (
      <>
        {/* Arms resting naturally on thighs / knees while seated on stool */}
        <path d="M 105 250 Q 95 330 115 390" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <ellipse cx="115" cy="390" rx="14" ry="11" fill={skinBase} />
        <path d="M 215 250 Q 225 330 205 390" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <ellipse cx="205" cy="390" rx="14" ry="11" fill={skinBase} />
      </>
    );
  }

  if (pose === "drinking_tea") {
    return (
      <>
        {/* Left arm resting */}
        <path d="M 105 250 Q 90 320 100 375" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <circle cx="100" cy="375" r="14" fill={skinBase} />
        {/* Right arm raised holding tea glass */}
        <path d="M 215 250 Q 240 260 215 210" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 215 250 Q 240 260 215 210" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        <circle cx="215" cy="210" r="13" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
        {/* Traditional Glass of Milk Tea / Cha */}
        <g transform="translate(205, 185)">
          <polygon points="0,0 20,0 17,28 3,28" fill="rgba(255,255,255,0.7)" stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="2,6 18,6 16,26 4,26" fill="#b45309" />
          {/* Steam rising */}
          <path d="M 7 -4 Q 10 -12 7 -18" stroke="#ffffff" strokeWidth="1.8" fill="none" opacity="0.6" />
          <path d="M 13 -4 Q 16 -12 13 -18" stroke="#ffffff" strokeWidth="1.8" fill="none" opacity="0.6" />
        </g>
      </>
    );
  }

  if (pose === "counting_money") {
    return (
      <>
        {/* Left arm holding stack of cash */}
        <path d="M 105 250 Q 115 310 145 320" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <circle cx="145" cy="320" r="13" fill={skinBase} />
        {/* Right arm counting banknotes */}
        <path d="M 215 250 Q 205 310 175 320" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <circle cx="175" cy="320" r="13" fill={skinBase} />
        {/* Fan of Green 500/1000 Taka Banknotes */}
        <g transform="translate(138, 295)">
          <rect x="-8" y="6" width="46" height="26" rx="2" fill="#15803d" stroke="#166534" strokeWidth="1.5" transform="rotate(-15)" />
          <rect x="0" y="2" width="46" height="26" rx="2" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" transform="rotate(-5)" />
          <rect x="8" y="0" width="46" height="26" rx="2" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" transform="rotate(10)" />
          <text x="26" y="18" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle">৳</text>
        </g>
      </>
    );
  }

  if (pose === "shocked") {
    return (
      <>
        {/* Arms thrown back slightly in alarm/disbelief */}
        <path d="M 105 250 Q 70 280 65 330" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 105 250 Q 70 280 65 330" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        <circle cx="65" cy="330" r="14" fill={skinBase} stroke="#0f172a" strokeWidth="2" />

        <path d="M 215 250 Q 250 280 255 330" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 215 250 Q 250 280 255 330" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        <circle cx="255" cy="330" r="14" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
      </>
    );
  }

  if (pose === "nervous") {
    // Subtle nervous twitch
    const twitch = Math.sin(frame * 0.8) * 2;
    return (
      <>
        {/* Hands clutched together nervously at upper chest */}
        <path d="M 105 250 Q 120 320 148 335" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <path d="M 215 250 Q 200 320 172 335" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <ellipse cx="160" cy={335 + twitch} rx="18" ry="14" fill={skinBase} stroke="#0f172a" strokeWidth="1.5" />
      </>
    );
  }

  if (pose === "head_in_hands") {
    // Both arms raised up to temples / clutching head in deep thought or despair
    return (
      <>
        {/* Left arm reaching up to left temple */}
        <path d="M 105 250 Q 80 190 120 160" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 105 250 Q 80 190 120 160" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        <circle cx="120" cy="158" r="14" fill={skinBase} stroke="#0f172a" strokeWidth="2" />

        {/* Right arm reaching up to right temple */}
        <path d="M 215 250 Q 240 190 200 160" stroke="#0f172a" strokeWidth="28" strokeLinecap="round" fill="none" />
        <path d="M 215 250 Q 240 190 200 160" stroke={sleeveColor} strokeWidth="22" strokeLinecap="round" fill="none" />
        <circle cx="200" cy="158" r="14" fill={skinBase} stroke="#0f172a" strokeWidth="2" />
      </>
    );
  }

  if (pose === "writing_pen") {
    // Left hand holding paper, right hand actively moving pen in writing loop
    const penJitter = Math.sin(frame * 0.7) * 3;
    return (
      <>
        {/* White Budget Notebook / Paper on table */}
        <g transform="translate(125, 370) rotate(-4)">
          <rect x="0" y="0" width="85" height="58" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
          <line x1="10" y1="14" x2="75" y2="14" stroke="#3b82f6" strokeWidth="2" />
          <line x1="10" y1="26" x2="70" y2="26" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 2" />
          <line x1="10" y1="38" x2="72" y2="38" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 2" />
          <line x1="10" y1="48" x2="50" y2="48" stroke="#10b981" strokeWidth="2" />
        </g>

        {/* Left arm resting on desk holding paper */}
        <path d="M 105 250 Q 110 330 135 400" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <ellipse cx="135" cy="400" rx="14" ry="10" fill={skinBase} />

        {/* Right arm holding pen and writing */}
        <path d="M 215 250 Q 200 330 185 398" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
        <circle cx="185" cy="398" r="13" fill={skinBase} />
        {/* Pen in right hand */}
        <line x1={180 + penJitter} y1="380" x2={190 + penJitter} y2="410" stroke="#2563eb" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx={190 + penJitter} cy="410" r="2.5" fill="#0f172a" />
      </>
    );
  }

  // Default: standing relaxed
  return (
    <>
      <path d="M 105 250 Q 90 320 100 375" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="375" r="14" fill={skinBase} />
      <path d="M 215 250 Q 230 320 220 375" stroke={sleeveColor} strokeWidth="26" strokeLinecap="round" fill="none" />
      <circle cx="220" cy="375" r="14" fill={skinBase} />
    </>
  );
}

function renderHair(hairStyle: string, hairColor: string, outfitColor: string) {
  switch (hairStyle) {
    case "curls": // Stylish textured wavy curls
      return (
        <path
          d="M 100 165 C 92 70 228 70 220 165 C 215 130 185 125 160 128 C 135 125 108 130 100 165 Z"
          fill={hairColor}
          stroke="#222222"
          strokeWidth="2.5"
        />
      );

    case "crop": // Modern short fade with texture and clean taper (Friend)
      return (
        <g>
          {/* Shorter sides, clean high fade */}
          <path
            d="M 104 162 C 100 85 220 85 216 162 C 212 144 192 135 160 134 C 128 135 108 144 104 162 Z"
            fill={hairColor}
            stroke="#1a202c"
            strokeWidth="2.5"
          />
          {/* Modern textured quiff on top front */}
          <path
            d="M 120 125 C 135 110 165 108 185 118 C 170 120 145 122 120 125 Z"
            fill={hairColor}
            stroke="#0f172a"
            strokeWidth="1.5"
          />
          {/* Subtle side fade shading */}
          <path d="M 104 155 L 110 140 L 110 158 Z" fill="#0f172a" opacity="0.4" />
          <path d="M 216 155 L 210 140 L 210 158 Z" fill="#0f172a" opacity="0.4" />
        </g>
      );

    case "long": // Flowing hair / Anika
      return (
        <path
          d="M 102 165 C 95 75 225 75 218 165 C 224 210 224 260 210 270 C 200 220 205 140 160 130 C 115 140 120 220 110 270 C 96 260 96 210 102 165 Z"
          fill={hairColor}
          stroke="#222222"
          strokeWidth="2"
        />
      );

    case "hijab": // Fatima
      return (
        <path
          d="M 98 170 C 94 75 226 75 222 170 C 226 240 210 260 160 260 C 110 260 94 240 98 170 Z"
          fill={hairColor}
          stroke="#1a202c"
          strokeWidth="2.5"
        />
      );

    case "receding": // Boss / Kamal
      return (
        <path
          d="M 104 165 C 98 80 222 80 216 165 C 210 145 190 125 170 132 C 150 138 130 138 116 148 C 108 155 105 160 104 165 Z"
          fill={hairColor}
          stroke="#222222"
          strokeWidth="2"
        />
      );

    case "elder": // Distinguished silver elder hair
      return (
        <g>
          <path
            d="M 100 165 C 95 72 225 72 220 165 C 212 135 185 125 152 128 C 128 130 110 138 100 165 Z"
            fill={hairColor}
            stroke="#222222"
            strokeWidth="2.5"
          />
          {/* Subtle silver temple accents */}
          <path d="M 102 155 C 98 135 110 125 118 138 Z" fill="#ffffff" opacity="0.6" />
          <path d="M 218 155 C 222 135 210 125 202 138 Z" fill="#ffffff" opacity="0.6" />
        </g>
      );

    case "bald":
      return null;

    case "sidepart": // Mature businessman comb-over sidepart (Jamal)
    default:
      return (
        <g>
          {/* Main hair body with distinguished parted silhouette */}
          <path
            d="M 98 165 C 92 68 152 64 162 98 C 168 70 228 72 222 165 C 216 138 182 122 155 125 C 130 128 106 142 98 165 Z"
            fill={hairColor}
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          {/* Visible Side-Part parting line on left side */}
          <path
            d="M 124 95 Q 132 120 136 138"
            stroke="#090d16"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Comb-over bangs sweeping across from left part to the right */}
          <path
            d="M 136 102 Q 170 94 212 130"
            stroke={hairColor}
            strokeWidth="6"
            fill="none"
          />
          <path
            d="M 138 114 Q 172 108 206 138"
            stroke="#334155"
            strokeWidth="2.5"
            fill="none"
            opacity="0.8"
          />
          {/* Mature subtle grey / salt-and-pepper temple highlights */}
          <path
            d="M 101 155 Q 98 138 108 128"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
            opacity="0.75"
          />
        </g>
      );
  }
}

function renderEyebrows(isSad: boolean, isThinking: boolean, isSearching: boolean, hairColor: string) {
  if (isSearching) {
    // Worried / confused raised inner eyebrows
    return (
      <>
        <path d="M 126 142 Q 140 148 152 144" stroke={hairColor} strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 168 144 Q 180 148 194 142" stroke={hairColor} strokeWidth="3.2" fill="none" strokeLinecap="round" />
      </>
    );
  }
  if (isSad) {
    return (
      <>
        <path d="M 128 145 Q 140 148 152 143" stroke={hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 168 143 Q 180 148 192 145" stroke={hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    );
  }
  if (isThinking) {
    return (
      <>
        {/* One raised, one furrowed */}
        <path d="M 128 147 Q 140 144 152 148" stroke={hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 168 140 Q 180 134 192 138" stroke={hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    );
  }
  return (
    <>
      <path d="M 128 144 Q 140 140 152 144" stroke={hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 168 144 Q 180 140 192 144" stroke={hairColor} strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  );
}

function renderEyewear(eyewear: string) {
  switch (eyewear) {
    case "square_blue": // Rafi
      return (
        <g>
          <rect x="124" y="150" width="32" height="28" rx="8" fill="rgba(255,255,255,0.15)" stroke="#2b6cb0" strokeWidth="3" />
          <rect x="164" y="150" width="32" height="28" rx="8" fill="rgba(255,255,255,0.15)" stroke="#2b6cb0" strokeWidth="3" />
          <line x1="156" y1="162" x2="164" y2="162" stroke="#2b6cb0" strokeWidth="3" />
          <line x1="124" y1="160" x2="108" y2="160" stroke="#2b6cb0" strokeWidth="2.5" />
          <line x1="196" y1="160" x2="212" y2="160" stroke="#2b6cb0" strokeWidth="2.5" />
        </g>
      );
    case "square_black":
      return (
        <g>
          <rect x="124" y="150" width="32" height="28" rx="8" fill="rgba(255,255,255,0.15)" stroke="#0f172a" strokeWidth="3.2" />
          <rect x="164" y="150" width="32" height="28" rx="8" fill="rgba(255,255,255,0.15)" stroke="#0f172a" strokeWidth="3.2" />
          <line x1="156" y1="162" x2="164" y2="162" stroke="#0f172a" strokeWidth="3.2" />
          <line x1="124" y1="160" x2="108" y2="160" stroke="#0f172a" strokeWidth="2.5" />
          <line x1="196" y1="160" x2="212" y2="160" stroke="#0f172a" strokeWidth="2.5" />
        </g>
      );
    case "round_gold": // Father / Professor
      return (
        <g>
          <circle cx="140" cy="165" r="17" fill="rgba(255,255,255,0.15)" stroke="#d97706" strokeWidth="2.5" />
          <circle cx="180" cy="165" r="17" fill="rgba(255,255,255,0.15)" stroke="#d97706" strokeWidth="2.5" />
          <line x1="157" y1="165" x2="163" y2="165" stroke="#d97706" strokeWidth="2.5" />
          <line x1="123" y1="163" x2="108" y2="160" stroke="#d97706" strokeWidth="2" />
          <line x1="197" y1="163" x2="212" y2="160" stroke="#d97706" strokeWidth="2" />
        </g>
      );
    case "round_black":
      return (
        <g>
          <circle cx="140" cy="165" r="17" fill="rgba(255,255,255,0.15)" stroke="#1a202c" strokeWidth="2.8" />
          <circle cx="180" cy="165" r="17" fill="rgba(255,255,255,0.15)" stroke="#1a202c" strokeWidth="2.8" />
          <line x1="157" y1="165" x2="163" y2="165" stroke="#1a202c" strokeWidth="2.8" />
          <line x1="123" y1="163" x2="108" y2="160" stroke="#1a202c" strokeWidth="2.5" />
          <line x1="197" y1="163" x2="212" y2="160" stroke="#1a202c" strokeWidth="2.5" />
        </g>
      );
    case "none":
    default:
      return null;
  }
}

function renderFacialHair(facialHair: string, facialHairColor: string, shadowColor: string) {
  switch (facialHair) {
    case "stubble": // Nabil's stylish jawline stubble
      return (
        <path
          d="M 125 188 Q 160 225 195 188 Q 185 210 160 214 Q 135 210 125 188 Z"
          fill={shadowColor}
          opacity="0.45"
        />
      );

    case "goatee":
      return (
        <path
          d="M 150 195 Q 160 220 170 195 Q 165 212 160 214 Q 155 212 150 195 Z"
          fill={facialHairColor}
        />
      );

    case "mustache":
      return (
        <path
          d="M 144 186 Q 160 182 176 186 Q 168 194 160 192 Q 152 194 144 186 Z"
          fill={facialHairColor}
        />
      );

    case "elder_beard": // Father's soft white beard
      return (
        <path
          d="M 125 185 Q 160 240 195 185 Q 185 220 160 225 Q 135 220 125 185 Z"
          fill={facialHairColor}
          stroke="#cbd5e0"
          strokeWidth="1.5"
        />
      );

    case "none":
    default:
      return null;
  }
}

function renderMouth(
  isSad: boolean,
  isThinking: boolean,
  shouldSpeak: boolean,
  mouthOpen: number,
  lipColor: string
) {
  if (isSad) {
    return (
      <path
        d="M 148 198 Q 160 190 172 198"
        stroke="#2d3748"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    );
  }

  if (isThinking) {
    return (
      <line
        x1="152"
        y1="195"
        x2="168"
        y2="195"
        stroke="#2d3748"
        strokeWidth="3"
        strokeLinecap="round"
      />
    );
  }

  if (!shouldSpeak) {
    // Resting closed mouth line for attentive listener (no mouth movement)
    return (
      <line
        x1="153"
        y1="196"
        x2="167"
        y2="196"
        stroke="#2d3748"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    );
  }

  // Active talking mouth (only when character is speaking)
  return (
    <ellipse
      cx="160"
      cy="195"
      rx="9"
      ry={mouthOpen / 2}
      fill="#2d3748"
      stroke={lipColor}
      strokeWidth="1.5"
    />
  );
}

function renderActionOverlays(pose: CharacterPose, frame: number) {
  const isAngry = pose === "shouting";
  const isTense = pose === "concerned" || pose === "nervous" || pose === "tremble";
  const isJoyful = pose === "celebrating";
  const isSad = pose === "sad";
  const isShocked = pose === "shocked";

  return (
    <g>
      {/* 1. Sweat Drop (💧) for Tension / Anxiety / Nervousness */}
      {isTense && (
        <g transform="translate(108, 142)">
          <path
            d="M 6 0 C 3 6 0 10 0 14 A 6 6 0 0 0 12 14 C 12 10 9 6 6 0 Z"
            fill="#38bdf8"
            stroke="#0284c7"
            strokeWidth="1.5"
            opacity={0.9}
          />
          <circle cx="4" cy="12" r="1.5" fill="#ffffff" />
        </g>
      )}

      {/* 2. Comic/Anime Rage Vein Mark (💢) for Anger / Shouting */}
      {isAngry && (
        <g transform="translate(208, 118)">
          <path
            d="M 0 5 Q 8 8 16 0 M 16 0 Q 8 8 16 16 M 16 16 Q 8 8 0 16 M 0 16 Q 8 8 0 0"
            stroke="#ef4444"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* 3. Celebration Twinkle Stars (✨) for Joy / Victory */}
      {isJoyful && (
        <g>
          <g transform={`translate(80, 110) rotate(${frame * 2}) scale(${0.8 + Math.sin(frame * 0.2) * 0.2})`}>
            <polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          </g>
          <g transform={`translate(240, 105) rotate(${-frame * 2}) scale(${0.8 + Math.cos(frame * 0.2) * 0.2})`}>
            <polygon points="0,-10 2.5,-2.5 10,0 2.5,2.5 0,10 -2.5,2.5 -10,0 -2.5,-2.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          </g>
        </g>
      )}

      {/* 4. Tear Glisten (😢) on Cheek for Sadness / Remorse */}
      {isSad && (
        <ellipse cx="146" cy="184" rx="2.5" ry="4" fill="#38bdf8" opacity={0.75} />
      )}

      {/* 5. Shock Action Lines for Sudden Shock / Disbelief */}
      {isShocked && (
        <g stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity={0.85}>
          <line x1="120" y1="80" x2="120" y2="60" />
          <line x1="140" y1="72" x2="140" y2="52" />
          <line x1="160" y1="70" x2="160" y2="48" />
          <line x1="180" y1="72" x2="180" y2="52" />
          <line x1="200" y1="80" x2="200" y2="60" />
        </g>
      )}

      {/* Searching Inventory Overlay */}
      {pose === "searching_inventory" && (
        <g>
          <g transform={`translate(${250 + Math.sin(frame * 0.15) * 8}, 125)`}>
            <circle cx="0" cy="0" r="22" stroke="#3b82f6" strokeWidth="4" fill="rgba(59,130,246,0.25)" />
            <line x1="15" y1="15" x2="32" y2="32" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
            <text x="-7" y="8" fontSize="22" fill="#ef4444" fontWeight="900">?</text>
          </g>
          <g transform="translate(38, 95)">
            <rect x="0" y="0" width="88" height="30" rx="6" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <text x="44" y="20" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">খালি তাক! ✕</text>
          </g>
        </g>
      )}
    </g>
  );
}

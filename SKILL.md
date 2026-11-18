---
name: video-generation-skills
description: "Master Universal Video Director & Generator for Remotion. Houses two visual production engines: 1) Character Storytelling & Drama Engine (procedural 2D flat cartoon characters, speech bubbles, room backgrounds, lip sync, psychological/educational narratives), and 2) Kinetic Motion Graphics & Promo Engine (commercial ads, SaaS/e-commerce explainers, dot grid, phone mockups, card mechanics, dark caption pill with neon green highlights). Features Dynamic Script-Driven Asset Synthesis (never reuses unrelated icons; automatically designs custom SVG vector components for each unique topic), audio/SRT sync or Cartesia Sonic TTS, self-check visual inspection, and strict two-point approval workflow."
metadata:
  version: 4.0.0
---

# Universal Dual-Engine Video Director & Generator (v4.0)

Production-grade automated video generation skill in Remotion for 9:16 vertical short-form videos (YouTube Shorts, TikTok, Instagram Reels, Facebook Ads). Encapsulates **two distinct visual engines** under a single unified project:

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

---

## ১. ইঞ্জিন মোড নির্বাচন (Dual-Engine Mode Selection)

ব্যবহারকারী একটি মাত্র স্কিল ইনস্টল বা ব্যবহার করবেন। স্ক্রিপ্টের ধরণ অনুযায়ী বা ব্যবহারকারীর নির্দেশে স্বয়ংক্রিয়ভাবে সঠিক ইঞ্জিন সক্রিয় হবে:

| মোড | ট্রিগার কীওয়ার্ড | স্ক্রিপ্টের ধরণ | ভিজ্যুয়াল মেটাফর ও স্টাইল |
| :--- | :--- | :--- | :--- |
| **Mode 1: Character Storytelling Engine** | `story`, `cartoon`, `drama`, `character`, `golpo`, `গল্প`, `কার্টুন` | ক্যারেক্টার নির্ভর সংলাপ, মানসিক দ্বন্দ্ব, শিক্ষামূলক গল্প, পডকাস্ট ন্যারেশন | প্রসিডিউরাল ২ডি ফ্ল্যাট ক্যারেক্টার, লিপ-সিঙ্ক, স্পিচ বাবল, ফুল-স্ক্রিন বেডরুম/অফিস রুম ব্যাকগ্রাউন্ড |
| **Mode 2: Kinetic Motion Graphics & Promo Engine** | `promo`, `ad`, `commercial`, `saas`, `kinetic`, `explainer`, `বিজ্ঞাপন`, `প্রমো` | প্রোডাক্ট অ্যাড, SaaS/সফটওয়্যার ডেমো, ই-কমার্স প্রমো, বিজনেস স্ট্র্যাটেজি | ডট-গ্রিড টেক্সচার, ব্রান্ড হেডার, কর্নার ওয়াটারমার্ক, ফোন মকআপ, কার্ড মেকানিক্স, ডার্ক বটম ক্যাপশন পিল |

> [!TIP]
> ব্যবহারকারী যদি কোনো মোড উল্লেখ না করেন, তবে স্ক্রিপ্টে দৃশ্যমান চরিত্র বা কথোপকথন থাকলে **Mode 1 (Story)** এবং বিজনেস প্রবলেম/প্রোডাক্ট সলিউশন থাকলে **Mode 2 (Promo)** স্বয়ংক্রিয়ভাবে বেছে নেওয়া হবে এবং অনুমোদন টেবিলে তা উল্লেখ করা হবে।

---

## ২. ⚠️ অতি গুরুত্বপূর্ণ নিয়ম: ১০০% ডেটা-ড্রিভেন ইউনিভার্সাল স্কিল আর্কিটেকচার (Universal Data-Driven Architecture)

> [!CAUTION]
> **প্রতিটি নতুন স্ক্রিপ্টের জন্য কখনো নতুন রিঅ্যাক্ট কম্পোনেন্ট, কোড ফাইল, আলাদা ফোল্ডার বা এককালীন `.mjs` স্ক্রিপ্ট তৈরি করা কঠোরভাবে নিষিদ্ধ!**
> এটি একটি গ্লোবাল ইউনিভার্সাল স্কিল যা যেকোনো ব্যবহারকারী ইনস্টল করে যেকোনো বিষয়ের স্ক্রিপ্টে চালাতে পারবেন।
> সমস্ত স্ক্রিপ্ট-স্পেসিফিক পরিবর্তন (চরিত্রের লুক, পোশাক, ব্যাকগ্রাউন্ড থিম, সংলাপ, অ্যাকশন বিটস, ইনফোগ্রাফিক্স ও সিলেক্টিভ কার্ডস) **শুধুমাত্র ১টি ইনপুট JSON ফাইলে** কনফিগার করতে হবে।

### ইউনিভার্সাল ভিডিও জেনারেশন পাইপলাইন (মাত্র ২টি কমান্ড):
১. **স্ক্রিপ্ট থেকে ইনপুট JSON তৈরি**:
   - `examples/sample-story-input.json` রেফারেন্স দেখে দৃশ্য অনুযায়ী `scripts/<story-name>-input.json` তৈরি করুন।
২. **ইউনিভার্সাল অডিও ও টাইমিং সিন্থেসিস**:
   ```bash
   node scripts/tts-engine.mjs --input=scripts/<story-name>-input.json
   ```
   - এটি স্বয়ংক্রিয়ভাবে কার্টেশিয়া বা সিলেক্টেড TTS দিয়ে প্রতিটি সিনের ভয়েস তৈরি করবে এবং অডিওর নিখুঁত সেকেন্ড/ফ্রেম টাইমিং ইনপুট JSON-এ সেভ করবে।
৩. **ইউনিভার্সাল টাইমলাইন কম্পাইলেশন**:
   ```bash
   node scripts/build-story-timeline.mjs --input=scripts/<story-name>-input.json
   ```
   - এটি রিমোশনের জন্য রেডি `template/src/timeline.json` তৈরি করবে।
৪. **প্রিভিউ চেক ও ফুল রেন্ডার**:
   ```bash
   cd template && npx remotion render src/index.ts Main ./out/<video-name>.mp4 --concurrency=4
   ```

---

## ৩. মোড ১: ক্যারেক্টার স্টোরিটেলিং ইঞ্জিনের নিয়মাবলী (Mode 1 Guidelines)

1. **চরিত্র গঠন, কাস্টিং ও ৩ জনের বেশি চরিত্রের স্ট্যাজিং (Dynamic Character Casting & Staging)**:
   - **স্ক্রিপ্ট অনুযায়ী কাস্টিং**: স্ক্রিপ্টে কতজন চরিত্র প্রয়োজন তা নিরূপণ করে প্রত্যেকের আলাদা পরিচয় তৈরি করতে হবে।
   - **চেহারার স্বকীয়তা**: একাধিক চরিত্র থাকলে কখনো একই ফেস/চশমা ক্লোন করা যাবে না। বয়স, চুলের স্টাইল ও পোশাকে সুস্পষ্ট পার্থক্য থাকতে হবে।
   - **চশমার ব্যবহার**: শুধুমাত্র বয়স্ক বা নির্দিষ্ট পেশার চরিত্রে চশমা থাকবে; সাধারণ কাস্টমার বা কর্মচারীর চোখে অযথা গোল চশমা দেওয়া কঠোরভাবে নিষিদ্ধ।
   - **পোশাক ও পরিচয়**: দোকান মালিক (পাঞ্জাবি/কুর্তা), সেলস স্টাফ (ইউনিফর্ম/পোলো), কাস্টমার (ক্যাজুয়াল টি-শার্ট/হুডি)।
   - **সলিড হেয়ারলাইন ক্যাপ**: মাথার খুলি সম্পূর্ণ আবৃত থাকবে (কোনো ফাঁকা ক্রিসেন্ট দাগ থাকবে না)।
   - **স্কেলিং ও ফ্রেমিং (১, ২ বা ৩ জন চরিত্র)**:
     - *১ জন চরিত্র*: `scale: 1.85`, মাঝখানে (`center`) অথবা বামে/ডানে।
     - *২ জন চরিত্র*: `scale: 1.75`, বামে ও ডানে (`left: 80`, `right: 80`, `bottom: 160`)।
     - *৩ জন চরিত্র (`tertiaryCharacter`)*: ৯:১৬ ফ্রেমে ৩ জন মানুষ থাকলে নিখুঁত কম্পোজিশনের জন্য `scale: 1.55` হবে। বামে সেকেন্ডারি (`left: 20`), মাঝখানে ৩য় চরিত্র (`center`), এবং ডানে মূল চরিত্র (`right: 20`, `flip: true`) থাকবে।
   - **ব্যাকগ্রাউন্ড ক্রাউড লেয়ার (`crowd`)**:
     - দোকানে ক্রেতা বা অফিসে দল থাকলে `crowd: "shoppers"` | `"office_team"` | `"village_crowd"` | `"classroom_students"` যোগ করুন। এটি ক্যারেক্টারদের পেছনে (`zIndex: 12`), ছোট স্কেলে (`scale: 1.1 - 1.15`), `bottom: 240-260`, হালকা ব্লার (`blur: 2px`) এবং প্রাকৃতিক ডেপথ অফ ফিল্ড (Depth of Field) তৈরি করে।
2. **পরিবেশ ও প্রেক্ষাপট বিশ্লেষণ (Dynamic Environment & Semantic Procedural Fallback)**:
   - পরিবেশ অনুযায়ী প্রাক-নির্মিত ২৬+ ব্যাকগ্রাউন্ড থিম ব্যবহার করতে হবে:
     - *দোকানপাট*: `clothing_store`, `electronics_store`, `pharmacy`, `grocery_store`
     - *বাসাবাড়ি ও আড্ডা*: `living_room`, `home_study`, `tea_stall`, `cafe`, `wedding_hall`
     - *অফিস ও প্রতিষ্ঠান*: `corporate_office`, `hospital_clinic`, `police_station`, `classroom`, `deep_library`
     - *গ্রাম ও আউটডোর*: `village_bazaar`, `village_sunset`, `street_outdoor`, `bus_interior`
     - *মুড ও দ্বন্দ্ব*: `dark_conflict`, `dramatic_red`, `blue_melancholy`, `golden_sunrise`
   - **স্মার্ট সিম্যান্টিক প্রসিডিউরাল রুম জেনারেটর (No Blind Office Fallback)**:
     - সম্পূর্ণ নতুন বা আনলিস্টেড কোনো থিম দিলে (যেমন `bakery`, `gym`, `bank`, `courtroom`, `kitchen`) ইঞ্জিন অন্ধভাবে অফিসে যায় না; বরং থিমের নাম ডিকোড করে প্রাসঙ্গিক সিলুয়েট, সাইনবোর্ড ও ইন্টেরিয়র কালার ভেক্টর স্বয়ংক্রিয়ভাবে জেনারেট করে নেয়।
   - প্রতিটি দৃশ্য স্ক্রিনের শুরু থেকে শেষ পর্যন্ত ১০০% ফুল-স্ক্রিন (`width: 100%, height: 100%`) থাকবে।
3. **ক্যামেরা ঝাঁকুনি ও মোশন রুল (Tone-Calibrated Screen Shake - STRICT MAX 1-2 SECONDS)**:
   - ⚠️ **একটানা ঝাঁকুনি নিষিদ্ধ**: কোনো অবস্থাতেই একটি দৃশ্যে ১০–১৫ সেকেন্ড একটানা ক্যামেরা কাঁপানো যাবে না। এটি দর্শকের চরম বিরক্তির কারণ হয়।
   - **টোন চেক**: সাধারণ ডায়লগ, স্বাভাবিক তর্ক, কাস্টমার কথা বলা বা বর্ণনায় স্ক্রিন সম্পূর্ণ স্থির থাকবে (`screenShake: false`)।
   - **আকস্মিক শক লিমিট**: শুধুমাত্র অত্যন্ত তীব্র আকস্মিক ধাক্কা বা শকের ক্ষেত্রে সর্বোচ্চ **১.০ থেকে ১.২ সেকেন্ড (৩০–৩৬ ফ্রেম)** ক্ষণস্থায়ী ঝাঁকুনি দেওয়া যাবে, যা সাথে সাথে মসৃণভাবে ডিকে (decay) হয়ে ক্যামেরা আবার স্থির হয়ে যাবে।
4. **স্পিচ ও থট বাবল (`SpeechCalloutBubble`)**:
   - উচ্চতা `top: 650` যাতে বাবলের টেইল সরাসরি কথা বলা চরিত্রের মাথার দিকে নির্দেশ করে (বামে `left: 180`, ডানে `right: 180`)।
   - **স্পিকার নেম ট্যাগ**: বাবলের উপরে ভাসমান থাকবে (`zIndex: 60`, `padding: "5px 20px"`, `border: "2.5px solid #ffffff"`).
5. **⚠️ সিলেক্টিভ সাবটাইটেল (Zero Duplicate Text)**:
   - যখন পর্দায় স্পিচ বাবল বা কিওয়ার্ড কার্ড থাকবে, তখন নিচে আলাদা সাবটাইটেল সম্পূর্ণ বন্ধ থাকবে।
   - শুধুমাত্র যখন উপরে কোনো বাবল বা কার্ড নেই, তখনই নিচে ৪–৬ শব্দের এক লাইনের ক্যাপশন আসবে।
6. **⚠️ লিপ-সিঙ্ক ও সক্রিয় স্পিকার নিয়ম (Selective Speaker Lip-Sync Rule)**:
   - যখন পর্দায় দুইজন মানুষ থাকবে, তখন যার স্পিচ বাবল নির্দেশ করছে (`speechBubble.speakerPosition`), **শুধুমাত্র তার মুখ নড়াচড়া করবে** (`isSpeaking: true`)।
   - অপর শ্রোতা বা লিসেনার চরিত্রের মুখ শান্ত ও বন্ধ থাকবে (`isSpeaking: false` -> closed resting line)। কখনো দুজন মানুষের মুখ একসাথে নড়বে না।
7. **⚠️ কথক বনাম সংলাপ টাইমিং (Narrator vs Dialogue Timing Rule)**:
   - কোনো দৃশ্যে ন্যারেশন বা কথক যখন তৃতীয় পুরুষে ঘটনা বর্ণনা করছেন, তখন স্ক্রিনের **কোনো চরিত্রের মুখ নড়বে না** (`isSpeaking: false`) এবং কোনো স্পিচ বাবল থাকবে না।
   - স্পিচ বাবল শুধুমাত্র চরিত্রের নিজস্ব প্রথম পুরুষের সংলাপের সময় নির্দিষ্ট ফ্রেমে (`speechBubbles: [{ start, duration }]`) ভেসে উঠবে এবং শুধুমাত্র সেই নির্দিষ্ট সেকেন্ডগুলোতে তার মুখ নড়বে; সংলাপ শেষ হলে বাবল উধাও হয়ে যাবে এবং মুখ আবার বন্ধ হয়ে যাবে।
8. **⚠️ চরিত্রের ভূমিকা ও সংলাপের অখণ্ডতা (Speaker Identity & Role Integrity)**:
   - এক চরিত্রের সংলাপ কখনোই অন্য চরিত্রের পোশাকে থাকা ক্যারেক্টারের মুখ দিয়ে বলানো যাবে না (যেমন: কর্মচারীর উক্তি কাস্টমারের মুখ দিয়ে বের হওয়া মারাত্মক ব্লান্ডার)।
   - কোনো দৃশ্যে কথোপকথনের চরিত্র পরিবর্তিত হলে (মালিক বনাম কর্মচারী থেকে কাস্টমারের আগমন): দৃশ্যটিকে ছোট শটে ভাগ (Camera Cut) করতে হবে, যাতে যে কথা বলছে স্ক্রিনে সঠিক পোশাকে ঠিক সেই চরিত্রই দৃশ্যমান থাকে।
9. **⚠️ শারীরিক কার্যকলাপ ও অ্যাট-আ-গ্ল্যান্স অ্যাকশন বিটস (At-A-Glance Timed Action Beats)**:
   - চরিত্রদের রোবটের মতো হাত সোজা রেখে একটানা দাঁড়িয়ে রাখা যাবে না, আবার কোনো কার্যকলাপ পুরো দৃশ্য জুড়ে ১০–১৫ সেকেন্ড ফ্রিজ করেও রাখা যাবে না।
   - অ্যাকশন ও প্রপ্স শুধুমাত্র সংশ্লিষ্ট সংলাপের সময় **অ্যাট-আ-গ্ল্যান্স (২.০ থেকে ৩.৫ সেকেন্ড)** ভেসে উঠবে (`characterPoses` / `secondaryPoses`):
     - *খাতা চেক (`checking_khata`)*: হিসাব বা খাতার কথার সময় দুই হাতে লাল খাতা ধরে দেখা, চোখ নিচে থাকবে; সংলাপ শেষে খাতা নামিয়ে স্বাভাবিক ভঙ্গিমায় ফিরবে।
     - *ইনভেন্টরি খোঁজাখুঁজি (`searching_inventory`)*: খোঁজার সংলাপের সময় তাকের দিকে হাত বাড়িয়ে ম্যাগনিফাইং গ্লাস ও খালি তাক ট্যাগ দেখা যাবে; কথা শেষ হলে হাত নামিয়ে স্বাভাবিকভাবে কথা বলবে।
     - *নমুনা শার্ট উঁচিয়ে ধরা (`holding_shirt`)*: কাস্টমার শার্ট চাওয়ার মুহূর্তে ২-৩ সেকেন্ড হ্যাঙ্গারে শার্ট উঁচিয়ে দেখাবে, তারপর হাত ভাঁজ করে অপেক্ষা করবে।
     - *অধৈর্য অপেক্ষা (`arms_crossed`)*: বুকের ওপর হাত আড়াআড়ি বেঁধে দাঁড়িয়ে থাকা।

---

## ৪. মোড ২: কাইনেটিক মোশন গ্রাফিক্স ও প্রমো ইঞ্জিনের নিয়মাবলী (Mode 2 Guidelines)

1. **৩টি কোর কালার থিম (Three Vibrant Color Themes)**:
   - **Dark Emerald Forest (`#072B20`)**: হুক, ড্রামাটিক সমস্যা বা আউট্রো সিন।
   - **Mint Cream (`#F0FDF4` / `#E8F5E9`)**: তথ্যবহুল কার্ড, ব্যাখ্যা ও ফ্লো।
   - **Radiant Vivid Green (`#22C55E` / `#27D050`)**: প্রবৃদ্ধি, সফলতা, সমাধান ও অ্যাকশন।
2. **ভিজ্যুয়াল লেয়ারিং (Persistent Hierarchy)**:
   - **লেয়ার ১ (Background)**: সলিড ব্যাকগ্রাউন্ড কালার + ভাসমান ডট-গ্রিড টেক্সচার (`DotGridBackground`).
   - **লেয়ার ২ (Header)**: উপরে ব্র্যান্ডের নাম ও মিনি লোগো (`BrandHeader`).
   - **লেয়ার ৩ (Corner Watermark)**: ডানদিকের নিচের কোণায় ব্র্যান্ডের আইকন (`CornerWatermark`).
   - **লেয়ার ৪ (Center Stage)**: স্ক্রিপ্টের মেটাফর অনুযায়ী অ্যানিমেটেড কার্ড, ফোন মকআপ বা ভেক্টর দৃশ্য।
   - **লেয়ার ৫ (Bottom Caption Pill)**: নিচে ডার্ক ক্যাপশন ক্যাপসুল (`rgba(0,0,0,0.85)`), যাতে মূল কিওয়ার্ডগুলো নিয়ন গ্রিন (`#27D050`) রঙে হাইলাইটেড থাকে (`BottomCaptionPill`).

---

## ৫. অডিও ও ভয়েসওভার নিয়ম (Audio Hierarchy)

1. **অগ্রাধিকার ১ (Priority 1: ব্যবহারকারীর ভয়েস ও SRT)**:
   - ব্যবহারকারী অডিও (`voice.mp3`) এবং SRT দিলে সেটি সরাসরি টাইমলাইনে সিঙ্ক করবে।
2. **অগ্রাধিকার ২ (Priority 2: বিল্ট-ইন TTS ইঞ্জিন)**:
   - ব্যবহারকারী অডিও না দিলে **Cartesia Sonic (`sonic-3.6`)** দিয়ে ভয়েস তৈরি করবে:
     - Voice: Kian (`314be1d2-3d14-468d-be40-08a1af7df49d`), Language: Bengali (`bn`).
     - ব্যবহারকারীর `CARTESIA_API_KEY` ব্যবহার করবে।
   - প্রতিটি অডিও ক্লিপের দৈর্ঘ্য `ffprobe` দিয়ে নিখুঁত মেপে ফ্রেমে রূপান্তর করবে (`frames = Math.round(durationSec * fps)`).

---

## ৬. কাজের ধাপ ও অনুমোদনের কঠোর নিয়ম (Plan-Validate-Execute Workflow)

Progress Checklist:
- [ ] **Step 1 (Plan & Dynamic Analysis)**: Analyze script deeply — detect Environment (custom background setting), Character Cast (count, distinct ages, attire, strictly no cloned glasses), Emotional Tone (screenShake only for sudden shock, max 1.2s), and select Mode (Story vs Promo).
- [ ] **Approval Gate 1**: Present Scene Plan & Metaphor Table to user. **Do not write code until user says "yes" / "go".**
- [ ] **Step 2 (Synthesize)**: Generate or update topic-specific vector components and `timeline.json`.
- [ ] **Step 2.5 (Validate)**: Mandatory pre-release self-check. Render keyframes via `npx remotion still` and inspect with `read_file`.
- [ ] **Approval Gate 2**: Show still frame previews to user. Ask: *"Ready to render full video?"*
- [ ] **Step 3 (Execute)**: Render MP4 via Remotion and copy to `~/Downloads` and `~/Desktop`.

---

## ৭. প্রগ্রেসিভ ডিসক্লোজার রেফারেন্স (Progressive Disclosure)

অতিরিক্ত বিস্তারিত গাইডলাইনের জন্য প্রয়োজন অনুযায়ী নিচের ফাইলগুলো পড়ুন:
- কার্টুন স্ক্রিপ্টিং ও ডায়লগ লেখার জন্য: `read_file` -> `references/bengali-cartoon-script-writer.md`
- প্রমো মোশন রেফারেন্স অ্যানালাইসিস: `read_file` -> `references/promo-reference-analysis.md`
- রিমোশন গভীর আর্কিটেকচার নির্দেশিকা: `read_file` -> `references/remotion-video-director.md`
- ফুল প্রোডাকশন মাস্টার গাইডলাইন: `read_file` -> `references/MASTER-GUIDELINES.md`

---

## ৮. গটচাস ও সাধারণ ভুলের সমাধান (Gotchas Section)

- **Gotcha 1 (Ghost Subtitles)**: কখনো স্ট্যাটিক `word-timestamps.json` থেকে সাবটাইটেল পড়বেন না। সাবটাইটেল সবসময় বর্তমান স্ক্রিপ্ট ও সিন ডিউরেশন থেকে ডাইনামিক্যালি রেন্ডার হতে হবে।
- **Gotcha 2 (Duplicate Text)**: স্পিচ বাবল বা কিওয়ার্ড কার্ড স্ক্রিনে থাকলে নিচের ক্যাপশন পিল অবশ্যই হাইড রাখতে হবে।
- **Gotcha 3 (Bald Hairline Glitch)**: ক্যারেক্টারের চুলে কখনোই মাথার খুলির ক্রিসেন্ট দাগ উঁকি দিতে দেওয়া যাবে না; সলিড হেয়ার ক্যাপ দিয়ে মাথার ত্বক সম্পূর্ণ আবৃত থাকবে।
- **Gotcha 4 (Generic Asset Cloning)**: নতুন কোনো স্ক্রিপ্টে অপ্রাসঙ্গিক পুরনো আইকন ব্যবহার করবেন না। প্রতিটি বিষয়ের জন্য উপযুক্ত নতুন ভেক্টর তৈরি করুন।
- **Gotcha 5 (Mismatched Backgrounds)**: গল্পের প্রেক্ষাপট কাপড়ের দোকান বা রিটেল শপ হলে কখনো অফিস স্কাইস্ক্র্যাপার ব্যাকগ্রাউন্ড লোড করবেন না। স্ক্রিপ্ট অনুযায়ী ব্যাকগ্রাউন্ড তৈরি করুন।
- **Gotcha 6 (Clone Face Syndrome)**: একাধিক ক্যারেক্টারকে কখনো একই গোল চশমা ও ফেস প্রিসেট দেবেন না। বয়স, গোঁফ, চুল ও পোশাকে বৈচিত্র্য রাখুন।
- **Gotcha 7 (10-15s Persistent Screen Shake)**: কখনো কোনো দৃশ্যে একটানা ১০-১৫ সেকেন্ড স্ক্রিন কাঁপাবেন না। ঝাঁকুনি লাগলেও তা সর্বোচ্চ ১.০-১.২ সেকেন্ডেই ডিকে হয়ে স্থির হয়ে যেতে হবে। সাধারণ কথায় ক্যামেরা ১০০% স্থির থাকবে।
- **Gotcha 8 (Dual Mouth Flapping)**: দুই চরিত্রের দৃশ্যে কখনোই দুজন মানুষের মুখ একসাথে নড়তে দেওয়া যাবে না; যে কথা বলছে শুধুমাত্র তারই মুখ নড়বে (`isSpeaking: true`), অন্যজন শান্ত ভঙ্গিমায় মুখ বন্ধ করে শুনবে।
- **Gotcha 9 (Narrator Mouth Flapping Disaster)**: যখন কথক বা ব্যাকগ্রাউন্ড ভয়েসওভার কোনো ঘটনা বর্ণনা করছে, তখন ক্যারেক্টারদের মুখ কখনোই নড়তে দেওয়া যাবে না। ক্যারেক্টারের মুখ শুধু তাদের নিজস্ব প্রথম পুরুষের উক্তির (`speechBubbles`) সময় নড়বে, বাকি সময় মুখ পুরোপুরি বন্ধ থাকবে।
- **Gotcha 10 (Character Role & Dialogue Mixup)**: একই দৃশ্যে একাধিক চরিত্র থাকলে কখনো ভুল চরিত্রে সংলাপ প্লেস করবেন না। কর্মচারীর সংলাপ কখনো কাস্টমারের পোশাকে থাকা ক্যারেক্টারকে দিয়ে বলাবেন না। চরিত্রের সংলাপ পরিবর্তনের সাথে সাথে ক্যামেরা কাট বা দৃশ্য বিভাজন করুন।
- **Gotcha 11 (Nautilus Download Confusion)**: টার্মিনাল রেন্ডার ব্রাউজার ডাউনলোড বারে দেখায় না। রেন্ডার শেষে ফাইলটি সবসময় ব্যবহারকারীর `~/Downloads/` এবং `~/Desktop/` ডিরেক্টরিতে কপি করে দিন।
- **Gotcha 12 (One-off Script Clutter)**: নতুন কোনো স্ক্রিপ্ট আসলে কখনো রেন্ডম `build-custom-timeline.mjs` জাতীয় ফাইল বানাবেন না। সবসময় স্ট্যান্ডার্ড `scripts/story-input.json` লিখে ইউনিভার্সাল `node scripts/build-story-timeline.mjs --input=scripts/story-input.json` চালাবেন। বাস্তব রেফারেন্সের জন্য `examples/` ফোল্ডার দেখুন।

---

## ৯. প্রজেক্ট স্ক্রিপ্ট কমান্ড রেফারেন্স (Bundled Scripts)

- **SRT ও অডিও ইনপুট পার্সিং (Priority 1)**:
  ```bash
  node scripts/parse-srt-input.mjs --audio=public/media/voice.mp3 --srt=scripts/story.srt --out=scripts/story-input.json
  ```
- **Cartesia TTS অডিও জেনারেশন (Priority 2 Fallback)**:
  ```bash
  node scripts/tts-engine.mjs --batch=scripts/story-input.json --provider=cartesia
  ```
- **ইউনিভার্সাল টাইমলাইন জেনারেশন (Universal Timeline Compiler)**:
  ```bash
  node scripts/build-story-timeline.mjs --input=scripts/story-input.json
  ```
- **স্টিল ফ্রেম সেলফ-চেক রেন্ডার**:
  ```bash
  cd template && npx remotion still src/index.ts Main out/scene1.png --frame 100
  ```
- **লাইভ প্রিভিউ স্টুডিও চালু**:
  ```bash
  cd template && npx remotion studio
  ```
- **ফুল ভিডিও রেন্ডার ও কপি**:
  ```bash
  cd template && npx remotion render src/index.ts Main ./out/final.mp4
  cp ./out/final.mp4 /home/sakib/Downloads/<name>.mp4
  cp ./out/final.mp4 /home/sakib/Desktop/<name>.mp4
  ```

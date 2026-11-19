#!/usr/bin/env python3
"""
Autonomous AI Director & Script Analyzer for Video Generation Skill
=====================================================================
Analyzes raw script text / narration / STT transcript and automatically infers:
1. Physical Activities & Appropriate Props (Computer, Phone, Stool, Cash, Files, Tea Stall, etc.)
2. Characters & Seated/Standing Postures
3. 6 Core Emotions & Facial Expressions (Anger, Joy, Tension, Fear/Shock, Sadness, Neutral)
4. Cinematic Staging (Automated Shot-Reverse-Shot for dialogues)
5. Pacing Rules (Strict 4-10 second scene granularity)
Outputs a production-ready story-input.json.
"""

import json
import re
import sys
import argparse

def analyze_sentence_intent(text):
    t = text.lower()
    
    # 1. Action & Prop Detection
    prop = None
    pose = "standing"
    bg = "corporate_office"
    
    # Computer / Desk
    if any(k in t for k in ["কম্পিউটার", "ল্যাপটপ", "ডেস্ক", "কোডিং", "কাজ করত", "টাইপ", "computer", "laptop", "desk", "screen"]):
        if any(k in t for k in ["ম্যানেজার", "বস", "manager", "boss", "executive"]):
            prop = {"type": "executive_desk"}
            bg = "manager_cabin"
        else:
            prop = {"type": "office_desk_computer"}
            bg = "employee_cubicle"
        pose = "using_computer"
        
    # Tea Stall / Rural / Casual Stool
    elif any(k in t for k in ["চা", "টং", "টুল", "বেঞ্চ", "আড্ডা", "দোকানে", "tea", "stall", "bench", "stool"]):
        bg = "tea_stall"
        prop = {"type": "tea_stall_bench"}
        pose = "drinking_tea" if "চা" in t else "sitting_stool"
        
    # Phone / Smartphone
    elif any(k in t for k in ["ফোন", "মোবাইল", "কল", "মেসেজ", "phone", "call", "mobile", "message"]):
        prop = {"type": "smartphone"}
        pose = "holding_phone"
        
    # Cash / Money / Salary
    elif any(k in t for k in ["টাকা", "বেতন", "ক্যাশ", "বান্ডিল", "ঘুষ", "money", "salary", "cash"]):
        prop = {"type": "cash_counter"}
        pose = "counting_money"
        
    # Resignation / Letters / Disaster
    elif any(k in t for k in ["পদত্যাগ", "চাকরি ছাড়ল", "চলে গেল", "বিপর্যয়", "resignation", "leave", "quit"]):
        prop = {"type": "resignation_letters"}
        pose = "sad"
        
    # Court / Legal
    elif any(k in t for k in ["আদালত", "বিচারক", "আইন", "রায়", "court", "judge", "law"]):
        prop = {"type": "courtroom_desk"}
        bg = "police_station"
        pose = "pointing"
        
    # CEO / Boardroom
    elif any(k in t for k in ["মালিক", "সিইও", "বোর্ডরুম", "তলব", "owner", "ceo", "boardroom"]):
        prop = {"type": "ceo_office_desk"}
        bg = "ceo_boardroom"
        pose = "pointing"

    # Documents / Ledger / Khata
    elif any(k in t for k in ["খাতা", "ফাইল", "হিসাব", "নথি", "কাগজ", "file", "document", "ledger"]):
        pose = "reading_document"

    # 2. Emotional Tone & Micro-Expressions
    metaphor = "none"
    screenShake = False

    # Anger / Arrogance
    if any(k in t for k in ["রেগে", "ধমক", "চিৎকার", "অহংকার", "বিরক্ত", "রাগ", "shout", "angry", "furious"]):
        pose = "shouting" if pose == "standing" else pose
        metaphor = "inner_rage"
        screenShake = True

    # Joy / Triumph
    elif any(k in t for k in ["খুশি", "হাসল", "হাসিমুখে", "আনন্দ", "উচ্ছ্বসিত", "পদোন্নতি", "celebrate", "happy", "smile"]):
        pose = "celebrating" if pose == "standing" else pose

    # Fear / Shock / Sudden Realization
    elif any(k in t for k in ["চমকে", "স্তব্ধ", "থেমে গেল", "ভয়", "কাঁপল", "ধরা পড়ল", "shock", "scared", "fear"]):
        pose = "shocked" if pose == "standing" else pose
        screenShake = True

    # Tension / Worry / Dilemma
    elif any(k in t for k in ["টেনশন", "কী করবে", "দ্বিধা", "শঙ্কা", "চিন্তা", "worried", "tense", "thinking"]):
        pose = "nervous" if pose == "standing" else "thinking"

    # Sadness / Remorse
    elif any(k in t for k in ["মন খারাপ", "কষ্ট", "চুপ করে", "এমন ছিলি না", "অশ্রু", "sad", "hurt", "crying"]):
        pose = "sad" if pose == "standing" else pose
        bg = "blue_melancholy" if bg == "corporate_office" else bg

    # Protest / Standing up
    elif any(k in t for k in ["প্রতিবাদ", "সবার আগে", "দাঁড়াল", "protest"]):
        pose = "pointing"

    return {
        "prop": prop,
        "pose": pose,
        "bg": bg,
        "metaphor": metaphor,
        "screenShake": screenShake
    }

def main():
    parser = argparse.ArgumentParser(description="Autonomous Storyboard Director")
    parser.add_argument("--script", help="Path to script text file")
    parser.add_argument("--stt", help="Path to speech-to-text transcript JSON", default="/tmp/transcript_stt.json")
    parser.add_argument("--out", help="Output story-input.json path", default="scripts/story-input.json")
    args = parser.parse_args()

    print("AI Director Analyzing Script...")

if __name__ == "__main__":
    main()

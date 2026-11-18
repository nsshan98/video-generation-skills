# Video QA Checklist

Mark each item **Pass**, **Issue**, or **Not checked**. Include a timestamp for issues.

## Script & Editorial
- [ ] Story arc and pacing are clear; opening 3 seconds establish a compelling hook.
- [ ] Script is cleanly segmented into beats with natural narrative progression.
- [ ] Cuts preserve meaning, visual variety, and avoid monotonous pacing.
- [ ] On-screen captions highlight key messages without cluttering the screen.

## Voiceover & Audio
- [ ] Voiceover narration is clear, intelligible, and free of harsh distortion or clipping.
- [ ] Spoken words align accurately with on-screen scene visuals and captions.
- [ ] Audio duration is verified with `remotion ffprobe` down to fractions of a second.
- [ ] Background music (if present) is properly ducked below speech so voiceover remains dominant.
- [ ] No abrupt audio cutoffs or pops at scene transitions.

## Visuals & Motion (AI Illustrations to Video)
- [ ] AI scene illustrations match the narrative context and art direction.
- [ ] Camera motion (Ken Burns zoom/pan/drift) is smooth and purposeful without jitter.
- [ ] Aspect ratio matches target export (e.g. 1080x1920 for 9:16 Shorts/Reels; 1920x1080 for 16:9).
- [ ] Text and essential focal points stay within platform safe zones (away from TikTok/Reels UI buttons).
- [ ] Transitions (crossfades, dissolves) are smooth and visually consistent.

## Delivery & Rendering
- [ ] Video renders completely without missing asset errors (`404` or missing frames).
- [ ] Final MP4 playback is smooth, audio and video streams match total timeline duration.
- [ ] Export settings verified (resolution, 30fps, h264 video codec, aac audio codec).
- [ ] Source project files and assets are properly organized and documented.

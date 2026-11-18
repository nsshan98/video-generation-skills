import React from "react";
import { Composition } from "remotion";
import { loadFont } from "@remotion/google-fonts/HindSiliguri";
import timelineData from "./timeline.json";
import { Video } from "./Video";

// Load Google Font Hind Siliguri for pixel-perfect Bengali typography
export const { fontFamily: hindSiliguri } = loadFont();

const timeline = timelineData as any;

const getDuration = (): number => {
  if (timeline.durationInFrames) return timeline.durationInFrames;
  if (timeline.composition?.durationInFrames) return timeline.composition.durationInFrames;
  if (Array.isArray(timeline.scenes)) {
    return timeline.scenes.reduce(
      (acc: number, s: any) => acc + (s.durationInFrames || 0),
      0
    );
  }
  return 300;
};

const getWidth = (): number =>
  timeline.width || timeline.composition?.width || 1080;

const getHeight = (): number =>
  timeline.height || timeline.composition?.height || 1920;

const getFps = (): number =>
  timeline.fps || timeline.composition?.fps || 30;

export const Root: React.FC = () => (
  <>
    <Composition
      id="Main"
      component={Video}
      width={getWidth()}
      height={getHeight()}
      fps={getFps()}
      durationInFrames={getDuration()}
    />
  </>
);

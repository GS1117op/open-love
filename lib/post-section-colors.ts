import type { CSSProperties } from "react";

export type PostSectionKey =
  | "basic"
  | "romance"
  | "values"
  | "experience"
  | "content";

type SectionPalette = {
  containerStyle: CSSProperties;
  badgeStyle: CSSProperties;
};

const palettes: Record<PostSectionKey, SectionPalette> = {
  basic: {
    containerStyle: { borderColor: "rgba(77,153,255,0.25)", background: "rgba(20,10,50,0.6)" },
    badgeStyle: { background: "rgba(77,153,255,0.15)", color: "#99ccff" },
  },
  romance: {
    containerStyle: { borderColor: "rgba(255,77,141,0.3)", background: "rgba(30,10,40,0.6)" },
    badgeStyle: { background: "rgba(255,77,141,0.15)", color: "#ff99c4" },
  },
  values: {
    containerStyle: { borderColor: "rgba(255,183,77,0.25)", background: "rgba(30,20,10,0.6)" },
    badgeStyle: { background: "rgba(255,183,77,0.15)", color: "#ffd099" },
  },
  experience: {
    containerStyle: { borderColor: "rgba(77,255,155,0.2)", background: "rgba(10,30,20,0.6)" },
    badgeStyle: { background: "rgba(77,255,155,0.12)", color: "#99ffcc" },
  },
  content: {
    containerStyle: { borderColor: "rgba(255,77,141,0.2)", background: "rgba(26,10,46,0.6)" },
    badgeStyle: { background: "rgba(255,77,141,0.12)", color: "#e0d0f0" },
  },
};

export function getPostSectionPalette(section: PostSectionKey) {
  return palettes[section];
}

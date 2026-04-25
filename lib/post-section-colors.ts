export type PostSectionKey =
  | "basic"
  | "romance"
  | "values"
  | "experience"
  | "content";

type SectionPalette = {
  containerClassName: string;
  badgeClassName: string;
};

const palettes: Record<PostSectionKey, SectionPalette> = {
  basic: {
    containerClassName: "border-sky-100 bg-sky-50/60",
    badgeClassName: "bg-sky-100 text-sky-700",
  },
  romance: {
    containerClassName: "border-rose-100 bg-rose-50/60",
    badgeClassName: "bg-rose-100 text-rose-700",
  },
  values: {
    containerClassName: "border-amber-100 bg-amber-50/60",
    badgeClassName: "bg-amber-100 text-amber-700",
  },
  experience: {
    containerClassName: "border-emerald-100 bg-emerald-50/60",
    badgeClassName: "bg-emerald-100 text-emerald-700",
  },
  content: {
    containerClassName: "border-slate-200 bg-slate-100/70",
    badgeClassName: "bg-slate-200 text-slate-700",
  },
};

export function getPostSectionPalette(section: PostSectionKey) {
  return palettes[section];
}

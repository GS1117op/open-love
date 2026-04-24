export type AvatarId =
  | "f1" | "f2" | "f3" | "f4" | "f5"
  | "m1" | "m2" | "m3" | "m4" | "m5";

export const FEMALE_AVATAR_IDS: AvatarId[] = ["f1", "f2", "f3", "f4", "f5"];
export const MALE_AVATAR_IDS: AvatarId[] = ["m1", "m2", "m3", "m4", "m5"];
export const ALL_AVATAR_IDS: AvatarId[] = [...FEMALE_AVATAR_IDS, ...MALE_AVATAR_IDS];

const SK = "#FDDCB5";
const SS = "#C8906A";

function AvatarF1() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#FEE2E2" />
      <path d="M10 100 Q10 77 50 75 Q90 77 90 100Z" fill="#FB7185" />
      <path d="M29 40 Q26 78 31 100 L69 100 Q74 78 71 40 Q70 18 50 18 Q30 18 29 40Z" fill="#1a1a1a" />
      <ellipse cx="30" cy="46" rx="3.5" ry="4" fill={SK} />
      <ellipse cx="70" cy="46" rx="3.5" ry="4" fill={SK} />
      <circle cx="50" cy="44" r="20" fill={SK} />
      <path d="M29 40 Q30 22 50 20 Q70 22 71 40 Q69 28 50 27 Q31 28 29 40Z" fill="#1a1a1a" />
      <ellipse cx="43" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <ellipse cx="57" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <circle cx="44.5" cy="42" r="1" fill="white" />
      <circle cx="58.5" cy="42" r="1" fill="white" />
      <path d="M48 50 Q50 52.5 52 50" stroke={SS} strokeWidth="1.2" fill="none" />
      <path d="M44 56 Q50 61 56 56" stroke="#C07050" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="37" cy="51" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
      <ellipse cx="63" cy="51" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
    </svg>
  );
}

function AvatarF2() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#F3E8FF" />
      <path d="M10 100 Q10 77 50 75 Q90 77 90 100Z" fill="#C084FC" />
      <path d="M27 44 Q25 62 30 68 Q40 75 50 75 Q60 75 70 68 Q75 62 73 44 Q70 18 50 18 Q30 18 27 44Z" fill="#6B3A2A" />
      <ellipse cx="30" cy="46" rx="3.5" ry="4" fill={SK} />
      <ellipse cx="70" cy="46" rx="3.5" ry="4" fill={SK} />
      <circle cx="50" cy="44" r="20" fill={SK} />
      <path d="M30 44 Q31 22 50 21 Q69 22 70 44 Q68 30 50 29 Q32 30 30 44Z" fill="#6B3A2A" />
      <ellipse cx="43" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <ellipse cx="57" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <circle cx="44.5" cy="42" r="1" fill="white" />
      <circle cx="58.5" cy="42" r="1" fill="white" />
      <path d="M48 50 Q50 52.5 52 50" stroke={SS} strokeWidth="1.2" fill="none" />
      <path d="M44 56 Q50 61 56 56" stroke="#C07050" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="37" cy="51" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
      <ellipse cx="63" cy="51" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
    </svg>
  );
}

function AvatarF3() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#FFF7ED" />
      <path d="M10 100 Q10 77 50 75 Q90 77 90 100Z" fill="#FB923C" />
      <ellipse cx="22" cy="40" rx="8" ry="13" fill="#1a1a1a" transform="rotate(-15 22 40)" />
      <ellipse cx="78" cy="40" rx="8" ry="13" fill="#1a1a1a" transform="rotate(15 78 40)" />
      <ellipse cx="30" cy="46" rx="3.5" ry="4" fill={SK} />
      <ellipse cx="70" cy="46" rx="3.5" ry="4" fill={SK} />
      <circle cx="50" cy="44" r="20" fill={SK} />
      <path d="M31 42 Q32 22 50 20 Q68 22 69 42 Q67 30 50 29 Q33 30 31 42Z" fill="#1a1a1a" />
      <circle cx="30" cy="30" r="3.5" fill="#FB923C" />
      <circle cx="70" cy="30" r="3.5" fill="#FB923C" />
      <ellipse cx="43" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <ellipse cx="57" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <circle cx="44.5" cy="42" r="1" fill="white" />
      <circle cx="58.5" cy="42" r="1" fill="white" />
      <path d="M48 50 Q50 52.5 52 50" stroke={SS} strokeWidth="1.2" fill="none" />
      <path d="M44 56 Q50 61 56 56" stroke="#C07050" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="37" cy="51" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
      <ellipse cx="63" cy="51" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
    </svg>
  );
}

function AvatarF4() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#FFFBEB" />
      <path d="M10 100 Q10 77 50 75 Q90 77 90 100Z" fill="#FBBF24" />
      <path d="M29 40 Q22 60 24 82 Q28 96 32 100 L68 100 Q72 96 76 82 Q78 60 71 40 Q70 18 50 18 Q30 18 29 40Z" fill="#D4A017" />
      <path d="M23 55 Q27 63 23 71 Q27 79 23 87" stroke="#B8860B" strokeWidth="2" fill="none" />
      <path d="M77 55 Q73 63 77 71 Q73 79 77 87" stroke="#B8860B" strokeWidth="2" fill="none" />
      <ellipse cx="30" cy="46" rx="3.5" ry="4" fill={SK} />
      <ellipse cx="70" cy="46" rx="3.5" ry="4" fill={SK} />
      <circle cx="50" cy="44" r="20" fill={SK} />
      <path d="M29 40 Q30 22 50 20 Q70 22 71 40 Q69 28 50 27 Q31 28 29 40Z" fill="#D4A017" />
      <ellipse cx="43" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <ellipse cx="57" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <circle cx="44.5" cy="42" r="1" fill="white" />
      <circle cx="58.5" cy="42" r="1" fill="white" />
      <path d="M48 50 Q50 52.5 52 50" stroke={SS} strokeWidth="1.2" fill="none" />
      <path d="M44 56 Q50 61 56 56" stroke="#C07050" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="37" cy="51" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
      <ellipse cx="63" cy="51" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
    </svg>
  );
}

function AvatarF5() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#ECFDF5" />
      <path d="M10 100 Q10 77 50 75 Q90 77 90 100Z" fill="#34D399" />
      <circle cx="50" cy="16" r="11" fill="#3D2314" />
      <path d="M30 44 Q28 50 30 60" stroke="#3D2314" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M70 44 Q72 50 70 60" stroke="#3D2314" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="30" cy="46" rx="3.5" ry="4" fill={SK} />
      <ellipse cx="70" cy="46" rx="3.5" ry="4" fill={SK} />
      <circle cx="50" cy="44" r="20" fill={SK} />
      <path d="M31 40 Q32 24 50 22 Q68 24 69 40 Q67 30 50 29 Q33 30 31 40Z" fill="#3D2314" />
      <ellipse cx="43" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <ellipse cx="57" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <circle cx="44.5" cy="42" r="1" fill="white" />
      <circle cx="58.5" cy="42" r="1" fill="white" />
      <path d="M48 50 Q50 52.5 52 50" stroke={SS} strokeWidth="1.2" fill="none" />
      <path d="M44 56 Q50 61 56 56" stroke="#C07050" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="37" cy="51" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
      <ellipse cx="63" cy="51" rx="5" ry="3" fill="#FCA5A5" opacity="0.6" />
    </svg>
  );
}

function AvatarM1() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#EFF6FF" />
      <path d="M10 100 Q10 77 50 75 Q90 77 90 100Z" fill="#3B82F6" />
      <ellipse cx="30" cy="46" rx="3.5" ry="4" fill={SK} />
      <ellipse cx="70" cy="46" rx="3.5" ry="4" fill={SK} />
      <circle cx="50" cy="44" r="20" fill={SK} />
      <path d="M30 42 Q31 24 50 22 Q69 24 70 42 Q68 30 50 29 Q32 30 30 42Z" fill="#1a1a1a" />
      <rect x="28.5" y="35" width="3" height="10" rx="1.5" fill="#1a1a1a" />
      <rect x="68.5" y="35" width="3" height="10" rx="1.5" fill="#1a1a1a" />
      <ellipse cx="43" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <ellipse cx="57" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <circle cx="44.5" cy="42" r="1" fill="white" />
      <circle cx="58.5" cy="42" r="1" fill="white" />
      <path d="M48 50 Q50 52.5 52 50" stroke={SS} strokeWidth="1.2" fill="none" />
      <path d="M44 57 Q50 61 56 57" stroke="#B06840" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function AvatarM2() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#ECFDF5" />
      <path d="M10 100 Q10 77 50 75 Q90 77 90 100Z" fill="#10B981" />
      <ellipse cx="30" cy="46" rx="3.5" ry="4" fill={SK} />
      <ellipse cx="70" cy="46" rx="3.5" ry="4" fill={SK} />
      <circle cx="50" cy="44" r="20" fill={SK} />
      <path d="M30 40 Q28 20 35 16 Q38 25 42 18 Q46 12 50 17 Q54 11 58 18 Q62 23 65 16 Q72 20 70 40 Q66 28 50 27 Q34 28 30 40Z" fill="#6B3A2A" />
      <ellipse cx="43" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <ellipse cx="57" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <circle cx="44.5" cy="42" r="1" fill="white" />
      <circle cx="58.5" cy="42" r="1" fill="white" />
      <path d="M48 50 Q50 52.5 52 50" stroke={SS} strokeWidth="1.2" fill="none" />
      <path d="M44 57 Q50 61 56 57" stroke="#B06840" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function AvatarM3() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#EEF2FF" />
      <path d="M10 100 Q10 77 50 75 Q90 77 90 100Z" fill="#6366F1" />
      <ellipse cx="30" cy="46" rx="3.5" ry="4" fill={SK} />
      <ellipse cx="70" cy="46" rx="3.5" ry="4" fill={SK} />
      <circle cx="50" cy="44" r="20" fill={SK} />
      <path d="M31 42 Q32 26 50 24 Q68 26 69 42 Q67 32 50 31 Q33 32 31 42Z" fill="#1a1a1a" />
      <circle cx="41" cy="59" r="1.2" fill="#888" opacity="0.7" />
      <circle cx="45" cy="61" r="1.2" fill="#888" opacity="0.7" />
      <circle cx="50" cy="62" r="1.2" fill="#888" opacity="0.7" />
      <circle cx="55" cy="61" r="1.2" fill="#888" opacity="0.7" />
      <circle cx="59" cy="59" r="1.2" fill="#888" opacity="0.7" />
      <circle cx="38" cy="57" r="1" fill="#888" opacity="0.5" />
      <circle cx="62" cy="57" r="1" fill="#888" opacity="0.5" />
      <ellipse cx="43" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <ellipse cx="57" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <circle cx="44.5" cy="42" r="1" fill="white" />
      <circle cx="58.5" cy="42" r="1" fill="white" />
      <path d="M48 50 Q50 52.5 52 50" stroke={SS} strokeWidth="1.2" fill="none" />
      <path d="M44 57 Q50 61 56 57" stroke="#B06840" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function AvatarM4() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#F8FAFC" />
      <path d="M10 100 Q10 77 50 75 Q90 77 90 100Z" fill="#64748B" />
      <ellipse cx="30" cy="46" rx="3.5" ry="4" fill={SK} />
      <ellipse cx="70" cy="46" rx="3.5" ry="4" fill={SK} />
      <circle cx="50" cy="44" r="20" fill={SK} />
      <path d="M30 42 Q31 22 50 21 Q69 22 70 42 Q68 30 52 29 L50 21 L48 29 Q32 30 30 42Z" fill="#3D2314" />
      <circle cx="43" cy="43" r="6.5" stroke="#475569" strokeWidth="1.5" fill="none" />
      <circle cx="57" cy="43" r="6.5" stroke="#475569" strokeWidth="1.5" fill="none" />
      <line x1="49.5" y1="43" x2="50.5" y2="43" stroke="#475569" strokeWidth="1.5" />
      <line x1="30" y1="41" x2="36.5" y2="42" stroke="#475569" strokeWidth="1.5" />
      <line x1="63.5" y1="42" x2="70" y2="41" stroke="#475569" strokeWidth="1.5" />
      <ellipse cx="43" cy="43" rx="2" ry="2.5" fill="#1a1a1a" />
      <ellipse cx="57" cy="43" rx="2" ry="2.5" fill="#1a1a1a" />
      <circle cx="44" cy="42" r="0.8" fill="white" />
      <circle cx="58" cy="42" r="0.8" fill="white" />
      <path d="M48 50 Q50 52.5 52 50" stroke={SS} strokeWidth="1.2" fill="none" />
      <path d="M44 57 Q50 61 56 57" stroke="#B06840" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function AvatarM5() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#F5F3FF" />
      <path d="M10 100 Q10 77 50 75 Q90 77 90 100Z" fill="#8B5CF6" />
      <ellipse cx="30" cy="46" rx="3.5" ry="4" fill={SK} />
      <ellipse cx="70" cy="46" rx="3.5" ry="4" fill={SK} />
      <circle cx="50" cy="44" r="20" fill={SK} />
      <path d="M30 44 Q28 20 50 20 Q70 20 71 42 Q68 30 50 29 Q32 30 30 44Z" fill="#1a1a1a" />
      <path d="M30 38 Q25 46 26 56" stroke="#1a1a1a" strokeWidth="7" fill="none" strokeLinecap="round" />
      <ellipse cx="43" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <ellipse cx="57" cy="43" rx="2.5" ry="3" fill="#1a1a1a" />
      <circle cx="44.5" cy="42" r="1" fill="white" />
      <circle cx="58.5" cy="42" r="1" fill="white" />
      <path d="M48 50 Q50 52.5 52 50" stroke={SS} strokeWidth="1.2" fill="none" />
      <path d="M44 57 Q50 61 56 57" stroke="#B06840" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const avatarComponents: Record<AvatarId, React.ReactElement> = {
  f1: <AvatarF1 />,
  f2: <AvatarF2 />,
  f3: <AvatarF3 />,
  f4: <AvatarF4 />,
  f5: <AvatarF5 />,
  m1: <AvatarM1 />,
  m2: <AvatarM2 />,
  m3: <AvatarM3 />,
  m4: <AvatarM4 />,
  m5: <AvatarM5 />,
};

export const avatarLabels: Record<AvatarId, string> = {
  f1: "ロングストレート",
  f2: "ショートボブ",
  f3: "ツインテール",
  f4: "ロングウェーブ",
  f5: "お団子ヘア",
  m1: "ショートヘア",
  m2: "ワイルド",
  m3: "無精髭",
  m4: "メガネ",
  m5: "サイドスウィープ",
};

export function AvatarIllustration({
  id,
  size = 48,
  className,
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  const component = avatarComponents[id as AvatarId];
  if (!component) return null;
  return (
    <div
      style={{ width: size, height: size }}
      className={`overflow-hidden rounded-full flex-shrink-0 ${className ?? ""}`}
    >
      {component}
    </div>
  );
}

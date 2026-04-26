"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { PostChartCard, type ChartDatum } from "./post-chart-card";
import { cn } from "@/lib/utils";
import { getPostSectionPalette, type PostSectionKey } from "@/lib/post-section-colors";
import {
  Bar,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

type PostGraphRecord = {
  gender: string | null;
  age: number | null;
  status: string | null;
  prefecture: string | null;
  mbti: string | null;
  income: number | null;
  education: string | null;
  height: number | null;
  weight: number | null;
  cup_size: string | null;
  penis_length: number | null;
  first_experience_age: number | null;
  relationship_count: number | null;
  experience_count: number | null;
  sex_frequency: number | null;
  ideal_sex_frequency: number | null;
  masturbation_frequency: number | null;
  sex_duration: number | null;
  ideal_sex_duration: number | null;
  sex_satisfaction: number | null;
  marriage_intent: number | null;
  housewife_preference: number | null;
  desired_children: number | null;
  cheating_definition: number | null;
  cheating_desire: number | null;
  reaction_to_cheating: number | null;
  cohabitation_level: number | null;
  dating_app_level: number | null;
  no_condom_level: number | null;
  creampie_level: number | null;
  cheating_level: number | null;
  cheated_level: number | null;
};

type ChartConfig = {
  id: string;
  title: string;
  description: string;
  chartType: "pie" | "bar";
  horizontal?: boolean;
  dataByGender: Array<{ label: string; data: ChartDatum[] }>;
};

type SectionConfig = {
  sectionKey: PostSectionKey;
  title: string;
  description: string;
  charts: ChartConfig[];
};

type GenderDashboard = {
  gender: "女性" | "男性";
  totalCount: number;
  averageAge: number | null;
  averageRelationshipCount: number | null;
  averageExperienceCount: number | null;
  averageSexFrequency: number | null;
  averageSatisfaction: number | null;
};

type DashboardData = {
  genderDashboards: GenderDashboard[];
  sections: SectionConfig[];
};

type FilterEntry =
  | {
      field: string;
      mode: "multi";
      values: string[];
    }
  | {
      field: string;
      mode: "range";
      min: string;
      max: string;
    };

type ComboType = "bar+bar" | "bar+line" | "line+line" | "scatter";

type BuilderState = {
  fields: string[];
  chart: "pie" | "bar";
  combo: ComboType;
  filters: FilterEntry[];
};

type CustomFieldConfig = {
  key: string;
  label: string;
  sectionKey: PostSectionKey;
  description: string;
  chartType: "pie" | "bar";
  horizontal?: boolean;
  order?: string[];
  getValue: (post: PostGraphRecord) => string;
};

type MultiFilterFieldConfig = {
  key: string;
  label: string;
  mode: "multi";
  getValue: (post: PostGraphRecord) => string;
  order?: string[];
  options?: SelectOption[];
};

type RangeFilterFieldConfig = {
  key: string;
  label: string;
  mode: "range";
  getValue: (post: PostGraphRecord) => number | null;
  minValue: number;
  maxValue: number;
  step?: number;
  unit?: string;
};

type FilterFieldConfig = MultiFilterFieldConfig | RangeFilterFieldConfig;

type BuilderInstance = {
  key: string;
  title: string;
};

type SelectOption = {
  label: string;
  value: string;
};

type NumericSelectOption = {
  label: string;
  value: number;
};

const SELECT_COLUMNS = `
  gender,
  age,
  status,
  prefecture,
  mbti,
  income,
  education,
  height,
  weight,
  cup_size,
  penis_length,
  first_experience_age,
  relationship_count,
  experience_count,
  sex_frequency,
  ideal_sex_frequency,
  masturbation_frequency,
  sex_duration,
  ideal_sex_duration,
  sex_satisfaction,
  marriage_intent,
  housewife_preference,
  desired_children,
  cheating_definition,
  cheating_desire,
  reaction_to_cheating,
  cohabitation_level,
  dating_app_level,
  no_condom_level,
  creampie_level,
  cheating_level,
  cheated_level
`;

const UNKNOWN_LABEL = "未回答";
const AGE_ORDER = ["10代前半", "10代後半", "20代前半", "20代後半", "30代前半", "30代後半", "40代前半", "40代後半", "50代前半", "50代後半", "60代以上", UNKNOWN_LABEL];
const STATUS_ORDER = ["恋人募集中", "交際中", "既婚", "恋人不要", UNKNOWN_LABEL];
const COUNT_ORDER = ["0", "1-2", "3-5", "6-9", "10+", UNKNOWN_LABEL];
const FREQ_ORDER = ["0", "1", "2-3", "4-5", "6+", UNKNOWN_LABEL];
const SATISFACTION_ORDER = ["0-19", "20-39", "40-59", "60-79", "80-100", UNKNOWN_LABEL];
const SCORE_ORDER = ["1", "2", "3", "4", "5", UNKNOWN_LABEL];
const HEIGHT_ORDER = ["140未満", "140-149", "150-159", "160-169", "170-179", "180以上", UNKNOWN_LABEL];
const WEIGHT_ORDER = ["40未満", "40-49", "50-59", "60-69", "70-79", "80以上", UNKNOWN_LABEL];
const LENGTH_ORDER = ["5未満", "5-9", "10-14", "15-19", "20以上", UNKNOWN_LABEL];
const DURATION_ORDER = ["0-9", "10-19", "20-29", "30-44", "45-59", "60以上", UNKNOWN_LABEL];

const FORM_GENDER_OPTIONS = ["女性", "男性", "その他", "回答しない"] as const;
const FORM_STATUS_OPTIONS = ["独身", "交際中", "既婚", "離婚"] as const;
const FORM_MBTI_OPTIONS = [
  "INTJ（建築家）",
  "INTP（論理学者）",
  "ENTJ（指揮官）",
  "ENTP（討論者）",
  "INFJ（提唱者）",
  "INFP（仲介者）",
  "ENFJ（主人公）",
  "ENFP（運動家）",
  "ISTJ（管理者）",
  "ISFJ（擁護者）",
  "ESTJ（幹部）",
  "ESFJ（領事）",
  "ISTP（巨匠）",
  "ISFP（冒険家）",
  "ESTP（起業家）",
  "ESFP（エンターテイナー）",
] as const;
const FORM_AGE_OPTIONS: NumericSelectOption[] = [
  ...Array.from({ length: 9 }, (_, i) => {
    const value = 15 + i * 5;
    return { label: `${value}歳`, value };
  }),
  { label: "60歳以上", value: 60 },
];
const FORM_HEIGHT_OPTIONS: NumericSelectOption[] = [
  ...Array.from({ length: 13 }, (_, i) => {
    const value = 135 + i * 5;
    return { label: `${value}cm`, value };
  }),
  { label: "200cm以上", value: 200 },
];
const FORM_WEIGHT_OPTIONS: NumericSelectOption[] = [
  ...Array.from({ length: 15 }, (_, i) => {
    const value = 25 + i * 5;
    return { label: `${value}kg`, value };
  }),
  { label: "100kg以上", value: 100 },
];
const FORM_PENIS_LENGTH_OPTIONS: NumericSelectOption[] = [
  ...Array.from({ length: 9 }, (_, i) => {
    const value = (i + 1) * 2;
    return { label: `${value}cm`, value };
  }),
  { label: "20cm以上", value: 20 },
];
const FORM_INCOME_OPTIONS: NumericSelectOption[] = [
  ...Array.from({ length: 19 }, (_, i) => {
    const value = (i + 1) * 100;
    return { label: `${value}万円台`, value };
  }),
  { label: "2000万円以上", value: 2000 },
];
const FORM_EDUCATION_OPTIONS = [
  "東京一工（東大・京大・一橋・東工大）",
  "旧帝大（北大・東北大・名古屋大・阪大・九大）",
  "早慶（早稲田・慶應）",
  "上智・東京理科大・ICU",
  "MARCH・関関同立",
  "日東駒専・産近甲龍",
  "その他4年制大学",
  "短大・専門学校",
  "高卒",
  "中卒",
] as const;
const FORM_PREFECTURE_OPTIONS = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
] as const;
const FORM_CUP_SIZE_OPTIONS = ["A", "B", "C", "D", "E", "F", "G", "H以上"] as const;
const FORM_RATING_OPTIONS = {
  marriageIntent: [
    "全く結婚したくない",
    "あまり結婚したくない",
    "どちらともいえない",
    "できれば結婚したい",
    "強く結婚したい",
  ],
  housewifePreference: [
    "全く希望しない",
    "あまり希望しない",
    "どちらともいえない",
    "できれば希望する",
    "強く希望する",
  ],
  desiredChildren: [
    "子供は欲しくない",
    "できれば欲しくない",
    "どちらともいえない",
    "できれば欲しい",
    "強く欲しい",
  ],
  cheatingDefinition: [
    "肉体関係から",
    "キスから",
    "手をつなぐ・密着から",
    "2人きりで会うから",
    "連絡を取り合う時点で",
  ],
  cheatingDesire: [
    "全くない",
    "ほとんどない",
    "少しある",
    "かなりある",
    "強くある",
  ],
  reactionToCheating: [
    "許す",
    "話し合って考える",
    "条件次第で別れる",
    "基本的に別れる",
    "絶対に別れる",
  ],
} as const;
const FORM_EXPERIENCE_OPTIONS = {
  cohabitation: [
    "全くない",
    "少しある（短期間）",
    "ある（数ヶ月程度）",
    "長期間ある（1年以上）",
    "現在同棲中",
  ],
  datingApp: [
    "全く使ったことがない",
    "少し使ったことがある",
    "何度か使ったことがある",
    "頻繁に使っている",
    "現在もメインで使っている",
  ],
  noCondom: [
    "一度もない",
    "1〜2回だけある",
    "何度かある",
    "よくある",
    "ほぼ毎回",
  ],
  creampie: [
    "一度もない",
    "1〜2回だけある",
    "何度かある",
    "よくある",
    "ほぼ毎回",
  ],
  cheating: [
    "一度もない",
    "過去に1回だけある",
    "何度かある",
    "複数人である",
    "継続的にしている",
  ],
  cheated: [
    "一度もない",
    "過去に1回だけある",
    "何度かある",
    "複数の相手にされたことがある",
    "頻繁に経験している",
  ],
} as const;

function toSelectOptions(options: readonly string[]): SelectOption[] {
  return options.map((label) => ({ label, value: label }));
}

function toNumericSelectOptions(options: readonly NumericSelectOption[]): SelectOption[] {
  return options.map((option) => ({ label: option.label, value: String(option.value) }));
}

function toScaleFilterOptions(options: readonly string[]): SelectOption[] {
  return options.map((label, index) => ({
    label,
    value: String(index + 1),
  }));
}

const builderDefaultState: BuilderState = {
  fields: ["status"],
  chart: "bar",
  combo: "bar+line",
  filters: [],
};

const CUSTOM_GRAPH_BUILDERS: BuilderInstance[] = [
  { key: "builderTop", title: "自由グラフ 1" },
  { key: "builderBottom", title: "自由グラフ 2" },
];

function calculateAverage(values: Array<number | null>) {
  const validValues = values.filter((value): value is number => value !== null);
  if (validValues.length === 0) {
    return null;
  }
  return validValues.reduce((sum, value) => sum + value, 0) / validValues.length;
}

function formatSummaryValue(value: number | null | undefined, suffix = "", digits = 1) {
  if (value == null || Number.isNaN(value)) {
    return "-";
  }

  return `${value.toFixed(digits)}${suffix}`;
}

function normalizeGender(value: string | null) {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) {
    return UNKNOWN_LABEL;
  }

  if (
    normalized === "female" ||
    normalized === "女性" ||
    value === "螂ｳ諤ｧ" ||
    value === "螂ｳ" ||
    value === "女性" ||
    value === "陞ゑｽｳ隲､・ｧ"
  ) {
    return "女性";
  }

  if (
    normalized === "male" ||
    normalized === "男性" ||
    value === "逕ｷ諤ｧ" ||
    value === "逕ｷ" ||
    value === "男性" ||
    value === "騾包ｽｷ隲､・ｧ"
  ) {
    return "男性";
  }

  return value?.trim() || UNKNOWN_LABEL;
}

function normalizeStatus(value: string | null) {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) {
    return UNKNOWN_LABEL;
  }

  if (
    normalized === "looking" ||
    value === "諱倶ｺｺ謗｢縺嶺ｸｭ" ||
    value === "隲ｱ蛟ｶ・ｺ・ｺ隰暦ｽ｢邵ｺ蠍ｺ・ｸ・ｭ"
  ) {
    return "恋人募集中";
  }

  if (normalized === "dating" || value === "諱区・荳ｭ" || value === "隲ｱ蛹ｺ繝ｻ闕ｳ・ｭ") {
    return "交際中";
  }

  if (normalized === "married" || value === "邨仙ｩ壻ｸｭ" || value === "驍ｨ莉呻ｽｩ螢ｻ・ｸ・ｭ") {
    return "既婚";
  }

  if (
    normalized === "not_needed" ||
    value === "諱倶ｺｺ荳崎ｦ・" ||
    value?.startsWith("隲ｱ蛟ｶ・ｺ・ｺ闕ｳ")
  ) {
    return "恋人不要";
  }

  return value ?? UNKNOWN_LABEL;
}

function getAgeLabel(age: number | null) {
  if (age === null) return UNKNOWN_LABEL;
  if (age < 15) return "10代前半";
  if (age < 20) return "10代後半";
  if (age < 25) return "20代前半";
  if (age < 30) return "20代後半";
  if (age < 35) return "30代前半";
  if (age < 40) return "30代後半";
  if (age < 45) return "40代前半";
  if (age < 50) return "40代後半";
  if (age < 55) return "50代前半";
  if (age < 60) return "50代後半";
  return "60代以上";
}

function incomeBucket(income: number | null) {
  if (income === null) return UNKNOWN_LABEL;
  if (income < 300) return "<300";
  if (income >= 1000) return "1000+";
  const base = Math.floor(income / 200) * 200;
  return `${base}-${base + 199}`;
}

function countBucket(value: number | null) {
  if (value === null) return UNKNOWN_LABEL;
  if (value === 0) return "0";
  if (value <= 2) return "1-2";
  if (value <= 5) return "3-5";
  if (value <= 9) return "6-9";
  return "10+";
}

function frequencyBucket(value: number | null) {
  if (value === null) return UNKNOWN_LABEL;
  if (value === 0) return "0";
  if (value === 1) return "1";
  if (value <= 3) return "2-3";
  if (value <= 5) return "4-5";
  return "6+";
}

function satisfactionBucket(value: number | null) {
  if (value === null) return UNKNOWN_LABEL;
  if (value < 20) return "0-19";
  if (value < 40) return "20-39";
  if (value < 60) return "40-59";
  if (value < 80) return "60-79";
  return "80-100";
}

function scoreValue(value: number | null) {
  return value != null ? String(value) : UNKNOWN_LABEL;
}

function rangeBucket(
  value: number | null,
  ranges: Array<{ maxExclusive?: number; label: string }>
) {
  if (value === null) return UNKNOWN_LABEL;

  for (const range of ranges) {
    if (range.maxExclusive === undefined || value < range.maxExclusive) {
      return range.label;
    }
  }

  return UNKNOWN_LABEL;
}

const customFieldConfigs: CustomFieldConfig[] = [
  {
    key: "gender",
    label: "性別",
    sectionKey: "basic",
    description: "性別の分布です。",
    chartType: "pie",
    getValue: (post) => normalizeGender(post.gender),
  },
  {
    key: "status",
    label: "ステータス",
    sectionKey: "basic",
    description: "ステータスの分布です。",
    chartType: "pie",
    order: STATUS_ORDER,
    getValue: (post) => normalizeStatus(post.status),
  },
  {
    key: "age",
    label: "年齢",
    sectionKey: "basic",
    description: "年齢の分布です。",
    chartType: "bar",
    order: AGE_ORDER,
    getValue: (post) => getAgeLabel(post.age),
  },
  {
    key: "prefecture",
    label: "居住エリア",
    sectionKey: "basic",
    description: "都道府県の分布です。",
    chartType: "bar",
    horizontal: true,
    getValue: (post) => post.prefecture?.trim() || UNKNOWN_LABEL,
  },
  {
    key: "mbti",
    label: "MBTI",
    sectionKey: "basic",
    description: "MBTIの分布です。",
    chartType: "bar",
    horizontal: true,
    getValue: (post) => post.mbti?.trim() || UNKNOWN_LABEL,
  },
  {
    key: "income",
    label: "年収",
    sectionKey: "basic",
    description: "年収帯の分布です。",
    chartType: "bar",
    getValue: (post) => incomeBucket(post.income),
  },
  {
    key: "education",
    label: "学歴",
    sectionKey: "basic",
    description: "学歴の分布です。",
    chartType: "bar",
    horizontal: true,
    getValue: (post) => post.education?.trim() || UNKNOWN_LABEL,
  },
  {
    key: "height",
    label: "身長",
    sectionKey: "basic",
    description: "身長帯の分布です。",
    chartType: "bar",
    order: HEIGHT_ORDER,
    getValue: (post) =>
      rangeBucket(post.height, [
        { maxExclusive: 140, label: "140未満" },
        { maxExclusive: 150, label: "140-149" },
        { maxExclusive: 160, label: "150-159" },
        { maxExclusive: 170, label: "160-169" },
        { maxExclusive: 180, label: "170-179" },
        { label: "180以上" },
      ]),
  },
  {
    key: "weight",
    label: "体重",
    sectionKey: "basic",
    description: "体重帯の分布です。",
    chartType: "bar",
    order: WEIGHT_ORDER,
    getValue: (post) =>
      rangeBucket(post.weight, [
        { maxExclusive: 40, label: "40未満" },
        { maxExclusive: 50, label: "40-49" },
        { maxExclusive: 60, label: "50-59" },
        { maxExclusive: 70, label: "60-69" },
        { maxExclusive: 80, label: "70-79" },
        { label: "80以上" },
      ]),
  },
  {
    key: "cup_size",
    label: "カップ数",
    sectionKey: "basic",
    description: "カップ数の分布です。",
    chartType: "bar",
    getValue: (post) => post.cup_size?.trim() || UNKNOWN_LABEL,
  },
  {
    key: "penis_length",
    label: "チンコの長さ",
    sectionKey: "basic",
    description: "ペニス長の分布です。",
    chartType: "bar",
    order: LENGTH_ORDER,
    getValue: (post) =>
      rangeBucket(post.penis_length, [
        { maxExclusive: 5, label: "5未満" },
        { maxExclusive: 10, label: "5-9" },
        { maxExclusive: 15, label: "10-14" },
        { maxExclusive: 20, label: "15-19" },
        { label: "20以上" },
      ]),
  },
  {
    key: "first_experience_age",
    label: "初体験の年齢",
    sectionKey: "romance",
    description: "初体験年齢の分布です。",
    chartType: "bar",
    order: AGE_ORDER,
    getValue: (post) => getAgeLabel(post.first_experience_age),
  },
  {
    key: "relationship_count",
    label: "付き合った人数",
    sectionKey: "romance",
    description: "交際人数の分布です。",
    chartType: "bar",
    order: COUNT_ORDER,
    getValue: (post) => countBucket(post.relationship_count),
  },
  {
    key: "experience_count",
    label: "経験人数",
    sectionKey: "romance",
    description: "経験人数の分布です。",
    chartType: "bar",
    order: COUNT_ORDER,
    getValue: (post) => countBucket(post.experience_count),
  },
  {
    key: "sex_frequency",
    label: "1週間のセックス回数（実態）",
    sectionKey: "romance",
    description: "セックス頻度の分布です。",
    chartType: "bar",
    order: FREQ_ORDER,
    getValue: (post) => frequencyBucket(post.sex_frequency),
  },
  {
    key: "ideal_sex_frequency",
    label: "1週間のセックス回数（理想）",
    sectionKey: "romance",
    description: "理想のセックス頻度の分布です。",
    chartType: "bar",
    order: FREQ_ORDER,
    getValue: (post) => frequencyBucket(post.ideal_sex_frequency),
  },
  {
    key: "masturbation_frequency",
    label: "1週間のオナニー回数",
    sectionKey: "romance",
    description: "自慰頻度の分布です。",
    chartType: "bar",
    order: FREQ_ORDER,
    getValue: (post) => frequencyBucket(post.masturbation_frequency),
  },
  {
    key: "sex_duration",
    label: "セックス1回の時間（実態）",
    sectionKey: "romance",
    description: "セックス時間の分布です。",
    chartType: "bar",
    order: DURATION_ORDER,
    getValue: (post) =>
      rangeBucket(post.sex_duration, [
        { maxExclusive: 10, label: "0-9" },
        { maxExclusive: 20, label: "10-19" },
        { maxExclusive: 30, label: "20-29" },
        { maxExclusive: 45, label: "30-44" },
        { maxExclusive: 60, label: "45-59" },
        { label: "60以上" },
      ]),
  },
  {
    key: "ideal_sex_duration",
    label: "セックス1回の時間（理想）",
    sectionKey: "romance",
    description: "理想のセックス時間の分布です。",
    chartType: "bar",
    order: DURATION_ORDER,
    getValue: (post) =>
      rangeBucket(post.ideal_sex_duration, [
        { maxExclusive: 10, label: "0-9" },
        { maxExclusive: 20, label: "10-19" },
        { maxExclusive: 30, label: "20-29" },
        { maxExclusive: 45, label: "30-44" },
        { maxExclusive: 60, label: "45-59" },
        { label: "60以上" },
      ]),
  },
  {
    key: "sex_satisfaction",
    label: "現在のセックスライフの満足度（0〜100）",
    sectionKey: "romance",
    description: "満足度の分布です。",
    chartType: "bar",
    order: SATISFACTION_ORDER,
    getValue: (post) => satisfactionBucket(post.sex_satisfaction),
  },
  {
    key: "marriage_intent",
    label: "結婚願望",
    sectionKey: "values",
    description: "結婚意欲の分布です。",
    chartType: "bar",
    order: SCORE_ORDER,
    getValue: (post) => scoreValue(post.marriage_intent),
  },
  {
    key: "housewife_preference",
    label: "専業主婦希望",
    sectionKey: "values",
    description: "専業主婦希望の分布です。",
    chartType: "bar",
    order: SCORE_ORDER,
    getValue: (post) => scoreValue(post.housewife_preference),
  },
  {
    key: "desired_children",
    label: "子供の人数願望",
    sectionKey: "values",
    description: "子ども希望の分布です。",
    chartType: "bar",
    order: SCORE_ORDER,
    getValue: (post) => scoreValue(post.desired_children),
  },
  {
    key: "cheating_definition",
    label: "どこからが浮気か",
    sectionKey: "values",
    description: "浮気の定義の分布です。",
    chartType: "bar",
    order: SCORE_ORDER,
    getValue: (post) => scoreValue(post.cheating_definition),
  },
  {
    key: "cheating_desire",
    label: "浮気願望",
    sectionKey: "values",
    description: "浮気願望の分布です。",
    chartType: "bar",
    order: SCORE_ORDER,
    getValue: (post) => scoreValue(post.cheating_desire),
  },
  {
    key: "reaction_to_cheating",
    label: "浮気されたらどうするか",
    sectionKey: "values",
    description: "浮気された時の対応の分布です。",
    chartType: "bar",
    order: SCORE_ORDER,
    getValue: (post) => scoreValue(post.reaction_to_cheating),
  },
  {
    key: "cohabitation_level",
    label: "同棲経験",
    sectionKey: "experience",
    description: "同棲経験の分布です。",
    chartType: "bar",
    order: SCORE_ORDER,
    getValue: (post) => scoreValue(post.cohabitation_level),
  },
  {
    key: "dating_app_level",
    label: "マチアプ経験",
    sectionKey: "experience",
    description: "マッチングアプリ経験の分布です。",
    chartType: "bar",
    order: SCORE_ORDER,
    getValue: (post) => scoreValue(post.dating_app_level),
  },
  {
    key: "no_condom_level",
    label: "ゴムなしの経験",
    sectionKey: "experience",
    description: "ゴムなし経験の分布です。",
    chartType: "bar",
    order: SCORE_ORDER,
    getValue: (post) => scoreValue(post.no_condom_level),
  },
  {
    key: "creampie_level",
    label: "中出しの経験",
    sectionKey: "experience",
    description: "中出し経験の分布です。",
    chartType: "bar",
    order: SCORE_ORDER,
    getValue: (post) => scoreValue(post.creampie_level),
  },
  {
    key: "cheating_level",
    label: "浮気経験",
    sectionKey: "experience",
    description: "浮気経験の分布です。",
    chartType: "bar",
    order: SCORE_ORDER,
    getValue: (post) => scoreValue(post.cheating_level),
  },
  {
    key: "cheated_level",
    label: "浮気された経験",
    sectionKey: "experience",
    description: "浮気された経験の分布です。",
    chartType: "bar",
    order: SCORE_ORDER,
    getValue: (post) => scoreValue(post.cheated_level),
  },
];

const filterFieldConfigs: FilterFieldConfig[] = [
  {
    key: "gender",
    label: "性別",
    mode: "multi",
    getValue: (post) => normalizeGender(post.gender),
    order: [...FORM_GENDER_OPTIONS, UNKNOWN_LABEL],
    options: toSelectOptions(FORM_GENDER_OPTIONS),
  },
  {
    key: "status",
    label: "ステータス",
    mode: "multi",
    getValue: (post) => post.status?.trim() || UNKNOWN_LABEL,
    order: [...FORM_STATUS_OPTIONS, UNKNOWN_LABEL],
    options: toSelectOptions(FORM_STATUS_OPTIONS),
  },
  {
    key: "prefecture",
    label: "居住エリア",
    mode: "multi",
    getValue: (post) => post.prefecture?.trim() || UNKNOWN_LABEL,
    options: toSelectOptions(FORM_PREFECTURE_OPTIONS),
  },
  {
    key: "mbti",
    label: "MBTI",
    mode: "multi",
    getValue: (post) => post.mbti?.trim() || UNKNOWN_LABEL,
    options: toSelectOptions(FORM_MBTI_OPTIONS),
  },
  {
    key: "age",
    label: "年齢",
    mode: "multi",
    getValue: (post) => (post.age != null ? String(post.age) : UNKNOWN_LABEL),
    options: toNumericSelectOptions(FORM_AGE_OPTIONS),
  },
  {
    key: "height",
    label: "身長",
    mode: "multi",
    getValue: (post) => (post.height != null ? String(post.height) : UNKNOWN_LABEL),
    options: toNumericSelectOptions(FORM_HEIGHT_OPTIONS),
  },
  {
    key: "weight",
    label: "体重",
    mode: "multi",
    getValue: (post) => (post.weight != null ? String(post.weight) : UNKNOWN_LABEL),
    options: toNumericSelectOptions(FORM_WEIGHT_OPTIONS),
  },
  {
    key: "income",
    label: "年収",
    mode: "multi",
    getValue: (post) => (post.income != null ? String(post.income) : UNKNOWN_LABEL),
    options: toNumericSelectOptions(FORM_INCOME_OPTIONS),
  },
  {
    key: "education",
    label: "学歴",
    mode: "multi",
    getValue: (post) => post.education?.trim() || UNKNOWN_LABEL,
    options: toSelectOptions(FORM_EDUCATION_OPTIONS),
  },
  {
    key: "cup_size",
    label: "カップ数",
    mode: "multi",
    getValue: (post) => post.cup_size?.trim() || UNKNOWN_LABEL,
    options: toSelectOptions(FORM_CUP_SIZE_OPTIONS),
  },
  {
    key: "penis_length",
    label: "チンコの長さ",
    mode: "multi",
    getValue: (post) => (post.penis_length != null ? String(post.penis_length) : UNKNOWN_LABEL),
    options: toNumericSelectOptions(FORM_PENIS_LENGTH_OPTIONS),
  },
  {
    key: "first_experience_age",
    label: "初体験の年齢",
    mode: "range",
    getValue: (post) => post.first_experience_age,
    minValue: 10,
    maxValue: 80,
    step: 1,
    unit: "歳",
  },
  {
    key: "relationship_count",
    label: "付き合った人数",
    mode: "range",
    getValue: (post) => post.relationship_count,
    minValue: 0,
    maxValue: 100,
    step: 1,
    unit: "人",
  },
  {
    key: "experience_count",
    label: "経験人数",
    mode: "range",
    getValue: (post) => post.experience_count,
    minValue: 0,
    maxValue: 100,
    step: 1,
    unit: "人",
  },
  {
    key: "sex_frequency",
    label: "1週間のセックス回数（実態）",
    mode: "range",
    getValue: (post) => post.sex_frequency,
    minValue: 0,
    maxValue: 30,
    step: 1,
    unit: "回",
  },
  {
    key: "ideal_sex_frequency",
    label: "1週間のセックス回数（理想）",
    mode: "range",
    getValue: (post) => post.ideal_sex_frequency,
    minValue: 0,
    maxValue: 30,
    step: 1,
    unit: "回",
  },
  {
    key: "masturbation_frequency",
    label: "1週間のオナニー回数",
    mode: "range",
    getValue: (post) => post.masturbation_frequency,
    minValue: 0,
    maxValue: 50,
    step: 1,
    unit: "回",
  },
  {
    key: "sex_duration",
    label: "セックス1回の時間（実態）",
    mode: "range",
    getValue: (post) => post.sex_duration,
    minValue: 0,
    maxValue: 180,
    step: 1,
    unit: "分",
  },
  {
    key: "ideal_sex_duration",
    label: "セックス1回の時間（理想）",
    mode: "range",
    getValue: (post) => post.ideal_sex_duration,
    minValue: 0,
    maxValue: 180,
    step: 1,
    unit: "分",
  },
  {
    key: "sex_satisfaction",
    label: "現在のセックスライフの満足度（0〜100）",
    mode: "range",
    getValue: (post) => post.sex_satisfaction,
    minValue: 0,
    maxValue: 100,
    step: 1,
  },
  {
    key: "marriage_intent",
    label: "結婚願望",
    mode: "multi",
    getValue: (post) => scoreValue(post.marriage_intent),
    order: SCORE_ORDER,
    options: toScaleFilterOptions(FORM_RATING_OPTIONS.marriageIntent),
  },
  {
    key: "housewife_preference",
    label: "専業主婦希望",
    mode: "multi",
    getValue: (post) => scoreValue(post.housewife_preference),
    order: SCORE_ORDER,
    options: toScaleFilterOptions(FORM_RATING_OPTIONS.housewifePreference),
  },
  {
    key: "desired_children",
    label: "子供の人数願望",
    mode: "multi",
    getValue: (post) => scoreValue(post.desired_children),
    order: SCORE_ORDER,
    options: toScaleFilterOptions(FORM_RATING_OPTIONS.desiredChildren),
  },
  {
    key: "cheating_definition",
    label: "どこからが浮気か",
    mode: "multi",
    getValue: (post) => scoreValue(post.cheating_definition),
    order: SCORE_ORDER,
    options: toScaleFilterOptions(FORM_RATING_OPTIONS.cheatingDefinition),
  },
  {
    key: "cheating_desire",
    label: "浮気願望",
    mode: "multi",
    getValue: (post) => scoreValue(post.cheating_desire),
    order: SCORE_ORDER,
    options: toScaleFilterOptions(FORM_RATING_OPTIONS.cheatingDesire),
  },
  {
    key: "reaction_to_cheating",
    label: "浮気されたらどうするか",
    mode: "multi",
    getValue: (post) => scoreValue(post.reaction_to_cheating),
    order: SCORE_ORDER,
    options: toScaleFilterOptions(FORM_RATING_OPTIONS.reactionToCheating),
  },
  {
    key: "cohabitation_level",
    label: "同棲経験",
    mode: "multi",
    getValue: (post) => scoreValue(post.cohabitation_level),
    order: SCORE_ORDER,
    options: toScaleFilterOptions(FORM_EXPERIENCE_OPTIONS.cohabitation),
  },
  {
    key: "dating_app_level",
    label: "マチアプ経験",
    mode: "multi",
    getValue: (post) => scoreValue(post.dating_app_level),
    order: SCORE_ORDER,
    options: toScaleFilterOptions(FORM_EXPERIENCE_OPTIONS.datingApp),
  },
  {
    key: "no_condom_level",
    label: "ゴムなしの経験",
    mode: "multi",
    getValue: (post) => scoreValue(post.no_condom_level),
    order: SCORE_ORDER,
    options: toScaleFilterOptions(FORM_EXPERIENCE_OPTIONS.noCondom),
  },
  {
    key: "creampie_level",
    label: "中出しの経験",
    mode: "multi",
    getValue: (post) => scoreValue(post.creampie_level),
    order: SCORE_ORDER,
    options: toScaleFilterOptions(FORM_EXPERIENCE_OPTIONS.creampie),
  },
  {
    key: "cheating_level",
    label: "浮気経験",
    mode: "multi",
    getValue: (post) => scoreValue(post.cheating_level),
    order: SCORE_ORDER,
    options: toScaleFilterOptions(FORM_EXPERIENCE_OPTIONS.cheating),
  },
  {
    key: "cheated_level",
    label: "浮気された経験",
    mode: "multi",
    getValue: (post) => scoreValue(post.cheated_level),
    order: SCORE_ORDER,
    options: toScaleFilterOptions(FORM_EXPERIENCE_OPTIONS.cheated),
  },
];

function findFilterFieldConfig(key: string) {
  return filterFieldConfigs.find((config) => config.key === key);
}

function getBuilderParamKey(builderKey: string, suffix: string) {
  return `${builderKey}${suffix}`;
}

function createEmptyFilterEntry(config: FilterFieldConfig): FilterEntry {
  if (config.mode === "multi") {
    return { field: config.key, mode: "multi", values: [] };
  }

  return { field: config.key, mode: "range", min: "", max: "" };
}

function getFilterIsActive(filter: FilterEntry) {
  return filter.mode === "multi"
    ? filter.values.length > 0
    : filter.min.length > 0 || filter.max.length > 0;
}

function getRangeSummary(filter: Extract<FilterEntry, { mode: "range" }>, unit = "") {
  const minLabel = filter.min ? `${filter.min}${unit}` : "下限なし";
  const maxLabel = filter.max ? `${filter.max}${unit}` : "上限なし";
  return `${minLabel} - ${maxLabel}`;
}

function getMultiFilterSummary(
  filter: Extract<FilterEntry, { mode: "multi" }>,
  config: MultiFilterFieldConfig
) {
  if (!config.options) {
    return filter.values.join(" / ");
  }

  const labelMap = new Map(config.options.map((option) => [option.value, option.label]));
  return filter.values.map((value) => labelMap.get(value) ?? value).join(" / ");
}

type RangeSliderProps = {
  value: { min: string; max: string };
  minValue: number;
  maxValue: number;
  step?: number;
  unit?: string;
  onChange: (bound: "min" | "max", value: string) => void;
  onInteractionStart?: () => void;
  onInteractionEnd?: () => void;
};

function RangeSlider({
  value,
  minValue,
  maxValue,
  step = 1,
  unit = "",
  onChange,
  onInteractionStart,
  onInteractionEnd,
}: RangeSliderProps) {
  const currentMin = value.min ? Number(value.min) : minValue;
  const currentMax = value.max ? Number(value.max) : maxValue;
  const leftPercent = ((currentMin - minValue) / (maxValue - minValue)) * 100;
  const rightPercent = ((currentMax - minValue) / (maxValue - minValue)) * 100;
  const [activeBound, setActiveBound] = useState<"min" | "max" | null>(null);

  function clampValue(nextValue: number, bound: "min" | "max") {
    if (bound === "min") {
      return Math.min(nextValue, currentMax);
    }

    return Math.max(nextValue, currentMin);
  }

  function getValueFromPointer(clientX: number, rect: DOMRect) {
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const rawValue = minValue + ratio * (maxValue - minValue);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.min(maxValue, Math.max(minValue, steppedValue));
  }

  function updateFromPointer(
    event: ReactPointerEvent<HTMLDivElement>,
    boundOverride?: "min" | "max"
  ) {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextRawValue = getValueFromPointer(event.clientX, rect);
    const minDistance = Math.abs(nextRawValue - currentMin);
    const maxDistance = Math.abs(nextRawValue - currentMax);
    const bound = boundOverride ?? (minDistance <= maxDistance ? "min" : "max");
    const nextValue = clampValue(nextRawValue, bound);
    onChange(bound, String(nextValue));
    return bound;
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-0.5 text-[11px] text-slate-500">
        <span>{value.min ? `${value.min}${unit}` : "下限なし"}</span>
        <span>~</span>
        <span>{value.max ? `${value.max}${unit}` : "上限なし"}</span>
      </div>
      <div className="relative h-10 px-1">
        <div className="absolute inset-x-1 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200/70" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-400"
          style={{
            left: `calc(${leftPercent}% + 0.25rem)`,
            width: `calc(${Math.max(rightPercent - leftPercent, 0)}% - 0.5rem)`,
          }}
        />
        <div
          className="absolute inset-x-0 -inset-y-3 z-10 cursor-pointer touch-none"
          onPointerDown={(event) => {
            const bound = updateFromPointer(event);
            setActiveBound(bound);
            onInteractionStart?.();
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (activeBound === null) return;
            updateFromPointer(event, activeBound);
          }}
          onPointerUp={(event) => {
            if (activeBound !== null) {
              updateFromPointer(event, activeBound);
            }
            setActiveBound(null);
            onInteractionEnd?.();
          }}
          onPointerCancel={() => {
            setActiveBound(null);
            onInteractionEnd?.();
          }}
        />
        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={step}
          value={currentMin}
          aria-label="下限"
          onKeyDown={onInteractionStart}
          onKeyUp={onInteractionEnd}
          onChange={(event) => {
            const nextValue = Math.min(Number(event.target.value), currentMax);
            onChange("min", String(nextValue));
          }}
          className="pointer-events-none absolute inset-x-0 top-1/2 h-0 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-none [&::-webkit-slider-thumb]:mt-0 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-slate-500 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-thumb]:pointer-events-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-slate-500 [&::-moz-range-thumb]:bg-white"
        />
        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={step}
          value={currentMax}
          aria-label="上限"
          onKeyDown={onInteractionStart}
          onKeyUp={onInteractionEnd}
          onChange={(event) => {
            const nextValue = Math.max(Number(event.target.value), currentMin);
            onChange("max", String(nextValue));
          }}
          className="pointer-events-none absolute inset-x-0 top-1/2 h-0 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-none [&::-webkit-slider-thumb]:mt-0 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-slate-500 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-thumb]:pointer-events-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-slate-500 [&::-moz-range-thumb]:bg-white"
        />
      </div>
    </div>
  );
}

type MultiSelectDropdownProps = {
  options: SelectOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  onClear: () => void;
};

function MultiSelectDropdown({
  options,
  selectedValues,
  onToggle,
  onClear,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  const selectedLabels = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label);

  const summary =
    selectedValues.length === 0
      ? "すべて"
      : selectedLabels.length <= 2
        ? selectedLabels.join(" / ")
        : `${selectedValues.length}件選択`;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
      >
        <span className="truncate">{summary}</span>
        <span className={cn("ml-2 shrink-0 text-slate-400 transition", isOpen && "rotate-180")}>
          ▼
        </span>
      </button>

      {isOpen ? (
        <div className="absolute left-0 right-0 z-20 mt-1 max-h-48 space-y-1 overflow-y-auto rounded-md border border-slate-200 bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={() => {
              onClear();
              setIsOpen(false);
            }}
            className={cn(
              "mb-1 w-full rounded-md border px-2 py-1 text-left text-xs transition",
              selectedValues.length === 0
                ? "border-slate-300 bg-slate-100 text-slate-900"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            すべて
          </button>

          {options.map((option) => {
            const checked = selectedValues.includes(option.value);

            return (
              <label key={option.value} className="flex items-start gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(option.value)}
                  className="mt-0.5"
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function createDistribution(values: string[], order?: string[]) {
  const counts = new Map<string, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  const entries = [...counts.entries()];

  if (order) {
    const orderMap = new Map(order.map((item, index) => [item, index]));
    entries.sort((a, b) => {
      const aIndex = orderMap.get(a[0]);
      const bIndex = orderMap.get(b[0]);

      if (aIndex !== undefined && bIndex !== undefined) return aIndex - bIndex;
      if (aIndex !== undefined) return -1;
      if (bIndex !== undefined) return 1;
      return b[1] - a[1];
    });
  } else {
    entries.sort((a, b) => b[1] - a[1]);
  }

  return entries.map(([label, count]) => ({ label, count }));
}

function createChartId(sectionKey: PostSectionKey, title: string) {
  return `chart-${sectionKey}-${title.toLowerCase().replace(/\s+/g, "-")}`;
}

function makeChart(
  sectionKey: PostSectionKey,
  title: string,
  description: string,
  field: CustomFieldConfig,
  posts: PostGraphRecord[]
): ChartConfig {
  const targetGenders =
    field.key === "cup_size"
      ? (["女性"] as const)
      : field.key === "penis_length"
        ? (["男性"] as const)
        : (["女性", "男性"] as const);

  return {
    id: createChartId(sectionKey, title),
    title,
    description,
    chartType: field.chartType,
    horizontal: field.horizontal,
    dataByGender: targetGenders.map((gender) => ({
      label: gender,
      data: createDistribution(
        posts
          .filter((post) => normalizeGender(post.gender) === gender)
          .map((post) => field.getValue(post)),
        field.order
      ),
    })),
  };
}

function buildDashboardData(posts: PostGraphRecord[]): DashboardData {
  const genderDashboards: GenderDashboard[] = (["女性", "男性"] as const).map((gender) => {
    const filteredPosts = posts.filter((post) => normalizeGender(post.gender) === gender);
    return {
      gender,
      totalCount: filteredPosts.length,
      averageAge: calculateAverage(filteredPosts.map((post) => post.age)),
      averageRelationshipCount: calculateAverage(
        filteredPosts.map((post) => post.relationship_count)
      ),
      averageExperienceCount: calculateAverage(
        filteredPosts.map((post) => post.experience_count)
      ),
      averageSexFrequency: calculateAverage(filteredPosts.map((post) => post.sex_frequency)),
      averageSatisfaction: calculateAverage(
        filteredPosts.map((post) => post.sex_satisfaction)
      ),
    };
  });

  const sectionMeta: Array<{
    sectionKey: PostSectionKey;
    title: string;
    description: string;
  }> = [
    {
      sectionKey: "basic",
      title: "基本情報",
      description: "プロフィールとして回答された項目の分布です。",
    },
    {
      sectionKey: "romance",
      title: "恋愛・性",
      description: "恋愛経験や頻度、時間、満足度の分布です。",
    },
    {
      sectionKey: "values",
      title: "価値観",
      description: "結婚観や浮気観などの価値観スコア分布です。",
    },
    {
      sectionKey: "experience",
      title: "経験",
      description: "各種経験レベルの分布です。",
    },
  ];

  const sections: SectionConfig[] = [
    ...sectionMeta.map((section) => ({
      ...section,
      charts: customFieldConfigs
        .filter((field) => field.sectionKey === section.sectionKey && field.key !== "gender")
        .map((field) =>
          makeChart(section.sectionKey, field.label, field.description, field, posts)
        ),
    })),
  ];

  return { genderDashboards, sections };
}

function parseBuilderState(search: string, builderKey: string): BuilderState {
  const params = new URLSearchParams(search);
  const fieldsParam = params.get(getBuilderParamKey(builderKey, "Fields"));
  const fields = fieldsParam
    ? fieldsParam.split(",").filter(Boolean).slice(0, 2)
    : builderDefaultState.fields;
  const chart = params.get(getBuilderParamKey(builderKey, "Chart")) === "pie" ? "pie" : "bar";
  const filtersParam = params.get(getBuilderParamKey(builderKey, "Filters"));
  let filters: FilterEntry[] = [];

  if (filtersParam) {
    try {
      const parsed = JSON.parse(filtersParam) as FilterEntry[];
      filters = parsed.filter((filter) => {
        const config = findFilterFieldConfig(filter.field);
        return config !== undefined && config.mode === filter.mode;
      });
    } catch {
      filters = filtersParam.split(",").flatMap((pair) => {
        const sep = pair.indexOf("|");
        if (sep === -1) return [];
        const field = pair.slice(0, sep);
        const value = pair.slice(sep + 1);
        const config = findFilterFieldConfig(field);
        if (!field || !value || !config || config.mode !== "multi") return [];
        return [{ field, mode: "multi", values: [value] } satisfies FilterEntry];
      });
    }
  }
  const comboParam = params.get(getBuilderParamKey(builderKey, "Combo"));
  const combo: ComboType =
    comboParam === "bar+bar" || comboParam === "line+line" || comboParam === "scatter"
      ? comboParam
      : "bar+line";
  return { fields, chart, combo, filters };
}

function buildCustomDistribution(posts: PostGraphRecord[], field: CustomFieldConfig) {
  return createDistribution(posts.map((post) => field.getValue(post)), field.order);
}

function buildComboData(
  posts: PostGraphRecord[],
  field1: CustomFieldConfig,
  field2: CustomFieldConfig
) {
  const dist1 = buildCustomDistribution(posts, field1);
  const dist2 = buildCustomDistribution(posts, field2);

  const seen = new Set<string>();
  const labels: string[] = [];
  for (const d of dist1) {
    if (!seen.has(d.label)) { seen.add(d.label); labels.push(d.label); }
  }
  for (const d of dist2) {
    if (!seen.has(d.label)) { seen.add(d.label); labels.push(d.label); }
  }

  const map1 = new Map(dist1.map((d) => [d.label, d.count]));
  const map2 = new Map(dist2.map((d) => [d.label, d.count]));

  return labels.map((label) => ({
    label,
    count1: map1.get(label) ?? 0,
    count2: map2.get(label) ?? 0,
  }));
}

function buildScatterData(
  posts: PostGraphRecord[],
  field1: CustomFieldConfig,
  field2: CustomFieldConfig
) {
  const categories1 = sortFilterOptions(
    [...new Set(posts.map((p) => field1.getValue(p)))],
    field1.order
  );
  const categories2 = sortFilterOptions(
    [...new Set(posts.map((p) => field2.getValue(p)))],
    field2.order
  );

  const index1 = new Map(categories1.map((v, i) => [v, i]));
  const index2 = new Map(categories2.map((v, i) => [v, i]));

  const crosstab = new Map<string, number>();
  for (const post of posts) {
    const key = `${field1.getValue(post)}\0${field2.getValue(post)}`;
    crosstab.set(key, (crosstab.get(key) ?? 0) + 1);
  }

  const data: Array<{ x: number; y: number; count: number; label1: string; label2: string }> = [];
  for (const [key, count] of crosstab.entries()) {
    const sep = key.indexOf("\0");
    const v1 = key.slice(0, sep);
    const v2 = key.slice(sep + 1);
    data.push({ x: index1.get(v1) ?? 0, y: index2.get(v2) ?? 0, count, label1: v1, label2: v2 });
  }

  return { data, categories1, categories2 };
}

function sortFilterOptions(values: string[], order?: string[]) {
  if (order) {
    const orderMap = new Map(order.map((v, i) => [v, i]));
    return [...values].sort((a, b) => {
      const ai = orderMap.get(a) ?? Infinity;
      const bi = orderMap.get(b) ?? Infinity;
      if (ai !== Infinity && bi !== Infinity) return ai - bi;
      if (ai !== Infinity) return -1;
      if (bi !== Infinity) return 1;
      return a.localeCompare(b);
    });
  }
  return [...values].sort((a, b) => a.localeCompare(b));
}

function CustomGraphBuilder({
  posts,
  builderKey,
  title,
}: {
  posts: PostGraphRecord[];
  builderKey: string;
  title: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const parsedState = useMemo(
    () => parseBuilderState(search, builderKey),
    [builderKey, search]
  );
  const [state, setState] = useState(parsedState);
  const lastSyncedSearchRef = useRef<string | null>(null);
  const [isRangeInteracting, setIsRangeInteracting] = useState(false);

  useEffect(() => {
    if (lastSyncedSearchRef.current === search) {
      lastSyncedSearchRef.current = null;
      return;
    }

    setState(parsedState);
  }, [parsedState, search]);

  const selectedFields = state.fields
    .map((key) => customFieldConfigs.find((f) => f.key === key))
    .filter((f): f is CustomFieldConfig => f !== undefined);

  const filterValueOptionsList = useMemo(
    () =>
      state.filters.map((filter) => {
        const config = findFilterFieldConfig(filter.field);
        if (!config || config.mode !== "multi") return [];
        if (config.options) {
          const optionMap = new Map(config.options.map((option) => [option.value, option]));
          const dynamicValues = [...new Set(posts.map((p) => config.getValue(p)))];
          const allValues = [...new Set([...config.options.map((option) => option.value), ...dynamicValues])];
          return sortFilterOptions(allValues, config.order)
            .map((value) => optionMap.get(value) ?? { label: value, value })
            .filter((option): option is SelectOption => option !== undefined);
        }

        const unique = [...new Set(posts.map((p) => config.getValue(p)))];
        return sortFilterOptions(unique, config.order).map((value) => ({ label: value, value }));
      }),
    [posts, state.filters]
  );

  useEffect(() => {
    if (isRangeInteracting) {
      return;
    }

    const params = new URLSearchParams(search);
    params.set(getBuilderParamKey(builderKey, "Fields"), state.fields.join(","));
    params.set(getBuilderParamKey(builderKey, "Chart"), state.chart);
    params.set(getBuilderParamKey(builderKey, "Combo"), state.combo);
    if (state.filters.length > 0) {
      params.set(getBuilderParamKey(builderKey, "Filters"), JSON.stringify(state.filters));
    } else {
      params.delete(getBuilderParamKey(builderKey, "Filters"));
    }

    const nextSearch = params.toString();
    if (nextSearch === search) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      lastSyncedSearchRef.current = nextSearch;
      router.replace(nextSearch ? `${pathname}?${nextSearch}` : pathname, { scroll: false });
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [builderKey, isRangeInteracting, pathname, router, search, state]);

  function updateState(patch: Partial<BuilderState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function updateField(index: number, key: string) {
    const next = [...state.fields];
    next[index] = key;
    updateState({ fields: next });
  }

  function addField() {
    const next = customFieldConfigs.find((f) => !state.fields.includes(f.key));
    if (next) updateState({ fields: [...state.fields, next.key] });
  }

  function removeField(index: number) {
    updateState({ fields: state.fields.filter((_, i) => i !== index) });
  }

  function addFilter() {
    const next = filterFieldConfigs.find((f) => !state.filters.some((fi) => fi.field === f.key));
    if (!next) return;
    updateState({ filters: [...state.filters, createEmptyFilterEntry(next)] });
  }

  function replaceFilter(index: number, nextFilter: FilterEntry) {
    updateState({ filters: state.filters.map((current, i) => (i === index ? nextFilter : current)) });
  }

  function updateFilterField(index: number, field: string) {
    const config = findFilterFieldConfig(field);
    if (!config) return;
    replaceFilter(index, createEmptyFilterEntry(config));
  }

  function toggleFilterValue(index: number, value: string) {
    const current = state.filters[index];
    if (!current || current.mode !== "multi") return;
    const values = current.values.includes(value)
      ? current.values.filter((item) => item !== value)
      : [...current.values, value];
    replaceFilter(index, { ...current, values });
  }

  function clearFilterValues(index: number) {
    const current = state.filters[index];
    if (!current || current.mode !== "multi") return;
    replaceFilter(index, { ...current, values: [] });
  }

  function updateRangeFilter(index: number, bound: "min" | "max", value: string) {
    const current = state.filters[index];
    if (!current || current.mode !== "range") return;
    replaceFilter(index, { ...current, [bound]: value });
  }

  function removeFilter(index: number) {
    updateState({ filters: state.filters.filter((_, i) => i !== index) });
  }

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        state.filters.every((filter) => {
          const config = findFilterFieldConfig(filter.field);
          if (!config) return true;

          if (filter.mode === "multi" && config.mode === "multi") {
            if (filter.values.length === 0) return true;
            return filter.values.includes(config.getValue(post));
          }

          if (filter.mode === "range" && config.mode === "range") {
            const currentValue = config.getValue(post);
            if (currentValue === null) return false;
            if (filter.min && currentValue < Number(filter.min)) return false;
            if (filter.max && currentValue > Number(filter.max)) return false;
            return true;
          }

          return true;
        })
      ),
    [posts, state.filters]
  );

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname}?${searchParams.toString()}`
      : undefined;

  const isModified =
    JSON.stringify(state.fields) !== JSON.stringify(builderDefaultState.fields) ||
    state.chart !== builderDefaultState.chart ||
    state.filters.length > 0;

  const selectClass =
    "flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm";
  const addButtonClass =
    "mt-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-800";
  const removeButtonClass =
    "shrink-0 self-center rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500";

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-600">
            集計項目・フィルタ・グラフ形式を選んで自由に比較できます。
          </p>
        </div>
        {isModified ? (
          <button
            type="button"
            onClick={() => updateState(builderDefaultState)}
            className="shrink-0 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            リセット
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-3 sm:items-start">
        {/* 髮・ｨ磯・岼 */}
        <div className="space-y-1.5">
          <span className="text-xs font-medium text-slate-700">集計項目</span>
          <div className="space-y-2">
            {state.fields.map((fieldKey, i) => (
              <div key={i} className="flex gap-2">
                <select
                  value={fieldKey}
                  onChange={(e) => updateField(i, e.target.value)}
                  className={selectClass}
                >
                  {customFieldConfigs.map((f) => (
                    <option
                      key={f.key}
                      value={f.key}
                      disabled={state.fields.includes(f.key) && f.key !== fieldKey}
                    >
                      {f.label}
                    </option>
                  ))}
                </select>
                {state.fields.length > 1 ? (
                  <button type="button" onClick={() => removeField(i)} className={removeButtonClass}>
                    ×
                  </button>
                ) : null}
              </div>
            ))}
            {state.fields.length < 2 ? (
              <button type="button" onClick={addField} className={addButtonClass}>
                + 集計項目を追加
              </button>
            ) : null}
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-medium text-slate-700">フィルタ</span>
          <div className="space-y-2">
            {state.filters.map((filter, i) => {
              const config = findFilterFieldConfig(filter.field);

              return (
                <div key={i} className="space-y-2 rounded-lg border border-slate-100 bg-slate-50/60 p-2">
                  <div className="flex gap-2">
                    <select
                      value={filter.field}
                      onChange={(e) => updateFilterField(i, e.target.value)}
                      className={selectClass}
                    >
                      {filterFieldConfigs.map((f) => (
                        <option key={f.key} value={f.key}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeFilter(i)}
                      className={removeButtonClass}
                    >
                      ×
                    </button>
                  </div>

                  {config?.mode === "multi" && filter.mode === "multi" ? (
                    <MultiSelectDropdown
                      options={filterValueOptionsList[i]}
                      selectedValues={filter.values}
                      onToggle={(value) => toggleFilterValue(i, value)}
                      onClear={() => clearFilterValues(i)}
                    />
                  ) : null}

                  {config?.mode === "range" && filter.mode === "range" ? (
                    <RangeSlider
                      value={{ min: filter.min, max: filter.max }}
                      minValue={config.minValue}
                      maxValue={config.maxValue}
                      step={config.step}
                      unit={config.unit}
                      onChange={(bound, value) => updateRangeFilter(i, bound, value)}
                      onInteractionStart={() => setIsRangeInteracting(true)}
                      onInteractionEnd={() => setIsRangeInteracting(false)}
                    />
                  ) : null}
                </div>
              );
            })}
            {state.filters.length < filterFieldConfigs.length ? (
              <button type="button" onClick={addFilter} className={addButtonClass}>
                + フィルタを追加
              </button>
            ) : null}
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-medium text-slate-700">グラフ形式</span>
          {state.fields.length === 2 ? (
            <select
              value={state.combo}
              onChange={(e) => updateState({ combo: e.target.value as ComboType })}
              className={selectClass}
            >
              <option value="bar+bar">棒グラフ + 棒グラフ</option>
              <option value="bar+line">棒グラフ + 折れ線</option>
              <option value="line+line">折れ線 + 折れ線</option>
              <option value="scatter">散布図</option>
            </select>
          ) : (
            <select
              value={state.chart}
              onChange={(e) => updateState({ chart: e.target.value as "pie" | "bar" })}
              className={selectClass}
            >
              <option value="bar">棒グラフ</option>
              <option value="pie">円グラフ</option>
            </select>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          対象 {filteredPosts.length}件
        </span>
        {state.filters
          .filter((filter) => getFilterIsActive(filter))
          .map((filter, i) => {
            const config = findFilterFieldConfig(filter.field);
            if (!config) return null;

            const valueLabel =
              filter.mode === "multi"
                ? config.mode === "multi"
                  ? getMultiFilterSummary(filter, config)
                  : filter.values.join(" / ")
                : getRangeSummary(filter, config.mode === "range" ? config.unit : "");

            return (
              <span
                key={i}
                className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
              >
                {config.label}: {valueLabel}
              </span>
            );
          })}
      </div>

      {selectedFields.length === 2 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-0.5 text-sm font-semibold text-slate-900">
            {selectedFields[0].label} × {selectedFields[1].label}
          </h3>
          <p className="mb-4 text-xs text-slate-500">
            {filteredPosts.length}件のデータを集計しています。
          </p>
          {state.combo === "scatter" ? (() => {
            const { data, categories1, categories2 } = buildScatterData(
              filteredPosts,
              selectedFields[0],
              selectedFields[1]
            );
            return (
              <ResponsiveContainer width="100%" height={360}>
                <ScatterChart margin={{ top: 8, right: 20, bottom: 64, left: 20 }}>
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[-0.5, categories1.length - 0.5]}
                    ticks={categories1.map((_, i) => i)}
                    tickFormatter={(v: number) => categories1[v] ?? ""}
                    tick={{ fontSize: 10 }}
                    angle={-40}
                    textAnchor="end"
                    interval={0}
                    label={{
                      value: selectedFields[0].label,
                      position: "insideBottom",
                      offset: -52,
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[-0.5, categories2.length - 0.5]}
                    ticks={categories2.map((_, i) => i)}
                    tickFormatter={(v: number) => categories2[v] ?? ""}
                    tick={{ fontSize: 10 }}
                    width={80}
                    label={{
                      value: selectedFields[1].label,
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                      fontSize: 11,
                    }}
                  />
                  <ZAxis type="number" dataKey="count" range={[30, 400]} />
                  <Tooltip
                    content={({ payload }) => {
                      const d = payload?.[0]?.payload as
                        | { label1: string; label2: string; count: number }
                        | undefined;
                      if (!d) return null;
                      return (
                        <div className="rounded border border-slate-200 bg-white px-3 py-2 text-xs shadow-md">
                          <p className="text-slate-700">
                            {selectedFields[0].label}: <span className="font-medium">{d.label1}</span>
                          </p>
                          <p className="text-slate-700">
                            {selectedFields[1].label}: <span className="font-medium">{d.label2}</span>
                          </p>
                          <p className="mt-1 text-slate-500">
                            件数: <span className="font-semibold text-slate-900">{d.count}</span>
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Scatter data={data} fill="#6366f1" fillOpacity={0.65} />
                </ScatterChart>
              </ResponsiveContainer>
            );
          })() : (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart
                data={buildComboData(filteredPosts, selectedFields[0], selectedFields[1])}
                margin={{ top: 4, right: 12, bottom: 48, left: 0 }}
              >
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11 }}
                  angle={-40}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                {state.combo === "bar+bar" || state.combo === "bar+line" ? (
                  <Bar
                    dataKey="count1"
                    name={selectedFields[0].label}
                    fill="#6366f1"
                    radius={[2, 2, 0, 0]}
                  />
                ) : (
                  <Line
                    type="monotone"
                    dataKey="count1"
                    name={selectedFields[0].label}
                    stroke="#6366f1"
                    dot={{ r: 3 }}
                  />
                )}
                {state.combo === "bar+bar" ? (
                  <Bar
                    dataKey="count2"
                    name={selectedFields[1].label}
                    fill="#f59e0b"
                    radius={[2, 2, 0, 0]}
                  />
                ) : (
                  <Line
                    type="monotone"
                    dataKey="count2"
                    name={selectedFields[1].label}
                    stroke="#f59e0b"
                    dot={{ r: 3 }}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      ) : selectedFields[0] ? (
        <PostChartCard
          title={selectedFields[0].label}
          description={`${filteredPosts.length}件のデータを集計しています。`}
          chartType={state.chart}
          horizontal={selectedFields[0].horizontal}
          data={buildCustomDistribution(filteredPosts, selectedFields[0])}
          shareUrl={shareUrl}
        />
      ) : null}
    </section>
  );
}

export type PostGraphsDashboardProps = {
  mode?: "all" | "preset" | "custom";
};

export function PostGraphsDashboard(props: PostGraphsDashboardProps) {
  const { mode = "all" } = props;
  const shouldShowPreset = mode !== "custom";
  const shouldShowCustom = mode !== "preset";
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [rawPosts, setRawPosts] = useState<PostGraphRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setErrorMessage(null);

      const { data, error } = await supabase.from("posts").select(SELECT_COLUMNS);

      if (error) {
        setErrorMessage("Failed to load graph data.");
        setLoading(false);
        return;
      }

      const posts = (data ?? []) as PostGraphRecord[];

      if (shouldShowPreset) {
        setDashboardData(buildDashboardData(posts));
      } else {
        setDashboardData(null);
      }

      if (shouldShowCustom) {
        setRawPosts(posts);
      } else {
        setRawPosts([]);
      }

      setLoading(false);
    }

    fetchPosts();
  }, [shouldShowCustom, shouldShowPreset]);

  function handleJump(targetId: string) {
    const element = document.getElementById(targetId);
    if (!element) return;
    window.history.replaceState(null, "", `#${targetId}`);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (loading) return <p className="text-sm text-slate-500">グラフデータを読み込み中です...</p>;
  if (errorMessage) return <p className="text-sm text-red-600">{errorMessage}</p>;
  if (shouldShowPreset && !dashboardData) {
    return <p className="text-sm text-slate-500">表示できるグラフデータがありません。</p>;
  }
  if (shouldShowCustom && rawPosts.length === 0 && !shouldShowPreset) {
    return <p className="text-sm text-slate-500">表示できるグラフデータがありません。</p>;
  }

  const sections = dashboardData?.sections ?? [];
  const genderDashboards = dashboardData?.genderDashboards ?? [];
  const shareBaseUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}${window.location.search}`
      : undefined;

  return (
    <div className="space-y-6">
      {shouldShowCustom ? (
        <div className="space-y-4">
          {CUSTOM_GRAPH_BUILDERS.map((builder) => (
            <CustomGraphBuilder
              key={builder.key}
              posts={rawPosts}
              builderKey={builder.key}
              title={builder.title}
            />
          ))}
        </div>
      ) : null}

      {shouldShowPreset ? (
        <>
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight text-slate-900">
                グラフ目次
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                気になるグラフへすぐ移動できます。
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {sections.map((section) => (
                <div key={section.title} className="space-y-2">
                  <a
                    href={`#section-${section.sectionKey}`}
                    onClick={(event) => {
                      event.preventDefault();
                      handleJump(`section-${section.sectionKey}`);
                    }}
                    className="inline-flex text-sm font-semibold text-slate-900 transition hover:text-slate-700"
                  >
                    {section.title}
                  </a>
                  <div className="flex flex-wrap gap-2">
                    {section.charts.map((chart) => (
                      <a
                        key={chart.id}
                        href={`#${chart.id}`}
                        onClick={(event) => {
                          event.preventDefault();
                          handleJump(chart.id);
                        }}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                      >
                        {chart.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="text-base font-semibold tracking-tight text-slate-900">
                男女サマリー
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                男女別の投稿数と平均値をコンパクトに比較できます。
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs text-slate-700">
                  <thead className="bg-slate-50 text-[11px] text-slate-500">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">区分</th>
                      <th className="px-3 py-2 text-right font-semibold">投稿数</th>
                      <th className="px-3 py-2 text-right font-semibold">平均年齢</th>
                      <th className="px-3 py-2 text-right font-semibold">平均交際人数</th>
                      <th className="px-3 py-2 text-right font-semibold">平均経験人数</th>
                      <th className="px-3 py-2 text-right font-semibold">平均セックス回数/週</th>
                      <th className="px-3 py-2 text-right font-semibold">平均満足度</th>
                    </tr>
                  </thead>
                  <tbody>
                    {genderDashboards.map((dashboard) => (
                      <tr key={dashboard.gender} className="border-t border-slate-200">
                        <th className="whitespace-nowrap px-3 py-2 text-left text-sm font-semibold text-slate-900">
                          {dashboard.gender}
                        </th>
                        <td className="whitespace-nowrap px-3 py-2 text-right">
                          {dashboard.totalCount}件
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right">
                          {formatSummaryValue(dashboard.averageAge, "歳")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right">
                          {formatSummaryValue(dashboard.averageRelationshipCount, "人")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right">
                          {formatSummaryValue(dashboard.averageExperienceCount, "人")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right">
                          {formatSummaryValue(dashboard.averageSexFrequency, "回")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right">
                          {formatSummaryValue(dashboard.averageSatisfaction, "", 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {sections.map((section) => (
            <section
              key={section.title}
              id={`section-${section.sectionKey}`}
              className={cn(
                "scroll-mt-24 space-y-3 rounded-xl border p-4",
                getPostSectionPalette(section.sectionKey).containerClassName
              )}
            >
              <div>
                <div
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                    getPostSectionPalette(section.sectionKey).badgeClassName
                  )}
                >
                  {section.title}
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-600">{section.description}</p>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                {section.charts.map((chart) => (
                  <div key={chart.id} id={chart.id} className="scroll-mt-24">
                    <PostChartCard
                      title={chart.title}
                      description={chart.description}
                      chartType={chart.chartType}
                      horizontal={chart.horizontal}
                      comparisonData={chart.dataByGender}
                      shareUrl={shareBaseUrl ? `${shareBaseUrl}#${chart.id}` : undefined}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </>
      ) : null}
    </div>
  );
}




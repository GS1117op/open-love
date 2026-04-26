"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";
import {
  mbtiOptions,
  prefectureOptions,
  educationOptions,
  cupSizeOptions,
  ratingOptions,
  experienceOptions,
} from "@/lib/post-metadata";

// ─── Types ───────────────────────────────���───────────────────��────────────────

export type PostFilterState = {
  nickname: string;
  gender: string[];
  age: string[];
  status: string[];
  prefecture: string[];
  height: string[];
  weight: string[];
  mbti: string[];
  income: { min: string; max: string };
  education: string[];
  cupSize: string[];
  penisLength: { min: string; max: string };
  firstExperienceAge: { min: string; max: string };
  relationshipCount: { min: string; max: string };
  experienceCount: { min: string; max: string };
  sexFrequency: { min: string; max: string };
  idealSexFrequency: { min: string; max: string };
  masturbationFrequency: { min: string; max: string };
  sexDuration: { min: string; max: string };
  idealSexDuration: { min: string; max: string };
  sexSatisfaction: { min: string; max: string };
  sexSatisfactionNote: string;
  marriageIntent: string[];
  housewifePreference: string[];
  desiredChildren: string[];
  cheatingDefinition: string[];
  cheatingDesire: string[];
  reactionToCheating: string[];
  cohabitationLevel: string[];
  datingAppLevel: string[];
  noCondomLevel: string[];
  creampieLevel: string[];
  cheatingLevel: string[];
  cheatedLevel: string[];
  title: string;
  content: string;
};

export const defaultPostFilters: PostFilterState = {
  nickname: "",
  gender: [],
  age: [],
  status: [],
  prefecture: [],
  height: [],
  weight: [],
  mbti: [],
  income: { min: "", max: "" },
  education: [],
  cupSize: [],
  penisLength: { min: "", max: "" },
  firstExperienceAge: { min: "", max: "" },
  relationshipCount: { min: "", max: "" },
  experienceCount: { min: "", max: "" },
  sexFrequency: { min: "", max: "" },
  idealSexFrequency: { min: "", max: "" },
  masturbationFrequency: { min: "", max: "" },
  sexDuration: { min: "", max: "" },
  idealSexDuration: { min: "", max: "" },
  sexSatisfaction: { min: "", max: "" },
  sexSatisfactionNote: "",
  marriageIntent: [],
  housewifePreference: [],
  desiredChildren: [],
  cheatingDefinition: [],
  cheatingDesire: [],
  reactionToCheating: [],
  cohabitationLevel: [],
  datingAppLevel: [],
  noCondomLevel: [],
  creampieLevel: [],
  cheatingLevel: [],
  cheatedLevel: [],
  title: "",
  content: "",
};

function isActive(v: string | string[] | { min: string; max: string }) {
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  return v.min.length > 0 || v.max.length > 0;
}

export function getActiveFilterCount(filters: PostFilterState) {
  return Object.values(filters).filter(isActive).length;
}

export type PostFilterProps = {
  filters: PostFilterState;
  activeFilterCount: number;
  resultCount: number;
  totalCount: number;
  onTextChange: (key: keyof PostFilterState, value: string) => void;
  onToggleSelect: (key: keyof PostFilterState, value: string) => void;
  onClearSelect: (key: keyof PostFilterState) => void;
  onRangeChange: (key: keyof PostFilterState, bound: "min" | "max", value: string) => void;
  onReset: () => void;
};

// ─── Helpers ────────────────────────────────���─────────────────────────────────

const genderOptions = ["女性", "男性", "その他", "回答しない"];
const statusOptions = ["独身", "交際中", "既婚", "離婚"];

function toRatingOptions(labels: readonly string[]) {
  return labels.map((label, i) => ({ label, value: String(i + 1) }));
}

const exactAgeOptions = [
  ...Array.from({ length: 45 }, (_, i) => {
    const value = 15 + i;
    return { label: `${value}歳`, value: String(value) };
  }),
  ...Array.from({ length: 20 }, (_, i) => {
    const value = 60 + i;
    return { label: `${value}歳`, value: String(value) };
  }),
  { label: "80歳", value: "80" },
];

const exactHeightOptions = [
  ...Array.from({ length: 65 }, (_, i) => {
    const value = 135 + i;
    return { label: `${value}cm`, value: String(value) };
  }),
  { label: "200cm", value: "200" },
];

const exactWeightOptions = [
  ...Array.from({ length: 75 }, (_, i) => {
    const value = 25 + i;
    return { label: `${value}kg`, value: String(value) };
  }),
  { label: "100kg", value: "100" },
];

// ─── MultiSelectDropdown ──────────────────────────────────────────────────────

function MultiSelectDropdown({
  label,
  values,
  options,
  onToggle,
  onClear,
}: {
  label: string;
  values: string[];
  options: ReadonlyArray<string | { label: string; value: string }>;
  onToggle: (v: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const count = values.length;
  const displayText = count > 0 ? `${count}件選択中` : "すべて";

  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 text-sm"
        >
          <span className={count > 0 ? "text-slate-900 font-medium" : "text-slate-400"}>
            {displayText}
          </span>
          <ChevronDown
            className={`size-4 text-slate-400 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
            {count > 0 && (
              <button
                type="button"
                onClick={() => { onClear(); setOpen(false); }}
                className="w-full border-b border-slate-100 px-3 py-2 text-left text-xs text-slate-400 hover:text-slate-700"
              >
                クリア
              </button>
            )}
            {options.map((opt) => {
              const val = typeof opt === "string" ? opt : opt.value;
              const lbl = typeof opt === "string" ? opt : opt.label;
              const checked = values.includes(val);
              return (
                <label
                  key={val}
                  className="flex cursor-pointer items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(val)}
                    className="size-4 rounded border-slate-300 accent-slate-800"
                  />
                  <span className={checked ? "text-slate-900 font-medium" : "text-slate-700"}>
                    {lbl}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── RangeSlider ─────────────────────────────────────────────────────────────

function RangeSlider({
  label,
  rangeMin,
  rangeMax,
  step,
  unit,
  value,
  onMinChange,
  onMaxChange,
}: {
  label: string;
  rangeMin: number;
  rangeMax: number;
  step: number;
  unit: string;
  value: { min: string; max: string };
  onMinChange: (v: string) => void;
  onMaxChange: (v: string) => void;
}) {
  const curMin = value.min !== "" ? Number(value.min) : rangeMin;
  const curMax = value.max !== "" ? Number(value.max) : rangeMax;
  const range = rangeMax - rangeMin;
  const minPct = ((curMin - rangeMin) / range) * 100;
  const maxPct = ((curMax - rangeMin) / range) * 100;
  const hasFilter = value.min !== "" || value.max !== "";

  const fmt = (v: number, isMax?: boolean) =>
    isMax && v === rangeMax ? `${v}${unit}以上` : `${v}${unit}`;

  return (
    <div className="space-y-2">
      {/* Label + current range */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <span className={`text-sm ${hasFilter ? "font-medium text-slate-900" : "text-slate-400"}`}>
          {hasFilter ? `${fmt(curMin)} 〜 ${fmt(curMax, true)}` : "指定なし"}
        </span>
      </div>

      {/* Single track with two thumbs */}
      <div className="relative flex h-7 items-center">
        {/* Gray background track */}
        <div className="absolute left-0 right-0 h-1.5 rounded-full bg-slate-200" />
        {/* Colored fill between thumbs */}
        <div
          className="absolute h-1.5 rounded-full bg-slate-800"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />
        {/* Min thumb — moves on top when pushed far right */}
        <input
          type="range"
          className="dual-range"
          min={rangeMin}
          max={rangeMax}
          step={step}
          value={curMin}
          style={{ zIndex: minPct > 90 ? 4 : 3 }}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), curMax - step);
            onMinChange(v <= rangeMin ? "" : String(v));
          }}
        />
        {/* Max thumb */}
        <input
          type="range"
          className="dual-range"
          min={rangeMin}
          max={rangeMax}
          step={step}
          value={curMax}
          style={{ zIndex: minPct > 90 ? 3 : 4 }}
          onChange={(e) => {
            const v = Math.max(Number(e.target.value), curMin + step);
            onMaxChange(v >= rangeMax ? "" : String(v));
          }}
        />
      </div>

      {/* Scale endpoints */}
      <div className="flex justify-between text-xs text-slate-400">
        <span>{rangeMin}{unit}</span>
        <span>{rangeMax}{unit}</span>
      </div>
    </div>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────────��────────

function FilterSection({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`space-y-4 rounded-xl border p-4 ${className ?? "border-slate-200 bg-slate-50/60"}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{title}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// ─── PostFilter ───────────────────────────────────────────────────────────────

export function PostFilter({
  filters,
  activeFilterCount,
  resultCount,
  totalCount,
  onTextChange,
  onToggleSelect,
  onClearSelect,
  onRangeChange,
  onReset,
}: PostFilterProps) {
  const [open, setOpen] = useState(false);

  const sel = (key: keyof PostFilterState) => ({
    values: filters[key] as string[],
    onToggle: (v: string) => onToggleSelect(key, v),
    onClear: () => onClearSelect(key),
  });

  const rng = (key: keyof PostFilterState) => ({
    value: filters[key] as { min: string; max: string },
    onMinChange: (v: string) => onRangeChange(key, "min", v),
    onMaxChange: (v: string) => onRangeChange(key, "max", v),
  });

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="size-4 text-slate-600" />
          <span className="text-sm font-semibold text-slate-800">絞り込み</span>
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-medium text-white">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">{resultCount} / {totalCount} 件</span>
          <ChevronDown
            className={`size-4 text-slate-500 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Body */}
      {open && (
        <div className="space-y-8 border-t border-slate-100 px-5 py-5">
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-800"
            >
              <RotateCcw className="size-3.5" />
              すべてリセット
            </button>
          )}

          {/* 基本情報 */}
          <FilterSection title="基本情報" className="border-sky-100 bg-sky-50/60">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-slate-700">ニックネーム</p>
              <input
                type="text"
                value={filters.nickname}
                onChange={(e) => onTextChange("nickname", e.target.value)}
                placeholder="部分一致で検索"
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
              />
            </div>
            <MultiSelectDropdown label="性別" options={genderOptions} {...sel("gender")} />
            <MultiSelectDropdown label="年齢" options={exactAgeOptions} {...sel("age")} />
            <MultiSelectDropdown label="ステータス" options={statusOptions} {...sel("status")} />
            <MultiSelectDropdown label="居住エリア" options={prefectureOptions} {...sel("prefecture")} />
          </FilterSection>

          {/* 体型・スペック */}
          <FilterSection title="体型・スペック">
            <MultiSelectDropdown label="身長" options={exactHeightOptions} {...sel("height")} />
            <MultiSelectDropdown label="体重" options={exactWeightOptions} {...sel("weight")} />
            <MultiSelectDropdown label="カップ数（女性）" options={cupSizeOptions} {...sel("cupSize")} />
            <RangeSlider label="チンコの長さ（男性）" rangeMin={2} rangeMax={20} step={2} unit="cm" {...rng("penisLength")} />
            <MultiSelectDropdown label="MBTI" options={mbtiOptions} {...sel("mbti")} />
            <MultiSelectDropdown label="学歴" options={educationOptions} {...sel("education")} />
            <RangeSlider label="年収" rangeMin={0} rangeMax={2000} step={100} unit="万円" {...rng("income")} />
          </FilterSection>

          {/* 恋愛・セックスデータ */}
          <FilterSection title="恋愛・セックスデータ" className="border-rose-100 bg-rose-50/60">
            <RangeSlider label="初体験の年齢" rangeMin={10} rangeMax={40} step={1} unit="歳" {...rng("firstExperienceAge")} />
            <RangeSlider label="付き合った人数" rangeMin={0} rangeMax={30} step={1} unit="人" {...rng("relationshipCount")} />
            <RangeSlider label="経験人数" rangeMin={0} rangeMax={50} step={1} unit="人" {...rng("experienceCount")} />
            <RangeSlider label="週のセックス回数（実態）" rangeMin={0} rangeMax={14} step={1} unit="回" {...rng("sexFrequency")} />
            <RangeSlider label="週のセックス回数（理想）" rangeMin={0} rangeMax={14} step={1} unit="回" {...rng("idealSexFrequency")} />
            <RangeSlider label="週のオナニー頻度" rangeMin={0} rangeMax={14} step={1} unit="回" {...rng("masturbationFrequency")} />
            <RangeSlider label="1回の時間（実態）" rangeMin={0} rangeMax={120} step={5} unit="分" {...rng("sexDuration")} />
            <RangeSlider label="1回の時間（理想）" rangeMin={0} rangeMax={120} step={5} unit="分" {...rng("idealSexDuration")} />
            <RangeSlider label="セックスライフ満足度" rangeMin={0} rangeMax={100} step={5} unit="" {...rng("sexSatisfaction")} />
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-slate-700">満足度の理由（キーワード）</p>
              <input
                type="text"
                value={filters.sexSatisfactionNote}
                onChange={(e) => onTextChange("sexSatisfactionNote", e.target.value)}
                placeholder="部分一致で検索"
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
              />
            </div>
          </FilterSection>

          {/* 価値観 */}
          <FilterSection title="価値観" className="border-amber-100 bg-amber-50/60">
            <MultiSelectDropdown label="結婚願望" options={toRatingOptions(ratingOptions.marriageIntent)} {...sel("marriageIntent")} />
            <MultiSelectDropdown label="専業主婦希望" options={toRatingOptions(ratingOptions.housewifePreference)} {...sel("housewifePreference")} />
            <MultiSelectDropdown label="子供の人数願望" options={toRatingOptions(ratingOptions.desiredChildren)} {...sel("desiredChildren")} />
            <MultiSelectDropdown label="どこからが浮気か" options={toRatingOptions(ratingOptions.cheatingDefinition)} {...sel("cheatingDefinition")} />
            <MultiSelectDropdown label="浮気願望" options={toRatingOptions(ratingOptions.cheatingDesire)} {...sel("cheatingDesire")} />
            <MultiSelectDropdown label="浮気されたらどうするか" options={toRatingOptions(ratingOptions.reactionToCheating)} {...sel("reactionToCheating")} />
          </FilterSection>

          {/* 経験 */}
          <FilterSection title="経験" className="border-emerald-100 bg-emerald-50/60">
            <MultiSelectDropdown label="同棲経験" options={toRatingOptions(experienceOptions.cohabitation)} {...sel("cohabitationLevel")} />
            <MultiSelectDropdown label="マチアプ経験" options={toRatingOptions(experienceOptions.datingApp)} {...sel("datingAppLevel")} />
            <MultiSelectDropdown label="ゴムなしの経験" options={toRatingOptions(experienceOptions.noCondom)} {...sel("noCondomLevel")} />
            <MultiSelectDropdown label="中出しの経験" options={toRatingOptions(experienceOptions.creampie)} {...sel("creampieLevel")} />
            <MultiSelectDropdown label="浮気経験" options={toRatingOptions(experienceOptions.cheating)} {...sel("cheatingLevel")} />
            <MultiSelectDropdown label="浮気された経験" options={toRatingOptions(experienceOptions.cheated)} {...sel("cheatedLevel")} />
          </FilterSection>

          {/* 投稿内容 */}
          <FilterSection title="投稿内容">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-slate-700">タイトル</p>
              <input
                type="text"
                value={filters.title}
                onChange={(e) => onTextChange("title", e.target.value)}
                placeholder="部分一致で検索"
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-slate-700">投稿内容</p>
              <input
                type="text"
                value={filters.content}
                onChange={(e) => onTextChange("content", e.target.value)}
                placeholder="部分一致で検索"
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
              />
            </div>
          </FilterSection>
        </div>
      )}
    </div>
  );
}

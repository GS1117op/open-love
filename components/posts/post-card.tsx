"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { ChevronRight, Share2, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarIllustration } from "@/components/ui/avatar-illustrations";
import { experienceOptions, getAgeLabel, ratingOptions } from "@/lib/post-metadata";

type PostCardProps = {
  id: string;
  nickname?: string | null;
  mbti?: string | null;
  age?: number | null;
  prefecture?: string | null;
  gender: string;
  status: string;
  createdAt?: string;
  height?: number | null;
  weight?: number | null;
  education?: string | null;
  income?: number | null;
  avatarId?: string | null;
  cupSize?: string | null;
  penisLength?: number | null;
};

type PostDetail = {
  title: string | null;
  content: string | null;
  first_experience_age: number | null;
  relationship_count: number | null;
  experience_count: number | null;
  sex_frequency: number | null;
  ideal_sex_frequency: number | null;
  masturbation_frequency: number | null;
  sex_duration: number | null;
  ideal_sex_duration: number | null;
  sex_satisfaction: number | null;
  sex_satisfaction_note: string | null;
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

const DETAIL_SELECT_COLUMNS = `
  title,
  content,
  first_experience_age,
  relationship_count,
  experience_count,
  sex_frequency,
  ideal_sex_frequency,
  masturbation_frequency,
  sex_duration,
  ideal_sex_duration,
  sex_satisfaction,
  sex_satisfaction_note,
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

function InfoGrid({ title, items, className }: { title: string; items: Array<{ label: string; value: string }>; className?: string }) {
  if (items.length === 0) return null;

  return (
    <section className={`rounded-[1.25rem] border p-3 sm:p-4 ${className ?? "border-slate-200 bg-slate-50"}`}>
      <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-slate-500">{title}</p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:gap-3">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className="mt-0.5 text-sm text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CompactProfileSummary({
  highlights,
  tags,
  compact = false,
  valueOnly = false,
  cardStyle = false,
}: {
  highlights: Array<{ label: string; value: string }>;
  tags: Array<{ label: string; value: string }>;
  compact?: boolean;
  valueOnly?: boolean;
  cardStyle?: boolean;
}) {
  if (highlights.length === 0 && tags.length === 0) return null;

  return (
    <section className={`rounded-[1.25rem] border border-slate-200 bg-slate-50 ${compact ? "p-2.5" : "p-3"}`}>
      {highlights.length > 0 ? (
        <div className={`grid grid-cols-2 ${compact ? "gap-1.5" : "gap-2"}`}>
          {highlights.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 ${compact ? "px-2.5 py-2" : "px-3 py-2"}`}
            >
              <p className={`font-medium tracking-[0.08em] text-slate-500 ${compact ? "text-[9px]" : "text-[10px]"}`}>{item.label}</p>
              <p className={`mt-0.5 font-semibold leading-4 text-slate-900 ${compact ? "text-xs" : "text-sm leading-5"}`}>{item.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      {tags.length > 0 ? (
        <div
          className={
            highlights.length > 0
              ? `mt-2 flex flex-wrap ${compact ? "gap-1" : "gap-1.5"}`
              : cardStyle
                ? `grid grid-cols-2 ${compact ? "gap-1.5" : "gap-x-3 gap-y-2"}`
                : `flex flex-wrap ${compact ? "gap-1" : "gap-1.5"}`
          }
        >
          {tags.map((item) => (
            <div
              key={item.label}
              className={
                cardStyle
                  ? "rounded-xl bg-white px-3 py-2 ring-1 ring-slate-100"
                  : `inline-flex items-center rounded-full border border-slate-200 bg-white text-slate-700 ${compact ? "px-2.5 py-1 text-[11px] leading-4" : "gap-1 px-2.5 py-1 text-[11px] leading-4"}`
              }
            >
              {cardStyle ? (
                <>
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-900">{item.value}</p>
                </>
              ) : (
                <>
                  {valueOnly ? null : <span className="text-slate-500">{item.label}</span>}
                  <span className="font-medium text-slate-900">{item.value}</span>
                </>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function getExperienceLabel(values: readonly string[], value: number | null) {
  if (!value) return null;
  return values[value - 1] ?? null;
}

export function PostCard({
  id,
  nickname,
  mbti,
  age,
  prefecture,
  gender,
  status,
  createdAt,
  avatarId,
  height,
  weight,
  education,
  income,
  cupSize,
  penisLength,
}: PostCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isUrlDismissed, setIsUrlDismissed] = useState(false);
  const [detail, setDetail] = useState<PostDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const displayName = nickname?.trim() ? nickname : "匿名ユーザー";
  const formattedDate = createdAt ? new Date(createdAt).toLocaleString("ja-JP") : null;
  const isExpandedByUrl = searchParams.get("post") === id;
  const isExpanded = isOpen || (isExpandedByUrl && !isUrlDismissed);

  useEffect(() => {
    if (isExpandedByUrl && !isUrlDismissed) {
      setIsOpen(true);
    }

    if (!isExpandedByUrl) {
      setIsUrlDismissed(false);
    }
  }, [isExpandedByUrl, isUrlDismissed]);

  useEffect(() => {
    if (!isExpanded || detail) return;

    let cancelled = false;

    async function fetchDetail() {
      setDetailLoading(true);
      setDetailError(null);

      const { data, error } = await supabase
        .from("posts")
        .select(DETAIL_SELECT_COLUMNS)
        .eq("id", id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Failed to load post detail:", error.message);
        setDetailError("投稿詳細を読み込めませんでした。");
        setDetailLoading(false);
        return;
      }

      setDetail((data as PostDetail | null) ?? null);
      setDetailLoading(false);
    }

    fetchDetail();

    return () => {
      cancelled = true;
    };
  }, [detail, id, isExpanded]);

  function buildShareUrl() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("post", id);
    const query = params.toString();
    return `${window.location.origin}${pathname}${query ? `?${query}` : ""}`;
  }

  async function handleCopyShareUrl(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const shareUrl = buildShareUrl();

    try {
      await navigator.clipboard.writeText(shareUrl);
      window.alert("共有URLをコピーしました。");
    } catch {
      window.prompt("このURLをコピーしてください", shareUrl);
    }
  }

  function closeDetail() {
    setIsOpen(false);
    if (isExpandedByUrl) {
      setIsUrlDismissed(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("post");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }
  }

  const profileItems = [
    { label: "年齢", value: getAgeLabel(age) },
    { label: "居住エリア", value: prefecture || null },
    { label: "MBTI", value: mbti || null },
    { label: "身長", value: height != null ? `${height}cm` : null },
    { label: "体重", value: weight != null ? `${weight}kg` : null },
    { label: "学歴", value: education || null },
    { label: "年収", value: income != null ? `${income}万円` : null },
    { label: "カップ数", value: cupSize || null },
    { label: "ペニスの長さ", value: penisLength != null ? `${penisLength}cm` : null },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  const headerMetaItems = [
    { label: "性別", value: gender },
    { label: "年齢", value: getAgeLabel(age) },
    { label: "ステータス", value: status },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  const profileHighlightItems = profileItems.filter((item) =>
    ["年齢", "居住エリア", "MBTI", "年収"].includes(item.label)
  );
  const profileTagItems = profileItems.filter(
    (item) => !["年齢", "居住エリア", "MBTI", "年収"].includes(item.label)
  );

  const romanceItems = [
    {
      label: "初体験の年齢",
      value: detail?.first_experience_age != null ? `${detail.first_experience_age}歳` : null,
    },
    {
      label: "付き合った人数",
      value: detail?.relationship_count != null ? `${detail.relationship_count}人` : null,
    },
    {
      label: "経験人数",
      value: detail?.experience_count != null ? `${detail.experience_count}人` : null,
    },
    {
      label: "セックス回数（実態）",
      value: detail?.sex_frequency != null ? `${detail.sex_frequency}回/週` : null,
    },
    {
      label: "セックス回数（理想）",
      value: detail?.ideal_sex_frequency != null ? `${detail.ideal_sex_frequency}回/週` : null,
    },
    {
      label: "オナニー回数",
      value: detail?.masturbation_frequency != null ? `${detail.masturbation_frequency}回/週` : null,
    },
    {
      label: "セックス時間（実態）",
      value: detail?.sex_duration != null ? `${detail.sex_duration}分` : null,
    },
    {
      label: "セックス時間（理想）",
      value: detail?.ideal_sex_duration != null ? `${detail.ideal_sex_duration}分` : null,
    },
    {
      label: "満足度（0〜100）",
      value: detail?.sex_satisfaction != null ? String(detail.sex_satisfaction) : null,
    },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  const valueItems = [
    {
      label: "結婚願望",
      value: detail?.marriage_intent != null ? (ratingOptions.marriageIntent[detail.marriage_intent - 1] as string | undefined) ?? null : null,
    },
    {
      label: "専業主婦希望",
      value: detail?.housewife_preference != null ? (ratingOptions.housewifePreference[detail.housewife_preference - 1] as string | undefined) ?? null : null,
    },
    {
      label: "子供の人数願望",
      value: detail?.desired_children != null ? (ratingOptions.desiredChildren[detail.desired_children - 1] as string | undefined) ?? null : null,
    },
    {
      label: "どこからが浮気か",
      value: detail?.cheating_definition != null ? (ratingOptions.cheatingDefinition[detail.cheating_definition - 1] as string | undefined) ?? null : null,
    },
    {
      label: "浮気願望",
      value: detail?.cheating_desire != null ? (ratingOptions.cheatingDesire[detail.cheating_desire - 1] as string | undefined) ?? null : null,
    },
    {
      label: "浮気されたらどうするか",
      value: detail?.reaction_to_cheating != null ? (ratingOptions.reactionToCheating[detail.reaction_to_cheating - 1] as string | undefined) ?? null : null,
    },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  const experienceItems = [
    {
      label: "同棲経験",
      value: getExperienceLabel(experienceOptions.cohabitation, detail?.cohabitation_level ?? null),
    },
    {
      label: "マチアプ経験",
      value: getExperienceLabel(experienceOptions.datingApp, detail?.dating_app_level ?? null),
    },
    {
      label: "ゴムなし経験",
      value: getExperienceLabel(experienceOptions.noCondom, detail?.no_condom_level ?? null),
    },
    {
      label: "中出し経験",
      value: getExperienceLabel(experienceOptions.creampie, detail?.creampie_level ?? null),
    },
    {
      label: "浮気経験",
      value: getExperienceLabel(experienceOptions.cheating, detail?.cheating_level ?? null),
    },
    {
      label: "浮気された経験",
      value: getExperienceLabel(experienceOptions.cheated, detail?.cheated_level ?? null),
    },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  return (
    <>
      <Card className="rounded-[2rem] border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
              {avatarId ? (
                <AvatarIllustration id={avatarId} size={44} />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                  {displayName[0]}
                </div>
              )}
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-slate-900">{displayName}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {headerMetaItems.map((item) => (
                      <span
                        key={item.label}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                      >
                        {item.value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {formattedDate ? (
              <p className="shrink-0 pt-0.5 text-[11px] leading-4 text-slate-500">{formattedDate}</p>
            ) : null}
          </div>

          <div className="mt-3">
            <CompactProfileSummary highlights={[]} tags={profileItems} cardStyle />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex h-10 w-full items-center justify-center gap-1.5 rounded-2xl bg-slate-900 px-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              詳細を見る
              <ChevronRight className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleCopyShareUrl}
              className="flex h-10 w-full items-center justify-center gap-1.5 rounded-2xl bg-slate-100 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              <Share2 className="size-4" />
              URLコピー
            </button>
          </div>
        </CardContent>
      </Card>

      {isExpanded ? (
        <div className="fixed inset-0 z-50 bg-slate-950/60 p-4" onClick={closeDetail}>
          <div
            className="mx-auto flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-3 sm:px-5">
              <div>
                <p className="text-sm font-medium text-slate-500">投稿詳細</p>
                <h2 className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">
                  {detail?.title || "投稿タイトル"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDetail}
                className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
                aria-label="閉じる"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto p-4 sm:p-5">
              <CompactProfileSummary
                highlights={[]}
                tags={profileItems}
                compact
                valueOnly
              />

              {detailLoading ? (
                <div className="rounded-[1.25rem] border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                  詳細を読み込み中です...
                </div>
              ) : detailError ? (
                <div className="rounded-[1.25rem] border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {detailError}
                </div>
              ) : (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <InfoGrid title="恋愛・性データ" items={romanceItems} className="border-rose-100 bg-rose-50/60" />
                    <InfoGrid title="価値観" items={valueItems} className="border-amber-100 bg-amber-50/60" />
                  </div>
                  <InfoGrid title="経験" items={experienceItems} className="border-emerald-100 bg-emerald-50/60" />
                  {detail?.sex_satisfaction_note ? (
                    <section className="rounded-[1.25rem] border border-rose-100 bg-rose-50/60 p-4">
                      <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-slate-500">点数の理由</p>
                      <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                        {detail.sex_satisfaction_note}
                      </p>
                    </section>
                  ) : null}
                  <section className="rounded-[1.25rem] border border-slate-200 bg-slate-100/70 p-4">
                    <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-slate-500">本文</p>
                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                      {detail?.content || "本文はありません。"}
                    </p>
                  </section>
                </>
              )}

              <button
                type="button"
                onClick={handleCopyShareUrl}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Share2 className="size-4" />
                共有URLをコピー
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

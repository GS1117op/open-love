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
  experience_count: number | null;
  sex_frequency: number | null;
  marriage_intent: number | null;
  housewife_preference: number | null;
  desired_children: number | null;
  cheating_desire: number | null;
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
  experience_count,
  sex_frequency,
  marriage_intent,
  housewife_preference,
  desired_children,
  cheating_desire,
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
    <section className={`rounded-[1.25rem] border p-4 ${className ?? "border-slate-200 bg-slate-50"}`}>
      <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-slate-500">{title}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className="mt-1 text-sm text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
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
  const [detail, setDetail] = useState<PostDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const displayName = nickname?.trim() ? nickname : "匿名ユーザー";
  const formattedDate = createdAt ? new Date(createdAt).toLocaleString("ja-JP") : null;
  const isExpandedByUrl = searchParams.get("post") === id;
  const isExpanded = isOpen || isExpandedByUrl;

  useEffect(() => {
    if (isExpandedByUrl) setIsOpen(true);
  }, [isExpandedByUrl]);

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

  const romanceItems = [
    {
      label: "経験人数",
      value: detail?.experience_count != null ? `${detail.experience_count}人` : null,
    },
    {
      label: "セックス頻度",
      value: detail?.sex_frequency != null ? `${detail.sex_frequency}回` : null,
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
      label: "子ども希望",
      value: detail?.desired_children != null ? (ratingOptions.desiredChildren[detail.desired_children - 1] as string | undefined) ?? null : null,
    },
    {
      label: "浮気願望",
      value: detail?.cheating_desire != null ? (ratingOptions.cheatingDesire[detail.cheating_desire - 1] as string | undefined) ?? null : null,
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-3">
              {avatarId ? (
                <AvatarIllustration id={avatarId} size={44} />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                  {displayName[0]}
                </div>
              )}
              <div>
                <p className="font-semibold text-slate-900">{displayName}</p>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span>{gender}</span>
                  <span>{status}</span>
                </div>
              </div>
            </div>
            {formattedDate ? <p className="text-xs text-slate-500">{formattedDate}</p> : null}
          </div>

          <div className="mt-4">
            <InfoGrid title="プロフィール" items={profileItems} />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              詳細を見る
              <ChevronRight className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleCopyShareUrl}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              <Share2 className="size-4" />
              共有URLをコピー
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
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-4 sm:px-5">
              <div>
                <p className="text-sm font-medium text-slate-500">投稿詳細</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">
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

            <div className="space-y-4 overflow-y-auto p-4 sm:p-5">
              <InfoGrid title="プロフィール" items={profileItems} className="border-sky-100 bg-sky-50/60" />

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
                  <InfoGrid title="恋愛・性データ" items={romanceItems} className="border-rose-100 bg-rose-50/60" />
                  <InfoGrid title="価値観" items={valueItems} className="border-amber-100 bg-amber-50/60" />
                  <InfoGrid title="経験" items={experienceItems} className="border-emerald-100 bg-emerald-50/60" />
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

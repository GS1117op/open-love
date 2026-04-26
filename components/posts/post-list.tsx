"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { PostCard } from "./post-card";
import {
  PostFilter,
  defaultPostFilters,
  getActiveFilterCount,
  type PostFilterState,
} from "./post-filter";

type PostListRecord = {
  id: string;
  nickname: string | null;
  gender: string;
  age: number | null;
  status: string;
  prefecture: string | null;
  height: number | null;
  weight: number | null;
  mbti: string | null;
  income: number | null;
  education: string | null;
  cup_size: string | null;
  penis_length: number | null;
  avatar_id: string | null;
  created_at: string;
};

const PAGE_SIZE = 5;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseQuery = any;

function applyTextFilter(query: SupabaseQuery, column: string, value: string) {
  const v = value.trim();
  return v ? query.ilike(column, `%${v}%`) : query;
}

function applyMultiSelect(query: SupabaseQuery, column: string, values: string[]) {
  return values.length > 0 ? query.in(column, values) : query;
}

function applyRange(query: SupabaseQuery, column: string, range: { min: string; max: string }) {
  let q = query;
  if (range.min) q = q.gte(column, Number(range.min));
  if (range.max) q = q.lte(column, Number(range.max));
  return q;
}

export function PostList() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<PostListRecord[]>([]);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [filteredPostCount, setFilteredPostCount] = useState(0);
  const [filters, setFilters] = useState<PostFilterState>(defaultPostFilters);
  const deferredFilters = useDeferredValue(filters);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  const needsAdvancedFields = useMemo(
    () =>
      Boolean(
        deferredFilters.firstExperienceAge.min || deferredFilters.firstExperienceAge.max ||
        deferredFilters.relationshipCount.min || deferredFilters.relationshipCount.max ||
        deferredFilters.experienceCount.min || deferredFilters.experienceCount.max ||
        deferredFilters.sexFrequency.min || deferredFilters.sexFrequency.max ||
        deferredFilters.idealSexFrequency.min || deferredFilters.idealSexFrequency.max ||
        deferredFilters.masturbationFrequency.min || deferredFilters.masturbationFrequency.max ||
        deferredFilters.sexDuration.min || deferredFilters.sexDuration.max ||
        deferredFilters.idealSexDuration.min || deferredFilters.idealSexDuration.max ||
        deferredFilters.sexSatisfaction.min || deferredFilters.sexSatisfaction.max ||
        deferredFilters.marriageIntent.length || deferredFilters.housewifePreference.length ||
        deferredFilters.desiredChildren.length || deferredFilters.cheatingDefinition.length ||
        deferredFilters.cheatingDesire.length || deferredFilters.reactionToCheating.length ||
        deferredFilters.cohabitationLevel.length || deferredFilters.datingAppLevel.length ||
        deferredFilters.noCondomLevel.length || deferredFilters.creampieLevel.length ||
        deferredFilters.cheatingLevel.length || deferredFilters.cheatedLevel.length
      ),
    [deferredFilters]
  );

  const needsTextFields = useMemo(
    () => Boolean(
      deferredFilters.title.trim() ||
      deferredFilters.content.trim() ||
      deferredFilters.sexSatisfactionNote.trim()
    ),
    [deferredFilters.title, deferredFilters.content, deferredFilters.sexSatisfactionNote]
  );

  useEffect(() => {
    async function fetchTotal() {
      const { count, error } = await supabase
        .from("posts")
        .select("id", { count: "exact", head: true });
      if (!error) setTotalPostCount(count ?? 0);
    }
    fetchTotal();
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);

      const cols = [
        "id, nickname, gender, age, status, prefecture, height, weight, mbti, income, education, cup_size, penis_length, avatar_id, created_at",
        needsAdvancedFields
          ? "first_experience_age, relationship_count, experience_count, sex_frequency, ideal_sex_frequency, masturbation_frequency, sex_duration, ideal_sex_duration, sex_satisfaction, marriage_intent, housewife_preference, desired_children, cheating_definition, cheating_desire, reaction_to_cheating, cohabitation_level, dating_app_level, no_condom_level, creampie_level, cheating_level, cheated_level"
          : null,
        needsTextFields ? "sex_satisfaction_note, title, content" : null,
      ]
        .filter(Boolean)
        .join(", ");

      let q = supabase.from("posts").select(cols, { count: "exact" });

      q = applyTextFilter(q, "nickname", deferredFilters.nickname);
      q = applyMultiSelect(q, "gender", deferredFilters.gender);
      q = applyMultiSelect(q, "age", deferredFilters.age);
      q = applyMultiSelect(q, "status", deferredFilters.status);
      q = applyMultiSelect(q, "prefecture", deferredFilters.prefecture);
      q = applyMultiSelect(q, "height", deferredFilters.height);
      q = applyMultiSelect(q, "weight", deferredFilters.weight);
      q = applyMultiSelect(q, "mbti", deferredFilters.mbti);
      q = applyRange(q, "income", deferredFilters.income);
      q = applyMultiSelect(q, "education", deferredFilters.education);
      q = applyMultiSelect(q, "cup_size", deferredFilters.cupSize);
      q = applyRange(q, "penis_length", deferredFilters.penisLength);

      if (needsAdvancedFields) {
        q = applyRange(q, "first_experience_age", deferredFilters.firstExperienceAge);
        q = applyRange(q, "relationship_count", deferredFilters.relationshipCount);
        q = applyRange(q, "experience_count", deferredFilters.experienceCount);
        q = applyRange(q, "sex_frequency", deferredFilters.sexFrequency);
        q = applyRange(q, "ideal_sex_frequency", deferredFilters.idealSexFrequency);
        q = applyRange(q, "masturbation_frequency", deferredFilters.masturbationFrequency);
        q = applyRange(q, "sex_duration", deferredFilters.sexDuration);
        q = applyRange(q, "ideal_sex_duration", deferredFilters.idealSexDuration);
        q = applyRange(q, "sex_satisfaction", deferredFilters.sexSatisfaction);
        q = applyMultiSelect(q, "marriage_intent", deferredFilters.marriageIntent);
        q = applyMultiSelect(q, "housewife_preference", deferredFilters.housewifePreference);
        q = applyMultiSelect(q, "desired_children", deferredFilters.desiredChildren);
        q = applyMultiSelect(q, "cheating_definition", deferredFilters.cheatingDefinition);
        q = applyMultiSelect(q, "cheating_desire", deferredFilters.cheatingDesire);
        q = applyMultiSelect(q, "reaction_to_cheating", deferredFilters.reactionToCheating);
        q = applyMultiSelect(q, "cohabitation_level", deferredFilters.cohabitationLevel);
        q = applyMultiSelect(q, "dating_app_level", deferredFilters.datingAppLevel);
        q = applyMultiSelect(q, "no_condom_level", deferredFilters.noCondomLevel);
        q = applyMultiSelect(q, "creampie_level", deferredFilters.creampieLevel);
        q = applyMultiSelect(q, "cheating_level", deferredFilters.cheatingLevel);
        q = applyMultiSelect(q, "cheated_level", deferredFilters.cheatedLevel);
      }

      if (needsTextFields) {
        q = applyTextFilter(q, "sex_satisfaction_note", deferredFilters.sexSatisfactionNote);
        q = applyTextFilter(q, "title", deferredFilters.title);
        q = applyTextFilter(q, "content", deferredFilters.content);
      }

      const from = (currentPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data, error, count } = await q
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("投稿取得エラー:", error.message);
        setLoading(false);
        return;
      }

      setPosts((data as unknown as PostListRecord[]) ?? []);
      setFilteredPostCount(count ?? 0);
      setLoading(false);
    }

    fetchPosts();
  }, [currentPage, deferredFilters, needsAdvancedFields, needsTextFields]);

  const activeFilterCount = getActiveFilterCount(filters);
  const totalPages = Math.max(1, Math.ceil(filteredPostCount / PAGE_SIZE));
  const sharedPostId = searchParams.get("post");

  useEffect(() => {
    async function resolveSharedPostPage() {
      if (!sharedPostId || activeFilterCount > 0) return;

      const { data: shared, error: e1 } = await supabase
        .from("posts")
        .select("created_at")
        .eq("id", sharedPostId)
        .maybeSingle();

      if (e1 || !shared?.created_at) return;

      const { count, error: e2 } = await supabase
        .from("posts")
        .select("id", { count: "exact", head: true })
        .gt("created_at", shared.created_at);

      if (e2) return;

      const targetPage = Math.floor((count ?? 0) / PAGE_SIZE) + 1;
      if (targetPage !== currentPage) {
        setCurrentPage(targetPage);
        setPageInput(String(targetPage));
      }
    }
    resolveSharedPostPage();
  }, [activeFilterCount, currentPage, sharedPostId]);

  function handleTextChange(key: keyof PostFilterState, value: string) {
    setFilters((f) => ({ ...f, [key]: value }));
    setCurrentPage(1);
    setPageInput("1");
  }

  function handleToggleSelect(key: keyof PostFilterState, value: string) {
    setFilters((f) => {
      const cur = f[key];
      if (!Array.isArray(cur)) return f;
      return {
        ...f,
        [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value],
      };
    });
    setCurrentPage(1);
    setPageInput("1");
  }

  function handleClearSelect(key: keyof PostFilterState) {
    setFilters((f) => {
      const cur = f[key];
      if (!Array.isArray(cur)) return f;
      return { ...f, [key]: [] };
    });
    setCurrentPage(1);
    setPageInput("1");
  }

  function handleRangeChange(key: keyof PostFilterState, bound: "min" | "max", value: string) {
    setFilters((f) => {
      const cur = f[key];
      if (typeof cur === "string" || Array.isArray(cur)) return f;
      return { ...f, [key]: { ...cur, [bound]: value } };
    });
    setCurrentPage(1);
    setPageInput("1");
  }

  function moveToPage(page: number) {
    const next = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(next);
    setPageInput(String(next));
  }

  function handlePageSubmit() {
    const parsed = Number(pageInput);
    if (!Number.isFinite(parsed)) {
      setPageInput(String(currentPage));
      return;
    }
    moveToPage(parsed);
  }

  const btnClass =
    "rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition duration-150 hover:bg-slate-50 active:scale-[0.97] active:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none";

  function PaginationControls() {
    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;
    return (
      <div className="flex flex-col items-stretch gap-3 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-500 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          {filteredPostCount}件中 {(currentPage - 1) * PAGE_SIZE + 1}–
          {Math.min(currentPage * PAGE_SIZE, filteredPostCount)}件を表示
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => moveToPage(1)} disabled={isFirst} className={btnClass}>最初</button>
          <button type="button" onClick={() => moveToPage(currentPage - 1)} disabled={isFirst} className={btnClass}>前へ</button>
          <label className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
            <span className="font-medium">ページ</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              inputMode="numeric"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handlePageSubmit(); }}
              className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-center text-sm text-slate-700 outline-none transition focus:border-slate-400"
            />
            <span>/ {totalPages}</span>
          </label>
          <button type="button" onClick={() => moveToPage(currentPage + 1)} disabled={isLast} className={btnClass}>次へ</button>
          <button type="button" onClick={() => moveToPage(totalPages)} disabled={isLast} className={btnClass}>最後</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PostFilter
        filters={filters}
        activeFilterCount={activeFilterCount}
        resultCount={filteredPostCount}
        totalCount={totalPostCount}
        onTextChange={handleTextChange}
        onToggleSelect={handleToggleSelect}
        onClearSelect={handleClearSelect}
        onRangeChange={handleRangeChange}
        onReset={() => {
          setFilters(defaultPostFilters);
          setCurrentPage(1);
          setPageInput("1");
        }}
      />

      {loading ? (
        <p className="text-sm text-slate-500">読み込み中...</p>
      ) : totalPostCount === 0 ? (
        <p className="text-sm text-slate-500">投稿がありません</p>
      ) : posts.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500 shadow-sm">
          条件に合う投稿がありません。フィルタを少しゆるめると見つかりやすいです。
        </div>
      ) : (
        <div className="space-y-4">
          <PaginationControls />

          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              nickname={post.nickname}
              mbti={post.mbti}
              age={post.age}
              prefecture={post.prefecture}
              gender={post.gender}
              status={post.status}
              createdAt={post.created_at}
              avatarId={post.avatar_id}
              height={post.height}
              weight={post.weight}
              education={post.education}
              income={post.income}
              cupSize={post.cup_size}
              penisLength={post.penis_length}
            />
          ))}

          <PaginationControls />
        </div>
      )}
    </div>
  );
}

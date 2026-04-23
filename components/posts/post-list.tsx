"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { PostCard } from "@/components/posts/post-card";
import { PostFilter } from "@/components/posts/post-filter";
import { PostStats } from "@/components/posts/post-stats";
import { PostAgeChart } from "@/components/posts/post-age-chart";
import { PostStatusChart } from "@/components/posts/post-status-chart";

type Post = {
  id: number;
  nickname: string | null;
  category: string;
  age_range: string;
  gender: string;
  status: string;
  title: string;
  content: string;
  created_at: string;

  experience_count: number | null;
  sex_frequency: number | null;
  children_count: number | null;
  education: string | null;
  income_range: string | null;
};

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      if (!supabase) {
        setErrorMessage("Supabase の設定が見つかりません。");
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setErrorMessage(`取得に失敗しました: ${error.message}`);
        setLoading(false);
        return;
      }

      setPosts(data ?? []);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory = category ? post.category === category : true;
      const matchAgeRange = ageRange ? post.age_range === ageRange : true;
      const matchGender = gender ? post.gender === gender : true;
      const matchStatus = status ? post.status === status : true;

      return matchCategory && matchAgeRange && matchGender && matchStatus;
    });
  }, [posts, category, ageRange, gender, status]);

  const stats = useMemo(() => {
    const experienceValues = filteredPosts
      .map((post) => post.experience_count)
      .filter((value): value is number => value !== null);

    const sexFrequencyValues = filteredPosts
      .map((post) => post.sex_frequency)
      .filter((value): value is number => value !== null);

    const childrenValues = filteredPosts
      .map((post) => post.children_count)
      .filter((value): value is number => value !== null);

    function getAverage(values: number[]) {
      if (values.length === 0) {
        return null;
      }

      const total = values.reduce((sum, value) => sum + value, 0);
      return total / values.length;
    }

    return {
      totalCount: filteredPosts.length,
      averageExperienceCount: getAverage(experienceValues),
      averageSexFrequency: getAverage(sexFrequencyValues),
      averageChildrenCount: getAverage(childrenValues),
    };
  }, [filteredPosts]);

  const ageChartData = useMemo(() => {
    const ageOrder = ["10代", "20代", "30代", "40代", "50代以上"];

    return ageOrder.map((age) => ({
      ageRange: age,
      count: filteredPosts.filter((post) => post.age_range === age).length,
    }));
  }, [filteredPosts]);
    const statusChartData = useMemo(() => {
    const statusOrder = ["独身", "交際中", "既婚", "離婚"];

    return statusOrder.map((item) => ({
      status: item,
      count: filteredPosts.filter((post) => post.status === item).length,
    }));
  }, [filteredPosts]);

  return (
    <div className="space-y-6">
      <PostFilter
        category={category}
        ageRange={ageRange}
        gender={gender}
        status={status}
        onCategoryChange={setCategory}
        onAgeRangeChange={setAgeRange}
        onGenderChange={setGender}
        onStatusChange={setStatus}
      />

      <PostStats
        totalCount={stats.totalCount}
        averageExperienceCount={stats.averageExperienceCount}
        averageSexFrequency={stats.averageSexFrequency}
        averageChildrenCount={stats.averageChildrenCount}
      />

      <PostAgeChart data={ageChartData} />
      <PostStatusChart data={statusChartData} />

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          読み込み中...
        </div>
      ) : errorMessage ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
          {errorMessage}
        </div>
      ) : (
        <>
          <div className="text-sm text-slate-600">
            表示件数: {filteredPosts.length}件
          </div>

          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  nickname={post.nickname}
                  category={post.category}
                  ageRange={post.age_range}
                  gender={post.gender}
                  status={post.status}
                  title={post.title}
                  content={post.content}
                  createdAt={post.created_at}
                  experienceCount={post.experience_count}
                  sexFrequency={post.sex_frequency}
                  childrenCount={post.children_count}
                  education={post.education}
                  incomeRange={post.income_range}
                />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
                条件に合う投稿がありません。
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
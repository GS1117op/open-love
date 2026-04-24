"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { PostCard } from "./post-card";

type Post = {
  id: string;
  nickname: string | null;

  mbti: string | null;
  age: number | null;
  prefecture: string | null;

  gender: string;
  status: string;
  title: string;
  content: string;
  created_at: string;

  height: number | null;
  weight: number | null;
  education: string | null;
  income: number | null;

  avatar_id: string | null;
  cup_size: string | null;
  penis_length: number | null;

  experience_count: number | null;
  sex_frequency: number | null;
  children_count: number | null;

  /* ▼価値観 */
  marriage_intent: number | null;
  housewife_preference: number | null;
  desired_children: number | null;
  cheating_definition: number | null;
  cheating_desire: number | null;
  reaction_to_cheating: number | null;

  /* ▼経験（今回追加） */
  cohabitation_level: number | null;
  dating_app_level: number | null;
  no_condom_level: number | null;
  creampie_level: number | null;
  cheating_level: number | null;
  cheated_level: number | null;
};

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("取得エラー:", error.message);
      setLoading(false);
      return;
    }

    setPosts(data || []);
    setLoading(false);
  }

  if (loading) {
    return <p className="text-sm text-slate-500">読み込み中...</p>;
  }

  if (posts.length === 0) {
    return <p className="text-sm text-slate-500">投稿がありません</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          nickname={post.nickname}
          mbti={post.mbti}
          age={post.age}
          prefecture={post.prefecture}
          gender={post.gender}
          status={post.status}
          title={post.title}
          content={post.content}
          createdAt={post.created_at}
          avatarId={post.avatar_id}

          height={post.height}
          weight={post.weight}
          education={post.education}
          income={post.income}

          cupSize={post.cup_size}
          penisLength={post.penis_length}

          experienceCount={post.experience_count}
          sexFrequency={post.sex_frequency}
          childrenCount={post.children_count}

          /* ▼経験（ここ重要） */
          cohabitationLevel={post.cohabitation_level}
          datingAppLevel={post.dating_app_level}
          noCondomLevel={post.no_condom_level}
          creampieLevel={post.creampie_level}
          cheatingLevel={post.cheating_level}
          cheatedLevel={post.cheated_level}
        />
      ))}
    </div>
  );
}
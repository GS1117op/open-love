"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { PostCard } from "@/components/posts/post-card";
import { PostFilter } from "@/components/posts/post-filter";

type Post = {
  id: number;
  category: string;
  age_range: string;
  gender: string;
  status: string;
  title: string;
  content: string;
  created_at: string;
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
                  category={post.category}
                  ageRange={post.age_range}
                  gender={post.gender}
                  status={post.status}
                  title={post.title}
                  content={post.content}
                  createdAt={post.created_at}
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
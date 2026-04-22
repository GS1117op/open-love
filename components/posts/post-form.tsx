"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function PostForm() {
  const [category, setCategory] = useState("恋愛");
  const [ageRange, setAgeRange] = useState("20代");
  const [gender, setGender] = useState("女性");
  const [status, setStatus] = useState("独身");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setMessage("タイトルと内容は必須です。");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const { error } = await supabase.from("posts").insert({
      category,
      age_range: ageRange,
      gender,
      status,
      title: title.trim(),
      content: content.trim(),
    });

    if (error) {
  setMessage(`保存に失敗しました: ${error.message}`);
  setIsSubmitting(false);
  return;
}

    setMessage("投稿を保存しました。");
    setTitle("");
    setContent("");
    setCategory("恋愛");
    setAgeRange("20代");
    setGender("女性");
    setStatus("独身");
    setIsSubmitting(false);
  }

  return (
    <Card className="border-slate-200 bg-white">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-600">匿名投稿フォーム</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            恋愛・結婚・家族のデータを投稿する
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            まずはMVPとして、基本情報を入力して保存できます。
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">カテゴリ</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <option>恋愛</option>
              <option>結婚</option>
              <option>家族</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">年代</label>
            <select
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <option>10代</option>
              <option>20代</option>
              <option>30代</option>
              <option>40代</option>
              <option>50代以上</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">性別</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <option>女性</option>
              <option>男性</option>
              <option>その他</option>
              <option>回答しない</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ステータス</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <option>独身</option>
              <option>交際中</option>
              <option>既婚</option>
              <option>離婚</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">タイトル</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：30代既婚、子ども2人です"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[140px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
              placeholder="例：結婚年齢、交際期間、子どもの人数、今後の予定など"
            />
          </div>

          
          {message ? (
  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
    <p>{message}</p>

    {message === "投稿を保存しました。" ? (
      <div className="mt-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/posts">投稿一覧を見る</Link>
        </Button>
      </div>
    ) : null}
  </div>
) : null}

          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "保存中..." : "投稿する"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
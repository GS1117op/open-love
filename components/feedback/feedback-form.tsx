"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function FeedbackForm() {
  const [type, setType] = useState("ご意見");
  const [content, setContent] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!content.trim()) {
      setMessage("内容は必須です。");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const { error } = await supabase.from("feedbacks").insert({
        type,
        content: content.trim(),
        contact: contact.trim() || null,
      });

      if (error) {
        console.error("Supabase insert error", error);
        setMessage(`送信に失敗しました: ${error.message}`);
        return;
      }

      setMessage("送信ありがとうございました。");
      setType("ご意見");
      setContent("");
      setContact("");
    } catch (err) {
      console.error("Unexpected submit error", err);
      setMessage("送信に失敗しました。ブラウザを更新して、もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border-slate-200 bg-white">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-600">ご意見・ご要望</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            改善のための声を送る
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            使いづらい点や追加してほしい機能など、気軽に送ってください。
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">種類</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <option>ご意見</option>
              <option>ご要望</option>
              <option>不具合報告</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[160px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
              placeholder="たとえば、見たいグラフ、使いづらい操作、追加してほしい機能など"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">連絡先（任意）</label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
              placeholder="メールアドレスやXのIDなど"
            />
          </div>

          {message ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              {message}
            </div>
          ) : null}

          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "送信中..." : "送信する"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

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
    <div
      className="p-6 sm:p-8"
      style={{
        borderRadius: "20px",
        background: "rgba(42, 17, 69, 0.7)",
        border: "1px solid rgba(255, 77, 141, 0.2)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="mb-6">
        <p className="text-sm font-medium" style={{ color: "#ff4d8d" }}>ご意見・ご要望</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "#f0e6ff" }}>
          改善のための声を送る
        </h1>
        <p className="mt-3 text-sm leading-7 sm:text-base" style={{ color: "#b09fc8" }}>
          使いづらい点や追加してほしい機能など、気軽に送ってください。
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium" style={{ color: "#e0d0f0" }}>種類</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="flex h-10 w-full rounded-xl px-3 py-2 text-sm"
          >
            <option>ご意見</option>
            <option>ご要望</option>
            <option>不具合報告</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" style={{ color: "#e0d0f0" }}>内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[160px] w-full rounded-xl px-3 py-2 text-sm"
            placeholder="たとえば、見たいグラフ、使いづらい操作、追加してほしい機能など"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" style={{ color: "#e0d0f0" }}>連絡先（任意）</label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="flex h-10 w-full rounded-xl px-3 py-2 text-sm"
            placeholder="メールアドレスやXのIDなど"
          />
        </div>

        {message ? (
          <div
            className="rounded-xl border p-4 text-sm"
            style={{ borderColor: "rgba(255, 77, 141, 0.25)", background: "rgba(255, 77, 141, 0.08)", color: "#ff8cc8" }}
          >
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gradient flex h-12 items-center justify-center rounded-2xl px-8 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "送信中..." : "送信する"}
        </button>
      </form>
    </div>
  );
}

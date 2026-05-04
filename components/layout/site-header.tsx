"use client";

import Link from "next/link";
import { BarChart3, LayoutGrid, PenSquare } from "lucide-react";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        borderBottom: "1px solid rgba(255, 77, 141, 0.2)",
        background: "rgba(26, 10, 46, 0.92)",
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
        <Link href="/" className="flex flex-col">
          <span
            className="text-lg font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ff4d8d, #9b2dd6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            OpenLove
          </span>
          <span style={{ color: "#b09fc8", fontSize: "0.72rem" }}>
            匿名で恋愛・結婚・セックスのリアルをのぞく
          </span>
        </Link>

        <nav className="grid w-full grid-cols-3 gap-2 sm:w-auto sm:grid-cols-[repeat(3,auto)]">
          <Link
            href="/posts"
            className="flex h-11 items-center justify-center gap-1.5 rounded-2xl px-4 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "rgba(255, 77, 141, 0.08)",
              border: "1px solid rgba(255, 77, 141, 0.25)",
              color: "#f0e6ff",
            }}
          >
            <LayoutGrid className="size-4" />
            投稿一覧
          </Link>
          <Link
            href="/data-graphs"
            className="flex h-11 items-center justify-center gap-1.5 rounded-2xl px-4 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "rgba(155, 45, 214, 0.12)",
              border: "1px solid rgba(155, 45, 214, 0.3)",
              color: "#f0e6ff",
            }}
          >
            <BarChart3 className="size-4" />
            データグラフ
          </Link>
          <Link
            href="/submit"
            className="btn-gradient flex h-11 items-center justify-center gap-1.5 rounded-2xl px-4 text-sm font-medium"
          >
            <PenSquare className="size-4" />
            投稿する
          </Link>
        </nav>
      </div>
    </header>
  );
}

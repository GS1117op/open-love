"use client";

import Link from "next/link";
import { BarChart3, LayoutGrid, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
        <Link href="/" className="flex flex-col">
          <span className="text-lg font-semibold tracking-tight text-slate-900">OpenLove</span>
          <span className="text-xs text-slate-500">匿名で恋愛・結婚・セックスのリアルをのぞく</span>
        </Link>

        <nav className="grid w-full grid-cols-3 gap-2 sm:w-auto sm:grid-cols-[repeat(3,auto)]">
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-2xl border-slate-300 bg-white text-slate-800 shadow-sm hover:border-slate-400 hover:bg-slate-50"
          >
            <Link href="/posts">
              <LayoutGrid className="size-4" />
              投稿一覧
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-2xl border-emerald-300 bg-emerald-50 text-emerald-900 shadow-sm hover:border-emerald-400 hover:bg-emerald-100"
          >
            <Link href="/data-graphs">
              <BarChart3 className="size-4" />
              データグラフ
            </Link>
          </Button>
          <Button
            asChild
            className="h-11 rounded-2xl bg-slate-900 text-white shadow-sm hover:bg-slate-800"
          >
            <Link href="/submit">
              <PenSquare className="size-4" />
              投稿する
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

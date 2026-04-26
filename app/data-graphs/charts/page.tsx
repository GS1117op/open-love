import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { PresetPostGraphsDashboard } from "@/components/posts/preset-post-graphs-dashboard";

export default function DataGraphsChartsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
        <div className="mb-5 max-w-3xl rounded-[2rem] border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-6">
          <Link
            href="/data-graphs"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ChevronLeft className="size-4" />
            データグラフへ戻る
          </Link>
          <p className="mt-4 text-sm font-medium text-slate-600">基礎グラフ</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            人気の見方をそのままチェック
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            基本情報から価値観まで、見られやすい切り口のグラフを一覧で確認できます。
          </p>
        </div>

        <PresetPostGraphsDashboard />
      </main>
    </div>
  );
}

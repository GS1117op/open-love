import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { CustomPostGraphsDashboard } from "@/components/posts/custom-post-graphs-dashboard";

export default function DataGraphsCustomPage() {
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
          <p className="mt-4 text-sm font-medium text-slate-600">自由グラフ作成</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            条件を組み合わせて深掘りする
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            気になる条件を選びながら、グラフを作れます。
          </p>
        </div>

        <CustomPostGraphsDashboard />
      </main>
    </div>
  );
}

import Link from "next/link";
import { BarChart3, ChartNoAxesCombined, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DataGraphsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
        <div
          className="mb-5 max-w-3xl px-5 py-6 sm:px-6"
          style={{
            borderRadius: "24px",
            background: "rgba(42, 17, 69, 0.7)",
            border: "1px solid rgba(255, 77, 141, 0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <p className="text-sm font-medium" style={{ color: "#ff4d8d" }}>データグラフ</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "#f0e6ff" }}>
            気になる傾向をグラフで比べる
          </h1>
          <p className="mt-2 text-sm leading-6 sm:text-base" style={{ color: "#b09fc8" }}>
            基礎の見やすいグラフを見ることも、条件を自由に組み合わせて深掘りすることもできます。
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div
            className="flex flex-col overflow-hidden p-5 sm:p-6"
            style={{
              borderRadius: "20px",
              background: "rgba(42, 17, 69, 0.7)",
              border: "1px solid rgba(255, 77, 141, 0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="rounded-2xl p-3" style={{ background: "rgba(255, 77, 141, 0.15)", border: "1px solid rgba(255, 77, 141, 0.3)" }}>
                <BarChart3 className="size-6" style={{ color: "#ff8cc8" }} />
              </div>
              <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: "rgba(255, 77, 141, 0.12)", border: "1px solid rgba(255, 77, 141, 0.2)", color: "#ff4d8d" }}>
                Preset
              </span>
            </div>
            <div className="mt-6 flex-1">
              <h2 className="text-xl font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>基礎グラフ</h2>
              <p className="mt-2 text-sm leading-6" style={{ color: "#b09fc8" }}>
                年齢、ステータス、男女差など、見たい切り口をすぐ確認できるグラフをまとめています。
              </p>
            </div>
            <Link
              href="/data-graphs/charts"
              className="btn-gradient mt-6 flex h-12 w-full items-center justify-between rounded-2xl px-5 text-sm font-semibold"
            >
              基礎グラフを見る
              <ChevronRight className="size-4" />
            </Link>
          </div>

          <div
            className="flex flex-col overflow-hidden p-5 sm:p-6"
            style={{
              borderRadius: "20px",
              background: "rgba(42, 17, 69, 0.7)",
              border: "1px solid rgba(155, 45, 214, 0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="rounded-2xl p-3" style={{ background: "rgba(155, 45, 214, 0.15)", border: "1px solid rgba(155, 45, 214, 0.3)" }}>
                <ChartNoAxesCombined className="size-6" style={{ color: "#c46fe8" }} />
              </div>
              <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: "rgba(155, 45, 214, 0.12)", border: "1px solid rgba(155, 45, 214, 0.25)", color: "#c46fe8" }}>
                Builder
              </span>
            </div>
            <div className="mt-6 flex-1">
              <h2 className="text-xl font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>自由グラフ作成</h2>
              <p className="mt-2 text-sm leading-6" style={{ color: "#b09fc8" }}>
                条件を選びながら、気になる組み合わせの結果を自分で見つけられます。
              </p>
            </div>
            <Link
              href="/data-graphs/custom"
              className="mt-6 flex h-12 w-full items-center justify-between rounded-2xl px-5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "rgba(155, 45, 214, 0.12)", border: "1px solid rgba(155, 45, 214, 0.3)", color: "#f0e6ff" }}
            >
              自由グラフを開く
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

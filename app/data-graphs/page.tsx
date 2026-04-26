import Link from "next/link";
import { BarChart3, ChartNoAxesCombined, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DataGraphsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
        <div className="mb-5 max-w-3xl rounded-[2rem] border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-6">
          <p className="text-sm font-medium text-slate-600">データグラフ</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            気になる傾向をグラフで比べる
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            基礎の見やすいグラフを見ることも、条件を自由に組み合わせて深掘りすることもできます。
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="rounded-[2rem] border-slate-200 bg-white shadow-sm">
            <CardContent className="flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <BarChart3 className="size-6" />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Preset
                </span>
              </div>

              <div className="mt-6 flex-1">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  基礎グラフ
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  年齢、ステータス、男女差など、見たい切り口をすぐ確認できるグラフをまとめています。
                </p>
              </div>

              <Button asChild className="mt-6 h-12 w-full justify-between rounded-2xl">
                <Link href="/data-graphs/charts">
                  基礎グラフを見る
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-slate-200 bg-white shadow-sm">
            <CardContent className="flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                  <ChartNoAxesCombined className="size-6" />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Builder
                </span>
              </div>

              <div className="mt-6 flex-1">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  自由グラフ作成
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  条件を選びながら、気になる組み合わせの結果を自分で見つけられます。
                </p>
              </div>

              <Button asChild variant="outline" className="mt-6 h-12 w-full justify-between rounded-2xl">
                <Link href="/data-graphs/custom">
                  自由グラフを開く
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

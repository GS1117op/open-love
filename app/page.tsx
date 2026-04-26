import Link from "next/link";
import { ArrowRight, BarChart3, FilePenLine, LayoutGrid } from "lucide-react";
import { HomeGraphTeasers } from "@/components/home/home-graph-teasers";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-10">
          <p className="mb-3 text-sm font-medium text-slate-600">
            匿名で集まる、恋愛・結婚・セックスのデータベース
          </p>

          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            恋愛・結婚・セックスのリアルを、
            <br className="hidden sm:block" />
            匿名データで見える化する
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            OpenLoveは、恋愛・結婚・セックスに関する匿名データを投稿し、
            <br className="hidden sm:block" />
            みんなのプライベートをのぞき見しやすくするためのサービスです。
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-2xl px-5 text-sm">
              <Link href="/submit">
                匿名で投稿する
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-2xl px-5 text-sm">
              <Link href="/posts">
                投稿一覧を見る
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3">
          <Card className="overflow-hidden rounded-[2rem] border-slate-200 bg-linear-to-br from-white to-slate-100 shadow-sm">
            <CardContent className="flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-slate-900 p-3 text-white">
                  <FilePenLine className="size-5" />
                </div>
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                  Submit
                </span>
              </div>
              <div className="mt-8 flex-1">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Anonymous
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                  匿名で投稿
                </h2>
                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="h-2 w-20 rounded-full bg-slate-200" />
                  <div className="mt-3 space-y-2">
                    <div className="h-2 rounded-full bg-slate-100" />
                    <div className="h-2 w-4/5 rounded-full bg-slate-100" />
                    <div className="h-2 w-3/5 rounded-full bg-slate-100" />
                  </div>
                </div>
              </div>
              <Button asChild className="mt-6 h-12 w-full justify-between rounded-2xl">
                <Link href="/submit">
                  匿名で投稿する
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[2rem] border-slate-200 bg-linear-to-br from-white via-sky-50 to-slate-100 shadow-sm">
            <CardContent className="flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                  <LayoutGrid className="size-5" />
                </div>
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                  Browse
                </span>
              </div>
              <div className="mt-8 flex-1">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Cards
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                  投稿一覧
                </h2>
                <div className="mt-5 grid gap-2">
                  <div className="rounded-2xl border border-sky-100 bg-white p-3 shadow-sm">
                    <div className="h-2 w-24 rounded-full bg-slate-200" />
                    <div className="mt-3 h-2 w-full rounded-full bg-slate-100" />
                    <div className="mt-2 h-2 w-2/3 rounded-full bg-slate-100" />
                  </div>
                  <div className="rounded-2xl border border-sky-100 bg-white p-3 shadow-sm">
                    <div className="h-2 w-16 rounded-full bg-slate-200" />
                    <div className="mt-3 h-2 w-5/6 rounded-full bg-slate-100" />
                    <div className="mt-2 h-2 w-3/5 rounded-full bg-slate-100" />
                  </div>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="mt-6 h-12 w-full justify-between rounded-2xl border-sky-200 bg-white"
              >
                <Link href="/posts">
                  投稿一覧を見る
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[2rem] border-slate-200 bg-linear-to-br from-white via-emerald-50 to-slate-100 shadow-sm">
            <CardContent className="flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <BarChart3 className="size-5" />
                </div>
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                  Analyze
                </span>
              </div>
              <div className="mt-8 flex-1">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Trends
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                  データグラフ
                </h2>
                <div className="mt-5 flex h-28 items-end gap-2 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                  <div className="w-full rounded-t-xl bg-emerald-200" style={{ height: "35%" }} />
                  <div className="w-full rounded-t-xl bg-emerald-300" style={{ height: "58%" }} />
                  <div className="w-full rounded-t-xl bg-emerald-400" style={{ height: "74%" }} />
                  <div className="w-full rounded-t-xl bg-emerald-500" style={{ height: "52%" }} />
                </div>
              </div>
              <div className="mt-6 grid gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="h-12 justify-between rounded-2xl border-emerald-200 bg-white text-emerald-800 shadow-sm hover:border-emerald-300 hover:bg-emerald-50"
                >
                  <Link href="/data-graphs/charts">
                    基礎グラフ
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="h-12 justify-between rounded-2xl bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                >
                  <Link href="/data-graphs/custom">
                    自由グラフを見る
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <HomeGraphTeasers />
      </main>
    </div>
  );
}

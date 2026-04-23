import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium text-slate-600">
            匿名で集まる、恋愛・結婚・家族のデータベース
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            恋愛や家族のリアルを、
            <br className="hidden sm:block" />
            匿名データで見える化する
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            OpenLoveは、恋愛・結婚・家族に関する匿名データを投稿し、
            一覧で見たり、あとから集計しやすくするためのサービスです。
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/submit">匿名で投稿する</Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/posts">投稿一覧を見る</Link>
            </Button>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3">
          <Card className="border-slate-200 bg-white">
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold">匿名で投稿</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                名前なしで、恋愛・結婚・家族に関するデータを投稿できます。
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold">一覧で見やすい</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                投稿はカード形式で整理して表示し、見やすく確認できます。
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold">あとで集計しやすい</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                MVPではまず保存と一覧化に集中し、あとから分析機能を追加できます。
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
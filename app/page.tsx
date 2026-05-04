import Link from "next/link";
import { ArrowRight, BarChart3, FilePenLine, LayoutGrid } from "lucide-react";
import { HomeGraphTeasers } from "@/components/home/home-graph-teasers";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
        {/* Hero */}
        <section
          className="fade-in-up overflow-hidden px-5 py-8 sm:px-8 sm:py-12"
          style={{
            background: "rgba(42, 17, 69, 0.7)",
            border: "1px solid rgba(255, 77, 141, 0.2)",
            borderRadius: "24px",
            backdropFilter: "blur(12px)",
          }}
        >
          <p
            className="mb-3 text-sm font-medium"
            style={{ color: "#ff4d8d" }}
          >
            匿名で集まる、恋愛・結婚・セックスのデータベース
          </p>

          <h1
            className="max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-5xl"
            style={{ color: "#f0e6ff" }}
          >
            恋愛・結婚・セックスのリアルを、
            <br className="hidden sm:block" />
            <span
              style={{
                background: "linear-gradient(135deg, #ff4d8d, #9b2dd6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              匿名データ
            </span>
            で見える化する
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 sm:text-base" style={{ color: "#b09fc8" }}>
            OpenLoveは、恋愛・結婚・セックスに関する匿名データを投稿し、
            <br className="hidden sm:block" />
            みんなのプライベートをのぞき見しやすくするためのサービスです。
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/submit"
              className="btn-gradient flex h-12 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-semibold"
            >
              匿名で投稿する
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/posts"
              className="flex h-12 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "rgba(255, 77, 141, 0.08)",
                border: "1px solid rgba(255, 77, 141, 0.3)",
                color: "#f0e6ff",
              }}
            >
              投稿一覧を見る
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* Feature cards */}
        <section className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3">
          {/* Submit */}
          <div
            className="fade-in-up-1 flex flex-col overflow-hidden p-5 sm:p-6"
            style={{
              background: "rgba(42, 17, 69, 0.7)",
              border: "1px solid rgba(255, 77, 141, 0.2)",
              borderRadius: "20px",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="rounded-2xl p-3"
                style={{
                  background: "linear-gradient(135deg, #ff4d8d, #9b2dd6)",
                  boxShadow: "0 4px 16px rgba(255, 77, 141, 0.3)",
                }}
              >
                <FilePenLine className="size-5 text-white" />
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: "rgba(255, 77, 141, 0.12)",
                  border: "1px solid rgba(255, 77, 141, 0.25)",
                  color: "#ff4d8d",
                }}
              >
                Submit
              </span>
            </div>
            <div className="mt-8 flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: "#b09fc8" }}>
                Anonymous
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
                匿名で投稿
              </h2>
              <div
                className="mt-5 p-4"
                style={{
                  borderRadius: "16px",
                  background: "rgba(26, 10, 46, 0.6)",
                  border: "1px solid rgba(255, 77, 141, 0.12)",
                }}
              >
                <div className="h-2 w-20 rounded-full" style={{ background: "rgba(255, 77, 141, 0.3)" }} />
                <div className="mt-3 space-y-2">
                  <div className="h-2 rounded-full" style={{ background: "rgba(255, 255, 255, 0.07)" }} />
                  <div className="h-2 w-4/5 rounded-full" style={{ background: "rgba(255, 255, 255, 0.07)" }} />
                  <div className="h-2 w-3/5 rounded-full" style={{ background: "rgba(255, 255, 255, 0.07)" }} />
                </div>
              </div>
            </div>
            <Link
              href="/submit"
              className="btn-gradient mt-6 flex h-12 w-full items-center justify-between rounded-2xl px-5 text-sm font-semibold"
            >
              匿名で投稿する
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Browse */}
          <div
            className="fade-in-up-2 flex flex-col overflow-hidden p-5 sm:p-6"
            style={{
              background: "rgba(42, 17, 69, 0.7)",
              border: "1px solid rgba(155, 45, 214, 0.25)",
              borderRadius: "20px",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="rounded-2xl p-3"
                style={{
                  background: "rgba(155, 45, 214, 0.25)",
                  border: "1px solid rgba(155, 45, 214, 0.4)",
                }}
              >
                <LayoutGrid className="size-5" style={{ color: "#c46fe8" }} />
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: "rgba(155, 45, 214, 0.12)",
                  border: "1px solid rgba(155, 45, 214, 0.25)",
                  color: "#c46fe8",
                }}
              >
                Browse
              </span>
            </div>
            <div className="mt-8 flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: "#b09fc8" }}>
                Cards
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
                投稿一覧
              </h2>
              <div className="mt-5 grid gap-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="p-3"
                    style={{
                      borderRadius: "14px",
                      background: "rgba(26, 10, 46, 0.6)",
                      border: "1px solid rgba(155, 45, 214, 0.15)",
                    }}
                  >
                    <div className="h-2 w-24 rounded-full" style={{ background: "rgba(155, 45, 214, 0.3)" }} />
                    <div className="mt-3 h-2 w-full rounded-full" style={{ background: "rgba(255, 255, 255, 0.07)" }} />
                    <div className="mt-2 h-2 w-2/3 rounded-full" style={{ background: "rgba(255, 255, 255, 0.07)" }} />
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/posts"
              className="mt-6 flex h-12 w-full items-center justify-between rounded-2xl px-5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "rgba(155, 45, 214, 0.12)",
                border: "1px solid rgba(155, 45, 214, 0.3)",
                color: "#f0e6ff",
              }}
            >
              投稿一覧を見る
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Data graphs */}
          <div
            className="fade-in-up-3 flex flex-col overflow-hidden p-5 sm:p-6"
            style={{
              background: "rgba(42, 17, 69, 0.7)",
              border: "1px solid rgba(255, 77, 141, 0.15)",
              borderRadius: "20px",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="rounded-2xl p-3"
                style={{
                  background: "rgba(255, 77, 141, 0.15)",
                  border: "1px solid rgba(255, 77, 141, 0.3)",
                }}
              >
                <BarChart3 className="size-5" style={{ color: "#ff8cc8" }} />
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: "rgba(255, 77, 141, 0.12)",
                  border: "1px solid rgba(255, 77, 141, 0.2)",
                  color: "#ff8cc8",
                }}
              >
                Analyze
              </span>
            </div>
            <div className="mt-8 flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: "#b09fc8" }}>
                Trends
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
                データグラフ
              </h2>
              <div
                className="mt-5 flex h-28 items-end gap-2 p-4"
                style={{
                  borderRadius: "14px",
                  background: "rgba(26, 10, 46, 0.6)",
                  border: "1px solid rgba(255, 77, 141, 0.12)",
                }}
              >
                {[35, 58, 74, 52].map((h, i) => (
                  <div
                    key={i}
                    className="w-full rounded-t-xl"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(180deg, #ff4d8d ${i % 2 === 0 ? "0%" : "30%"}, #9b2dd6 100%)`,
                      opacity: 0.7 + i * 0.08,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-2">
              <Link
                href="/data-graphs/charts"
                className="flex h-12 items-center justify-between rounded-2xl px-5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255, 77, 141, 0.08)",
                  border: "1px solid rgba(255, 77, 141, 0.25)",
                  color: "#f0e6ff",
                }}
              >
                基礎グラフ
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/data-graphs/custom"
                className="btn-gradient flex h-12 items-center justify-between rounded-2xl px-5 text-sm font-semibold"
              >
                自由グラフを見る
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <HomeGraphTeasers />
      </main>
    </div>
  );
}

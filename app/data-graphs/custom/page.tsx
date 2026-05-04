import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { CustomPostGraphsDashboard } from "@/components/posts/custom-post-graphs-dashboard";

export default function DataGraphsCustomPage() {
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
          <Link
            href="/data-graphs"
            className="inline-flex items-center gap-1 text-sm font-medium transition"
            style={{ color: "#b09fc8" }}
          >
            <ChevronLeft className="size-4" />
            データグラフへ戻る
          </Link>
          <p className="mt-4 text-sm font-medium" style={{ color: "#ff4d8d" }}>自由グラフ作成</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "#f0e6ff" }}>
            条件を組み合わせて深掘りする
          </h1>
          <p className="mt-2 text-sm leading-6 sm:text-base" style={{ color: "#b09fc8" }}>
            気になる条件を選びながら、グラフを作れます。
          </p>
        </div>

        <CustomPostGraphsDashboard />
      </main>
    </div>
  );
}

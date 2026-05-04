import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { PostList } from "@/components/posts/post-list";

export default function PostsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
        <div
          className="mb-5 px-5 py-6 sm:px-6"
          style={{
            borderRadius: "24px",
            background: "rgba(42, 17, 69, 0.7)",
            border: "1px solid rgba(255, 77, 141, 0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          <p className="text-sm font-medium" style={{ color: "#ff4d8d" }}>投稿一覧ページ</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "#f0e6ff" }}>
            みんなの投稿を見てみる
          </h1>
          <p className="mt-3 text-sm leading-7 sm:text-base" style={{ color: "#b09fc8" }}>
            気になる条件でしぼり込みながら、最近の投稿をチェックできます。
          </p>
        </div>

        <Suspense fallback={<p className="text-sm" style={{ color: "#b09fc8" }}>読み込み中...</p>}>
          <PostList />
        </Suspense>
      </main>
    </div>
  );
}

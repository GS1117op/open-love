import { Suspense } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { PostList } from "@/components/posts/post-list";

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
        <div className="mb-5 rounded-[2rem] border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-6">
          <p className="text-sm font-medium text-slate-600">投稿一覧ページ</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            みんなの投稿を見てみる
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            気になる条件でしぼり込みながら、最近の投稿をチェックできます。
          </p>
        </div>

        <Suspense fallback={<p className="text-sm text-slate-500">読み込み中...</p>}>
          <PostList />
        </Suspense>
      </main>
    </div>
  );
}

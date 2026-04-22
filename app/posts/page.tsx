import { SiteHeader } from "@/components/layout/site-header";
import { PostList } from "@/components/posts/post-list";

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-600">投稿一覧ページ</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            投稿データを見る
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            カテゴリや年代で、投稿データを簡単に絞り込めます。
          </p>
        </div>

        <PostList />
      </main>
    </div>
  );
}
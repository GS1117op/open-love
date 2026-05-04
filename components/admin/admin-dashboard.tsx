import Link from "next/link";
import { logoutAdmin } from "@/app/admin/actions";
import { formatDateLabel, type AdminDashboardData } from "@/lib/admin-dashboard";

const cardStyle = { background: "rgba(42,17,69,0.75)", borderColor: "rgba(255,77,141,0.2)" } as React.CSSProperties;
const rowStyle = { background: "rgba(26,10,46,0.6)", borderColor: "rgba(255,77,141,0.15)" } as React.CSSProperties;

export function AdminDashboard({ data }: { data: AdminDashboardData }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <div>
          <p className="text-sm font-medium" style={{ color: "#b09fc8" }}>OpenLove Admin</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
            管理ダッシュボード
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-full border px-4 py-2 text-sm font-medium transition hover:opacity-80"
            style={{ borderColor: "rgba(255,77,141,0.25)", background: "rgba(42,17,69,0.6)", color: "#f0e6ff" }}
          >
            サイトへ戻る
          </Link>
          <form action={logoutAdmin}>
            <button type="submit" className="btn-gradient rounded-full px-4 py-2 text-sm font-medium">
              ログアウト
            </button>
          </form>
        </div>
      </div>

      <main className="mx-auto max-w-6xl space-y-6 px-4 pb-10 sm:px-6">
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {data.metrics.map((metric) => (
            <article key={metric.label} className="rounded-2xl border p-5" style={cardStyle}>
              <p className="text-sm font-medium" style={{ color: "#b09fc8" }}>{metric.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-6" style={{ color: "#b09fc8" }}>{metric.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-2xl border p-5" style={cardStyle}>
            <p className="text-sm font-medium" style={{ color: "#b09fc8" }}>投稿データから見える強いテーマ</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
              注目候補
            </h2>
            <p className="mt-2 text-sm leading-6" style={{ color: "#b09fc8" }}>
              訪問者イベントはまだ未計測なので、まずは投稿データから強いテーマ候補を出しています。
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {data.contentHighlights.length > 0 ? (
                data.contentHighlights.map((item) => (
                  <div key={item.label} className="rounded-xl border px-4 py-3" style={rowStyle}>
                    <p className="text-sm font-medium" style={{ color: "#e0d0f0" }}>{item.label}</p>
                    <p className="mt-1 text-xs" style={{ color: "#b09fc8" }}>{item.count}件</p>
                  </div>
                ))
              ) : (
                <p className="text-sm" style={{ color: "#b09fc8" }}>注目候補はまだ取得できていません。</p>
              )}
            </div>
          </article>

          <article className="rounded-2xl border p-5" style={cardStyle}>
            <p className="text-sm font-medium" style={{ color: "#b09fc8" }}>長期拡張メモ</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
              次に足したい管理機能
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6" style={{ color: "#b09fc8" }}>
              <p>会員登録を入れたら、登録者一覧・MAU・メール登録導線の比較をここに追加。</p>
              <p>アクセス解析をつないだら、上位ページ・流入元・滞在傾向をこの画面に集約。</p>
              <p>共有URLコピーや自由グラフ利用も、イベント計測を足せば運営KPI化できます。</p>
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <article className="rounded-2xl border p-5" style={cardStyle}>
            <p className="text-sm font-medium" style={{ color: "#b09fc8" }}>運営ウォッチ</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
              分析・体験品質
            </h2>
            <div className="mt-4 space-y-3">
              {data.analyticsWatch.map((item) => (
                <div key={item.title} className="rounded-xl border px-4 py-3" style={rowStyle}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#f0e6ff" }}>{item.title}</p>
                      <p className="mt-1 text-xs" style={{ color: "#b09fc8" }}>{item.status}</p>
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border px-3 py-1 text-xs font-medium transition hover:opacity-80"
                        style={{ borderColor: "rgba(255,77,141,0.2)", background: "rgba(42,17,69,0.5)", color: "#e0d0f0" }}
                      >
                        開く
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-6" style={{ color: "#b09fc8" }}>{item.note}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border p-5" style={cardStyle}>
            <p className="text-sm font-medium" style={{ color: "#b09fc8" }}>コスト観測</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
              費用発生リスク
            </h2>
            <div className="mt-4 space-y-3">
              {data.costWatch.map((item) => (
                <div key={item.title} className="rounded-xl border px-4 py-3" style={rowStyle}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#f0e6ff" }}>{item.title}</p>
                      <p className="mt-1 text-xs" style={{ color: "#b09fc8" }}>{item.status}</p>
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border px-3 py-1 text-xs font-medium transition hover:opacity-80"
                        style={{ borderColor: "rgba(255,77,141,0.2)", background: "rgba(42,17,69,0.5)", color: "#e0d0f0" }}
                      >
                        開く
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm leading-6" style={{ color: "#b09fc8" }}>{item.note}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <article className="rounded-2xl border p-5 xl:col-span-2" style={cardStyle}>
            <p className="text-sm font-medium" style={{ color: "#b09fc8" }}>直近の回答</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
              最近の投稿
            </h2>
            <div className="mt-4 space-y-3">
              {data.recentPosts.length > 0 ? (
                data.recentPosts.map((post) => (
                  <div key={post.id} className="rounded-xl border px-4 py-3" style={rowStyle}>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="text-sm font-medium" style={{ color: "#f0e6ff" }}>
                        {post.title || "タイトル未設定"}
                      </p>
                      <span className="text-xs" style={{ color: "#b09fc8" }}>
                        {(post.nickname || "匿名") + " / " + (post.gender || "未設定") + " / " + (post.status || "未設定")}
                      </span>
                    </div>
                    <p className="mt-1 text-xs" style={{ color: "#b09fc8" }}>{formatDateLabel(post.created_at)}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm" style={{ color: "#b09fc8" }}>最近の投稿はまだありません。</p>
              )}
            </div>
          </article>

          <article className="rounded-2xl border p-5" style={cardStyle}>
            <p className="text-sm font-medium" style={{ color: "#b09fc8" }}>ユーザー反応</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
              ご意見・登録
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "#b09fc8" }}>
                  Feedback
                </p>
                <div className="mt-2 space-y-2">
                  {data.recentFeedbacks.length > 0 ? (
                    data.recentFeedbacks.map((item, index) => (
                      <div
                        key={`${item.created_at ?? "feedback"}-${index}`}
                        className="rounded-xl border px-3 py-2"
                        style={rowStyle}
                      >
                        <p className="text-sm font-medium" style={{ color: "#f0e6ff" }}>{item.type || "ご意見"}</p>
                        <p className="mt-1 text-xs leading-5" style={{ color: "#b09fc8" }}>{item.content || "内容なし"}</p>
                        <p className="mt-1 text-[11px]" style={{ color: "#8070a0" }}>
                          {formatDateLabel(item.created_at)} {item.contact ? ` / ${item.contact}` : ""}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm" style={{ color: "#b09fc8" }}>取得できるご意見はまだありません。</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "#b09fc8" }}>
                  Subscribers
                </p>
                <div className="mt-2 space-y-2">
                  {data.recentSubscribers.length > 0 ? (
                    data.recentSubscribers.map((item, index) => (
                      <div
                        key={`${item.email ?? "subscriber"}-${index}`}
                        className="rounded-xl border px-3 py-2"
                        style={rowStyle}
                      >
                        <p className="text-sm font-medium" style={{ color: "#f0e6ff" }}>{item.email || "未登録"}</p>
                        <p className="mt-1 text-[11px]" style={{ color: "#b09fc8" }}>
                          {item.source || "source 未設定"} / {formatDateLabel(item.created_at)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm" style={{ color: "#b09fc8" }}>取得できる登録情報はまだありません。</p>
                  )}
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

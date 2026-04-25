import "server-only";

import { getSupabaseAdminClient } from "@/lib/supabase/admin";

type MetricCard = {
  label: string;
  value: string;
  description: string;
};

type TrendItem = {
  label: string;
  count: number;
};

type RecentPost = {
  id: string;
  nickname: string | null;
  title: string | null;
  gender: string | null;
  status: string | null;
  created_at: string;
};

type RecentFeedback = {
  id?: string;
  type: string | null;
  content: string | null;
  contact: string | null;
  created_at?: string | null;
};

type RecentSubscriber = {
  email: string | null;
  source: string | null;
  created_at?: string | null;
};

type WatchItem = {
  title: string;
  status: string;
  note: string;
  href?: string;
};

export type AdminDashboardData = {
  metrics: MetricCard[];
  recentPosts: RecentPost[];
  recentFeedbacks: RecentFeedback[];
  recentSubscribers: RecentSubscriber[];
  contentHighlights: TrendItem[];
  analyticsWatch: WatchItem[];
  costWatch: WatchItem[];
};

function formatDateLabel(dateString: string | null | undefined) {
  if (!dateString) {
    return "日時不明";
  }

  return new Date(dateString).toLocaleString("ja-JP");
}

function maskEmail(email: string | null) {
  if (!email) {
    return "未登録";
  }

  const [localPart, domainPart] = email.split("@");

  if (!localPart || !domainPart) {
    return email;
  }

  const visible = localPart.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(localPart.length - 2, 2))}@${domainPart}`;
}

function buildTopList(values: Array<string | null | undefined>, limit = 4): TrendItem[] {
  const counts = new Map<string, number>();

  for (const value of values) {
    const label = value?.trim() || "未設定";
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, count]) => ({ label, count }));
}

async function getCount(table: string) {
  const supabase = getSupabaseAdminClient();
  const { count, error } = await supabase.from(table).select("*", {
    count: "exact",
    head: true,
  });

  if (error) {
    return null;
  }

  return count ?? 0;
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const supabase = getSupabaseAdminClient();
  const now = Date.now();
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [
    totalPosts,
    totalFeedbacks,
    totalSubscribers,
    postsLast7DaysResult,
    postsLast30DaysResult,
    recentPostsResult,
    recentFeedbacksResult,
    recentSubscribersResult,
    contentSignalsResult,
  ] = await Promise.all([
    getCount("posts"),
    getCount("feedbacks"),
    getCount("subscribers"),
    supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .gte("created_at", sevenDaysAgo),
    supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .gte("created_at", thirtyDaysAgo),
    supabase
      .from("posts")
      .select("id, nickname, title, gender, status, created_at")
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("feedbacks")
      .select("type, content, contact, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("subscribers")
      .select("email, source, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase.from("posts").select("status, prefecture, mbti").limit(300),
  ]);

  const postsTodayCount = (recentPostsResult.data ?? []).filter((post) => {
    const createdAt = new Date(post.created_at).getTime();
    return createdAt >= todayStart.getTime();
  }).length;

  const metrics: MetricCard[] = [
    {
      label: "総投稿数",
      value: totalPosts != null ? `${totalPosts}件` : "取得不可",
      description: "今ある回答データの総数です。",
    },
    {
      label: "直近7日の投稿",
      value:
        postsLast7DaysResult.error == null
          ? `${postsLast7DaysResult.count ?? 0}件`
          : "取得不可",
      description: "投稿ペースが落ちていないかを見るための指標です。",
    },
    {
      label: "今日の投稿",
      value: `${postsTodayCount}件`,
      description: "短期の動き確認用です。",
    },
    {
      label: "メルマガ登録",
      value: totalSubscribers != null ? `${totalSubscribers}件` : "取得不可",
      description: "登録導線がどの程度動いているかの目安です。",
    },
    {
      label: "ご意見・要望",
      value: totalFeedbacks != null ? `${totalFeedbacks}件` : "取得不可",
      description: "改善リクエストの蓄積状況です。",
    },
    {
      label: "直近30日の投稿",
      value:
        postsLast30DaysResult.error == null
          ? `${postsLast30DaysResult.count ?? 0}件`
          : "取得不可",
      description: "中期の伸びを把握するための指標です。",
    },
  ];

  const contentHighlights = contentSignalsResult.error
    ? []
    : [
        ...buildTopList(
          (contentSignalsResult.data ?? []).map((item) => `ステータス: ${item.status ?? "未設定"}`),
          2
        ),
        ...buildTopList(
          (contentSignalsResult.data ?? []).map(
            (item) => `都道府県: ${item.prefecture ?? "未設定"}`
          ),
          1
        ),
        ...buildTopList(
          (contentSignalsResult.data ?? []).map((item) => `MBTI: ${item.mbti ?? "未設定"}`),
          1
        ),
      ];

  const analyticsWatch: WatchItem[] = [
    {
      title: "アクセス数 / 人気ページ",
      status: "外部計測が必要",
      note: "Vercel Web Analytics を有効にすると、訪問者数・PV・上位ページを見られます。",
      href: process.env.ADMIN_VERCEL_ANALYTICS_URL,
    },
    {
      title: "滞在時間 / 離脱傾向",
      status: "外部計測が必要",
      note: "まずは Vercel Web Analytics の bounce rate と人気ページ確認がおすすめです。",
      href: process.env.ADMIN_VERCEL_ANALYTICS_URL,
    },
    {
      title: "速度 / 体験品質",
      status: "外部計測が必要",
      note: "Vercel Speed Insights で Core Web Vitals を見るのが相性良いです。",
      href: process.env.ADMIN_SPEED_INSIGHTS_URL,
    },
  ];

  const costWatch: WatchItem[] = [
    {
      title: "Supabase Egress",
      status: "定期確認推奨",
      note: "投稿一覧やグラフ表示で増えやすいので、Usage の Egress を定点観測してください。",
      href: process.env.ADMIN_SUPABASE_USAGE_URL,
    },
    {
      title: "Database Size",
      status: "定期確認推奨",
      note: `現在の内部データ件数は 投稿 ${totalPosts ?? "-"} / ご意見 ${totalFeedbacks ?? "-"} / 登録 ${totalSubscribers ?? "-"}`,
      href: process.env.ADMIN_SUPABASE_USAGE_URL,
    },
    {
      title: "会員管理",
      status: "未実装",
      note: "会員登録機能を入れたら、ここに登録者一覧・MAU 監視を追加する想定です。",
    },
  ];

  return {
    metrics,
    recentPosts: (recentPostsResult.data ?? []).map((post) => ({
      ...post,
      title: post.title ?? "タイトル未設定",
    })),
    recentFeedbacks: (recentFeedbacksResult.data ?? []).map((item) => ({
      ...item,
      content: item.content?.slice(0, 90) ?? "",
    })),
    recentSubscribers: (recentSubscribersResult.data ?? []).map((item) => ({
      ...item,
      email: maskEmail(item.email),
    })),
    contentHighlights,
    analyticsWatch,
    costWatch,
  };
}

export { formatDateLabel };

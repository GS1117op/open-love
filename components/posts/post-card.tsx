import { Card, CardContent } from "@/components/ui/card";

type PostCardProps = {
  nickname?: string | null;
  category: string;
  ageRange: string;
  gender: string;
  status: string;
  title: string;
  content: string;
  createdAt?: string;
};

export function PostCard({
  nickname,
  category,
  ageRange,
  gender,
  status,
  title,
  content,
  createdAt,
}: PostCardProps) {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const displayName = nickname?.trim() ? nickname : "匿名ユーザー";

  return (
    <Card className="border-slate-200 bg-white">
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-800">{displayName}</p>
          {formattedDate ? (
            <p className="text-xs text-slate-500">投稿日: {formattedDate}</p>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
          <span className="rounded-full bg-slate-100 px-2 py-1">{category}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1">{ageRange}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1">{gender}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1">{status}</span>
        </div>

        <h2 className="mt-4 text-lg font-semibold tracking-tight">{title}</h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">{content}</p>
      </CardContent>
    </Card>
  );
}
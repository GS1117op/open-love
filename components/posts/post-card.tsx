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

  experienceCount?: number | null;
  sexFrequency?: number | null;
  childrenCount?: number | null;
  education?: string | null;
  incomeRange?: string | null;
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
  experienceCount,
  sexFrequency,
  childrenCount,
  education,
  incomeRange,
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

  const detailItems = [
    {
      label: "経験人数",
      value:
        experienceCount !== null && experienceCount !== undefined
          ? `${experienceCount}人`
          : null,
    },
    {
      label: "週の頻度",
      value:
        sexFrequency !== null && sexFrequency !== undefined
          ? `${sexFrequency}回`
          : null,
    },
    {
      label: "子供の人数",
      value:
        childrenCount !== null && childrenCount !== undefined
          ? `${childrenCount}人`
          : null,
    },
    {
      label: "学歴",
      value: education?.trim() ? education : null,
    },
    {
      label: "年収帯",
      value: incomeRange?.trim() ? incomeRange : null,
    },
  ].filter((item) => item.value);

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

        {detailItems.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-4 sm:grid-cols-3">
            {detailItems.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="text-sm font-medium text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>
        ) : null}

        <p className="mt-4 text-sm leading-7 text-slate-600">{content}</p>
      </CardContent>
    </Card>
  );
}
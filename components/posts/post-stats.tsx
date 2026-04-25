import { Card, CardContent } from "@/components/ui/card";

type PostStatsProps = {
  totalCount: number;
  averageExperienceCount: number | null;
  averageSexFrequency: number | null;
  averageChildrenCount?: number | null;
};

function formatAverage(value: number | null) {
  if (value === null || Number.isNaN(value)) {
    return "-";
  }

  return value.toFixed(1);
}

export function PostStats({
  totalCount,
  averageExperienceCount,
  averageSexFrequency,
  averageChildrenCount,
}: PostStatsProps) {
  const stats = [
    {
      label: "投稿数",
      value: `${totalCount}件`,
    },
    {
      label: "平均経験人数",
      value: averageExperienceCount !== null ? `${formatAverage(averageExperienceCount)}人` : "-",
    },
    {
      label: "平均セックス頻度",
      value: averageSexFrequency !== null ? `${formatAverage(averageSexFrequency)}回` : "-",
    },
    ...(averageChildrenCount !== undefined
      ? [
          {
            label: "平均子ども希望",
            value: averageChildrenCount !== null ? formatAverage(averageChildrenCount) : "-",
          },
        ]
      : []),
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-slate-200 bg-white">
          <CardContent className="p-3">
            <p className="text-[11px] text-slate-500">{stat.label}</p>
            <p className="mt-1.5 text-lg font-semibold tracking-tight text-slate-900">
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

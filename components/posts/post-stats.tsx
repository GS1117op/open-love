import { Card, CardContent } from "@/components/ui/card";

type PostStatsProps = {
  totalCount: number;
  averageExperienceCount: number | null;
  averageSexFrequency: number | null;
  averageChildrenCount: number | null;
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
      label: "投稿件数",
      value: `${totalCount}件`,
    },
    {
      label: "平均経験人数",
      value:
        averageExperienceCount !== null
          ? `${formatAverage(averageExperienceCount)}人`
          : "-",
    },
    {
      label: "平均週頻度",
      value:
        averageSexFrequency !== null
          ? `${formatAverage(averageSexFrequency)}回`
          : "-",
    },
    {
      label: "平均子供人数",
      value:
        averageChildrenCount !== null
          ? `${formatAverage(averageChildrenCount)}人`
          : "-",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-slate-200 bg-white">
          <CardContent className="p-4">
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
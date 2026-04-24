import { Card, CardContent } from "@/components/ui/card";
import { AvatarIllustration } from "@/components/ui/avatar-illustrations";

type PostCardProps = {
  nickname?: string | null;

  mbti?: string | null;
  age?: number | null;
  prefecture?: string | null;

  gender: string;
  status: string;
  title: string;
  content: string;
  createdAt?: string;

  height?: number | null;
  weight?: number | null;
  education?: string | null;
  income?: number | null;

  avatarId?: string | null;
  cupSize?: string | null;
  penisLength?: number | null;

  experienceCount?: number | null;
  sexFrequency?: number | null;
  childrenCount?: number | null;

  /* ▼追加 */
  cohabitationLevel?: number | null;
  datingAppLevel?: number | null;
  noCondomLevel?: number | null;
  creampieLevel?: number | null;
  cheatingLevel?: number | null;
  cheatedLevel?: number | null;
};

const experienceOptions = {
  cohabitation: [
    "全くない",
    "少しある（短期間）",
    "ある（数ヶ月程度）",
    "長期間ある（1年以上）",
    "現在同棲中",
  ],
  datingApp: [
    "全く使ったことがない",
    "少し使ったことがある",
    "何度か使ったことがある",
    "頻繁に使っている",
    "現在もメインで使っている",
  ],
  noCondom: [
    "一度もない",
    "1〜2回だけある",
    "何度かある",
    "よくある",
    "ほぼ毎回",
  ],
  creampie: [
    "一度もない",
    "1〜2回だけある",
    "何度かある",
    "よくある",
    "ほぼ毎回",
  ],
  cheating: [
    "一度もない",
    "過去に1回だけある",
    "何度かある",
    "複数人である",
    "継続的にしている",
  ],
  cheated: [
    "一度もない",
    "過去に1回だけある",
    "何度かある",
    "複数の相手にされたことがある",
    "頻繁に経験している",
  ],
};

export function PostCard({
  nickname,
  mbti,
  age,
  prefecture,
  gender,
  status,
  title,
  content,
  createdAt,
  avatarId,
  height,
  weight,
  education,
  income,
  cupSize,
  penisLength,
  experienceCount,
  sexFrequency,
  childrenCount,

  cohabitationLevel,
  datingAppLevel,
  noCondomLevel,
  creampieLevel,
  cheatingLevel,
  cheatedLevel,
}: PostCardProps) {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString("ja-JP")
    : null;

  const displayName = nickname?.trim() ? nickname : "匿名ユーザー";

  const basicItems = [
    { label: "年齢", value: age != null ? `${age}歳` : null },
    { label: "居住エリア", value: prefecture || null },
    { label: "MBTI", value: mbti || null },
    { label: "身長", value: height != null ? `${height}cm` : null },
    { label: "体重", value: weight != null ? `${weight}kg` : null },
    { label: "学歴", value: education || null },
    { label: "年収", value: income != null ? `${income}万円台` : null },
    { label: "カップ数", value: cupSize || null },
    { label: "チンコの長さ", value: penisLength != null ? `${penisLength}cm` : null },
  ].filter((item) => item.value);

  const detailItems = [
    { label: "経験人数", value: experienceCount != null ? `${experienceCount}人` : null },
    { label: "週の頻度", value: sexFrequency != null ? `${sexFrequency}回` : null },
    { label: "子供の人数", value: childrenCount != null ? `${childrenCount}人` : null },
  ].filter((item) => item.value);

  const experienceItems = [
    {
      label: "同棲経験",
      value:
        cohabitationLevel != null
          ? experienceOptions.cohabitation[cohabitationLevel - 1]
          : null,
    },
    {
      label: "マチアプ経験",
      value:
        datingAppLevel != null
          ? experienceOptions.datingApp[datingAppLevel - 1]
          : null,
    },
    {
      label: "ゴムなし",
      value:
        noCondomLevel != null
          ? experienceOptions.noCondom[noCondomLevel - 1]
          : null,
    },
    {
      label: "中出し",
      value:
        creampieLevel != null
          ? experienceOptions.creampie[creampieLevel - 1]
          : null,
    },
    {
      label: "浮気経験",
      value:
        cheatingLevel != null
          ? experienceOptions.cheating[cheatingLevel - 1]
          : null,
    },
    {
      label: "浮気された",
      value:
        cheatedLevel != null
          ? experienceOptions.cheated[cheatedLevel - 1]
          : null,
    },
  ].filter((item) => item.value);

  return (
    <Card className="border-slate-200 bg-white">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {avatarId ? (
              <AvatarIllustration id={avatarId} size={40} />
            ) : (
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-sm">
                {displayName[0]}
              </div>
            )}
            <p className="font-semibold">{displayName}</p>
          </div>
          {formattedDate && <p className="text-xs">{formattedDate}</p>}
        </div>

        <div className="mt-2 flex gap-2 text-xs">
          <span>{gender}</span>
          <span>{status}</span>
        </div>

        <h2 className="mt-3 font-semibold">{title}</h2>

        {basicItems.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {basicItems.map((item) => (
              <div key={item.label}>
                <p className="text-xs">{item.label}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {detailItems.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {detailItems.map((item) => (
              <div key={item.label}>
                <p className="text-xs">{item.label}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {experienceItems.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2 bg-blue-50 p-3 rounded">
            {experienceItems.map((item) => (
              <div key={item.label}>
                <p className="text-xs">{item.label}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-3 text-sm">{content}</p>
      </CardContent>
    </Card>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AvatarIllustration,
  avatarLabels,
  FEMALE_AVATAR_IDS,
  MALE_AVATAR_IDS,
  ALL_AVATAR_IDS,
  type AvatarId,
} from "@/components/ui/avatar-illustrations";

const mbtiOptions = [
  "INTJ（建築家）",
  "INTP（論理学者）",
  "ENTJ（指揮官）",
  "ENTP（討論者）",
  "INFJ（提唱者）",
  "INFP（仲介者）",
  "ENFJ（主人公）",
  "ENFP（運動家）",
  "ISTJ（管理者）",
  "ISFJ（擁護者）",
  "ESTJ（幹部）",
  "ESFJ（領事）",
  "ISTP（巨匠）",
  "ISFP（冒険家）",
  "ESTP（起業家）",
  "ESFP（エンターテイナー）",
];

const ageOptions: { label: string; value: number }[] = [
  ...Array.from({ length: 9 }, (_, i) => {
    const v = 15 + i * 5;
    return { label: `${v}歳`, value: v };
  }),
  { label: "60歳以上", value: 60 },
];

const heightOptions: { label: string; value: number }[] = [
  ...Array.from({ length: 13 }, (_, i) => {
    const v = 135 + i * 5;
    return { label: `${v}cm`, value: v };
  }),
  { label: "200cm以上", value: 200 },
];

const weightOptions: { label: string; value: number }[] = [
  ...Array.from({ length: 15 }, (_, i) => {
    const v = 25 + i * 5;
    return { label: `${v}kg`, value: v };
  }),
  { label: "100kg以上", value: 100 },
];

const penisLengthOptions: { label: string; value: number }[] = [
  ...Array.from({ length: 9 }, (_, i) => {
    const v = (i + 1) * 2;
    return { label: `${v}cm`, value: v };
  }),
  { label: "20cm以上", value: 20 },
];

const incomeOptions: { label: string; value: number }[] = [
  ...Array.from({ length: 19 }, (_, i) => {
    const v = (i + 1) * 100;
    return { label: `${v}万円台`, value: v };
  }),
  { label: "2000万円以上", value: 2000 },
];

const educationOptions = [
  "東京一工（東大・京大・一橋・東工大）",
  "旧帝大（北大・東北大・名古屋大・阪大・九大）",
  "早慶（早稲田・慶應）",
  "上智・東京理科大・ICU",
  "MARCH・関関同立",
  "日東駒専・産近甲龍",
  "その他4年制大学",
  "短大・専門学校",
  "高卒",
  "中卒",
];

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

const ratingOptions = {
  marriageIntent: [
    "全く結婚したくない",
    "あまり結婚したくない",
    "どちらともいえない",
    "できれば結婚したい",
    "強く結婚したい",
  ],
  housewifePreference: [
    "全く希望しない",
    "あまり希望しない",
    "どちらともいえない",
    "できれば希望する",
    "強く希望する",
  ],
  desiredChildren: [
    "子供は欲しくない",
    "できれば欲しくない",
    "どちらともいえない",
    "できれば欲しい",
    "強く欲しい",
  ],
  cheatingDefinition: [
    "肉体関係から",
    "キスから",
    "手をつなぐ・密着から",
    "2人きりで会うから",
    "連絡を取り合う時点で",
  ],
  cheatingDesire: [
    "全くない",
    "ほとんどない",
    "少しある",
    "かなりある",
    "強くある",
  ],
  reactionToCheating: [
    "許す",
    "話し合って考える",
    "条件次第で別れる",
    "基本的に別れる",
    "絶対に別れる",
  ],
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

function FormSection({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`space-y-4 rounded-[1.5rem] border p-4 sm:p-5 ${className ?? "border-slate-200 bg-slate-50/60"}`}>
      <div>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        ) : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function RatingSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">未選択</option>
        {options.map((option, index) => (
          <option key={option} value={index + 1}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PostForm() {
  const [nickname, setNickname] = useState("");

  const [mbti, setMbti] = useState("");
  const [age, setAge] = useState("");
  const [prefecture, setPrefecture] = useState("");

  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const [firstExperienceAge, setFirstExperienceAge] = useState("");
  const [relationshipCount, setRelationshipCount] = useState("");
  const [experienceCount, setExperienceCount] = useState("");
  const [sexFrequency, setSexFrequency] = useState("");
  const [idealSexFrequency, setIdealSexFrequency] = useState("");
  const [masturbationFrequency, setMasturbationFrequency] = useState("");
  const [sexDuration, setSexDuration] = useState("");
  const [idealSexDuration, setIdealSexDuration] = useState("");
  const [sexSatisfaction, setSexSatisfaction] = useState("");
  const [sexSatisfactionNote, setSexSatisfactionNote] = useState("");

  const [marriageIntent, setMarriageIntent] = useState("");
  const [housewifePreference, setHousewifePreference] = useState("");
  const [desiredChildren, setDesiredChildren] = useState("");
  const [cheatingDefinition, setCheatingDefinition] = useState("");
  const [cheatingDesire, setCheatingDesire] = useState("");
  const [reactionToCheating, setReactionToCheating] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [cupSize, setCupSize] = useState("");
  const [penisLength, setPenisLength] = useState("");

  const [avatarId, setAvatarId] = useState<AvatarId | "">("");

  const [education, setEducation] = useState("");
  const [income, setIncome] = useState("");
  const [occupation, setOccupation] = useState("");

  const [cohabitationExperience, setCohabitationExperience] = useState("");
  const [datingAppExperience, setDatingAppExperience] = useState("");
  const [meetingMethod, setMeetingMethod] = useState("");

  const [cohabitationLevel, setCohabitationLevel] = useState("");
const [datingAppLevel, setDatingAppLevel] = useState("");
const [noCondomLevel, setNoCondomLevel] = useState("");
const [creampieLevel, setCreampieLevel] = useState("");
const [cheatingLevel, setCheatingLevel] = useState("");
const [cheatedLevel, setCheatedLevel] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!supabase) {
      setMessage("Supabase の設定が見つかりません。");
      return;
    }

    if (!title.trim() || !content.trim()) {
      setMessage("タイトルと内容は必須です。");
      return;
    }

    if (!email.trim()) {
      setMessage("メールアドレスは必須です。");
      return;
    }

    if (!consent) {
      setMessage("同意チェックが必要です。");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const { error: postError } = await supabase.from("posts").insert({
      nickname: nickname.trim() || null,

      mbti: mbti || null,
      age: age ? Number(age) : null,
      prefecture: prefecture || null,

      gender,
      status,
      title: title.trim(),
      content: content.trim(),

      first_experience_age: firstExperienceAge
        ? Number(firstExperienceAge)
        : null,
      relationship_count: relationshipCount ? Number(relationshipCount) : null,
      experience_count: experienceCount ? Number(experienceCount) : null,
      sex_frequency: sexFrequency ? Number(sexFrequency) : null,
      ideal_sex_frequency: idealSexFrequency
        ? Number(idealSexFrequency)
        : null,
      masturbation_frequency: masturbationFrequency
        ? Number(masturbationFrequency)
        : null,
      sex_duration: sexDuration ? Number(sexDuration) : null,
      ideal_sex_duration: idealSexDuration ? Number(idealSexDuration) : null,
      sex_satisfaction: sexSatisfaction ? Number(sexSatisfaction) : null,
      sex_satisfaction_note: sexSatisfactionNote || null,

      marriage_intent: marriageIntent ? Number(marriageIntent) : null,
      housewife_preference: housewifePreference
        ? Number(housewifePreference)
        : null,
      desired_children: desiredChildren ? Number(desiredChildren) : null,
      cheating_definition: cheatingDefinition
        ? Number(cheatingDefinition)
        : null,
      cheating_desire: cheatingDesire ? Number(cheatingDesire) : null,
      reaction_to_cheating: reactionToCheating
        ? Number(reactionToCheating)
        : null,

      height: height ? Number(height) : null,
      weight: weight ? Number(weight) : null,
      avatar_id: avatarId || null,
      education: education || null,
      income: income ? Number(income) : null,
      occupation: occupation || null,

      cup_size: gender === "女性" ? cupSize || null : null,
      penis_length:
        gender === "男性" && penisLength ? Number(penisLength) : null,

      cohabitation_experience:
  cohabitationExperience === ""
    ? null
    : cohabitationExperience === "true",
dating_app_experience:
  datingAppExperience === "" ? null : datingAppExperience === "true",
meeting_method: meetingMethod || null,

cohabitation_level: cohabitationLevel ? Number(cohabitationLevel) : null,
dating_app_level: datingAppLevel ? Number(datingAppLevel) : null,
no_condom_level: noCondomLevel ? Number(noCondomLevel) : null,
creampie_level: creampieLevel ? Number(creampieLevel) : null,
cheating_level: cheatingLevel ? Number(cheatingLevel) : null,
cheated_level: cheatedLevel ? Number(cheatedLevel) : null,
});
    if (postError) {
      setMessage(`保存に失敗しました: ${postError.message}`);
      setIsSubmitting(false);
      return;
    }

    const { error: subscriberError } = await supabase
      .from("subscribers")
      .insert({
        email: email.trim(),
        consent: true,
        source: "post_form",
      });

    if (subscriberError && subscriberError.code !== "23505") {
      setMessage(`メール登録に失敗しました: ${subscriberError.message}`);
      setIsSubmitting(false);
      return;
    }

    setMessage("投稿を保存しました。");

    setNickname("");
    setMbti("");
    setAge("");
    setPrefecture("");

    setGender("");
    setStatus("");

    setFirstExperienceAge("");
    setRelationshipCount("");
    setExperienceCount("");
    setSexFrequency("");
    setIdealSexFrequency("");
    setMasturbationFrequency("");
    setSexDuration("");
    setIdealSexDuration("");
    setSexSatisfaction("");
    setSexSatisfactionNote("");

    setMarriageIntent("");
    setHousewifePreference("");
    setDesiredChildren("");
    setCheatingDefinition("");
    setCheatingDesire("");
    setReactionToCheating("");

    setHeight("");
    setWeight("");
    setCupSize("");
    setPenisLength("");

    setAvatarId("");
    setEducation("");
    setIncome("");
    setOccupation("");

    setCohabitationExperience("");
setDatingAppExperience("");
setMeetingMethod("");

setCohabitationLevel("");
setDatingAppLevel("");
setNoCondomLevel("");
setCreampieLevel("");
setCheatingLevel("");
setCheatedLevel("");

    setTitle("");
    setContent("");

    setEmail("");
    setConsent(false);

    setIsSubmitting(false);
  }

  return (
    <Card className="rounded-[2rem] border-slate-200 bg-white shadow-sm">
      <CardContent className="p-4 sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-600">匿名投稿フォーム</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            恋愛・結婚・セックスのデータを投稿する
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            基本情報を入力して保存できます。メールアドレスは公開されません。
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <FormSection
            title="基本情報"
            description="まずは公開される基本情報を入力してください。"
            className="border-sky-100 bg-sky-50/60"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                  ニックネーム
                </span>
                <Input
                  className="flex-1"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="例：さくら、たけし、匿名A"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                  性別
                </span>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="flex-1 h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="">未選択</option>
                  <option>女性</option>
                  <option>男性</option>
                  <option>その他</option>
                  <option>回答しない</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                  年齢
                </span>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="flex-1 h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="">未選択</option>
                  {ageOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                  ステータス
                </span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="flex-1 h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="">未選択</option>
                  <option>独身</option>
                  <option>交際中</option>
                  <option>既婚</option>
                  <option>離婚</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                  居住エリア
                </span>
                <select
                  value={prefecture}
                  onChange={(e) => setPrefecture(e.target.value)}
                  className="flex-1 h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="">未選択</option>
                  {prefectures.map((prefecture) => (
                    <option key={prefecture} value={prefecture}>
                      {prefecture}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                  身長
                </span>
                <select
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="flex-1 h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="">未選択</option>
                  {heightOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                  体重
                </span>
                <select
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="flex-1 h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="">未選択</option>
                  {weightOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                  MBTI
                </span>
                <select
                  value={mbti}
                  onChange={(e) => setMbti(e.target.value)}
                  className="flex-1 h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="">未選択</option>
                  {mbtiOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                  年収
                </span>
                <select
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="flex-1 h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="">未選択</option>
                  {incomeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                  学歴
                </span>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="flex-1 h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="">未選択</option>
                  {educationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {gender === "女性" ? (
                <div className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                    カップ数
                  </span>
                  <select
                    value={cupSize}
                    onChange={(e) => setCupSize(e.target.value)}
                    className="flex-1 h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  >
                    <option value="">未選択</option>
                    {["A", "B", "C", "D", "E", "F", "G", "H以上"].map(
                      (size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      )
                    )}
                  </select>
                </div>
              ) : null}

              {gender === "男性" ? (
                <div className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-sm font-medium text-slate-700">
                    チンコの長さ
                  </span>
                  <select
                    value={penisLength}
                    onChange={(e) => setPenisLength(e.target.value)}
                    className="flex-1 h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  >
                    <option value="">未選択</option>
                    {penisLengthOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div className="flex items-start gap-3">
                <span className="w-28 shrink-0 pt-1 text-sm font-medium text-slate-700">
                  アバター
                </span>
                <div>
                  <div className="flex flex-wrap gap-3">
                    {(gender === "女性"
                      ? FEMALE_AVATAR_IDS
                      : gender === "男性"
                        ? MALE_AVATAR_IDS
                        : ALL_AVATAR_IDS
                    ).map((id) => (
                      <button
                        key={id}
                        type="button"
                        title={avatarLabels[id]}
                        onClick={() => setAvatarId(id === avatarId ? "" : id)}
                        className={`rounded-full transition-all ${
                          avatarId === id
                            ? "ring-2 ring-slate-800 ring-offset-2"
                            : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        <AvatarIllustration id={id} size={60} />
                      </button>
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    自分に近いイラストを選んでください（もう一度押すと解除）。
                  </p>
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection
            title="恋愛・セックスデータ"
            description="任意で詳細なデータを入力できます。"
            className="border-rose-100 bg-rose-50/60"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-48 shrink-0 text-sm font-medium text-slate-700">
                  初体験の年齢
                </span>
                <Input
                  className="flex-1"
                  type="number"
                  placeholder="歳"
                  value={firstExperienceAge}
                  onChange={(e) => setFirstExperienceAge(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="w-48 shrink-0 text-sm font-medium text-slate-700">
                  付き合った人数
                </span>
                <Input
                  className="flex-1"
                  type="number"
                  placeholder="人"
                  value={relationshipCount}
                  onChange={(e) => setRelationshipCount(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="w-48 shrink-0 text-sm font-medium text-slate-700">
                  経験人数
                </span>
                <Input
                  className="flex-1"
                  type="number"
                  placeholder="人"
                  value={experienceCount}
                  onChange={(e) => setExperienceCount(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="w-48 shrink-0 text-sm font-medium text-slate-700">
                  1週間のセックス回数（実態）
                </span>
                <Input
                  className="flex-1"
                  type="number"
                  placeholder="回"
                  value={sexFrequency}
                  onChange={(e) => setSexFrequency(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="w-48 shrink-0 text-sm font-medium text-slate-700">
                  1週間のセックス回数（理想）
                </span>
                <Input
                  className="flex-1"
                  type="number"
                  placeholder="回"
                  value={idealSexFrequency}
                  onChange={(e) => setIdealSexFrequency(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="w-48 shrink-0 text-sm font-medium text-slate-700">
                  1週間のオナニー回数
                </span>
                <Input
                  className="flex-1"
                  type="number"
                  placeholder="回"
                  value={masturbationFrequency}
                  onChange={(e) => setMasturbationFrequency(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="w-48 shrink-0 text-sm font-medium text-slate-700">
                  セックス1回の時間（実態）
                </span>
                <Input
                  className="flex-1"
                  type="number"
                  placeholder="分"
                  value={sexDuration}
                  onChange={(e) => setSexDuration(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="w-48 shrink-0 text-sm font-medium text-slate-700">
                  セックス1回の時間（理想）
                </span>
                <Input
                  className="flex-1"
                  type="number"
                  placeholder="分"
                  value={idealSexDuration}
                  onChange={(e) => setIdealSexDuration(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="w-48 shrink-0 text-sm font-medium text-slate-700">
                  現在のセックスライフの満足度（0〜100）
                </span>
                <Input
                  className="flex-1"
                  type="number"
                  min={0}
                  max={100}
                  placeholder="0〜100"
                  value={sexSatisfaction}
                  onChange={(e) => setSexSatisfaction(e.target.value)}
                />
              </div>

              <div className="flex items-start gap-3">
                <span className="w-48 shrink-0 pt-2 text-sm font-medium text-slate-700">
                  点数の理由
                </span>
                <textarea
                  className="flex-1 min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  placeholder="満足な点、不満な点を自由に記述してください"
                  value={sexSatisfactionNote}
                  onChange={(e) => setSexSatisfactionNote(e.target.value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="価値観"
            description="結婚や不貞行為に関する価値観を選択してください。"
            className="border-amber-100 bg-amber-50/60"
          >
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  結婚
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <RatingSelect
                    label="結婚願望"
                    value={marriageIntent}
                    options={ratingOptions.marriageIntent}
                    onChange={setMarriageIntent}
                  />
                  <RatingSelect
                    label="専業主婦希望"
                    value={housewifePreference}
                    options={ratingOptions.housewifePreference}
                    onChange={setHousewifePreference}
                  />
                  <RatingSelect
                    label="子供の人数願望"
                    value={desiredChildren}
                    options={ratingOptions.desiredChildren}
                    onChange={setDesiredChildren}
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">
                  不貞行為
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <RatingSelect
                    label="どこからが浮気か"
                    value={cheatingDefinition}
                    options={ratingOptions.cheatingDefinition}
                    onChange={setCheatingDefinition}
                  />
                  <RatingSelect
                    label="浮気願望"
                    value={cheatingDesire}
                    options={ratingOptions.cheatingDesire}
                    onChange={setCheatingDesire}
                  />
                  <RatingSelect
                    label="浮気されたらどうするか"
                    value={reactionToCheating}
                    options={ratingOptions.reactionToCheating}
                    onChange={setReactionToCheating}
                  />
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection
  title="経験"
  description="これまでの経験について選択してください。"
  className="border-emerald-100 bg-emerald-50/60"
>
  <div className="space-y-6">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <RatingSelect
        label="同棲経験"
        value={cohabitationLevel}
        options={experienceOptions.cohabitation}
        onChange={setCohabitationLevel}
      />

      <RatingSelect
        label="マチアプ経験"
        value={datingAppLevel}
        options={experienceOptions.datingApp}
        onChange={setDatingAppLevel}
      />

      <RatingSelect
        label="ゴムなしの経験"
        value={noCondomLevel}
        options={experienceOptions.noCondom}
        onChange={setNoCondomLevel}
      />

      <RatingSelect
        label="中出しの経験"
        value={creampieLevel}
        options={experienceOptions.creampie}
        onChange={setCreampieLevel}
      />

      <RatingSelect
        label="浮気経験"
        value={cheatingLevel}
        options={experienceOptions.cheating}
        onChange={setCheatingLevel}
      />

      <RatingSelect
        label="浮気された経験"
        value={cheatedLevel}
        options={experienceOptions.cheated}
        onChange={setCheatedLevel}
      />
    </div>
  </div>
</FormSection>

          <FormSection
            title="投稿内容"
            description="一覧ページに表示される内容です。"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">タイトル</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例：30代既婚、価値観について投稿します"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">内容</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[160px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                placeholder="恋愛、結婚、価値観などについて自由に記述してください"
              />
            </div>
          </FormSection>

          <FormSection
            title="連絡先・同意"
            description="メールアドレスは公開されません。"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">
                メールアドレス（必須）
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
              />
              <p className="text-xs text-slate-500">
                メールアドレスは公開されません。
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  OpenLoveの更新情報や集計データ、関連するご案内をメールで受け取ることに同意します。
                </span>
              </label>
            </div>
          </FormSection>

          {message ? (
            <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p>{message}</p>

              {message === "投稿を保存しました。" ? (
                <div className="mt-3">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/posts">投稿一覧を見る</Link>
                  </Button>
                </div>
              ) : null}
            </div>
          ) : null}

          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "保存中..." : "投稿する"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


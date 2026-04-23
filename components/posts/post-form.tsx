"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function PostForm() {
  const [nickname, setNickname] = useState("");

const [category, setCategory] = useState("恋愛");
const [ageRange, setAgeRange] = useState("20代");
const [gender, setGender] = useState("女性");
const [status, setStatus] = useState("独身");

const [experienceCount, setExperienceCount] = useState("");
const [firstExperienceAge, setFirstExperienceAge] = useState("");
const [sexFrequency, setSexFrequency] = useState("");
const [maxSexFrequency, setMaxSexFrequency] = useState("");

const [cheatingExperience, setCheatingExperience] = useState("");
const [cheatedExperience, setCheatedExperience] = useState("");

const [marriageAge, setMarriageAge] = useState("");
const [relationshipDuration, setRelationshipDuration] = useState("");
const [childrenCount, setChildrenCount] = useState("");
const [wantChildren, setWantChildren] = useState("");
const [divorceExperience, setDivorceExperience] = useState("");

const [marriageIntention, setMarriageIntention] = useState("");
const [wantHousewife, setWantHousewife] = useState("");
const [wantDualIncome, setWantDualIncome] = useState("");

const [height, setHeight] = useState("");
const [weight, setWeight] = useState("");
const [cupSize, setCupSize] = useState("");

const [education, setEducation] = useState("");
const [incomeRange, setIncomeRange] = useState("");
const [occupation, setOccupation] = useState("");

const [cohabitationExperience, setCohabitationExperience] = useState("");
const [datingAppExperience, setDatingAppExperience] = useState("");
const [meetingMethod, setMeetingMethod] = useState("");

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
  category,
  age_range: ageRange,
  gender,
  status,
  title: title.trim(),
  content: content.trim(),

  experience_count: experienceCount ? Number(experienceCount) : null,
  first_experience_age: firstExperienceAge ? Number(firstExperienceAge) : null,
  sex_frequency: sexFrequency ? Number(sexFrequency) : null,
  max_sex_frequency: maxSexFrequency ? Number(maxSexFrequency) : null,

  cheating_experience:
    cheatingExperience === ""
      ? null
      : cheatingExperience === "true",
  cheated_experience:
    cheatedExperience === ""
      ? null
      : cheatedExperience === "true",

  marriage_age: marriageAge ? Number(marriageAge) : null,
  relationship_duration: relationshipDuration
    ? Number(relationshipDuration)
    : null,
  children_count: childrenCount ? Number(childrenCount) : null,
  want_children:
    wantChildren === ""
      ? null
      : wantChildren === "true",
  divorce_experience:
    divorceExperience === ""
      ? null
      : divorceExperience === "true",

  marriage_intention: marriageIntention || null,
  want_housewife:
    wantHousewife === ""
      ? null
      : wantHousewife === "true",
  want_dual_income:
    wantDualIncome === ""
      ? null
      : wantDualIncome === "true",

  height: height ? Number(height) : null,
  weight: weight ? Number(weight) : null,
  cup_size: cupSize || null,

  education: education || null,
  income_range: incomeRange || null,
  occupation: occupation || null,

  cohabitation_experience:
    cohabitationExperience === ""
      ? null
      : cohabitationExperience === "true",
  dating_app_experience:
    datingAppExperience === ""
      ? null
      : datingAppExperience === "true",
  meeting_method: meetingMethod || null,
});

    if (postError) {
      setMessage(`保存に失敗しました: ${postError.message}`);
      setIsSubmitting(false);
      return;
    }

const { error: subscriberError } = await supabase.from("subscribers").insert({
  email: email.trim(),
  consent: true,
  source: "post_form",
});

if (subscriberError) {
  if (subscriberError.code !== "23505") {
    setMessage(`メール登録に失敗しました: ${subscriberError.message}`);
    setIsSubmitting(false);
    return;
  }
}

    if (subscriberError) {
      setMessage(`メール登録に失敗しました: ${subscriberError.message}`);
      setIsSubmitting(false);
      return;
    }

    setMessage("投稿を保存しました。");

setNickname("");

setCategory("恋愛");
setAgeRange("20代");
setGender("女性");
setStatus("独身");

setExperienceCount("");
setFirstExperienceAge("");
setSexFrequency("");
setMaxSexFrequency("");

setCheatingExperience("");
setCheatedExperience("");

setMarriageAge("");
setRelationshipDuration("");
setChildrenCount("");
setWantChildren("");
setDivorceExperience("");

setMarriageIntention("");
setWantHousewife("");
setWantDualIncome("");

setHeight("");
setWeight("");
setCupSize("");

setEducation("");
setIncomeRange("");
setOccupation("");

setCohabitationExperience("");
setDatingAppExperience("");
setMeetingMethod("");

setTitle("");
setContent("");

setEmail("");
setConsent(false);

setIsSubmitting(false);
  }
function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
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
  return (
    <Card className="border-slate-200 bg-white">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-600">匿名投稿フォーム</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            恋愛・結婚・家族のデータを投稿する
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            基本情報を入力して保存できます。メールアドレスは公開されません。
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
<FormSection
  title="基本情報"
  description="まずは公開される基本情報を入力してください。"
>
  <div className="space-y-2">
    <label className="text-sm font-medium">ニックネーム（任意）</label>
    <Input
      value={nickname}
      onChange={(e) => setNickname(e.target.value)}
      placeholder="例：さくら、たけし、匿名A"
    />
    <p className="text-xs text-slate-500">
      個人が特定される名前やSNSアカウント名は避けてください。
    </p>
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <label className="text-sm font-medium">カテゴリ</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option>恋愛</option>
        <option>結婚</option>
        <option>家族</option>
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">年代</label>
      <select
        value={ageRange}
        onChange={(e) => setAgeRange(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option>10代</option>
        <option>20代</option>
        <option>30代</option>
        <option>40代</option>
        <option>50代以上</option>
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">性別</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option>女性</option>
        <option>男性</option>
        <option>その他</option>
        <option>回答しない</option>
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">ステータス</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option>独身</option>
        <option>交際中</option>
        <option>既婚</option>
        <option>離婚</option>
      </select>
    </div>
  </div>
</FormSection>

<FormSection
  title="恋愛・性データ"
  description="任意で詳細なデータを入力できます。"
>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <Input
      type="number"
      placeholder="経験人数"
      value={experienceCount}
      onChange={(e) => setExperienceCount(e.target.value)}
    />
    <Input
      type="number"
      placeholder="初体験年齢"
      value={firstExperienceAge}
      onChange={(e) => setFirstExperienceAge(e.target.value)}
    />
    <Input
      type="number"
      placeholder="週の頻度"
      value={sexFrequency}
      onChange={(e) => setSexFrequency(e.target.value)}
    />
    <Input
      type="number"
      placeholder="過去最高頻度"
      value={maxSexFrequency}
      onChange={(e) => setMaxSexFrequency(e.target.value)}
    />
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <label className="text-sm font-medium">浮気経験</label>
      <select
        value={cheatingExperience}
        onChange={(e) => setCheatingExperience(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">未選択</option>
        <option value="true">あり</option>
        <option value="false">なし</option>
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">浮気された経験</label>
      <select
        value={cheatedExperience}
        onChange={(e) => setCheatedExperience(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">未選択</option>
        <option value="true">あり</option>
        <option value="false">なし</option>
      </select>
    </div>
  </div>
</FormSection>

<FormSection
  title="結婚・家族"
  description="結婚や子どもに関する情報です。"
>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <Input
      type="number"
      placeholder="結婚年齢"
      value={marriageAge}
      onChange={(e) => setMarriageAge(e.target.value)}
    />
    <Input
      type="number"
      placeholder="交際期間（月）"
      value={relationshipDuration}
      onChange={(e) => setRelationshipDuration(e.target.value)}
    />
    <Input
      type="number"
      placeholder="子供の人数"
      value={childrenCount}
      onChange={(e) => setChildrenCount(e.target.value)}
    />
    <Input
      placeholder="結婚願望（例：強い / 普通 / なし）"
      value={marriageIntention}
      onChange={(e) => setMarriageIntention(e.target.value)}
    />
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <label className="text-sm font-medium">子供が欲しいか</label>
      <select
        value={wantChildren}
        onChange={(e) => setWantChildren(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">未選択</option>
        <option value="true">欲しい</option>
        <option value="false">欲しくない</option>
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">離婚経験</label>
      <select
        value={divorceExperience}
        onChange={(e) => setDivorceExperience(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">未選択</option>
        <option value="true">あり</option>
        <option value="false">なし</option>
      </select>
    </div>
  </div>
</FormSection>

<FormSection
  title="属性・スペック"
  description="学歴や体格など、任意で入力してください。"
>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <Input
      type="number"
      placeholder="身長(cm)"
      value={height}
      onChange={(e) => setHeight(e.target.value)}
    />
    <Input
      type="number"
      placeholder="体重(kg)"
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
    />
    <Input
      placeholder="カップ数"
      value={cupSize}
      onChange={(e) => setCupSize(e.target.value)}
    />
    <Input
      placeholder="学歴"
      value={education}
      onChange={(e) => setEducation(e.target.value)}
    />
    <Input
      placeholder="年収帯"
      value={incomeRange}
      onChange={(e) => setIncomeRange(e.target.value)}
    />
    <Input
      placeholder="職業"
      value={occupation}
      onChange={(e) => setOccupation(e.target.value)}
    />
    <Input
      placeholder="出会いのきっかけ"
      value={meetingMethod}
      onChange={(e) => setMeetingMethod(e.target.value)}
    />
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div className="space-y-2">
      <label className="text-sm font-medium">専業主婦希望</label>
      <select
        value={wantHousewife}
        onChange={(e) => setWantHousewife(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">未選択</option>
        <option value="true">希望する</option>
        <option value="false">希望しない</option>
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">共働き希望</label>
      <select
        value={wantDualIncome}
        onChange={(e) => setWantDualIncome(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">未選択</option>
        <option value="true">希望する</option>
        <option value="false">希望しない</option>
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">同棲経験</label>
      <select
        value={cohabitationExperience}
        onChange={(e) => setCohabitationExperience(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">未選択</option>
        <option value="true">あり</option>
        <option value="false">なし</option>
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">マッチングアプリ経験</label>
      <select
        value={datingAppExperience}
        onChange={(e) => setDatingAppExperience(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">未選択</option>
        <option value="true">あり</option>
        <option value="false">なし</option>
      </select>
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
      placeholder="例：30代既婚、子ども2人です"
    />
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium">内容</label>
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="min-h-[140px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
      placeholder="例：結婚年齢、交際期間、子どもの人数、今後の予定など"
    />
  </div>
</FormSection>

<FormSection
  title="連絡先・同意"
  description="メールアドレスは公開されません。"
>
  <div className="space-y-2">
    <label className="text-sm font-medium">メールアドレス（必須）</label>
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

  <div className="rounded-lg border border-slate-200 bg-white p-4">
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
  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
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

<Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
  {isSubmitting ? "保存中..." : "投稿する"}
</Button>
        </form>
      </CardContent>
    </Card>
  );
}
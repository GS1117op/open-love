export const genderOptions = ["女性", "男性", "その他", "回答しない"] as const;

export const statusOptions = ["恋人探し中", "恋愛中", "結婚中", "恋人不要"] as const;

export const ageBucketOptions = [
  { label: "10代前半", value: "12" },
  { label: "10代後半", value: "17" },
  { label: "20代前半", value: "22" },
  { label: "20代後半", value: "27" },
  { label: "30代前半", value: "32" },
  { label: "30代後半", value: "37" },
  { label: "40代前半", value: "42" },
  { label: "40代後半", value: "47" },
  { label: "50代前半", value: "52" },
  { label: "50代後半", value: "57" },
  { label: "60代以上", value: "60" },
] as const;

export const mbtiOptions = [
  { value: "INTJ", label: "INTJ - 建築家" },
  { value: "INTP", label: "INTP - 論理学者" },
  { value: "ENTJ", label: "ENTJ - 指揮官" },
  { value: "ENTP", label: "ENTP - 討論者" },
  { value: "INFJ", label: "INFJ - 提唱者" },
  { value: "INFP", label: "INFP - 仲介者" },
  { value: "ENFJ", label: "ENFJ - 主人公" },
  { value: "ENFP", label: "ENFP - 広報運動家" },
  { value: "ISTJ", label: "ISTJ - 管理者" },
  { value: "ISFJ", label: "ISFJ - 擁護者" },
  { value: "ESTJ", label: "ESTJ - 幹部" },
  { value: "ESFJ", label: "ESFJ - 領事官" },
  { value: "ISTP", label: "ISTP - 巨匠" },
  { value: "ISFP", label: "ISFP - 冒険家" },
  { value: "ESTP", label: "ESTP - 起業家" },
  { value: "ESFP", label: "ESFP - エンターテイナー" },
] as const;

export const educationOptions = [
  "東京一工",
  "旧帝大",
  "早慶",
  "上智・ICU",
  "MARCH・関関同立",
  "日東駒専・産近甲龍",
  "その他大学",
  "大学院",
  "短大・専門学校",
  "高校",
  "中学以下",
  "回答しない",
] as const;

export const prefectureOptions = [
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
] as const;

export const cupSizeOptions = ["A", "B", "C", "D", "E", "F", "G", "H以上"] as const;

export const ratingOptions = {
  marriageIntent: [
    "まったく結婚したくない",
    "あまり結婚したくない",
    "どちらともいえない",
    "できれば結婚したい",
    "強く結婚したい",
  ],
  housewifePreference: [
    "専業主婦になりたくない",
    "あまり専業主婦になりたくない",
    "どちらともいえない",
    "できれば専業主婦になりたい",
    "強く専業主婦になりたい",
  ],
  desiredChildren: [
    "子どもはほしくない",
    "できれば子どもはほしくない",
    "どちらともいえない",
    "できれば子どもがほしい",
    "強く子どもがほしい",
  ],
  cheatingDefinition: [
    "異性と話すだけ",
    "キスから",
    "体の関係がある",
    "気持ちが相手に向いたら",
    "秘密で会った時点で",
  ],
  cheatingDesire: [
    "まったくない",
    "ほとんどない",
    "少しある",
    "かなりある",
    "強くある",
  ],
  reactionToCheating: [
    "話し合う",
    "距離を置く",
    "条件次第で別れる",
    "ほぼ別れる",
    "即別れる",
  ],
} as const;

export const experienceOptions = {
  cohabitation: [
    "まったくない",
    "少しある",
    "数か月ほどある",
    "長期間ある",
    "現在も同棲中",
  ],
  datingApp: [
    "使ったことがない",
    "少し使ったことがある",
    "複数回使ったことがある",
    "頻繁に使っている",
    "現在もメインで使っている",
  ],
  noCondom: [
    "一度もない",
    "1回だけある",
    "何度かある",
    "よくある",
    "かなり多い",
  ],
  creampie: [
    "一度もない",
    "1回だけある",
    "何度かある",
    "よくある",
    "かなり多い",
  ],
  cheating: [
    "一度もない",
    "1回だけある",
    "何度かある",
    "複数人とある",
    "かなり多い",
  ],
  cheated: [
    "一度もない",
    "1回だけある",
    "何度かある",
    "複数人からされたことがある",
    "かなり多い",
  ],
} as const;

export function getAgeLabel(age: number | null | undefined) {
  if (age == null) {
    return null;
  }
  if (age < 15) return "10代前半";
  if (age < 20) return "10代後半";
  if (age < 25) return "20代前半";
  if (age < 30) return "20代後半";
  if (age < 35) return "30代前半";
  if (age < 40) return "30代後半";
  if (age < 45) return "40代前半";
  if (age < 50) return "40代後半";
  if (age < 55) return "50代前半";
  if (age < 60) return "50代後半";
  return "60代以上";
}

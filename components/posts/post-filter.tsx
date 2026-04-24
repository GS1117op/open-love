type PostFilterProps = {
  gender: string;
  status: string;
  onGenderChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export function PostFilter({
  gender,
  status,
  onGenderChange,
  onStatusChange,
}: PostFilterProps) {
  return (
    <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium">性別で絞り込む</label>
        <select
          value={gender}
          onChange={(e) => onGenderChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">すべて</option>
          <option value="女性">女性</option>
          <option value="男性">男性</option>
          <option value="その他">その他</option>
          <option value="回答しない">回答しない</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">ステータスで絞り込む</label>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">すべて</option>
          <option value="独身">独身</option>
          <option value="交際中">交際中</option>
          <option value="既婚">既婚</option>
          <option value="離婚">離婚</option>
        </select>
      </div>
    </div>
  );
}
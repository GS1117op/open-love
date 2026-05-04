"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/lib/supabase/client";

type HomeGraphRecord = {
  gender: string | null;
  sex_frequency: number | null;
  ideal_sex_frequency: number | null;
  mbti: string | null;
  cheating_level: number | null;
};

type FrequencyDatum = {
  label: string;
  current: number;
  ideal: number;
};

type MbtiCheatingDatum = {
  label: string;
  count: number;
};

const FEMALE_COLOR = "#ff4d8d";
const MALE_COLOR = "#9b2dd6";

const LABEL_OTHER = "その他";
const LABEL_FEMALE = "女性";
const LABEL_MALE = "男性";

function normalizeGender(value: string | null) {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return LABEL_OTHER;
  if (normalized === "female" || value === LABEL_FEMALE) return LABEL_FEMALE;
  if (normalized === "male" || value === LABEL_MALE) return LABEL_MALE;
  return LABEL_OTHER;
}

function formatCountTooltip(value: unknown) {
  return `${Number(value ?? 0)}回`;
}

function formatPercentTooltip(value: unknown) {
  return `${Number(value ?? 0)}%`;
}

function roundToSingleDecimal(value: number) {
  return Math.round(value * 10) / 10;
}

function calculateAverage(values: Array<number | null>) {
  const validValues = values.filter((value): value is number => value !== null);

  if (validValues.length === 0) {
    return 0;
  }

  return roundToSingleDecimal(
    validValues.reduce((sum, value) => sum + value, 0) / validValues.length
  );
}

function buildFrequencyData(posts: HomeGraphRecord[]): FrequencyDatum[] {
  return [LABEL_FEMALE, LABEL_MALE].map((gender) => {
    const targetPosts = posts.filter((post) => normalizeGender(post.gender) === gender);

    return {
      label: gender,
      current: calculateAverage(targetPosts.map((post) => post.sex_frequency)),
      ideal: calculateAverage(targetPosts.map((post) => post.ideal_sex_frequency)),
    };
  });
}

function buildMbtiCheatingData(
  posts: HomeGraphRecord[],
  gender: typeof LABEL_FEMALE | typeof LABEL_MALE
) {
  const targetPosts = posts.filter(
    (post) => normalizeGender(post.gender) === gender && post.mbti
  );
  const mbtiGroups = new Map<string, HomeGraphRecord[]>();

  for (const post of targetPosts) {
    const key = post.mbti as string;
    const current = mbtiGroups.get(key) ?? [];
    current.push(post);
    mbtiGroups.set(key, current);
  }

  return [...mbtiGroups.entries()]
    .map(([label, items]) => {
      const cheatingRate =
        items.filter((item) => (item.cheating_level ?? 0) >= 2).length / items.length;

      return {
        label,
        count: roundToSingleDecimal(cheatingRate * 100),
        sampleCount: items.length,
      };
    })
    .filter((item) => item.sampleCount >= 1)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
    .map(({ label, count }) => ({ label, count }));
}

const cardStyle = {
  background: "rgba(42, 17, 69, 0.7)",
  border: "1px solid rgba(255, 77, 141, 0.2)",
  borderRadius: "20px",
  backdropFilter: "blur(8px)",
};

const tooltipStyle = {
  backgroundColor: "#2a1145",
  border: "1px solid rgba(255, 77, 141, 0.3)",
  borderRadius: "12px",
  color: "#f0e6ff",
};

export function HomeGraphTeasers() {
  const [loading, setLoading] = useState(true);
  const [frequencyData, setFrequencyData] = useState<FrequencyDatum[]>([]);
  const [femaleMbtiData, setFemaleMbtiData] = useState<MbtiCheatingDatum[]>([]);
  const [maleMbtiData, setMaleMbtiData] = useState<MbtiCheatingDatum[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("gender, sex_frequency, ideal_sex_frequency, mbti, cheating_level");

      if (error) {
        console.error("ホーム用グラフ取得エラー:", error.message);
        setLoading(false);
        return;
      }

      const posts = (data ?? []) as HomeGraphRecord[];
      setFrequencyData(buildFrequencyData(posts));
      setFemaleMbtiData(buildMbtiCheatingData(posts, LABEL_FEMALE));
      setMaleMbtiData(buildMbtiCheatingData(posts, LABEL_MALE));
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {[0, 1].map((index) => (
          <div key={index} className="p-5 sm:p-6" style={cardStyle}>
            <div
              className="h-6 w-48 rounded-full"
              style={{ background: "rgba(255, 77, 141, 0.15)" }}
            />
            <div
              className="mt-3 h-4 w-72 rounded-full"
              style={{ background: "rgba(255, 77, 141, 0.1)" }}
            />
            <div
              className="mt-6 h-64 rounded-2xl"
              style={{ background: "rgba(26, 10, 46, 0.5)" }}
            />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="mt-8 space-y-4 sm:mt-12">
      <div className="max-w-3xl">
        <p className="text-sm font-medium" style={{ color: "#ff4d8d" }}>
          {"まずは覗いてみやすい見本グラフ"}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight" style={{ color: "#f0e6ff" }}>
          {"トップで気になるデータをチェック"}
        </h2>
        <p className="mt-2 text-sm leading-6 sm:text-base" style={{ color: "#b09fc8" }}>
          {
            "よく見られやすい切り口を、男女差でひと目で見られるようにしています。"
          }
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Frequency card */}
        <div className="p-5 sm:p-6" style={cardStyle}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="text-xs font-medium uppercase tracking-[0.18em]"
                style={{ color: "#b09fc8" }}
              >
                Frequency
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
                {"セックス頻度の理想と現実"}
              </h3>
              <p className="mt-2 text-sm leading-6" style={{ color: "#b09fc8" }}>
                {
                  "実際の頻度と理想の頻度のギャップを、男女の平均で比べています。"
                }
              </p>
            </div>
            <span
              className="shrink-0 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: "rgba(255, 77, 141, 0.12)",
                border: "1px solid rgba(255, 77, 141, 0.25)",
                color: "#ff4d8d",
              }}
            >
              {"男女比較"}
            </span>
          </div>

          <div className="mt-5 h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={frequencyData} barCategoryGap={28}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(255, 77, 141, 0.12)"
                />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#b09fc8", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                  tick={{ fill: "#b09fc8", fontSize: 12 }}
                />
                <Tooltip
                  formatter={formatCountTooltip}
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "rgba(255, 77, 141, 0.05)" }}
                />
                <Bar dataKey="current" radius={[10, 10, 0, 0]} fill="rgba(255, 77, 141, 0.45)" />
                <Bar dataKey="ideal" radius={[10, 10, 0, 0]} fill="#ff4d8d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs" style={{ color: "#b09fc8" }}>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: "rgba(255, 77, 141, 0.45)" }}
              />
              <span>{"現実"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff4d8d]" />
              <span>{"理想"}</span>
            </div>
          </div>

          <Link
            href="/data-graphs/charts"
            className="btn-gradient mt-5 flex h-12 w-full items-center justify-between rounded-2xl px-5 text-sm font-semibold"
          >
            {"用意済みグラフで詳しく見る"}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* MBTI cheating card */}
        <div className="p-5 sm:p-6" style={cardStyle}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="text-xs font-medium uppercase tracking-[0.18em]"
                style={{ color: "#b09fc8" }}
              >
                Correlation
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight" style={{ color: "#f0e6ff" }}>
                {"MBTIと浮気経験の関係"}
              </h3>
              <p className="mt-2 text-sm leading-6" style={{ color: "#b09fc8" }}>
                {
                  "MBTIごとの浮気経験率を、男女別に見やすく並べています。"
                }
              </p>
            </div>
            <span
              className="shrink-0 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: "rgba(155, 45, 214, 0.12)",
                border: "1px solid rgba(155, 45, 214, 0.25)",
                color: "#c46fe8",
              }}
            >
              {"男女比較"}
            </span>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div
              className="p-3"
              style={{
                borderRadius: "14px",
                background: "rgba(255, 77, 141, 0.07)",
                border: "1px solid rgba(255, 77, 141, 0.2)",
              }}
            >
              <p className="mb-2 text-xs font-semibold" style={{ color: "#ff4d8d" }}>
                {LABEL_FEMALE}
              </p>
              <div className="h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={femaleMbtiData}
                    layout="vertical"
                    margin={{ top: 4, right: 8, left: 4, bottom: 4 }}
                  >
                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      unit="%"
                      tick={{ fill: "#b09fc8", fontSize: 11 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="label"
                      width={86}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "#b09fc8" }}
                    />
                    <Tooltip
                      formatter={formatPercentTooltip}
                      contentStyle={tooltipStyle}
                      cursor={{ fill: "rgba(255, 77, 141, 0.08)" }}
                    />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {femaleMbtiData.map((item) => (
                        <Cell key={item.label} fill={FEMALE_COLOR} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div
              className="p-3"
              style={{
                borderRadius: "14px",
                background: "rgba(155, 45, 214, 0.07)",
                border: "1px solid rgba(155, 45, 214, 0.2)",
              }}
            >
              <p className="mb-2 text-xs font-semibold" style={{ color: "#9b2dd6" }}>
                {LABEL_MALE}
              </p>
              <div className="h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={maleMbtiData}
                    layout="vertical"
                    margin={{ top: 4, right: 8, left: 4, bottom: 4 }}
                  >
                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      unit="%"
                      tick={{ fill: "#b09fc8", fontSize: 11 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="label"
                      width={86}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "#b09fc8" }}
                    />
                    <Tooltip
                      formatter={formatPercentTooltip}
                      contentStyle={tooltipStyle}
                      cursor={{ fill: "rgba(155, 45, 214, 0.08)" }}
                    />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {maleMbtiData.map((item) => (
                        <Cell key={item.label} fill={MALE_COLOR} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <Link
            href="/data-graphs/custom"
            className="mt-5 flex h-12 w-full items-center justify-between rounded-2xl px-5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "rgba(155, 45, 214, 0.12)",
              border: "1px solid rgba(155, 45, 214, 0.3)",
              color: "#f0e6ff",
            }}
          >
            {"自由グラフで深掘りする"}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

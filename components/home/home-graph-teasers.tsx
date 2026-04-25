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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

const FEMALE_COLOR = "#ec4899";
const MALE_COLOR = "#2563eb";

const LABEL_OTHER = "\u305d\u306e\u4ed6";
const LABEL_FEMALE = "\u5973\u6027";
const LABEL_MALE = "\u7537\u6027";

function normalizeGender(value: string | null) {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return LABEL_OTHER;
  if (normalized === "female" || value === LABEL_FEMALE) return LABEL_FEMALE;
  if (normalized === "male" || value === LABEL_MALE) return LABEL_MALE;
  return LABEL_OTHER;
}

function formatCountTooltip(value: unknown) {
  return `${Number(value ?? 0)}\u56de`;
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
        console.error("\u30db\u30fc\u30e0\u7528\u30b0\u30e9\u30d5\u53d6\u5f97\u30a8\u30e9\u30fc:", error.message);
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
          <Card key={index} className="rounded-[2rem] border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <div className="h-6 w-48 rounded-full bg-slate-100" />
              <div className="mt-3 h-4 w-72 rounded-full bg-slate-100" />
              <div className="mt-6 h-64 rounded-2xl bg-slate-100" />
            </CardContent>
          </Card>
        ))}
      </section>
    );
  }

  return (
    <section className="mt-8 space-y-4 sm:mt-12">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-slate-600">
          {"\u307e\u305a\u306f\u8997\u3044\u3066\u307f\u3084\u3059\u3044\u898b\u672c\u30b0\u30e9\u30d5"}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
          {"\u30c8\u30c3\u30d7\u3067\u6c17\u306b\u306a\u308b\u30c7\u30fc\u30bf\u3092\u30c1\u30a7\u30c3\u30af"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
          {
            "\u3088\u304f\u898b\u3089\u308c\u3084\u3059\u3044\u5207\u308a\u53e3\u3092\u3001\u7537\u5973\u5dee\u3067\u3072\u3068\u76ee\u3067\u898b\u3089\u308c\u308b\u3088\u3046\u306b\u3057\u3066\u3044\u307e\u3059\u3002"
          }
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-[2rem] border-slate-200 bg-white shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Frequency
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                  {"\u30bb\u30c3\u30af\u30b9\u983b\u5ea6\u306e\u7406\u60f3\u3068\u73fe\u5b9f"}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {
                    "\u5b9f\u969b\u306e\u983b\u5ea6\u3068\u7406\u60f3\u306e\u983b\u5ea6\u306e\u30ae\u30e3\u30c3\u30d7\u3092\u3001\u7537\u5973\u306e\u5e73\u5747\u3067\u6bd4\u3079\u3066\u3044\u307e\u3059\u3002"
                  }
                </p>
              </div>
              <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
                {"\u7537\u5973\u6bd4\u8f03"}
              </span>
            </div>

            <div className="mt-5 h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={frequencyData} barCategoryGap={28}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip formatter={formatCountTooltip} />
                  <Bar dataKey="current" radius={[10, 10, 0, 0]} fill="#94a3b8" />
                  <Bar dataKey="ideal" radius={[10, 10, 0, 0]} fill="#0f172a" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-400" />
                <span>{"\u73fe\u5b9f"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-900" />
                <span>{"\u7406\u60f3"}</span>
              </div>
            </div>

            <Button asChild className="mt-5 h-12 w-full justify-between rounded-2xl">
              <Link href="/data-graphs/charts">
                {"\u7528\u610f\u6e08\u307f\u30b0\u30e9\u30d5\u3067\u8a73\u3057\u304f\u898b\u308b"}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-slate-200 bg-white shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Correlation
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                  {"MBTI\u3068\u6d6e\u6c17\u7d4c\u9a13\u306e\u95a2\u4fc2"}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {
                    "MBTI\u3054\u3068\u306e\u6d6e\u6c17\u7d4c\u9a13\u7387\u3092\u3001\u7537\u5973\u5225\u306b\u898b\u3084\u3059\u304f\u4e26\u3079\u3066\u3044\u307e\u3059\u3002"
                  }
                </p>
              </div>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-600">
                {"\u7537\u5973\u6bd4\u8f03"}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-3">
                <p className="mb-2 text-xs font-semibold text-rose-700">{LABEL_FEMALE}</p>
                <div className="h-56 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={femaleMbtiData}
                      layout="vertical"
                      margin={{ top: 4, right: 8, left: 4, bottom: 4 }}
                    >
                      <XAxis type="number" tickLine={false} axisLine={false} unit="%" />
                      <YAxis
                        type="category"
                        dataKey="label"
                        width={86}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                      />
                      <Tooltip formatter={formatPercentTooltip} />
                      <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                        {femaleMbtiData.map((item) => (
                          <Cell key={item.label} fill={FEMALE_COLOR} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-3">
                <p className="mb-2 text-xs font-semibold text-sky-700">{LABEL_MALE}</p>
                <div className="h-56 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={maleMbtiData}
                      layout="vertical"
                      margin={{ top: 4, right: 8, left: 4, bottom: 4 }}
                    >
                      <XAxis type="number" tickLine={false} axisLine={false} unit="%" />
                      <YAxis
                        type="category"
                        dataKey="label"
                        width={86}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                      />
                      <Tooltip formatter={formatPercentTooltip} />
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

            <Button asChild variant="outline" className="mt-5 h-12 w-full justify-between rounded-2xl">
              <Link href="/data-graphs/custom">
                {"\u81ea\u7531\u30b0\u30e9\u30d5\u3067\u6df1\u6398\u308a\u3059\u308b"}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

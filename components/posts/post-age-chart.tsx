"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PostAgeChartProps = {
  data: {
    ageRange: string;
    count: number;
  }[];
};

export function PostAgeChart({ data }: PostAgeChartProps) {
  return (
    <Card className="border-slate-200 bg-white">
      <CardContent className="p-5">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">
            年代別の投稿件数
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            現在表示中の条件に合わせた件数です。
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="ageRange" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
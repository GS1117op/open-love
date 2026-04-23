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

type PostStatusChartProps = {
  data: {
    status: string;
    count: number;
  }[];
};

export function PostStatusChart({ data }: PostStatusChartProps) {
  return (
    <Card className="border-slate-200 bg-white">
      <CardContent className="p-5">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">
            ステータス別の投稿件数
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            独身・交際中・既婚などの内訳です。
          </p>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="status" />
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
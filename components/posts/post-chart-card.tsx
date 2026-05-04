"use client";

import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ChartDatum = {
  label: string;
  count: number;
};

type ComparisonSeries = {
  label: string;
  data: ChartDatum[];
};

type PostChartCardProps = {
  title: string;
  description: string;
  data?: ChartDatum[];
  comparisonData?: ComparisonSeries[];
  chartType: "pie" | "bar";
  horizontal?: boolean;
  emptyLabel?: string;
  shareUrl?: string;
};

const CHART_COLORS = [
  "#0f172a",
  "#2563eb",
  "#0f766e",
  "#db2777",
  "#ea580c",
  "#65a30d",
  "#4f46e5",
  "#0891b2",
  "#64748b",
  "#7c3aed",
];

function formatCountTooltip(value: unknown) {
  return `${Number(value ?? 0)}件`;
}

function formatPieTooltip(value: unknown, name: unknown) {
  return [formatCountTooltip(value), String(name ?? "")] as [string, string];
}

function getChartHeight(dataLength: number, horizontal?: boolean, mobile = false) {
  if (!horizontal) {
    return mobile ? 260 : 210;
  }

  return Math.max(mobile ? 260 : 210, dataLength * (mobile ? 34 : 28));
}

function getExpandedChartHeight(dataLength: number, horizontal?: boolean, mobile = false) {
  if (!horizontal) {
    return mobile ? 400 : 340;
  }

  return Math.max(mobile ? 420 : 340, dataLength * (mobile ? 40 : 34));
}

export function PostChartCard({
  title,
  description,
  data = [],
  comparisonData,
  chartType,
  horizontal = false,
  emptyLabel = "表示できるデータがありません。",
  shareUrl,
}: PostChartCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const filteredData = data.filter((item) => item.count > 0);
  const seriesList = comparisonData?.length
    ? comparisonData.map((series) => ({
        ...series,
        data: series.data.filter((item) => item.count > 0),
      }))
    : null;
  const hasComparisonData = seriesList?.some((series) => series.data.length > 0) ?? false;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  async function handleCopyShareUrl(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (!shareUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      window.alert("共有URLをコピーしました。");
    } catch {
      window.prompt("このURLをコピーしてください。", shareUrl);
    }
  }

  function renderChart(seriesData: ChartDatum[], expanded = false) {
    const shouldUseHorizontal =
      chartType === "bar" && (horizontal || (isMobile && seriesData.length >= 6));
    const xAxisAngle = isMobile ? -32 : seriesData.length > 6 ? -18 : 0;
    const xAxisHeight = isMobile ? 74 : seriesData.length > 6 ? 56 : 30;
    const xAxisInterval = isMobile ? (seriesData.length > 8 ? 1 : 0) : 0;

    return (
      <div
        className="w-full"
        style={{
          height: `${
            expanded
              ? getExpandedChartHeight(seriesData.length, shouldUseHorizontal, isMobile)
              : getChartHeight(seriesData.length, shouldUseHorizontal, isMobile)
          }px`,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "pie" ? (
            <PieChart>
              <Pie
                data={seriesData}
                dataKey="count"
                nameKey="label"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={3}
              >
                {seriesData.map((entry, index) => (
                  <Cell
                    key={`${entry.label}-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={formatPieTooltip} />
            </PieChart>
          ) : shouldUseHorizontal ? (
            <BarChart
              data={seriesData}
              layout="vertical"
              margin={{ left: isMobile ? 8 : 24, right: 12 }}
            >
              <XAxis type="number" allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="label"
                width={isMobile ? 88 : 110}
                tick={{ fontSize: isMobile ? 11 : 12 }}
              />
              <Tooltip formatter={formatCountTooltip} />
              <Bar dataKey="count" radius={[0, 8, 8, 0]} fill="#0f172a" />
            </BarChart>
          ) : (
            <BarChart data={seriesData} margin={{ left: 8, right: 8 }}>
              <XAxis
                dataKey="label"
                interval={xAxisInterval}
                angle={xAxisAngle}
                textAnchor={xAxisAngle === 0 ? "middle" : "end"}
                height={xAxisHeight}
                tick={{ fontSize: isMobile ? 11 : 12 }}
              />
              <YAxis allowDecimals={false} tick={{ fontSize: isMobile ? 11 : 12 }} />
              <Tooltip formatter={formatCountTooltip} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {seriesData.map((entry, index) => (
                  <Cell
                    key={`${entry.label}-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  }

  function renderPieLegend(seriesData: ChartDatum[], seriesLabel?: string) {
    return (
      <div className="mt-2 grid gap-1.5">
        {seriesData.map((item, index) => (
          <div
            key={`${seriesLabel ?? "single"}-${item.label}`}
            className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs"
            style={{ background: "rgba(26,10,46,0.5)" }}
          >
            <div className="flex items-center gap-2" style={{ color: "#b09fc8" }}>
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
              />
              <span>{item.label}</span>
            </div>
            <span className="font-medium" style={{ color: "#f0e6ff" }}>{item.count}件</span>
          </div>
        ))}
      </div>
    );
  }

  function renderContent(expanded = false) {
    return (
      <>
        {!hasComparisonData && filteredData.length === 0 ? (
          <p className="text-xs" style={{ color: "#8070a0" }}>{emptyLabel}</p>
        ) : hasComparisonData && seriesList ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {seriesList.map((series) => (
              <div
                key={series.label}
                className="rounded-lg border p-3"
                style={{ background: "rgba(26,10,46,0.5)", borderColor: "rgba(255,77,141,0.18)" }}
              >
                <p className="mb-2 text-xs font-semibold" style={{ color: "#e0d0f0" }}>{series.label}</p>
                {series.data.length === 0 ? (
                  <p className="text-xs" style={{ color: "#8070a0" }}>{emptyLabel}</p>
                ) : (
                  <>
                    {renderChart(series.data, expanded)}
                    {chartType === "pie" ? renderPieLegend(series.data, series.label) : null}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          renderChart(filteredData, expanded)
        )}

        {!hasComparisonData && chartType === "pie" && filteredData.length > 0
          ? renderPieLegend(filteredData)
          : null}
      </>
    );
  }

  return (
    <>
      <div
        className="cursor-zoom-in rounded-2xl border p-4 transition-shadow hover:shadow-lg"
        style={{ background: "rgba(42,17,69,0.7)", borderColor: "rgba(255,77,141,0.2)" }}
        onClick={() => setIsExpanded(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsExpanded(true);
          }
        }}
      >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold" style={{ color: "#f0e6ff" }}>{title}</h2>
              <p className="mt-1 text-xs leading-5" style={{ color: "#b09fc8" }}>{description}</p>
            </div>
            <span className="rounded-full px-2 py-1 text-[10px] font-medium" style={{ background: "rgba(255,77,141,0.12)", color: "#b09fc8" }}>
              クリックで拡大
            </span>
          </div>
          {renderContent()}
          {shareUrl ? (
            <button
              type="button"
              onClick={handleCopyShareUrl}
              className="btn-gradient mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition hover:opacity-90"
            >
              <Share2 className="size-4" />
              共有URLをコピー
            </button>
          ) : null}
      </div>

      {isExpanded ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,0,20,0.8)" }}
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl shadow-2xl"
            style={{ background: "#1e0d38", border: "1px solid rgba(255,77,141,0.25)" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b px-5 py-4 backdrop-blur" style={{ borderColor: "rgba(255,77,141,0.2)", background: "rgba(30,13,56,0.95)" }}>
              <div>
                <h2 className="text-base font-semibold" style={{ color: "#f0e6ff" }}>{title}</h2>
                <p className="mt-1 text-sm" style={{ color: "#b09fc8" }}>{description}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition hover:opacity-80"
                style={{ borderColor: "rgba(255,77,141,0.25)", background: "rgba(42,17,69,0.5)", color: "#e0d0f0" }}
              >
                閉じる
              </button>
            </div>
            <div className="p-5">
              {renderContent(true)}
              {shareUrl ? (
                <button
                  type="button"
                  onClick={handleCopyShareUrl}
                  className="btn-gradient mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:opacity-90"
                >
                  <Share2 className="size-4" />
                  共有URLをコピー
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}


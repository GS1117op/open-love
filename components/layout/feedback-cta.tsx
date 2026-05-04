"use client";

import Link from "next/link";
import { MessageSquareMore } from "lucide-react";
import { usePathname } from "next/navigation";

export function FeedbackCta() {
  const pathname = usePathname();

  if (pathname.startsWith("/feedback")) {
    return null;
  }

  return (
    <section
      className="mt-0"
      style={{ borderTop: "1px solid rgba(255, 77, 141, 0.15)" }}
    >
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
        <div
          className="flex flex-col items-start justify-between gap-4 px-5 py-6 sm:flex-row"
          style={{
            borderRadius: "20px",
            background: "rgba(42, 17, 69, 0.6)",
            border: "1px solid rgba(255, 77, 141, 0.2)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: "#f0e6ff" }}>
              ご意見・ご要望はこちら
            </p>
            <p className="mt-1 text-sm leading-6" style={{ color: "#b09fc8" }}>
              気になったことや改善アイデアがあれば、フォームから気軽に送れます。
            </p>
          </div>

          <Link
            href="/feedback"
            className="btn-gradient flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-semibold sm:w-auto"
          >
            <MessageSquareMore className="size-4" />
            ご意見・ご要望を送る
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { MessageSquareMore } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function FeedbackCta() {
  const pathname = usePathname();

  if (pathname.startsWith("/feedback")) {
    return null;
  }

  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
        <div className="flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-slate-200 bg-slate-50 px-5 py-6 text-left shadow-sm sm:flex-row">
          <div>
            <p className="text-sm font-semibold text-slate-900">ご意見・ご要望はこちら</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              気になったことや改善アイデアがあれば、フォームから気軽に送れます。
            </p>
          </div>

          <Button asChild className="h-12 w-full rounded-2xl sm:w-auto">
            <Link href="/feedback">
              <MessageSquareMore className="size-4" />
              ご意見・ご要望を送る
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

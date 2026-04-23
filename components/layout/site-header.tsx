import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-base font-semibold tracking-tight">
          OpenLove
        </Link>

        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/posts">投稿一覧</Link>
          </Button>
            <Button asChild variant="ghost" size="sm">
            <Link href="/feedback">ご意見・ご要望</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/submit">匿名投稿</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          東京の運搬・送迎
        </Link>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          <Link href="/pricing" className="text-muted-foreground hover:text-primary">
            料金
          </Link>
          <Link href="/areas" className="text-muted-foreground hover:text-primary">
            対応エリア
          </Link>
          <Link href="/cases" className="text-muted-foreground hover:text-primary">
            実績
          </Link>
          <Link href="/faq" className="text-muted-foreground hover:text-primary">
            FAQ
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-primary">
            お問い合わせ
          </Link>
        </nav>
        <Button asChild size="sm">
          <Link href="/pricing">見積もりへ</Link>
        </Button>
      </div>
    </header>
  );
}

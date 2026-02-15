import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function KaguLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/kagu" className="text-lg font-semibold">
            家具大型荷物運搬
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
          </nav>
          <Button asChild size="sm">
            <Link href="/kagu/quote">見積へ</Link>
          </Button>
        </div>
      </header>
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        <Button asChild size="lg">
          <Link href="/kagu/quote">見積へ</Link>
        </Button>
      </div>
      {children}
      <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>丁寧・清潔・安心の家具大型荷物運搬</div>
          <div className="flex gap-4">
            <Link href="/terms">利用規約</Link>
            <Link href="/privacy">プライバシー</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

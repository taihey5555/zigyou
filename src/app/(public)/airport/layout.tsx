import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AirportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/airport" className="text-lg font-semibold">
            空港送迎
          </Link>
          <nav className="hidden items-center gap-4 text-sm md:flex">
            <Link href="/pricing" className="text-slate-300 hover:text-white">
              料金
            </Link>
            <Link href="/areas" className="text-slate-300 hover:text-white">
              対応エリア
            </Link>
            <Link href="/cases" className="text-slate-300 hover:text-white">
              実績
            </Link>
            <Link href="/faq" className="text-slate-300 hover:text-white">
              FAQ
            </Link>
          </nav>
          <Button asChild size="sm" variant="secondary">
            <Link href="/airport/quote">見積へ</Link>
          </Button>
        </div>
      </header>
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        <Button asChild size="lg" variant="secondary">
          <Link href="/airport/quote">見積へ</Link>
        </Button>
      </div>
      {children}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>安心の空港送迎サービス</div>
          <div className="flex gap-4">
            <Link href="/terms">利用規約</Link>
            <Link href="/privacy">プライバシー</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

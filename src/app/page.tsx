"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold">
            東京の運搬・送迎
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/contact"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              お問い合わせ
            </Link>
            <Button asChild size="sm">
              <Link href="/pricing">料金を見る</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-2 text-slate-600"
              aria-label="メニューを開閉する"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y2="12" y1="12"></line>
                  <line x1="4" x2="20" y2="6" y1="6"></line>
                  <line x1="4" x2="20" y2="18" y1="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-full z-20 flex h-screen flex-col bg-white/95 p-6 backdrop-blur-lg md:hidden">
            <nav className="flex flex-col items-center gap-8 pt-8">
              <Link
                href="/contact"
                className="text-lg font-medium text-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                お問い合わせ
              </Link>
              <Button asChild size="lg" className="w-full max-w-xs">
                <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>
                  料金を見る
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <p className="text-sm font-semibold text-primary">
            丁寧・清潔・安心を徹底
          </p>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            東京の「家具大型荷物運搬」と
            <br />
            「空港送迎」を同じ品質で。
          </h1>
          <p className="text-muted-foreground">
            荒川区拠点の小回りと、全域対応の運用力。見積もりは最短当日。
            目的に合わせてサービスをお選びください。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/kagu">家具大型荷物運搬へ</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/airport">空港送迎へ</Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-2xl border-slate-200 p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-600">家具大型荷物運搬</div>
            <p className="mt-3 text-2xl font-semibold">引越し前後の大型家具も。</p>
            <p className="mt-3 text-sm text-muted-foreground">
              冷蔵庫・ソファ・ベッドなど大型荷物を丁寧に運搬します。
            </p>
            <Button asChild className="mt-6 w-full">
              <Link href="/kagu/quote">見積もり依頼</Link>
            </Button>
          </Card>
          <Card className="rounded-2xl border-slate-200 p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-600">空港送迎</div>
            <p className="mt-3 text-2xl font-semibold">早朝・深夜も相談可。</p>
            <p className="mt-3 text-sm text-muted-foreground">
              羽田・成田の送迎に対応。フライトに合わせて柔軟に。
            </p>
            <Button asChild className="mt-6 w-full" variant="secondary">
              <Link href="/airport/quote">見積もり依頼</Link>
            </Button>
          </Card>
        </div>
      </section>

      <section className="border-t bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-3">
          {[
            { title: "対応エリア", href: "/areas", text: "東京23区＋主要市" },
            { title: "料金目安", href: "/pricing", text: "3つのケースで解説" },
            { title: "実績一覧", href: "/cases", text: "直近の対応事例" },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-slate-200 p-5 transition hover:border-primary/50"
            >
              <div className="text-sm font-semibold text-slate-600">
                {item.title}
              </div>
              <div className="mt-2 text-lg font-semibold">{item.text}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const navLinks = [
  { href: "/pricing", label: "料金" },
  { href: "/areas", label: "対応エリア" },
  { href: "/faq", label: "よくある質問" },
  { href: "/contact", label: "お問い合わせ" },
];

const serviceCards = [
  {
    title: "家具・大型荷物運搬",
    badge: "人気",
    description:
      "大型家具1点から対応。養生・搬出入を丁寧に行い、安心して任せられる運搬を提供します。",
    features: ["大型家具1点からOK", "養生・搬出入まで一括対応", "即日相談に対応"],
    href: "/kagu/quote",
    cta: "家具運搬の見積もり",
  },
  {
    title: "空港送迎",
    badge: "早朝深夜対応",
    description:
      "羽田・成田への送迎に対応。フライト時刻に合わせて、スムーズに移動できるようサポートします。",
    features: ["羽田・成田に対応", "スーツケース積載対応", "フライト時刻に柔軟対応"],
    href: "/airport/quote",
    cta: "空港送迎の見積もり",
  },
];

const reasons = [
  {
    title: "即日相談OK",
    description: "お急ぎの依頼にもできる限り柔軟に対応します。",
  },
  {
    title: "明瞭な料金",
    description: "事前に見積もりを提示し、納得感ある料金で案内します。",
  },
  {
    title: "丁寧な対応",
    description: "搬出経路や荷物の状態に配慮しながら作業します。",
  },
  {
    title: "東京全域対応",
    description: "23区を中心に多摩エリアまで幅広くカバーします。",
  },
];

const areaBadges = [
  "新宿区",
  "渋谷区",
  "台東区",
  "墨田区",
  "目黒区",
  "世田谷区",
  "中野区",
  "杉並区",
  "八王子市",
  "立川市",
  "町田市",
];

const faqs = [
  {
    q: "見積もりは無料ですか？",
    a: "無料です。フォームまたはお問い合わせからご依頼ください。",
  },
  {
    q: "当日の依頼にも対応できますか？",
    a: "空き状況により対応可能です。まずはご相談ください。",
  },
  {
    q: "夜間・早朝の空港送迎は可能ですか？",
    a: "可能です。フライト時刻に合わせて調整します。",
  },
];

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            HAYAKU
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                {link.label}
              </Link>
            ))}
            <Button asChild size="sm">
              <Link href="/kagu/quote">見積もり依頼</Link>
            </Button>
          </nav>
          <button
            className="rounded-md border px-2 py-1 text-sm md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="メニュー"
          >
            MENU
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t bg-background px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2 w-full">
                <Link href="/kagu/quote" onClick={() => setMobileOpen(false)}>
                  見積もり依頼
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-100 to-transparent" />
          <div className="relative mx-auto max-w-6xl px-4 text-center">
            <p className="text-sm font-semibold tracking-wide text-muted-foreground">東京全域対応</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              東京の家具運搬・空港送迎を、
              <br />
              丁寧かつ迅速に
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              大型家具の運搬から空港送迎まで、状況に合わせた最適な対応でスムーズな移動をサポートします。
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/kagu/quote">家具運搬の見積もり</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/airport/quote">空港送迎の見積もり</Link>
              </Button>
            </div>
            <div className="mt-4">
              <Link href="/contact" className="text-sm text-muted-foreground underline">
                お問い合わせ
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold">サービス</h2>
              <p className="mt-2 text-sm text-muted-foreground">用途に合わせて2つのプランを用意しています。</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {serviceCards.map((s) => (
                <Card key={s.title} className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{s.title}</h3>
                    <Badge variant="secondary">{s.badge}</Badge>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{s.description}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {s.features.map((f) => (
                      <li key={f}>- {f}</li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full">
                    <Link href={s.href}>{s.cta}</Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold">選ばれる理由</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((r) => (
                <Card key={r.title} className="p-5 text-center">
                  <h3 className="text-lg font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-2xl border p-6">
              <h2 className="text-xl font-bold">料金目安</h2>
              <p className="mt-2 text-sm text-muted-foreground">事前見積もりで明瞭にご案内します。</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">家具1点運搬</p>
                  <p className="mt-1 text-2xl font-bold">5,500円〜</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">羽田送迎</p>
                  <p className="mt-1 text-2xl font-bold">8,800円〜</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">成田送迎</p>
                  <p className="mt-1 text-2xl font-bold">18,000円〜</p>
                </Card>
              </div>
              <Button asChild variant="outline" className="mt-5">
                <Link href="/pricing">料金ページへ</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-2xl font-bold">対応エリア</h2>
            <p className="mt-2 text-sm text-muted-foreground">東京23区を中心に多摩エリアまで対応しています。</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {areaBadges.map((a) => (
                <Badge key={a} variant="secondary">
                  {a}
                </Badge>
              ))}
              <Badge variant="outline">ほか都内全域</Badge>
            </div>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/areas">エリア一覧へ</Link>
            </Button>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-center text-2xl font-bold">よくある質問</h2>
            <div className="mt-6 space-y-3">
              {faqs.map((item) => (
                <details key={item.q} className="rounded-lg border p-4">
                  <summary className="cursor-pointer font-medium">{item.q}</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/faq">FAQを見る</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-primary-foreground">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-2xl font-bold">まずは見積もり依頼から</h2>
            <p className="mt-3 text-primary-foreground/80">希望日時や荷物情報を送るだけで、すぐにご案内します。</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/kagu/quote">家具運搬の見積もり</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/airport/quote">空港送迎の見積もり</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} HAYAKU</p>
          <div className="flex gap-4">
            <Link href="/terms">利用規約</Link>
            <Link href="/privacy">プライバシーポリシー</Link>
            <Link href="/contact">お問い合わせ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

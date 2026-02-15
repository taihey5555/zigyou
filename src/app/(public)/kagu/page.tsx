import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function KaguPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-2">
        <div className="space-y-5">
          <Badge variant="secondary">家具大型荷物運搬</Badge>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            大型家具も、丁寧・清潔・安心で。
          </h1>
          <p className="text-muted-foreground">
            冷蔵庫・洗濯機・ソファ・ベッドなどの大型荷物を安全に運搬。養生・積み込みまで
            しっかり対応します。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/kagu/quote">見積もり依頼</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">相談する</Link>
            </Button>
          </div>
        </div>
        <Card className="rounded-2xl border-slate-200 p-6">
          <h2 className="text-lg font-semibold">料金目安 3例</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>冷蔵庫1台 + 段ボール5箱：12,000円〜</li>
            <li>2LDK相当（家具中心）：32,000円〜</li>
            <li>ベッド + ソファ + 洗濯機：18,000円〜</li>
          </ul>
          <Button asChild className="mt-6 w-full">
            <Link href="/pricing">料金ページを見る</Link>
          </Button>
        </Card>
      </section>

      <section className="border-t bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2">
          <Card className="rounded-2xl border-slate-200 p-6">
            <h3 className="text-lg font-semibold">できること</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>大型家具の安全な搬出入</li>
              <li>養生・床保護の徹底</li>
              <li>階段作業・狭小通路の相談</li>
            </ul>
          </Card>
          <Card className="rounded-2xl border-slate-200 p-6">
            <h3 className="text-lg font-semibold">できないこと</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>危険物・法令で禁止された荷物</li>
              <li>車種指定・特殊搬入の即日対応</li>
              <li>住所の事前公開（確定後にご案内）</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">ご利用の流れ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              "フォームで見積依頼",
              "担当者から確認連絡",
              "日程・料金の確定",
              "当日対応・完了",
            ].map((step, idx) => (
              <Card key={step} className="rounded-2xl border-slate-200 p-5">
                <div className="text-sm text-muted-foreground">Step {idx + 1}</div>
                <div className="mt-2 font-semibold">{step}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">よくある質問</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "急ぎの依頼でも対応できますか？",
                a: "空き状況によりますが、最短当日で調整します。",
              },
              {
                q: "階段作業は追加料金ですか？",
                a: "荷物量と階数により追加となる場合があります。",
              },
            ].map((item) => (
              <Card key={item.q} className="rounded-2xl border-slate-200 p-5">
                <div className="font-semibold">{item.q}</div>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold">まずは見積もりから。</h2>
          <p className="text-sm text-slate-200">
            詳細は確認後にご案内。ご相談だけでも歓迎です。
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/kagu/quote">見積もり依頼</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

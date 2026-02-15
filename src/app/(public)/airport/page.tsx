import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AirportPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-2">
        <div className="space-y-5">
          <Badge variant="secondary">空港送迎</Badge>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            フライトに合わせた、安心送迎。
          </h1>
          <p className="text-slate-300">
            羽田・成田の送迎を丁寧に。時間帯や荷物量に合わせて柔軟に対応します。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/airport/quote">見積もり依頼</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">相談する</Link>
            </Button>
          </div>
        </div>
        <Card className="rounded-2xl border-slate-800 bg-slate-900/60 p-6 text-slate-100">
          <h2 className="text-lg font-semibold">料金目安 3例</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>荒川区 → 羽田空港：12,000円〜</li>
            <li>新宿区 → 成田空港：18,000円〜</li>
            <li>羽田空港 → 都内ホテル：11,000円〜</li>
          </ul>
          <Button asChild className="mt-6 w-full" variant="secondary">
            <Link href="/pricing">料金ページを見る</Link>
          </Button>
        </Card>
      </section>

      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2">
          <Card className="rounded-2xl border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold">できること</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>早朝・深夜の送迎相談</li>
              <li>スーツケース複数対応</li>
              <li>フライト遅延への柔軟対応</li>
            </ul>
          </Card>
          <Card className="rounded-2xl border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold">できないこと</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>車種指定の確約</li>
              <li>危険物・大型機材の即日対応</li>
              <li>住所の事前公開（確定後にご案内）</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">ご利用の流れ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              "フォームで見積依頼",
              "担当者から確認連絡",
              "日程・料金の確定",
              "当日送迎・完了",
            ].map((step, idx) => (
              <Card key={step} className="rounded-2xl border-slate-800 bg-slate-900/60 p-5">
                <div className="text-sm text-slate-400">Step {idx + 1}</div>
                <div className="mt-2 font-semibold">{step}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">よくある質問</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "フライト情報が未確定でも依頼できますか？",
                a: "はい。確定後に便名を共有いただければOKです。",
              },
              {
                q: "深夜料金はかかりますか？",
                a: "時間帯により調整する場合があります。見積時に提示します。",
              },
            ].map((item) => (
              <Card key={item.q} className="rounded-2xl border-slate-800 bg-slate-900/60 p-5">
                <div className="font-semibold">{item.q}</div>
                <p className="mt-2 text-sm text-slate-300">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold">送迎のご相談はこちら。</h2>
          <p className="text-sm text-slate-300">
            希望日時が決まっていなくてもご相談ください。
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/airport/quote">見積もり依頼</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

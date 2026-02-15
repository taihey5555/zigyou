import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ImageUploader } from "@/components/forms/image-uploader";
import { airportQuoteAction } from "./actions";

type PageProps = {
  searchParams?: { submitted?: string; error?: string };
};

export default function AirportQuotePage({ searchParams }: PageProps) {
  const submitted = searchParams?.submitted === "1";
  const error = searchParams?.error ? decodeURIComponent(searchParams.error) : "";

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-slate-50">
      <div className="mb-6">
        <Link href="/airport" className="text-sm text-slate-300">
          ← 空港送迎へ戻る
        </Link>
        <h1 className="mt-3 text-2xl font-semibold">見積もりフォーム</h1>
        <p className="mt-2 text-sm text-slate-300">
          必須項目をご入力ください。写真は任意です。
        </p>
      </div>

      {submitted && (
        <Card className="mb-6 border-green-500/40 bg-green-950/60 p-4 text-sm text-green-200">
          送信が完了しました。担当者よりご連絡いたします。
        </Card>
      )}
      {error && (
        <Card className="mb-6 border-red-500/40 bg-red-950/60 p-4 text-sm text-red-200">
          {error}
        </Card>
      )}

      <form action={airportQuoteAction} className="space-y-8">
        <Card className="border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold">ご依頼内容</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <select
              name="airport"
              className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-200"
            >
              <option value="haneda">羽田空港</option>
              <option value="narita">成田空港</option>
            </select>
            <Input name="terminal" placeholder="ターミナル（任意）" />
            <Input name="flight_number" placeholder="便名（推奨）" />
            <Input name="passengers" placeholder="人数（必須）" type="number" min="1" required />
            <Input name="suitcases" placeholder="スーツケース数" type="number" min="0" />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Input name="pickup_address" placeholder="乗車場所（必須）" required />
            <Input name="dropoff_address" placeholder="降車場所（必須）" required />
          </div>
          <Textarea
            name="note"
            placeholder="迎車時刻や待ち合わせ場所の補足（任意）"
            className="mt-4"
          />
        </Card>

        <Card className="border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold">希望日時（第1〜第3）</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Input name="date1" type="date" required />
              <Input name="time1_from" type="time" />
              <Input name="time1_to" type="time" />
            </div>
            <div className="space-y-2">
              <Input name="date2" type="date" />
              <Input name="time2_from" type="time" />
              <Input name="time2_to" type="time" />
            </div>
            <div className="space-y-2">
              <Input name="date3" type="date" />
              <Input name="time3_from" type="time" />
              <Input name="time3_to" type="time" />
            </div>
          </div>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold">連絡先</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Input name="name" placeholder="お名前（必須）" required />
            <Input name="phone" placeholder="電話番号（必須）" required />
            <Input name="email" placeholder="メールアドレス（必須）" type="email" required />
          </div>
        </Card>

        <Card className="border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-semibold">写真（任意）</h2>
          <div className="mt-4">
            <ImageUploader
              bucket="inquiry-photos"
              prefix="airport"
              name="photo_paths"
              maxFiles={5}
            />
          </div>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" size="lg" variant="secondary">
            送信する
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">相談だけしたい</Link>
          </Button>
        </div>
      </form>
    </main>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ImageUploader } from "@/components/forms/image-uploader";
import { kaguQuoteAction } from "./actions";

type PageProps = {
  searchParams?: { submitted?: string; error?: string };
};

export default function KaguQuotePage({ searchParams }: PageProps) {
  const submitted = searchParams?.submitted === "1";
  const error = searchParams?.error ? decodeURIComponent(searchParams.error) : "";

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-6">
        <Link href="/kagu" className="text-sm text-muted-foreground">
          ← 家具大型荷物運搬へ戻る
        </Link>
        <h1 className="mt-3 text-2xl font-semibold">見積もりフォーム</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          必須項目をご入力ください。写真は最大5枚まで添付可能です。
        </p>
      </div>

      {submitted && (
        <Card className="mb-6 border-green-200 bg-green-50 p-4 text-sm text-green-800">
          送信が完了しました。担当者よりご連絡いたします。
        </Card>
      )}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </Card>
      )}

      <form action={kaguQuoteAction} className="space-y-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">ご依頼内容</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Input name="pickup_address" placeholder="集荷住所（必須）" required />
            <Input name="dropoff_address" placeholder="配送住所（必須）" required />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Input name="item_fridge" placeholder="冷蔵庫 (個数)" type="number" min="0" />
            <Input name="item_washer" placeholder="洗濯機 (個数)" type="number" min="0" />
            <Input name="item_sofa" placeholder="ソファ (個数)" type="number" min="0" />
            <Input name="item_bed" placeholder="ベッド (個数)" type="number" min="0" />
            <Input name="item_box" placeholder="段ボール (個数)" type="number" min="0" />
            <Input name="item_other" placeholder="その他 (個数)" type="number" min="0" />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Input name="floor" placeholder="階数（例: 3）" type="number" min="0" />
            <select
              name="has_elevator"
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
            >
              <option value="false">EVなし</option>
              <option value="true">EVあり</option>
            </select>
            <select
              name="parking_available"
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
            >
              <option value="true">駐車可</option>
              <option value="false">駐車不可</option>
            </select>
          </div>
          <Textarea
            name="note"
            placeholder="補足事項（任意）"
            className="mt-4"
          />
        </Card>

        <Card className="p-6">
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

        <Card className="p-6">
          <h2 className="text-lg font-semibold">連絡先</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Input name="name" placeholder="お名前（必須）" required />
            <Input name="phone" placeholder="電話番号（必須）" required />
            <Input name="email" placeholder="メールアドレス（必須）" type="email" required />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">荷物写真（任意）</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            最大5枚まで添付可能です。
          </p>
          <div className="mt-4">
            <ImageUploader
              bucket="inquiry-photos"
              prefix={`kagu/${Date.now()}`}
              name="photo_paths"
              maxFiles={5}
            />
          </div>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" size="lg">
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

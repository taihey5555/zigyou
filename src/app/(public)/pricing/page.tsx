import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold">料金目安</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        実際の料金は荷物量・距離・時間帯で変動します。詳細は見積時に提示します。
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "家具大型荷物",
            price: "12,000円〜",
            note: "冷蔵庫1台 + 段ボール5箱",
          },
          {
            title: "家具大型荷物",
            price: "18,000円〜",
            note: "ベッド + ソファ + 洗濯機",
          },
          {
            title: "空港送迎",
            price: "11,000円〜",
            note: "羽田空港 → 都内ホテル",
          },
        ].map((item) => (
          <Card key={item.note} className="p-6">
            <div className="text-sm text-muted-foreground">{item.title}</div>
            <div className="mt-3 text-2xl font-semibold">{item.price}</div>
            <p className="mt-2 text-sm text-muted-foreground">{item.note}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/kagu/quote">家具の見積へ</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/airport/quote">空港送迎の見積へ</Link>
        </Button>
      </div>
    </main>
  );
}

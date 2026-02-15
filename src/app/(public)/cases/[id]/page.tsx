import Link from "next/link";
import { fetchCaseById, fetchCases } from "@/lib/data";
import { Card } from "@/components/ui/card";

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  const cases = await fetchCases();
  return cases.map((item) => ({ id: item.id }));
}

export default async function CaseDetailPage({ params }: Props) {
  const item = await fetchCaseById(params.id);
  if (!item) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p>実績が見つかりませんでした。</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-xs text-muted-foreground">
        {item.type === "kagu" ? "家具大型荷物運搬" : "空港送迎"}
      </div>
      <h1 className="mt-2 text-3xl font-semibold">{item.title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">{item.body}</p>
      {item.area_slug && (
        <Link
          href={`/areas/${item.area_slug}`}
          className="mt-4 inline-block text-sm text-primary"
        >
          対応エリアを見る
        </Link>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-semibold">関連リンク</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Card className="p-4">
            <Link href="/kagu/quote" className="font-semibold">
              家具の見積もり
            </Link>
            <div className="mt-2 text-sm text-muted-foreground">
              大型家具・家電のご相談はこちら
            </div>
          </Card>
          <Card className="p-4">
            <Link href="/airport/quote" className="font-semibold">
              空港送迎の見積もり
            </Link>
            <div className="mt-2 text-sm text-muted-foreground">
              羽田・成田の送迎はお任せください
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}

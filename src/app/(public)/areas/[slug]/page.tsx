import Link from "next/link";
import { fetchAreaBySlug, fetchAreas, fetchCases } from "@/lib/data";
import { Card } from "@/components/ui/card";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const areas = await fetchAreas();
  return areas.map((area) => ({ slug: area.slug }));
}

export default async function AreaDetailPage({ params }: Props) {
  const area = await fetchAreaBySlug(params.slug);
  if (!area) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p>該当エリアが見つかりませんでした。</p>
      </main>
    );
  }
  const cases = await fetchCases();
  const related = cases.filter((item) => item.area_slug === area.slug);

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold">{area.name}の対応</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {area.description?.trim() ||
          `${area.name}エリアの家具大型荷物運搬・空港送迎に対応しています。`}
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">関連実績</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {related.length === 0 && (
            <Card className="p-4 text-sm text-muted-foreground">
              実績は準備中です。
            </Card>
          )}
          {related.map((item) => (
            <Card key={item.id} className="p-5">
              <div className="text-xs text-muted-foreground">
                {item.type === "kagu" ? "家具大型荷物運搬" : "空港送迎"}
              </div>
              <div className="mt-2 font-semibold">{item.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              <Link href={`/cases/${item.id}`} className="mt-3 inline-block text-sm text-primary">
                詳細を見る
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

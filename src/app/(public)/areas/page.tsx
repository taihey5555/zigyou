import Link from "next/link";
import { fetchAreas } from "@/lib/data";
import { Card } from "@/components/ui/card";

const groupLabel: Record<string, string> = {
  "23ku-east": "23区 東部",
  "23ku-west": "23区 西部",
  tama: "多摩エリア",
};

export default async function AreasPage() {
  const areas = await fetchAreas();
  const groups = areas.reduce<Record<string, typeof areas>>((acc, area) => {
    acc[area.group] = acc[area.group] ?? [];
    acc[area.group].push(area);
    return acc;
  }, {});

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold">対応エリア</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        東京23区＋主要市に対応。詳細はエリアページをご確認ください。
      </p>

      <div className="mt-8 space-y-6">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <div className="text-sm font-semibold text-muted-foreground">
              {groupLabel[group] ?? group}
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {items.map((area) => (
                <Card key={area.slug} className="p-4">
                  <Link href={`/areas/${area.slug}`} className="font-semibold">
                    {area.name}
                  </Link>
                  <div className="mt-2 text-xs text-muted-foreground">
                    家具大型荷物運搬 / 空港送迎
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

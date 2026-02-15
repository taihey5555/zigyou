import Link from "next/link";
import { fetchCases } from "@/lib/data";
import { Card } from "@/components/ui/card";

type SearchParams = {
  type?: "kagu" | "airport";
};

export default async function CasesPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const cases = await fetchCases();
  const filtered = searchParams?.type
    ? cases.filter((item) => item.type === searchParams.type)
    : cases;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold">実績</h1>
      <div className="mt-4 flex gap-3 text-sm">
        <Link href="/cases" className="text-muted-foreground hover:text-primary">
          すべて
        </Link>
        <Link
          href="/cases?type=kagu"
          className="text-muted-foreground hover:text-primary"
        >
          家具大型荷物運搬
        </Link>
        <Link
          href="/cases?type=airport"
          className="text-muted-foreground hover:text-primary"
        >
          空港送迎
        </Link>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="text-xs text-muted-foreground">
              {item.type === "kagu" ? "家具大型荷物運搬" : "空港送迎"}
            </div>
            <div className="mt-2 text-lg font-semibold">{item.title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            <Link href={`/cases/${item.id}`} className="mt-3 inline-block text-sm text-primary">
              詳細を見る
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}

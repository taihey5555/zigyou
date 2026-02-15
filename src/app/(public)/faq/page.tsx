import { Card } from "@/components/ui/card";

const faqKagu = [
  {
    q: "急ぎの依頼でも対応できますか？",
    a: "空き状況によりますが、最短当日で調整します。",
  },
  {
    q: "階段作業は追加料金ですか？",
    a: "荷物量・階数により追加となる場合があります。",
  },
  {
    q: "梱包はお願いできますか？",
    a: "一部サポート可能です。詳細は見積時に確認します。",
  },
];

const faqAirport = [
  {
    q: "便名が未確定でも依頼できますか？",
    a: "はい。確定後に共有いただければOKです。",
  },
  {
    q: "深夜料金はかかりますか？",
    a: "時間帯により調整する場合があります。",
  },
  {
    q: "同乗者が増えても対応できますか？",
    a: "人数により車両調整が必要なため、早めにご相談ください。",
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold">FAQ</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        家具運搬・空港送迎に関するよくある質問をまとめました。
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">家具大型荷物運搬</h2>
        <div className="mt-4 grid gap-3">
          {faqKagu.map((item) => (
            <Card key={item.q} className="p-4">
              <details>
                <summary className="cursor-pointer font-semibold">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </details>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">空港送迎</h2>
        <div className="mt-4 grid gap-3">
          {faqAirport.map((item) => (
            <Card key={item.q} className="p-4">
              <details>
                <summary className="cursor-pointer font-semibold">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </details>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

type Props = {
  type: "kagu" | "airport";
  name: string;
  pickup: string;
  dropoff: string;
  datetimeCandidates: string[];
};

export function QuoteReceivedCustomerEmail({
  type,
  name,
  pickup,
  dropoff,
  datetimeCandidates,
}: Props) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: 1.6 }}>
      <p>{name} 様</p>
      <p>お問い合わせありがとうございます。担当者より折り返しご連絡いたします。</p>
      <hr />
      <p>サービス: {type === "kagu" ? "家具大型荷物運搬" : "空港送迎"}</p>
      <p>集荷: {pickup}</p>
      <p>配送: {dropoff}</p>
      <p>日時候補: {datetimeCandidates.join(" / ")}</p>
      <p>※住所などの詳細は確認後にご案内いたします。</p>
    </div>
  );
}

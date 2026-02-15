type Props = {
  type: "kagu" | "airport";
  name: string;
  phone: string;
  email: string;
  pickup: string;
  dropoff: string;
  datetimeCandidates: string[];
  summary: string;
  adminUrl: string;
};

export function QuoteReceivedAdminEmail({
  type,
  name,
  phone,
  email,
  pickup,
  dropoff,
  datetimeCandidates,
  summary,
  adminUrl,
}: Props) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: 1.6 }}>
      <p>新規問い合わせが届きました。</p>
      <hr />
      <p>サービス: {type === "kagu" ? "家具大型荷物運搬" : "空港送迎"}</p>
      <p>氏名: {name}</p>
      <p>電話: {phone}</p>
      <p>メール: {email}</p>
      <p>集荷: {pickup}</p>
      <p>配送: {dropoff}</p>
      <p>日時候補: {datetimeCandidates.join(" / ")}</p>
      <p>概要:</p>
      <pre style={{ whiteSpace: "pre-wrap", background: "#f8fafc", padding: 8 }}>
        {summary}
      </pre>
      <p>管理画面: {adminUrl}</p>
    </div>
  );
}

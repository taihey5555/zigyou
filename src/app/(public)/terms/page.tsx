export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold">利用規約</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        本規約は、当サービスの提供条件および利用者の権利義務関係を定めるものです。
      </p>
      <div className="mt-6 space-y-4 text-sm text-muted-foreground">
        <p>第1条（適用）本規約は、利用者と当サービスの利用に関わる一切に適用します。</p>
        <p>
          第2条（禁止事項）法令違反、危険物の運搬依頼、虚偽情報の申告等を禁止します。
        </p>
        <p>
          第3条（免責）天災・交通事情など不可抗力による遅延・中止について責任を負いません。
        </p>
        <p>
          第4条（料金）料金は見積もり時に提示し、合意のうえ確定します。
        </p>
        <p>第5条（改定）必要に応じて本規約を改定することがあります。</p>
      </div>
    </main>
  );
}

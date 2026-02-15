export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold">プライバシーポリシー</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        当サービスは、取得した個人情報を適切に管理し、以下の目的で利用します。
      </p>
      <div className="mt-6 space-y-4 text-sm text-muted-foreground">
        <p>1. お問い合わせ・見積もりへの対応</p>
        <p>2. サービス提供に必要な連絡</p>
        <p>3. サービス品質向上のための分析</p>
        <p>
          個人情報は法令に基づく場合を除き、本人の同意なく第三者へ提供しません。
        </p>
        <p>お問い合わせ窓口: フォームよりご連絡ください。</p>
      </div>
    </main>
  );
}

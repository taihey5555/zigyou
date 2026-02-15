# 東京運搬・空港送迎 MVP

Next.js(App Router) + Supabase + Resend を使った MVP 実装です。  
家具大型荷物運搬(`/kagu`)と空港送迎(`/airport`)の2サービスを同一基盤で運用できます。

## 構成
- Next.js (App Router) / TypeScript / TailwindCSS
- Supabase: DB / Auth / Storage
- Resend: 自動返信メール

## ローカル起動
```bash
npm install
npm run dev
```

## 環境変数
`.env.example` を参考に `.env.local` を作成してください。

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
FROM_EMAIL=
ADMIN_EMAIL=
ADMIN_EMAILS=
NEXT_PUBLIC_SITE_URL=
```

## Supabase セットアップ
1. Supabase プロジェクト作成
2. SQL Editor で `supabase/schema.sql` を実行
3. SQL Editor で `supabase/seed.sql` を実行
4. Storage バケット作成
   - `inquiry-photos` (private)
   - `case-images` (public)
5. 管理者メール登録
```sql
insert into admin_emails (email) values ('admin@example.com');
```

## Resend セットアップ
1. Resend で API Key 発行
2. 送信元ドメインを検証
3. `.env.local` に以下を設定
```
RESEND_API_KEY=...
FROM_EMAIL=...
ADMIN_EMAIL=...
```

## 管理者ログイン
1. Supabase Auth で管理者ユーザーを作成（メール＋パスワード）
2. `/admin/login` からログイン

## 主要ルート
- `/` トップ
- `/kagu` 家具大型荷物運搬LP
- `/airport` 空港送迎LP
- `/pricing` 料金
- `/areas` / `/areas/[slug]` 対応エリア
- `/cases` / `/cases/[id]` 実績
- `/faq`
- `/contact`
- `/terms` / `/privacy`
- `/admin/*` 管理画面

## メモ
- 見積フォームの写真は **private バケット**に保存し、DBにはパスのみ保存します。
- 管理画面での閲覧は **signed URL** を利用します。

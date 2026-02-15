import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { submitContact } from "./actions";

type PageProps = {
  searchParams?: { submitted?: string; error?: string };
};

export default function ContactPage({ searchParams }: PageProps) {
  const submitted = searchParams?.submitted === "1";
  const error = searchParams?.error ? decodeURIComponent(searchParams.error) : "";

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">お問い合わせ</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        サービスに関するご相談やご質問はこちらからお送りください。
      </p>

      {submitted && (
        <Card className="mt-6 border-green-200 bg-green-50 p-4 text-sm text-green-800">
          送信が完了しました。担当者よりご連絡いたします。
        </Card>
      )}
      {error && (
        <Card className="mt-6 border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </Card>
      )}

      <form action={submitContact} className="mt-6 space-y-6">
        <Card className="p-6">
          <div className="grid gap-4">
            <Input name="name" placeholder="お名前（必須）" required />
            <Input name="email" placeholder="メールアドレス（必須）" required type="email" />
            <Textarea name="message" placeholder="お問い合わせ内容（必須）" required />
          </div>
        </Card>
        <Button type="submit" size="lg">
          送信する
        </Button>
      </form>
    </main>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-semibold">ページが見つかりません</h1>
      <p className="text-sm text-muted-foreground">
        お探しのページは削除されたか、URLが変更された可能性があります。
      </p>
      <Button asChild>
        <Link href="/">トップへ戻る</Link>
      </Button>
    </main>
  );
}

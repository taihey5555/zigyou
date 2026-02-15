"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-semibold">エラーが発生しました</h1>
      <p className="text-sm text-muted-foreground">
        お手数ですが、時間をおいて再度お試しください。
      </p>
      <Button asChild>
        <Link href="/">トップへ戻る</Link>
      </Button>
    </main>
  );
}

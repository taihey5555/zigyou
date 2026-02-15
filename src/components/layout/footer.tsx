import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>丁寧・清潔・安心の運搬・送迎サービス</div>
        <div className="flex gap-4">
          <Link href="/terms">利用規約</Link>
          <Link href="/privacy">プライバシー</Link>
        </div>
      </div>
    </footer>
  );
}

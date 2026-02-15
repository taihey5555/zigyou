import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "東京の家具大型荷物運搬・空港送迎 | 丁寧清潔安心",
  description:
    "東京都内の家具大型荷物運搬と空港送迎を同一基盤で。丁寧・清潔・安心の対応で、見積もりは最短当日。",
  openGraph: {
    title: "東京の家具大型荷物運搬・空港送迎 | 丁寧清潔安心",
    description:
      "東京都内の家具大型荷物運搬と空港送迎を同一基盤で。丁寧・清潔・安心の対応で、見積もりは最短当日。",
    images: ["/og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}

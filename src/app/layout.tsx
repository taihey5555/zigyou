import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "東京の家具大型荷物運搬・空港送迎 | 丁寧配送",
  description:
    "東京都内の家具大型荷物運搬と空港送迎に対応。丁寧・迅速な対応で、見積もり依頼も最短当日対応。",
  openGraph: {
    title: "東京の家具大型荷物運搬・空港送迎 | 丁寧配送",
    description:
      "東京都内の家具大型荷物運搬と空港送迎に対応。丁寧・迅速な対応で、見積もり依頼も最短当日対応。",
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

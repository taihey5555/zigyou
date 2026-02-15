import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin } = await requireAdminUser();
  if (!user) {
    redirect("/admin/login");
  }
  if (!isAdmin) {
    redirect("/admin/login?error=forbidden");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-lg font-semibold">管理画面</div>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/admin/inquiries">問い合わせ</Link>
            <Link href="/admin/cases">実績</Link>
          </nav>
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

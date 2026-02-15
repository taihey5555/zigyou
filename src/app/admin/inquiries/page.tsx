import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SearchParams = {
  status?: string;
  type?: string;
};

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const supabase = createSupabaseServerClient();
  let query = supabase
    .from("inquiries")
    .select("id,type,name,status,created_at,estimated_price")
    .order("created_at", { ascending: false });

  if (searchParams?.status) {
    query = query.eq("status", searchParams.status);
  }
  if (searchParams?.type) {
    query = query.eq("type", searchParams.type);
  }

  const { data } = await query;

  return (
    <div>
      <h1 className="text-2xl font-semibold">問い合わせ一覧</h1>
      <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
        <Link href="/admin/inquiries">すべて</Link>
        <Link href="/admin/inquiries?type=kagu">家具</Link>
        <Link href="/admin/inquiries?type=airport">空港</Link>
        <Link href="/admin/inquiries?status=new">新規</Link>
        <Link href="/admin/inquiries?status=confirmed">確定</Link>
      </div>
      <div className="mt-6 rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>種別</TableHead>
              <TableHead>氏名</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>日時</TableHead>
              <TableHead>見積</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Link href={`/admin/inquiries/${item.id}`} className="text-primary">
                    {item.type === "kagu" ? "家具" : "空港"}
                  </Link>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {new Date(item.created_at).toLocaleString("ja-JP")}
                </TableCell>
                <TableCell>
                  {item.estimated_price ? `${item.estimated_price}円` : "-"}
                </TableCell>
              </TableRow>
            ))}
            {data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  データがありません。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

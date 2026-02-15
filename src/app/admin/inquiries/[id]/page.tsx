import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
} from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateInquiry } from "./actions";

type Props = {
  params: { id: string };
  searchParams?: { saved?: string };
};

export default async function AdminInquiryDetailPage({
  params,
  searchParams,
}: Props) {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) {
    return <div>データが見つかりませんでした。</div>;
  }

  const service = createSupabaseServiceClient();
  const photoPaths = (data.photo_urls ?? []) as string[];
  const signedUrls: string[] = [];
  for (const path of photoPaths) {
    const { data: signed } = await service.storage
      .from("inquiry-photos")
      .createSignedUrl(path, 60 * 60);
    if (signed?.signedUrl) {
      signedUrls.push(signed.signedUrl);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">問い合わせ詳細</h1>
      {searchParams?.saved === "1" && (
        <Card className="mt-4 border-green-200 bg-green-50 p-3 text-sm text-green-800">
          更新しました。
        </Card>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">基本情報</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div>種別: {data.type}</div>
            <div>氏名: {data.name}</div>
            <div>電話: {data.phone}</div>
            <div>メール: {data.email}</div>
            <div>集荷: {data.pickup_address}</div>
            <div>配送: {data.dropoff_address}</div>
            <div>日時候補: {JSON.stringify(data.datetime_candidates)}</div>
            <div>payload: {JSON.stringify(data.payload)}</div>
          </div>
        </Card>

        <Card className="p-6">
          <form action={updateInquiry.bind(null, params.id)} className="space-y-4">
            <h2 className="text-lg font-semibold">ステータス更新</h2>
            <select
              name="status"
              defaultValue={data.status}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
            >
              <option value="new">new</option>
              <option value="contacted">contacted</option>
              <option value="confirmed">confirmed</option>
              <option value="done">done</option>
              <option value="canceled">canceled</option>
            </select>
            <Input
              name="estimated_price"
              type="number"
              placeholder="見積金額"
              defaultValue={data.estimated_price ?? ""}
            />
            <Input
              name="final_price"
              type="number"
              placeholder="確定金額"
              defaultValue={data.final_price ?? ""}
            />
            <Textarea
              name="admin_note"
              placeholder="管理メモ"
              defaultValue={data.admin_note ?? ""}
            />
            <Button type="submit">更新する</Button>
          </form>
        </Card>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">添付写真</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {signedUrls.length === 0 && (
            <Card className="p-4 text-sm text-muted-foreground">
              写真はありません。
            </Card>
          )}
          {signedUrls.map((url) => (
            <Card key={url} className="overflow-hidden">
              <img src={url} alt="photo" className="h-40 w-full object-cover" />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

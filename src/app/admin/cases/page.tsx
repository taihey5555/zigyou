import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/forms/image-uploader";
import { createCase } from "./actions";

type SearchParams = {
  created?: string;
};

export default async function AdminCasesPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const supabase = await createSupabaseServerClient();
  const { data: cases } = await supabase
    .from("cases")
    .select("*")
    .order("created_at", { ascending: false });
  const { data: areas } = await supabase.from("areas").select("slug,name");

  const service = createSupabaseServiceClient();
  const thumbnails =
    cases?.map((item) => {
      const first = (item.image_urls ?? [])[0] as string | undefined;
      if (!first) return { id: item.id, url: "" };
      const { data } = service.storage.from("case-images").getPublicUrl(first);
      return { id: item.id, url: data.publicUrl };
    }) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">実績管理</h1>
        {searchParams?.created === "1" && (
          <Card className="mt-4 border-green-200 bg-green-50 p-3 text-sm text-green-800">
            実績を作成しました。
          </Card>
        )}
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold">新規作成</h2>
        <form action={createCase} className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="title" placeholder="タイトル" required />
            <select
              name="type"
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
              required
            >
              <option value="kagu">家具大型荷物運搬</option>
              <option value="airport">空港送迎</option>
            </select>
          </div>
          <Textarea name="body" placeholder="本文" required />
          <select
            name="area_slug"
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="">エリア（任意）</option>
            {areas?.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
          <div>
            <div className="text-sm font-medium">画像</div>
            <div className="mt-2">
              <ImageUploader
                bucket="case-images"
                prefix="cases"
                name="image_paths"
                maxFiles={5}
              />
            </div>
          </div>
          <Button type="submit">作成する</Button>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {cases?.map((item) => {
          const thumb = thumbnails.find((t) => t.id === item.id)?.url;
          return (
            <Card key={item.id} className="p-5">
              {thumb ? (
                <img src={thumb} alt={item.title} className="mb-3 h-40 w-full rounded-lg object-cover" />
              ) : (
                <div className="mb-3 h-40 rounded-lg bg-slate-100" />
              )}
              <div className="text-xs text-muted-foreground">
                {item.type === "kagu" ? "家具大型荷物運搬" : "空港送迎"}
              </div>
              <div className="mt-2 font-semibold">{item.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

import { randomUUID } from "crypto";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

export async function uploadFiles(
  bucket: string,
  files: File[],
  prefix: string
): Promise<string[]> {
  if (files.length === 0) return [];
  const supabase = createSupabaseServiceClient();
  const urls: string[] = [];

  for (const file of files) {
    if (!file || file.size === 0) continue;
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${prefix}/${randomUUID()}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, arrayBuffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });
    if (error) {
      throw error;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    if (data?.publicUrl) {
      urls.push(data.publicUrl);
    }
  }

  return urls;
}

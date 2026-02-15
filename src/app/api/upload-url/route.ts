import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/heic", "image/heif"];
const ALLOWED_BUCKETS = new Set(["inquiry-photos", "case-images"]);

type UploadRequest = {
  bucket: string;
  prefix: string;
  files: Array<{ name: string; type: string; size: number }>;
};

export async function POST(request: Request) {
  const body = (await request.json()) as UploadRequest;
  if (!body || !ALLOWED_BUCKETS.has(body.bucket)) {
    return NextResponse.json({ error: "invalid_bucket" }, { status: 400 });
  }
  if (!body.files || body.files.length === 0) {
    return NextResponse.json({ error: "no_files" }, { status: 400 });
  }

  const supabase = createSupabaseServiceClient();
  const results = [];
  for (const file of body.files.slice(0, 5)) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "invalid_type" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "file_too_large" }, { status: 400 });
    }
    const ext = file.name.split(".").pop() || "jpg";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const path = `${body.prefix}/${safeName}`;
    const { data, error } = await supabase.storage
      .from(body.bucket)
      .createSignedUploadUrl(path);
    if (error || !data) {
      return NextResponse.json({ error: "sign_failed" }, { status: 500 });
    }
    results.push({ path: data.path, token: data.token });
  }

  return NextResponse.json({ uploads: results });
}

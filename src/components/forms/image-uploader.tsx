"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type UploadedFile = {
  path: string;
  previewUrl: string;
  name: string;
};

type Props = {
  bucket: "inquiry-photos" | "case-images";
  prefix: string;
  name: string;
  maxFiles?: number;
};

export function ImageUploader({ bucket, prefix, name, maxFiles = 5 }: Props) {
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createSupabaseBrowserClient();

  async function handleSelectFiles(files: FileList | null) {
    if (!files) return;
    const selected = Array.from(files).slice(0, maxFiles - uploads.length);
    if (selected.length === 0) return;
    setLoading(true);

    const res = await fetch("/api/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bucket,
        prefix,
        files: selected.map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),
      }),
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = (await res.json()) as {
      uploads: Array<{ path: string; token: string }>;
    };

    const nextUploads: UploadedFile[] = [];
    for (let i = 0; i < data.uploads.length; i += 1) {
      const item = data.uploads[i];
      const file = selected[i];
      const { error } = await supabase.storage
        .from(bucket)
        .uploadToSignedUrl(item.path, item.token, file, {
          contentType: file.type,
        });
      if (!error) {
        nextUploads.push({
          path: item.path,
          previewUrl: URL.createObjectURL(file),
          name: file.name,
        });
      }
    }
    setUploads((prev) => [...prev, ...nextUploads]);
    setLoading(false);
  }

  function removeUpload(path: string) {
    setUploads((prev) => prev.filter((item) => item.path !== path));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {uploads.map((item) => (
          <div key={item.path} className="relative h-24 w-24 overflow-hidden rounded-lg border">
            <img
              src={item.previewUrl}
              alt={item.name}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeUpload(item.path)}
              className="absolute right-1 top-1 rounded bg-black/60 px-1 text-xs text-white"
            >
              削除
            </button>
            <input type="hidden" name={name} value={item.path} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm">
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/heic,image/heif"
            multiple
            onChange={(e) => handleSelectFiles(e.target.files)}
            disabled={loading || uploads.length >= maxFiles}
          />
          <span>{loading ? "アップロード中..." : "画像を追加"}</span>
        </label>
        <div className="text-xs text-muted-foreground">
          最大{maxFiles}枚 / JPEG・PNG・HEIC / 10MBまで
        </div>
      </div>
    </div>
  );
}

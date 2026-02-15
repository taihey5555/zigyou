"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getStringArray(formData: FormData, key: string) {
  return formData.getAll(key).filter(Boolean) as string[];
}

export async function createCase(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const type = getString(formData, "type") as "kagu" | "airport";
  const title = getString(formData, "title");
  const body = getString(formData, "body");
  const area_slug = getString(formData, "area_slug") || null;
  const image_urls = getStringArray(formData, "image_paths");

  await supabase.from("cases").insert({
    type,
    title,
    body,
    area_slug,
    image_urls,
  });

  redirect("/admin/cases?created=1");
}

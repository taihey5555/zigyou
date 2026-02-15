"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    message: getString(formData, "message"),
  });
  if (!parsed.success) {
    const error = encodeURIComponent("必須項目をご確認ください。");
    redirect(`/contact?error=${error}`);
  }
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });
  if (error) {
    const msg = encodeURIComponent("送信に失敗しました。");
    redirect(`/contact?error=${msg}`);
  }
  redirect("/contact?submitted=1");
}

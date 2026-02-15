"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function updateInquiry(id: string, formData: FormData) {
  const status = getString(formData, "status");
  const admin_note = getString(formData, "admin_note");
  const estimated_price = getString(formData, "estimated_price");
  const final_price = getString(formData, "final_price");

  const supabase = createSupabaseServerClient();
  await supabase
    .from("inquiries")
    .update({
      status,
      admin_note,
      estimated_price: estimated_price ? Number(estimated_price) : null,
      final_price: final_price ? Number(final_price) : null,
    })
    .eq("id", id);

  redirect(`/admin/inquiries/${id}?saved=1`);
}

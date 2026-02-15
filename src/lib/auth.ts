import { createSupabaseServerClient } from "@/lib/supabase/server";

export function getAdminEmailSet() {
  const raw = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "";
  return new Set(
    raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  );
}

export async function requireAdminUser() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return { user: null, isAdmin: false };
  }
  const adminEmails = getAdminEmailSet();
  const email = data.user.email || "";
  const isAdmin = adminEmails.size === 0 ? true : adminEmails.has(email);
  return { user: data.user, isAdmin };
}

"use server";

import { submitAndRedirect } from "@/lib/inquiries";

export async function kaguQuoteAction(formData: FormData) {
  await submitAndRedirect("kagu", formData, "/kagu/quote");
}

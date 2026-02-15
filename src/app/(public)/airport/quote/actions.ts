"use server";

import { submitAndRedirect } from "@/lib/inquiries";

export async function airportQuoteAction(formData: FormData) {
  await submitAndRedirect("airport", formData, "/airport/quote");
}

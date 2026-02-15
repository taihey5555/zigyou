"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  baseInquirySchema,
  kaguPayloadSchema,
  airportPayloadSchema,
} from "@/lib/validators/inquiry";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { sendInquiryEmails } from "@/lib/email/send";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getNumber(formData: FormData, key: string) {
  const value = Number(getString(formData, key));
  return Number.isNaN(value) ? 0 : value;
}

function getDatetimeCandidates(formData: FormData) {
  const dates = ["date1", "date2", "date3"].map((key) =>
    getString(formData, key)
  );
  const timeFrom = ["time1_from", "time2_from", "time3_from"].map((key) =>
    getString(formData, key)
  );
  const timeTo = ["time1_to", "time2_to", "time3_to"].map((key) =>
    getString(formData, key)
  );

  return dates
    .map((date, index) => ({
      date,
      time_from: timeFrom[index] || undefined,
      time_to: timeTo[index] || undefined,
    }))
    .filter((item) => item.date);
}

function getPhotoPaths(formData: FormData) {
  return formData.getAll("photo_paths").filter(Boolean) as string[];
}

function summarizePayload(payload: Record<string, unknown>) {
  return Object.entries(payload)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n");
}

const rateLimitMap = new Map<string, { count: number; ts: number }>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 60_000;
  const limit = 5;
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.ts > windowMs) {
    rateLimitMap.set(ip, { count: 1, ts: now });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

export async function submitInquiry(type: "kagu" | "airport", formData: FormData) {
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    "unknown";
  if (!checkRateLimit(ip)) {
    return { ok: false, message: "送信回数が多いため、少し時間を置いてください。" };
  }

  const baseInput = {
    name: getString(formData, "name"),
    phone: getString(formData, "phone"),
    email: getString(formData, "email"),
    pickup_address: getString(formData, "pickup_address"),
    dropoff_address: getString(formData, "dropoff_address"),
    datetime_candidates: getDatetimeCandidates(formData),
  };

  const baseParsed = baseInquirySchema.safeParse(baseInput);
  if (!baseParsed.success) {
    return {
      ok: false,
      message: baseParsed.error.issues.map((issue) => issue.message).join(" / "),
    };
  }

  let payload: Record<string, unknown> = {};

  if (type === "kagu") {
    const items = [
      { key: "冷蔵庫", value: getNumber(formData, "item_fridge") },
      { key: "洗濯機", value: getNumber(formData, "item_washer") },
      { key: "ソファ", value: getNumber(formData, "item_sofa") },
      { key: "ベッド", value: getNumber(formData, "item_bed") },
      { key: "段ボール", value: getNumber(formData, "item_box") },
      { key: "その他", value: getNumber(formData, "item_other") },
    ]
      .filter((item) => item.value > 0)
      .map((item) => ({ category: item.key, quantity: item.value }));

    const kaguPayload = {
      items,
      has_elevator: getString(formData, "has_elevator") === "true",
      floor: (() => {
        const value = getString(formData, "floor");
        if (!value) return null;
        const num = Number(value);
        return Number.isNaN(num) ? null : num;
      })(),
      parking_available: getString(formData, "parking_available") === "true",
      note: getString(formData, "note"),
    };

    const payloadParsed = kaguPayloadSchema.safeParse(kaguPayload);
    if (!payloadParsed.success) {
      return {
        ok: false,
        message: payloadParsed.error.issues
          .map((issue) => issue.message)
          .join(" / "),
      };
    }
    payload = payloadParsed.data;
  } else {
    const airportPayload = {
      airport: (getString(formData, "airport") || "haneda") as
        | "haneda"
        | "narita",
      terminal: getString(formData, "terminal") || null,
      flight_number: getString(formData, "flight_number") || null,
      passengers: getNumber(formData, "passengers") || 1,
      suitcases: getNumber(formData, "suitcases"),
      note: getString(formData, "note"),
    };

    const payloadParsed = airportPayloadSchema.safeParse(airportPayload);
    if (!payloadParsed.success) {
      return {
        ok: false,
        message: payloadParsed.error.issues
          .map((issue) => issue.message)
          .join(" / "),
      };
    }
    payload = payloadParsed.data;
  }

  const photoPaths = getPhotoPaths(formData);

  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("inquiries")
    .insert({
      type,
      name: baseParsed.data.name,
      phone: baseParsed.data.phone,
      email: baseParsed.data.email,
      pickup_address: baseParsed.data.pickup_address,
      dropoff_address: baseParsed.data.dropoff_address,
      datetime_candidates: baseParsed.data.datetime_candidates,
      payload,
      photo_urls: photoPaths,
      status: "new",
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, message: "保存に失敗しました。時間をおいて再送信してください。" };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    await sendInquiryEmails({
      type,
      name: baseParsed.data.name,
      email: baseParsed.data.email,
      phone: baseParsed.data.phone,
      pickup: baseParsed.data.pickup_address,
      dropoff: baseParsed.data.dropoff_address,
      datetimeCandidates: baseParsed.data.datetime_candidates.map((item) => {
        const time =
          item.time_from && item.time_to
            ? `${item.time_from}-${item.time_to}`
            : item.time_from || item.time_to || "";
        return time ? `${item.date} ${time}` : item.date;
      }),
      summary: summarizePayload(payload),
      adminUrl: `${baseUrl}/admin/inquiries/${data.id}`,
    });
  } catch {
    // メール失敗でも保存は成功扱い
  }

  return { ok: true };
}

export async function submitAndRedirect(
  type: "kagu" | "airport",
  formData: FormData,
  successPath: string
) {
  const result = await submitInquiry(type, formData);
  if (!result.ok) {
    const error = encodeURIComponent(result.message ?? "送信に失敗しました。");
    redirect(`${successPath}?error=${error}`);
  }
  redirect(`${successPath}?submitted=1`);
}

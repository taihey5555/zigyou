import { z } from "zod";

export const datetimeCandidateSchema = z.object({
  date: z.string().min(1, "希望日は必須です。"),
  time_from: z.string().optional(),
  time_to: z.string().optional(),
});

export const baseInquirySchema = z.object({
  name: z.string().min(1, "お名前は必須です。"),
  phone: z.string().min(8, "電話番号は必須です。"),
  email: z.string().email("メールアドレスを確認してください。"),
  pickup_address: z.string().min(2, "集荷場所は必須です。"),
  dropoff_address: z.string().min(2, "配送場所は必須です。"),
  datetime_candidates: z
    .array(datetimeCandidateSchema)
    .min(1, "日時候補を最低1つ入力してください。")
    .max(3),
});

export const kaguPayloadSchema = z.object({
  items: z
    .array(
      z.object({
        category: z.string(),
        quantity: z.number().int().min(1),
      })
    )
    .min(1, "荷物カテゴリを最低1つ選択してください。"),
  has_elevator: z.boolean(),
  floor: z.number().int().min(0).nullable(),
  parking_available: z.boolean(),
  note: z.string().optional(),
});

export const airportPayloadSchema = z.object({
  airport: z.enum(["haneda", "narita"]),
  terminal: z.string().nullable().optional(),
  flight_number: z.string().nullable().optional(),
  passengers: z.number().int().min(1),
  suitcases: z.number().int().min(0),
  note: z.string().optional(),
});

export type BaseInquiryInput = z.infer<typeof baseInquirySchema>;
export type KaguPayloadInput = z.infer<typeof kaguPayloadSchema>;
export type AirportPayloadInput = z.infer<typeof airportPayloadSchema>;

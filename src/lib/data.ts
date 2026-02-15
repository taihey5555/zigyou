import { createClient } from "@supabase/supabase-js";

export type Area = {
  slug: string;
  name: string;
  group: string;
  description?: string | null;
};

export type CaseItem = {
  id: string;
  type: "kagu" | "airport";
  title: string;
  body: string;
  area_slug: string | null;
  image_urls: string[];
  created_at: string;
};

const mockAreas: Area[] = [
  { slug: "arakawa", name: "荒川区", group: "23ku-east" },
  { slug: "shinjuku", name: "新宿区", group: "23ku-west" },
  { slug: "koto", name: "江東区", group: "23ku-east" },
  { slug: "hachioji", name: "八王子市", group: "tama" },
];

const mockCases: CaseItem[] = [
  {
    id: "case-1",
    type: "kagu",
    title: "大型冷蔵庫 + ソファの安全運搬",
    body: "マンションのEVを養生し、床保護を徹底して搬出。荒川区から新宿区まで丁寧に運搬しました。",
    area_slug: "arakawa",
    image_urls: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "case-2",
    type: "airport",
    title: "早朝の羽田空港送迎",
    body: "フライトに合わせて4:30に出発。荷物の積載・降車までスムーズに対応しました。",
    area_slug: "koto",
    image_urls: [],
    created_at: new Date().toISOString(),
  },
];

function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function fetchAreas() {
  const supabase = getPublicClient();
  if (!supabase) return mockAreas;
  const { data } = await supabase.from("areas").select("*").order("name");
  return data && data.length > 0 ? (data as Area[]) : mockAreas;
}

export async function fetchCases() {
  const supabase = getPublicClient();
  if (!supabase) return mockCases;
  const { data } = await supabase
    .from("cases")
    .select("*")
    .order("created_at", { ascending: false });
  return data && data.length > 0 ? (data as CaseItem[]) : mockCases;
}

export async function fetchCaseById(id: string) {
  const supabase = getPublicClient();
  if (!supabase) return mockCases.find((item) => item.id === id) ?? null;
  const { data } = await supabase.from("cases").select("*").eq("id", id).single();
  return (data as CaseItem) ?? null;
}

export async function fetchAreaBySlug(slug: string) {
  const supabase = getPublicClient();
  if (!supabase) return mockAreas.find((item) => item.slug === slug) ?? null;
  const { data } = await supabase.from("areas").select("*").eq("slug", slug).single();
  return (data as Area) ?? null;
}

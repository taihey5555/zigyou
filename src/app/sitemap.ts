import type { MetadataRoute } from "next";
import { fetchAreas, fetchCases } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const areas = await fetchAreas();
  const cases = await fetchCases();

  const staticRoutes = [
    "",
    "/kagu",
    "/airport",
    "/pricing",
    "/areas",
    "/cases",
    "/faq",
    "/contact",
    "/terms",
    "/privacy",
    "/kagu/quote",
    "/airport/quote",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    })),
    ...areas.map((area) => ({
      url: `${baseUrl}/areas/${area.slug}`,
      lastModified: new Date(),
    })),
    ...cases.map((item) => ({
      url: `${baseUrl}/cases/${item.id}`,
      lastModified: new Date(item.created_at),
    })),
  ];
}

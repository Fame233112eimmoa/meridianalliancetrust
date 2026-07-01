import type { MetadataRoute } from "next";
import { absoluteUrl, hasPublicSiteUrl, indexableRoutes } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!hasPublicSiteUrl) {
    return [];
  }

  const lastModified = new Date();

  return indexableRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

import type { MetadataRoute } from "next";
import { publicRoutes, seoConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = seoConfig.brand;
  const lastModified = new Date();

  return publicRoutes.map((path) => ({
    url: path === "/" ? url : `${url}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/contact" || path === "/about" ? 0.9 : 0.8,
  }));
}

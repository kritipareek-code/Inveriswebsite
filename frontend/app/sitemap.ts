import type { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo";

const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/industries",
  "/approach",
  "/leadership",
  "/careers",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = seoConfig.brand;
  const lastModified = new Date();

  return publicRoutes.map((path) => ({
    url: path === "/" ? url : `${url}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}

import type { MetadataRoute } from "next";

const SITE = "https://www.inverissolutions.com";

const publicRoutes = [
  "/",
  "/about",
  "/services",
  "/industries",
  "/approach",
  "/leadership",
  "/careers",
  "/careers/opportunities",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((path) => ({
    url: path === "/" ? SITE : `${SITE}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/contact" || path === "/about" ? 0.9 : 0.8,
  }));
}

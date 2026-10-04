import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { articles, propertyTypes } = await getSiteContent();
  const baseUrl = siteUrl;
  const pages = ["", "/tipe-rumah", "/galeri", "/lokasi", "/artikel"];
  return [
    ...pages.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.7 })),
    ...propertyTypes.map((property) => ({ url: `${baseUrl}/tipe-rumah/${property.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...articles.map((article) => ({ url: `${baseUrl}/artikel/${article.slug}`, lastModified: new Date(article.publishedAt), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}

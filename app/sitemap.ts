import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";
import { client } from "../sanity/lib/client";
import { allSlugs } from "../sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contacts`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // Slug-овете на продуктите идват от Sanity.
  const slugs = await client.fetch<{ slug: string }[]>(allSlugs);
  const productRoutes: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${SITE_URL}/shop/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}

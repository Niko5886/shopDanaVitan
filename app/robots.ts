import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Транзакционните и админ страниците не бива да се индексират.
      disallow: ["/checkout", "/order-success", "/studio"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

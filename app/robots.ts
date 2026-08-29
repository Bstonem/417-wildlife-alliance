import type { MetadataRoute } from "next";
import { siteConfig, isSiteLaunched } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isSiteLaunched()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }]
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"]
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url
  };
}

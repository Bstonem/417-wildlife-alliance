import type { MetadataRoute } from "next";
import { siteConfig, absoluteUrl } from "@/lib/seo";
import { stories } from "@/lib/stories";
import { hasSupabaseAdminConfig } from "@/lib/supabase";
import { wildlifeGuides } from "@/lib/wildlife-guides";

const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/found-animal", priority: 0.95, changeFrequency: "weekly" },
  { path: "/directory", priority: 0.9, changeFrequency: "weekly" },
  { path: "/donate", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-donations-help", priority: 0.72, changeFrequency: "monthly" },
  { path: "/rehabbers", priority: 0.72, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.74, changeFrequency: "monthly" },
  { path: "/help", priority: 0.68, changeFrequency: "monthly" },
  { path: "/about", priority: 0.62, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.76, changeFrequency: "monthly" },
  { path: "/stories", priority: 0.64, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.62, changeFrequency: "monthly" }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const sitemapStaticRoutes = staticRoutes.filter((route) => route.path !== "/directory" || hasSupabaseAdminConfig());

  return [
    ...sitemapStaticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority
    })),
    ...wildlifeGuides.map((guide) => ({
      url: absoluteUrl(`/found-animal/${guide.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.82
    })),
    ...stories.map((story) => ({
      url: absoluteUrl(`/stories/${story.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.56
    }))
  ].filter((entry) => entry.url.startsWith(siteConfig.url));
}

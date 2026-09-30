import type { MetadataRoute } from "next";
import { navigation } from "@/data/navigation";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = [...navigation.map(({ href }) => href), ...projects.map(({ slug }) => `/projects/${slug}`)];
  return urls.map((url) => ({ url: `${siteUrl}${url === "/" ? "" : url}`, lastModified: new Date(), changeFrequency: "monthly", priority: url === "/" ? 1 : .7 }));
}

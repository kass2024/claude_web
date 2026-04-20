import { type MetadataRoute } from "next";
import { api } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const [services, projects, posts] = await Promise.all([
    api.services().then((r) => r.data).catch(() => []),
    api.projects().then((r) => r.data).catch(() => []),
    api.posts().then((r) => r.data).catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    { url: `${baseUrl}/training`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/consultation`, lastModified: new Date() },
    { url: `${baseUrl}/careers`, lastModified: new Date() },
  ];

  return [
    ...staticRoutes,
    ...services.map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date(),
    })),
    ...projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(),
    })),
    ...posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}


import { api } from "@/lib/api";
import {
  EXPORT_FALLBACK_PROJECT_SLUGS,
  mergeStaticSlugParams,
} from "@/lib/exportFallbackSlugs";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await api.projects().then((r) => r.data).catch(() => []);
  return mergeStaticSlugParams(projects, EXPORT_FALLBACK_PROJECT_SLUGS);
}

export default function ProjectSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

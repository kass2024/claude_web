import { api } from "@/lib/api";
import {
  EXPORT_FALLBACK_POST_SLUGS,
  mergeStaticSlugParams,
} from "@/lib/exportFallbackSlugs";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await api.posts().then((r) => r.data).catch(() => []);
  return mergeStaticSlugParams(posts, EXPORT_FALLBACK_POST_SLUGS);
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

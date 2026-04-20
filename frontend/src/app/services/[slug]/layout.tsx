import { api } from "@/lib/api";
import {
  EXPORT_FALLBACK_SERVICE_SLUGS,
  mergeStaticSlugParams,
} from "@/lib/exportFallbackSlugs";

export const dynamicParams = false;

export async function generateStaticParams() {
  const services = await api.services().then((r) => r.data).catch(() => []);
  return mergeStaticSlugParams(services, EXPORT_FALLBACK_SERVICE_SLUGS);
}

export default function ServiceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

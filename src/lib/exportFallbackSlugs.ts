/**
 * Fallback slugs mirror `backend/database/seeders/DatabaseSeeder.php`.
 *
 * With `output: "export"`, Next.js requires at least one prerender path for
 * every dynamic segment. If the API is unreachable during `next build`, list
 * endpoints return [] and the build would otherwise fail with:
 * "missing generateStaticParams()".
 */
export const EXPORT_FALLBACK_SERVICE_SLUGS = [
  "architecture-construction",
  "artificial-intelligence-innovation",
  "digital-services",
  "training-elearning",
  "real-estate-consulting",
  "strategic-marketing-business-development",
] as const;

export const EXPORT_FALLBACK_PROJECT_SLUGS = [
  "smart-residential-design-concept",
  "ai-process-automation-advisory",
  "professional-elearning-platform",
] as const;

/** Laravel `Str::slug($title)` for the three seeded posts */
export const EXPORT_FALLBACK_POST_SLUGS = [
  "the-future-of-architecture-in-the-age-of-artificial-intelligence",
  "how-digital-transformation-is-reshaping-modern-business",
  "why-smart-buildings-matter-for-sustainable-development",
] as const;

export function mergeStaticSlugParams(
  rows: { slug: string }[],
  fallbacks: readonly string[]
): { slug: string }[] {
  const seen = new Set<string>();
  const out: { slug: string }[] = [];

  for (const row of rows) {
    if (!seen.has(row.slug)) {
      seen.add(row.slug);
      out.push({ slug: row.slug });
    }
  }

  for (const slug of fallbacks) {
    if (!seen.has(slug)) {
      seen.add(slug);
      out.push({ slug });
    }
  }

  return out;
}

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { api } from "@/lib/api";

export const metadata = {
  title: "Insights & News | JC Architecture & AI Consulting Inc.",
  description:
    "Expert perspectives and thought leadership across architecture, AI, digital transformation, real estate, and strategic development.",
};

export default async function BlogIndexPage() {
  const posts = await api.posts().then((r) => r.data).catch(() => []);

  return (
    <div className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-4xl">
            Insights & News
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
            Explore expert perspectives, industry updates, and thought leadership across architecture, AI, digital
            transformation, real estate, and strategic development.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.id}
              className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm"
            >
              {p.category && (
                <div className="text-xs font-semibold text-[var(--brand-primary)]">
                  {p.category.name}
                </div>
              )}
              <h2 className="mt-2 text-lg font-semibold text-[var(--brand-text)]">
                {p.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
                {p.excerpt}
              </p>
              <div className="mt-6">
                <Button href={`/blog/${p.slug}`}>Read</Button>
              </div>
            </article>
          ))}
          {!posts.length && (
            <div className="rounded-3xl border border-black/5 bg-white p-7 text-sm text-[var(--brand-muted)]">
              Blog posts will appear here once your backend is running and seeded.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}


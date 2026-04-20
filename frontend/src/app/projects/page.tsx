import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { api } from "@/lib/api";

export const metadata = {
  title: "Projects & Portfolio | JC Architecture & AI Consulting Inc.",
  description:
    "Explore our portfolio across architecture, AI & automation, digital platforms, e-learning systems, real estate advisory, and strategic consulting.",
};

export default async function ProjectsPage() {
  const projects = await api.projects().then((r) => r.data).catch(() => []);

  return (
    <div className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-4xl">
            Projects & Portfolio
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
            Our portfolio reflects our multidisciplinary expertise across architecture, digital innovation, training
            systems, consulting, and strategic advisory. We work with clients to create practical, scalable, and impactful
            solutions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.id}
              className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm"
            >
              <div className="text-xs font-semibold text-[var(--brand-primary)]">
                {p.category}
              </div>
              <h2 className="mt-2 text-lg font-semibold text-[var(--brand-text)]">
                {p.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
                {p.short_description}
              </p>
              <div className="mt-6">
                <Button href={`/projects/${p.slug}`}>View project</Button>
              </div>
            </article>
          ))}
          {!projects.length && (
            <div className="rounded-3xl border border-black/5 bg-white p-7 text-sm text-[var(--brand-muted)]">
              Projects will appear here once your backend is running and seeded.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}


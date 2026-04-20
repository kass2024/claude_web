import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await api
    .project(slug)
    .then((r) => r.data)
    .catch(() => null);

  if (!project) notFound();

  return (
    <div className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[var(--brand-primary)]">
            {project.category}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
            {project.short_description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--brand-muted)]">
            {project.country && (
              <span className="rounded-full bg-black/5 px-3 py-1">
                {project.country}
              </span>
            )}
            {project.completion_date && (
              <span className="rounded-full bg-black/5 px-3 py-1">
                Completed {project.completion_date}
              </span>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="leading-8 text-[var(--brand-muted)]">
              {project.full_description}
            </p>
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-3xl bg-[var(--brand-bg)] p-8 ring-1 ring-inset ring-black/5">
              <div className="text-sm font-semibold text-[var(--brand-text)]">
                Interested in a similar outcome?
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
                Let’s align on scope, deliverables, and a delivery plan built for long-term value.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href="/consultation">Request a Consultation</Button>
                <Button href="/projects" variant="secondary">
                  Back to projects
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}


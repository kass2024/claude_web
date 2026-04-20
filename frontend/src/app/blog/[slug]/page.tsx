import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await api
    .post(slug)
    .then((r) => r.data)
    .catch(() => null);

  if (!post) notFound();

  return (
    <div className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl">
          {post.category && (
            <div className="text-sm font-semibold text-[var(--brand-primary)]">
              {post.category.name}
            </div>
          )}
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
            {post.excerpt}
          </p>
        </div>

        <article className="prose prose-zinc mt-10 max-w-3xl">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="[&_p]:leading-8"
          />
        </article>

        <div className="mt-12 flex gap-3">
          <Button href="/blog" variant="secondary">
            Back to insights
          </Button>
          <Button href="/consultation">Request a Consultation</Button>
        </div>
      </Container>
    </div>
  );
}


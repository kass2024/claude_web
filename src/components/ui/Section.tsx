import { type ReactNode } from "react";
import { Container } from "@/components/Container";

export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <Container className="py-14 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {eyebrow && (
              <div className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)]">
                {eyebrow}
              </div>
            )}
            <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-3xl">
              {title}
            </h2>
            {description && (
              <p className="mt-3 text-pretty text-sm leading-7 text-[var(--brand-muted)]">
                {description}
              </p>
            )}
          </div>
          <div className="lg:col-span-8">{children}</div>
        </div>
      </Container>
    </section>
  );
}


import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export const metadata = {
  title: "Careers | JC Architecture & AI Consulting Inc.",
  description:
    "Connect with JC Architecture & AI Consulting Inc. for career opportunities in architecture, AI, digital transformation, education, and business growth.",
};

export default function CareersPage() {
  return (
    <div className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-4xl">
              Careers
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              We are always interested in connecting with talented professionals, consultants, designers, developers,
              trainers, and innovators who share our commitment to excellence and impact.
            </p>
            <p className="mt-4 leading-7 text-[var(--brand-muted)]">
              If you are passionate about architecture, AI, digital transformation, education, or business growth, we
              invite you to explore opportunities with our company.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">Submit Your CV</Button>
              <Button href="/consultation" variant="secondary">
                Partner With Us
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[var(--brand-bg)] p-8 ring-1 ring-inset ring-black/5">
              <div className="text-sm font-semibold text-[var(--brand-text)]">
                What we look for
              </div>
              <ul className="mt-4 space-y-2 text-sm text-[var(--brand-muted)]">
                {[
                  "Professional excellence and integrity",
                  "Strong technical or strategic capability",
                  "Clear communication and collaboration",
                  "International mindset with local adaptability",
                  "Commitment to sustainable, scalable impact",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[var(--brand-accent)]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


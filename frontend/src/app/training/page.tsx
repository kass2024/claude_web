import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export const metadata = {
  title: "Training & Academy | JC Architecture & AI Consulting Inc.",
  description:
    "Professional and technical training solutions across architecture, digital literacy, AI awareness, and e-learning implementation support.",
};

export default function TrainingPage() {
  return (
    <div className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-4xl">
              Training & Academy
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              We provide professional and technical training solutions that equip learners, institutions, and
              organizations with practical knowledge and market-relevant skills.
            </p>

            <div className="mt-10 rounded-3xl bg-[var(--brand-bg)] p-8 ring-1 ring-inset ring-black/5">
              <h2 className="text-lg font-semibold text-[var(--brand-text)]">
                Training categories
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-[var(--brand-muted)]">
                {[
                  "Architecture and design training",
                  "Digital literacy and systems training",
                  "AI awareness and applications",
                  "Professional development workshops",
                  "E-learning implementation support",
                  "Certification-based programs",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[var(--brand-accent)]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-[var(--brand-text)]">
                Built to be practical and scalable
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
                Our training programs are designed to be practical, accessible, flexible, industry-relevant, scalable,
                and technology-enabled.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href="/contact">Request a customized program</Button>
                <Button href="/consultation" variant="secondary">
                  Book a consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


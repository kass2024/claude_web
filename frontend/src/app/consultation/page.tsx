import { Container } from "@/components/Container";
import { ConsultationForm } from "@/components/forms/ConsultationForm";

export const metadata = {
  title: "Request a Consultation | JC Architecture & AI Consulting Inc.",
  description:
    "Book a consultation to discuss your project, challenge, or business goal with JC Architecture & AI Consulting Inc.",
};

export default function ConsultationPage() {
  return (
    <div className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-4xl">
              Request a Consultation
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              Book a consultation with JC Architecture & AI Consulting Inc. to discuss your project, challenge, or
              business goal.
            </p>
            <div className="mt-8 rounded-3xl bg-[var(--brand-bg)] p-8 ring-1 ring-inset ring-black/5">
              <div className="text-sm font-semibold text-[var(--brand-text)]">Consultation types</div>
              <ul className="mt-3 space-y-2 text-sm text-[var(--brand-muted)]">
                {["Virtual Meeting", "Phone Call", "In-Person Meeting"].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[var(--brand-accent)]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ConsultationForm />
          </div>
        </div>
      </Container>
    </div>
  );
}


import { Container } from "@/components/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact Us | JC Architecture & AI Consulting Inc.",
  description:
    "Contact JC Architecture & AI Consulting Inc. for architecture, AI integration, digital services, e-learning, real estate advisory, and business strategy.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              We welcome inquiries from individuals, businesses, institutions, and partners seeking expert consulting and
              innovative solutions.
            </p>
            <div className="mt-8 rounded-3xl bg-[var(--brand-bg)] p-8 ring-1 ring-inset ring-black/5">
              <div className="text-sm font-semibold text-[var(--brand-text)]">
                Let’s Build Something Meaningful Together
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
                Whether you need support in architecture, AI integration, digital services, e-learning, real estate
                advisory, or business strategy, our team is ready to assist.
              </p>
              <div className="mt-4 text-sm text-[var(--brand-muted)]">
                Serving clients in Canada, Rwanda, and internationally.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}


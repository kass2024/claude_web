import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { api } from "@/lib/api";
import Image from "next/image";
import { serviceImageBySlug } from "@/lib/images";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Services | JC Architecture & AI Consulting Inc.",
  description:
    "Explore JC Architecture & AI Consulting Inc. services across architecture & construction, AI & innovation, digital services, training & e-learning, real estate advisory, and strategic marketing.",
};

export default async function ServicesPage() {
  const services = await api.services().then((r) => r.data).catch(() => []);

  return (
    <div className="bg-white">
      <div className="bg-[var(--brand-bg)]">
        <Container className="py-14 sm:py-18">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)] shadow-sm">
              Core capabilities
            </div>
            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-4xl">
              Services designed for modern organizations
            </h1>
            <p className="mt-4 text-lg leading-8 text-[var(--brand-muted)]">
              Our services support clients across technical, digital, educational, and strategic domains—delivered with premium
              quality and a clear focus on scalable outcomes.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-14 sm:py-18">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <Card key={s.id} className="overflow-hidden">
              <div className="grid gap-0">
                <div className="relative">
                  <Image
                    src={serviceImageBySlug[s.slug] ?? "/images/placeholders/hero.svg"}
                    alt={`${s.title} (placeholder image)`}
                    width={1200}
                    height={800}
                    className="h-52 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--brand-text)] shadow-sm">
                      {s.title}
                    </div>
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-sm leading-7 text-[var(--brand-muted)]">
                    {s.short_description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={`/services/${s.slug}`} size="sm">
                      Learn more
                    </Button>
                    <Button href="/consultation" variant="secondary" size="sm">
                      Request consultation
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {!services.length && (
            <Card className="p-8">
              <div className="text-sm text-[var(--brand-muted)]">
                Services will appear here once your backend is running and seeded.
              </div>
            </Card>
          )}
        </div>
      </Container>
    </div>
  );
}


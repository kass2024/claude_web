import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import { serviceImageBySlug } from "@/lib/images";
import { Card } from "@/components/ui/Card";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await api
    .service(slug)
    .then((r) => r.data)
    .catch(() => null);

  if (!service) notFound();

  return (
    <div className="bg-white">
      <div className="bg-[var(--brand-bg)]">
        <Container className="py-14 sm:py-18">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)] shadow-sm">
                Service
              </div>
              <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-4 text-lg leading-8 text-[var(--brand-muted)]">
                {service.short_description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/consultation">Request a Consultation</Button>
                <Button href="/contact" variant="secondary">
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-md">
                <Image
                  src={serviceImageBySlug[service.slug] ?? "/images/placeholders/hero.svg"}
                  alt={`${service.title} (placeholder image)`}
                  width={1200}
                  height={800}
                  className="h-[320px] w-full object-cover sm:h-[380px]"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-14 sm:py-18">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Card className="p-8">
              <h2 className="text-lg font-semibold text-[var(--brand-text)]">
                Overview
              </h2>
              <p className="mt-3 leading-8 text-[var(--brand-muted)]">
                {service.full_description}
              </p>
            </Card>
          </div>
          <aside className="lg:col-span-4">
            <div className="space-y-6">
              <Card className="p-7">
                <div className="text-sm font-semibold text-[var(--brand-text)]">
                  Next steps
                </div>
                <p className="mt-2 text-sm leading-7 text-[var(--brand-muted)]">
                  Tell us about your goals and we’ll recommend a clear, practical roadmap.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Button href="/consultation" size="sm">
                    Request a Consultation
                  </Button>
                  <Button href="/services" variant="secondary" size="sm">
                    Back to services
                  </Button>
                </div>
              </Card>

              <div className="rounded-3xl bg-[var(--brand-primary)] p-7 text-white shadow-md">
                <div className="text-sm font-semibold">Markets served</div>
                <div className="mt-2 text-sm text-white/80 leading-7">
                  Canada, Rwanda, and international markets.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}


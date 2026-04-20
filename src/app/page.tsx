import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { api } from "@/lib/api";
import Image from "next/image";
import { heroImage } from "@/lib/images";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { serviceImageBySlug } from "@/lib/images";

export default async function Home() {
  const [services, testimonials, faqs] = await Promise.all([
    api.services().then((r) => r.data).catch(() => []),
    api.testimonials().then((r) => r.data).catch(() => []),
    api.faqs().then((r) => r.data).catch(() => []),
  ]);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[var(--brand-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_15%_15%,color-mix(in_oklab,var(--brand-secondary)_22%,white),transparent_60%),radial-gradient(1000px_circle_at_85%_35%,color-mix(in_oklab,var(--brand-accent)_20%,white),transparent_55%)]" />
        <Container className="relative py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)] shadow-sm">
                <span className="size-1.5 rounded-full bg-[var(--brand-accent)]" />
                Premium multidisciplinary consulting
              </div>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-5xl">
                Architecture, AI, and Digital Innovation for a Smarter Future
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-[var(--brand-muted)]">
                JC Architecture & AI Consulting Inc. delivers high-value technical and strategic consulting services in
                architecture, construction, applied artificial intelligence, digital solutions, e-learning, real estate
                advisory, and business development across Canada, Rwanda, and international markets.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/consultation">Request Consultation</Button>
                <Button href="/services" variant="secondary">
                  Explore Services
                </Button>
                <Button href="/projects" variant="ghost">
                  View Projects
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { k: "Markets", v: "Canada · Rwanda · Global" },
                  { k: "Approach", v: "Integrated + scalable" },
                  { k: "Focus", v: "Future-ready outcomes" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 shadow-sm"
                  >
                    <div className="text-xs font-semibold text-[var(--brand-muted)]">
                      {s.k}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--brand-text)]">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-md">
                <Image
                  src={heroImage}
                  alt="Architecture and technology visual (placeholder)"
                  width={1600}
                  height={1000}
                  className="h-[360px] w-full object-cover sm:h-[440px]"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur">
                      <div className="text-xs font-semibold text-[var(--brand-muted)]">
                        From concept to delivery
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[var(--brand-text)]">
                        Design excellence + technical precision
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white/90 p-4 shadow-sm backdrop-blur">
                      <div className="text-xs font-semibold text-[var(--brand-muted)]">
                        Modern organizations
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[var(--brand-text)]">
                        AI + digital transformation that scales
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--brand-muted)]">
                Placeholder imagery can be replaced later (brief-aligned guidance).
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="What we do"
        title="Integrated consulting across six domains"
        description="A single multidisciplinary partner—architectural consulting, AI integration, digital platforms, professional training, real estate advisory, and strategic marketing."
        className="bg-white"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {services.slice(0, 6).map((s) => (
            <Card key={s.id} className="overflow-hidden">
              <div className="grid gap-0">
                <div className="relative">
                  <Image
                    src={serviceImageBySlug[s.slug] ?? heroImage}
                    alt={`${s.title} (placeholder image)`}
                    width={1200}
                    height={800}
                    className="h-44 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--brand-text)] shadow-sm">
                    {s.title}
                  </div>
                </div>
                <div className="p-6">
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
        </div>
      </Section>

      <Section
        eyebrow="Why us"
        title="Premium delivery, built for long-term value"
        description="We combine design excellence, technological innovation, and strategic consulting to deliver future-ready outcomes."
        className="bg-[var(--brand-bg)]"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              t: "Multidisciplinary expertise",
              d: "Technical depth across architecture, AI, digital systems, training, real estate, and growth strategy.",
            },
            {
              t: "International outlook",
              d: "Serving clients in Canada, Rwanda, and global markets—designed for local adaptability.",
            },
            {
              t: "Innovation-driven delivery",
              d: "Practical approaches to automation, modernization, and sustainable project outcomes.",
            },
            {
              t: "Client-focused consulting",
              d: "Clear scope, measurable deliverables, and responsive communication throughout engagement.",
            },
          ].map((x) => (
            <Card key={x.t} className="p-6">
              <div className="text-sm font-semibold text-[var(--brand-text)]">
                {x.t}
              </div>
              <div className="mt-2 text-sm leading-7 text-[var(--brand-muted)]">
                {x.d}
              </div>
            </Card>
          ))}
          <div className="sm:col-span-2">
            <div className="rounded-3xl bg-[var(--brand-primary)] p-8 text-white shadow-md">
              <div className="text-xl font-semibold">Ready to Build, Innovate, and Grow?</div>
              <p className="mt-2 max-w-3xl text-white/80 leading-7">
                Let’s discuss how JC Architecture & AI Consulting Inc. can help your organization with architecture, AI,
                digital platforms, training systems, real estate strategy, and business development.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  href="/consultation"
                  className="bg-white text-[var(--brand-primary)] hover:bg-white/90"
                >
                  Book a Consultation
                </Button>
                <Button href="/contact" variant="secondary" className="ring-white/25">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Testimonials"
        title="What clients can expect"
        description="Professional, responsive, and highly knowledgeable delivery—built for practical, visionary outcomes."
        className="bg-white"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.slice(0, 4).map((t) => (
            <Card key={t.id} className="p-7">
              <blockquote className="text-sm leading-7 text-[var(--brand-text)]">
                “{t.quote}”
              </blockquote>
              <div className="mt-4 text-xs font-semibold text-[var(--brand-muted)]">
                {t.client_name ?? "Client"}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="FAQs"
        title="Quick answers"
        description="Common questions about scope, markets, and how we deliver integrated engagements."
        className="bg-[var(--brand-bg)]"
      >
        <div className="space-y-4">
          {faqs.slice(0, 8).map((f) => (
            <details
              key={f.id}
              className="group rounded-3xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--brand-text)]">
                {f.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-[var(--brand-muted)]">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>
    </div>
  );
}

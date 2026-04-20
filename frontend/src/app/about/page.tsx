import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export const metadata = {
  title: "About | JC Architecture & AI Consulting Inc.",
  description:
    "Learn about JC Architecture & AI Consulting Inc. and our multidisciplinary approach across architecture, AI, digital services, training, real estate, and strategic growth.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--brand-text)] sm:text-4xl">
              About JC Architecture & AI Consulting Inc.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--brand-muted)]">
              JC Architecture & AI Consulting Inc. is a multidisciplinary consulting firm dedicated to delivering
              high-value technical, strategic, and operational solutions across architecture, construction, artificial
              intelligence, digital services, e-learning, real estate, and marketing strategy.
            </p>
            <p className="mt-4 leading-7 text-[var(--brand-muted)]">
              With a strong international perspective and a commitment to excellence, we support clients in Canada,
              Rwanda, and beyond through innovative services designed to drive transformation, efficiency, and sustainable
              success.
            </p>

            <div className="mt-10 rounded-3xl bg-[var(--brand-bg)] p-8 ring-1 ring-inset ring-black/5">
              <h2 className="text-lg font-semibold text-[var(--brand-text)]">Our Story</h2>
              <p className="mt-3 leading-7 text-[var(--brand-muted)]">
                Founded with the vision of bridging the worlds of architecture, technology, and business strategy, JC
                Architecture & AI Consulting Inc. was created to address the complex and evolving needs of modern
                organizations and communities.
              </p>
              <p className="mt-3 leading-7 text-[var(--brand-muted)]">
                We believe successful transformation requires integrated thinking, strong execution, and future-oriented
                leadership—combining technical know-how with strategic intelligence and innovative problem-solving.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/services">Explore Services</Button>
              <Button href="/consultation" variant="secondary">
                Request a Consultation
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-[var(--brand-text)]">Core Values</h2>
              <div className="mt-5 space-y-4">
                {[
                  {
                    title: "Innovation",
                    body: "We embrace modern tools, intelligent systems, and creative thinking to solve complex challenges.",
                  },
                  {
                    title: "Excellence",
                    body: "We maintain the highest standards in design, consulting, implementation, and client service.",
                  },
                  {
                    title: "Integrity",
                    body: "We build trust through honesty, accountability, and professionalism.",
                  },
                  {
                    title: "Sustainability",
                    body: "We promote solutions that are environmentally responsible, socially relevant, and economically viable.",
                  },
                  {
                    title: "Collaboration",
                    body: "We work closely with clients and partners to create meaningful and lasting value.",
                  },
                ].map((v) => (
                  <div key={v.title} className="rounded-2xl bg-[var(--brand-bg)] p-5 ring-1 ring-inset ring-black/5">
                    <div className="text-sm font-semibold text-[var(--brand-text)]">{v.title}</div>
                    <div className="mt-2 text-sm leading-7 text-[var(--brand-muted)]">{v.body}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-[var(--brand-primary)] p-6 text-white">
                <div className="text-sm font-semibold">Geographic reach</div>
                <div className="mt-2 text-sm text-white/80">
                  Serving clients in <span className="font-semibold text-white">Canada</span>,{" "}
                  <span className="font-semibold text-white">Rwanda</span>, and international markets.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


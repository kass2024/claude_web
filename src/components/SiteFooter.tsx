import Link from "next/link";
import { Container } from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/training", label: "Training" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/consultation", label: "Request Consultation" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-[var(--brand-bg)]">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[var(--brand-primary)] text-white font-bold">
                JC
              </span>
              <div>
                <div className="text-sm font-semibold text-[var(--brand-text)]">
                  JC Architecture & AI Consulting Inc.
                </div>
                <div className="text-sm text-[var(--brand-muted)]">
                  Multidisciplinary consulting across architecture, AI, digital services, training, real estate, and strategic growth.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-[var(--brand-muted)] hover:text-[var(--brand-text)]"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/careers"
                className="text-sm font-medium text-[var(--brand-muted)] hover:text-[var(--brand-text)]"
              >
                Careers
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/5 pt-8 text-sm text-[var(--brand-muted)] sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 JC Architecture & AI Consulting Inc. All rights reserved.</div>
          <div>Serving clients in Canada, Rwanda, and internationally.</div>
        </div>
      </Container>
    </footer>
  );
}


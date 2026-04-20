"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Container } from "./Container";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/training", label: "Training" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () =>
      nav.map((item) => ({
        ...item,
        active: pathname === item.href || pathname.startsWith(item.href + "/"),
      })),
    [pathname]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--brand-primary)] text-white font-bold">
            JC
          </span>
          <span className="hidden md:block text-sm font-semibold tracking-tight text-[var(--brand-text)]">
            JC Architecture & AI Consulting Inc.
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {items.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-black/5 text-[var(--brand-text)]"
                    : "text-[var(--brand-muted)] hover:text-[var(--brand-text)] hover:bg-black/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="lg:hidden inline-flex size-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-[var(--brand-text)] hover:bg-black/5"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-lg leading-none">{open ? "×" : "≡"}</span>
          </button>
          <Link
            href="/consultation"
            className="hidden sm:inline-flex rounded-full bg-[var(--brand-accent)] px-4 py-2 text-sm font-semibold text-black hover:bg-[color-mix(in_oklab,var(--brand-accent)_90%,black)] transition-colors shadow-sm"
          >
            Request consultation
          </Link>
        </div>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-black/5 bg-white">
          <Container className="py-4">
            <div className="grid gap-1">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                    item.active
                      ? "bg-[var(--brand-bg)] text-[var(--brand-text)]"
                      : "text-[var(--brand-muted)] hover:bg-black/5 hover:text-[var(--brand-text)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/consultation"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-[var(--brand-accent)] px-4 py-3 text-sm font-semibold text-black shadow-sm"
              >
                Request consultation
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}


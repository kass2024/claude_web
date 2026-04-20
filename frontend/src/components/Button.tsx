import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--brand-primary)] text-white hover:bg-[color-mix(in_oklab,var(--brand-primary)_90%,black)] shadow-sm hover:shadow",
  secondary:
    "bg-white text-[var(--brand-primary)] ring-1 ring-inset ring-black/10 hover:bg-black/5 shadow-sm",
  ghost:
    "bg-transparent text-[var(--brand-primary)] hover:bg-black/5 ring-1 ring-inset ring-black/10",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}


import { type ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group rounded-3xl border border-black/5 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}


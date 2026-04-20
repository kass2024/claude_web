import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Apache on shared hosting serves folder routes like `/about/index.html` reliably.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

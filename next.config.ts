import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Shared hosting (Apache) reliably serves folder-based routes like `/about/index.html`.
  trailingSlash: true,
  images: {
    // `next export` / static hosting does not include the Next.js image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;

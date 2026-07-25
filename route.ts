import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const root = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  typedRoutes: true,
  turbopack: {
    root
  },
  async redirects() {
    return [
      {
        source: "/certified-companies",
        destination: "/partners#compassionate-companies",
        permanent: true
      }
    ];
  }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // La app se movió de /notes a /app
    return [{ source: "/notes", destination: "/app", permanent: false }];
  },
};

export default nextConfig;

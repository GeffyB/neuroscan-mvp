import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... outras configs do seu projeto aqui (se houver)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

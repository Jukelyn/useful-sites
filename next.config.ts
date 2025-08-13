import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  turbopack: {},
  devIndicators: false,
  output: "standalone",
};

export default nextConfig;

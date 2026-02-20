import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {},
  devIndicators: false,
  output: "standalone",
};

export default nextConfig;

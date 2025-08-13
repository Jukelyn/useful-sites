import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  turbopack: {},
  devIndicators: false,
  output: "standalone",
  images: {
    remotePatterns: [new URL("https://placehold.co/48@2x.png?text=Missing")],
  },
};

export default nextConfig;

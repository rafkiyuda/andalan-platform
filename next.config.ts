import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable turbopack for production builds (WASM bindings issue)
  // turbopack: false,
};

export default nextConfig;

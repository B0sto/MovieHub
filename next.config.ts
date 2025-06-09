import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  /* config options here */
  images: {
    domains: ['image.tmdb.org'],
  }
};

export default nextConfig;

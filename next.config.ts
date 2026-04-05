import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
    turbopackFileSystemCacheForDev: true,

  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "deluxes.s3.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;

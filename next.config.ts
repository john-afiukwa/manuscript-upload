import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/manuscripts",
        permanent: true,
      },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
};

export default nextConfig;

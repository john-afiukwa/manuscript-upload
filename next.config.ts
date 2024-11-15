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
  async headers() {
    return [
      {
        source: "/auth/signin",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "same-origin-allow-popups",
          },
        ],
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

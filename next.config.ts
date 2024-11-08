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
  }
};

export default nextConfig;
// klárt fyrir serverless
// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.thecocktaildb.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here *//** @type {import('next').NextConfig} */
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
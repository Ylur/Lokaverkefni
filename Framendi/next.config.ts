// next.config.ts

import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.themealdb.com', 'www.thecocktaildb.com'], // Add your external image domains here
  },
  // Other configurations...
};

export default nextConfig;

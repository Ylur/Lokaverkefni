/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;

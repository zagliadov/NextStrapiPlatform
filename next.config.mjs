import path from "path";
/** @type {import('next').NextConfig} */
const currentDir = path.resolve('.');
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false };
    }

    config.node = {
      __dirname: true,
    };
    config.resolve.alias['@'] = path.resolve(currentDir);

    return config;
  },
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

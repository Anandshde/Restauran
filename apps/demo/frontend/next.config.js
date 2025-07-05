/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_APP_MODE: "demo",
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
    NEXT_PUBLIC_DEMO_MODE: "true",
    NEXT_PUBLIC_ENABLE_MOCK_PAYMENTS: "true",
    NEXT_PUBLIC_ENABLE_DEMO_RESET: "true",
    NEXT_PUBLIC_CLOUDINARY_ENABLED: "false",
    NEXT_PUBLIC_SOCKET_ENABLED: "true",
  },
  images: {
    domains: ["localhost", "res.cloudinary.com"],
    unoptimized: true, // For demo purposes
  },
  transpilePackages: ["@restaurant/shared"],
  webpack: (config, { isServer }) => {
    // Handle shared package imports
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;

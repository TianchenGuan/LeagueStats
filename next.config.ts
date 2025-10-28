import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.communitydragon.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd28xe8vt774jo5.cloudfront.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

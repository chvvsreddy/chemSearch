import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pubchem.ncbi.nlm.nih.gov',
        pathname: '/image/**',
      },
    ],
  },
};

export default nextConfig;

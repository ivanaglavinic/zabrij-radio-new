import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thumbnailer.mixcloud.com",
        port: "",
        pathname: "/**", // allow all paths from this domain
      },
    ],
  },
};

export default nextConfig;

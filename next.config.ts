import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export
  output: "export",

  // Image configuration for external sources
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

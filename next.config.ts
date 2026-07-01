import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder media is served from Unsplash + YouTube thumbnails.
    // Swap these for Vanna's real hosted assets (or /public files) later.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;

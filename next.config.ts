import type { NextConfig } from "next";

/**
 * The site normally builds as a full Next.js app (API routes + optimized images)
 * for a host like Vercel. When GITHUB_PAGES=true it builds a *static export* to
 * `out/` for GitHub Pages (a visual preview — the email API routes don't run
 * there; see the deploy workflow, which strips app/api for that build).
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  images: {
    // Static export can't use the Next image optimizer.
    unoptimized: isPages,
    // Placeholder media is served from Unsplash + YouTube thumbnails.
    // Swap these for Vanna's real hosted assets (or /public files) later.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  ...(isPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: basePath || undefined,
        assetPrefix: basePath || undefined,
      }
    : {}),
};

export default nextConfig;

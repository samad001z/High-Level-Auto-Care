import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain site to /out that any host can serve
// (Vercel, Netlify, Cloudflare Pages, S3, cPanel). Images are pre-optimised in /public/img.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

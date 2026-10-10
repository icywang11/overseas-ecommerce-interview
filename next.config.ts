import type { NextConfig } from "next";

const repo = process.env.GITHUB_PAGES === "1" ? "/overseas-ecommerce-interview" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: repo || undefined,
  assetPrefix: repo || undefined,
  trailingSlash: true,
};

export default nextConfig;

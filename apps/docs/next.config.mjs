import { createMDX } from "fumadocs-mdx/next";

const nextConfig = {
  basePath: "/shinejs",
  images: {
    unoptimized: true,
  },
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
};

const withMDX = createMDX();

export default withMDX(nextConfig);

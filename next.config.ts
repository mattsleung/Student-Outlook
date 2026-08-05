import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPagesBuild ? "/Student-Outlook" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    // 404 global para URLs que não correspondem a nenhuma rota (o layout raiz fica em app/[lang]).
    globalNotFound: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [75, 85],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

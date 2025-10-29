import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.mux.com" },
      { protocol: "https", hostname: "nlpnsau4t4.ufs.sh" },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      { source: "/shop", destination: "/#menu", permanent: false },
      { source: "/menu", destination: "/#menu", permanent: false },
      { source: "/collections", destination: "/#menu", permanent: false },
      { source: "/collections/:path*", destination: "/#menu", permanent: false },
      { source: "/products/:path*", destination: "/#menu", permanent: false },
      { source: "/cart", destination: "/", permanent: false },
      { source: "/checkout", destination: "/", permanent: false },
      { source: "/account", destination: "/", permanent: false },
      { source: "/account/:path*", destination: "/", permanent: false },
      { source: "/search", destination: "/#menu", permanent: false },
      { source: "/wholesale", destination: "/#wholesale", permanent: false },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const getApiUrl = () => {
  // 우선순위: NEXT_PUBLIC_API_URL > API_URL > DEPLOYMENT_ENV > 기본값
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (process.env.API_URL) {
    return process.env.API_URL;
  }
}

const API_URL = getApiUrl();

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${API_URL}/api/v1/:path*`,
      },
      {
        source: "/admin-api/:path*",
        destination: `${API_URL}/admin-api/:path*`,
      },
    ]
  }
};

export default nextConfig;

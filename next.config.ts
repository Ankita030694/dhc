import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://www.opentable.co.uk https://opentable.co.uk https://*.opentable.co.uk; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.opentable.co.uk https://opentable.co.uk https://*.opentable.co.uk https://cdnjs.cloudflare.com;",
          },
        ],
      },
    ];
  },
  images: {
    domains: ['www.opentable.co.uk', 'opentable.co.uk'],
  },
};

export default nextConfig;

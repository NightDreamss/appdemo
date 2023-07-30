/** @type {import('next').NextConfig} */
const crypto = require("crypto");
const nonce = crypto.randomBytes(16).toString("base64");
const production = process.env.UAT;
const ContentSecurityPolicy = ({ nonce }) => `
  default-src 'self';
  img-src 'self' blob: data: avatars.dicebear.com tile.openstreetmap.org *.tile.openstreetmap.org;
  frame-ancestors 'self';
  manifest-src 'self';
  base-uri 'self';
  form-action 'self';
  media-src 'self' data: blob:;
  frame-src 'self';
  connect-src 'self' avatars.dicebear.com nominatim.openstreetmap.org *.tile.openstreetmap.org;
  report-uri 'self';
  object-src 'self' data: ;
  script-src 'self' 'nonce-${nonce}' ${production ? "" : "'unsafe-eval'"};
  style-src 'report-sample' 'unsafe-inline' 'self';
  font-src 'self' data:;  
`;

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Robots-Tag",
    value: "bingbot: all",
  },
  {
    key: "X-Robots-Tag",
    value: "googlebot: all",
  },
  {
    key: "Permissions-Policy",
    value:
      "geolocation=(), payment=(), camera=(), microphone=(), display-capture=(), fullscreen=()",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy({ nonce })
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
];

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  crossOrigin: "anonymous",
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ["avatars.dicebear.com"],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;

import type { NextConfig } from "next";

// ───────────────────────────────────────────────────────────────────────────
// Content-Security-Policy.
// Балансирана политика: ограничава външните връзки до познати хостове
// (Sanity CDN/API, Google Maps за картата в /contacts), но допуска това,
// което вграденият Sanity Studio (/studio) и Next.js реално ползват
// ('unsafe-inline' / 'unsafe-eval' за Studio и styled-components, blob: за
// worker-и). frame-ancestors/object-src/base-uri остават заключени.
// ───────────────────────────────────────────────────────────────────────────
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://*.sanity-cdn.com",
  "worker-src 'self' blob:",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io https://*.sanity-cdn.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://*.sanity-cdn.com",
  "frame-src 'self' https://maps.google.com https://www.google.com",
  "media-src 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  images: {
    // Next 16 по подразбиране разрешава само quality 75; добавяме 90 за
    // hero банера (LCP), за да не се coerce-ва обратно до 75.
    qualities: [75, 90, 100],
    // Разрешаваме изображения, качени в Sanity (CDN-а на Sanity).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        // Важи за всички маршрути.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
    ],

    formats: ['image/avif', 'image/webp'],

    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Kompresja (domyślnie włączona, ale można wyłączyć jeśli jest CDN)
  compress: true,

  // Optymalizacja dla produkcji
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: {
        exclude: ['error', 'warn'], // Zostaw error i warn w produkcji
      },
    },
  }),
};

module.exports = nextConfig;

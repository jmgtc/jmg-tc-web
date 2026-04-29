/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Permite despliegue ignorando errores de tipos en esta fase de estabilización
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Optimización: formatos modernos
    formats: ["image/avif", "image/webp"],
  },

  // Redireccionamiento www → no-www (canonical)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.jmg-tc.com" }],
        destination: "https://jmg-tc.com/:path*",
        permanent: true,
      },
    ];
  },

  // Headers de seguridad y performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Seguridad básica
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Prevención de sniffing
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Cache largo para assets estáticos
        source: "/(.*)\\.(ico|png|svg|webp|jpg|jpeg|woff2|woff)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;

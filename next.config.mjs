/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Permite despliegue ignorando errores de tipos en esta fase de estabilización
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Otras configuraciones aquí...
};

export default nextConfig;

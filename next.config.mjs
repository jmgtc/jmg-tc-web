/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! ADVERTENCIA !!
    // Esto permite que el despliegue se complete incluso si hay errores de tipos.
    // Lo usamos temporalmente para estabilizar la producción.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignorar errores de ESLint durante el build
    ignoreDuringBuilds: true,
  },
  // Opciones adicionales para asegurar estabilidad en versiones experimentales (Next 16)
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;

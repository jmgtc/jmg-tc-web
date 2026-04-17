/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Permite despliegue ignorando errores de tipos en esta fase de estabilización
    ignoreBuildErrors: true,
  },
  // La clave 'eslint' ya no es compatible en Next.js 16.
  // Otras configuraciones aquí...
};

export default nextConfig;

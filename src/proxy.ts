import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/profile(.*)', '/orders(.*)']);

// Rutas que Clerk no debe interceptar — siempre accesibles sin sesión
const isPublicRoute = createRouteMatcher([
  '/',
  '/blog(.*)',
  '/servicios(.*)',
  '/nosotros(.*)',
  '/contacto(.*)',
  '/legal(.*)',
  '/newsletter(.*)',
  '/maintenance(.*)',
  '/api/webhooks/(.*)',
  '/sitemap.xml',
  '/robots.txt',
]);

// En Next.js 16, la función debe llamarse 'proxy' y exportarse de forma nombrada
export const proxy = clerkMiddleware(async (auth, request) => {
  // Simplificamos el modo mantenimiento para evitar I/O pesado en el proxy (recomendación Next 16)
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  const hasAccessCookie = request.cookies.has('admin_access');
  const isMaintenancePage = request.nextUrl.pathname === '/maintenance';
  const isPublicAsset = request.nextUrl.pathname.startsWith('/_next') || 
                        request.nextUrl.pathname.startsWith('/api') ||
                        request.nextUrl.pathname.includes('.');

  // Lógica de Mantenimiento básica
  if (maintenanceMode && !hasAccessCookie && !isMaintenancePage && !isPublicAsset) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  // Lógica de Clerk (Protección de rutas)
  if (isProtectedRoute(request)) {
    await auth.protect();
  }

  // Rutas públicas: no aplicar ninguna restricción de Clerk
  // (evita dev-browser-missing en producción para SSG prerenderizadas)
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Excluir archivos estáticos de Next.js y rutas públicas del blog
    // Clerk no debe correr en rutas del blog — sus headers rompen SSG en producción
    '/((?!_next/static|_next/image|favicon.ico|public|blog).*)',
  ],
};

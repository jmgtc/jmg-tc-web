import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/profile(.*)', '/orders(.*)']);

export default clerkMiddleware(async (auth, request) => {
  // 1. Prioridad: Variable de entorno (para apagado de emergencia)
  let maintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  // 2. Consulta dinámica a Sanity (para control desde el panel)
  try {
    const projectId = 'mfth4gqi';
    const dataset = 'production';
    const query = encodeURIComponent('*[_type == "siteSettings"][0]{maintenanceMode}');
    const url = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${query}`;
    
    // Usamos fetch con caché corta para equilibrio entre velocidad y frescura
    const response = await fetch(url, { next: { revalidate: 30 } } as any);
    const { result } = await response.json();
    
    if (result && typeof result.maintenanceMode === 'boolean') {
      if (result.maintenanceMode) maintenanceMode = true;
    }
  } catch (error) {
    console.error('Error fetching maintenance status from Sanity:', error);
  }

  const hasAccessCookie = request.cookies.has('admin_access');
  const isMaintenancePage = request.nextUrl.pathname === '/maintenance';
  const isPublicAsset = request.nextUrl.pathname.startsWith('/_next') || 
                        request.nextUrl.pathname.startsWith('/api') ||
                        request.nextUrl.pathname.includes('.');

  // Lógica de Mantenimiento
  if (maintenanceMode && !hasAccessCookie && !isMaintenancePage && !isPublicAsset) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  if (!maintenanceMode && isMaintenancePage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Lógica de Clerk (Protección de rutas)
  if (isProtectedRoute(request)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (static public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};

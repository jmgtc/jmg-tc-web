import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
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
      // Si Sanity dice true, activamos (incluso si la env var es false)
      if (result.maintenanceMode) maintenanceMode = true;
    }
  } catch (error) {
    console.error('Error fetching maintenance status from Sanity:', error);
  }

  const hasAccessCookie = request.cookies.has('admin_access');

  // Skip middleware for maintenance page itself, assets, and api routes that might handle login
  const isMaintenancePage = request.nextUrl.pathname === '/maintenance';
  const isPublicAsset = request.nextUrl.pathname.startsWith('/_next') || 
                        request.nextUrl.pathname.startsWith('/api') ||
                        request.nextUrl.pathname.includes('.');

  if (maintenanceMode && !hasAccessCookie && !isMaintenancePage && !isPublicAsset) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  // If maintenance is OFF but user is on /maintenance, redirect to home
  if (!maintenanceMode && isMaintenancePage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
export default middleware;

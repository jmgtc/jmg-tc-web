/**
 * Google Business Profile - Simulator
 * 
 * Este módulo actúa como mock de la API oficial de Google My Business.
 * Permite validar la arquitectura y el flujo en Modo Guardián sin conectar OAuth real.
 */

export interface GBPPostRequest {
  summary: string;
  callToAction: {
    actionType: string;
    url: string;
  };
}

export async function publishToGoogleBusinessAPI(request: GBPPostRequest, simulateError: boolean = false) {
  console.log('[GBP Simulator] Iniciando publicación simulada...', request);
  
  // Simulamos delay de red
  await new Promise(resolve => setTimeout(resolve, 800));

  if (simulateError) {
    throw new Error('GBP_API_ERROR_SIMULATED: Falla en la conexión con la API de Google Business.');
  }

  const simulatedPostId = `gbp_mock_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  console.log(`[GBP Simulator] Publicación exitosa. ID: ${simulatedPostId}`);

  return {
    name: `accounts/123/locations/456/localPosts/${simulatedPostId}`,
    state: 'LIVE',
    createTime: new Date().toISOString()
  };
}

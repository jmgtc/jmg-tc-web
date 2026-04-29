// Server Component — solo exporta metadata y viewport
// El Studio en sí corre en StudioPage.tsx (Client Component)
export { metadata, viewport } from 'next-sanity/studio';

import StudioPage from './StudioPage';

export default function AdminPage() {
  return <StudioPage />;
}

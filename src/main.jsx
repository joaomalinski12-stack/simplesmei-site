import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { SiteV5 } from './preco_cta.jsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const App = () => (
  <>
    <SiteV5 />
    <Analytics />
    <SpeedInsights />
  </>
);

const root = document.getElementById('root');
// Produção: HTML pré-renderizado (root já tem conteúdo) → hidrata.
// Dev (vite): root vem vazio → render normal.
if (root.firstElementChild) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}

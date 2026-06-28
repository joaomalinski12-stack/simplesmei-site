import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { SiteV5 } from './preco_cta.jsx';

const root = document.getElementById('root');
// Produção: HTML pré-renderizado (root já tem conteúdo) → hidrata.
// Dev (vite): root vem vazio → render normal.
if (root.firstElementChild) {
  hydrateRoot(root, <SiteV5 />);
} else {
  createRoot(root).render(<SiteV5 />);
}

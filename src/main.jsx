import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { SiteV5 } from './preco_cta.jsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Termos } from './termos.jsx';
import { Privacidade } from './privacidade.jsx';
import { Sobre, Imprensa, Carreiras, Contato } from './institucional.jsx';

const App = ({ path }) => {
  let PageComponent = SiteV5;
  if (path === '/termos') PageComponent = Termos;
  if (path === '/privacidade') PageComponent = Privacidade;
  if (path === '/sobre') PageComponent = Sobre;
  if (path === '/imprensa') PageComponent = Imprensa;
  if (path === '/carreiras') PageComponent = Carreiras;
  if (path === '/contato') PageComponent = Contato;

  return (
    <>
      <PageComponent />
      <Analytics />
      <SpeedInsights />
    </>
  );
};

const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

const root = document.getElementById('root');
// Produção: HTML pré-renderizado (root já tem conteúdo) → hidrata.
// Dev (vite): root vem vazio → render normal.
if (root.firstElementChild) {
  hydrateRoot(root, <App path={currentPath} />);
} else {
  createRoot(root).render(<App path={currentPath} />);
}

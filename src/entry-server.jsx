import React from 'react';
import { renderToString } from 'react-dom/server';
import { SiteV5 } from './preco_cta.jsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Termos } from './termos.jsx';
import { Privacidade } from './privacidade.jsx';

const App = ({ path }) => {
  let PageComponent = SiteV5;
  if (path === '/termos') PageComponent = Termos;
  if (path === '/privacidade') PageComponent = Privacidade;

  return (
    <>
      <PageComponent />
      <Analytics />
      <SpeedInsights />
    </>
  );
};

/* Entry de SSR usado só no build (por prerender.js) pra gerar o HTML estático.
   Não é carregado pelo navegador. */
export function render(path = '/') {
  return renderToString(<App path={path} />);
}

import React from 'react';
import { renderToString } from 'react-dom/server';
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

/* Entry de SSR usado só no build (por prerender.js) pra gerar o HTML estático da home.
   Não é carregado pelo navegador. */
export function render() {
  return renderToString(<App />);
}

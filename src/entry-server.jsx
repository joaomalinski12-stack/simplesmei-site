import React from 'react';
import { renderToString } from 'react-dom/server';
import { SiteV5 } from './preco_cta.jsx';

/* Entry de SSR usado só no build (por prerender.js) pra gerar o HTML estático da home.
   Não é carregado pelo navegador. */
export function render() {
  return renderToString(<SiteV5 />);
}

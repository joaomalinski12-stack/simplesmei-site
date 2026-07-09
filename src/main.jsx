import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { SiteV5 } from './preco_cta.jsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Termos } from './termos.jsx';
import { Privacidade } from './privacidade.jsx';
import { Sobre, Imprensa, Carreiras, Contato } from './institucional.jsx';
import { BlogList, BlogPost, BlogCategory } from './blog.jsx';
import { ConsultaCnaeMei } from './ferramenta_cnae.jsx';
import { WaitlistPage } from './lista_espera.jsx';

import { CookieBanner } from './cookie_banner.jsx';

const App = ({ path }) => {
  let PageComponent = SiteV5;
  let pageProps = {};

  if (path === '/termos') PageComponent = Termos;
  else if (path === '/privacidade') PageComponent = Privacidade;
  else if (path === '/sobre') PageComponent = Sobre;
  else if (path === '/imprensa') PageComponent = Imprensa;
  else if (path === '/carreiras') PageComponent = Carreiras;
  else if (path === '/contato') PageComponent = Contato;
  else if (path === '/lista-de-espera') PageComponent = WaitlistPage;
  else if (path === '/ferramentas/consulta-cnae-mei') PageComponent = ConsultaCnaeMei;
  else if (path === '/blog') PageComponent = BlogList;
  else if (path.startsWith('/blog/categoria/')) {
    PageComponent = BlogCategory;
    pageProps = { slug: path.replace('/blog/categoria/', '') };
  }
  else if (path.startsWith('/blog/')) {
    PageComponent = BlogPost;
    pageProps = { slug: path.replace('/blog/', '') };
  }

  return (
    <>
      <PageComponent {...pageProps} />
      <CookieBanner />
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

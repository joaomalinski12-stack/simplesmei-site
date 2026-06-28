/* Pós-build: injeta o HTML pré-renderizado da home no dist/index.html.
   Roda depois de `vite build` (cliente) e `vite build --ssr` (entry-server). */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distIndex = resolve(__dirname, 'dist/index.html');
const ssrEntry = pathToFileURL(resolve(__dirname, 'dist-ssr/entry-server.js')).href;

const { render } = await import(ssrEntry);
const template = readFileSync(distIndex, 'utf-8');
const rootRe = /<div id="root">\s*<\/div>/;

if (!rootRe.test(template)) {
  console.error('prerender: <div id="root"></div> não encontrado em dist/index.html — abortando.');
  process.exit(1);
}

import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const routes = ['/', '/termos', '/privacidade', '/sobre', '/imprensa', '/carreiras', '/contato'];

for (const route of routes) {
  const appHtml = render(route);
  let html = template.replace(rootRe, `<div id="root">${appHtml}</div>`);
  
  // Custom SEO tags per route
  let title = 'SimplesMEI · Seu fiscal do MEI no WhatsApp';
  let description = 'A IA que cuida do fiscal do seu MEI dentro do WhatsApp. Você manda a mensagem do seu jeito, ela emite a nota, cuida do DAS, da recorrência e do teto. Sem portal, sem app, sem contador.';
  let canonicalPath = route;

  if (route === '/termos') {
    title = 'Termos de Uso | SimplesMEI';
    description = 'Termos de uso do serviço SimplesMEI. Saiba como nossa inteligência artificial interage via WhatsApp para facilitar o dia a dia do Microempreendedor Individual.';
  } else if (route === '/privacidade') {
    title = 'Política de Privacidade | SimplesMEI';
    description = 'Política de Privacidade e LGPD do SimplesMEI. Transparência sobre o uso de dados, não-treinamento de IA pública e proteção do seu MEI.';
  } else if (route === '/sobre') {
    title = 'Sobre a Empresa | SimplesMEI';
    description = 'Conheça a história da SimplesMEI e nossa missão de usar inteligência artificial no WhatsApp para desburocratizar a contabilidade no Brasil.';
  } else if (route === '/imprensa') {
    title = 'Imprensa | SimplesMEI';
    description = 'Media kit, contatos para a mídia e informações sobre a SimplesMEI para veículos de imprensa.';
  } else if (route === '/carreiras') {
    title = 'Carreiras | SimplesMEI';
    description = 'Trabalhe conosco na SimplesMEI. Buscamos talentos em engenharia, design e IA para transformar a contabilidade no Brasil.';
  } else if (route === '/contato') {
    title = 'Contato | SimplesMEI';
    description = 'Fale com o suporte da SimplesMEI via WhatsApp ou E-mail. Estamos aqui para ajudar o seu MEI.';
  }

  // Substituições de SEO no HTML gerado
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${description}">`);
  html = html.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="https://simplesmei.net${canonicalPath === '/' ? '' : canonicalPath}">`);
  html = html.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${title}">`);
  html = html.replace(/<meta property="og:url" content=".*?">/, `<meta property="og:url" content="https://simplesmei.net${canonicalPath === '/' ? '' : canonicalPath}">`);
  html = html.replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${description}">`);

  let outPath = distIndex;
  if (route !== '/') {
    const dir = join(resolve(__dirname, 'dist'), route);
    mkdirSync(dir, { recursive: true });
    outPath = join(dir, 'index.html');
  }
  
  writeFileSync(outPath, html);
  console.log(`✅ prerender: rota ${route} injetada (${appHtml.length} chars)`);
}

/* Pós-build: injeta o HTML pré-renderizado da home no dist/index.html.
   Roda depois de `vite build` (cliente) e `vite build --ssr` (entry-server). */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distIndex = resolve(__dirname, 'dist/index.html');
const ssrEntry = pathToFileURL(resolve(__dirname, 'dist-ssr/entry-server.js')).href;

const { render } = await import(ssrEntry);
const appHtml = render();

const template = readFileSync(distIndex, 'utf-8');
const rootRe = /<div id="root">\s*<\/div>/;
if (!rootRe.test(template)) {
  console.error('prerender: <div id="root"></div> não encontrado em dist/index.html — abortando.');
  process.exit(1);
}
writeFileSync(distIndex, template.replace(rootRe, `<div id="root">${appHtml}</div>`));
console.log(`✅ prerender: ${appHtml.length} chars de HTML injetados em dist/index.html`);

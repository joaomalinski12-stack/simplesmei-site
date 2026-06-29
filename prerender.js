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

import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import fm from 'front-matter';

const routes = ['/', '/termos', '/privacidade', '/sobre', '/imprensa', '/carreiras', '/contato', '/lista-de-espera', '/blog'];

// Lê os posts para gerar rotas dinâmicas
const postsDir = resolve(__dirname, 'src/posts');
const postFiles = readdirSync(postsDir).filter(f => f.endsWith('.md'));
const blogMeta = {};

for (const file of postFiles) {
  const slug = file.replace('.md', '');
  routes.push(`/blog/${slug}`);
  
  const content = readFileSync(join(postsDir, file), 'utf-8');
  const parsed = fm(content);
  blogMeta[slug] = parsed.attributes;
}

for (const route of routes) {
  const appHtml = render(route);
  let html = template.replace(rootRe, `<div id="root">${appHtml}</div>`);

  // Rotas != home: o @graph da home traz SoftwareApplication + FAQPage, que são específicos
  // da home. Mantém só Organization + WebSite (sitewide) nas outras páginas, pra não vazar a
  // FAQPage do produto pro blog/institucionais. (O Article/FAQPage do post é anexado depois.)
  if (route !== '/') {
    html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (m, json) => {
      try {
        const data = JSON.parse(json);
        if (Array.isArray(data['@graph'])) {
          data['@graph'] = data['@graph'].filter(n => n['@type'] === 'Organization' || n['@type'] === 'WebSite');
          return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
        }
      } catch (e) { /* se não parsear, mantém como está */ }
      return m;
    });
  }

  // Custom SEO tags per route
  let title = 'Emita a nota fiscal do MEI pelo WhatsApp · SimplesMEI';
  let description = 'Emita a nota fiscal do seu MEI por uma mensagem no WhatsApp. A IA cuida do DAS, da recorrência e do teto — sem portal, sem app, sem contador.';
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
  } else if (route === '/lista-de-espera') {
    title = 'Lista de espera | SimplesMEI';
    description = 'Entre na lista de espera do SimplesMEI, a IA que cuida do fiscal do seu MEI no WhatsApp. A gente te avisa assim que abrir as primeiras vagas.';
  } else if (route === '/blog') {
    title = 'Blog | SimplesMEI';
    description = 'Dicas, tutoriais e novidades para facilitar a vida do Microempreendedor Individual.';
  } else if (route.startsWith('/blog/')) {
    const slug = route.replace('/blog/', '');
    if (blogMeta[slug]) {
      title = `${blogMeta[slug].title} | SimplesMEI`;
      description = blogMeta[slug].description || title;
      
      // Injeta JSON-LD de Artigo
      const schemas = [];
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": blogMeta[slug].title,
        "description": description,
        "datePublished": blogMeta[slug].date,
        "author": {
          "@type": "Person",
          "name": blogMeta[slug].author || "Equipe SimplesMEI"
        }
      });
      
      if (blogMeta[slug].faq && blogMeta[slug].faq.length > 0) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": blogMeta[slug].faq.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
          }))
        });
      }
      
      // Se houver mais de um, podemos gerar uma string combinada (embora array no JSON-LD seja válido, o ideal é injetar separados ou num graph)
      const jsonLdString = schemas.map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`).join('\n');
      html = html.replace('</head>', `${jsonLdString}\n</head>`);
    }
  }

  // Substituições de SEO no HTML gerado
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${description}">`);
  html = html.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="https://simplesmei.net${canonicalPath === '/' ? '' : canonicalPath}">`);
  html = html.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${title}">`);
  html = html.replace(/<meta property="og:url" content=".*?">/, `<meta property="og:url" content="https://simplesmei.net${canonicalPath === '/' ? '' : canonicalPath}">`);
  html = html.replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${description}">`);

  // Lista de espera é uma página transitória de captura — fora do índice (mas segue links).
  if (route === '/lista-de-espera') {
    html = html.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, follow">');
  }

  let outPath = distIndex;
  if (route !== '/') {
    const dir = join(resolve(__dirname, 'dist'), route);
    mkdirSync(dir, { recursive: true });
    outPath = join(dir, 'index.html');
  }
  
  writeFileSync(outPath, html);
  console.log(`✅ prerender: rota ${route} injetada (${appHtml.length} chars)`);
}

// Injeta rotas dinâmicas do blog no sitemap.xml
try {
  const sitemapPath = join(resolve(__dirname, 'dist'), 'sitemap.xml');
  let sitemap = readFileSync(sitemapPath, 'utf-8');
  
  // Remove o fechamento da tag
  sitemap = sitemap.replace('</urlset>', '');
  
  // Adiciona a listagem principal do blog
  sitemap += `  <url>\n    <loc>https://simplesmei.net/blog</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

  // Adiciona os posts individuais
  for (const slug of Object.keys(blogMeta)) {
    const date = blogMeta[slug].date ? new Date(blogMeta[slug].date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    sitemap += `  <url>\n    <loc>https://simplesmei.net/blog/${slug}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  }
  
  // Fecha a tag novamente
  sitemap += '</urlset>\n';
  writeFileSync(sitemapPath, sitemap);
  console.log('✅ prerender: sitemap.xml atualizado com rotas do blog');
} catch (e) {
  console.error('❌ Erro ao atualizar sitemap.xml', e);
}

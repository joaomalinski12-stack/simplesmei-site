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
import { CATS } from './src/blog_cats.js';
import { FAQ_ITEMS } from './src/data/cnae_mei.js';
import { SPOKES } from './src/data/spokes.js';

const routes = ['/', '/termos', '/privacidade', '/sobre', '/imprensa', '/carreiras', '/contato', '/lista-de-espera', '/ferramentas', '/ferramentas/consulta-cnae-mei', '/blog'];
for (const slug of Object.keys(SPOKES)) routes.push(`/ferramentas/consulta-cnae-mei/${slug}`);

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

// Rotas de categoria (hubs indexáveis) — /blog/categoria/<slug>
for (const c of CATS) routes.push(`/blog/categoria/${c.slug}`);

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
    title = 'Termos de Uso · SimplesMEI';
    description = 'Termos de uso do serviço SimplesMEI. Saiba como nossa inteligência artificial interage via WhatsApp para facilitar o dia a dia do Microempreendedor Individual.';
  } else if (route === '/privacidade') {
    title = 'Política de Privacidade · SimplesMEI';
    description = 'Política de Privacidade e LGPD do SimplesMEI. Transparência sobre o uso de dados, não-treinamento de IA pública e proteção do seu MEI.';
  } else if (route === '/sobre') {
    title = 'Sobre a Empresa · SimplesMEI';
    description = 'Conheça a história da SimplesMEI e nossa missão de usar inteligência artificial no WhatsApp para desburocratizar a contabilidade no Brasil.';
  } else if (route === '/imprensa') {
    title = 'Imprensa · SimplesMEI';
    description = 'Media kit, contatos para a mídia e informações sobre a SimplesMEI para veículos de imprensa.';
  } else if (route === '/carreiras') {
    title = 'Carreiras · SimplesMEI';
    description = 'Trabalhe conosco na SimplesMEI. Buscamos talentos em engenharia, design e IA para transformar a contabilidade no Brasil.';
  } else if (route === '/contato') {
    title = 'Contato · SimplesMEI';
    description = 'Fale com o suporte da SimplesMEI via WhatsApp ou E-mail. Estamos aqui para ajudar o seu MEI.';
  } else if (route === '/lista-de-espera') {
    title = 'Lista de espera · SimplesMEI';
    description = 'Entre na lista de espera do SimplesMEI, a IA que cuida do fiscal do seu MEI no WhatsApp. A gente te avisa assim que abrir as primeiras vagas.';
  } else if (route === '/ferramentas/consulta-cnae-mei') {
    title = 'Consulta CNAE MEI grátis: sua atividade pode ser MEI? · SimplesMEI';
    description = 'Consulta CNAE MEI grátis: digite sua profissão e veja na hora se pode ser MEI, qual o CNAE e o imposto. Lista oficial das 466 ocupações permitidas ao MEI.';
    // @graph próprio da ferramenta: BreadcrumbList + WebApplication + FAQPage (FAQ idêntico ao da página).
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://simplesmei.net" },
            { "@type": "ListItem", "position": 2, "name": "Ferramentas", "item": "https://simplesmei.net/ferramentas" },
            { "@type": "ListItem", "position": 3, "name": "Consulta CNAE MEI", "item": "https://simplesmei.net/ferramentas/consulta-cnae-mei" }
          ]
        },
        {
          "@type": "WebApplication",
          "name": "Consulta CNAE MEI — SimplesMEI",
          "url": "https://simplesmei.net/ferramentas/consulta-cnae-mei",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "inLanguage": "pt-BR",
          "description": "Descubra na hora se sua atividade pode ser MEI, qual o CNAE e o imposto. Grátis e sem cadastro.",
          "featureList": [
            "Busca por profissão ou apelido",
            "Busca semântica que entende como você fala",
            "CNAE e código oficial da atividade",
            "Imposto ISS ou ICMS por atividade",
            "Detecção de atividade não permitida ao MEI",
            "Grátis e sem cadastro"
          ],
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
          "provider": { "@type": "Organization", "name": "SimplesMEI", "url": "https://simplesmei.net" }
        },
        {
          "@type": "FAQPage",
          "mainEntity": FAQ_ITEMS.map(it => ({
            "@type": "Question", "name": it.q,
            "acceptedAnswer": { "@type": "Answer", "text": it.a }
          }))
        }
      ]
    };
    html = html.replace('</head>', `<script type="application/ld+json">\n${JSON.stringify(graph, null, 2)}\n</script>\n</head>`);
  } else if (route === '/ferramentas') {
    title = 'Ferramentas grátis para o MEI: CNAE, atividades e mais · SimplesMEI';
    description = 'Ferramentas grátis pra o MEI, sem cadastro: descubra se sua atividade pode ser MEI, qual o CNAE e o imposto. Feitas pela IA que cuida do fiscal do MEI no WhatsApp.';
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://simplesmei.net" },
          { "@type": "ListItem", "position": 2, "name": "Ferramentas", "item": "https://simplesmei.net/ferramentas" }
        ] },
        { "@type": "CollectionPage", "name": "Ferramentas para o MEI", "url": "https://simplesmei.net/ferramentas", "inLanguage": "pt-BR", "isPartOf": { "@type": "WebSite", "name": "SimplesMEI", "url": "https://simplesmei.net" } }
      ]
    };
    html = html.replace('</head>', `<script type="application/ld+json">\n${JSON.stringify(graph, null, 2)}\n</script>\n</head>`);
  } else if (route.startsWith('/ferramentas/consulta-cnae-mei/')) {
    const slug = route.replace('/ferramentas/consulta-cnae-mei/', '');
    const s = SPOKES[slug];
    if (s) {
      const sigla = s.conselho.split(' (')[0];
      title = `${s.nome} pode ser MEI? CNAE, imposto e o que fazer (2026) · SimplesMEI`;
      description = `${s.nome} NÃO pode ser MEI: é profissão regulamentada (${sigla}). Veja o CNAE ${s.cnae}, o porquê e como ter CNPJ e emitir nota.`;
      const url = `https://simplesmei.net/ferramentas/consulta-cnae-mei/${slug}`;
      const graph = {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "BreadcrumbList", "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://simplesmei.net" },
            { "@type": "ListItem", "position": 2, "name": "Ferramentas", "item": "https://simplesmei.net/ferramentas" },
            { "@type": "ListItem", "position": 3, "name": "Consulta CNAE MEI", "item": "https://simplesmei.net/ferramentas/consulta-cnae-mei" },
            { "@type": "ListItem", "position": 4, "name": s.nome, "item": url }
          ] },
          { "@type": "FAQPage", "mainEntity": [
            { "@type": "Question", "name": `${s.nome} pode ser MEI?`, "acceptedAnswer": { "@type": "Answer", "text": s.resposta } },
            ...s.faq.map(it => ({ "@type": "Question", "name": it.q, "acceptedAnswer": { "@type": "Answer", "text": it.a } }))
          ] }
        ]
      };
      html = html.replace('</head>', `<script type="application/ld+json">\n${JSON.stringify(graph, null, 2)}\n</script>\n</head>`);
    }
  } else if (route === '/blog') {
    title = 'Guias do MEI: nota fiscal, DAS, teto e benefícios · SimplesMEI';
    description = 'Nota fiscal, DAS, teto, INSS e regularização do MEI, sem juridiquês. Guias práticos pra resolver cada dúvida do seu CNPJ — tudo num lugar só.';
    // Trilha visível (Início › Blog) → BreadcrumbList. A CollectionPage/ItemList já vem do componente (no #root).
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://simplesmei.net" },
        { "@type": "ListItem", "position": 2, "name": "Blog" }
      ]
    };
    html = html.replace('</head>', `<script type="application/ld+json">\n${JSON.stringify(breadcrumb, null, 2)}\n</script>\n</head>`);
  } else if (route.startsWith('/blog/categoria/')) {
    const cslug = route.replace('/blog/categoria/', '');
    const cat = CATS.find(c => c.slug === cslug);
    if (cat) {
      title = `${cat.name} · Guias do MEI · SimplesMEI`;
      description = `${cat.desc}. Guias do MEI sobre ${cat.name.toLowerCase()}, sem juridiquês.`;
      // BreadcrumbList aqui; a CollectionPage/ItemList já vem do componente (no #root).
      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://simplesmei.net" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://simplesmei.net/blog" },
          { "@type": "ListItem", "position": 3, "name": cat.name }
        ]
      };
      html = html.replace('</head>', `<script type="application/ld+json">\n${JSON.stringify(breadcrumb, null, 2)}\n</script>\n</head>`);
    }
  } else if (route.startsWith('/blog/')) {
    const slug = route.replace('/blog/', '');
    if (blogMeta[slug]) {
      title = `${blogMeta[slug].title} · SimplesMEI`;
      description = blogMeta[slug].description || title;
      
      // Injeta JSON-LD de Artigo
      const schemas = [];
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": blogMeta[slug].title,
        "description": description,
        "datePublished": blogMeta[slug].date,
        "dateModified": blogMeta[slug].updated || blogMeta[slug].date,
        "author": {
          "@type": "Person",
          "name": blogMeta[slug].author || "Equipe SimplesMEI"
        }
      });

      // Trilha visível (Início › Blog › título) → BreadcrumbList
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://simplesmei.net" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://simplesmei.net/blog" },
          { "@type": "ListItem", "position": 3, "name": blogMeta[slug].title }
        ]
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
  // Twitter cards herdavam a copy da home em toda rota — espelha o og: por rota.
  html = html.replace(/<meta name="twitter:title" content=".*?">/, `<meta name="twitter:title" content="${title}">`);
  html = html.replace(/<meta name="twitter:description" content=".*?">/, `<meta name="twitter:description" content="${description}">`);

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
  
  // Hub de ferramentas + consulta de CNAE + spokes de profissão ("X pode ser MEI?")
  sitemap += `  <url>\n    <loc>https://simplesmei.net/ferramentas</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  sitemap += `  <url>\n    <loc>https://simplesmei.net/ferramentas/consulta-cnae-mei</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  for (const slug of Object.keys(SPOKES)) {
    sitemap += `  <url>\n    <loc>https://simplesmei.net/ferramentas/consulta-cnae-mei/${slug}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  }

  // Adiciona a listagem principal do blog
  sitemap += `  <url>\n    <loc>https://simplesmei.net/blog</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;

  // Adiciona os posts individuais
  for (const slug of Object.keys(blogMeta)) {
    const date = blogMeta[slug].date ? new Date(blogMeta[slug].date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    sitemap += `  <url>\n    <loc>https://simplesmei.net/blog/${slug}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  }

  // Adiciona os hubs de categoria
  for (const c of CATS) {
    sitemap += `  <url>\n    <loc>https://simplesmei.net/blog/categoria/${c.slug}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  }

  // Fecha a tag novamente
  sitemap += '</urlset>\n';
  writeFileSync(sitemapPath, sitemap);
  console.log('✅ prerender: sitemap.xml atualizado com rotas do blog');
} catch (e) {
  console.error('❌ Erro ao atualizar sitemap.xml', e);
}

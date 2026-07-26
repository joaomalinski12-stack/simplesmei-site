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
import { SPOKES, SPOKES_ATUALIZADO_EM } from './src/data/spokes.js';

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

  /* O sufixo de marca só entra se couber no limite da SERP (~60 chars).
     Ele fica no FIM, então quando o título estoura é ele o primeiro a ser cortado:
     aparecia como "… · Simples" e ainda empurrava o texto útil pra beira do corte.
     Nenhum title de post passa de 60 sozinho (o maior tem 59), então basta condicionar
     o sufixo pra 81 das 114 páginas pararem de truncar, sem reescrever título nenhum. */
  const LIMITE_TITLE = 60;
  const comMarca = (t, sufixo = ' · SimplesMEI') =>
    (t.length + sufixo.length <= LIMITE_TITLE ? t + sufixo : t);

  // Custom SEO tags per route
  let title = comMarca('Emita a nota fiscal do MEI pelo WhatsApp');
  let description = 'Emita a nota fiscal do seu MEI por uma mensagem no WhatsApp. A IA cuida do DAS, da recorrência e do teto — sem portal, sem app, sem contador.';
  let canonicalPath = route;

  if (route === '/termos') {
    title = comMarca('Termos de Uso');
    description = 'Termos de uso do serviço SimplesMEI. Saiba como nossa inteligência artificial interage via WhatsApp para facilitar o dia a dia do Microempreendedor Individual.';
  } else if (route === '/privacidade') {
    title = comMarca('Política de Privacidade');
    description = 'Política de Privacidade e LGPD do SimplesMEI. Transparência sobre o uso de dados, não-treinamento de IA pública e proteção do seu MEI.';
  } else if (route === '/sobre') {
    title = comMarca('Sobre a Empresa');
    description = 'Conheça a história da SimplesMEI e nossa missão de usar inteligência artificial no WhatsApp para desburocratizar a contabilidade no Brasil.';
  } else if (route === '/imprensa') {
    title = comMarca('Imprensa');
    description = 'Media kit, contatos para a mídia e informações sobre a SimplesMEI para veículos de imprensa.';
  } else if (route === '/carreiras') {
    title = comMarca('Carreiras');
    description = 'Trabalhe conosco na SimplesMEI. Buscamos talentos em engenharia, design e IA para transformar a contabilidade no Brasil.';
  } else if (route === '/contato') {
    title = comMarca('Contato');
    description = 'Fale com o suporte da SimplesMEI via WhatsApp ou E-mail. Estamos aqui para ajudar o seu MEI.';
  } else if (route === '/lista-de-espera') {
    title = comMarca('Lista de espera');
    description = 'Entre na lista de espera do SimplesMEI, a IA que cuida do fiscal do seu MEI no WhatsApp. A gente te avisa assim que abrir as primeiras vagas.';
  } else if (route === '/ferramentas/consulta-cnae-mei') {
    title = comMarca('Consulta CNAE MEI grátis: sua atividade pode ser MEI?');
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
          "@type": "Dataset",
          "name": "Ocupações permitidas ao MEI — Anexo XI da Resolução CGSN nº 140/2018",
          "description": "As 466 ocupações permitidas ao MEI (Anexo XI da Resolução CGSN nº 140/2018), com CNAE e tributo (ISS/ICMS) de cada uma, mais as profissões regulamentadas e atividades vedadas que não podem ser MEI. Pesquisável por busca semântica na ferramenta.",
          "url": "https://simplesmei.net/ferramentas/consulta-cnae-mei",
          "inLanguage": "pt-BR",
          "dateModified": "2026-07",
          "creator": { "@type": "Organization", "name": "SimplesMEI", "url": "https://simplesmei.net" },
          "isBasedOn": "https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei/atividades-permitidas",
          "keywords": ["CNAE MEI", "atividades permitidas MEI", "ocupações MEI", "quem pode ser MEI", "quem não pode ser MEI"]
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
    title = comMarca('Ferramentas grátis para o MEI: CNAE, atividades e mais');
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
      /* A keyword-alvo do spoke é "<profissão> pode ser MEI" e ela NUNCA sai do título.
         O que se ajusta é a cauda: "Representante comercial" sozinho já come 37 chars,
         então escolhemos a cauda mais informativa que ainda cabe nos 60. */
      const baseSpoke = `${s.nome} pode ser MEI?`;
      const caudas = [' CNAE, imposto e o que fazer (2026)', ' CNAE e o que fazer (2026)', ' O que fazer em 2026', ''];
      title = comMarca(baseSpoke + (caudas.find((c) => (baseSpoke + c).length <= LIMITE_TITLE) ?? ''));
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
    title = comMarca('Guias do MEI: nota fiscal, DAS, teto e benefícios');
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
      title = comMarca(`${cat.name} · Guias do MEI`);
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
      title = comMarca(blogMeta[slug].title);
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

  /* <lastmod> tem que ser a data em que o CONTEÚDO mudou, não a do build.
     Antes usávamos `new Date()` em 41 URLs (hub do blog, hubs de categoria, spokes e
     páginas de ferramenta), então um deploy de CSS re-carimbava todas como "modificadas
     hoje" — é assim que o Google aprende a ignorar o lastmod do site inteiro.
     Agora cada data vem do conteúdo, e quando não existe fonte honesta o campo
     simplesmente não sai: sitemap sem lastmod é válido e melhor que lastmod falso. */
  const url = (loc, { lastmod, changefreq, priority }) =>
    `  <url>\n    <loc>${loc}</loc>\n` +
    (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
    `    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;

  const dia = (d) => new Date(d).toISOString().split('T')[0];
  // `updated` vence `date`: é o campo que o ciclo de refresh bumpa quando o post muda
  // de substância (ver a skill seo-content). Sem nenhum dos dois, não inventamos data.
  const dataDoPost = (slug) => {
    const a = blogMeta[slug];
    const d = a.updated || a.date;
    return d ? dia(d) : null;
  };
  const maisRecente = (datas) => datas.filter(Boolean).sort().pop() || null;

  // Ferramentas: são aplicação, não conteúdo datado — sem fonte honesta de data, sai sem lastmod.
  sitemap += url('https://simplesmei.net/ferramentas', { changefreq: 'monthly', priority: '0.7' });
  sitemap += url('https://simplesmei.net/ferramentas/consulta-cnae-mei', { changefreq: 'monthly', priority: '0.8' });
  // Spokes: a data é declarada à mão em spokes.js, junto do conteúdo que ela descreve.
  for (const slug of Object.keys(SPOKES)) {
    sitemap += url(`https://simplesmei.net/ferramentas/consulta-cnae-mei/${slug}`,
      { lastmod: SPOKES_ATUALIZADO_EM, changefreq: 'monthly', priority: '0.7' });
  }

  // Blog: a listagem muda quando entra ou muda um post, então herda a data do mais recente.
  const todasAsDatas = Object.keys(blogMeta).map(dataDoPost);
  sitemap += url('https://simplesmei.net/blog',
    { lastmod: maisRecente(todasAsDatas), changefreq: 'daily', priority: '0.9' });

  for (const slug of Object.keys(blogMeta)) {
    sitemap += url(`https://simplesmei.net/blog/${slug}`,
      { lastmod: dataDoPost(slug), changefreq: 'monthly', priority: '0.8' });
  }

  // Hub de categoria: mesma lógica, restrita aos posts daquela categoria.
  for (const c of CATS) {
    const daCategoria = Object.keys(blogMeta)
      .filter((slug) => blogMeta[slug].category === c.name)
      .map(dataDoPost);
    sitemap += url(`https://simplesmei.net/blog/categoria/${c.slug}`,
      { lastmod: maisRecente(daCategoria), changefreq: 'weekly', priority: '0.7' });
  }

  // Fecha a tag novamente
  sitemap += '</urlset>\n';
  writeFileSync(sitemapPath, sitemap);
  console.log('✅ prerender: sitemap.xml atualizado com rotas do blog');
} catch (e) {
  console.error('❌ Erro ao atualizar sitemap.xml', e);
}

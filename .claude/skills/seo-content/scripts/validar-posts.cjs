#!/usr/bin/env node
/* Validador de posts do blog — parte mecânica das checklists da skill seo-content.
   Uso (a partir da raiz do repo):  node .claude/skills/seo-content/scripts/validar-posts.cjs
   Opcional: passe slugs pra validar só alguns:  ... validar-posts.cjs das-do-mei limite-do-mei
   Sai com código !=0 se houver erro (bloqueador). Avisos não falham. */
const fs = require('fs');
const path = require('path');

let fm;
try { fm = require('front-matter'); }
catch { console.error('front-matter não encontrado — rode da raiz do repo (precisa de node_modules).'); process.exit(2); }

const POSTS_DIR = path.resolve(process.cwd(), 'src/posts');
if (!fs.existsSync(POSTS_DIR)) { console.error(`src/posts não encontrado em ${POSTS_DIR} — rode da raiz do repo.`); process.exit(2); }

const PALETTES = ['coral', 'amber', 'mint', 'ink'];

// Categorias válidas — fonte única em src/blog_cats.js. As seções da home e os hubs
// /blog/categoria/<slug> filtram por `category === name` EXATO (sem normalizar acento/caixa).
// Categoria fora da lista (ou ausente) = post órfão: não entra em nenhuma seção nem hub, só na busca.
const CATEGORIES = (() => {
  try {
    const src = fs.readFileSync(path.resolve(process.cwd(), 'src/blog_cats.js'), 'utf8');
    const names = [...src.matchAll(/name:\s*'([^']+)'/g)].map(m => m[1]);
    return names.length ? names : null;
  } catch { return null; }
})();

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const allSlugs = new Set(files.map(f => f.replace('.md', '')));
const only = process.argv.slice(2);
const targets = only.length ? files.filter(f => only.includes(f.replace('.md', ''))) : files;

let errors = 0, warns = 0;
const slugify = h => h.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

for (const file of targets) {
  const slug = file.replace('.md', '');
  const errs = [], wrn = [];
  let attr = {}, body = '';
  try { const p = fm(fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')); attr = p.attributes; body = p.body; }
  catch (e) { errs.push(`frontmatter não parseia: ${e.message}`); }

  if (!errs.length) {
    // frontmatter
    if (!attr.title) errs.push('sem title');
    else if ((attr.title + '').length > 60) wrn.push(`title ${('' + attr.title).length} char (>60; o build ainda anexa " · SimplesMEI")`);
    if (!attr.date) errs.push('sem date');
    const dl = (attr.description || '').length;
    if (!attr.description) errs.push('sem description');
    else if (dl > 160) wrn.push(`description ${dl} char (>160)`);
    else if (dl < 120) wrn.push(`description ${dl} char (<120, pode encurtar demais o snippet)`);
    if (attr.author !== 'João Gandra') errs.push(`author = ${JSON.stringify(attr.author)} (deve ser "João Gandra"; ausente vira "Equipe SimplesMEI" no JSON-LD)`);
    if (!attr.category) errs.push('sem category — post fica órfão (não entra em nenhuma seção da home nem no hub /blog/categoria/…)');
    else if (CATEGORIES && !CATEGORIES.includes('' + attr.category)) errs.push(`category ${JSON.stringify(attr.category)} não é válida — use o nome EXATO (acento/caixa) de src/blog_cats.js: ${CATEGORIES.join(' · ')}`);
    else if (!CATEGORIES) wrn.push('não consegui ler src/blog_cats.js pra conferir a categoria (rode da raiz do repo)');
    if (!PALETTES.includes(attr.coverPalette)) errs.push(`coverPalette inválido: ${JSON.stringify(attr.coverPalette)} (use coral|amber|mint|ink)`);
    if (!Array.isArray(attr.faq) || attr.faq.length < 3) errs.push(`faq precisa de 3–6 itens (tem ${attr.faq && attr.faq.length})`);
    else {
      if (attr.faq.length > 6) wrn.push(`faq com ${attr.faq.length} itens (>6)`);
      attr.faq.forEach((f, i) => { if (!f || !f.q || !f.a) errs.push(`faq[${i}] sem q/a`); });
    }
    if (attr.updated && !/^\d{4}-\d{2}-\d{2}$/.test('' + attr.updated)) wrn.push('updated não está no formato AAAA-MM-DD');

    // corpo
    if (/^#\s/m.test(body)) errs.push('tem H1 (#) no corpo — o título já é o H1 (capa)');
    const h2 = (body.match(/^##\s/gm) || []).length;
    if (h2 < 4) wrn.push(`poucos H2: ${h2} (mire 4–7, cada um uma pergunta real)`);

    // links internos
    const blogLinks = [...body.matchAll(/\]\((\/blog\/[a-z0-9-]+)\)/g)].map(m => m[1].replace('/blog/', ''));
    const broken = blogLinks.filter(s => !allSlugs.has(s));
    if (broken.length) errs.push(`link interno quebrado: ${[...new Set(broken)].join(', ')}`);
    if (blogLinks.includes(slug)) wrn.push('link interno aponta pra si mesmo');
    if (!blogLinks.length) wrn.push('sem link interno pra irmão do cluster (escreva à mão)');
    if (!/\]\(\/\)/.test(body)) wrn.push('sem link/CTA pra home (/)');

    // âncoras do TOC: confere que os H2 viram slug previsível (rehype-slug)
    const dupSlugs = {};
    (body.match(/^##\s+(.+)$/gm) || []).forEach(l => { const s = slugify(l.replace(/^##\s+/, '')); dupSlugs[s] = (dupSlugs[s] || 0) + 1; });
    Object.entries(dupSlugs).filter(([, n]) => n > 1).forEach(([s]) => wrn.push(`âncora de H2 duplicada: #${s}`));
  }

  errors += errs.length; warns += wrn.length;
  const mark = errs.length ? '❌' : (wrn.length ? '⚠️ ' : '✅');
  console.log(`${mark} ${slug}`);
  errs.forEach(e => console.log(`    ERRO  ${e}`));
  wrn.forEach(w => console.log(`    aviso ${w}`));
}

console.log(`\n${targets.length} post(s) · ${errors} erro(s) · ${warns} aviso(s)`);
process.exit(errors ? 1 : 0);

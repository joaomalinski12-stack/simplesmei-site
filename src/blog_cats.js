/* Categorias do blog — FONTE ÚNICA (usada por src/blog.jsx e por prerender.js).
   7 categorias consolidadas; cada post carrega `category` = name no frontmatter.
   Os slugs viram as rotas de hub: /blog/categoria/<slug>. */
export const CATS = [
  { name: 'Primeiros passos',    slug: 'primeiros-passos',    desc: 'Abrir o CNPJ, CNAE, CCMEI, alvará, nome fantasia' },
  { name: 'Nota fiscal',         slug: 'nota-fiscal',         desc: 'Emitir, NFS-e, produto, recorrente, cancelar' },
  { name: 'Imposto e DAS',       slug: 'imposto-e-das',       desc: 'DAS, Simples Nacional, IR, declaração anual' },
  { name: 'Teto e crescimento',  slug: 'teto-e-crescimento',  desc: 'Limite, desenquadramento, MEI x ME' },
  { name: 'Benefícios e INSS',   slug: 'beneficios-e-inss',   desc: 'Aposentadoria, auxílios, tempo de contribuição' },
  { name: 'Regularização',       slug: 'regularizacao',       desc: 'Regularizar, débitos, parcelar, dar baixa' },
  { name: 'Profissões e nichos', slug: 'profissoes-e-nichos', desc: 'Guias do MEI por profissão' },
];

export const CAT_BY_SLUG = Object.fromEntries(CATS.map(c => [c.slug, c]));
export const CAT_BY_NAME = Object.fromEntries(CATS.map(c => [c.name, c]));

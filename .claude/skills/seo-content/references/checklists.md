# Checklists — pré-publicação

Rode antes de cada publicação. O validador `scripts/validar-posts.cjs` cobre a parte mecânica
(frontmatter, links, H2, faq); o resto é julgamento.

## On-page
- [ ] `title` ≤ ~55 char, **keyword no início**, único por página (o build anexa ` · SimplesMEI`;
      sem `|`, sem `[colchetes]`).
- [ ] `H1` (na capa) ecoa o `title`.
- [ ] `description` 140–155 char, keyword + gancho de valor, casa com a intenção.
- [ ] Intro **answer-first** (30–60 palavras) responde a intenção-núcleo antes de contextualizar;
      keyword nos primeiros ~100 caracteres.
- [ ] Cada `H2` é uma **pergunta real** (~PAA) + bloco de resposta de **40–60 palavras**
      autossuficiente logo abaixo.
- [ ] Sem "como vimos acima"/pronome solto nos chunks; entidade ("MEI"/"NFS-e") repetida.
- [ ] **Tabela** (Markdown GFM `| … |`) para preço/limites/comparativos; lista numerada para processo.
- [ ] **Links internos escritos à mão** pros irmãos do cluster + pilar + CTA pra home `/`; os slugs
      existem.
- [ ] Keyword-alvo **não colide** com outro post (sem canibalização).

## Qualidade / E-E-A-T
- [ ] **Information gain** claro: diz algo que a SERP não diz; sem reescrita commodity.
- [ ] **Experiência de 1ª pessoa** do produto (passo a passo real, honesto).
- [ ] **Fontes oficiais** linkadas (gov.br/Receita/Portal do Empreendedor, Sebrae, Contabilizei,
      IBGE) com **ano**; estatística com fonte.
- [ ] `author: "João Gandra"` presente (autor ausente = falha, vira "Equipe SimplesMEI" no JSON-LD).
- [ ] Data de publicação visível; em conteúdo sensível a tempo (DAS/teto/prazos), use `updated` no
      refresh → "atualizado em".
- [ ] **Honestidade:** cada afirmação bate com `PRODUTO.md`; roadmap/parcial hedgeado **sem prazo**.
- [ ] Sem "equipe/atendente/contador/pessoa" — **IA sempre**. Marca **SimplesMEI**, nunca ZapMEI.
- [ ] Preços de `src/preco_cta.jsx`; valor do DAS aponta o Portal, não cravado.
- [ ] Cobertura completa da intenção **sem inflar** contagem de palavras.

## Conformidade factual (YMYL)
Valide o **fato**, não só a presença do link. Método e armadilhas: [conformidade-fontes.md](conformidade-fontes.md).
- [ ] Cada **processo/valor/regra** (corpo **e** FAQ) confere com **gov.br/Sebrae/Contabilizei/IBGE**
      — com a **URL** que sustenta cada um.
- [ ] **Proposta ≠ lei:** nenhuma página de campanha (`gov.br/memp`) usada como regra vigente. Em
      2026 valem **teto R$ 81.000** e **1 empregado**.
- [ ] **Datas de vigência** conferidas (ex.: NFS-e Nacional do MEI desde **01/09/2023**; ME/EPP em 2026).
- [ ] Sem **contradição interna** (corpo vs FAQ, parágrafo vs tabela).
- [ ] **Valores que mudam por ano** (DAS, faixas, salário mínimo, prazos) hedgeados ou **datados** —
      não cravados sem ano.
- [ ] Claim de **alto impacto** (nº de funcionários, teto, "é obrigatório?") confirmado **à mão** na
      fonte primária, não em correção de agente em massa.

## Técnico / structured data
- [ ] Frontmatter completo e válido (title/date/description/author/category/coverPalette/faq).
- [ ] `faq` 3–6 q/a; respostas **revisadas à mão** (IA crua é filtrada mais agressivamente).
- [ ] `npm run build` compila; `prerender.js` injetou `Article` + `FAQPage` (se faq) +
      `BreadcrumbList`, e o JSON-LD **parseia** (o validador checa).
- [ ] `title`/`description`/`canonical`/`og:*` reescritos; rota no `sitemap.xml`.
- [ ] **Texto-chave no HTML renderizado** do `dist/` (não só JS) — crawlability pra AIO/LLM.
- [ ] Schema **padrão só** (`Organization`/`WebSite`/`Article`/`FAQPage`/`BreadcrumbList`/
      `SoftwareApplication`); **sem** `llms.txt` nem schema exótico.
- [ ] **Playwright** no `dist/` (360/390/430 + desktop): sem scroll-X, toque ≥44px, corpo ≥~15px,
      tabelas com `overflow-x` (não estouram).
- [ ] Pós-publicação (humano, no GSC): Inspeção de URL → Solicitar indexação; sitemap submetido.

---
name: seo-content
description: Produção de conteúdo SEO de classe mundial para o blog/landing do SimplesMEI — criar ou refrescar posts (src/posts/*.md), páginas-pilar e clusters. Use ao escrever artigo/post, fazer pesquisa de keyword, planejar cluster, otimizar on-page, ou rodar um ciclo de refresh. Cobre: Ubersuggest (MCP), priorização por dificuldade×fit, answer-first extraível (era AI Overviews), validação de conformidade factual contra fontes oficiais (gov.br/Sebrae/Contabilizei/IBGE), revisão de honestidade vs PRODUTO.md, e JSON-LD via prerender. Sem mitos (nada de llms.txt nem "schema mágico"). pt-BR.
allowed-tools: Read Grep Glob Edit Write Bash WebSearch WebFetch
---

# Produção de conteúdo SEO (estado da arte) — SimplesMEI

Produzir conteúdo orgânico que **ranqueia e vira citação** para a landing/blog do SimplesMEI
(IA fiscal do MEI no WhatsApp, `simplesmei.net`). Otimiza para Google **e** AI Overviews/LLMs
sem cair em mito ou em conteúdo "commodity".

> **Premissa que define tudo:** domínio **novo, DA ≈ 5, nicho fiscal (YMYL) pt-BR**. Por isso:
> não brigar de frente com head terms; mirar **estrutura extraível** (PAA/snippet premiam
> estrutura, não backlinks); tratar **honestidade como sinal de Trust**; e medir **cobertura/
> impressões**, não cliques, nos primeiros 90 dias.

## Quando usar
- Criar um post novo (`src/posts/<slug>.md`), uma página-pilar ou um **lote de cluster**.
- Refrescar conteúdo existente (ciclo trimestral / virada de regra fiscal).
- Pesquisar/priorizar keyword e desenhar a arquitetura do cluster.

**Não use para:** copy de UI fora do blog (siga o arquivo vizinho + `tokens.jsx`); design da
landing (use `.claude/rules/design-fidelity.md`); decisões de produto/preço (são fatos travados).

## O que entrega
Keyword priorizada por **dificuldade baixa × fit de produto** (datada) → cluster sem
canibalização (documentado em `docs/plano-seo.md`) → post **answer-first** extraível com
frontmatter + FAQ → revisão adversária de SEO, honestidade **e** conformidade factual (fontes oficiais) → build validado (JSON-LD
`Article`+`FAQPage`+`BreadcrumbList`, sitemap, meta) → fidelidade medida no Playwright → plano
de medição/refresh.

---

## O processo (11 passos)

Detalhe e racional em [references/estado-da-arte.md](references/estado-da-arte.md) (princípios) e
[references/playbook-projeto.md](references/playbook-projeto.md) (assets e regras deste repo).

1. **Research (Ubersuggest, Brasil/pt).** Trave `locId 2076` + `language pt`. Puxe volume + **SD
   (dificuldade)** e leia a SERP (quem ocupa, qual DA). Tools e receita: ver playbook §Ubersuggest.
   **Carimbe um snapshot datado** no doc (os números envelhecem).
2. **Priorizar por SD baixo × valor pro produto** — *nunca* por volume bruto. Evite head terms
   (viram pilar de longo prazo); comece por **SD ≤ ~26** e quick-wins de SD baixíssimo.
3. **Design do cluster (pillar→cluster, 1 dono por intenção).** Sem canibalização; diferencie por
   intenção quando o tema repetir ("o que é" vs "como fazer"). Documente o lote **antes de escrever**
   em `docs/plano-seo.md` (tabela slug/keyword/vol/SD/pilar/**categoria**) — cada post herda **1 das 7
   categorias** de `src/blog_cats.js`; e **marque os descartados com o motivo**.
4. **Brief por post:** keyword + intenção; as **sub-perguntas do fan-out** (PAA/AlsoAsked); o ângulo
   de **information gain** (o que esta página diz que a SERP não diz); fontes oficiais a citar (com
   ano); irmãos do cluster a linkar; paleta de capa.
5. **Draft answer-first** (`src/posts/<slug>.md`). Copie um post canônico (`como-abrir-mei.md` ou
   `das-do-mei.md`). Regras de redação: ver [references/estado-da-arte.md](references/estado-da-arte.md)
   §Draft e o esqueleto em [assets/post-template.md](assets/post-template.md). Em resumo: intro que
   responde a intenção em 30–60 palavras; **H2 = a pergunta real do usuário** (~PAA) com bloco de
   resposta autossuficiente de 40–60 palavras logo abaixo; **dados extraíveis** (estatística com
   fonte+ano, definições curtas, **tabelas** para preço/limites/comparativos); listas numeradas para
   processos; bloco "Como o SimplesMEI ajuda" com **links internos escritos à mão** pros irmãos do
   cluster + CTA pra home `/`.
6. **Revisão adversária — três passadas obrigatórias.** (a) **Honestidade vs `PRODUTO.md`**: cada
   afirmação do produto bate; roadmap/parcial → hedgear sem prazo; SimplesMEI **é uma IA** (nunca
   "equipe/atendente/contador/pessoa"); marca **SimplesMEI** (nunca ZapMEI); preços de
   `src/preco_cta.jsx`. (b) **SEO adversário**: canibaliza com outro post? Title sobrevive à
   reescrita? Cada H2-pergunta tem resposta extraível? FAQ/respostas **revisadas à mão**. (c)
   **Conformidade factual (YMYL)**: cada processo/valor/regra (corpo **e** FAQ) checado contra
   **gov.br/Sebrae/Contabilizei/IBGE** com a URL; **proposta ≠ lei** (cuidado com páginas de campanha
   tipo `gov.br/memp`); claims de alto impacto confirmados **à mão** antes de editar. Método:
   [references/conformidade-fontes.md](references/conformidade-fontes.md). Checklist:
   [references/checklists.md](references/checklists.md).
7. **Finalizar frontmatter** (schema exato no playbook §Frontmatter). `title` curto com keyword no
   início (o build anexa ` · SimplesMEI`); `description` 140–155 char; **`category` = um dos 7 nomes
   EXATOS de `src/blog_cats.js`** (decide a seção/hub — nome errado ou ausente = post órfão, some da
   navegação); `coverPalette` (coral|amber|mint|ink); `faq` **3–6** q/a (alimenta o acordeão visível
   **e** o `FAQPage`).
8. **Validar:** `npm run build` → `prerender.js` injeta `Article`+`FAQPage`+`BreadcrumbList` por post,
   reescreve title/description/canonical/og e atualiza o `sitemap.xml`. Rode o validador:
   `node .claude/skills/seo-content/scripts/validar-posts.cjs` (frontmatter, links internos, H2, faq).
9. **Medir fidelidade (Playwright no `dist/` servido)** — viewports 360/390/430 + desktop: sem
   scroll horizontal, toque ≥44px, corpo ≥~15px. **Meça, não confira no olho** (`design-fidelity`).
10. **Publicar.** `npm run build` tem que compilar. **Rebase antes** (João dá push na `main` em
    paralelo) e **confirme com o dono antes de promover**. Push na `main` → Vercel publica.
11. **Medição e ciclo de vida (GSC — trabalho humano).** Detalhe em
    [references/medicao-refresh.md](references/medicao-refresh.md): KPIs honestos dos primeiros 90
    dias (indexação/impressões/queries, **não** cliques), loop de refresh com substância (e só então
    `updated`/re-crawl), striking distance, canibalização e pruning.

---

## Regras inegociáveis
- **Honestidade vs `PRODUTO.md` é lei.** Roadmap/parcial = hedgear sem prazo. Confira a tabela
  "Estado real" — e que ela pode estar **desatualizada** (confirme com o dono em dúvida).
- **Conformidade factual = fontes oficiais.** Todo processo/valor/regra fiscal validado contra
  **gov.br/Sebrae/Contabilizei/IBGE**, com a URL. **Proposta ≠ lei** — não confie em página de
  campanha (`gov.br/memp`); confirme claim de alto impacto na fonte primária. Em 2026 valem **teto
  R$ 81.000** e **1 empregado**. Detalhe: [references/conformidade-fontes.md](references/conformidade-fontes.md).
- **SimplesMEI é uma IA.** Nunca atendente/equipe/contador/pessoa. Marca **SimplesMEI**, nunca ZapMEI.
- **1 keyword-alvo / 1 dono por intenção.** Sem canibalização. Priorize **SD baixo, não volume**.
- **`category` = 1 dos 7 nomes exatos de `src/blog_cats.js`** (acento/caixa). É o que joga o post na
  seção da home e no hub `/blog/categoria/<slug>` (match exato, sem normalizar) — nome errado/ausente
  = post órfão, some da navegação. Categoria nova **só editando `blog_cats.js`**, nunca inventada no
  frontmatter. O validador barra (erro).
- **Autor = João Gandra** (aciona foto + bio + LinkedIn). Autor ausente vira "Equipe SimplesMEI" no
  JSON-LD — trate isso como **falha**, não default: todo post precisa de `author: "João Gandra"`.
- **Meça com Playwright**, não no olho. O que embarca é o build do Vite.
- **Sem mitos:** nada de `llms.txt` nem "schema que destrava a IA". Só schema padrão
  (`Organization`/`WebSite`/`Article`/`FAQPage`/`BreadcrumbList`/`SoftwareApplication`).

## Limitações do pipeline (faça à mão)
- **Links internos do cluster são escritos à mão** no corpo do `.md`. O bloco `Related` do template
  é por **recência** (3 mais novos), **não** por cluster — ele não garante o grafo de links.
- **GSC é humano.** Há MCP do Ubersuggest, **não** do Search Console. Indexação, inspeção de URL,
  canibalização e re-indexação são passos manuais do dono (o agente entrega conteúdo + sitemap).
- **Autoridade off-site = trabalho humano.** O gargalo de um domínio DA≈5 são as **menções de
  terceiros** (Reddit, comparativos, reviews, PR). O agente pode mapear alvos e rascunhar, mas a
  execução (outreach/posts em comunidade) é do dono. Ver estado-da-arte §Off-site.

## Bússola
- **Princípios + o que move citação em 2026:** [references/estado-da-arte.md](references/estado-da-arte.md)
- **Assets, schema, regras e fatos deste repo:** [references/playbook-projeto.md](references/playbook-projeto.md)
- **Conformidade factual (fontes oficiais + armadilhas):** [references/conformidade-fontes.md](references/conformidade-fontes.md)
- **Checklists (on-page / E-E-A-T / técnico):** [references/checklists.md](references/checklists.md)
- **Medição e refresh (GSC, 90 dias, pruning):** [references/medicao-refresh.md](references/medicao-refresh.md)
- **Esqueleto de post pronto pra copiar:** [assets/post-template.md](assets/post-template.md)
- **Validador de posts:** [scripts/validar-posts.cjs](scripts/validar-posts.cjs)

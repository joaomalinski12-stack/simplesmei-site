# Playbook do projeto — assets, schema e regras (SimplesMEI)

Tudo o que é **concreto deste repo** pra produzir conteúdo. Fiel ao código (verificado).

## Ubersuggest (MCP)
Escopo *project*, config em `.mcp.json` (**gitignored** — OAuth na conta, não commitar).
Autenticar: `/mcp → ubersuggest → Authenticate`. **Localização travada: `locId 2076` (Brasil) +
`language pt`.** Datar sempre o snapshot no doc (ex.: "Brasil, pt, jun/2026").

Tools por uso:
- **Keyword research:** `keyword_overview`, `keyword_metrics`, `keyword_suggestions`,
  `google_suggestions`, `match_keywords`, `content_ideas`, `seo_opportunities`.
- **SERP / concorrência:** `serp_analysis` (mede DA dos incumbentes — ref.: gov.br DA 92, Sebrae 71,
  Contabilizei 59), `competitors`, `estimate_serp_clicks`.
- **Domínio / página:** `domain_overview`, `domain_keywords`, `domain_top_pages`, `page_overview`,
  `page_keywords`.
- **Backlinks:** `backlinks`, `backlinks_overview`, `backlink_opportunity`, `linking_domains`,
  `anchor_texts`.
- **Auditoria / CWV:** `site_audit`, `site_audit_pages`, `site_audit_results`, `site_audit_status`,
  `pagespeed_audit`, `validate_site`.
- **Localização:** `location_suggest`, `location_details`.

Gotchas: `keyword_suggestions` às vezes volta poucos resultados; `google_suggestions` tem rate-limit
(429) — espace as chamadas. Confirme o SD exato da variante com `keyword_overview` (o SD muda por
fraseado: "o que é das mei" ≠ "das mei").

## Frontmatter do post (`src/posts/<slug>.md`)
Lido por `src/blog.jsx` + `prerender.js` (YAML via `front-matter`). Ordem e campos:

| campo | obrig. | o que faz |
|---|---|---|
| `title` | sim | H1 (na capa) + `<title>` (o build anexa ` · SimplesMEI`). Keyword no início, curto. |
| `date` | sim | `"AAAA-MM-DD"`. Ordena a lista + `<time>` + `datePublished` no JSON-LD. |
| `description` | sim | meta description + standfirst. **140–155 char**, keyword + gancho. |
| `author` | sim | **`"João Gandra"`** → foto `/joao-gandra.jpg` + bio Growth + LinkedIn. Ausente → "Equipe SimplesMEI" (tratar como falha). |
| `category` | sim | rótulo da capa (ex.: "Nota fiscal", "Teto do MEI"). Default `Guia`. |
| `coverPalette` | sim | `coral` \| `amber` \| `mint` \| `ink`. |
| `faq` | sim | lista de `{q, a}`, **3–6** itens. Alimenta o acordeão visível **e** o `FAQPage` JSON-LD. q/a entre aspas, uma linha, sem aspas duplas internas quebrando o YAML. |
| `updated` | opcional | `"AAAA-MM-DD"`. Emite `dateModified` no `Article` + mostra "atualizado em" no header. **Use no refresh.** |
| `cover` | opcional | caminho de imagem → vira `<img>` de capa (o título vira H1 abaixo). |
| `coverAlt` | opcional | alt da imagem de capa. |

## Paletas de capa (`COVER_PALETTES` em `blog.jsx`)
Gradiente 135° from→to + grade de pontos + glow + wordmark.
- `coral` `#F87453`→`#C13E2E` (default) · `amber` `#EB881F`→`#C85D00` · `mint` `#56D1A3`→`#008966`
  · `ink` `#242530`→`#10111A` (glow + wordmark coral). Use a paleta pelo pilar do cluster (ex.: teto
  = amber, DAS = ink, recorrência = mint, nota = coral).

## Template (`src/blog.jsx`)
`import.meta.glob('./posts/*.md', raw)` → `front-matter`. `BlogList` (ordena por `date` desc,
maxWidth 800) e `BlogPost` (maxWidth 720):
- **PostCover** (masthead): capa gerada pela paleta **ou** `cover`; o **título é o H1** dentro da capa.
- **Header:** trilha `Início › Blog`, autor (foto/nome) + data + "X min de leitura" (~200 wpm) +
  "atualizado em" se houver `updated`; depois a `description` como standfirst.
- **TOC** ("Neste artigo"): extrai os `## ` → âncoras `rehype-slug`, recolhível no mobile.
- **`<article>`** via `ReactMarkdown` + `remarkGfm` + `rehypeSlug`. Suporta: H2/H3, listas, **tabelas
  GFM** (`| … |`, com wrapper `overflow-x` pra não estourar no mobile), blockquote (borda coral),
  links (`coralDeep`), imagens (borda + sombra).
- **AuthorBox** (João → foto + bio + LinkedIn), **PostFAQ** (acordeão, painel **sempre no DOM** pra
  SEO), **Related** (3 posts por **recência** — *não* cluster-aware), **PostCTA** (card ink + `Door`
  → hoje aponta pra `/lista-de-espera`, ver nota de pré-lançamento abaixo).

> ⚠️ Os **links internos do cluster** (irmãos + pilar) precisam ser **escritos à mão** no corpo do
> `.md`. O `Related` é só recência e não garante o grafo.

## JSON-LD (via `prerender.js`, pós-build)
Roda após `vite build` + `vite build --ssr`. Home mantém `@graph`
(`Organization`+`WebSite`+`SoftwareApplication`(+`FAQPage`)); rotas não-home filtram pra só
`Organization`+`WebSite`. **Por post** injeta antes do `</head>`:
- `Article` `{headline, description, datePublished:date, dateModified:updated||date, author:Person}`.
- `FAQPage` `{mainEntity:[Question→acceptedAnswer]}` (se houver `faq`).
- `BreadcrumbList` (Início › Blog › título).
Também reescreve `title`/`description`/`canonical`/`og:*` e adiciona `<url>` ao `dist/sitemap.xml`
(blog 0.9, posts 0.8). `/lista-de-espera` vira `noindex,follow`.

## Honestidade vs `PRODUTO.md` (é lei)
Confira a tabela "Estado real" **antes de afirmar**. Roadmap/parcial → hedgear no texto, **sem
prazo**.
- **No ar:** abertura de MEI (copiloto, sugere CNAE por IA), dúvidas fiscais (RAG), **emissão de
  NFS-e sob demanda** (dependente do provedor por prefeitura), alertas de teto, clientes+categorias,
  histórico+cancelamento (janela 24h).
- **Parcial/roadmap:** recorrência (**implementada, mas sem cron noturno garantido — roda por
  gatilho**); **lembrete proativo do DAS** (roadmap — hedgear: "está no nosso roadmap"); resumo do
  mês (parcial).
- **SimplesMEI é uma IA.** Nunca "equipe/atendente/contador parceiro/pessoa". A saída é: a IA
  resolve, vira lead, ou aponta o canal oficial (gov.br/Sebrae/Portal do Empreendedor).
- Marca **SimplesMEI** (`simplesmei.net`). **ZapMEI** é legado — proibido.

> ⚠️ **`PRODUTO.md` pode estar atrasado.** Ele é mantido à mão e pode não refletir o produto atual
> (ex.: em jun/2026 o dono sinalizou que **o DAS já está no ar**, embora o doc ainda liste o lembrete
> proativo como roadmap). Em dúvida, **confirme o status com o dono** e **atualize o `PRODUTO.md`**
> antes de usar o recurso na copy.

## Fatos de produção travados (só mudam por decisão de produto)
- **Preços** (`src/preco_cta.jsx`): anual **R$ 39,90/mês**, mensal **R$ 49,90/mês**. Freemium
  (abrir MEI + dúvidas grátis; emissão automática no pago). **Valor do DAS não se crava** — aponte o
  Portal do Empreendedor (muda com o salário mínimo).
- **WhatsApp:** `WA_NUMBER = '5511978024355'` (`src/porta_nav.jsx`). Tudo é "porta" (deep link).
- **CNPJ:** `62.225.090/0001-76` (`src/logo_footer.jsx`).
- **Pré-lançamento:** os CTAs hoje vão pra `/lista-de-espera` (não pro WhatsApp). Isso é do redirect,
  não da copy — o conteúdo do blog segue normal. Ver memória `site-pre-launch-waitlist`.

## Exemplos canônicos (copie a estrutura)
- `src/posts/como-abrir-mei.md` — cluster de aquisição, capa coral, **com imagens** (prints do gov).
- `src/posts/das-do-mei.md` — capa ink, **hedge de roadmap** do DAS, **tabela** de composição,
  internal linking pro cluster.

## Build / deploy
`npm run build` (cliente + SSR + `prerender.js`) · `npm run dev` (5173) · `npm run preview` (serve
`dist/`). Push na `main` → **Vercel publica em produção**. GA4 `G-FJDNXSSB3K` no `index.html`.
**João dá push em paralelo: rebase antes de editar/empurrar; confirme antes de promover.**

## Docs vivos
- `docs/plano-seo.md` — clusters (2A), ferramentas (2B), calendário 90 dias (2C), lotes (2E),
  histórico de execução. **Documente o cluster aqui antes de escrever.**
- `PRODUTO.md` — espelho do produto + tabela de status (pode estar atrasado — ver acima).
- `.claude/rules/design-fidelity.md` — ritual de medição (Playwright no `dist/`).

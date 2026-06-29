# Plano de Posicionamento no Google — SimplesMEI

> Estratégia de SEO da landing (simplesmei.net). Ancorado em dados reais da Ubersuggest
> (Brasil, jun/2026) e na auditoria da home. Atualize conforme a execução avança.
> Fonte do produto: ver [`PRODUTO.md`](../PRODUTO.md) — a copy/SEO não promete o que o bot não faz.

## Diagnóstico — ponto de partida

| Sinal | Valor | Leitura |
|---|---|---|
| Tráfego orgânico | **0** | Site novo; nada ranqueando ainda |
| Keywords ranqueando | **0** | Do zero |
| Domain Authority | **5** | Autoridade baixíssima |
| Backlinks / domínios ref. | 30 / 27 | Base mínima |
| GA4 / Search Console | **não conectados** | Sem medição (em resolução) |

**Realidade da SERP** (análise de "como emitir nota fiscal mei"): as 10 primeiras posições são
**gov.br (DA 92), Contabilizei (DA 59), Sebrae (DA 71), ContaAzul, prefeituras e nfse.gov.br**.

**Conclusão:** com DA 5, brigar de frente pelos *head terms* (`das mei` 673k, `nota fiscal mei` 368k,
`abrir mei` 135k) é inviável no ano 1. O jogo vencível são 3 frentes:

1. **Ângulo único do produto** — "pelo WhatsApp", "automática", "recorrência", "IA". Sem concorrência.
2. **Long-tail de baixa dificuldade** (SD < 30) na jornada fiscal do MEI.
3. **Onda da NFS-e Nacional** — obrigatória pro Simples a partir de **01/09/2026**.

---

## PARTE 1 — Estrutura de SEO da Home

### 1A. Fundação técnica

| # | Item | Status |
|---|---|---|
| 1 | Search Console + GA4 | ✅ GA4 (G-FJDNXSSB3K) no index.html · GSC verificado (falta submeter sitemap) |
| 2 | Pré-renderizar a home (SPA → HTML estático) | ✅ feito (Vite SSR build + `renderToString` + `hydrateRoot`; ver `prerender.js`) |
| 3 | `canonical` + `og:url` | ✅ feito (index.html) |
| 4 | `og:image` + `twitter:image` | ✅ tags + `public/og-image.png` (1200×630, on-brand) gerados |
| 5 | `robots.txt` + `sitemap.xml` | ✅ feito (`public/`) |
| 6 | JSON-LD: `Organization` + `WebSite` + `SoftwareApplication` | ✅ feito (index.html) |
| 6b | JSON-LD `FAQPage` | ⏳ só quando houver FAQ **visível** na página |
| 7 | Core Web Vitals (PageSpeed + site_audit Ubersuggest) | ⏳ pendente |

### 1B. On-page — keyword-alvo + semântica

**Keyword-alvo da home:** NÃO mirar head term. Dominar a intenção única do produto, de baixa
concorrência e alta conversão: `emitir nota fiscal mei pelo whatsapp` · `nota fiscal mei automática`
· `fiscal do mei no whatsapp`.

| Elemento | Hoje | Recomendação |
|---|---|---|
| **H1** | `"Deixa comigo."` — zero keyword | Maior gargalo. Manter impacto de marca, mas o H1 precisa carregar significado de busca (hybrid: H1 semântico "Seu fiscal do MEI, dentro do WhatsApp" + "Deixa comigo." como display) |
| `<title>` | `SimplesMEI · Seu fiscal do MEI no WhatsApp` | Testar variante com verbo de ação |
| Headings | 1×H1, 3×H2 no site todo; bento usa `<div>` | Títulos de seção/feature viram `<h2>`/`<h3>` reais |
| **Seção FAQ** | ❌ não existe | Adicionar FAQ visível → captura *People Also Ask* + habilita `FAQPage`. Alto ROI |
| `alt` / `aria-label` | ❌ nenhum | Adicionar nos mockups/ícones |
| Links internos | 0 (CTAs são deep link externo) | Nascem com /blog e /ferramentas; home vira hub |

---

## PARTE 2 — Conteúdo / Blog + Ferramentas

Arquitetura: **`/blog`** (artigos) + **`/ferramentas`** (calculadoras), modelo **pillar → cluster**.

### 2A. Clusters de conteúdo (priorizados por dado real)

Prioridade = dificuldade baixa + relevância pro produto (não volume bruto).

| Cluster | Keyword-âncora | Volume/mês | SD | Por que entra |
|---|---|---|---|---|
| **NFS-e (core)** | `emitir nota mei` | 40.500 | 26 | Coração do produto |
| | `microempreendedor individual nota fiscal eletronica` | 2.900 | **8** | Quase de graça — escrever logo |
| **Teto / Limite** | `limite mei` | 18.100 | 26 | Feature "vigia o teto" |
| | `desenquadramento mei` | 8.100 | 22 | Dor real, CPC alto (R$ 7,6) |
| **NFS-e Nacional** ⏰ | `emissor nacional nfse` | 14.800 | 20 | Onda 01/09/2026 — entrar antes do pico |
| | `nfse nacional` | 74.000 | 42 | Pilar do cluster (médio prazo) |
| **Abertura (aquisição)** | `como abrir mei` | 18.100 | 38 | Topo de funil; feature grátis |
| | `cnae mei` | 8.100 | 25 | Casa com "sugere CNAE por IA" |
| **DAS** | `declaração anual mei` | 90.500 | 44 | Volume gigante; long-tail primeiro |
| | `das mei` | 673.000 | 48 | Pilar de longo prazo |
| **Consulta** | `consultar mei` | 22.200 | 29 | Intenção de ferramenta → ver 2B |

> **Head terms de referência:** `abrir mei` 135.000 (SD 62) · `como abrir mei` 18.100 (SD 38).

**Regra:** começar pelos **SD ≤ 26**. Head terms viram *pillar pages* que ganham força conforme os
clusters de baixa dificuldade trazem autoridade.

### 2B. Ferramentas (link magnets + demo do produto)

| Ferramenta | Keyword | Volume | SD | Vínculo com o produto |
|---|---|---|---|---|
| Calculadora do teto do MEI | `limite mei` | 18.100 | 26 | Feature "vigia o teto" → CTA |
| Buscador de CNAE do MEI | `cnae mei` | 8.100 | 25 | "Sugere CNAE por IA" |
| Simulador de desenquadramento | `desenquadramento mei` | 8.100 | 22 | Dor cara (CPC R$ 7,6) |
| Calculadora/explicador do DAS | long-tail de `das mei` | — | baixo | Feature "lembrete do DAS" |

> ⚠️ `PRODUTO.md` marca "lembrete do DAS proativo" como **roadmap** e a recorrência sem cron noturno
> real. Ferramentas e copy não devem prometer prazo do que ainda não está 100% no ar.

### 2C. Calendário — primeiros 90 dias

- **Sem. 1–2 (fundação):** GSC+GA4, pré-render, og-image, FAQ na home, `site_audit`.
- **Sem. 3–6 (quick wins):** 3 artigos SD ≤ 26 (`emitir nota mei`, `microempreendedor… nota eletrônica` SD 8, `limite mei`) + **Calculadora do teto**.
- **Sem. 7–12 (a onda):** cluster **NFS-e Nacional** (`emissor nacional nfse` SD 20) antes do pico set/2026 + buscador de CNAE + 2 artigos de aquisição.
- **Contínuo:** 1 pillar page/mês; backlinks (Sebrae, diretórios de MEI, parcerias) pra subir o DA.

### 2D. Medição

Pela Ubersuggest: posição das keywords (`project_position_info`), evolução do `domain_overview`,
`site_audit` recorrente. Meta ano 1: 0 → dezenas de keywords no top 20 via long-tail.

---

### 2E. Lote de 10 posts — pesquisa + seleção (2026-06-28)

Pesquisa Ubersuggest refrescada (Brasil, pt, snapshot dez/2025–jun/2026). Seleção por
**chance de rankear (SD baixo) × importância pro produto**, com cluster fechado e sem
canibalização (1 dono por intenção). Autor: João Gandra. O post de abertura
(`como-abrir-mei`) já estava no ar e fecha o cluster de aquisição.

| # | Slug | Keyword principal | Vol/mês | SD | Pilar |
|---|---|---|---|---|---|
| 1 | `como-emitir-nota-fiscal-mei` | emitir nota mei / como emitir nota fiscal mei | 40.500 | 26/37 | Emissão NFS-e (pilar) |
| 2 | `nota-fiscal-eletronica-mei` | microempreendedor individual nota fiscal eletronica | 2.900 | **8** | Emissão (quick win) + obrigatoriedade |
| 3 | `nota-fiscal-pelo-whatsapp` | nota fiscal pelo whatsapp / pelo celular | baixo | **4–16** | A cunha (WhatsApp/IA) |
| 4 | `nota-fiscal-recorrente-mei` | nota fiscal recorrente / automática | baixo | **4** | Recorrência (diferencial) |
| 5 | `certificado-digital-mei` | certificado digital mei | 3.600 | 23 | Habilitador da emissão |
| 6 | `limite-do-mei` | limite mei / teto mei / qual o limite do mei | 18.100+9.900 | 22–26 | Vigia o teto (pilar) |
| 7 | `desenquadramento-do-mei` | desenquadramento mei | 8.100 | 22 | Teto (CPC R$ 7,6) |
| 8 | `das-do-mei` | das mei (o que é / pagar / atrasado / tabela) | 1.900+880 | 7–39 | DAS |
| 9 | `cnae-do-mei` | cnae mei | 8.100 | 25 | Sugere CNAE por IA |
| 10 | `nfse-nacional-mei` | emissor nacional nfse / nfse nacional | 14.800 | 20 | Onda 01/09/2026 |

**Descartados (canibalização/baixo fit):** `nota fiscal mei` (368k, SD 43 — head), `das mei`
(673k, SD 48 — head/pillar futuro), `declaração anual mei` (90,5k, SD 44 — sazonal jan–mai),
`consultar mei` (22,2k, SD 29 — vira ferramenta), `como dar baixa no mei` (8,1k, SD 38 — fit fraco),
`mei pode ter funcionário` (2,9k — fora do core fiscal). `teto mei` foi fundido em `limite-do-mei`
pra não brigar com ele mesmo.

**Produção:** workflow `simplesmei-10-posts` — draft → revisão adversária de SEO/honestidade
(vs `PRODUTO.md`) → finalização → check de canibalização do cluster.

## Histórico de execução

- **2026-06-28** — Fundação técnica parcial: `canonical`, `robots` meta, `og:url`/`og:image`/`twitter:image`
  (tags), JSON-LD (Organization+WebSite+SoftwareApplication com preços R$ 39 / R$ 49,90),
  `public/robots.txt`, `public/sitemap.xml` e `public/og-image.png` (1200×630, on-brand). Build validada.
  Pendente: pré-render, Core Web Vitals, GSC/GA4 (externos).

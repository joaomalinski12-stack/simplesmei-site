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

### 2F. Lote 2 — 10 posts (2026-06-29)

Segundo lote, produzido pela skill **`seo-content`** (`.claude/skills/seo-content/`). Pesquisa
Ubersuggest refrescada (Brasil, pt, jun/2026) e **cruzada com os 11 do lote 1** pra não canibalizar —
estende o funil pra novas frentes (aquisição, declarações, documentos, ciclo de vida, INSS) e adiciona
um **hub** (`obrigacoes-do-mei`) que interliga todo o cluster.

| # | Slug | Keyword principal | Vol/mês | SD | Frente |
|---|---|---|---|---|---|
| 1 | `o-que-e-mei` | o que é mei | 22.200 | **18** | Aquisição (topo) |
| 2 | `obrigacoes-do-mei` | obrigações do mei | 880 | 20 | **HUB** (linka tudo) |
| 3 | `atividades-permitidas-mei` | atividades permitidas mei | 4.400 | 18 | CNAE (extensão) |
| 4 | `mei-pode-ter-funcionario` | mei pode ter funcionário | 2.400 | **7** | Gestão |
| 5 | `mei-imposto-de-renda` | mei imposto de renda (DASN×IRPF) | 2.900 | **6** | Declarações |
| 6 | `declaracao-anual-mei` | declaração anual mei (DASN-SIMEI) | 90.500 | 44 | Declarações (pilar) |
| 7 | `cartao-cnpj-mei` | cartão cnpj mei / CCMEI | 9.900 | **15** | Documentos |
| 8 | `como-dar-baixa-no-mei` | como dar baixa no mei | 8.100 | **17** | Ciclo de vida |
| 9 | `cancelar-nota-fiscal-mei` | cancelar nota fiscal mei | 1.300 | **6** | Nota fiscal (ext.) |
| 10 | `aposentadoria-mei` | aposentadoria mei | 1.000 | 23 | INSS/benefícios |

**Cruzamento (sem canibalização):** `declaração anual` (DASN, anual) ≠ `das-do-mei` (mensal);
`cancelar nota` ≠ `como-emitir-nota`; `atividades permitidas` (a lista) ≠ `cnae-do-mei` (conceito);
`mei-imposto-de-renda` clareia DASN×IRPF e linka a DASN. **Descartados:** `ccmei` (SD 59 — vira
secundária de `cartao-cnpj-mei` SD 15), `nota fiscal de produto mei` (SD 39), `mei caminhoneiro`
(9.9k/SD 23, mas fit fraco — público é prestador de serviço), `consultar mei` (SD 29 — coberto por
`cartao-cnpj-mei`).

### 2G. Lote 3 — 5 posts (2026-07-01)

Terceiro lote pela skill `seo-content`, agora com a **3ª passada de conformidade já na origem**: os
fatos YMYL foram verificados em gov.br/Sebrae/Contabilizei/IBGE **antes** de escrever. Snapshot
Ubersuggest (Brasil, pt, jul/2026), cruzado com os 21 publicados. Abre a frente **"MEI e
vínculos/benefícios"** (mini-cluster) + uma obrigação extraível + a maior categoria ainda descoberta.

| # | Slug | Keyword principal | Vol/mês | SD | Frente |
|---|---|---|---|---|---|
| 1 | `relatorio-mensal-mei` | relatório mensal mei | 1.000 | **18** | Obrigação (extraível) |
| 2 | `seguro-desemprego-mei` | seguro desemprego mei | 880 | **19** | Vínculos/benefícios |
| 3 | `mei-pode-ter-carteira-assinada` | mei pode ter carteira assinada | 1.000 | **23** | Vínculos/benefícios |
| 4 | `mei-caminhoneiro` | mei caminhoneiro | 9.900 | 31 | Categoria (volume) |
| 5 | `mei-pode-receber-bolsa-familia` | mei pode receber bolsa família | 1.000 | 38 | Benefícios |

**Cruzamento (sem canibalização):** `carteira-assinada` (MEI como *empregado*) ≠ `mei-pode-ter-funcionario`
(MEI como *empregador*); `seguro-desemprego`/`bolsa-familia` = interação com benefícios (frente nova);
`relatorio-mensal` (registro mensal que *alimenta* a DASN) ≠ `declaracao-anual` (a DASN); `mei-caminhoneiro`
(categoria: teto R$ 251.600, INSS 12%) ≠ `o-que-e-mei`/`limite-do-mei` (MEI comum).

**Fatos-chave verificados na fonte (3ª passada):** relatório mensal **não se entrega** — preenche até
dia 20 e arquiva 5 anos; seguro-desemprego **não é cancelado só por ser MEI** — decide a **renda própria
suficiente** (aferida na DASN); Bolsa Família convive com MEI dentro da **renda per capita** + **Regra de
Proteção** (até 2 anos a 50%); MEI-Caminhoneiro tem **teto R$ 251.600/ano** e **INSS 12%** (não 5%).

**Reversão consciente:** `mei-caminhoneiro` fora descartado no lote 2 por "fit fraco"; reincluído aqui
pela autoridade tópica e por ser o maior termo de categoria MEI ainda não coberto (9,9k/mês) — com CTA
honesto (a IA cobre abertura/DAS/dúvidas; transporte de carga usa CT-e, fora do foco de NFS-e).

### 2H. Lote 4 — 10 posts (2026-07-01)

Quarto lote pela skill `seo-content`, com a 3ª passada de conformidade na origem (fatos YMYL verificados
em gov.br/Sebrae/Contabilizei/IBGE antes de escrever). Snapshot Ubersuggest (Brasil, pt, jul/2026),
cruzado com os 26 publicados. Preenche três frentes: **nichos/categorias**, **regularização/manutenção**
e mais **vínculos/benefícios**.

| # | Slug | Keyword principal | Vol/mês | SD | Frente |
|---|---|---|---|---|---|
| 1 | `mei-para-motorista-de-aplicativo` | mei para motorista de aplicativo | 320 | **18** | Nicho/categoria |
| 2 | `mei-vender-no-mercado-livre` | mei pode vender no mercado livre | 90 | **7** | E-commerce (quick-win) |
| 3 | `mei-rural` | mei rural | 590 | **23** | Nicho/categoria |
| 4 | `posso-ter-dois-mei` | posso ter dois mei | 590 | **25** | Dúvida |
| 5 | `como-regularizar-o-mei` | como regularizar o mei | 5.400 | 40 | **HUB** regularização |
| 6 | `aposentado-pode-ser-mei` | aposentado pode ser mei | 880 | 35 | Vínculos/benefícios |
| 7 | `salario-maternidade-mei` | salário maternidade mei | 1.900 | 36 | Benefícios |
| 8 | `como-consultar-debitos-do-mei` | como consultar débitos do mei | 320 | 33 | Regularização |
| 9 | `como-alterar-dados-do-mei` | como alterar dados do mei | 390 | 39 | Cadastro |
| 10 | `nota-fiscal-de-produto-mei` | nota fiscal de produto mei | 590 | 39 | Nota fiscal (produto) |

**Cruzamento (sem canibalização):** `motorista-de-aplicativo`/`mei-rural`/`vender-no-mercado-livre` são
**nichos** (não competem com `o-que-e-mei`/`atividades-permitidas`); `regularizar` é HUB que linka
`das`/`declaracao`/`consultar-debitos`/situação; `consultar-debitos` (onde *ver* o que deve) ≠ `das-do-mei`
(como *pagar*); `alterar-dados` (cadastro) ≠ `cartao-cnpj`; `nota-fiscal-de-produto` (NF-e modelo 55) ≠
`como-emitir`/`nota-fiscal-eletronica` (NFS-e de serviço); `salario-maternidade` (benefício específico) e
`aposentado-pode-ser-mei` (vínculo) estendem o cluster de benefícios do lote 3.

**Fatos-chave verificados na fonte (3ª passada):** motorista de app **pode** ser MEI (Decreto 9.792/2019);
**não dá para ter dois MEI** (1 CPF = 1 CNPJ MEI); aposentado por **idade/tempo** pode, por **invalidez não**;
salário-maternidade **sem carência** (IN 188/2025), 120 dias, valor = salário mínimo; produtor rural é MEI
desde 2016 (MEI Rural, regime familiar); NF-e de produto pode sair pelo **NFF gratuito** (sem certificado),
com **Inscrição Estadual** simplificada — estados implementando a obrigatoriedade para MEI de ICMS em 2026.

## Histórico de execução

- **2026-06-28** — Fundação técnica parcial: `canonical`, `robots` meta, `og:url`/`og:image`/`twitter:image`
  (tags), JSON-LD (Organization+WebSite+SoftwareApplication com preços R$ 39 / R$ 49,90),
  `public/robots.txt`, `public/sitemap.xml` e `public/og-image.png` (1200×630, on-brand). Build validada.
  Pendente: pré-render, Core Web Vitals, GSC/GA4 (externos).

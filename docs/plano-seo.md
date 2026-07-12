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

### 2I. Lote 5 — 15 posts (2026-07-01)

Quinto lote pela skill `seo-content`. Snapshot Ubersuggest (Brasil, pt, jul/2026), cruzado com os **36
publicados**. Preenche cinco frentes ainda descobertas: **comparativos** (MEI vs Simples/ME/autônomo),
**benefícios INSS**, **DAS operacional** (parcelamento), **setup** (alvará, nome fantasia) e **nichos de
profissão** — estes validados contra a **base oficial de CNAEs** (`zapmei:bot/data/cnae_mei.json`, Anexo
XI Res. CGSN 140/2018), fonte autoritativa do que de fato pode ser MEI.

| # | Slug | Keyword principal | Vol/mês | SD | Frente |
|---|---|---|---|---|---|
| 1 | `mei-e-simples-nacional` | mei e simples nacional | 1.300 | **11** | Conceito/tributação |
| 2 | `auxilio-doenca-mei` | auxílio doença mei | 1.000 | **15** | Benefícios INSS |
| 3 | `mei-para-entregador` | mei entregador | 320 | **13** | Nicho profissão |
| 4 | `mei-diarista` | mei diarista | 260 | **15** | Nicho profissão |
| 5 | `programador-pode-ser-mei` | programador pode ser mei | 210 | **17** | Nicho profissão |
| 6 | `diferenca-mei-e-me` | diferença entre mei e me | 1.300 | **19** | Comparativo |
| 7 | `alvara-mei` | alvará mei | 390 | 21 | Setup/abertura |
| 8 | `mei-precisa-de-contador` | mei precisa de contador | 880 | 24 | Fundo de funil (fit máx) |
| 9 | `mei-ou-autonomo` | mei ou autônomo | 140 | 24 | Comparativo |
| 10 | `mei-2026` | mei 2026 | 2.400 | 26 | Regras (oportuno/YMYL) |
| 11 | `nome-fantasia-mei` | nome fantasia mei | 2.900 | 27 | Setup/abertura |
| 12 | `mei-para-salao-de-beleza` | mei salão de beleza / manicure | ~110 | 10–22 | Nicho profissão (bundle) |
| 13 | `parcelar-das-mei` | parcelar das mei | 135.000 | 31 | Regularização (volume) |
| 14 | `mei-fotografo` | mei fotógrafo | 90 | 21 | Nicho profissão |
| 15 | `beneficios-do-mei` | benefícios do mei | — | baixo | **HUB** benefícios INSS |

**Cruzamento (sem canibalização):** `mei-e-simples-nacional` (o regime/Simei) ≠ `das-do-mei` (como pagar);
`diferenca-mei-e-me` (comparação) ≠ `desenquadramento-do-mei` (o processo de sair); `mei-ou-autonomo` e
`diferenca-mei-e-me` formam mini-cluster de comparativos que se linkam; `parcelar-das-mei` (o parcelamento
em si) ≠ `como-consultar-debitos` (ver o que deve) ≠ `como-regularizar` (HUB); `mei-para-entregador` (delivery:
iFood/Rappi) ≠ `mei-para-motorista-de-aplicativo` (passageiro: Uber/99); `auxilio-doenca` é benefício específico
e `beneficios-do-mei` é o HUB que amarra aposentadoria + auxílio-doença + salário-maternidade + pensão.

**Fatos-chave verificados na fonte (3ª passada):** MEI é enquadrado no **Simples Nacional** e recolhe pelo
**SIMEI** (valor fixo); **ME** vai até **R$ 360 mil/ano** (MEI até R$ 81 mil); **programador/desenvolvedor NÃO
pode ser MEI** (programação/desenvolvimento de software fora da lista de ocupações — confirmado na base oficial);
**diarista pode** (`Diarista independente` 9700-5/00) desde que **sem vínculo** e **até 2 dias/semana** pro mesmo
cliente (3+ contínuos = doméstica/CLT, não MEI); **entregador/motoboy pode** (`Motoboy independente` 5320-2/02);
**auxílio-doença** exige **carência de 12 contribuições** (acidente dispensa), benefício de **1 salário mínimo**,
pede-se no **Meu INSS/135**; **MEI dispensado de alvará** desde **01/09/2020** (Resolução CGSIM 59/2020 — toda
atividade é baixo risco), comprovado pelo **CCMEI** (não isenta sanitário/ambiental/zoneamento); **DAS parcela em
até 60x**, parcela mínima **R$ 50**, Receita via PGMEI e Dívida Ativa via **REGULARIZE/PGFN**, 1 parcelamento por
ano; **MEI não é obrigado a ter contador** (LC 123/2006); em **2026** valem **teto R$ 81 mil** e **1 empregado**
("Novo Teto" segue **proposta**, não lei — armadilha da página-campanha `gov.br/memp`).

### 2J. Lote 6 — 5 posts (2026-07-09)

Sexto lote pela skill `seo-content`, com a **3ª passada de conformidade verificada na origem** (5 agentes
de pesquisa cruzaram cada fato YMYL em gov.br/Receita/Sebrae **antes** de escrever). Snapshot Ubersuggest
(Brasil, pt, jul/2026), cruzado com os **51 publicados**. Abre a frente **financeiro/banco** (inédita),
completa os clusters de **vínculos/benefícios** e de **elegibilidade**, e adiciona a pergunta-núcleo de
nota fiscal (o *se/quando*) + um nicho de serviço = demo pura de NFS-e.

| # | Slug | Keyword principal | Vol/mês | SD | Frente / Categoria |
|---|---|---|---|---|---|
| 1 | `mei-obrigado-emitir-nota-fiscal` | mei é obrigado a emitir nota fiscal | **2.400** (pico 5.400) | 40 | Nota fiscal (o *se/quando*) |
| 2 | `conta-pj-mei` | conta pj mei | 880 | 44 | **Frente nova: financeiro** · Primeiros passos · CPC R$ 7 |
| 3 | `mei-tem-direito-a-fgts` | mei tem direito a fgts | 390 | 32 | Benefícios e INSS (fecha cluster trabalhista) |
| 4 | `mei-pode-ser-socio-de-empresa` | mei pode ser sócio de empresa | 170 | **19** | Teto e crescimento (elegibilidade) |
| 5 | `mei-eletricista` | mei eletricista | 90 | 22 | Profissões e nichos (demo NFS-e) |

**Cruzamento (sem canibalização):** `obrigado-a-emitir` (o *se/quando*) ≠ `como-emitir-nota-fiscal-mei` (o
*como*) ≠ `nota-fiscal-eletronica-mei` (o *tipo*); `conta-pj` abre frente financeira inédita; `fgts` e
`pode-ser-sócio` estendem vínculos e elegibilidade (≠ `carteira-assinada` que é MEI *empregado*, ≠
`posso-ter-dois-mei`); `eletricista` é nicho (≠ `o-que-e-mei`/`atividades-permitidas`).

**Descartados:** `guia do mei` (9,9k — SERP 100% DAS/PGMEI, intenção de emitir guia, não de conteúdo);
`empréstimo para mei` (33,1k, SD 66 — head comercial, inviável DA baixo + fora do produto); `maquininha
para mei` (CPC R$ 14, mas **transacional** — a pessoa quer comprar maquininha); `como consultar cnpj mei`
(SD 45, coberto por `cartao-cnpj-mei`); `mei confeiteira`/`mei nota fiscal pessoa física` (volume 0).

**Fatos-chave verificados na fonte (3ª passada):** MEI **obrigado** a emitir p/ PJ/governo sempre, p/ PF é
**dispensado** (só se pedir; produto em transporte exige) — NFS-e Nacional obrigatória p/ MEI **desde
01/09/2023** (Res. CGSN 169/2022; o marco de set/2026 é p/ **ME/EPP**, não MEI); Reforma Tributária (LC
214/2025) **acaba com a dispensa p/ PF a partir de 2027**. Conta PJ **não é obrigatória** — gov.br confirma
que dá p/ usar conta PF (a PJ é organização, não lei). MEI titular **não tem FGTS** p/ si (contribui é p/ o
INSS via DAS); quem é **CLT+MEI** mantém o FGTS do emprego; **funcionário do MEI** tem FGTS 8% (+3% INSS
patronal, via DAE/eSocial). MEI **não pode ser sócio/titular/administrador** de outra empresa (art. 105 Res.
CGSN 140/2018) — se virar, **desenquadramento obrigatório com efeito no 1º dia do mês seguinte** (≠ estouro
de teto, que retroage a 1º/jan). Eletricista **pode** ser MEI: **"Eletricista em residências e
estabelecimentos comerciais, independente"** (CNAE **4321-5/00**) + automotivo (4520-0/03); serviço/ISS →
NFS-e; **CREA só p/ engenharia**, NR-10 é segurança (não condição p/ abrir).

**Total publicado após o lote: 56 posts.**

### 2K. Lote 7 — 10 posts (2026-07-11)

Sétimo lote pela skill `seo-content`, com a **3ª passada de conformidade verificada na origem** (4 agentes
de pesquisa cruzaram cada fato YMYL em gov.br/Receita/PGFN/Sebrae **antes** de escrever). Snapshot
Ubersuggest (Brasil, pt, jul/2026), cruzado com os **56 publicados**. Mix: 4 gaps **fiscais/processo**
(inclui a maior keyword do lote) + 5 **nichos de profissão** (demo NFS-e) + 1 quick-win de CNAE.

| # | Slug | Keyword principal | Vol/mês | SD | Frente / Categoria |
|---|---|---|---|---|---|
| 1 | `nota-fiscal-avulsa-mei` | nota fiscal avulsa mei | **4.400** | 37 | Nota fiscal (o *avulsa* vs. NFS-e própria) |
| 2 | `certidao-negativa-mei` | certidão negativa mei | 590 | **14** | Regularização (regularidade fiscal) |
| 3 | `reabrir-mei` | reabrir mei | 390 | 26 | Regularização (pós-baixa/exclusão) |
| 4 | `mei-professor-particular` | mei professor particular | 170 | 17 | Profissões e nichos |
| 5 | `mei-pedreiro` | mei pedreiro | 170 | 16 | Profissões e nichos |
| 6 | `mei-artesao` | mei artesanato | 110 | 22 | Profissões e nichos |
| 7 | `mei-esteticista` | mei esteticista | 90 | 22 | Profissões e nichos |
| 8 | `mei-costureira` | mei costureira | 70 | 22 | Profissões e nichos |
| 9 | `quantos-cnae-mei` | quantos cnae o mei pode ter | 70 | **7** | Primeiros passos (cluster CNAE) |
| 10 | `mei-pet-shop` | mei pet shop | 50 | 14 | Profissões e nichos (cross-link spoke veterinário) |

**Cruzamento (sem canibalização):** `nota-fiscal-avulsa` (o conceito *avulsa* — MEI emite a própria, não avulsa)
≠ `como-emitir-nota-fiscal-mei` (o *como*) ≠ `mei-obrigado-emitir-nota-fiscal` (o *se/quando*) ≠
`nota-fiscal-eletronica-mei` (o *tipo*); `certidao-negativa` (regularidade/CND) ≠ `como-consultar-debitos-do-mei`
(ver o que deve); `reabrir-mei` (voltar após baixa/exclusão) ≠ `como-dar-baixa-no-mei` (fechar) ≠
`como-regularizar-o-mei`; `quantos-cnae` (o *limite* 1+15) ≠ `cnae-do-mei` (o *que é*/como escolher); nichos
novos (professor particular, pedreiro, artesão, esteticista, costureira, pet shop) ≠ nichos já cobertos
(diarista, entregador, motorista-app, salão/manicure/cabeleireiro, eletricista, fotógrafo, caminhoneiro, rural).
`esteticista` (estética de beleza) ≠ `salao-de-beleza` (cabeleireiro/manicure); `pet-shop` (comércio+banho/tosa)
cross-linka a spoke `/ferramentas/consulta-cnae-mei/veterinario` (veterinário NÃO é MEI).

**Descartados:** `como saber se sou mei` (390, **SD 40** — SERP de consulta/gov, coberto parcial por
`cartao-cnpj-mei`); `mei loja virtual` (50, SD 32 — comercial/transacional); `mei barbeiro` (40, SD 25);
`mei mecanico` (40), `mei pintor` (30), `mei influencer` (20), `mei maquiadora`/`doceira`/`sorveteria` (≤10 —
volume baixo demais); `mei manicure` (70 — **canibaliza** `mei-para-salao-de-beleza`); `das complementar mei`
(50, SD 16 — conceito fuzzy, adiado); `carta de exclusão simples`/`mei revendedora`/`mei comida caseira`/`mei
pode vender bebida alcoólica` (volume 0).

**Fatos-chave verificados na fonte (3ª passada, 4 agentes):** *Nota avulsa* — MEI TEM CNPJ e emite a
PRÓPRIA nota; serviço = NFS-e Nacional (obrigatória p/ MEI desde 01/09/2023, Res. CGSN 169/2022, direto
gov.br/nfse sem certificado); "avulsa" (NFA-e) só entra p/ PRODUTO como plano B estadual quando falta emissor
de NF-e, e **varia por UF** (DF não oferece). *Certidão negativa* — federal é CONJUNTA (Receita+PGFN),
grátis/na hora, validade **180 dias**; CPD-EN (positiva c/ efeitos de negativa) sai com débito
suspenso/garantido (ex.: parcelamento em dia) e vale como CND; FGTS-CRF (Caixa, 30d, só MEI com empregado);
CNDT trabalhista (TST). *Reabrir* — baixa NÃO reativa → novo MEI/novo CNPJ, e a dívida migra p/ o CPF;
excluído/desenquadrado sem baixa → mesmo CNPJ, reenquadra no SIMEI **só em janeiro** após regularizar.
*Quantos CNAE* — 1 principal + até 15 secundárias = **16**, todas no Anexo XI (gov.br); serviço → +ISS/NFS-e,
produto → +ICMS/NF-e. *Nichos (Anexo XI lido direto):* professor particular = "Professor(a) particular
independente" **8599-6/99** (serviço; escola regular 8513/8520 NÃO é MEI); pedreiro = "Pedreiro independente"
**4399-1/03** obras de alvenaria (serviço; chapisco/emboço/reboco = 4330-4/99; sem CREA, só engenharia);
costureira = 3 ocupações: sob medida **1412-6/02** (serviço), confecção em série **1412-6/01** (produto+ICMS),
conserto **9529-1/99** (serviço); artesão = CNAE por material (couro 1529-7/00, madeira 1629-3/01, cerâmica
2349-4/99…) produto/NF-e, SICAB opcional; esteticista = "Esteticista independente" **9602-5/02** (serviço;
Lei 13.643/2018; não-invasivo pode, invasivo/saúde regulamentada não); pet shop = comércio **4789-0/04**
(produto) + banho/tosa **9609-2/08** (serviço), veterinário NÃO é MEI (CRMV) — cross-linka a spoke. Agentes
CORRIGIRAM hipóteses erradas de CNAE (professor 8592→8599-6/99; costureira 1412-6/03→1412-6/02; conserto
9529-1/02→9529-1/99).

**Total publicado após o lote: 66 posts.**

## Histórico de execução

- **2026-06-28** — Fundação técnica parcial: `canonical`, `robots` meta, `og:url`/`og:image`/`twitter:image`
  (tags), JSON-LD (Organization+WebSite+SoftwareApplication com preços R$ 39 / R$ 49,90),
  `public/robots.txt`, `public/sitemap.xml` e `public/og-image.png` (1200×630, on-brand). Build validada.
  Pendente: pré-render, Core Web Vitals, GSC/GA4 (externos).

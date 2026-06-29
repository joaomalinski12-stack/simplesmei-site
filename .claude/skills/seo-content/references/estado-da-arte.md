# Estado da arte — SEO para conteúdo (2026)

Princípios e táticas atuais por trás da skill. Os números marcados **(direcional)** vêm de estudos
de fornecedor/acadêmicos de 2024–2025 (rigor variável) — use como direção, **não** como constante
pra cravar com cliente, e reconfira (envelhecem como qualquer dado de SEO). Fontes no fim.

## Princípios

**People-first, não search-engine-first.** Escreva pro MEI que precisa resolver algo, não pro
crawler. Google e LLMs convergiram: conteúdo útil, original e bem organizado é o que ranqueia *e* o
que vira citação. Reescrita do que já existe ("commodity") não.

**E-E-A-T com Experience, dobrado em YMYL.** Fiscal/financeiro é Your-Money-Your-Life: a barra de
confiança é mais alta antes de o Google ranquear ou um LLM citar. Compense a baixa autoridade de
domínio com sinais **on-page**: autor real com credencial (João Gandra), **fontes oficiais
linkadas** (gov.br, Receita, Sebrae, Portal do Empreendedor) com **ano**, data de atualização
visível, e **experiência de primeira mão do produto** ("como o SimplesMEI emite a NFS-e no
WhatsApp, passo a passo"). O **T (Trust)** depende de **não prometer o que o bot não faz**.

**Intenção acima de keyword.** Cada página serve **uma** intenção (informacional / comercial /
transacional / navegacional). Densidade de keyword é irrelevante; **cobertura completa da
intenção** é tudo. Repita a **entidade** ("MEI", "NFS-e") em vez de pronome solto — chunk
autossuficiente extrai melhor.

**Autoridade tópica via query fan-out.** A AI Overviews / AI Mode explode 1 pergunta em **5–11
sub-perguntas** e busca cada uma. Você é citado para perguntas que nem escreveu literalmente *se*
cobrir o tópico em profundidade e amarrar os subtemas. Por isso **cluster** (pilar + satélites
interligados), não página rasa solta. Antecipe as sub-perguntas usando PAA/AlsoAsked como insumo.

**AI Overviews / GEO = SEO. Sem disciplina mágica.** Posição oficial do Google (jun/2025+): **não
há schema especial nem otimização separada** para AIO/AI Mode — tudo roda no mesmo índice e nos
mesmos sistemas de ranking. **Mitos enterrados:** `llms.txt` (Mueller comparou à morta meta
`keywords`; Google/ChatGPT não consomem) e "schema que destrava a IA". O que **de fato** move
citação:
- **Answer-first:** ~44–55% das citações saem dos primeiros ~30% da página **(direcional)**.
- **Dados extraíveis** (método Princeton/GEO, KDD 2024): estatística com fonte (+~41%), citar
  fontes autoritativas e quotes diretas (+~40%) **(direcional)**.
- **Crawlability impecável:** o texto-chave tem que estar no **HTML renderizado**. Esta landing é
  SPA Vite/React → depende do **prerender/SSG** (`prerender.js`); sem isso, fica invisível pra AIO
  e LLMs. Confira no "view source" do `dist/`.
- **Menções off-site:** citação por LLM vem majoritariamente de **terceiros** (ver §Off-site).

**Dados estruturados que ainda valem.** Schema padrão pelo benefício de rich result *normal* e por
ajudar o mapeamento pergunta→resposta: `Organization`, `WebSite`, `Article`, `BreadcrumbList`,
`SoftwareApplication`, `FAQPage`. Ressalva real: o **rich result visível de FAQ** foi restrito a
gov/saúde desde 2023 — o `FAQPage` ainda ajuda o entendimento, mas **não** espere mais a sanfona de
estrelinhas no SERP. Mantenha o `FAQPage` aqui **porque os mesmos q/a alimentam o acordeão visível**
— não escreva FAQ só pro schema. **Não invente schema exótico.**

**Qualidade > volume — virou sobrevivência.** O update de mar/2026 mirou **scaled content abuse**
(volume sem qualidade) com quedas de 50–80% **(direcional)**. Word count **nunca** foi fator de
ranqueamento (Mueller/Sullivan); o que correlaciona é **cobertura completa** em chunks
autossuficientes. Pra domínio novo: **poucas páginas excelentes** batem dezenas de satélites finas —
que, em fiscal, ainda espalham imprecisão.

## Draft — como escrever o corpo

- **Intro answer-first:** responda a intenção-núcleo em **30–60 palavras** no 1º parágrafo, *depois*
  contextualize. A keyword principal aparece nos primeiros ~100 caracteres.
- **H2 = a pergunta real do usuário**, com a redação do PAA quase verbatim ("O que acontece se passar
  do teto do MEI?", não "Estourando o teto"). Viram TOC + âncoras via `rehype-slug`.
- **Bloco de resposta de 40–60 palavras** logo abaixo de cada H2-pergunta, **autossuficiente** — sem
  "como vimos acima", sem pronome solto (repita "MEI"/"NFS-e"). É a unidade que o LLM extrai.
- **Dados extraíveis:** estatística com **fonte + ano** ("o teto do MEI é R$ 81.000/ano — Portal do
  Empreendedor, 2026"); definições curtas ("NFS-e é…"); **tabelas reais** (Markdown GFM `| … |`,
  habilitado por `remark-gfm`) para preço, limites e comparativos — dado tabular é ~2,5x mais citado
  **(direcional)**. Listas numeradas para processos onde a ordem importa.
- **Cobertura completa, sem inflar.** Escreva o necessário pra intenção; chunk = unidade de
  pensamento completa. Sem perseguir contagem de palavras.
- **Bloco "Como o SimplesMEI ajuda"** no fim: experiência de 1ª mão do produto (honesta) + **links
  internos escritos à mão** pros irmãos do cluster + CTA pra home `/`. (O `Related` automático é por
  recência, não cobre o cluster.)
- **Tom pt-BR direto, sem juridiquês.**

## On-page e SERP features
- **Title:** o Google reescreve 61–76% dos títulos **(direcional)** — otimize para **reduzir** a
  reescrita (curto, único, H1 alinhado), não para travar texto. Keyword no início; o build anexa
  ` · SimplesMEI` (a marca pode ser truncada pelo Google — ok). Com número no título, o Google
  preserva ~97% **(direcional)**.
- **Featured snippet / PAA:** premiam **estrutura**, não backlinks — dá pra ganhar PAA mesmo na
  posição ~14. Pergunta como H2 + resposta curta e direta logo abaixo é o padrão que ganha. Respostas
  geradas por IA cruas são filtradas mais agressivamente desde o core update de jun/2025 → **revise à
  mão**.
- **Legibilidade:** frases curtas, voz ativa, subtítulos frequentes. Não existe "nível de leitura
  ideal" mágico — escreva claro pro público.

## Off-site — o gargalo de um domínio novo (trabalho humano)
Citação por LLM e confiança em queries de avaliação ("melhor app pra MEI") vêm majoritariamente de
**terceiros**: comunidades (Reddit aparece muito como fonte), comparativos, reviews e PR digital.
Domínios DR>50 são citados ~5x mais que DR<30 **(direcional)**; ChatGPT e Perplexity compartilham
só ~11% das fontes com o Google **(direcional)** — estratégia mono-plataforma deixa buraco. Para o
SimplesMEI (DA≈5), **esse é o capítulo de maior alavancagem e o que o conteúdo on-page sozinho não
resolve**. O agente pode: mapear onde o nicho conversa, listar comparativos/diretórios de MEI, e
rascunhar pitches/respostas. A **execução** (postar em comunidade com valor real, outreach, PR) é
humana e contínua.

## Armadilhas
- Mirar por **volume**, não por SD × fit (com DA≈5, head term queima esforço).
- **Satélites finos "pra cobrir keyword"** = o scaled-content-abuse punido em mar/2026.
- `llms.txt` / schema "mágico" pra entrar na AIO — esforço desperdiçado.
- Ignorar a **renderização JS** (texto só via JS = invisível pra AIO/LLM; confira o `dist/`).
- **Trocar só a data** no refresh (não move ranking; em YMYL, data nova + regra velha quebra Trust).
- Julgar site novo por **cliques/posição/DA nos primeiros 90 dias** (dados insuficientes → ruído).
- Ler **impressão sem clique como fracasso** (é o normal informacional na era AIO).
- **Canibalização** ("mais páginas = mais chance" divide sinais; a IA não cita nenhuma).
- **Tabela como imagem/`<div>`** (LLM não parseia; perde o ganho de citação). Use Markdown GFM real.
- **Prometer roadmap como entregue** (em YMYL detona Trust e gera representação imprecisa nos LLMs).
- Esquecer de **pedir re-indexação** após mudar (a alteração fica semanas sem ser vista).

## Fontes (2024–2026)
- Google Search Central — AI features / AI optimization guide; title-link docs.
- Search Engine Land / Search Engine Journal — AEO/GEO é SEO; llms.txt especulativo; title rewrite
  (Q1/2025); scaled content abuse (mar/2026); PAA; cannibalization; pruning; QDF; byline dates.
- Princeton GEO (KDD 2024) + explicações; Aleyda Solis (query fan-out, AI search checklist).
- Estudos de CTR/AIO (Seer, Ahrefs); padrões de citação de LLM (Profound, Contently, Omnibound).
- Mueller (datas não movem ranking); word count / content length (SEJ, Rankability).

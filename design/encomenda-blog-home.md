# Encomenda — **Home editorial do Blog** (estilo Nubank)

**Para:** agente do *SimplesMEI Design System* (Claude Design) — domínio **B · Site**
**De:** Produto/SEO — via a ponte (o dono)
**Produto:** SimplesMEI — IA que cuida do fiscal do MEI no WhatsApp. simplesmei.net.

> **Redesenho** de página existente: o `/blog` hoje é uma **listagem simples** (grid reverso-cronológico).
> Eu (Claude Code) cuido do JSX + rota + dados (já existem em `src/blog.jsx`); você desenha o **layout
> editorial + navegação por categoria + copy + responsivo** nos tokens. Guardrails: SimplesMEI **é uma
> IA**; copy ancorada no `PRODUTO.md`; **pré-lançamento** → todo CTA cai na **lista de espera**.
> ⚠️ **"Estilo Nubank" = a ESTRUTURA editorial** (hero, categorias, grid de cards, limpeza, respiro) —
> **não a cor roxa**. Usar a paleta da marca (`BRAND`/`FONTS`), sem hex inventado.

## 0. O que estou encomendando

O **mockup da home do blog** — uma página-índice editorial que organiza os **51 posts** (e crescendo) por
**categoria**, com **post em destaque** e **grid de cards**. Objetivo triplo:

- **Navegação/descoberta:** hoje o leitor cai numa lista corrida; queremos que ele **navegue por tema**.
- **SEO:** categoria = **hub interno** (fortalece o grafo de links pillar↔cluster) e mais tempo na página.
- **Marca:** transmitir que o SimplesMEI **entende de MEI a fundo** — a home do blog é vitrine de autoridade.

## 1. O conteúdo real (pra você desenhar com dado, não suposição)

- **51 posts**, cada um já com **`coverPalette`** (coral/amber/mint/ink — distribuição equilibrada) e um
  **`PostCover`** que renderiza um cover colorido + a tag de categoria. **Reaproveite esse cover** — ele já
  é a "capa" visual do card.
- **Taxonomia hoje está fragmentada (27 rótulos, vários com 1 post só).** Proponho **consolidar em 7
  categorias** — é o que a navegação precisa. (Eu re-etiqueto o `category` no frontmatter na implementação;
  desenhe os chips/seções com base nestas 7.)

| Categoria (proposta) | ~Posts | Cobre |
| --- | --- | --- |
| **Primeiros passos** | ~8 | o que é MEI, como abrir, CNAE, atividades, CCMEI, alvará, nome fantasia |
| **Nota fiscal** | ~7 | emitir, NFS-e, nota de produto, recorrente, cancelar, pelo WhatsApp |
| **Imposto e DAS** | ~6 | DAS, Simples Nacional, IR do MEI, declaração anual, relatório mensal |
| **Teto e crescimento** | ~5 | limite, desenquadramento, MEI x ME, MEI x autônomo, dois MEI |
| **Benefícios e INSS** | ~8 | aposentadoria, auxílio-doença, salário-maternidade, carteira assinada |
| **Regularização** | ~5 | regularizar, consultar débitos, parcelar DAS, dar baixa, obrigações |
| **Profissões e nichos** | ~10 | motorista, entregador, diarista, fotógrafo, beleza, rural, programador |

## 2. A barra (o que desenhar)

- **Cabeçalho editorial:** título do blog (ex.: *"Guias do MEI"* / *"Blog do SimplesMEI"*) + uma linha de
  apoio + **busca** por texto. Fundo `BRAND.paper`.
- **Post em destaque (hero):** um card grande no topo (cover + categoria + título + resumo) — o "editor's pick".
- **Navegação por categoria:** **chips/tabs horizontais** com as 7 categorias, que **filtram** o grid
  (comportamento client-side). Estado ativo claro. No mobile, scroll horizontal dos chips.
- **Grid de cards:** anatomia do card = **cover (coverPalette)** · **tag de categoria** · **título** ·
  descrição curta · data. Reusar o `PostCover` existente.
- **Seções editoriais** (abaixo do grid principal): blocos **por categoria** (ex.: "Nota fiscal",
  "Benefícios e INSS") com 3–4 cards + link **"ver todos"**. Dá ritmo de revista à página.
- **Responsivo** (`useIsMobile`, não CSS): mobile 1 coluna (chips com scroll-x), desktop 2–3 colunas.
  Corpo ≥15px, alvo de toque ≥44px, sem scroll horizontal.
- **Fechamento = a porta:** faixa CTA com a **Door de sempre** — em pré-lançamento cai na **lista de espera**
  (*"Quer o fiscal do MEI no automático? Entra na lista"*). Sem formulário solto.
- **Honestidade/tokens:** **paleta da marca**, nada de roxo Nubank; SimplesMEI **é uma IA**; copy conforme
  o `PRODUTO.md`.

## 3. Entrega

Um HTML self-contained `@dsCard` em `site/` (ex.: `site/blog-home.html`): hero + nav de categorias + grid +
1–2 seções por categoria + comportamento responsivo + estado de **categoria ativa**. Eu puxo fresco
(`DesignSync.get_file`), porto pra **JSX + inline styles + tokens** no `BlogList` (`src/blog.jsx`), **consolido
as 7 categorias** no frontmatter dos 51 posts, **meço no Playwright** (360/390/430 + desktop) e cuido do SEO
(o `/blog` já é pré-renderizado; adiciono `CollectionPage`/`ItemList` se fizer sentido). O que embarca é o
build do Vite.

## 4. Decisões do dono (destaque com sua recomendação)

1. **Taxonomia:** adoto as **7 categorias** consolidadas acima (recomendo) ou mantenho os 27 rótulos atuais?
2. **Página de categoria:** além do filtro na home, crio **rotas `/blog/categoria/<slug>`** (recomendo — cada
   categoria vira um hub indexável, bom pra SEO) ou fica só o filtro client-side na home?
3. **Destaque (hero):** escolho o post em destaque **à mão** (marco no frontmatter) ou uso **automático** (o
   mais recente)? (recomendo à mão — curadoria editorial).
4. **Busca:** incluo **busca por texto** no topo da home (recomendo)?

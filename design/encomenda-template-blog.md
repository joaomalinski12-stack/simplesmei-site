# Encomenda — **Template de artigo do Blog** (layout)

**Para:** agente do *SimplesMEI Design System* (Claude Design) — domínio **B · Site**
**De:** Produto/SEO — via a ponte (o dono)
**Produto:** SimplesMEI — IA que cuida do fiscal do MEI no WhatsApp. simplesmei.net.

> O blog **já existe e já roda** (`src/blog.jsx`, posts em markdown, rota `/blog/{slug}`, com Article +
> FAQPage no JSON-LD). **Não é construir do zero** — é **redesenhar o look do template de artigo**
> pra ele ficar fiel ao design system. O conteúdo (markdown) é meu/do dono; aqui é só o **layout**.

## 0. O que estou encomendando

O mockup do **layout de um artigo de blog** (a página `/blog/{slug}`), nos tokens, cobrindo: header
(título/data/autor), índice (TOC), corpo do artigo (tipografia de markdown), caixa do autor, FAQ do
post e o CTA final. Eu porto pra JSX e ajusto o `blog.jsx`.

## 1. As-is verificado (o que roda hoje — e o que está furando o sistema)

O `blog.jsx` foi feito **fora do loop** e **inventa hex em vez de usar `BRAND`** (fura
`design-fidelity.md`):
- TOC: fundo `#F8F9FA`, borda `#E5E7EB` → deveriam ser tokens (`BRAND.sand`/`sandDeep`).
- FAQ do post: fundo `#FFF5F4`, borda `#E5E7EB` → tokens (`BRAND.coralSoft`…).
- CTA: gradiente `#232431` → token (`BRAND.ink`).
- **Padrões duplicados:** o `PostFAQ` reimplementa o acordeão (já existe o `FaqV5` da home) e o CTA
  era um **botão morto** (sem link — já apliquei um hotfix pra virar porta `wa.me`).

## 2. A barra (o que desenhar)

Um template de artigo **na cara do site** (mesma família do hero/preço/FAQ):
- **Tokens só** (`BRAND`/`FONTS`) — nada de hex inventado.
- **Tipografia de leitura**: corpo confortável (≥18px desktop / ≥16px mobile), H2/H3 em Bricolage,
  links em `coralDeep` sublinhados, blockquote com a borda coral, listas legíveis.
- **TOC** ("Neste artigo") nos tokens, com âncoras.
- **Caixa do autor** (foto + bio + LinkedIn) coerente com a marca.
- **FAQ do post**: reusar o **acordeão do `FaqV5`** (mesmo look da home), painel sempre no DOM (SEO).
- **CTA final = a porta**: card escuro (`BRAND.ink`) com a **`Door`** (`wa.me`), no padrão do site —
  não um `<button>` solto. Copy ação-primeiro, ancorada no `PRODUTO.md`.
- **Responsivo**: mobile ≤767px (1 coluna, TOC recolhível ou no topo) × desktop. Sem scroll horizontal.

## 3. Entrega

HTML self-contained `@dsCard` em `site/` (ex.: `site/template-blog.html`) com o look + os estados
(item de FAQ aberto/fechado, hover de link/CTA) + comportamento responsivo. Eu puxo, porto pro
`blog.jsx` reusando `Door`/acordeão/tokens, meço no Playwright e faço deploy.

## 4. Decisões do dono (destaque com recomendação)

1. **TOC**: card fixo no topo (atual) ou rail lateral sticky no desktop? (recomendo manter no topo —
   simples e bom no mobile).
2. **CTA do post**: card escuro com `Door` (recomendo) — confirma a copy ("Pronto para descomplicar
   seu MEI?" + porta).
3. **Largura de leitura**: 720px atual está bom?

---
paths:
  - "src/**/*.jsx"
  - "index.html"
  - "design/**"
---

# Regras: fidelidade ao Claude Design (site)

Carrega ao implementar/mexer numa peça que veio do Design (seção, componente, copy). O Claude
Design é o **espelho de design**; **o repo é a espinha**, mas quando uma peça nasce lá, o site
**tem que refletir o mockup fielmente**. O erro que custou caro uma vez: medir fidelidade **no
olho**, de rodada em rodada. O ritual abaixo troca isso por conferência repetível.

## O ritual (não pule passos)

1. **Puxe o mockup FRESCO** antes de implementar (`DesignSync.get_file`), não de memória. O
   mock é a spec — leia o HTML/CSS inteiro e **extraia os valores** (cores, layout, copy,
   tamanhos, comportamento responsivo) antes de tocar no código.
2. **Implemente no repo** em **JSX + inline styles + tokens** (`BRAND`/`FONTS` de `tokens.jsx`).
   A responsividade é via **JS** (`useIsMobile()`), não CSS — quebre cada peça em
   `m ? <mobile> : <desktop>`.
3. **Meça, não chute.** Builde (`npm run build`), sirva o `dist/`, e **meça com Playwright** nos
   viewports reais (mobile **360 / 390 / 430** + desktop): sem scroll horizontal
   (`scrollWidth == viewport`), larguras iguais onde devem ser, alvos de toque ≥44px, corpo
   ≥~15px, títulos com `clamp`. **Não declare "fiel" sem medir** — e confira os screenshots
   contra o mockup. (O harness de medição/print vive fora do repo; rode-o no `dist/` servido.)
4. **Espelhe de volta** no Claude Design (`DesignSync`) quando o site mudar de verdade, pra o
   Design ver o que de fato roda — não o mockup dele.

## A barra

- **Fatos de produção não se mexem por causa de design:** `WA_NUMBER` (`src/porta_nav.jsx`),
  CNPJ do footer (`src/logo_footer.jsx`), preço (`src/preco_cta.jsx`). Mudança aí é decisão de
  produto, não de mockup.
- **Honestidade da copy:** a landing só vende o que o produto faz — confira `PRODUTO.md` (no ar
  vs. roadmap) antes de prometer. Nada de "falar com a equipe": o SimplesMEI **é uma IA**.
- **Mockup ≠ build:** a conferência é **visual + medida** (números têm que bater), não diff de
  pixel. O que embarca é o build do Vite, não o HTML/JSX do Design.

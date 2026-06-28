# SimplesMEI — Site

Landing page do **SimplesMEI**, a IA que cuida do fiscal do MEI dentro do WhatsApp
(emite NFS-e, cuida do DAS, da recorrência e vigia o teto).

Construído com **Vite + React 18**. Toda a UI é feita com inline styles + tokens de marca
(sem framework de CSS); as fontes vêm do Google Fonts.

> Origem: os componentes nasceram no projeto **SimplesMeiv3** do Claude Design (pasta `site/`)
> e foram portados pra um build de produção (de `<script type="text/babel">` no navegador
> para módulos ES com bundling do Vite).

## Rodar localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento (http://localhost:5173)
npm run build    # build de produção → dist/
npm run preview  # serve o dist/ pra conferir o build
```

Requer Node 18+.

## Estrutura

```
index.html          # shell: <style> da marca + animação do "cometa" + monta /src/main.jsx
src/
  main.jsx          # ponto de entrada — renderiza <SiteV5/>
  tokens.jsx        # tokens da marca (BRAND/FONTS) + primitivas (PhoneFrame, ChatShell, …)
  logo_footer.jsx   # logo, nav, footer, chat animado, cards de cenário
  tiles.jsx         # mockups de UI do produto (recibo, medidor, calendário, …)
  porta_nav.jsx     # "a porta" (CTA único → deep link do WhatsApp) + nav sticky
  heroi.jsx         # herói + animação-assinatura "frase vira nota"
  bento_dor.jsx     # grade bento das features
  preco_cta.jsx     # preço, segurança, CTA final e a página <SiteV5/>
```

## ⚠️ Antes de publicar

O número do WhatsApp é um **placeholder**. Troque `WA_NUMBER` em
[`src/porta_nav.jsx`](src/porta_nav.jsx) pelo número de produção do WhatsApp Business
(formato `55DDDNÚMERO`, ex.: `5511999999999`) — é o destino de todos os CTAs ("portas").

## Deploy

Qualquer host de site estático que rode o build do Vite (Vercel, Netlify, Cloudflare Pages,
GitHub Pages). Build command: `npm run build` · Output dir: `dist`.

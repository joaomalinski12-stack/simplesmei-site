# SimplesMEI — Site (landing)

Landing page do **SimplesMEI**: a IA que cuida do fiscal do MEI dentro do WhatsApp (emite
NFS-e, cuida do DAS, da recorrência e vigia o teto). **Vite + React 18**, UI 100% em inline
styles + tokens de marca (sem framework de CSS). Estrutura de arquivos detalhada: ver `README.md`.

> Este repo é **só o site** (marketing). O **produto/bot** mora em repo SEPARADO
> (`simples-mei`, Python/FastAPI) e **não** está aqui.

## 📋 O que o produto faz → leia `PRODUTO.md`

**Antes de escrever copy, SEO ou qualquer texto da landing, leia o [`PRODUTO.md`](PRODUTO.md).**
Ele é o espelho fiel do que o bot faz (pilares, o que está no ar vs. roadmap, público, preço) —
mantido à mão porque este repo **não enxerga** o backend. É a fonte pra a copy não prometer o
que não existe.

## Comandos

```bash
npm install
npm run dev      # dev server → http://localhost:5173
npm run build    # build de produção → dist/
npm run preview  # serve o dist/ pra conferir o build
```

## O que mais morde (gotchas)

- **Deploy automático:** push na branch `main` → **Vercel rebuilda e publica em produção**.
  Rode `npm run build` antes pra garantir que compila. Confirme com o dono antes de promover.
- **Responsividade é via JS, não CSS:** não há media queries em CSS (fora o `<style>` da marca
  no `index.html`). O padrão é `const m = useIsMobile()` (matchMedia `max-width: 767.98px`,
  em `tokens.jsx`) e então `m ? <mobile> : <desktop>` no inline style. Pra ajustar mobile,
  procure `useIsMobile`.
- **Fatos de produção — NÃO mude sem pedir:**
  - WhatsApp: `WA_NUMBER = '5511978024355'` em `src/porta_nav.jsx` (a "porta"/deep link).
  - CNPJ do footer: `62.225.090/0001-76` em `src/logo_footer.jsx`.
- **Tudo é uma "porta":** os CTAs/cards abrem o WhatsApp com a mensagem já digitada
  (`waHref`/`DOOR_TEXT` em `porta_nav.jsx`). Não há formulário.

## SEO (missão atual)

Trabalho de SEO da landing usando o **Ubersuggest via MCP**:
- Config em `.mcp.json` (escopo *project*, **gitignored** — conexão OAuth na conta, não
  commitar). Pra usar: `/mcp` → **ubersuggest** → **Authenticate**.
- Ferramentas: keyword research, domain/competitor analysis, backlinks, site audit, tráfego
  orgânico. Objetivo: ranquear a landing do SimplesMEI (IA fiscal pro MEI no WhatsApp).

## Design

Os componentes nasceram no **Claude Design** (projeto *SimplesMeiv3*, pasta `site/`) e foram
portados pra build de produção. **O repo é a fonte de verdade do que roda**; o Claude Design é
espelho/superfície de design.

## Estilo

- Copy e UI em **português (pt-BR)**.
- Siga os padrões do arquivo vizinho (inline styles, tokens de `tokens.jsx`, nomes, idioma).

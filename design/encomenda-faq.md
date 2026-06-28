# Encomenda — Seção **FAQ** da landing (perguntas frequentes)

**Para:** agente do *SimplesMEI Design System* (Claude Design) — domínio **B · Site**
**De:** Produto/SEO — via a ponte (o dono)
**Produto:** SimplesMEI — IA que cuida do fiscal do MEI no WhatsApp (NFS-e = nota, DAS = boleto). Domínio simplesmei.net.

> **Trate o as-is como dado verificado (conferido no repo + `PRODUTO.md`), não design a defender.** Esta é uma
> **seção nova** da landing — não existe mockup ainda. Antes de desenhar, releia o look das seções **preço**,
> **segurança** e **CTA final** (a FAQ é vizinha delas) e a régua de voz da `_fundacao`. **Os guardrails que mais
> mordem aqui: (#9) não existe atendimento humano — o SimplesMEI É uma IA; e a copy só promete o que roda
> (`PRODUTO.md`: no ar vs. roadmap).**

## 0. O que estou encomendando

O **mockup self-contained da seção FAQ** da landing: o **look** (cards/acordeão nos tokens), a **copy exata**
(pergunta + resposta) e o **comportamento responsivo** (mobile ≤767px × desktop). **Não é implementar** — é
desenhar. Eu (Claude Code) puxo o mockup fresco, porto pra JSX + inline styles + tokens, **meço com Playwright**
nos viewports e faço deploy; e adiciono o **`FAQPage` (JSON-LD)** espelhando a copy aprovada.

**Por que esta seção:** dupla função. (a) **SEO** — captura *People Also Ask* do Google e habilita o rich
result de FAQ; a home não vai ranquear nos head terms tão cedo (domínio novo, DA 5), mas a FAQ ancora
relevância temática e pega long-tail. (b) **Conversão** — derruba as objeções fiscais logo antes da última
porta. As perguntas abaixo já vêm miradas em busca real + objeção.

## 1. As-is verificado (o que existe hoje)

- A home tem: nav · herói · trust row · bento (features) · **preço** · **segurança** · **CTA final** · footer.
  **Não há FAQ.**
- UI 100% **inline style + tokens** (`BRAND`/`FONTS`); responsividade por **JS** (`useIsMobile()`, ≤767px =
  mobile), **sem CSS media query**.
- Cabeçalho de seção padrão = `SecHead`: traço cometa (coral→mint) + eyebrow **Mono** + `<h2>` **Bricolage**.
- Cards da seção **Segurança** = `#fff`, borda `BRAND.sandDeep`, radius 16, título Bricolage 16 + corpo
  Manrope — **reuse essa linguagem** na FAQ.
- Seções "fiscais" usam fundo `BRAND.paper`.
- **Preço (fonte de verdade `preco_cta.jsx`):** anual **R$ 39,90/mês** (12×, certificado incluso) · mensal
  **R$ 49,90/mês** (certificado à parte). *(⚠️ o `PRODUTO.md` está com "R$ 39/mês" desatualizado — vale o repo.)*

## 2. A barra (estado da arte) — o que quero que você desenhe

Um bloco de **perguntas frequentes** elegante e escaneável, no tom da casa (caloroso, ação-primeiro, sem
jargão cru). Provavelmente **acordeão** (pergunta clicável → resposta), mas você escolhe o formato que melhor
casa com o resto da página.

**Requisito de SEO que molda o formato:** a resposta tem que **existir no DOM mesmo quando o item está
fechado** (acordeão pode colapsar via altura, **nunca remover/condicional o texto**) — senão o Google não lê
e o rich result não vale. Marque isso no mock pra eu manter na implementação.

### Copy proposta (perguntas + respostas) — ancore no `PRODUTO.md`; refine a voz

Priorizei por busca real (volume/mês no Brasil) + força da objeção. Pode cortar/reordenar; **mantenha a
honestidade**.

1. **"O MEI é obrigado a emitir nota fiscal?"** *(SEO: `nota fiscal mei` ~368k)*
   → Pra empresa (PJ) é obrigatório; pra pessoa física é opcional. Com o SimplesMEI tanto faz: você pede no
   WhatsApp e a nota sai em segundos, sempre certa.
2. **"Como o SimplesMEI emite a nota pelo WhatsApp?"** *(branded · `emitir nota mei` ~40k)*
   → Você manda a mensagem do seu jeito ("emite 480 pra Marina, consultoria"). A IA acha o cliente, classifica
   o serviço, projeta o teto, emite a NFS-e oficial (com QR Code) e devolve número + PDF. Em geral < 30s.
3. **"Preciso de certificado digital?"** *(objeção)*
   → No plano anual o certificado já vem **incluso**. No mensal, é cobrado à parte. Você não precisa entender
   de certificado — a IA cuida.
4. **"O que acontece quando eu chego perto do teto de R$ 81 mil?"** *(SEO: `limite mei`/`teto mei` ~18k)*
   → A IA soma seu faturamento do ano e te avisa antes de estourar. Se uma nota for passar do limite, ela segura
   e te avisa — você decide emitir mesmo assim ou não.
5. **"E o DAS, como fica?"** *(SEO: `das mei` ~673k — ⚠️ ver constraint de honestidade)*
   → A IA te ajuda a não perder o DAS: lembra e te manda o resumo do mês.
   *(⚠️ honestidade: o lembrete **proativo** do DAS é **roadmap** no `PRODUTO.md`. NÃO prometa "automático",
   "paga sozinho" nem prazo. Tom: "te ajuda a lembrar", não "automatiza o pagamento".)*
6. **"Como funciona a recorrência?"** *(diferencial)*
   → Configurou uma vez, esqueceu: a nota fixa do mesmo cliente sai todo mês, no dia certo. Nenhum concorrente
   faz isso no MEI.
7. **"Meus dados e meu dinheiro estão seguros?"** *(objeção · LGPD)*
   → Tudo sob LGPD — você pede, a gente apaga. E a IA **nunca toca no seu dinheiro**: sem acesso a conta, sem
   PIX no seu nome. Só emite nota e organiza o fiscal.
8. **"Preciso baixar app ou aprender a usar um portal?"** *(objeção · diferencial)*
   → Não. É só WhatsApp, conversa normal. Sem app, sem portal travando, sem login.
9. **"Vocês abrem o meu MEI?"** *(SEO: `abrir mei`/`como abrir mei` ~135k/18k)*
   → Sim, de graça. A IA conduz a abertura, sugere o CNAE certo, valida e te leva até o cadastro no Portal do
   Empreendedor.
10. **"Quanto custa?"** *(objeção · preço)*
    → Anual **R$ 39,90/mês** (certificado incluso); mensal **R$ 49,90/mês**. Sem fidelidade, cancela quando
    quiser. *(preço é fonte de verdade do repo — `preco_cta.jsx`; não invente número.)*

Sugiro **6–8 visíveis** (as de maior busca + maior objeção); o resto pode ficar de fora ou virar pauta de blog.

### Fechamento da seção
A FAQ é vizinha do CTA final → feche com **uma porta** (deep link WhatsApp), no padrão do site: algo como
"ainda com dúvida? pergunta pra IA" → abre a conversa. Sem formulário, sem "fale com a equipe".

## 3. Constraints + guardrails (não negociáveis)

- **Sem humano (#9):** o "ainda com dúvida?" abre a **IA no WhatsApp**, nunca uma pessoa/equipe/fila.
- **Honestidade (`PRODUTO.md`):** DAS proativo = roadmap (tom suave); recorrência roda por gatilho (ok vender
  "sai todo mês", sem prometer infra). Nada de prometer o que não roda.
- **Tokens, não hex inventado:** `BRAND`/`FONTS`. Eyebrow Mono + traço cometa; `<h2>` Bricolage; corpo Manrope
  **≥15px no mobile**.
- **Responsivo de verdade (mobile não é afterthought):** ≤767px = 1 coluna, item full-width, **alvo de toque
  ≥44px** na linha da pergunta, **sem scroll horizontal**. Desktop: coluna central confortável (largura de
  leitura ~720–820px). Descreva o comportamento dos dois.
- **Acordeão mantém o texto no DOM** quando fechado (SEO).
- **Fundo `BRAND.paper`**, coerente com preço/segurança.

## 4. Formato de entrega

Um HTML self-contained `@dsCard` em `site/` (ex.: `site/faq.html`), no padrão dos outros mocks de site:
- O **look** da seção (cabeçalho SecHead + acordeão/cards nos tokens).
- A **copy exata** final (perguntas + respostas que você aprovou/refinou).
- O **comportamento responsivo** descrito (mobile ≤767px × desktop) — como cada parte se comporta.
- O **estado de interação** (item aberto/fechado, chevron, foco/teclado).

## 5. Decisões do dono que você destaca (com sua recomendação)

1. **Posição na página:** entre **Segurança** e **CTA final** (objeção → porta) — minha recomendação — ou logo
   depois do **Preço**?
2. **Quais 6–8 perguntas** entram (das 10 propostas) e em que ordem.
3. **Formato:** acordeão (1 aberto por vez? primeiro já aberto?) ou tudo aberto (lista)? Recomende pensando no
   mobile.
4. **Tom do DAS:** confirme o fraseado honesto (lembrete, não automação), pra não furar o `PRODUTO.md`.

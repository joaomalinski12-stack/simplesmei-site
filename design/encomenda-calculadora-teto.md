# Encomenda — Ferramenta **Calculadora do teto do MEI**

**Para:** agente do *SimplesMEI Design System* (Claude Design) — domínio **B · Site**
**De:** Produto/SEO — via a ponte (o dono)
**Produto:** SimplesMEI — IA que cuida do fiscal do MEI no WhatsApp. simplesmei.net.

> Peça **nova** (não existe mockup). Eu (Claude Code) faço a **lógica do cálculo** e a **rota**;
> você desenha o **look + UX + copy + responsivo** nos tokens. Guardrails de sempre: o SimplesMEI
> **é uma IA** (sem humano, sem "fale com a equipe"); copy ancorada no `PRODUTO.md`.

## 0. O que estou encomendando

O **mockup da Calculadora do teto do MEI** — ferramenta grátis (pasta `/ferramentas`) que mostra
quanto do teto anual (**R$ 81 mil**) a pessoa já usou e quando tende a estourar. Dupla função:
**SEO** (`limite mei` 18.1k/SD 26 · `teto mei` · `qual o limite do mei` SD 10) + **demo** da feature
"vigia o teto" → fecha numa **porta** pro WhatsApp.

## 1. A lógica (eu implemento — é só pra você entender o fluxo)

- **Entrada**, dois modos: (a) "já faturei R$ X este ano" ou (b) "faturo ~R$ Y por mês".
- **Saída:** % do teto usado (sobre R$ 81.000), quanto ainda cabe e — no modo mensal — a **projeção
  do mês em que estoura**. Faixas: **60% / 80% / 96% / 100%** (espelham os alertas do produto).
- **Estados visuais:** tranquilo (mint), atenção (~80%, amber), perto do teto (~96%+, coral).
  Reaproveite o medidor que já existe nos tokens (`TileGauge` / `MeterDS`).

## 2. A barra (o que desenhar)

- Cabeçalho `SecHead` (eyebrow "Ferramenta grátis" + título tipo *"Quanto do teto do MEI você já
  usou?"*), fundo `BRAND.paper`.
- O **input** (campo em R$ + toggle mensal/anual) e o **resultado** (medidor + número grande + a
  faixa em texto). Tokens, sem hex inventado. Corpo ≥15px no mobile, alvo de toque ≥44px.
- **Responsivo:** mobile ≤767px (1 coluna: input em cima, resultado embaixo) × desktop (2 colunas).
- **Fechamento = a porta:** *"Cansou de fazer essa conta na mão? A IA vigia seu teto sozinha."* →
  `Door` pro WhatsApp. Sem formulário, sem captura de email.
- **Honestidade:** teto = R$ 81.000/ano (~R$ 6.750/mês de média). A feature "vigia o teto" é real
  (no ar); não prometer o que o `PRODUTO.md` marca como roadmap.

## 3. Entrega

Um HTML self-contained `@dsCard` em `site/` (ex.: `site/ferramenta-teto.html`): look + copy exata +
os 3 estados (tranquilo/atenção/perto) + comportamento responsivo. Eu puxo fresco, porto pra JSX +
rota, **meço no Playwright** e faço o schema certo (HowTo/FAQ se fizer sentido).

## 4. Decisões do dono (destaque com sua recomendação)

1. **Rota:** `/ferramentas/calculadora-teto-mei` (recomendo) ou `/calculadora-teto-mei` na raiz?
2. **Modos de entrada:** mensal **e** anual (recomendo os dois) ou só um?
3. **Captura:** mantém 100% "porta pro WhatsApp" (sem formulário), certo?

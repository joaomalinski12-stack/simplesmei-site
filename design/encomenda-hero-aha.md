# Encomenda — **Redesign do HERÓI** (reforçar o momento "a-ha")

**Para:** agente do *SimplesMEI Design System* (Claude Design) — domínio **B · Site**
**De:** Produto/Growth — via a ponte (o dono)
**Produto:** SimplesMEI — IA que cuida do fiscal do MEI no WhatsApp. simplesmei.net.

> Peça que **JÁ EXISTE** (é um **redesign** do herói atual, não peça nova). Como você **não enxerga
> o repo**, descrevo o estado atual por inteiro na seção 2. O coração da encomenda é **animação** —
> então entrego um **storyboard de beats** (blueprint de movimento), não só um layout parado.
> Guardrails de sempre: o SimplesMEI **é uma IA** (sem humano, sem "fale com a equipe"); copy
> ancorada no `PRODUTO.md`; **tokens** (`BRAND`/`FONTS`), nada de hex inventado.

---

## 0. O que estou encomendando

O **mockup do herói redesenhado** (`site/`), com **uma meta única: despertar o "a-ha" mais forte
na primeira dobra** — com **mais animação no mock do celular** e **menos texto**. Três movimentos:

1. **Cortar texto** (público simples/pouco instruído) — o peso da comunicação migra do texto pra **cena animada**.
2. **Fortalecer a transformação** "frase vira nota" (hoje fraca: o texto só troca de cor).
3. **Trazer o DAS pro a-ha** — é a **maior dor do MEI** e agora está no ar (ver seção 1).

## 1. Por que (insight da pesquisa — pra você desenhar com intenção)

- **Concorrentes (MaisMEI, Qipu, Cora, Contabilizei, Agilize, InfinitePay, Asaas/eNotas):** TODOS
  provam o valor com **número, selo, foto ou mockup ESTÁTICO**. **Nenhum mostra o produto fazendo a
  tarefa ao vivo.** Mostrar a coisa acontecendo é o nosso **fosso** — é pra dobrar a aposta, não imitar.
- **Público:** MEI prestador, pessoa **simples e pouco instruída**. Não escaneia — lê palavra por
  palavra e desiste no texto denso. Regras: **anime a CENA, nunca o TEXTO-âncora** (H1/CTA ficam
  parados); **uma coisa por vez** (stagger); **linguagem concreta** (a "nota da Marina", não "documento
  fiscal"); **familiaridade do WhatsApp = confiança** (o mock tem que parecer o zap que a pessoa já usa).
- **Intenção de busca (dados reais):** **DAS = 673 mil buscas/mês** (pico de **1 milhão em janeiro**),
  quase **2× "nota fiscal"** (368k). O herói hoje ignora o DAS. Como o recurso está no ar, ele **merece
  estar no a-ha**. "WhatsApp" tem **busca zero** → não se vende por texto, só por **demonstração visual**.

## 2. O herói ATUAL (descrição fiel — você não vê o repo)

**Layout:** 2 colunas no desktop (texto à esquerda, celular à direita); 1 coluna no mobile (texto em
cima, celular embaixo). Fundo: gradiente quente coral→creme→papel, com dois "washes" radiais (coral
e mint).

**Coluna de texto (de cima pra baixo):**
- **Badge** (pílula branca, ponto coral): *"A IA que cuida do fiscal do MEI · dentro do WhatsApp"*.
- **H1** (Bricolage, ~66px desktop): *"O trabalho do contador."* + linha 2 em coral: *"Sem a conta do contador."*
- **Parágrafo de ~3 frases** (~40 palavras): *"Você manda a mensagem do seu jeito. A IA entende, emite
  a nota fiscal certinha e envia pro cliente. Sem portal travando, sem DAS esquecido, sem susto com o
  teto do MEI. Tudo numa conversa."* ← **este é o principal alvo de corte.**
- **Linha de preço:** *"34 dias grátis. Depois, a partir de R$ 39,90/mês."*
- **CTA = a porta** (botão verde "WhatsApp"): *"emitir minha primeira nota grátis"* + selo
  *"verde abre o WhatsApp · de verdade"*.

**Coluna do celular (o mock — primitivas que já existem, reuse):** um `PhoneFrame` (moldura escura,
notch, status bar 09:41) com um `ChatShell` (header "SimplesMEI · online", fundo zap pontilhado).
Dentro roda a **animação-assinatura "frase vira nota"** (~4,7s, auto-play, com botão **"rever"**):
1. Chega a **mensagem torta** da pessoa (bolha do usuário): *"500 reais pra Marina, fiz o logo dela"*.
2. Cada pedaço **acende** (valor/cliente/serviço destacados na cor do acento).
3. Indicador de **"digitando"** (3 bolinhas em bounce — padrão WhatsApp).
4. Monta um **rascunho de NFS-e** (card branco): linhas Valor / Cliente / Serviço se preenchem com ✓.
5. **Encaixa o recibo** (`TileRecibo`: selo "Emitida", R$ 500,00, nº da nota, "enviada pro WhatsApp da cliente").
6. No fim, 3 **anotações** (chips mono ligados por tracinho ao celular, **só no desktop**):
   *"achou a cliente só pelo nome"* · *"projetou seu limite"* · *"enviou pra ela sozinha"*.

**Problemas a resolver (diagnóstico):**
- (a) **Texto demais** — o parágrafo só repete o que o mock mostra.
- (b) **Transformação fraca** — o pedaço da frase só **troca de cor**; o olho **não vê viajar** pro
  campo. "Aparece preenchido" ≠ "eu vi virar nota".
- (c) **Tudo entra junto** no clímax (as 3 anotações ligam de uma vez, sem stagger).
- (d) **Clímax no lugar errado** — pico na "emissão"; o a-ha real é a **entrega** ("enviou sozinha").
- (e) **Mobile sem a-ha** — as anotações **nem aparecem no celular**, e o público é mobile.
- (f) **DAS ausente** do a-ha (a maior dor).

## 3. A barra (o que desenhar)

### 3.1 Texto — menos é mais
- **Manter:** badge, H1 (antítese), linha de preço, CTA verde.
- **Cortar** o parágrafo de 3 frases → **UMA frase-legenda** de ~12 palavras que legenda a cena (não a
  descreve inteira). Direção (ver decisão #1): *"Você manda do seu jeito. A IA emite a nota e cuida do
  seu imposto."*
- Nível de leitura **6º ano**, voz ativa, **sem travessão**, zero jargão solto. "NFS-e / DAS / teto" só
  aparecem **sendo resolvidos dentro do mock**, nunca como rótulo que intimida.

### 3.2 A ANIMAÇÃO — storyboard de **2 beats** (o coração da encomenda)

Arco único, uma mensagem: **"a IA cuida de tudo"**. Dois momentos, ambos no ar. Storyboard
beat-a-beat (descreva timing, o que entra/move, easing e stagger — eu re-implemento o movimento no
React, mas preciso da sua coreografia):

**BEAT 1 — a frase VIRA nota (transformação visível):**
- Chega a bolha torta *"500 reais pra Marina, fiz o logo dela"*.
- A IA "lê" (typing 3 bolinhas).
- **O upgrade central:** cada pedaço **VOA da bolha pro campo** da NFS-e — um **clone** de "500 reais"
  desliza até a linha **Valor**, "Marina" até **Cliente**, "fiz o logo dela" até **Serviço**. Em
  **sequência** (não os 3 juntos): valor → cliente → serviço. Cada um **pousa**, o campo **acende** (cor
  do acento + ✓) com um leve **pop** (ease-out, overshoot mínimo). É a diferença entre "aparece
  preenchido" e **"eu VI minha mensagem virar a nota"**. *(Mover só posição/opacidade — translate +
  fade; nada de "piscar".)*
- **Encaixa o recibo** (`TileRecibo`) com um micro-pulse.
- **Clímax = ENTREGA**, não emissão: o beat fecha em *"pronto — enviei pra cliente, você nem precisou
  fazer nada"*.
- As anotações entram **uma a uma** (stagger ~400–600ms), nesta ordem (a última é o payoff):
  *"achou a cliente só pelo nome"* → *"ficou de olho no seu teto de R$ 81 mil"* → *"enviou sozinha"*.
  *(número exato R$ 81 mil, e enquadrado como vigilância — "de olho pra não estourar", nunca como "você
  pode faturar 81 mil".)*

**BEAT 2 — o DAS (a dor nº1, agora no ar):**
- Depois de um respiro, a IA **avisa sozinha** (mensagem proativa) + um card estilo `TileDAS`:
  *"📅 seu DAS deste mês vence dia 20 — R$ 75,90. Tá aqui o Pix."*
- **Honestidade dura:** o produto **LEMBRA e manda o boleto/Pix** — **NÃO paga sozinho**. A copy é
  *"te avisei antes de vencer"*, jamais *"paguei pra você"*.
- Fecha em alívio: anotação *"te lembra antes de vencer — chega de multa"*.

**Respiro e loop:** **segurar o estado final ~3–4s** (a pessoa lê devagar) e **parar no sucesso** —
nada de loop infinito agressivo. O **"rever"** é o controle pra reassistir. Estado de repouso = **sucesso
visível** (recibo + DAS resolvidos), nunca tela em branco.

### 3.3 Estado final / sem-movimento (obrigatório)
Desenhe **explicitamente o quadro parado** que comunica tudo **sem animação** (pra quem pede
`prefers-reduced-motion` ou tem celular/rede fraca): a frase + **a nota já preenchida + recibo emitido
+ o aviso de DAS**, juntos, com as legendas visíveis. O a-ha (frase→campos→nota→DAS) tem que se ler num
print estático — a animação é o brilho, não a muleta.

### 3.4 Responsivo — **o a-ha PRECISA acontecer no mobile** (não é afterthought)
- Mobile ≤767px: 1 coluna (texto em cima, celular embaixo). O celular é o protagonista.
- **Problema a resolver:** no mobile não há espaço lateral pros chips de anotação. Proponha o
  tratamento — recomendo as anotações virarem **uma legenda única abaixo do celular, trocando em
  sequência** (uma por vez, no ritmo dos beats), em vez de 3 chips flutuantes. Os dois beats rodam igual.
- Corpo ≥15px, alvo de toque ≥44px, **sem scroll horizontal**.

### 3.5 O fechamento é **a porta**
- CTA verde único *"emitir minha primeira nota grátis"* (a porta pro WhatsApp). **Um só CTA** no
  herói (Hick's Law) — não bifurcar em "já sou MEI / quero abrir". Sem formulário, sem captura de email.

## 4. Entrega

Um HTML self-contained `@dsCard` em `site/` (ex.: **`site/hero-aha.html`**) com: o **look** (layout +
copy exata + tokens), o **storyboard dos 2 beats** (pode ser CSS animado de verdade e/ou frames
anotados com timing/easing/stagger), o **estado final parado** (3.3) e o **comportamento responsivo**
(mobile × desktop, 3.4). Eu (Claude Code) **puxo fresco** (`DesignSync.get_file`), porto pra **JSX +
inline styles + tokens**, **meço no Playwright** (360/390/430 + desktop) e deploio. A peça que **embarca
é o build do Vite** — seu HTML é a **spec/referência**.

## 5. Decisões do dono (destaque a sua recomendação)

1. **Frase-legenda** (substitui o parágrafo): *"Você manda do seu jeito. A IA emite a nota e cuida do
   seu imposto."* (recomendo) — ou prefere focar só na nota e deixar o DAS 100% pra animação?
2. **Beat 2:** só **DAS** (recomendo — é a maior busca) ou **DAS + medidor do teto** juntos? (cuidado:
   dois elementos no mesmo beat brigam pela atenção; o teto já entra como anotação no Beat 1.)
3. **Linha de preço no fold:** manter *"34 dias grátis · a partir de R$ 39,90/mês"* (recomendo — somos
   ~5× mais baratos que contabilidade tradicional) ou enxugar mais ainda o fold?
4. **Tom do "rever":** discreto como hoje (recomendo) ou mais convidativo ("ver de novo")?

> **Ancoragem de verdade:** emissão, memória de cliente, vigia-teto e envio são **no ar**. O **DAS
> proativo** está no ar (lembrete + boleto/Pix), mas **não paga sozinho** — não prometer pagamento
> automático. O `PRODUTO.md` ainda marca DAS como roadmap; está **desatualizado** e vou corrigir.

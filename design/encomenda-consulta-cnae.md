# Encomenda — Ferramenta **Consulta de atividade (sua atividade pode ser MEI?)**

**Para:** agente do *SimplesMEI Design System* (Claude Design) — domínio **B · Site**
**De:** Produto/SEO — via a ponte (o dono)
**Produto:** SimplesMEI — IA que cuida do fiscal do MEI no WhatsApp. simplesmei.net.

> Peça **nova** (não existe mockup). Eu (Claude Code) faço a **busca + os dados + a rota**; você
> desenha o **look + UX + copy + responsivo** nos tokens. Guardrails de sempre: o SimplesMEI **é
> uma IA** (sem humano, sem "fale com a equipe"); copy ancorada no `PRODUTO.md`. **Pré-lançamento:**
> o produto ainda não abriu — todo CTA ("porta") **cai na lista de espera**, não no WhatsApp.

## 0. O que estou encomendando

O **mockup da ferramenta "Sua atividade pode ser MEI?"** — busca grátis onde a pessoa **digita a
profissão** (ex.: "manicure", "motorista de app", "pedreiro") e descobe na hora **se pode ser MEI**,
qual o **CNAE** e qual o **imposto** (ISS/ICMS). Dupla função:

- **SEO** (o maior alvo do site): `cnae mei` **8.100**/SD 42 · `consulta cnae` **22.200**/SD 50 ·
  `atividades permitidas mei` **4.400**/SD 36 · long-tail "minha atividade pode ser mei".
- **Demo** da inteligência do produto: a IA abre o MEI com o **CNAE certo** → fecha na **lista de
  espera**.

**Por que ferramenta e não só texto:** quem rankeia hoje são **tabelas estáticas** (gov.br,
Contabilizei, qipu, saipos). Nosso diferencial é a **busca interativa** — digitou, achou — que a
tabela não entrega. É o que nos deixa competir vindo de baixo.

## 1. A lógica (eu implemento — é só pra você entender o fluxo)

- **Base:** as **466 ocupações oficiais** do MEI (Anexo XI da Res. CGSN 140/2018), reaproveitadas do
  backend do bot. Cada item tem: `ocupacao`, `cnae`, `tributo` (ISS / ICMS / ISS+ICMS) e `termos`
  (sinônimos coloquiais pra busca — ex.: "manicure" acha "Manicure/pedicure independente").
- **Busca:** instantânea enquanto digita, **sem acento e sem caixa** ("são joão" = "sao joao").
  Quebra o termo em palavras e exige que **todas** apareçam; ranqueia na frente quem tem o nome da
  ocupação **começando** pelo termo. (É a mesma lógica que o bot usa.)
- **Saída por resultado:** nome da ocupação + **CNAE** + **imposto** + selo "✅ Pode ser MEI".
- **Sem resultado:** a atividade **pode não ser permitida** ao MEI → estado próprio (ver abaixo).

## 2. A barra (o que desenhar)

- **Cabeçalho `SecHead`** (eyebrow "Ferramenta grátis" + título tipo *"Sua atividade pode ser
  MEI?"* + uma linha de apoio), fundo `BRAND.paper`. Tokens `BRAND`/`FONTS`, **sem hex inventado**.
- **O campo de busca** é o herói: grande, com foco automático, placeholder com exemplos reais
  (*"ex.: manicure, motorista de app, pedreiro, confeiteira"*). Corpo ≥15px no mobile, alvo ≥44px.
- **Três estados** (preciso dos três desenhados):
  1. **Vazio / inicial:** convite a digitar + alguns **exemplos clicáveis** (chips) das profissões
     mais buscadas, pra a pessoa ver que funciona.
  2. **Com resultados:** lista de cards; anatomia do card = **ocupação** (destaque) · badge **CNAE**
     · imposto (**ISS/ICMS**, discreto) · selo verde **✅ Pode ser MEI**.
  3. **Sem resultado:** mensagem honesta *"Não encontramos essa atividade na lista oficial do MEI —
     ela pode não ser permitida"* + caminho (link pro Portal do Empreendedor) + a porta pra lista.
- **Responsivo:** mobile ≤767px (1 coluna: busca em cima, resultados em lista) × desktop (busca
  centrada, resultados em coluna ou grid leve). Usa `useIsMobile`, não CSS.
- **Fechamento = a porta:** a **Door de sempre** (botão verde estilo WhatsApp). Em pré-lançamento
  ela **cai na lista de espera** — então a copy é *"quero que a IA abra meu MEI com o CNAE certo"* /
  *"me avisa quando abrir"*, sem prometer ação imediata. Sem formulário solto na página.
- **Honestidade:** a lista é a **oficial** (466 ocupações) — estampe **fonte + data** ("Contabilizei
  / Res. CGSN 140/2018 · atualizado em jun/2026"). A ferramenta é **informativa**; quem abre o MEI e
  cuida do fiscal é a **IA**. Não prometer o que o `PRODUTO.md` marca como roadmap.

## 3. Entrega

Um HTML self-contained `@dsCard` em `site/` (ex.: `site/ferramenta-cnae.html`): look + copy exata +
os **três estados** (vazio / com resultados / sem resultado) + comportamento responsivo. Eu puxo
fresco (`DesignSync.get_file`), porto pra **JSX + inline styles + tokens**, ligo os 466 itens reais e
a busca, crio a **rota**, **meço no Playwright** (360/390/430 + desktop) e faço o **schema** certo
(`ItemList` + `FAQPage`). A página pré-renderiza a lista no HTML pra o Google indexar as ocupações.

## 4. Decisões do dono (destaque com sua recomendação)

1. **Rota:** `/ferramentas/consulta-cnae-mei` (recomendo — abre um **hub de ferramentas**, alinhado
   com a Calculadora do teto) ou `/consulta-cnae-mei` na raiz?
2. **Resultado:** mostro **imposto (ISS/ICMS)** no card (recomendo — está no dado e agrega) ou só
   ocupação + CNAE + ✅?
3. **Lista completa:** além da busca, mostro uma seção **navegável** das 466 (por categoria) na mesma
   página? (recomendo — ajuda no SEO e em quem não sabe o termo exato).
4. **Captura:** em pré-lançamento o fechamento é a **lista de espera** (recomendo manter) — confirma?

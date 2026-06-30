# Auditoria de conformidade — Blog SimplesMEI (jun/2026)

Revisão exaustiva da **conformidade factual** dos 21 posts do blog: os processos, valores e regras
descritos estão corretos? Validação restrita a **gov.br, Sebrae e Contabilizei** (a pedido do dono).
Não é revisão de SEO/copy — é checagem de fato.

## Metodologia

1. **Auditoria multi-agente** (workflow `auditoria-conformidade-mei`): cada post passou por
   **verificação → revisão por pares (adversarial) → desempate**, com cada agente restrito às três
   fontes e obrigado a citar a URL. 51 agentes, ~1.400 buscas, **323 claims** avaliados.
2. **Verificação humana dos claims de alto impacto** antes de qualquer edição. Foi decisiva: a
   auditoria produziu **falsos positivos** baseados em uma página de *campanha* do gov.br (ver
   abaixo). Em conteúdo YMYL (fiscal/previdenciário), nada foi alterado sem bater na fonte primária.
3. **Correção segurada**: correções aplicadas, deploy retido para revisão do diff.

## Placar da auditoria

| Veredito | Qtde | O que virou ação |
| --- | --- | --- |
| ✅ Confirmado | 269 | nenhuma (conteúdo correto) |
| ⚠️ Impreciso | 30 | corrigido (exceto 1 falso positivo) |
| ❌ Incorreto | 12 | 9 corrigidos · **3 rejeitados** (falso positivo) |
| ❓ Não-verificável | 12 | nenhuma (features/preços do produto) |

> `nfse-nacional-mei` falhou no estágio automático (erro de API) e foi **verificado à mão**.
> Resultado: **18 posts corrigidos**, 3 mantidos (`obrigacoes-do-mei`, `cancelar-nota-fiscal-mei`,
> `limite-do-mei`).

---

## 1. Falsos positivos rejeitados (a parte mais importante)

A auditoria insistiu em "corrigir" o número de funcionários e o teto. **Rejeitado** — a fonte que os
agentes usaram (`gov.br/memp`, *"Novo Teto do MEI"*) é uma **página de campanha do Ministério do
Empreendedorismo** que apresenta **propostas em tramitação como se já fossem lei**.

| Claim do audit | Veredito real | Evidência (fontes permitidas) |
| --- | --- | --- |
| "MEI pode ter **2 funcionários**" (`obrigacoes` c7/c8/c16) | ❌ Falso. **Continua 1** em 2026 | Contabilizei (atualizado **05/02/2026**): *"O MEI pode ter apenas um empregado, de acordo com a LC 128/08"*. gov.br **Empresas&Negócios** (página operacional): *"pode contratar um empregado"*. A permissão de 2 foi **excluída** do texto aprovado da PLP 60/2025 (out/2025) |
| "Teto sobe **automaticamente** p/ R$110k (2027) e R$140k (2028)" (`obrigacoes` c2) | ❌ Falso como "lei em vigor". **R$81k em 2026** | Contabilizei: os aumentos são **propostas não aprovadas** (PLP 67/2025). A **LC 227/2026** citada pelo agente é a **reforma tributária (Comitê Gestor do IBS)**, não tem nada de MEI |
| "Segundo funcionário não desenquadra; só o terceiro" (`obrigacoes` c8) | ❌ Falso (depende da premissa dos 2). **O 2º funcionário desenquadra** | Decorre do limite vigente de 1 empregado |

**Impacto evitado:** aplicar cego diria ao MEI que pode contratar 2 empregados e que o teto já subiu —
ambos **incorretos hoje**, e o de funcionário poderia levar o leitor a uma irregularidade
(desenquadramento). Por isso `obrigacoes-do-mei` ficou **sem alteração**.

---

## 2. Erros corrigidos (18 posts)

### Previdenciário (INSS)
- **aposentadoria-mei** — salário-maternidade é **sem carência** (decisão do STF / IN PRES/INSS
  188/2025), não "carência curta"; auxílio por incapacidade = **12 meses**; auxílio-reclusão =
  **24 meses**; corrigida a contradição do FAQ ("cada um exige carência" → "a maioria").
- **das-do-mei** — a perda de direitos no atraso é **recuperável**: ao quitar/parcelar as guias, o
  período volta a contar para a Previdência.

### Ciclo de vida / cadastro
- **como-dar-baixa-no-mei** — ao reabrir, o MEI recebe um **CNPJ novo** (gov.br: *"O MEI somente
  poderá abrir outra empresa, ou seja, outro CNPJ"*), não o mesmo. *(Corrige inclusive um erro que
  uma rodada anterior tinha introduzido.)*
- **cartao-cnpj-mei** — CCMEI não é "atualizado automaticamente" (sai atualizado **na emissão** de
  cada via); distinção **suspensa** (pendências fiscais, ex. DAS) × **inapta** (omissão de
  declaração).
- **como-abrir-mei** — emitir nota **não é imediato** após o CNPJ (exige credenciamento no Emissor
  Nacional/prefeitura); adicionada a **conta gov.br prata/ouro** aos documentos necessários.

### Nota fiscal / NFS-e Nacional
- **nfse-nacional-mei**, **nota-fiscal-eletronica-mei**, **nota-fiscal-pelo-whatsapp**,
  **certificado-digital-mei** — o Emissor Nacional **já é obrigatório para o MEI prestador desde
  01/09/2023** (Res. CGSN 169/2022); **01/09/2026** é o marco para **ME e EPP**. Os posts tratavam
  como se a obrigação do MEI fosse futura.
- **como-emitir-nota-fiscal-mei** — a exceção da "nota de entrada" vale para **venda de produto**,
  não para serviço (NFS-e é sempre obrigatória ao vender para PJ).
- **nota-fiscal-pelo-whatsapp**, **nota-fiscal-recorrente-mei** — o cancelamento de NFS-e **varia
  por prefeitura** (no Emissor Nacional, substituição em até 730 dias); "24h" é prazo de **NF-e de
  produto**, não de NFS-e. Removido o "24h" solto que sugeria regra geral.

### Declarações / IRPF
- **declaracao-anual-mei** — prazo de **31/05 é fixo**, sem prorrogação automática quando cai em fim
  de semana; o desconto de 50% da multa é por **entrega espontânea**; IRPF "de março a maio".
- **mei-imposto-de-renda** — IRPF "até o fim de maio" (em 2026 foi 29/05, não 31/05).

### Atividades / enquadramento / custo
- **atividades-permitidas-mei** — "centenas" → **mais de 400 ocupações (~468)**; desenquadrado passa
  à **regra geral do Simples (ME/EPP)**; ICMS (**R$1**) e ISS (**R$5**) são **fixos** no DAS.
- **cnae-do-mei** — o teto de R$81k é condição **da categoria MEI**, não "das atividades permitidas".
- **desenquadramento-do-mei** — MEI deve manter o **Relatório Mensal de Receitas**; a ME tem
  contabilidade no Simples.
- **mei-pode-ter-funcionario** — o **estagiário ocupa a única vaga** (gov.br: *"1 funcionário, que
  pode ser empregado OU estagiário"*) — não dá para ter empregado + estagiário.

### Valores que estavam desatualizados
- **o-que-e-mei** — "15 milhões" → **16 milhões** de MEIs.
- **certificado-digital-mei** — A3 vale **até 5 anos** (não 3); preço do e-CNPJ A1 ≈ **R$150–300/ano**
  (estava subestimado); certificado fora da ICP-Brasil **não tem presunção de validade** perante
  sistemas oficiais (em vez de "não tem validade jurídica").
- **multa mínima da DASN**: padronizado **R$ 50** (estava "cerca de R$ 50") em vários posts.

---

## 3. Não-verificáveis — sem ação (corretamente)

São claims que **não** se checam em fonte gov porque descrevem o **produto SimplesMEI** ou detalhes
de interface, não regra fiscal:

- Features da IA (avisos de teto em 60/80/96/100%, cancelamento por conversa, recorrência).
- Preços **R$ 39,90/mês (anual)** e **R$ 49,90/mês (mensal)** — conferidos e **batem** com a fonte
  travada `src/preco_cta.jsx`.
- Detalhe de UI (CEP autocompleta no portal).
- Um claim-fantasma do verificador ("salário-maternidade 120 dias") que **não existe** em
  `aposentadoria-mei` — nada a fazer.

---

## 4. Posts sem alteração

- **obrigacoes-do-mei** — os 4 "erros" apontados eram os **falsos positivos** da seção 1.
- **cancelar-nota-fiscal-mei** — o tratamento do prazo (varia por prefeitura) **já estava correto**;
  o "24h" remanescente é a feature de produto, escopada "dentro das regras da sua cidade".
- **limite-do-mei** — só teve não-verificáveis (features do produto). Teto R$81k confirmado para 2026.

---

## Lição operacional

`gov.br/memp` ("Novo Teto do MEI" / "Teto do MEI") é **página de advocacy** que descreve as PLPs como
se fossem lei. Para datas e números de lei do MEI, valem a **LC 123/2006**, as **Resoluções do CGSN**
e as páginas **operacionais** do gov.br (Empresas&Negócios/Portal do Empreendedor), cruzadas com
Contabilizei/Sebrae. Em 2026: **teto R$ 81.000**, **1 empregado**.

*Validação: `validar-posts.cjs` → 21 posts · 0 erros · 0 avisos.*

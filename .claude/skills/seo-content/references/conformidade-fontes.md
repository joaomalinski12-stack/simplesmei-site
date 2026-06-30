# Conformidade factual — validação contra fontes oficiais

Conteúdo do MEI é **YMYL** (fiscal/previdenciário): um processo, valor ou regra errado tem custo
real para o leitor. Esta passada checa se **o que o post afirma está correto** — separada da revisão
de honestidade (vs `PRODUTO.md`) e da de SEO. Rode em **todo post novo** (por claim) e num **ciclo de
auditoria** periódico do blog inteiro. Histórico do 1º ciclo: `docs/auditoria-conformidade.md`.

## Fontes permitidas (whitelist) — e só estas

| Fonte | Boa para | Observação |
|---|---|---|
| **gov.br** (Receita/e-CAC, Simples Nacional, Portal do Empreendedor, Meu INSS) | a lei e o processo oficial | use as páginas **operacionais**, não as de campanha (ver armadilha) |
| **Sebrae** | explicação aplicada, procedimentos, prazos | bom 2º par pra confirmar gov.br |
| **Contabilizei** | o que está **de fato aprovado/vigente**, valores de mercado (ex.: certificado) | costuma datar a atualização — útil pra "é lei ou é proposta?" |
| **IBGE** | **classificação CNAE** (CONCLA/IBGE), estatísticas econômicas e demográficas oficiais | fonte canônica do CNAE e de números de demografia das empresas |

Fora dessas quatro, **não** valide. Se um fato não se confirma em nenhuma delas → veredito
`não-verificável` (não invente, não recorra a outra fonte). **Sempre cite a URL exata** que sustenta
o claim.

## O que se checa (e o que não)

- **Checa:** processos (passo a passo), **valores** (R$, %, prazos, códigos — ex.: GPS 1910),
  **regras** (quem pode, obrigatoriedade, condições, datas de vigência) e **as respostas do FAQ**.
- **Não checa (fora de escopo):** features e **preços do SimplesMEI** (não são fato gov — governados
  por `PRODUTO.md` e `src/preco_cta.jsx`) e detalhes de UI. Esses caem na revisão de honestidade.

## Escala de veredito

- **confirmado** — correto e suportado pela fonte. Um **hedge correto** ("os números mudam, confirme
  no gov.br") conta como confirmado.
- **impreciso** — parcialmente certo, mas desatualizado, ambíguo ou simplificado a ponto de enganar
  (valor de ano anterior, regra incompleta). → **corrigir**.
- **incorreto** — contradiz a fonte oficial, **inclusive contradição interna** (a mesma regra dita de
  dois jeitos no post). → **corrigir**.
- **não-verificável** — sem suporte nas fontes permitidas. → em geral hedgear ou remover o número
  cravado; se for feature/preço do produto, é esperado (sem ação).

## O ritual

1. **Extraia os claims** verificáveis do post (corpo + FAQ).
2. **Verifique** cada um nas fontes permitidas, com `WebSearch`/`WebFetch` (`site:gov.br OR
   site:sebrae.com.br OR site:contabilizei.com.br OR site:ibge.gov.br`). Anote URL + veredito.
3. **Revisão por pares (adversarial)** nos claims que importam: um segundo olhar **cético** tenta
   refutar — inclusive os "confirmado". Divergência → **desempate** com uma 3ª checagem.
4. **Verificação humana dos claims de alto impacto ANTES de editar.** Tudo que for transversal
   (número de funcionários, teto, datas de vigência, "é lei?") confirme você mesmo na fonte primária.
   Não aplique correção de agente em massa sem isso.
5. **Aplique** as correções (incorreto/impreciso); **rejeite** falsos positivos com a evidência
   anotada; rode o validador + build.

> Auditoria do blog inteiro escala bem como **workflow multi-agente** (verificar→pares→desempate, 1
> agente por post). Mas o **veredito final dos claims de alto impacto é humano** — ver armadilha.

## ⚠️ Armadilha: página de campanha ≠ lei

`gov.br/memp` ("Novo Teto do MEI" / "Teto do MEI") é **advocacy do Ministério do Empreendedorismo**:
apresenta **PLPs em tramitação como se já valessem**. Confiar nela gera erro YMYL. No 1º ciclo, os
agentes "corrigiram" para *2 funcionários* e *teto R$110k/140k* citando essa página — **falso**.

Regras pra não cair:
- **Proposta ≠ lei.** Para datas/números de lei do MEI, valem **LC 123/2006**, **Resoluções do CGSN**
  e as páginas **operacionais** do gov.br (Empresas&Negócios/Portal do Empreendedor), cruzadas com
  Contabilizei/Sebrae. Contabilizei costuma dizer explicitamente "ainda é proposta".
- **Conflito entre páginas gov.br** (campanha diz X, operacional diz Y) → vale a **operacional**; se
  uma 2ª fonte permitida confirma a operacional, fecha.
- **Não confunda leis homônimas:** a **LC 227/2026** é a **reforma tributária (Comitê Gestor do IBS)**
  — não tem nada de MEI.

**Fatos travados em 2026** (confirmados): **teto R$ 81.000/ano**, **1 empregado**, **Emissor Nacional
obrigatório p/ MEI prestador desde 01/09/2023** (ME/EPP em 01/09/2026), **reabrir gera CNPJ novo**,
**salário-maternidade sem carência** (STF/IN 188/2025). Memória: `mei-fatos-conformidade-2026`.

# SimplesMEI — O que o produto faz

> **Espelho do produto pro trabalho do site/SEO.** O bot/produto real mora em repo SEPARADO
> (`simples-mei`, backend Python) que **não é acessível a partir deste repo**. Este documento é
> um resumo fiel, mantido à mão, do que o produto faz — pra a copy e o SEO da landing ficarem
> ancorados na verdade. **Snapshot: 2026-06-28.** Quando o produto mudar, este doc precisa ser
> reespelhado (quem faz a ponte entre os dois repos atualiza aqui).
>
> ⚠️ **Marca:** no site é sempre **SimplesMEI** (domínio simplesmei.net). "ZapMEI" é o nome
> legado da 1ª versão — **não usar** em copy nova.

---

## Em uma frase

**SimplesMEI é uma IA que cuida do fiscal do MEI dentro do WhatsApp** — emite NFS-e, controla
recorrência, vigia o teto anual e lembra do DAS. Sem dashboard, sem app, sem login: o MEI
conversa por WhatsApp e a IA resolve.

**Público:** MEI prestador de serviço (consultoria, design, marketing, audiovisual, etc.).
**Modelo:** freemium — abertura de MEI e dúvidas fiscais grátis; emissão automática no plano pago.
**Preço:** anual **R$ 39,90/mês** · mensal **R$ 49,90/mês** (fonte de verdade: `src/preco_cta.jsx`).

---

## O que ela faz (os pilares)

### 1. Abre o MEI (grátis · aquisição)
Copiloto conversacional conduz a abertura: coleta dados (CEP, atividade), **sugere o CNAE por
IA**, valida elegibilidade e leva até o cadastro no Portal do Empreendedor. Combate golpe e tira
dúvidas no caminho.

### 2. Tira dúvidas fiscais (grátis · RAG)
Assistente que responde perguntas tipo *"preciso declarar IRPF como MEI?"* a partir de uma base
de conhecimento (gov.br, Sebrae, prefeituras).

### 3. Emite NFS-e sob demanda (pago) ⭐
Conversa natural → nota emitida. Ex.: *"emitir 4 mil pra Hook Marketing, consultoria em
marketing digital"* → a IA identifica o cliente, classifica o serviço, projeta o impacto no
teto, emite a NFS-e e devolve **número + PDF**. Tempo médio < 30 s.
Também emite nota pra MEI de **comércio** (confirmado pelo dono em 2026-07-12 — a copy pode
citar emissão pra quem vende produto, não só serviço).

### 4. Recorrência automática (pago) ⭐ — o diferencial
Configura uma vez e esquece: a nota fixa do mesmo cliente sai sozinha todo mês, no dia certo.
**Nenhum concorrente faz isso no segmento MEI.** A IA ainda *descobre* padrões (3+ emissões
iguais) e sugere virar recorrência.

### 5. Vigia o teto MEI (pago)
Soma o faturamento do ano e **alerta antes de estourar** o limite (R$ 81k): avisos em
60/80/96/100%. Se uma emissão projeta passar de ~98% do teto, ela **segura e avisa** (com opção
de emitir mesmo assim).

### 6. Clientes e categorias na memória (pago)
Guarda CNPJ, valor e serviço de cada cliente; **aprende as categorias** do MEI ao longo do tempo
(categorização adaptativa por IA, com dedup pra não explodir variantes). Diz o nome, a nota sai
certa.

### 7. Histórico e cancelamento (pago)
Lista as notas com filtros (período, status, cliente, categoria), mostra detalhe + PDF, e
cancela dentro da janela de 24h direto pela conversa.

### 8. Lembrete do DAS + resumo do mês
DAS: lembrete proativo antes de vencer, com o boleto/Pix. Resumo: faturamento, notas, DAS e
recorrências quando o MEI pedir.

---

## ⚠️ Honestidade pra copy e SEO (status real)

A landing já vende a visão completa. Pra **não prometer o que ainda não roda**, este é o estado:

| Recurso | Estado real (backend) |
|---|---|
| Abertura de MEI (copiloto) | ✅ no ar |
| Dúvidas fiscais (RAG) | ✅ no ar |
| Emissão de NFS-e sob demanda | ✅ funcional (dependente do provedor por prefeitura) |
| Recorrência automática | 🟢 implementado; **cron noturno real ainda não** (roda por gatilho) |
| Alertas de teto MEI | ✅ no ar |
| Clientes + categorias adaptativas | ✅ no ar |
| Histórico + cancelamento | ✅ no ar |
| **Lembrete do DAS proativo** | 🟡 **roadmap** (Pilar 5) — a landing já anuncia; cuidado ao prometer prazo |
| Resumo do mês | 🟡 parcial (existe como rotina; não é push automático garantido) |

**Regra de ouro (vale pra copy também):** SimplesMEI **é uma IA**. Não existe "fale com a
equipe", "atendente", "contador parceiro" nem nome de pessoa. A saída é sempre: a IA resolve,
vira lead, ou aponta o canal oficial. Nada de inventar atendimento humano.

---

## Como funciona (o mecanismo)

Tudo é uma **"porta"**: cada CTA/card da landing abre o WhatsApp com a mensagem já digitada
(deep link). Não há formulário nem "saiba mais" — o MEI toca e cai direto na conversa com a IA.

No backend, a conversa passa por 3 camadas de IA (onboarding guiado, agente livre pra ações,
e busca fiscal), emite via provedor de NFS-e com certificado do MEI, e persiste tudo. Detalhe
técnico não importa pra copy — o que importa: **é conversa, é rápido, e é a IA fazendo o trabalho
do contador sem a conta do contador.**

---

## Para onde vai (roadmap, pra SEO entender a direção)

- **Hoje:** emissão via certificado A1 do MEI + provedor de NFS-e.
- **Próximo:** migração pra **procuração eletrônica no e-CAC + Emissor Nacional NFS-e**
  (gov.br/nfse) — grátis pro MEI, destrava também DAS-MEI e correlatos. Base: a NFS-e Nacional
  vira obrigatória pro Simples a partir de 01/09/2026.

Isso amplia muito o público alcançável — bom ângulo pra conteúdo/SEO ("NFS-e nacional MEI",
"emissor nacional", "DAS MEI", "como emitir nota como MEI no WhatsApp").

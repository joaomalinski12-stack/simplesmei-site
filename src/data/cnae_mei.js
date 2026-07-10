/* Dados da ferramenta "Consulta CNAE MEI" (/ferramentas/consulta-cnae-mei).

   As 466 ocupações vêm de src/data/cnae_occupations.js — GERADO por
   scripts/build_cnae.mjs a partir do cnae_mei.json do backend do bot (fonte de
   verdade: Anexo XI Res. CGSN 140/2018 + termos coloquiais da ZapMEI). Re-rode o
   script quando o bot atualizar a lista.

   Aqui ficam só a config editável à mão (categorias, chips, FAQ) e a busca. */
import { OCCUPATIONS } from './cnae_occupations.js';
export { OCCUPATIONS };

/* categorias (ordem + descritor curto). O índice bate com `cat` em cada ocupação. */
export const CATS = [
  ['Beleza & bem-estar',      'cabelo, unha, estética, tattoo'],
  ['Alimentação & bebidas',   'bolo, salgado, marmita, lanchonete'],
  ['Comércio & vendas',       'loja, revenda, mercadinho, peças'],
  ['Construção & reforma',    'obra, elétrica, hidráulica, pintura'],
  ['Transporte & entrega',    'moto, frete, mudança, táxi'],
  ['Reparos & serviços',      'conserto, limpeza, informática, celular'],
  ['Criativo & mídia',        'foto, vídeo, música, edição'],
  ['Educação & eventos',      'aula, curso, festa, recreação'],
  ['Fabricação & artesanato', 'fábrica, costura, artesanato'],
  ['Outros serviços',         'agro, locação, pet, cuidados, turismo'],
];

/* chips das mais buscadas (todas conferidas contra o dataset real) */
export const HOT = ['manicure', 'cabeleireiro', 'pedreiro', 'diarista', 'costureira', 'motoboy', 'eletricista', 'fotógrafo'];

/* "CNAE das atividades mais buscadas" — semeado pela pesquisa de keyword (jul/2026:
   cnae lanchonete 880, cnae salão de beleza 480/SD6, cnae pizzaria 480, cnae pedreiro
   480, cnae fotógrafo 390, cnae loja de roupas 390…). São atalhos de negócio/ofício:
   a pessoa que vai abrir busca "cnae [X]". O chip cai na busca (semântica resolve). */
export const POPULAR = [
  'salão de beleza', 'lanchonete', 'loja de roupas', 'pizzaria', 'pedreiro',
  'fotógrafo', 'cabeleireiro', 'eletricista', 'confeitaria', 'manicure',
  'artesanato', 'motoboy', 'mecânico', 'barbeiro', 'costureira', 'diarista',
];

/* exemplos de atividade NÃO permitida (regulamentadas/intelectuais) — só pro texto de ajuda */
export const NOT_MEI = ['advogado', 'médico', 'dentista', 'psicólogo', 'arquiteto', 'contador', 'engenheiro'];

/* FAQ — texto ÚNICO, importado pela página E pelo prerender.js (JSON-LD FAQPage).
   Mantê-los no mesmo lugar garante que o schema bate 1:1 com o que aparece na tela. */
export const FAQ_ITEMS = [
  { q: 'O que é o CNAE do MEI?', a: 'CNAE é o código que diz qual é a sua atividade para os órgãos públicos. No MEI, ele define qual nota você emite e qual imposto paga: ISS de serviço ou ICMS de comércio. A ferramenta acha o CNAE certo a partir da sua profissão.' },
  { q: 'Quais profissões não podem ser MEI?', a: 'Profissões regulamentadas ou intelectuais ficam de fora, como advogado, médico, dentista, psicólogo, arquiteto, contador e engenheiro. Se a sua não aparece na busca, provavelmente não é permitida ao MEI hoje.' },
  { q: 'ISS ou ICMS: qual imposto eu pago?', a: 'Depende da atividade. Serviço paga ISS; comércio e indústria pagam ICMS. Quem vende e presta serviço pode pagar os dois. No resultado da busca mostramos qual se aplica ao seu CNAE.' },
  { q: 'A consulta é grátis e precisa de cadastro?', a: 'É grátis e sem cadastro. Você digita a profissão e vê na hora se pode ser MEI, o CNAE e o imposto. Nada de e-mail nem login.' },
  { q: 'De onde vem essa lista de ocupações?', a: 'Da lista oficial do MEI: as 466 ocupações do Anexo XI da Resolução CGSN nº 140/2018. É a mesma base que vale para a abertura do CNPJ no Portal do Empreendedor.' },
  { q: 'Como sei qual é o meu CNAE MEI?', a: 'Digite sua profissão ou o que você faz na busca aqui em cima — a ferramenta acha o CNAE certo na hora, mesmo que você escreva do seu jeito. Se você já é MEI, o seu CNAE também aparece no Certificado da Condição de MEI (CCMEI), no Portal do Empreendedor.' },
  { q: 'O MEI pode ter mais de uma atividade (CNAE)?', a: 'Pode. O MEI tem uma atividade principal e pode incluir até 15 atividades secundárias — até 16 ocupações no total — desde que todas estejam na lista permitida ao MEI. Todas ficam no mesmo CNPJ.' },
  { q: 'Como adicionar ou alterar a atividade do MEI?', a: 'Pela Atualização Cadastral no Portal do Empreendedor (gov.br), de graça. Você pode trocar a atividade principal ou incluir e remover as secundárias, desde que continuem sendo atividades permitidas ao MEI.' },
  { q: 'Minha profissão não pode ser MEI. E agora?', a: 'Profissão regulamentada (com conselho de classe) ou vedada por natureza não entra no MEI, mas costuma caber em outro regime — em geral uma Microempresa (ME) no Simples Nacional. Vale confirmar com um contador o CNAE e o enquadramento certos.' },
];

/* ── busca: sem acento/caixa; exige todas as palavras; casa início de token;
   ranqueia quem começa pelo termo (mesma lógica do bot). `termos` é string. ── */
export const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
const tokenize = (s) => norm(s).split(/[^a-z0-9]+/).filter(Boolean);

export function buscar(q) {
  const nq = norm(q);
  if (!nq) return [];
  const words = nq.split(/\s+/).filter(Boolean);
  const out = [];
  for (const it of OCCUPATIONS) {
    const toks = tokenize(it.oc + ' ' + it.termos);
    if (words.every(w => toks.some(t => t.startsWith(w)))) {
      const noc = norm(it.oc);
      const rank = noc.startsWith(nq) ? 0 : (tokenize(it.oc).some(t => t.startsWith(words[0])) ? 1 : 2);
      out.push({ it, rank });
    }
  }
  out.sort((a, b) => a.rank - b.rank || a.it.oc.localeCompare(b.it.oc, 'pt'));
  return out.map(o => o.it);
}

/* primeiro nome "limpo" da ocupação (tira "(a) independente" pra copy da porta) */
export function ocCurto(oc) {
  return oc.replace(/\(.\)/g, '').replace(/\s+independente/i, '').replace(/\s+/g, ' ').trim();
}

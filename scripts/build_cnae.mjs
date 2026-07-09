/* Transforma o cnae_mei.json (backend do bot, fonte de verdade — Anexo XI Res. CGSN
   140/2018) no dataset da ferramenta /ferramentas/consulta-cnae-mei.

   Uso:  node scripts/build_cnae.mjs [caminho-do-cnae_mei.json]
   Default lê de ../zapmei/bot/data/cnae_mei.json (repo do produto, ponte humana).
   Escreve src/data/cnae_occupations.js com { oc, cnae, trib, cat, termos }.

   Re-execute quando o bot atualizar a lista (o arquivo é "hot-swappable"). */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = process.argv[2] || resolve(__dirname, '../../zapmei/bot/data/cnae_mei.json');
const OUT = resolve(__dirname, '../src/data/cnae_occupations.js');

const raw = JSON.parse(readFileSync(SRC, 'utf8'));
const ocupacoes = raw.ocupacoes || raw;

/* trib: normaliza. 'ISS+ICMS' → 'ISS/ICMS'. Vazio → ISS (a maioria é locação/serviço);
   exceção: bar/restaurante (56) sem tributo → ICMS. */
function trib(t, cnae) {
  if (t === 'ISS+ICMS') return 'ISS/ICMS';
  if (t === 'ISS' || t === 'ICMS') return t;
  return cnae.startsWith('56') ? 'ICMS' : 'ISS';
}

/* categoria (índice em CATS). Heurística por CNAE + palavra-chave. Imperfeita de
   propósito (a busca é a UX principal); refina depois se preciso.
   0 Beleza · 1 Alimentação · 2 Comércio · 3 Construção · 4 Transporte · 5 Reparos &
   serviços · 6 Criativo · 7 Educação & eventos · 8 Fabricação & artesanato · 9 Outros */
function catOf(oc, cnae) {
  const s = (oc + ' ' + cnae).toLowerCase();
  const c4 = cnae.slice(0, 4);
  const div = cnae.slice(0, 2);
  const first = s.split(' ')[0];

  if (/tatua|piercing/.test(s)) return 0;
  if (/artes[aã]o|artesanato|artes[aã] /.test(s)) return 8;
  if (/serralhei/.test(s)) return 3;
  if (c4 === '9602') return 0;                                  // beleza
  if (div === '56') return 1;                                   // restaurante/lanchonete/marmita/ambulante
  if (/^(padeiro|confeiteiro|doceiro|salgadeiro|sorveteiro|churrasqueiro|pizzaiolo|pipoqueiro|marmiteiro|cozinheiro|chocolateiro|bolacheiro|queijeiro|farinheiro|moendeiro|vinagreiro|salsicheiro)/.test(first)) return 1;
  if (['1013','1031','1032','1033','1052','1053','1061','1063','1064','1065','1069','1071','1091','1092','1093','1094','1095','1096','1099','1122'].includes(c4)) return 1;
  if (div === '47' || /^(comerciante|merceeiro|barraqueiro|verdureiro|livreiro|jornaleiro|papeleiro|antiqu|baleiro|a[çc]ougueiro|peixeiro)/.test(first)) return 2;
  if (['4321','4322','4329','4330','4399','2512'].includes(c4) || /marceneiro|carpinteiro|vidraceiro de|instalador\(a\) de rede/.test(s)) return 3;
  if (['4520','4543'].includes(c4)) return 5;                   // oficina/mecânico/borracheiro
  if (['4530','4541'].includes(c4)) return 2;                   // comércio de peças
  if (div === '49' || div === '50' || div === '51' || div === '52' || c4 === '5310' || c4 === '5320') return 4;
  if (['9511','9512','9521','9529','9601'].includes(c4)) return 5;
  if (div === '33' || ['2539','2543','2599','2740','2950'].includes(c4)) return 5;
  if (['8121','8129','8130'].includes(c4)) return 5;            // limpeza/jardim/piscina
  if (c4 === '7420') return 6;                                  // fotógrafo
  if (div === '58' || div === '59' || ['9001','9002'].includes(c4)) return 6;
  if (['8592','8593','8599','8230','9329'].includes(c4)) return 7;
  if (/^(fabricante|tecel|costureiro|alfaiate|bordadeira|crocheteiro|tricoteiro|boneleiro|chapeleiro|estampador|customizador|redeiro|rendeiro|tapeceiro|colchoeiro|seleiro|curtidor|lapidador|oleiro|britador|soldador|torneiro|galvanizador|ferramenteiro|ferreiro|armador|moveleiro|marceneiro|cunhador|vassoureiro|clicherista|serigrafista|encadernador)/.test(first)) return 8;
  if (['13','14','15','16','17','22','23','24','25','31','32'].includes(div)) return 8;
  return 9;                                                     // agro, locação, hospedagem, turismo, pet, cuidados, editor, telecom, reciclagem…
}

const out = ocupacoes.map(o => ({
  oc: o.ocupacao,
  cnae: o.cnae,
  trib: trib(o.tributo, o.cnae),
  cat: catOf(o.ocupacao, o.cnae),
  termos: (o.termos || '').trim(),
}));

const header = `/* GERADO por scripts/build_cnae.mjs — NÃO editar à mão.
   Fonte: ${raw._meta?.fonte || 'cnae_mei.json (backend do bot)'}
   Atualizado em: ${raw._meta?.atualizado_em || '?'} · ${out.length} ocupações.
   Forma: { oc, cnae, trib, cat, termos }. cat = índice em CATS (src/data/cnae_mei.js). */
export const OCCUPATIONS = ${JSON.stringify(out, null, 0).replace(/},{/g, '},\n{')};
`;
writeFileSync(OUT, header);

// relatório
const dist = {};
out.forEach(o => { dist[o.cat] = (dist[o.cat] || 0) + 1; });
console.log(`✅ ${out.length} ocupações → ${OUT.replace(process.cwd() + '/', '')}`);
console.log('distribuição por categoria:', dist);
const semTrib = out.filter(o => !o.trib).length;
console.log(`trib vazio: ${semTrib}`);

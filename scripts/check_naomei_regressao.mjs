/* Bateria de regressão da Consulta CNAE.

   Roda o MESMO código de produção: `decidir()` de api/_busca_core.js (o servidor) e
   `escolherModo()` de src/data/cnae_decisao.js (o front). Nada é reimplementado aqui —
   uma bateria que testa uma cópia da lógica não testa nada.

   Cobre três coisas:
     1. FALSO-BLOQUEIO (o pior erro): as 466 ocupações permitidas, geradas direto de
        cnae_occupations.js. Nenhuma pode ser acusada de "não pode ser MEI".
     2. Os casos versionados em _naomei_casos.json (bloquear / permitir / incerto).
     3. A calibração: imprime a separação que sustenta os limiares de _busca_core.js.

   Uso (precisa da chave, igual ao build de embeddings):
       export GEMINI_API_KEY=...
       node scripts/check_naomei_regressao.mjs
       node scripts/check_naomei_regressao.mjs --calibrar   # + tabela de separação

   Os embeddings das queries ficam em cache (scripts/.cache-embeddings.json, ignorado
   pelo git), então a 2ª rodada é instantânea e de graça. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import INDEX from '../api/_cnae_index.js';
import NAOMEI from '../api/_naomei_index.js';
import { decidir, MATCH, DESTAQUE_MIN, NAOMEI_MATCH, NAOMEI_MARGIN } from '../api/_busca_core.js';
import { OCCUPATIONS, buscar, ocCurto } from '../src/data/cnae_mei.js';
import { montarListas, detectNaoMeiEm, escolherModo } from '../src/data/cnae_decisao.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MODEL = 'gemini-embedding-001';
const CACHE = path.join(ROOT, 'scripts/.cache-embeddings.json');
const KEY = process.env.GEMINI_API_KEY;

if (!KEY) {
  console.error('❌ falta GEMINI_API_KEY no ambiente (a mesma do build de embeddings).');
  process.exit(2);
}

const LISTAS = montarListas(JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/naomei.json'), 'utf8')));
const CASOS = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/_naomei_casos.json'), 'utf8')).casos;

/* ── índice + embeddings ─────────────────────────────────────────────────── */
const decode = (idx) => {
  const b = Buffer.from(idx.vectors_b64, 'base64');
  return new Float32Array(b.buffer, b.byteOffset, idx.count * idx.dim);
};
const IDX = { ...INDEX, flat: decode(INDEX), nao: { ...NAOMEI, flat: decode(NAOMEI) } };

const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
let novos = 0;

async function embed(q, tentativas = 4) {
  if (cache[q]) return cache[q];
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:embedContent?key=${KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: `models/${MODEL}`, content: { parts: [{ text: q }] },
      taskType: 'RETRIEVAL_QUERY', outputDimensionality: 768,
    }),
  });
  if (!r.ok) {
    if (tentativas > 1 && (r.status === 429 || r.status >= 500)) {
      await new Promise((s) => setTimeout(s, 800 * (5 - tentativas)));
      return embed(q, tentativas - 1);
    }
    throw new Error(`gemini ${r.status}`);
  }
  const v = (await r.json())?.embedding?.values;
  let n = 0; for (const x of v) n += x * x;
  n = Math.sqrt(n) || 1;
  cache[q] = v.map((x) => x / n);
  novos++;
  return cache[q];
}

async function aquecer(qs, conc = 6) {
  const todo = [...new Set(qs)].filter((q) => !cache[q]);
  if (!todo.length) return;
  process.stderr.write(`  embedando ${todo.length} query(s) nova(s)…\n`);
  let i = 0;
  await Promise.all(Array.from({ length: conc }, async () => {
    while (i < todo.length) {
      const q = todo[i++];
      try { await embed(q); } catch (e) { console.error(`  ⚠️  ${q}: ${e.message}`); }
    }
  }));
  fs.writeFileSync(CACHE, JSON.stringify(cache));
}

/* ── veredito completo: servidor + front, como o usuário vê ──────────────── */
async function veredito(q) {
  const v = cache[q] ? new Float32Array(cache[q]) : new Float32Array(await embed(q));
  const srv = decidir(v, IDX);
  const lexical = buscar(q);
  const nao = detectNaoMeiEm(LISTAS, q);
  const d = escolherModo({
    query: q,
    lexicalCount: lexical.length,
    temHits: lexical.length + srv.results.length > 0,
    nao,
    sem: { estado: 'done', confident: srv.confident, hits: srv.results, naomei: srv.naomei, naoTop: srv.naoTop },
  });
  return { q, ...d, srv };
}

/* ── execução ────────────────────────────────────────────────────────────── */
const AS466 = [...new Set(OCCUPATIONS.map((o) => ocCurto(o.oc).toLowerCase()))];
await aquecer([...AS466, ...CASOS.map((c) => c.q)]);

// Paráfrases são o teto móvel da camada semântica: descrever a atividade sem nomeá-la
// é genuinamente ambíguo em alguns casos ("levo passageiros de van entre estados" mora
// ao lado de "Transportador escolar"). Falhar aqui é sinal de alerta, não regressão —
// por isso entram por taxa mínima, e não uma a uma.
const TOLERANCIA_PARAFRASE = 0.80;

let erros = 0;
const falhas = { falsoBloqueio: [], bloqueioPerdido: [], chuteConfiante: [], outros: [] };
const conhecidos = [];

for (const q of AS466) {
  const r = await veredito(q);
  if (r.modo === 'naomei') falhas.falsoBloqueio.push(r);
}

const parafrases = [], simples = [];
for (const c of CASOS) (c.parafrase ? parafrases : simples).push(c);

for (const c of simples) {
  const r = await veredito(c.q);
  const ok = c.esperado === 'naomei' ? r.modo === 'naomei'
    : c.esperado === 'permitida' ? r.modo === 'results'
    : r.modo === 'incerto' || r.modo === 'none';
  if (ok) continue;
  // limitação já medida e aceita: avisa, mas não reprova (ver `conhecido` em _naomei_casos.json)
  if (c.conhecido) { conhecidos.push({ ...r, nota: c.nota }); continue; }
  if (c.esperado === 'permitida' && r.modo === 'naomei') falhas.falsoBloqueio.push(r);
  else if (c.esperado === 'naomei') falhas.bloqueioPerdido.push(r);
  else if (c.esperado === 'incerto' && r.modo === 'results') falhas.chuteConfiante.push(r);
  else falhas.outros.push({ ...r, esperado: c.esperado });
}

let pegas = 0;
for (const c of parafrases) { if ((await veredito(c.q)).modo === 'naomei') pegas++; }
const taxa = pegas / parafrases.length;

/* ── relatório ───────────────────────────────────────────────────────────── */
const linha = (r) => `     "${r.q}" → ${r.modo}${r.naoVerdict ? ` [${r.naoVerdict.label}]` : ''}` +
  `  (topo ${r.srv.results[0]?.score ?? '—'} ${(r.srv.results[0]?.oc ?? '').slice(0, 30)} · destaque ${r.srv.destaque} · âncora ${r.srv.naoTop?.score})`;

console.log(`\n═══ REGRESSÃO — Consulta CNAE ═══`);
console.log(`limiares: match ${MATCH} · destaque ${DESTAQUE_MIN} · não-MEI ${NAOMEI_MATCH} margem ${NAOMEI_MARGIN}`);
if (novos) console.log(`(${novos} embedding(s) novo(s); cache em scripts/.cache-embeddings.json)`);

console.log(`\n❶ falso-bloqueio — o pior erro (${AS466.length} ocupações + ${simples.filter(c=>c.esperado==='permitida').length} coloquiais)`);
if (falhas.falsoBloqueio.length) { erros += falhas.falsoBloqueio.length; falhas.falsoBloqueio.forEach((r) => console.log(linha(r))); }
console.log(`   ${falhas.falsoBloqueio.length === 0 ? '✅ nenhum' : `❌ ${falhas.falsoBloqueio.length}`}`);

console.log(`\n❷ não-MEI que escapou (${simples.filter(c=>c.esperado==='naomei').length} casos diretos)`);
if (falhas.bloqueioPerdido.length) { erros += falhas.bloqueioPerdido.length; falhas.bloqueioPerdido.forEach((r) => console.log(linha(r))); }
console.log(`   ${falhas.bloqueioPerdido.length === 0 ? '✅ nenhum' : `❌ ${falhas.bloqueioPerdido.length}`}`);

console.log(`\n❸ chute confiante — atividade fora das 466 respondida com certeza (${parafrases.length ? CASOS.filter(c=>c.esperado==='incerto').length : 0} casos)`);
if (falhas.chuteConfiante.length) { erros += falhas.chuteConfiante.length; falhas.chuteConfiante.forEach((r) => console.log(linha(r))); }
console.log(`   ${falhas.chuteConfiante.length === 0 ? '✅ nenhum' : `❌ ${falhas.chuteConfiante.length}`}`);

console.log(`\n❹ paráfrases (piso ${(TOLERANCIA_PARAFRASE * 100).toFixed(0)}%)`);
console.log(`   ${taxa >= TOLERANCIA_PARAFRASE ? '✅' : '❌'} ${pegas}/${parafrases.length} (${(taxa * 100).toFixed(0)}%)`);
if (taxa < TOLERANCIA_PARAFRASE) erros++;

if (conhecidos.length) {
  console.log(`\n⚠️  limitações conhecidas (não reprovam, mas não somem)`);
  conhecidos.forEach((r) => { console.log(linha(r)); console.log(`        ${r.nota}`); });
}

if (falhas.outros.length) {
  erros += falhas.outros.length;
  console.log(`\n❺ outros desvios`);
  falhas.outros.forEach((r) => console.log(`${linha(r)}  (esperado ${r.esperado})`));
}

if (process.argv.includes('--calibrar')) {
  const sep = async (q) => { const r = await veredito(q); return r.srv.naoTop.score - r.srv.bestMei; };
  const ds = []; for (const q of AS466) ds.push(await sep(q));
  ds.sort((a, b) => b - a);
  console.log(`\n── calibração ──`);
  console.log(`   separação (âncora − melhor permitida) nas 466: pior ${ds[0].toFixed(3)} (${AS466[0] ? '' : ''}), mediana ${ds[Math.floor(ds.length / 2)].toFixed(3)}`);
  console.log(`   NAOMEI_MARGIN=${NAOMEI_MARGIN} precisa ficar acima do pior caso, com folga.`);
}

console.log(`\n${erros === 0 ? '✅ tudo verde' : `❌ ${erros} problema(s)`}\n`);
process.exit(erros ? 1 : 0);

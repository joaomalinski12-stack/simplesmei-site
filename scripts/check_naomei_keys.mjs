/* Guarda contra FALSO-BLOQUEIO — o pior erro da consulta CNAE.
   Toda key de naomei.json casa por SUBSTRING. Se uma key for substring de uma das
   466 ocupações permitidas, quem digitar aquela ocupação é acusado de "não pode ser
   MEI". Aqui checamos isso antes de o dado entrar.

   Colisão não é proibida — "medic" pega tanto "médico" (barrado) quanto "comerciante
   de artigos médicos" (permitido). Mas ela precisa ser DECLARADA em AMBIGUAS abaixo,
   pra ficar explícito que quem desempata é a camada semântica (o tiebreak em
   ferramenta_cnae.jsx compara o melhor permitido contra a melhor âncora não-MEI).

   Uso:  node scripts/check_naomei_keys.mjs     (exit 1 se achar colisão não declarada) */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

/* Keys ambíguas de propósito: a palavra é do jargão da profissão barrada, mas também
   aparece numa ocupação permitida. O semântico desempata. */
const AMBIGUAS = new Set(['medic', 'publicit', 'contador']);

const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/naomei.json'), 'utf8'));
const OCC = [...fs.readFileSync(path.join(ROOT, 'src/data/cnae_occupations.js'), 'utf8')
  .matchAll(/"oc":"([^"]*)"/g)].map((m) => m[1]);

if (OCC.length !== 466) console.warn(`⚠️  esperava 466 ocupações, li ${OCC.length}`);

let undeclared = 0, declared = 0;
const seen = new Map();

for (const e of [...DATA.regulamentadas, ...DATA.vedadas]) {
  const label = e.area || e.categoria;
  for (const k of e.keys) {
    if (k !== norm(k)) { console.error(`❌ key não normalizada: "${k}" (${label})`); undeclared++; }
    if (seen.has(k)) console.warn(`⚠️  key duplicada: "${k}" em ${seen.get(k)} e ${label}`);
    seen.set(k, label);

    const hits = OCC.filter((o) => norm(o).includes(k));
    if (!hits.length) continue;
    if (AMBIGUAS.has(k)) {
      declared++;
      console.log(`ℹ️  ambígua declarada "${k}" (${label}) → ${hits.length} ocupação(ões) permitida(s)`);
    } else {
      undeclared++;
      console.error(`❌ FALSO-BLOQUEIO: key "${k}" (${label}) é substring de:`);
      for (const h of hits.slice(0, 4)) console.error(`      · ${h}`);
      console.error(`   → use um termo mais específico (ex.: "ortopedista", não "ortoped") ou declare em AMBIGUAS.`);
    }
  }
}

console.log(`\n${seen.size} keys · ${declared} ambíguas declaradas · ${undeclared} problema(s)`);
process.exit(undeclared ? 1 : 0);

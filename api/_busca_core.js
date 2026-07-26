/* Núcleo da decisão da busca de CNAE — FONTE ÚNICA.
   Importado tanto pelo endpoint (api/cnae-busca.js) quanto pela bateria de regressão
   (scripts/check_naomei_regressao.mjs). Não duplique esta lógica: a bateria só tem
   valor se ela testar exatamente o que roda em produção.

   Aqui não tem I/O nem chave: entra um vetor de query já normalizado, sai o veredito. */

/* ── limiares, todos calibrados com medição (ver docs no fim do arquivo) ── */
export const MATCH = 0.66;          // piso pra uma ocupação permitida ser "confiante"
export const DESTAQUE_MIN = 0.02;   // o quanto a 1ª tem que descolar da 2ª..5ª
export const NAOMEI_MATCH = 0.66;   // piso do score da âncora não-MEI
export const NAOMEI_MARGIN = 0.03;  // quanto a âncora precisa vencer o melhor permitido

/* Cosseno da query contra uma matriz achatada de vetores já L2-normalizados. */
function pontuar(qv, flat, count, dim) {
  const out = new Array(count);
  for (let i = 0; i < count; i++) {
    const off = i * dim;
    let s = 0;
    for (let d = 0; d < dim; d++) s += flat[off + d] * qv[d];
    out[i] = { i, s };
  }
  return out.sort((a, b) => b.s - a.s);
}

/* Quanto a 1ª colocada descola da 2ª..5ª.
   O score absoluto NÃO separa acerto de acaso: "faço unha em gel" casa Manicure em
   0.729 e "cuido das redes sociais" casa Diarista em 0.685 — perto demais pra decidir.
   Já o destaque separa: num acerto de verdade a 1ª descola do pelotão (mediana 0.088),
   num match espúrio ela é só a primeira de um monte de coisa parecida (mediana 0.012).
   Medido em 89 buscas que devem acertar × 14 que não têm resposta nas 466. */
export function destaqueDoTopo(scores) {
  if (!scores.length) return 0;
  const resto = scores.slice(1, 5);
  if (!resto.length) return 1;                     // achou só uma: destaque total
  return scores[0] - resto.reduce((a, b) => a + b, 0) / resto.length;
}

/* Decide tudo a partir do vetor da query.
   Devolve { results, bestMei, destaque, confident, naomei, naoTop }. */
export function decidir(qv, idx) {
  const { count, dim, flat, items } = idx;
  const scored = pontuar(qv, flat, count, dim);

  const floor = idx.search_floor ?? 0.6;
  const results = [];
  for (const { i, s } of scored) {
    if (s < floor) break;
    const it = items[i];
    results.push({ oc: it.oc, cnae: it.cnae, trib: it.trib, score: Number(s.toFixed(4)) });
    if (results.length >= 8) break;
  }
  const bestMei = scored.length ? scored[0].s : 0;
  const destaque = destaqueDoTopo(results.map((r) => r.score));

  // "Confiante" = alta E destacada. Só o piso deixava passar resposta confiante e
  // absurda ("doula" → Diarista); com o destaque junto, ela cai pro estado de dúvida.
  const confident = !!results[0] && results[0].score >= MATCH && destaque >= DESTAQUE_MIN;

  let naomei = null, naoTop = null;
  const nao = idx.nao;
  if (nao && nao.count) {
    const [melhor] = pontuar(qv, nao.flat, nao.count, nao.dim);
    if (melhor) {
      const it = nao.items[melhor.i];
      const cand = {
        tipo: it.tipo, label: it.label, conselho: it.conselho || '',
        cnae: it.cnae, cnaeNome: it.cnaeNome, score: Number(melhor.s.toFixed(4)),
      };
      // `naoTop` sai SEMPRE: é o placar da melhor âncora não-MEI, que o front usa pra
      // desempatar quando o match lexical acusa não-MEI (ex.: "médico" em "comerciante
      // de artigos médicos"). Sem ele o front só teria um piso fixo, e um permitido
      // raspando no piso derrubava uma certeza lexical.
      naoTop = cand;
      // `naomei` é o VEREDITO: só afirma "não pode" com score alto E margem sobre o
      // melhor permitido — falso-bloqueio é o pior erro do produto.
      if (melhor.s >= NAOMEI_MATCH && melhor.s >= bestMei + NAOMEI_MARGIN) naomei = cand;
    }
  }

  return {
    results, naomei, naoTop, confident,
    bestMei: Number(bestMei.toFixed(4)),
    destaque: Number(destaque.toFixed(4)),
  };
}

/* ────────────────────────────────────────────────────────────────────────────
   CALIBRAÇÃO (jul/2026) — rode scripts/check_naomei_regressao.mjs pra reproduzir.

   NAOMEI_MARGIN = 0.03
     Separação `âncora − melhor permitida` em 546 buscas que DEVEM ser permitidas
     (as 466 pelo nome oficial + 80 coloquiais): nenhuma passa de -0.021 ("faço
     massagem relaxante", que encosta em Fisioterapia); pior pelo nome oficial é
     -0.037 ("borracheiro"). A 0.05 só 49% das paráfrases de atividade não-MEI eram
     pegas; a 0.03 vai a 87%, com falso-bloqueio 0/546. Não desça sem remedir o
     lado coloquial — a folga sobre o pior caso real é o que segura o falso-bloqueio.

   DESTAQUE_MIN = 0.02
     Mantém 97% dos acertos (86/89) e barra 79% dos matches espúrios (11/14).
   ──────────────────────────────────────────────────────────────────────────── */

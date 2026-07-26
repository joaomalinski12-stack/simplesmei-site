/* A DECISÃO da ferramenta Consulta CNAE, em funções puras — FONTE ÚNICA.
   Fica separada de `cnae_naomei.js` de propósito: aqui não se importa JSON, então
   `scripts/check_naomei_regressao.mjs` roda isto no Node puro e testa exatamente o
   que o componente executa. Regra: se a lógica de veredito mudar, muda AQUI.

   Quem consome: src/data/cnae_naomei.js (embrulha com o JSON), src/ferramenta_cnae.jsx
   (o componente) e a bateria de regressão. */
import { norm } from './cnae_mei.js';

/* ── camada lexical ──────────────────────────────────────────────────────── */

/* Monta as listas a partir do naomei.json já parseado. */
export function montarListas(DATA) {
  return {
    REGULATED: DATA.regulamentadas.map((e) => ({
      area: e.area, conselho: e.conselho || '', keys: e.keys, cnae: e.cnae, cnaeNome: e.cnaeNome,
    })),
    FORBIDDEN: DATA.vedadas.map((e) => ({
      categoria: e.categoria, keys: e.keys, cnae: e.cnae, cnaeNome: e.cnaeNome,
    })),
  };
}

/* Detecta atividade não-MEI no texto.
   Vence a key MAIS LONGA (a mais específica), não a primeira da lista: "cirurgião
   dentista" casa tanto "cirurgi" (Medicina) quanto "cirurgiao dentista" (Odontologia)
   — e quem manda é a segunda. Empate fica com a regulamentada, que é certeza pelo
   conselho de classe. Retorna { tipo, label, conselho, cnae, cnaeNome } | null. */
export function detectNaoMeiEm({ REGULATED, FORBIDDEN }, text) {
  const t = norm(text);
  if (!t) return null;
  let best = null, bestLen = 0;
  const considerar = (hit, len) => { if (len > bestLen) { best = hit; bestLen = len; } };
  for (const r of REGULATED) {
    for (const k of r.keys) {
      if (t.includes(k)) considerar({ tipo: 'regulamentada', label: r.area, conselho: r.conselho, cnae: r.cnae, cnaeNome: r.cnaeNome }, k.length);
    }
  }
  for (const f of FORBIDDEN) {
    for (const k of f.keys) {
      // `>` na comparação já dá o desempate à regulamentada, que roda primeiro
      if (t.includes(k)) considerar({ tipo: 'vedada', label: f.categoria, conselho: '', cnae: f.cnae, cnaeNome: f.cnaeNome }, k.length);
    }
  }
  return best;
}

/* ── a decisão ───────────────────────────────────────────────────────────── */

/* Margem que o permitido precisa pra derrubar uma acusação LEXICAL de não-MEI.
   Espelha NAOMEI_MARGIN do servidor, na direção contrária. */
export const MARGEM_DERRUBA_LEXICAL = 0.05;

/* A partir de quantas palavras consideramos que a pessoa JÁ se explicou. Abaixo
   disso, pedir detalhe tende a resolver; acima, não resolveu e insistir vira loop
   sem saída (medido: "acompanho gestante no parto dando apoio emocional" continua
   sem resposta certa porque doula não está nas 466). */
const PALAVRAS_DETALHADO = 5;

export function jaDetalhou(query) {
  return norm(query).split(/\s+/).filter(Boolean).length >= PALAVRAS_DETALHADO;
}

/* Escolhe o que a tela mostra.
   `sem` = resposta do /api/cnae-busca + estado do fetch:
     { estado: 'idle'|'loading'|'done'|'off', confident, hits:[], naomei, naoTop }

   Modos: empty · searching · results · incerto · naomei · none */
export function escolherModo({ query, lexicalCount, temHits, nao, sem }) {
  const assentou = sem.estado !== 'loading';
  const pronto = sem.estado === 'done';

  // O permitido é confiante o bastante pra derrubar uma acusação lexical? Não basta
  // raspar no piso: tem que GANHAR da melhor âncora não-MEI com margem. "médico" casa
  // tanto em "sou médico" (barrado) quanto em "vendo artigos médicos" (permitido, que
  // ganha por folga larga). Com piso fixo, um permitido qualquer no limiar derrubava a
  // certeza lexical — era o que deixava "cirurgião ortopédico" passar como comerciante.
  const derrubaLexical = pronto && sem.confident && sem.hits[0]
    && (!sem.naoTop || sem.hits[0].score >= sem.naoTop.score + MARGEM_DERRUBA_LEXICAL);

  let modo;
  if (!norm(query)) modo = 'empty';
  else if (!nao) {
    if (lexicalCount) modo = 'results';            // prefixo numa ocupação real = certeza
    else if (!assentou) modo = 'searching';
    else if (pronto && sem.naomei) modo = 'naomei';// o semântico afirmou não-MEI
    else if (pronto && sem.confident) modo = 'results';
    else if (temHits) modo = 'incerto';            // achou parecido, mas sem confiança
    else modo = 'none';
  } else {
    // cheira a não-MEI pelo lexical: o semântico confirma se, na verdade, é permitida
    if (!assentou) modo = 'searching';
    else if (derrubaLexical) modo = 'results';
    else modo = 'naomei';
  }

  return {
    modo,
    naoVerdict: nao || (pronto ? sem.naomei : null) || null,
    // no estado de dúvida, quem já se explicou não recebe "me conta mais": recebe a
    // saída (provavelmente não está na lista das 466)
    pedirDetalhe: modo === 'incerto' && !jaDetalhou(query),
  };
}

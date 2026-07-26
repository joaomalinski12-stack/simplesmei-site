/* Vercel Serverless Function — busca SEMÂNTICA de CNAE (a ferramenta
   /ferramentas/consulta-cnae-mei chama aqui, mesmo domínio, sem CORS).

   Espelha o produto (bot): embeda a query com gemini-embedding-001 (768d, task
   RETRIEVAL_QUERY), faz cosseno contra as 466 ocupações pré-indexadas (o mesmo
   índice do bot, convertido por scripts/build_cnae_embeddings.py) e devolve o top-k
   acima do piso. A chave fica na env var GEMINI_API_KEY (Vercel), nunca no bundle.

   A DECISÃO em si (limiares, veredito não-MEI, confiança) mora em ./_busca_core.js,
   compartilhada com a bateria de regressão — aqui só tem I/O.

   Falha graciosa: sem chave / erro na API / query vazia → { ok:false }, e o
   front cai no buscador lexical (offline) que já existe. */
import INDEX from './_cnae_index.js';
import NAOMEI from './_naomei_index.js';
import { decidir } from './_busca_core.js';

const MODEL = 'gemini-embedding-001';

// decodifica os vetores uma vez por instância quente
let IDX = null;
function index() {
  if (IDX) return IDX;
  const buf = Buffer.from(INDEX.vectors_b64, 'base64');
  const flat = new Float32Array(buf.buffer, buf.byteOffset, INDEX.count * INDEX.dim);
  const nb = Buffer.from(NAOMEI.vectors_b64, 'base64');
  const nflat = new Float32Array(nb.buffer, nb.byteOffset, NAOMEI.count * NAOMEI.dim);
  IDX = { ...INDEX, flat, nao: { ...NAOMEI, flat: nflat } };
  return IDX;
}

async function embedQuery(q, key) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:embedContent?key=${key}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: `models/${MODEL}`,
      content: { parts: [{ text: q }] },
      taskType: 'RETRIEVAL_QUERY',
      outputDimensionality: 768,
    }),
  });
  if (!r.ok) throw new Error(`gemini ${r.status}`);
  const j = await r.json();
  const values = j?.embedding?.values;
  if (!Array.isArray(values) || !values.length) throw new Error('sem embedding');
  return values;
}

export default async function handler(req, res) {
  const q = (typeof req.query?.q === 'string' ? req.query.q : '').trim().slice(0, 120);
  if (!q) return res.status(200).json({ ok: false, error: 'empty' });

  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(200).json({ ok: false, error: 'no_key' });

  try {
    const idx = index();
    const raw = await embedQuery(q, key);
    // normaliza a query (cosseno = produto interno com vetores já normalizados)
    let norm = 0;
    for (let i = 0; i < raw.length; i++) norm += raw[i] * raw[i];
    norm = Math.sqrt(norm) || 1;
    const qv = new Float32Array(idx.dim);
    for (let i = 0; i < idx.dim; i++) qv[i] = (raw[i] || 0) / norm;

    const veredito = decidir(qv, idx);

    res.setHeader('Cache-Control', 'public, s-maxage=86400, max-age=600');
    return res.status(200).json({ ok: true, ...veredito });
  } catch (e) {
    return res.status(200).json({ ok: false, error: 'upstream' });
  }
}

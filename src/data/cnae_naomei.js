/* Atividades que NÃO podem ser MEI — pra a busca dar contexto no "não" (em vez de só
   "não encontramos"). Fonte ÚNICA: naomei.json (o mesmo que alimenta o índice
   semântico em api/_naomei_index.js e é espelhado à mão no bot).

   Aqui é a camada LEXICAL (instantânea, offline): as `keys` já vêm normalizadas
   (minúsculas, sem acento) e casam por substring — alta precisão, só termo
   inequívoco, pra não barrar quem PODE. A camada semântica (serverless) pega as
   paráfrases ("desenvolvo aplicativos", "sou personal"). */
import { norm } from './cnae_mei.js';
import DATA from './naomei.json';

/* Profissões REGULAMENTADAS (têm conselho de classe → não podem ser MEI). */
export const REGULATED = DATA.regulamentadas.map((e) => ({
  area: e.area, keys: e.keys, cnae: e.cnae, cnaeNome: e.cnaeNome,
}));

/* Atividades VEDADAS por natureza (não têm conselho, mas ficam fora do MEI). */
export const FORBIDDEN = DATA.vedadas.map((e) => ({
  categoria: e.categoria, keys: e.keys, cnae: e.cnae, cnaeNome: e.cnaeNome,
}));

/* Detecta se o texto descreve uma atividade não-MEI. Regulamentada tem prioridade
   (é certeza pelo conselho de classe). Retorna { tipo, label, cnae, cnaeNome } | null. */
export function detectNaoMei(text) {
  const t = norm(text);
  if (!t) return null;
  for (const r of REGULATED) {
    if (r.keys.some((k) => t.includes(k))) return { tipo: 'regulamentada', label: r.area, cnae: r.cnae, cnaeNome: r.cnaeNome };
  }
  for (const f of FORBIDDEN) {
    if (f.keys.some((k) => t.includes(k))) return { tipo: 'vedada', label: f.categoria, cnae: f.cnae, cnaeNome: f.cnaeNome };
  }
  return null;
}

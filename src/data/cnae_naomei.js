/* Atividades que NÃO podem ser MEI — pra a busca dar contexto no "não" (em vez de só
   "não encontramos"). Fonte ÚNICA: naomei.json (o mesmo que alimenta o índice
   semântico em api/_naomei_index.js e é espelhado à mão no bot).

   Este arquivo só junta o JSON com a lógica: o veredito em si mora em
   `cnae_decisao.js`, que não importa JSON e por isso roda na bateria de regressão
   (scripts/check_naomei_regressao.mjs) sem bundler.

   A camada LEXICAL (instantânea, offline) casa as `keys` normalizadas por substring —
   alta precisão, só termo inequívoco, pra não barrar quem PODE. A camada semântica
   (serverless) pega as paráfrases ("desenvolvo aplicativos", "sou personal"). */
import DATA from './naomei.json';
import { montarListas, detectNaoMeiEm } from './cnae_decisao.js';

const LISTAS = montarListas(DATA);

/* Profissões REGULAMENTADAS (têm conselho de classe → não podem ser MEI). */
export const REGULATED = LISTAS.REGULATED;

/* Atividades VEDADAS por natureza (não têm conselho, mas ficam fora do MEI). */
export const FORBIDDEN = LISTAS.FORBIDDEN;

export function detectNaoMei(text) {
  return detectNaoMeiEm(LISTAS, text);
}

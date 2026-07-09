/* Atividades que NÃO podem ser MEI — pra a busca dar contexto no "não" (em vez de só
   "não encontramos"). Portado do backend do bot (app/services/mei_opening.py:
   REGULATED_PROFESSIONS + MEI_FORBIDDEN) → consistência com o produto.

   Detecção lexical, sem acento/caixa (igual o bot): as `keys` já vêm normalizadas
   (minúsculas, sem acento) e casam por substring. Os códigos CNAE são da tabela
   oficial (IBGE/CONCLA) / Contabilizei. */
import { norm } from './cnae_mei.js';

/* Profissões REGULAMENTADAS (têm conselho de classe → não podem ser MEI).
   { area, keys[], cnae, cnaeNome } */
export const REGULATED = [
  { area: 'Medicina',              keys: ['medic'],                       cnae: '8630-5/03', cnaeNome: 'Atividade médica ambulatorial restrita a consultas' },
  { area: 'Odontologia',           keys: ['dentist', 'odontolog'],        cnae: '8630-5/04', cnaeNome: 'Atividade odontológica' },
  { area: 'Advocacia',             keys: ['advog', 'advocacia'],          cnae: '6911-7/01', cnaeNome: 'Serviços advocatícios' },
  { area: 'Contabilidade',         keys: ['contad', 'contabil'],          cnae: '6920-6/01', cnaeNome: 'Atividades de contabilidade' },
  { area: 'Engenharia',            keys: ['engenh'],                      cnae: '7112-0/00', cnaeNome: 'Serviços de engenharia' },
  { area: 'Arquitetura',           keys: ['arquit'],                      cnae: '7111-1/00', cnaeNome: 'Serviços de arquitetura' },
  { area: 'Psicologia',            keys: ['psico'],                       cnae: '8650-0/03', cnaeNome: 'Atividades de psicologia e psicanálise' },
  { area: 'Nutrição',              keys: ['nutri'],                       cnae: '8650-0/02', cnaeNome: 'Atividades de profissionais da nutrição e dietética' },
  { area: 'Fisioterapia',          keys: ['fisio'],                       cnae: '8650-0/04', cnaeNome: 'Atividades de fisioterapia' },
  { area: 'Veterinária',           keys: ['veterin'],                     cnae: '7500-1/00', cnaeNome: 'Atividades veterinárias' },
  { area: 'Jornalismo',            keys: ['jornalis'],                    cnae: '9002-7/01', cnaeNome: 'Atividades de artistas plásticos, jornalistas independentes e escritores' },
  { area: 'Publicidade',           keys: ['publicit'],                    cnae: '7311-4/00', cnaeNome: 'Agências de publicidade' },
  { area: 'Fonoaudiologia',        keys: ['fonoaud'],                     cnae: '8650-0/06', cnaeNome: 'Atividades de fonoaudiologia' },
  { area: 'Enfermagem',            keys: ['enferm'],                      cnae: '8650-0/01', cnaeNome: 'Atividades de enfermagem' },
  { area: 'Biomedicina',           keys: ['biomedic'],                    cnae: '8650-0/99', cnaeNome: 'Atividades de profissionais da área de saúde não especificadas anteriormente' },
  { area: 'Corretagem de imóveis', keys: ['corretor de imo'],             cnae: '6821-8/01', cnaeNome: 'Corretagem na compra e venda e avaliação de imóveis' },
  { area: 'Corretagem de seguros', keys: ['corretor de seguro'],          cnae: '6622-3/00', cnaeNome: 'Corretores e agentes de seguros e de planos de previdência complementar e de saúde' },
  { area: 'Economia',              keys: ['economist'],                   cnae: '',          cnaeNome: '' },
];

/* Atividades VEDADAS por natureza (não têm conselho, mas ficam fora do MEI).
   { categoria, keys[], cnae, cnaeNome } — CNAE representativo quando há um claro. */
export const FORBIDDEN = [
  { categoria: 'comércio atacadista', keys: ['atacad'], cnae: '4691-5/00', cnaeNome: 'Comércio atacadista de mercadorias em geral, com predominância de produtos alimentícios' },
  { categoria: 'desenvolvimento de software/sistemas', keys: ['programador', 'desenvolvedor de software', 'desenvolvedor de site', 'desenvolvedor de aplicativo', 'desenvolvedor web', 'desenvolvimento de software', 'desenvolvimento de sistema', 'criacao de software'], cnae: '6201-5/01', cnaeNome: 'Desenvolvimento de programas de computador sob encomenda' },
  { categoria: 'importação ou exportação', keys: ['importacao', 'importador', 'exportacao', 'exportador', 'comercio exterior'], cnae: '', cnaeNome: '' },
  { categoria: 'atividade financeira', keys: ['agiotagem', 'emprestimo de dinheiro', 'factoring', 'casa de cambio', 'corretora de valores'], cnae: '', cnaeNome: '' },
  { categoria: 'armas e munições', keys: ['arma de fogo', 'armas de fogo', 'municao', 'explosivo'], cnae: '', cnaeNome: '' },
  { categoria: 'fabricação de bebidas alcoólicas', keys: ['fabricacao de bebida', 'cervejaria', 'destilaria'], cnae: '1113-5/02', cnaeNome: 'Fabricação de cervejas e chopes' },
  { categoria: 'fabricação de cigarros/tabaco', keys: ['fabricacao de cigarro'], cnae: '1220-4/01', cnaeNome: 'Fabricação de cigarros' },
];

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

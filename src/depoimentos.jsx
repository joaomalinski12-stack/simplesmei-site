import React from 'react';
import { TestimonialCard } from './logo_footer.jsx';
import { SecHead } from './preco_cta.jsx';
import { BRAND, useIsMobile } from './tokens.jsx';

/* SimplesMEI — Site V5 · DEPOIMENTOS (prova social)
   Cards no TestimonialCard compartilhado (retrato = placeholder listrado,
   sem rosto falso). Posição: entre o bento e o preço.

   Pessoas reais, com autorização do dono. Os TEXTOS são rascunho de copy
   aguardando validação de cada um — ajustar à fala real se eles mudarem.
   Nada aqui vira estrela/nota em schema (proibido).
   Nota de honestidade: Greyce é MEI de COMÉRCIO (roupas) e o produto só
   emite NFS-e de serviço — o depoimento dela não cita emissão de nota. */

/* fotos: enviadas pelo dono (autorizadas), recortadas 160×160 em public/depoimentos/ */
const DEPOS = [
  {
    quote: 'A FeriadosAPI é assinatura: todo mês, as mesmas notas pros mesmos clientes. Configurei a recorrência uma vez e esqueci — a NFS-e chega emitida no meu WhatsApp, no dia certo.',
    name: 'João Bini',
    role: 'CEO · feriadosapi.com.br',
    metric: 'notas no automático',
    photo: '/depoimentos/joao-bini.jpg',
  },
  {
    quote: 'Abri meu MEI com a IA me guiando pelo WhatsApp e hoje é ela que me segura: pergunto quando vence o DAS, quanto falta pro teto, e a resposta vem na hora, em português de gente.',
    name: 'Greyce Fernandes',
    role: 'Vende roupas na internet · MEI',
    metric: 'DAS e teto em dia',
    tone: 'coral',
    photo: '/depoimentos/greyce-fernandes.jpg',
  },
  {
    quote: 'Cada turma nova era uma tarde no portal, emitindo nota por nota. Agora eu mando “emite pra fulana” e a NFS-e volta em segundos, com o PDF pronto pra enviar pro aluno.',
    name: 'Lia Mara',
    role: 'Cursos educacionais · MEI',
    metric: 'nota em segundos',
    photo: '/depoimentos/lia-mara.jpg',
  },
];

function DepoimentosV5() {
  const m = useIsMobile();
  return (
    <section data-anchor id="depoimentos" style={{ background: BRAND.paper, padding: m ? '0 20px 56px' : '0 56px 92px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <SecHead
          eyebrow="Depoimentos"
          title="Quem emite pelo WhatsApp não volta pro portal."
          desc="Histórias de quem trocou o portal da prefeitura por uma conversa: a nota fiscal, o DAS e o teto do MEI resolvidos pela IA."
        />
        <div style={{ marginTop: m ? 24 : 36, display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: m ? 14 : 16, alignItems: 'stretch' }}>
          {DEPOS.map((d, i) => (
            <TestimonialCard key={i} quote={d.quote} name={d.name} role={d.role} metric={d.metric} tone={d.tone} photo={d.photo}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export { DepoimentosV5 };

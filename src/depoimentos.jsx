import React from 'react';
import { TestimonialCard } from './logo_footer.jsx';
import { SecHead } from './preco_cta.jsx';
import { BRAND, useIsMobile } from './tokens.jsx';

/* SimplesMEI — Site V5 · DEPOIMENTOS (prova social)
   Cards no TestimonialCard compartilhado, todos no MESMO formato e cor
   (sem destaque coral, sem chip de métrica — quebravam em duas linhas).
   Citações balanceadas (~145 chars) pra os cards ficarem parelhos.
   Posição: entre o bento e o preço.

   Pessoas reais, com autorização do dono; fotos 160×160 em public/depoimentos/.
   Os TEXTOS são rascunho aguardando validação de cada um.
   Nada aqui vira estrela/nota em schema (proibido).
   O produto emite nota pra MEI de comércio também (confirmado pelo dono em
   2026-07-12) — por isso a Greyce fala de emissão. */

const linkStyle = { color: BRAND.coralDeep, fontWeight: 600, textDecoration: 'none' };

const DEPOS = [
  {
    quote: 'A FeriadosAPI é assinatura: todo mês, as mesmas notas pros mesmos clientes. Configurei a recorrência uma vez e a nota sai sozinha, no dia certo.',
    name: 'João Bini',
    role: <>CEO · <a href="https://feriadosapi.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>feriadosapi.com</a></>,
    photo: '/depoimentos/joao-bini.jpg',
  },
  {
    quote: 'Eu vendo roupa na internet e a nota era meu pesadelo. Agora peço no WhatsApp e sai na hora — e tiro dúvida de DAS e de teto na mesma conversa.',
    name: 'Greyce Fernandes',
    role: 'Vende roupas online · MEI',
    photo: '/depoimentos/greyce-fernandes.jpg',
  },
  {
    quote: 'Cada turma nova era uma tarde emitindo nota por nota no portal. Hoje eu mando “emite pra fulana” e a nota volta em segundos, com o PDF pro aluno.',
    name: 'Lia Mara',
    role: 'Cursos educacionais · MEI',
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
            <TestimonialCard key={i} quote={d.quote} name={d.name} role={d.role} photo={d.photo}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export { DepoimentosV5 };

import React from 'react';
import { WhatsAppIcon } from './logo_footer.jsx';
import { DOOR_GREEN, DOOR_GREEN_DEEP, DOOR_TEXT, waHref } from './porta_nav.jsx';
import { SecHead } from './preco_cta.jsx';
import { Mono, TileCalendar, TileClientes, TileDAS, TileGauge } from './tiles.jsx';
import { BRAND, FONTS, useIsMobile } from './tokens.jsx';

/* SimplesMEI — Site V5 · O BENTO (as outras cenas) + a CENA DA DOR
   Mosaico real, células variadas, opacidade cheia. Cada célula é uma PORTA:
   o card abre o WhatsApp com a mensagem daquela feature já digitada. */

/* recorrência: calendário + as 12 notas do ano (estático) */
function RecorrenciaMini() {
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'stretch' }}>
      <TileCalendar highlightDay={5} label="todo dia 5 · ativa"/>
      <div style={{ background: BRAND.sand, border: `1px solid ${BRAND.sandDeep}`, borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column' }}>
        <Mono color={BRAND.inkSoft}>No automático · 2026</Mono>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '7px 0 2px' }}>
          <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 30, color: BRAND.ink, letterSpacing: -1, lineHeight: 0.9 }}>12</span>
          <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 15, color: BRAND.inkSoft }}>/12</span>
          <span style={{ marginLeft: 4, fontSize: 12, color: BRAND.inkSoft }}>notas</span>
        </div>
        <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 22, color: BRAND.ink, letterSpacing: -0.6 }}>R$ 5.760</div>
        <div style={{ display: 'flex', gap: 3, marginTop: 'auto', paddingTop: 14 }}>
          {months.map((mo, i) => (
            <div key={i} style={{ flex: 1, height: 20, borderRadius: 4, background: BRAND.mint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 7, fontWeight: 700, color: '#06281b', fontFamily: FONTS.mono }}>{mo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* resumo do mês compacto */
function ResumoMini() {
  const rows = [
    ['Faturado', 'R$ 7.420', false],
    ['Notas emitidas', '11', false],
    ['DAS de junho', 'pago ✓', true],
    ['Recorrências', '3 ativas', false],
  ];
  return (
    <div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: i === 0 ? 'none' : `1px solid ${BRAND.sand}` }}>
          <span style={{ fontSize: 12.5, color: BRAND.inkSoft }}>{r[0]}</span>
          <span style={{ fontFamily: FONTS.mono, fontSize: 12.5, fontWeight: 700, color: r[2] ? BRAND.mintDeep : BRAND.ink }}>{r[1]}</span>
        </div>
      ))}
    </div>
  );
}

/* célula-porta do bento */
function BentoCell({ kicker, title, desc, doorText, style, children }) {
  return (
    <a className="v5-cell" href={waHref(doorText)} target="_blank" rel="noopener noreferrer" style={{
      textDecoration: 'none', color: 'inherit',
      background: '#fff', border: `1px solid ${BRAND.sandDeep}`, borderRadius: 20, padding: 24,
      display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
      boxShadow: '0 2px 10px -6px rgba(16,17,26,0.10)', ...style,
    }}>
      {/* selo persistente: sou uma entrada */}
      <span style={{
        position: 'absolute', top: 16, right: 16, width: 26, height: 26, borderRadius: '50%',
        background: DOOR_GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        boxShadow: '0 6px 14px -6px rgba(37,211,102,0.55)',
      }}>
        <WhatsAppIcon size={15}/>
      </span>

      <div style={{ marginBottom: 14, paddingRight: 30 }}>
        <Mono color={BRAND.coralDeep} size={10.5}>{kicker}</Mono>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 19, color: BRAND.ink, letterSpacing: -0.4, lineHeight: 1.1, marginTop: 7 }}>{title}</div>
        <p style={{ fontSize: 13, lineHeight: 1.5, color: BRAND.inkSoft, margin: '6px 0 0', textWrap: 'pretty' }}>{desc}</p>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>{children}</div>

      {/* porta revelada no hover */}
      <div className="v5-cell-door" style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${BRAND.sand}`, display: 'flex', alignItems: 'center', gap: 9 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: DOOR_GREEN_DEEP, fontWeight: 700, fontSize: 12.5, fontFamily: FONTS.body, whiteSpace: 'nowrap' }}>
          abre o WhatsApp <span>→</span>
        </span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: BRAND.inkSoft, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>“{doorText}”</span>
      </div>
    </a>
  );
}

function BentoV5() {
  const m = useIsMobile();
  return (
    <section style={{ background: BRAND.paper, padding: m ? '56px 20px' : '92px 56px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <SecHead eyebrow="O que mais ela resolve" title="O trabalho do contador. Sem a conta do contador." desc="Cada card abre o WhatsApp com a mensagem já digitada. Sem formulário, sem ‘saiba mais’: você toca e a IA já resolve." />

        <div style={{ marginTop: m ? 24 : 36, display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(12, 1fr)', gap: m ? 14 : 16, alignItems: 'stretch' }}>
          <div data-anchor id="recorrencia" style={{ gridColumn: 'span 7', display: 'flex' }}>
            <BentoCell
              style={{ flex: 1 }}
              kicker="No automático" title="Recorrência todo mês"
              desc="Configura uma vez e esquece. As 12 notas saem sozinhas, no dia certo. Você não levanta um dedo."
              doorText={DOOR_TEXT.recorrencia}>
              <RecorrenciaMini/>
            </BentoCell>
          </div>

          <BentoCell
            style={{ gridColumn: 'span 5' }}
            kicker="Digita uma vez" title="Clientes na memória"
            desc="A IA guarda CNPJ, valor e serviço. Diz o nome e a nota sai certa, sem caçar documento."
            doorText={DOOR_TEXT.clientes}>
            <TileClientes/>
          </BentoCell>

          <BentoCell
            style={{ gridColumn: 'span 4' }}
            kicker="Sem susto no fim do ano" title="Limite MEI vigiado"
            desc="A IA soma tudo que você faturou e avisa antes de estourar o teto. Chega de descobrir tarde demais."
            doorText={DOOR_TEXT.limite}>
            <TileGauge pct={80}/>
          </BentoCell>

          <BentoCell
            style={{ gridColumn: 'span 4' }}
            kicker="Tudo num lugar" title="Resumo do mês"
            desc="Faturamento, notas, DAS e recorrências: o mês inteiro, quando você pedir."
            doorText={DOOR_TEXT.resumo}>
            <ResumoMini/>
          </BentoCell>

          <BentoCell
            style={{ gridColumn: 'span 4' }}
            kicker="Nunca mais multa" title="Lembrete do DAS"
            desc="A gente lembra antes de vencer e já manda o boleto com Pix. Multa por esquecimento, nunca mais."
            doorText={DOOR_TEXT.das}>
            <TileDAS/>
          </BentoCell>
        </div>
      </div>
    </section>
  );
}

export { RecorrenciaMini, ResumoMini, BentoCell, BentoV5 };

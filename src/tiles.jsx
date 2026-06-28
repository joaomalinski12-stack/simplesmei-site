import React from 'react';
import { BRAND, CheckSeal, FONTS, MeterDS, meterColor } from './tokens.jsx';

/* SimplesMEI — Site V3 · "Mockups vivos"
   Peças de UI real do produto, embutidas nos cards bento.
   Tudo estático e limpo — sem hover/modal. */

/* ─── Rótulo mono pequeno (metadados) ──────────────────── */
function Mono({ children, color, size }) {
  return (
    <span style={{
      fontFamily: FONTS.mono, fontSize: size || 9.5, fontWeight: 700,
      letterSpacing: 0.6, textTransform: 'uppercase',
      color: color || BRAND.inkSoft,
    }}>{children}</span>
  );
}

/* ─── Bolha de chat compacta ───────────────────────────── */
function ChatLine({ from, onDark, children }) {
  const isUser = from === 'user';
  const botBg  = onDark ? '#242530' : '#fff';
  const botBrd = onDark ? '1px solid rgba(255,255,255,0.10)' : `1px solid ${BRAND.sandDeep}`;
  const botClr = onDark ? '#DCDDE6' : BRAND.ink;
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{
        background: isUser ? BRAND.coral : botBg,
        color: isUser ? '#fff' : botClr,
        border: isUser ? 'none' : botBrd,
        padding: '8px 12px',
        borderRadius: 12,
        borderTopLeftRadius: !isUser ? 4 : 12,
        borderTopRightRadius: isUser ? 4 : 12,
        fontSize: 13, lineHeight: 1.4,
        maxWidth: '86%',
      }}>{children}</div>
    </div>
  );
}

/* ─── Painel de chat (fundo zap, pontilhado) ───────────── */
function ChatPanel({ children, onDark, pad }) {
  return (
    <div style={{
      background: onDark ? '#10111A' : BRAND.sand,
      backgroundImage: onDark
        ? 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)'
        : 'radial-gradient(#E1DACE 1px, transparent 1px)',
      backgroundSize: '16px 16px',
      borderRadius: 14, padding: pad || 14,
      border: onDark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${BRAND.sandDeep}`,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      {children}
    </div>
  );
}

/* ─── Recibo de NFS-e ──────────────────────────────────── */
function TileRecibo({ name, amount, number, note, onDark, big }) {
  const bg  = onDark ? '#242530' : '#fff';
  const brd = onDark ? '1px solid rgba(255,255,255,0.10)' : `1px solid ${BRAND.sandDeep}`;
  const clr = onDark ? '#DCDDE6' : BRAND.ink;
  const sub = onDark ? '#84858F' : BRAND.inkSoft;
  return (
    <div style={{
      background: bg, borderRadius: 12, padding: big ? '16px 18px' : '12px 14px', border: brd,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: BRAND.mintSoft, color: BRAND.mintDeep,
          padding: '3px 9px 3px 4px', borderRadius: 999,
          fontSize: 10, fontWeight: 700, fontFamily: FONTS.mono, letterSpacing: 0.4,
        }}><CheckSeal size={14}/>Emitida</span>
        <Mono color={sub}>NFS-e {number}</Mono>
      </div>
      <div style={{
        fontFamily: FONTS.display, fontWeight: 800, fontSize: big ? 30 : 22,
        color: clr, letterSpacing: -0.7,
      }}>{amount}</div>
      <div style={{ fontSize: 12, color: sub, marginTop: 3, lineHeight: 1.35 }}>{name}</div>
      {note && (
        <div style={{
          marginTop: 10, padding: '7px 10px', borderRadius: 8,
          background: onDark ? '#10111A' : BRAND.sand,
          fontSize: 10.5, color: sub, fontFamily: FONTS.mono, letterSpacing: 0.3,
        }}>{note}</div>
      )}
    </div>
  );
}

/* ─── Medidor de limite MEI · usa a primitiva de 4 zonas do DS ─ */
function TileGauge({ pct, valor, rest, onDark }) {
  pct = pct == null ? 80 : pct;
  const zoneColor = meterColor(pct);
  const bg  = onDark ? '#242530' : BRAND.sand;
  const brd = onDark ? '1px solid rgba(255,255,255,0.10)' : `1px solid ${BRAND.sandDeep}`;
  const clr = onDark ? '#DCDDE6' : BRAND.ink;
  const sub = onDark ? '#84858F' : BRAND.inkSoft;
  return (
    <div style={{ background: bg, borderRadius: 12, padding: 14, border: brd }}>
      <Mono color={sub}>Limite MEI · 2026</Mono>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '7px 0 8px', gap: 8 }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 22, color: clr, letterSpacing: -0.6, whiteSpace: 'nowrap' }}>
          R$ {valor || '64.800'}
        </div>
        <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}><Mono color={zoneColor} size={10.5}>{pct}% do teto</Mono></span>
      </div>
      <MeterDS pct={pct} height={9} track={onDark ? '#10111A' : BRAND.creamDeep}/>
      <div style={{ fontSize: 11.5, color: sub, marginTop: 8 }}>
        Faltam R$ {rest || '16.200'} pro teto anual
      </div>
    </div>
  );
}

/* ─── Calendário de recorrência ────────────────────────── */
function TileCalendar({ highlightDay, label, onDark }) {
  highlightDay = highlightDay || 5;
  const offset = 1;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const bg  = onDark ? '#242530' : '#fff';
  const brd = onDark ? '1px solid rgba(255,255,255,0.10)' : `1px solid ${BRAND.sandDeep}`;
  const clr = onDark ? '#DCDDE6' : BRAND.ink;
  const sub = onDark ? '#84858F' : BRAND.inkSoft;
  return (
    <div style={{ background: bg, borderRadius: 12, padding: '12px 14px', border: brd }}>
      <Mono color={sub}>Junho 2026</Mono>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginTop: 9 }}>
        {['D','S','T','Q','Q','S','S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 8.5, fontWeight: 700, color: sub, paddingBottom: 3 }}>{d}</div>
        ))}
        {Array.from({ length: offset }).map((_, i) => <div key={'e' + i}/>)}
        {days.map(d => {
          const isHL = d === highlightDay;
          const isPast = d < highlightDay;
          return (
            <div key={d} style={{
              textAlign: 'center', fontSize: 10, padding: '4px 2px', borderRadius: 5,
              background: isHL ? BRAND.coral : 'transparent',
              color: isHL ? '#fff' : isPast ? (onDark ? '#53555E' : '#9D9EA5') : clr,
              fontWeight: isHL ? 700 : 400,
              opacity: d > 14 ? 0.3 : 1,
            }}>{d}</div>
          );
        })}
      </div>
      {label && (
        <div style={{
          marginTop: 10, padding: '6px 10px', borderRadius: 8,
          background: BRAND.coralSoft, fontSize: 10.5, color: BRAND.coralDeep,
          fontFamily: FONTS.mono, fontWeight: 700, letterSpacing: 0.3, textAlign: 'center',
        }}>{label}</div>
      )}
    </div>
  );
}

/* ─── Boleto / lembrete do DAS ─────────────────────────── */
function TileDAS({ onDark }) {
  const bg  = onDark ? '#242530' : BRAND.sand;
  const brd = onDark ? '1px solid rgba(255,255,255,0.10)' : `1px solid ${BRAND.sandDeep}`;
  const clr = onDark ? '#DCDDE6' : BRAND.ink;
  const sub = onDark ? '#84858F' : BRAND.inkSoft;
  return (
    <div style={{ background: bg, borderRadius: 12, padding: 14, border: brd }}>
      <Mono color={sub}>DAS · novembro 2026</Mono>
      <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 24, color: clr, letterSpacing: -0.6, marginTop: 6 }}>
        R$ 75,90
      </div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6,
        fontSize: 12, color: BRAND.coralDeep, fontWeight: 600,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: BRAND.coral }}/>
        Vence dia 20 · em 7 dias
      </div>
    </div>
  );
}

/* ─── Lista de clientes memorizados ────────────────────── */
function TileClientes({ onDark }) {
  const clientes = [
    { name: 'Clínica Dra. Marina', meta: 'CNPJ ••87', valor: 'R$ 480' },
    { name: 'Studio Beatriz',      meta: 'CNPJ ••03', valor: 'R$ 720' },
    { name: 'Lucas Dev',           meta: 'CPF ••11',  valor: 'R$ 900' },
  ];
  const bg  = onDark ? '#242530' : '#fff';
  const brd = onDark ? '1px solid rgba(255,255,255,0.10)' : `1px solid ${BRAND.sandDeep}`;
  const clr = onDark ? '#DCDDE6' : BRAND.ink;
  const sub = onDark ? '#84858F' : BRAND.inkSoft;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {clientes.map((c, i) => (
        <div key={i} style={{
          background: bg, borderRadius: 10, padding: '10px 12px', border: brd,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
            <span style={{ fontSize: 12.5, color: clr, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</span>
            <Mono color={sub} size={9}>{c.meta}</Mono>
          </div>
          <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: sub, fontWeight: 600, flexShrink: 0, paddingLeft: 8 }}>{c.valor}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Portal caiu vs. SimplesMEI funcionando ───────────── */
function TilePortal({ stack }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: stack ? '1fr' : '1fr 1fr', gap: 12 }}>
      {/* Portal com erro */}
      <div style={{
        background: '#242530', borderRadius: 12, padding: 13,
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <span style={{ whiteSpace: 'nowrap' }}><Mono color="#84858F">portal da prefeitura</Mono></span>
        <div style={{
          marginTop: 9, padding: '10px 12px', borderRadius: 8,
          background: '#10111A',
          fontSize: 11.5, color: '#E8556A',
          fontFamily: FONTS.mono, lineHeight: 1.5,
        }}>
          ⚠ Serviço indisponível.<br/>
          <span style={{ opacity: 0.55, fontSize: 10 }}>Tente mais tarde.</span>
        </div>
      </div>
      {/* SimplesMEI funcionando */}
      <div style={{
        background: '#242530', borderRadius: 12, padding: 13,
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <span style={{ whiteSpace: 'nowrap' }}><Mono color={BRAND.mintDeep}>SimplesMEI · ativo</Mono></span>
        <div style={{
          marginTop: 9, padding: '10px 12px', borderRadius: 8,
          background: '#10111A',
          fontSize: 11.5, color: '#9D9EA5', lineHeight: 1.45,
        }}>
          Emite direto.<br/>
          <span style={{ color: BRAND.mintDeep, fontWeight: 600 }}>Sem passar pelo portal.</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Snippet de conversa pronta (estático) ────────────── */
function TileChatEmissao({ onDark }) {
  return (
    <ChatPanel onDark={onDark}>
      <ChatLine from="user" onDark={onDark}>nota de R$ 480 pra Marina</ChatLine>
      <ChatLine from="bot" onDark={onDark}>É pra Clínica Dra. Marina (CNPJ ••87)? Confirma?</ChatLine>
      <TileRecibo name="Clínica Dra. Marina · design" amount="R$ 480,00" number="00482" onDark={onDark}/>
    </ChatPanel>
  );
}

export { Mono, ChatLine, ChatPanel, TileRecibo, TileGauge, TileCalendar, TileDAS, TileClientes, TilePortal, TileChatEmissao };

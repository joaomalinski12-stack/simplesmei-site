import React from 'react';

/* SimplesMEI — Brand tokens & shared primitives */

/* Tokens da marca — hex EXATOS do design system (fonte: design-system/foundations/cores.html,
   derivados de _OKLCH em card_render.py). Não inventar cor: usar token. */
const BRAND = {
  // Coral — marca e ação
  coral:     '#F87453',
  coralDeep: '#C13E2E',
  coralSoft: '#FFDDD2',
  // Mint — sucesso (NÃO é o verde do WhatsApp)
  mint:      '#56D1A3',
  mintDeep:  '#008966',
  mintSoft:  '#D7F8E8',
  // Amber — lembrete, nunca alarme
  amber:     '#EB881F',
  amberDeep: '#C85D00',
  amberText: '#DBAD81',
  // Red — crítico, com parcimônia
  red:       '#D41F37',
  redSoft:   '#FFDCDB',
  // Ink — texto e superfície escura
  ink:       '#10111A',
  inkPanel:  '#242530',
  inkSoft:   '#53555E',
  inkMid:    '#84858F',
  inkMute:   '#9D9EA5',
  inkLine:   '#DCDDE6',
  // Neutros claros — papel e creme
  paper:     '#FCFAF6',
  cream:     '#EFEAE2',
  creamDeep: '#E1DACE',
  white:     '#FFFFFF',
  // Aliases legados → apontam pros tokens do DS (não usar em código novo)
  sand:      '#EFEAE2',   // = cream
  sandDeep:  '#E1DACE',   // = creamDeep
  warn:      '#EB881F',   // = amber (lembrete do limite)
  ink95:     '#10111A',   // = ink
};

const FONTS = {
  display: '"Bricolage Grotesque", system-ui, sans-serif',
  body: '"Manrope", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

/* Breakpoint único: < 768px = mobile. Hook reativo (matchMedia) pra
   ramificar layout em JS, já que o site é todo inline-style. */
/* layout-effect isomórfico: useLayoutEffect no cliente (corrige o layout antes do
   paint, sem flash), useEffect no servidor (evita warning no SSR). */
const useIsoLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function useIsMobile(bp = 768) {
  const q = `(max-width: ${bp - 0.02}px)`;
  // Inicial determinístico (false = desktop) pra casar com o HTML pré-renderizado
  // (servidor não tem window). O layout-effect abaixo corrige pro valor real no cliente.
  const [m, setM] = React.useState(false);
  useIsoLayoutEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on));
  }, [q]);
  return m;
}

/* -----------------------------------------------------------
   Phone frame — original chrome (não é uma cópia do WhatsApp)
   ----------------------------------------------------------- */
function PhoneFrame({ children, statusTime = '09:41', bg = '#0e1011', notch = true, scale = 1 }) {
  const w = 390, h = 780;
  return (
    <div style={{
      width: w * scale, height: h * scale,
      position: 'relative',
    }}>
      <div style={{
        width: w, height: h,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        position: 'absolute', top: 0, left: 0,
        background: bg,
        borderRadius: 42,
        padding: 11,
        boxShadow: '0 30px 60px -25px rgba(16,17,26,0.35), 0 6px 0 #10111A inset',
        border: '1.5px solid rgba(255,255,255,0.12)',
      }}>
        <div style={{
          position: 'relative',
          width: '100%', height: '100%',
          background: '#fff',
          borderRadius: 32,
          overflow: 'hidden',
          fontFamily: FONTS.body,
          color: BRAND.ink,
        }}>
          {/* Status bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 28px 0 28px',
            fontSize: 14, fontWeight: 600, color: BRAND.ink,
            zIndex: 10, pointerEvents: 'none',
          }}>
            <span>{statusTime}</span>
            {notch && (
              <div style={{
                position: 'absolute', left: '50%', top: 8,
                transform: 'translateX(-50%)',
                width: 110, height: 30, background: '#000', borderRadius: 20,
              }} />
            )}
            <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              {/* signal */}
              <svg width="17" height="11" viewBox="0 0 17 11"><g fill="currentColor">
                <rect x="0" y="7" width="3" height="4" rx="0.5"/>
                <rect x="4.5" y="5" width="3" height="6" rx="0.5"/>
                <rect x="9" y="2.5" width="3" height="8.5" rx="0.5"/>
                <rect x="13.5" y="0" width="3" height="11" rx="0.5"/>
              </g></svg>
              {/* battery */}
              <svg width="26" height="12" viewBox="0 0 26 12">
                <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" fill="none" stroke="currentColor" strokeOpacity="0.4"/>
                <rect x="2" y="2" width="14" height="8" rx="1" fill="currentColor"/>
                <rect x="23.5" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.4"/>
              </svg>
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   Chat shell — header + scrolling area + composer
   ----------------------------------------------------------- */
function ChatShell({ title = 'SimplesMEI', subtitle = 'online', children, accent = BRAND.coral, hideComposer = false }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      background: BRAND.sand,
    }}>
      {/* Header */}
      <div style={{
        paddingTop: 52, paddingBottom: 12, paddingLeft: 16, paddingRight: 16,
        background: '#fff',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid #E1DACE',
        flexShrink: 0,
      }}>
        <button style={{
          background: 'transparent', border: 'none', padding: 0,
          color: BRAND.ink, fontSize: 22, lineHeight: 1, cursor: 'pointer',
        }}>‹</button>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent}, ${BRAND.coralDeep})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontFamily: FONTS.display, fontSize: 13, letterSpacing: -0.5,
        }}>Sm<span style={{ color: BRAND.mint }}>.</span></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: BRAND.ink, lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 11.5, color: BRAND.mintDeep, lineHeight: 1.2, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, background: BRAND.mintDeep, borderRadius: '50%', display: 'inline-block' }}/>
            {subtitle}
          </div>
        </div>
        <span style={{ color: BRAND.inkSoft, opacity: 0.5, fontSize: 18 }}>⋮</span>
      </div>

      {/* Messages area */}
      <div style={{
        flex: 1, overflow: 'hidden',
        padding: '14px 12px',
        display: 'flex', flexDirection: 'column', gap: 8,
        backgroundImage: 'radial-gradient(#E1DACE 1px, transparent 1px)',
        backgroundSize: '18px 18px',
        backgroundColor: BRAND.sand,
      }}>
        {children}
      </div>

      {/* Composer */}
      {!hideComposer && (
        <div style={{
          padding: '10px 12px 16px',
          background: '#fff',
          borderTop: '1px solid #E1DACE',
          display: 'flex', alignItems: 'center', gap: 8,
          flexShrink: 0,
        }}>
          <div style={{
            flex: 1,
            background: BRAND.sand,
            borderRadius: 20,
            padding: '10px 14px',
            fontSize: 14, color: BRAND.inkSoft, opacity: 0.55,
          }}>Mensagem</div>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: accent, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700,
          }}>→</div>
        </div>
      )}
    </div>
  );
}

/* Chat bubble — bot or user */
function Bubble({ from = 'bot', children, time, tail = true, style: extra = {} }) {
  const isUser = from === 'user';
  return (
    <div style={{
      display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
      paddingLeft: isUser ? 40 : 0, paddingRight: isUser ? 0 : 40,
      marginTop: tail ? 4 : 1,
    }}>
      <div style={{
        background: isUser ? BRAND.coral : '#fff',
        color: isUser ? '#fff' : BRAND.ink,
        padding: '8px 12px 6px',
        borderRadius: 14,
        borderTopLeftRadius: !isUser && tail ? 4 : 14,
        borderTopRightRadius: isUser && tail ? 4 : 14,
        fontSize: 13.5, lineHeight: 1.4,
        maxWidth: '85%',
        boxShadow: '0 1px 1px rgba(16,17,26,0.06)',
        position: 'relative',
        ...extra,
      }}>
        <div style={{ whiteSpace: 'pre-wrap' }}>{children}</div>
        {time && (
          <div style={{
            fontSize: 9.5, opacity: 0.55, marginTop: 2,
            textAlign: 'right',
            color: isUser ? '#fff' : BRAND.inkSoft,
          }}>{time}{isUser && ' ✓✓'}</div>
        )}
      </div>
    </div>
  );
}

/* CTA / reply button — list reply or quick reply */
function ReplyButton({ children, full, onClick, icon }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: full ? 'stretch' : 'flex-end',
      paddingLeft: full ? 0 : 40,
    }}>
      <button style={{
        background: '#fff',
        color: BRAND.coralDeep,
        border: `1px solid ${BRAND.coralSoft}`,
        padding: '10px 14px',
        borderRadius: 12,
        fontSize: 13, fontWeight: 600,
        width: full ? '100%' : 'auto',
        cursor: 'pointer',
        fontFamily: FONTS.body,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        {icon}
        {children}
      </button>
    </div>
  );
}

/* List message — interactive list */
function ListMessage({ title, subtitle, options = [], time }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, borderTopLeftRadius: 4,
      maxWidth: '85%', overflow: 'hidden',
      boxShadow: '0 1px 1px rgba(16,17,26,0.06)',
      fontSize: 13.5,
    }}>
      <div style={{ padding: '10px 12px 6px' }}>
        <div style={{ fontWeight: 700, color: BRAND.ink, marginBottom: 2 }}>{title}</div>
        <div style={{ color: BRAND.inkSoft, fontSize: 12.5, lineHeight: 1.4 }}>{subtitle}</div>
        {time && <div style={{ fontSize: 9.5, color: BRAND.inkSoft, marginTop: 4, textAlign: 'right' }}>{time}</div>}
      </div>
      <div style={{ borderTop: '1px solid #E1DACE' }}>
        {options.map((opt, i) => (
          <div key={i} style={{
            padding: '12px 14px',
            borderBottom: i < options.length - 1 ? '1px solid #E1DACE' : 'none',
            color: BRAND.coralDeep,
            fontWeight: 600, fontSize: 13,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span>{opt}</span>
            <span style={{ color: BRAND.coral }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* CTA card — green "open flow" type message */
function FlowCard({ icon = '📋', title, body, cta, accent = BRAND.coral, time, image }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, borderTopLeftRadius: 4,
      maxWidth: '88%', overflow: 'hidden',
      boxShadow: '0 1px 1px rgba(16,17,26,0.06)',
    }}>
      {image && (
        <div style={{
          height: 110,
          background: `linear-gradient(135deg, ${BRAND.coralSoft}, ${BRAND.mintSoft})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 44, fontFamily: FONTS.display,
        }}>{image}</div>
      )}
      <div style={{ padding: '12px 14px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: BRAND.coralSoft, color: BRAND.coralDeep,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
          }}>{icon}</div>
          <div style={{ fontWeight: 700, color: BRAND.ink, fontSize: 13.5 }}>{title}</div>
        </div>
        <div style={{ color: BRAND.inkSoft, fontSize: 12.5, lineHeight: 1.45 }}>{body}</div>
        {time && <div style={{ fontSize: 9.5, color: BRAND.inkSoft, marginTop: 6, textAlign: 'right' }}>{time}</div>}
      </div>
      <div style={{
        padding: '12px 14px', borderTop: '1px solid #E1DACE',
        color: accent, textAlign: 'center', fontWeight: 700, fontSize: 13,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      }}>
        <span style={{ fontSize: 14 }}>↗</span> {cta}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   Flow modal — full-screen native form (WhatsApp Flows)
   ----------------------------------------------------------- */
function FlowScreen({ title = 'SimplesMEI', step, totalSteps, children, footer, onBack = true, statusTime = '09:41' }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#fff',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* header */}
      <div style={{
        paddingTop: 52, padding: '52px 18px 14px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid #E1DACE',
        background: '#fff',
      }}>
        {onBack && (
          <button style={{
            background: 'transparent', border: 'none', padding: 0,
            color: BRAND.ink, fontSize: 18, fontWeight: 700, cursor: 'pointer',
          }}>✕</button>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: BRAND.ink }}>{title}</div>
          {step !== undefined && (
            <div style={{ fontSize: 11, color: BRAND.inkSoft, marginTop: 2 }}>
              Etapa {step} de {totalSteps}
            </div>
          )}
        </div>
        {step !== undefined && (
          <div style={{ display: 'flex', gap: 3 }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{
                width: 18, height: 4, borderRadius: 2,
                background: i < step ? BRAND.coral : BRAND.sandDeep,
              }}/>
            ))}
          </div>
        )}
      </div>

      {/* body */}
      <div style={{
        flex: 1, overflow: 'hidden',
        padding: '20px 20px 14px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        {children}
      </div>

      {/* footer */}
      {footer && (
        <div style={{
          padding: '12px 16px 24px',
          borderTop: '1px solid #E1DACE',
          background: '#fff',
        }}>
          {footer}
        </div>
      )}
    </div>
  );
}

function FlowField({ label, value, placeholder, hint, status, prefix }) {
  const filled = !!value;
  const statusColor =
    status === 'ok' ? BRAND.mintDeep :
    status === 'warn' ? BRAND.warn :
    BRAND.inkSoft;
  return (
    <div>
      <div style={{
        fontSize: 11.5, fontWeight: 600, color: BRAND.inkSoft,
        textTransform: 'uppercase', letterSpacing: 0.4,
        marginBottom: 6,
      }}>{label}</div>
      <div style={{
        border: `1.5px solid ${filled ? BRAND.ink : BRAND.sandDeep}`,
        borderRadius: 10,
        padding: '12px 14px',
        background: filled ? '#fff' : BRAND.sand,
        fontSize: 15, color: filled ? BRAND.ink : BRAND.inkSoft,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        {prefix && <span style={{ color: BRAND.inkSoft, fontWeight: 500 }}>{prefix}</span>}
        <span style={{ flex: 1, fontWeight: filled ? 600 : 400 }}>{filled ? value : placeholder}</span>
        {status === 'ok' && <span style={{ color: BRAND.mintDeep, fontSize: 14 }}>✓</span>}
      </div>
      {hint && (
        <div style={{ fontSize: 11.5, color: statusColor, marginTop: 6, fontWeight: status ? 600 : 400 }}>{hint}</div>
      )}
    </div>
  );
}

function FlowPrimary({ children, disabled, accent = BRAND.coral }) {
  return (
    <button disabled={disabled} style={{
      width: '100%',
      background: disabled ? BRAND.sandDeep : accent,
      color: '#fff',
      border: 'none',
      borderRadius: 14,
      padding: '15px',
      fontSize: 15, fontWeight: 700,
      fontFamily: FONTS.body,
      cursor: 'pointer',
      letterSpacing: 0.1,
    }}>{children}</button>
  );
}

function FlowSecondary({ children }) {
  return (
    <button style={{
      width: '100%',
      background: 'transparent',
      color: BRAND.coralDeep,
      border: 'none',
      padding: '12px',
      fontSize: 13.5, fontWeight: 600,
      fontFamily: FONTS.body,
      cursor: 'pointer',
      marginTop: 4,
    }}>{children}</button>
  );
}

/* Section header in flow body */
function FlowHeading({ title, sub }) {
  return (
    <div>
      <div style={{
        fontFamily: FONTS.display, fontWeight: 700,
        fontSize: 22, color: BRAND.ink, lineHeight: 1.15,
      }}>{title}</div>
      {sub && <div style={{ marginTop: 6, fontSize: 13.5, color: BRAND.inkSoft, lineHeight: 1.5 }}>{sub}</div>}
    </div>
  );
}

/* Pill / chip */
function Pill({ children, color = BRAND.coral, soft }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: soft ? BRAND.coralSoft : color,
      color: soft ? BRAND.coralDeep : '#fff',
      padding: '3px 9px',
      borderRadius: 999,
      fontSize: 11, fontWeight: 600,
      fontFamily: FONTS.body,
    }}>{children}</span>
  );
}

/* ─── Medidor de limite MEI · 4 zonas (primitiva do DS) ───────
   Trilho creamDeep · zonas 60% ok / 20% atenção / 16% alto / 4% estouro.
   A cor do preenchimento sobe com o risco: mint → coral → coralDeep → red.
   fonte: design-system/foundations/icones.html */
function meterColor(pct) {
  if (pct >= 96) return BRAND.red;
  if (pct >= 80) return BRAND.coralDeep;
  if (pct >= 60) return BRAND.coral;
  return BRAND.mint;
}
function MeterDS({ pct = 0, height = 14, track = BRAND.creamDeep }) {
  const p = Math.max(0, Math.min(100, pct));
  return (
    <div style={{ position: 'relative', height, borderRadius: height / 2, overflow: 'hidden', background: track }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
        <span style={{ width: '60%', height: '100%', background: BRAND.mintSoft }}/>
        <span style={{ width: '20%', height: '100%', background: BRAND.coralSoft }}/>
        <span style={{ width: '16%', height: '100%', background: BRAND.redSoft }}/>
        <span style={{ width: '4%',  height: '100%', background: BRAND.redSoft }}/>
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: p + '%', borderRadius: height / 2, background: meterColor(p) }}/>
    </div>
  );
}

/* ─── Selo de sucesso · ✓ vetorial (primitiva do DS) ──────────
   3 pontos com cantos arredondados dentro de um selo circular.
   mint = sucesso · coral = ação · contorno = sobre gradiente.
   fonte: design-system/foundations/icones.html */
function CheckSeal({ size = 22, bg = BRAND.mint, stroke = BRAND.ink, ring = false }) {
  const s = size, sw = Math.max(2, size * 0.13);
  return (
    <span style={{
      width: s, height: s, borderRadius: '50%', flexShrink: 0,
      background: ring ? 'transparent' : bg,
      border: ring ? `${Math.max(2, size * 0.11)}px solid ${stroke}` : 'none',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width={s * 0.6} height={s * 0.6} viewBox="0 0 34 34">
        <polyline points="7,18 14,25 27,9" fill="none" stroke={stroke}
          strokeWidth={sw * 34 / s} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

export { BRAND, FONTS, useIsMobile, PhoneFrame, ChatShell, Bubble, ReplyButton, ListMessage, FlowCard, FlowScreen, FlowField, FlowPrimary, FlowSecondary, FlowHeading, Pill, meterColor, MeterDS, CheckSeal };

import React from 'react';
import { BRAND, Bubble, ChatShell, CheckSeal, FONTS, FlowCard, MeterDS, PhoneFrame, meterColor, useIsMobile } from './tokens.jsx';

/* SimplesMEI — Landing shared building blocks */

/* ─────────────────────────────────────────────
   Logo lockup
   ───────────────────────────────────────────── */
function Logo({ size = 28, inverted = false }) {
  const color = inverted ? '#fff' : BRAND.ink;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: size + 6, height: size + 6, borderRadius: (size + 6) * 0.23,
        background: `linear-gradient(150deg, ${BRAND.coral}, ${BRAND.coralDeep})`,
        color: '#fff', fontFamily: FONTS.display, fontWeight: 800,
        fontSize: size * 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
        letterSpacing: -1, boxShadow: '0 4px 14px rgba(193,62,46,0.28)',
      }}>Sm<span style={{ color: BRAND.mint }}>.</span></div>
      <div style={{
        fontFamily: FONTS.body, fontWeight: 800, fontSize: size * 0.78,
        letterSpacing: -0.6, color,
      }}>Simples<span style={{ color: BRAND.coral }}>MEI</span></div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Nav bar
   ───────────────────────────────────────────── */
function NavBar({ inverted, links = ['Como funciona', 'Preço', 'Segurança', 'Sobre'] }) {
  const txt = inverted ? '#DCDDE6' : BRAND.ink;
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '22px 56px', borderBottom: `1px solid ${inverted ? 'rgba(255,255,255,0.10)' : BRAND.sandDeep}`,
    }}>
      <Logo inverted={inverted} size={26}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {links.map(l => (
          <a key={l} style={{
            fontSize: 13.5, fontWeight: 500, color: txt, textDecoration: 'none',
            fontFamily: FONTS.body, opacity: 0.85,
          }}>{l}</a>
        ))}
      </div>
      <button style={{
        background: BRAND.coral, color: '#fff', border: 'none',
        padding: '11px 18px', borderRadius: 10,
        fontFamily: FONTS.body, fontWeight: 700, fontSize: 13.5,
        display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
      }}>
        <WhatsAppIcon size={16}/>
        Abrir no WhatsApp
      </button>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   WhatsApp icon (generic — not branded copy)
   ───────────────────────────────────────────── */
function WhatsAppIcon({ size = 18, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a9 9 0 0 0-7.7 13.7L3 21l4.5-1.2A9 9 0 1 0 12 3Zm5.2 12.7c-.2.6-1.2 1.1-1.7 1.2-.5.1-1 .1-3.2-.7-2.7-1-4.4-3.8-4.6-4-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9 1-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6-.1.2-.2.3-.4.5-.2.2-.3.3-.5.5-.2.1-.3.3-.1.6.1.3.7 1.1 1.4 1.8.9.9 1.7 1.2 2 1.3.2.1.4.1.5-.1l.7-.9c.2-.3.4-.2.6-.1l1.8.9c.3.1.5.2.6.4 0 .2 0 .8-.2 1.4Z"
        fill={color}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Primary CTA — opens WhatsApp
   ───────────────────────────────────────────── */
function CTA({ children = 'Testar 14 dias grátis', size = 'lg', variant = 'coral', sub }) {
  const sizes = {
    md: { pad: '14px 22px', font: 14.5 },
    lg: { pad: '18px 28px', font: 16 },
    xl: { pad: '22px 34px', font: 17 },
  };
  const s = sizes[size];
  const bg = variant === 'ink' ? BRAND.ink : BRAND.coral;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 10 }}>
      <button style={{
        background: bg, color: '#fff', border: 'none',
        padding: s.pad, borderRadius: 14,
        fontFamily: FONTS.body, fontWeight: 700, fontSize: s.font,
        display: 'inline-flex', alignItems: 'center', gap: 12, cursor: 'pointer',
        boxShadow: variant === 'coral'
          ? '0 12px 28px -10px rgba(248,116,83,0.50), 0 2px 0 #C13E2E inset'
          : '0 12px 28px -10px rgba(16,17,26,0.40)',
        letterSpacing: -0.1,
      }}>
        <WhatsAppIcon size={20}/>
        {children}
        <span style={{ opacity: 0.7, fontWeight: 500 }}>→</span>
      </button>
      {sub && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, color: BRAND.inkSoft, fontFamily: FONTS.body,
        }}>
          <LockIcon size={12}/> {sub}
        </div>
      )}
    </div>
  );
}

function LockIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 7V5a4 4 0 0 1 8 0v2m-9 0h10v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z" stroke={color} strokeWidth="1.4"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Animated chat preview — for hero
   Loops through a scripted conversation.
   ───────────────────────────────────────────── */
const DEFAULT_SCRIPT = [
  { from: 'user', text: 'emite uma nota de R$ 480 pra Marina', delay: 0 },
  { from: 'bot', text: 'Boa! É pra Clínica Dra. Marina (CNPJ ••87)?', delay: 1200 },
  { from: 'user', text: 'isso', delay: 2700 },
  { from: 'bot', text: 'Confirma os dados num formulário rápido?', delay: 3600 },
  { from: 'flow', text: 'Dados da nota · R$ 480,00 · serviço de design', delay: 4800 },
  { from: 'bot', text: 'Pronto ✓ Nota emitida e enviada pra ela.', delay: 6800 },
];

function AnimatedChat({ script = DEFAULT_SCRIPT, scale = 1, statusTime = '09:41' }) {
  const [shown, setShown] = React.useState(0);
  const [typing, setTyping] = React.useState(false);

  React.useEffect(() => {
    let timers = [];
    const run = () => {
      setShown(0);
      script.forEach((msg, i) => {
        // typing dots ~600ms before bot messages
        if (msg.from === 'bot' && i > 0) {
          timers.push(setTimeout(() => setTyping(true), msg.delay - 600));
        }
        timers.push(setTimeout(() => {
          setTyping(false);
          setShown(i + 1);
        }, msg.delay));
      });
      // loop
      timers.push(setTimeout(run, script[script.length - 1].delay + 3500));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <PhoneFrame scale={scale} statusTime={statusTime}>
      <ChatShell title="SimplesMEI" subtitle="online">
        {script.slice(0, shown).map((msg, i) => (
          <FadeIn key={i}>
            {msg.from === 'flow' ? (
              <FlowCard
                icon="📋"
                title="Dados da nota"
                body={msg.text}
                cta="Abrir formulário"
              />
            ) : (
              <Bubble from={msg.from} time={msg.from === 'user' ? '9:41' : '9:41'}>
                {msg.text}
              </Bubble>
            )}
          </FadeIn>
        ))}
        {typing && (
          <FadeIn>
            <div style={{
              alignSelf: 'flex-start',
              background: '#fff', padding: '10px 14px', borderRadius: 14,
              borderTopLeftRadius: 4,
              display: 'flex', gap: 4, alignItems: 'center',
              boxShadow: '0 1px 1px rgba(16,17,26,0.06)',
            }}>
              <Dot delay={0}/><Dot delay={150}/><Dot delay={300}/>
            </div>
          </FadeIn>
        )}
      </ChatShell>
    </PhoneFrame>
  );
}

function Dot({ delay }) {
  return (
    <span style={{
      width: 6, height: 6, borderRadius: '50%', background: BRAND.inkSoft, opacity: 0.4,
      animation: `simplesmei-bounce 1s ${delay}ms infinite ease-in-out`,
    }}/>
  );
}

function FadeIn({ children }) {
  return (
    <div style={{ animation: 'simplesmei-fadein 350ms ease both' }}>{children}</div>
  );
}

/* ─────────────────────────────────────────────
   Trust strip — small pills with credentials
   ───────────────────────────────────────────── */
function TrustStrip({ items, inverted, align = 'left' }) {
  const txt = inverted ? '#9D9EA5' : BRAND.inkSoft;
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 22, alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
    }}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12.5, color: txt, fontFamily: FONTS.body, fontWeight: 500,
        }}>
          <span style={{ color: inverted ? BRAND.mint : BRAND.mintDeep, fontSize: 14, lineHeight: 1 }}>✓</span>
          {it}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section eyebrow
   ───────────────────────────────────────────── */
function Eyebrow({ children, color = BRAND.coralDeep }) {
  return (
    <div style={{
      fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700,
      letterSpacing: 1.4, textTransform: 'uppercase', color,
    }}>{children}</div>
  );
}

/* ─────────────────────────────────────────────
   Section title
   ───────────────────────────────────────────── */
function SectionTitle({ children, size = 'lg', inverted, align = 'left' }) {
  const sizes = { md: 32, lg: 44, xl: 56 };
  return (
    <h2 style={{
      fontFamily: FONTS.display, fontWeight: 800,
      fontSize: sizes[size], lineHeight: 1.02, letterSpacing: -1.2,
      color: inverted ? '#fff' : BRAND.ink,
      margin: '12px 0 16px',
      textAlign: align,
      textWrap: 'pretty',
    }}>{children}</h2>
  );
}

/* ─────────────────────────────────────────────
   Pricing block (single plan)
   ───────────────────────────────────────────── */
function PricingBlock({ price = 29.9, original = 49.9, perks = [], variant = 'light' }) {
  const dark = variant === 'dark';
  return (
    <div style={{
      background: dark ? BRAND.ink : '#fff',
      borderRadius: 22,
      padding: 36,
      border: dark ? 'none' : `1px solid ${BRAND.sandDeep}`,
      display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 36, alignItems: 'center',
      boxShadow: dark ? 'none' : '0 24px 60px -32px rgba(16,17,26,0.18)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* decorative coral */}
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%',
        background: dark ? 'rgba(248,116,83,0.15)' : BRAND.coralSoft,
      }}/>
      <div style={{ position: 'relative' }}>
        <Eyebrow color={dark ? BRAND.coral : BRAND.coralDeep}>plano único</Eyebrow>
        <div style={{
          fontFamily: FONTS.display, fontWeight: 800, fontSize: 32, lineHeight: 1.05,
          letterSpacing: -0.8, color: dark ? '#fff' : BRAND.ink, marginTop: 6,
        }}>Tudo incluso, sem pegadinha.</div>
        <p style={{
          margin: '12px 0 0', fontSize: 14, lineHeight: 1.55,
          color: dark ? '#9D9EA5' : BRAND.inkSoft, maxWidth: 360,
        }}>Notas ilimitadas, clientes fixos no automático, abertura do CNPJ. Cancela quando quiser — sem fidelidade.</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
          {perks.map((p, i) => (
            <li key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10,
              fontSize: 13.5, color: dark ? '#DCDDE6' : BRAND.ink,
            }}>
              <span style={{ color: dark ? BRAND.mint : BRAND.mintDeep, fontWeight: 700, marginTop: 1 }}>✓</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        {original && (
          <div style={{
            fontFamily: FONTS.mono, fontSize: 13, color: dark ? '#84858F' : BRAND.inkSoft,
            textDecoration: 'line-through', marginBottom: 4,
          }}>R$ {original.toFixed(2).replace('.', ',')}/mês</div>
        )}
        <div style={{
          fontFamily: FONTS.display, fontWeight: 800,
          fontSize: 86, lineHeight: 0.95, letterSpacing: -3.5,
          color: dark ? '#fff' : BRAND.ink,
          display: 'inline-flex', alignItems: 'flex-start', gap: 4,
        }}>
          <span style={{ fontSize: 28, marginTop: 14, letterSpacing: 0 }}>R$</span>
          {Math.floor(price)}
          <span style={{ fontSize: 32, marginTop: 14, letterSpacing: -0.5 }}>,{((price % 1) * 100).toFixed(0).padStart(2,'0')}</span>
        </div>
        <div style={{
          fontFamily: FONTS.body, fontSize: 13,
          color: dark ? '#9D9EA5' : BRAND.inkSoft, marginTop: -4, marginBottom: 22,
        }}>por mês · 14 dias grátis</div>
        <CTA size="lg" sub="dados protegidos · LGPD">Testar 14 dias grátis</CTA>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQ
   ───────────────────────────────────────────── */
function FAQ({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {items.map((it, i) => (
        <details key={i} open={i === 0} style={{
          padding: '22px 0', borderTop: `1px solid ${BRAND.sandDeep}`,
          borderBottom: i === items.length - 1 ? `1px solid ${BRAND.sandDeep}` : 'none',
        }}>
          <summary style={{
            fontFamily: FONTS.display, fontWeight: 700, fontSize: 18,
            color: BRAND.ink, cursor: 'pointer', listStyle: 'none',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            {it.q}
            <span style={{ color: BRAND.coral, fontWeight: 400, fontSize: 24 }}>+</span>
          </summary>
          <p style={{
            margin: '12px 0 0', fontSize: 14, lineHeight: 1.6,
            color: BRAND.inkSoft, maxWidth: 720,
          }}>{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Footer
   ───────────────────────────────────────────── */
function Footer() {
  const m = useIsMobile();
  return (
    <footer style={{
      background: BRAND.ink, color: '#9D9EA5',
      padding: m ? '40px 20px 28px' : '48px 56px 32px', fontFamily: FONTS.body, position: 'relative',
    }}>
      <div className="v5-comet-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3 }}/>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : '1.4fr 1fr 1fr 1fr', gap: m ? '28px 20px' : 40, marginBottom: 36 }}>
        <div>
          <Logo inverted size={24}/>
          <p style={{ fontSize: 12.5, lineHeight: 1.6, marginTop: 14, color: '#9D9EA5', maxWidth: 280 }}>
            A contabilidade do MEI dentro do WhatsApp. Sem app, sem planilha, sem dor de cabeça.
          </p>
        </div>
        {[
          { h: 'Produto', l: ['Como funciona', 'Preço', 'Segurança', 'Mudar para Simples'] },
          { h: 'Empresa', l: ['Sobre', 'Imprensa', 'Carreiras', 'Contato'] },
          { h: 'Legal', l: ['Termos de uso', 'Política de privacidade', 'LGPD', 'CNPJ 58.392.104/0001-37'] },
        ].map(col => (
          <div key={col.h}>
            <div style={{
              fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700,
              letterSpacing: 1.2, textTransform: 'uppercase', color: BRAND.coral,
              marginBottom: 14,
            }}>{col.h}</div>
            {col.l.map(l => (
              <div key={l} style={{ fontSize: 13, lineHeight: 1.9, color: '#9D9EA5' }}>{l}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 22,
        display: 'flex', justifyContent: m ? 'flex-start' : 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 11.5,
        color: '#84858F', fontFamily: FONTS.mono, letterSpacing: 0.4,
      }}>
        <span>© 2026 SimplesMEI Tecnologia LTDA · CNPJ 58.392.104/0001-37</span>
        <span>São Paulo · Brasil</span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Placeholder portrait (no fake faces — striped placeholder)
   ───────────────────────────────────────────── */
function Portrait({ size = 64, label, accent = BRAND.coral, round = true }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: round ? '50%' : 12,
      background: `repeating-linear-gradient(135deg, ${BRAND.coralSoft} 0 6px, ${BRAND.sand} 6px 12px)`,
      border: `1.5px solid ${BRAND.sandDeep}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, overflow: 'hidden',
      position: 'relative',
    }}>
      <span style={{
        fontFamily: FONTS.mono, fontSize: 9, color: BRAND.inkSoft,
        textTransform: 'uppercase', letterSpacing: 0.5,
        background: BRAND.paper, padding: '2px 6px', borderRadius: 4,
        border: `1px solid ${BRAND.sandDeep}`,
      }}>{label || 'foto'}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LGPD badge
   ───────────────────────────────────────────── */
function LGPDBadge({ inverted }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '8px 14px', borderRadius: 999,
      background: inverted ? 'rgba(16,17,26,0.50)' : BRAND.paper,
      border: `1px solid ${inverted ? 'rgba(255,255,255,0.12)' : BRAND.sandDeep}`,
      fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700,
      letterSpacing: 0.8, textTransform: 'uppercase',
      color: inverted ? '#DCDDE6' : BRAND.inkSoft,
    }}>
      <LockIcon size={11} color={inverted ? BRAND.mint : BRAND.mintDeep}/>
      Dados protegidos · LGPD
    </div>
  );
}

/* ─────────────────────────────────────────────
   Global keyframes injection
   ───────────────────────────────────────────── */
(function injectKeyframes() {
  if (document.getElementById('simplesmei-keyframes')) return;
  const style = document.createElement('style');
  style.id = 'simplesmei-keyframes';
  style.textContent = `
    @keyframes simplesmei-fadein {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes simplesmei-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-4px); opacity: 0.9; }
    }
  `;
  document.head.appendChild(style);
})();

/* ─────────────────────────────────────────────
   Multi-scenario animated chat — rotates through several
   conversations to show different bot capabilities.
   ───────────────────────────────────────────── */
const SCENARIOS = [
  {
    id: 'emissao',
    label: 'Emitir uma NFS-e',
    sub: 'O caso de uso principal',
    script: [
      { from: 'user', text: 'emite uma nota de R$ 480 pra Marina', delay: 700 },
      { from: 'bot', text: 'Boa! É pra Clínica Dra. Marina (CNPJ ••87)?', delay: 2200 },
      { from: 'user', text: 'isso', delay: 3700 },
      { from: 'bot', text: 'Confirma os dados num formulário?', delay: 4800 },
      { from: 'flow', text: 'R$ 480,00 · serviço de design', delay: 6000 },
      { from: 'bot', text: 'Pronto ✓ NFS-e 00482 emitida e enviada.', delay: 8200 },
    ],
    loopDelay: 2800,
  },
  {
    id: 'limite',
    label: 'Acompanhar limite MEI',
    sub: 'Avisos proativos antes do teto',
    script: [
      { from: 'bot', text: 'Oi Ana 👋 você bateu R$ 64.800 esse ano — 80% do teto MEI.', delay: 700 },
      { from: 'gauge', text: '', delay: 2400 },
      { from: 'bot', text: 'A cada R$ 1.000 daqui pra frente eu te aviso. Tá tudo certo, sem susto no fim do ano.', delay: 4000 },
      { from: 'user', text: 'valeu', delay: 6000 },
      { from: 'bot', text: 'Tô de olho 👀', delay: 7200 },
    ],
    loopDelay: 2800,
  },
  {
    id: 'recorrencia',
    label: 'Recorrência automática',
    sub: 'Notas saem sozinhas todo mês',
    script: [
      { from: 'bot', text: '🌙 Saiu enquanto você dormia.', delay: 700 },
      { from: 'receipt', text: '', delay: 2000 },
      { from: 'user', text: 'show', delay: 4000 },
      { from: 'bot', text: 'Próxima sai dia 10. Posso emitir a do Lucas também?', delay: 5200 },
      { from: 'user', text: 'pode', delay: 7000 },
      { from: 'bot', text: 'Anotado ✓', delay: 8000 },
    ],
    loopDelay: 2800,
  },
  {
    id: 'abertura',
    label: 'Abrir CNPJ MEI',
    sub: 'Pra quem ainda não tem CNPJ',
    script: [
      { from: 'user', text: 'ainda não tenho cnpj, dá pra abrir aí?', delay: 700 },
      { from: 'bot', text: 'Dá sim 👍 Me conta o que você faz, em uma frase.', delay: 2200 },
      { from: 'user', text: 'faço bolo por encomenda', delay: 4000 },
      { from: 'bot', text: 'Achei 3 CNAEs que combinam. Qual te descreve melhor?', delay: 5400 },
      { from: 'cnaeoptions', text: '', delay: 6800 },
      { from: 'user', text: 'a primeira', delay: 9000 },
      { from: 'bot', text: 'Beleza, vou te guiar no gov.br pra abrir agora 🚀', delay: 10200 },
    ],
    loopDelay: 2800,
  },
];

function MultiScenarioChat({ scale = 1 }) {
  const [scenarioIdx, setScenarioIdx] = React.useState(0);
  const [shown, setShown] = React.useState(0);
  const [typing, setTyping] = React.useState(false);
  const scenario = SCENARIOS[scenarioIdx];

  React.useEffect(() => {
    let timers = [];
    setShown(0);
    setTyping(false);
    scenario.script.forEach((msg, i) => {
      if ((msg.from === 'bot' || msg.from === 'renata') && i > 0) {
        timers.push(setTimeout(() => setTyping(true), msg.delay - 700));
      }
      timers.push(setTimeout(() => {
        setTyping(false);
        setShown(i + 1);
      }, msg.delay));
    });
    const total = scenario.script[scenario.script.length - 1].delay + scenario.loopDelay;
    const advance = setTimeout(() => {
      setScenarioIdx((idx) => (idx + 1) % SCENARIOS.length);
    }, total);
    timers.push(advance);
    return () => timers.forEach(clearTimeout);
  }, [scenarioIdx]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
    }}>
      {/* Scenario tabs */}
      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center',
        maxWidth: 720,
      }}>
        {SCENARIOS.map((s, i) => {
          const active = i === scenarioIdx;
          return (
            <button
              key={s.id}
              onClick={() => setScenarioIdx(i)}
              style={{
                background: active ? BRAND.ink : '#fff',
                color: active ? '#fff' : BRAND.ink,
                border: `1px solid ${active ? BRAND.ink : BRAND.sandDeep}`,
                padding: '10px 16px', borderRadius: 999,
                fontFamily: FONTS.body, fontWeight: 600, fontSize: 13,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                transition: 'all 200ms ease',
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: active ? BRAND.coral : BRAND.sandDeep,
                animation: active ? 'simplesmei-bounce 1.4s infinite' : 'none',
              }}/>
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Phone */}
      <PhoneFrame scale={scale}>
        <ChatShell title="SimplesMEI" subtitle="online">
          {scenario.script.slice(0, shown).map((msg, i) => (
            <FadeIn key={`${scenario.id}-${i}`}>
              {renderScenarioMessage(msg)}
            </FadeIn>
          ))}
          {typing && (
            <FadeIn>
              <div style={{
                alignSelf: 'flex-start',
                background: '#fff', padding: '10px 14px', borderRadius: 14,
                borderTopLeftRadius: 4,
                display: 'flex', gap: 4, alignItems: 'center',
                boxShadow: '0 1px 1px rgba(16,17,26,0.06)',
              }}>
                <Dot delay={0}/><Dot delay={150}/><Dot delay={300}/>
              </div>
            </FadeIn>
          )}
        </ChatShell>
      </PhoneFrame>

      {/* Scenario caption */}
      <div style={{
        fontFamily: FONTS.mono, fontSize: 11.5, color: BRAND.inkSoft,
        letterSpacing: 0.6, textAlign: 'center', maxWidth: 360,
      }}>
        <span style={{ color: BRAND.coralDeep, fontWeight: 700, textTransform: 'uppercase' }}>
          cenário {scenarioIdx + 1}/{SCENARIOS.length}
        </span>
        <span style={{ margin: '0 8px', opacity: 0.5 }}>·</span>
        {scenario.sub}
      </div>
    </div>
  );
}

function renderScenarioMessage(msg) {
  if (msg.from === 'flow') {
    return (
      <FlowCard
        icon="📋"
        title="Dados da nota"
        body={msg.text}
        cta="Abrir formulário"
      />
    );
  }
  if (msg.from === 'gauge') {
    return <ChatGaugeCard percent={80}/>;
  }
  if (msg.from === 'receipt') {
    return <ChatReceiptCard/>;
  }
  if (msg.from === 'handoff') {
    return <ChatHandoffCard/>;
  }
  if (msg.from === 'cnaeoptions') {
    return <ChatCnaeCard/>;
  }
  if (msg.from === 'renata') {
    return <RenataBubble text={msg.text}/>;
  }
  return (
    <Bubble from={msg.from} time="9:41">
      {msg.text}
    </Bubble>
  );
}

/* ─────────────────────────────────────────────
   Inline chat artifacts — for scenarios
   ───────────────────────────────────────────── */
function ChatGaugeCard({ percent = 80 }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, borderTopLeftRadius: 4,
      maxWidth: '85%', padding: 14,
      boxShadow: '0 1px 1px rgba(16,17,26,0.06)',
    }}>
      <div style={{
        fontFamily: FONTS.mono, fontSize: 9.5, fontWeight: 700,
        letterSpacing: 0.6, textTransform: 'uppercase', color: BRAND.inkSoft,
      }}>Limite MEI · 2026</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 4 }}>
        <div style={{
          fontFamily: FONTS.display, fontWeight: 800, fontSize: 20,
          color: BRAND.ink, letterSpacing: -0.5,
        }}>R$ 64.800</div>
        <div style={{
          fontFamily: FONTS.mono, fontSize: 10.5, color: meterColor(percent), fontWeight: 700,
        }}>{percent}% do teto</div>
      </div>
      <div style={{ marginTop: 8 }}>
        <MeterDS pct={percent} height={8}/>
      </div>
      <div style={{
        fontSize: 11, color: BRAND.inkSoft, marginTop: 6,
      }}>Faltam R$ 16.200 pro teto anual</div>
    </div>
  );
}

function ChatReceiptCard() {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, borderTopLeftRadius: 4,
      maxWidth: '85%', padding: 14,
      boxShadow: '0 1px 1px rgba(16,17,26,0.06)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontFamily: FONTS.mono, fontSize: 9.5, fontWeight: 700, letterSpacing: 0.6,
          color: BRAND.mintDeep, textTransform: 'uppercase',
          background: BRAND.mintSoft, padding: '2px 7px 2px 3px', borderRadius: 999,
        }}><CheckSeal size={13}/>Emitida</span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 9.5, color: BRAND.inkSoft }}>NFS-e 00501</span>
      </div>
      <div style={{
        fontFamily: FONTS.display, fontWeight: 800, fontSize: 24,
        color: BRAND.ink, letterSpacing: -0.6, marginTop: 8,
      }}>R$ 720,00</div>
      <div style={{
        fontSize: 11.5, color: BRAND.inkSoft, marginTop: 2,
      }}>Studio Beatriz · recorrência mensal · 05/04</div>
      <div style={{
        marginTop: 10, padding: '6px 10px', borderRadius: 8,
        background: BRAND.sand, fontSize: 10.5, color: BRAND.inkSoft,
        fontFamily: FONTS.mono, letterSpacing: 0.3,
      }}>📩 enviada pro whatsapp do cliente · 04:32</div>
    </div>
  );
}

function ChatHandoffCard() {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, borderTopLeftRadius: 4,
      maxWidth: '85%', padding: 12,
      boxShadow: '0 1px 1px rgba(16,17,26,0.06)',
      border: `1px solid ${BRAND.sandDeep}`,
    }}>
      <div style={{
        fontFamily: FONTS.mono, fontSize: 9.5, fontWeight: 700,
        letterSpacing: 0.6, color: BRAND.coralDeep, textTransform: 'uppercase',
        marginBottom: 8,
      }}>Encaminhado · humano</div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Portrait size={32} label="r"/>
        <div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 13, lineHeight: 1.1 }}>Renata Brito</div>
          <div style={{ fontSize: 11, color: BRAND.mintDeep, fontFamily: FONTS.mono, marginTop: 2, fontWeight: 600 }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: BRAND.mintDeep, marginRight: 6 }}/>
            CRC-SP · online agora
          </div>
        </div>
      </div>
    </div>
  );
}

function RenataBubble({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
      <Portrait size={26} label="r"/>
      <div style={{
        background: '#fff', padding: '8px 12px', borderRadius: 14,
        borderTopLeftRadius: 4,
        fontSize: 13.5, lineHeight: 1.4, maxWidth: '78%',
        boxShadow: '0 1px 1px rgba(16,17,26,0.06)',
        border: `1.5px solid ${BRAND.mintSoft}`,
      }}>
        <div style={{
          fontFamily: FONTS.mono, fontSize: 9, fontWeight: 700,
          color: BRAND.mintDeep, letterSpacing: 0.6, marginBottom: 2,
        }}>RENATA · CONTADORA</div>
        {text}
      </div>
    </div>
  );
}

function ChatCnaeCard() {
  const options = [
    { code: '1091-1/02', name: 'Confeitaria · doces e bolos sob encomenda' },
    { code: '5620-1/04', name: 'Serviços de alimentação para eventos' },
    { code: '4721-1/02', name: 'Comércio varejista de produtos de padaria' },
  ];
  return (
    <div style={{
      background: '#fff', borderRadius: 14, borderTopLeftRadius: 4,
      maxWidth: '88%', padding: 12,
      boxShadow: '0 1px 1px rgba(16,17,26,0.06)',
    }}>
      <div style={{
        fontFamily: FONTS.mono, fontSize: 9.5, fontWeight: 700,
        letterSpacing: 0.6, textTransform: 'uppercase', color: BRAND.coralDeep,
        marginBottom: 8,
      }}>CNAEs sugeridos · IA</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {options.map((o, i) => (
          <div key={i} style={{
            padding: '8px 10px', borderRadius: 8,
            border: `1px solid ${i === 0 ? BRAND.coral : BRAND.sandDeep}`,
            background: i === 0 ? BRAND.coralSoft : '#fff',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 9.5, color: BRAND.inkSoft, fontWeight: 700, letterSpacing: 0.3 }}>{o.code}</div>
              <div style={{ fontSize: 11.5, color: BRAND.ink, marginTop: 2, lineHeight: 1.3 }}>{o.name}</div>
            </div>
            <span style={{
              fontFamily: FONTS.mono, fontSize: 10, fontWeight: 700, color: BRAND.coralDeep,
              letterSpacing: 0.4,
            }}>{String.fromCharCode(65 + i)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Testimonial card (shared)
   ───────────────────────────────────────────── */
function TestimonialCard({ quote, name, role, metric, tone = 'paper' }) {
  const isHL = tone === 'coral';
  return (
    <div style={{
      background: isHL ? BRAND.coralSoft : '#fff',
      border: `1px solid ${isHL ? '#FFDDD2' : BRAND.sandDeep}`,
      borderRadius: 18, padding: 24,
      boxShadow: '0 12px 32px -22px rgba(16,17,26,0.18)',
    }}>
      <p style={{
        fontFamily: FONTS.display, fontWeight: 500, fontSize: 17,
        lineHeight: 1.4, color: BRAND.ink, margin: 0,
        letterSpacing: -0.3, textWrap: 'pretty',
      }}>"{quote}"</p>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginTop: 22, paddingTop: 18,
        borderTop: `1px solid ${isHL ? '#FFDDD2' : BRAND.sandDeep}`,
      }}>
        <Portrait size={40} label="foto"/>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 14, letterSpacing: -0.2 }}>{name}</div>
          <div style={{ fontSize: 11.5, color: BRAND.inkSoft, marginTop: 2 }}>{role}</div>
        </div>
        {metric && (
          <div style={{
            background: BRAND.mintSoft, padding: '4px 10px', borderRadius: 6,
            fontFamily: FONTS.mono, fontSize: 10, fontWeight: 700,
            color: BRAND.mintDeep, letterSpacing: 0.3, textAlign: 'right', lineHeight: 1.2,
            maxWidth: 110,
          }}>{metric}</div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AI badge
   ───────────────────────────────────────────── */
function AIBadge() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 12,
      padding: '8px 16px 8px 8px', borderRadius: 999,
      background: '#fff', border: `1px solid ${BRAND.sandDeep}`,
      fontSize: 13, color: BRAND.ink, fontFamily: FONTS.body,
      boxShadow: '0 4px 14px -8px rgba(16,17,26,0.18)',
    }}>
      <span style={{
        background: BRAND.ink, color: BRAND.coral,
        padding: '4px 10px', borderRadius: 999,
        fontSize: 10.5, fontWeight: 700, fontFamily: FONTS.mono,
        letterSpacing: 0.8, textTransform: 'uppercase',
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%', background: BRAND.coral,
          animation: 'simplesmei-bounce 1.4s infinite',
        }}/>
        IA · MEI
      </span>
      <span>Uma IA que entende de MEI e fala português de gente</span>
    </div>
  );
}

export { Logo, NavBar, WhatsAppIcon, CTA, LockIcon, DEFAULT_SCRIPT, AnimatedChat, Dot, FadeIn, TrustStrip, Eyebrow, SectionTitle, PricingBlock, FAQ, Footer, Portrait, LGPDBadge, SCENARIOS, MultiScenarioChat, renderScenarioMessage, ChatGaugeCard, ChatReceiptCard, ChatHandoffCard, RenataBubble, ChatCnaeCard, TestimonialCard, AIBadge };

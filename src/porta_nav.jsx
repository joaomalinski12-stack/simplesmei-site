import React from 'react';
import { Logo, WhatsAppIcon, MenuIcon, XIcon } from './logo_footer.jsx';
import { BRAND, FONTS, useIsMobile } from './tokens.jsx';

/* SimplesMEI — Site V5 · A PORTA CONTEXTUAL
   Um só tipo de CTA na página inteira: um deep link que abre o WhatsApp
   com a mensagem mágica já digitada. Verde = porta. Coral = marca.
   O texto pré-carregado muda por cena — sempre apontado pro que a
   pessoa acabou de ver. */

/* número de produção do WhatsApp Business (formato 55 + DDD + número, sem + nem espaços) */
const WA_NUMBER = '5511978024355';
const DOOR_GREEN = '#25D366';
const DOOR_GREEN_DEEP = '#1fae54';

/* Textos pré-carregados por cena (direcional — copy final é do produto) */
const DOOR_TEXT = {
  hero:        'emite uma nota de teste de R$ 500 pra Marina',
  recorrencia: 'quero configurar uma recorrência',
  clientes:    'emite uma nota pra Beatriz',
  limite:      'quanto falta pro meu teto?',
  das:         'quando vence meu próximo DAS?',
  resumo:      'como foi meu mês?',
  portal:      'emite uma nota agora, sem o portal',
  comecar:     'quero começar',
};

/* PRÉ-LANÇAMENTO: o produto ainda não está aberto. Em vez de mandar o lead pro
   WhatsApp do bot, todos os CTAs ("portas") caem na lista de espera. O `text`
   (mensagem que iria pré-digitada) é mantido na assinatura pra não mexer no botão
   nem no preview — só o destino muda. Quando o produto abrir, é só voltar este
   retorno pro deep link do WhatsApp (wa.me/WA_NUMBER). */
const WAITLIST_URL = '/lista-de-espera';
function waHref(text) {
  return WAITLIST_URL;
}

/* ─── A PORTA ──────────────────────────────────────────────
   Mesma ação visual repetida com contexto diferente.
   props:
     label   — texto visível do botão
     text    — mensagem que cai na caixa do WhatsApp
     size    — sm | md | lg | xl
     preview — mostra, em mono, o que vai ser enviado
     block   — ocupa a largura toda
     align   — alinhamento do preview (left|center)
*/
function Door({ label = 'Testar no WhatsApp', text = DOOR_TEXT.comecar, size = 'lg', preview = false, block = false, align = 'left', onDark = false }) {
  const S = {
    sm: { pad: '11px 16px', font: 13.5, icon: 16, radius: 11, gap: 9 },
    md: { pad: '13px 20px', font: 14.5, icon: 18, radius: 12, gap: 10 },
    lg: { pad: '16px 24px', font: 15.5, icon: 19, radius: 14, gap: 11 },
    xl: { pad: '20px 30px', font: 17, icon: 22, radius: 16, gap: 12 },
  }[size];
  return (
    <div style={{
      display: block ? 'flex' : 'inline-flex', flexDirection: 'column',
      gap: 9, alignItems: align === 'center' ? 'center' : 'flex-start',
      width: block ? '100%' : undefined,
    }}>
      <a
        className="v5-door"
        href={waHref(text)}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: DOOR_GREEN, color: '#fff', textDecoration: 'none',
          padding: S.pad, borderRadius: S.radius,
          fontFamily: FONTS.body, fontWeight: 700, fontSize: S.font, letterSpacing: -0.1,
          display: block ? 'flex' : 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: S.gap,
          width: block ? '100%' : undefined,
          whiteSpace: block ? 'normal' : 'nowrap', textAlign: 'center', lineHeight: 1.25,
          minHeight: 44, boxSizing: 'border-box',
          boxShadow: '0 12px 30px -10px rgba(37,211,102,0.5), 0 1.5px 0 ' + DOOR_GREEN_DEEP + ' inset',
        }}
      >
        <WhatsAppIcon size={S.icon}/>
        {label}
        <span style={{ opacity: 0.78, fontWeight: 500, marginLeft: -2 }}>→</span>
      </a>
      {preview && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
          maxWidth: '100%', paddingLeft: block ? 0 : 2,
          justifyContent: align === 'center' ? 'center' : 'flex-start',
        }}>
          <span style={{
            fontFamily: FONTS.mono, fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
            textTransform: 'uppercase', color: onDark ? '#56D1A3' : DOOR_GREEN_DEEP, whiteSpace: 'nowrap',
          }}>já vai digitado:</span>
          <span style={{
            fontFamily: FONTS.mono, fontSize: 11, color: onDark ? '#9D9EA5' : BRAND.inkSoft,
            lineHeight: 1.35, minWidth: 0, flexShrink: 1, overflowWrap: 'anywhere',
          }}>“{text}”</span>
        </div>
      )}
    </div>
  );
}

/* Pequeno selo "a porta" — explica o gesto uma vez, no herói */
function DoorNote({ onDark = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: DOOR_GREEN, flexShrink: 0, boxShadow: '0 0 0 4px rgba(37,211,102,0.18)' }}/>
      <span style={{
        fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.4,
        color: onDark ? '#84858F' : BRAND.inkSoft, textTransform: 'uppercase',
      }}>verde abre o WhatsApp · de verdade</span>
    </div>
  );
}

/* ─── PORTA FLUTUANTE (mobile) ─────────────────────────────
   Botão fixo de WhatsApp que aparece quando a pessoa rola a página
   (padrão jota.ai): some no herói (que já tem a porta grande) e
   acompanha o resto do scroll. Só mobile — no desktop a porta da
   nav está sempre visível. */
function FloatingDoor({ text = DOOR_TEXT.comecar }) {
  const m = useIsMobile();
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setOn(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!m) return null;
  return (
    <a
      href={waHref(text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o SimplesMEI no WhatsApp"
      style={{
        position: 'fixed', right: 16, bottom: 16, zIndex: 90,
        width: 56, height: 56, borderRadius: '50%',
        background: DOOR_GREEN,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 14px 32px -8px rgba(37,211,102,0.60), 0 1.5px 0 ' + DOOR_GREEN_DEEP + ' inset',
        transform: on ? 'translateY(0) scale(1)' : 'translateY(90px) scale(0.6)',
        opacity: on ? 1 : 0,
        pointerEvents: on ? 'auto' : 'none',
        transition: 'transform .3s cubic-bezier(.2,.8,.3,1), opacity .3s ease',
      }}
    >
      <WhatsAppIcon size={28}/>
    </a>
  );
}

/* seta do dropdown (gira ao abrir) */
function Chevron({ open }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .18s ease' }}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* aba "Recursos" com menu suspenso (Blog + Ferramentas) — desktop (hover/foco/clique) */
function RecursosMenu({ items }) {
  const [open, setOpen] = React.useState(false);
  const t = React.useRef(null);
  const openNow = () => { if (t.current) clearTimeout(t.current); setOpen(true); };
  const closeSoon = () => { t.current = setTimeout(() => setOpen(false), 130); };
  return (
    <div style={{ position: 'relative' }} onMouseEnter={openNow} onMouseLeave={closeSoon}
      onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}>
      <button type="button" className="navv5-rectrigger" aria-haspopup="true" aria-expanded={open}
        onClick={() => setOpen(true)} onFocus={openNow}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 13.5, fontWeight: 600, color: BRAND.ink, whiteSpace: 'nowrap',
          fontFamily: FONTS.body, opacity: open ? 1 : 0.74,
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}>
        Recursos<Chevron open={open}/>
      </button>
      {open && (
        <div role="menu" style={{
          position: 'absolute', top: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)',
          minWidth: 250, background: '#fff', border: `1px solid ${BRAND.sandDeep}`,
          borderRadius: 16, padding: 8, zIndex: 120,
          boxShadow: '0 22px 50px -24px rgba(16,17,26,0.34)',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {items.map(([label, href, sub]) => (
            <a key={label} href={href} role="menuitem" className="navv5-reclink" onClick={() => setOpen(false)}
              style={{ display: 'block', textDecoration: 'none', padding: '10px 12px', borderRadius: 11 }}>
              <span style={{ display: 'block', fontFamily: FONTS.body, fontWeight: 700, fontSize: 14.5, color: BRAND.ink, letterSpacing: -0.2 }}>{label}</span>
              <span style={{ display: 'block', fontFamily: FONTS.body, fontSize: 12.5, color: BRAND.inkSoft, marginTop: 2 }}>{sub}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── NAV (sticky, condensa ao rolar) ──────────────────────
   Logo · âncoras que ancoram de verdade · porta sempre visível. */
function NavV5() {
  const [solid, setSolid] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const m = useIsMobile();
  
  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  const links = [
    ['Como funciona', '/#como-funciona'],
    ['Preço', '/#preco'],
    ['Segurança', '/#seguranca'],
    ['Sobre', '/sobre']
  ];
  // "Recursos" (dropdown): [label, href, subtítulo]
  const recursos = [
    ['Blog', '/blog', 'Guias do MEI'],
    ['Ferramentas', '/ferramentas', 'Consulta CNAE MEI e mais'],
  ];
  
  return (
    <nav className="navv5-container" style={{
      position: 'sticky', top: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: m ? (solid ? '10px 20px' : '14px 20px') : (solid ? '12px 56px' : '18px 56px'),
      background: 'rgba(255,255,255,0.86)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      boxShadow: solid ? '0 6px 24px -18px rgba(16,17,26,0.50)' : 'none',
      transition: 'padding .22s ease, box-shadow .22s ease',
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .navv5-desktop-links { display: none !important; }
          .navv5-mobile-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .navv5-mobile-btn { display: none !important; }
        }
        .navv5-reclink { transition: background .14s ease; }
        .navv5-reclink:hover { background: #FCFAF6; }
        .navv5-rectrigger:hover { opacity: 1 !important; }
      ` }} />
      <a href="/" aria-label="SimplesMEI — início" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
        <Logo size={solid ? 24 : 26}/>
      </a>
      
      <div className="navv5-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
        {links.slice(0, 3).map(([l, href]) => (
          <a key={l} href={href} style={{
            fontSize: 13.5, fontWeight: 600, color: BRAND.ink, whiteSpace: 'nowrap',
            textDecoration: 'none', fontFamily: FONTS.body, opacity: 0.74,
          }}>{l}</a>
        ))}
        <RecursosMenu items={recursos}/>
        {links.slice(3).map(([l, href]) => (
          <a key={l} href={href} style={{
            fontSize: 13.5, fontWeight: 600, color: BRAND.ink, whiteSpace: 'nowrap',
            textDecoration: 'none', fontFamily: FONTS.body, opacity: 0.74,
          }}>{l}</a>
        ))}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Door label={m ? 'Testar' : 'Testar no WhatsApp'} text={DOOR_TEXT.comecar} size="sm"/>
        
        <button 
          className="navv5-mobile-btn"
          onClick={() => setOpen(!open)}
          style={{
            display: m ? 'flex' : 'none',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.05)',
            border: 'none', borderRadius: 8,
            width: 38, height: 38, cursor: 'pointer',
            padding: 0
          }}
        >
          {open ? <XIcon color={BRAND.ink} /> : <MenuIcon color={BRAND.ink} />}
        </button>
      </div>
      
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: '#fff',
          borderBottom: `1px solid ${BRAND.sandDeep}`,
          padding: '16px 24px',
          display: 'flex', flexDirection: 'column', gap: 20,
          boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
        }}>
          {links.slice(0, 3).map(([l, href]) => (
            <a key={l} href={href}
               onClick={() => setOpen(false)}
               style={{
                 fontSize: 16, fontWeight: 600, color: BRAND.ink, textDecoration: 'none',
                 fontFamily: FONTS.body, opacity: 0.9,
            }}>{l}</a>
          ))}
          <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: BRAND.inkMute, marginTop: 2 }}>Recursos</div>
          {recursos.map(([l, href, sub]) => (
            <a key={l} href={href}
               onClick={() => setOpen(false)}
               style={{
                 fontSize: 16, fontWeight: 600, color: BRAND.ink, textDecoration: 'none',
                 fontFamily: FONTS.body, opacity: 0.9, paddingLeft: 12,
                 display: 'flex', flexDirection: 'column', gap: 2,
            }}>
              {l}
              <span style={{ fontSize: 12.5, fontWeight: 500, color: BRAND.inkSoft }}>{sub}</span>
            </a>
          ))}
          {links.slice(3).map(([l, href]) => (
            <a key={l} href={href}
               onClick={() => setOpen(false)}
               style={{
                 fontSize: 16, fontWeight: 600, color: BRAND.ink, textDecoration: 'none',
                 fontFamily: FONTS.body, opacity: 0.9,
            }}>{l}</a>
          ))}
        </div>
      )}
      
      <div className="v5-comet-line" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, opacity: solid ? 1 : 0, transition: 'opacity .22s ease' }}/>
    </nav>
  );
}

export { WA_NUMBER, DOOR_GREEN, DOOR_GREEN_DEEP, DOOR_TEXT, waHref, Door, DoorNote, FloatingDoor, NavV5 };

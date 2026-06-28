import React from 'react';
import { Logo, WhatsAppIcon } from './logo_footer.jsx';
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

function waHref(text) {
  return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
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

/* ─── NAV (sticky, condensa ao rolar) ──────────────────────
   Logo · âncoras que ancoram de verdade · porta sempre visível. */
function NavV5() {
  const [solid, setSolid] = React.useState(false);
  const m = useIsMobile();
  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    ['Como funciona', '#como-funciona'],
    ['Recorrência', '#recorrencia'],
    ['Preço', '#preco'],
    ['Blog', '/blog'],
    ['Segurança', '#seguranca'],
  ];
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: m ? (solid ? '10px 20px' : '14px 20px') : (solid ? '12px 56px' : '18px 56px'),
      background: 'rgba(255,255,255,0.86)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      boxShadow: solid ? '0 6px 24px -18px rgba(16,17,26,0.50)' : 'none',
      transition: 'padding .22s ease, box-shadow .22s ease',
    }}>
      <Logo size={solid ? 24 : 26}/>
      <div style={{ display: m ? 'none' : 'flex', alignItems: 'center', gap: 30 }}>
        {links.map(([l, href]) => (
          <a key={l} href={href} style={{
            fontSize: 13.5, fontWeight: 600, color: BRAND.ink, whiteSpace: 'nowrap',
            textDecoration: 'none', fontFamily: FONTS.body, opacity: 0.74,
          }}>{l}</a>
        ))}
      </div>
      <Door label={m ? 'Testar' : 'Testar no WhatsApp'} text={DOOR_TEXT.comecar} size="sm"/>
      <div className="v5-comet-line" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, opacity: solid ? 1 : 0, transition: 'opacity .22s ease' }}/>
    </nav>
  );
}

export { WA_NUMBER, DOOR_GREEN, DOOR_GREEN_DEEP, DOOR_TEXT, waHref, Door, DoorNote, NavV5 };

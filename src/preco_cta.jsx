import React from 'react';
import { BentoV5 } from './bento_dor.jsx';
import { HeroV5, TrustRowV5 } from './heroi.jsx';
import { Footer, LockIcon } from './logo_footer.jsx';
import { DOOR_TEXT, Door, NavV5 } from './porta_nav.jsx';
import { Mono } from './tiles.jsx';
import { BRAND, FONTS, useIsMobile } from './tokens.jsx';

/* SimplesMEI — Site V5 · preço, segurança, CTA final, página
   Preço = fonte única de verdade. Toda cena fecha numa porta. */

/* cabeçalho de seção padronizado (escala única) */
function SecHead({ eyebrow, title, desc, maxTitle, inverted, accent }) {
  const m = useIsMobile();
  const clr = inverted ? '#fff' : BRAND.ink;
  const sub = inverted ? '#9D9EA5' : BRAND.inkSoft;
  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span className="v5-comet-line" style={{ width: 26, height: 2, borderRadius: 2, flexShrink: 0 }}/>
        <Mono color={accent || (inverted ? BRAND.coral : BRAND.coralDeep)} size={11}>{eyebrow}</Mono>
      </div>
      <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 'clamp(30px, 8vw, 38px)' : 44, lineHeight: 1.02, letterSpacing: m ? '-0.03em' : -1.5, color: clr, margin: 0, maxWidth: maxTitle || 600, textWrap: 'balance' }}>{title}</h2>
      {desc && <p style={{ fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.55, color: sub, margin: '16px 0 0', maxWidth: 520, textWrap: 'pretty' }}>{desc}</p>}
    </div>
  );
}

/* ─── PREÇO — número grande, plano único, porta como botão ─── */
function PriceV5() {
  const m = useIsMobile();
  const perks = [
    'NFS-e ilimitadas, prontas em segundos, no chat',
    'Recorrência no piloto automático',
    'Aviso de teto e DAS antes de virar problema',
    'Clientes fixos na memória da IA',
    'Abertura de CNPJ MEI feita pra você',
    'IA no chat 24h, todo dia do ano',
  ];
  return (
    <section data-anchor id="preco" style={{ background: BRAND.paper, padding: m ? '56px 20px 40px' : '92px 56px 60px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <SecHead eyebrow="Preço" title="Seu fiscal em dia por um preço justo." desc="Notas ilimitadas, recorrência no automático e abertura de CNPJ. Cancela quando quiser, sem fidelidade, sem letra miúda, sem surpresa no cartão." />
        <div style={{
          marginTop: m ? 26 : 38, background: '#fff', border: `1px solid ${BRAND.sandDeep}`, borderRadius: m ? 20 : 26,
          display: 'grid', gridTemplateColumns: m ? '1fr' : '1.1fr 1fr', gap: 0, overflow: 'hidden',
          boxShadow: '0 30px 70px -40px rgba(16,17,26,0.22)', position: 'relative',
        }}>
          <div className="v5-comet-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4 }}/>
          {/* perks */}
          <div style={{ padding: m ? '28px 22px' : '40px 44px', minWidth: 0 }}>
            <Mono color={BRAND.coralDeep} size={11}>tudo incluso</Mono>
            <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 28, letterSpacing: -0.8, color: BRAND.ink, marginTop: 8, lineHeight: 1.06 }}>
              O contador inteiro cabe numa conversa.
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '22px 0 0', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: '12px 20px' }}>
              {perks.map((p, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: m ? 14.5 : 13.5, lineHeight: 1.4, color: BRAND.ink }}>
                  <span style={{ color: BRAND.mintDeep, fontWeight: 700, marginTop: 1 }}>✓</span>{p}
                </li>
              ))}
            </ul>
          </div>
          {/* dois planos */}
          <div style={{ padding: m ? '20px 22px 26px' : '34px 36px', background: BRAND.sand, borderLeft: m ? 'none' : `1px solid ${BRAND.sandDeep}`, borderTop: m ? `1px solid ${BRAND.sandDeep}` : 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, minWidth: 0 }}>
            {/* ANUAL — destaque */}
            <div style={{ position: 'relative', background: '#fff', border: `1.5px solid ${BRAND.coral}`, borderRadius: 18, padding: '22px 24px', boxShadow: '0 20px 44px -28px rgba(248,116,83,0.55)' }}>
              <span style={{ position: 'absolute', top: 16, right: 16, background: BRAND.coral, color: '#fff', padding: '4px 11px', borderRadius: 999, fontFamily: FONTS.mono, fontSize: 9.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>Mais escolhido</span>
              <Mono color={BRAND.coralDeep} size={10.5}>plano anual · 12×</Mono>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 3, color: BRAND.ink, marginTop: 8 }}>
                <span style={{ fontFamily: FONTS.display, fontSize: 24, fontWeight: 800, marginTop: 8 }}>R$</span>
                <span style={{ fontFamily: FONTS.display, fontSize: 60, fontWeight: 800, letterSpacing: -2.4, lineHeight: 0.9 }}>39</span>
                <span style={{ fontFamily: FONTS.display, fontSize: 26, fontWeight: 800, marginTop: 8 }}>,90</span>
                <span style={{ fontFamily: FONTS.body, fontSize: 14, color: BRAND.inkSoft, marginTop: 'auto', marginBottom: 10, marginLeft: 4 }}>/mês</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: BRAND.mintSoft, color: BRAND.mintDeep, padding: '5px 11px', borderRadius: 999, fontSize: 12, fontWeight: 700, margin: '6px 0 16px' }}>
                <span>✓</span> Certificado digital incluso
              </div>
              <Door label="começar os 34 dias grátis" text={DOOR_TEXT.comecar} size="lg" block align="center"/>
            </div>
            {/* MENSAL */}
            <div style={{ background: 'transparent', border: `1px solid ${BRAND.sandDeep}`, borderRadius: 14, padding: '16px 20px', display: 'flex', flexDirection: m ? 'column' : 'row', alignItems: m ? 'stretch' : 'center', justifyContent: 'space-between', gap: 14 }}>
              <div style={{ minWidth: 0 }}>
                <Mono color={BRAND.inkSoft} size={10.5}>plano mensal</Mono>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, color: BRAND.ink, marginTop: 4 }}>
                  <span style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 800 }}>R$</span>
                  <span style={{ fontFamily: FONTS.display, fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>49,90</span>
                  <span style={{ fontFamily: FONTS.body, fontSize: 13, color: BRAND.inkSoft, marginLeft: 3 }}>/mês</span>
                </div>
                <div style={{ fontSize: 11.5, color: BRAND.inkSoft, marginTop: 4 }}>Certificado digital cobrado à parte</div>
              </div>
              <Door label="assinar mensal" text={DOOR_TEXT.comecar} size="sm" block={m}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SEGURANÇA / LGPD — reduzir medo num produto fiscal ─── */
function SegurancaV5() {
  const m = useIsMobile();
  const cards = [
    ['Seus dados são seus', 'Tudo sob LGPD. Você pede, a gente apaga na hora, sem letra miúda.'],
    ['Nota com valor legal', 'NFS-e oficial via integração Focus NFe. Com QR Code, aceita em qualquer lugar.'],
    ['A gente nunca toca no seu dinheiro', 'Sem acesso a conta, sem PIX no seu nome. Só emite nota e organiza o fiscal.'],
    ['Sempre no ar', 'Sem horário de atendimento e sem fila. A IA responde na hora, qualquer dia da semana.'],
  ];
  return (
    <section data-anchor id="seguranca" style={{ background: BRAND.paper, padding: m ? '8px 20px 56px' : '20px 56px 92px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 22 }}>
          <LockIcon size={15} color={BRAND.mintDeep}/>
          <Mono color={BRAND.inkSoft} size={11}>Segurança · você confia o seu CNPJ a gente, e a gente leva isso a sério</Mono>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(4, 1fr)', gap: m ? 12 : 16 }}>
          {cards.map(([t, d], i) => (
            <div key={i} style={{ background: '#fff', border: `1px solid ${BRAND.sandDeep}`, borderRadius: 16, padding: '22px 22px' }}>
              <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, color: BRAND.ink, letterSpacing: -0.3 }}>{t}</div>
              <p style={{ fontSize: m ? 14.5 : 13, lineHeight: 1.5, color: BRAND.inkSoft, margin: '8px 0 0', textWrap: 'pretty' }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA FINAL (escuro) — a última porta ─── */
function FinalCTA() {
  const m = useIsMobile();
  return (
    <section style={{ background: BRAND.paper, padding: m ? '0 20px 56px' : '0 56px 84px' }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto', background: BRAND.ink, borderRadius: m ? 22 : 28,
        padding: m ? '36px 24px' : '60px 56px', position: 'relative', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: m ? '1fr' : '1.25fr 1fr', gap: m ? 28 : 44, alignItems: 'center',
      }}>
        <div className="v5-comet-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4 }}/>
        <div style={{ position: 'absolute', bottom: -160, right: -90, width: 460, height: 460, borderRadius: '50%', background: `radial-gradient(circle, rgba(248,116,83,0.24) 0%, transparent 64%)`, pointerEvents: 'none' }}/>
        <div style={{ position: 'relative' }}>
          <Mono color={BRAND.coral} size={11}>Comece agora</Mono>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 'clamp(30px, 8.5vw, 40px)' : 46, lineHeight: 1.02, letterSpacing: m ? '-0.03em' : -1.6, color: '#fff', margin: '14px 0 0', maxWidth: 480, textWrap: 'balance' }}>
            Manda a sua primeira nota hoje.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: '#9D9EA5', margin: '16px 0 0', maxWidth: 420 }}>
            Abre a conversa com a frase já digitada. Você escreve do seu jeito. A IA emite, envia pro cliente e cuida do DAS, da recorrência e do teto. Sozinha.
          </p>
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: m ? 'flex-start' : 'flex-start' }}>
          <Door label="quero começar" text={DOOR_TEXT.comecar} size={m ? 'lg' : 'xl'} block={m} preview onDark/>
        </div>
      </div>
    </section>
  );
}

/* ─── PÁGINA V5 ─── */
function SiteV5() {
  return (
    <div style={{ background: BRAND.paper, fontFamily: FONTS.body, color: BRAND.ink }}>
      <NavV5/>
      <HeroV5/>
      <TrustRowV5/>
      <BentoV5/>
      <PriceV5/>
      <SegurancaV5/>
      <FinalCTA/>
      <Footer/>
    </div>
  );
}

export { SecHead, PriceV5, SegurancaV5, FinalCTA, SiteV5 };

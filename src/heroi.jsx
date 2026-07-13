import React from 'react';
import { DOOR_TEXT, Door, DoorNote } from './porta_nav.jsx';
import { Mono } from './tiles.jsx';
import { BRAND, ChatShell, CheckSeal, FONTS, PhoneFrame, useIsMobile } from './tokens.jsx';

/* SimplesMEI — Site V5 · HERÓI redesenhado (reforço do momento "a-ha")
   Menos texto, mais cena. A frase torta da pessoa VOA fisicamente pros campos
   da NFS-e (clone com translate+fade, imune ao scale do PhoneFrame) e a nota
   é carimbada "Emitida" — número + PDF na própria conversa (não envia pro
   cliente: não existe). Cliente/teto/DAS entram como um checklist que acende
   um a um abaixo do celular (DAS = payoff). Auto-play, "rever" reassiste,
   respeita prefers-reduced-motion (pinta direto o quadro final).
   Origem: mockup `site/hero-aha.html` (Claude Design), portado pra JSX/tokens. */

const FLYDUR = 460;

/* posição (em px do palco, sem escala) de um elemento relativo ao palco.
   offsetLeft/Top são layout-based: imunes ao transform:scale do PhoneFrame. */
function offsetIn(el, root) {
  let x = 0, y = 0, n = el;
  while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
  return { x, y };
}
function raf2(fn) { requestAnimationFrame(() => requestAnimationFrame(fn)); }

/* prefers-reduced-motion — inicial determinístico (false, casa com o SSR) e
   corrige no cliente via matchMedia (mesmo padrão do useIsMobile). */
function useReducedMotion() {
  const [r, setR] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setR(mq.matches);
    on();
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on));
  }, []);
  return r;
}

/* acento que liga cada pedaço da frase ao seu campo (mapa emocional do DS) */
const AHA_ACC = {
  valor:   { deep: BRAND.coralDeep, soft: 'rgba(248,116,83,0.16)' },
  cliente: { deep: BRAND.mintDeep,  soft: 'rgba(86,209,163,0.20)' },
  servico: { deep: BRAND.amberDeep, soft: 'rgba(235,136,31,0.16)' },
};
const FLY_LABEL = { valor: '500 reais', cliente: 'Marina', servico: 'fiz o logo dela' };

/* reveal por transição — estado de repouso = visível (anima ao montar) */
function AhaReveal({ children, y = 10, dur = 460, delay = 0, inst = false, style }) {
  const [on, setOn] = React.useState(inst);
  React.useEffect(() => {
    if (inst) { setOn(true); return; }
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(id);
  }, [inst]);
  if (inst) return <div style={style}>{children}</div>;
  return (
    <div style={{ opacity: on ? 1 : 0, transform: on ? 'none' : `translateY(${y}px)`, transition: `opacity ${dur}ms ease ${delay}ms, transform ${dur}ms cubic-bezier(.2,.8,.3,1) ${delay}ms`, ...style }}>{children}</div>
  );
}

/* pedaço da frase na bolha: destacado → drenado (já voou pro campo) */
function AhaToken({ srcRef, acc, drained, children }) {
  return (
    <span ref={srcRef} style={{
      display: 'inline-block',
      background: drained ? 'transparent' : acc.soft,
      color: drained ? BRAND.inkMute : acc.deep,
      fontWeight: drained ? 500 : 700,
      padding: '1px 5px', borderRadius: 5,
      opacity: drained ? 0.5 : 1,
      transition: 'opacity .25s ease, background .25s ease, color .25s ease',
      WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone',
    }}>{children}</span>
  );
}

/* uma linha da nota (skeleton → preenchida com pop + ✓) */
function AhaFormRow({ label, acc, value, sub, filled, dstRef, first, inst }) {
  return (
    <div style={{ padding: '8px 0', borderTop: first ? 'none' : `1px solid ${BRAND.sand}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: filled ? acc.deep : BRAND.inkSoft, transition: 'color .3s ease' }}>{label}</span>
        <span ref={dstRef} style={{ display: 'inline-flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6, minWidth: 84 }}>
          {filled ? (
            <span className={inst ? '' : 'aha-pop'} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 14.5, color: BRAND.ink, letterSpacing: -0.2 }}>{value}</span>
              <CheckSeal size={13}/>
            </span>
          ) : (
            <span style={{ width: 78, height: 9, borderRadius: 5, background: BRAND.sand }}/>
          )}
        </span>
      </div>
      {filled && sub && (
        <div className={inst ? '' : 'aha-pop'} style={{ marginTop: 3, fontFamily: FONTS.mono, fontSize: 9, color: BRAND.inkSoft, textAlign: 'right' }}>{sub}</div>
      )}
    </div>
  );
}

/* mobile e desktop — anotações viram um checklist abaixo do celular, marcando ✓
   uma a uma no ritmo dos beats. No repouso, TUDO marcado (quadro parado completo).
   O DAS é o payoff (mint). */
function AhaChecklist({ s, still, m }) {
  const items = [
    { t: 'achou a cliente só pelo nome', on: s.ann[0] },
    { t: 'de olho no teto de R$ 81 mil', on: s.ann[1] },
    { t: 'emitiu a NFS-e em segundos', on: s.ann[2] },
    { t: 'te avisa do DAS · manda o Pix', on: s.ann[3], payoff: true },
  ];
  return (
    <div style={{ marginTop: m ? 24 : 46, display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 8 : 10, width: '100%', maxWidth: m ? 340 : 440 }}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 11,
          background: '#fff', border: `1px solid ${it.on ? (it.payoff ? BRAND.mintSoft : BRAND.creamDeep) : BRAND.cream}`,
          borderRadius: 12, padding: '11px 14px',
          opacity: it.on ? 1 : 0.5, transition: still ? 'none' : 'opacity .45s ease, border-color .45s ease',
          boxShadow: it.on ? '0 8px 22px -18px rgba(16,17,26,0.4)' : 'none',
        }}>
          <span style={{
            width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
            background: it.on ? (it.payoff ? BRAND.mint : BRAND.coral) : 'transparent',
            border: it.on ? 'none' : `1.5px solid ${BRAND.creamDeep}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {it.on && (
              <svg width="11" height="11" viewBox="0 0 34 34"><polyline points="7,18 14,25 27,9" fill="none" stroke={BRAND.ink} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </span>
          <span style={{ fontFamily: FONTS.body, fontSize: 14, fontWeight: 600, color: it.on ? BRAND.ink : BRAND.inkSoft, lineHeight: 1.3 }}>{it.t}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── A CENA — celular + linha do tempo + clones que voam ─────────────── */
function AhaScene({ m }) {
  const reduced = useReducedMotion();

  const FINAL = { still: true, typing: false, form: true, filled: { valor: true, cliente: true, servico: true }, drained: { valor: true, cliente: true, servico: true }, emitida: true, ann: [true, true, true, true] };
  const INITIAL = { still: false, typing: false, form: false, filled: { valor: false, cliente: false, servico: false }, drained: { valor: false, cliente: false, servico: false }, emitida: false, ann: [false, false, false, false] };

  const [s, setS] = React.useState(INITIAL);
  const [flying, setFlying] = React.useState(null);

  const stageRef = React.useRef(null);
  const srcRefs = { valor: React.useRef(null), cliente: React.useRef(null), servico: React.useRef(null) };
  const dstRefs = { valor: React.useRef(null), cliente: React.useRef(null), servico: React.useRef(null) };
  const timers = React.useRef([]);
  const T = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  function launchFly(key) {
    const src = srcRefs[key].current, dst = dstRefs[key].current, stage = stageRef.current;
    if (!src || !dst || !stage) return; // fallback gracioso: o campo só preenche
    const a = offsetIn(src, stage), b = offsetIn(dst, stage);
    setFlying({ key, label: FLY_LABEL[key], acc: AHA_ACC[key], x: a.x, y: a.y, dx: b.x - a.x, dy: b.y - a.y, phase: 'start' });
    raf2(() => setFlying(f => (f && f.key === key ? { ...f, phase: 'end' } : f)));
    T(() => setFlying(f => (f && f.key === key ? { ...f, phase: 'land' } : f)), FLYDUR);
    T(() => setFlying(f => (f && f.key === key ? null : f)), FLYDUR + 200);
  }
  function flyAt(key, t0) {
    T(() => { setS(u => ({ ...u, drained: { ...u.drained, [key]: true } })); launchFly(key); }, t0);
    T(() => setS(u => ({ ...u, filled: { ...u.filled, [key]: true } })), t0 + FLYDUR);
  }
  function play() {
    clearTimers();
    setFlying(null);
    if (reduced) { setS(FINAL); return; }
    setS(INITIAL);
    T(() => setS(u => ({ ...u, typing: true })), 700);
    T(() => setS(u => ({ ...u, typing: false, form: true })), 1500);
    flyAt('valor', 1900); flyAt('cliente', 2560); flyAt('servico', 3260);
    T(() => setS(u => ({ ...u, emitida: true })), 4150);
    T(() => setS(u => ({ ...u, ann: [true, u.ann[1], u.ann[2], u.ann[3]] })), 4600);
    T(() => setS(u => ({ ...u, ann: [true, true, u.ann[2], u.ann[3]] })), 5100);
    T(() => setS(u => ({ ...u, ann: [true, true, true, u.ann[3]] })), 5600);
    T(() => setS(u => ({ ...u, ann: [true, true, true, true] })), 6100);
  }
  React.useEffect(() => { play(); return clearTimers; }, [reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  const scale = m ? 0.74 : 0.7;

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        {/* brilho atrás do celular */}
        <div style={{ position: 'absolute', inset: -38, background: 'radial-gradient(circle at 50% 58%, rgba(248,116,83,0.18) 0%, transparent 66%)', pointerEvents: 'none' }}/>

        <PhoneFrame scale={scale} statusTime="09:41" bg="#11181f">
          <ChatShell title="SimplesMEI" subtitle="online" hideComposer>
            <div ref={stageRef} className="aha-stage" style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 6 }}>

              {/* a frase torta que a pessoa mandou (do jeito dela) */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: 24 }}>
                <div style={{ background: '#fff', border: `1.5px solid ${BRAND.coralSoft}`, borderRadius: 14, borderTopRightRadius: 4, padding: '9px 12px', maxWidth: '90%', fontSize: 13.5, lineHeight: 1.5, color: BRAND.ink, boxShadow: '0 1px 1px rgba(16,17,26,0.06)' }}>
                  <AhaToken srcRef={srcRefs.valor} acc={AHA_ACC.valor} drained={s.drained.valor}>500 reais</AhaToken>
                  {' pra '}
                  <AhaToken srcRef={srcRefs.cliente} acc={AHA_ACC.cliente} drained={s.drained.cliente}>Marina</AhaToken>
                  {', '}
                  <AhaToken srcRef={srcRefs.servico} acc={AHA_ACC.servico} drained={s.drained.servico}>fiz o logo dela</AhaToken>
                  <div style={{ fontSize: 9.5, color: BRAND.inkSoft, opacity: 0.6, textAlign: 'right', marginTop: 4 }}>9:41 ✓✓</div>
                </div>
              </div>

              {/* a IA lê */}
              {s.typing && (
                <div style={{ alignSelf: 'flex-start', background: '#fff', padding: '10px 13px', borderRadius: 14, borderTopLeftRadius: 4, display: 'flex', gap: 4, boxShadow: '0 1px 1px rgba(16,17,26,0.06)' }}>
                  <span className="aha-dot" style={{ animationDelay: '0ms' }}/>
                  <span className="aha-dot" style={{ animationDelay: '150ms' }}/>
                  <span className="aha-dot" style={{ animationDelay: '300ms' }}/>
                </div>
              )}

              {/* a IA responde com a nota (bolha 2) — os campos voam pra cá,
                 depois o card carimba "Emitida" e devolve número + PDF NA CONVERSA
                 (form + recibo num card só → no máximo 2 bolhas na tela). */}
              {s.form && (
                <AhaReveal inst={s.still}>
                  <div className={(!s.still && s.emitida) ? 'aha-pulse' : undefined} style={{ background: '#fff', borderRadius: 14, borderTopLeftRadius: 4, padding: '11px 14px 10px', maxWidth: '94%', boxShadow: '0 1px 1px rgba(16,17,26,0.06)', border: `1px solid ${s.emitida ? BRAND.mintSoft : BRAND.creamDeep}`, transition: 'border-color .3s ease' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      {s.emitida ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: BRAND.mintSoft, color: BRAND.mintDeep, padding: '3px 9px 3px 4px', borderRadius: 999, fontSize: 10, fontWeight: 700, fontFamily: FONTS.mono, letterSpacing: 0.4 }}><CheckSeal size={14}/>Emitida</span>
                      ) : (
                        <Mono color={BRAND.coralDeep} size={9.5}>NFS-e · conferindo</Mono>
                      )}
                      <Mono color={BRAND.inkSoft} size={9}>{s.emitida ? 'Nº 00501' : 'rascunho'}</Mono>
                    </div>
                    <AhaFormRow first label="Valor" acc={AHA_ACC.valor} value="R$ 500,00" filled={s.filled.valor} dstRef={dstRefs.valor} inst={s.still}/>
                    <AhaFormRow label="Cliente" acc={AHA_ACC.cliente} value="Clínica Dra. Marina" sub="achei pelo nome · CNPJ ••87" filled={s.filled.cliente} dstRef={dstRefs.cliente} inst={s.still}/>
                    <AhaFormRow label="Serviço" acc={AHA_ACC.servico} value="Design de logotipo" filled={s.filled.servico} dstRef={dstRefs.servico} inst={s.still}/>
                    {s.emitida && (
                      <div style={{ marginTop: 9, padding: '7px 10px', borderRadius: 8, background: BRAND.sand, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 12, lineHeight: 1 }}>📎</span>
                        <Mono color={BRAND.inkSoft} size={9.5}>número e PDF aqui na conversa</Mono>
                      </div>
                    )}
                  </div>
                </AhaReveal>
              )}

              {/* clone que VOA — o coração do upgrade (translate + fade, sem piscar) */}
              {flying && (
                <div style={{
                  position: 'absolute', left: flying.x, top: flying.y, zIndex: 30, pointerEvents: 'none',
                  transform: flying.phase === 'start' ? 'translate(0px,0px) scale(1)'
                    : flying.phase === 'end' ? `translate(${flying.dx}px,${flying.dy}px) scale(1.05)`
                    : `translate(${flying.dx}px,${flying.dy}px) scale(1)`,
                  opacity: flying.phase === 'land' ? 0 : 1,
                  transition: flying.phase === 'start' ? 'none'
                    : flying.phase === 'end' ? `transform ${FLYDUR}ms cubic-bezier(.2,.8,.3,1)`
                    : 'opacity 180ms ease, transform 180ms ease',
                }}>
                  <span style={{ display: 'inline-block', background: flying.acc.soft, color: flying.acc.deep, fontWeight: 700, fontFamily: FONTS.body, fontSize: 13.5, padding: '2px 7px', borderRadius: 6, boxShadow: '0 8px 18px -8px rgba(16,17,26,0.28)', whiteSpace: 'nowrap' }}>{flying.label}</span>
                </div>
              )}
            </div>
          </ChatShell>
        </PhoneFrame>

        {/* rever — discreto (controle pra reassistir) */}
        <button onClick={play} className="aha-replay" style={{
          position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)',
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: '#fff', border: `1px solid ${BRAND.creamDeep}`, borderRadius: 999,
          padding: '6px 13px', cursor: 'pointer', boxShadow: '0 8px 22px -14px rgba(16,17,26,0.40)',
          fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: BRAND.inkSoft,
        }}>
          <span style={{ fontSize: 13, lineHeight: 1 }}>↻</span> rever
        </button>
      </div>

      {/* anotações — checklist abaixo do celular (uma a uma, no ritmo dos beats).
         Mesmo tratamento em mobile e desktop: o a-ha lê igual nos dois e o
         quadro parado mostra tudo. (desktop = 2 colunas, mobile = 1.) */}
      <AhaChecklist s={s} still={s.still} m={m}/>
    </div>
  );
}

/* ─── HERÓI ────────────────────────────────────────────── */
function HeroV5() {
  const m = useIsMobile();
  return (
    <section data-anchor id="como-funciona" style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(180deg, #FCEBE3 0%, #FBF4EE 42%, ${BRAND.paper} 88%)` }}>
      {/* wash de calor coral + mint */}
      <div style={{ position: 'absolute', top: -260, left: -160, width: 760, height: 760, borderRadius: '50%', background: 'radial-gradient(circle, rgba(248,116,83,0.20) 0%, transparent 62%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: -120, right: -120, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(86,209,163,0.14) 0%, transparent 64%)', pointerEvents: 'none' }}/>

      <div style={{
        maxWidth: 1240, margin: '0 auto', position: 'relative',
        padding: m ? '34px 20px 64px' : '70px 56px 92px',
        display: 'grid', gridTemplateColumns: m ? '1fr' : '1.04fr 0.96fr', gap: m ? 8 : 40, alignItems: 'center',
      }}>
        {/* coluna texto — enxuta (badge · H1 · 1 legenda · preço · porta) */}
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 15px', borderRadius: 999, background: '#fff', border: '1px solid #FFDDD2', marginBottom: 28, boxShadow: '0 6px 18px -12px rgba(248,116,83,0.50)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: BRAND.coral, flexShrink: 0 }}/>
            <Mono color={BRAND.coralDeep} size={11}>A IA que cuida do fiscal do MEI · dentro do WhatsApp</Mono>
          </div>
          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 'clamp(34px, 9.4vw, 52px)' : 66, lineHeight: 1.0, letterSpacing: m ? '-0.025em' : -2.2, color: BRAND.ink, margin: 0, textWrap: 'balance' }}>
            Gestão do MEI<br/><span style={{ color: BRAND.coralDeep }}>no seu WhatsApp.</span>
          </h1>
          {/* UMA legenda da cena (~12 palavras), não a descrição inteira */}
          <p style={{ fontFamily: FONTS.body, fontSize: m ? 17 : 21, lineHeight: 1.5, color: BRAND.inkSoft, margin: '24px 0 0', maxWidth: 432, textWrap: 'pretty' }}>
            Você manda do seu jeito. <strong style={{ color: BRAND.ink, fontWeight: 700 }}>A IA emite a nota fiscal e cuida do DAS, do teto e do resto.</strong>
          </p>
          <p style={{ fontFamily: FONTS.body, fontSize: 15.5, lineHeight: 1.5, color: BRAND.inkSoft, margin: '16px 0 0' }}>
            <strong style={{ color: BRAND.ink, fontWeight: 700 }}>34 dias grátis.</strong> Depois, a partir de <strong style={{ color: BRAND.coralDeep, fontWeight: 700 }}>R$ 39,90/mês</strong>.
          </p>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Door label="emitir minha primeira nota grátis" text={DOOR_TEXT.hero} size={m ? 'lg' : 'xl'} block={m} preview/>
            <DoorNote/>
          </div>
        </div>

        {/* coluna celular — o protagonista */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: m ? 'auto' : 560, marginTop: m ? 6 : 0 }}>
          <AhaScene m={m}/>
        </div>
      </div>
    </section>
  );
}

/* tira fina de confiança (não é CTA — é reasseguro) */
function TrustRowV5() {
  const m = useIsMobile();
  const items = ['34 dias grátis', 'sem cartão', 'sem app pra baixar', 'integração Focus NFe', 'dados protegidos · LGPD'];
  return (
    <div style={{ background: BRAND.paper, padding: m ? '0 20px' : '0 56px' }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'flex', justifyContent: m ? 'center' : 'space-between', flexWrap: 'wrap', gap: m ? '12px 18px' : 18,
        padding: '20px 0', borderTop: `1px solid ${BRAND.sandDeep}`, borderBottom: `1px solid ${BRAND.sandDeep}`,
      }}>
        {items.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: BRAND.mintDeep, fontWeight: 700, fontSize: 13 }}>✓</span>
            <Mono color={BRAND.inkSoft} size={10.5}>{t}</Mono>
          </div>
        ))}
      </div>
    </div>
  );
}

export { HeroV5, TrustRowV5, AhaScene };

import React from 'react';
import { DOOR_TEXT, Door, DoorNote } from './porta_nav.jsx';
import { Mono, TileRecibo } from './tiles.jsx';
import { BRAND, ChatShell, FONTS, PhoneFrame, useIsMobile } from './tokens.jsx';

/* SimplesMEI — Site V5 · HERÓI + animação-assinatura "frase vira nota"
   A frase torta da pessoa se reorganiza fisicamente nos campos da NFS-e
   e o recibo encaixa. Auto-play, replay discreto. NÃO é digitável —
   mostrar, não deixar jogar. */

/* acentos que ligam cada pedaço da frase ao seu campo */
const SIG_ACC = {
  valor:   { deep: BRAND.coralDeep, soft: 'rgba(248,116,83,0.16)' },
  cliente: { deep: BRAND.mintDeep,  soft: 'rgba(86,209,163,0.20)' },
  servico: { deep: '#C85D00', soft: 'rgba(235,136,31,0.15)' },
};

/* timeline da assinatura — devolve o passo atual + replay */
function useSignature() {
  const [step, setStep] = React.useState(0);
  const timers = React.useRef([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const play = React.useCallback(() => {
    clear();
    setStep(0);
    const seq = [[760, 1], [1180, 2], [1640, 3], [2320, 4], [2920, 5], [3420, 6], [3920, 7], [4720, 8]];
    seq.forEach(([t, s]) => timers.current.push(setTimeout(() => setStep(s), t)));
  }, []);
  React.useEffect(() => { play(); return clear; }, [play]);
  return { step, replay: play };
}

/* reveal robusto por transição (resting state = visível; anima ao montar) */
function Reveal({ children, y = 8, pop = false, dur = 460, delay = 0, style }) {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(id);
  }, []);
  const hidden = pop ? `translateY(${y}px) scale(.96)` : `translateY(${y}px)`;
  return (
    <div style={{
      opacity: on ? 1 : 0,
      transform: on ? 'none' : hidden,
      transition: `opacity ${dur}ms ease ${delay}ms, transform ${dur}ms cubic-bezier(.2,.8,.3,1) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

/* pedaço da frase: cru → destacado → drenado (já foi pro campo) */
function Token({ acc, highlighted, drained, children }) {
  if (drained) return <span style={{ color: BRAND.inkSoft, opacity: 0.45, fontWeight: 500, transition: 'all .3s ease' }}>{children}</span>;
  if (highlighted) return (
    <span style={{
      background: acc.soft, color: acc.deep, fontWeight: 700,
      padding: '1px 5px', borderRadius: 5, transition: 'all .3s ease',
      WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone',
    }}>{children}</span>
  );
  return <span style={{ transition: 'all .3s ease' }}>{children}</span>;
}

/* uma linha do formulário da nota (skeleton → preenchida) */
function FormRow({ label, acc, value, sub, filled, first }) {
  return (
    <div style={{ padding: '9px 0', borderTop: first ? 'none' : `1px solid ${BRAND.sand}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 9.5, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: filled ? acc.deep : BRAND.inkSoft, transition: 'color .3s ease' }}>{label}</span>
        {filled ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 14.5, color: BRAND.ink, letterSpacing: -0.2 }}>{value}</span>
            <span style={{ color: BRAND.mintDeep, fontSize: 12, fontWeight: 700 }}>✓</span>
          </span>
        ) : (
          <span style={{ width: 80, height: 9, borderRadius: 5, background: BRAND.sand }}/>
        )}
      </div>
      {filled && sub && (
        <div style={{ marginTop: 3, fontFamily: FONTS.mono, fontSize: 9.5, color: BRAND.inkSoft, textAlign: 'right' }}>{sub}</div>
      )}
    </div>
  );
}

/* a conversa-assinatura dentro do celular */
function SignaturePhone({ step, scale = 0.66 }) {
  return (
    <PhoneFrame scale={scale} statusTime="09:41" bg="#11181f">
      <ChatShell title="SimplesMEI" subtitle="online" hideComposer>
        {/* a frase torta que a pessoa mandou */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: 28 }}>
          <div style={{
            background: '#fff', border: `1.5px solid ${BRAND.coralSoft}`,
            borderRadius: 14, borderTopRightRadius: 4, padding: '10px 13px',
            maxWidth: '90%', fontSize: 13.5, lineHeight: 1.55, color: BRAND.ink,
            boxShadow: '0 1px 1px rgba(16,17,26,0.06)',
          }}>
            <Token acc={SIG_ACC.valor} highlighted={step >= 1 && step < 5} drained={step >= 5}>500 reais</Token>
            {' pra '}
            <Token acc={SIG_ACC.cliente} highlighted={step >= 2 && step < 6} drained={step >= 6}>Marina</Token>
            {', '}
            <Token acc={SIG_ACC.servico} highlighted={step >= 3 && step < 7} drained={step >= 7}>fiz o logo dela</Token>
            <div style={{ fontSize: 9.5, color: BRAND.inkSoft, opacity: 0.6, textAlign: 'right', marginTop: 3 }}>9:41 ✓✓</div>
          </div>
        </div>

        {/* digitando */}
        {step === 4 && (
          <div style={{ alignSelf: 'flex-start', background: '#fff', padding: '10px 13px', borderRadius: 14, borderTopLeftRadius: 4, display: 'flex', gap: 4, boxShadow: '0 1px 1px rgba(16,17,26,0.06)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: BRAND.inkSoft, animation: 'v5-bounce 1s 0ms infinite' }}/>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: BRAND.inkSoft, animation: 'v5-bounce 1s 150ms infinite' }}/>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: BRAND.inkSoft, animation: 'v5-bounce 1s 300ms infinite' }}/>
          </div>
        )}

        {/* o formulário montando (campos recebem os pedaços da frase) */}
        {step >= 5 && step < 8 && (
          <div>
            <div style={{ marginBottom: 6, paddingLeft: 2 }}>
              <Mono color={BRAND.inkSoft} size={9.5}>montei sua nota 👇</Mono>
            </div>
            <div style={{
              background: '#fff', borderRadius: 14, borderTopLeftRadius: 4, padding: '12px 14px 6px',
              maxWidth: '94%', boxShadow: '0 1px 1px rgba(16,17,26,0.06)', border: `1px solid ${BRAND.sandDeep}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <Mono color={BRAND.coralDeep} size={9.5}>NFS-e · conferindo</Mono>
                <Mono color={BRAND.inkSoft} size={9}>rascunho</Mono>
              </div>
              <FormRow first label="Valor" acc={SIG_ACC.valor} value="R$ 500,00" filled={step >= 5}/>
              <FormRow label="Cliente" acc={SIG_ACC.cliente} value="Clínica Dra. Marina" sub="CNPJ ••87 · reconhecida pelo nome" filled={step >= 6}/>
              <FormRow label="Serviço" acc={SIG_ACC.servico} value="Design de logotipo" filled={step >= 7}/>
            </div>
          </div>
        )}

        {/* o recibo encaixa */}
        {step >= 8 && (
          <div>
            <div style={{ marginBottom: 6, paddingLeft: 2 }}>
              <Mono color={BRAND.mintDeep} size={9.5}>pronto ✓ emitida e enviada</Mono>
            </div>
            <div style={{ paddingRight: 28 }}>
              <TileRecibo name="Clínica Dra. Marina · design de logotipo" amount="R$ 500,00" number="00501" note="📩 enviada pro WhatsApp da cliente · 09:41"/>
            </div>
          </div>
        )}
      </ChatShell>
    </PhoneFrame>
  );
}

/* legenda fina em mono que encosta no card (anotação no lugar) */
function Annotation({ text, style, side = 'right', show }) {
  const dot = <span style={{ width: 5, height: 5, borderRadius: '50%', background: BRAND.coral, flexShrink: 0 }}/>;
  const dash = <span style={{ width: 15, height: 1.5, background: BRAND.coral, borderRadius: 2, flexShrink: 0 }}/>;
  const conn = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {side === 'right' ? <React.Fragment>{dot}{dash}</React.Fragment> : <React.Fragment>{dash}{dot}</React.Fragment>}
    </div>
  );
  const chip = (
    <div style={{
      background: '#fff', border: `1px solid ${BRAND.sandDeep}`, borderRadius: 9,
      padding: '6px 10px', boxShadow: '0 8px 22px -14px rgba(16,17,26,0.40)',
      fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 600, color: BRAND.ink,
      letterSpacing: 0.2, whiteSpace: 'nowrap',
    }}>{text}</div>
  );
  return (
    <div style={{
      position: 'absolute', zIndex: 5, display: 'flex', alignItems: 'center', gap: 7,
      opacity: show ? 1 : 0, transition: 'opacity .5s ease', pointerEvents: 'none', ...style,
    }}>
      {side === 'right' ? <React.Fragment>{conn}{chip}</React.Fragment> : <React.Fragment>{chip}{conn}</React.Fragment>}
    </div>
  );
}

/* ─── HERÓI ────────────────────────────────────────────── */
function HeroV5() {
  const { step, replay } = useSignature();
  const m = useIsMobile();
  const annOn = step >= 8;
  return (
    <section data-anchor id="como-funciona" style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(180deg, #FCEBE3 0%, #FBF4EE 42%, ${BRAND.paper} 88%)` }}>
      {/* wash de calor coral */}
      <div style={{ position: 'absolute', top: -260, left: -160, width: 760, height: 760, borderRadius: '50%', background: `radial-gradient(circle, rgba(248,116,83,0.20) 0%, transparent 62%)`, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: -120, right: -120, width: 560, height: 560, borderRadius: '50%', background: `radial-gradient(circle, rgba(86,209,163,0.14) 0%, transparent 64%)`, pointerEvents: 'none' }}/>

      <div style={{
        maxWidth: 1240, margin: '0 auto', position: 'relative',
        padding: m ? '36px 20px 52px' : '70px 56px 84px',
        display: 'grid', gridTemplateColumns: m ? '1fr' : '1.04fr 0.96fr', gap: m ? 8 : 40, alignItems: 'center',
      }}>
        {/* coluna texto */}
        <div style={{ minWidth: 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 15px', borderRadius: 999,
            background: '#fff', border: '1px solid #FFDDD2', marginBottom: 30,
            boxShadow: '0 6px 18px -12px rgba(248,116,83,0.50)',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: BRAND.coral, flexShrink: 0 }}/>
            <Mono color={BRAND.coralDeep} size={11}>A IA que cuida do fiscal do MEI · dentro do WhatsApp</Mono>
          </div>
          <h1 style={{
            fontFamily: FONTS.display, fontWeight: 800,
            fontSize: m ? 'clamp(52px, 15vw, 76px)' : 108, lineHeight: 0.9, letterSpacing: m ? '-0.03em' : -4.4,
            color: BRAND.ink, margin: 0, textWrap: 'balance',
          }}>
            Deixa <span style={{ color: BRAND.coralDeep }}>comigo.</span>
          </h1>
          <p style={{
            fontFamily: FONTS.body, fontSize: 19, lineHeight: 1.52,
            color: BRAND.inkSoft, margin: '26px 0 0', maxWidth: 466,
          }}>
            Você manda a mensagem do seu jeito. A IA entende, emite a nota fiscal certinha e envia pro cliente. Sem portal travando, sem DAS esquecido, sem susto com o teto do MEI. Tudo numa conversa.
          </p>
          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Door label="emitir minha primeira nota grátis" text={DOOR_TEXT.hero} size={m ? 'lg' : 'xl'} block={m} preview/>
            <DoorNote/>
          </div>
        </div>

        {/* coluna celular + anotações no lugar */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: m ? 'auto' : 560, marginTop: m ? 8 : 0 }}>
          <div style={{ position: 'relative' }}>
            {/* brilho atrás do celular */}
            <div style={{ position: 'absolute', inset: -40, background: `radial-gradient(circle at 50% 60%, rgba(248,116,83,0.18) 0%, transparent 66%)`, pointerEvents: 'none' }}/>
            <SignaturePhone step={step} scale={m ? 0.74 : 0.66}/>

            {!m && (
              <React.Fragment>
                <Annotation show={annOn} side="right" text="achou a cliente só pelo nome" style={{ top: 150, right: -64 }}/>
                <Annotation show={annOn} side="left" text="projetou seu limite" style={{ top: 150, left: -58 }}/>
                <Annotation show={annOn} side="right" text="enviou pra ela sozinha" style={{ top: 238, right: -56 }}/>
              </React.Fragment>
            )}

            {/* replay discreto */}
            <button onClick={replay} style={{
              position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)',
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: '#fff', border: `1px solid ${BRAND.sandDeep}`, borderRadius: 999,
              padding: '6px 13px', cursor: 'pointer',
              boxShadow: '0 8px 22px -14px rgba(16,17,26,0.40)',
              fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.5,
              textTransform: 'uppercase', color: BRAND.inkSoft,
            }}>
              <span style={{ fontSize: 13, lineHeight: 1 }}>↻</span> rever
            </button>
          </div>
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

export { SIG_ACC, useSignature, Reveal, Token, FormRow, SignaturePhone, Annotation, HeroV5, TrustRowV5 };

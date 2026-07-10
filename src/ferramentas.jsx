import React from 'react';
import { BRAND, FONTS, useIsMobile, CheckSeal } from './tokens.jsx';
import { Mono } from './tiles.jsx';
import { NavV5 } from './porta_nav.jsx';
import { Footer } from './logo_footer.jsx';
import { SPOKES, SPOKE_SLUGS } from './data/spokes.js';

/* ════════════════════════════════════════════════════════════════════════
   /ferramentas (hub) + /ferramentas/consulta-cnae-mei/<slug> (spokes negativas).
   Spokes: páginas "[Profissão] pode ser MEI?" — a resposta é NÃO (regulamentada),
   com motivo, CNAE, alternativa e PAA. Conteúdo em src/data/spokes.js.
   Honestidade (PRODUTO.md): o SimplesMEI é a IA fiscal do MEI; NÃO abre ME/Simples.
   ════════════════════════════════════════════════════════════════════════ */

const TOOL_URL = '/ferramentas/consulta-cnae-mei';

/* estilos do FAQ (details tem `>` no seletor → dangerouslySetInnerHTML, ver #425) */
const SPOKE_STYLE = `
  details.spoke-faq > summary { list-style: none; outline: none; cursor: pointer; }
  details.spoke-faq > summary::-webkit-details-marker { display: none; }
  details.spoke-faq > summary:focus-visible { box-shadow: inset 0 0 0 2px #F87453; border-radius: 12px; }
  .spoke-faq-plus { transition: transform .26s cubic-bezier(.2,.7,.3,1); }
  details.spoke-faq[open] .spoke-faq-plus { transform: rotate(45deg); }
  .spoke-link { transition: color .14s ease, border-color .14s ease; }
  .spoke-link:hover { color: #C13E2E; }
  .spoke-card { transition: transform .16s cubic-bezier(.2,.7,.3,1), box-shadow .16s ease, border-color .16s ease; }
  .spoke-card:hover { transform: translateY(-3px); border-color: #E1DACE; box-shadow: 0 22px 44px -28px rgba(16,17,26,0.30); }
`;

/* ── selo "Sm." (mesmo da ferramenta) ── */
function SmMark({ size = 22 }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: size * 0.23, flexShrink: 0,
      background: 'linear-gradient(150deg, #F87453, #D8472F)', color: '#fff',
      fontFamily: FONTS.display, fontWeight: 800, fontSize: size * 0.48, letterSpacing: '-0.04em',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 ${size * 0.14}px ${size * 0.5}px rgba(193,62,46,0.30)`,
    }}>Sm<span style={{ color: BRAND.mint }}>.</span></span>
  );
}

/* ── breadcrumb (com links; o JSON-LD do prerender espelha isto) ── */
function Trail({ items, onCoral }) {
  const m = useIsMobile();
  const base = onCoral ? 'rgba(255,255,255,0.72)' : BRAND.inkSoft;
  const sep = onCoral ? 'rgba(255,255,255,0.40)' : BRAND.inkMute;
  const cur = onCoral ? '#fff' : BRAND.coralDeep;
  return (
    <nav aria-label="Trilha de navegação" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontFamily: FONTS.mono, fontSize: 11, letterSpacing: 0.3, marginBottom: m ? 16 : 22 }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {last
              ? <span aria-current="page" style={{ color: cur, fontWeight: 700 }}>{it.name}</span>
              : <a href={it.url} style={{ color: base, textDecoration: 'none', fontWeight: 600 }}>{it.name}</a>}
            {!last && <span aria-hidden="true" style={{ color: sep }}>/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

/* ════════════════ SPOKE: "[Profissão] pode ser MEI?" ════════════════ */
export function SpokePage({ data }) {
  const m = useIsMobile();
  const d = data;
  const p = { fontFamily: FONTS.body, fontSize: m ? 15.5 : 16.5, lineHeight: 1.7, color: BRAND.inkSoft, margin: '0 0 14px', textWrap: 'pretty' };
  const bb = { color: BRAND.ink, fontWeight: 700 };
  const h2 = { fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 24 : 30, lineHeight: 1.08, letterSpacing: m ? '-0.02em' : -0.8, color: BRAND.ink, margin: 0, textWrap: 'balance' };
  const rel = d.relacionados.map((s) => SPOKES[s]).filter(Boolean);

  return (
    <div style={{ background: BRAND.paper, fontFamily: FONTS.body, color: BRAND.ink }}>
      <NavV5 />

      {/* HERÓI coral — veredicto direto (formatado pra AI Overview/PAA) */}
      <section style={{ background: `linear-gradient(158deg, ${BRAND.coral} 0%, ${BRAND.coralDeep} 122%)`, padding: m ? '18px 20px 34px' : '30px 56px 46px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: -130, right: -70, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.16), transparent 62%)' }} />
        </div>
        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
          <Trail onCoral items={[
            { name: 'Início', url: '/' },
            { name: 'Ferramentas', url: '/ferramentas' },
            { name: 'Consulta CNAE MEI', url: TOOL_URL },
            { name: d.nome },
          ]} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.30)', padding: '6px 13px 6px 7px', borderRadius: 999, marginBottom: 16 }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', color: BRAND.coralDeep, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, lineHeight: 1 }}>✕</span>
            <Mono color="#fff" size={10.5}>Não pode ser MEI</Mono>
          </div>
          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 'clamp(28px, 8vw, 38px)' : 46, lineHeight: 1.03, letterSpacing: m ? '-0.03em' : -1.6, color: '#fff', margin: 0, textWrap: 'balance' }}>
            {d.nome} pode ser <span style={{ color: '#FFE0D6' }}>MEI</span>?
          </h1>
          <p style={{ fontFamily: FONTS.body, fontSize: m ? 16 : 18, lineHeight: 1.55, color: 'rgba(255,255,255,0.95)', margin: '16px 0 0', maxWidth: 620, textWrap: 'pretty', fontWeight: 500 }}>{d.resposta}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginTop: 18 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.16)', color: '#fff', padding: '6px 12px', borderRadius: 8, fontFamily: FONTS.mono, fontSize: 12, fontWeight: 700, letterSpacing: 0.2, border: '1px solid rgba(255,255,255,0.28)' }}>
              <span style={{ fontSize: 9, opacity: 0.75, letterSpacing: 0.6 }}>CNAE</span>{d.cnae}
            </span>
            <span style={{ fontFamily: FONTS.body, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{d.cnaeNome} — não permitido ao MEI</span>
          </div>
        </div>
      </section>

      {/* MOTIVO */}
      <section style={{ background: BRAND.paper, padding: m ? '30px 20px 8px' : '48px 56px 12px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={h2}>Por que {d.nome.toLowerCase()} não pode ser MEI</h2>
          <p style={{ ...p, marginTop: m ? 14 : 18 }}>{d.motivo}</p>
        </div>
      </section>

      {/* ALTERNATIVA + CTA */}
      <section style={{ background: BRAND.paper, padding: m ? '16px 20px 8px' : '24px 56px 16px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={h2}>E agora? Como ter CNPJ e emitir nota</h2>
          <p style={{ ...p, marginTop: m ? 14 : 18 }}>{d.alternativa}</p>
          <a href={TOOL_URL} className="spoke-card" style={{
            display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', marginTop: 10,
            background: '#fff', border: `1px solid ${BRAND.sandDeep}`, borderRadius: 16, padding: m ? '16px 18px' : '18px 22px',
          }}>
            <SmMark size={m ? 30 : 34} />
            <span style={{ minWidth: 0, flex: 1 }}>
              <span style={{ display: 'block', fontFamily: FONTS.display, fontWeight: 700, fontSize: m ? 15.5 : 17, letterSpacing: -0.3, color: BRAND.ink, lineHeight: 1.2 }}>Sua atividade é outra? Confira no verificador.</span>
              <span style={{ display: 'block', fontFamily: FONTS.body, fontSize: 13, color: BRAND.inkSoft, marginTop: 3 }}>Descubra na hora o CNAE, o imposto e se pode ser MEI — grátis.</span>
            </span>
            <span aria-hidden="true" style={{ color: BRAND.coralDeep, fontSize: 22, fontWeight: 700, flexShrink: 0 }}>→</span>
          </a>
        </div>
      </section>

      {/* FAQ (PAA) */}
      <section style={{ background: BRAND.paper, padding: m ? '24px 20px 8px' : '40px 56px 12px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={h2}>Perguntas frequentes</h2>
          <div style={{ marginTop: m ? 14 : 20 }}>
            {d.faq.map((it, i) => (
              <details key={i} className="spoke-faq" open={i === 0} style={{ borderTop: `1px solid ${BRAND.sandDeep}`, borderBottom: i === d.faq.length - 1 ? `1px solid ${BRAND.sandDeep}` : 'none' }}>
                <summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: m ? '16px 6px' : '20px 8px' }}>
                  <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: m ? 15.5 : 17.5, letterSpacing: -0.3, color: BRAND.ink, textWrap: 'balance' }}>{it.q}</span>
                  <span className="spoke-faq-plus" aria-hidden="true" style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: BRAND.coralSoft, color: BRAND.coralDeep, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, lineHeight: 1 }}>+</span>
                </summary>
                <p style={{ margin: m ? '0 6px 16px' : '0 8px 22px', fontFamily: FONTS.body, fontSize: m ? 14.5 : 15.5, lineHeight: 1.6, color: BRAND.inkSoft, maxWidth: 620, textWrap: 'pretty' }}>{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELACIONADAS + volta pro hub */}
      <section style={{ background: BRAND.paper, padding: m ? '20px 20px 52px' : '28px 56px 76px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Mono color={BRAND.inkMute} size={10.5}>Veja também</Mono>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
            {rel.map((r) => (
              <a key={r.slug} href={`${TOOL_URL}/${r.slug}`} className="cnae-chip spoke-card" style={{
                background: '#fff', color: BRAND.ink, border: `1px solid ${BRAND.sandDeep}`, textDecoration: 'none',
                padding: '10px 15px', borderRadius: 999, fontFamily: FONTS.body, fontSize: 14, fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 7,
              }}>{r.nome} pode ser MEI?</a>
            ))}
            <a href="/ferramentas/consulta-cnae-mei#nao-pode" className="cnae-chip spoke-card" style={{
              background: BRAND.coralSoft, color: BRAND.coralDeep, border: `1px solid ${BRAND.coralSoft}`, textDecoration: 'none',
              padding: '10px 15px', borderRadius: 999, fontFamily: FONTS.body, fontSize: 14, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', gap: 7,
            }}>Ver todas quem não pode →</a>
          </div>
        </div>
      </section>

      <Footer />
      <style dangerouslySetInnerHTML={{ __html: SPOKE_STYLE }} />
    </div>
  );
}

/* ════════════════ HUB: /ferramentas ════════════════ */
function ToolCard({ href, title, desc, tag, live }) {
  const m = useIsMobile();
  const inner = (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <SmMark size={m ? 32 : 38} />
        <span style={{
          fontFamily: FONTS.mono, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
          padding: '5px 11px', borderRadius: 999,
          background: live ? BRAND.mintSoft : BRAND.sand, color: live ? BRAND.mintDeep : BRAND.inkMute,
          border: `1px solid ${live ? 'transparent' : BRAND.creamDeep}`,
        }}>{tag}</span>
      </div>
      <span style={{ display: 'block', fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 20 : 23, letterSpacing: -0.5, color: BRAND.ink, marginTop: 16, lineHeight: 1.12 }}>{title}</span>
      <span style={{ display: 'block', fontFamily: FONTS.body, fontSize: m ? 14.5 : 15, lineHeight: 1.55, color: BRAND.inkSoft, marginTop: 8, textWrap: 'pretty' }}>{desc}</span>
      {live && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 16, fontFamily: FONTS.body, fontSize: 14, fontWeight: 700, color: BRAND.coralDeep }}>Abrir ferramenta <span aria-hidden="true">→</span></span>}
    </>
  );
  const style = {
    display: 'block', textDecoration: 'none', background: '#fff', border: `1px solid ${BRAND.sandDeep}`,
    borderRadius: 20, padding: m ? '22px 22px' : '26px 28px', opacity: live ? 1 : 0.72,
  };
  return live ? <a href={href} className="spoke-card" style={style}>{inner}</a> : <div style={style}>{inner}</div>;
}

export function FerramentasHub() {
  const m = useIsMobile();
  return (
    <div style={{ background: BRAND.paper, fontFamily: FONTS.body, color: BRAND.ink }}>
      <NavV5 />
      <section style={{ background: `linear-gradient(158deg, ${BRAND.coral} 0%, ${BRAND.coralDeep} 122%)`, padding: m ? '18px 20px 40px' : '30px 56px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: -130, right: -70, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.16), transparent 62%)' }} />
          <div style={{ position: 'absolute', bottom: -170, left: -90, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(86,209,163,0.20), transparent 64%)' }} />
        </div>
        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: m ? 14 : 20 }}>
            <Trail onCoral items={[{ name: 'Início', url: '/' }, { name: 'Ferramentas' }]} />
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.30)', padding: '5px 12px', borderRadius: 999, fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#fff', marginBottom: 16 }}>Grátis · sem cadastro</span>
          <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 'clamp(30px, 8.5vw, 40px)' : 48, lineHeight: 1.02, letterSpacing: m ? '-0.03em' : -1.8, color: '#fff', margin: 0, textWrap: 'balance' }}>Ferramentas grátis para o <span style={{ color: '#FFE0D6' }}>MEI</span></h1>
          <p style={{ fontFamily: FONTS.body, fontSize: m ? 15.5 : 17, lineHeight: 1.55, color: 'rgba(255,255,255,0.92)', margin: '16px auto 0', maxWidth: 520, textWrap: 'pretty' }}>Ferramentas rápidas pra tirar as dúvidas do seu CNPJ — sem portal, sem cadastro. Feitas pela IA que cuida do fiscal do MEI no WhatsApp.</p>
        </div>
      </section>

      <section style={{ background: BRAND.paper, padding: m ? '32px 20px 56px' : '48px 56px 84px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(2, 1fr)', gap: m ? 14 : 20 }}>
          <ToolCard live href={TOOL_URL} tag="No ar" title="Consulta CNAE MEI" desc="Digite sua profissão e veja na hora se pode ser MEI, o CNAE e o imposto. Cobre as 466 atividades permitidas e as que não podem." />
          <ToolCard tag="Em breve" title="Calculadora de DAS MEI" desc="Quanto você paga de DAS por mês em 2026 — comércio, serviço ou os dois. Em breve por aqui." />
        </div>
      </section>

      <Footer />
      <style dangerouslySetInnerHTML={{ __html: SPOKE_STYLE }} />
    </div>
  );
}

export { SPOKES, SPOKE_SLUGS };

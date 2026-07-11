import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BRAND, FONTS, useIsMobile, CheckSeal } from './tokens.jsx';
import { Mono } from './tiles.jsx';
import { Door, NavV5 } from './porta_nav.jsx';
import { Footer } from './logo_footer.jsx';
import { OCCUPATIONS, CATS, EXEMPLOS, POPULAR, NOT_MEI, FAQ_ITEMS, buscar, norm, ocCurto } from './data/cnae_mei.js';
import { detectNaoMei, REGULATED, FORBIDDEN } from './data/cnae_naomei.js';
import { SPOKES } from './data/spokes.js';

/* ════════════════════════════════════════════════════════════════════════
   FERRAMENTA "Sua atividade pode ser MEI?" — /ferramentas/consulta-cnae-mei
   Origem: mockup site/ferramenta-cnae.html (Claude Design), portado pros tokens.
   Dados: as 466 ocupações reais (Anexo XI Res. CGSN 140/2018) via cnae_mei.js.
   Pré-lançamento: a porta cai na lista de espera (Door → waHref).
   ════════════════════════════════════════════════════════════════════════ */

/* ── lupa ── */
function SearchIcon({ size = 22, color = BRAND.inkMid }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="7" stroke={color} strokeWidth="2" />
      <line x1="15.6" y1="15.6" x2="21" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── selo "Sm." da marca (telha coral; sobre coral vira tinta) ── */
function SmMark({ size = 22, inverted = false }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: size * 0.23, flexShrink: 0,
      background: inverted ? BRAND.ink : 'linear-gradient(150deg, #F87453, #D8472F)',
      color: '#fff', fontFamily: FONTS.display, fontWeight: 800, fontSize: size * 0.48,
      letterSpacing: '-0.04em', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: inverted
        ? `0 ${size * 0.14}px ${size * 0.5}px rgba(16,17,26,0.32)`
        : `0 ${size * 0.14}px ${size * 0.5}px rgba(193,62,46,0.30)`,
    }}>Sm<span style={{ color: BRAND.mint }}>.</span></span>
  );
}

/* ── cabeçalho centrado ── */
function ToolHead({ onCoral }) {
  const m = useIsMobile();
  const titleClr = onCoral ? '#fff' : BRAND.ink;
  const meiClr = onCoral ? '#fff' : BRAND.coral;
  const descClr = onCoral ? 'rgba(255,255,255,0.92)' : BRAND.inkSoft;
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: m ? 10 : 14, marginBottom: m ? 14 : 18 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: m ? 9 : 12 }}>
          <SmMark size={m ? 30 : 38} inverted={onCoral} />
          <span style={{ fontFamily: FONTS.body, fontWeight: 800, fontSize: m ? 26 : 32, letterSpacing: '-0.02em', lineHeight: 1, color: onCoral ? '#fff' : BRAND.ink }}>
            Simples<span style={{ color: onCoral ? '#FFE0D6' : BRAND.coral }}>MEI</span>
          </span>
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center',
          background: onCoral ? 'rgba(255,255,255,0.16)' : BRAND.coralSoft,
          border: `1px solid ${onCoral ? 'rgba(255,255,255,0.30)' : 'transparent'}`,
          padding: '5px 12px', borderRadius: 999,
          fontFamily: FONTS.mono, fontSize: m ? 9.5 : 10.5, fontWeight: 700,
          letterSpacing: '0.16em', textTransform: 'uppercase', color: onCoral ? '#fff' : BRAND.coralDeep,
        }}>Ferramenta grátis</span>
      </div>
      <h1 style={{
        fontFamily: FONTS.display, fontWeight: 800,
        fontSize: m ? 'clamp(30px, 8.5vw, 40px)' : 48, lineHeight: 1.02,
        letterSpacing: m ? '-0.03em' : -1.8, color: titleClr, margin: 0, textWrap: 'balance',
      }}>Sua atividade pode ser <span style={{ color: meiClr }}>MEI</span>?</h1>
      <p style={{
        fontFamily: FONTS.body, fontSize: m ? 15.5 : 17, lineHeight: 1.55,
        color: descClr, margin: '16px auto 0', maxWidth: 500, textWrap: 'pretty',
      }}>
        Digite sua profissão e descubra na hora o <b style={{ color: titleClr, fontWeight: 700 }}>CNAE</b> e qual o imposto. Sem cadastro.
      </p>
    </div>
  );
}

/* ── campo de busca (o herói) ── */
function SearchField({ value, onChange, inputRef, onCoral }) {
  const m = useIsMobile();
  const [focused, setFocused] = useState(false);
  return (
    <div className={`cnae-magic${onCoral ? ' on-coral' : ''}${focused ? ' is-focused' : ''}`} style={{
      borderRadius: 18,
      boxShadow: onCoral
        ? '0 26px 50px -22px rgba(120,28,14,0.60)'
        : (focused ? '0 22px 44px -24px rgba(16,17,26,0.34)' : '0 12px 30px -22px rgba(16,17,26,0.22)'),
      transition: 'box-shadow .2s ease',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: '#fff', borderRadius: 16,
        padding: m ? '0 12px 0 16px' : '0 14px 0 20px',
        minHeight: m ? 58 : 66,
        boxShadow: focused ? 'inset 0 0 0 1.5px rgba(248,116,83,0.16)' : 'none',
        transition: 'box-shadow .18s ease',
      }}>
        <SearchIcon size={m ? 20 : 23} color={focused ? BRAND.coral : BRAND.inkMid} />
        <input
          ref={inputRef}
          type="text"
          inputMode="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="ex.: faço unha em casa, vendo marmita, conserto celular"
          aria-label="Buscar sua profissão na lista do MEI"
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: FONTS.body, fontSize: m ? 16 : 18, fontWeight: 600, color: BRAND.ink,
            letterSpacing: -0.2, padding: '10px 0',
          }}
        />
        {value && (
          <button
            className="cnae-clearbtn"
            onClick={() => { onChange(''); inputRef.current && inputRef.current.focus(); }}
            aria-label="Limpar busca"
            style={{
              flexShrink: 0, width: 34, height: 34, borderRadius: '50%', border: 'none',
              background: BRAND.paper, color: BRAND.inkSoft, cursor: 'pointer',
              fontSize: 17, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        )}
      </div>
    </div>
  );
}

/* ── microcopy "a IA acha" ── */
function AiHint({ onCoral }) {
  const m = useIsMobile();
  const brand = onCoral ? '#fff' : BRAND.mintDeep;
  const rest = onCoral ? 'rgba(255,255,255,0.85)' : BRAND.inkSoft;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%', background: BRAND.mint, flexShrink: 0,
        boxShadow: `0 0 0 3px ${onCoral ? 'rgba(86,209,163,0.28)' : BRAND.mintSoft}`,
      }} />
      <span style={{ fontFamily: FONTS.body, fontSize: m ? 13 : 13.5, fontWeight: 600, color: rest, letterSpacing: -0.1, textWrap: 'balance', textAlign: 'center' }}>
        <b style={{ color: brand, fontWeight: 700 }}>A IA da SimplesMEI</b> acha sua atividade e o CNAE ideal enquanto você digita
      </span>
    </div>
  );
}

/* ── selo, badge CNAE e chip de imposto ── */
function SeloMei() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0,
      background: BRAND.mintSoft, color: BRAND.mintDeep,
      padding: '5px 11px 5px 6px', borderRadius: 999,
      fontFamily: FONTS.body, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap',
    }}>
      <CheckSeal size={16} /> Pode ser MEI
    </span>
  );
}
function CnaeBadge({ code }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: BRAND.coralSoft, color: BRAND.coralDeep,
      padding: '5px 11px', borderRadius: 8,
      fontFamily: FONTS.mono, fontSize: 12, fontWeight: 700, letterSpacing: 0.2,
    }}>
      <span style={{ fontSize: 9, opacity: 0.7, letterSpacing: 0.6 }}>CNAE</span>{code}
    </span>
  );
}
function TribChip({ trib }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: BRAND.sand, color: BRAND.inkSoft,
      padding: '5px 10px', borderRadius: 8,
      fontFamily: FONTS.mono, fontSize: 11, fontWeight: 600, letterSpacing: 0.4,
      border: `1px solid ${BRAND.creamDeep}`,
    }}>{trib}</span>
  );
}

/* ── card de resultado ── */
function ResultCard({ it }) {
  return (
    <div className="cnae-card" style={{
      background: '#fff', border: `1px solid ${BRAND.sandDeep}`, borderRadius: 16,
      padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <span style={{
          fontFamily: FONTS.display, fontWeight: 700, fontSize: 17.5, lineHeight: 1.25,
          letterSpacing: -0.3, color: BRAND.ink, textWrap: 'balance',
        }}>{it.oc}</span>
        <SeloMei />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <CnaeBadge code={it.cnae} />
        <TribChip trib={it.trib} />
      </div>
    </div>
  );
}

/* ── a porta = lista de espera (pré-lançamento), contextual ── */
function WaitlistBand({ topOc, topCnae }) {
  const m = useIsMobile();
  const contextual = !!topOc;
  // label FIXO e curto (o contexto vai no preview "já vai digitado" e no título) — um
  // label por-ocupação estourava a largura do botão (nowrap) com nomes longos.
  const label = 'entrar na lista de espera';
  const text = contextual
    ? `quero que a IA abra meu MEI de ${ocCurto(topOc)} (CNAE ${topCnae}) — me avisa quando abrir`
    : 'quero entrar na lista de espera do SimplesMEI — me avisa quando abrir';
  return (
    <div style={{
      background: '#fff', border: `1px solid ${BRAND.sandDeep}`, borderRadius: 20,
      padding: m ? '24px 22px' : '30px 34px', position: 'relative', overflow: 'hidden',
      display: 'grid', gridTemplateColumns: m ? '1fr' : '1.2fr 1fr', gap: m ? 20 : 36, alignItems: 'center',
      boxShadow: '0 26px 60px -42px rgba(16,17,26,0.28)',
    }}>
      <div className="v5-comet-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4 }} />
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
          <SmMark size={18} />
          <Mono color={BRAND.amberDeep} size={10.5}>SimplesMEI · pré-lançamento · lista de espera</Mono>
        </div>
        <h3 style={{
          fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 24 : 28, lineHeight: 1.08,
          letterSpacing: -0.8, color: BRAND.ink, margin: 0, textWrap: 'balance',
        }}>
          {contextual ? 'A IA abre seu MEI com o CNAE certo.' : 'Quer que a IA cuide de tudo pra você?'}
        </h3>
        <p style={{
          fontFamily: FONTS.body, fontSize: m ? 14 : 15, lineHeight: 1.55,
          color: BRAND.inkSoft, margin: '10px 0 0', maxWidth: 440, textWrap: 'pretty',
        }}>
          {contextual
            ? 'Ela abre o CNPJ, emite suas notas, cuida do DAS e vigia o teto. O SimplesMEI ainda não abriu, mas você é avisado assim que abrir.'
            : 'Abertura do MEI, notas, DAS e teto, tudo numa conversa de WhatsApp. O SimplesMEI ainda não abriu, mas você é avisado assim que abrir.'}
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: m ? 'flex-start' : 'flex-end' }}>
        <Door label={label} text={text} size="lg" block={m} preview align="left" />
      </div>
    </div>
  );
}

/* ── linha de chips reutilizável (variant 'example' = frase coloquial, com lupa e aspas) ── */
function ChipRow({ items, onPick, variant }) {
  const ex = variant === 'example';
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 14, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
      {items.map((h) => (
        <button key={h} className="cnae-chip" onClick={() => onPick(h)} style={{
          background: '#fff', color: ex ? BRAND.inkSoft : BRAND.ink, border: `1px solid ${BRAND.sandDeep}`,
          padding: '10px 16px', borderRadius: 999, cursor: 'pointer', minHeight: 44,
          fontFamily: FONTS.body, fontSize: 14.5, fontWeight: 600, letterSpacing: -0.1,
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          {ex
            ? <><SearchIcon size={14} color={BRAND.mintDeep} /><span style={{ color: BRAND.ink }}>“{h}”</span></>
            : <><span style={{ color: BRAND.coral, marginTop: -1 }}>+</span>{h}</>}
        </button>
      ))}
    </div>
  );
}

/* ── estado: vazio / inicial — o "fala do seu jeito" (semântico) em cima, cnae por atividade embaixo ── */
function EmptyState({ onPick }) {
  const m = useIsMobile();
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <Mono color={BRAND.mintDeep} size={10.5}>experimente — fala do seu jeito</Mono>
      </div>
      <ChipRow items={EXEMPLOS} onPick={onPick} variant="example" />
      <div style={{ textAlign: 'center', marginTop: m ? 24 : 28 }}>
        <Mono color={BRAND.inkMute} size={10.5}>ou o CNAE por atividade e negócio</Mono>
      </div>
      <ChipRow items={POPULAR} onPick={onPick} />
      <p style={{
        textAlign: 'center', fontFamily: FONTS.body, fontSize: 13.5, color: BRAND.inkSoft,
        margin: `${m ? 22 : 28}px auto 0`, maxWidth: 460, lineHeight: 1.55,
      }}>
        Escreve a sua atividade do jeito que você fala — “faço unha em casa”, “vendo marmita”. A IA acha mesmo com apelido, sem acento e sem se preocupar com maiúscula.
      </p>
    </div>
  );
}

/* ── estado: sem resultado ── */
function NoResultState({ query }) {
  const m = useIsMobile();
  return (
    <div>
      <div style={{
        background: '#fff', border: `1px solid ${BRAND.sandDeep}`, borderRadius: 20,
        padding: m ? '28px 22px' : '38px 40px', textAlign: 'center', maxWidth: 620, margin: '0 auto',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', background: BRAND.paper,
          border: `1px solid ${BRAND.sandDeep}`, display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 18px',
        }}>
          <SearchIcon size={24} color={BRAND.inkMute} />
        </div>
        <h3 style={{
          fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 20 : 23, lineHeight: 1.2,
          letterSpacing: -0.5, color: BRAND.ink, margin: 0, textWrap: 'balance',
        }}>
          Não encontramos “{query.trim()}” na lista oficial do MEI.
        </h3>
        <p style={{
          fontFamily: FONTS.body, fontSize: m ? 14.5 : 15.5, lineHeight: 1.6,
          color: BRAND.inkSoft, margin: '12px auto 0', maxWidth: 460, textWrap: 'pretty',
        }}>
          Essa atividade <b style={{ color: BRAND.ink }}>pode não ser permitida</b> ao MEI. Profissões regulamentadas (como {NOT_MEI.slice(0, 3).join(', ')}) e algumas intelectuais ficam de fora. Confere a grafia ou tenta um termo mais simples.
        </p>
        <a
          href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei/atividades-permitidas"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20,
            fontFamily: FONTS.body, fontSize: 14, fontWeight: 700, color: BRAND.coralDeep,
            textDecoration: 'none', borderBottom: `2px solid ${BRAND.coralSoft}`, paddingBottom: 2,
          }}
        >
          Ver a lista completa no Portal do Empreendedor <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div style={{ marginTop: m ? 20 : 26 }}>
        <WaitlistBand />
      </div>
    </div>
  );
}

/* ── estado: NÃO pode ser MEI (profissão regulamentada / atividade vedada) ── */
function NaoMeiState({ nao }) {
  const m = useIsMobile();
  const reg = nao.tipo === 'regulamentada';
  return (
    <div style={{
      background: '#fff', border: `1px solid ${BRAND.sandDeep}`, borderRadius: 20,
      padding: m ? '28px 22px' : '38px 40px', maxWidth: 640, margin: '0 auto',
    }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(200,93,0,0.10)', padding: '6px 13px 6px 7px', borderRadius: 999, marginBottom: 16 }}>
        <span style={{ width: 20, height: 20, borderRadius: '50%', background: BRAND.amberDeep, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, lineHeight: 1 }}>✕</span>
        <Mono color={BRAND.amberDeep} size={10.5}>Não pode ser MEI</Mono>
      </div>
      <h3 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 21 : 25, lineHeight: 1.18, letterSpacing: -0.5, color: BRAND.ink, margin: 0, textWrap: 'balance' }}>
        Essa atividade não entra no MEI.
      </h3>
      <p style={{ fontFamily: FONTS.body, fontSize: m ? 15 : 16, lineHeight: 1.6, color: BRAND.inkSoft, margin: '12px 0 0', textWrap: 'pretty' }}>
        {reg
          ? <><b style={{ color: BRAND.ink }}>{nao.label}</b> é uma <b style={{ color: BRAND.ink }}>profissão regulamentada</b> (tem conselho de classe), e a lei não permite exercê-la como MEI.</>
          : <>É uma atividade <b style={{ color: BRAND.ink }}>vedada ao MEI</b> por natureza — <b style={{ color: BRAND.ink }}>{nao.label}</b> fica fora da lista oficial de ocupações.</>}
      </p>
      {nao.cnae && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginTop: 16 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: BRAND.sand, color: BRAND.inkSoft, padding: '5px 11px', borderRadius: 8, fontFamily: FONTS.mono, fontSize: 12, fontWeight: 700, letterSpacing: 0.2, border: `1px solid ${BRAND.creamDeep}` }}>
            <span style={{ fontSize: 9, opacity: 0.7, letterSpacing: 0.6 }}>CNAE</span>{nao.cnae}
          </span>
          <span style={{ fontFamily: FONTS.body, fontSize: 12.5, color: BRAND.inkMute, textWrap: 'pretty' }}>{nao.cnaeNome} — não permitido ao MEI</span>
        </div>
      )}
      <p style={{ fontFamily: FONTS.body, fontSize: m ? 14.5 : 15, lineHeight: 1.6, color: BRAND.inkSoft, margin: '16px 0 0', textWrap: 'pretty' }}>
        O caminho costuma ser outro regime — em geral uma <b style={{ color: BRAND.ink }}>Microempresa (ME)</b> no Simples Nacional. Vale confirmar com um contador.
      </p>
      <a href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei/atividades-permitidas" target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, fontFamily: FONTS.body, fontSize: 14, fontWeight: 700, color: BRAND.coralDeep, textDecoration: 'none', borderBottom: `2px solid ${BRAND.coralSoft}`, paddingBottom: 2 }}>
        Ver a lista oficial de atividades do MEI <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

/* ── busca acontecendo (lexical vazio, semântico ainda voltando) ── */
function SearchingState({ query }) {
  const m = useIsMobile();
  return (
    <div style={{ textAlign: 'center', padding: m ? '30px 20px' : '44px 40px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: FONTS.body, fontSize: m ? 14.5 : 15.5, fontWeight: 600, color: BRAND.inkSoft }}>
        <span className="cnae-pulse" style={{ width: 9, height: 9, borderRadius: '50%', background: BRAND.mint, flexShrink: 0 }} />
        A IA está procurando “{query.trim()}” por significado…
      </div>
    </div>
  );
}

/* ── estado: com resultados (cap em 6, com "ver todas") ── */
const RESULT_LIMIT = 6;
function ResultsState({ results, query, smart }) {
  const m = useIsMobile();
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? results : results.slice(0, RESULT_LIMIT);
  const extra = results.length - shown.length;
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        gap: 12, flexWrap: 'wrap', marginBottom: m ? 14 : 18,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <Mono color={BRAND.inkSoft} size={11}>
            {results.length} {results.length === 1 ? 'atividade encontrada' : 'atividades encontradas'} para “{query.trim()}”
          </Mono>
          {smart && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FONTS.mono, fontSize: 10, fontWeight: 700, letterSpacing: 0.3, color: BRAND.mintDeep }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: BRAND.mint, boxShadow: `0 0 0 3px ${BRAND.mintSoft}` }} />BUSCA INTELIGENTE
            </span>
          )}
        </span>
        <Mono color={BRAND.inkMute} size={10}>ISS = serviço · ICMS = comércio/indústria</Mono>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(2, 1fr)', gap: m ? 10 : 14 }}>
        {shown.map((it) => <li key={it.oc + it.cnae}><ResultCard it={it} /></li>)}
      </ul>
      {extra > 0 && (
        <div style={{ textAlign: 'center', marginTop: m ? 14 : 18 }}>
          <button onClick={() => setShowAll(true)} className="cnae-chip" style={{
            background: '#fff', color: BRAND.coralDeep, border: `1px solid ${BRAND.sandDeep}`,
            padding: '10px 18px', borderRadius: 999, cursor: 'pointer', minHeight: 44,
            fontFamily: FONTS.body, fontSize: 14, fontWeight: 700, letterSpacing: -0.1,
          }}>+{extra} {extra === 1 ? 'outra atividade' : 'outras atividades'}</button>
        </div>
      )}
      <div style={{ marginTop: m ? 24 : 32 }}>
        <WaitlistBand topOc={results[0].oc} topCnae={results[0].cnae} />
      </div>
    </div>
  );
}

/* ── seção navegável — acordeão por categoria ── */
function CatItem({ cat, ocs, open, onToggle, onPick, id }) {
  const m = useIsMobile();
  const [title, hint] = cat;
  return (
    <div id={id} style={{
      scrollMarginTop: 84,
      background: '#fff', border: `1px solid ${open ? BRAND.coral : BRAND.sandDeep}`, borderRadius: 16,
      boxShadow: open ? '0 18px 40px -30px rgba(248,116,83,0.5)' : 'none',
      transition: 'border-color .2s ease, box-shadow .2s ease', overflow: 'hidden',
    }}>
      <button className="cnae-catbtn" aria-expanded={open} onClick={onToggle} style={{
        width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
        padding: m ? '15px 16px' : '18px 22px', minHeight: 56,
      }}>
        <span style={{ minWidth: 0 }}>
          <span style={{
            fontFamily: FONTS.display, fontWeight: 700, fontSize: m ? 15.5 : 17,
            letterSpacing: -0.3, color: BRAND.ink, display: 'block', lineHeight: 1.2,
          }}>{title}</span>
          <span style={{ fontFamily: FONTS.body, fontSize: 12.5, color: BRAND.inkSoft, display: 'block', marginTop: 3 }}>{hint}</span>
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <Mono color={BRAND.inkMute} size={10.5}>{ocs.length}</Mono>
          <span className="cnae-chev" aria-hidden="true" style={{
            width: 28, height: 28, borderRadius: '50%',
            background: open ? BRAND.coral : BRAND.coralSoft, color: open ? '#fff' : BRAND.coralDeep,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)', fontSize: 20, fontWeight: 400, lineHeight: 1,
          }}>+</span>
        </span>
      </button>
      <div className="cnae-acc" style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}>
        <div className="cnae-clip">
          <div style={{ padding: m ? '0 16px 16px' : '0 22px 20px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ocs.map((it) => (
              <button
                key={it.oc + it.cnae}
                className="cnae-chip"
                onClick={() => onPick(it.oc)}
                title={`${it.cnae} · ${it.trib}`}
                style={{
                  background: BRAND.paper, color: BRAND.ink, border: `1px solid ${BRAND.sandDeep}`,
                  padding: '8px 13px', borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap',
                  fontFamily: FONTS.body, fontSize: 13, fontWeight: 600, letterSpacing: -0.1,
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}
              >
                {ocCurto(it.oc)}
                <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: BRAND.inkMute, fontWeight: 600, whiteSpace: 'nowrap' }}>{it.cnae}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowseAll({ onPick }) {
  const m = useIsMobile();
  const [open, setOpen] = useState({ 0: true });
  const toggle = (i) => setOpen((o) => ({ ...o, [i]: !o[i] }));
  const byCat = useMemo(() => CATS.map((_, ci) => OCCUPATIONS.filter((d) => d.cat === ci)), []);
  return (
    <section data-anchor id="todas" style={{ background: BRAND.paper, padding: m ? '8px 20px 56px' : '24px 56px 84px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: m ? 22 : 30 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span className="v5-comet-line" style={{ width: 26, height: 2, borderRadius: 2 }} />
            <Mono color={BRAND.coralDeep} size={11}>Quem pode ser MEI</Mono>
            <span className="v5-comet-line" style={{ width: 26, height: 2, borderRadius: 2 }} />
          </div>
          <h2 style={{
            fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 26 : 34, lineHeight: 1.05,
            letterSpacing: m ? '-0.03em' : -1.2, color: BRAND.ink, margin: 0, textWrap: 'balance',
          }}>As 466 atividades permitidas ao MEI</h2>
          <p style={{
            fontFamily: FONTS.body, fontSize: m ? 14.5 : 15.5, lineHeight: 1.55, color: BRAND.inkSoft,
            margin: '12px auto 0', maxWidth: 440, textWrap: 'pretty',
          }}>Toca numa categoria para ver as ocupações. Clica numa ocupação para ver o CNAE e o imposto lá em cima.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: m ? 10 : 12 }}>
          {CATS.map((cat, i) => (
            <CatItem key={i} id={'cat-' + norm(cat[0]).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')} cat={cat} ocs={byCat[i]} open={!!open[i]} onToggle={() => toggle(i)} onPick={onPick} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── (A) explicativo: prosa única + H2/H3 (o que é CNAE, ISS×ICMS, quem pode) ── */
function ExplainerSection() {
  const m = useIsMobile();
  const p = { fontFamily: FONTS.body, fontSize: m ? 15 : 16, lineHeight: 1.7, color: BRAND.inkSoft, margin: '0 0 14px', textWrap: 'pretty' };
  const bb = { color: BRAND.ink, fontWeight: 700 };
  const h3 = { fontFamily: FONTS.display, fontWeight: 700, fontSize: m ? 18 : 21, letterSpacing: -0.4, color: BRAND.ink, margin: m ? '24px 0 10px' : '30px 0 12px' };
  return (
    <section data-anchor id="o-que-e" style={{ background: BRAND.paper, padding: m ? '4px 20px 8px' : '8px 56px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: m ? 18 : 24 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span className="v5-comet-line" style={{ width: 26, height: 2, borderRadius: 2 }} />
            <Mono color={BRAND.coralDeep} size={11}>Entenda em 1 minuto</Mono>
            <span className="v5-comet-line" style={{ width: 26, height: 2, borderRadius: 2 }} />
          </div>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 26 : 34, lineHeight: 1.05, letterSpacing: m ? '-0.03em' : -1.2, color: BRAND.ink, margin: 0, textWrap: 'balance' }}>O que é o CNAE do MEI</h2>
        </div>
        <p style={p}>O <b style={bb}>CNAE</b> (Classificação Nacional de Atividades Econômicas) é o código que diz, para os órgãos públicos, qual é a sua atividade. No MEI, é ele que define <b style={bb}>qual nota fiscal você emite</b> e <b style={bb}>qual imposto você paga</b>. Todo MEI tem uma atividade <b style={bb}>principal</b> e pode incluir até 15 <b style={bb}>secundárias</b> — desde que todas estejam na lista oficial de atividades permitidas ao MEI.</p>
        <h3 style={h3}>ISS ou ICMS: o que o CNAE muda pra você</h3>
        <p style={p}>O imposto do MEI é fixo e mensal (o DAS), mas o CNAE define a <b style={bb}>natureza</b> dele: atividade de <b style={bb}>serviço</b> recolhe <b style={bb}>ISS</b>; <b style={bb}>comércio e indústria</b> recolhem <b style={bb}>ICMS</b>; quem vende e presta serviço ao mesmo tempo pode ter os dois. Achar o CNAE certo é o primeiro passo pra saber como sua nota e seu imposto funcionam.</p>
        <h3 style={h3}>Quem pode e quem não pode ser MEI</h3>
        <p style={{ ...p, margin: 0 }}>Podem ser MEI as <b style={bb}>466 ocupações</b> do Anexo XI da Resolução CGSN nº 140/2018 — de manicure a pedreiro, de confeiteira a motoboy. Ficam de <b style={bb}>fora</b> as profissões <b style={bb}>regulamentadas</b> (com conselho de classe, como médico, advogado e psicólogo) e algumas atividades <b style={bb}>vedadas por natureza</b>. É só digitar o que você faz na busca aqui em cima: a IA acha o seu CNAE, o imposto e diz na hora se pode — ou não — ser MEI.</p>
      </div>
    </section>
  );
}

/* ── (A) "Quem NÃO pode ser MEI": índice fixo (regulamentadas + vedadas), sempre no DOM ── */
const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/* card de destaque — as negativas mais buscadas que já têm página própria (spoke) */
function SpokeCard({ nome, slug, cnae }) {
  const m = useIsMobile();
  return (
    <a href={`/ferramentas/consulta-cnae-mei/${slug}`} className="cnae-card" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, textDecoration: 'none',
      background: '#fff', border: `1px solid ${BRAND.sandDeep}`, borderRadius: 14, padding: m ? '13px 15px' : '15px 18px',
    }}>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: 'block', fontFamily: FONTS.display, fontWeight: 700, fontSize: m ? 15 : 16, letterSpacing: -0.3, color: BRAND.ink, lineHeight: 1.2 }}>{nome} pode ser MEI?</span>
        <span style={{ display: 'block', fontFamily: FONTS.mono, fontSize: 10.5, color: BRAND.inkMute, marginTop: 3 }}>CNAE {cnae} · ver o porquê</span>
      </span>
      <span aria-hidden="true" style={{ color: BRAND.coralDeep, fontSize: 18, fontWeight: 700, flexShrink: 0 }}>→</span>
    </a>
  );
}

/* lista compacta (nome · nome · …) — tudo no DOM (SEO), leitura leve.
   Os espaços ao redor do "·" são obrigatórios: dão a oportunidade de quebra de linha
   (nomes de palavra única emendados por "·" viram uma linha só e estouram). */
function CompactList({ items }) {
  // item pode ser string (texto puro) ou { label, href } (vira link quando há página)
  return (
    <p style={{ fontFamily: FONTS.body, fontSize: 14.5, lineHeight: 2, color: BRAND.inkSoft, margin: 0, textWrap: 'pretty', overflowWrap: 'anywhere' }}>
      {items.map((item, i) => {
        const label = typeof item === 'string' ? item : item.label;
        const href = typeof item === 'string' ? null : item.href;
        return (
          <React.Fragment key={label}>
            {href
              ? <a href={href} className="cnae-reglink" style={{ color: BRAND.ink, fontWeight: 600, textDecoration: 'none' }}>{label}</a>
              : <span style={{ color: BRAND.ink, fontWeight: 600 }}>{label}</span>}
            {i < items.length - 1 ? <span style={{ color: BRAND.inkMute }}>{' · '}</span> : null}
          </React.Fragment>
        );
      })}
    </p>
  );
}

function NaoMeiIndex() {
  const m = useIsMobile();
  const h3 = { fontFamily: FONTS.display, fontWeight: 700, fontSize: m ? 15.5 : 17, letterSpacing: -0.3, color: BRAND.ink, margin: '0 0 14px' };
  const hint = { fontFamily: FONTS.body, fontWeight: 600, fontSize: m ? 12.5 : 13.5, color: BRAND.inkMute };
  const allSpokes = Object.values(SPOKES);
  const cards = allSpokes.filter((s) => s.kwVol >= 480);       // destaque: mais buscadas (vol ≥ 480)
  const linkSpokes = allSpokes.filter((s) => s.kwVol < 480);   // cauda-longa: hyperlink na lista "Outras" (tem página, mas fora do grid)
  const spokeCnaes = new Set(allSpokes.map((s) => s.cnae));
  // "Outras profissões regulamentadas": spokes cauda-longa (com link) + reguladas sem página (texto puro)
  const restRegText = REGULATED.filter((r) => !spokeCnaes.has(r.cnae)).map((r) => r.area);
  const otherReg = [
    ...linkSpokes.map((s) => ({ label: s.nome, href: `/ferramentas/consulta-cnae-mei/${s.slug}` })),
    ...restRegText.map((area) => ({ label: area })),
  ];
  const vedadas = FORBIDDEN.map((f) => capFirst(f.categoria));
  return (
    <section data-anchor id="nao-pode" style={{ background: BRAND.paper, padding: m ? '4px 20px 52px' : '8px 56px 76px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: m ? 24 : 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span className="v5-comet-line" style={{ width: 26, height: 2, borderRadius: 2 }} />
            <Mono color={BRAND.coralDeep} size={11}>Quem fica de fora</Mono>
            <span className="v5-comet-line" style={{ width: 26, height: 2, borderRadius: 2 }} />
          </div>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 26 : 34, lineHeight: 1.05, letterSpacing: m ? '-0.03em' : -1.2, color: BRAND.ink, margin: 0, textWrap: 'balance' }}>Quem <span style={{ color: BRAND.coral }}>não</span> pode ser MEI</h2>
          <p style={{ fontFamily: FONTS.body, fontSize: m ? 14.5 : 15.5, lineHeight: 1.6, color: BRAND.inkSoft, margin: '12px auto 0', maxWidth: 520, textWrap: 'pretty' }}>Profissão regulamentada (com conselho de classe) e algumas atividades vedadas por natureza não entram no MEI. Se é o seu caso, o caminho costuma ser uma Microempresa (ME) no Simples Nacional.</p>
        </div>

        {/* destaque: as mais buscadas, com página */}
        <h3 style={h3}>Mais buscadas <span style={hint}>· clique pra ver por quê</span></h3>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: m ? 10 : 12 }}>
          {cards.map((s) => <SpokeCard key={s.slug} nome={s.nome} slug={s.slug} cnae={s.cnae} />)}
        </div>

        {/* resto: lista compacta — cauda-longa vira hyperlink (tem página), sem página fica texto */}
        <h3 style={{ ...h3, marginTop: m ? 28 : 36 }}>Outras profissões regulamentadas <span style={hint}>· clique pra ver por quê</span></h3>
        <CompactList items={otherReg} />

        <h3 style={{ ...h3, marginTop: m ? 26 : 32 }}>Atividades vedadas por natureza</h3>
        <CompactList items={vedadas} />
      </div>
    </section>
  );
}

/* ── breadcrumb (Ferramentas ainda sem hub — texto, não link) ── */
function Breadcrumb({ onCoral }) {
  const m = useIsMobile();
  const base = onCoral ? 'rgba(255,255,255,0.72)' : BRAND.inkSoft;
  const sep = onCoral ? 'rgba(255,255,255,0.40)' : BRAND.inkMute;
  const cur = onCoral ? '#fff' : BRAND.coralDeep;
  return (
    <nav aria-label="Trilha de navegação" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONTS.mono, fontSize: 11, letterSpacing: 0.3, marginBottom: m ? 16 : 22 }}>
      <a href="/" style={{ color: base, textDecoration: 'none', fontWeight: 600 }}>Início</a>
      <span aria-hidden="true" style={{ color: sep }}>/</span>
      <span style={{ color: base, fontWeight: 600 }}>Ferramentas</span>
      <span aria-hidden="true" style={{ color: sep }}>/</span>
      <span aria-current="page" style={{ color: cur, fontWeight: 700 }}>Consulta CNAE MEI</span>
    </nav>
  );
}

/* ── FAQ (SEO: texto sempre no DOM via <details>) ── */
function FaqSection() {
  const m = useIsMobile();
  return (
    <section data-anchor id="perguntas" style={{ background: BRAND.paper, padding: m ? '4px 20px 52px' : '8px 56px 80px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: m ? 20 : 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span className="v5-comet-line" style={{ width: 26, height: 2, borderRadius: 2 }} />
            <Mono color={BRAND.coralDeep} size={11}>Antes de você perguntar</Mono>
            <span className="v5-comet-line" style={{ width: 26, height: 2, borderRadius: 2 }} />
          </div>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 26 : 34, lineHeight: 1.05, letterSpacing: m ? '-0.03em' : -1.2, color: BRAND.ink, margin: 0, textWrap: 'balance' }}>Perguntas frequentes</h2>
        </div>
        <div>
          {FAQ_ITEMS.map((it, i) => (
            <details key={i} className="cnae-faq" open={i === 0} style={{ borderTop: `1px solid ${BRAND.sandDeep}`, borderBottom: i === FAQ_ITEMS.length - 1 ? `1px solid ${BRAND.sandDeep}` : 'none' }}>
              <summary style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: m ? '17px 6px' : '22px 8px' }}>
                <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: m ? 16 : 18.5, letterSpacing: -0.3, color: BRAND.ink, textWrap: 'balance' }}>{it.q}</span>
                <span className="cnae-faq-plus" aria-hidden="true" style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: BRAND.coralSoft, color: BRAND.coralDeep, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, lineHeight: 1 }}>+</span>
              </summary>
              <p style={{ margin: m ? '0 6px 18px' : '0 8px 24px', fontFamily: FONTS.body, fontSize: m ? 14.5 : 15.5, lineHeight: 1.6, color: BRAND.inkSoft, maxWidth: 640, textWrap: 'pretty' }}>{it.a}</p>
            </details>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: m ? 26 : 34, fontFamily: FONTS.mono, fontSize: 10.5, letterSpacing: 0.3, color: BRAND.inkMute, lineHeight: 1.5 }}>
          Base: lista oficial do MEI · {OCCUPATIONS.length} ocupações · Anexo XI da Res. CGSN nº 140/2018 · conferida em julho de 2026
        </p>
      </div>
    </section>
  );
}

/* estilos da ferramenta — dangerouslySetInnerHTML (o CSS tem `>` e `<angle>`, que o
   renderToString escaparia como children e quebraria a hidratação — ver #425). */
const CNAE_STYLE = `
  .cnae-card { transition: transform .16s cubic-bezier(.2,.7,.3,1), box-shadow .16s ease, border-color .16s ease; }
  .cnae-card:hover { transform: translateY(-3px); border-color: #E1DACE; box-shadow: 0 22px 44px -28px rgba(16,17,26,0.30); }
  .cnae-chip { transition: transform .14s ease, background .14s ease, border-color .14s ease, color .14s ease; }
  .cnae-chip:hover { transform: translateY(-1px); background: #FFDDD2; border-color: #F87453; color: #C13E2E; }
  .cnae-clearbtn { transition: background .14s ease, color .14s ease; }
  .cnae-clearbtn:hover { background: #EFEAE2; color: #10111A; }
  .cnae-reglink { border-bottom: 1px solid rgba(16,17,26,0.18); transition: color .14s ease, border-color .14s ease; }
  .cnae-reglink:hover { color: #C13E2E; border-color: #F87453; }
  .cnae-catbtn { transition: background .15s ease; outline: none; }
  .cnae-catbtn:hover { background: #FCFAF6; }
  .cnae-catbtn:focus-visible { box-shadow: inset 0 0 0 2px #F87453; border-radius: 16px; }
  .cnae-chev { transition: transform .26s cubic-bezier(.2,.7,.3,1); }
  .cnae-acc { display: grid; transition: grid-template-rows .3s cubic-bezier(.4,0,.2,1), opacity .24s ease; }
  .cnae-acc > .cnae-clip { overflow: hidden; min-height: 0; }
  @property --cnae-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
  .cnae-magic { position: relative; }
  .cnae-magic::before {
    content: ""; position: absolute; inset: -2px; border-radius: 20px; padding: 2.5px;
    background: conic-gradient(from var(--cnae-angle),
      #FFF7F2 0deg, #FFD3B0 8deg, #8FE9C8 30deg, #56D1A3 92deg,
      rgba(86,209,163,0.48) 168deg, rgba(86,209,163,0.20) 244deg,
      rgba(248,116,83,0.20) 308deg, rgba(248,116,83,0.55) 342deg, #FF9C6E 352deg, #FFF7F2 360deg);
    filter: drop-shadow(0 0 5px rgba(143,233,200,0.55)) drop-shadow(0 0 11px rgba(248,116,83,0.28));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
    pointer-events: none; z-index: 2;
    animation: cnae-orbit 5.6s linear infinite;
  }
  .cnae-magic.is-focused::before { animation-duration: 3.4s; filter: drop-shadow(0 0 8px rgba(143,233,200,0.9)) drop-shadow(0 0 17px rgba(248,116,83,0.42)); }
  .cnae-magic.on-coral::before {
    background: conic-gradient(from var(--cnae-angle),
      #FFFFFF 0deg, #EAFBF3 10deg, #9DEFCF 34deg, #56D1A3 96deg,
      rgba(120,229,192,0.55) 168deg, rgba(215,248,232,0.34) 240deg,
      rgba(255,255,255,0.22) 306deg, rgba(255,255,255,0.60) 344deg, #FFFFFF 360deg);
    filter: drop-shadow(0 0 6px rgba(255,255,255,0.62)) drop-shadow(0 0 14px rgba(143,233,200,0.55));
  }
  .cnae-magic.on-coral.is-focused::before { filter: drop-shadow(0 0 9px rgba(255,255,255,0.9)) drop-shadow(0 0 20px rgba(143,233,200,0.78)); }
  @keyframes cnae-orbit { to { --cnae-angle: 360deg; } }
  details.cnae-faq > summary { list-style: none; outline: none; }
  details.cnae-faq > summary::-webkit-details-marker { display: none; }
  details.cnae-faq > summary:focus-visible { box-shadow: inset 0 0 0 2px #F87453; border-radius: 12px; }
  .cnae-faq-plus { transition: transform .26s cubic-bezier(.2,.7,.3,1); }
  details.cnae-faq[open] .cnae-faq-plus { transform: rotate(45deg); }
  .cnae-pulse { animation: cnae-pulse 1.1s ease-in-out infinite; }
  @keyframes cnae-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .35; transform: scale(.65); } }
  .naomei-link { transition: border-color .14s ease, color .14s ease, box-shadow .14s ease; }
  .naomei-link:hover { border-color: #F87453; color: #C13E2E; box-shadow: 0 6px 16px -10px rgba(248,116,83,0.5); }
  @media (prefers-reduced-motion: reduce) { .cnae-magic::before, .cnae-pulse { animation: none; } }
`;

/* mapa oc+cnae → ocupação completa (pra casar os hits semânticos com o objeto local) */
const OCC_BY_KEY = new Map(OCCUPATIONS.map((o) => [o.oc + '|' + o.cnae, o]));

/* ── A PÁGINA ── */
export function ConsultaCnaeMei() {
  const m = useIsMobile();
  const [query, setQuery] = useState('');
  const [sem, setSem] = useState({ q: '', state: 'idle', hits: [], naomei: null }); // busca semântica
  const inputRef = useRef(null);
  const cache = useRef(new Map());

  useEffect(() => {
    const t = setTimeout(() => {
      if (!inputRef.current) return;
      try { inputRef.current.focus({ preventScroll: true }); }
      catch (e) { inputRef.current.focus(); }
    }, 380);
    return () => clearTimeout(t);
  }, []);

  // Busca SEMÂNTICA (debounce) — só no cliente. Falha/offline/sem-chave → cai no lexical.
  useEffect(() => {
    const q = query.trim();
    if (norm(q).length < 2) { setSem({ q: query, state: 'idle', hits: [], naomei: null }); return; }
    if (cache.current.has(q)) { const c = cache.current.get(q); setSem({ q: query, state: 'done', hits: c.hits, naomei: c.naomei }); return; }
    let alive = true;
    setSem((s) => ({ q: query, state: 'loading', hits: s.q === query ? s.hits : [], naomei: s.q === query ? s.naomei : null }));
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/cnae-busca?q=${encodeURIComponent(q)}`);
        const j = await r.json();
        if (!alive) return;
        if (j && j.ok && Array.isArray(j.results)) {
          const c = { hits: j.results, naomei: j.naomei || null };
          cache.current.set(q, c);
          setSem({ q: query, state: 'done', hits: c.hits, naomei: c.naomei });
        } else {
          setSem({ q: query, state: 'off', hits: [], naomei: null });
        }
      } catch (e) { if (alive) setSem({ q: query, state: 'off', hits: [], naomei: null }); }
    }, 280);
    return () => { alive = false; clearTimeout(t); };
  }, [query]);

  const lexical = useMemo(() => buscar(query), [query]);
  const nao = useMemo(() => detectNaoMei(query), [query]);

  // combinado: lexical (prefixo, no topo) + os hits semânticos que o lexical não pegou
  const combined = useMemo(() => {
    const seen = new Set(lexical.map((r) => r.oc + '|' + r.cnae));
    const extra = (sem.q === query && sem.state === 'done')
      ? sem.hits.map((h) => OCC_BY_KEY.get(h.oc + '|' + h.cnae) || h).filter((h) => !seen.has(h.oc + '|' + h.cnae))
      : [];
    return [...lexical, ...extra];
  }, [lexical, sem, query]);

  const trimmed = norm(query);
  const semSettled = sem.q === query && sem.state !== 'loading';
  // semântico "confiante" de que É permitida (≥ 0.66) — usado só pra desempatar quando a busca cheira a não-MEI.
  const semConfident = sem.q === query && sem.state === 'done' && sem.hits[0] && sem.hits[0].score >= 0.66;
  // veredicto semântico de NÃO-MEI (só vem quando venceu o permitido com margem, no servidor)
  const semNao = (sem.q === query && sem.state === 'done' && sem.naomei) ? sem.naomei : null;

  // qual objeto não-MEI mostrar: lexical (instantâneo, certeza) tem prioridade; senão o semântico
  const naoVerdict = nao || semNao;

  let mode;
  if (!trimmed) {
    mode = 'empty';
  } else if (!nao) {
    // sem sinal LEXICAL de não-MEI
    if (lexical.length) mode = 'results';          // match de prefixo em ocupação real → permitida
    else if (!semSettled) mode = 'searching';
    else if (semNao) mode = 'naomei';              // o semântico afirmou não-MEI (paráfrase: "desenvolvo apps")
    else if (combined.length) mode = 'results';    // hits semânticos permitidos
    else mode = 'none';
  } else {
    // cheira a não-MEI pelo lexical: o semântico confirma se, na verdade, é permitida (ex.: "artigos médicos")
    if (!semSettled) mode = 'searching';
    else if (semConfident) mode = 'results';
    else mode = 'naomei';
  }

  const smart = mode === 'results' && combined.length > lexical.length; // o semântico acrescentou algo

  const pick = (q) => { setQuery(q); if (inputRef.current) { try { inputRef.current.focus({ preventScroll: true }); } catch (e) {} } };

  return (
    <div style={{ background: BRAND.paper, fontFamily: FONTS.body, color: BRAND.ink }}>
      <NavV5 />

      {/* HERÓI — banner coral; a busca atravessa a fronteira coral→papel */}
      <section data-anchor id="consulta" style={{
        background: `linear-gradient(158deg, ${BRAND.coral} 0%, ${BRAND.coralDeep} 122%)`,
        padding: m ? '18px 20px 32px' : '30px 56px 44px',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: -130, right: -70, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 62%)' }} />
          <div style={{ position: 'absolute', bottom: -170, left: -90, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(86,209,163,0.22), transparent 64%)' }} />
        </div>
        <div style={{ position: 'relative' }}>
          <Breadcrumb onCoral />
          <ToolHead onCoral />
          <div style={{ maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', marginTop: m ? 18 : 26, position: 'relative', zIndex: 5 }}>
            <SearchField value={query} onChange={setQuery} inputRef={inputRef} onCoral />
          </div>
        </div>
      </section>

      {/* estados */}
      <section style={{ background: BRAND.paper, padding: m ? '32px 20px 40px' : '44px 56px 56px' }}>
        <div style={{ maxWidth: mode === 'results' ? 820 : 700, margin: '0 auto' }}>
          <AiHint />
          <div style={{ marginTop: m ? 24 : 30 }}>
            {mode === 'empty' && <EmptyState onPick={pick} />}
            {mode === 'searching' && <SearchingState query={query} />}
            {mode === 'results' && <ResultsState key={query} results={combined} query={query} smart={smart} />}
            {mode === 'naomei' && naoVerdict && <NaoMeiState nao={naoVerdict} />}
            {mode === 'none' && <NoResultState query={query} />}
          </div>
        </div>
      </section>

      <ExplainerSection />
      <BrowseAll onPick={pick} />
      <NaoMeiIndex />
      <FaqSection />
      <Footer />

      <style dangerouslySetInnerHTML={{ __html: CNAE_STYLE }} />
    </div>
  );
}

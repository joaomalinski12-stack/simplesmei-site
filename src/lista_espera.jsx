import React, { useState } from 'react';
import { BRAND, FONTS, useIsMobile } from './tokens.jsx';
import { NavV5 } from './porta_nav.jsx';
import { Footer } from './logo_footer.jsx';

/* SimplesMEI — Lista de espera (pré-lançamento)
   O produto ainda não está aberto pra todo mundo. Em vez de mandar o lead pro
   WhatsApp do bot, todos os CTAs caem aqui e a gente captura o contato.

   CAPTURA: o form faz POST same-origin pra /api/waitlist (função serverless na
   Vercel), que encaminha pro Apps Script → planilha do Google. Zero CORS. */
const WAITLIST_ENDPOINT = '/api/waitlist';

function Field({ label, type = 'text', name, value, onChange, placeholder, required, inputMode, autoComplete }) {
  const [focus, setFocus] = useState(false);
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: BRAND.inkMid, marginBottom: 7 }}>
        {label}{required && <span style={{ color: BRAND.coralDeep }}> *</span>}
      </span>
      <input
        type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        required={required} inputMode={inputMode} autoComplete={autoComplete}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: '100%', boxSizing: 'border-box', fontFamily: FONTS.body, fontSize: 16,
          color: BRAND.ink, background: '#fff', borderRadius: 12, padding: '13px 15px',
          border: `1.5px solid ${focus ? BRAND.coral : BRAND.creamDeep}`,
          outline: 'none', transition: 'border-color .15s ease', minHeight: 48,
        }}
      />
    </label>
  );
}

export function WaitlistPage() {
  const m = useIsMobile();
  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '', _gotcha: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const origem = typeof document !== 'undefined' ? (document.referrer || '') : '';
    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, origem }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div style={{ background: BRAND.paper, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavV5 />

      <main style={{ flex: 1, width: '100%', maxWidth: 560, margin: '0 auto', padding: m ? '36px 20px 56px' : '64px 24px 80px' }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: BRAND.coralDeep }}>
          Lista de espera
        </div>
        <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(30px, 7vw, 46px)', lineHeight: 1.08, letterSpacing: -1.2, color: BRAND.ink, margin: '12px 0 0', textWrap: 'balance' }}>
          Entre na lista de espera do <span style={{ color: BRAND.coral }}>SimplesMEI</span>
        </h1>

        {status === 'ok' ? (
          <div style={{ marginTop: 28, background: '#fff', border: `1px solid ${BRAND.creamDeep}`, borderRadius: 18, padding: m ? '28px 22px' : '36px 32px', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: BRAND.mintSoft, color: BRAND.mintDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 28, fontWeight: 800 }}>✓</div>
            <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 24, letterSpacing: -0.5, color: BRAND.ink, margin: '0 0 10px' }}>Você está na lista!</h2>
            <p style={{ fontFamily: FONTS.body, fontSize: 16, lineHeight: 1.6, color: BRAND.inkSoft, margin: 0 }}>
              Assim que liberarmos as primeiras vagas do SimplesMEI, a gente te chama. Obrigado por entrar na frente da fila.
            </p>
          </div>
        ) : (
          <>
            <p style={{ fontFamily: FONTS.body, fontSize: 'clamp(16px, 2.8vw, 18px)', lineHeight: 1.6, color: BRAND.inkSoft, margin: '18px 0 0', textWrap: 'pretty' }}>
              Estamos nos últimos ajustes para abrir o SimplesMEI — a IA que cuida do fiscal do seu MEI (nota fiscal, DAS e teto) por uma conversa. Deixe seu contato e a gente te avisa assim que liberar as primeiras vagas. Você entra na frente da fila.
            </p>

            <form onSubmit={onSubmit} style={{ marginTop: 28, background: '#fff', border: `1px solid ${BRAND.creamDeep}`, borderRadius: 18, padding: m ? '22px' : '28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Field label="Seu nome" name="nome" value={form.nome} onChange={set('nome')} placeholder="Como te chamam" required autoComplete="name" />
              <Field label="WhatsApp (com DDD)" name="whatsapp" type="tel" inputMode="tel" value={form.whatsapp} onChange={set('whatsapp')} placeholder="(11) 90000-0000" required autoComplete="tel" />
              <Field label="E-mail" name="email" type="email" inputMode="email" value={form.email} onChange={set('email')} placeholder="voce@email.com" autoComplete="email" />

              {/* honeypot anti-spam: humano não vê, bot preenche */}
              <input type="text" name="_gotcha" value={form._gotcha} onChange={set('_gotcha')} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

              {status === 'error' && (
                <div style={{ fontFamily: FONTS.body, fontSize: 14, color: BRAND.red, background: BRAND.redSoft, borderRadius: 10, padding: '10px 14px' }}>
                  Não consegui enviar agora. Tenta de novo em instantes ou chama a gente em contato@simplesmei.net.
                </div>
              )}

              <button type="submit" disabled={status === 'sending'} style={{
                marginTop: 4, width: '100%', minHeight: 52, border: 'none', cursor: status === 'sending' ? 'default' : 'pointer',
                background: BRAND.coral, color: '#fff', borderRadius: 14, fontFamily: FONTS.body, fontWeight: 700, fontSize: 16,
                letterSpacing: -0.1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                boxShadow: '0 12px 28px -10px rgba(248,116,83,0.50), 0 2px 0 #C13E2E inset', opacity: status === 'sending' ? 0.7 : 1,
                transition: 'opacity .15s ease',
              }}>
                {status === 'sending' ? 'Enviando…' : 'Quero entrar na lista'}
                {status !== 'sending' && <span style={{ opacity: 0.8, fontWeight: 500 }}>→</span>}
              </button>

              <p style={{ fontFamily: FONTS.body, fontSize: 12.5, lineHeight: 1.5, color: BRAND.inkMid, margin: '2px 0 0', textAlign: 'center' }}>
                Sem spam. A gente só usa o seu contato para avisar quando abrir. Seus dados são tratados conforme a LGPD.
              </p>
            </form>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

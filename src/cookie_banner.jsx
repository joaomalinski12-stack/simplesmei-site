import React, { useState, useEffect } from 'react';
import { BRAND, FONTS, useIsMobile } from './tokens.jsx';

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const m = useIsMobile();

  useEffect(() => {
    // Only show if not previously accepted
    if (!localStorage.getItem('cookie_consent')) {
      // Delay showing the banner slightly for a less intrusive UX
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShow(false);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: m ? 16 : 24,
      left: m ? 16 : 24,
      right: m ? 16 : 'auto',
      maxWidth: 380,
      background: '#fff',
      padding: '20px',
      borderRadius: 16,
      boxShadow: '0 12px 40px rgba(16,17,26,0.16), 0 0 0 1px rgba(16,17,26,0.06)',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      fontFamily: FONTS.body,
      animation: 'v5-rise 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ flexShrink: 0, marginTop: 1 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BRAND.ink} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10 1 1 0 0 1-1-1 2 2 0 0 1-2-2 1 1 0 0 1-1-1 2 2 0 0 1-2-2 1 1 0 0 1-1-1 2 2 0 0 1-2-2 1 1 0 0 1-1-1 2 2 0 0 1-2-2 1 1 0 0 1-1-1z" />
            <path d="M8.5 14.5v.01" />
            <path d="M11 9.5v.01" />
            <path d="M15.5 13.5v.01" />
            <path d="M13.5 17.5v.01" />
          </svg>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: BRAND.ink, fontSize: 14.5, marginBottom: 4 }}>
            Sua privacidade
          </div>
          <div style={{ color: BRAND.inkSoft, fontSize: 13, lineHeight: 1.5 }}>
            Utilizamos cookies essenciais e de performance para entender como você usa o site e melhorar a experiência.
            Ao prosseguir, você concorda com a nossa{' '}
            <a href="/privacidade" style={{ color: BRAND.coral, fontWeight: 600, textDecoration: 'none' }}>
              Política de Privacidade
            </a>.
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: 8 }}>
        <button 
          onClick={handleAccept}
          style={{
            flex: 1,
            background: BRAND.ink,
            color: '#fff',
            border: 'none',
            padding: '12px 0',
            borderRadius: 12,
            fontSize: 13.5,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: FONTS.body,
            transition: 'opacity 0.2s ease',
          }}
          onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
        >
          Entendi e aceito
        </button>
      </div>
    </div>
  );
}

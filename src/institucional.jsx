import React from 'react';
import { BRAND, FONTS } from './tokens.jsx';
import { NavBar, Footer } from './logo_footer.jsx';

// Layout base compartilhado pelas páginas institucionais
function InstitucionalLayout({ title, children }) {
  return (
    <div style={{ background: BRAND.paper, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <NavBar inverted={false} links={[]} />
      </a>
      <main style={{ flex: 1, maxWidth: 840, margin: '0 auto', padding: '80px 24px', fontFamily: FONTS.body, color: BRAND.ink, lineHeight: 1.7, width: '100%' }}>
        <h1 style={{ fontFamily: FONTS.display, fontSize: 36, letterSpacing: -1, marginBottom: 40, color: BRAND.coral }}>{title}</h1>
        <div style={{ fontSize: 16 }}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function Sobre() {
  return (
    <InstitucionalLayout title="Sobre a SimplesMEI">
      <p style={{ marginBottom: 24 }}>
        A <strong>SimplesMEI</strong> nasceu da frustração de ver milhões de empreendedores brasileiros perdendo horas preciosas em portais confusos do governo, ou pagando mensalidades altas para serviços de contabilidade que não entendem a realidade de quem atua sozinho.
      </p>
      <p style={{ marginBottom: 24 }}>
        Nós acreditamos que a tecnologia deve ser invisível. Se você já usa o WhatsApp para falar com seus clientes, vender e negociar, por que não usar o mesmo aplicativo para manter sua empresa legalizada?
      </p>
      <p style={{ marginBottom: 24 }}>
        Combinando a mais recente <strong>Inteligência Artificial (IA)</strong> com a simplicidade da mensageria, criamos um assistente capaz de entender comandos naturais ("Emite uma nota pro João de R$ 500") e traduzi-los instantaneamente para os sistemas pesados das Prefeituras e da Receita Federal.
      </p>
      <p>
        Sem aplicativos novos, sem planilhas, sem estresse. Nós tiramos a burocracia do seu caminho para que você foque no que realmente importa: <strong>fazer o seu negócio crescer.</strong>
      </p>
    </InstitucionalLayout>
  );
}

export function Imprensa() {
  return (
    <InstitucionalLayout title="Imprensa e Mídia">
      <p style={{ marginBottom: 24 }}>
        A equipe da SimplesMEI está sempre aberta para colaborar com jornalistas, veículos de comunicação e criadores de conteúdo que desejam falar sobre empreendedorismo, inovação, inteligência artificial e o futuro do trabalho no Brasil.
      </p>
      <p style={{ marginBottom: 24 }}>
        Se você precisa de entrevistas com nossos fundadores, dados sobre o uso de IA na gestão de Microempreendedores Individuais ou busca o nosso <strong>Media Kit (Logotipos, Assets e Brand Guidelines)</strong>, entre em contato com a nossa assessoria.
      </p>
      <div style={{ padding: 24, background: 'rgba(248,116,83,0.05)', borderRadius: 12, border: `1px solid rgba(248,116,83,0.1)` }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Contato para Imprensa:</p>
        <a href="mailto:press@simplesmei.net" style={{ color: BRAND.coral, textDecoration: 'none', fontWeight: 700 }}>press@simplesmei.net</a>
      </div>
    </InstitucionalLayout>
  );
}

export function Carreiras() {
  return (
    <InstitucionalLayout title="Trabalhe Conosco">
      <p style={{ marginBottom: 24 }}>
        Estamos construindo o futuro da contabilidade automatizada. Se você é apaixonado por Engenharia de Software, Inteligência Artificial ou Design Centrado no Usuário, a SimplesMEI é o seu lugar.
      </p>
      <div style={{ padding: 32, textAlign: 'center', background: '#F4F5F7', borderRadius: 12, marginBottom: 24 }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: 18, color: '#10111A' }}>Vagas Abertas</h3>
        <p style={{ color: '#575A66', margin: 0 }}>
          No momento, nosso quadro de vagas diretas está preenchido. No entanto, estamos sempre em busca de talentos excepcionais.
        </p>
      </div>
      <p>
        Quer deixar seu currículo no nosso banco de talentos? Envie um e-mail com seu portfólio ou LinkedIn para <a href="mailto:vagas@simplesmei.net" style={{ color: BRAND.coral, textDecoration: 'none', fontWeight: 600 }}>vagas@simplesmei.net</a>. Avisaremos você assim que abrirmos novas oportunidades.
      </p>
    </InstitucionalLayout>
  );
}

export function Contato() {
  return (
    <InstitucionalLayout title="Fale com a Gente">
      <p style={{ marginBottom: 24 }}>
        Precisa de ajuda com sua conta, encontrou alguma dificuldade na plataforma ou tem dúvidas sobre a sua assinatura? Nosso time de suporte está pronto para ajudar.
      </p>
      
      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div style={{ padding: 24, border: '1px solid #E5E7EB', borderRadius: 12 }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: 18 }}>Suporte por E-mail</h3>
          <p style={{ color: '#575A66', marginBottom: 16, fontSize: 14 }}>Tempo de resposta estimado: 24 horas úteis.</p>
          <a href="mailto:suporte@simplesmei.net" style={{ color: BRAND.coral, textDecoration: 'none', fontWeight: 600 }}>suporte@simplesmei.net</a>
        </div>
        
        <div style={{ padding: 24, border: '1px solid #E5E7EB', borderRadius: 12 }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: 18 }}>WhatsApp (Central)</h3>
          <p style={{ color: '#575A66', marginBottom: 16, fontSize: 14 }}>Seu próprio assistente também direciona você para um atendente humano caso necessário.</p>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '10px 20px', background: BRAND.coral, color: 'white', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
            Abrir WhatsApp
          </a>
        </div>
      </div>
    </InstitucionalLayout>
  );
}

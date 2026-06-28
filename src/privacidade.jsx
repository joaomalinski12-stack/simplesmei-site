import React from 'react';
import { BRAND, FONTS } from './tokens.jsx';
import { NavBar, Footer } from './logo_footer.jsx';

export function Privacidade() {
  return (
    <div style={{ background: BRAND.paper, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar inverted={false} />
      <main style={{ flex: 1, maxWidth: 840, margin: '0 auto', padding: '80px 24px', fontFamily: FONTS.body, color: BRAND.ink, lineHeight: 1.7, width: '100%' }}>
        <h1 style={{ fontFamily: FONTS.display, fontSize: 36, letterSpacing: -1, marginBottom: 16 }}>Política de Privacidade (LGPD)</h1>
        <p style={{ color: BRAND.inkSoft, fontSize: 15, marginBottom: 48 }}>Última atualização: 28 de junho de 2026</p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>1. Compromisso com a Transparência</h2>
          <p style={{ marginBottom: 16 }}>
            A SimplesMEI respeita a sua privacidade e garante o sigilo absoluto das informações financeiras do seu negócio. Esta política detalha como a nossa plataforma tecnológica trata os seus dados, em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>2. Papéis na LGPD</h2>
          <p style={{ marginBottom: 16 }}>
            Para efeitos da Lei, a SimplesMEI atua predominantemente como <strong>Operadora</strong> de dados no que tange à emissão fiscal (processando as notas estritamente segundo as ordens do usuário) e como <strong>Controladora</strong> apenas para os dados cadastrais básicos de faturamento e comunicação (seu número de WhatsApp e e-mail).
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>3. Dados Coletados e Finalidade</h2>
          <p style={{ marginBottom: 16 }}>
            Coletamos dados apenas com bases legais legítimas (execução de contrato e cumprimento de obrigação legal/regulatória):
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}><strong>Dados de Identificação:</strong> Nome, CNPJ, e-mail e credenciais de acesso governamentais (apenas quando exigidas pela prefeitura). Finalidade: Emissão de guias e notas.</li>
            <li style={{ marginBottom: 8 }}><strong>Dados Fiscais Operacionais:</strong> Informações de faturamento, tomadores de serviço (clientes do MEI) e descritivos das notas. Finalidade: Transmissão para a Sefaz e controle de teto.</li>
            <li style={{ marginBottom: 8 }}><strong>Metadados do WhatsApp:</strong> Número de telefone, nome do perfil e registros de chat. Finalidade: Prestação do serviço de IA conversacional e suporte.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>4. O Uso de IA e Não-Treinamento de Modelos</h2>
          <p style={{ marginBottom: 16 }}>
            Nossa inteligência artificial é baseada em APIs comerciais de ponta (ex: OpenAI). 
          </p>
          <p style={{ marginBottom: 16, padding: '12px 16px', background: BRAND.mintSoft, borderRadius: 8, color: BRAND.mintDeep }}>
            <strong>Proteção Garantida:</strong> Em conformidade com os contratos corporativos rigorosos firmados com provedores de IA, garantimos que <strong>os seus dados financeiros, fiscais e conversas NUNCA são utilizados para treinar modelos de inteligência artificial públicos</strong> (como o ChatGPT genérico). Seus dados transitam de forma isolada (Zero Data Retention para fins de treinamento).
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>5. Compartilhamento e Transferência Internacional</h2>
          <p style={{ marginBottom: 16 }}>
            Nós <strong>não comercializamos, vendemos ou alugamos</strong> seus dados sob nenhuma hipótese. O compartilhamento ocorre exclusivamente com:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}><strong>Entidades Governamentais:</strong> Prefeituras e Receita Federal, para viabilizar as obrigações fiscais.</li>
            <li style={{ marginBottom: 8 }}><strong>Provedores de Infraestrutura:</strong> Serviços de nuvem segura (Cloud), APIs de mensageria (Meta/WhatsApp) e APIs de processamento (OpenAI). </li>
          </ul>
          <p style={{ marginBottom: 16 }}>
            <em>Nota sobre Transferência Internacional:</em> Como a Meta e a OpenAI possuem infraestrutura global, alguns processamentos podem ocorrer em servidores sediados nos EUA. Tais transferências são feitas ao abrigo da LGPD, amparadas por cláusulas contratuais padrão e políticas rigorosas de segurança cibernética.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>6. Segurança da Informação</h2>
          <p style={{ marginBottom: 16 }}>
            Empregamos criptografia de ponta-a-ponta em nossos bancos de dados e canais de comunicação com as prefeituras. As credenciais fiscais sensíveis, quando fornecidas, são armazenadas utilizando *hashing* seguro e nunca são expostas humanamente na nossa operação diária.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>7. Seus Direitos (Art. 18 LGPD)</h2>
          <p style={{ marginBottom: 16 }}>
            A qualquer momento, você pode solicitar através do nosso e-mail oficial:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>Confirmação e acesso aos dados armazenados;</li>
            <li style={{ marginBottom: 8 }}>Correção de dados incompletos ou desatualizados;</li>
            <li style={{ marginBottom: 8 }}>Exportação e portabilidade de seus dados;</li>
            <li style={{ marginBottom: 8 }}>A exclusão dos seus dados, <strong>ressalvados os prazos legais de guarda obrigatória</strong> (por exemplo, registros de acesso exigidos pelo Marco Civil da Internet ou documentos exigidos pelo fisco).</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>8. Contato do Encarregado (DPO)</h2>
          <p style={{ marginBottom: 16 }}>
            Para exercer seus direitos, relatar incidentes ou tirar dúvidas sobre esta Política, envie um e-mail para nossa equipe de privacidade no endereço: <strong>contato@simplesmei.net</strong>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

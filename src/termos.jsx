import React from 'react';
import { BRAND, FONTS } from './tokens.jsx';
import { NavBar, Footer } from './logo_footer.jsx';

export function Termos() {
  return (
    <div style={{ background: BRAND.paper, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar inverted={false} />
      
      <main style={{ flex: 1, maxWidth: 840, margin: '0 auto', padding: '80px 24px', fontFamily: FONTS.body, color: BRAND.ink, lineHeight: 1.7, width: '100%' }}>
        <h1 style={{ fontFamily: FONTS.display, fontSize: 36, letterSpacing: -1, marginBottom: 16 }}>Termos de Uso</h1>
        <p style={{ color: BRAND.inkSoft, fontSize: 15, marginBottom: 48 }}>Última atualização: 28 de junho de 2026</p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>1. Aceitação dos Termos</h2>
          <p style={{ marginBottom: 16 }}>
            Bem-vindo à SimplesMEI. Ao acessar e utilizar nosso assistente virtual integrado ao WhatsApp para gestão de Microempreendedor Individual (MEI), você concorda irrestritamente com estes Termos de Uso. Caso não concorde com qualquer parte destes termos, você não deverá utilizar nossos serviços.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>2. Natureza do Serviço e Papel da IA</h2>
          <p style={{ marginBottom: 16 }}>
            A SimplesMEI é uma plataforma baseada em Inteligência Artificial, caracterizada como "Software as a Service" (SaaS). Nossa tecnologia facilita a gestão das rotinas fiscais do MEI via interface do WhatsApp, traduzindo comandos de linguagem natural para ações sistêmicas (ex: emissão de NFS-e, controle de teto e geração da guia DAS).
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Importante:</strong> A SimplesMEI é exclusivamente uma ferramenta de tecnologia e automação. <strong>Nós não prestamos consultoria contábil, jurídica ou financeira</strong>, e não substituímos a figura de um profissional contábil habilitado (CRC).
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>3. Uso do WhatsApp e Consentimento (Opt-in)</h2>
          <p style={{ marginBottom: 16 }}>
            A operação do serviço depende da integração com a API Oficial do WhatsApp Business (Meta Platforms).
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>Ao registrar-se na SimplesMEI e enviar a primeira mensagem, <strong>você concede seu consentimento expresso (opt-in)</strong> para receber mensagens transacionais, alertas de vencimento (DAS), atualizações do teto do MEI e comunicações de suporte diretamente no seu WhatsApp.</li>
            <li style={{ marginBottom: 8 }}>Você deve cumprir as <a href="https://www.whatsapp.com/legal/commerce-policy/" target="_blank" rel="noopener noreferrer" style={{ color: BRAND.coral }}>Políticas de Comércio do WhatsApp</a>. A SimplesMEI reserva-se o direito de suspender o atendimento caso sejam identificadas violações a estas políticas ou linguagem abusiva contra a IA.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>4. Responsabilidade Fiscal e Veracidade dos Dados</h2>
          <p style={{ marginBottom: 16 }}>
            A SimplesMEI atua estritamente de acordo com as informações fornecidas por você durante a interação no chat.
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}><strong>Veracidade:</strong> O usuário garante que todos os dados fornecidos (CNPJ, valores de serviços, dados tomadores) são verdadeiros e refletem fielmente as operações do negócio.</li>
            <li style={{ marginBottom: 8 }}><strong>Responsabilidade Final:</strong> O dever de pagar os impostos (DAS) em dia, preencher a Declaração Anual (DASN-SIMEI) e monitorar formalmente o limite de faturamento perante a Receita Federal permanece única e exclusivamente do titular do CNPJ.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>5. Limitação de Responsabilidade</h2>
          <p style={{ marginBottom: 16 }}>
            Trabalhamos para garantir o máximo de estabilidade, contudo, a SimplesMEI <strong>não se responsabiliza</strong> por:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>Atrasos na emissão de NFS-e ou guias DAS causados por <strong>indisponibilidades ou falhas nos sistemas das Prefeituras Municipais, da SEFAZ, ou do portal do Simples Nacional</strong>.</li>
            <li style={{ marginBottom: 8 }}>Falhas temporárias de comunicação decorrentes de instabilidades na API da OpenAI, da plataforma WhatsApp/Meta, ou da conectividade do usuário.</li>
            <li style={{ marginBottom: 8 }}>Multas, juros, desenquadramento do regime MEI ou sanções tributárias decorrentes de informações inexatas fornecidas à IA ou do não-pagamento tempestivo das guias pelo usuário.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>6. Assinaturas e Cancelamento</h2>
          <p style={{ marginBottom: 16 }}>
            O acesso à automação inteligente é concedido por meio de assinatura (mensal ou anual).
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}><strong>Cancelamento Livre:</strong> Você pode cancelar sua assinatura a qualquer momento enviando o comando de cancelamento pelo próprio WhatsApp ou via e-mail.</li>
            <li style={{ marginBottom: 8 }}><strong>Faturamento Proporcional:</strong> O cancelamento impede cobranças futuras. Conforme padrão de serviços digitais (SaaS), não realizamos estornos parciais pelos meses já transcorridos ou dias não utilizados do período vigente.</li>
            <li style={{ marginBottom: 8 }}><strong>Direito de Arrependimento:</strong> Respeitando o Art. 49 do CDC, compras feitas pela internet possuem garantia de devolução integral do valor caso o arrependimento seja comunicado no prazo de até 7 (sete) dias corridos da contratação.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>7. Propriedade Intelectual</h2>
          <p style={{ marginBottom: 16 }}>
            Os algoritmos, interfaces, a "persona" da IA e a marca SimplesMEI são de propriedade exclusiva de nossa empresa. Os dados fiscais, notas emitidas e o histórico da empresa pertencem exclusivamente a você, titular do CNPJ.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>8. Contato e Foro</h2>
          <p style={{ marginBottom: 16 }}>
            Quaisquer dúvidas devem ser direcionadas ao suporte via WhatsApp ou pelo e-mail <strong>contato@simplesmei.net</strong>. Fica eleito o foro da comarca de São Paulo/SP para dirimir questões relacionadas a estes termos.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

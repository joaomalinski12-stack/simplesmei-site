/* Vercel Serverless Function — captura da lista de espera.
   O form (/lista-de-espera) faz POST aqui (mesmo domínio, sem CORS). Esta função
   encaminha o lead, server-side, pro Apps Script que grava na planilha do Google.

   A URL do Apps Script fica na env var WAITLIST_URL (Vercel → Settings → Environment
   Variables). O fallback abaixo é a URL informada pelo dono; troque a env var pra
   rotacionar sem mexer no código. A URL não vai pro front (só roda no servidor). */
const SHEETS_URL =
  process.env.WAITLIST_URL ||
  'https://script.google.com/macros/s/AKfycbyxlNsoHcitS3SkZw8SFRpYQt_fX6gNPm8G7k0xgjUaeFhDUPjWDt9qLdcTdZn6NieCMg/exec';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    // honeypot: bots preenchem este campo escondido
    if (body._gotcha) return res.status(200).json({ ok: true });

    const clean = (v, max) => (v == null ? '' : String(v)).trim().slice(0, max);
    const lead = {
      nome: clean(body.nome, 120),
      whatsapp: clean(body.whatsapp, 40),
      email: clean(body.email, 160),
      origem: clean(body.origem, 300),
    };

    if (!lead.nome || (!lead.whatsapp && !lead.email)) {
      return res.status(400).json({ ok: false, error: 'campos_obrigatorios' });
    }

    const upstream = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });

    const text = await upstream.text();
    let ok = upstream.ok;
    try {
      const j = JSON.parse(text);
      if (j && j.ok === false) ok = false;
    } catch {
      // Apps Script às vezes responde HTML (ex.: 403 de acesso) → trata como falha
      if (/text\/html/i.test(upstream.headers.get('content-type') || '')) ok = false;
    }

    if (!ok) return res.status(502).json({ ok: false, error: 'upstream' });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
}

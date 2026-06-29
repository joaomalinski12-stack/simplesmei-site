# Medição e ciclo de vida do conteúdo

> **Trabalho humano.** Há MCP do Ubersuggest, **não** do Search Console. Indexação, inspeção de URL,
> análise de queries e re-indexação são passos do dono no GSC. O agente entrega conteúdo + sitemap e
> pode usar `project_position_info`/`domain_overview` do Ubersuggest pra ranking aproximado.

## Primeiros 90 dias = instrumentação, não tráfego
Post novo leva ~100 dias pro pico. Julgar por cliques/posição/DA cedo é decidir no ruído. KPIs
honestos:
- **Cobertura de indexação** — meta: 100% das páginas que importam indexadas (GSC → Páginas; e
  Inspeção de URL → *Solicitar indexação* nas que ficarem de fora).
- **Impressões** e **nº de queries únicas** subindo (sinal de que o Google entende e mostra).
- **Ignore** cliques, posição média e "autoridade de domínio" tão cedo.
- **"Impressão sem clique" = visibilidade, não fracasso.** A AIO comprime CTR informacional
  (−55–61% **(direcional)**); transacional/marca perde pouco. Foque o **clique qualificado** nas
  queries comerciais/marca que levam à conversão.

## Loop de refresh trimestral (guiado pela própria baseline)
- **Detectar decaimento:** impressões caem **antes** dos cliques — sinalize páginas −20% MoM/YoY.
  Cadência: conteúdo sensível a ano-calendário (DAS, teto, prazos) → revisar a cada virada de
  regra/ano + trimestral; evergreen ("o que é MEI") → 6–12 meses.
- **Refresh com substância, nunca só a data.** Mueller é explícito: trocar `dateModified` sem mudar
  conteúdo **não move ranking** — e em YMYL, data nova com regra velha **quebra Trust**. Fluxo:
  adicione dados/seções, corrija o que mudou, **depois** preencha `updated` no frontmatter (emite
  `dateModified` + mostra "atualizado em"), **depois** force re-crawl (Inspeção de URL → Solicitar
  indexação).
- **Striking distance (posições 4–20, impressão alta, CTR fraca):** maior ROI de site pequeno —
  reescreva `title`/`description`, reforce os links internos do hub, expanda a seção que falta.
- **Canibalização (GSC → Consultas → clicar na query → aba Páginas):** em 2026 é problema de
  **citação** (a IA escolhe 1 URL por query; se as suas competem, ela não cita nenhuma). Consolide a
  perdedora na vencedora + **301**.
- **Pruning:** por página, escolha **Atualizar / Mesclar (+301) / Deletar (410)**. Mescle e 301
  **antes** de deletar (preserva sinais/backlinks). Concentre autoridade em poucas páginas fortes.

## Ferramentas no repo
- Ranking aproximado / evolução: Ubersuggest `project_position_info`, `domain_overview`,
  `domain_top_pages`, `page_overview`; auditoria técnica: `site_audit`, `pagespeed_audit`.
- Conteúdo/queries reais e indexação: **Google Search Console** (humano).
- GA4 `G-FJDNXSSB3K` (comportamento on-site) já está no `index.html`.

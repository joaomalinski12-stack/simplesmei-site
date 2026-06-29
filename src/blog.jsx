import React, { useMemo, useState } from 'react';
import fm from 'front-matter';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import { Footer } from './logo_footer.jsx';
import { waHref, Door, NavV5 } from './porta_nav.jsx';
import { BRAND, FONTS, useIsMobile } from './tokens.jsx';

// Importa todos os posts de forma eager como string bruta
const markdownFiles = import.meta.glob('./posts/*.md', { eager: true, query: '?raw', import: 'default' });

// Processa os arquivos em um array de posts
const allPosts = Object.entries(markdownFiles).map(([path, content]) => {
  const slug = path.split('/').pop().replace('.md', '');
  const parsed = fm(content);
  return {
    slug,
    content: parsed.body,
    ...parsed.attributes,
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

// slugify igual ao rehype-slug (github-slugger) — pra as âncoras do índice baterem
function slugify(h) {
  return h.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

const fmtLong = (d) => new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(d));

/* ── Capa do post — imagem própria (frontmatter `cover`) ou capa gerada nos tokens.
   Sem ilustração: gradiente da marca + grade de pontos + glow + wordmark + categoria. ── */
const COVER_PALETTES = {
  coral: { from: BRAND.coral, to: BRAND.coralDeep, glow: 'rgba(255,255,255,0.22)', mark: 'rgba(255,255,255,0.7)' },
  amber: { from: BRAND.amber, to: BRAND.amberDeep, glow: 'rgba(255,255,255,0.20)', mark: 'rgba(255,255,255,0.7)' },
  mint:  { from: BRAND.mint, to: BRAND.mintDeep, glow: 'rgba(255,255,255,0.20)', mark: 'rgba(255,255,255,0.7)' },
  ink:   { from: BRAND.inkPanel, to: BRAND.ink, glow: 'rgba(248,116,83,0.30)', mark: BRAND.coral },
};
function PostCover({ post, m }) {
  const h = m ? 220 : 320;
  // imagem própria do post → <img> de verdade + H1 (título) abaixo
  if (post.cover) {
    return (
      <>
        <img src={post.cover} alt={post.coverAlt || ''} loading="lazy" style={{
          width: '100%', height: h, objectFit: 'cover', borderRadius: 16,
          border: `1px solid ${BRAND.creamDeep}`, marginTop: 14,
        }} />
        <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(30px, 7vw, 46px)', lineHeight: 1.08, letterSpacing: -1.4, color: BRAND.ink, margin: '24px 0 0' }}>{post.title}</h1>
      </>
    );
  }
  // sem imagem própria → capa gerada nos tokens; o título É o H1 (masthead)
  const p = COVER_PALETTES[post.coverPalette] || COVER_PALETTES.coral;
  const category = post.category || 'Guia';
  return (
    <div style={{
      position: 'relative', minHeight: h, borderRadius: 16, overflow: 'hidden', marginTop: 14,
      background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: m ? '54px 20px 22px' : '70px 30px 30px',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)', backgroundSize: m ? '16px 16px' : '20px 20px', opacity: 0.6 }} />
      <div style={{ position: 'absolute', top: m ? -60 : -110, right: m ? -50 : -90, width: m ? 200 : 340, height: m ? 200 : 340, borderRadius: '50%', background: `radial-gradient(circle, ${p.glow} 0%, transparent 66%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: m ? 18 : 26, left: m ? 20 : 30, fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 14 : 17, letterSpacing: -0.5, color: '#fff' }}>
        Simples<span style={{ color: p.mark }}>MEI</span>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: m ? 10 : 11, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', marginBottom: m ? 8 : 10 }}>{category}</div>
        <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 'clamp(26px, 7vw, 32px)' : 'clamp(34px, 4.4vw, 46px)', lineHeight: 1.08, letterSpacing: -1.2, color: '#fff', margin: 0, maxWidth: '20ch', textWrap: 'balance' }}>{post.title}</h1>
      </div>
    </div>
  );
}

/* ── Índice ("Neste artigo") — card creme nos tokens, recolhível no mobile ── */
function TableOfContents({ content, m }) {
  const headings = content.split('\n').filter(l => l.startsWith('## ')).map(l => l.replace('## ', '').trim());
  // SSR-safe: aberto no desktop (!m) sempre; no mobile, recolhido até tocar.
  const [open, setOpen] = useState(false);
  if (headings.length === 0) return null;
  const show = open || !m;
  return (
    <nav aria-label="Índice do artigo" style={{
      background: BRAND.cream, border: `1px solid ${BRAND.sandDeep}`, borderRadius: 16,
      padding: m ? '8px 18px' : '20px 22px', marginBottom: 40,
    }}>
      <button onClick={() => setOpen(o => !o)} aria-expanded={show} aria-label="Abrir/fechar índice" style={{
        all: 'unset', cursor: m ? 'pointer' : 'default', width: '100%', boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        minHeight: m ? 44 : 'auto',
      }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: BRAND.coralDeep }}>Neste artigo</span>
        {m && <span style={{ color: BRAND.coralDeep, fontSize: 18, transform: show ? 'rotate(45deg)' : 'none', transition: 'transform .2s ease' }}>+</span>}
      </button>
      {show && (
        <ol style={{ listStyle: 'none', margin: '12px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {headings.map(h => (
            <li key={h}>
              <a href={`#${slugify(h)}`} className="toc-link" style={{ fontFamily: FONTS.body, fontSize: 14.5, fontWeight: 600, lineHeight: 1.4, display: 'block' }}>{h}</a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}

/* ── Caixa do autor — card branco nos tokens (foto/inicial + bio + LinkedIn) ── */
function AuthorBox({ author, m }) {
  const [imgError, setImgError] = useState(false);
  const isJoao = author && author.includes('Gandra');

  const bio = isJoao
    ? 'Especialista em Growth com mais de 5 anos de experiência em inteligência de negócios. Ajuda o Microempreendedor Individual a escalar usando tecnologia.'
    : 'Especialistas em contabilidade desburocratizada para o Microempreendedor Individual.';
  const initial = (author || 'S').trim().charAt(0).toUpperCase();

  return (
    <div style={{
      background: '#fff', border: `1px solid ${BRAND.creamDeep}`, borderRadius: 18,
      padding: m ? '20px' : '22px 24px', display: 'flex', gap: m ? 14 : 18, alignItems: 'flex-start',
      marginTop: 56,
    }}>
      <div style={{
        flexShrink: 0, width: m ? 52 : 60, height: m ? 52 : 60, borderRadius: '50%', overflow: 'hidden',
        background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralDeep})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontFamily: FONTS.display, fontWeight: 800, fontSize: m ? 20 : 24,
      }}>
        {isJoao && !imgError
          ? <img src="/joao-gandra.jpg" alt="João Gandra" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setImgError(true)} />
          : initial}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: BRAND.inkMid }}>Escrito por</div>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: BRAND.ink, margin: '3px 0 6px' }}>{author || 'Equipe SimplesMEI'}</div>
        <p style={{ margin: 0, fontFamily: FONTS.body, fontSize: 14.5, lineHeight: 1.6, color: BRAND.inkSoft }}>{bio}</p>
        {isJoao && (
          <a href="https://www.linkedin.com/in/joao-vitor-gandra/" target="_blank" rel="noopener noreferrer" className="blog-link"
             style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 13.5, fontWeight: 700 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.3 18V10H5.7v8h2.6Zm-1.3-9.1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18.3 18v-4.4c0-2.4-1.3-3.5-3-3.5-1.4 0-2 .77-2.36 1.3V10H10.3v8h2.6v-4.5c0-1.2.9-1.4 1.2-1.4.96 0 1.6.6 1.6 1.5V18h2.6Z"/>
            </svg>
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

/* ── FAQ do post — acordeão idêntico ao FaqV5 (painel SEMPRE no DOM, SEO) ── */
function FaqItem({ item, index, open, onToggle, m }) {
  const qId = `pf-q-${index}`, aId = `pf-a-${index}`;
  return (
    <div style={{
      background: '#fff', border: `1px solid ${open ? BRAND.coral : BRAND.sandDeep}`, borderRadius: 16,
      boxShadow: open ? '0 18px 40px -30px rgba(248,116,83,0.5)' : 'none',
      transition: 'border-color .2s ease, box-shadow .2s ease', overflow: 'hidden',
    }}>
      <button id={qId} className="faq-q" aria-expanded={open} aria-controls={aId} onClick={onToggle} style={{
        width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        padding: m ? '16px 18px' : '18px 22px', minHeight: 56, fontFamily: FONTS.body,
      }}>
        <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: m ? 16 : 17.5, lineHeight: 1.25, letterSpacing: -0.3, color: BRAND.ink }}>{item.q}</span>
        <span className="faq-chev" aria-hidden="true" style={{
          flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
          background: open ? BRAND.coral : BRAND.coralSoft, color: open ? '#fff' : BRAND.coralDeep,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)', fontSize: 20, lineHeight: 1,
        }}>+</span>
      </button>
      <div id={aId} role="region" aria-labelledby={qId} className="faq-a" style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}>
        <div className="faq-a-clip">
          <div style={{ padding: m ? '0 18px 18px' : '0 22px 20px' }}>
            <p style={{ margin: 0, fontFamily: FONTS.body, fontSize: m ? 15 : 15.5, lineHeight: 1.62, color: BRAND.inkSoft, maxWidth: 620 }}>{item.a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostFAQ({ faq, m }) {
  if (!faq || !faq.length) return null;
  const [open, setOpen] = useState({ 0: true });
  const toggle = (i) => setOpen(o => ({ ...o, [i]: !o[i] }));

  return (
    <section style={{ marginTop: 56 }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: BRAND.coralDeep, marginBottom: 6 }}>Perguntas frequentes</div>
      <h2 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 'clamp(22px, 4.5vw, 28px)', lineHeight: 1.18, letterSpacing: -0.6, color: BRAND.ink, margin: '0 0 18px' }}>Ainda em dúvida?</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: m ? 10 : 12 }}>
        {faq.map((item, i) => (
          <FaqItem key={i} item={item} index={i} open={!!open[i]} onToggle={() => toggle(i)} m={m} />
        ))}
      </div>
    </section>
  );
}

/* ── Continue lendo — internal linking com posts reais (some se não houver) ── */
function Related({ slug, m }) {
  const others = allPosts.filter(p => p.slug !== slug).slice(0, 3);
  if (others.length === 0) return null;
  return (
    <section aria-label="Artigos relacionados" style={{ marginTop: 56 }}>
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: BRAND.coralDeep, marginBottom: 14 }}>Continue lendo</div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : `repeat(${others.length}, 1fr)`, gap: 14 }}>
        {others.map(p => (
          <a key={p.slug} href={`/blog/${p.slug}`} className="rel-card" style={{
            textDecoration: 'none', background: '#fff', border: `1px solid ${BRAND.creamDeep}`, borderRadius: 14,
            padding: '16px 16px 18px', display: 'block', transition: 'border-color .15s ease, transform .15s ease',
          }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: BRAND.amberDeep }}>{fmtLong(p.date)}</span>
            <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, lineHeight: 1.28, letterSpacing: -0.3, color: BRAND.ink, margin: '8px 0 0' }}>{p.title}</div>
            <span style={{ display: 'inline-block', marginTop: 10, fontFamily: FONTS.body, fontSize: 13, fontWeight: 700, color: BRAND.coralDeep }}>Ler →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ── CTA final = a porta (card escuro + Door wa.me) ── */
function PostCTA({ m }) {
  return (
    <section style={{ marginTop: 56 }}>
      <div style={{ background: BRAND.ink, borderRadius: m ? 22 : 26, padding: m ? '32px 24px' : '48px 44px', position: 'relative', overflow: 'hidden' }}>
        <div className="v5-comet-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4 }} />
        <div style={{ position: 'absolute', bottom: -160, right: -90, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(248,116,83,0.24) 0%, transparent 64%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', color: BRAND.coral }}>Comece agora</div>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 'clamp(26px, 6vw, 38px)', lineHeight: 1.05, letterSpacing: -1.2, color: '#fff', margin: '12px 0 0', maxWidth: 440 }}>
            Pronto para descomplicar seu MEI?
          </h2>
          <p style={{ fontFamily: FONTS.body, fontSize: 'clamp(15px, 2.6vw, 16px)', lineHeight: 1.55, color: BRAND.inkMute, margin: '14px 0 22px', maxWidth: 440 }}>
            A IA que emite sua nota fiscal, cuida do DAS e vigia o seu teto direto pelo WhatsApp. Sem burocracia.
          </p>
          <Door label="Testar no WhatsApp" text="quero abrir meu MEI de graça pelo SimplesMEI" size={m ? 'lg' : 'xl'} block={m} preview onDark />
        </div>
      </div>
    </section>
  );
}

export function BlogList() {
  const m = useIsMobile();

  return (
    <div style={{ background: BRAND.paper, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavV5 />

      <main style={{
        flex: 1,
        maxWidth: 800,
        margin: '0 auto',
        width: '100%',
        padding: m ? '40px 24px' : '80px 24px'
      }}>
        <div style={{ marginBottom: 48 }}>
          <h1 style={{
            fontFamily: FONTS.display,
            fontSize: m ? 36 : 48,
            color: BRAND.ink,
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            Blog da <span style={{ color: BRAND.coral }}>SimplesMEI</span>
          </h1>
          <p style={{ color: BRAND.inkSoft, fontSize: 18, marginTop: 16 }}>
            Dicas, tutoriais e novidades para facilitar a vida do Microempreendedor Individual.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {allPosts.map(post => (
            <a key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#fff',
                padding: '32px',
                borderRadius: 24,
                border: `1px solid ${BRAND.creamDeep}`,
                boxShadow: '0 4px 12px rgba(16,17,26,0.04), 0 1px 2px rgba(16,17,26,0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(16,17,26,0.08), 0 4px 8px rgba(16,17,26,0.04)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(16,17,26,0.04), 0 1px 2px rgba(16,17,26,0.04)';
              }}>
                <div style={{ color: BRAND.inkSoft, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                  {fmtLong(post.date)}
                </div>
                <h2 style={{
                  fontFamily: FONTS.display,
                  fontSize: 24,
                  color: BRAND.ink,
                  margin: '0 0 12px 0',
                  lineHeight: 1.2
                }}>
                  {post.title}
                </h2>
                <p style={{ color: BRAND.inkSoft, fontSize: 16, margin: 0, lineHeight: 1.5 }}>
                  {post.description}
                </p>
                <div style={{ marginTop: 24, color: BRAND.coralDeep, fontWeight: 700, fontSize: 15 }}>
                  Ler artigo ↗
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export function BlogPost({ slug }) {
  const m = useIsMobile();
  const post = useMemo(() => allPosts.find(p => p.slug === slug), [slug]);

  if (!post) {
    return (
      <div style={{ background: BRAND.paper, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavV5 />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: BRAND.ink, fontFamily: FONTS.display }}>Artigo não encontrado</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const words = post.content.trim().split(/\s+/).length;
  const readMin = Math.max(1, Math.round(words / 200));

  return (
    <div style={{ background: BRAND.paper, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavV5 />

      <main style={{
        flex: 1,
        maxWidth: 720,
        margin: '0 auto',
        width: '100%',
        padding: m ? '28px 20px 0' : '44px 24px 0'
      }}>
        {/* Trilha de navegação */}
        <nav aria-label="Trilha de navegação" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 7, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>
          <a href="/" className="toc-link" style={{ color: BRAND.coralDeep, textDecoration: 'none' }}>Início</a>
          <span style={{ color: BRAND.inkLine }}>›</span>
          <a href="/blog" className="toc-link" style={{ color: BRAND.coralDeep, textDecoration: 'none' }}>Blog</a>
        </nav>

        {/* CAPA / MASTHEAD — o título é o H1 (dentro da capa) */}
        <PostCover post={post} m={m} />

        {/* HEADER do artigo — assinatura + standfirst */}
        <header style={{ margin: '22px 0 36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', fontFamily: FONTS.body, fontSize: 13.5, color: BRAND.inkSoft }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', background: `linear-gradient(135deg, ${BRAND.coral}, ${BRAND.coralDeep})`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: FONTS.display, fontWeight: 800, fontSize: 12 }}>
                {post.author && post.author.includes('Gandra')
                  ? <img src="/joao-gandra.jpg" alt={post.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : (post.author || 'S').trim().charAt(0).toUpperCase()}
              </span>
              <b style={{ color: BRAND.ink, fontWeight: 700 }}>{post.author}</b>
            </span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: BRAND.inkMid }} />
            <time dateTime={post.date}>{fmtLong(post.date)}</time>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: BRAND.inkMid }} />
            <span>{readMin} min de leitura</span>
          </div>

          {post.description && (
            <p style={{ fontFamily: FONTS.body, fontSize: 'clamp(17px, 2.8vw, 20px)', lineHeight: 1.5, color: BRAND.inkSoft, margin: '20px 0 0', textWrap: 'pretty' }}>
              {post.description}
            </p>
          )}
        </header>

        <TableOfContents content={post.content} m={m} />

        <article className="blog-content" style={{
          color: BRAND.inkPanel,
          fontSize: 18,
          lineHeight: 1.72,
          fontFamily: FONTS.body
        }}>
          <ReactMarkdown
            rehypePlugins={[rehypeSlug]}
            components={{
              a: ({node, ...props}) => <a className="blog-link" {...props} />,
              img: ({node, ...props}) => (
                <img
                  {...props}
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 16,
                    border: `1px solid ${BRAND.creamDeep}`,
                    margin: '28px 0',
                    boxShadow: '0 12px 32px -18px rgba(16,17,26,0.28)'
                  }}
                />
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        <AuthorBox author={post.author} m={m} />

        <PostFAQ faq={post.faq} m={m} />

        <Related slug={post.slug} m={m} />

        <PostCTA m={m} />

        <div style={{ height: m ? 56 : 80 }} />
      </main>

      <Footer />

      {/* Tipografia de markdown — H2/H3, parágrafo, listas, link, blockquote (nos tokens) */}
      <style>{`
        .blog-content h2 {
          font-family: ${FONTS.display};
          font-weight: 700;
          font-size: clamp(24px, 4.5vw, 30px);
          line-height: 1.18;
          letter-spacing: -0.6px;
          margin: 44px 0 14px;
          color: ${BRAND.ink};
          scroll-margin-top: 88px;
          text-wrap: balance;
        }
        .blog-content h3 {
          font-family: ${FONTS.display};
          font-weight: 700;
          font-size: clamp(18px, 3.4vw, 21px);
          line-height: 1.25;
          letter-spacing: -0.3px;
          margin: 30px 0 10px;
          color: ${BRAND.ink};
        }
        .blog-content p {
          font-size: clamp(16px, 2.6vw, 18px);
          line-height: 1.72;
          color: ${BRAND.inkPanel};
          margin: 0 0 18px;
          text-wrap: pretty;
        }
        .blog-content ul, .blog-content ol {
          margin: 0 0 18px;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .blog-content li {
          position: relative;
          padding-left: 26px;
          font-size: clamp(16px, 2.6vw, 18px);
          line-height: 1.65;
          color: ${BRAND.inkPanel};
        }
        .blog-content ul > li::before {
          content: "";
          position: absolute;
          left: 4px;
          top: 0.62em;
          width: 7px;
          height: 7px;
          border-radius: 2px;
          background: ${BRAND.coral};
        }
        .blog-content ol {
          counter-reset: li;
        }
        .blog-content ol > li {
          counter-increment: li;
        }
        .blog-content ol > li::before {
          content: counter(li);
          position: absolute;
          left: 0;
          top: 0.05em;
          font-family: ${FONTS.display};
          font-weight: 800;
          font-size: 0.85em;
          color: ${BRAND.coralDeep};
        }
        .blog-content a {
          color: ${BRAND.coralDeep};
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-thickness: 1.5px;
          transition: color .15s ease;
        }
        .blog-content a:hover { color: ${BRAND.coral}; }
        .blog-content strong { font-weight: 700; color: ${BRAND.ink}; }
        .blog-content blockquote {
          margin: 24px 0;
          padding: 4px 0 4px 22px;
          border-left: 3px solid ${BRAND.coral};
          font-family: ${FONTS.display};
          font-weight: 500;
          font-size: clamp(18px, 3vw, 21px);
          line-height: 1.45;
          letter-spacing: -0.2px;
          color: ${BRAND.ink};
        }
        .blog-content blockquote p { font: inherit; color: inherit; margin: 0; }

        /* links de navegação (índice, trilha, autor) */
        .toc-link { color: ${BRAND.inkSoft}; text-decoration: none; transition: color .15s ease; }
        .toc-link:hover { color: ${BRAND.coralDeep}; }
        .blog-link { color: ${BRAND.coralDeep}; text-decoration: none; transition: color .15s ease; }
        .blog-link:hover { color: ${BRAND.coral}; }
        .rel-card:hover { border-color: ${BRAND.coral} !important; transform: translateY(-2px); }
      `}</style>
    </div>
  );
}

import React, { useMemo } from 'react';
import fm from 'front-matter';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import { useState } from 'react';
import { Footer, Logo, NavBar } from './logo_footer.jsx';
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

function TableOfContents({ content }) {
  const headings = content.split('\n').filter(line => line.startsWith('## ')).map(line => line.replace('## ', '').trim());
  if (headings.length === 0) return null;
  return (
    <div style={{ background: '#F8F9FA', padding: '24px 32px', borderRadius: 16, marginBottom: 40, border: '1px solid #E5E7EB' }}>
      <h3 style={{ fontFamily: FONTS.display, fontSize: 18, color: BRAND.ink, marginTop: 0, marginBottom: 16 }}>Neste artigo</h3>
      <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', color: BRAND.coral, fontSize: 15, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {headings.map(h => {
          // A mesma lógica de slugify usada pelo rehype-slug (github-slugger)
          const slug = h.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          return (
            <li key={h}>
              <a href={`#${slug}`} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>
                {h}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AuthorBox({ author }) {
  const [imgError, setImgError] = useState(false);
  const isJoao = author && author.includes('Gandra');
  
  const bio = isJoao 
    ? 'Especialista em Growth com mais de 5 anos de experiência em inteligência de negócios. Ajuda o Microempreendedor Individual a escalar usando tecnologia.' 
    : 'Especialistas em contabilidade desburocratizada para o Microempreendedor Individual.';
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px 0', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB', marginTop: 64, marginBottom: 48 }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: BRAND.coralSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, overflow: 'hidden' }}>
        {isJoao && !imgError ? (
          <img src="/joao-gandra.jpg" alt="João Gandra" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setImgError(true)} />
        ) : (
          isJoao ? '👨🏻‍💻' : '👩‍💻'
        )}
      </div>
      <div>
        <div style={{ fontFamily: FONTS.display, fontSize: 18, color: BRAND.ink, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          {author || 'Equipe SimplesMEI'}
          {isJoao && (
            <a href="https://www.linkedin.com/in/joao-vitor-gandra/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: '#0A66C2', textDecoration: 'none', transition: 'opacity 0.2s' }} title="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
        </div>
        <div style={{ fontSize: 15, color: BRAND.inkSoft, marginTop: 4, lineHeight: 1.5 }}>{bio}</div>
      </div>
    </div>
  );
}

function PostFAQ({ faq }) {
  if (!faq || !faq.length) return null;
  const [openIdx, setOpenIdx] = useState(null);
  
  return (
    <div style={{ marginTop: 64, marginBottom: 64 }}>
      <h2 style={{ fontFamily: FONTS.display, fontSize: 28, color: BRAND.ink, marginBottom: 32 }}>Perguntas Frequentes</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {faq.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} style={{ border: `1px solid ${isOpen ? BRAND.coral : '#E5E7EB'}`, borderRadius: 16, overflow: 'hidden', transition: 'all 0.2s ease' }}>
              <button 
                onClick={() => setOpenIdx(isOpen ? null : i)}
                style={{ width: '100%', padding: '20px 24px', background: isOpen ? '#FFF5F4' : '#FFF', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', color: BRAND.ink, fontFamily: FONTS.body, fontSize: 16, fontWeight: 600 }}
              >
                {item.q}
                <span style={{ fontSize: 20, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', color: isOpen ? BRAND.coral : BRAND.inkSoft }}>+</span>
              </button>
              {isOpen && (
                <div style={{ padding: '0 24px 24px', background: '#FFF5F4', color: BRAND.inkSoft, fontSize: 16, lineHeight: 1.6 }}>
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PostCTA() {
  return (
    <div style={{ background: `linear-gradient(145deg, ${BRAND.ink}, #232431)`, padding: 40, borderRadius: 24, textAlign: 'center', color: '#fff', marginBottom: 64, boxShadow: '0 20px 40px rgba(16,17,26,0.15)' }}>
      <h2 style={{ fontFamily: FONTS.display, fontSize: 28, margin: '0 0 16px', color: '#fff' }}>Pronto para descomplicar seu MEI?</h2>
      <p style={{ fontSize: 16, color: '#DCDDE6', margin: '0 0 32px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
        A IA que emite sua nota fiscal, cuida do DAS e vigia o seu teto direto pelo WhatsApp. Sem burocracia.
      </p>
      <button style={{ background: BRAND.coral, color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 12, fontSize: 16, fontWeight: 700, fontFamily: FONTS.body, cursor: 'pointer', boxShadow: '0 4px 12px rgba(228,88,68,0.3)' }}>
        Testar no WhatsApp agora
      </button>
    </div>
  );
}

export function BlogList() {
  const m = useIsMobile();

  return (
    <div style={{ background: BRAND.paper, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      
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
                  {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(post.date))}
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
                <div style={{ marginTop: 24, color: BRAND.coral, fontWeight: 700, fontSize: 15 }}>
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
        <NavBar />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: BRAND.ink, fontFamily: FONTS.display }}>Artigo não encontrado</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: BRAND.paper, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      
      <main style={{ 
        flex: 1, 
        maxWidth: 720, 
        margin: '0 auto', 
        width: '100%',
        padding: m ? '40px 24px' : '80px 24px' 
      }}>
        <a href="/blog" style={{ 
          color: BRAND.coral, 
          textDecoration: 'none', 
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 32
        }}>
          ← Voltar para o Blog
        </a>

        <header style={{ marginBottom: 48 }}>
          <div style={{ color: BRAND.inkSoft, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>
            {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(post.date))} • {post.author}
          </div>
          <h1 style={{ 
            fontFamily: FONTS.display, 
            fontSize: m ? 36 : 48, 
            color: BRAND.ink, 
            margin: '0 0 24px 0',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            {post.title}
          </h1>
          <p style={{ color: BRAND.inkSoft, fontSize: 20, margin: 0, lineHeight: 1.5 }}>
            {post.description}
          </p>
        </header>

        <TableOfContents content={post.content} />

        <article className="blog-content" style={{ 
          color: BRAND.ink, 
          fontSize: 18, 
          lineHeight: 1.6,
          fontFamily: FONTS.body 
        }}>
          <ReactMarkdown 
            rehypePlugins={[rehypeSlug]}
            components={{
              img: ({node, ...props}) => (
                <img 
                  {...props} 
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto', 
                    borderRadius: 16, 
                    margin: '32px 0', 
                    boxShadow: '0 8px 24px rgba(16,17,26,0.08)' 
                  }} 
                />
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
        
        <AuthorBox author={post.author} />
        
        <PostFAQ faq={post.faq} />
        
        <PostCTA />
      </main>
      
      <Footer />
      
      {/* Estilos para o ReactMarkdown renderizar bonito dentro do .blog-content */}
      <style>{`
        .blog-content h2 {
          font-family: ${FONTS.display};
          font-size: 28px;
          margin-top: 48px;
          margin-bottom: 24px;
          color: ${BRAND.ink};
        }
        .blog-content h3 {
          font-family: ${FONTS.display};
          font-size: 22px;
          margin-top: 32px;
          margin-bottom: 16px;
          color: ${BRAND.ink};
        }
        .blog-content p {
          margin-bottom: 24px;
        }
        .blog-content a {
          color: ${BRAND.coralDeep};
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 24px;
          padding-left: 24px;
        }
        .blog-content li {
          margin-bottom: 8px;
        }
        .blog-content strong {
          font-weight: 700;
        }
        .blog-content blockquote {
          border-left: 4px solid ${BRAND.coralSoft};
          padding-left: 16px;
          margin-left: 0;
          color: ${BRAND.inkSoft};
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

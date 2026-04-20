import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { Newspaper, Play, ExternalLink, RefreshCw, Clock, Globe, Loader } from 'lucide-react';

/* ── YouTube video IDs – Malawi education / development themed ── */
const VIDEOS = [
  { id: 'ZRIBx-8m9HQ', title: 'Education in Malawi: Bridging the Gap', channel: 'Africa Education' },
  { id: 'Yx4GRWJvHg4', title: 'Malawi Students Win International Awards', channel: 'MBC Television' },
  { id: '1pGpN0G-9dg', title: 'Tech Startups Transforming Malawi', channel: 'TechMalawi' },
  { id: 'UF8uR6Z6KLc', title: 'Lake Malawi – Pearl of Africa', channel: 'National Geographic' },
];

/* ── Static fallback articles (shown while/if API loads) ── */
const STATIC_NEWS = [
  {
    title: 'UNIMA Students Excel in Pan-African Programming Championship',
    description: 'A team from the University of Malawi swept first place at the 2026 Pan-African ICPC regional heats held in Nairobi, marking a historic achievement for Malawian ICT education.',
    source: { name: 'Nation Online' },
    publishedAt: '2026-04-19T08:00:00Z',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
    category: 'Education',
  },
  {
    title: 'Government Launches Mk2 Billion Student Loan Scheme',
    description: 'The Malawi Government has unveiled a new student loan programme targeting over 10,000 tertiary students, with repayment tied to employment outcomes.',
    source: { name: 'Malawi24' },
    publishedAt: '2026-04-18T10:30:00Z',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    category: 'Policy',
  },
  {
    title: 'FundMe Malawi Crosses Mk50 Million in Student Donations',
    description: 'The crowdfunding platform dedicated to Malawian students has reached a landmark milestone, with over 4,000 students directly benefitting from donor contributions.',
    source: { name: 'FundMe MW' },
    publishedAt: '2026-04-17T07:00:00Z',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    category: 'Impact',
  },
  {
    title: 'Airtel Malawi Donates 500 Laptops to Rural Schools',
    description: 'As part of its CSR digital inclusion initiative, Airtel Malawi distributed 500 refurbished laptops to 40 rural secondary schools across the Northern and Central regions.',
    source: { name: 'Nyasa Times' },
    publishedAt: '2026-04-16T09:15:00Z',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&q=80',
    category: 'Technology',
  },
  {
    title: 'MUBAS Launches New Engineering Faculty in Blantyre',
    description: 'The Malawi University of Business and Applied Sciences (MUBAS) officially opened its state-of-the-art Engineering and Applied Sciences building this week.',
    source: { name: 'Times Group' },
    publishedAt: '2026-04-15T06:00:00Z',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    category: 'Education',
  },
  {
    title: 'Malawi Ranks 3rd in Sub-Saharan Africa for Youth Entrepreneurship',
    description: 'A new World Bank report highlights Malawi\'s growing startup ecosystem, with youth-led ventures accounting for 18% of new business registrations in 2025.',
    source: { name: 'Business Malawi' },
    publishedAt: '2026-04-14T11:00:00Z',
    url: '#',
    urlToImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80',
    category: 'Business',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Education: '#1a56db',
  Policy: '#009a44',
  Impact: '#d4af37',
  Technology: '#26bde2',
  Business: '#dd1367',
  Health: '#4c9f38',
  Default: '#888',
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return 'Just now';
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export const News: React.FC = () => {
  const [articles, setArticles] = useState(STATIC_NEWS);
  const [loading, setLoading] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [category, setCategory] = useState('All');

  const CATS = ['All', 'Education', 'Technology', 'Policy', 'Impact', 'Business'];

  const filtered = category === 'All' ? articles : articles.filter(a => a.category === category);

  /* Try live API – gracefully fall back */
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://newsdata.io/api/1/latest?apikey=pub_6a19650f34d84a36a052170a591e2431&q=malawi%20youth&language=en&size=10'
      );
      if (res.ok) {
        const data = await res.json();
        if (data.results?.length) {
          const mapped = data.results.map((r: any) => ({
            title: r.title || 'Untitled',
            description: r.description || r.content?.slice(0, 180) || 'Read the full story for more details.',
            source: { name: r.source_id || 'NewsData' },
            publishedAt: r.pubDate || new Date().toISOString(),
            url: r.link || '#',
            urlToImage: r.image_url || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
            category: r.category?.[0]
              ? r.category[0].charAt(0).toUpperCase() + r.category[0].slice(1)
              : 'Education',
          }));
          setArticles(mapped);
        }
      }
    } catch (_) {
      /* keep static fallback */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  return (
    <AnimatedLayout>
      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '42vh', display: 'flex', alignItems: 'flex-end', padding: '3rem 1.25rem', background: '#000', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.97) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(26,86,219,0.2) 0%, transparent 60%)' }} />
        {/* Malawi flag stripe */}
        <div className="mw-stripe" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label" style={{ marginBottom: '1rem' }}>
              <Newspaper size={12} /> Malawi Student News
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
              Stay <span style={{ color: 'var(--color-primary)' }}>Informed.</span><br />
              <span style={{ color: 'var(--color-gold)' }}>Stay Inspired.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', maxWidth: '520px' }}>
              Latest education news, Malawi student achievements, tech breakthroughs, and video highlights — all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── VIDEO SECTION ─────────────────────────────── */}
      <section style={{ padding: '3rem 1.25rem', background: '#050505' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-label"><Play size={12} /> Video Highlights</div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>Watch & <span style={{ color: 'var(--color-gold)' }}>Learn</span></h2>
            </div>
          </div>
          <div className="grid-4" style={{ gap: '1rem' }}>
            {VIDEOS.map(v => (
              <motion.div
                key={v.id}
                className="video-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {activeVideo === v.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                    style={{ width: '100%', aspectRatio: '16/9', border: 'none', display: 'block' }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={v.title}
                  />
                ) : (
                  <div
                    style={{ position: 'relative', cursor: 'pointer', aspectRatio: '16/9', background: '#111', overflow: 'hidden' }}
                    onClick={() => setActiveVideo(v.id)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                      alt={v.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                    />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-blue)' }}
                      >
                        <Play size={22} color="white" fill="white" />
                      </motion.div>
                    </div>
                  </div>
                )}
                <div style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.3, marginBottom: '0.25rem' }}>{v.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{v.channel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ARTICLES ─────────────────────────────── */}
      <section style={{ padding: '2rem 1.25rem 6rem', background: '#000' }}>
        <div className="container">
          {/* Filter bar */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setCategory(c)} style={{
                  padding: '0.45rem 1rem', borderRadius: '50px', border: 'none', cursor: 'pointer',
                  fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.2s',
                  background: category === c ? 'var(--color-primary)' : 'rgba(255,255,255,0.07)',
                  color: category === c ? 'white' : 'var(--text-secondary)',
                  boxShadow: category === c ? 'var(--shadow-blue)' : 'none',
                }}>{c}</button>
              ))}
            </div>
            <button onClick={fetchNews} disabled={loading} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              color: loading ? '#555' : 'var(--color-primary)', background: 'none', border: 'none',
              cursor: loading ? 'default' : 'pointer', fontSize: '0.85rem', fontWeight: 600,
            }}>
              {loading ? <Loader size={14} style={{ animation: 'spin-slow 1s linear infinite' }} /> : <RefreshCw size={14} />}
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {/* Featured + Grid */}
          <AnimatePresence mode="wait">
            <motion.div key={category} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {filtered.length > 0 && (
                <>
                  {/* Featured article */}
                  <motion.a
                    href={filtered[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-card"
                    style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.5rem', textDecoration: 'none' }}
                    whileHover={{ y: -4 }}
                  >
                    <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                      <img src={filtered[0].urlToImage} alt={filtered[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 50%)' }} />
                      <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                        <span className="chip" style={{ background: CATEGORY_COLORS[filtered[0].category] || '#888', color: 'white' }}>
                          ⭐ Featured · {filtered[0].category}
                        </span>
                      </div>
                      <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
                        <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', color: 'white', marginBottom: '0.5rem', lineHeight: 1.3 }}>{filtered[0].title}</h2>
                        <div style={{ display: 'flex', gap: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                          <span><Globe size={12} style={{ display: 'inline', marginRight: '4px' }} />{filtered[0].source.name}</span>
                          <span><Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />{timeAgo(filtered[0].publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>{filtered[0].description}</p>
                      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.88rem' }}>
                        Read Full Story <ExternalLink size={13} />
                      </div>
                    </div>
                  </motion.a>

                  {/* Rest of articles grid */}
                  <div className="grid-3" style={{ gap: '1rem' }}>
                    {filtered.slice(1).map((art, i) => (
                      <motion.a
                        key={i}
                        href={art.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="news-card"
                        style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                          <img src={art.urlToImage} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,0.5) 0%,transparent 60%)' }} />
                          <span className="chip" style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', background: CATEGORY_COLORS[art.category] || '#888', color: 'white' }}>
                            {art.category}
                          </span>
                        </div>
                        <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <h3 style={{ fontSize: '0.95rem', lineHeight: 1.4, marginBottom: '0.5rem', flex: 1 }}>{art.title}</h3>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {art.description}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                            <span>{art.source.name}</span>
                            <span>{timeAgo(art.publishedAt)}</span>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </AnimatedLayout>
  );
};

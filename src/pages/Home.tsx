import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { Heart, BookOpen, Laptop, Briefcase, Trophy, ChevronDown, MapPin, ArrowRight, Star, Users, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── Animated counter (single) ────────────────── */
function CountUp({ target, suffix, label, start }: { target: number; suffix: string; label: string; start: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = 0;
    const step = target / (2000 / 16);
    const t = setInterval(() => { s = Math.min(s + step, target); setVal(Math.floor(s)); if (s >= target) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [start, target]);
  return (
    <div className="stat-badge">
      <div className="num">{val.toLocaleString()}{suffix}</div>
      <div className="label">{label}</div>
    </div>
  );
}

const STATS = [
  { target: 45,    suffix: 'M+ Mk', label: 'Total Raised'   },
  { target: 3500,  suffix: '',       label: 'Students Helped'},
  { target: 12000, suffix: '',       label: 'Global Donors'  },
  { target: 94,    suffix: '%',      label: 'Success Rate'   },
];

const STORIES = [
  { name: 'Chikondi Mwanza', uni: 'UNIMA, Zomba', img: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&q=80', quote: 'FundMe paid my final-year fees. I graduated top of my class and now work at Standard Bank.', stars: 5, raised: 'Mk 85,000' },
  { name: 'Dalitso Kamanga', uni: 'MUBAS, Blantyre', img: 'https://images.unsplash.com/photo-1506634572416-48cdfe7683b8?w=400&q=80', quote: 'I got a laptop through the ICT support program. My thesis is now published in a regional journal.', stars: 5, raised: 'Mk 120,000' },
  { name: 'Thandeka Phiri', uni: 'KUHeS, Lilongwe', img: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400&q=80', quote: 'The internship placement connected me with Airtel Malawi. I have a full-time offer after I graduate.', stars: 5, raised: 'Mk 45,000' },
];

const PROBLEMS = [
  { icon: <BookOpen size={28} />, title: '1 in 3 students drop out', desc: 'Due to unpaid tuition — not lack of ability. A Mk50,000 gap can end a promising career before it begins.', color: 'var(--color-primary)' },
  { icon: <Laptop size={28} />, title: '78% lack basic ICT tools', desc: 'Most rural students have never owned a laptop. Without one, a Computer Science degree is nearly impossible.', color: '#d4af37' },
  { icon: <Briefcase size={28} />, title: 'Only 8% find internships', desc: 'Malawi\'s internship market is invisible to most students. Connections and transport costs shut them out.', color: 'var(--color-primary)' },
  { icon: <Trophy size={28} />, title: 'Excellence goes unnoticed', desc: 'Brilliant innovators in remote areas have no platform. Our awards change that — creating national role models.', color: '#d4af37' },
];

const MARQUEE_ITEMS = [
  '❤️ Chifundo donated Mk50,000 to Medical Fees',
  '🎓 John donated Mk15,000 to Books & Supplies',
  '💻 Airtel Malawi donated Mk500,000 to ICT Equipment',
  '🏠 Anonymous donated Mk100,000 to Housing Support',
  '📚 Grace donated Mk25,000 to MUBAS Tuition Fees',
  '🌟 Standard Bank donated Mk1,000,000 to Scholarships',
];

const URGENT = [
  { title: 'Final Year UNIMA Fees', student: 'Chikondi M.', location: 'Zomba', progress: 75, color: '#cc0000', goal: 'Mk 85,000', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80' },
  { title: 'Laptop for CompSci Degree', student: 'Dalitso K.', location: 'Blantyre', progress: 40, color: '#d4af37', goal: 'Mk 120,000', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80' },
  { title: 'Emergency Housing & Rent', student: 'Yamikani D.', location: 'Lilongwe', progress: 90, color: '#cc0000', goal: 'Mk 35,000', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80' },
];

export const Home: React.FC = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatedLayout>

      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{ position: 'relative', height: 'calc(100vh - 70px)', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', marginTop: '-70px' }}>
        <img src="/hero.png" alt="Malawian students studying" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
        {/* layered overlays for drama */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.85) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(26,86,219,0.15) 0%, transparent 60%)' }} />
        <div className="mw-stripe" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

        {/* particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{
            width: `${4 + (i % 3) * 3}px`, height: `${4 + (i % 3) * 3}px`,
            background: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-gold)',
            left: `${10 + i * 11}%`, bottom: `${15 + (i % 4) * 10}%`,
            animationDuration: `${4 + i * 0.8}s`, animationDelay: `${i * 0.5}s`,
          }} />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '6rem' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
            <div className="section-label" style={{ marginBottom: '1.5rem' }}>
              <Heart size={12} fill="currentColor" /> Malawi's Student Relief Platform
            </div>
            <h1 style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', color: 'white', marginBottom: '1.25rem', lineHeight: 1.05 }}>
              Every Malawian<br />
              Student <span style={{ color: 'var(--color-primary)' }}>Deserves</span><br />
              <span style={{ color: 'var(--color-gold)' }}>A Chance.</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.85)', maxWidth: '560px', marginBottom: '2.5rem', lineHeight: 1.7 }}>
              Tuition fees, laptops, internships, and national recognition — we bridge the gap between talent and opportunity for students across Malawi.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', maxWidth: '500px' }}>
              <Link to="/donate" className="pill-btn" style={{ flex: 1, minWidth: '160px', maxWidth: '220px' }}>
                <Heart size={18} fill="white" /> Donate Now
              </Link>
              <Link to="/campaigns" className="pill-btn pill-btn-ghost" style={{ flex: 1, minWidth: '160px', maxWidth: '220px' }}>
                View Campaigns <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}
          style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', zIndex: 2 }}>
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* ── PROBLEM STATEMENT ─────────────────────────── */}
      <section style={{ padding: '5rem 1.25rem', background: '#060606' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label" style={{ margin: '0 auto 1rem' }}>The Reality</div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>The Struggle Is <span style={{ color: 'var(--color-primary)' }}>Real</span></h2>
            <div className="gold-divider" style={{ margin: '1rem auto' }} />
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Malawi has a 61% literacy rate but one of the world's lowest graduation rates. Here's why — and how we fix it.
            </p>
          </motion.div>

          <div className="grid-2" style={{ gap: '1.5rem' }}>
            {PROBLEMS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', borderLeft: `3px solid ${p.color}` }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${p.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: p.color }}>
                  {p.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: p.color }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────── */}
      <section ref={statsRef} style={{ padding: '5rem 1.25rem', background: 'var(--color-primary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white' }}>Our Collective Impact</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: '0.5rem' }}>Real numbers. Real change. Real Malawians.</p>
          </div>
          <div className="grid-4">
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <CountUp target={s.target} suffix={s.suffix} label={s.label} start={statsVisible} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* marquee */}
        <div style={{ marginTop: '3rem', overflow: 'hidden', background: 'rgba(0,0,0,0.25)', padding: '1rem 0' }}>
          <div className="animate-marquee" style={{ gap: '4rem' }}>
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((txt, i) => (
              <span key={i} style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '1rem', whiteSpace: 'nowrap' }}>{txt}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section style={{ padding: '5rem 1.25rem', background: '#080808' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label" style={{ margin: '0 auto 1rem' }}>The Process</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>How <span style={{ color: 'var(--color-gold)' }}>FundMe MW</span> Works</h2>
          </div>
          <div className="grid-3">
            {[
              { step: '01', icon: <Users size={32} />, title: 'Students Apply', desc: 'Students create verified profiles showing their academic records, financial need, and goals. University admin confirms their standing.', color: '#cc0000' },
              { step: '02', icon: <Heart size={32} fill="#d4af37" />, title: 'Donors Give', desc: 'Donors choose specific students or causes — school fees, laptops, internship costs — via Airtel Money, TNM Mpamba, National Bank, or PayPal.', color: '#d4af37' },
              { step: '03', icon: <TrendingUp size={32} />, title: 'Lives Change', desc: 'Funds go directly to the institution or student. Donors track progress. Top performers get awarded and ICT support from our corporate partners.', color: '#cc0000' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="glass-panel" style={{ padding: '2.5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontSize: '4rem', fontWeight: 900, color: 'rgba(255,255,255,0.04)', fontFamily: 'Outfit' }}>{s.step}</div>
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: `${s.color}20`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: s.color }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── URGENT CAMPAIGNS ──────────────────────────── */}
      <section style={{ padding: '5rem 1.25rem 6rem', background: '#000' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-label">Urgent Needs</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>Students Waiting <span style={{ color: 'var(--color-primary)' }}>Now</span></h2>
            </div>
            <Link to="/campaigns" style={{ color: 'var(--color-gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid-3">
            {URGENT.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="campaign-card">
                <div style={{ position: 'relative' }}>
                  <img src={item.img} alt={item.title} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem' }}>
                    <span className="chip" style={{ background: `${item.color}cc`, color: 'white' }}>
                      <MapPin size={10} style={{ marginRight: '3px' }} />{item.location}
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{item.student}</p>
                  <div className="progress-bar">
                    <motion.div className="progress-fill" initial={{ width: 0 }} whileInView={{ width: `${item.progress}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }}
                      style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)` }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Goal: {item.goal}</span>
                    <span style={{ color: item.color, fontWeight: 700 }}>{item.progress}% funded</span>
                  </div>
                  <Link to="/donate" className="pill-btn" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}99)`, width: '100%' }}>
                    <Heart size={16} fill="white" /> Support Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────── */}
      <section style={{ padding: '5rem 1.25rem', background: '#050505' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="section-label" style={{ margin: '0 auto 1rem' }}>Success Stories</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>Lives We've <span style={{ color: 'var(--color-gold)' }}>Changed</span></h2>
            <div className="gold-divider" style={{ margin: '1rem auto' }} />
          </div>
          <div className="grid-3">
            {STORIES.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="testimonial-card">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <img src={s.img} alt={s.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-gold)' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{s.name}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{s.uni}</div>
                    <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                      {[...Array(s.stars)].map((_, j) => <Star key={j} size={12} color="#d4af37" fill="#d4af37" />)}
                    </div>
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>"{s.quote}"</p>
                <div style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.9rem' }}>
                  <Shield size={14} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                  Received: {s.raised}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────── */}
      <section style={{ padding: '5rem 1.25rem', background: '#000', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(26,86,219,0.15) 0%, transparent 70%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="glass-panel animate-border-glow" style={{ padding: 'clamp(2.5rem, 5vw, 5rem)', maxWidth: '700px', margin: '0 auto', borderColor: 'rgba(212,175,55,0.2)' }}>
            <Trophy size={48} color="var(--color-gold)" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
              Be the Reason<br /><span style={{ color: 'var(--color-gold)' }}>A Dream Survives</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              Your donation — no matter the size — directly removes a barrier standing between a student and their future.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/donate" className="pill-btn" style={{ maxWidth: '220px' }}>
                <Heart size={18} fill="white" /> Donate Today
              </Link>
              <Link to="/campaigns" className="pill-btn pill-btn-ghost" style={{ maxWidth: '220px' }}>
                Browse Campaigns
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </AnimatedLayout>
  );
};

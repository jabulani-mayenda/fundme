import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { Trophy, Star, ChevronRight, Heart, Award, Laptop, X } from 'lucide-react';

const WINNER = {
  name: 'Emanuel Kamanga',
  uni: 'MUST – Malawi University of Science & Technology',
  category: 'Innovator of the Year 2026',
  achievement: 'Built a solar-powered irrigation system for 3 villages in Salima using recycled materials — while studying full-time. His innovation now feeds 400+ families.',
  img: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=600&q=80',
  prize: 'HP Laptop + Mk 500,000 grant + 1-year mentorship',
};

const HALL = [
  { year: '2025', category: 'Tech Excellence', name: 'Grace Mwanza', uni: 'MUBAS', color: '#007bff', story: 'Developed a mobile app for maternal health tracking used in 12 clinics across Malawi.', img: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400&q=80' },
  { year: '2025', category: 'Community Health', name: 'Dr. Peter Banda', uni: 'KUHeS', color: '#4c9f38', story: 'Designed a low-cost water purification system now deployed in 30 rural schools.', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80' },
  { year: '2024', category: 'Agri-Business', name: 'Tiwonge Phiri', uni: 'LUANAR', color: '#d4af37', story: 'Created a cooperative model connecting 200 smallholder farmers to export markets.', img: 'https://images.unsplash.com/photo-1506634572416-48cdfe7683b8?w=400&q=80' },
  { year: '2024', category: 'Social Impact', name: 'Blessings K.', uni: 'UNIMA', color: 'var(--color-primary)', story: 'Founded a free tutoring network that helped 800 secondary school students pass their MSCE.', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80' },
  { year: '2023', category: 'Climate Action', name: 'Mercy Lungu', uni: 'MUST', color: '#26bde2', story: 'Invented a biogas digester using maize cobs, now reducing deforestation in 5 districts.', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80' },
  { year: '2023', category: 'Education Champion', name: 'Isaac Chirwa', uni: 'Domasi College', color: '#dd1367', story: 'Built a radio-based learning program reaching 15,000 students without internet access.', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80' },
];

const ICT_PRIZES = [
  { icon: <Laptop size={28} />, title: 'HP ProBook Laptop', desc: 'Top overall winner receives a high-performance laptop for continued innovation.', color: '#d4af37' },
  { icon: <Award size={28} />, title: 'Mk 500,000 Grant', desc: 'Cash grant to help scale the winning project or fund postgraduate studies.', color: 'var(--color-primary)' },
  { icon: <Star size={28} />, title: '1-Year Mentorship', desc: 'Paired with a senior executive from a top Malawian or regional company.', color: '#d4af37' },
  { icon: <Heart size={28} />, title: 'National Feature', desc: 'Story published on national media, TV, and our platform for maximum exposure.', color: 'var(--color-primary)' },
];

export const Awards: React.FC = () => {
  const [selected, setSelected] = useState<typeof HALL[0] | null>(null);

  return (
    <AnimatedLayout>
      {/* ── SPOTLIGHT HERO ─────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', background: '#020202', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(26,86,219,0.08) 0%, transparent 60%)' }} />
        <div className="mw-stripe" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

        {/* Animated gold rings */}
        {[200, 350, 500].map((size, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: `${size}px`, height: `${size}px`, borderRadius: '50%',
            border: `1px solid rgba(212,175,55,${0.15 - i * 0.04})`,
            animation: `glow-gold ${3 + i}s ease-in-out infinite ${i * 0.5}s`,
          }} />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
              <div className="section-label" style={{ marginBottom: '1.5rem' }}>
                <Trophy size={14} /> 2026 Grand Champion
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '0.75rem', lineHeight: 1.1 }}>
                <span style={{ color: 'var(--color-gold)' }}>{WINNER.category}</span>
              </h1>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'white', marginBottom: '1rem' }}>{WINNER.name}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{WINNER.uni}</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '480px', marginBottom: '2rem' }}>{WINNER.achievement}</p>
              <div className="glass-panel gold-border" style={{ display: 'inline-flex', padding: '0.75rem 1.5rem', gap: '0.75rem', alignItems: 'center', borderRadius: '12px', marginBottom: '2rem' }}>
                <Trophy size={20} color="var(--color-gold)" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Prize Package</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-gold)', fontSize: '0.95rem' }}>{WINNER.prize}</div>
                </div>
              </div>
              <div>
                <button className="pill-btn" style={{ maxWidth: '220px' }}><Star size={16} fill="white" /> Nominate Someone</button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} style={{ position: 'relative' }}>
              <div className="animate-glow-gold" style={{ borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(212,175,55,0.4)' }}>
                <img src={WINNER.img} alt={WINNER.name} style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-15px', background: 'var(--gradient-gold)', borderRadius: '50%', width: '90px', height: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-gold)' }}>
                <Trophy size={28} color="#000" />
                <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#000', textTransform: 'uppercase' }}>2026</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ICT PRIZES ──────────────────────────────────── */}
      <section style={{ padding: '5rem 1.25rem', background: '#f8faff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ margin: '0 auto 1rem' }}>What Winners Receive</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>The <span style={{ color: 'var(--color-gold)' }}>Prize Package</span></h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0.75rem auto 0' }}>
              Top donors fund ICT prizes specifically to reward academic excellence across Malawi.
            </p>
          </div>
          <div className="grid-4">
            {ICT_PRIZES.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ padding: '2rem', textAlign: 'center', borderTop: `4px solid ${p.color}`, background: `${p.color}08`, borderRadius: '20px', border: `1px solid ${p.color}20`, borderTopWidth: '4px', borderTopColor: p.color, borderTopStyle: 'solid', boxShadow: `0 4px 20px ${p.color}10` }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: `${p.color}15`, border: `1px solid ${p.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: p.color }}>
                  {p.icon}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{p.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HALL OF FAME ───────────────────────────────── */}
      <section style={{ padding: '5rem 1.25rem 7rem', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-label">🏆 Hall of Fame</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--text-primary)' }}>Past <span style={{ color: 'var(--color-gold)' }}>Champions</span></h2>
            </div>
            <button className="pill-btn" style={{ maxWidth: '200px', background: 'var(--gradient-gold)', color: '#000' }}>
              <Star size={15} /> Nominate <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid-3">
            {HALL.map((award, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40, rotateX: 10 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: i * 0.1, type: 'spring' }}
                onClick={() => setSelected(award)}
                style={{ cursor: 'pointer', borderRadius: '20px', overflow: 'hidden', border: `1px solid ${award.color}20`, position: 'relative', transformPerspective: 1000, transition: 'transform 0.3s, box-shadow 0.3s', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                whileHover={{ y: -8, boxShadow: `0 20px 40px ${award.color}25` }}
              >
                <div style={{ position: 'relative', height: '180px' }}>
                  <img src={award.img} alt={award.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,0.8) 0%,transparent 60%)' }} />
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: `${award.color}ee`, color: 'white', padding: '0.25rem 0.7rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>{award.year}</div>
                </div>
                {/* Colorful card body */}
                <div style={{ background: `${award.color}08`, padding: '1.5rem', borderTop: `3px solid ${award.color}` }}>
                  <div style={{ color: award.color, fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>{award.category}</div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.3rem', color: 'var(--text-primary)' }}>{award.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '1rem', lineHeight: 1.5 }}>{award.uni}</p>
                  <button className="pill-btn" style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem', background: `linear-gradient(135deg, ${award.color}, ${award.color}99)` }}>
                    Read Story <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY MODAL ──────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, backdropFilter: 'blur(8px)' }} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
              style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 201, width: '90%', maxWidth: '500px', borderRadius: '24px', overflow: 'hidden', background: '#fff', border: `2px solid ${selected?.color}30`, boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>
              <img src={selected.img} alt={selected.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={18} />
              </button>
              <div style={{ padding: '2rem', background: selected ? `${selected.color}05` : '#fff' }}>
                <div style={{ color: selected.color, fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{selected.category} · {selected.year}</div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{selected.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{selected.uni}</p>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '1rem' }}>{selected.story}</p>
                <button className="pill-btn" style={{ marginTop: '1.5rem', background: `linear-gradient(135deg,${selected.color},${selected.color}99)` }}>
                  <Heart size={16} fill="white" /> Donate in Their Honour
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AnimatedLayout>
  );
};

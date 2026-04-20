import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { MapPin, Heart, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const ALL_CAMPAIGNS = [
  { id: 1, cat: 'Education', tag: '🎓', title: 'Fund Final Year UNIMA Fees', student: 'Chikondi M.', location: 'Zomba', progress: 75, color: '#cc0000', goal: 'Mk 85,000', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', urgent: true },
  { id: 2, cat: 'Technology', tag: '💻', title: 'ICT Equipment for Rural Computer Lab', student: 'Mzuzu Tech Club', location: 'Mzuzu', progress: 40, color: '#d4af37', goal: 'Mk 350,000', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80', urgent: false },
  { id: 3, cat: 'Housing', tag: '🏠', title: 'Emergency Hostel Fees & Housing', student: 'Yamikani D.', location: 'Lilongwe', progress: 90, color: '#cc0000', goal: 'Mk 35,000', img: 'https://images.unsplash.com/photo-1544207959-195cce28e08d?w=600&q=80', urgent: true },
  { id: 4, cat: 'Medical', tag: '🏥', title: 'Medical Internship Travel Costs', student: 'Dr. Thandi N.', location: 'Blantyre', progress: 60, color: '#4c9f38', goal: 'Mk 45,000', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', urgent: false },
  { id: 5, cat: 'Education', tag: '🎓', title: 'Startup Capital – Agribusiness Grad', student: 'LUANAR Grads', location: 'Lilongwe', progress: 25, color: '#cc0000', goal: 'Mk 200,000', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80', urgent: false },
  { id: 6, cat: 'Technology', tag: '💻', title: 'Laptop for CompSci Final Project', student: 'Dalitso K.', location: 'Blantyre', progress: 55, color: '#d4af37', goal: 'Mk 120,000', img: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&q=80', urgent: true },
  { id: 7, cat: 'Books', tag: '📚', title: 'Textbooks & Study Materials', student: 'Mary C.', location: 'Zomba', progress: 80, color: '#ff6b35', goal: 'Mk 25,000', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80', urgent: false },
  { id: 8, cat: 'Medical', tag: '🏥', title: 'Nursing School Registration Fees', student: 'Faith B.', location: 'Mzuzu', progress: 30, color: '#4c9f38', goal: 'Mk 55,000', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80', urgent: true },
];

const FILTERS = ['All', 'Education', 'Technology', 'Housing', 'Medical', 'Books'];

export const Campaigns: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = ALL_CAMPAIGNS.filter(c => {
    const matchCat = activeFilter === 'All' || c.cat === activeFilter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.student.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <AnimatedLayout>
      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '55vh', backgroundImage: 'url("/community-school.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', display: 'flex', alignItems: 'flex-end', padding: '3rem 1.25rem' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.92) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label" style={{ marginBottom: '1rem' }}>🔴 Active Campaigns</div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', color: 'white', marginBottom: '1rem' }}>
              Fund a <span style={{ color: 'var(--color-primary)' }}>Real</span> Student,<br />
              Change a <span style={{ color: 'var(--color-gold)' }}>Real Life</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: '580px', marginBottom: '2rem' }}>
              Every campaign is a verified student with a real need. Browse, choose who you want to support, and pay in seconds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SEARCH + FILTER BAR ───────────────────────── */}
      <section style={{ position: 'sticky', top: '70px', zIndex: 40, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #eee', padding: '1rem 1.25rem' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
              <input className="form-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search campaigns, students..." style={{ paddingLeft: '2.5rem' }} />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Filter size={16} style={{ color: '#555', alignSelf: 'center' }} />
              {FILTERS.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{
                  padding: '0.5rem 1rem', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s',
                  background: activeFilter === f ? 'var(--color-primary)' : '#f1f5f9',
                  color: activeFilter === f ? 'white' : '#555',
                  boxShadow: activeFilter === f ? 'var(--shadow-blue)' : 'none',
                }}>{f}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAMPAIGN GRID ─────────────────────────────── */}
      <section style={{ padding: '2.5rem 1.25rem 7rem', background: '#f8faff', minHeight: '60vh' }}>
        <div className="container">
          <div style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> campaigns
          </div>
          <motion.div layout className="grid-3">
            <AnimatePresence>
              {filtered.map(item => (
                <motion.div layout key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="campaign-card" style={{ background: '#fff', border: '1px solid #eee' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={item.img} alt={item.title} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(0,0,0,0.5) 0%,transparent 50%)' }} />
                    {item.urgent && (
                      <div className="animate-pulse-ring" style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'var(--color-primary)', color: 'white', padding: '0.25rem 0.6rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>
                        Urgent
                      </div>
                    )}
                    <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.4rem' }}>
                      <span className="chip" style={{ background: `${item.color}dd`, color: 'white' }}>{item.tag} {item.cat}</span>
                    </div>
                  </div>
                  {/* Colourful category accent bar */}
                  <div style={{ height: '4px', background: `linear-gradient(90deg, ${item.color}, ${item.color}55)` }} />
                  <div className="card-body" style={{ background: `${item.color}06` }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', lineHeight: 1.3, color: 'var(--text-primary)' }}>{item.title}</h3>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <span>{item.student}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={12} />{item.location}
                      </span>
                    </div>
                    <div className="progress-bar" style={{ background: '#eee' }}>
                      <motion.div className="progress-fill" initial={{ width: 0 }} whileInView={{ width: `${item.progress}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }}
                        style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}88)` }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Goal: {item.goal}</span>
                      <span style={{ color: item.color, fontWeight: 700 }}>{item.progress}%</span>
                    </div>
                    <Link to="/donate" className="pill-btn" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}88)` }}>
                      <Heart size={15} fill="white" /> Support Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
              <p style={{ fontSize: '1.1rem' }}>No campaigns match your search.</p>
              <button onClick={() => { setActiveFilter('All'); setSearch(''); }} className="pill-btn" style={{ maxWidth: '200px', margin: '1.5rem auto 0' }}>Clear Filters</button>
            </div>
          )}
        </div>
      </section>
    </AnimatedLayout>
  );
};

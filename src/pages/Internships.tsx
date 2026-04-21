import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { MapPin, Clock, Briefcase, CheckCircle, Search, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const INTERNSHIPS = [
  { id: 1, role: 'Software Engineering Intern', company: 'Standard Bank Malawi', loc: 'Lilongwe', type: 'Paid', duration: '3 months', color: '#007bff', logo: '🏦', stipend: 'Mk 45,000/mo', deadline: 'May 30, 2026', skills: ['React', 'Python', 'SQL'] },
  { id: 2, role: 'Agriculture Extension Officer Trainee', company: 'Illovo Sugar Malawi', loc: 'Chikwawa', type: 'Paid', duration: '6 months', color: '#4c9f38', logo: '🌿', stipend: 'Mk 35,000/mo', deadline: 'June 15, 2026', skills: ['Agronomy', 'Field Research', 'Reporting'] },
  { id: 3, role: 'Data Analysis Trainee', company: 'Airtel Malawi', loc: 'Blantyre', type: 'Paid', duration: '4 months', color: '#cc0000', logo: '📡', stipend: 'Mk 50,000/mo', deadline: 'May 15, 2026', skills: ['Excel', 'Power BI', 'Statistics'] },
  { id: 4, role: 'Clinical Nursing Trainee', company: 'Kamuzu Central Hospital', loc: 'Lilongwe', type: 'Stipend', duration: '6 months', color: '#d4af37', logo: '🏥', stipend: 'Mk 20,000/mo', deadline: 'June 1, 2026', skills: ['Patient Care', 'Clinical Skills', 'Documentation'] },
  { id: 5, role: 'Finance & Accounting Intern', company: 'FDH Bank', loc: 'Blantyre', type: 'Paid', duration: '3 months', color: '#26bde2', logo: '💰', stipend: 'Mk 40,000/mo', deadline: 'May 20, 2026', skills: ['IFRS', 'Excel', 'Bookkeeping'] },
  { id: 6, role: 'Environmental Research Assistant', company: 'LUANAR', loc: 'Lilongwe', type: 'Academic Credit', duration: '4 months', color: '#4c9f38', logo: '🌍', stipend: 'Academic Credit', deadline: 'Ongoing', skills: ['Research Methods', 'Field Work', 'GIS'] },
];

const PARTNERS = [
  { name: 'Standard Bank', color: '#007bff' }, { name: 'Airtel Malawi', color: '#cc0000' },
  { name: 'TNM', color: '#ffd700' }, { name: 'Illovo Sugar', color: '#4c9f38' },
  { name: 'FDH Bank', color: '#26bde2' }, { name: 'LUANAR', color: '#d4af37' },
  { name: 'MUBAS', color: '#cc0000' }, { name: 'MUST', color: '#a21942' },
];

const STEPS = [
  { icon: <Search size={22} />, title: 'Browse Listings', desc: 'Filter internships by field, location, duration, and stipend. All listings are verified by our team.' },
  { icon: <CheckCircle size={22} />, title: 'Verify Your Profile', desc: 'Submit your student ID and academic transcript. University admin confirms your standing within 48 hours.' },
  { icon: <Briefcase size={22} />, title: 'Apply & Connect', desc: 'Apply with one click. We connect you directly with the company HR contact.' },
  { icon: <Star size={22} />, title: 'Get Funded', desc: 'Donors fund your transport and setup costs. Focus on learning — not logistics.' },
];

export const Internships: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = INTERNSHIPS.filter(i => i.role.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase()) || i.loc.toLowerCase().includes(search.toLowerCase()));

  return (
    <AnimatedLayout>
      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '60vh', background: '#0a0f1e', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/graduation.png")', backgroundSize: 'cover', backgroundPosition: 'center top', opacity: 0.25 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)' }} />

        {/* Floating company bubbles */}
        {PARTNERS.slice(0, 4).map((p, i) => (
          <div key={i} className={i % 2 === 0 ? 'animate-float' : 'animate-float-delayed'} style={{
            position: 'absolute',
            top: `${15 + (i * 20)}%`, left: i < 2 ? `${5 + i * 10}%` : undefined, right: i >= 2 ? `${5 + (i - 2) * 12}%` : undefined,
            width: '90px', height: '90px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            border: `2px solid ${p.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: p.color, fontWeight: 800, fontSize: '0.65rem', textAlign: 'center', padding: '0.5rem',
            zIndex: 0,
          }}>{p.name}</div>
        ))}

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '5rem 1.25rem 3rem' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="section-label" style={{ margin: '0 auto 1.5rem' }}>🎓 Career Launch</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', marginBottom: '1.25rem' }}>
              Your First Step Into<br />
              <span style={{ color: 'var(--color-primary)' }}>Professional</span>{' '}
              <span style={{ color: 'var(--color-gold)' }}>Excellence</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              We connect Malawi's brightest students with top companies for funded internships. Your transport and setup costs? Covered by our donors.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#listings" className="pill-btn" style={{ maxWidth: '200px' }}>Browse Internships</a>
              <Link to="/donate" className="pill-btn pill-btn-ghost" style={{ maxWidth: '220px' }}>Fund an Internship <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section style={{ padding: '5rem 1.25rem', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ margin: '0 auto 1rem' }}>The Journey</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>How to <span style={{ color: 'var(--color-gold)' }}>Get Started</span></h2>
          </div>
          <div className="grid-4">
            {STEPS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                style={{ display: 'flex', gap: '1.25rem', position: 'relative', zIndex: 1, background: i % 2 === 0 ? 'rgba(26,86,219,0.04)' : 'rgba(212,175,55,0.04)', borderRadius: '16px', padding: '1.25rem', border: `1px solid ${i % 2 === 0 ? 'rgba(26,86,219,0.1)' : 'rgba(212,175,55,0.1)'}` }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: i % 2 === 0 ? 'var(--gradient-blue)' : 'var(--gradient-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: i % 2 === 0 ? 'white' : 'black', boxShadow: i % 2 === 0 ? 'var(--shadow-blue)' : 'var(--shadow-gold)' }}>
                  {s.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER STRIP ─────────────────────────────── */}
      <section style={{ padding: '2.5rem 1.25rem', background: '#f8faff', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Trusted Employer Partners</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {PARTNERS.map((p, i) => (
              <motion.div key={i} whileHover={{ scale: 1.08 }} className="chip" style={{ padding: '0.6rem 1.4rem', background: `${p.color}12`, border: `1px solid ${p.color}33`, color: p.color, fontSize: '0.9rem', fontWeight: 700, borderRadius: '50px', boxShadow: `0 2px 8px ${p.color}15` }}>
                {p.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LISTINGS ─────────────────────────────────── */}
      <section id="listings" style={{ padding: '4rem 1.25rem 7rem', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--text-primary)' }}>Featured <span style={{ color: 'var(--color-gold)' }}>Listings</span></h2>
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
              <input className="form-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles or companies..." style={{ paddingLeft: '2.3rem', width: '280px' }} />
            </div>
          </div>

          <div className="grid-3">
            {filtered.map((job, idx) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', borderRadius: '20px', borderTop: `4px solid ${job.color}`, background: `${job.color}08`, border: `1px solid ${job.color}20`, borderTopWidth: '4px', borderTopStyle: 'solid', borderTopColor: job.color, boxShadow: `0 4px 20px ${job.color}10`, transition: 'transform 0.3s, box-shadow 0.3s' }}
                whileHover={{ y: -4, boxShadow: `0 12px 30px ${job.color}20` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{job.logo}</div>
                  <span className="chip" style={{ background: job.type === 'Paid' ? 'rgba(76,159,56,0.12)' : 'rgba(212,175,55,0.12)', color: job.type === 'Paid' ? '#4c9f38' : '#d4af37', border: `1px solid ${job.type === 'Paid' ? '#4c9f3830' : '#d4af3730'}` }}>
                    {job.type}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', lineHeight: 1.3, color: 'var(--text-primary)' }}>{job.role}</h3>
                <div style={{ fontWeight: 700, color: job.color, marginBottom: '0.75rem' }}>{job.company}</div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} />{job.loc}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} />{job.duration}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                  {job.skills.map(sk => (
                    <span key={sk} className="chip" style={{ background: `${job.color}10`, color: job.color, border: `1px solid ${job.color}25`, fontSize: '0.72rem', padding: '0.25rem 0.7rem' }}>{sk}</span>
                  ))}
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{job.stipend}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>Deadline: {job.deadline}</span>
                  </div>
                  <button className="pill-btn" style={{ width: '100%', background: `linear-gradient(135deg, ${job.color}, ${job.color}99)` }}>
                    Apply Now <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
              <p>No listings match your search.</p>
              <button onClick={() => setSearch('')} className="pill-btn" style={{ maxWidth: '180px', margin: '1rem auto 0' }}>Clear</button>
            </div>
          )}
        </div>
      </section>
    </AnimatedLayout>
  );
};

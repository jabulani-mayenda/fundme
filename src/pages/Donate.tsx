import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { PaymentModal } from '../components/PaymentModal';
import {
  Heart, CheckCircle, BookOpen, Laptop, Home as HomeIcon,
  Briefcase, Trophy, Zap, Shield, Users, RefreshCw, Star,
} from 'lucide-react';

const AMOUNTS = [5000, 15000, 25000, 50000, 100000, 250000];

const CAUSES = [
  { id: 'fees',       icon: <BookOpen size={20} />,  label: 'School Fees',     color: '#1a56db', desc: 'Covers tuition at UNIMA, MUBAS, MUST and others.' },
  { id: 'laptop',     icon: <Laptop size={20} />,    label: 'ICT / Laptop',    color: '#d4af37', desc: 'Provides a refurbished laptop for a student in need.' },
  { id: 'housing',    icon: <HomeIcon size={20} />,  label: 'Housing & Rent',  color: '#1a56db', desc: 'Covers hostel or private rent near campus.' },
  { id: 'internship', icon: <Briefcase size={20} />, label: 'Internship Fund', color: '#d4af37', desc: 'Pays transport & setup costs for a new intern.' },
  { id: 'awards',     icon: <Trophy size={20} />,    label: 'Awards Prize',    color: '#1a56db', desc: 'Funds ICT prizes for top-performing students.' },
  { id: 'general',    icon: <Heart size={20} />,     label: 'General Fund',    color: '#d4af37', desc: 'Split across highest-priority student needs.' },
];

const IMPACT = [
  { amount: 5000,   text: 'Buys a full set of exam stationery for one student.' },
  { amount: 15000,  text: 'Covers a month of internet data for a rural student.' },
  { amount: 25000,  text: 'Pays two weeks of hostel rent near a university.' },
  { amount: 50000,  text: 'Funds one month of tuition at a community college.' },
  { amount: 100000, text: 'Covers half a semester of fees at UNIMA or MUBAS.' },
  { amount: 250000, text: 'Provides a full refurbished laptop to a CompSci student.' },
];

const LEADERBOARD = [
  { rank: 1, name: 'Standard Bank Malawi', amount: 'Mk 2,500,000', avatar: '🏦', badge: '👑' },
  { rank: 2, name: 'Airtel Malawi CSR',    amount: 'Mk 1,800,000', avatar: '📱', badge: '🥈' },
  { rank: 3, name: 'Anonymous Hero',       amount: 'Mk 950,000',   avatar: '🎭', badge: '🥉' },
  { rank: 4, name: 'Chifundo Mwanza',      amount: 'Mk 450,000',   avatar: '👤', badge: '⭐' },
  { rank: 5, name: 'Grace Kamanga',        amount: 'Mk 300,000',   avatar: '👤', badge: '⭐' },
];

const TRUST_BADGES = [
  { icon: <Shield size={22} />, title: '100% Verified',       desc: 'Every student is ID-verified through their university.' },
  { icon: <Star size={22} />,   title: 'Zero Platform Fees',  desc: 'All donations go directly to the cause you chose.' },
  { icon: <Users size={22} />,  title: '3,500+ Students',     desc: 'Real lives changed across all 28 districts of Malawi.' },
  { icon: <Zap size={22} />,    title: 'Instant Receipts',    desc: 'Get an email receipt within seconds of your donation.' },
];

function getImpact(amount: number) {
  const match = [...IMPACT].reverse().find(i => amount >= i.amount);
  if (!match) return 'Every kwacha helps bridge the education gap.';
  return match.text;
}

export const Donate: React.FC = () => {
  const [amount, setAmount]       = useState(50000);
  const [custom, setCustom]       = useState('');
  const [cause, setCause]         = useState('fees');
  const [modalOpen, setModalOpen] = useState(false);
  const [recurring, setRecurring] = useState(false);

  const finalAmount = custom ? Number(custom) : amount;

  return (
    <AnimatedLayout>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'flex-end', padding: '3rem 1.25rem', background: '#000', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.28 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.97) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(26,86,219,0.18) 0%, transparent 60%)' }} />
        {/* Malawi stripe */}
        <div className="mw-stripe" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="particle" style={{
            width: `${4 + (i % 3) * 3}px`, height: `${4 + (i % 3) * 3}px`,
            background: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-gold)',
            left: `${10 + i * 14}%`, bottom: `${20 + (i % 3) * 12}%`,
            animationDuration: `${4 + i * 0.7}s`, animationDelay: `${i * 0.4}s`,
          }} />
        ))}
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="section-label" style={{ marginBottom: '1rem' }}>
              <Heart size={12} fill="currentColor" /> Make a Difference
            </div>
            <h1 style={{ fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', lineHeight: 1.05, marginBottom: '1rem' }}>
              Your Donation.<br />
              <span style={{ color: 'var(--color-primary)' }}>Their Future.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', maxWidth: '520px' }}>
              100% of your contribution goes directly to verified Malawian students. Choose a cause, pick an amount, and pay instantly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────── */}
      <div style={{ background: '#0a0a0a', borderBottom: '1px solid #1a1a1a', padding: '1.1rem 1.25rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', textAlign: 'center' }}>
          {[
            { val: 'Mk 50M+', label: 'Total Raised',      color: 'var(--color-primary)' },
            { val: '3,500+',  label: 'Students Helped',   color: 'var(--color-gold)' },
            { val: '94%',     label: 'Campaign Success',  color: 'var(--color-primary)' },
            { val: '28',      label: 'Districts Covered', color: 'var(--color-gold)' },
          ].map((s, i) => (
            <div key={i} style={{ borderRight: i < 3 ? '1px solid #222' : 'none' }}>
              <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.25rem', color: s.color }}>{s.val}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN FORM + LEADERBOARD ───────────────────────── */}
      <section style={{ padding: '3rem 1.25rem 5rem', background: '#000' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '2.5rem', maxWidth: '1100px', margin: '0 auto' }}>

            {/* LEFT – Donation Form */}
            <div>
              {/* Step 1: Cause */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--color-gold)', marginRight: '0.5rem' }}>01</span> Choose a Cause
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Where would you like your donation to go?</p>
                <div className="grid-3" style={{ gap: '0.75rem' }}>
                  {CAUSES.map(c => (
                    <button key={c.id} onClick={() => setCause(c.id)} style={{
                      padding: '1rem', borderRadius: '14px',
                      border: `2px solid ${cause === c.id ? c.color : '#222'}`,
                      background: cause === c.id ? `${c.color}18` : 'rgba(255,255,255,0.03)',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', color: 'white',
                    }}>
                      <div style={{ color: c.color, marginBottom: '0.5rem' }}>{c.icon}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.25rem' }}>{c.label}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.73rem', lineHeight: 1.4 }}>{c.desc}</div>
                      {cause === c.id && <div style={{ marginTop: '0.5rem' }}><CheckCircle size={14} color={c.color} /></div>}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Step 2: Amount */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: 'var(--color-gold)', marginRight: '0.5rem' }}>02</span> Choose Amount
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Select or enter a custom amount in Malawian Kwacha (Mk).
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  {AMOUNTS.map(val => (
                    <button key={val} onClick={() => { setAmount(val); setCustom(''); }} style={{
                      padding: '0.65rem 1.1rem', borderRadius: '50px', cursor: 'pointer',
                      fontWeight: 700, fontSize: '0.88rem', transition: 'all 0.2s',
                      border: `2px solid ${amount === val && !custom ? 'var(--color-primary)' : '#333'}`,
                      background: amount === val && !custom ? 'var(--gradient-blue)' : 'transparent',
                      color: 'white',
                      boxShadow: amount === val && !custom ? 'var(--shadow-blue)' : 'none',
                    }}>
                      Mk {val.toLocaleString()}
                    </button>
                  ))}
                </div>

                <input
                  className="form-input"
                  type="number"
                  value={custom}
                  onChange={e => setCustom(e.target.value)}
                  placeholder="Or enter custom amount (Mk)"
                  style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '1.25rem' }}
                />

                {/* Recurring toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.9rem 1.1rem', borderRadius: '12px', background: recurring ? 'rgba(26,86,219,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${recurring ? 'rgba(26,86,219,0.4)' : '#222'}`, marginBottom: '1.25rem', cursor: 'pointer', transition: 'all 0.2s' }}
                  onClick={() => setRecurring(r => !r)}>
                  <RefreshCw size={18} color={recurring ? 'var(--color-primary)' : '#555'} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: recurring ? 'var(--color-primary)' : 'white' }}>Monthly Recurring Donation</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Give every month — cancel any time. More impact for students.</div>
                  </div>
                  <div style={{ width: '40px', height: '22px', borderRadius: '11px', background: recurring ? 'var(--color-primary)' : '#333', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                    <div style={{ position: 'absolute', top: '3px', left: recurring ? '19px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
                  </div>
                </div>

                {/* Impact preview */}
                <AnimatePresence mode="wait">
                  <motion.div key={finalAmount} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', borderRadius: '12px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}>
                    <Zap size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Your Impact</div>
                      <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        Mk {(finalAmount || 0).toLocaleString()} — {getImpact(finalAmount || 0)}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Step 3: Donate button */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <button
                  className="pill-btn"
                  style={{ width: '100%', fontSize: '1.15rem', padding: '1.15rem', boxShadow: 'var(--shadow-blue)' }}
                  onClick={() => setModalOpen(true)}
                  disabled={!finalAmount || finalAmount < 100}
                >
                  <Heart size={20} fill="white" />
                  {recurring ? '🔄 ' : ''}Donate Mk {(finalAmount || 0).toLocaleString()} {recurring ? 'Monthly' : 'Now'}
                </button>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1rem' }}>
                  🔒 Secured by SSL · 100% goes to students · Receipt via email
                </p>
              </motion.div>

              {/* Payment methods strip */}
              <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1rem' }}>Accepted Payment Methods</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                  {[
                    { name: 'Airtel Money',  color: '#ce1126', emoji: '📱' },
                    { name: 'TNM Mpamba',   color: '#ffd700', emoji: '📲' },
                    { name: 'National Bank', color: '#003366', emoji: '🏦' },
                    { name: 'FDH Bank',     color: '#26bde2', emoji: '💳' },
                    { name: 'PayPal',       color: '#003087', emoji: '🌐' },
                    { name: 'Standard Bank', color: '#1a56db', emoji: '🏛️' },
                  ].map((p, i) => (
                    <div key={i} style={{
                      padding: '0.5rem 0.9rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600,
                      background: `${p.color}18`, border: `1px solid ${p.color}44`, color: 'white',
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                    }}>
                      <span>{p.emoji}</span> {p.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT – Leaderboard + Trust Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* Leaderboard */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="glass-panel" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Trophy size={22} color="var(--color-gold)" />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Top Donors</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', margin: 0 }}>Hall of Fame — April 2026</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {LEADERBOARD.map((d, i) => (
                    <motion.div
                      key={d.rank}
                      className="leaderboard-row"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                    >
                      <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{d.badge}</span>
                      <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{d.avatar}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Rank #{d.rank}</div>
                      </div>
                      <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '0.9rem', color: d.rank <= 3 ? 'var(--color-gold)' : 'var(--color-primary)', flexShrink: 0 }}>
                        {d.amount}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  🇲🇼 Donate today to appear on this board
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div className="section-label"><Shield size={11} /> Why Trust Us</div>
                </div>
                <div className="grid-2" style={{ gap: '0.85rem' }}>
                  {TRUST_BADGES.map((b, i) => (
                    <motion.div
                      key={i}
                      className="glass-panel"
                      style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 + i * 0.08 }}
                      whileHover={{ y: -3, borderColor: 'rgba(26,86,219,0.3)' }}
                    >
                      <div style={{ color: 'var(--color-primary)' }}>{b.icon}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{b.title}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: 1.5 }}>{b.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Live donor feed */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse-ring 2s infinite' }} />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Live Donations</span>
                </div>
                {[
                  { name: 'Chifundo D.',  amount: 'Mk 15,000', cause: 'School Fees',  time: '2m ago'  },
                  { name: 'Anonymous',    amount: 'Mk 50,000', cause: 'ICT Laptop',   time: '8m ago'  },
                  { name: 'John Phiri',   amount: 'Mk 5,000',  cause: 'General Fund', time: '14m ago' },
                  { name: 'Grace M.',     amount: 'Mk 25,000', cause: 'Housing',      time: '31m ago' },
                ].map((d, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.08 }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>❤️ {d.name}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.73rem' }}>{d.cause}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-primary)' }}>{d.amount}</div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem' }}>{d.time}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {modalOpen && <PaymentModal amount={finalAmount} onClose={() => setModalOpen(false)} />}
    </AnimatedLayout>
  );
};

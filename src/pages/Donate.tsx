import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { PaymentModal } from '../components/PaymentModal';
import { Heart, CheckCircle, BookOpen, Laptop, Home as HomeIcon, Briefcase, Trophy, Zap, Shield, Users, RefreshCw, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const AMOUNTS = [5000, 15000, 25000, 50000, 100000, 250000];

const CAUSES = [
  { id: 'fees',       icon: <BookOpen size={24} />,  label: 'School Fees',     color: '#1a56db', desc: 'Covers tuition at UNIMA, MUBAS, MUST and more.' },
  { id: 'laptop',     icon: <Laptop size={24} />,    label: 'ICT / Laptop',    color: '#009a44', desc: 'Provides refurbished laptops for students.' },
  { id: 'housing',    icon: <HomeIcon size={24} />,  label: 'Housing & Rent',  color: '#7c3aed', desc: 'Covers hostel or private rent near campus.' },
  { id: 'internship', icon: <Briefcase size={24} />, label: 'Internship Fund', color: '#d97706', desc: 'Pays transport & setup for new interns.' },
  { id: 'awards',     icon: <Trophy size={24} />,    label: 'Awards Prize',    color: '#ce1126', desc: 'Funds prizes for top-performing students.' },
  { id: 'general',    icon: <Heart size={24} />,     label: 'General Fund',    color: '#0891b2', desc: 'Split across highest-priority student needs.' },
];

const IMPACT: Record<number, string> = {
  5000: 'Buys a full set of exam stationery.',
  15000: 'Covers a month of internet data.',
  25000: 'Pays two weeks of hostel rent.',
  50000: 'Funds one month of tuition.',
  100000: 'Half a semester of fees at UNIMA.',
  250000: 'A full refurbished laptop for a student.',
};

function getImpact(amount: number) {
  const keys = Object.keys(IMPACT).map(Number).sort((a, b) => a - b);
  const match = [...keys].reverse().find(k => amount >= k);
  return match ? IMPACT[match] : 'Every kwacha helps bridge the education gap.';
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
      {/* ── HERO SECTION WITH DRAMATIC CREATIVE ELEMENTS ── */}
      <section style={{ 
        position: 'relative', 
        minHeight: '45vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '6rem 2rem', 
        overflow: 'hidden', 
        background: '#0a0f1e',
        textAlign: 'center'
      }}>
        {/* Background Image with optimized overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80")', backgroundSize: 'cover', backgroundPosition: 'center 30%', opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,15,30,0.5) 0%, rgba(10,15,30,0.95) 100%)' }} />
        
        {/* ✨ CREATIVE ELEMENT 1: GIANT SPINNING ORBIT ✨ */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', pointerEvents: 'none', zIndex: 0 }}>
          {[800, 600, 400].map((s, i) => (
            <div key={i} style={{ 
              position: 'absolute', top: '50%', left: '50%', 
              transform: 'translate(-50%,-50%)', 
              width: s, height: s, borderRadius: '50%', 
              border: `1px dashed rgba(255,255,255,${0.03 + i * 0.02})`, 
              animation: `${i % 2 === 0 ? 'spin-slow' : 'spin-slow-reverse'} ${60 + i * 20}s linear infinite` 
            }} />
          ))}
        </div>

        {/* ✨ CREATIVE ELEMENT 2: FLOATING MALAWI SPHERES ✨ */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
           <div className="animate-float-sphere" style={{ position: 'absolute', top: '15%', left: '10%', width: '60px', height: '60px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #ce1126, #000)', opacity: 0.4, filter: 'blur(2px)' }} />
           <div className="animate-float-sphere" style={{ position: 'absolute', bottom: '20%', right: '15%', width: '40px', height: '40px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #009a44, #000)', opacity: 0.3, filter: 'blur(1px)', animationDelay: '2s' }} />
           <div className="animate-float-sphere" style={{ position: 'absolute', top: '40%', right: '8%', width: '80px', height: '80px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #d4af37, #000)', opacity: 0.2, filter: 'blur(3px)', animationDelay: '4s' }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1000px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="glass-pill" style={{ marginBottom: '1.5rem' }}>
              <Sparkles size={14} className="text-shine" /> Empowering Malawi's Youth
            </div>
            <h1 style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)', color: 'white', marginBottom: '1.25rem', lineHeight: 1.05, fontWeight: 900 }}>
              Fuel a <span className="text-shine">Student's</span><br />
              Bright Future.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Your generosity directly funds education, technology, and housing for Malawian university students in need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT AREA ── */}
      <section style={{ padding: '4rem 1.25rem 6rem', background: '#f8faff', position: 'relative' }}>
        {/* ✨ CREATIVE ELEMENT 3: WAVE DIVIDER ✨ */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to bottom, #0a0f1e, transparent)', opacity: 0.1 }} />

        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
            
            {/* LEFT COLUMN: THE FORM */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* STEP 1: CAUSE SELECTION */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                style={{ background: '#fff', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid #edf2f7' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                   <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem' }}>1</div>
                   <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Select a Cause</h2>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {CAUSES.map(c => (
                    <motion.button
                      key={c.id}
                      onClick={() => setCause(c.id)}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      className="creative-card"
                      style={{
                        padding: '1.5rem', borderRadius: '20px', cursor: 'pointer', textAlign: 'left',
                        border: `2px solid ${cause === c.id ? c.color : '#f0f4f8'}`,
                        background: cause === c.id ? c.color : '#fff',
                        transition: 'all 0.3s',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Suble background icon for active state */}
                      {cause === c.id && <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.15, transform: 'rotate(-15deg)' }}>{React.cloneElement(c.icon as any, { size: 80 })}</div>}
                      
                      <div style={{ 
                        width: 48, height: 48, borderRadius: '12px', 
                        background: cause === c.id ? 'rgba(255,255,255,0.2)' : `${c.color}15`, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        color: cause === c.id ? 'white' : c.color, marginBottom: '1rem' 
                      }}>
                        {c.icon}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: cause === c.id ? 'white' : '#1a202c', marginBottom: '0.4rem' }}>{c.label}</div>
                      <div style={{ fontSize: '0.8rem', color: cause === c.id ? 'rgba(255,255,255,0.9)' : '#718096', lineHeight: 1.5 }}>{c.desc}</div>
                      {cause === c.id && <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: 6, color: 'white', fontSize: '0.75rem', fontWeight: 700 }}><CheckCircle size={14} /> Active Selection</div>}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* STEP 2: AMOUNT SELECTION */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{ background: '#fff', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: '1px solid #edf2f7' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                   <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-gold)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem' }}>2</div>
                   <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Choose Amount</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {AMOUNTS.map(val => (
                    <button key={val} onClick={() => { setAmount(val); setCustom(''); }} style={{
                      padding: '1rem 0.5rem', borderRadius: '16px', cursor: 'pointer',
                      fontWeight: 800, fontSize: '0.9rem', transition: 'all 0.2s',
                      border: `2px solid ${amount === val && !custom ? 'var(--color-primary)' : '#f0f4f8'}`,
                      background: amount === val && !custom ? 'var(--color-primary)' : '#fff',
                      color: amount === val && !custom ? 'white' : '#4a5568',
                    }}>
                      Mk {val.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                   <input className="form-input" type="number" value={custom} onChange={e => setCustom(e.target.value)}
                     placeholder="Enter custom amount (Mk)" style={{ textAlign: 'center', fontSize: '1.1rem', padding: '1.25rem', borderRadius: '16px' }} />
                   <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#a0aec0' }}>Mk</div>
                </div>

                {/* Recurring toggle */}
                <div onClick={() => setRecurring(r => !r)} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem',
                  borderRadius: '16px', cursor: 'pointer', marginBottom: '1.5rem',
                  background: recurring ? 'rgba(26,86,219,0.05)' : '#f8fafc',
                  border: `2px solid ${recurring ? 'rgba(26,86,219,0.2)' : '#f1f5f9'}`,
                  transition: 'all 0.2s'
                }}>
                  <div style={{ background: recurring ? 'var(--color-primary)' : '#cbd5e0', padding: '0.5rem', borderRadius: '10px', color: 'white' }}>
                    <RefreshCw size={20} className={recurring ? 'animate-spin-slow' : ''} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: recurring ? 'var(--color-primary)' : '#2d3748' }}>Monthly Support</div>
                    <div style={{ fontSize: '0.85rem', color: '#718096' }}>Automate your impact every month.</div>
                  </div>
                  <div style={{ width: 44, height: 24, borderRadius: 12, background: recurring ? 'var(--color-primary)' : '#d1d5db', position: 'relative', transition: 'background 0.3s' }}>
                    <div style={{ position: 'absolute', top: 3, left: recurring ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: 'white', transition: 'left 0.3s' }} />
                  </div>
                </div>

                {/* Impact Visualizer */}
                <AnimatePresence mode="wait">
                  <motion.div key={finalAmount} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    style={{ 
                      display: 'flex', gap: '1rem', padding: '1.5rem', borderRadius: '20px', 
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.15))', 
                      border: '1px solid rgba(212,175,55,0.3)', marginBottom: '2rem' 
                    }}>
                    <div style={{ background: 'var(--color-gold)', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                      <Zap size={20} fill="white" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Your Power</div>
                      <div style={{ color: '#2d3748', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.4 }}>
                        Mk {(finalAmount || 0).toLocaleString()} <ArrowRight size={14} style={{ display: 'inline', margin: '0 4px' }} /> {getImpact(finalAmount || 0)}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <button 
                  className="pill-btn animate-glow-blue" 
                  style={{ width: '100%', fontSize: '1.25rem', padding: '1.5rem', height: 'auto' }}
                  onClick={() => setModalOpen(true)} 
                  disabled={!finalAmount || finalAmount < 100}
                >
                  <Heart size={22} fill="white" />
                  {recurring ? '🔄 ' : ''}Donate Mk {(finalAmount || 0).toLocaleString()} Now
                </button>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', opacity: 0.6 }}>
                   <Shield size={16} /> <Star size={16} /> <CheckCircle size={16} />
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: TRUST & VISUALS */}
            <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* ✨ CREATIVE ELEMENT 4: LIVE FEED PULSE ✨ */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }} 
                animate={{ opacity: 1, x: 0 }}
                style={{ background: '#fff', borderRadius: '24px', padding: '2rem', border: '1px solid #edf2f7', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div className="animate-pulse-ring" style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
                  <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 800 }}>Recent Impact</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { name: 'Chifundo M.', amount: 'Mk 15k', cause: 'School Fees', time: '2m ago' },
                    { name: 'Anonymous', amount: 'Mk 50k', cause: 'ICT Fund', time: '8m ago' },
                    { name: 'John D.', amount: 'Mk 5k', cause: 'Books', time: '15m ago' },
                  ].map((d, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                      style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{d.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#718096' }}>{d.cause}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 900, color: 'var(--color-primary)' }}>{d.amount}</div>
                        <div style={{ fontSize: '0.75rem', color: '#a0aec0' }}>{d.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* ✨ CREATIVE ELEMENT 5: TRUST BADGES WITH GLOW ✨ */}
              <div className="grid-2" style={{ gap: '1rem' }}>
                {[
                  { icon: <Shield size={22} />, title: '100% Secure', color: '#1a56db' },
                  { icon: <Users size={22} />, title: 'Verified', color: '#009a44' },
                ].map((b, i) => (
                  <div key={i} style={{ background: '#fff', padding: '1.5rem', borderRadius: '20px', textAlign: 'center', border: `1px solid ${b.color}15` }}>
                    <div style={{ color: b.color, marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>{b.icon}</div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{b.title}</div>
                  </div>
                ))}
              </div>

              {/* ✨ CREATIVE ELEMENT 6: CTA BANNER ✨ */}
              <div style={{ 
                background: 'linear-gradient(135deg, #000, #1a202c)', 
                borderRadius: '24px', 
                padding: '2.5rem', 
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}><Trophy size={120} /></div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', position: 'relative' }}>Join the Donor Circle</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Create an account to track your history and earn exclusive impact badges.
                </p>
                <Link to="/login" className="pill-btn pill-btn-ghost" style={{ border: '1px solid rgba(255,255,255,0.3)', width: 'auto', padding: '0.75rem 1.5rem' }}>
                  Sign Up Free <ArrowRight size={16} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {modalOpen && <PaymentModal amount={finalAmount} onClose={() => setModalOpen(false)} />}
    </AnimatedLayout>
  );
};

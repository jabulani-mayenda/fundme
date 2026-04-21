import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Heart, Shield, Users, Trophy, Mail, Phone, ArrowRight, CheckCircle } from 'lucide-react';

type Tab = 'google' | 'email' | 'phone';
type PhasePhone = 'input' | 'otp';

const PERKS = [
  { icon: <Heart size={18} />, text: 'Track your donation impact in real-time' },
  { icon: <Users size={18} />, text: 'Connect with students you support' },
  { icon: <Trophy size={18} />, text: 'Earn Donor Recognition Awards' },
  { icon: <Shield size={18} />, text: 'Secure, verified payments' },
];

export const Login: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, signInWithPhone, verifyOtp, user, isLoading } = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();
  const from       = (location.state as any)?.from?.pathname || '/dashboard';

  const [tab, setTab]         = useState<Tab>('google');
  const [email, setEmail]     = useState('');
  const [phone, setPhone]     = useState('');
  const [otp, setOtp]         = useState('');
  const [phase, setPhase]     = useState<PhasePhone>('input');
  const [busy, setBusy]       = useState(false);
  const [msg, setMsg]         = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => { if (!isLoading && user) navigate(from, { replace: true }); }, [user, isLoading, navigate, from]);

  const handleGoogle = async () => {
    setBusy(true); setMsg(null);
    await signInWithGoogle();
    setBusy(false);
  };

  const handleEmail = async () => {
    if (!email.includes('@')) { setMsg({ text: 'Enter a valid email address.', ok: false }); return; }
    setBusy(true); setMsg(null);
    const res = await signInWithEmail(email);
    setBusy(false);
    if (res.error) { setMsg({ text: res.error, ok: false }); }
    else { setMsg({ text: `✅ Magic link sent to ${email}. Check your inbox!`, ok: true }); }
  };

  const handleSendSms = async () => {
    const cleaned = phone.replace(/\s/g, '');
    if (cleaned.length < 9) { setMsg({ text: 'Enter a valid phone number.', ok: false }); return; }
    setBusy(true); setMsg(null);
    const fullPhone = cleaned.startsWith('+') ? cleaned : `+265${cleaned.replace(/^0/, '')}`;
    const res = await signInWithPhone(fullPhone);
    setBusy(false);
    if (res.error) { setMsg({ text: res.error, ok: false }); }
    else { setPhase('otp'); setMsg({ text: 'SMS code sent! Enter it below.', ok: true }); }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) { setMsg({ text: 'Enter the code from your SMS.', ok: false }); return; }
    setBusy(true); setMsg(null);
    const cleaned = phone.replace(/\s/g, '');
    const fullPhone = cleaned.startsWith('+') ? cleaned : `+265${cleaned.replace(/^0/, '')}`;
    const res = await verifyOtp(fullPhone, otp);
    setBusy(false);
    if (res.error) { setMsg({ text: res.error, ok: false }); }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.9rem 1.25rem', borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.07)',
    color: 'white', fontSize: '1rem', fontFamily: 'Inter, sans-serif', outline: 'none',
    marginBottom: '0.85rem',
  };

  const tabBtn = (t: Tab, label: string, icon: React.ReactNode) => (
    <button
      key={t}
      onClick={() => { setTab(t); setMsg(null); setPhase('input'); }}
      style={{
        flex: 1, padding: '0.6rem 0.5rem', borderRadius: '10px', fontSize: '0.8rem',
        fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
        background: tab === t ? 'rgba(26,86,219,0.9)' : 'rgba(255,255,255,0.06)',
        color: tab === t ? 'white' : 'rgba(255,255,255,0.6)',
        border: tab === t ? '1px solid rgba(26,86,219,0.6)' : '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
      }}
    >
      {icon} {label}
    </button>
  );

  return (
    <AnimatedLayout>
      <div style={{ minHeight: '100vh', display: 'flex', position: 'relative', background: '#000' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/hero.png")', backgroundSize: 'cover', backgroundPosition: 'center top', opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(26,86,219,0.12) 0%, rgba(0,0,0,0.88) 70%)' }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem', minHeight: '100vh' }}>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7 }}
            className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: 'clamp(1.75rem, 5vw, 2.75rem)', textAlign: 'center' }}
          >
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--gradient-blue)', padding: '0.5rem', borderRadius: '10px', display: 'flex', boxShadow: 'var(--shadow-blue)' }}>
                <Heart size={20} color="white" fill="white" />
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'Outfit', color: 'white' }}>
                Fund<span style={{ color: 'var(--color-gold)' }}>Me</span><span style={{ color: 'var(--color-primary)', fontSize: '0.65rem', verticalAlign: 'super', fontWeight: 700 }}>MW</span>
              </span>
            </Link>

            <h1 style={{ fontSize: '1.8rem', marginBottom: '0.4rem', color: 'white' }}>Join the Movement</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '0.9rem' }}>
              Sign in to support Malawian students and track your impact.
            </p>

            {/* Perks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem', textAlign: 'left' }}>
              {PERKS.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.9rem', borderRadius: '10px', background: 'rgba(255,255,255,0.04)' }}>
                  <span style={{ color: 'var(--color-gold)', flexShrink: 0 }}>{p.icon}</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>{p.text}</span>
                </div>
              ))}
            </div>

            {/* Tab switcher */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '0.35rem' }}>
              {tabBtn('google', 'Google', <svg width="14" height="14" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>)}
              {tabBtn('email', 'Email', <Mail size={13} />)}
              {tabBtn('phone', 'Phone', <Phone size={13} />)}
            </div>

            <AnimatePresence mode="wait">
              {/* ── GOOGLE ── */}
              {tab === 'google' && (
                <motion.div key="google" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <button
                    onClick={handleGoogle} disabled={busy}
                    style={{
                      width: '100%', padding: '1rem 1.5rem', borderRadius: '50px',
                      background: 'white', color: '#1a1a1a', border: 'none', cursor: busy ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                      fontWeight: 700, fontSize: '1rem', opacity: busy ? 0.7 : 1,
                      boxShadow: '0 4px 20px rgba(255,255,255,0.15)', transition: 'all 0.2s',
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    {busy ? 'Connecting…' : 'Continue with Google'}
                  </button>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginTop: '1rem' }}>
                    If Google fails, use the Email or Phone tab instead.
                  </p>
                </motion.div>
              )}

              {/* ── EMAIL ── */}
              {tab === 'email' && (
                <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  {msg?.ok ? (
                    <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                      <CheckCircle size={40} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                      <p style={{ color: '#10b981', fontWeight: 700 }}>{msg.text}</p>
                    </div>
                  ) : (
                    <>
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.83rem', marginBottom: '0.9rem', textAlign: 'left' }}>
                        We'll send a magic link to your email — no password needed.
                      </p>
                      <input
                        type="email" value={email} onChange={e => { setEmail(e.target.value); setMsg(null); }}
                        placeholder="your@email.com" style={inputStyle}
                        onKeyDown={e => e.key === 'Enter' && handleEmail()}
                      />
                      {msg && !msg.ok && <p style={{ color: '#f87171', fontSize: '0.83rem', marginBottom: '0.75rem' }}>{msg.text}</p>}
                      <button className="pill-btn" onClick={handleEmail} disabled={busy} style={{ width: '100%' }}>
                        <Mail size={16} /> {busy ? 'Sending…' : 'Send Magic Link'} <ArrowRight size={16} />
                      </button>
                    </>
                  )}
                </motion.div>
              )}

              {/* ── PHONE ── */}
              {tab === 'phone' && (
                <motion.div key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  {phase === 'input' ? (
                    <>
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.83rem', marginBottom: '0.9rem', textAlign: 'left' }}>
                        Enter your Malawi number. We'll SMS you a one-time code.
                      </p>
                      <input
                        type="tel" value={phone} onChange={e => { setPhone(e.target.value); setMsg(null); }}
                        placeholder="+265 99X XXX XXX" style={inputStyle}
                        onKeyDown={e => e.key === 'Enter' && handleSendSms()}
                      />
                      {msg && !msg.ok && <p style={{ color: '#f87171', fontSize: '0.83rem', marginBottom: '0.75rem' }}>{msg.text}</p>}
                      <button className="pill-btn" onClick={handleSendSms} disabled={busy} style={{ width: '100%' }}>
                        <Phone size={16} /> {busy ? 'Sending…' : 'Send SMS Code'} <ArrowRight size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      {msg?.ok && <p style={{ color: '#10b981', fontSize: '0.83rem', marginBottom: '0.9rem' }}>{msg.text}</p>}
                      <input
                        type="text" inputMode="numeric" value={otp} onChange={e => { setOtp(e.target.value); setMsg(null); }}
                        placeholder="Enter 6-digit code" style={{ ...inputStyle, textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.4rem' }}
                        maxLength={6} onKeyDown={e => e.key === 'Enter' && handleVerifyOtp()}
                      />
                      {msg && !msg.ok && <p style={{ color: '#f87171', fontSize: '0.83rem', marginBottom: '0.75rem' }}>{msg.text}</p>}
                      <button className="pill-btn" onClick={handleVerifyOtp} disabled={busy} style={{ width: '100%', marginBottom: '0.6rem' }}>
                        <CheckCircle size={16} /> {busy ? 'Verifying…' : 'Verify Code'}
                      </button>
                      <button onClick={() => { setPhase('input'); setOtp(''); setMsg(null); }}
                        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', cursor: 'pointer', width: '100%' }}>
                        ← Resend / change number
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '1.5rem', lineHeight: 1.6 }}>
              By signing in, you agree to our Terms of Service. Your data is secure and never sold.
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatedLayout>
  );
};

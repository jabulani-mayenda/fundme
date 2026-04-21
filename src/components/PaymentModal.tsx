import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader, CreditCard, Mail, User, ArrowRight, AlertCircle } from 'lucide-react';

interface Props { amount: number; onClose: () => void; }

const METHODS = [
  { id: 'airtel',   label: 'Airtel Money',  emoji: '📱', bg: '#ce1126', text: 'white', hint: 'Enter your Airtel Money number' },
  { id: 'mpamba',   label: 'TNM Mpamba',    emoji: '📲', bg: '#d97706', text: 'white', hint: 'Enter your TNM Mpamba number' },
  { id: 'natbank',  label: 'National Bank', emoji: '🏦', bg: '#003366', text: 'white', hint: 'Enter your National Bank account' },
  { id: 'fdh',      label: 'FDH Bank',      emoji: '💳', bg: '#0891b2', text: 'white', hint: 'Enter your FDH Bank account' },
  { id: 'standard', label: 'Standard Bank', emoji: '🏛️', bg: '#1a56db', text: 'white', hint: 'Enter your Standard Bank account' },
  { id: 'paypal',   label: 'PayPal / Card', emoji: '🌐', bg: '#003087', text: 'white', hint: 'Enter your PayPal email address' },
];

type Step = 'method' | 'details' | 'processing' | 'error';

async function callPesapal(payload: { amount: number; email: string; phone: string; firstName: string; description: string }) {
  try {
    const res = await fetch('/api/pesapal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || 'Payment initiation failed.' };
    return { redirectUrl: data.redirectUrl };
  } catch (e: any) {
    return { error: 'Network error — please try again.' };
  }
}

export const PaymentModal: React.FC<Props> = ({ amount, onClose }) => {
  const [step,     setStep]     = useState<Step>('method');
  const [method,   setMethod]   = useState(METHODS[0]);
  const [fieldVal, setFieldVal] = useState('');
  const [email,    setEmail]    = useState('');
  const [name,     setName]     = useState('');
  const [error,    setError]    = useState('');
  const [errMsg,   setErrMsg]   = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const cb = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', cb);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('resize', cb); document.body.style.overflow = ''; };
  }, []);

  const handlePay = async () => {
    if (!fieldVal.trim()) { setError('Please fill in the required field.'); return; }
    if (!email.includes('@')) { setError('Please enter a valid email for your receipt.'); return; }
    setError('');
    setStep('processing');
    const phone = ['airtel', 'mpamba'].includes(method.id) ? fieldVal : '';
    const result = await callPesapal({ amount, email, phone, firstName: name || 'Donor', description: `FundMe Donation via ${method.label}` });
    if (result.redirectUrl) {
      window.location.href = result.redirectUrl;
    } else {
      setErrMsg(result.error || 'Something went wrong.');
      setStep('error');
    }
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem', borderRadius: '10px',
    border: `1px solid ${error ? '#ef4444' : '#e5e7eb'}`, background: '#f9fafb',
    color: '#111', fontSize: '0.95rem', outline: 'none', marginBottom: '0.75rem',
    fontFamily: 'Inter, sans-serif',
  };

  const modalStyle: React.CSSProperties = isMobile
    ? { position: 'fixed', bottom: 0, left: 0, right: 0, borderRadius: '22px 22px 0 0', background: '#fff', zIndex: 301, maxHeight: '93vh', overflowY: 'auto' }
    : { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '92%', maxWidth: '430px', background: '#fff', borderRadius: '24px', zIndex: 301, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' };

  const anim = isMobile
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' }, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } }
    : { initial: { opacity: 0, scale: 0.95, y: 40 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95 }, transition: { type: 'spring' as const, stiffness: 280, damping: 28 } };

  return (
    <AnimatePresence>
      <motion.div key="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 300, backdropFilter: 'blur(5px)' }} />

      <motion.div key="modal" style={modalStyle} {...anim} onClick={e => e.stopPropagation()}>
        {isMobile && <div style={{ width: 40, height: 4, borderRadius: 2, background: '#d1d5db', margin: '12px auto 0' }} />}

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f3f4f6' }}>
          <div>
            <div style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>Donating</div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.8rem', color: 'var(--color-primary)' }}>
              Mk {amount.toLocaleString()}
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#f3f4f6', border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280', flexShrink: 0 }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '1.25rem 1.5rem 2rem' }}>

          {/* STEP 1 — Method */}
          {step === 'method' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '0.85rem', fontWeight: 600 }}>Choose your payment method:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {METHODS.map(m => {
                  const selected = method.id === m.id;
                  return (
                    <button key={m.id} onClick={() => setMethod(m)} style={{
                      display: 'flex', alignItems: 'center', gap: '0.9rem',
                      padding: '0.9rem 1rem', borderRadius: '12px', cursor: 'pointer', width: '100%', textAlign: 'left',
                      border: selected ? `2px solid ${m.bg}` : '2px solid #e5e7eb',
                      background: selected ? m.bg : '#f9fafb',
                      transition: 'all 0.18s',
                    }}>
                      <span style={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0 }}>{m.emoji}</span>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: selected ? 'white' : '#111', flex: 1 }}>{m.label}</span>
                      {selected && <CheckCircle size={16} color="white" />}
                    </button>
                  );
                })}
              </div>
              <button className="pill-btn" style={{ width: '100%' }} onClick={() => setStep('details')}>
                Continue with {method.label} <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {/* STEP 2 — Details */}
          {step === 'details' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {/* selected method badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 1rem', borderRadius: '12px', background: method.bg, marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1.6rem' }}>{method.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'white' }}>{method.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>Powered by PesaPal · Secure checkout</div>
                </div>
              </div>

              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.3rem' }}>
                <User size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />Your Name (optional)
              </label>
              <input style={inp} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Grace Kamanga" />

              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.3rem' }}>
                {['airtel','mpamba'].includes(method.id) ? '📱 Phone Number' : ['paypal'].includes(method.id) ? '🌐 PayPal Email' : '🏦 Account Number'}
              </label>
              <input style={inp} type="text" value={fieldVal} onChange={e => { setFieldVal(e.target.value); setError(''); }}
                placeholder={method.hint} />

              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.3rem' }}>
                <Mail size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />Email for Receipt
              </label>
              <input style={{ ...inp, marginBottom: error ? '0.4rem' : '1.1rem' }} type="email" value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }} placeholder="your@email.com" />

              {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={14} />{error}</p>}

              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button onClick={() => setStep('method')} style={{ flex: 1, padding: '0.85rem', borderRadius: '50px', border: '1px solid #e5e7eb', background: '#f9fafb', color: '#374151', fontWeight: 700, cursor: 'pointer' }}>Back</button>
                <button onClick={handlePay} className="pill-btn" style={{ flex: 2, background: method.bg }}>
                  <CreditCard size={15} /> Pay Mk {amount.toLocaleString()}
                </button>
              </div>
              <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#9ca3af', marginTop: '0.75rem' }}>
                🔒 Redirecting to PesaPal's secure page
              </p>
            </motion.div>
          )}

          {/* STEP 3 — Processing */}
          {step === 'processing' && (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
                <Loader size={48} color="var(--color-primary)" />
              </motion.div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#111' }}>Connecting to PesaPal…</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Preparing your secure payment page.</p>
            </div>
          )}

          {/* STEP 4 — Error */}
          {step === 'error' && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#ef4444' }}>Payment Failed</h3>
              <p style={{ color: '#6b7280', fontSize: '0.88rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>{errMsg}</p>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button style={{ flex: 1, padding: '0.85rem', borderRadius: '50px', border: '1px solid #e5e7eb', background: '#f9fafb', fontWeight: 700, cursor: 'pointer', color: '#374151' }}
                  onClick={() => { setStep('details'); setErrMsg(''); }}>Try Again</button>
                <button className="pill-btn" style={{ flex: 1 }} onClick={onClose}>Close</button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

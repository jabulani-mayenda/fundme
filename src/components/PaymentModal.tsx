import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader, Phone, Globe, Building2, CreditCard, Mail, User, ArrowRight } from 'lucide-react';

interface Props { amount: number; onClose: () => void; }

const METHODS = [
  { id: 'airtel',   label: 'Airtel Money',   emoji: '📱', color: '#ce1126', fields: ['phone'], placeholder: '0999 XXX XXX' },
  { id: 'mpamba',   label: 'TNM Mpamba',     emoji: '📲', color: '#e6b800', fields: ['phone'], placeholder: '0882 XXX XXX' },
  { id: 'natbank',  label: 'National Bank',  emoji: '🏦', color: '#003366', fields: ['account'], placeholder: 'Account Number' },
  { id: 'fdh',      label: 'FDH Bank',       emoji: '💳', color: '#26bde2', fields: ['account'], placeholder: 'FDH Account Number' },
  { id: 'standard', label: 'Standard Bank',  emoji: '🏛️', color: '#007bff', fields: ['account'], placeholder: 'Standard Bank Account' },
  { id: 'paypal',   label: 'PayPal / Card',  emoji: '🌐', color: '#003087', fields: ['email'], placeholder: 'email@example.com' },
];

type Step = 'method' | 'details' | 'processing' | 'success' | 'error';

/* ── helpers ── */
function fieldIcon(f: string) {
  if (f === 'phone')   return <Phone size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />;
  if (f === 'email')   return <Globe size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />;
  return <Building2 size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />;
}

/* Call our Vercel API function */
async function initiatePesapal(payload: {
  amount: number; email: string; phone: string; firstName: string; description: string;
}): Promise<{ redirectUrl?: string; error?: string }> {
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
    return { error: e.message || 'Network error — please try again.' };
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const cb = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', cb);
    return () => window.removeEventListener('resize', cb);
  }, []);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handlePay = async () => {
    if (!fieldVal.trim()) { setError('Please fill in the required field.'); return; }
    if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email for your receipt.'); return; }
    setError('');
    setStep('processing');

    const phone = method.fields[0] === 'phone' ? fieldVal : '';
    const result = await initiatePesapal({
      amount,
      email,
      phone,
      firstName: name || 'Donor',
      description: `FundMe Malawi Donation via ${method.label}`,
    });

    if (result.redirectUrl) {
      /* Open PesaPal payment page in same tab */
      window.location.href = result.redirectUrl;
    } else {
      setErrMsg(result.error || 'Something went wrong.');
      setStep('error');
    }
  };

  /* ── modal position: centered on desktop, bottom-sheet on mobile ── */
  const modalStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed', bottom: 0, left: 0, right: 0, top: 'auto',
        width: '100%', borderRadius: '24px 24px 0 0',
        background: '#ffffff', zIndex: 301,
        maxHeight: '92vh', overflowY: 'auto',
        boxShadow: '0 -12px 40px rgba(0,0,0,0.25)',
      }
    : {
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '94%', maxWidth: '440px',
        background: '#ffffff', borderRadius: '28px',
        border: '1px solid #eee', zIndex: 301,
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
      };

  const mobileAnim = isMobile
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' }, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } }
    : { initial: { opacity: 0, y: 60, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 40 }, transition: { type: 'spring' as const, stiffness: 280, damping: 28 } };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.80)', zIndex: 300, backdropFilter: 'blur(6px)' }}
      />

      {/* Modal */}
      <motion.div key="modal" style={modalStyle} {...mobileAnim} onClick={e => e.stopPropagation()}>

        {/* Handle bar (mobile only) */}
        {isMobile && <div style={{ width: 40, height: 4, borderRadius: 2, background: '#ddd', margin: '12px auto 0' }} />}

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid #f3f4f6' }}>
          <div>
            <div style={{ fontSize: '0.68rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 700 }}>Donating</div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.7rem', color: 'var(--color-primary)' }}>
              Mk {amount.toLocaleString()}
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#999', background: '#f3f4f6', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '1.25rem 1.5rem 2rem' }}>

          {/* ── STEP 1: Choose method ── */}
          {step === 'method' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p style={{ color: '#555', fontSize: '0.88rem', marginBottom: '1rem' }}>Choose your payment method:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.25rem' }}>
                {METHODS.map(m => (
                  <button key={m.id} onClick={() => setMethod(m)} style={{
                    display: 'flex', alignItems: 'center', gap: '0.9rem', padding: '0.9rem 1rem',
                    borderRadius: '14px', border: `2px solid ${method.id === m.id ? m.color : '#f0f0f0'}`,
                    background: method.id === m.id ? `${m.color}0a` : '#fafafa',
                    cursor: 'pointer', textAlign: 'left', color: 'inherit', transition: 'all 0.18s',
                    width: '100%',
                  }}>
                    <span style={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0 }}>{m.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111' }}>{m.label}</div>
                    </div>
                    {method.id === m.id && <CheckCircle size={17} color={m.color} style={{ flexShrink: 0 }} />}
                  </button>
                ))}
              </div>
              <button className="pill-btn" style={{ width: '100%' }} onClick={() => setStep('details')}>
                Continue with {method.label} <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: Details + email ── */}
          {step === 'details' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {/* selected method banner */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', padding: '0.9rem', borderRadius: '14px', background: `${method.color}08`, border: `1px solid ${method.color}20` }}>
                <span style={{ fontSize: '1.6rem' }}>{method.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#111' }}>{method.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#666', marginTop: 2 }}>Powered by PesaPal · Secure checkout</div>
                </div>
              </div>

              {/* Name */}
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: '#555' }}>
                <User size={12} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />Your Name (optional)
              </label>
              <input className="form-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Grace Kamanga" style={{ marginBottom: '0.9rem' }} />

              {/* Method-specific field */}
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: '#555' }}>
                {fieldIcon(method.fields[0])}
                {method.fields[0] === 'phone' ? 'Phone Number' : method.fields[0] === 'email' ? 'PayPal Email' : 'Account Number'}
              </label>
              <input
                className="form-input"
                type={method.fields[0] === 'email' ? 'email' : 'text'}
                value={fieldVal}
                onChange={e => { setFieldVal(e.target.value); setError(''); }}
                placeholder={method.placeholder}
                style={{ marginBottom: '0.9rem', borderColor: error ? '#ef4444' : undefined }}
              />

              {/* Email for receipt */}
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: '#555' }}>
                <Mail size={12} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />Email for Receipt
              </label>
              <input
                className="form-input"
                type="email" value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="your@email.com"
                style={{ marginBottom: error ? '0.4rem' : '1.25rem', borderColor: error ? '#ef4444' : undefined }}
              />

              {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '0.9rem' }}>{error}</p>}

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button onClick={() => setStep('method')} className="pill-btn pill-btn-ghost"
                  style={{ flex: 1, background: '#f5f5f5', color: '#333', border: '1px solid #ddd' }}>Back</button>
                <button onClick={handlePay} className="pill-btn"
                  style={{ flex: 2, background: `linear-gradient(135deg, ${method.color}, ${method.color}bb)` }}>
                  <CreditCard size={15} /> Pay Mk {amount.toLocaleString()}
                </button>
              </div>

              <p style={{ textAlign: 'center', fontSize: '0.73rem', color: '#aaa', marginTop: '0.9rem' }}>
                🔒 You'll be redirected to PesaPal's secure payment page
              </p>
            </motion.div>
          )}

          {/* ── STEP 3: Processing ── */}
          {step === 'processing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '2.5rem 0' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
                <Loader size={48} color="var(--color-primary)" />
              </motion.div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Connecting to PesaPal…</h3>
              <p style={{ color: '#666', lineHeight: 1.7 }}>Preparing your secure payment page. Please wait.</p>
            </motion.div>
          )}

          {/* ── STEP 4: Error ── */}
          {step === 'error' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#ef4444' }}>Payment Failed</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>{errMsg}</p>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button className="pill-btn pill-btn-ghost" style={{ flex: 1, background: '#f5f5f5', color: '#333', border: '1px solid #ddd' }} onClick={() => { setStep('details'); setErrMsg(''); }}>
                  Try Again
                </button>
                <button className="pill-btn" style={{ flex: 1 }} onClick={onClose}>Close</button>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

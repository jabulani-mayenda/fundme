import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader, Phone, Globe, Building2, CreditCard } from 'lucide-react';

interface Props { amount: number; onClose: () => void; }

const METHODS = [
  { id: 'airtel',   label: 'Airtel Money',    emoji: '📱', color: '#ce1126',  fields: ['phone'], placeholder: '0999 XXX XXX', instruction: 'Enter your Airtel Money number. You will get a push notification to approve.' },
  { id: 'mpamba',   label: 'TNM Mpamba',      emoji: '📲', color: '#e6b800',  fields: ['phone'], placeholder: '0882 XXX XXX', instruction: 'Enter your TNM Mpamba number. Approve the payment on your phone.' },
  { id: 'natbank',  label: 'National Bank',   emoji: '🏦', color: '#003366',  fields: ['account'], placeholder: 'Account Number', instruction: 'Enter your National Bank of Malawi account number to initiate transfer.' },
  { id: 'fdh',      label: 'FDH Bank',        emoji: '💳', color: '#26bde2',  fields: ['account'], placeholder: 'FDH Account Number', instruction: 'Enter your FDH Bank account number for direct bank transfer.' },
  { id: 'standard', label: 'Standard Bank',   emoji: '🏛️', color: '#007bff',  fields: ['account'], placeholder: 'Standard Bank Account', instruction: 'Enter your Standard Bank of Malawi account number.' },
  { id: 'paypal',   label: 'PayPal',          emoji: '🌐', color: '#003087',  fields: ['email'], placeholder: 'email@example.com', instruction: 'Enter your PayPal email. You will be redirected to complete payment securely.' },
];

type Step = 'method' | 'details' | 'processing' | 'success';

export const PaymentModal: React.FC<Props> = ({ amount, onClose }) => {
  const [step, setStep]       = useState<Step>('method');
  const [method, setMethod]   = useState(METHODS[0]);
  const [fieldVal, setFieldVal] = useState('');
  const [error, setError]     = useState('');

  const handlePay = () => {
    if (!fieldVal.trim()) { setError('Please fill in the required field.'); return; }
    setError('');
    setStep('processing');
    setTimeout(() => setStep('success'), 3000);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 300, backdropFilter: 'blur(8px)' }}
      />

      <motion.div
        key="modal"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          zIndex: 301, width: '94%', maxWidth: '480px',
          background: '#0d0d0d', borderRadius: '24px',
          border: '1px solid #222', overflow: 'hidden',
          maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid #1a1a1a' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Donating</div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.7rem', color: 'var(--color-gold)' }}>
              Mk {amount.toLocaleString()}
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#666', background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>

          {/* ── STEP 1: Method ─────────────────────────── */}
          {step === 'method' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Choose your payment method:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {METHODS.map(m => (
                  <button key={m.id} onClick={() => setMethod(m)} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.1rem',
                    borderRadius: '12px', border: `2px solid ${method.id === m.id ? m.color : '#222'}`,
                    background: method.id === m.id ? `${m.color}18` : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer', textAlign: 'left', color: 'white', transition: 'all 0.2s',
                  }}>
                    <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{m.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{m.label}</div>
                    </div>
                    {method.id === m.id && <CheckCircle size={18} color={m.color} />}
                  </button>
                ))}
              </div>
              <button className="pill-btn" style={{ width: '100%' }} onClick={() => setStep('details')}>
                Continue with {method.label}
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: Details ────────────────────────── */}
          {step === 'details' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '1rem', borderRadius: '12px', background: `${method.color}18`, border: `1px solid ${method.color}44` }}>
                <span style={{ fontSize: '1.8rem' }}>{method.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700 }}>{method.label}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{method.instruction}</div>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  {method.fields[0] === 'phone' ? (
                    <><Phone size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />Phone Number</>
                  ) : method.fields[0] === 'email' ? (
                    <><Globe size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />PayPal Email</>
                  ) : (
                    <><Building2 size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />Account Number</>
                  )}
                </label>
                <input
                  className="form-input"
                  type={method.fields[0] === 'email' ? 'email' : 'text'}
                  value={fieldVal}
                  onChange={e => { setFieldVal(e.target.value); setError(''); }}
                  placeholder={method.placeholder}
                  style={{ borderColor: error ? 'var(--color-primary)' : undefined }}
                />
                {error && <p style={{ color: 'var(--color-primary)', fontSize: '0.82rem', marginTop: '0.4rem' }}>{error}</p>}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => setStep('method')} className="pill-btn pill-btn-ghost" style={{ flex: 1 }}>Back</button>
                <button onClick={handlePay} className="pill-btn" style={{ flex: 2, background: `linear-gradient(135deg, ${method.color}, ${method.color}99)` }}>
                  <CreditCard size={16} /> Pay Mk {amount.toLocaleString()}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Processing ─────────────────────── */}
          {step === 'processing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '2.5rem 0' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
                <Loader size={48} color="var(--color-primary)" />
              </motion.div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Processing Payment</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {method.fields[0] === 'phone'
                  ? `Check your phone (${fieldVal}) for a payment approval prompt.`
                  : `Connecting to ${method.label}...`}
              </p>
            </motion.div>
          )}

          {/* ── STEP 4: Success ────────────────────────── */}
          {step === 'success' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} style={{ marginBottom: '1.5rem' }}>
                <CheckCircle size={64} color="var(--color-gold)" style={{ margin: '0 auto' }} />
              </motion.div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--color-gold)' }}>Thank You! 🎉</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                <strong>Mk {amount.toLocaleString()}</strong> donated successfully via {method.label}.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                You'll receive a receipt shortly. Your generosity is changing a student's life right now.
              </p>
              <button className="pill-btn" style={{ maxWidth: '240px', margin: '0 auto', background: 'var(--gradient-gold)', color: '#000' }} onClick={onClose}>
                Done
              </button>
            </motion.div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

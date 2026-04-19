import React, { useState } from 'react';
import { X, CreditCard, Smartphone, CheckCircle } from 'lucide-react';

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ amount, onClose }) => {
  const [method, setMethod] = useState<'card' | 'mpesa' | 'airtel' | 'paypal' | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [phone, setPhone] = useState('');

  const handlePayment = () => {
    setStatus('processing');
    // Mock API call to Supabase / Payment Gateway
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      background: 'rgba(0,0,0,0.8)', zIndex: 100, 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem', position: 'relative', background: '#111' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={60} color="var(--color-primary)" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Payment Successful!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Thank you for donating Mk{amount.toLocaleString()}.</p>
            <button onClick={onClose} className="pill-btn" style={{ marginTop: '2rem', width: '100%' }}>Done</button>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Complete Payment</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Amount: <strong style={{ color: 'white' }}>Mk{amount.toLocaleString()}</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <button 
                onClick={() => setMethod('mpesa')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                  background: method === 'mpesa' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: `1px solid ${method === 'mpesa' ? 'var(--color-primary)' : '#333'}`,
                  borderRadius: '12px', color: 'white', cursor: 'pointer'
                }}
              >
                <Smartphone size={24} color="#4c9f38" /> M-Pesa
              </button>
              
              <button 
                onClick={() => setMethod('airtel')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                  background: method === 'airtel' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: `1px solid ${method === 'airtel' ? 'var(--color-primary)' : '#333'}`,
                  borderRadius: '12px', color: 'white', cursor: 'pointer'
                }}
              >
                <Smartphone size={24} color="#e5243b" /> Airtel Money
              </button>

              <button 
                onClick={() => setMethod('card')}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                  background: method === 'card' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: `1px solid ${method === 'card' ? 'var(--color-primary)' : '#333'}`,
                  borderRadius: '12px', color: 'white', cursor: 'pointer'
                }}
              >
                <CreditCard size={24} color="var(--color-primary)" /> National Bank (Card)
              </button>
            </div>

            {(method === 'mpesa' || method === 'airtel') && (
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Phone Number</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0999 123 456"
                  style={{
                    width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #333',
                    background: 'rgba(255,255,255,0.05)', color: 'white'
                  }}
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  A prompt will be sent to your phone to enter your PIN.
                </p>
              </div>
            )}

            <button 
              className="pill-btn" 
              style={{ width: '100%', opacity: !method || status === 'processing' ? 0.5 : 1 }}
              onClick={handlePayment}
              disabled={!method || status === 'processing'}
            >
              {status === 'processing' ? 'Processing...' : 'Pay Now'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

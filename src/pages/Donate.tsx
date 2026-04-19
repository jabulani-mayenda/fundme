import React, { useState } from 'react';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { PaymentModal } from '../components/PaymentModal';

export const Donate: React.FC = () => {
  const [amount, setAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const predefinedAmounts = [5000, 15000, 25000, 50000, 100000];

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(Number(e.target.value));
  };

  return (
    <AnimatedLayout>
      {/* Hero */}
      <section className="hero-section" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1544207959-195cce28e08d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '40vh',
        justifyContent: 'flex-end'
      }}>
        <div className="hero-overlay" style={{ background: 'var(--gradient-dark-bottom)' }}></div>
        <div className="hero-content" style={{ padding: '2rem 1rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>Support Malawi's Youth</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', maxWidth: '500px' }}>
            Donate to support Malawian students. Every Kwacha helps build a better future.
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <section style={{ background: '#1a1a1a', padding: '1.5rem 1rem', borderBottom: '1px solid #333' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
          <div>
            <div style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800 }}>Mk120k</div>
            <div style={{ color: 'var(--color-primary)', fontSize: '0.8rem' }}>Earned by you</div>
          </div>
          <div style={{ borderLeft: '1px solid #333', borderRight: '1px solid #333' }}>
            <div style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800 }}>3</div>
            <div style={{ color: 'var(--color-primary)', fontSize: '0.8rem' }}>Goals supported</div>
          </div>
          <div>
            <div style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800 }}>Mk350k</div>
            <div style={{ color: 'var(--color-primary)', fontSize: '0.8rem' }}>All-time donations</div>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section style={{ padding: '2rem 1rem', background: '#000' }}>
        <div className="container glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Choose an amount</h3>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
            {predefinedAmounts.map(val => (
              <button
                key={val}
                onClick={() => { setAmount(val); setCustomAmount(''); }}
                style={{
                  padding: '0.8rem 1.2rem',
                  borderRadius: '20px',
                  border: `2px solid ${amount === val && !customAmount ? 'var(--color-primary)' : '#333'}`,
                  background: amount === val && !customAmount ? 'var(--color-primary)' : 'transparent',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Mk{val.toLocaleString()}
              </button>
            ))}
          </div>
          
          <div style={{ marginBottom: '2.5rem' }}>
            <input 
              type="number" 
              value={customAmount}
              onChange={handleCustomAmount}
              placeholder="Or enter custom amount (Mk)"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid #333',
                background: 'rgba(255,255,255,0.05)',
                color: 'white',
                fontSize: '1.1rem',
                textAlign: 'center',
                outline: 'none'
              }}
            />
          </div>

          <button 
            className="pill-btn" 
            style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
            onClick={() => setIsPaymentModalOpen(true)}
          >
            Donate Mk{(amount || 0).toLocaleString()}
          </button>
        </div>
      </section>

      {isPaymentModalOpen && (
        <PaymentModal 
          amount={amount} 
          onClose={() => setIsPaymentModalOpen(false)} 
        />
      )}
    </AnimatedLayout>
  );
};

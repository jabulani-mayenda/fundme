import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Heart, Shield, Users, Trophy } from 'lucide-react';

const PERKS = [
  { icon: <Heart size={18} />, text: 'Track your donation impact in real-time' },
  { icon: <Users size={18} />, text: 'Connect with students you support' },
  { icon: <Trophy size={18} />, text: 'Earn Donor Recognition Awards' },
  { icon: <Shield size={18} />, text: 'Secure, verified payments' },
];

export const Login: React.FC = () => {
  const { signInWithGoogle, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (!isLoading && user) navigate(from, { replace: true });
  }, [user, isLoading, navigate, from]);

  return (
    <AnimatedLayout>
      <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr', position: 'relative', background: '#000' }}>
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/hero.png")', backgroundSize: 'cover', backgroundPosition: 'center top', opacity: 0.25 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(26,86,219,0.1) 0%, rgba(0,0,0,0.9) 70%)' }} />

        {/* Centered card */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem', minHeight: '100vh' }}>
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7 }}
            className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center' }}>

            {/* Logo */}
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
              <div style={{ background: 'var(--gradient-blue)', padding: '0.5rem', borderRadius: '10px', display: 'flex', boxShadow: 'var(--shadow-blue)' }}>
                <Heart size={20} color="white" fill="white" />
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'Outfit' }}>
                Fund<span style={{ color: 'var(--color-gold)' }}>Me</span><span style={{ color: 'var(--color-primary)', fontSize: '0.65rem', verticalAlign: 'super', fontWeight: 700 }}>MW</span>
              </span>
            </Link>

            <div className="gold-divider" style={{ margin: '0 auto 2rem' }} />

            <h1 style={{ fontSize: '1.9rem', marginBottom: '0.5rem' }}>Join the Movement</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Sign in to support Malawian students, track your impact, and earn recognition.
            </p>

            {/* Perks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.5rem', textAlign: 'left' }}>
              {PERKS.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.04)' }}>
                  <span style={{ color: 'var(--color-gold)', flexShrink: 0 }}>{p.icon}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{p.text}</span>
                </div>
              ))}
            </div>

            {/* Google Sign-In */}
            <button
              onClick={signInWithGoogle}
              disabled={isLoading}
              style={{
                width: '100%', padding: '1rem 1.5rem', borderRadius: '50px',
                background: 'white', color: '#1a1a1a', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                fontWeight: 700, fontSize: '1rem', fontFamily: 'Inter, sans-serif',
                boxShadow: '0 4px 20px rgba(255,255,255,0.15)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                opacity: isLoading ? 0.7 : 1,
              }}
              onMouseEnter={e => { if (!isLoading) e.currentTarget.style.transform = 'scale(1.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {isLoading ? 'Connecting...' : 'Continue with Google'}
            </button>

            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: '1.5rem', lineHeight: 1.6 }}>
              By signing in, you agree to our Terms of Service. Your data is secure and never sold.
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatedLayout>
  );
};

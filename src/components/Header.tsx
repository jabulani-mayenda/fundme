import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, User, LogOut, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const NAV = [
  { to: '/',            label: 'Home'        },
  { to: '/campaigns',  label: 'Campaigns'   },
  { to: '/internships',label: 'Internships' },
  { to: '/awards',     label: 'Awards'      },
  { to: '/news',       label: 'News'        },
  { to: '/donate',     label: 'Donate'      },
];

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { pathname } = useLocation();

  return (
    <>
      {/* ── Desktop ─────────────────────────────────────────────── */}
      <header
        className="desktop-only"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          alignItems: 'center', justifyContent: 'space-between',
          height: '70px', padding: '0 2rem',
          boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ background: 'var(--gradient-blue)', padding: '0.45rem', borderRadius: '10px', display: 'flex', boxShadow: 'var(--shadow-blue)' }}>
            <Heart size={18} color="white" fill="white" />
          </div>
          <span style={{ fontSize: '1.45rem', fontWeight: 900, fontFamily: 'Outfit', letterSpacing: '-0.5px', color: '#111' }}>
            Fund<span style={{ color: 'var(--color-gold)' }}>Me</span>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.7rem', fontWeight: 700, marginLeft: '4px', verticalAlign: 'super' }}>MW</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
          {NAV.map(n => (
            <Link
              key={n.to} to={n.to}
              style={{
                fontWeight: 700, fontSize: '0.88rem',
                color: pathname === n.to ? 'var(--color-primary)' : '#444',
                borderBottom: pathname === n.to ? '2px solid var(--color-primary)' : '2px solid transparent',
                paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Auth button */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/dashboard" style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)',
              padding: '0.5rem 1.1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600,
            }}>
              <User size={16} color="var(--color-gold)" />
              <span style={{ color: 'var(--color-gold)' }}>Dashboard</span>
            </Link>
            <button onClick={signOut} style={{ color: '#666', display: 'flex', alignItems: 'center' }}>
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              background: 'var(--gradient-blue)',
              color: 'white', padding: '0.55rem 1.4rem', borderRadius: '50px',
              fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 2px 12px rgba(26,86,219,0.4)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
          >
            <Sparkles size={15} /> Get Started
          </Link>
        )}
      </header>

      {/* ── Mobile Header ─────────────────────────────────────────── */}
      <header
        className="mobile-only"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          alignItems: 'center', justifyContent: 'space-between',
          height: '60px', padding: '0 1rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: 'var(--gradient-blue)', padding: '0.35rem', borderRadius: '8px', display: 'flex' }}>
            <Heart size={16} color="white" fill="white" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'Outfit', color: '#111' }}>
            Fund<span style={{ color: 'var(--color-gold)' }}>Me</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {!user && (
            <Link to="/login" style={{
              background: 'var(--gradient-blue)', color: 'white',
              padding: '0.4rem 1rem', borderRadius: '50px',
              fontWeight: 700, fontSize: '0.8rem',
            }}>
              Get Started
            </Link>
          )}
          {/* ⬇ BLACK toggle icon */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{ color: '#111', padding: '0.4rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '80%', maxWidth: '300px',
              background: '#ffffff', zIndex: 200, padding: '5rem 1.5rem 2rem',
              borderLeft: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: '0.35rem',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.1)',
            }}
          >
            <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#111', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} />
            </button>

            {NAV.map(n => (
              <Link
                key={n.to} to={n.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', padding: '0.85rem 1.25rem', borderRadius: '12px',
                  fontWeight: 700, fontSize: '1rem',
                  background: pathname === n.to ? 'rgba(26,86,219,0.08)' : 'transparent',
                  color: pathname === n.to ? 'var(--color-primary)' : '#111',
                  borderLeft: pathname === n.to ? '4px solid var(--color-primary)' : '4px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                {n.label}
              </Link>
            ))}

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {user ? (
                <>
                  <Link to="/dashboard" className="pill-btn" onClick={() => setMobileOpen(false)} style={{ textAlign: 'center' }}>
                    <User size={16} /> My Dashboard
                  </Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }}
                    style={{ padding: '0.75rem', borderRadius: '50px', border: '1px solid #ddd', color: '#666', fontWeight: 600, background: 'none' }}>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="pill-btn" onClick={() => setMobileOpen(false)} style={{ textAlign: 'center' }}>
                    <Sparkles size={16} /> Get Started — It's Free
                  </Link>
                  <p style={{ fontSize: '0.75rem', color: '#aaa', textAlign: 'center' }}>Sign in with Google, Email, or Phone</p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 150 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, User, LogOut } from 'lucide-react';
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
  const { user, signInWithGoogle, signOut } = useAuth();
  const { pathname } = useLocation();

  return (
    <>
      {/* ── Desktop ─────────────────────────────────────────────── */}
      <header
        className="desktop-only"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          alignItems: 'center', justifyContent: 'space-between',
          height: '70px', padding: '0 1.5rem',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            background: 'var(--gradient-blue)',
            padding: '0.45rem', borderRadius: '10px',
            display: 'flex', boxShadow: 'var(--shadow-blue)',
          }}>
            <Heart size={18} color="white" fill="white" />
          </div>
          <span style={{ fontSize: '1.45rem', fontWeight: 900, fontFamily: 'Outfit', letterSpacing: '-0.5px' }}>
            Fund<span style={{ color: 'var(--color-gold)' }}>Me</span>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.7rem', fontWeight: 700, marginLeft: '4px', verticalAlign: 'super' }}>MW</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {NAV.map(n => (
            <Link
              key={n.to} to={n.to}
              style={{
                fontWeight: 700, fontSize: '0.9rem',
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
          <button
            onClick={signInWithGoogle}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              background: 'var(--gradient-blue)',
              color: 'white', padding: '0.55rem 1.4rem', borderRadius: '50px',
              fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 2px 12px rgba(26,86,219,0.4)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <User size={16} />
            Sign In
          </button>
        )}
      </header>

      {/* ── Mobile Header ─────────────────────────────────────────── */}
      <header
        className="mobile-only"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          alignItems: 'center', justifyContent: 'space-between',
          height: '60px', padding: '0 1rem',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: 'var(--gradient-blue)', padding: '0.35rem', borderRadius: '8px', display: 'flex' }}>
            <Heart size={16} color="white" fill="white" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'Outfit' }}>
            Fund<span style={{ color: 'var(--color-gold)' }}>Me</span>
          </span>
        </Link>
        <button onClick={() => setMobileOpen(o => !o)} style={{ color: 'white', padding: '0.4rem' }}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '80%', maxWidth: '320px',
              background: '#ffffff', zIndex: 200, padding: '5rem 2rem 2rem',
              borderLeft: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '0.5rem',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.05)',
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#888' }}
            >
              <X size={24} />
            </button>

            {NAV.map(n => (
              <Link
                key={n.to} to={n.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', padding: '1rem 1.25rem', borderRadius: '12px',
                  fontWeight: 700, fontSize: '1.1rem',
                  background: pathname === n.to ? 'rgba(26,86,219,0.08)' : 'transparent',
                  color: pathname === n.to ? 'var(--color-primary)' : '#111',
                  borderLeft: pathname === n.to ? '4px solid var(--color-primary)' : '4px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                {n.label}
              </Link>
            ))}

            <div style={{ marginTop: 'auto' }}>
              {user ? (
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="pill-btn pill-btn-ghost"
                  style={{ width: '100%' }}
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => { signInWithGoogle(); setMobileOpen(false); }}
                  className="pill-btn"
                  style={{ width: '100%' }}
                >
                  Sign In with Google
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay behind drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 150 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

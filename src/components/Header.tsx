import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="glass-panel desktop-only" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', background: 'rgba(0,0,0,0.8)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: 'var(--gradient-primary)', padding: '0.4rem', borderRadius: '8px' }}>
            <Heart size={20} color="white" fill="white" />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'Outfit', letterSpacing: '-0.5px' }}>
            Fund<span style={{ color: 'var(--color-primary)' }}>Me</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/campaigns" style={{ fontWeight: 600 }}>Goals</Link>
          <Link to="/internships" style={{ fontWeight: 600 }}>Impact</Link>
          <Link to="/awards" style={{ fontWeight: 600 }}>Awards</Link>
          <Link to="/donate" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Donate</Link>
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button style={{ color: 'var(--text-primary)' }}>
            <Search size={20} />
          </button>
          <Link to="/dashboard" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'var(--color-primary)', 
            color: 'white',
            padding: '0.5rem 1.2rem', 
            borderRadius: '20px',
            transition: 'opacity 0.2s ease',
            fontWeight: 700
          }}>
            <User size={18} />
            <span style={{ fontSize: '0.9rem' }}>Subscribe</span>
          </Link>
        </div>

      </div>
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-only { display: none !important; }
          }
        `}
      </style>
    </header>
  );
};

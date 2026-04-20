import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Globe, Trophy, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';

const TABS = [
  { path: '/',            label: 'Home',       icon: Globe },
  { path: '/campaigns',  label: 'Campaigns',  icon: Heart },
  { path: '/donate',     label: 'Donate',     icon: null, isPrimary: true },
  { path: '/news',       label: 'News',       icon: Newspaper },
  { path: '/awards',     label: 'Awards',     icon: Trophy },
];

export const BottomNav: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav className="mobile-only" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)',
      borderTop: '1px solid #1a1a1a',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '0.5rem 0', paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
    }}>
      {TABS.map(tab => {
        const isActive = pathname === tab.path || (pathname.startsWith(tab.path) && tab.path !== '/');
        const Icon = tab.icon;

        if (tab.isPrimary) {
          return (
            <Link key={tab.path} to={tab.path} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', textDecoration: 'none', marginTop: '-20px' }}>
              <motion.div whileTap={{ scale: 0.9 }} className="animate-pulse-ring" style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: 'var(--gradient-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'var(--shadow-blue)', border: '3px solid #000',
              }}>
                <Heart size={22} color="white" fill="white" />
              </motion.div>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-primary)', fontWeight: 700 }}>Donate</span>
            </Link>
          );
        }

        return (
          <Link key={tab.path} to={tab.path} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
            textDecoration: 'none', minWidth: '52px', padding: '0.25rem 0',
          }}>
            <motion.div whileTap={{ scale: 0.85 }} style={{
              width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '10px',
              background: isActive ? 'rgba(26,86,219,0.15)' : 'transparent',
              color: isActive ? 'var(--color-primary)' : '#555',
              transition: 'color 0.2s, background 0.2s',
            }}>
              {Icon && <Icon size={20} />}
            </motion.div>
            <span style={{ fontSize: '0.65rem', fontWeight: isActive ? 700 : 400, color: isActive ? 'var(--color-primary)' : '#555', transition: 'color 0.2s' }}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

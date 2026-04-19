import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Globe, BookOpen, User, Sparkles } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const tabs = [
    { id: 'updates', path: '/', label: 'Updates', icon: <Globe size={24} /> },
    { id: 'goals', path: '/campaigns', label: 'Goals', icon: <BookOpen size={24} /> },
    { id: 'donate', path: '/donate', label: 'Donate', icon: <div style={{ background: 'var(--color-primary)', borderRadius: '50%', padding: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Heart size={24} color="white" fill="white" /></div>, isPrimary: true },
    { id: 'impact', path: '/internships', label: 'Impact', icon: <Sparkles size={24} /> },
    { id: 'subscribe', path: '/dashboard', label: 'Subscribe', icon: <User size={24} /> },
  ];

  return (
    <div className="bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#000000',
      borderTop: '1px solid var(--border-light)',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '0.5rem 0',
      paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
      zIndex: 100,
    }}>
      {tabs.map(tab => {
        const isActive = path === tab.path || (path.startsWith(tab.path) && tab.path !== '/');
        return (
          <Link 
            key={tab.id} 
            to={tab.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem',
              color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              minWidth: '64px'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isActive ? (tab.isPrimary ? 'white' : 'var(--color-primary)') : 'var(--text-secondary)'
            }}>
              {tab.icon}
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: isActive ? 600 : 400 }}>{tab.label}</span>
          </Link>
        )
      })}
      <style>
        {`
          @media (min-width: 769px) {
            .bottom-nav { display: none !important; }
          }
        `}
      </style>
    </div>
  );
};

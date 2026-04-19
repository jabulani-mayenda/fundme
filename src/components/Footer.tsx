import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: 'var(--color-bg-panel)', padding: '4rem 0 2rem', borderTop: '1px solid var(--border-light)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--gradient-primary)', padding: '0.5rem', borderRadius: '8px' }}>
              <Heart size={20} color="white" />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Outfit' }}>
              Fund<span style={{ color: 'var(--color-accent)' }}>Me</span>
            </span>
          </Link>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Empowering students to achieve their educational and career goals through community funding and support.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><Link to="/campaigns" style={{ color: 'var(--text-secondary)' }}>All Campaigns</Link></li>
            <li><Link to="/internships" style={{ color: 'var(--text-secondary)' }}>Internship Matches</Link></li>
            <li><Link to="/awards" style={{ color: 'var(--text-secondary)' }}>Student Awards</Link></li>
            <li><Link to="/donate" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Donate Now</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Legal</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Terms of Service</a></li>
            <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Donor Guidelines</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container" style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid var(--border-light)', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
        <p>&copy; {new Date().getFullYear()} FundMe Platform. Built for the community.</p>
      </div>
    </footer>
  );
};

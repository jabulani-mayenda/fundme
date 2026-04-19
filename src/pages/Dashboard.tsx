import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { User, LogOut, Award, MapPin, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <AnimatedLayout>
      <div style={{ background: '#000', minHeight: '100vh', paddingBottom: '6rem' }}>
        
        {/* Profile Header Parallax */}
        <div style={{
          position: 'relative', height: '300px',
          backgroundImage: 'url("https://images.unsplash.com/photo-1544207959-195cce28e08d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundSize: 'cover'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000, transparent)' }} />
          <div style={{ position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {user?.user_metadata?.avatar_url ? (
              <img 
                src={user.user_metadata.avatar_url} 
                alt="Profile" 
                style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #000', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ 
                width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-primary)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #000'
              }}>
                <User size={60} color="white" />
              </div>
            )}
          </div>
        </div>

        <div className="container" style={{ marginTop: '70px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', margin: 0, color: 'white' }}>{user?.user_metadata?.full_name || user?.email || 'Student Account'}</h2>
          <span style={{ color: 'var(--text-secondary)' }}>{user?.email}</span>
          
          {/* Animated Donor Level Ring */}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '150px', height: '150px' }}>
              <svg width="150" height="150" viewBox="0 0 150 150">
                <circle cx="75" cy="75" r="65" fill="none" stroke="#333" strokeWidth="10" />
                <motion.circle 
                  cx="75" cy="75" r="65" fill="none" stroke="var(--color-primary)" strokeWidth="10"
                  strokeDasharray="408" strokeDashoffset="408"
                  animate={{ strokeDashoffset: 100 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  strokeLinecap="round"
                  transform="rotate(-90 75 75)"
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={30} color="var(--color-primary)" />
                <span style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>Baobab Level</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Scrolling Content Grid */}
        <div className="container" style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Leaderboard */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp color="var(--color-primary)" /> Top Philanthropists
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'Dr. Kondwani', amount: 'Mk1,500,000', pos: 1 },
                { name: 'Airtel Malawi Corp', amount: 'Mk850,000', pos: 2 },
                { name: 'Anonymous', amount: 'Mk400,000', pos: 3 },
                { name: 'Sarah J.', amount: 'Mk250,000', pos: 4 },
              ].map((donor) => (
                <div key={donor.pos} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: donor.pos === 1 ? '#dda63a' : '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'black' }}>
                    {donor.pos}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{donor.name}</div>
                  </div>
                  <div style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{donor.amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Impact Map Placeholder */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin color="#4c9f38" /> Your Impact Map
            </h3>
            <div style={{ flex: 1, background: '#111', borderRadius: '12px', position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
               {/* Abstract map representation */}
               <div style={{ position: 'absolute', inset: 0, opacity: 0.3, background: 'radial-gradient(circle at 50% 50%, #4c9f38 0%, transparent 60%)' }} />
               <div className="animate-pulse-ring" style={{ position: 'absolute', top: '30%', left: '40%', width: '15px', height: '15px', background: '#e5243b', borderRadius: '50%' }} />
               <div className="animate-pulse-ring" style={{ position: 'absolute', top: '60%', left: '60%', width: '15px', height: '15px', background: '#007bff', borderRadius: '50%', animationDelay: '1s' }} />
               <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', background: 'rgba(0,0,0,0.8)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                 <p style={{ margin: 0 }}><strong>Zomba:</strong> Supported 1 student at UNIMA</p>
                 <p style={{ margin: '0.5rem 0 0 0' }}><strong>Blantyre:</strong> Funded 2 laptops</p>
               </div>
            </div>
          </div>

          {/* Settings & Logout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="pill-btn" style={{ background: '#1a1a1a', border: '1px solid #333', textAlign: 'left', padding: '1.5rem', width: '100%' }}>Edit Profile</button>
            <button className="pill-btn" style={{ background: '#1a1a1a', border: '1px solid #333', textAlign: 'left', padding: '1.5rem', width: '100%' }}>Payment Methods</button>
            <button className="pill-btn" style={{ background: '#1a1a1a', border: '1px solid #333', textAlign: 'left', padding: '1.5rem', width: '100%' }}>Notification Preferences</button>
            <button 
              onClick={handleSignOut}
              className="pill-btn" 
              style={{ background: '#1a1a1a', color: 'var(--cat-education)', border: '1px solid var(--cat-education)', padding: '1.5rem', marginTop: 'auto', width: '100%' }}
            >
              <LogOut size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Secure Sign Out
            </button>
          </div>

        </div>
      </div>
    </AnimatedLayout>
  );
};

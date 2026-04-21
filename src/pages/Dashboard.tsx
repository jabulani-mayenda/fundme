import React from 'react';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { User, LogOut, MapPin, TrendingUp, Shield, CreditCard, Bell, Edit3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <AnimatedLayout>
      <div style={{ background: '#f8faff', minHeight: '100vh', paddingBottom: '6rem', color: '#1a202c' }}>
        
        {/* Profile Header Parallax */}
        <div style={{
          position: 'relative', height: '260px',
          backgroundImage: 'url("https://images.unsplash.com/photo-1544207959-195cce28e08d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundPosition: 'center', backgroundSize: 'cover'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(248,250,255,1), rgba(248,250,255,0.4))' }} />
          <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
            <div style={{ position: 'relative' }}>
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Profile" 
                  style={{ width: '120px', height: '120px', borderRadius: '50%', border: '6px solid white', objectFit: 'cover', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
              ) : (
                <div style={{ 
                  width: '120px', height: '120px', borderRadius: '50%', background: 'var(--gradient-blue)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid white', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}>
                  <User size={50} color="white" />
                </div>
              )}
              <div style={{ position: 'absolute', bottom: '5px', right: '5px', background: '#10b981', width: '24px', height: '24px', borderRadius: '50%', border: '3px solid white' }} />
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: '60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.25rem', fontWeight: 900, color: '#1a202c' }}>
            {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Malawian Student'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#718096', fontWeight: 600 }}>
             <Shield size={14} /> Verified Member
          </div>
          
          {/* Stats Bar */}
          <div className="grid-3" style={{ maxWidth: '800px', margin: '2.5rem auto', gap: '1rem' }}>
             {[
               { label: 'Donations', val: 'Mk 25k', color: 'var(--color-primary)' },
               { label: 'Impact Rank', val: '#452', color: 'var(--color-gold)' },
               { label: 'Rewards', val: '12 pts', color: 'var(--color-mw-green)' },
             ].map((s, i) => (
               <div key={i} style={{ background: 'white', padding: '1.25rem', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
                 <div style={{ fontSize: '0.8rem', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 800, marginBottom: '0.25rem' }}>{s.label}</div>
                 <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.color }}>{s.val}</div>
               </div>
             ))}
          </div>
        </div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Left Column: Impact & Activity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Leaderboard */}
            <div className="glass-panel" style={{ padding: '2rem', background: 'white' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <TrendingUp color="var(--color-primary)" size={22} /> Donor Circle
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'Dr. Kondwani', amount: 'Mk1.5M', pos: 1, img: 'https://i.pravatar.cc/150?u=1' },
                  { name: 'Airtel Malawi', amount: 'Mk850k', pos: 2, img: 'https://i.pravatar.cc/150?u=2' },
                  { name: 'John Phiri', amount: 'Mk400k', pos: 3, img: 'https://i.pravatar.cc/150?u=3' },
                ].map((donor) => (
                  <div key={donor.pos} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                    <img src={donor.img} style={{ width: 40, height: 40, borderRadius: '50%' }} alt="" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{donor.name}</div>
                    </div>
                    <div style={{ color: 'var(--color-primary)', fontWeight: 800 }}>{donor.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Map */}
            <div className="glass-panel" style={{ padding: '2rem', background: 'white' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin color="var(--color-mw-green)" size={22} /> Regional Support
              </h3>
              <div style={{ height: '220px', background: '#f1f5f9', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                 <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("https://www.transparenttextures.com/patterns/world-map.png")' }} />
                 <div className="animate-pulse-ring" style={{ position: 'absolute', top: '40%', left: '45%', width: '12px', height: '12px', background: 'var(--color-mw-red)', borderRadius: '50%' }} />
                 <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', background: 'white', padding: '1rem', borderRadius: '12px', fontSize: '0.85rem', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                   <strong>Active Impact:</strong> Supported 1 student at UNIMA.
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: Actions & Tools */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Account Actions</h3>
            
            {[
              { icon: <Edit3 size={18} />, label: 'Edit Profile', desc: 'Update your details and avatar' },
              { icon: <CreditCard size={18} />, label: 'Payment Methods', desc: 'Manage PesaPal & Mobile Money' },
              { icon: <Bell size={18} />, label: 'Notifications', desc: 'Stay updated on student progress' },
            ].map((a, i) => (
              <button key={i} style={{ 
                width: '100%', padding: '1.25rem', borderRadius: '20px', background: 'white', 
                border: '1px solid #edf2f7', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1.25rem',
                transition: 'all 0.2s', cursor: 'pointer',
              }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = '#edf2f7'}>
                <div style={{ background: '#f8faff', padding: '0.75rem', borderRadius: '12px', color: 'var(--color-primary)' }}>{a.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem' }}>{a.label}</div>
                  <div style={{ fontSize: '0.8rem', color: '#718096' }}>{a.desc}</div>
                </div>
              </button>
            ))}

            <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
              <button 
                onClick={handleSignOut}
                className="pill-btn" 
                style={{ background: 'white', color: '#e53e3e', border: '2px solid #fed7d7', width: '100%', boxShadow: 'none' }}
              >
                <LogOut size={20} /> Secure Sign Out
              </button>
            </div>
          </div>

        </div>
      </div>
    </AnimatedLayout>
  );
};

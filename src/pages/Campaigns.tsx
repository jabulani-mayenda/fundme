import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_CAMPAIGNS = [
  { id: 1, cat: '4 Quality Education', title: 'Fund Final Year UNIMA Fees', student: 'Chikondi M.', location: 'Zomba', progress: 75, color: '#c5192d' },
  { id: 2, cat: '9 Innovation', title: 'ICT Equipment for Rural Lab', student: 'Mzuzu Tech Club', location: 'Mzuzu', progress: 40, color: '#fd6925' },
  { id: 3, cat: '1 No Poverty', title: 'Basic Needs & Housing Support', student: 'Yamikani D.', location: 'Lilongwe', progress: 90, color: '#e5243b' },
  { id: 4, cat: '3 Good Health', title: 'Medical Internship Travel', student: 'Dr. Thandi', location: 'Blantyre', progress: 60, color: '#4c9f38' },
  { id: 5, cat: '8 Decent Work', title: 'Startup Capital for Agribusiness', student: 'LUANAR Grads', location: 'Lilongwe', progress: 25, color: '#a21942' },
];

export const Campaigns: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Goals');

  const filteredCampaigns = MOCK_CAMPAIGNS.filter(
    (c) => activeFilter === 'All Goals' || c.cat === activeFilter
  );

  return (
    <AnimatedLayout>
      {/* Campaign of the Week (Parallax) */}
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '2rem 1rem'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ background: 'var(--color-primary)', color: 'white', display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            Campaign of the Week
          </div>
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>Rebuilding Ndirande Community School</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2rem' }}>
            Help us raise Mk2,000,000 to replace the roof blown off during the recent heavy rains before the new term begins.
          </p>
          <Link to="/donate" className="pill-btn" style={{ background: 'white', color: 'black', fontSize: '1.1rem', padding: '1rem 2rem' }}>
            Support Ndirande Now
          </Link>
        </div>
      </section>

      {/* Filter Chips */}
      <section style={{ padding: '2rem 1rem 1rem', background: '#000', overflowX: 'auto', whiteSpace: 'nowrap', position: 'sticky', top: '70px', zIndex: 10, borderBottom: '1px solid #222' }}>
        <div style={{ display: 'flex', gap: '0.8rem', paddingBottom: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
          {['All Goals', '1 No Poverty', '3 Good Health', '4 Quality Education', '8 Decent Work', '9 Innovation'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveFilter(cat)}
              style={{
                background: activeFilter === cat ? 'white' : 'rgba(255,255,255,0.1)',
                color: activeFilter === cat ? 'black' : 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 600,
                flexShrink: 0,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Shuffling Grid */}
      <section style={{ padding: '2rem 1rem 6rem', background: '#000', minHeight: '50vh' }}>
        <motion.div layout className="container category-grid">
          <AnimatePresence>
            {filteredCampaigns.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                key={item.id} 
                style={{ background: '#1a1a1a', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ padding: '0.5rem 1rem', background: item.color, color: 'white', fontWeight: 800, fontSize: '0.9rem' }}>
                  {item.cat}
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    <span>{item.student}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {item.location}</span>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem', marginTop: 'auto' }}>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{ height: '100%', background: item.color }}
                      />
                    </div>
                  </div>

                  <Link to="/donate" className="pill-btn" style={{ background: item.color, width: '100%', textAlign: 'center' }}>
                    Support Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
      
      {/* FAB */}
      <div style={{ position: 'fixed', bottom: '90px', right: '20px', zIndex: 90 }}>
        <button style={{
          width: '56px', height: '56px', borderRadius: '28px', background: 'white', color: 'black',
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          fontSize: '2.5rem', fontWeight: 300, lineHeight: 1, border: 'none', cursor: 'pointer'
        }}>
          +
        </button>
      </div>

    </AnimatedLayout>
  );
};

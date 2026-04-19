import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { Trophy, Star, ChevronRight } from 'lucide-react';

export const Awards: React.FC = () => {
  return (
    <AnimatedLayout>
      {/* Glowing Spotlight Hero */}
      <section style={{ position: 'relative', minHeight: '60vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* Glowing Aura */}
        <div className="animate-glow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }} />
        
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Trophy size={80} color="#d4af37" />
          </div>
          <h1 style={{ fontSize: '3rem', color: '#d4af37', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Innovator of the Year</h1>
          <p style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Emanuel Kamanga</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            Awarded for building a solar-powered irrigation system for his village in Salima using recycled materials while studying at MUST.
          </p>
        </div>
      </section>

      {/* Cascading Hall of Fame */}
      <section style={{ padding: '4rem 1rem 6rem', background: '#000' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem' }}>Hall of Fame</h2>
            <button style={{ background: 'transparent', color: 'var(--color-primary)', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
              Nominate Someone <ChevronRight size={16} />
            </button>
          </div>

          <div className="category-grid">
            {[
              { year: '2025', category: 'Tech Excellence', name: 'Grace Mwanza', uni: 'MUBAS', color: '#007bff' },
              { year: '2024', category: 'Community Health', name: 'Dr. Peter Banda', uni: 'KUHeS', color: '#4c9f38' },
              { year: '2024', category: 'Agri-Business', name: 'Tiwonge Phiri', uni: 'LUANAR', color: '#dda63a' },
              { year: '2023', category: 'Social Impact', name: 'Blessings K.', uni: 'UNIMA', color: '#e5243b' },
            ].map((award, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
                key={i} 
                className="glass-panel" 
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', transformPerspective: 1000 }}
              >
                {/* Accent line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: award.color }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <Star size={30} color={award.color} />
                  <span style={{ fontWeight: 800, color: 'rgba(255,255,255,0.2)', fontSize: '1.5rem' }}>{award.year}</span>
                </div>
                
                <div style={{ color: award.color, fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {award.category}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{award.name}</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{award.uni}</p>
                
                <button className="pill-btn" style={{ width: '100%', marginTop: '2rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: `1px solid ${award.color}` }}>
                  Read Story
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedLayout>
  );
};

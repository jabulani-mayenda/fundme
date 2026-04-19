import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { Building2, Briefcase, MapPin, Search, CheckCircle } from 'lucide-react';

export const Internships: React.FC = () => {
  return (
    <AnimatedLayout>
      {/* Floating Bubbles Hero */}
      <section style={{ position: 'relative', minHeight: '50vh', background: '#111', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("https://images.unsplash.com/photo-1544207959-195cce28e08d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        
        {/* Floating Bubbles */}
        <div className="animate-float" style={{ position: 'absolute', top: '20%', left: '10%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid #4c9f38', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4c9f38', fontWeight: 'bold' }}>Airtel</div>
        <div className="animate-float-delayed" style={{ position: 'absolute', bottom: '20%', right: '15%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid #007bff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007bff', fontWeight: 'bold' }}>FDH Bank</div>
        <div className="animate-float" style={{ position: 'absolute', top: '30%', right: '25%', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid #e5243b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e5243b', fontWeight: 'bold', animationDuration: '8s' }}>TNM</div>
        <div className="animate-float-delayed" style={{ position: 'absolute', bottom: '30%', left: '20%', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid #dda63a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dda63a', fontWeight: 'bold', animationDuration: '5s' }}>Illovo</div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem' }}>Launch Your Career</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            We connect Malawi's brightest students with top companies for paid internships and graduate trainee programs.
          </p>
        </div>
      </section>

      {/* The Journey Timeline */}
      <section style={{ padding: '4rem 1rem', background: '#000' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem' }}>The Journey</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            {/* Vertical Line */}
            <div style={{ position: 'absolute', left: '24px', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.1)' }} />
            
            {[
              { icon: <Search size={20} />, title: 'Find Opportunities', desc: 'Browse internships across Malawi tailored to your degree.' },
              { icon: <CheckCircle size={20} />, title: 'Get Verified', desc: 'University administration verifies your academic standing.' },
              { icon: <Briefcase size={20} />, title: 'Start Internship', desc: 'Begin your professional journey with stipends funded by donors.' }
            ].map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                key={i} 
                style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1 }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '4px solid #000' }}>
                  {step.icon}
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Listings Grid */}
      <section style={{ padding: '2rem 1rem 6rem', background: '#000' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Featured Listings</h2>
          <div className="category-grid">
            {[
              { role: 'Software Engineering Intern', company: 'Standard Bank', loc: 'Lilongwe', color: '#007bff' },
              { role: 'Agriculture Extension Officer', company: 'Illovo Sugar', loc: 'Chikwawa', color: '#4c9f38' },
              { role: 'Data Analysis Trainee', company: 'Airtel Malawi', loc: 'Blantyre', color: '#e5243b' },
            ].map((job, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: job.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Building2 size={20} color="white" />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{job.role}</h3>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: 'bold' }}>{job.company}</span> • <MapPin size={12} style={{ display: 'inline' }} /> {job.loc}
                </div>
                <button className="pill-btn" style={{ width: '100%', marginTop: 'auto', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid #333' }}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </AnimatedLayout>
  );
};

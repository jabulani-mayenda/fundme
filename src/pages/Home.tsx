import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedLayout } from '../components/AnimatedLayout';
import { Heart, BookOpen, Laptop, Briefcase, Home as HomeIcon, User, ChevronDown, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'No Poverty', color: '#e5243b', icon: <HomeIcon size={30} color="white" /> },
  { id: 2, name: 'Zero Hunger', color: '#dda63a', icon: <User size={30} color="white" /> },
  { id: 3, name: 'Health', color: '#4c9f38', icon: <Heart size={30} color="white" /> },
  { id: 4, name: 'Education', color: '#c5192d', icon: <BookOpen size={30} color="white" /> },
  { id: 8, name: 'Work', color: '#a21942', icon: <Briefcase size={30} color="white" /> },
  { id: 9, name: 'Innovation', color: '#fd6925', icon: <Laptop size={30} color="white" /> },
];

const mockDonations = [
  "Chifundo donated Mk50,000 to Medical Fees",
  "John donated Mk15,000 to Books & Supplies",
  "Airtel Malawi donated Mk500,000 to ICT Equipment",
  "Anonymous donated Mk100,000 to Housing Support",
  "Grace donated Mk25,000 to MUBAS Tuition Fees"
];

export const Home: React.FC = () => {
  const [activeWheelCat, setActiveWheelCat] = useState(categories[0]);

  return (
    <AnimatedLayout>
      {/* SCROLL 1: Hero Section */}
      <section style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1544207959-195cce28e08d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginTop: '10vh' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: 'white', marginBottom: '1rem', lineHeight: 1.1 }}>
              Fund Malawian <br/><span style={{ color: 'var(--color-primary)' }}>Futures.</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Directly support ambitious students across Malawi. From secondary school fees to UNIMA & MUBAS tuition, every contribution builds a stronger generation.
            </p>
            <Link to="/donate" className="pill-btn" style={{ maxWidth: '300px', margin: '0 auto' }}>
              Take Action Now
            </Link>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: '120px', left: '50%', transform: 'translateX(-50%)', color: 'white', zIndex: 1 }}
        >
          <ChevronDown size={40} />
        </motion.div>
      </section>

      {/* SCROLL 2: The Context (Zig-Zag) */}
      <section style={{ padding: '6rem 1rem', background: '#000', overflow: 'hidden' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}
          >
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The Challenge</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                Many talented students in Malawi drop out each year not because they lack ability, but because they lack basic resources. A Mk50,000 gap in rent, a broken laptop, or transport fees from rural areas to Blantyre or Lilongwe can derail a promising career.
              </p>
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Students in rural setting" style={{ width: '100%', borderRadius: '20px' }} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '4rem', alignItems: 'center' }}
          >
            <div style={{ flex: 1, minWidth: '300px' }}>
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="University students collaborating" style={{ width: '100%', borderRadius: '20px' }} />
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The Solution</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                By directly funding specific needs — like textbooks, software licenses, or travel to an internship — you remove the immediate barriers standing between a student and their success. We bridge the gap using M-Pesa, Airtel Money, and local banks.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SCROLL 3: The Spinning Wheel */}
      <section style={{ padding: '6rem 1rem', background: '#111', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Support the Goals</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem' }}>Tap a category to learn more.</p>

          <div style={{ position: 'relative', width: '100%', maxWidth: '400px', aspectRatio: '1/1', margin: '0 auto' }}>
            {/* Center Info */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '180px', height: '180px', borderRadius: '50%', background: activeWheelCat.color,
              zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(0,0,0,0.5)', transition: 'background 0.3s ease'
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWheelCat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{ textAlign: 'center', color: 'white' }}
                >
                  <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1 }}>{activeWheelCat.id}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '0.5rem' }}>{activeWheelCat.name}</div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Orbiting Slices */}
            <div className="animate-spin-slow" style={{ width: '100%', height: '100%', position: 'relative' }}>
              {categories.map((cat, index) => {
                const angle = (index / categories.length) * 360;
                const radius = 150; // Distance from center
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div
                    key={cat.id}
                    className="animate-spin-slow-reverse" // Counter-spin to keep upright
                    style={{
                      position: 'absolute',
                      top: `calc(50% + ${y}px - 35px)`,
                      left: `calc(50% + ${x}px - 35px)`,
                      width: '70px', height: '70px',
                      background: cat.color, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', border: '3px solid #111',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={() => setActiveWheelCat(cat)}
                    onClick={() => setActiveWheelCat(cat)}
                  >
                    {cat.icon}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL 4: Data & Marquee */}
      <section style={{ padding: '4rem 0', background: 'var(--color-primary)' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '3rem', color: 'white', marginBottom: '2rem' }}>Our Collective Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '4rem', fontWeight: 900, color: 'white' }}>Mk45M+</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Total Raised</div>
            </div>
            <div>
              <div style={{ fontSize: '4rem', fontWeight: 900, color: 'white' }}>3,500</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Students Helped</div>
            </div>
            <div>
              <div style={{ fontSize: '4rem', fontWeight: 900, color: 'white' }}>12K</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Global Donors</div>
            </div>
          </div>
        </div>

        {/* Live Marquee Feed */}
        <div style={{ overflow: 'hidden', background: 'rgba(0,0,0,0.2)', padding: '1rem 0' }}>
          <div className="animate-marquee" style={{ gap: '3rem' }}>
            {/* Render list twice for seamless loop */}
            {[...mockDonations, ...mockDonations, ...mockDonations].map((txt, i) => (
              <span key={i} style={{ color: 'white', fontWeight: 600, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                <Heart size={16} fill="white" /> {txt}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SCROLL 5: Featured Campaigns */}
      <section style={{ padding: '6rem 1rem 8rem', background: '#000' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Urgent Needs</h2>
            <Link to="/campaigns" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>View All</Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { cat: '4 Education', title: 'Final Year UNIMA Fees', student: 'Chikondi M.', location: 'Zomba', progress: 75, color: '#c5192d' },
              { cat: '9 Innovation', title: 'Laptop for CompSci Degree', student: 'Dalitso K.', location: 'Blantyre', progress: 40, color: '#fd6925' },
              { cat: '1 Poverty', title: 'Emergency Housing Rent', student: 'Yamikani D.', location: 'Lilongwe', progress: 90, color: '#e5243b' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ background: '#1a1a1a', borderRadius: '16px', overflow: 'hidden' }}
              >
                <div style={{ padding: '0.5rem 1rem', background: item.color, color: 'white', fontWeight: 800, fontSize: '0.9rem' }}>
                  {item.cat}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    <span>{item.student}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {item.location}</span>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.progress}%`, height: '100%', background: item.color }}></div>
                    </div>
                  </div>

                  <Link to="/donate" className="pill-btn" style={{ background: item.color, width: '100%', padding: '0.8rem' }}>
                    Support Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </AnimatedLayout>
  );
};

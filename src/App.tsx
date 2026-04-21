import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import { Home } from './pages/Home';
import { Donate } from './pages/Donate';
import { Campaigns } from './pages/Campaigns';
import { Internships } from './pages/Internships';
import { Awards } from './pages/Awards';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { News } from './pages/News';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) return <div style={{ minHeight: '100vh', background: '#f8faff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="animate-spin" style={{ width: 40, height: 40, border: '4px solid #1a56db', borderTopColor: 'transparent', borderRadius: '50%' }} />
  </div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
};

function AppInner() {
  const location = useLocation();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8faff', overflowX: 'hidden' }}>
      <Header />
      {/* Top padding so content doesn't hide under fixed header */}
      <main style={{ flex: 1, paddingTop: '70px' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"             element={<Home />} />
            <Route path="/campaigns"   element={<Campaigns />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/awards"      element={<Awards />} />
            <Route path="/donate"      element={<Donate />} />
            <Route path="/login"       element={<Login />} />
            <Route path="/news"        element={<News />} />
            <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppInner />
      </Router>
    </AuthProvider>
  );
}

export default App;

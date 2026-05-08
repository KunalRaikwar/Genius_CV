import { useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileText, Globe, User, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import FormWizard from './components/FormWizard';
import ResumePreview from './components/ResumePreview';
import PortfolioView from './components/PortfolioView';
import { Login, Signup } from './components/Auth/AuthForms';
import ProfilePage from './components/ProfilePage';

// Private Route Component
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar glass flex-between" style={{ padding: '0 2rem' }}>
        <Link to="/" className="flex-center" style={{ gap: '0.5rem' }} onClick={handleNavClick}>
          <Sparkles className="text-gradient" size={24} />
          <span className="heading-xl" style={{ fontSize: '1.25rem', margin: 0 }}>GeniusCV</span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Overlay */}
        <div className={`mobile-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)} />

        {/* Nav Links */}
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {user ? (
            <>
              <Link to="/resume" className="btn btn-ghost" onClick={handleNavClick}><FileText size={18} /> Resume</Link>
              <Link to="/portfolio" className="btn btn-ghost" onClick={handleNavClick}><Globe size={18} /> Portfolio</Link>
              <Link to="/profile" className="btn btn-secondary" onClick={handleNavClick}><User size={18} /> Profile</Link>
              <Link to="/build" className="btn btn-primary" onClick={handleNavClick}>Build Now</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost" onClick={handleNavClick}><LogIn size={18} /> Log In</Link>
              <Link to="/signup" className="btn btn-primary" onClick={handleNavClick}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <main className="page-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/build" element={<PrivateRoute><FormWizard /></PrivateRoute>} />
              <Route path="/resume" element={<PrivateRoute><ResumePreview /></PrivateRoute>} />
              <Route path="/portfolio" element={<PrivateRoute><PortfolioView /></PrivateRoute>} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;

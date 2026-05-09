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
  const isLanding = location.pathname === '/';

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  const scrollToSection = (id) => {
    handleNavClick();
    if (isLanding) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="navbar glass flex-between" style={{ padding: '0 2rem' }}>
        <Link to="/" className="flex-center" style={{ gap: '0.5rem' }} onClick={handleNavClick}>
          <Sparkles className="text-gradient" size={24} />
          <span className="heading-xl" style={{ fontSize: '1.25rem', margin: 0 }}>Genius CV</span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Overlay */}
        <div className={`mobile-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)} />

        {/* Nav Links */}
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {isLanding && (
            <>
              <button onClick={() => scrollToSection('templates')} className="btn btn-ghost btn-sm">Templates</button>
              <button onClick={() => scrollToSection('features')} className="btn btn-ghost btn-sm">Features</button>
              <button onClick={() => scrollToSection('pricing')} className="btn btn-ghost btn-sm">Pricing</button>
              <button onClick={() => scrollToSection('reviews')} className="btn btn-ghost btn-sm">Reviews</button>
            </>
          )}
          {user ? (
            <>
              <Link to="/resume" className="btn btn-ghost btn-sm" onClick={handleNavClick}><FileText size={18} /> Resume</Link>
              <Link to="/portfolio" className="btn btn-ghost btn-sm" onClick={handleNavClick}><Globe size={18} /> Portfolio</Link>
              <Link to="/profile" className="btn btn-secondary btn-sm" onClick={handleNavClick}><User size={18} /> Profile</Link>
              <Link to="/build" className="btn btn-primary btn-sm" onClick={handleNavClick}>Build Now</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm" onClick={handleNavClick}><LogIn size={18} /> Log In</Link>
              <Link to="/signup" className="btn btn-primary btn-sm" onClick={handleNavClick}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <main className="page-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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

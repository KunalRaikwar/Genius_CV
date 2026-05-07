import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Globe, User, LogIn } from 'lucide-react';
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

  return (
    <>
      <nav className="navbar glass flex-between" style={{ padding: '0 2rem' }}>
        <Link to="/" className="flex-center" style={{ gap: '0.5rem' }}>
          <Sparkles className="text-gradient" size={24} />
          <span className="heading-xl" style={{ fontSize: '1.25rem', margin: 0 }}>GeniusCV</span>
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {user ? (
            <>
              <Link to="/resume" className="btn btn-ghost"><FileText size={18} /> Resume</Link>
              <Link to="/portfolio" className="btn btn-ghost"><Globe size={18} /> Portfolio</Link>
              <Link to="/profile" className="btn btn-secondary"><User size={18} /> Profile</Link>
              <Link to="/build" className="btn btn-primary">Build Now</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost"><LogIn size={18} /> Log In</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/build" element={<PrivateRoute><FormWizard /></PrivateRoute>} />
          <Route path="/resume" element={<PrivateRoute><ResumePreview /></PrivateRoute>} />
          <Route path="/portfolio" element={<PrivateRoute><PortfolioView /></PrivateRoute>} />
        </Routes>
      </main>
    </>
  );
}

export default App;

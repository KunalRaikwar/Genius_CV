import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = login(email, password);
    if (res.success) {
      navigate('/profile');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="container flex-center" style={{ minHeight: '80vh', position: 'relative', zIndex: 1 }}>
      <div style={{ position: 'absolute', top: '20%', right: '20%', width: '200px', height: '200px', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '50%', filter: 'blur(50px)', zIndex: -1 }} />
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '450px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="btn-icon" style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-primary)', display: 'inline-flex', marginBottom: '1rem', width: '50px', height: '50px' }}>
            <LogIn size={24} />
          </div>
          <h2 className="heading-lg" style={{ fontSize: '2rem' }}>Welcome Back</h2>
          <p className="text-secondary">Log in to manage your resumes.</p>
        </div>

        {error && (
          <div className="glass" style={{ background: 'rgba(255,0,60,0.1)', borderColor: 'rgba(255,0,60,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <AlertCircle size={18} color="var(--accent-tertiary)" />
            <span style={{ fontSize: '0.875rem' }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" required className="input-field" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" required className="input-field" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Log In</button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
          <span className="text-secondary">Don't have an account? </span>
          <Link to="/signup" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
}

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = signup(name, email, password);
    if (res.success) {
      navigate('/profile');
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="container flex-center" style={{ minHeight: '80vh', position: 'relative', zIndex: 1 }}>
      <div style={{ position: 'absolute', top: '20%', left: '20%', width: '200px', height: '200px', background: 'rgba(112, 0, 255, 0.1)', borderRadius: '50%', filter: 'blur(50px)', zIndex: -1 }} />
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '450px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="btn-icon" style={{ background: 'rgba(112, 0, 255, 0.1)', color: 'var(--accent-secondary)', display: 'inline-flex', marginBottom: '1rem', width: '50px', height: '50px' }}>
            <UserPlus size={24} />
          </div>
          <h2 className="heading-lg" style={{ fontSize: '2rem' }}>Create Account</h2>
          <p className="text-secondary">Start building your premium career profile.</p>
        </div>

        {error && (
          <div className="glass" style={{ background: 'rgba(255,0,60,0.1)', borderColor: 'rgba(255,0,60,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
            <AlertCircle size={18} color="var(--accent-tertiary)" />
            <span style={{ fontSize: '0.875rem' }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input type="text" required className="input-field" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" required className="input-field" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" required className="input-field" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Create Account</button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
          <span className="text-secondary">Already have an account? </span>
          <Link to="/login" style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>Log in</Link>
        </div>
      </motion.div>
    </div>
  );
}

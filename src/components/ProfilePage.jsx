import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Plus, FileText, User, Edit2, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    setError('');
    const res = updateUser(editName, editEmail);
    if (res.success) {
      setIsEditing(false);
    } else {
      setError(res.error);
    }
  };

  if (!user) return null; // Prevent rendering if not logged in

  return (
    <div className="container" style={{ minHeight: '80vh', paddingTop: '3rem' }}>
      <div className="flex-between" style={{ marginBottom: '3rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="btn-icon" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', width: '60px', height: '60px' }}>
            <User size={30} className="text-secondary" />
          </div>
          <div>
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  className="input-field" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)} 
                  style={{ padding: '0.25rem 0.5rem', fontSize: '1.25rem', width: '250px' }} 
                />
                <input 
                  type="email" 
                  className="input-field" 
                  value={editEmail} 
                  onChange={(e) => setEditEmail(e.target.value)} 
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', width: '250px' }} 
                />
                {error && <span style={{ color: 'var(--accent-tertiary)', fontSize: '0.75rem' }}>{error}</span>}
              </div>
            ) : (
              <>
                <h1 className="heading-lg" style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Welcome, {user.name}</h1>
                <p className="text-secondary">{user.email}</p>
              </>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isEditing ? (
            <>
              <button onClick={() => { setIsEditing(false); setEditName(user.name); setEditEmail(user.email); setError(''); }} className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                <X size={18} /> Cancel
              </button>
              <button onClick={handleSave} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                <Save size={18} /> Save
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
              <Edit2 size={18} /> Edit Profile
            </button>
          )}
          <button onClick={handleLogout} className="btn btn-ghost" style={{ color: 'var(--accent-tertiary)' }}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      <div className="grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '300px' }}
        >
          <div className="btn-icon" style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-primary)', marginBottom: '1.5rem', width: '70px', height: '70px' }}>
            <Plus size={32} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Create New Resume</h3>
          <p className="text-secondary" style={{ marginBottom: '2rem' }}>Start building a new ATS-friendly resume and interactive 3D portfolio from scratch.</p>
          <Link to="/build" className="btn btn-primary" style={{ padding: '1rem 2rem', width: '100%' }}>
            Start Building
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '300px', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="btn-icon" style={{ background: 'rgba(112, 0, 255, 0.1)', color: 'var(--accent-secondary)', marginBottom: '1.5rem', width: '70px', height: '70px' }}>
            <FileText size={32} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Continue Editing</h3>
          <p className="text-secondary" style={{ marginBottom: '2rem' }}>Pick up where you left off. Edit your current resume draft or preview the final result.</p>
          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <Link to="/build" className="btn btn-secondary" style={{ flex: 1 }}>Edit Draft</Link>
            <Link to="/portfolio" className="btn btn-secondary" style={{ flex: 1 }}>View Portfolio</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

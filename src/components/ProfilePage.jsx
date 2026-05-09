import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Plus, FileText, User, Edit2, Save, X, Trash2, AlertTriangle, Eye, BarChart, CheckCircle2, CreditCard, Link as LinkIcon, Download, Copy, LayoutTemplate, Check } from 'lucide-react';

const LinkedinIcon = ({ size, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function ProfilePage() {
  const { user, logout, updateUser, deleteAccount } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  
  // Functional states
  const [resumeData, setResumeData] = useState(null);
  const [isLoadingResume, setIsLoadingResume] = useState(true);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Resume Deletion States
  const [showResumeDeleteConfirm, setShowResumeDeleteConfirm] = useState(false);
  const [isDeletingResume, setIsDeletingResume] = useState(false);

  const portfolioUrl = `geniuscv.com/${user?.name?.toLowerCase().replace(/\s+/g, '-') || 'user'}`;

  // Fetch real resume from Supabase
  useEffect(() => {
    const fetchResume = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('resumes')
          .select('updated_at')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setResumeData(data);
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
      } finally {
        setIsLoadingResume(false);
      }
    };
    fetchResume();
  }, [user]);

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

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    const res = await deleteAccount();
    setIsDeleting(false);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.error || 'Failed to delete account.');
      setShowDeleteConfirm(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDeleteResume = async () => {
    setIsDeletingResume(true);
    const { error } = await supabase.from('resumes').delete().eq('user_id', user.id);
    setIsDeletingResume(false);
    if (error) {
      showToast('Error deleting resume: ' + error.message);
    } else {
      setResumeData(null);
      setShowResumeDeleteConfirm(false);
      showToast('Resume deleted successfully!');
    }
  };

  if (!user) return null;

  return (
    <div className="container" style={{ minHeight: '100vh', paddingTop: '3rem', paddingBottom: '4rem', position: 'relative' }}>
      
      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            style={{ position: 'fixed', top: '2rem', left: '50%', background: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)', padding: '0.75rem 1.5rem', borderRadius: '30px', zIndex: 9999, boxShadow: '0 10px 25px rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: 600 }}
          >
            <AlertTriangle size={18} color="var(--accent-secondary)" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header Section */}
      <div className="flex-between" style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <div className="btn-icon" style={{ background: 'var(--bg-secondary)', border: '2px solid var(--accent-primary)', width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden' }}>
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff&size=80`} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <button onClick={() => showToast("Avatar upload feature coming soon!")} style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '50%', padding: '0.4rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <Edit2 size={12} />
            </button>
          </div>
          <div>
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input type="text" className="input-field" value={editName} onChange={(e) => setEditName(e.target.value)} style={{ padding: '0.25rem 0.5rem', fontSize: '1.25rem', width: '250px' }} />
                <input type="email" className="input-field" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', width: '250px' }} />
                {error && <span style={{ color: 'var(--accent-tertiary)', fontSize: '0.75rem' }}>{error}</span>}
              </div>
            ) : (
              <>
                <h1 className="heading-lg" style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{user.name}</h1>
                <p className="text-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {user.email} <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--accent-primary)', borderRadius: '12px' }}>PRO</span>
                </p>
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

      {/* 2. Quick Analytics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {[
          { label: 'Portfolio Views', value: resumeData ? '124' : '0', icon: <Eye size={20} color="#38bdf8" />, trend: resumeData ? '+12% this week' : 'No views yet' },
          { label: 'Average ATS Score', value: resumeData ? '92%' : 'N/A', icon: <BarChart size={20} color="#22c55e" />, trend: resumeData ? 'Top 5% of users' : 'Create a resume' },
          { label: 'Profile Completion', value: resumeData ? '85%' : '20%', icon: <CheckCircle2 size={20} color="#a855f7" />, trend: 'Add skills to reach 100%' }
        ].map((stat, idx) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div className="btn-icon" style={{ background: 'rgba(255,255,255,0.03)', width: '40px', height: '40px' }}>{stat.icon}</div>
            </div>
            <h4 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>{stat.value}</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>{stat.label}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      {/* 3. Main Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Resumes & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.5rem' }}>My Resumes</h3>
            <Link to="/build" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              <Plus size={16} /> New Resume
            </Link>
          </div>

          {isLoadingResume ? (
            <p className="text-secondary">Loading your resumes...</p>
          ) : resumeData ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ width: '45px', height: '60px', background: 'rgba(124, 58, 237, 0.1)', border: '1px solid var(--accent-primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LayoutTemplate size={20} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Main Professional Resume</h4>
                    <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
                      Last updated: {new Date(resumeData.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to="/build" className="btn btn-icon" title="Edit"><Edit2 size={16} /></Link>
                  <Link to="/portfolio" className="btn btn-icon" title="View Portfolio"><Eye size={16} /></Link>
                  <button onClick={() => setShowResumeDeleteConfirm(true)} className="btn btn-icon" title="Delete" style={{ color: '#ef4444' }}><Trash2 size={16} /></button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '3rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <FileText size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Resumes Yet</h4>
              <p className="text-secondary" style={{ marginBottom: '1.5rem' }}>You haven't created any resumes. Start building to see them here.</p>
              <Link to="/build" className="btn btn-primary" style={{ display: 'inline-flex' }}>Start Building</Link>
            </motion.div>
          )}

        </div>

        {/* RIGHT COLUMN: Settings & Plan */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Subscription Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '2rem', background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1.1rem' }}>Current Plan</h3>
              </div>
              <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--accent-primary)', color: 'white', borderRadius: '20px', fontWeight: 600 }}>Pro Member</span>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                <span>Resumes Created</span>
                <span>{resumeData ? '1' : '0'} / Unlimited</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: resumeData ? '5%' : '0%', height: '100%', background: 'var(--accent-primary)', borderRadius: '4px', transition: 'width 1s ease-in-out' }} />
              </div>
            </div>
            <button onClick={() => showToast("Billing Management is coming soon!")} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Manage Billing</button>
          </motion.div>

          {/* Portfolio Link */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LinkIcon size={18} /> Live Portfolio
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>Share this link with recruiters to showcase your 3D interactive portfolio.</p>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.6rem 0.8rem', fontSize: '0.85rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
                {portfolioUrl}
              </div>
              <button onClick={handleCopyLink} className="btn btn-primary" style={{ padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Copy Link">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </motion.div>

          {/* Linked Accounts */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LinkedinIcon size={18} color="#0077b5" /> Connected Accounts
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>Import your experience and skills directly from LinkedIn.</p>
            <button onClick={() => showToast("LinkedIn OAuth integration is coming soon!")} className="btn" style={{ width: '100%', justifyContent: 'center', background: 'rgba(0, 119, 181, 0.1)', color: '#0077b5', border: '1px solid rgba(0, 119, 181, 0.3)' }}>
              Connect LinkedIn
            </button>
          </motion.div>

          {/* Danger Zone */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card" style={{ padding: '2rem', borderLeft: '3px solid rgba(239, 68, 68, 0.7)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>
              <AlertTriangle size={18} /> Account Management
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Permanently delete your account and all associated data. This action is irreversible.
            </p>
            <button onClick={() => setShowDeleteConfirm(true)} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <Trash2 size={16} /> Delete Account
            </button>
          </motion.div>

        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card" style={{ padding: '2.5rem', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <AlertTriangle size={30} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Delete Account?</h3>
              <p className="text-secondary" style={{ marginBottom: '2rem' }}>Are you absolutely sure? This action cannot be undone. All your data will be permanently lost.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-secondary" style={{ flex: 1 }} disabled={isDeleting}>Cancel</button>
                <button onClick={handleDeleteAccount} className="btn" style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none' }} disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Resume Confirmation Modal */}
      <AnimatePresence>
        {showResumeDeleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card" style={{ padding: '2.5rem', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Trash2 size={30} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Delete Resume?</h3>
              <p className="text-secondary" style={{ marginBottom: '2rem' }}>Are you sure you want to delete this resume? You will have to build a new one from scratch.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setShowResumeDeleteConfirm(false)} className="btn btn-secondary" style={{ flex: 1 }} disabled={isDeletingResume}>Cancel</button>
                <button onClick={handleDeleteResume} className="btn" style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none' }} disabled={isDeletingResume}>
                  {isDeletingResume ? 'Deleting...' : 'Yes, Delete Resume'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

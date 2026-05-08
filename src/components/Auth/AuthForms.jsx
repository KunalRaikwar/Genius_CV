import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, AlertCircle, Mail, ShieldCheck, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

// ====== OTP INPUT COMPONENT ======
function OtpInput({ length = 6, onComplete }) {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Only digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    const fullOtp = newOtp.join('');
    if (fullOtp.length === length) {
      onComplete(fullOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    const newOtp = [...otp];
    pasted.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    if (pasted.length === length) {
      onComplete(pasted);
    }
    const nextIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  return (
    <div className="otp-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={el => inputsRef.current[index] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={`otp-input ${digit ? 'filled' : ''}`}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
}

// ====== LOGIN COMPONENT ======
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Small delay for UX feel
    await new Promise(r => setTimeout(r, 600));
    
    const res = login(email, password);
    if (res.success) {
      navigate('/profile');
    } else {
      setError(res.error);
    }
    setIsLoading(false);
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

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="glass" style={{ background: 'rgba(255,0,60,0.1)', borderColor: 'rgba(255,0,60,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}
            >
              <AlertCircle size={18} color="var(--accent-tertiary)" />
              <span style={{ fontSize: '0.875rem' }}>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" required className="input-field" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" required className="input-field" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ width: '100%', marginTop: '1rem' }}>
            {isLoading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Logging in...</> : 'Log In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
          <span className="text-secondary">Don't have an account? </span>
          <Link to="/signup" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
}

// ====== SIGNUP COMPONENT WITH OTP VERIFICATION ======
export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState('form'); // 'form' | 'otp' | 'success'
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // Countdown Timer for OTP
  useEffect(() => {
    if (step === 'otp' && countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timerRef.current);
  }, [step, countdown]);

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    console.log('🔐 Generated OTP:', otp); // For development/testing
    return otp;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!name.trim()) return setError('Please enter your full name.');
    if (!email.trim()) return setError('Please enter your email address.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    if (password !== confirmPassword) return setError('Passwords do not match.');

    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800)); // Simulate sending

    const otp = generateOtp();
    
    // Try sending OTP via EmailJS
    try {
      const emailjs = await import('@emailjs/browser');
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey && serviceId !== 'your_service_id') {
        const response = await emailjs.send(serviceId, templateId, {
          to_name: name,
          to_email: email,
          subject: 'Your GeniusCV Verification Code',
          message: `Your email verification code is: ${otp}\n\nThis code will expire in 60 seconds. Please do not share this code with anyone.\n\nBest regards,\nGeniusCV Team`
        }, publicKey);
        console.log('✅ OTP Email sent successfully!', response.status, response.text);
      } else {
        console.warn('EmailJS not configured. OTP logged to console.');
      }
    } catch (err) {
      console.error('❌ EmailJS Error:', err);
      console.warn('OTP is still available in console above. Enter it manually.');
    }

    setIsLoading(false);
    setStep('otp');
    setCountdown(60);
    setCanResend(false);
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(60);
    setOtpError('');
    
    const otp = generateOtp();
    console.log('🔐 Resent OTP:', otp);
    
    // Try resending via EmailJS
    try {
      const emailjs = await import('@emailjs/browser');
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey && serviceId !== 'your_service_id') {
        await emailjs.send(serviceId, templateId, {
          to_name: name,
          to_email: email,
          subject: 'Your GeniusCV Verification Code (Resent)',
          message: `Your new verification code is: ${otp}\n\nThis code will expire in 60 seconds.\n\nBest regards,\nGeniusCV Team`
        }, publicKey);
        console.log('✅ Resend email sent!');
      }
    } catch (err) {
      console.error('❌ EmailJS resend failed:', err);
    }
  };

  const handleVerifyOtp = async (enteredOtp) => {
    setOtpError('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 500));

    if (enteredOtp === generatedOtp) {
      // OTP verified — create account
      const res = signup(name, email, password);
      setIsLoading(false);
      if (res.success) {
        setStep('success');
        setTimeout(() => navigate('/profile'), 2000);
      } else {
        setOtpError(res.error);
      }
    } else {
      setIsLoading(false);
      setOtpError('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="container flex-center" style={{ minHeight: '80vh', position: 'relative', zIndex: 1 }}>
      <div style={{ position: 'absolute', top: '20%', left: '20%', width: '200px', height: '200px', background: 'rgba(112, 0, 255, 0.1)', borderRadius: '50%', filter: 'blur(50px)', zIndex: -1 }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card" style={{ padding: '3rem', width: '100%', maxWidth: '450px' }}
      >
        <AnimatePresence mode="wait">

          {/* ====== STEP 1: SIGNUP FORM ====== */}
          {step === 'form' && (
            <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div className="btn-icon" style={{ background: 'rgba(112, 0, 255, 0.1)', color: 'var(--accent-secondary)', display: 'inline-flex', marginBottom: '1rem', width: '50px', height: '50px' }}>
                  <UserPlus size={24} />
                </div>
                <h2 className="heading-lg" style={{ fontSize: '2rem' }}>Create Account</h2>
                <p className="text-secondary">Start building your premium career profile.</p>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="glass" style={{ background: 'rgba(255,0,60,0.1)', borderColor: 'rgba(255,0,60,0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}
                  >
                    <AlertCircle size={18} color="var(--accent-tertiary)" />
                    <span style={{ fontSize: '0.875rem' }}>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                  <input type="password" required className="input-field" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" />
                </div>
                <div className="input-group">
                  <label className="input-label">Confirm Password</label>
                  <input type="password" required className="input-field" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ width: '100%', marginTop: '1rem' }}>
                  {isLoading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Sending OTP...</> : <><Mail size={18} /> Verify Email & Sign Up</>}
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
                <span className="text-secondary">Already have an account? </span>
                <Link to="/login" style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>Log in</Link>
              </div>
            </motion.div>
          )}

          {/* ====== STEP 2: OTP VERIFICATION ====== */}
          {step === 'otp' && (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button 
                onClick={() => { setStep('form'); setOtpError(''); }} 
                className="btn btn-ghost" 
                style={{ padding: '0.25rem', marginBottom: '1rem', fontSize: '0.85rem' }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div className="btn-icon" style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-primary)', display: 'inline-flex', marginBottom: '1rem', width: '60px', height: '60px' }}>
                  <ShieldCheck size={28} />
                </div>
                <h2 className="heading-lg" style={{ fontSize: '1.75rem' }}>Verify Your Email</h2>
                <p className="text-secondary" style={{ marginTop: '0.5rem' }}>
                  We've sent a 6-digit code to<br />
                  <strong style={{ color: 'var(--accent-primary)' }}>{email}</strong>
                </p>
              </div>

              <OtpInput length={6} onComplete={handleVerifyOtp} />

              {isLoading && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent-primary)' }} />
                </div>
              )}

              <AnimatePresence>
                {otpError && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="glass" style={{ background: 'rgba(255,0,60,0.1)', borderColor: 'rgba(255,0,60,0.3)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}
                  >
                    <AlertCircle size={16} color="var(--accent-tertiary)" />
                    <span style={{ fontSize: '0.8rem' }}>{otpError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="countdown">
                {canResend ? (
                  <button onClick={handleResendOtp} className="btn btn-ghost" style={{ fontSize: '0.85rem', margin: '0 auto', color: 'var(--accent-primary)' }}>
                    Resend Code
                  </button>
                ) : (
                  <p>Resend code in <span>{countdown}s</span></p>
                )}
              </div>

              <p className="text-secondary" style={{ textAlign: 'center', fontSize: '0.75rem', marginTop: '1.5rem', lineHeight: 1.5 }}>
                💡 <strong>Tip:</strong> Check your browser console (F12) for the OTP if EmailJS is not configured.
              </p>
            </motion.div>
          )}

          {/* ====== STEP 3: SUCCESS ====== */}
          {step === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div className="success-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.1)', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={40} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <h2 className="heading-lg" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Account Created!</h2>
              <p className="text-secondary">Welcome to GeniusCV. Redirecting to your dashboard...</p>
              <div style={{ marginTop: '1.5rem' }}>
                <Loader2 size={20} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent-primary)' }} />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </div>
  );
}

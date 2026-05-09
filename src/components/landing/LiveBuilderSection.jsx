import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function LiveBuilderSection() {
  const navigate = useNavigate();
  const [demo, setDemo] = useState({
    name: 'Neha Sharma',
    title: 'Data Scientist',
    email: 'neha.sharma@email.com',
    phone: '+91 99887 76655',
    location: 'Bangalore, India',
    summary: 'Data scientist with 4+ years of experience in machine learning, NLP, and predictive analytics. Built recommendation engines at Amazon and fraud detection systems at PayPal processing $2B+ in transactions. Passionate about turning raw data into actionable business insights.',
  });

  return (
    <section className="landing-section" style={{ background: 'rgba(124,58,237,0.03)' }}>
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="section-badge"><Sparkles size={14} /> Live Preview</div>
          <h2 className="heading-lg">Build & Preview in <span className="text-gradient">Real-Time</span></h2>
          <p className="text-lead" style={{ maxWidth: '550px', margin: '1rem auto 0' }}>See your resume update instantly as you type. No more guessing.</p>
        </motion.div>

        <motion.div className="builder-demo" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          {/* Form Side */}
          <div className="builder-form">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>📝 Your Details</h3>
            {[
              { label: 'Full Name', key: 'name' },
              { label: 'Job Title', key: 'title' },
              { label: 'Email', key: 'email' },
              { label: 'Phone', key: 'phone' },
              { label: 'Location', key: 'location' },
            ].map(f => (
              <div className="input-group" key={f.key}>
                <label className="input-label">{f.label}</label>
                <input className="input-field" value={demo[f.key]} onChange={e => setDemo({ ...demo, [f.key]: e.target.value })} />
              </div>
            ))}
            <div className="input-group">
              <label className="input-label">Professional Summary</label>
              <textarea className="input-field" rows={3} value={demo.summary} onChange={e => setDemo({ ...demo, summary: e.target.value })} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" className="btn ai-btn" onClick={() => navigate('/build')} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}>
                  <Sparkles size={14} /> Enhance with AI
                </button>
              </div>
            </div>
            
            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => navigate('/build')} style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
                Next Step →
              </button>
            </div>
          </div>

          {/* Resume Preview Side — Fully Filled */}
          <div className="builder-preview" style={{ fontSize: '0.85rem' }}>
            {/* Header */}
            <div style={{ borderBottom: '2.5px solid #7C3AED', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', fontFamily: 'Poppins, sans-serif', margin: 0 }}>{demo.name || 'Your Name'}</h2>
              <p style={{ color: '#7C3AED', fontWeight: 600, fontSize: '0.95rem', margin: '2px 0' }}>{demo.title || 'Job Title'}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>
                <span>✉ {demo.email || 'email'}</span>
                <span>📱 {demo.phone || 'phone'}</span>
                <span>📍 {demo.location || 'location'}</span>
              </div>
            </div>

            {/* Summary */}
            <div style={{ marginBottom: '0.9rem' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.2rem' }}>Professional Summary</h3>
              <p style={{ fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>{demo.summary || 'Your summary...'}</p>
            </div>

            {/* Experience */}
            <div style={{ marginBottom: '0.9rem' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.2rem' }}>Work Experience</h3>
              <div style={{ paddingLeft: '0.6rem', borderLeft: '2px solid #7C3AED', marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, color: '#111827', fontSize: '0.82rem' }}>ML Engineer — Amazon</span>
                  <span style={{ color: '#7C3AED', fontWeight: 600, fontSize: '0.72rem' }}>2022–Present</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#4B5563', lineHeight: 1.5 }}>
                  • Built product recommendation engine increasing CTR by 28%<br/>
                  • Developed NLP pipeline processing 5M+ customer reviews daily<br/>
                  • Reduced model inference latency from 200ms to 45ms
                </div>
              </div>
              <div style={{ paddingLeft: '0.6rem', borderLeft: '2px solid #06B6D4' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, color: '#111827', fontSize: '0.82rem' }}>Data Analyst — PayPal</span>
                  <span style={{ color: '#06B6D4', fontWeight: 600, fontSize: '0.72rem' }}>2020–2022</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#4B5563', lineHeight: 1.5 }}>
                  • Built fraud detection model flagging $500M+ suspicious transactions<br/>
                  • Created automated reporting dashboards for C-suite executives
                </div>
              </div>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: '0.9rem' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.2rem' }}>Skills</h3>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas', 'Scikit-learn', 'AWS SageMaker', 'Tableau'].map(s => (
                  <span key={s} style={{ padding: '0.2rem 0.6rem', background: '#F3F4F6', borderRadius: '99px', fontSize: '0.72rem', color: '#374151', fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.2rem' }}>Education</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: '#111827', fontSize: '0.82rem' }}>M.Tech Data Science — IISc Bangalore</span>
                <span style={{ color: '#6B7280', fontSize: '0.72rem' }}>2018–2020</span>
              </div>
              <div style={{ fontSize: '0.76rem', color: '#6B7280' }}>CGPA: 9.2 / 10</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

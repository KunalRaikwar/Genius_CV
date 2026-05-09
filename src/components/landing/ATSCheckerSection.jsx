import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ATSCheckerSection() {
  const [score] = useState(87);
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#F59E0B' : '#EF4444';

  const keywords = [
    { word: 'React', found: true }, { word: 'Node.js', found: true },
    { word: 'TypeScript', found: false }, { word: 'REST API', found: true },
    { word: 'Agile', found: false }, { word: 'CI/CD', found: true },
  ];

  return (
    <section className="landing-section" style={{ background: 'rgba(6,182,212,0.03)' }}>
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="section-badge">🎯 ATS Checker</div>
          <h2 className="heading-lg">Check Your <span className="text-gradient">ATS Score</span></h2>
          <p className="text-lead" style={{ maxWidth: '550px', margin: '1rem auto 0' }}>Optimize your resume to pass Applicant Tracking Systems with confidence.</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}>

          {/* Score Side */}
          <div style={{ textAlign: 'center' }}>
            <div className="ats-meter" style={{ marginBottom: '1.5rem' }}>
              <svg width="180" height="180">
                <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <motion.circle cx="90" cy="90" r={radius} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} whileInView={{ strokeDashoffset: offset }}
                  viewport={{ once: true }} transition={{ duration: 1.5, ease: 'easeOut' }} />
              </svg>
              <div className="ats-score-text" style={{ color }}>{score}%</div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Great Score! Your resume is ATS-ready.</p>
          </div>

          {/* Keywords Side */}
          <div style={{ background: 'rgba(17,24,39,0.6)', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Keyword Analysis</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {keywords.map(k => (
                <div key={k.word} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.95rem' }}>{k.word}</span>
                  {k.found ? <CheckCircle size={18} style={{ color: '#22c55e' }} /> : <AlertTriangle size={18} style={{ color: '#F59E0B' }} />}
                </div>
              ))}
            </div>
            <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              💡 Tip: Add missing keywords from the job description to improve your score.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

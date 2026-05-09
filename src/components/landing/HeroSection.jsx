import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Eye, CheckCircle, Zap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

function ResumeCard() {
  const t = { n: '0.3rem', xs: '0.35rem', s: '0.4rem', m: '0.45rem', h: '0.5rem', xl: '0.75rem' };
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '36%', background: '#1E293B', padding: '1rem 0.6rem', color: '#fff' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#7C3AED,#06B6D4)', margin: '0 auto 0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '-0.02em' }}>AK</div>
        <div style={{ textAlign: 'center', marginBottom: '0.6rem', lineHeight: 1.35 }}>
          <div style={{ fontSize: t.xs, color: '#94A3B8' }}>alex.kumar@email.com</div>
          <div style={{ fontSize: t.xs, color: '#94A3B8' }}>+91 98765 43210</div>
          <div style={{ fontSize: t.xs, color: '#94A3B8' }}>Mumbai, Maharashtra</div>
          <div style={{ fontSize: t.xs, color: '#60A5FA' }}>linkedin.com/in/alexkumar</div>
        </div>

        {/* Skills */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.45rem', marginBottom: '0.45rem' }}>
          <div style={{ fontSize: t.n, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7C3AED', marginBottom: '0.3rem' }}>Technical Skills</div>
          {[
            { name: 'React / Next.js', w: 92 }, { name: 'Node.js / Express', w: 88 },
            { name: 'Python / Django', w: 80 }, { name: 'TypeScript', w: 85 },
            { name: 'MongoDB / PostgreSQL', w: 82 }, { name: 'AWS / Docker', w: 75 },
          ].map(s => (
            <div key={s.name} style={{ marginBottom: '0.2rem' }}>
              <div style={{ fontSize: t.n, color: '#CBD5E1', marginBottom: '1px' }}>{s.name}</div>
              <div style={{ width: '100%', height: '2.5px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
                <div style={{ width: `${s.w}%`, height: '100%', background: 'linear-gradient(90deg,#7C3AED,#06B6D4)', borderRadius: '2px' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.4rem', marginBottom: '0.4rem' }}>
          <div style={{ fontSize: t.n, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7C3AED', marginBottom: '0.25rem' }}>Education</div>
          <div style={{ fontSize: t.xs, color: '#E2E8F0', fontWeight: 600 }}>B.Tech Computer Science</div>
          <div style={{ fontSize: t.n, color: '#94A3B8' }}>IIT Bombay • 2018–2022</div>
          <div style={{ fontSize: t.n, color: '#94A3B8' }}>CGPA: 8.7 / 10</div>
        </div>

        {/* Certifications */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.4rem' }}>
          <div style={{ fontSize: t.n, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7C3AED', marginBottom: '0.25rem' }}>Certifications</div>
          <div style={{ fontSize: t.n, color: '#94A3B8', lineHeight: 1.4 }}>• AWS Solutions Architect</div>
          <div style={{ fontSize: t.n, color: '#94A3B8', lineHeight: 1.4 }}>• Google Cloud Professional</div>
          <div style={{ fontSize: t.n, color: '#94A3B8', lineHeight: 1.4 }}>• Meta React Developer</div>
        </div>
      </div>

      {/* Main */}
      <div style={{ width: '64%', padding: '1rem 0.7rem', background: '#fff' }}>
        <div style={{ marginBottom: '0.5rem', borderBottom: '2px solid #7C3AED', paddingBottom: '0.35rem' }}>
          <div style={{ fontSize: t.xl, fontWeight: 800, color: '#111827', fontFamily: 'Poppins, sans-serif', lineHeight: 1.1 }}>Alex Kumar</div>
          <div style={{ fontSize: t.m, fontWeight: 600, color: '#7C3AED' }}>Senior Full Stack Developer</div>
        </div>

        {/* Summary */}
        <div style={{ marginBottom: '0.45rem' }}>
          <div style={{ fontSize: t.s, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#374151', marginBottom: '0.15rem' }}>Professional Summary</div>
          <div style={{ fontSize: t.n, color: '#6B7280', lineHeight: 1.45 }}>Results-driven full-stack developer with 4+ years of experience building high-performance web applications. Led cross-functional teams at Google, delivering products serving 10M+ users. Expert in React, Node.js, and cloud architecture.</div>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: '0.45rem' }}>
          <div style={{ fontSize: t.s, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#374151', marginBottom: '0.2rem' }}>Work Experience</div>

          <div style={{ marginBottom: '0.3rem', paddingLeft: '0.3rem', borderLeft: '1.5px solid #7C3AED' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: t.xs, fontWeight: 700, color: '#111827' }}>SDE II — Google</div>
              <div style={{ fontSize: t.n, color: '#7C3AED', fontWeight: 600 }}>2023–Present</div>
            </div>
            <div style={{ fontSize: t.n, color: '#6B7280', lineHeight: 1.4 }}>• Led migration of legacy APIs to microservices, reducing latency by 40%</div>
            <div style={{ fontSize: t.n, color: '#6B7280', lineHeight: 1.4 }}>• Built real-time analytics dashboard processing 5M+ events/day</div>
            <div style={{ fontSize: t.n, color: '#6B7280', lineHeight: 1.4 }}>• Mentored team of 4 junior developers in React best practices</div>
          </div>

          <div style={{ marginBottom: '0.3rem', paddingLeft: '0.3rem', borderLeft: '1.5px solid #06B6D4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: t.xs, fontWeight: 700, color: '#111827' }}>SDE I — Flipkart</div>
              <div style={{ fontSize: t.n, color: '#06B6D4', fontWeight: 600 }}>2022–2023</div>
            </div>
            <div style={{ fontSize: t.n, color: '#6B7280', lineHeight: 1.4 }}>• Developed real-time inventory dashboard serving 2M+ daily users</div>
            <div style={{ fontSize: t.n, color: '#6B7280', lineHeight: 1.4 }}>• Reduced page load time by 60% through code splitting & lazy loading</div>
          </div>
        </div>

        {/* Projects */}
        <div style={{ marginBottom: '0.4rem' }}>
          <div style={{ fontSize: t.s, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#374151', marginBottom: '0.15rem' }}>Key Projects</div>
          <div style={{ fontSize: t.xs, fontWeight: 600, color: '#111827' }}>AI Resume Builder — React, Node.js, Gemini AI</div>
          <div style={{ fontSize: t.n, color: '#6B7280', lineHeight: 1.4 }}>• SaaS platform with 10K+ users, AI-powered content optimization</div>
          <div style={{ fontSize: t.xs, fontWeight: 600, color: '#111827', marginTop: '0.15rem' }}>E-Commerce Platform — Next.js, Stripe, MongoDB</div>
          <div style={{ fontSize: t.n, color: '#6B7280', lineHeight: 1.4 }}>• Full-stack marketplace with payment integration & admin dashboard</div>
        </div>

        {/* Languages */}
        <div>
          <div style={{ fontSize: t.s, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#374151', marginBottom: '0.15rem' }}>Languages</div>
          <div style={{ fontSize: t.n, color: '#6B7280' }}>English (Fluent) • Hindi (Native) • Marathi (Native)</div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '1rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', left: '15%', width: '400px', height: '400px', background: 'rgba(124,58,237,0.12)', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '350px', height: '350px', background: 'rgba(6,182,212,0.08)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <motion.div variants={fadeUp} className="section-badge">
              <Sparkles size={14} /> AI-Powered Resume Builder
            </motion.div>
            <motion.h1 variants={fadeUp} className="heading-xl" style={{ marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Build <span className="text-gradient">ATS-Friendly</span> Resume with AI
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lead" style={{ marginBottom: '2.5rem', maxWidth: '520px' }}>
              Create professional resumes, optimize for ATS systems, and land your dream job faster. Trusted by 10,000+ professionals.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
                Create Resume <ArrowRight size={18} />
              </Link>
              <a href="#templates" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
                View Templates <Eye size={18} />
              </a>
            </motion.div>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              {['ATS-Optimized', 'AI-Enhanced', 'Free to Start'].map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={16} style={{ color: '#22c55e' }} /> {t}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="hide-on-mobile" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '340px', height: '480px', borderRadius: '8px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', position: 'relative', zIndex: 2, overflow: 'hidden' }}>
              <ResumeCard />
            </motion.div>

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ position: 'absolute', top: '-10px', right: '-20px', background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(16px)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', padding: '1rem 1.25rem', zIndex: 3 }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ATS Score</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg,#22c55e,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>95%</div>
            </motion.div>

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{ position: 'absolute', bottom: '30px', left: '-30px', background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(16px)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '12px', padding: '0.75rem 1rem', zIndex: 3, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={14} style={{ color: '#FBBF24' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>AI: "Add metrics to boost impact"</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

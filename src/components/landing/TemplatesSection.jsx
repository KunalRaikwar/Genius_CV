import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { resumeData } from './resumeData';
import ResumeModal from './ResumeModal';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const templates = [
  { key: 'modern', name: 'Modern', desc: 'Sleek sidebar layout', color: '#7C3AED' },
  { key: 'minimal', name: 'Minimal', desc: 'Clean & simple', color: '#111827' },
  { key: 'developer', name: 'Developer', desc: 'Tech-focused design', color: '#06B6D4' },
  { key: 'fresher', name: 'Fresher', desc: 'Perfect for new grads', color: '#8B5CF6' },
  { key: 'executive', name: 'Executive', desc: 'Corporate standard', color: '#1E293B' },
  { key: 'creative', name: 'Creative', desc: 'Bold & unique', color: '#EC4899' },
];

/* ============ MINI CARD PREVIEW ============ */
function MiniResume({ data, color }) {
  const f = { t: '0.3rem', x: '0.35rem', s: '0.4rem', m: '0.48rem', h: '0.55rem' };
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ width: '34%', background: color, padding: '0.6rem 0.4rem', color: '#fff' }}>
        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', margin: '0 auto 0.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: f.x, fontWeight: 700 }}>{data.name.split(' ').map(n => n[0]).join('')}</div>
        <div style={{ textAlign: 'center', fontSize: f.t, color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
          <div>{data.email.split('@')[0]}@...</div>
          <div>{data.phone}</div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '0.3rem', marginBottom: '0.3rem' }}>
          <div style={{ fontSize: f.t, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)', marginBottom: '0.2rem' }}>Skills</div>
          {data.skills.slice(0, 4).map(s => (
            <div key={s.name} style={{ marginBottom: '0.15rem' }}>
              <div style={{ fontSize: f.t, color: 'rgba(255,255,255,0.6)', marginBottom: '1px' }}>{s.name.split('/')[0].trim()}</div>
              <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px' }}>
                <div style={{ width: `${s.w}%`, height: '100%', background: 'rgba(255,255,255,0.5)', borderRadius: '1px' }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '0.3rem' }}>
          <div style={{ fontSize: f.t, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)', marginBottom: '0.15rem' }}>Education</div>
          <div style={{ fontSize: f.t, color: 'rgba(255,255,255,0.6)' }}>{data.education.degree.split(' ').slice(0, 2).join(' ')}</div>
          <div style={{ fontSize: f.t, color: 'rgba(255,255,255,0.5)' }}>{data.education.school}</div>
        </div>
      </div>
      <div style={{ width: '66%', background: '#FAFAFA', padding: '0.6rem 0.5rem' }}>
        <div style={{ marginBottom: '0.3rem', borderBottom: `1.5px solid ${color}`, paddingBottom: '0.2rem' }}>
          <div style={{ fontSize: f.h, fontWeight: 800, color: '#111827' }}>{data.name}</div>
          <div style={{ fontSize: f.x, fontWeight: 600, color }}>{data.title.split('—')[0].trim()}</div>
        </div>
        <div style={{ marginBottom: '0.25rem' }}>
          <div style={{ fontSize: f.s, fontWeight: 700, color: '#374151', marginBottom: '0.1rem' }}>Experience</div>
          {data.experience.slice(0, 2).map(e => (
            <div key={e.company} style={{ marginBottom: '0.15rem' }}>
              <div style={{ fontSize: f.x, fontWeight: 700, color: '#111827' }}>{e.role.split('—')[0]} • {e.company}</div>
              <div style={{ fontSize: f.t, color: '#6B7280', lineHeight: 1.3 }}>• {e.bullets[0].substring(0, 55)}...</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: f.s, fontWeight: 700, color: '#374151', marginBottom: '0.1rem' }}>Projects</div>
          <div style={{ fontSize: f.x, fontWeight: 600, color: '#111827' }}>{data.projects[0].name}</div>
          <div style={{ fontSize: f.t, color: '#6B7280' }}>• {data.projects[0].desc.substring(0, 50)}...</div>
        </div>
      </div>
    </div>
  );
}



/* ============ MAIN SECTION ============ */
export default function TemplatesSection() {
  const [selected, setSelected] = useState(null);
  const selectedData = selected ? resumeData[selected.key] : null;

  return (
    <section id="templates" className="landing-section">
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="section-badge">🎨 Templates</div>
          <h2 className="heading-lg">Professional <span className="text-gradient">ATS Templates</span></h2>
          <p className="text-lead" style={{ maxWidth: '550px', margin: '1rem auto 0' }}>Click any template to preview the full resume. Hand-crafted to pass ATS systems.</p>
        </motion.div>
        <motion.div className="templates-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          {templates.map(t => (
            <motion.div key={t.key} variants={fadeUp} className="template-card" onClick={() => setSelected(t)} style={{ cursor: 'pointer' }}>
              <div className="template-preview"><MiniResume data={resumeData[t.key]} color={t.color} /></div>
              <div className="template-info">
                <div>
                  <h3>{t.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.desc}</p>
                </div>
                <span className="ats-badge">ATS ✓</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/signup" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>Use Templates Free →</Link>
        </div>
      </div>

      <AnimatePresence>
        {selected && selectedData && (
          <ResumeModal templateKey={selected.key} data={selectedData} color={selected.color} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

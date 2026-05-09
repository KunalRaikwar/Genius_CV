import { motion } from 'framer-motion';
import { UserPlus, LayoutTemplate, Download } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function HowItWorksSection() {
  const steps = [
    { icon: <UserPlus size={24} />, title: 'Fill Your Details', desc: 'Enter your personal info, education, experience, and skills in our intuitive form wizard.' },
    { icon: <LayoutTemplate size={24} />, title: 'Choose ATS Template', desc: 'Select from our collection of professionally designed, ATS-optimized resume templates.' },
    { icon: <Download size={24} />, title: 'Download Resume PDF', desc: 'Export your polished resume as a pixel-perfect PDF ready for any job application.' },
  ];

  return (
    <section id="features" className="landing-section">
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="section-badge">How It Works</div>
          <h2 className="heading-lg">Three Steps to Your <span className="text-gradient">Dream Resume</span></h2>
          <p className="text-lead" style={{ maxWidth: '550px', margin: '1rem auto 0' }}>Our streamlined process gets you from zero to a professional resume in minutes.</p>
        </motion.div>
        <motion.div className="steps-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.15 } } }}>
          {steps.map((s, i) => (
            <motion.div key={s.title} variants={fadeUp} className="step-card">
              <div className="step-number">{i + 1}</div>
              <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Eye, LayoutGrid, Download, PenTool, Lightbulb, Moon, BarChart3, Globe } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function FeaturesSection() {
  const features = [
    { icon: <Sparkles size={22} />, title: 'AI Resume Generator', desc: 'Let AI craft compelling bullet points and summaries from your raw input.', color: '#7C3AED' },
    { icon: <ShieldCheck size={22} />, title: 'ATS Score Checker', desc: 'Instant feedback on how well your resume passes applicant tracking systems.', color: '#06B6D4' },
    { icon: <Eye size={22} />, title: 'Live Resume Preview', desc: 'See changes in real-time as you type. What you see is what you get.', color: '#22c55e' },
    { icon: <LayoutGrid size={22} />, title: 'Multiple Templates', desc: 'Choose from Modern, Minimal, Creative, Professional, and Photo styles.', color: '#F59E0B' },
    { icon: <Download size={22} />, title: 'One-Click PDF Export', desc: 'Download your resume as a high-quality, print-ready PDF instantly.', color: '#EF4444' },
    { icon: <PenTool size={22} />, title: 'AI Summary Generator', desc: 'Generate impactful professional summaries tailored to your experience.', color: '#8B5CF6' },
    { icon: <Lightbulb size={22} />, title: 'Skill Suggestions', desc: 'AI recommends relevant skills based on your job title and industry.', color: '#14B8A6' },
    { icon: <Moon size={22} />, title: 'Dark Mode', desc: 'Easy on the eyes. Build your resume comfortably day or night.', color: '#64748B' },
    { icon: <BarChart3 size={22} />, title: 'Resume Analytics', desc: 'Track keyword density, readability scores, and optimization tips.', color: '#EC4899' },
    { icon: <Globe size={22} />, title: 'Portfolio Generator', desc: 'Convert your resume into a stunning interactive web portfolio.', color: '#06B6D4' },
  ];

  return (
    <section className="landing-section">
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="section-badge">✨ Features</div>
          <h2 className="heading-lg">Everything You Need to <span className="text-gradient">Stand Out</span></h2>
          <p className="text-lead" style={{ maxWidth: '550px', margin: '1rem auto 0' }}>Powerful tools designed to give you an unfair advantage in the job market.</p>
        </motion.div>
        <motion.div className="features-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
          {features.map(f => (
            <motion.div key={f.title} variants={fadeUp} className="feature-card">
              <div className="feature-icon" style={{ background: `${f.color}15`, color: f.color }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

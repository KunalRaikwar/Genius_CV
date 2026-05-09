import { motion } from 'framer-motion';
import { Users, TrendingUp, Star, Shield } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TrustSection() {
  const stats = [
    { icon: <Users size={20} />, number: '10,000+', label: 'Resumes Created' },
    { icon: <TrendingUp size={20} />, number: '95%', label: 'ATS Success Rate' },
    { icon: <Star size={20} />, number: '4.9★', label: 'User Rating' },
    { icon: <Shield size={20} />, number: '100%', label: 'Free to Start' },
  ];

  const logos = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'];

  return (
    <section className="landing-section" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="container">
        <motion.div className="trust-bar" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          {stats.map(s => (
            <motion.div key={s.label} variants={fadeUp} className="trust-item">
              <div className="trust-number">{s.number}</div>
              <div className="trust-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>Trusted by professionals at</p>
          <div className="logo-cloud">
            {logos.map(l => <span key={l}>{l}</span>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const plans = [
  {
    name: 'Free', price: '$0', period: 'forever', popular: false,
    features: ['1 Resume', '3 Templates', 'PDF Download', 'Basic ATS Check', 'AI Summary (3/day)'],
  },
  {
    name: 'Pro', price: '$9', period: '/month', popular: true,
    features: ['Unlimited Resumes', 'All Templates', 'PDF Download', 'Full ATS Checker', 'Unlimited AI', 'Priority Support', 'Resume Analytics'],
  },
  {
    name: 'Premium', price: '$19', period: '/month', popular: false,
    features: ['Everything in Pro', 'Portfolio Generator', 'Custom Domain', 'Team Collaboration', 'API Access', 'White Label', 'Dedicated Support'],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="landing-section">
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="section-badge">💎 Pricing</div>
          <h2 className="heading-lg">Simple, <span className="text-gradient">Transparent</span> Pricing</h2>
          <p className="text-lead" style={{ maxWidth: '500px', margin: '1rem auto 0' }}>Start free. Upgrade when you need more power.</p>
        </motion.div>
        <motion.div className="pricing-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
          {plans.map(p => (
            <motion.div key={p.name} variants={fadeUp} className={`pricing-card ${p.popular ? 'popular' : ''}`}>
              {p.popular && <div className="popular-badge">Most Popular</div>}
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{p.name}</h3>
              <div className="pricing-price">{p.price}<span> {p.period}</span></div>
              <ul className="pricing-features">
                {p.features.map(f => (
                  <li key={f}><CheckCircle size={16} style={{ color: '#22c55e', flexShrink: 0 }} /> {f}</li>
                ))}
              </ul>
              <Link to="/signup" className={`btn ${p.popular ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                {p.price === '$0' ? 'Get Started Free' : 'Start Free Trial'}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

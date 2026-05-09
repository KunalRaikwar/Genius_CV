import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const faqs = [
  { q: 'Is the resume ATS-friendly?', a: 'Yes! All our templates are specifically designed to pass Applicant Tracking Systems. We use clean formatting, standard fonts, and proper heading structures that ATS software can easily parse.' },
  { q: 'Can I download my resume as PDF?', a: 'Absolutely! You can download your resume as a high-quality, print-ready PDF with just one click. The PDF maintains perfect formatting across all devices and printers.' },
  { q: 'Is AI resume generation free?', a: 'Yes, our free plan includes 3 AI-powered enhancements per day. Upgrade to Pro for unlimited AI suggestions, summaries, and skill recommendations.' },
  { q: 'Can I edit my resume later?', a: 'Of course! Your resume data is saved and you can come back anytime to make changes, update information, or try different templates.' },
  { q: 'How many templates are available?', a: 'We offer 5+ professionally designed templates including Modern, Minimal, Creative, Professional, and Photo styles. More templates are added regularly.' },
  { q: 'Is my data secure?', a: 'Your privacy is our priority. All data is encrypted and stored securely. We never share your personal information with third parties.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section className="landing-section" style={{ background: 'rgba(124,58,237,0.02)' }}>
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="section-badge">❓ FAQ</div>
          <h2 className="heading-lg">Frequently Asked <span className="text-gradient">Questions</span></h2>
        </motion.div>
        <motion.div className="faq-list" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
          {faqs.map((f, i) => (
            <motion.div key={i} variants={fadeUp} className="faq-item">
              <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <ChevronDown size={18} style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', color: 'var(--text-muted)' }} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="faq-answer">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

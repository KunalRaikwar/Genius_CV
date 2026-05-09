import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const reviews = [
  { name: 'Priya Sharma', role: 'Software Developer', initial: 'PS', review: 'Genius CV helped me land my dream job at a top tech company! The ATS optimization made all the difference.' },
  { name: 'Rahul Verma', role: 'Data Analyst', initial: 'RV', review: 'The AI suggestions were incredibly helpful. My resume went from average to outstanding in minutes.' },
  { name: 'Sneha Patel', role: 'UX Designer', initial: 'SP', review: 'Beautiful templates and super easy to use. I got interview calls within a week of using my new resume.' },
  { name: 'Arjun Mehta', role: 'Full Stack Dev', initial: 'AM', review: 'The live preview feature is amazing. I could see exactly how my resume would look while editing.' },
  { name: 'Kavya Nair', role: 'Product Manager', initial: 'KN', review: 'Best resume builder I have used. The ATS score checker gave me confidence my resume would get through.' },
];

export default function TestimonialsSection() {
  const trackRef = useRef(null);
  const scroll = (dir) => {
    if (trackRef.current) trackRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="landing-section">
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="section-badge">💬 Reviews</div>
          <h2 className="heading-lg">Loved by <span className="text-gradient">Thousands</span></h2>
          <p className="text-lead" style={{ maxWidth: '500px', margin: '1rem auto 0' }}>See what our users have to say about their experience.</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ position: 'relative' }}>
          <div className="testimonials-track" ref={trackRef}>
            {reviews.map(r => (
              <div key={r.name} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>"{r.review}"</p>
                <div className="testimonial-header" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
                  <div className="testimonial-avatar">{r.initial}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{r.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <button onClick={() => scroll(-1)} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', width: '40px', height: '40px' }}><ChevronLeft size={20} /></button>
            <button onClick={() => scroll(1)} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', width: '40px', height: '40px' }}><ChevronRight size={20} /></button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

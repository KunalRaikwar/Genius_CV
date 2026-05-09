import { Sparkles, ExternalLink, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Sparkles size={22} style={{ color: 'var(--accent-primary)' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem' }}>Genius CV</span>
            </div>
            <p>Build ATS-friendly, professional resumes with the power of AI. Land your dream job faster with Genius CV.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#templates">Templates</a>
            <a href="#pricing">Pricing</a>
            <a href="#reviews">Reviews</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href="#">Blog</a>
            <a href="#">Resume Tips</a>
            <a href="#">ATS Guide</a>
            <a href="#">Help Center</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Genius CV. All rights reserved.
            <span style={{ opacity: 0.6, marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
              Crafted by Kunal Raikwar
            </span>
          </p>
          <div className="social-links">
            <a href="#" aria-label="GitHub"><ExternalLink size={16} /></a>
            <a href="#" aria-label="Twitter"><ExternalLink size={16} /></a>
            <a href="#" aria-label="LinkedIn"><ExternalLink size={16} /></a>
            <a href="#" aria-label="Email"><Mail size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

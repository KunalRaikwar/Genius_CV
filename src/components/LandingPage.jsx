import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, FileText, Globe, Layers, Zap } from 'lucide-react';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const floatAnimation = {
    y: [0, -15, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      
      {/* Background Orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: '300px', height: '300px', background: 'rgba(112, 0, 255, 0.15)', borderRadius: '50%', filter: 'blur(80px)', zIndex: -1 }} />
      <div style={{ position: 'absolute', top: '40%', right: '10%', width: '250px', height: '250px', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '50%', filter: 'blur(60px)', zIndex: -1 }} />

      <motion.div 
        className="flex-center" 
        style={{ flexDirection: 'column', minHeight: '85vh', textAlign: 'center', paddingTop: '4rem' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
          <motion.div 
            className="glass" 
            style={{ padding: '0.6rem 1.2rem', borderRadius: '2rem', fontSize: '0.875rem', color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(0, 240, 255, 0.3)' }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={16} className="text-gradient" /> 
            <span>Next-Gen AI Career Builder 2.0</span>
          </motion.div>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="heading-xl" style={{ maxWidth: '900px', marginBottom: '1.5rem' }}>
          Design Your <span className="text-gradient">Dream Future</span> with Intelligent Automation
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-lead" style={{ maxWidth: '650px', marginBottom: '3rem' }}>
          Input your details in plain English. Our advanced AI crafts ATS-optimized resumes and generates breathtaking 3D portfolios instantly.
        </motion.p>
        
        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/build" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.125rem' }}>
            Start Building Free <ArrowRight size={20} />
          </Link>
          <Link to="/portfolio" className="btn btn-secondary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.125rem' }}>
            View Demo <Globe size={20} />
          </Link>
        </motion.div>

        {/* Floating Mockup Preview Elements */}
        <motion.div variants={itemVariants} style={{ marginTop: '5rem', position: 'relative', width: '100%', height: '200px', display: 'flex', justifyContent: 'center', perspective: '1000px' }}>
          <motion.div 
            animate={floatAnimation}
            className="glass-card" 
            style={{ position: 'absolute', width: '300px', height: '180px', left: 'calc(50% - 350px)', transform: 'rotateY(15deg) rotateX(5deg)', padding: '1.5rem', opacity: 0.8 }}
          >
            <div style={{ width: '40%', height: '12px', background: 'var(--text-secondary)', borderRadius: '4px', marginBottom: '1rem' }} />
            <div style={{ width: '80%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', marginBottom: '0.5rem' }} />
            <div style={{ width: '60%', height: '8px', background: 'var(--border-color)', borderRadius: '4px' }} />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, -20, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
            className="glass-card" 
            style={{ position: 'absolute', width: '350px', height: '220px', zIndex: 10, padding: '2rem', border: '1px solid rgba(0, 240, 255, 0.4)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}
          >
             <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-gradient)' }} />
                <div style={{ width: '60px', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
             </div>
             <div style={{ width: '100%', height: '20px', background: 'var(--text-primary)', borderRadius: '4px', marginBottom: '0.5rem', opacity: 0.9 }} />
             <div style={{ width: '70%', height: '12px', background: 'var(--text-secondary)', borderRadius: '4px' }} />
          </motion.div>

          <motion.div 
            animate={floatAnimation}
            className="glass-card" 
            style={{ position: 'absolute', width: '300px', height: '180px', right: 'calc(50% - 350px)', transform: 'rotateY(-15deg) rotateX(5deg)', padding: '1.5rem', opacity: 0.8 }}
          >
            <div className="grid-cols-2" style={{ gap: '0.5rem' }}>
              <div style={{ height: '60px', background: 'var(--border-color)', borderRadius: '8px' }} />
              <div style={{ height: '60px', background: 'var(--border-color)', borderRadius: '8px' }} />
              <div style={{ height: '60px', background: 'var(--border-color)', borderRadius: '8px' }} />
              <div style={{ height: '60px', background: 'var(--border-color)', borderRadius: '8px' }} />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid-cols-3" 
        style={{ marginTop: '4rem', paddingBottom: '6rem' }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '2.5rem' }}>
          <div className="btn-icon" style={{ background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-primary)', display: 'inline-flex', marginBottom: '1.5rem', width: '60px', height: '60px' }}>
            <FileText size={28} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>ATS-Optimized Resumes</h3>
          <p className="text-secondary">Generate pixel-perfect PDFs designed to pass Applicant Tracking Systems and impress recruiters instantly.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '2.5rem', transform: 'translateY(-1rem)' }}>
          <div className="btn-icon" style={{ background: 'rgba(112, 0, 255, 0.1)', color: 'var(--accent-secondary)', display: 'inline-flex', marginBottom: '1.5rem', width: '60px', height: '60px' }}>
            <Globe size={28} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3D Web Portfolios</h3>
          <p className="text-secondary">Turn your profile into an interactive, immersive web experience hosted instantly with zero code required.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '2.5rem' }}>
          <div className="btn-icon" style={{ background: 'rgba(255, 0, 60, 0.1)', color: 'var(--accent-tertiary)', display: 'inline-flex', marginBottom: '1.5rem', width: '60px', height: '60px' }}>
            <Zap size={28} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI Content Enhancement</h3>
          <p className="text-secondary">Stuck on what to write? Let our fine-tuned AI expand your bullet points into impactful achievements.</p>
        </motion.div>
      </motion.div>

      <footer style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>© {new Date().getFullYear()} Designed & Developed by Kunal Raikwar. All rights reserved.</p>
      </footer>
    </div>
  );
}

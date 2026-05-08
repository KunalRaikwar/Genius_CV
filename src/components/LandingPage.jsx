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
        
        <motion.div variants={itemVariants} className="hero-buttons" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/build" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.125rem' }}>
            Start Building Free <ArrowRight size={20} />
          </Link>
          <Link to="/portfolio" className="btn btn-secondary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.125rem' }}>
            View Demo <Globe size={20} />
          </Link>
        </motion.div>

        {/* Floating Mockup Preview Elements - ResumeBuild Style */}
        <motion.div variants={itemVariants} style={{ marginTop: '4rem', position: 'relative', width: '100%', height: '450px', display: 'flex', justifyContent: 'center', perspective: '1200px' }}>
          
          {/* Left Template - Creative Resume */}
          <motion.div 
            className="hide-on-mobile"
            animate={{ y: [0, -15, 0], rotateZ: [-12, -12, -12], transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
            style={{ position: 'absolute', width: '250px', height: '350px', left: 'calc(50% - 280px)', top: '40px', padding: 0, overflow: 'hidden', display: 'flex', background: '#fff', borderRadius: '4px', boxShadow: '-10px 20px 40px rgba(0,0,0,0.3)', border: '1px solid #eaeaea', zIndex: 1 }}
          >
            {/* Sidebar */}
            <div style={{ width: '35%', height: '100%', background: '#2B3A55', padding: '1.2rem 0.8rem' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#fff', margin: '0 auto 1rem', opacity: 0.9 }} />
              <div style={{ width: '80%', height: '4px', background: 'rgba(255,255,255,0.7)', margin: '0 auto 0.5rem', borderRadius: '2px' }} />
              <div style={{ width: '60%', height: '4px', background: 'rgba(255,255,255,0.5)', margin: '0 auto 1.5rem', borderRadius: '2px' }} />
              
              <div style={{ width: '100%', height: '3px', background: '#E8C4A2', marginBottom: '0.8rem', borderRadius: '2px' }} />
              <div style={{ width: '80%', height: '3px', background: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem', borderRadius: '2px' }} />
              <div style={{ width: '90%', height: '3px', background: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem', borderRadius: '2px' }} />
              <div style={{ width: '60%', height: '3px', background: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem', borderRadius: '2px' }} />

              <div style={{ width: '100%', height: '3px', background: '#E8C4A2', marginBottom: '0.8rem', borderRadius: '2px' }} />
              <div style={{ width: '90%', height: '3px', background: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem', borderRadius: '2px' }} />
              <div style={{ width: '70%', height: '3px', background: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem', borderRadius: '2px' }} />
            </div>
            {/* Main Content */}
            <div style={{ width: '65%', height: '100%', padding: '1.2rem', background: '#fff' }}>
              <div style={{ width: '50%', height: '8px', background: '#2B3A55', marginBottom: '0.5rem', borderRadius: '4px' }} />
              <div style={{ width: '80%', height: '4px', background: '#9CA3AF', marginBottom: '1.5rem', borderRadius: '2px' }} />
              
              <div style={{ width: '40%', height: '6px', background: '#4B5563', marginBottom: '0.8rem', borderRadius: '3px' }} />
              <div style={{ width: '100%', height: '3px', background: '#D1D5DB', marginBottom: '0.3rem', borderRadius: '2px' }} />
              <div style={{ width: '90%', height: '3px', background: '#D1D5DB', marginBottom: '0.3rem', borderRadius: '2px' }} />
              <div style={{ width: '95%', height: '3px', background: '#D1D5DB', marginBottom: '1.2rem', borderRadius: '2px' }} />

              <div style={{ width: '40%', height: '6px', background: '#4B5563', marginBottom: '0.8rem', borderRadius: '3px' }} />
              <div style={{ width: '100%', height: '3px', background: '#D1D5DB', marginBottom: '0.3rem', borderRadius: '2px' }} />
              <div style={{ width: '85%', height: '3px', background: '#D1D5DB', marginBottom: '0.3rem', borderRadius: '2px' }} />
              <div style={{ width: '90%', height: '3px', background: '#D1D5DB', marginBottom: '1.2rem', borderRadius: '2px' }} />
            </div>
          </motion.div>
          
          {/* Right Template - Professional Resume */}
          <motion.div 
            className="hide-on-mobile"
            animate={{ y: [0, -15, 0], rotateZ: [12, 12, 12], transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
            style={{ position: 'absolute', width: '250px', height: '350px', right: 'calc(50% - 280px)', top: '40px', padding: '1.5rem', background: '#fff', borderRadius: '4px', boxShadow: '10px 20px 40px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #eaeaea', zIndex: 1 }}
          >
            <div style={{ width: '60%', height: '10px', background: '#111827', marginBottom: '0.5rem', borderRadius: '5px' }} />
            <div style={{ width: '80%', height: '4px', background: '#6B7280', marginBottom: '1rem', borderRadius: '2px' }} />
            <div style={{ width: '100%', height: '2px', background: '#E5E7EB', marginBottom: '1.2rem' }} />
            
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
              <div style={{ width: '35%', height: '6px', background: '#2563EB', borderRadius: '3px' }} />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <div style={{ width: '45%', height: '4px', background: '#374151', borderRadius: '2px' }} />
              <div style={{ width: '25%', height: '4px', background: '#9CA3AF', borderRadius: '2px' }} />
            </div>
            <div style={{ width: '100%', height: '3px', background: '#E5E7EB', marginBottom: '0.3rem', borderRadius: '2px' }} />
            <div style={{ width: '90%', height: '3px', background: '#E5E7EB', marginBottom: '0.3rem', borderRadius: '2px' }} />
            <div style={{ width: '95%', height: '3px', background: '#E5E7EB', marginBottom: '1.2rem', borderRadius: '2px' }} />

            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
              <div style={{ width: '35%', height: '6px', background: '#2563EB', borderRadius: '3px' }} />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <div style={{ width: '45%', height: '4px', background: '#374151', borderRadius: '2px' }} />
              <div style={{ width: '25%', height: '4px', background: '#9CA3AF', borderRadius: '2px' }} />
            </div>
            <div style={{ width: '100%', height: '3px', background: '#E5E7EB', marginBottom: '0.3rem', borderRadius: '2px' }} />
            <div style={{ width: '85%', height: '3px', background: '#E5E7EB', marginBottom: '1.2rem', borderRadius: '2px' }} />
          </motion.div>

          {/* Center Hero Template - Modern Executive */}
          <motion.div 
            animate={{ y: [0, -20, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            style={{ position: 'absolute', width: '320px', maxWidth: '90vw', height: '420px', zIndex: 10, padding: '2rem 1.5rem', border: '1px solid #f0f0f0', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', borderRadius: '6px', background: '#ffffff' }}
          >
             {/* Header */}
             <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '2px solid #00F0FF', paddingBottom: '1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '4px', background: '#F3F4F6' }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                   <div style={{ width: '70%', height: '14px', background: '#111827', borderRadius: '4px', marginBottom: '0.5rem' }} />
                   <div style={{ width: '40%', height: '6px', background: '#00F0FF', borderRadius: '3px', marginBottom: '0.3rem' }} />
                   <div style={{ width: '90%', height: '4px', background: '#9CA3AF', borderRadius: '2px' }} />
                </div>
             </div>
             
             {/* Body */}
             <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
               {/* Left Col */}
               <div style={{ width: '35%', borderRight: '1px solid #E5E7EB', paddingRight: '1rem' }}>
                 <div style={{ width: '100%', height: '6px', background: '#4B5563', marginBottom: '0.8rem', borderRadius: '3px' }} />
                 <div style={{ width: '100%', height: '4px', background: '#E5E7EB', marginBottom: '0.4rem', borderRadius: '2px' }} />
                 <div style={{ width: '80%', height: '4px', background: '#E5E7EB', marginBottom: '0.4rem', borderRadius: '2px' }} />
                 <div style={{ width: '90%', height: '4px', background: '#E5E7EB', marginBottom: '1.5rem', borderRadius: '2px' }} />

                 <div style={{ width: '100%', height: '6px', background: '#4B5563', marginBottom: '0.8rem', borderRadius: '3px' }} />
                 {/* Progress bars */}
                 <div style={{ width: '100%', background: '#F3F4F6', height: '4px', borderRadius: '2px', marginBottom: '0.8rem' }}><div style={{ width: '90%', background: '#00F0FF', height: '100%', borderRadius: '2px' }}/></div>
                 <div style={{ width: '100%', background: '#F3F4F6', height: '4px', borderRadius: '2px', marginBottom: '0.8rem' }}><div style={{ width: '75%', background: '#00F0FF', height: '100%', borderRadius: '2px' }}/></div>
                 <div style={{ width: '100%', background: '#F3F4F6', height: '4px', borderRadius: '2px', marginBottom: '0.8rem' }}><div style={{ width: '85%', background: '#00F0FF', height: '100%', borderRadius: '2px' }}/></div>
                 <div style={{ width: '100%', background: '#F3F4F6', height: '4px', borderRadius: '2px', marginBottom: '1.5rem' }}><div style={{ width: '60%', background: '#00F0FF', height: '100%', borderRadius: '2px' }}/></div>
               </div>
               
               {/* Right Col */}
               <div style={{ width: '65%' }}>
                 <div style={{ width: '40%', height: '8px', background: '#111827', marginBottom: '1rem', borderRadius: '4px' }} />
                 
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ width: '50%', height: '6px', background: '#4B5563', borderRadius: '3px' }} />
                    <div style={{ width: '25%', height: '4px', background: '#00F0FF', borderRadius: '2px' }} />
                 </div>
                 <div style={{ width: '100%', height: '4px', background: '#E5E7EB', marginBottom: '0.4rem', borderRadius: '2px' }} />
                 <div style={{ width: '90%', height: '4px', background: '#E5E7EB', marginBottom: '0.4rem', borderRadius: '2px' }} />
                 <div style={{ width: '95%', height: '4px', background: '#E5E7EB', marginBottom: '1.5rem', borderRadius: '2px' }} />

                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ width: '50%', height: '6px', background: '#4B5563', borderRadius: '3px' }} />
                    <div style={{ width: '25%', height: '4px', background: '#00F0FF', borderRadius: '2px' }} />
                 </div>
                 <div style={{ width: '100%', height: '4px', background: '#E5E7EB', marginBottom: '0.4rem', borderRadius: '2px' }} />
                 <div style={{ width: '85%', height: '4px', background: '#E5E7EB', marginBottom: '0.4rem', borderRadius: '2px' }} />
                 <div style={{ width: '90%', height: '4px', background: '#E5E7EB', marginBottom: '1.5rem', borderRadius: '2px' }} />
               </div>
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

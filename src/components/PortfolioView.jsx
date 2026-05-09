import { motion } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import { Link } from 'react-router-dom';
import { Download, ExternalLink, Briefcase, GraduationCap, Code2, User } from 'lucide-react';

import CustomCursor from './portfolio-sections/CustomCursor';

export default function PortfolioView() {
  const { data } = useResume();
  const { personal, experience, projects, skills, education } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 12 } }
  };

  return (
    <div className="portfolio-container" style={{ position: 'relative', zIndex: 1, background: 'var(--bg-primary)' }}>
      <CustomCursor />
      {/* Dynamic Background */}
      <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', background: 'radial-gradient(circle at 80% 20%, rgba(112, 0, 255, 0.08), transparent 40%), radial-gradient(circle at 20% 80%, rgba(0, 240, 255, 0.05), transparent 40%)', zIndex: -1 }} />

      {/* Floating Header */}
      <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '1rem 2rem', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0 }}>
        <div style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
          {personal.fullName ? personal.fullName.split(' ')[0] : 'Portfolio'}<span className="text-gradient">.</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="flex-center" style={{ gap: '1.5rem', marginRight: '1rem', display: 'none' }}>
            <a href="#about" className="text-secondary" style={{ fontSize: '0.875rem', fontWeight: 500 }}>About</a>
            <a href="#experience" className="text-secondary" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Experience</a>
            <a href="#projects" className="text-secondary" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Projects</a>
          </div>
          <Link to="/resume" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.875rem' }}><Download size={16} /> Resume</Link>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        
        {/* Hero Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <motion.div variants={itemVariants} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '2rem', marginBottom: '2rem', width: 'fit-content' }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-primary)' }} />
            <span className="text-secondary" style={{ fontSize: '0.875rem' }}>Available for work</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(2rem, 8vw, 6.5rem)', lineHeight: 1.05, marginBottom: '1.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
            I'm <span className="text-gradient">{personal.fullName || 'Awesome'}</span>
          </motion.h1>
          
          <motion.h2 variants={itemVariants} style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-secondary)', marginBottom: '2.5rem', fontWeight: 400 }}>
            {personal.jobTitle || 'A passionate professional'} building digital experiences.
          </motion.h2>
          
          <motion.p variants={itemVariants} style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', marginBottom: '3rem', lineHeight: 1.8 }}>
            {personal.summary || 'I build things for the web and love bringing ideas to life. Specialized in creating scalable, beautiful, and user-centric applications.'}
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href={`mailto:${personal.email}`} className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Get in Touch</a>
            {personal.website && (
              <a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
                View Website <ExternalLink size={18} />
              </a>
            )}
            <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
              {personal.linkedin && (
                <a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} target="_blank" rel="noreferrer" className="btn-icon" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} title="LinkedIn">
                  <Briefcase size={20} />
                </a>
              )}
              {personal.github && (
                <a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} target="_blank" rel="noreferrer" className="btn-icon" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} title="GitHub">
                  <Code2 size={20} />
                </a>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        {skills.length > 0 && (
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            style={{ padding: '6rem 0', borderTop: '1px solid var(--border-color)' }}
          >
            <div className="flex-between" style={{ marginBottom: '3rem' }}>
              <h2 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Code2 className="text-gradient" size={36} /> Expertise</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {skills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  variants={skillVariants}
                  whileHover={{ scale: 1.05, y: -5, borderColor: 'var(--accent-primary)', boxShadow: '0 10px 20px rgba(0,240,255,0.2)' }}
                  className="glass" 
                  style={{ padding: '1rem 2rem', borderRadius: 'var(--radius-full)', fontSize: '1.125rem', fontWeight: 500, transition: 'all 0.3s ease' }}
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            style={{ padding: '6rem 0', borderTop: '1px solid var(--border-color)' }}
          >
            <h2 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}><Briefcase className="text-gradient" size={36} /> Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {experience.map((exp, index) => (
                <motion.div key={index} variants={itemVariants} className="glass-card" style={{ padding: '3rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 250px' }}>
                    <div className="text-secondary" style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      {exp.duration}
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{exp.company}</h3>
                    <div style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>{exp.role}</div>
                  </div>
                  <div style={{ flex: '2 1 400px' }}>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            style={{ padding: '6rem 0', borderTop: '1px solid var(--border-color)' }}
          >
            <h2 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}><Layers className="text-gradient" size={36} /> Selected Works</h2>
            <div className="grid-cols-2">
              {projects.map((proj, index) => (
                <motion.div key={index} variants={itemVariants} className="glass-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ height: '200px', background: `linear-gradient(45deg, rgba(112,0,255,0.2), rgba(0,240,255,0.2))`, borderBottom: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
                    {/* Decorative project background */}
                    <div style={{ position: 'absolute', inset: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', opacity: 0.5 }} />
                  </div>
                  <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{proj.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', flex: 1 }}>{proj.description}</p>
                    {proj.link && (
                      <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: 'fit-content' }}>
                        View Project <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            style={{ padding: '6rem 0', borderTop: '1px solid var(--border-color)' }}
          >
            <h2 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}><GraduationCap className="text-gradient" size={36} /> Education</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {education.map((edu, index) => (
                <motion.div key={index} variants={itemVariants} className="glass" style={{ padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderRadius: 'var(--radius-lg)' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{edu.degree}</h3>
                    <div style={{ color: 'var(--text-secondary)' }}>{edu.school}</div>
                  </div>
                  <div className="btn-secondary" style={{ padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
                    {edu.year}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        <footer style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>
            © {new Date().getFullYear()} {personal.fullName || 'Portfolio'}. All rights reserved.
            <span style={{ opacity: 0.6, marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
              Powered by Genius CV
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}

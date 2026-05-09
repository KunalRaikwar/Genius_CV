import React from 'react';

export default function CreativeTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data;

  return (
    <div className="resume-pdf-container" style={{ 
      display: 'flex', 
      minHeight: '297mm', // A4 height
      width: '210mm', // A4 width
      background: 'white',
      color: '#1f2937',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Sidebar */}
      <div style={{ 
        width: '30%', 
        background: '#4f46e5', 
        color: 'white', 
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
      }}>
        {/* Profile Image placeholder / Initials */}
        <div style={{ 
          width: '100px', 
          height: '100px', 
          borderRadius: '50%', 
          background: 'rgba(255,255,255,0.2)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '2.5rem',
          fontWeight: 800,
          margin: '0 auto'
        }}>
          {personal.fullName ? personal.fullName.split(' ').map(n => n[0]).join('') : 'CV'}
        </div>

        <section>
          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px', marginBottom: '15px' }}>Contact</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.linkedin && <div style={{ wordBreak: 'break-all' }}>{personal.linkedin}</div>}
            {personal.github && <div style={{ wordBreak: 'break-all' }}>{personal.github}</div>}
          </div>
        </section>

        {skills.length > 0 && skills.some(s => s.name) && (
          <section>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px', marginBottom: '15px' }}>Expertise</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {skills.map(skill => (
                <div key={skill.id} style={{ fontSize: '0.85rem' }}>{skill.name}</div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && education.some(e => e.school || e.degree) && (
          <section>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px', marginBottom: '15px' }}>Education</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {education.map(edu => (
                <div key={edu.id}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{edu.degree}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{edu.school}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Main Content */}
      <div style={{ width: '70%', padding: '50px 40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div>
          <h1 style={{ fontSize: '3rem', margin: 0, color: '#111827', fontWeight: 900 }}>{personal.fullName || 'Full Name'}</h1>
          <h2 style={{ fontSize: '1.25rem', color: '#4f46e5', margin: '5px 0 0 0', fontWeight: 600 }}>{personal.jobTitle || 'Professional Role'}</h2>
        </div>

        {personal.summary && (
          <section>
            <h3 style={{ fontSize: '1rem', color: '#111827', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f3f4f6', paddingBottom: '5px', marginBottom: '15px' }}>Profile</h3>
            <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: 1.6 }}>{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && experience.some(e => e.role || e.company || e.description) && (
          <section>
            <h3 style={{ fontSize: '1rem', color: '#111827', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f3f4f6', paddingBottom: '5px', marginBottom: '15px' }}>Experience</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {experience.map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{exp.role}</h4>
                    <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{exp.duration}</span>
                  </div>
                  <div style={{ color: '#4f46e5', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>{exp.company}</div>
                  <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && projects.some(p => p.title || p.description) && (
          <section>
            <h3 style={{ fontSize: '1rem', color: '#111827', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f3f4f6', paddingBottom: '5px', marginBottom: '15px' }}>Projects</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {projects.map(proj => (
                <div key={proj.id}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 5px 0' }}>{proj.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.4, margin: 0 }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.certifications && data.certifications.length > 0 && data.certifications.some(c => c.title || c.issuer) && (
          <section>
            <h3 style={{ fontSize: '1rem', color: '#111827', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f3f4f6', paddingBottom: '5px', marginBottom: '15px' }}>Awards & Certifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {data.certifications.map(cert => (
                <div key={cert.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{cert.title}</h4>
                    <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{cert.year}</span>
                  </div>
                  <div style={{ color: '#4f46e5', fontWeight: 600, fontSize: '0.85rem', marginBottom: cert.description ? '5px' : '0' }}>{cert.issuer}</div>
                  {cert.description && <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.4, margin: 0 }}>{cert.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

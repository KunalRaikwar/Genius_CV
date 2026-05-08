import React from 'react';

export default function ProfessionalTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data;

  return (
    <div className="resume-pdf-container" style={{ 
      padding: '50px', 
      background: 'white',
      color: '#1f2937',
      fontFamily: "'Inter', sans-serif",
      width: '210mm',
      minHeight: '297mm',
      display: 'flex',
      flexDirection: 'column',
      gap: '25px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '3px solid #1e293b', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 5px 0', letterSpacing: '0.05em', color: '#0f172a' }}>{personal.fullName || 'FULL NAME'}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '0.9rem', color: '#475569', flexWrap: 'wrap' }}>
          {personal.location && <span>{personal.location}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.email && <span>• {personal.email}</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '0.9rem', color: '#2563eb', marginTop: '5px' }}>
          {personal.linkedin && <a href={personal.linkedin} style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>}
          {personal.github && <a href={personal.github} style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <section>
          <h3 style={{ fontSize: '1rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Professional Profile</h3>
          <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, textAlign: 'justify' }}>{personal.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section>
          <h3 style={{ fontSize: '1rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Core Experience</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>{exp.company}</h4>
                  <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>{exp.duration}</span>
                </div>
                <div style={{ fontSize: '1rem', color: '#2563eb', fontWeight: 500, margin: '2px 0 8px 0' }}>{exp.role}</div>
                <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h3 style={{ fontSize: '1rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Technical Expertise</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map(skill => (
              <span key={skill.id} style={{ fontSize: '0.9rem', background: '#f1f5f9', color: '#1e293b', padding: '4px 12px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <h3 style={{ fontSize: '1rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Academic Background</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{edu.school}</h4>
                  <div style={{ fontSize: '0.9rem', color: '#475569' }}>{edu.degree}</div>
                </div>
                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Awards */}
      {data.certifications && data.certifications.length > 0 && (
        <section>
          <h3 style={{ fontSize: '1rem', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Honors & Certifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.certifications.map(cert => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{cert.title}</h4>
                  <div style={{ fontSize: '0.9rem', color: '#475569' }}>{cert.issuer}</div>
                  {cert.description && <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px', fontStyle: 'italic' }}>{cert.description}</div>}
                </div>
                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{cert.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

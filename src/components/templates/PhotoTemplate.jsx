import React from 'react';

export default function PhotoTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data;

  return (
    <div className="resume-pdf-container" style={{ display: 'flex', flexDirection: 'row', gap: '30px', background: '#ffffff', minHeight: '100%' }}>
      {/* Left Sidebar */}
      <div style={{ width: '30%', background: '#1E293B', color: '#F8FAFC', padding: '30px 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Photo & Name */}
        <div style={{ textAlign: 'center' }}>
          {personal.photo ? (
            <img 
              src={personal.photo} 
              alt={personal.fullName} 
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #3B82F6', marginBottom: '15px' }} 
            />
          ) : (
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#334155', border: '3px solid #3B82F6', margin: '0 auto 15px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#94A3B8' }}>
              {personal.fullName ? personal.fullName.charAt(0) : 'U'}
            </div>
          )}
          <h1 style={{ fontSize: '1.75rem', margin: '0 0 5px 0', lineHeight: 1.2 }}>{personal.fullName || 'Your Name'}</h1>
          <h2 style={{ fontSize: '1rem', color: '#60A5FA', margin: 0, fontWeight: 400 }}>{personal.jobTitle || 'Job Title'}</h2>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: '1.1rem', borderBottom: '1px solid #334155', paddingBottom: '5px', marginBottom: '15px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h3>
          <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.website && <div><a href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} style={{ color: '#60A5FA', textDecoration: 'none' }}>Portfolio</a></div>}
            {personal.linkedin && <div><a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} style={{ color: '#60A5FA', textDecoration: 'none' }}>LinkedIn</a></div>}
            {personal.github && <div><a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} style={{ color: '#60A5FA', textDecoration: 'none' }}>GitHub</a></div>}
          </div>
        </div>

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.1rem', borderBottom: '1px solid #334155', paddingBottom: '5px', marginBottom: '15px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px' }}>Education</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {education.map(edu => (
                <div key={edu.id}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{edu.degree}</div>
                  <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>{edu.school}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div style={{ width: '70%', padding: '30px 30px 30px 0', color: '#1E293B' }}>
        
        {/* Summary */}
        {personal.summary && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#2563EB', borderBottom: '2px solid #E2E8F0', paddingBottom: '5px', marginBottom: '10px', display: 'inline-block' }}>Profile</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#475569' }}>{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#2563EB', borderBottom: '2px solid #E2E8F0', paddingBottom: '5px', marginBottom: '15px', display: 'inline-block' }}>Experience</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {experience.map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{exp.role}</h4>
                    <span style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 500 }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500, marginBottom: '8px' }}>{exp.company}</div>
                  <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#2563EB', borderBottom: '2px solid #E2E8F0', paddingBottom: '5px', marginBottom: '15px', display: 'inline-block' }}>Projects</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {projects.map(proj => (
                <div key={proj.id}>
                  <h4 style={{ fontSize: '1.1rem', margin: '0 0 5px 0' }}>{proj.title} <span style={{ fontSize: '0.8rem', color: '#2563EB', fontWeight: 'normal' }}>{proj.link && `(${proj.link})`}</span></h4>
                  <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#2563EB', borderBottom: '2px solid #E2E8F0', paddingBottom: '5px', marginBottom: '15px', display: 'inline-block' }}>Skills & Expertise</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, index) => (
                <span key={index} style={{ background: '#F1F5F9', color: '#334155', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 500, border: '1px solid #E2E8F0' }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Awards */}
        {data.certifications && data.certifications.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#2563EB', borderBottom: '2px solid #E2E8F0', paddingBottom: '5px', marginBottom: '15px', display: 'inline-block' }}>Awards & Certifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {data.certifications.map(cert => (
                <div key={cert.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{cert.title}</h4>
                    <span style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 500 }}>{cert.year}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500, marginBottom: cert.description ? '8px' : '0' }}>{cert.issuer}</div>
                  {cert.description && <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>{cert.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

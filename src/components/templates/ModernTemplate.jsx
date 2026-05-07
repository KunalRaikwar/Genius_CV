import React from 'react';

export default function ModernTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data;

  return (
    <div className="resume-pdf-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ borderBottom: '2px solid #2563EB', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', color: '#111827', margin: 0 }}>{personal.fullName || 'Your Name'}</h1>
            <h2 style={{ fontSize: '1.25rem', color: '#2563EB', margin: '5px 0 0 0', fontWeight: 500 }}>{personal.jobTitle || 'Job Title'}</h2>
          </div>
        <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#4B5563' }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.linkedin && <div><a href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} style={{ color: '#2563EB', textDecoration: 'none' }}>LinkedIn</a></div>}
          {personal.github && <div><a href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} style={{ color: '#2563EB', textDecoration: 'none' }}>GitHub</a></div>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div>
          <h3 style={{ fontSize: '1.125rem', color: '#111827', borderBottom: '1px solid #E5E7EB', paddingBottom: '5px', marginBottom: '10px' }}>Professional Summary</h3>
          <p style={{ fontSize: '0.875rem', color: '#374151' }}>{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.125rem', color: '#111827', borderBottom: '1px solid #E5E7EB', paddingBottom: '5px', marginBottom: '15px' }}>Experience</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontSize: '1rem', color: '#111827', margin: 0 }}>{exp.role}</h4>
                  <span style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: 500 }}>{exp.duration}</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#2563EB', fontWeight: 500, marginBottom: '5px' }}>{exp.company}</div>
                <p style={{ fontSize: '0.875rem', color: '#374151', whiteSpace: 'pre-line' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education & Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.125rem', color: '#111827', borderBottom: '1px solid #E5E7EB', paddingBottom: '5px', marginBottom: '10px' }}>Education</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {education.map(edu => (
                <div key={edu.id}>
                  <h4 style={{ fontSize: '0.875rem', color: '#111827', margin: 0 }}>{edu.degree}</h4>
                  <div style={{ fontSize: '0.875rem', color: '#4B5563' }}>{edu.school} {edu.year && `• ${edu.year}`}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.125rem', color: '#111827', borderBottom: '1px solid #E5E7EB', paddingBottom: '5px', marginBottom: '10px' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map(skill => (
                <span key={skill.id} style={{ background: '#F3F4F6', color: '#374151', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 500 }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.125rem', color: '#111827', borderBottom: '1px solid #E5E7EB', paddingBottom: '5px', marginBottom: '15px' }}>Projects</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {projects.map(proj => (
              <div key={proj.id}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#111827', margin: 0 }}>{proj.title}</h4>
                  {proj.link && <a href={proj.link} style={{ fontSize: '0.75rem', color: '#2563EB', textDecoration: 'none' }}>{proj.link}</a>}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#374151', marginTop: '5px', whiteSpace: 'pre-line' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

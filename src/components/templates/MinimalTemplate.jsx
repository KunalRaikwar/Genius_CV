import React from 'react';

export default function MinimalTemplate({ data }) {
  const { personal, education, experience, skills, projects } = data;

  return (
    <div className="resume-pdf-container" style={{ display: 'flex', flexDirection: 'column', gap: '25px', fontFamily: 'serif' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '15px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#000', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '2px' }}>{personal.fullName || 'Your Name'}</h1>
        <div style={{ fontSize: '0.875rem', color: '#333', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
          {[
            personal.email, 
            personal.phone, 
            personal.location, 
            personal.website,
            personal.linkedin && `<a href="${personal.linkedin}" style="color:#333;text-decoration:none">LinkedIn</a>`,
            personal.github && `<a href="${personal.github}" style="color:#333;text-decoration:none">GitHub</a>`
          ].filter(Boolean).map((item, i, arr) => (
            <React.Fragment key={i}>
              <span dangerouslySetInnerHTML={{ __html: item }} />
              {i < arr.length - 1 && <span>|</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div>
          <p style={{ fontSize: '0.9rem', color: '#333', textAlign: 'justify', lineHeight: '1.6' }}>{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1rem', color: '#000', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>Experience</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontSize: '1rem', color: '#000', margin: 0 }}>{exp.role} <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>at {exp.company}</span></h4>
                  <span style={{ fontSize: '0.875rem', color: '#555' }}>{exp.duration}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#333', whiteSpace: 'pre-line', marginTop: '5px', lineHeight: '1.5' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1rem', color: '#000', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>Projects</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {projects.map(proj => (
              <div key={proj.id}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#000', margin: 0 }}>{proj.title}</h4>
                  {proj.link && <a href={proj.link} style={{ fontSize: '0.8rem', color: '#555' }}>{proj.link}</a>}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#333', whiteSpace: 'pre-line', marginTop: '5px', lineHeight: '1.5' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1rem', color: '#000', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>Education</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <strong style={{ fontSize: '0.95rem' }}>{edu.school}</strong> — <span>{edu.degree}</span>
                </div>
                {edu.year && <span style={{ fontSize: '0.875rem', color: '#555' }}>{edu.year}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1rem', color: '#000', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>Skills</h3>
          <p style={{ fontSize: '0.9rem', color: '#333', lineHeight: '1.5' }}>
            {skills.map(s => s.name).join(', ')}
          </p>
        </div>
      )}

    </div>
  );
}

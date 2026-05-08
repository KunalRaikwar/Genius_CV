import React, { useRef, useState } from 'react';
import { useResume } from '../context/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import PhotoTemplate from './templates/PhotoTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import html2pdf from 'html2pdf.js';
import { Download, LayoutTemplate, Edit, Palette, Briefcase, Sparkles, Zap, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResumePreview() {
  const { data } = useResume();
  const resumeRef = useRef(null);
  const [template, setTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    const element = resumeRef.current;
    
    const opt = {
      margin:       0,
      filename:     `${data.personal.fullName || 'resume'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const templates = [
    { id: 'modern', name: 'Modern Style', icon: <Zap size={18} />, desc: 'Sleek and colorful' },
    { id: 'minimal', name: 'Minimal Style', icon: <LayoutTemplate size={18} />, desc: 'Clean and simple' },
    { id: 'photo', name: 'Photo Style', icon: <User size={18} />, desc: 'Personal branding' },
    { id: 'creative', name: 'Creative Style', icon: <Palette size={18} />, desc: 'Bold and unique' },
    { id: 'professional', name: 'Professional', icon: <Briefcase size={18} />, desc: 'Corporate standard' },
  ];

  return (
    <div className="container" style={{ marginTop: '2rem', paddingBottom: '5rem' }}>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="heading-lg" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles className="text-gradient" size={32} /> Preview & Download
          </h1>
          <p className="text-secondary">Select a template and download your professional PDF resume.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/build" className="btn btn-secondary"><Edit size={18} /> Edit Details</Link>
          <button 
            className="btn btn-primary" 
            onClick={handleDownload}
            disabled={isGenerating}
          >
            <Download size={18} /> {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
        {/* Sidebar Controls */}
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div className="glass-card" style={{ padding: '1.5rem', position: 'sticky', top: '6rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              <LayoutTemplate size={20} className="text-gradient" /> Choose Layout
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {templates.map((t) => (
                <button 
                  key={t.id}
                  className={`btn ${template === t.id ? 'btn-primary' : 'btn-secondary'}`} 
                  onClick={() => setTemplate(t.id)}
                  style={{ 
                    width: '100%', 
                    justifyContent: 'flex-start', 
                    padding: '1rem',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.25rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                    {t.icon} {t.name}
                  </div>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 400 }}>{t.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resume Render Area */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', overflowX: 'auto', padding: '0 1rem' }}>
          <div 
            style={{ 
              background: 'white', 
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)', 
              borderRadius: '4px', // Standard resume feel
              overflow: 'hidden',
              transform: 'scale(1)', // Can be adjusted for zoom
              transformOrigin: 'top center'
            }}
          >
            <div ref={resumeRef} style={{ width: '210mm', minHeight: '297mm' }}>
              {template === 'modern' && <ModernTemplate data={data} />}
              {template === 'minimal' && <MinimalTemplate data={data} />}
              {template === 'photo' && <PhotoTemplate data={data} />}
              {template === 'creative' && <CreativeTemplate data={data} />}
              {template === 'professional' && <ProfessionalTemplate data={data} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

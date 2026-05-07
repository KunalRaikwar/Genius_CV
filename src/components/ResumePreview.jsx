import React, { useRef, useState } from 'react';
import { useResume } from '../context/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import PhotoTemplate from './templates/PhotoTemplate';
import html2pdf from 'html2pdf.js';
import { Download, LayoutTemplate, Edit } from 'lucide-react';
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

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="heading-lg">Preview & Download</h1>
          <p className="text-secondary">Select a template and download your professional PDF resume.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/build" className="btn btn-secondary"><Edit size={18} /> Edit Details</Link>
          <button 
            className="btn btn-primary" 
            onClick={handleDownload}
            disabled={isGenerating}
          >
            <Download size={18} /> {isGenerating ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Sidebar Controls */}
        <div style={{ width: '250px', flexShrink: 0 }}>
          <div className="glass-card" style={{ padding: '1.5rem', position: 'sticky', top: '6rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <LayoutTemplate size={20} /> Templates
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                className={`btn ${template === 'modern' ? 'btn-primary' : 'btn-secondary'}`} 
                onClick={() => setTemplate('modern')}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                Modern Style
              </button>
              <button 
                className={`btn ${template === 'minimal' ? 'btn-primary' : 'btn-secondary'}`} 
                onClick={() => setTemplate('minimal')}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                Minimal Style
              </button>
              <button 
                className={`btn ${template === 'photo' ? 'btn-primary' : 'btn-secondary'}`} 
                onClick={() => setTemplate('photo')}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                Photo Style
              </button>
            </div>
          </div>
        </div>

        {/* Resume Render Area */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', overflowX: 'auto', paddingBottom: '2rem' }}>
          <div 
            style={{ 
              background: 'white', 
              boxShadow: 'var(--shadow-lg)', 
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden'
            }}
          >
            <div ref={resumeRef}>
              {template === 'modern' && <ModernTemplate data={data} />}
              {template === 'minimal' && <MinimalTemplate data={data} />}
              {template === 'photo' && <PhotoTemplate data={data} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

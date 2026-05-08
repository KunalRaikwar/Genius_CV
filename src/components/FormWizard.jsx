import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, Plus, Trash2, CheckCircle, User } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export default function FormWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const steps = ['Personal', 'Education', 'Experience', 'Skills', 'Projects', 'Awards'];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/resume');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="container" style={{ maxWidth: '900px', marginTop: '2rem', position: 'relative', zIndex: 1 }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '500px', background: 'radial-gradient(ellipse at top, rgba(112, 0, 255, 0.15), transparent 70%)', zIndex: -1 }} />

      {/* Progress Indicator */}
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div 
            key={step} 
            className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            title={step}
          >
            {index < currentStep ? <CheckCircle size={18} /> : index + 1}
          </div>
        ))}
      </div>

      <motion.div 
        className="glass-card" 
        style={{ padding: '3rem', minHeight: '550px', display: 'flex', flexDirection: 'column' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
          <h2 className="heading-lg" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            {steps[currentStep]} <span className="text-gradient">Details</span>
          </h2>
          <p className="text-secondary">Fill out the information below to build your career profile.</p>
        </div>
        
        <div style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {currentStep === 0 && <PersonalStep />}
              {currentStep === 1 && <EducationStep />}
              {currentStep === 2 && <ExperienceStep />}
              {currentStep === 3 && <SkillsStep />}
              {currentStep === 4 && <ProjectsStep />}
              {currentStep === 5 && <CertificationsStep />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex-between" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
          <button 
            className="btn btn-secondary" 
            onClick={handlePrev}
            disabled={currentStep === 0}
            style={{ opacity: currentStep === 0 ? 0 : 1, pointerEvents: currentStep === 0 ? 'none' : 'auto' }}
          >
            <ArrowLeft size={18} /> Back
          </button>
          
          <button className="btn btn-primary" onClick={handleNext} style={{ padding: '1rem 2rem' }}>
            {currentStep === steps.length - 1 ? 'Generate Profile' : 'Next Step'} <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// --- Step Components ---

const listVariants = {
  hidden: { opacity: 0, height: 0, marginBottom: 0 },
  visible: { opacity: 1, height: 'auto', marginBottom: '1.5rem', transition: { duration: 0.3 } },
  exit: { opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden', transition: { duration: 0.3 } }
};

const AISuggestButton = ({ field, value, onSuggest }) => {
  const [loading, setLoading] = useState(false);
  const { improveWithAI } = useResume();

  const handleImprove = async () => {
    setLoading(true);
    const improved = await improveWithAI(value, field);
    onSuggest(improved);
    setLoading(false);
  };

  return (
    <button 
      type="button"
      className="btn ai-btn" 
      onClick={handleImprove}
      disabled={loading || !value}
      style={{ 
        padding: '0.5rem 1rem', 
        fontSize: '0.875rem', 
        position: 'absolute', 
        right: '0.75rem', 
        bottom: '0.75rem',
        borderRadius: 'var(--radius-sm)'
      }}
    >
      <Sparkles size={16} /> {loading ? 'Enhancing...' : 'Enhance with AI'}
    </button>
  );
};

function PersonalStep() {
  const { data, updatePersonal } = useResume();
  const { personal } = data;

  // Validation logic
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Generic phone validation: allows +, -, spaces, and 7-20 characters
  const phoneRegex = /^\+?[0-9\s\-]{7,20}$/;

  const isEmailInvalid = personal.email && !emailRegex.test(personal.email);
  const isPhoneInvalid = personal.phone && !phoneRegex.test(personal.phone);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image must be smaller than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonal('photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPhoneParts = (phoneStr) => {
    if (!phoneStr) return { code: '+91', number: '' };
    const parts = phoneStr.trim().split(' ');
    if (parts.length > 1 && parts[0].startsWith('+')) {
      return { code: parts[0], number: parts.slice(1).join(' ') };
    }
    if (phoneStr.startsWith('+')) {
      const match = phoneStr.match(/^(\+\d{1,4})(.*)$/);
      if (match) return { code: match[1], number: match[2].trim() };
    }
    return { code: '+91', number: phoneStr };
  };

  const getPhonePlaceholder = (code) => {
    switch (code) {
      case '+1': return '234 567 8900';
      case '+44': return '7911 123456';
      case '+61': return '412 345 678';
      case '+971': return '50 123 4567';
      case '+65': return '8123 4567';
      case '+49': return '151 23456789';
      case '+91':
      default: return '98765 43210';
    }
  };

  const { code: currentPhoneCode, number: currentPhoneNumber } = getPhoneParts(personal.phone);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {personal.photo ? (
            <img src={personal.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <User size={30} className="text-muted" />
          )}
        </div>
        <div>
          <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            Upload Photo
            <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
          </label>
          <p className="text-secondary" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Optional. Max 2MB.</p>
        </div>
      </div>
      <div className="grid-cols-2">
        <div className="input-group">
          <label className="input-label">Full Name</label>
          <input className="input-field" value={personal.fullName} onChange={e => updatePersonal('fullName', e.target.value)} placeholder="e.g. Alex Chen" />
        </div>
        <div className="input-group">
          <label className="input-label">Professional Title</label>
          <input className="input-field" value={personal.jobTitle} onChange={e => updatePersonal('jobTitle', e.target.value)} placeholder="e.g. Senior Software Engineer / Fresher" />
        </div>
        <div className="input-group">
          <label className="input-label">Email Address</label>
          <input 
            className="input-field" 
            style={{ borderColor: isEmailInvalid ? 'var(--accent-tertiary)' : undefined }}
            value={personal.email} 
            onChange={e => updatePersonal('email', e.target.value)} 
            placeholder="e.g. alex@example.com" 
          />
          {isEmailInvalid && <span style={{ color: 'var(--accent-tertiary)', fontSize: '0.75rem', marginTop: '-0.25rem' }}>Please enter a valid email.</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Phone Number</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select 
              className="input-field" 
              style={{ width: '120px', padding: '0.75rem 0.5rem', appearance: 'none', background: 'var(--bg-secondary)', cursor: 'pointer' }}
              value={currentPhoneCode}
              onChange={e => updatePersonal('phone', `${e.target.value} ${currentPhoneNumber}`.trim())}
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+971">🇦🇪 +971</option>
              <option value="+65">🇸🇬 +65</option>
              <option value="+49">🇩🇪 +49</option>
            </select>
            <input 
              className="input-field" 
              style={{ flex: 1, borderColor: isPhoneInvalid ? 'var(--accent-tertiary)' : undefined }}
              value={currentPhoneNumber} 
              onChange={e => {
                // Prevent typing letters, only numbers, spaces, and hyphens
                const val = e.target.value.replace(/[^\d\s-]/g, '');
                updatePersonal('phone', `${currentPhoneCode} ${val}`.trim());
              }} 
              placeholder={`e.g. ${getPhonePlaceholder(currentPhoneCode)}`} 
            />
          </div>
          {isPhoneInvalid && <span style={{ color: 'var(--accent-tertiary)', fontSize: '0.75rem', marginTop: '-0.25rem' }}>Please enter a valid phone number.</span>}
        </div>
      </div>
      <div className="grid-cols-2">
        <div className="input-group">
          <label className="input-label">Location</label>
          <input className="input-field" value={personal.location} onChange={e => updatePersonal('location', e.target.value)} placeholder="e.g. Mumbai, India" />
        </div>
        <div className="input-group">
          <label className="input-label">Personal Website (Optional)</label>
          <input className="input-field" value={personal.website} onChange={e => updatePersonal('website', e.target.value)} placeholder="e.g. yourwebsite.com" />
        </div>
        <div className="input-group">
          <label className="input-label">LinkedIn Profile URL</label>
          <input className="input-field" value={personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} placeholder="e.g. linkedin.com/in/username" />
        </div>
        <div className="input-group">
          <label className="input-label">GitHub Profile URL</label>
          <input className="input-field" value={personal.github} onChange={e => updatePersonal('github', e.target.value)} placeholder="e.g. github.com/username" />
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Professional Summary</label>
        <div style={{ position: 'relative' }}>
          <textarea 
            className="input-field" 
            style={{ paddingBottom: '3.5rem', minHeight: '150px' }}
            value={personal.summary} 
            onChange={e => updatePersonal('summary', e.target.value)} 
            placeholder="Write a compelling overview of your career, key skills, and what you bring to the table..."
          />
          <AISuggestButton 
            field="summary" 
            value={personal.summary} 
            onSuggest={(improved) => updatePersonal('summary', improved)} 
          />
        </div>
      </div>
    </div>
  );
}

function EducationStep() {
  const { data, addItem, updateItem, removeItem } = useResume();
  
  const handleAdd = () => {
    addItem('education', { degree: '', school: '', year: '' });
  };

  return (
    <div>
      <AnimatePresence>
        {data.education.map((edu) => (
          <motion.div 
            key={edu.id} 
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass" 
            style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}
          >
            <button onClick={() => removeItem('education', edu.id)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-tertiary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <Trash2 size={20} />
            </button>
            <div className="grid-cols-2">
              <div className="input-group">
                <label className="input-label">Degree / Certification</label>
                <input className="input-field" value={edu.degree} onChange={e => updateItem('education', edu.id, 'degree', e.target.value)} placeholder="e.g. B.S. Computer Science" />
              </div>
              <div className="input-group">
                <label className="input-label">Institution</label>
                <input className="input-field" value={edu.school} onChange={e => updateItem('education', edu.id, 'school', e.target.value)} placeholder="e.g. Stanford University" />
              </div>
            </div>
            <div className="input-group" style={{ width: 'calc(50% - 1rem)' }}>
              <label className="input-label">Graduation Year</label>
              <input className="input-field" value={edu.year} onChange={e => updateItem('education', edu.id, 'year', e.target.value)} placeholder="e.g. 2024" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button className="btn btn-secondary" onClick={handleAdd} style={{ width: '100%', borderStyle: 'dashed' }}><Plus size={18} /> Add Education Record</button>
    </div>
  );
}

function ExperienceStep() {
  const { data, addItem, updateItem, removeItem } = useResume();
  
  const handleAdd = () => {
    addItem('experience', { role: '', company: '', duration: '', description: '' });
  };

  return (
    <div>
      <AnimatePresence>
        {data.experience.map((exp) => (
          <motion.div 
            key={exp.id} 
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass" 
            style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}
          >
            <button onClick={() => removeItem('experience', exp.id)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-tertiary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <Trash2 size={20} />
            </button>
            <div className="grid-cols-2">
              <div className="input-group">
                <label className="input-label">Job Title / Role</label>
                <input className="input-field" value={exp.role} onChange={e => updateItem('experience', exp.id, 'role', e.target.value)} placeholder="e.g. Product Designer" />
              </div>
              <div className="input-group">
                <label className="input-label">Company Name</label>
                <input className="input-field" value={exp.company} onChange={e => updateItem('experience', exp.id, 'company', e.target.value)} placeholder="e.g. Acme Corp" />
              </div>
            </div>
            <div className="input-group" style={{ width: 'calc(50% - 1rem)' }}>
              <label className="input-label">Employment Period</label>
              <input className="input-field" value={exp.duration} onChange={e => updateItem('experience', exp.id, 'duration', e.target.value)} placeholder="e.g. Jan 2022 - Present" />
            </div>
            <div className="input-group">
              <label className="input-label">Key Responsibilities & Achievements</label>
              <div style={{ position: 'relative' }}>
                <textarea 
                  className="input-field" 
                  value={exp.description} 
                  onChange={e => updateItem('experience', exp.id, 'description', e.target.value)} 
                  placeholder="Detail your impact, projects lead, and metrics improved..."
                />
                <AISuggestButton 
                  field="experience" 
                  value={exp.description} 
                  onSuggest={(improved) => updateItem('experience', exp.id, 'description', improved)} 
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button className="btn btn-secondary" onClick={handleAdd} style={{ width: '100%', borderStyle: 'dashed' }}><Plus size={18} /> Add Work Experience</button>
    </div>
  );
}

function SkillsStep() {
  const { data, addItem, updateItem, removeItem } = useResume();
  const [newSkill, setNewSkill] = useState('');
  
  const handleAdd = () => {
    if (newSkill.trim()) {
      // Split by comma if user inputs multiple skills
      const skillsArr = newSkill.split(',').map(s => s.trim()).filter(s => s);
      skillsArr.forEach(skill => {
        addItem('skills', { name: skill });
      });
      setNewSkill('');
    }
  };

  return (
    <div>
      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
        <label className="input-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Add New Skills (comma separated)</label>
        <div className="input-group flex-center" style={{ flexDirection: 'row', gap: '1rem' }}>
          <input 
            className="input-field" 
            value={newSkill} 
            onChange={e => setNewSkill(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="e.g. React, Node.js, UI/UX Design" 
            style={{ flex: 1, marginBottom: 0 }}
          />
          <button className="btn btn-primary" onClick={handleAdd} style={{ padding: '0.875rem 2rem' }}>Add</button>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
          <AnimatePresence>
            {data.skills.map(skill => (
              <motion.div 
                key={skill.id} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                className="glass" 
                style={{ padding: '0.5rem 1.25rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,240,255,0.2)' }}
              >
                <span style={{ fontWeight: 500 }}>{skill.name}</span>
                <button onClick={() => removeItem('skills', skill.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  &times;
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ProjectsStep() {
  const { data, addItem, updateItem, removeItem } = useResume();
  
  const handleAdd = () => {
    addItem('projects', { title: '', description: '', link: '' });
  };

  return (
    <div>
      <AnimatePresence>
        {data.projects.map((proj) => (
          <motion.div 
            key={proj.id} 
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass" 
            style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}
          >
            <button onClick={() => removeItem('projects', proj.id)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-tertiary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <Trash2 size={20} />
            </button>
            <div className="grid-cols-2">
              <div className="input-group">
                <label className="input-label">Project Title</label>
                <input className="input-field" value={proj.title} onChange={e => updateItem('projects', proj.id, 'title', e.target.value)} placeholder="e.g. Crypto Dashboard" />
              </div>
              <div className="input-group">
                <label className="input-label">Live Link / Repository (optional)</label>
                <input className="input-field" value={proj.link} onChange={e => updateItem('projects', proj.id, 'link', e.target.value)} placeholder="e.g. github.com/username/project" />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Project Description & Tech Stack</label>
              <div style={{ position: 'relative' }}>
                <textarea 
                  className="input-field" 
                  value={proj.description} 
                  onChange={e => updateItem('projects', proj.id, 'description', e.target.value)} 
                  placeholder="What problem did you solve? What technologies did you use?"
                />
                <AISuggestButton 
                  field="projects" 
                  value={proj.description} 
                  onSuggest={(improved) => updateItem('projects', proj.id, 'description', improved)} 
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button className="btn btn-secondary" onClick={handleAdd} style={{ width: '100%', borderStyle: 'dashed' }}><Plus size={18} /> Add Notable Project</button>
    </div>
  );
}

function CertificationsStep() {
  const { data, addItem, updateItem, removeItem } = useResume();
  
  const handleAdd = () => {
    addItem('certifications', { title: '', issuer: '', year: '', description: '' });
  };

  return (
    <div>
      <AnimatePresence>
        {data.certifications.map((cert) => (
          <motion.div 
            key={cert.id} 
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass" 
            style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}
          >
            <button onClick={() => removeItem('certifications', cert.id)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-tertiary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <Trash2 size={20} />
            </button>
            <div className="grid-cols-2">
              <div className="input-group">
                <label className="input-label">Award / Certification Title</label>
                <input className="input-field" value={cert.title} onChange={e => updateItem('certifications', cert.id, 'title', e.target.value)} placeholder="e.g. AWS Certified Developer" />
              </div>
              <div className="input-group">
                <label className="input-label">Issuer / Organization</label>
                <input className="input-field" value={cert.issuer} onChange={e => updateItem('certifications', cert.id, 'issuer', e.target.value)} placeholder="e.g. Amazon Web Services" />
              </div>
            </div>
            <div className="input-group" style={{ width: 'calc(50% - 1rem)' }}>
              <label className="input-label">Year / Date</label>
              <input className="input-field" value={cert.year} onChange={e => updateItem('certifications', cert.id, 'year', e.target.value)} placeholder="e.g. 2024" />
            </div>
            <div className="input-group">
              <label className="input-label">Short Description (Optional)</label>
              <div style={{ position: 'relative' }}>
                <textarea 
                  className="input-field" 
                  value={cert.description} 
                  onChange={e => updateItem('certifications', cert.id, 'description', e.target.value)} 
                  placeholder="e.g. Secured 1st place among 500+ participants by building an AI-powered app."
                />
                <AISuggestButton 
                  field="general" 
                  value={cert.description} 
                  onSuggest={(improved) => updateItem('certifications', cert.id, 'description', improved)} 
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button className="btn btn-secondary" onClick={handleAdd} style={{ width: '100%', borderStyle: 'dashed' }}><Plus size={18} /> Add Certification or Award</button>
    </div>
  );
}

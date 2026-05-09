import { motion } from 'framer-motion';
import { X } from 'lucide-react';

/* Layout 1: Sidebar Left (Modern/Developer) */
function SidebarLayout({ data, color, onClose }) {
  return <BaseModal onClose={onClose}><div style={{ display: 'flex', fontFamily: 'Inter,sans-serif', minHeight: '900px' }}>
    <div style={{ width: '35%', background: color, padding: '2rem 1.25rem', color: '#fff' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800 }}>{data.name.split(' ').map(n=>n[0]).join('')}</div>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', lineHeight: 1.5, fontSize: '0.7rem' }}>
        <div style={{ color: 'rgba(255,255,255,0.8)' }}>✉ {data.email}</div>
        <div style={{ color: 'rgba(255,255,255,0.8)' }}>📱 {data.phone}</div>
        <div style={{ color: 'rgba(255,255,255,0.8)' }}>📍 {data.location}</div>
        <div style={{ color: 'rgba(255,255,255,0.6)' }}>🔗 {data.linkedin}</div>
      </div>
      <SideSection title="Technical Skills" color={color}>{data.skills.map(s=><div key={s.name} style={{ marginBottom: '0.5rem' }}><div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.68rem', color:'rgba(255,255,255,0.85)', marginBottom:'2px' }}><span>{s.name}</span><span>{s.w}%</span></div><div style={{ width:'100%', height:'4px', background:'rgba(255,255,255,0.1)', borderRadius:'2px' }}><div style={{ width:`${s.w}%`, height:'100%', background:'rgba(255,255,255,0.6)', borderRadius:'2px' }}/></div></div>)}</SideSection>
      <SideSection title="Education" color={color}><div style={{ fontSize:'0.7rem', fontWeight:600 }}>{data.education.degree}</div><div style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.7)' }}>{data.education.school}</div><div style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.6)' }}>{data.education.year} • {data.education.gpa}</div></SideSection>
      <SideSection title="Certifications" color={color}>{data.certs.map(c=><div key={c} style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.7)', marginBottom:'0.25rem' }}>• {c}</div>)}</SideSection>
      <SideSection title="Languages" color={color}><div style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.7)', lineHeight:1.5 }}>{data.languages}</div></SideSection>
    </div>
    <MainContent data={data} color={color} />
  </div></BaseModal>;
}

/* Layout 2: Header Top (Minimal/Fresher) */
function HeaderLayout({ data, color, onClose }) {
  return <BaseModal onClose={onClose}><div style={{ fontFamily: 'Inter,sans-serif', minHeight: '900px', background: '#fff' }}>
    {/* Full-width header */}
    <div style={{ background: color, padding: '2rem 2.5rem', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, flexShrink: 0 }}>{data.name.split(' ').map(n=>n[0]).join('')}</div>
        <div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'Poppins,sans-serif' }}>{data.name}</div>
          <div style={{ fontSize: '0.95rem', opacity: 0.9, fontWeight: 500 }}>{data.title}</div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.7rem', marginTop: '0.5rem', opacity: 0.8 }}>
            <span>✉ {data.email}</span><span>📱 {data.phone}</span><span>📍 {data.location}</span>
          </div>
        </div>
      </div>
    </div>
    {/* Two-column body */}
    <div style={{ display: 'flex', padding: '1.5rem 2.5rem', gap: '2rem' }}>
      <div style={{ width: '65%' }}>
        <Sec title="Professional Summary" color={color}><p style={{ fontSize:'0.75rem', color:'#4B5563', lineHeight:1.65, margin:0 }}>{data.summary}</p></Sec>
        <Sec title="Work Experience" color={color}>{data.experience.map(e=><ExpBlock key={e.company} e={e} color={color} />)}</Sec>
        <Sec title="Key Projects" color={color}>{data.projects.map(p=><div key={p.name} style={{ marginBottom:'0.5rem' }}><div style={{ fontSize:'0.78rem', fontWeight:700, color:'#111827' }}>{p.name} <span style={{ fontWeight:400, color:'#6B7280', fontSize:'0.68rem' }}>— {p.tech}</span></div><div style={{ fontSize:'0.7rem', color:'#4B5563', lineHeight:1.5 }}>• {p.desc}</div></div>)}</Sec>
      </div>
      <div style={{ width: '35%' }}>
        <Sec title="Skills" color={color}>{data.skills.map(s=><div key={s.name} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.72rem', padding:'0.25rem 0', borderBottom:'1px solid #F3F4F6' }}><span style={{ color:'#374151' }}>{s.name}</span><span style={{ color, fontWeight:600 }}>{s.w}%</span></div>)}</Sec>
        <Sec title="Education" color={color}><div style={{ fontSize:'0.75rem', fontWeight:600, color:'#111827' }}>{data.education.degree}</div><div style={{ fontSize:'0.7rem', color:'#6B7280' }}>{data.education.school} • {data.education.year}</div><div style={{ fontSize:'0.7rem', color:'#6B7280' }}>GPA: {data.education.gpa}</div></Sec>
        <Sec title="Certifications" color={color}>{data.certs.map(c=><div key={c} style={{ fontSize:'0.7rem', color:'#4B5563', marginBottom:'0.2rem' }}>✓ {c}</div>)}</Sec>
        <Sec title="Languages" color={color}><div style={{ fontSize:'0.7rem', color:'#4B5563' }}>{data.languages}</div></Sec>
      </div>
    </div>
  </div></BaseModal>;
}

/* Layout 3: Classic Two-Column (Executive/Creative) */
function ClassicLayout({ data, color, onClose }) {
  return <BaseModal onClose={onClose}><div style={{ fontFamily: 'Inter,sans-serif', minHeight: '900px', background: '#fff', padding: '2rem 2.5rem' }}>
    {/* Name header with underline */}
    <div style={{ textAlign: 'center', borderBottom: `3px solid ${color}`, paddingBottom: '1rem', marginBottom: '1.5rem' }}>
      <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Poppins,sans-serif', color: '#111827' }}>{data.name}</div>
      <div style={{ fontSize: '1rem', fontWeight: 600, color, marginBottom: '0.5rem' }}>{data.title}</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.72rem', color: '#6B7280', flexWrap: 'wrap' }}>
        <span>{data.email}</span><span>{data.phone}</span><span>{data.location}</span><span>{data.linkedin}</span>
      </div>
    </div>
    {/* Summary */}
    <Sec title="Professional Summary" color={color}><p style={{ fontSize:'0.78rem', color:'#4B5563', lineHeight:1.65, margin:0 }}>{data.summary}</p></Sec>
    {/* Experience - full width */}
    <Sec title="Professional Experience" color={color}>{data.experience.map(e=><ExpBlock key={e.company} e={e} color={color} />)}</Sec>
    {/* Two columns: Skills + Education/Certs */}
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ width: '50%' }}>
        <Sec title="Core Competencies" color={color}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {data.skills.map(s=><span key={s.name} style={{ padding:'0.3rem 0.75rem', background:`${color}10`, border:`1px solid ${color}30`, borderRadius:'99px', fontSize:'0.72rem', color:'#374151', fontWeight:500 }}>{s.name}</span>)}
          </div>
        </Sec>
        <Sec title="Key Projects" color={color}>{data.projects.map(p=><div key={p.name} style={{ marginBottom:'0.4rem' }}><div style={{ fontSize:'0.78rem', fontWeight:700, color:'#111827' }}>{p.name}</div><div style={{ fontSize:'0.68rem', color:'#6B7280' }}>{p.tech}</div><div style={{ fontSize:'0.7rem', color:'#4B5563' }}>• {p.desc}</div></div>)}</Sec>
      </div>
      <div style={{ width: '50%' }}>
        <Sec title="Education" color={color}><div style={{ fontSize:'0.78rem', fontWeight:600, color:'#111827' }}>{data.education.degree}</div><div style={{ fontSize:'0.72rem', color:'#6B7280' }}>{data.education.school} | {data.education.year}</div><div style={{ fontSize:'0.72rem', color:'#6B7280' }}>GPA: {data.education.gpa}</div></Sec>
        <Sec title="Certifications" color={color}>{data.certs.map(c=><div key={c} style={{ fontSize:'0.72rem', color:'#4B5563', marginBottom:'0.3rem', paddingLeft:'0.6rem', borderLeft:`2px solid ${color}` }}>{c}</div>)}</Sec>
        <Sec title="Languages" color={color}><div style={{ fontSize:'0.72rem', color:'#4B5563' }}>{data.languages}</div></Sec>
      </div>
    </div>
  </div></BaseModal>;
}

/* ---- Shared helpers ---- */
function BaseModal({ children, onClose }) {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}>
      <motion.div initial={{ scale:0.9,y:30 }} animate={{ scale:1,y:0 }} exit={{ scale:0.9,y:30 }}
        style={{ width:'720px', maxWidth:'95vw', maxHeight:'92vh', overflowY:'auto', borderRadius:'12px', boxShadow:'0 40px 80px rgba(0,0,0,0.6)', position:'relative', background:'#fff' }}
        onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{ position:'sticky', top:'0.75rem', float:'right', marginRight:'0.75rem', zIndex:10, background:'rgba(0,0,0,0.7)', border:'none', borderRadius:'50%', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#fff' }}><X size={18}/></button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function SideSection({ title, children }) {
  return <div style={{ borderTop:'1px solid rgba(255,255,255,0.12)', paddingTop:'0.8rem', marginBottom:'0.8rem' }}>
    <div style={{ fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>{title}</div>
    {children}
  </div>;
}

function Sec({ title, color, children }) {
  return <div style={{ marginBottom:'1rem' }}>
    <div style={{ fontSize:'0.82rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', color:'#374151', marginBottom:'0.4rem', borderBottom:`2px solid ${color}`, paddingBottom:'0.2rem', display:'inline-block' }}>{title}</div>
    <div style={{ marginTop:'0.3rem' }}>{children}</div>
  </div>;
}

function ExpBlock({ e, color }) {
  return <div style={{ marginBottom:'0.8rem', paddingLeft:'0.75rem', borderLeft:`2px solid ${color}` }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', flexWrap:'wrap' }}>
      <div style={{ fontSize:'0.8rem', fontWeight:700, color:'#111827' }}>{e.role} — {e.company}</div>
      <div style={{ fontSize:'0.7rem', color, fontWeight:600 }}>{e.period}</div>
    </div>
    {e.bullets.map((b,i)=><div key={i} style={{ fontSize:'0.72rem', color:'#4B5563', lineHeight:1.55, marginTop:'0.15rem' }}>• {b}</div>)}
  </div>;
}

function MainContent({ data, color }) {
  return <div style={{ width:'65%', background:'#fff', padding:'2rem 1.5rem', color:'#111827' }}>
    <div style={{ borderBottom:`3px solid ${color}`, paddingBottom:'0.6rem', marginBottom:'1rem' }}>
      <div style={{ fontSize:'1.6rem', fontWeight:800, fontFamily:'Poppins,sans-serif', lineHeight:1.1 }}>{data.name}</div>
      <div style={{ fontSize:'0.9rem', fontWeight:600, color, marginTop:'0.2rem' }}>{data.title}</div>
    </div>
    <Sec title="Professional Summary" color={color}><p style={{ fontSize:'0.75rem', color:'#4B5563', lineHeight:1.65, margin:0 }}>{data.summary}</p></Sec>
    <Sec title="Work Experience" color={color}>{data.experience.map(e=><ExpBlock key={e.company} e={e} color={color} />)}</Sec>
    <Sec title="Key Projects" color={color}>{data.projects.map(p=><div key={p.name} style={{ marginBottom:'0.5rem' }}><div style={{ fontSize:'0.78rem', fontWeight:700, color:'#111827' }}>{p.name} <span style={{ fontWeight:400, color:'#6B7280', fontSize:'0.68rem' }}>— {p.tech}</span></div><div style={{ fontSize:'0.7rem', color:'#4B5563', lineHeight:1.5 }}>• {p.desc}</div></div>)}</Sec>
  </div>;
}

/* Map template key to layout */
const layoutMap = {
  modern: SidebarLayout,
  developer: SidebarLayout,
  minimal: HeaderLayout,
  fresher: HeaderLayout,
  executive: ClassicLayout,
  creative: ClassicLayout,
};

export default function ResumeModal({ templateKey, data, color, onClose }) {
  const Layout = layoutMap[templateKey] || SidebarLayout;
  return <Layout data={data} color={color} onClose={onClose} />;
}

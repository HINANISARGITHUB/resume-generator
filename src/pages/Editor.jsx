import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { ref, set, push, update, onValue } from 'firebase/database';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Editor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resumeId = new URLSearchParams(location.search).get('id');
  const [activeTab, setActiveTab] = useState('personal');

  const [formData, setFormData] = useState({
    personal: { fullName: '', email: '', phone: '', jobTitle: '', summary: '' },
    education: [{ school: '', degree: '', year: '' }],
    experience: [{ company: '', role: '', duration: '', desc: '' }],
    projects: [{ title: '', desc: '' }],
    certifications: [{ name: '', provider: '', year: '' }],
    skills: [''],
    languages: [''],
  });

  useEffect(() => {
    if (resumeId && auth.currentUser) {
      const userId = auth.currentUser.uid;
      const resumeRef = ref(db, `resumes/${userId}/${resumeId}`);
      onValue(resumeRef, (snapshot) => {
        const data = snapshot.val();
        if (data) setFormData(data);
      }, { onlyOnce: true });
    }
  }, [resumeId]);

  const handlePersonal = (field, val) =>
    setFormData({ ...formData, personal: { ...formData.personal, [field]: val } });

  const handleArrayChange = (section, index, field, val) => {
    const updated = [...formData[section]];
    if (field !== null) {
      updated[index][field] = val;
    } else {
      updated[index] = val;
    }
    setFormData({ ...formData, [section]: updated });
  };

  const addField = (section) => {
    let template;
    switch(section) {
      case 'education': template = { school: '', degree: '', year: '' }; break;
      case 'experience': template = { company: '', role: '', duration: '', desc: '' }; break;
      case 'projects': template = { title: '', desc: '' }; break;
      case 'certifications': template = { name: '', provider: '', year: '' }; break;
      case 'skills':
      case 'languages': template = ''; break;
      default: template = {};
    }
    setFormData({ ...formData, [section]: [...formData[section], template] });
  };

  const removeField = (section, index) => {
    setFormData({ ...formData, [section]: formData[section].filter((_, i) => i !== index) });
  };

  const saveToFirebase = async () => {
    try {
      if (!auth.currentUser) {
        Swal.fire({ title: 'Error', text: 'Please login first', icon: 'error' });
        return;
      }
      const userId = auth.currentUser.uid;
      const payload = { ...formData, updatedAt: new Date().toISOString() };
      let finalId = resumeId;

      if (resumeId) {
        await update(ref(db, `resumes/${userId}/${resumeId}`), payload);
      } else {
        const newRef = push(ref(db, `resumes/${userId}`));
        await set(newRef, payload);
        finalId = newRef.key;
      }

      Swal.fire({ title: 'Saved!', icon: 'success', timer: 1000, showConfirmButton: false });
      setTimeout(() => navigate(`/preview/${finalId}`), 1100);
    } catch (err) {
      Swal.fire({ title: 'Error', text: err.message, icon: 'error' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#0b0f1a] text-white overflow-hidden font-sans">
      
      {/* LEFT: FORM SECTION */}
      <div className="w-full lg:w-1/2 overflow-y-auto p-4 md:p-10 border-b lg:border-b-0 lg:border-r border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-500 italic">Resume Builder</h2>
          <button onClick={saveToFirebase} className="bg-blue-600 px-8 py-2.5 rounded-2xl font-bold text-sm shadow-lg hover:bg-blue-500 transition-all">
            {resumeId ? 'Update Resume' : 'Save Resume'}
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['personal', 'education', 'experience', 'projects', 'certifications', 'skills', 'languages'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} 
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all border ${activeTab === t ? 'bg-blue-600 border-blue-400' : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Dynamic Inputs */}
        <div className="space-y-6">
          {activeTab === 'personal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-6 rounded-3xl border border-white/10">
              <input type="text" placeholder="Full Name" value={formData.personal.fullName} className="md:col-span-2 w-full bg-[#161b2c] p-4 rounded-2xl border border-white/5 outline-none focus:ring-2 focus:ring-blue-500" onChange={e => handlePersonal('fullName', e.target.value)} />
              <input type="email" placeholder="Email" value={formData.personal.email} className="w-full bg-[#161b2c] p-4 rounded-2xl border border-white/5 outline-none" onChange={e => handlePersonal('email', e.target.value)} />
              <input type="text" placeholder="Phone" value={formData.personal.phone} className="w-full bg-[#161b2c] p-4 rounded-2xl border border-white/5 outline-none" onChange={e => handlePersonal('phone', e.target.value)} />
              <input type="text" placeholder="Job Title" value={formData.personal.jobTitle} className="md:col-span-2 w-full bg-[#161b2c] p-4 rounded-2xl border border-white/5 outline-none" onChange={e => handlePersonal('jobTitle', e.target.value)} />
              <textarea placeholder="Summary" value={formData.personal.summary} className="md:col-span-2 w-full bg-[#161b2c] p-4 rounded-2xl border border-white/5 h-32 outline-none resize-none" onChange={e => handlePersonal('summary', e.target.value)} />
            </div>
          )}

          {['education', 'experience', 'projects', 'certifications'].includes(activeTab) && (
            <div className="space-y-4">
              {formData[activeTab].map((item, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10 relative grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button onClick={() => removeField(activeTab, i)} className="absolute top-4 right-4 text-red-500 text-[10px] font-bold">Remove</button>
                  {Object.keys(item).map(key => (
                    <input key={key} type="text" placeholder={key.toUpperCase()} value={item[key]} className={`w-full bg-[#161b2c] p-4 rounded-2xl border border-white/5 outline-none ${key === 'desc' ? 'md:col-span-2' : ''}`} onChange={e => handleArrayChange(activeTab, i, key, e.target.value)} />
                  ))}
                </div>
              ))}
              <button onClick={() => addField(activeTab)} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-blue-400 font-bold hover:bg-white/5">+ Add New {activeTab}</button>
            </div>
          )}

          {(activeTab === 'skills' || activeTab === 'languages') && (
            <div className="grid grid-cols-2 gap-4">
              {formData[activeTab].map((item, i) => (
                <div key={i} className="flex bg-[#161b2c] p-3 rounded-2xl border border-white/5 items-center">
                  <input type="text" value={item} placeholder={`New ${activeTab}`} className="flex-1 bg-transparent px-2 outline-none text-sm" onChange={e => handleArrayChange(activeTab, i, null, e.target.value)} />
                  <button onClick={() => removeField(activeTab, i)} className="text-red-500 px-2">×</button>
                </div>
              ))}
              <button onClick={() => addField(activeTab)} className="col-span-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-blue-400">+ Add {activeTab}</button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: LIVE PREVIEW (FULL SYNC) */}
      <div className="w-full lg:w-1/2 bg-[#1a1f2e] flex justify-center p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-800 p-10 md:p-14 shadow-2xl origin-top scale-[0.55] sm:scale-100 lg:scale-[0.75] xl:scale-[0.85] flex flex-col">
          
          {/* Header */}
          <header className="border-b-2 border-slate-900 pb-4 mb-6">
            <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">{formData.personal.fullName || "YOUR NAME"}</h1>
            <p className="text-blue-600 text-lg font-bold mt-1 uppercase tracking-widest">{formData.personal.jobTitle || "PROFESSIONAL TITLE"}</p>
            <div className="flex gap-4 mt-3 text-[10px] font-semibold text-slate-500">
              <span>{formData.personal.email}</span>
              <span>{formData.personal.phone}</span>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-8 flex-1">
            {/* Sidebar Column */}
            <div className="col-span-4 border-r border-slate-100 pr-4 space-y-6">
              {/* Skills */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-900 uppercase border-b border-slate-900 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {formData.skills.map((s, i) => s && <span key={i} className="bg-slate-100 px-2 py-0.5 text-[9px] font-medium rounded-sm">{s}</span>)}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-900 uppercase border-b border-slate-900 mb-2">Languages</h3>
                {formData.languages.map((l, i) => l && <p key={i} className="text-[10px] text-slate-600 leading-tight">• {l}</p>)}
              </div>

              {/* Education */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-900 uppercase border-b border-slate-900 mb-2">Education</h3>
                {formData.education.map((edu, i) => edu.school && (
                  <div key={i} className="mb-3">
                    <p className="font-bold text-[9px] leading-tight">{edu.degree}</p>
                    <p className="text-[8px] text-slate-500">{edu.school} | {edu.year}</p>
                  </div>
                ))}
              </div>

              {/* Certifications (Moved to Sidebar) */}
              {formData.certifications[0]?.name && (
                <div>
                  <h3 className="text-[11px] font-bold text-slate-900 uppercase border-b border-slate-900 mb-2">Certificates</h3>
                  {formData.certifications.map((cert, i) => cert.name && (
                    <div key={i} className="mb-2">
                      <p className="font-bold text-[9px] leading-tight">{cert.name}</p>
                      <p className="text-[8px] text-slate-500">{cert.provider}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Main Column */}
            <div className="col-span-8 space-y-6">
              {/* Profile Summary */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-900 uppercase border-b border-slate-900 mb-2">Profile</h3>
                <p className="text-[10px] text-slate-600 leading-relaxed text-justify italic">{formData.personal.summary}</p>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-900 uppercase border-b border-slate-900 mb-2">Experience</h3>
                {formData.experience.map((exp, i) => exp.company && (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-[10px] uppercase text-slate-800">{exp.role}</h4>
                      <span className="text-[8px] text-slate-400 font-bold">{exp.duration}</span>
                    </div>
                    <p className="text-blue-600 font-bold text-[9px]">{exp.company}</p>
                    <p className="text-[9px] text-slate-500 mt-1 leading-normal">{exp.desc}</p>
                  </div>
                ))}
              </div>

              {/* Projects */}
              {formData.projects[0]?.title && (
                <div>
                  <h3 className="text-[11px] font-bold text-slate-900 uppercase border-b border-slate-900 mb-2">Projects</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {formData.projects.map((proj, i) => proj.title && (
                      <div key={i} className="bg-slate-50 p-2 rounded border border-slate-100">
                        <h4 className="font-bold text-[10px] uppercase text-slate-800 underline decoration-blue-200">{proj.title}</h4>
                        <p className="text-[9px] text-slate-500 mt-1">{proj.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
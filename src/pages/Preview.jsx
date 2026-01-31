import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { db, auth } from '../firebase'; 
import { ref, onValue } from 'firebase/database'; 
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { Mail, Phone, MapPin, ArrowLeft, Download, LogOut } from 'lucide-react';

const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const resumeRef = ref(db, `resumes/${user.uid}/${id}`);
        onValue(resumeRef, (snapshot) => {
          const data = snapshot.val();
          if (data) setResumeData(data);
        }, { onlyOnce: true });
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribeAuth();
  }, [id, navigate]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resumeData?.personal?.fullName || 'Resume'}_CV`,
  });

  if (!resumeData) return (
    <div className="h-screen bg-[#0b0f1a] flex items-center justify-center text-white italic">
      Loading Professional Resume...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] py-10 px-4">
      {/* Navigation Bar */}
      <div className="max-w-[210mm] mx-auto flex justify-between mb-6 bg-[#1e293b] p-4 rounded-xl shadow-lg border border-white/5">
        <div className="flex gap-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm font-medium">
            <ArrowLeft size={18} /> Dashboard
          </Link>
          <button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition-all shadow-lg shadow-blue-500/20">
            <Download size={18} /> Save PDF
          </button>
        </div>
        <button onClick={() => signOut(auth).then(() => navigate('/'))} className="text-red-400 hover:text-red-300 text-sm font-bold flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-400/10 transition-all">
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* --- RESUME MAIN BODY --- */}
      <div className="w-full flex justify-center pb-20 overflow-x-auto">
        <div 
          ref={componentRef} 
          className="bg-white text-slate-800 w-[210mm] shadow-2xl flex flex-row print:shadow-none h-fit"
          style={{ 
            minHeight: '200mm', // Ye print ke liye A4 ensure karega
            fontFamily: "'Inter', sans-serif" 
          }}
        >
          
          {/* LEFT SIDEBAR (Fixed Width & Flexible Height) */}
          <div className="w-[40%] bg-[#f8fafc] border-r border-slate-100 p-8 flex flex-col gap-10 self-stretch shrink-0">
            <div>
               <h1 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter ">
                 {resumeData.personal?.fullName}
               </h1>
               <p className="text-blue-600 text-[10px] font-bold mt-2 uppercase tracking-[0.2em] leading-tight">
                 {resumeData.personal?.jobTitle}
               </p>
            </div>

            <div className="space-y-5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b pb-1">Contact</h3>
              <div className="space-y-3 text-[11px] text-slate-600">
                <div className="flex items-start gap-3">
                    <Mail size={13} className="text-blue-500 mt-0.5 shrink-0" /> 
                    <span className="break-all leading-snug">{resumeData.personal?.email}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone size={13} className="text-blue-500 shrink-0" /> 
                    <span>{resumeData.personal?.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                    <MapPin size={13} className="text-blue-500 mt-0.5 shrink-0" /> 
                    <span className="leading-snug">{resumeData.personal?.address}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b pb-1">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills?.map((skill, i) => skill && (
                  <span key={i} className="bg-white text-slate-700 text-[10px] px-2.5 py-1 rounded border border-slate-200 shadow-sm font-medium uppercase tracking-wider">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {resumeData.languages?.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b pb-1">Languages</h3>
                <div className="space-y-2">
                  {resumeData.languages.map((lang, i) => lang && (
                    <div key={i} className="text-[11px] font-bold text-slate-600 flex items-center gap-2 capitalize">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> {lang}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* MAIN CONTENT (Responsive Height) */}
          <div className="flex-1 p-12 flex flex-col gap-10 h-full">
            <section>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-3">
                <span className="w-10 h-2 bg-blue-600"></span> Profile
              </h3>
              <p className="text-[12px] text-slate-600 leading-relaxed text-justify italic">
                {resumeData.personal?.summary}
              </p>
            </section>

            <section>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-3">
                 <span className="w-10 h-1 bg-blue-600"></span> Experience
              </h3>
              <div className="space-y-8">
                {resumeData.experience?.map((exp, i) => exp.company && (
                  <div key={i} className="relative group">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-slate-900 text-[13px] uppercase">{exp.role}</h4>
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md uppercase tracking-wider">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-blue-600 mb-2">{exp.company}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {resumeData.projects?.[0]?.title && (
              <section>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-5 flex items-center gap-3">
                  <span className="w-10 h-1 bg-blue-600"></span> Projects
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {resumeData.projects.map((proj, i) => proj.title && (
                    <div key={i} className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-slate-800 text-xs uppercase mb-1 tracking-wide">{proj.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-normal">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom Grid for Education & Certifications */}
            <div className="grid grid-cols-2 gap-10 mt-auto pt-10">
                <section>
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b pb-1">Education</h3>
                  {resumeData.education?.map((edu, i) => edu.school && (
                    <div key={i} className="mb-3">
                      <h4 className="font-bold text-slate-800 text-[12px] leading-tight">{edu.degree}</h4>
                      <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-tight">
                        {edu.school} | {edu.year}
                      </p>
                    </div>
                  ))}
                </section>

                {resumeData.certifications?.[0]?.name && (
                  <section>
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b pb-1">Certifications</h3>
                    {resumeData.certifications.map((cert, i) => cert.name && (
                      <div key={i} className="mb-3">
                        <h4 className="font-bold text-slate-800 text-[12px] leading-tight">{cert.name}</h4>
                        <p className="text-[10px] text-slate-500 font-medium mt-1">{cert.provider}</p>
                      </div>
                    ))}
                  </section>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
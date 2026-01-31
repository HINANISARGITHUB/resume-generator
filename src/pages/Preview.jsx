
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
          if (data) {
            setResumeData(data);
          } else {
            console.error("No resume found at this ID");
          }
        }, { onlyOnce: true });
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribeAuth();
  }, [id, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resumeData?.personal?.fullName || 'Resume'}_CV`,
  });

  if (!resumeData) return (
    <div className="h-screen bg-[#0b0f1a] flex flex-col items-center justify-center text-white">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 mb-4"></div>
      <p className="text-xl font-medium tracking-tight">Loading Professional Resume...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] py-6 md:py-10 px-4 font-sans">
      {/* Navigation Bar - Width synced with A4 */}
      <div className="max-w-[210mm] mx-auto flex justify-between items-center mb-6 bg-[#1e293b] p-4 rounded-2xl shadow-xl border border-white/5">
        <div className="flex gap-4 items-center">
            <Link to="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white transition font-medium text-sm">
            <ArrowLeft size={18} /> Dashboard
            </Link>
            <button 
            onClick={handlePrint} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 text-sm"
            >
            <Download size={18} /> Save PDF
            </button>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-xl transition font-bold text-sm border border-red-400/20"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Resume Container */}
      <div className="w-full min-h-[40 flex justify-center overflow-x-auto pb-20">
        <div 
          ref={componentRef} 
          className="bg-white text-slate-800 w-[210mm] min-h-[297mm] h-auto shadow-2xl flex flex-row print:shadow-none print:w-[210mm] print:h-[297mm]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          
          {/* SIDEBAR - 30% of A4 */}
          <div className="w-[30%] bg-[#f8fafc] border-r border-slate-100 p-8 flex flex-col gap-8">
            <div>
               <h2 className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                 {resumeData.personal?.fullName || "Name Not Set"}
               </h2>
               <p className="text-blue-600 text-xs font-bold mt-2 uppercase tracking-widest">
                 {resumeData.personal?.jobTitle || "Job Title"}
               </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b pb-1">Contact</h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-3"><Mail size={14} className="text-blue-500" /> <span className="break-all">{resumeData.personal?.email}</span></div>
                <div className="flex items-center gap-3"><Phone size={14} className="text-blue-500" /> <span>{resumeData.personal?.phone}</span></div>
                <div className="flex items-center gap-3"><MapPin size={14} className="text-blue-500" /> <span>{resumeData.personal?.address || 'Location'}</span></div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b pb-1">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills?.map((skill, i) => skill && (
                  <span key={i} className="bg-slate-200/50 text-slate-700 text-[10px] px-2.5 py-1 rounded font-medium border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {resumeData.languages?.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b pb-1">Languages</h3>
                {resumeData.languages.map((lang, i) => lang && (
                  <div key={i} className="text-xs font-medium text-slate-600">
                    • {lang}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MAIN COLUMN - 70% of A4 */}
          <div className="w-[70%] p-12 flex flex-col gap-8">
            <section>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-3 border-l-4 border-blue-600 pl-4">Profile</h3>
              <p className="text-xs text-slate-600 leading-relaxed text-justify italic">{resumeData.personal?.summary}</p>
            </section>

            <section>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 border-l-4 border-blue-600 pl-4">Experience</h3>
              <div className="space-y-6">
                {resumeData.experience?.map((exp, i) => exp.company && (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-800 text-sm uppercase">{exp.role}</h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{exp.duration}</span>
                    </div>
                    <p className="text-xs font-bold text-blue-600 mb-2">{exp.company}</p>
                    <p className="text-xs text-slate-500 leading-normal">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {resumeData.projects?.[0]?.title && (
              <section>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 border-l-4 border-blue-600 pl-4">Projects</h3>
                <div className="grid grid-cols-1 gap-4">
                  {resumeData.projects.map((proj, i) => proj.title && (
                    <div key={i} className="p-4 bg-slate-50 rounded border border-slate-100">
                      <h4 className="font-bold text-slate-800 text-xs uppercase">{proj.title}</h4>
                      <p className="text-xs text-slate-500 mt-2">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="grid grid-cols-2 gap-10 mt-4">
                <section>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b pb-1">Education</h3>
                  {resumeData.education?.map((edu, i) => edu.school && (
                    <div key={i} className="mb-3">
                      <h4 className="font-bold text-slate-800 text-xs">{edu.degree}</h4>
                      <p className="text-[10px] text-slate-500">{edu.year}</p>
                    </div>
                  ))}
                </section>

                {resumeData.certifications?.[0]?.name && (
                  <section>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b pb-1">Certificates</h3>
                    {resumeData.certifications.map((cert, i) => cert.name && (
                      <div key={i} className="mb-3">
                        <h4 className="font-bold text-slate-800 text-xs">{cert.name}</h4>
                        <p className="text-[10px] text-slate-500">{cert.provider}</p>
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
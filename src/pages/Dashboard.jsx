import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
// Firestore ki jagah Database functions use karein
import { ref, onValue, remove } from 'firebase/database'; 
import { onAuthStateChanged } from 'firebase/auth'; 
import { Trash2, Edit3, Eye, FileText, Search, Plus } from 'lucide-react'; // Modern icons
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(true);
        // Realtime Database reference: resumes/userID
        const resumesRef = ref(db, `resumes/${user.uid}`);
        
        // Data fetch karne ke liye listener lagayein
        const unsubscribeData = onValue(resumesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Object ko array mein convert karein
            const list = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
            setResumes(list);
          } else {
            setResumes([]);
          }
          setLoading(false);
        }, (error) => {
          console.error("Data Fetch Error:", error);
          setLoading(false);
        });

        return () => unsubscribeData();
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const deleteResume = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "sure for delete resume!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      background: '#161b2c',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        const userId = auth.currentUser.uid;
        // Realtime database se item remove karein
        await remove(ref(db, `resumes/${userId}/${id}`));
        Swal.fire({ title: 'Deleted!', icon: 'success', background: '#161b2c', color: '#fff' });
      } catch (error) {
        Swal.fire({ title: 'Error', text: error.message, icon: 'error' });
      }
    }
  };

  const filteredResumes = resumes.filter(r => 
    r.personal?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    r.personal?.jobTitle?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              My Resumes
            </h1>
            <p className="text-gray-400 mt-2">Manage and edit your professional resumes</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search resumes..." 
                className="bg-white/5 border border-white/10 pl-10 pr-5 py-2.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm md:w-64"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Link 
              to="/editor" 
              className="bg-blue-600 px-8 py-2.5 rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all text-center flex items-center gap-2"
            >
              <Plus size={20} /> Create New
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredResumes.length > 0 ? (
              filteredResumes.map(res => (
                <div key={res.id} className="group relative">
                  <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-purple-600/20 rounded-[30px] transform rotate-3 group-hover:rotate-1 transition-all duration-300"></div>
                  
                  <div className="relative bg-[#161b2c] p-7 rounded-[30px] border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col h-full transform transition-transform duration-300 group-hover:-translate-y-2">
                    {/* Trash Icon Button */}
                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={() => deleteResume(res.id)} 
                        className="text-red-400 bg-red-400/10 p-2.5 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-90"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mb-8">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 text-blue-400">
                        <FileText size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {res.personal?.fullName || "Untitled"}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider font-medium">
                        {res.personal?.jobTitle || "No Professional Title"}
                      </p>
                    </div>

                    <div className="mt-auto flex gap-3">
                      <Link 
                        to={`/editor?id=${res.id}`} 
                        className="flex-1 flex items-center justify-center gap-2 bg-white/5 py-3 rounded-2xl text-sm font-semibold hover:bg-white/10 transition-all border border-white/5"
                      >
                        <Edit3 size={16} /> Edit
                      </Link>
                      <Link 
                        to={`/preview/${res.id}`} 
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 py-3 rounded-2xl text-sm font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all"
                      >
                        <Eye size={16} /> Preview
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-lg italic">No resumes found!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
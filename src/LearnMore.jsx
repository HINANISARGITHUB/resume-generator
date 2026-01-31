import "./App.css";
import React from 'react'



const FAQ = () => {
  const faqData = [
    {
      question: "What is a CV?",
      answer: "CV is an abbreviation of the Latin words curriculum vitae, which mean 'life course'. It includes education, qualifications, work experience, and skills to give employers a quick overview.",
      gradient: "from-purple-600 to-blue-600",
      tilt: "-rotate-1"
    },
    {
      question: "What should I include in my CV?",
      answer: "Your CV should contain relevant info: Personal details, Education, Work experience, and Skills. Keep it professional and ATS-friendly.",
      gradient: "from-blue-600 to-cyan-500",
      tilt: "rotate-1"
    },
    {
      question: "What is a chronological CV?",
      answer: "A chronological CV lists experience in reverse order — latest first. It's the most common format: contact info → summary → education → experience → skills.",
      gradient: "from-green-600 to-emerald-500",
      tilt: "-rotate-1"
    },
    {
      question: "How to make your own CV?",
      answer: "You can use Word or free tools. Or use our AI Resume Builder to download a professional, industry-tailored CV in just 15 minutes.",
      gradient: "from-orange-600 to-red-500",
      tilt: "rotate-1"
    }
  ];

  return (
    <section className="bg-[#0b0f1a] py-20 px-6 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading with Hover Gradient Effect */}
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 transition-all duration-300 hover:bg-linear-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent cursor-default">
          Frequently Asked Questions
        </h2>

        <div className="grid gap-12 md:grid-cols-2">
          {faqData.map((item, index) => (
            <div key={index} className="relative group">
              
              {/* Tilted Back Div - Your Signature Theme */}
              <div className={`absolute inset-0 bg-linear-to-r ${item.gradient} rounded-2xl transform ${item.tilt} opacity-80 transition-transform group-hover:rotate-0 duration-300 shadow-xl`}></div>

              {/* Main Card (Glassmorphism + Dark Navy) */}
              <div className="relative bg-[#161b2c] p-8 rounded-2xl border border-gray-700/50 h-full flex flex-col shadow-2xl">
                <h3 className="text-xl font-bold mb-4 text-white">
                  {item.question}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base mb-6 grow">
                  {item.answer}
                </p>

                {/* Decorative Progress Bar Line */}
                <div className="mt-auto">
                  <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden">
                    <div className={`h-full bg-linear-to-r ${item.gradient} w-full`}></div>
                  </div>
                  <div className="flex justify-end mt-2">
                     <span className="text-[10px] text-gray-500 font-mono tracking-widest">HELPFUL INFO</span>
                  </div>
                </div>
              </div>

            </div>
          ))}

          {/* Tips Card (Full Width) */}
          <div className="relative group md:col-span-2 mt-8">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-80 blur-[2px]"></div>
            <div className="relative bg-[#1a1f2e] p-8 rounded-2xl border border-gray-800 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-white text-center">Tips for creating your perfect CV</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-300">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Relevant information only</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Use bullet points</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div> Chronological layout</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Key info on first page</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Professional tone</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

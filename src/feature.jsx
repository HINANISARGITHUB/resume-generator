import "./App.css";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faBolt, faClock, faRocket } from "@fortawesome/free-solid-svg-icons";

const Features = () => {
  const featureData = [
    {
      title: "AI-Powered Content Generation",
      description: "Leverage Google's Gemini AI to create compelling resumes and cover letters tailored to your industry.",
      icon: <FontAwesomeIcon icon={faBolt} className="text-white text-xl" />,
      gradient: "from-purple-600 to-blue-600",
      tilt: "-rotate-2" // Left tilt
    },
    {
      title: "Professional Templates",
      description: "Choose from a variety of ATS-friendly templates designed by HR professionals.",
      icon: <FontAwesomeIcon icon={faFile} className="text-white text-xl" />,
      gradient: "from-blue-600 to-cyan-500",
      tilt: "rotate-2" // Right tilt
    },
    {
      title: "Real-time Preview",
      description: "See changes instantly as you edit, ensuring your document looks perfect before export.",
      icon: <FontAwesomeIcon icon={faClock} className="text-white text-xl" />,
      gradient: "from-green-600 to-emerald-400",
      tilt: "-rotate-2" // Left tilt
    },
    {
      title: "Quick Export",
      description: "Export your documents in multiple formats including PDF and Word, ready for submission.",
      icon: <FontAwesomeIcon icon={faRocket} className="text-white text-xl" />,
      gradient: "from-orange-600 to-red-500",
      tilt: "rotate-2" // Right tilt
    }
  ];

  return (
    <section className="bg-[#0b0f1a] py-24 px-6 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-blue-500 font-semibold tracking-widest text-sm uppercase">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">Everything you need to land your dream job</h2>
          <p className="text-gray-400 mt-4 text-1xl lg:max-w-2xl mx-auto">
            Our AI-powered platform helps you create professional resumes and cover letters that get noticed.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {featureData.map((item, index) => (
            <div key={index} className="relative group">
              
              {/* BACK DIV (Tilted Gradient) */}
               <div className={`absolute inset-0 bg-linear-to-r ${item.gradient} rounded-2xl transform ${item.tilt} transition-transform group-hover:rotate-0 duration-300 opacity-90 shadow-lg`}></div>

              
              <div className="relative bg-[#161b2c] p-6 rounded-2xl border border-gray-700/50  h-full flex flex-col min-h-80">
                 
                
                {/* Icon Box */}
                <div className={`w-12 h-12 bg-linear-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-8 shadow-xl shadow-black/20`}>
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-10 grow text-sm md:text-base">
                  {item.description}
                </p>

                {/* Progress Bar Area */}
                <div className="mt-auto pt-4">
                  <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden border border-gray-800">
                    <div className={`h-full bg-linear-to-r ${item.gradient} w-full`}></div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <span className="text-[10px] text-gray-500 font-mono font-bold tracking-widest">100% COMPLETE</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
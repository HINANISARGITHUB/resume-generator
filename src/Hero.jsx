import "./App.css";
import React from 'react';
import hero from "./assets/hero1.png"
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
   <section className="flex flex-col md:flex-row h-auto md:h-130 w-full bg-[#1e2246]">
  {/* Left Content Side */}
  <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-24 text-white py-12 md:py-0">
    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-snug sm:leading-tight mb-6 text-center md:text-left">
      Create Your Perfect <br />
      <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Resume & Cover Letter
      </span>
    </h1>
    
   
    <p className="text-gray-300 text-base sm:text-lg md:text-1xl mb-8 max-w-md sm:max-w-lg mx-auto md:mx-0 leading-relaxed text-center md:text-left">
    Build professional resumes and cover letters effortlessly. Highlight your skills, showcase your strengths, and get noticed by top companies.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
      <Link to="./learn" className="px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-md font-semibold hover:opacity-90 transition shadow-lg hover:duration-300 transform hover:scale-105">
        learn more
      </Link>

      <Link to="./signup" className="px-10 py-3 bg-white text-gray-900 rounded-md font-semibold hover:bg-gray-100 transition shadow-lg  hover:duration-300 transform hover:scale-105">
        SignUp
      </Link>
    </div>
  </div>

  {/* Right Image Side */}
  <div className="flex-1 relative overflow-hidden mt-8 md:mt-0">
    <img 
      src={hero}
      alt="Professional working on laptop" 
      className="w-full h-64 sm:h-96 md:h-130 object-cover object-center"
    />
  </div>
</section>

  );
};

export default HeroSection;
import React from 'react';

const CTASection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Main Background with Linear Gradient 
          Screenshot (570) ke mutabiq Blue to Purple gradient
      */}
      <div className="bg-linear-to-r from-blue-600 via-purple-600 to-purple-700 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          
          {/* Main Heading */}
          <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
            Ready to boost your career? <br />
            Start building your resume today.
          </h2>

          {/* Subtext */}
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have already landed their dream jobs 
            using our platform.
          </p>

          {/* White Action Button */}
          <button className="bg-white text-purple-700 font-bold py-4 px-10 rounded-lg shadow-xl hover:bg-gray-100 transition duration-300 transform hover:scale-105">
            Get Started Free
          </button>

        </div>
      </div>
      
      {/* Optional: Bottom Decorative Wave or Bar if needed */}
      <div className="h-2 bg-gray-900"></div>
    </section>
  );
};

export default CTASection;
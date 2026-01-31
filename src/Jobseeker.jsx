import React from 'react';
import hero1 from './assets/stockImage1.jpg';
import hero2 from './assets/stockImage2.jpg';


const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      text: "The AI suggestions helped me highlight achievements I would have otherwise overlooked. Landed my dream job!",
      image: hero1,
      gradient: "from-red-500 to-pink-600", // Screenshot 569 ke mutabiq red/pinkish
      tilt: "-rotate-2"
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      text: "The modern templates and real-time preview feature made creating my resume a breeze.",
      image: hero2,
      gradient: "from-purple-600 to-blue-600", // Screenshot 569 ke mutabiq purple/blue
      tilt: "rotate-2"
    }
  ];

  return (
    <section className="bg-[#111827] py-24 px-6 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by job seekers worldwide</h2>
          <p className="text-gray-400 text-1xl text-lg">See what our users have to say about their success stories</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {reviews.map((review, index) => (
            <div key={index} className="relative group w-full">
              
              {/* BACK DIV (Tilted Gradient) */}
              <div className={`absolute inset-0 bg-linear-to-r ${review.gradient} rounded-2xl transform ${review.tilt} transition-transform group-hover:rotate-0 duration-300 opacity-90 shadow-xl`}></div>

              {/* FRONT CARD (Main Content) */}
              <div className="relative bg-[#1a1f2e] p-8 rounded-2xl border border-gray-800 shadow-2xl h-full flex flex-col">
                
                {/* User Info Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-700 shadow-lg">
                    <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{review.name}</h4>
                    <p className="text-blue-400 text-sm font-medium">{review.role}</p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-300 italic leading-relaxed text-lg grow">
                  "{review.text}"
                </p>

                {/* Bottom Decorative Line (Like Progress Bar in your screenshots) */}
                <div className="mt-8">
                  <div className="w-full bg-gray-900 rounded-full h-1 overflow-hidden">
                    <div className={`h-full bg-linear-to-r ${review.gradient} w-full`}></div>
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

export default Testimonials;
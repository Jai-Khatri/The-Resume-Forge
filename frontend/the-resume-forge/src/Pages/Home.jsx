import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation between routes

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] to-[#302b63] flex flex-col items-center">
        
        {/* Hero Section */}
        <header className="text-center py-16 px-4 relative">
          {/* Background image for the hero section */}
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/path/to/your/hero-image.jpg')" }} />
          <h1 className="text-5xl font-bold text-white mb-4 relative z-10">Welcome to The Resume Forge</h1>
          <p className="text-lg text-gray-300 max-w-lg mx-auto relative z-10">
            Craft your perfect resume with our easy-to-use tools and features.
          </p>
          {/* Button to navigate to the resumes page */}
          <Link to="/resumes" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-3 px-6 rounded relative z-10">
            Start Building Your Resume
          </Link>
        </header>

        {/* Features Section */}
        <main className="flex flex-col items-center py-12 px-4">
          <h2 className="text-4xl font-semibold text-white mb-8">Features</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
            {/* Feature Cards */}
            {[
              { title: "Easy-to-use Builder", description: "Our intuitive interface makes resume creation a breeze." },
              { title: "AI powered Summary", description: "Integrated AI for an ATS friendly resume to make sure you get in the next interview!" },
              { title: "Easily Downloadable Format", description: "Export your resume in PDF format easily." },
              { title: "Tips & Examples", description: "Get helpful tips and examples for each section of your resume." },
              { title: "Real-Time Preview", description: "See your changes in real-time as you build your resume." },
              { title: "Secure & Private", description: "Your data is safe with us; we value your privacy." }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* How It Works Section */}
          <section className="mt-12 text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-300 mb-6">Follow these 5 simple steps to create your professional resume in minutes.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
              {/* Step 1 */}
              <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2 text-blue-400">Step 1</h3>
                <p className="text-gray-300">Sign up or log in to access our resume builder.</p>
              </div>

              {/* Step 2 */}
              <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2 text-blue-400">Step 2</h3>
                <p className="text-gray-300">Enter your details, including education, experience, and skills.</p>
              </div>

              {/* Step 3 */}
              <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2 text-blue-400">Step 3</h3>
                <p className="text-gray-300">Preview your resume in real-time and make adjustments as needed.</p>
              </div>

               {/* Step 4 */}
               <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2 text-blue-400">Step 4</h3>
                <p className="text-gray-300">Use our integrated AI for your summary to help you build an ATS friendly resume.</p>
              </div>

              {/* Step 5 */}
              <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2 text-blue-400">Step 5</h3>
                <p className="text-gray-300">Download your polished resume in PDF format and start applying!</p>
              </div>

              {/* Step 6 */}
              <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold mb-2 text-blue-400">Step 6 (Doesn't exist)</h3>
                <p className="text-gray-300">Enjoy your ATS friendly resume tailored according to your job role!</p>
              </div>

            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mt-12 max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-white mb-8 text-center">What Our Users Say</h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
              {[
                { name: "Alice Johnson", testimonial: "The Resume Forge helped me land my dream job!" },
                { name: "Mark Smith", testimonial: "Creating my resume was so easy and fun!" },
                { name: "Emily Davis", testimonial: "I loved the AI features that guided me through the process." }
              ].map((item, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md w-full sm:w=[300px]">
                  <p className="text-gray-300 italic">"{item.testimonial}"</p>
                  <p className="text-right text-white mt-2">— {item.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Section */}
          <footer className="text-center mt-auto mb-4 py-8">
            <p className="text-gray-400">&copy; 2025 The Resume Forge. All rights reserved.</p>
            <Link to="/about" className="text-blue-400 hover:underline">Learn more about us</Link>
            <div className="mt-4">
              {/* Social Media Links */}
              <a href="#" className="text-gray-400 hover:text-white mx-2">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white mx-2">LinkedIn</a>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default Home;

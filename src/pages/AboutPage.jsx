import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FaRocket, FaLightbulb, FaUsers, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const features = [
    {
      icon: <FaRocket />,
      title: "Fast Learning",
      desc: "Curriculum designed to take you from zero to hero in record time."
    },
    {
      icon: <FaLightbulb />,
      title: "Project-Based",
      desc: "Don't just watch tutorials. Build real projects that matter."
    },
    {
      icon: <FaUsers />,
      title: "Community First",
      desc: "Join a network of developers helping each other grow."
    },
    {
      icon: <FaGlobe />,
      title: "Global Standards",
      desc: "Content aligned with the latest industry demands worldwide."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 relative overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          
          {/* 1. Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-purple-500 font-bold tracking-widest uppercase text-xs border border-purple-500/20 px-3 py-1 rounded-full bg-purple-500/10">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-6 mb-6 leading-tight">
              Empowering the Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Developers</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              FutureDev isn't just a platform; it's a movement. We believe that high-quality coding education should be accessible, practical, and fun.
            </p>
          </div>

          {/* 2. Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-y border-white/5 py-12">
            {[
              { num: "10K+", label: "Students" },
              { num: "50+", label: "Courses" },
              { num: "120+", label: "Mentors" },
              { num: "4.9", label: "Rating" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.num}</h3>
                <p className="text-slate-500 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 3. Mission & Vision (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team working" 
                className="relative rounded-3xl border border-white/10 shadow-2xl w-full object-cover h-[400px]"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                We are on a mission to close the gap between academic learning and industry needs. Technology moves fast, and traditional education often struggles to keep up.
              </p>
              <p className="text-slate-400 mb-8 leading-relaxed">
                At FutureDev, we focus on what matters: writing clean code, solving real problems, and building a portfolio that gets you hired.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="text-purple-400 text-xl mt-1">{feature.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{feature.title}</h4>
                      <p className="text-slate-500 text-xs mt-1">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. CTA Section */}
          <div className="text-center bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl p-12 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to start your journey?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Join thousands of students who are already building the future with code.
            </p>
            <Link to="/courses" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-transform active:scale-95">
              Explore Courses
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
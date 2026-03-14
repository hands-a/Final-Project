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
      <div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          
          {/* 1. Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="inline-block bg-white/5 border border-white/10 text-pink-400 font-bold tracking-widest uppercase text-[10px] px-4 py-1.5 rounded-full shadow-sm mb-6">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight tracking-wide">
              Empowering the Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 font-medium">Developers</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed font-light tracking-wide">
              FutureDev isn't just a platform; it's a movement. We believe that high-quality coding education should be accessible, practical, and fun.
            </p>
          </div>

          {/* 2. Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-white/10 py-12">
            {[
              { num: "10K+", label: "Students" },
              { num: "50+", label: "Courses" },
              { num: "120+", label: "Mentors" },
              { num: "4.9", label: "Rating" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <h3 className="text-4xl md:text-5xl font-light text-white mb-2 tracking-wide drop-shadow-md">{stat.num}</h3>
                <p className="text-pink-400 text-[10px] uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 3. Mission & Vision (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            
            {/* Image Side */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team working" 
                className="relative rounded-[2rem] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] w-full object-cover h-[400px] lg:h-[500px] opacity-90"
              />
            </div>
            
            {/* Text Side */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">Our Mission</h2>
              <p className="text-slate-400 mb-6 leading-relaxed font-light text-sm md:text-base">
                We are on a mission to close the gap between academic learning and industry needs. Technology moves fast, and traditional education often struggles to keep up.
              </p>
              <p className="text-slate-400 mb-10 leading-relaxed font-light text-sm md:text-base">
                At FutureDev, we focus on what matters: writing clean code, solving real problems, and building a portfolio that gets you hired.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {features.map((feature, idx) => (
                  // Pure Glass Feature Card
                  <div key={idx} className="flex items-start gap-4 p-5 bg-white/0 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/5 transition-all shadow-sm">
                    <div className="text-pink-400 text-xl mt-0.5 opacity-80">{feature.icon}</div>
                    <div>
                      <h4 className="text-white font-medium tracking-wide text-sm">{feature.title}</h4>
                      <p className="text-slate-400 text-[11px] font-light mt-1.5 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. CTA Section (Pure Glassmorphism) */}
          <div className="relative w-full rounded-[3rem] overflow-hidden p-12 md:p-24 text-center border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] bg-white/0 backdrop-blur-xl">
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-transparent to-violet-900/20 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-wide drop-shadow-md">
                Ready to start your journey?
              </h2>
              <p className="text-slate-400 mb-10 font-light tracking-wide text-sm md:text-base max-w-xl mx-auto">
                Join thousands of students who are already building the future with code. Take the first step towards a career you love.
              </p>
              <Link 
                to="/courses" 
                className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium tracking-wide rounded-xl shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Explore Courses
              </Link>
            </div>
          </div>

        </div>
      </div>
      
    </>
  );
};

export default AboutPage;
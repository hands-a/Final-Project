import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaLightbulb, FaUsers, FaGlobe, FaArrowRight } from 'react-icons/fa';

const AboutPage = () => {
  const features = [
    {
      icon: <FaRocket />,
      title: "Fast Learning",
      desc: "Curriculum designed to take you from zero to hero in record time.",
      color: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
    },
    {
      icon: <FaLightbulb />,
      title: "Project-Based",
      desc: "Don't just watch tutorials. Build real projects that matter.",
      color: "bg-amber-500/20 text-amber-400 border border-amber-500/20"
    },
    {
      icon: <FaUsers />,
      title: "Community First",
      desc: "Join a network of developers helping each other grow.",
      color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
    },
    {
      icon: <FaGlobe />,
      title: "Global Standards",
      desc: "Content aligned with the latest industry demands worldwide.",
      color: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">

      {/* Ambient */}
      <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-cyan-900/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-emerald-900/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="bg-grid-mesh absolute inset-0 pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="inline-block bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full mb-6">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Empowering the Next Generation of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Developers</span>
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed">
            FutureDev isn't just a platform; it's a movement. We believe that high-quality coding education should be accessible, practical, and fun.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32 glass-panel p-8">
          {[
            { num: "10K+", label: "Students" },
            { num: "50+", label: "Courses" },
            { num: "120+", label: "Mentors" },
            { num: "4.9", label: "Rating" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.num}</h3>
              <p className="text-cyan-400 text-xs uppercase tracking-widest font-bold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-[2rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Team working"
              className="relative rounded-[2rem] border border-zinc-800/50 shadow-2xl w-full object-cover h-[400px] lg:h-[500px] opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-zinc-500 mb-5 leading-relaxed text-sm md:text-base">
              We are on a mission to close the gap between academic learning and industry needs. Technology moves fast, and traditional education often struggles to keep up.
            </p>
            <p className="text-zinc-500 mb-10 leading-relaxed text-sm md:text-base">
              At FutureDev, we focus on what matters: writing clean code, solving real problems, and building a portfolio that gets you hired.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 glass-panel border-zinc-800/40 hover:border-zinc-700/60 hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`w-10 h-10 ${feature.color} rounded-xl flex items-center justify-center shrink-0 text-base`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative glass-panel overflow-hidden p-12 md:p-24 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/15 via-transparent to-emerald-900/15 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to start your journey?
            </h2>
            <p className="text-zinc-500 mb-10 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Join thousands of students who are already building the future with code. Take the first step towards a career you love.
            </p>
            <Link to="/courses" className="btn-primary inline-flex px-10 py-4 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              Explore Courses <FaArrowRight />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
import React from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaUserGraduate, FaStar, FaVideo } from "react-icons/fa";
import { RiRocketLine } from "react-icons/ri";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent text-white pt-20 lg:pt-0 mt-10">
      
      {/* Background Mesh & Glow Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)] z-0 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-12">
        
        {/* Animated Welcome Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default shadow-[0_0_15px_rgba(168,85,247,0.15)] animate-fade-in-up">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="text-xs font-mono text-purple-300 uppercase tracking-wider">
            Welcome to the future of learning
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 tracking-tight drop-shadow-2xl">
          Master The Art Of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-300">
            Creative Coding
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl font-light drop-shadow-md">
          Elevate your skills with world-class mentors. Build modern web and mobile applications from scratch to deployment.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full sm:w-auto">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-purple-50 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
          >
            Start For Free <RiRocketLine className="text-lg" />
          </Link>
          <Link
            to="/courses"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 hover:scale-105 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <FaPlay className="text-xs text-purple-400" /> Explore Courses
          </Link>
        </div>

        {/* Platform Statistics */}
        {/* Used our glass-panel class here to reduce clutter */}
        <div className="glass-panel grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 p-6 w-full max-w-4xl">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center gap-2 text-purple-400">
              <FaVideo className="text-xl" />
              <span className="text-3xl font-bold text-white">120+</span>
            </div>
            <span className="text-sm text-slate-400 font-medium tracking-wide">Premium Courses</span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center justify-center space-y-2 md:border-l md:border-r border-white/10">
            <div className="flex items-center gap-2 text-amber-400">
              <FaUserGraduate className="text-xl" />
              <span className="text-3xl font-bold text-white">15k+</span>
            </div>
            <span className="text-sm text-slate-400 font-medium tracking-wide">Active Students</span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center gap-2 text-green-400">
              <FaStar className="text-xl" />
              <span className="text-3xl font-bold text-white">4.9/5</span>
            </div>
            <span className="text-sm text-slate-400 font-medium tracking-wide">Average Rating</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
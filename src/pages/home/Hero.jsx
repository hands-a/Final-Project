import React from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaUserGraduate, FaStar, FaVideo } from "react-icons/fa";
import { RiRocketLine } from "react-icons/ri";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent text-white pt-20 lg:pt-0 mt-10">

      {/* ── Layered Background System ── */}
      {/* Grid mesh */}
      <div className="bg-grid-mesh absolute inset-0 z-0 pointer-events-none" />

      {/* Ambient cyan glow top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-600/8 rounded-full blur-[140px] pointer-events-none z-0" />
      {/* Emerald glow bottom-right */}
      <div className="absolute bottom-10 right-0 w-[500px] h-[400px] bg-emerald-700/5 rounded-full blur-[160px] pointer-events-none z-0" />
      {/* Subtle orange left accent */}
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-orange-600/4 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-12">

        {/* ── Status Badge ── */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/60 border border-cyan-500/20 backdrop-blur-md mb-8 hover:border-cyan-500/40 transition-all duration-300 cursor-default shadow-[0_0_20px_rgba(6,182,212,0.08)]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
            Welcome to the future of learning
          </span>
        </div>

        {/* ── Main Headline ── */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 tracking-tight drop-shadow-2xl">
          Master The Art Of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-300">
            Creative Coding
          </span>
        </h1>

        {/* ── Subtitle ── */}
        <p className="text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl font-normal">
          Elevate your skills with world-class mentors. Build modern web and mobile applications from scratch to deployment.
        </p>

        {/* ── CTA Buttons ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full sm:w-auto">
          <Link
            to="/register"
            className="w-full sm:w-auto btn-primary px-8 py-4 text-base shadow-[0_0_30px_rgba(6,182,212,0.25)]"
          >
            Start For Free <RiRocketLine className="text-lg" />
          </Link>
          <Link
            to="/courses"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900/60 border border-zinc-700/50 text-white rounded-xl font-semibold hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <FaPlay className="text-xs text-cyan-400" /> Explore Courses
          </Link>
        </div>

        {/* ── Platform Stats ── */}
        <div className="glass-panel grid grid-cols-1 md:grid-cols-3 gap-0 w-full max-w-3xl divide-y md:divide-y-0 md:divide-x divide-zinc-800/50">

          <div className="flex flex-col items-center justify-center space-y-2 p-6">
            <div className="flex items-center gap-2 text-cyan-400">
              <FaVideo className="text-lg" />
              <span className="text-3xl font-bold text-white">120+</span>
            </div>
            <span className="text-xs text-zinc-500 font-medium tracking-widest uppercase">Premium Courses</span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 p-6">
            <div className="flex items-center gap-2 text-amber-400">
              <FaUserGraduate className="text-lg" />
              <span className="text-3xl font-bold text-white">15k+</span>
            </div>
            <span className="text-xs text-zinc-500 font-medium tracking-widest uppercase">Active Students</span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 p-6">
            <div className="flex items-center gap-2 text-emerald-400">
              <FaStar className="text-lg" />
              <span className="text-3xl font-bold text-white">4.9/5</span>
            </div>
            <span className="text-xs text-zinc-500 font-medium tracking-widest uppercase">Average Rating</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
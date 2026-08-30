import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center relative overflow-hidden text-center px-4 sm:px-6">

      {/* Ambient */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-600/6 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="bg-grid-mesh absolute inset-0 pointer-events-none opacity-40" />

      <div className="relative z-10 glass-panel p-10 md:p-20 max-w-2xl w-full mx-auto">

        <h1 className="text-[120px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500 leading-none select-none tracking-tighter mb-2">
          404
        </h1>

        <h2 className="text-2xl md:text-4xl font-bold text-white mb-5">
          Page Not Found
        </h2>

        <p className="text-zinc-500 mb-10 max-w-md mx-auto leading-relaxed text-sm md:text-base">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="btn-primary inline-flex px-10 py-4 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
        >
          <FaHome className="text-base opacity-80" /> Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default NotFoundPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center relative overflow-hidden text-center px-4 sm:px-6">
      
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 bg-white/0 backdrop-blur-xl border border-white/10 p-10 md:p-20 rounded-[3rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] max-w-2xl w-full mx-auto">
        
        <h1 className="text-[120px] md:text-[180px] font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-500 leading-none select-none tracking-tighter drop-shadow-lg mb-2">
          404
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-light text-white mb-5 tracking-wide">
          Page Not Found
        </h2>
        
        <p className="text-slate-400 mb-10 max-w-md mx-auto font-light leading-relaxed tracking-wide text-sm md:text-base">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium tracking-wide rounded-xl shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <FaHome className="text-lg opacity-80" /> Go Back Home
        </Link>
        
      </div>
    </div>
  );
};

export default NotFoundPage;
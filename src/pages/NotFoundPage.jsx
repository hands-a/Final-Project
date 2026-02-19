import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden text-center px-6">
      
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10">
        <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 leading-none select-none">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-slate-400 mb-10 max-w-lg mx-auto">
          Oops! The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-slate-200 transition-all active:scale-95"
        >
          <FaHome /> Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
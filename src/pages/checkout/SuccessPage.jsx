import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-transparent  flex items-center justify-center relative overflow-hidden p-4 sm:p-6 text-slate-300">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Main Content Card (Reusable Glass Panel) */}
      <div className="glass-panel p-10 sm:p-12 text-center max-w-md w-full relative z-10">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <FaCheckCircle className="text-4xl text-emerald-400 drop-shadow-md" />
        </div>
        
        <h1 className="text-3xl font-light text-white mb-3 tracking-wide">Payment Successful!</h1>
        <p className="text-slate-400 mb-10 font-light text-sm leading-relaxed">
          Thank you for your purchase. Your payment has been processed securely. You can now access your courses and start learning.
        </p>

        {/* Action Button (Reusable Primary Button) */}
        <Link to="/courses" className="btn-primary w-full py-4 mb-2">
          Start Learning <FaArrowRight className="text-sm font-light opacity-80" />
        </Link>
        
        {/* Secondary Link */}
        <Link to="/" className="block mt-6 text-slate-500 text-[10px] uppercase tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-white/30 w-fit mx-auto pb-0.5">
          Return to Home
        </Link>
        
      </div>
    </div>
  );
};

export default SuccessPage;
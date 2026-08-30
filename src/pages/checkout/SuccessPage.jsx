import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center relative overflow-hidden p-4 sm:p-6 text-zinc-300">

      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="bg-grid-mesh absolute inset-0 pointer-events-none opacity-40" />

      <div className="glass-panel p-10 sm:p-12 text-center max-w-md w-full relative z-10 border-emerald-500/10 shadow-[0_0_60px_rgba(16,185,129,0.05)]">

        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <FaCheckCircle className="text-4xl text-emerald-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Payment Successful!</h1>
        <p className="text-zinc-500 mb-10 text-sm leading-relaxed">
          Thank you for your purchase. Your payment has been processed securely. You can now access your courses and start learning.
        </p>

        <Link to="/my-courses" className="btn-primary w-full py-4 mb-2 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          Go to My Learning <FaArrowRight className="text-sm opacity-80" />
        </Link>

        <Link to="/" className="block mt-5 text-zinc-600 text-xs uppercase tracking-widest hover:text-cyan-400 transition-colors duration-300">
          Return to Home
        </Link>

      </div>
    </div>
  );
};

export default SuccessPage;
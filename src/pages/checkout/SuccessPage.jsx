import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="bg-[#13151d] border border-white/10 p-10 rounded-3xl text-center max-w-md w-full relative z-10 shadow-2xl">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-5xl text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-slate-400 mb-8">
          Thank you for your purchase. You can now access your courses and start learning.
        </p>

        <Link to="/courses" className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2">
          Start Learning <FaArrowRight />
        </Link>
        
        <Link to="/" className="block mt-4 text-slate-500 text-sm hover:text-white transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
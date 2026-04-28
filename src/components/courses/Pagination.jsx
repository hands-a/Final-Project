import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button 
        onClick={() => paginate(currentPage - 1)} 
        disabled={currentPage === 1} 
        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === 1 ? 'border-white/5 text-slate-600 cursor-not-allowed bg-transparent' : 'border-white/10 text-white hover:bg-white/5 bg-transparent'}`}
      >
        <FaChevronLeft size={12} />
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button 
          key={i + 1} 
          onClick={() => paginate(i + 1)} 
          className={`w-10 h-10 rounded-full text-sm transition-all ${
            currentPage === i + 1 
              ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold shadow-lg shadow-pink-500/20 border-none' 
              : 'bg-transparent border border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {i + 1}
        </button>
      ))}
      
      <button 
        onClick={() => paginate(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === totalPages ? 'border-white/5 text-slate-600 cursor-not-allowed bg-transparent' : 'border-white/10 text-white hover:bg-white/5 bg-transparent'}`}
      >
        <FaChevronRight size={12} />
      </button>
    </div>
  );
};

export default Pagination;
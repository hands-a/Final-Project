import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
          currentPage === 1
            ? 'border-zinc-800 text-zinc-700 cursor-not-allowed bg-transparent'
            : 'border-zinc-700 text-zinc-400 hover:bg-zinc-800/60 hover:text-white bg-transparent'
        }`}
      >
        <FaChevronLeft size={11} />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => paginate(i + 1)}
          className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-300 ${
            currentPage === i + 1
              ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
              : 'bg-transparent border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800/60 hover:border-zinc-700'
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
          currentPage === totalPages
            ? 'border-zinc-800 text-zinc-700 cursor-not-allowed bg-transparent'
            : 'border-zinc-700 text-zinc-400 hover:bg-zinc-800/60 hover:text-white bg-transparent'
        }`}
      >
        <FaChevronRight size={11} />
      </button>
    </div>
  );
};

export default Pagination;
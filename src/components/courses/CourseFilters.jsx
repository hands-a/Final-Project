import React from 'react';
import { FaFilter } from 'react-icons/fa';

const CourseFilters = ({ 
  categories, 
  levels, 
  courses, 
  selectedCategory, 
  setSelectedCategory, 
  selectedLevel, 
  setSelectedLevel, 
  priceFilter, 
  setPriceFilter 
}) => {
  return (
    <aside className="w-full lg:w-1/4 space-y-8 h-fit lg:sticky lg:top-28">
      
      {/* Categories Filter */}
      <div className="glass-panel p-6">
        <h3 className="text-white font-light text-lg mb-5 flex items-center gap-2 tracking-wide">
          <FaFilter className="text-pink-400 text-sm" /> Categories
        </h3>
        <div className="flex flex-col gap-2">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all flex justify-between items-center ${
                selectedCategory === cat 
                  ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium shadow-lg shadow-pink-500/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white bg-transparent border border-transparent hover:border-white/5'
              }`}
            >
              {cat}
              <span className={`text-xs ${selectedCategory === cat ? 'text-white/90' : 'text-slate-500'}`}>
                {cat === 'All' 
                  ? courses.length 
                  : courses.filter(c => c.category === cat).length
                }
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Level & Price Filter */}
      <div className="glass-panel p-6">
        <h3 className="text-white font-light text-lg mb-5 tracking-wide">Level & Price</h3>
        <div className="space-y-6">
          
          {/* Levels */}
          <div className="flex flex-wrap gap-2">
            {levels.map(lvl => (
              <button 
                key={lvl} 
                onClick={() => setSelectedLevel(lvl)} 
                className={`px-4 py-2 rounded-xl text-xs transition-all border ${
                  selectedLevel === lvl 
                    ? 'bg-gradient-to-r from-pink-500 to-violet-600 border-transparent text-white shadow-lg shadow-pink-500/20 font-medium' 
                    : 'bg-transparent border-white/10 text-slate-400 hover:border-white/30 hover:text-white hover:bg-white/5'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Price */}
          <div className="flex gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
            {['All', 'Free', 'Paid'].map(price => (
              <button 
                key={price} 
                onClick={() => setPriceFilter(price)} 
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                  priceFilter === price 
                    ? 'bg-white/10 text-white shadow-sm border border-white/10' 
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CourseFilters;
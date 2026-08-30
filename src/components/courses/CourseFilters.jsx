import React from 'react';
import { FaSlidersH } from 'react-icons/fa';

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
    <aside className="w-full lg:w-1/4 space-y-5 h-fit lg:sticky lg:top-28">

      {/* Categories Filter */}
      <div className="glass-panel p-5">
        <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2 uppercase tracking-widest">
          <FaSlidersH className="text-cyan-400 text-xs" /> Categories
        </h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat, index) => (
            <button
              key={`${cat}-${index}`}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-300 flex justify-between items-center font-medium ${
                selectedCategory === cat
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-200 border border-transparent'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-zinc-800/60 text-zinc-600'
              }`}>
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
      <div className="glass-panel p-5">
        <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Level & Price</h3>
        <div className="space-y-5">

          {/* Levels */}
          <div>
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-3 font-medium">Skill Level</p>
            <div className="flex flex-wrap gap-2">
              {levels.map((lvl, index) => (
                <button
                  key={`${lvl}-${index}`}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs transition-all duration-300 border font-medium ${
                    selectedLevel === lvl
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="text-xs text-zinc-600 uppercase tracking-widest mb-3 font-medium">Price</p>
            <div className="flex gap-1.5 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800/50">
              {['All', 'Free', 'Paid'].map((price, index) => (
                <button
                  key={`${price}-${index}`}
                  onClick={() => setPriceFilter(price)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                    priceFilter === price
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/60'
                  }`}
                >
                  {price}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CourseFilters;
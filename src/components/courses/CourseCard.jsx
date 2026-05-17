import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUserTie, FaLayerGroup, FaArrowRight } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  return (
    <div className="glass-panel !p-0 group relative overflow-hidden bg-[#0d0d14] border border-white/5 hover:border-pink-500/30 transition-all duration-500 shadow-lg hover:shadow-[0_8px_32px_0_rgba(244,114,182,0.15)] flex flex-col h-full hover:-translate-y-2 rounded-2xl">
      
      <Link to={`/courses/${course.id}`} className="relative h-52 w-full block overflow-hidden bg-[#050511] border-b border-white/10">
        
        <img 
          src={course.image} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none" 
        />
        
        <img 
          src={course.image} 
          alt={course.title} 
          className="relative z-10 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 drop-shadow-xl" 
        />
        
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-black/60 backdrop-blur-md border border-white/10 text-pink-400 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
            {course.category}
          </span>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow relative z-20">
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1.5 text-amber-400 text-[10px] bg-white/5 px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
            <FaStar className="mb-0.5" /> <span className="font-bold text-white tracking-widest">{course.rating}</span>
          </div>
          <span className={`text-lg tracking-wider ${course.price === 0 || course.price === 'Free' ? "text-pink-400 font-medium" : "text-white font-light"}`}>
            {course.price === 0 || course.price === 'Free' ? "Free" : `$${course.price}`}
          </span>
        </div>

        <Link to={`/courses/${course.id}`} className="block mb-4 flex-grow">
          <h3 className="text-lg font-medium tracking-wide text-white line-clamp-2 group-hover:text-pink-400 transition-colors cursor-pointer leading-relaxed">
            {course.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-6 uppercase tracking-widest font-medium">
          <span className="flex items-center gap-1.5 truncate">
            <FaUserTie className="text-pink-400/80 text-sm shrink-0" /> 
            <span className="truncate capitalize">{course.instructor}</span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <FaLayerGroup className="text-pink-400/80 text-sm shrink-0" /> 
            <span className="capitalize">{course.level}</span>
          </span>
        </div>

        <div className="mt-auto border-t border-white/10 pt-5">
          <Link to={`/courses/${course.id}`} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] uppercase tracking-widest font-bold hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-pink-400 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
            View Details <FaArrowRight className="text-xs opacity-70 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
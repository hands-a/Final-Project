import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUserTie, FaLayerGroup, FaArrowRight } from 'react-icons/fa';

// Semantic category → accent color mapping
const getCategoryAccent = (category = '') => {
  const cat = category.toLowerCase();
  if (cat.includes('front') || cat.includes('react') || cat.includes('vue') || cat.includes('css') || cat.includes('html')) {
    return {
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      glow: 'hover:border-cyan-500/30 hover:shadow-cyan-500/10',
      title: 'group-hover:text-cyan-400',
    };
  }
  if (cat.includes('back') || cat.includes('node') || cat.includes('php') || cat.includes('python') || cat.includes('java') || cat.includes('api')) {
    return {
      badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      glow: 'hover:border-orange-500/30 hover:shadow-orange-500/10',
      title: 'group-hover:text-orange-400',
    };
  }
  if (cat.includes('career') || cat.includes('devops') || cat.includes('cyber') || cat.includes('mobile') || cat.includes('cloud')) {
    return {
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      glow: 'hover:border-emerald-500/30 hover:shadow-emerald-500/10',
      title: 'group-hover:text-emerald-400',
    };
  }
  if (cat.includes('data') || cat.includes('ai') || cat.includes('ml') || cat.includes('science')) {
    return {
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      glow: 'hover:border-amber-500/30 hover:shadow-amber-500/10',
      title: 'group-hover:text-amber-400',
    };
  }
  // Default — neutral cyan
  return {
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    glow: 'hover:border-cyan-500/30 hover:shadow-cyan-500/10',
    title: 'group-hover:text-cyan-400',
  };
};

const CourseCard = ({ course }) => {
  const accent = getCategoryAccent(course.category);

  return (
    <div className={`glass-panel !p-0 group relative overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${accent.glow}`}>

      {/* Course Image */}
      <Link to={`/courses/${course.id}`} className="relative h-48 w-full block overflow-hidden bg-zinc-900 border-b border-zinc-800/50">
        {/* Blurred bg */}
        <img
          src={course.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110 pointer-events-none"
        />
        {/* Sharp image */}
        <img
          src={course.image}
          alt={course.title}
          className="relative z-10 w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 drop-shadow-xl"
        />
        {/* Category badge overlay */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`${accent.badge} border text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md bg-zinc-950/60 shadow-sm`}>
            {course.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">

        {/* Rating & Price */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs bg-zinc-800/60 px-2.5 py-1 rounded-full border border-zinc-700/50">
            <FaStar className="mb-0.5" />
            <span className="font-bold text-white">{course.rating}</span>
          </div>
          <span className={`text-lg font-semibold tracking-wide ${
            course.price === 0 || course.price === 'Free' ? "text-emerald-400" : "text-white"
          }`}>
            {course.price === 0 || course.price === 'Free' ? "Free" : `$${course.price}`}
          </span>
        </div>

        {/* Title */}
        <Link to={`/courses/${course.id}`} className="block mb-3 flex-grow">
          <h3 className={`text-base font-semibold text-white line-clamp-2 ${accent.title} transition-colors duration-300 leading-snug`}>
            {course.title}
          </h3>
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-zinc-500 mb-5 font-medium">
          <span className="flex items-center gap-1.5 truncate">
            <FaUserTie className="text-cyan-400/60 text-sm shrink-0" />
            <span className="truncate capitalize">{course.instructor}</span>
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            <FaLayerGroup className="text-cyan-400/60 text-sm shrink-0" />
            <span className="capitalize">{course.level}</span>
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto border-t border-zinc-800/50 pt-4">
          <Link
            to={`/courses/${course.id}`}
            className={`w-full py-2.5 rounded-xl border text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn
              bg-transparent border-zinc-700/50 text-zinc-400
              hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400`}
          >
            View Details <FaArrowRight className="text-xs opacity-70 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
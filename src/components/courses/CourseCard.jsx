import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUserTie, FaLayerGroup, FaArrowRight } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  return (
    <div className="group relative bg-[#13151d] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-900/10 flex flex-col h-full">
      
      {/* 1. منطقة الصورة (تم التعديل لتناسب اللوجوهات) */}
      <Link to={`/courses/${course.id}`} className="relative h-52 overflow-hidden block cursor-pointer bg-[#0f1119] p-8 flex items-center justify-center">
        {/* خلفية جمالية خفيفة ورا اللوجو */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13151d] to-transparent opacity-40"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        {/* اللوجو نفسه: خليناه contain عشان يظهر كامل */}
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-contain drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500 relative z-10" 
        />
        
        {/* بادج القسم */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-white/5 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {course.category}
          </span>
        </div>
      </Link>

      {/* 2. المحتوى */}
      <div className="p-5 flex flex-col flex-grow relative z-20 border-t border-white/5">
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
            <FaStar /> <span>{course.rating}</span>
          </div>
          <span className={`text-base font-bold ${course.price === 0 ? "text-green-400" : "text-white"}`}>
            {course.price === 0 ? "Free" : `$${course.price}`}
          </span>
        </div>

        <Link to={`/courses/${course.id}`} className="block">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors cursor-pointer">
            {course.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 border-b border-white/5 pb-4">
          <span className="flex items-center gap-1.5"><FaUserTie className="text-slate-400" /> {course.instructor}</span>
          <span className="flex items-center gap-1.5"><FaLayerGroup className="text-slate-400" /> {course.level}</span>
        </div>

        <div className="mt-auto">
          <Link to={`/courses/${course.id}`} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
            View Details <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
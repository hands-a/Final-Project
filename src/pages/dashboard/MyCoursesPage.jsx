import React from 'react';
import { Link } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { FaPlay, FaCheckCircle, FaBookOpen } from 'react-icons/fa';

const MyCoursesPage = () => {
  const { enrolledCourses } = useStudent();

  // Empty State View
  if (enrolledCourses.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-transparent pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden text-slate-300">
          
          <div className="relative z-10 glass-panel p-12 max-w-lg w-full">
            <div className="w-20 h-20 bg-gradient-to-tr from-pink-500/20 to-violet-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_15px_rgba(244,114,182,0.1)] animate-pulse">
               <FaBookOpen className="text-3xl text-pink-400 opacity-80" />
            </div>
            <h2 className="text-3xl font-light text-white mb-4 tracking-wide">No courses yet!</h2>
            <p className="text-slate-400 mb-10 font-light text-sm leading-relaxed">
              You haven't enrolled in any courses yet. Explore our catalog and start your learning journey today.
            </p>
            <Link 
              to="/courses" 
              className="btn-primary inline-flex px-8 py-3.5 w-fit mx-auto"
            >
              Browse Courses
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Populated State View
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#050511] pt-32 pb-20 relative overflow-hidden text-slate-300">
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          
          {/* Header & Stats */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-light tracking-wide text-white mb-3">My Learning</h1>
              <p className="text-slate-400 font-light tracking-wide text-sm">Track your progress and continue learning.</p>
            </div>
            
            <div className="flex gap-4">
               <div className="glass-panel !rounded-2xl px-6 py-4 min-w-[120px] text-center">
                  <span className="block text-3xl font-light text-white mb-1">{enrolledCourses.length}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Enrolled</span>
               </div>
               <div className="glass-panel !rounded-2xl px-6 py-4 min-w-[120px] text-center">
                  <span className="block text-3xl font-light text-green-400 mb-1">
                     {enrolledCourses.filter(c => c.progress === 100).length}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Completed</span>
               </div>
            </div>
          </div>

          {/* Enrolled Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map((course) => {
              const isCompleted = course.progress === 100;
              const courseUrlId = course.documentId || course.id;

              return (
                <div key={course.id} className="glass-panel !p-0 overflow-hidden group flex flex-col hover:-translate-y-1 hover:border-pink-500/30 transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(244,114,182,0.15)]">
                  
                  {/* Image & Play Overlay */}
                  <div className="relative h-48 bg-white/5 overflow-hidden border-b border-white/5">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                    />
                    
                    <Link to={`/learn/${courseUrlId}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 backdrop-blur-sm z-20">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                        <FaPlay className="ml-1 text-lg opacity-80" />
                      </div>
                    </Link>
                  </div>

                  {/* Course Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                       <span className="text-[9px] font-bold text-pink-400 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                          {course.category || 'Development'}
                       </span>
                       {isCompleted && <FaCheckCircle className="text-green-400 text-lg drop-shadow-md" title="Completed" />}
                    </div>

                    <h3 className="text-xl font-medium tracking-wide text-white mb-2 line-clamp-1 group-hover:text-pink-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-8 font-light uppercase tracking-widest">By {course.instructor}</p>

                    <div className="mt-auto">
                      {/* Progress Stats */}
                      <div className="flex justify-between text-[11px] text-slate-400 mb-3 font-medium uppercase tracking-widest">
                        <span>{isCompleted ? 'Completed' : 'Progress'}</span>
                        <span>{course.progress}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-8">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'bg-gradient-to-r from-pink-500 to-violet-600 shadow-[0_0_10px_rgba(244,114,182,0.4)]'}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>

                      {/* Action Link */}
                      <Link 
                        to={`/learn/${courseUrlId}`}
                        className={`w-full py-3.5 rounded-xl font-medium text-sm flex justify-center items-center gap-2 transition-all border
                          ${isCompleted 
                            ? 'bg-transparent border-green-400/30 text-green-400 hover:bg-green-400/10' 
                            : 'bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                          }
                        `}
                      >
                        {isCompleted ? 'Review Course' : 'Continue Learning'}
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCoursesPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import Navbar from '../../components/layout/Navbar'; // ✅ إضافة الناف بار
import Footer from '../../components/layout/Footer'; // ✅ إضافة الفوتر
import { FaPlay, FaCheckCircle, FaBookOpen } from 'react-icons/fa';

const MyCoursesPage = () => {
  const { enrolledCourses } = useStudent();

  // --- حالة: الطالب لسه مشتركش في أي كورس ---
  if (enrolledCourses.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          
          {/* Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 bg-[#13151d] p-12 rounded-3xl border border-white/5 shadow-2xl max-w-lg w-full">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
               <FaBookOpen className="text-3xl text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No courses yet!</h2>
            <p className="text-slate-400 mb-8">
              You haven't enrolled in any courses yet. Explore our catalog and start your learning journey today.
            </p>
            <Link 
              to="/courses" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-600/20 hover:scale-105 transition-all"
            >
              Browse Courses
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // --- حالة: الطالب عنده كورسات ---
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 relative overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          
          {/* Header & Stats */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Learning</h1>
              <p className="text-slate-400">Track your progress and continue learning.</p>
            </div>
            
            <div className="flex gap-4">
               <div className="bg-[#13151d] px-6 py-3 rounded-xl border border-white/5 min-w-[120px] text-center">
                  <span className="block text-2xl font-bold text-white">{enrolledCourses.length}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Enrolled</span>
               </div>
               <div className="bg-[#13151d] px-6 py-3 rounded-xl border border-white/5 min-w-[120px] text-center">
                  <span className="block text-2xl font-bold text-green-400">
                     {enrolledCourses.filter(c => c.progress === 100).length}
                  </span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Completed</span>
               </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map((course) => {
              const isCompleted = course.progress === 100;

              return (
                <div key={course.id} className="bg-[#13151d] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all group flex flex-col hover:-translate-y-1 hover:shadow-xl">
                  
                  {/* Image Section */}
                  <div className="relative h-48 bg-black overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#13151d] via-transparent to-transparent"></div>
                    
                    {/* Play Overlay */}
                    <Link to={`/learn/${course.id}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 backdrop-blur-sm">
                      <div className="w-14 h-14 bg-white text-purple-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                        <FaPlay className="ml-1" />
                      </div>
                    </Link>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                       <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                          {course.category || 'Course'}
                       </span>
                       {isCompleted && <FaCheckCircle className="text-green-500 text-lg" />}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-6">By {course.instructor}</p>

                    {/* Progress Bar */}
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs text-slate-300 mb-2 font-bold">
                        <span>{isCompleted ? 'Completed' : 'Progress'}</span>
                        <span>{course.progress}%</span>
                      </div>
                      
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>

                      <Link 
                        to={`/learn/${course.id}`}
                        className={`w-full py-3 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-all border
                          ${isCompleted 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500 hover:text-white' 
                            : 'bg-white/5 text-white border-white/10 hover:bg-purple-600 hover:border-purple-600 hover:text-white'
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
import React from 'react';
import { Link } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import { FaPlay, FaCheckCircle, FaSearch, FaBookOpen } from 'react-icons/fa';

const MyCoursesPage = () => {
  const { enrolledCourses } = useStudent();

  // لو مفيش كورسات، اعرض رسالة
  if (enrolledCourses.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
           <FaBookOpen className="text-4xl text-slate-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">No courses yet!</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          You haven't enrolled in any courses yet. Explore our catalog and start your learning journey today.
        </p>
        <Link 
          to="/courses" 
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 lg:px-12">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Learning</h1>
            <p className="text-slate-400">Track your progress and continue learning.</p>
          </div>
          
          {/* Stats (Optional) */}
          <div className="flex gap-4">
             <div className="bg-[#13151d] px-6 py-3 rounded-xl border border-white/5">
                <span className="block text-2xl font-bold text-white">{enrolledCourses.length}</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">Courses</span>
             </div>
             <div className="bg-[#13151d] px-6 py-3 rounded-xl border border-white/5">
                <span className="block text-2xl font-bold text-green-400">
                   {enrolledCourses.filter(c => c.progress === 100).length}
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">Completed</span>
             </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map((course) => {
            const isCompleted = course.progress === 100;

            return (
              <div key={course.id} className="bg-[#13151d] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all group flex flex-col">
                
                {/* Image */}
                <div className="relative h-48 bg-black">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13151d] to-transparent"></div>
                  
                  {/* Play Button Overlay */}
                  <Link to={`/learn/${course.id}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                      <FaPlay className="text-white ml-1" />
                    </div>
                  </Link>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-xs font-bold text-purple-400 uppercase tracking-wider bg-purple-400/10 px-2 py-1 rounded">
                        {course.category}
                     </span>
                     {isCompleted && (
                        <FaCheckCircle className="text-green-500 text-xl" title="Completed" />
                     )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-6 flex-1">
                    {course.instructor}
                  </p>

                  {/* Progress Bar Section */}
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs text-slate-300 mb-2 font-medium">
                      <span>{isCompleted ? 'Completed' : 'In Progress'}</span>
                      <span>{course.progress}%</span>
                    </div>
                    
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-6">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>

                    <Link 
                      to={`/learn/${course.id}`}
                      className={`w-full py-3 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-all
                        ${isCompleted 
                          ? 'bg-green-600/20 text-green-400 border border-green-600/50 hover:bg-green-600 hover:text-white' 
                          : 'bg-white/5 text-white border border-white/10 hover:bg-purple-600 hover:border-purple-600'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <>Review Course <FaCheckCircle /></>
                      ) : (
                        <>Continue Learning <FaPlay className="text-xs" /></>
                      )}
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyCoursesPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext'; // 👈 استدعاء
import { FaPlay, FaBookOpen } from 'react-icons/fa';

const MyCoursesPage = () => {
  const { enrolledCourses } = useStudent(); // 👈 البيانات الحقيقية

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Learning</h1>
          <div className="bg-[#13151d] border border-white/10 px-4 py-2 rounded-xl text-center">
             <span className="block text-2xl font-bold text-white">{enrolledCourses.length}</span>
             <span className="text-xs text-slate-400">Enrolled Courses</span>
          </div>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-[#13151d] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all group">
                
                {/* Image */}
                <div className="h-40 relative bg-[#0f1119] p-4 flex items-center justify-center overflow-hidden">
                  <img src={course.image} alt={course.title} className="h-full object-contain z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13151d] to-transparent opacity-80"></div>
                  
                  <Link to={`/learn/${course.id}`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-20">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-600/40">
                      <FaPlay className="pl-1" />
                    </div>
                  </Link>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-bold mb-1 truncate">{course.title}</h3>
                  <p className="text-xs text-slate-400 mb-4">By {course.instructor}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>{course.progress}% Complete</span>
                      <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-1000" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <Link 
                    to={`/learn/${course.id}`} 
                    className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-lg border border-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#13151d] border border-white/5 rounded-3xl">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
               <FaBookOpen className="text-3xl text-slate-500" />
             </div>
             <h2 className="text-2xl font-bold text-white mb-2">You haven't enrolled in any courses yet.</h2>
             <Link to="/courses" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all mt-4">
               Browse Courses
             </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyCoursesPage;
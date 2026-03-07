import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  // 1. بنحاول نجيب الكورسات المسجلة من المتصفح لو موجودة (شغالة زي الفل مؤقتاً)
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('enrolledCourses');
    return saved ? JSON.parse(saved) : []; 
  });

  // 2. دالة عشان الطالب يشترك في كورس
  const enrollCourse = (course) => {
    setEnrolledCourses((prev) => {
      // نتأكد إنه مش مشترك أصلاً
      if (prev.find(c => c.id === course.id)) return prev;
      
      const newCourse = {
        ...course,
        progress: 0, // بنبدأ التقدم من صفر
        lastAccessed: new Date().toISOString()
      };
      
      const updated = [...prev, newCourse];
      localStorage.setItem('enrolledCourses', JSON.stringify(updated));
      return updated;
    });
  };

  // 3. دالة تحديث التقدم (لما يحضر درس)
  const updateProgress = (courseId, progress) => {
    setEnrolledCourses(prev => {
       const updated = prev.map(c => String(c.id) === String(courseId) ? { ...c, progress } : c);
       localStorage.setItem('enrolledCourses', JSON.stringify(updated));
       return updated;
    });
  };

 
  return (
    <StudentContext.Provider value={{ enrolledCourses, enrollCourse, updateProgress }}>
      {children}
    </StudentContext.Provider>
  );
};
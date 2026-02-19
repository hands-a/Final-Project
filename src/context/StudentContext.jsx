import React, { createContext, useContext, useState, useEffect } from 'react';
import { coursesData } from '../data/coursesData'; // بنستورد الكورسات عشان ناخد منها بيانات

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  // 1. بنحاول نجيب الكورسات المسجلة من المتصفح لو موجودة
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('enrolledCourses');
    return saved ? JSON.parse(saved) : []; 
  });

  // 2. دالة عشان الطالب يشترك في كورس (هنستخدمها بعد الدفع)
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
       const updated = prev.map(c => c.id === courseId ? { ...c, progress } : c);
       localStorage.setItem('enrolledCourses', JSON.stringify(updated));
       return updated;
    });
  };

  // *مؤقتًا للتجربة:* هنضيف شوية كورسات وهمية لو الطالب جديد عشان الصفحة متبقاش فاضية
  useEffect(() => {
    if (enrolledCourses.length === 0) {
        // بنضيف أول كورسين من الداتا كأن الطالب اشتراهم
        const demoCourses = coursesData.slice(0, 2).map(c => ({...c, progress: Math.floor(Math.random() * 80)})); 
        setEnrolledCourses(demoCourses);
    }
  }, []);

  return (
    <StudentContext.Provider value={{ enrolledCourses, enrollCourse, updateProgress }}>
      {children}
    </StudentContext.Provider>
  );
};
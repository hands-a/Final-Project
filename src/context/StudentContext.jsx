import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  // 1. القراءة الفورية من LocalStorage عند البدء (Lazy Initialization)
  // ده بيمنع إن القيمة تكون فاضية [] أول ما الصفحة تفتح
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const storedData = localStorage.getItem('enrolledCourses');
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Failed to load courses from storage", error);
      return [];
    }
  });

  // 2. مراقبة أي تغيير وحفظه فوراً في LocalStorage
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  // --- Actions ---

  // دالة الاشتراك في كورس جديد
  const enrollCourse = (course) => {
    setEnrolledCourses((prevCourses) => {
      // لو الكورس موجود أصلاً، مرجعش نسخة جديدة (عشان نمنع التكرار)
      if (prevCourses.some(c => c.id === course.id)) return prevCourses;
      
      // إضافة الكورس مع نسبة تقدم 0
      return [...prevCourses, { ...course, progress: 0 }];
    });
  };

  // دالة تحديث التقدم (مهمة جداً لصفحة My Learning)
  const updateProgress = (courseId, progress) => {
    setEnrolledCourses((prevCourses) => {
      return prevCourses.map(course => {
        if (course.id === courseId) {
          // تحديث النسبة، ولو النسبة 100 بنعلم عليه
          return { ...course, progress: progress };
        }
        return course;
      });
    });
  };

  return (
    <StudentContext.Provider value={{ enrolledCourses, enrollCourse, updateProgress }}>
      {children}
    </StudentContext.Provider>
  );
};
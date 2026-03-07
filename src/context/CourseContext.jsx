import React, { createContext, useContext, useState, useEffect } from 'react';
// import { coursesData as initialCourses } from '../data/coursesData';

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
  // 1. تحميل الكورسات من LocalStorage أو استخدام البيانات الأولية
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('courses');
    // إذا وجدت داتا مخزنة، نقوم بتحويلها لـ JSON، وإلا نستخدم البيانات الأولية
    return savedCourses ? JSON.parse(savedCourses) : initialCourses;
  });

  // 2. حفظ أي تغيير في LocalStorage تلقائياً
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  // --- Actions ---

  // إضافة كورس جديد
  const addCourse = (newCourse) => {
    setCourses((prevCourses) => {
      const nextId = prevCourses.length > 0 ? Math.max(...prevCourses.map(c => c.id)) + 1 : 1;
      const courseWithId = { 
        ...newCourse, 
        id: nextId, 
        students: 0, 
        rating: 4.5 // قيمة افتراضية للبداية
      };
      return [...prevCourses, courseWithId];
    });
  };

  // حذف كورس
  const deleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
       setCourses(prev => prev.filter(c => c.id !== courseId));
    }
  };

  // تعديل كورس موجود (تحديث شامل)
  const updateCourse = (courseId, updatedData) => {
    setCourses((prevCourses) => 
      prevCourses.map((course) => 
        course.id === courseId ? { ...course, ...updatedData } : course
      )
    );
  };

  return (
    <CourseContext.Provider value={{ 
      courses, 
      addCourse, 
      deleteCourse, 
      updateCourse 
    }}>
      {children}
    </CourseContext.Provider>
  );
};
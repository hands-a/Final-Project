import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  // 1. تحميل الكورسات من اللوكال ستوريدج (عشان لو عمل ريفريش الكورسات ماتطيرش)
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const savedCourses = localStorage.getItem('enrolledCourses');
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  // 2. تحديث اللوكال ستوريدج تلقائياً كل ما الطالب يشتري كورس جديد
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  // 3. دالة إضافة الكورسات اللي بتتنادى من صفحة الدفع
  const enrollCourses = (cartItems) => {
    setEnrolledCourses((prevCourses) => {
      // التأكد إن الطالب مشتراش الكورس ده قبل كده
      const newCourses = cartItems.filter(
        (item) => !prevCourses.find((course) => course.id === item.id)
      );

      // 💡 التريكة هنا: بنضيف حقل (progress: 0) عشان شريط التقدم في صفحة My Learning يشتغل
      const coursesWithProgress = newCourses.map(course => ({
        ...course,
        progress: 0 
      }));

      return [...prevCourses, ...coursesWithProgress];
    });
  };

  return (
    <StudentContext.Provider value={{ enrolledCourses, enrollCourses }}>
      {children}
    </StudentContext.Provider>
  );
};
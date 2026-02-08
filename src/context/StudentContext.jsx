import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const savedData = localStorage.getItem('enrolledCourses');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const enrollCourses = (newCourses) => {
    const coursesWithProgress = newCourses.map(course => ({
      ...course,
      progress: 0,
      completedLessons: 0,
      totalLessons: course.lessons || 10,
      enrollmentDate: new Date().toISOString()
    }));

    setEnrolledCourses(prev => {
      const uniqueCourses = coursesWithProgress.filter(
        newC => !prev.some(existingC => existingC.id === newC.id)
      );
      return [...prev, ...uniqueCourses];
    });
  };

  return (
    <StudentContext.Provider value={{ enrolledCourses, enrollCourses }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
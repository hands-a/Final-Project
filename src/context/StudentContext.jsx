import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const savedCourses = localStorage.getItem('enrolledCourses');
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  
  const enrollCourses = (cartItems) => {
    setEnrolledCourses((prevCourses) => {
      
      const newCourses = cartItems.filter(
        (item) => !prevCourses.find((course) => course.id === item.id)
      );

      
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
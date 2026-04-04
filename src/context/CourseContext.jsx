import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
  
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('courses');
    return savedCourses ? JSON.parse(savedCourses) : [];
  });

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const addCourse = (newCourse) => {
    setCourses((prevCourses) => {
      const nextId = prevCourses.length > 0 ? Math.max(...prevCourses.map(c => c.id)) + 1 : 1;
      const courseWithId = { 
        ...newCourse, 
        id: nextId, 
        students: 0, 
        rating: 4.5 
      };
      return [...prevCourses, courseWithId];
    });
  };

  const deleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
       setCourses(prev => prev.filter(c => c.id !== courseId));
    }
  };

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
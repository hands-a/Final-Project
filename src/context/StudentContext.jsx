/**
 * StudentContext.jsx
 *
 * Manages the current user's enrolled courses and per-course progress.
 *
 * PORTFOLIO VERSION: Enrollment is stored locally in localStorage under the
 * key "enrolledCourseIds" as an array of objects: { id, progress }.
 * The actual course data (title, image, etc.) is resolved at read-time
 * from coursesData.js, so there is always exactly ONE source of truth
 * for course content.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Original API implementation (commented out for portfolio):
 * This context originally fetched enrolled courses from the Strapi backend:
 *
 *   const fetchEnrolledCourses = async (userId) => {
 *     const res = await axios.get(
 *       `https://futuredev-backend.onrender.com/api/enrollments?filters[user][id][$eq]=${userId}&populate=course`
 *     );
 *     const data = res.data.data.map(e => ({
 *       id: e.attributes.course.data.id,
 *       ...e.attributes.course.data.attributes,
 *       progress: e.attributes.progress || 0,
 *     }));
 *     setEnrolledCourses(data);
 *   };
 *
 *   const updateProgressOnServer = async (enrollmentId, newProgress) => {
 *     await axios.put(
 *       `https://futuredev-backend.onrender.com/api/enrollments/${enrollmentId}`,
 *       { data: { progress: newProgress } }
 *     );
 *   };
 *
 * Enrollment records were created by the backend when an order was placed.
 * Progress was persisted per-user in the enrollment table.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

/**
 * Enrollment storage format (localStorage key: "enrolledCourseIds"):
 * [
 *   { id: 1, progress: 65 },
 *   { id: 7, progress: 0  },
 *   ...
 * ]
 *
 * Using only IDs + progress means:
 * - Course content changes in coursesData.js are reflected immediately.
 * - There is no stale/duplicate course data in localStorage.
 * - The list is compact and easy to inspect.
 */
const STORAGE_KEY = 'enrolledCourseIds';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const StudentProvider = ({ children }) => {

  // enrolledRecords: [{ id: number, progress: number }]
  const [enrolledRecords, setEnrolledRecords] = useState(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enrolledRecords));
  }, [enrolledRecords]);

  /**
   * enrollCourses(cartItems)
   * Called by CheckoutPage after a successful (simulated) purchase.
   * Accepts an array of course objects from the cart.
   * Extracts the numeric `id` from each and adds it to enrolled records
   * (skipping any course already enrolled).
   */
  const enrollCourses = (cartItems) => {
    setEnrolledRecords((prev) => {
      const existingIds = new Set(prev.map((r) => r.id));
      const newRecords = cartItems
        .filter((item) => !existingIds.has(item.id))
        .map((item) => ({ id: item.id, progress: 0 }));
      return [...prev, ...newRecords];
    });
  };

  /**
   * updateCourseProgress(courseId, newProgress)
   * Called by CoursePlayerPage when the user clicks "Mark as Completed".
   * courseId may be the string from the URL param — coerce to number.
   */
  const updateCourseProgress = (courseId, newProgress) => {
    setEnrolledRecords((prev) =>
      prev.map((record) =>
        record.id === Number(courseId) || String(record.id) === String(courseId)
          ? { ...record, progress: newProgress }
          : record
      )
    );
  };

  /**
   * unenrollCourse(courseId)
   * Removes an enrollment record — useful for admin/testing.
   */
  const unenrollCourse = (courseId) => {
    setEnrolledRecords((prev) =>
      prev.filter((r) => String(r.id) !== String(courseId))
    );
  };

  return (
    <StudentContext.Provider value={{
      enrolledRecords,
      enrollCourses,
      updateCourseProgress,
      unenrollCourse,
    }}>
      {children}
    </StudentContext.Provider>
  );
};
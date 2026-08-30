/**
 * MyCoursesPage.jsx
 *
 * Displays the courses the currently logged-in user has enrolled in.
 *
 * PORTFOLIO VERSION:
 * - Enrolled course IDs are read from StudentContext (persisted in localStorage).
 * - Full course data (title, image, etc.) is resolved from coursesData.js.
 * - This guarantees a single source of truth: coursesData.js.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Original API implementation (commented out for portfolio):
 * This page originally fetched the user's enrolled courses from Strapi:
 *
 *   useEffect(() => {
 *     if (!user) return;
 *     axios.get(
 *       `https://futuredev-backend.onrender.com/api/enrollments
 *        ?filters[user][id][$eq]=${user.id}&populate[course][populate]=*`
 *     ).then(res => {
 *       const courses = res.data.data.map(e => ({
 *         id: e.attributes.course.data.id,
 *         ...e.attributes.course.data.attributes,
 *         progress: e.attributes.progress || 0,
 *       }));
 *       setEnrolledCourses(courses);
 *       setLoading(false);
 *     }).catch(() => setLoading(false));
 *   }, [user]);
 *
 * Each enrolled course was a real record in the DB linked to the user.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from "react";
import { Link } from "react-router-dom";
import { coursesData } from "../../data/coursesData";
import { useAuth } from "../../context/AuthContext";
import { useStudent } from "../../context/StudentContext";
import {
  FaArrowRight, FaCheckCircle, FaBookOpen,
  FaPlayCircle, FaGraduationCap
} from "react-icons/fa";

const getCategoryAccent = (category = "") => {
  const cat = category.toLowerCase();
  if (cat.includes("front") || cat.includes("react") || cat.includes("css") || cat.includes("html"))
    return {
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      title: "group-hover:text-cyan-400",
      hover: "hover:border-cyan-500/30 hover:shadow-cyan-500/10",
      bar: "bg-gradient-to-r from-cyan-500 to-emerald-500",
    };
  if (cat.includes("back") || cat.includes("node") || cat.includes("api") || cat.includes("php") || cat.includes("python"))
    return {
      badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      title: "group-hover:text-orange-400",
      hover: "hover:border-orange-500/30 hover:shadow-orange-500/10",
      bar: "bg-gradient-to-r from-orange-500 to-amber-500",
    };
  if (cat.includes("career") || cat.includes("devops") || cat.includes("mobile") || cat.includes("cyber"))
    return {
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      title: "group-hover:text-emerald-400",
      hover: "hover:border-emerald-500/30 hover:shadow-emerald-500/10",
      bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
    };
  return {
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    title: "group-hover:text-cyan-400",
    hover: "hover:border-cyan-500/30 hover:shadow-cyan-500/10",
    bar: "bg-gradient-to-r from-cyan-500 to-emerald-500",
  };
};

const MyCoursesPage = () => {
  const { user } = useAuth();
  const { enrolledRecords } = useStudent();

  /**
   * Resolve enrolled records against coursesData.
   * enrolledRecords = [{ id, progress }]
   * We find the matching course in coursesData and merge the progress in.
   * If a course ID is no longer in coursesData, it is silently skipped.
   */
  const enrolledCourses = enrolledRecords
    .map((record) => {
      const course = coursesData.find((c) => c.id === record.id);
      if (!course) return null;
      return { ...course, progress: record.progress };
    })
    .filter(Boolean); // remove any unresolved records

  const completedCourses = enrolledCourses.filter((c) => c.progress === 100);
  const inProgressCourses = enrolledCourses.filter((c) => c.progress < 100);

  // ── Empty State ──────────────────────────────────────────────────────────
  if (enrolledCourses.length === 0) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center pt-28 px-6 text-center relative z-10">
        <div className="glass-panel p-12 flex flex-col items-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-emerald-600/20 border border-cyan-500/20 flex items-center justify-center mb-6">
            <FaGraduationCap className="text-cyan-400 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No Courses Yet</h2>
          <p className="text-zinc-500 mb-8 text-sm leading-relaxed">
            You haven't enrolled in any courses yet. Browse the catalog, add a course to your cart, and complete the checkout to get started.
          </p>
          <Link to="/courses" className="btn-primary px-8 py-3.5">
            Explore Courses <FaArrowRight className="text-sm opacity-80" />
          </Link>
        </div>
      </div>
    );
  }

  // ── Main View ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">

      {/* Ambient */}
      <div className="absolute top-20 left-0 w-[500px] h-[400px] bg-cyan-900/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-emerald-900/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10 border-b border-zinc-800/50 pb-6">
          <div>
            <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase mb-2 block">Dashboard</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white">My Learning</h1>
            <p className="text-zinc-500 text-sm mt-2">
              Hello, <span className="font-semibold text-cyan-400">{user?.name || "Student"}</span>. Keep up the great work!
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-5">
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">{enrolledCourses.length}</p>
              <p className="text-xs text-zinc-600 uppercase tracking-wider">Enrolled</p>
            </div>
            <div className="w-px h-10 bg-zinc-800" />
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">{completedCourses.length}</p>
              <p className="text-xs text-zinc-600 uppercase tracking-wider">Completed</p>
            </div>
            <div className="w-px h-10 bg-zinc-800" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{inProgressCourses.length}</p>
              <p className="text-xs text-zinc-600 uppercase tracking-wider">In Progress</p>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => {
            const accent = getCategoryAccent(course.category);
            const isCompleted = course.progress === 100;

            return (
              <div
                key={course.id}
                className={`glass-panel overflow-hidden group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${accent.hover}`}
              >
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-zinc-900 border-b border-zinc-800/50">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  {isCompleted && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-emerald-500/90 px-3 py-1 rounded-full text-xs font-bold text-zinc-950 backdrop-blur-sm">
                      <FaCheckCircle /> Complete
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className={`${accent.badge} border text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 w-fit`}>
                    {course.category}
                  </span>
                  <h3 className={`text-base font-semibold text-white mb-1 line-clamp-2 ${accent.title} transition-colors duration-300`}>
                    {course.title}
                  </h3>
                  <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-5">
                    by {course.instructor}
                  </p>

                  {/* Progress bar */}
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Progress</span>
                      <span className={`text-xs font-bold ${isCompleted ? "text-emerald-400" : "text-cyan-400"}`}>
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isCompleted ? "bg-emerald-400" : accent.bar
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action button — links to Course Player at /learn/:id */}
                  <div className="mt-auto">
                    {isCompleted ? (
                      <Link
                        to={`/learn/${course.id}`}
                        className="w-full py-2.5 rounded-xl border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500/10 transition-all duration-300"
                      >
                        <FaBookOpen className="text-sm" /> Review Course
                      </Link>
                    ) : (
                      <Link
                        to={`/learn/${course.id}`}
                        className="w-full py-2.5 rounded-xl border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-cyan-500/10 transition-all duration-300"
                      >
                        <FaPlayCircle className="text-sm" /> Continue Learning
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default MyCoursesPage;
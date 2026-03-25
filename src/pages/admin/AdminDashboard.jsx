import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import {
  FaPlus,
  FaUsers,
  FaBook,
  FaDollarSign,
  FaEdit,
  FaTrash,
  FaLayerGroup,
  FaSpinner,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios.get("http://localhost:1337/api/courses?populate=*")
      .then((response) => {
        const formattedCourses = response.data.data.map((item) => {
          const attr = item.attributes || item;
          
          let imageUrl = null;
          if (attr.image?.url) {
            imageUrl = `http://localhost:1337${attr.image.url}`;
          } else if (attr.image?.data?.attributes?.url) {
            imageUrl = `http://localhost:1337${attr.image.data.attributes.url}`;
          }

          return {
            id: item.documentId || item.id, 
            title: attr.title || "Untitled Course",
            price: attr.price || 0,
            students: attr.students || 0, 
            level: attr.level || "Beginner",
            category: attr.category || "Uncategorized",
            image: imageUrl
          };
        });
        setCourses(formattedCourses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses for admin:", error);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course permanently?")) {
      try {
        await axios.delete(`http://localhost:1337/api/courses/${id}`);
        setCourses(courses.filter(course => course.id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete the course. Please try again.");
      }
    }
  };

  const totalRevenue = courses.reduce((acc, course) => acc + (course.price * (course.students || 0)), 0);
  const totalStudents = courses.reduce((acc, course) => acc + (course.students || 0), 0);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: <FaDollarSign />,
      textColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    },
    {
      title: "Active Students",
      value: totalStudents,
      icon: <FaUsers />,
      textColor: "text-blue-400",
      bgColor: "bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    },
    {
      title: "Total Courses",
      value: courses.length,
      icon: <FaBook />,
      textColor: "text-pink-400",
      bgColor: "bg-pink-500/10 border border-pink-500/20 shadow-[0_0_15px_rgba(244,114,182,0.15)]",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center pt-24">
        <FaSpinner className="text-pink-500 text-5xl animate-spin mb-4" />
        <h2 className="text-white text-xl font-light tracking-widest uppercase">Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050511] pt-24 pb-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-white/10 pb-8 mt-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-wide">
              Instructor Dashboard
            </h1>
            <p className="text-slate-400 font-light text-sm md:text-base tracking-wide">
              Manage your courses and track performance in real-time.
            </p>
          </div>
          <Link
            to="/admin/add-course"
            className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-pink-500/20"
          >
            <FaPlus className="opacity-80" /> Create Course
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/0 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 flex items-center gap-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-transform duration-300"
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl ${stat.bgColor} ${stat.textColor}`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest font-medium mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl md:text-3xl font-light tracking-wide text-white">
                  {stat.value}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Courses Table Container */}
        <div className="bg-white/0 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-medium tracking-wide text-white">
              Your Courses
            </h3>
            <span className="text-pink-400 font-bold text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-1.5 rounded-full shadow-sm">
              {courses.length} Items
            </span>
          </div>

          {courses.length > 0 ? (
            <>
              {/* Desktop View: Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-white/5 text-slate-400 uppercase text-[10px] font-medium tracking-widest border-b border-white/10">
                    <tr>
                      <th className="p-6 font-medium">Course</th>
                      <th className="p-6 font-medium">Price</th>
                      <th className="p-6 font-medium">Students</th>
                      <th className="p-6 font-medium">Level</th>
                      <th className="p-6 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {courses.map((course) => (
                      <tr
                        key={course.id}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        <td className="p-6 text-white group-hover:text-pink-400 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                              {course.image ? (
                                <img
                                  src={course.image}
                                  alt=""
                                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                              ) : (
                                <FaBook className="text-slate-500" />
                              )}
                            </div>
                            <span className="line-clamp-1 font-light tracking-wide text-sm">{course.title}</span>
                          </div>
                        </td>
                        <td className="p-6 font-light tracking-wider text-pink-400 text-sm">
                          ${course.price}
                        </td>
                        <td className="p-6 text-sm font-light">
                          <div className="flex items-center gap-2 text-slate-300">
                             <FaUsers className="text-slate-500" />
                             {course.students}
                          </div>
                        </td>
                        <td className="p-6">
                          <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-white/5 text-slate-300 border border-white/10">
                            {course.level}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Link 
                              to={`/admin/edit-course/${course.id}`} 
                              className="p-2.5 bg-white/5 border border-white/10 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all shadow-sm flex items-center justify-center"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => handleDelete(course.id)}
                              className="p-2.5 bg-white/5 border border-white/10 hover:border-red-500/50 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all shadow-sm"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View: Cards Stack */}
              <div className="md:hidden flex flex-col p-4 space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col gap-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                          {course.image ? (
                            <img
                              src={course.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaBook className="text-slate-500" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-white font-medium tracking-wide text-sm line-clamp-1 mb-1.5">
                            {course.title}
                          </h4>
                          <span className="text-[9px] text-pink-400 font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded inline-block">
                            {course.category}
                          </span>
                        </div>
                      </div>
                      <span className="font-light tracking-wider text-pink-400 text-sm">
                        ${course.price}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 bg-white/5 border border-white/5 p-3.5 rounded-xl font-light">
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-slate-500 text-sm" />
                        <span>{course.students} Students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaLayerGroup className="text-slate-500 text-sm" />
                        <span>{course.level}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {/* 💡 التعديل هنا: تحويل الزرار لـ Link في شاشة الموبايل */}
                      <Link 
                        to={`/admin/edit-course/${course.id}`} 
                        className="flex-1 py-2.5 bg-white/5 border border-white/10 hover:border-blue-500/50 text-slate-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                      >
                        <FaEdit className="text-sm" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="flex-1 py-2.5 bg-white/5 border border-white/10 hover:border-red-500/50 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                      >
                        <FaTrash className="text-sm" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center px-4">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 text-slate-500 text-3xl shadow-sm">
                <FaBook />
              </div>
              <h3 className="text-white font-light text-2xl mb-3 tracking-wide">
                No courses yet
              </h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed max-w-sm mb-8">
                Create your first course to start accepting students and earning revenue.
              </p>
              <Link
                to="/admin/add-course"
                className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-pink-500/20"
              >
                Create Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaUsers,
  FaBook,
  FaDollarSign,
  FaEdit,
  FaTrash,
  FaLayerGroup,
} from "react-icons/fa";
import { useCourses } from "../../context/CourseContext";

const AdminDashboard = () => {
  const { courses, deleteCourse } = useCourses();

  const totalRevenue = courses.reduce(
    (acc, course) => acc + course.price * (course.students || 0),
    0,
  );
  const totalStudents = courses.reduce(
    (acc, course) => acc + (course.students || 0),
    0,
  );

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: <FaDollarSign />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Active Students",
      value: totalStudents,
      icon: <FaUsers />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Courses",
      value: courses.length,
      icon: <FaBook />,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-4 md:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Instructor Dashboard
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Manage your courses and track performance.
          </p>
        </div>
        <Link
          to="/admin/add-course"
          className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-purple-600/20"
        >
          <FaPlus /> Create Course
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#13151d] p-5 md:p-6 rounded-2xl border border-white/5 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-xl md:text-2xl shadow-lg`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-400 text-xs md:text-sm uppercase tracking-wider font-semibold">
                {stat.title}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#13151d] rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg md:text-xl font-bold text-white">
            Your Courses
          </h3>
          <span className="text-slate-500 text-xs md:text-sm bg-white/5 px-3 py-1 rounded-full">
            {courses.length} Items
          </span>
        </div>

        {courses.length > 0 ? (
          <>
            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-slate-400 uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="p-5">Course</th>
                    <th className="p-5">Price</th>
                    <th className="p-5">Students</th>
                    <th className="p-5">Level</th>
                    <th className="p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {courses.map((course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="p-5 font-bold text-white group-hover:text-purple-400 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-slate-800 overflow-hidden shrink-0">
                            {course.image ? (
                              <img
                                src={
                                  typeof course.image === "string"
                                    ? course.image
                                    : URL.createObjectURL(course.image)
                                }
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-500">
                                <FaBook />
                              </div>
                            )}
                          </div>
                          <span className="line-clamp-1">{course.title}</span>
                        </div>
                      </td>
                      <td className="p-5 font-mono text-green-400">
                        ${course.price}
                      </td>
                      <td className="p-5 flex items-center gap-2">
                        <FaUsers className="text-slate-500" />{" "}
                        {course.students || 0}
                      </td>
                      <td className="p-5">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/10 text-white border border-white/10">
                          {course.level || "Beginner"}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 bg-white/5 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 rounded-lg transition-colors">
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="p-2 bg-white/5 hover:bg-red-600/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
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
            <div className="md:hidden flex flex-col gap-4 p-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-slate-800 overflow-hidden shrink-0">
                        {course.image ? (
                          <img
                            src={
                              typeof course.image === "string"
                                ? course.image
                                : URL.createObjectURL(course.image)
                            }
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <FaBook />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-bold line-clamp-1">
                          {course.title}
                        </h4>
                        <span className="text-xs text-slate-400 bg-white/10 px-2 py-0.5 rounded mt-1 inline-block">
                          {course.category}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-green-400 font-bold">
                      ${course.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-300 bg-black/20 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-slate-500" />
                      <span>{course.students || 0} Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaLayerGroup className="text-slate-500" />
                      <span>{course.level}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-1">
                    <button className="flex-1 py-2 bg-white/5 text-blue-400 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-500/10">
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="flex-1 py-2 bg-white/5 text-red-400 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-500/10"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-slate-500 text-2xl">
              <FaBook />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">
              No courses yet
            </h3>
            <p className="text-slate-400 text-sm max-w-xs mb-6">
              Create your first course to start accepting students and earning
              revenue.
            </p>
            <Link
              to="/admin/add-course"
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors"
            >
              Create Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

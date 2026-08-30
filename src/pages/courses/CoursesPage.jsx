import React, { useState, useMemo } from "react";
import { coursesData } from "../../data/coursesData";
import CourseCard from "../../components/courses/CourseCard";
import CourseFilters from "../../components/courses/CourseFilters";
import Pagination from "../../components/courses/Pagination";
import { FaSearch, FaBookOpen } from "react-icons/fa";

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    "All",
    "Data Science",
    "Mobile App",
    "Cyber Security",
    "DevOps",
    "Front-end",
    "Back-End",
  ];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = useMemo(() => {
    let result = coursesData;

    if (searchTerm) {
      result = result.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (selectedCategory !== "All") {
      result = result.filter((course) => course.category === selectedCategory);
    }
    if (selectedLevel !== "All") {
      result = result.filter((course) => course.level === selectedLevel);
    }
    if (priceFilter === "Free") {
      result = result.filter(
        (course) => course.price === 0 || course.price === "Free",
      );
    } else if (priceFilter === "Paid") {
      result = result.filter(
        (course) => course.price > 0 && course.price !== "Free",
      );
    }

    return result;
  }, [searchTerm, selectedCategory, selectedLevel, priceFilter]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (setterFunction, value) => {
    setterFunction(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setPriceFilter("All");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-20 left-0 w-[500px] h-[400px] bg-cyan-900/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-emerald-900/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10 border-b border-zinc-800/50 pb-8">
          <div>
            <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase mb-2 block">
              Discover
            </span>
            <h1 className="text-4xl font-bold text-white">Explore Courses</h1>
            <p className="text-zinc-500 text-sm mt-2">
              Find the perfect course to upgrade your skills.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-96 group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-cyan-400 transition-colors duration-300 text-sm" />
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
              className="input-field !pl-10"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <CourseFilters
            categories={categories}
            levels={levels}
            courses={coursesData}
            selectedCategory={selectedCategory}
            setSelectedCategory={(val) => handleFilterChange(setSelectedCategory, val)}
            selectedLevel={selectedLevel}
            setSelectedLevel={(val) => handleFilterChange(setSelectedLevel, val)}
            priceFilter={priceFilter}
            setPriceFilter={(val) => handleFilterChange(setPriceFilter, val)}
          />

          <div className="w-full lg:w-3/4">
            {currentItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                  {currentItems.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={paginate}
                />
              </>
            ) : (
              <EmptyStateView clearFilters={clearFilters} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

const EmptyStateView = ({ clearFilters }) => (
  <div className="text-center py-24 glass-panel border-dashed border-zinc-700/50 flex flex-col items-center justify-center">
    <div className="w-14 h-14 bg-zinc-800/60 border border-zinc-700 rounded-2xl flex items-center justify-center mx-auto mb-5">
      <FaBookOpen className="text-zinc-600 text-xl" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
    <p className="text-zinc-500 mb-8 text-sm max-w-sm">
      We couldn't find any courses matching your filters. Try adjusting your search.
    </p>
    <button onClick={clearFilters} className="btn-primary px-8 py-3">
      Clear all filters
    </button>
  </div>
);

export default CoursesPage;

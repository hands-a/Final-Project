import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'; 
import CourseCard from '../../components/courses/CourseCard'; 
import CourseFilters from '../../components/courses/CourseFilters'; 
import Pagination from '../../components/courses/Pagination'; 
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const CoursesPage = () => {
  // 1. States (Data)
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false); 
  
  // 2. States (Filters)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');

  // 3. States (Pagination)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const categories = ['All', 'Data Science', 'Mobile App', 'Cyber Security', 'DevOps', 'Front-end', 'Back-End'
  ];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Fetch Courses (Logic)
  useEffect(() => {
    axios.get('http://localhost:1337/api/courses?populate=*')
      .then((response) => {
        const formattedCourses = response.data.data.map((item) => {
          const attr = item.attributes || item; 
          
          let imageUrl = 'https://via.placeholder.com/400x200?text=No+Image';
          if (attr.image?.url) imageUrl = `http://localhost:1337${attr.image.url}`;
          else if (attr.image?.data?.attributes?.url) imageUrl = `http://localhost:1337${attr.image.data.attributes.url}`;
          
          return {
            id: item.id || item.documentId,
            title: attr.title || "Untitled Course",
            category: attr.category || "All",
            level: attr.level || "Beginner",
            price: attr.price || 0,
            instructor: attr.instructor || "Unknown",
            rating: attr.rating || 0,
            lessons: attr.lessons || 0,
            image: imageUrl
          };
        });

        setCourses(formattedCourses);
        setLoading(false);
      })
      .catch(() => {
        setError(true); 
        setLoading(false);
      });
  }, []);

  const filteredCourses = useMemo(() => {
    let result = courses; 

    if (searchTerm) {
      result = result.filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategory !== 'All') {
      result = result.filter(course => course.category === selectedCategory);
    }
    if (selectedLevel !== 'All') {
      result = result.filter(course => course.level === selectedLevel);
    }
    if (priceFilter === 'Free') {
      result = result.filter(course => course.price === 0 || course.price === "Free"); 
    } else if (priceFilter === 'Paid') {
      result = result.filter(course => course.price > 0 && course.price !== "Free");
    }

    return result;
  }, [courses, searchTerm, selectedCategory, selectedLevel, priceFilter]);

  // Pagination Math (بيعتمد على النتيجة اللي طالعة من useMemo)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (setterFunction, value) => {
    setterFunction(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm(''); setSelectedCategory('All'); setSelectedLevel('All'); setPriceFilter('All');
    setCurrentPage(1);
  };

  // Views
  if (loading) return <LoadingView />;
  if (error) return <ErrorView />;

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 relative overflow-hidden">      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <span className="text-pink-400 font-bold text-xs tracking-widest uppercase mb-2 block">Discover</span>
            <h1 className="text-4xl font-light text-white tracking-wide">Explore Courses</h1>
            <p className="text-slate-400 text-sm mt-2 font-light">Find the perfect course to upgrade your skills.</p>
          </div>
          <div className="relative w-full md:w-96 group">
            <input 
              type="text" 
              placeholder="Search for courses..." 
              value={searchTerm}
              onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
              className="input-field !bg-white/5 shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Imported Filters Component */}
          <CourseFilters 
            categories={categories}
            levels={levels}
            courses={courses}
            selectedCategory={selectedCategory}
            setSelectedCategory={(val) => handleFilterChange(setSelectedCategory, val)}
            selectedLevel={selectedLevel}
            setSelectedLevel={(val) => handleFilterChange(setSelectedLevel, val)}
            priceFilter={priceFilter}
            setPriceFilter={(val) => handleFilterChange(setPriceFilter, val)}
          />

          {/* Courses Grid */}
          <div className="w-full lg:w-3/4">
            {currentItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {currentItems.map(course => <CourseCard key={course.id} course={course} />)}
                </div>
                
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
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

// Sub-components
const LoadingView = () => (
  <div className="min-h-screen bg-transparent flex flex-col items-center justify-center pt-28">
    <FaSpinner className="text-pink-500 text-5xl animate-spin mb-4" />
    <h2 className="text-white text-xl font-light tracking-widest uppercase drop-shadow-lg">Loading courses...</h2>
  </div>
);

const ErrorView = () => (
  <div className="min-h-screen bg-transparent flex flex-col items-center justify-center pt-28 px-4 relative z-10">
    <div className="glass-panel p-10 text-center max-w-lg !border-red-500/30 shadow-[0_8px_32px_0_rgba(239,68,68,0.2)]">
      <FaExclamationTriangle className="text-red-500 text-6xl mx-auto mb-6 opacity-80" />
      <h2 className="text-3xl text-white font-light mb-4 tracking-wide">Connection Error</h2>
      <p className="text-slate-400 font-light leading-relaxed mb-8">We couldn't connect to the server.</p>
      <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10">Try Again</button>
    </div>
  </div>
);

const EmptyStateView = ({ clearFilters }) => (
  <div className="text-center py-24 glass-panel border-dashed flex flex-col items-center justify-center">
    <h3 className="text-2xl font-light text-white mb-2 tracking-wide">No courses found</h3>
    <p className="text-slate-400 mb-8 font-light text-sm">We couldn't find any courses matching your filters.</p>
    <button onClick={clearFilters} className="btn-primary px-8 py-3 w-fit">Clear all filters</button>
  </div>
);

export default CoursesPage;